import { moveToAnchor } from '../helpers/moveToAnchor';

const largeScreenThreshold = 1710;
var sidenavMapping = [];
var apiNavMapping = [];


if (!$('#TableOfContents ul').length) {
    $('.mobile-toc-toggle').addClass('d-none');
    $('.toc-container').addClass('d-none');
}

// when the page loads, checking the window width
widthCheck();
tocWidthUpdate();

if(innerWidth > largeScreenThreshold && window.scrollY < 60){
    $('.toc').css('top', 189);
    $('.mobile-toc-toggle').css('top', 189);
}else if(innerWidth > largeScreenThreshold && window.scrollY > 60){
    $('.toc').css('top', 124.5);
    $('.mobile-toc-toggle').css('top', 124.5);
}

$(window).on('resize scroll', function(e) {
    var header_h = $('body > header').height();
    var top = $('#TableOfContents').position() ? $('#TableOfContents').position().top : 0;
    var offset = header_h + top;
    $('.toc').css('maxHeight', document.documentElement.clientHeight - offset);
});

$(window).on('resize', function() {
    widthCheck();
    tocWidthUpdate();
});

$(window).on('resize scroll', function(e) {
    onScroll();
    if($(window).width() > 530 && $(window).width() < largeScreenThreshold) {
        var bottomOfBrowser = parseInt($(document).scrollTop()) + parseInt($(window).height());
        var footerTop = $('body > footer').offset().top;
        if (!$('.mobile-toc-toggle').hasClass('js-disable-toc')) {
            if ($('#TableOfContents ul').length) {
                if(bottomOfBrowser >= footerTop) {
                    if(!$('.mobile-toc-toggle').hasClass('d-none')) {
                        $('.mobile-toc-toggle').toggleClass('d-none');
                    }
                    if(!$('.toc-container').hasClass('d-none')) {
                        $('.mobile-toc-toggle').click();
                    }
                } else {
                    if($('.mobile-toc-toggle').hasClass('d-none')) {
                        $('.mobile-toc-toggle').toggleClass('d-none');
                    }
                }
            }
        } else {
            $('.mobile-toc-toggle').addClass('d-none');
            $('.toc-container').addClass('d-none');
        }
    }
}).trigger('scroll');

$(document).on( "headerResize", function( event, height) {
    var offset = 30;
    if($('.announcement_banner.open').length) {
        offset = 60;
    }
    $('.mobile-toc-toggle').css('top', height + offset + 'px');
    $('.toc').css('top', height + offset + 'px');
});

export function hideToc(){
    // hide toc
    $('.toc-container > div').hide();

    // hide mobile toc button
    $('.mobile-toc-toggle').removeClass('d-block').addClass('d-none');
}

// hiding + displaying the ToC depending on the window width
export function widthCheck(){
    if (!$('.toc-container').hasClass('js-disable-toc')) {
        if ($('#TableOfContents ul').length) {
            if(innerWidth > largeScreenThreshold){
                if($('.toc-container').hasClass('d-none') && $('.mobile-toc-toggle i').hasClass('icon-small-bookmark')){
                    $('.toc-container').toggleClass('mobile-open').toggleClass('d-none');
                    $('.mobile-toc-toggle i').toggleClass('icon-small-x').toggleClass('icon-small-bookmark');
                }
            }else{
                if($('.toc-container').hasClass('mobile-open') && $('.mobile-toc-toggle i').hasClass('icon-small-x')){
                    $('.toc-container').toggleClass('mobile-open').toggleClass('d-none');
                    $('.mobile-toc-toggle i').toggleClass('icon-small-x').toggleClass('icon-small-bookmark');
                }
            }
        }

    } else {
        $('.mobile-toc-toggle').addClass('d-none');
    }

}

// updating ToC width on large screens
export function tocWidthUpdate(){
    if(innerWidth > largeScreenThreshold){
        $('.toc-container.mobile-open').css("width", (innerWidth/2)-600 + "px");
    }
}

// -------------- end TOC ---------------

export function showTOCIcon(){
    // $('.toc-container').addClass('mobile-open').removeClass('d-none');
    $('.mobile-toc-toggle').removeClass('d-none');
    $(this).find('i').addClass('icon-small-x').removeClass('icon-small-bookmark');
    $( document ).trigger( "headerResize", [ parseInt($('body > header').height()) ] );
}

export function updateTOC(){

    $('.toc').css('display', 'block');
    $('#TableOfContents a').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1), true);
            return false;
        }
    });

}

export function buildTOCMap() {
    sidenavMapping = [];
    var link = null;
    $('#TableOfContents ul a').each(function() {
        var href = $(this).attr('href');
        var id = href.replace('#', '').replace(' ','-');
        var header = $('[id="'+id+'"]');
        var navParentLinks = $(this).parents('#TableOfContents').find('ul > li').has($(this)).find('> a');

        if(header.length) {
            if(header.is('h2') || header.is('h3')) {
                sidenavMapping.push({
                    'navLink': $(this),
                    'navLinkPrev': link,
                    'navParentLinks': navParentLinks,
                    'id': id,
                    'header': header,
                    'isH2': header.is('h2'),
                    'isH3': header.is('h3')
                });
            }
        }
        link = $(this);
    });
}

export function buildAPIMap() {
    apiNavMapping = [];
    var link = null;
    $('.sidenav-api ul a').each(function() {
        var href = $(this).attr('href');
        var id = href.replace('#', '').replace(' ','-');
        var header = $('[id="'+id+'"]');
        var navParentLinks = $(this).parents('.sidenav-api').find('ul > li').has($(this)).find('> a');

        if(header.length) {
            if(header.is('h2') || header.is('h3')) {
                apiNavMapping.push({
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

export function onScroll() {
    var winTop = $(window).scrollTop();
    var localOffset = 120;

    if($(window).scrollTop() + $(window).height() === $(document).height()) {
        // we are at the bottom of the screen  just highlight the last item
    } else {
        $('.toc_open').removeClass('toc_open');

        // tocMapping
        for(var i = 0; i < sidenavMapping.length; i++) {
            var obj = sidenavMapping[i];
            var j = i+1;
            if(j > sidenavMapping.length) { j = 0; }
            var nextobj = sidenavMapping[j];
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

        // apiMapping
        for(var i = 0; i < apiNavMapping.length; i++) {
            var obj = apiNavMapping[i];
            var j = i+1;
            if(j > apiNavMapping.length) { j = 0; }
            var nextobj = apiNavMapping[j];
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