// MOBILE MENU

const mobileOverlay = document.querySelector('#mobile-nav-bg');
const mobileMenu = document.querySelector('#mobile-nav');
const mobileNavbarTogglers = document.querySelectorAll('.navbar-toggler');

let mobileToggle = false;

function mobileToggleIconToggle(e) {
    e.preventDefault();
    mobileToggle = !mobileToggle;
    mobileOverlay.classList.toggle('mobile-bg-open');
    mobileMenu.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('body-noscroll');
    mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
        mobileNavbarToggler.classList.toggle('open');
    });
}

window.addEventListener('resize', function () {
    const { innerWidth } = window;

    if (mobileMenu && mobileNavbarTogglers.length) {
        if (innerWidth >= 991) {
            mobileOverlay.classList.remove('mobile-bg-open');
            mobileMenu.classList.remove('mobile-menu-open');
            document.body.classList.remove('body-noscroll');
            mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
                mobileNavbarToggler.classList.remove('open');
            });
            mobileMenu.style.right = '-500px';
        }
    }
});

if (mobileNavbarTogglers.length && !document.body.classList.contains('aws-microsite')) {
    mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
        mobileNavbarToggler.addEventListener('click', mobileToggleIconToggle);
    });
}

const announcementBanner = document.querySelector('div.announcement-banner');

if ((announcementBanner && window.getComputedStyle(announcementBanner).getPropertyValue('display') === 'none') || (!announcementBanner)) {
  mobileMenu.style.paddingTop = '65px';
}

/* Open mobile nav 3rd level where possible based off, desktop side nav state */
window.addEventListener('load', () => {
  $('.sidenav-nav-main ul li ul li a.active').each(function(i, el) {
      const ul = $(`#mobile-nav a[href='${$(el).attr('href')}'] + ul.d-none`);
      if(ul) {
        $(ul).removeClass("d-none");
      }
  });
});
