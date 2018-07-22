let gulp = require('gulp'),
    pug = require('gulp-pug'),
    pugbem = require('gulp-pugbem'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    remember = require('gulp-remember'),
    through2 = require('through2').obj,
    order = require('gulp-order'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    beautifyCode = require('gulp-beautify-code'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    multipipe = require('multipipe'),
    svgSprite = require('gulp-svg-sprites'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    production = false,
    tagcontents;


gulp.task('tags', () => {
    return gulp.src('develop/components/**/*.pug', {since: gulp.lastRun('tags')})
        .pipe(remember('tags'))
        .pipe(order([
            'helpers/variables.pug',
            'helpers/mixins.pug'
        ]))
        .pipe(concat('.'))
        .pipe(through2(function (file, enc, cb) {
            tagcontents = file.contents;
            cb();
        }));
});

gulp.task('pages', () => {
    return gulp.src('develop/*.pug')
        .pipe(through2(function (file, enc, cb) {
            file.contents = Buffer.concat([tagcontents, Buffer.from('\n'), file.contents]);
            cb(null, file);
        }))
        .pipe(pug({pretty: true, plugins: [pugbem]}))
        .pipe(gulp.dest('public'))
        .pipe(gulpIf(production, multipipe(
            beautifyCode({extra_liners: ['head','body','main','header','nav','section','article','aside','footer','/footer','/main','/html']}),
            useref(),
            gulpIf('*.css', cleanCSS()),
            gulpIf('*.js', uglify()),
            gulp.dest('public')
        )));
});

gulp.task('styles', () => {
    return gulp.src('develop/components/**/*.scss', {since: gulp.lastRun('styles')})
        .pipe(remember('styles'))
        .pipe(order([
            'helpers/variables.scss',
            'helpers/mixins.scss',
            'helpers/fonts.scss',
            'helpers/global.scss'
        ]))
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(gulpIf(production, multipipe(
            autoprefixer({browsers:['last 15 versions']}),
            csscomb()
        )))
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', () => {
    return gulp.src('develop/components/**/*.js', {since: gulp.lastRun('scripts')})
        .pipe(remember('scripts'))
        .pipe(order([
            'helpers/global.js'
        ]))
        .pipe(concat('main.js'))
        .pipe(gulpIf(production, multipipe(
            babel({presets: ['env']}),
            beautifyCode()
        )))
        .pipe(gulp.dest('public/js'));
});

gulp.task('serve', (done) => {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
        notify: false
    });
    done();
});

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('clean', () => {
    return del('public');
});

gulp.task('copy', (done) => {
    gulp.src('develop/favicon.ico').pipe(gulp.dest('public'));
    gulp.src('develop/fonts/**/*').pipe(gulp.dest('public/fonts'));
    gulp.src('develop/images/**/*{jpeg,jpg,png,gif}')
        // .pipe(gulpIf(production, imagemin()))
        .pipe(gulp.dest('public/img'));
    gulp.src('develop/movies/**/*').pipe(gulp.dest('public/mov'));
    gulp.src('develop/libraries/**/*').pipe(gulp.dest('public/libs'));
    done();
});

gulp.task('symbols', function () {
    return gulp.src('develop/images/**/*.svg')
        .pipe(svgSprite({
            mode: 'symbols',
            preview: false,
            svg: {
                symbols: 'icons.svg'
            }
        }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('publish', (done) => {
    production = true;
    done();
});

gulp.task('watch', () => {
    gulp.watch('develop/components/**/*.pug', gulp.series('tags', 'pages', 'reload'));
    gulp.watch('develop/*.pug', gulp.series('pages', 'reload'));
    gulp.watch('develop/components/**/*.scss', gulp.series('styles', 'reload'));
    gulp.watch('develop/components/**/*.js', gulp.series('scripts', 'reload'));
});

gulp.task('default', gulp.series('clean', 'styles', 'scripts', 'tags', 'pages', 'copy', 'symbols', 'serve', 'watch'));
gulp.task('build', gulp.series('publish', 'default'));