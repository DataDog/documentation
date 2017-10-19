document.addEventListener('DOMContentLoaded', function () {
    function compress_nav_on_scroll() {
        var width = $(window).width();
        var scrollTop = $(window).scrollTop();
        var logoFs = 85;
        var newLogoFs = 0;
        var newH = 0;
        var el_height = 129;

        if (scrollTop < el_height / 2) {
            newH = el_height - scrollTop;
            if (scrollTop <= 0) {
                newH = el_height;
            }
        } else {
            newH = el_height / 2;
        }

        if(width > 991) {
            $('body > header').css({'height': newH + 'px'});
            $('body > header .mainnav').css({'height': newH + 'px'});

        } else {
            $('body > header').css({'height': ''});
            $('body > header .mainnav').css({'height': ''});
        }

        // Resize logo font on scroll
        if (scrollTop < logoFs / 2) {
            newLogoFs = logoFs - scrollTop;
            if (scrollTop <= 0) {
                newLogoFs = logoFs;
            }
        } else {
            newLogoFs = logoFs / 2;
        }

        if(scrollTop === 0) {
            $('.logo-img').css('height', '');
            $('body > header').removeClass('scrolled');
        } else {
            $('.logo-img').css('height', newLogoFs + 'px');
            $('body > header').addClass('scrolled');
        }
    }

    window.addEventListener('scroll', function() {
        window.requestAnimationFrame(compress_nav_on_scroll);
    });

    // run as soon as dom is ready
    compress_nav_on_scroll();
});