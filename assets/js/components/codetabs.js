function codeTabs() {
    if ($('.code-tabs').length > 0) {
        // page load set code tab titles
        $('.code-tabs .tab-content')
            .find('.tab-pane')
            .each(function () {
                const navTabsMobile = $(this)
                    .closest('.code-tabs')
                    .find('.nav-tabs-mobile .dropdown-menu');
                const navTabs = $(this).closest('.code-tabs').find('.nav-tabs');
                const title = $(this).attr('title');
                const lang = title.toLowerCase().replace(/\W/g, '');
                navTabs.append(
                    `<li><a href="#" data-lang="${lang}">${title}</a></li>`
                );
                navTabsMobile.append(
                    `<a class="dropdown-item" href="#" data-lang="${lang}">${title}</a>`
                );
            });

        // page load if we have a lang in url activate those tabs, otherwise activate first
        const sPageURL = decodeURIComponent(
            window.location.search.substring(1)
        );
        const sURLVariables = sPageURL.split('&');
        const tab = sURLVariables
            .filter(function (item) {
                return item.split('=')[0] === 'tab';
            })
            .map(function (item) {
                return item.split('=')[1];
            })
            .toString();

        // clicking a tab open them all
        $('.code-tabs .nav-tabs a').click(function (e) {
            e.preventDefault();

            // find all
            const lang = $(this).data('lang');
            $('.code-tabs .nav-tabs').each(function () {
                const navtabs = $(this);
                const links = $(this).find('a:first');
                const langLinks = $(this).find(`a[data-lang="${lang}"]`);
                if (langLinks.length) {
                    langLinks.each(function () {
                        activateTab($(this));
                    });
                } else if (navtabs.find('.active').length === 0) {
                    // set first lang selected if nothing selected
                    links.each(function () {
                        activateTab($(this));
                    });
                }
            });

            const url = window.location.href
                .replace(window.location.hash, '')
                .replace(window.location.search, '');
            window.history.replaceState(
                null,
                null,
                `${url}?tab=${lang}${window.location.hash}`
            );
        });

        // mobile tabs trigger desktop ones
        $('.code-tabs .nav-tabs-mobile .dropdown-menu a').click(function (e) {
            e.preventDefault();
            const ctabs = $(this).parents('.code-tabs');
            const lang = $(this).data('lang');
            const desktopTab = ctabs.find(`.nav-tabs a[data-lang="${lang}"]`);
            if (desktopTab) {
                desktopTab.click();
            }
        });

        // activate language from url or first
        if (tab === '') {
            $('.code-tabs .nav-tabs li:first a').click();
        } else {
            const match = $(`.code-tabs .nav-tabs a[data-lang="${tab}"]:first`);
            if (match.length) {
                match.click();
            } else {
                $('.code-tabs .nav-tabs li:first a').click();
            }
        }
    }
}

function activateTab(el) {
    const tab = el.parent();
    const tabIndex = tab.index();
    const tabPanel = el.closest('.code-tabs');
    const tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
    tabPanel.find('.active').removeClass('active');
    tab.addClass('active');
    tabPane.addClass('active');
    tabPane.addClass('show');
    el.closest('.code-tabs')
        .find('.nav-tabs-mobile .title-dropdown')
        .text(tab.text());
}

export default codeTabs;
