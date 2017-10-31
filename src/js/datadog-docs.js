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
    // When language buttons are clicked, show all the code snippets
    // from that language.
    $('.lang-btn').on('click', function (e) {
        var el = $(this);

        // Find the element currently in the view port
        var scrollElement;
        $('div.int-anchor').each(function () {
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
        $('.code-block').hide();
        $('.code-block-' + lang).fadeIn();
        $('.lang-specific').hide();
        $('.lang-specific-' + lang).fadeIn();

        // Scroll to the element that was in the viewport (ie retain location).
        if(scrollElement) {
            $('html, body').scrollTop(scrollElement.offset().top);
        }

        // Add the language selection to the current URL.
        if (history.pushState) {
            var url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
            history.pushState(null, null, url + '?lang=' + lang + window.location.hash)
        }

        return false;
    });

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
                    var btn_next = document.getElementById("btn_next");
                    var btn_prev = document.getElementById("btn_prev");
                    var listing_table = document.getElementsByClassName('content')[0];
                    var page_navigation = document.getElementsByClassName('page_navigation')[0];
                    var page_span = document.getElementById("page");

                    function numPages() {
                        return Math.ceil(hits.length / items_per_page);
                    }

                    function prevPage() {
                        if (current_page > 1) {
                            current_page--;
                            changePage(current_page);
                        }
                    }

                    function nextPage() {
                        if (current_page < numPages()) {
                            current_page++;
                            changePage(current_page);
                        }
                    }

                    function setHandlers() {
                        btn_next = document.getElementById("btn_next");
                        btn_prev = document.getElementById("btn_prev");
                        btn_prev.addEventListener('click', function(e) {
                            e.preventDefault();
                            prevPage();
                            return false;
                        });
                        btn_next.addEventListener('click', function(e) {
                            e.preventDefault();
                            nextPage();
                            return false;
                        });
                        var pagebtns = document.getElementsByClassName('page-num');
                        for(var i = 0; i < pagebtns.length; i++) {
                            pagebtns[i].addEventListener('click', function(e) {
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
                            });
                        }
                    }

                    function setNavigation() {
                        var count = Math.min(numPages(), num_page_links_to_display);
                        var html = '';
                        var cls = '';
                        html += '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_prev">Prev</a>';
                        for(var i = 1; i < count+1; i++) {
                            cls = (current_page === i) ? 'active' : '';
                            html += '<a class="mr-1 page-num btn btn-sm-tag btn-outline-secondary '+cls+'" href="#" data-pagenum="'+i+'">'+i+'</a>';
                        }
                        if(count < numPages()) {
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

                        // set previous and next buttons class
                        btn_prev.classList[page === 1 ? 'add' : 'remove']('disabled');
                        btn_next.classList[page === numPages() ? 'add' : 'remove']('disabled');

                        // set active button class
                        var pagebtns = document.getElementsByClassName('page-num');
                        for(var i = 0; i < pagebtns.length; i++) {
                            pagebtns[i].classList[current_page === i+1 ? 'add' : 'remove']('active');
                        }
                    }

                    // set first page
                    setNavigation();
                    changePage(1);
                }

            }
        });
    }

    $('#TableOfContents a, .sidenav-api a').on('click', function(e) {
        var href = $(this).attr('href');
        if(href.substr(0, 1) === '#') {
            var htag = $(''+href);
            var customPadding = 10; // how much till it looks good with eye
            var offset = 64 + customPadding;
            var url = window.location.href.replace(window.location.hash, '');
            if(htag.length) {
                $("html, body").animate({scrollTop: htag.offset().top - offset}, "slow");
                //$("html, body").scrollTop(htag.offset().top - offset);
                window.history.pushState(null, null, url + href);
                return false;
            }
        }
    });
});