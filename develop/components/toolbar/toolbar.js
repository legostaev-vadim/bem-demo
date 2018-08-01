/* toolbar
-------------------------------- */
jQuery('.toolbar').each(function() {

    let $container = $(this).find('.toolbar__container'),
        $item = $(this).find('.toolbar__item'),
        $block = $(this).find('.toolbar__block'),
        viewbox = $(this).find('.toolbar__link-view').viewbox();
    
    $('.page').on('keydown', function(e) {
        if(e.which == 27) {
            viewbox.trigger('viewbox.close');
        }
    });

    $item.on('click', function() {
        let item = $(this);
        $container.load('ajax/toolbar/' + $(this).data('page') + '.html', function(data, status) {
            if(status == 'success') {
                viewbox = $(this).find('.toolbar__link-view').viewbox();
                $item.removeClass('toolbar__item--active');
                item.addClass('toolbar__item--active');
                $block.remove();
            }
        });
        return false;
    });
    
});
