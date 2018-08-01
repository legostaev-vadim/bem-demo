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
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    autoplay: false,
                    arrows: false
                }
            }
        ]
    });

});
