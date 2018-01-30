$(document).ready(function () {
    var announcement_banner;
    announcement_banner = sessionStorage.getItem('announcement_banner');

    if (announcement_banner !== 'closed') {
        document.getElementsByClassName('announcement_banner')[0].classList.add('open');
        $('html').addClass('banner');
    }

    $('.announcement_banner .icon').on('click', function (e) {
        sessionStorage.setItem('announcement_banner', 'closed');
        $('.announcement_banner').removeClass('open');
        $('html').removeClass('banner');
        $(window).trigger('scroll');
    });
});