$(document).ready(function () {
    var announcement_banner;
    announcement_banner = sessionStorage.getItem('announcement_banner');

    if (announcement_banner !== 'closed') {
        document.getElementsByClassName('announcement_banner')[0].classList.add('open');
    }

    $('.announcement_banner .icon').on('click', function (e) {
        sessionStorage.setItem('announcement_banner', 'closed');
        $('.announcement_banner').removeClass('open');
        $(window).trigger('scroll');
    });
});