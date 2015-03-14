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

            // Highlight the active button.
            $('.lang-btn').removeClass('active');
            el.addClass('active');

            // Show this language's code blocks and language-specific elements
            var lang = el.attr('lang');
            $('.code-block').hide();
            $('.code-block-' + lang).fadeIn();
            $('.lang-specific').hide();
            $('.lang-specific-' + lang).fadeIn();
        });

        // Compensate for the fixed header when clicking API section links.
        $('.api-section-links a').click(function (event) {
            event.preventDefault();

            var link = $(this);

            var target = $(link.attr('href'));
            var offset = $('.floating-header').height();

            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 0);
        });
    };

    // Export to global scope.
    window.DD_docs = DD_docs;

    var language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)
    var noOverride = window.location.href.indexOf("overridelang") == -1;
    if (noOverride) {
        if (language.indexOf('ja') > -1 && window.location.pathname.indexOf('/ja/') != 0) {
            document.location.href = '/ja' + window.location.pathname;
        } else if (language.indexOf('ja') == -1 && window.location.pathname.indexOf('/ja/') == 0) {
            document.location.href = window.location.pathname.substring(3);
        }
    }


})();


$(document).ready(function() {
     $('#tipue_search_input').tipuesearch();
});

