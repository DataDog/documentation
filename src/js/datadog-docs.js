$(document).ready(function () {

    // Allow language selection via URL GET parameter
    $(window).load(function () {
        if (s = window.location.search.match(/lang=[^&]+/gi)) {
            lang = s[0].replace(/lang=/gi, '');
            $('div[lang="' + lang + '"]').click();
        }
    });

    // API page
    // When language buttons are clicked, show all the code snippets
    // from that language.
    $('.lang-btn').click(function (e) {
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

});