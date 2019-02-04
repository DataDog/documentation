$(document).ready(function () {

    function hideToc()
    {
        // hide toc
        $('.toc-container > div').hide();

        // hide mobile toc button
        $('.mobile-toc-toggle').removeClass('d-block').addClass('d-none');
    }

    if($('#TableOfContents ul').length) {
        // when page ready collect mapping of link to headers so we aren't checking the dom all the time
        var mapping = [];

        function buildMap() {
            mapping = [];
            var link = null;
            $('#TableOfContents ul a').each(function() {
                var href = $(this).attr('href');
                var id = href.replace('#', '').replace(' ','-');
                var header = $('[id="'+id+'"]');
                var navParentLinks = $(this).parents('#TableOfContents').find('ul > li').has($(this)).find('> a');

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
                }
                link = $(this);
            });
        }

        function onScroll() {
            var winTop = $(window).scrollTop();
            var localOffset = 120;

            if($(window).scrollTop() + $(window).height() === $(document).height()) {
                // we are at the bottom of the screen  just highlight the last item we can
                $('.toc_open').removeClass('toc_open');
                $('.toc_scrolled').removeClass('toc_scrolled');
                var obj = mapping[mapping.length-1];
                if(obj) {
                    if(obj.isH3) {
                        obj.navParentLinks.each(function() {
                            var href = $(this).attr('href');
                            var id = href.replace('#', '').replace(' ','-');
                            var header = $('[id="'+id+'"]');
                            if(header.is('h2')) {
                                $(this).addClass('toc_open');
                            }
                        });
                        obj.navLink.parent().addClass('toc_scrolled');
                    }
                    if(obj.isH2) {
                        obj.navLink.parent().addClass('toc_scrolled');
                    }
                }
            } else {
                $('.toc_open').removeClass('toc_open');
                for(var i = 0; i < mapping.length; i++) {
                    var obj = mapping[i];
                    var j = i+1;
                    if(j > mapping.length) { j = 0; }
                    var nextobj = mapping[j];
                    obj.navLink.parent().removeClass('toc_scrolled');

                    if( (winTop >= obj.header.offset().top - localOffset) && (typeof(nextobj) === 'undefined' || winTop < nextobj.header.offset().top - localOffset) ) {
                        obj.navLink.parent().addClass('toc_scrolled');
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

        $('.mobile-toc-toggle').on('click touch', function () {
            var icon = $(this).find('i');
            var open = icon.hasClass('icon-small-x');
            if(open) {
                $('.toc-container').toggleClass('mobile-open').toggleClass('d-none');
            } else {
                $('.toc-container').toggleClass('mobile-open').toggleClass('d-none');
            }
            $(this).find('i').toggleClass('icon-small-x').toggleClass('icon-small-bookmark');
            $( document ).trigger( "headerResize", [ parseInt($('body > header').height()) ] );
        });

        $(document).on( "moveToAnchor", function() {
            var open = $('.mobile-toc-toggle i').hasClass('icon-small-x');
            if(open) {
                //$('.mobile-toc-toggle').click();
            }
        });

        $(window).on('resize scroll', function(e) {
            onScroll();
            if($(window).width() > 530 && $(window).width() < 1720) {
                var bottomOfBrowser = parseInt($(document).scrollTop()) + parseInt($(window).height());
                var footerTop = $('body > footer').offset().top;
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
        }).trigger('scroll');

        $(document).on( "headerResize", function( event, height) {
            var offset = 30;
            if($('.announcement_banner.open').length) {
                offset = 60;
            }
            $('.mobile-toc-toggle').css('top', height + offset + 'px');
            $('.toc').css('top', height + offset + 'px');
        });

        buildMap();
        onScroll();
    } else {
        hideToc();
    }

    // Setup for large screen ToC
    var largeScreenThreshold = 1710;

    // hiding + displaying the ToC depending on the window width
    function widthCheck(){
        // if ToC elements exist
        if($('#TableOfContents ul').length) {
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
    }

    // updating ToC width on large screens
    function tocWidthUpdate(){
        if(innerWidth > largeScreenThreshold){
            $('.toc-container.mobile-open').css("width", (innerWidth/2)-620 + "px");
        }
    }

    // when the page loads, checking the window width
    widthCheck();
    tocWidthUpdate();
    
    if(innerWidth > largeScreenThreshold && window.scrollY < 60){
        $('.toc').css('top', '189px');
        $('.mobile-toc-toggle').css('top', '189px');
    }else if(innerWidth > largeScreenThreshold && window.scrollY > 60){
        $('.toc').css('top', '124.5px');
        $('.mobile-toc-toggle').css('top', '124.5px');
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
});
