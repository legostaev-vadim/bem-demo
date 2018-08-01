/* counter
-------------------------------- */
jQuery('.counter').each(function() {

    const $text =  $(this).find('.counter__text');

    $(window).on('scroll.counter', function() {
        if ($text.hasClass('animated')) {
            $(this).off('scroll.counter');
            $text.countTo();
        }
    });
    
});
