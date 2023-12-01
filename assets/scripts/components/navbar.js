import { debounce } from '../utils/debounce';

// Navbar Dropdown Hover
const dropdowns = document.querySelectorAll('li.dropdown');

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('mouseenter', function (e) {
        if (window.innerWidth > 992) {
            e.stopPropagation();

            const showDropdown = function () {
                dropdown.classList.add('show');
                dropdown.querySelector('.dropdown-menu').classList.add('show');
            };

            setTimeout(showDropdown, 160);
        }
    });

    dropdown.addEventListener('mouseleave', function (e) {
        if (window.innerWidth > 992) {
            e.stopPropagation();
            const hideDropdown = function () {
                dropdown.querySelector('.dropdown-menu').classList.remove('show');
                dropdown.classList.remove('show');
            };
            const timer = setTimeout(hideDropdown, 160);

            dropdown.querySelector('.dropdown-menu').addEventListener('mouseenter', function () {
                if (timer) {
                    clearTimeout(timer);
                }
            });
        }
    });
});

function handleNavClasses() {
    const mainNavWrapper = document.querySelector('.main-nav-wrapper');
    const nav = document.querySelector('nav'); // legacy nav
    const yAxisScrollLocation = window.scrollY;

    // Adds main-nav-scrolled class to the main-nav-wrapper when scrolling
    if (mainNavWrapper) {
        if (yAxisScrollLocation > 30) {
            mainNavWrapper.classList.add('main-nav-scrolled');
        } else {
            mainNavWrapper.classList.remove('main-nav-scrolled');
        }
    }

    // Adds nav-scrolled class to the first <nav> element on a page when scrolling
    if (nav) {
        if (yAxisScrollLocation > 30) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
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
    debounce(handleNavClasses(), 100);
    debounce(mainNavHandle(), 100);
});
window.addEventListener('load', () => {
    handleNavClasses();
    mainNavHandle();
});
window.addEventListener('resize', () => {
    debounce(handleNavClasses(), 100);
    debounce(mainNavHandle(), 100);
});
