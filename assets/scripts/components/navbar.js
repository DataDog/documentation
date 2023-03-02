import { debounce } from '../utils/debounce';
import { userDeviceIsMobile } from '../helpers/window-resizer';

// Navbar Dropdown Hover
let productMenuOpen = false;

$('li.dropdown').hover(
    function (e) {
        if (!userDeviceIsMobile()) {
            e.stopPropagation();
            // do hover stuff
            $(this).addClass('show');
            $(this).find('.dropdown-menu').addClass('show');
        }
        // Product menu specific script
        if ($(e.target).hasClass('product-menu')) {
            productMenuOpen = false;
        } else if ($(this).hasClass('product-dropdown')) {
            productMenuOpen = true;
        }
        // Product menu specific script
    },
    function (e) {
        if (!userDeviceIsMobile()) {
            e.stopPropagation();
            $('li.dropdown.show .dropdown-menu').removeClass('show');
            $('li.dropdown.show').removeClass('show');
        }

        // Product menu specific script
        if ($(this).hasClass('product-dropdown')) {
            setTimeout(function () {
                productMenuOpen = false;
            }, 100);
        }
        // Product menu specific script
    }
);

// Product menu specific script
$('a.customers-menu').hover(
    function () {
        if (productMenuOpen) {
            $('li.dropdown.product-dropdown').addClass('show');
            $('li.dropdown.product-dropdown').find('.dropdown-menu').addClass('show');
        }
    },
    function () {
        $('li.dropdown.product-dropdown').removeClass('show');
        $('li.dropdown.product-dropdown').find('.dropdown-menu').removeClass('show');
    }
);
// Product menu specific script

// Close mobile menu on click
$('.mobile-close').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
    if (!$('.navbar').hasClass('scrolled')) {
        $('.navbar').addClass('scrolled');
    }
}

function handleNavClasses() {
    const mainNavWrapper = document.querySelector('.main-nav-wrapper');
    const nav = document.querySelector('nav'); // legacy nav
    const yAxisScrollLocation = window.scrollY;

    const windowWidth = $(window).width();
    const st = $(window).scrollTop();
    if (!$('.navbar').hasClass('navbar-small')) {
        if (windowWidth >= 1199) {
            if (!$('body').hasClass('resources')) {
                if (st <= 1) {
                    $('.navbar-custom').removeClass('compressed');
                } else {
                    $('.navbar-custom').addClass('compressed');
                }
            }
        }
    }

    if (mainNavWrapper) {
        if (yAxisScrollLocation > 30) {
            mainNavWrapper.classList.add('main-nav-scrolled');
        } else {
            mainNavWrapper.classList.remove('main-nav-scrolled');
        }
    }

    // legacy nav
    if (nav) {
        if (yAxisScrollLocation > 30) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }

    if (st <= 1) {
        $('.navbar-custom').removeClass('scrolled');
    } else {
        $('.navbar-custom').addClass('scrolled');
    }
}

function setSearchBoxHeight() {
    if ($('.search-box').length) {
        const win = $(window);
        const logo = $('.search-box');
        const setHeight = function () {
            let st = win.scrollTop();

            if (win.width() < 1200) {
                $('.search-box, .search-nav').removeClass('compressed');
                logo.css({ maxHeight: '' });
                $('.search-nav').css({ maxHeight: '' });
            } else {
                if (st < 0) {
                    st = 0;
                }

                if (st === 0) {
                    $('.search-box, .search-nav').removeClass('compressed');
                } else {
                    $('.search-box, .search-nav').addClass('compressed');
                }
            }
        };

        setHeight();

        window.addEventListener('resize', function () {
            debounce(setHeight, 100);
        });

        window.addEventListener('scroll', function () {
            debounce(window.requestAnimationFrame(setHeight), 100);
        });

        // safari is whacked so a min height was set in CSS to ensure proper dimensions of the sticky header
        // (safari calculated it as 36px when it should be 128 and it messed up everything) so this resets that
        $('.search-box, .search-nav').css('minHeight', '18px');
    }
}

// Resize the nav bar when scrolling
function mainNavHandle() {
    const mainNavWrapper = document.querySelector('.main-nav-wrapper');
    const mainNav = document.querySelector('.main-nav');

    if (mainNavWrapper && mainNav) {
        const scrollPositionFromTop = window.scrollY;
        let newMainNavHeight = 0;

        const maxMainNavHeight = 130;

        if (scrollPositionFromTop < maxMainNavHeight / 2) {
            newMainNavHeight = maxMainNavHeight - scrollPositionFromTop;
        } else {
            newMainNavHeight = maxMainNavHeight / 2;
        }

        if (window.innerWidth >= 992) {
            mainNav.style.height = `${newMainNavHeight}px`;
        } else {
            mainNav.style.height = '';
        }
    }
}

window.addEventListener('scroll', () => {
  handleNavClasses();
  mainNavHandle();
});
window.addEventListener('load', () => {
  handleNavClasses();
  mainNavHandle();
});
window.addEventListener('resize', () => {
  handleNavClasses();
  mainNavHandle();
});

if (!$('.navbar').hasClass('navbar-small')) {
    setSearchBoxHeight();
}
