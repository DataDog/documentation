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
})();
