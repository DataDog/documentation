const handleApiToolbar = () => {
    const banner = document.querySelector('.announcement_banner');
    const toolbar = document.querySelector('.api-toolbar');

    if (!banner.classList.value.includes('open')) {
        if (toolbar) {
            toolbar.style.top = '64px';
        }
    }
}

$(() => {
    handleApiToolbar();

    $('.announcement_banner .icon').on('click', function () {
        sessionStorage.setItem('announcement_banner', 'closed');
        $('.announcement_banner').removeClass('open');
        handleApiToolbar();
        $('html').removeClass('banner');
        $(window).trigger('scroll');
    });
});
