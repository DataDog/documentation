$(document).ready(function () {

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
                $('#tipue_search_content').pajinate({
                    num_page_links_to_display: 9,
                    items_per_page: 7,
                    wrap_around: false,
                    show_first_last: false
                });

            }
        });
    }
});