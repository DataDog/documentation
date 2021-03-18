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

$('.toggle-version-tab').click(function() {
    const url = $(this).attr('href');
    const el = $(`a[href="${url}"]`);
    if(el) {
      el.tab('show');
    }
    return false;
});

// toggle version from nav
$('a[data-version^="v"]').click(function() {
    const version = $(this).attr('data-version');
    const href = $(this).attr('href');
    const url = `${href}-${version}`;
    const el = $(`a[href="${url}"]`);
    if(el) {
      el.tab('show');
    }
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
