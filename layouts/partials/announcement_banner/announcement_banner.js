var announcement_banner;
announcement_banner = sessionStorage.getItem('announcement_banner');

if (announcement_banner !== 'closed') {
document.getElementsByClassName('announcement_banner')[0].classList.add('open');
}