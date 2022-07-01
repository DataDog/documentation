// slide to anchors
export function moveToAnchor(id, animate, amount) {
    if (animate === undefined) {
        animate = true;
    }
    if (amount === undefined) {
        // calc from objects instead
        if($(window).width() <= 991) {
            // at mobile
            amount = 64.5;
            if($('.announcement_banner.open').length) {
                amount += $('.announcement_banner.open').height();
            }
            $('.api-nav > div').each(function() { amount += $(this).height(); });
        } else {
            // at desktop
            amount = 64.5;
            if($('.announcement_banner.open').length) {
                amount += $('.announcement_banner.open').height();
            }
        }
    }
    var href = '#'+id;
    var htag = $(href);
    var customPadding = 10; // how much till it looks good with eye
    var offset = amount + customPadding;
    var url = window.location.href.replace(window.location.hash, '');
    var newSt = 0 - offset;
    var currentSt = $(document).scrollTop();
    if(htag.length) {
        newSt = htag.offset().top - offset;
        if(window.scrollY < 64.5){
            newSt += (64.5 - window.scrollY);
        }
        if(currentSt !== newSt) {
            if(animate) {
                $("html, body").animate({scrollTop: newSt}, 300);
            } else {
                $("html, body").scrollTop(newSt);
            }
            $(document).trigger( "moveToAnchor" );

            window.history.pushState(null, null, url + href);
        }
    }
}