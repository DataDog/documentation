const codeBlocks = document.querySelectorAll('.js-code-block');
const codeLangSelect = document.querySelector('.js-code-lang-select');
const versionSelect = document.querySelector('.js-api-version-select');

if (codeLangSelect) {
    codeLangSelect.addEventListener('change', codeLangSelectHandler);
}

if (versionSelect) {
    versionSelect.addEventListener('change', versionSelectHandler);
}

function versionSelectHandler(event) {
    let previewPath = '';

    if (window.location.href.includes('docs-staging')) {
        previewPath = window.location.pathname
            .split('/')
            .slice(0, 3)
            .join('/');
    }

    if (event.target.value === 'v2') {
        window.location = `${window.location.origin + previewPath}/api/v2`;
    } else if (event.target.value === 'v1') {
        window.location = `${window.location.origin + previewPath}/api/v1`;
    }
}

function codeLangSelectHandler(event) {
    toggleCodeBlocks(event.target.value);
}

function toggleCodeBlocks(activeLang) {
    codeBlocks.forEach(codeBlock => {
        codeBlock.classList.remove('d-block');
        codeBlock.classList.add('d-none');
    });
    const activeLangBlocks = document.querySelectorAll(
        `.code-block-${activeLang}`
    );
    activeLangBlocks.forEach(activeLangBlock => {
        activeLangBlock.classList.add('d-block');
    });
}


$('.js-model-link').click(function (){
    $(this).closest('.tab-content').find('.js-example-link').removeClass('active')
    $(this).closest('.tab-content').find('.js-model-link').addClass('active')
    $(this).closest('.tab-content').find('.js-tab-example').removeClass('active');
    $(this).closest('.tab-content').find('.js-tab-model').addClass('active');
})

$('.js-example-link').click(function (){
    $(this).closest('.tab-content').find('.js-model-link').removeClass('active')
    $(this).closest('.tab-content').find('.js-example-link').addClass('active')
    $(this).closest('.tab-content').find('.js-tab-model').removeClass('active');
    $(this).closest('.tab-content').find('.js-tab-example').addClass('active');
})
