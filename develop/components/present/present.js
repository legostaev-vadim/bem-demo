/* present
-------------------------------- */
jQuery('.present').each(function() {

    let video = $(this).find('.present__video')[0],
        $button = $(this).find('.present__button'),
        $play = $(this).find('.present__play'),
        $pause = $(this).find('.present__pause'),
        $time = $(this).find('.present__time'),
        sec = 0;

    function conversionTime(sec, f) {
        let h = sec / 3600 ^ 0,
            m = (sec - h *3600) / 60 ^ 0,
            s = Math.floor(sec - h * 3600 - m * 60);
        if(f == 'm') return `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
        else if(f == 's') return `${s<10?'0'+s:s}`;
        return `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
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
            $(this).addClass('present--background_dark')
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
