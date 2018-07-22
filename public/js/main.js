'use strict';

/* global
-------------------------------- */
window.svg4everybody();

/* button-up
-------------------------------- */
(function($) {

    var $buttonUp = $('.button-up');

    $(window).scroll(function() {
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
})(jQuery);

/* menu
-------------------------------- */
(function($) {

    var $menu = $('.menu'),
        $wrapper = $('.menu__wrapper'),
        $button = $('.menu__button'),
        $logo = $('.menu__logo'),
        $list = $('.menu__list');

    $('.menu__item--active').clone().removeClass('menu__item--active').addClass('menu__item--current').appendTo('.menu__wrapper');

    $(window).scroll(function() {
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
        $(this).closest('.menu').toggleClass('menu--open').find('.menu__list').toggleClass('menu__list--scroll');
    });

    $list.on('click', function(e) {
        if (e.target == this) {
            $(this).closest('.menu').find('.menu__button').click();
        }
    });
})(jQuery);

/* search
-------------------------------- */
(function($) {

    var $submit = $('.search__submit'),
        $close = $('.search__close'),
        $query = $('.search__query');

    $submit.on('click', function() {
        var $search = $(this).closest('.search'),
            $query = $search.find('.search__query');
        if (!$(this).is('.search__submit--active')) {
            $(this).addClass('search__submit--active');
            $search.find('.search__mask').addClass('search__mask--open');
            $search.find('.search__symbol').addClass('search__symbol--small');
            $query.focus();
            return false;
        }
        if (!$query.val().length) {
            $(this).addClass('search__submit--error');
            $query.focus();
        }
    });

    $close.on('click', function() {
        var $search = $(this).closest('.search');
        $search.find('.search__submit').removeClass('search__submit--active search__submit--error');
        $search.find('.search__mask').removeClass('search__mask--open');
        $search.find('.search__symbol').removeClass('search__symbol--small');
    });

    $query.on('click input', function() {
        $(this).closest('.search').find('.search__submit').removeClass('search__submit--error');
    }).on('keydown', function(e) {
        if (e.which == 27) {
            $(this).closest('.search').find('.search__close').click();
        }
    });
})(jQuery);