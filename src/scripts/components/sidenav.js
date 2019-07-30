// when page ready collect mapping of link to headers so we aren't checking the dom all the time
var mapping = [];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function buildMap() {
    mapping = [];
    var link = null;
    $('.sidenav-api ul a').each(function() {
        var href = $(this).attr('href');
        var id = href.replace('#', '').replace(' ','-');
        var header = $('[id="'+id+'"]');
        var navParentLinks = $(this).parents('.sidenav-api').find('ul > li').has($(this)).find('> a');

        if(header.length) {
            if(header.is('h2') || header.is('h3')) {
                mapping.push({
                    'navLink': $(this),
                    'navLinkPrev': link,
                    'navParentLinks': navParentLinks,
                    'id': id,
                    'header': header,
                    'isH2': header.is('h2'),
                    'isH3': header.is('h3')
                });
            }
        } else {
            //console.log('could not find h2[id="'+id+'"]');
        }
        link = $(this);
    });
}

function onScroll() {
    var winTop = $(window).scrollTop();
    var localOffset = 120;

    if($(window).scrollTop() + $(window).height() === $(document).height()) {
        // we are at the bottom of the screen  just highlight the last item
    } else {
        $('.toc_open').removeClass('toc_open');
        for(var i = 0; i < mapping.length; i++) {
            var obj = mapping[i];
            var j = i+1;
            if(j > mapping.length) { j = 0; }
            var nextobj = mapping[j];
            obj.navLink.removeClass('toc_scrolled');

            if( (winTop >= obj.header.offset().top - localOffset) && (typeof(nextobj) === 'undefined' || winTop < nextobj.header.offset().top - localOffset) ) {
                obj.navLink.addClass('toc_scrolled');
                // add toc open to parents of this toc_scrolled
                obj.navParentLinks.each(function() {
                    var href = $(this).attr('href');
                    var id = href.replace('#', '').replace(' ','-');
                    var header = $('[id="'+id+'"]');
                    if(header.is('h2')) {
                        $(this).addClass('toc_open');
                    }
                });
            }
        }
    }
}

$(document).ready(function () {

    var searchParam = getParameterByName('s');
    if(searchParam) {
        $('.sidenav-search input[name="s"]').val(searchParam);
    }

    if($('.sidenav-api').length) {
        $(window).on('resize scroll', function(e) {
            onScroll();
        }).trigger('scroll');

        $(".sidenav-api ul").each(function() {
            if($(this).children().length === 0) {
                $(this).remove();
            }
        });

        buildMap();
        onScroll();
    }

    //$('.side').addClass('side-condensed');
    $(window).on('resize scroll', function(e) {
        var header_h = $('body > header').height();
        var footer_h = $('body > footer').height();
        var padding = 105;
        $('.sidenav-nav').css('maxHeight', document.documentElement.clientHeight - header_h - padding);
    });


});