let gulp = require('gulp'),
    pug = require('gulp-pug'),
    pugbem = require('gulp-pugbem'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    beautifyCode = require('gulp-beautify-code'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    foreach = require('gulp-foreach'),
    merge2 = require('merge2'),
    multipipe = require('multipipe'),
    del = require('del'),
    production = false;


gulp.task('pages', () => {
    return gulp.src('develop/*.pug')
        .pipe(foreach(function(stream, file){
            return merge2(gulp.src('develop/components/**/*.pug'), stream)
                .pipe(concat(file.basename));
        }))
        .pipe(pug({pretty: true, plugins: [pugbem]}))
        .pipe(gulp.dest('public'))
        .pipe(gulpIf(production, multipipe(
            beautifyCode(),
            useref(),
            gulpIf('*.css', cleanCSS()),
            gulpIf('*.js', uglify()),
            gulp.dest('public')
        )));
});

gulp.task('styles', () => {
    return gulp.src(['develop/stylesheets/*.scss', 'develop/components/**/*.scss'])
        .pipe(concat({base: 'develop/stylesheets', path: 'develop/stylesheets/main.scss'}))
        .pipe(sass())
        .pipe(gulpIf(production, multipipe(
            autoprefixer({browsers:['last 15 versions']}),
            csscomb()
        )))
        .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', () => {
    return gulp.src(['develop/javascripts/**/*.js', 'develop/components/**/*.js'])
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
    gulp.src('develop/images/**/*').pipe(gulp.dest('public/img'));
    gulp.src('develop/movies/**/*').pipe(gulp.dest('public/mov'));
    gulp.src('develop/libraries/**/*').pipe(gulp.dest('public/libs'));
    done();
});

gulp.task('publish', (done) => {
    production = true;
    done();
});

gulp.task('watch', () => {
    gulp.watch('develop/**/*.pug', gulp.series('pages', 'reload'));
    gulp.watch('develop/**/*.scss', gulp.series('styles', 'reload'));
    gulp.watch('develop/**/*.js', gulp.series('scripts', 'reload'));
});

gulp.task('default', gulp.series('clean', 'styles', 'scripts', 'pages', 'copy', 'serve', 'watch'));
gulp.task('build', gulp.series('publish', 'default'));