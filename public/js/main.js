'use strict';

/* global
-------------------------------- */
window.svg4everybody();
new WOW().init();

/* button-up
-------------------------------- */
jQuery('.button-up').each(function() {

    var $buttonUp = $(this);

    $(window).on('scroll.buttonup', function() {
        if ($(window).scrollTop() > 150) {
            $buttonUp.addClass('button-up--show');
        } else {
            $buttonUp.removeClass('button-up--show');
        }
    });

    $buttonUp.on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600);
    });
});

/* counter
-------------------------------- */
jQuery('.counter').each(function() {

    var $text = $(this).find('.counter__text');

    $(window).on('scroll.counter', function() {
        if ($text.hasClass('animated')) {
            $(this).off('scroll.counter');
            $text.countTo();
        }
    });
});

/* header
-------------------------------- */
jQuery('.header').each(function() {

    $(this).find('.header__slider').slick({
        infinite: true,
        autoplay: true,
        adaptiveHeight: true,
        prevArrow: '.header__arrow--prev',
        nextArrow: '.header__arrow--next',
        fade: true,
        dots: true,
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false
            }
        }, {
            breakpoint: 768,
            settings: {
                autoplay: false,
                arrows: false
            }
        }]
    });
});

/* menu
-------------------------------- */
jQuery('.menu').each(function() {

    var $menu = $(this),
        $wrapper = $(this).find('.menu__wrapper'),
        $button = $(this).find('.menu__button'),
        $logo = $(this).find('.menu__logo'),
        $list = $(this).find('.menu__list');

    $menu.find('.menu__item--active').clone().removeClass('menu__item--active').addClass('menu__item--current').appendTo($wrapper);

    $menu.on('keydown', function(e) {
        if (e.which == 27) {
            $button.removeClass('menu__button--pressed');
            $menu.removeClass('menu--open');
            $list.removeClass('menu__list--scroll');
            return false;
        }
    });

    $(window).on('scroll.menu', function() {
        if ($(window).scrollTop() > 180) {
            $menu.addClass('menu--fill');
            $wrapper.addClass('menu__wrapper--thin');
            $logo.addClass('menu__logo--small');
        } else {
            $menu.removeClass('menu--fill');
            $wrapper.removeClass('menu__wrapper--thin');
            $logo.removeClass('menu__logo--small');
        }
    });

    $button.on('click', function() {
        $(this).toggleClass('menu__button--pressed');
        $menu.toggleClass('menu--open');
        $list.toggleClass('menu__list--scroll');
    });

    $list.on('click', function(e) {
        if (e.target == this) {
            $button.click();
        }
    });
});

/* posts
-------------------------------- */
jQuery('.posts').each(function() {

    $(this).find('.posts__slider').slick({
        infinite: true,
        autoplay: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '.posts__arrow--prev',
        nextArrow: '.posts__arrow--next',
        dots: false,
        responsive: [{
            breakpoint: 850,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});

/* present
-------------------------------- */
jQuery('.present').each(function() {

    var video = $(this).find('.present__video')[0],
        $button = $(this).find('.present__button'),
        $play = $(this).find('.present__play'),
        $pause = $(this).find('.present__pause'),
        $time = $(this).find('.present__time'),
        sec = 0;

    function conversionTime(sec, f) {
        var h = sec / 3600 ^ 0,
            m = (sec - h * 3600) / 60 ^ 0,
            s = Math.floor(sec - h * 3600 - m * 60);
        if (f == 'm') return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        else if (f == 's') return '' + (s < 10 ? '0' + s : s);
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    video.addEventListener('loadedmetadata', function() {
        sec = video.duration;
        $time.html(conversionTime(sec, 'm'));
    });

    $(this).on('click', function() {
        if (video.paused) {
            video.play();
            $(this).removeClass('present--background_dark');
            $(this).addClass('present--hide-content');
        } else {
            video.pause();
            $(this).addClass('present--background_dark');
            $(this).removeClass('present--hide-content');
            $time.html(conversionTime(sec - video.currentTime, 'm'));
        }
        $button.removeClass('present__button--dissolve');
        setTimeout(function() {
            $button.addClass('present__button--dissolve');
        }, 100);
        setTimeout(function() {
            $play.toggleClass('present__play--show');
            $pause.toggleClass('present__pause--show');
        }, 500);
    }).one('click', function() {
        $(this).addClass('present--background_none');
    });
});

/* search
-------------------------------- */
jQuery('.search').each(function() {

    var $submit = $(this).find('.search__submit'),
        $close = $(this).find('.search__close'),
        $query = $(this).find('.search__query'),
        $case = $(this).find('.search__case'),
        $icon = $(this).find('.search__icon');

    $submit.on('click', function() {
        if (!$(this).is('.search__submit--active')) {
            $(this).addClass('search__submit--active');
            $case.addClass('search__case--open');
            $icon.addClass('search__icon--small');
            $query.focus();
            return false;
        }
        if (!$query.val().length) {
            $(this).addClass('search__submit--error');
            $query.focus();
        }
    });

    $close.on('click', function() {
        $submit.removeClass('search__submit--active search__submit--error');
        $case.removeClass('search__case--open');
        $icon.removeClass('search__icon--small');
    });

    $query.on('click input', function() {
        $submit.removeClass('search__submit--error');
    }).on('keydown', function(e) {
        if (e.which == 27) {
            $close.click();
            return false;
        }
    });
});

/* toolbar
-------------------------------- */
jQuery('.toolbar').each(function() {

    var $container = $(this).find('.toolbar__container'),
        $item = $(this).find('.toolbar__item'),
        $block = $(this).find('.toolbar__block'),
        viewbox = $(this).find('.toolbar__link-view').viewbox();

    $('.page').on('keydown', function(e) {
        if (e.which == 27) {
            viewbox.trigger('viewbox.close');
        }
    });

    $item.on('click', function() {
        var item = $(this);
        $container.load('ajax/toolbar/' + $(this).data('page') + '.html', function(data, status) {
            if (status == 'success') {
                viewbox = $(this).find('.toolbar__link-view').viewbox();
                $item.removeClass('toolbar__item--active');
                item.addClass('toolbar__item--active');
                $block.remove();
            }
        });
        return false;
    });
});