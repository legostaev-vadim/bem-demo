/* menu
-------------------------------- */
(function($) {

    const $menu = $('.menu'),
        $wrapper = $('.menu__wrapper'),
        $button = $('.menu__button'),
        $logo = $('.menu__logo'),
        $list = $('.menu__list');

    $('.menu__item--active')
        .clone()
        .removeClass('menu__item--active')
        .addClass('menu__item--current')
        .appendTo('.menu__wrapper');

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
        $(this).closest('.menu').toggleClass('menu--open')
            .find('.menu__list').toggleClass('menu__list--scroll');
    });

    $list.on('click', function(e) {
        if(e.target == this) {
            $(this).closest('.menu').find('.menu__button').click();
        }
    });
    
})(jQuery);
