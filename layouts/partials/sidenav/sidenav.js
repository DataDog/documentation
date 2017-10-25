$(document).ready(function () {

    // when page ready collect mapping of link to headers so we aren't checking the dom all the time
    var mapping = [];

    function buildMap() {
        mapping = [];
        var link = null;
        $('.sidenav ul a').each(function() {
            var href = $(this).attr('href');
            var id = href.replace('#', '').replace(' ','-');
            var header = $('[id="'+id+'"]');
            if(header.length) {
                mapping.push({
                    'navLink': $(this),
                    'navLinkPrev': link,
                    'id': id,
                    'header': header,
                    'isH2': header.is('h2'),
                    'isH3': header.is('h3')
                });
            } else {
                //console.log('could not find h2[id="'+id+'"]');
            }
            link = $(this);
        });
    }

    function onScroll() {
        var winTop = $(window).scrollTop();
        var localOffset = 120;
        for(var i = 0; i < mapping.length; i++) {
            var obj = mapping[i];
            var j = i+1;
            if(j > mapping.length) { j = 0; }
            var nextobj = mapping[j];
            //console.log(winTop, obj.headerTop - localOffset, winTop >= obj.headerTop - localOffset);
            obj.navLink.removeClass('toc_scrolled');

            if( (winTop >= obj.header.offset().top - localOffset) && (winTop < nextobj.header.offset().top - localOffset) ) {
                //console.log(obj.navLink);
                obj.navLink.addClass('toc_scrolled');
                obj.navLinkPrev.addClass('toc_open');
            }
        }

        /*$('.sidenav ul li a').each(function() {
            var el = $(this);
            var elTop = el.offset().top;
            var winTop = $(window).scrollTop();
            var localOffset = 120;
            var href = $(this).attr('href').replace('#', '').replace(' ','-');
            var header = $('h2[id="'+href+'"]');
            console.log(href, header);
            if(header.length) {
                var headerTop = header.offset().top;
                if(winTop >= headerTop - localOffset){
                    el.addClass('toc_scrolled').siblings().removeClass('toc_scrolled');
                } else {
                    el.removeClass('toc_scrolled');
                }
            }
        });*/
    }

    $(window).on('resize scroll',function(e) {
        onScroll();
    }).trigger('scroll');


    buildMap();
    onScroll();
});