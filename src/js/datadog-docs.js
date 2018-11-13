$(document).ready(function () {

    // ie
    document.createElement('picture');

    // bring back size() for jquery pajinate
    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    $('.table-responsive-container table').each(function() {
        if(!$(this).hasClass('table-responsive')) {
            $(this).addClass('table-responsive');
        }
    });

    $('table').each(function() {
        var emptyThead = true;
        $(this).find('thead th').each(function() {
            if(!$(this).is(':empty')) {
                emptyThead = false;
            }
        });
        if(emptyThead) {
            $(this).find('thead').remove();
        }
    });

    // algolia
    $('.ds-hint').css('background', 'transparent');
    if (window.location.href.indexOf('/search/') > -1) {

        var client = algoliasearch("EOIG7V0A2O", 'c7ec32b3838892b10610af30d06a4e42');
        var results = new RegExp('[\?&]' + "s" + '=([^&#]*)').exec(window.location.href);
        var $pagination = $('#tipue_search_content');
        var query = "";
        try {query = results[1];} catch (e) {}

        // get indexname by language
        var indexName = "docsearch_docs_prod";

        var lang = 'en';
        if(window.location.pathname.indexOf("/fr/") > -1) {
            lang = "fr";
        }

        function getTitle(hit) {
            var title = '';
            title = hit['hierarchy']['lvl0'];
            if(hit['hierarchy'].hasOwnProperty("lvl1")) {
                if(hit['hierarchy']['lvl1'] !== null)
                    title += ' &raquo; ' + hit['hierarchy']['lvl1'];
            }
            if(hit['hierarchy'].hasOwnProperty("lvl2")) {
                if(hit['hierarchy']['lvl2'] !== null)
                    title += ' &raquo; ' + hit['hierarchy']['lvl2'];
            }
            if(hit['hierarchy'].hasOwnProperty("lvl3")) {
                if(hit['hierarchy']['lvl3'] !== null)
                    title += ' &raquo; ' + hit['hierarchy']['lvl3'];
            }
            return title;
        }

        // get results from algolia
        client.search([{
            indexName: indexName,
            query: decodeURIComponent(query),
            params: {
                hitsPerPage: 200,
                attributesToRetrieve: "*",
                facetFilters: ['language:'+lang]
            }
        }], function (err, results) {
            if (!err) {
                // format and populate results
                $('#tipue_search_input').val(decodeURIComponent(query));
                var hits = results['results'][0]['hits'];
                var formatted_results = "";
                if (hits.length) {
                    $('#tipue_search_content').prepend('<div id="tipue_search_results_count">' + hits.length + ' results</div>');
                    for (var i in hits) {

                        var hit = hits[i];
                        formatted_results += '<div class="hit">';
                        formatted_results += '<div class="tipue_search_content_title">' +
                            '<a href="' + hit["url"] + '">' + getTitle(hit) + '</a></div>';
                        formatted_results += '<div class="tipue_search_content_url">' +
                            '<a href="' + hit["url"] + '">' + hit["url"].replace('https://docs.datadoghq.com', '') + '</a></div>';
                        var text = hit._snippetResult.content.value;
                        formatted_results += '<div class="tipue_search_content_text">' +
                            text + '</div>';
                        formatted_results += '</div>';
                    }
                } else {
                    $('#tipue_search_content').prepend('<div id="tipue_search_results_count">' + hits.length + ' results</div>');
                }
                $('#tipue_search_content .content').html(formatted_results);

                // load pagination
                if (hits.length)
                {
                    var current_page = 1;
                    var num_page_links_to_display = 9;
                    var items_per_page = 7;
                    var page_nums = [];
                    var btn_next = document.getElementById("btn_next");
                    var btn_prev = document.getElementById("btn_prev");
                    var btn_more;
                    var btn_less;
                    var listing_table = document.getElementsByClassName('content')[0];
                    var page_navigation = document.getElementsByClassName('page_navigation')[0];
                    var page_span = document.getElementById("page");

                    function numPages() {
                        return Math.ceil(hits.length / items_per_page);
                    }

                    function initPageNums() {
                        var count = Math.min(numPages(), num_page_links_to_display);
                        page_nums = [];
                        for(var i = 1; i < count+1; i++) {
                            page_nums.push(i);
                        }
                    }

                    function prevPage() {
                        if (current_page > 1) {
                            current_page--;
                            if(current_page < page_nums[0]) {
                                less(null);
                            } else {
                                addHistory(current_page);
                                changePage(current_page);
                            }
                        }
                    }

                    function nextPage() {
                        if (current_page < numPages()) {
                            current_page++;
                            if(current_page > page_nums[page_nums.length-1]) {
                                more(null);
                            } else {
                                addHistory(current_page);
                                changePage(current_page);
                            }
                        }
                    }

                    function less(e) {
                        if(e) e.preventDefault();
                        // get last in range
                        var first = page_nums[0];
                        var last = page_nums[page_nums.length-1];
                        page_nums = [];
                        for(var i = (first-num_page_links_to_display); i < first; i++) {
                            page_nums.push(i);
                        }
                        current_page = page_nums[page_nums.length-1];
                        addHistory(current_page);
                        changePage(current_page);
                        return false;
                    }

                    function more(e) {
                        if(e) e.preventDefault();
                        // get last in range
                        var last = page_nums[page_nums.length-1];
                        // go from next number to num_page_links_to_display or however many are left
                        var remaining_pages = numPages() - last;
                        var count = Math.min(remaining_pages, num_page_links_to_display);
                        page_nums = [];
                        for(var i = last+1; i < last+(count+1); i++) {
                            page_nums.push(i);
                        }
                        current_page = page_nums[0];
                        addHistory(current_page);
                        changePage(current_page);
                        return false;
                    }

                    function cleanHandlers() {
                        if(btn_next) {
                            btn_next.removeEventListener('click', btnHandler)
                        }
                        if(btn_prev) {
                            btn_prev.removeEventListener('click', btnHandler)
                        }
                        var pagebtns = document.getElementsByClassName('page-num');
                        for(var i = 0; i < pagebtns.length; i++) {
                            pagebtns[i].removeEventListener('click', btnHandlerPage);
                        }
                        if(btn_more) {
                            btn_more.removeEventListener('click', more);
                        }
                        if(btn_less) {
                            btn_less.removeEventListener('click', less);
                        }
                    }

                    function btnHandler(e) {
                        e.preventDefault();
                        if(e.target.getAttribute('id') === 'btn_prev') {
                            prevPage();
                        } else if(e.target.getAttribute('id') === 'btn_next') {
                            nextPage();
                        }
                        return false;
                    }

                    function btnHandlerPage(e) {
                        e.preventDefault();
                        var page = parseInt(e.target.getAttribute('data-pagenum'));
                        if (page > numPages()) {
                            page = numPages();
                        } else if(page <= 0) {
                            page = 1;
                        }
                        current_page = page;
                        addHistory(current_page);
                        changePage(current_page);
                        return false;
                    }

                    function setHandlers() {
                        // remove any existing handlers
                        btn_next = document.getElementById("btn_next");
                        btn_prev = document.getElementById("btn_prev");
                        btn_prev.addEventListener('click', btnHandler);
                        btn_next.addEventListener('click', btnHandler);
                        var pagebtns = document.getElementsByClassName('page-num');
                        for(var i = 0; i < pagebtns.length; i++) {
                            pagebtns[i].addEventListener('click', btnHandlerPage);
                        }
                        btn_more = document.getElementsByClassName('more')[0];
                        btn_less = document.getElementsByClassName('less')[0];
                        if(btn_more) {
                            btn_more.addEventListener('click', more);
                        }
                        if(btn_less) {
                            btn_less.addEventListener('click', less);
                        }
                    }

                    function setNavigation() {
                        var html = '';
                        var cls = '';
                        cleanHandlers();
                        html += '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_prev">Prev</a>';
                        if(page_nums[0] > 1) {
                            html += '<a class="mr-1 btn btn-sm-tag btn-outline-secondary less" href="#">...</a>';
                        }
                        for(var i = 0; i < page_nums.length; i++) {
                            cls = (current_page === page_nums[i]) ? 'active' : '';
                            html += '<a class="mr-1 page-num btn btn-sm-tag btn-outline-secondary '+cls+'" href="#" data-pagenum="'+page_nums[i]+'">'+page_nums[i]+'</a>';
                        }
                        if(page_nums[page_nums.length-1] < numPages()) {
                            html += '<a class="mr-1 btn btn-sm-tag btn-outline-secondary more" href="#">...</a>';
                        }
                        html += '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_next">Next</a>';
                        page_navigation.innerHTML = html;
                        setHandlers();
                    }

                    window.onpopstate = function (event) {
                        if (event.state.page) {
                            current_page = event.state.page;
                            changePage(current_page);
                        } 
                    };

                    function addHistory(page) {
                        var pageName = '?s=' + query;
                        if (page !== 1) pageName += '&p=' + page;
                        history.pushState({ page: page }, '', pageName);
                    }

                    function changePage(page)
                    {
                        page_span = document.getElementById("page");

                        // Validate page
                        if (page < 1) page = 1;
                        if (page > numPages()) page = numPages();

                        listing_table.innerHTML = "";

                        // output our slice of formatted results
                        for (var i = (page-1) * items_per_page; i < (page * items_per_page) && i < hits.length; i++) {
                            var formatted_results = '';
                            formatted_results += '<div class="hit row">';
                            formatted_results += '<div class="col-12">';

                            formatted_results += '<div class="tipue_search_content_title">' +
                                '<a href="' + hits[i]["url"] + '">' + getTitle(hits[i]) + '</a></div>';
                            var text = hits[i]._snippetResult.content.value;
                            formatted_results += '<div class="tipue_search_content_text">' +
                                text + '</div>';

                            formatted_results += '</div>';
                            formatted_results += '</div>';
                            listing_table.innerHTML += formatted_results;
                        }
                        if(page_span) {
                            page_span.innerHTML = page + "/" + numPages();
                        }

                        setNavigation();

                        // set previous and next buttons class
                        btn_prev.classList[page === 1 ? 'add' : 'remove']('disabled');
                        btn_next.classList[page === numPages() ? 'add' : 'remove']('disabled');

                        // set active button class
                        var pagebtns = document.getElementsByClassName('page-num');
                        for(var i = 0; i < pagebtns.length; i++) {
                            var page = parseInt(pagebtns[i].getAttribute('data-pagenum'));
                            pagebtns[i].classList[current_page === page ? 'add' : 'remove']('active');
                        }

                        // scroll to top
                        $("html, body").scrollTop(0);
                    }

                    // init page nums
                    initPageNums();

                    // set initial page
                    var searchParams = new URLSearchParams(window.location.search);
                    if (searchParams.get('p') !== null) current_page = parseInt(searchParams.get('p'));
                    history.replaceState({ page: current_page }, '', '');
                    changePage(current_page);
                }

            } else {
                var content = document.getElementsByClassName('content')[0];
                content.innerHTML = "0 results";
            }
        });
    }

    // docs on mobile dropdown trigger move to anchor
    $('.api-nav .dropdown-menu .dropdown-item').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1), false);
            /*var pop = document.getElementById('api-popper')
            if(pop) {
                pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
            }*/
            return false;
        }
    });

    //
    $('#TableOfContents a').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1));
            return false;
        }
    });

    $('.sidenav-api a').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1), false);
            return false;
        }
    });

    // api dropdown select
    $('.api-select').on('change', function(e) {
        var href = $(this).val();
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1), false);
            return false;
        }
    });
    /*if($('.api-nav').length) {
        var ref = document.querySelector('.api-popper-button');
        var pop = document.getElementById('api-popper');
        if(ref && pop) {
            ref.addEventListener('click', function(e) {
                pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
                var p = new Popper(ref, pop, {
                    placement: "start-bottom",
                    modifiers: {
                        preventOverflow: { enabled: false },
                        hide: {
                            enabled: false
                        }
                    }
                });
                return false;
            });
        }
    }*/

    // make header tags with ids and make clickable as anchors
    $('.main h2[id], .main h3[id], .main h4[id], .main h5[id]').each(function() {
        var id = $(this).attr('id');
        $(this).wrapInner('<a href="#'+id+'"></a>').on('click', function(e) {
            moveToAnchor(id);
            return false;
        });
    });

    $('.api-content h2[id]').each(function() {
        var id = $(this).attr('id');
        $(this).wrapInner('<a href="#'+id+'"></a>').on('click', function(e) {
            moveToAnchor(id, false);
            return false;
        });
    });

    // sticky polyfill trigger
    var elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);

    // add targer-blank to external links
    var newLinks = document.getElementsByTagName("a");
    for(i = 0; i < newLinks.length; i++) {
        if(!newLinks[i].href.includes("datadoghq.com") && !newLinks[i].href.includes("localhost:1313")){
            $("a[href='" + newLinks[i].href + "']").attr("target", "_blank");
        }
    }

    if($('.code-tabs').length > 0) {
        // page load set code tab titles
        $('.code-tabs .tab-content').find('.tab-pane').each(function(idx, item) {
          var navTabsMobile = $(this).closest('.code-tabs').find('.nav-tabs-mobile .dropdown-menu');
          var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
              title = $(this).attr('title');
          var lang = title.toLowerCase().replace(/\W/g, '');
          navTabs.append('<li><a href="#" data-lang="'+lang+'">'+title+'</a></li>');
          navTabsMobile.append('<a class="dropdown-item" href="#" data-lang="'+lang+'">'+title+'</a>');
        });

        // page load if we have a lang in url activate those tabs, otherwise activate first
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
        var tab = sURLVariables.filter(function(item) {
           return item.split('=')[0] === 'tab';
        }).map(function(item) {
            return item.split('=')[1];
        }).toString();

        function activateTab(el) {
            var tab = el.parent(),
                 tabIndex = tab.index(),
                 tabPanel = el.closest('.code-tabs'),
                 tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
             tabPanel.find('.active').removeClass('active');
             tab.addClass('active');
             tabPane.addClass('active');
             tabPane.addClass('show');
             el.closest('.code-tabs').find('.nav-tabs-mobile .title-dropdown').text(tab.text());
        }

        // clicking a tab open them all
        $('.code-tabs .nav-tabs a').click(function(e){
          e.preventDefault();

          // prepare
          var currentOffset = $(this).offset().top - $(document).scrollTop();

          // find all
          var lang = $(this).data('lang');
          $('.code-tabs .nav-tabs').each(function() {
             var navtabs = $(this);
             var links = $(this).find('a:first');
             var langLinks = $(this).find('a[data-lang="'+lang+'"]');
             if(langLinks.length) {
                 langLinks.each(function() {
                     activateTab($(this));
                 });
             } else {
                 // set first lang selected if nothing selected
                 if(navtabs.find('.active').length === 0) {
                     links.each(function() {
                         activateTab($(this));
                     });
                 }
             }
          });

          if (history.pushState) {
            var url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
            history.pushState(null, null, url + '?tab=' + lang + window.location.hash)
          }

          // restore
          $(document).scrollTop($(this).offset().top - currentOffset);
        });

        // mobile tabs trigger desktop ones
        $('.code-tabs .nav-tabs-mobile .dropdown-menu a').click(function(e){
            e.preventDefault();
            var ctabs = $(this).parents('.code-tabs');
            var lang = $(this).data('lang');
            var desktopTab = ctabs.find('.nav-tabs a[data-lang="'+lang+'"]');
            if(desktopTab) {
              desktopTab.click();
            }
        });

        // activate language from url or first
        if(tab === '') {
            $('.code-tabs .nav-tabs li:first a').click();
        } else {
            var match = $('.code-tabs .nav-tabs a[data-lang="'+tab+'"]:first');
            if(match.length) {
                match.click();
            } else {
                $('.code-tabs .nav-tabs li:first a').click();
            }
        }
    }

    // slide to anchors
    function moveToAnchor(id, animate, amount) {
        if (animate === undefined) {
            animate = true;
        }
        if (amount === undefined) {
            // calc from objects instead
            if($(window).width() <= 991) {
                // at mobile
                amount = $('body > header').height();
                if($('.announcement_banner.open').length) {
                    amount += $('.announcement_banner.open').height();
                }
                $('.api-nav > div').each(function() { amount += $(this).height(); });
            } else {
                // at desktop
                amount = $('body > header').height();
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
                    $("body, html").scrollTop(newSt);
                }
                $(document).trigger( "moveToAnchor" );
                window.history.pushState(null, null, url + href);
            }
        }
    }

    // API page
    if($('.api').length) {
        // When language buttons are clicked, show all the code snippets
        // from that language.
        var code_blocks = $('.code-block');
        var lang_blocks = $('.lang-specific');
        var hs = $('h2[id]');
        $('.lang-btn').on('click', function (e) {
            var el = $(this);

            // Find the element currently in the view port
            var scrollElement;
            hs.each(function () {
                if ($(this).offset().top >= window.scrollY) {
                    scrollElement = $(this);
                    return false;
                }
            });

            // Show this language's code blocks and language-specific elements
            var lang = el.data('lang');
            code_blocks.hide();
            //$('.code-block-' + lang).fadeIn();
            $('.code-block-' + lang).show();
            lang_blocks.hide();
            //$('.lang-specific-' + lang).fadeIn();
            $('.lang-specific-' + lang).show();

            // Highlight the active button.
            $('.lang-btn').removeClass('active');
            el.addClass('active');

            // Scroll to the element that was in the viewport (ie retain location).
            if(scrollElement) {
                var id = scrollElement.attr('id');
                moveToAnchor(id, false);
            }

            // Add the language selection to the current URL.
            if (history.pushState) {
                var url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
                history.pushState(null, null, url + '?lang=' + lang + window.location.hash)
            }

            return false;
        });
    } else {
        if(window.location.hash) {
            moveToAnchor(window.location.hash.substr(1), false);
        }
    }

    // Hash menu item
    $(".sidenav-nav a").click(function(){
        moveToAnchor($(this).attr('href').substr(1), true);
    });

});
