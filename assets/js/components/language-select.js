const footerLangTrigger = document.querySelector('.js-footer-lang-toggle');
const landPopup = document.querySelector('.js-lang-popup');

// close popup when click outsite popup
document.querySelector('body').addEventListener('click', function () {
    if (!landPopup.classList.contains('d-none')) {
        footerLangTrigger.classList.remove('show');
    }
});

footerLangTrigger.addEventListener('click', function (event) {
    event.stopPropagation();
    this.classList.toggle('show');
});
