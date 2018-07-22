/* search
-------------------------------- */
(function($) {
    
    const $submit = $('.search__submit'),
        $close = $('.search__close'),
        $query = $('.search__query');
        
    $submit.on('click', function() {
        let $search = $(this).closest('.search'),
            $query = $search.find('.search__query');
        if(!$(this).is('.search__submit--active')) {
            $(this).addClass('search__submit--active');
            $search.find('.search__mask').addClass('search__mask--open');
            $search.find('.search__symbol').addClass('search__symbol--small');
            $query.focus();
            return false;
        }
        if(!$query.val().length) {
            $(this).addClass('search__submit--error');
            $query.focus();
        }
    });

    $close.on('click', function() {
        let $search = $(this).closest('.search');
        $search.find('.search__submit').removeClass('search__submit--active search__submit--error');
        $search.find('.search__mask').removeClass('search__mask--open');
        $search.find('.search__symbol').removeClass('search__symbol--small');
    });

    $query.on('click input', function() {
        $(this).closest('.search').find('.search__submit').removeClass('search__submit--error');
    }).on('keydown', function(e) {
        if(e.which == 27) {
            $(this).closest('.search').find('.search__close').click();
        }
    });
    
})(jQuery);
