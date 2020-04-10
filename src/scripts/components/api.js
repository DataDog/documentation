const codeBlocks = document.querySelectorAll('.js-code-block');
const codeLangSelects = document.querySelectorAll('.js-code-lang-select');
const versionSelect = document.querySelector('.js-api-version-select');

if (codeLangSelects) {
    codeLangSelects.forEach((codeLangSelect) => {
        codeLangSelect.addEventListener('change', codeLangSelectHandler);
    });
}

if (versionSelect) {
    versionSelect.addEventListener('change', versionSelectHandler);
}

function versionSelectHandler(event) {
    let previewPath = '';

    if (window.location.href.includes('docs-staging')) {
        previewPath = window.location.pathname.split('/').slice(0, 3).join('/');
    }

    if (event.target.value === 'v2') {
        window.location = `${window.location.origin + previewPath}/api/v2`;
    } else if (event.target.value === 'v1') {
        window.location = `${window.location.origin + previewPath}/api/v1`;
    }
}

function codeLangSelectHandler(event) {
    // get current position of element in order to keep the scroll position after the size of a code block changes
    const $this = $(this);
    const $document = $(document);
    const currentOffset = $this.offset().top - $document.scrollTop();

    // toggle the different code block
    toggleCodeBlocks(event.target.value);

    // set value of select dropdown to selected value
    codeLangSelects.forEach((codeLangSelect) => {
        codeLangSelect.value = event.target.value;
    });

    // set scroll position so the page doesn't jump when a code lang is changed.
    $document.scrollTop($this.offset().top - currentOffset);
}

function toggleCodeBlocks(activeLang) {
    codeBlocks.forEach((codeBlock) => {
        codeBlock.classList.remove('d-block');
        codeBlock.classList.add('d-none');
    });
    const activeLangBlocks = document.querySelectorAll(
        `.code-block-${activeLang}`
    );
    activeLangBlocks.forEach((activeLangBlock) => {
        activeLangBlock.classList.add('d-block');
    });
}

$('.js-expand-all').click(function () {
    $(this).toggleClass('expanded');
    const schemaTable = $(this).closest('.schema-table');
    schemaTable.find('.isNested').toggleClass('d-none');
    schemaTable.find('.toggle-arrow').toggleClass('expanded');
    if ($(this).hasClass('expanded')) $(this).text('Collapse All');
    else $(this).text('Expand All');
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
