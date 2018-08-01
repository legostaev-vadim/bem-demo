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
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

});
