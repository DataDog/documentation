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
                // we are at the bottom of the screen  just highlight the last item we can
                $('.toc_open').removeClass('toc_open');
                $('.toc_scrolled').removeClass('toc_scrolled');
                var obj = mapping[mapping.length-1];
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
            } else {
                $('.toc_open').removeClass('toc_open');
                for(var i = 0; i < mapping.length; i++) {
                    var obj = mapping[i];
                    var j = i+1;
                    if(j > mapping.length) { j = 0; }
                    var nextobj = mapping[j];
                    //console.log(winTop, obj.headerTop - localOffset, winTop >= obj.headerTop - localOffset);
                    obj.navLink.parent().removeClass('toc_scrolled');

                    if( (winTop >= obj.header.offset().top - localOffset) && (typeof(nextobj) === 'undefined' || winTop < nextobj.header.offset().top - localOffset) ) {
                        //console.log(obj.navLink);
                        obj.navLink.parent().addClass('toc_scrolled');
                        // add toc open to parents of this toc_scrolled
                        //console.log(obj.navLink.parents('ul'));
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
        });

        $(document).on( "moveToAnchor", function() {
            var open = $('.mobile-toc-toggle i').hasClass('icon-small-x');
            if(open) {
                $('.mobile-toc-toggle').click();
            }
        });

        $(window).on('resize scroll', function(e) {
            onScroll();
            var open = $('.mobile-toc-toggle i').hasClass('icon-small-x');
            if(open && $(window).width() > 991) {
                $('.mobile-toc-toggle').click();
            }
        }).trigger('scroll');


        buildMap();
        onScroll();
    } else {
        hideToc();
    }
});