(function () {

    var DD_docs = {};

    DD_docs.metricsGuidePage = function () {
        $('.lang-tab').click(function (e) {
            var el = $(this);
            var lang = el.attr('lang');
            $('.' + lang + '-lang-tab').tab('show');
        });
    };

    DD_docs.apiPage = function () {

        // When language buttons are clicked, show all the code snippets
        // from that language.
        $('.lang-btn').click(function (e) {
            var el = $(this);

            // Find the element currently in the view port
            var scrollElement;
            $('div.int-anchor').each( function() {
              if ($(this).offset().top >= window.scrollY) {
                scrollElement = $(this);
                return false;
              }
            });

            // Highlight the active button.
            $('.lang-btn').removeClass('active');
            el.addClass('active');

            // Show this language's code blocks and language-specific elements
            var lang = el.attr('lang');
            $('.code-block').hide();
            $('.code-block-' + lang).fadeIn();
            $('.lang-specific').hide();
            $('.lang-specific-' + lang).fadeIn();

            // Scroll to the element that was in the viewport (ie retain location).
            $('html, body').scrollTop(scrollElement.offset().top);

            // Add the language selection to the current URL.
            if (history.pushState) {
                url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');
                history.pushState(null, null, url + '?lang=' + lang + window.location.hash)
            }
        });

    };

    // Export to global scope.
    window.DD_docs = DD_docs;

    // var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)
    // var noOverride = window.location.href.indexOf("overridelang") == -1;
    // if (noOverride) {
    //     if (language.indexOf('ja') > -1 && window.location.pathname.indexOf('/ja/') != 0) {
    //         document.location.href = '/ja' + window.location.pathname;
    //     } else if (language.indexOf('ja') == -1 && window.location.pathname.indexOf('/ja/') == 0) {
    //         document.location.href = window.location.pathname.substring(3);
    //     }
    // }


})();


$(document).ready(function() {
    $('#tipue_search_input').tipuesearch();
});

// Allow language selection via URL GET parameter.
$(window).load(function() {
    if (s = window.location.search.match(/lang=[^&]+/gi)) {
        lang = s[0].replace(/lang=/gi, '');
        $('div[lang="' + lang + '"]').click();
    }
});

