const versionSelect = document.querySelector('.js-api-version-select');

if (versionSelect) {
    versionSelect.addEventListener('change', versionSelectHandler);
}

function versionSelectHandler(event) {
    let previewPath = '';

    if (window.location.href.includes('docs-staging')) {
        previewPath = `/${document.documentElement.dataset.commitRef}`;
    }

    if (event.target.value === 'v2') {
        // check if on main /api page
        if (
            window.location.href ===
            `${window.location.origin + previewPath}/api/`
        ) {
            window.location = `${window.location.origin + previewPath}/api/v2`;
        } else {
            // check if page exists on v2
            fetch(`${window.location.href.replace('api/v1', 'api/v2')}`)
                .then((response) => {
                    // redirect to v2 page
                    if (response.status === 404) {
                        window.location = `${
                            window.location.origin + previewPath
                        }/api/v2`;
                    } else {
                        window.location = `${window.location.href.replace(
                            'api/v1',
                            'api/v2'
                        )}`;
                    }
                })
                .catch((err) => {
                    console.log(err); // eslint-disable-line
                    // redirect to main v2 overview page
                    window.location = `${
                        window.location.origin + previewPath
                    }/api/v2`;
                });
        }
    } else if (event.target.value === 'v1') {
        // check if page exists on v1

        fetch(`${window.location.href.replace('api/v2', 'api/v1')}`)
            .then((response) => {
                // redirect to v2 page
                if (response.status === 404) {
                    window.location = `${
                        window.location.origin + previewPath
                    }/api/v1`;
                } else {
                    window.location = `${window.location.href.replace(
                        'api/v2',
                        'api/v1'
                    )}`;
                }
            })
            .catch((err) => {
                // redirect to main v2 overview page
                console.log(err); // eslint-disable-line
                window.location = `${
                    window.location.origin + previewPath
                }/api/v1`;
            });
    }
}

$('.js-code-example-link').click(function () {
    // get current position of element in order to keep the scroll position after the size of a code block changes
    const $this = $(this);

    const selectedCodeLang = $this.data('codeLang');

    const $document = $(document);
    const currentOffset = $this.offset().top - $document.scrollTop();

    $('.js-code-example-link').each(function () {
        $(this).removeClass('active');

        if ($(this).data('codeLang') === selectedCodeLang) {
            $(this).addClass('active');
        }
    });

    toggleCodeBlocks(selectedCodeLang);

    // set scroll position so the page doesn't jump when a code lang is changed.
    $document.scrollTop($this.offset().top - currentOffset);
});

function toggleCodeBlocks(activeLang) {
    const codeContainers = $('.js-code-snippet-wrapper');

    codeContainers.find('.js-code-block').removeClass('d-block');
    codeContainers.find('.js-code-block').addClass('d-none');

    codeContainers.each(function () {
        if ($(this).find(`.code-block-${activeLang}`).length) {
            $(this).find(`.code-block-${activeLang}`).removeClass('d-none');
            $(this).find(`.code-block-${activeLang}`).addClass('d-block');
        } else {
            // choose default code language (curl)
            $(this).find(`.default`).removeClass('d-none');
            $(this).find(`.default`).addClass('d-block');
            $(this)
                .find('.js-code-example-link[data-code-lang="curl"]')
                .addClass('active');
        }
    });
}

$('.js-expand-all').click(function () {
    $(this).toggleClass('expanded');
    const schemaTable = $(this).closest('.schema-table');

    if ($(this).hasClass('expanded')) {
        $(this).text('Collapse All');
        schemaTable.find('.isNested').removeClass('d-none');
        schemaTable.find('.toggle-arrow').addClass('expanded');
    } else {
        $(this).text('Expand All');
        schemaTable.find('.isNested').addClass('d-none');
        schemaTable.find('.toggle-arrow').removeClass('expanded');
    }
});

$('.js-model-link').click(function () {
    $(this)
        .closest('.tab-content')
        .find('.js-example-link')
        .removeClass('active');
    $(this).closest('.tab-content').find('.js-model-link').addClass('active');
    $(this)
        .closest('.tab-content')
        .find('.js-tab-example')
        .removeClass('active');
    $(this).closest('.tab-content').find('.js-tab-model').addClass('active');
});

$('.js-example-link').click(function () {
    $(this)
        .closest('.tab-content')
        .find('.js-model-link')
        .removeClass('active');
    $(this).closest('.tab-content').find('.js-example-link').addClass('active');
    $(this).closest('.tab-content').find('.js-tab-model').removeClass('active');
    $(this).closest('.tab-content').find('.js-tab-example').addClass('active');
});

$('.hasChildData .js-collapse-trigger').click(function () {
    $(this).closest('.row').siblings('.isNested').toggleClass('d-none');
    $(this).find('.toggle-arrow').toggleClass('expanded');
});

// Scroll the active top level nav item into view below Docs search input
if (document.body.classList.contains('api')) {
    const headerHeight = $('body > header').height();
    const padding = 200;
    $('.sidenav-nav').css(
        'maxHeight',
        document.documentElement.clientHeight - headerHeight - padding
    );

    const apiSideNav = document.querySelector('.sidenav-api .sidenav-nav');
    const sideNavActiveMenuItem = apiSideNav.querySelector('li.active');
    if (sideNavActiveMenuItem) {
        const distanceToTop = sideNavActiveMenuItem.offsetTop;
        apiSideNav.scrollTop = distanceToTop - 100;
    }
}
