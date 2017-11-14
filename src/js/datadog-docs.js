$(document).ready(function () {

    // bring back size() for jquery pajinate
    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    $('table').each(function() {
        $(this).addClass('table-responsive-sm');
    });

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

            // Highlight the active button.
            $('.lang-btn').removeClass('active');
            el.addClass('active');

            // Show this language's code blocks and language-specific elements
            var lang = el.data('lang');
            code_blocks.hide();
            $('.code-block-' + lang).fadeIn();
            lang_blocks.hide();
            $('.lang-specific-' + lang).fadeIn();

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
    }

    // algolia
    if (window.location.href.indexOf('/search/') > -1) {

        var client = algoliasearch("EOIG7V0A2O", 'bf60de88836cb62a73509ef075542065');
        var results = new RegExp('[\?&]' + "s" + '=([^&#]*)').exec(window.location.href);
        var $pagination = $('#tipue_search_content');
        var query = "";
        try {query = results[1];} catch (e) {}

        // get results from algolia
        client.search([{
            indexName: 'docs_english',
            query: decodeURIComponent(query),
            params: {
                hitsPerPage: 200,
                attributesToRetrieve: "*"
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
                            '<a href="' + hit["URL"] + '">' + hit["title"] + '</a></div>';
                        formatted_results += '<div class="tipue_search_content_url">' +
                            '<a href="' + hit["URL"] + '">' + hit["URL"].replace('https://docs.datadoghq.com', '') + '</a></div>';
                        var text = hit.page_description;
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
                            formatted_results += '<div class="hit">';
                            formatted_results += '<div class="tipue_search_content_title">' +
                                '<a href="' + hits[i]["URL"] + '">' + hits[i]["title"] + '</a></div>';
                            formatted_results += '<div class="tipue_search_content_url">' +
                                '<a href="' + hits[i]["URL"] + '">' + hits[i]["URL"].replace('https://docs.datadoghq.com', '') + '</a></div>';
                            var text = hits[i].page_description;
                            formatted_results += '<div class="tipue_search_content_text">' +
                                text + '</div>';
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
                    // set first page
                    changePage(1);
                }

            }
        });
    }


    // slide to anchors
    function moveToAnchor(id, animate, amount) {
        if (animate === undefined) {
            animate = true;
        }
        if (amount === undefined) {
            // calc from objects instead
            if($(window).width() <= 991) {
                amount = 183; //at mobile
            } else {
                amount = 64; //at desktop
            }
        }
        var href = '#'+id;
        var htag = $(href);
        var customPadding = 10; // how much till it looks good with eye
        var offset = amount + customPadding;
        var url = window.location.href.replace(window.location.hash, '');
        var newSt = htag.offset().top - offset;
        if(htag.length) {
            if($("html, body").scrollTop() !== newSt)
            {
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

    // docs on mobile dropdown trigger move to anchor
    $('.api-nav .dropdown-menu .dropdown-item').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1));
            return false;
        }
    });

    //
    $('#TableOfContents a, .sidenav-api a').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            moveToAnchor(href.substr(1));
            return false;
        }
    });

    // make header tags with ids and make clickable as anchors
    $('.main h2[id], .main h3[id], .main h4[id], .main h5[id]').each(function() {
        var id = $(this).attr('id');
        $(this).wrapInner('<a href="#'+id+'"></a>').on('click', function(e) {
            moveToAnchor(id);
            return false;
        });
    });

    // sticky polyfill trigger
    var elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);
});