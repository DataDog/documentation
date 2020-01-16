const tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');
const tocMobileContainer = document.querySelector('.toc-container-mobile');

if (tocMobileToggle) {
    tocMobileToggle.addEventListener('click', toggleMobileTOC);
}


window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        closeMobileTOC();
    }
});

function closeMobileTOC() {
    tocMobileContainer.classList.remove('mobile-open');
    document
        .querySelector('.js-mobile-toc-bg')
        .classList.remove('mobile-toc-bg-open');
}

function toggleMobileTOC() {
    if (tocMobileContainer) {
        document
            .querySelector('.js-mobile-toc-toggle .icon-small-x-2')
            .classList.toggle('d-none');

        document
            .querySelector('.js-mobile-toc-toggle .icon-small-bookmark')
            .classList.toggle('d-none');

        tocMobileContainer.classList.toggle('mobile-open');
        document
            .querySelector('.js-mobile-toc-bg')
            .classList.toggle('mobile-toc-bg-open');

        document.body.classList.toggle('body-no-scroll');

    }
}
