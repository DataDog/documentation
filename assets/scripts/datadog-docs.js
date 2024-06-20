import configDocs from './config/config-docs';
import { updateMainContentAnchors, gtag } from './helpers/helpers';
import { bodyClassContains } from './helpers/helpers';
import { DOMReady } from './helpers/documentReady';
import { initializeIntegrations } from './components/integrations';
import { initializeGroupedListings } from './components/grouped-item-listings';
import { updateTOC, buildTOCMap, onScroll, closeMobileTOC } from './components/table-of-contents';
import initCodeTabs from './components/codetabs';
import { loadPage } from './components/async-loading';
import { loadInstantSearch } from './components/algolia';
import { setMobileNav, closeMobileNav } from './components/mobile-nav';

const { env } = document.documentElement.dataset;
const { gaTag } = configDocs[env];

// gTag
gtag('js', new Date());
gtag('config', gaTag);

export const setSidenavMaxHeight = () => {
    const headerHeight = document.querySelector('body .main-nav')?.getBoundingClientRect().height;
    const padding = 200;
    const sidenavNav = document.querySelector('.sidenav-nav');

    if (sidenavNav && headerHeight) {
        sidenavNav.style.maxHeight = `${document.documentElement.clientHeight - headerHeight - padding}px`;
    }
};

const scrollActiveNavItemToTop = () => {
    // Scroll the open top level left nav item into view below Docs search input
    if (document.querySelector('.sidenav:not(.sidenav-api)')) {
        setSidenavMaxHeight();

        const leftSideNav = document.querySelector('.sidenav:not(.sidenav-api) .sidenav-nav');
        const sideNavActiveMenuItem = leftSideNav.querySelector('li.open');

        if (sideNavActiveMenuItem) {
            const distanceToTop = sideNavActiveMenuItem.offsetTop;
            leftSideNav.scrollTop = distanceToTop - 110;
        }
    }
};

const doOnLoad = () => {
    window.history.replaceState({}, '', window.location.href);

    const responsiveTableElements = document.querySelectorAll('.table-responsive-container table');

    if (responsiveTableElements.length) {
        responsiveTableElements.forEach((table) => {
            if (!table.classList.contains('table-responsive')) {
                table.classList.add('table-responsive');
            }
            if (!table.closest('.table-scroll')) {
                table.outerHTML = `<div class="table-scroll">${table.outerHTML}</div>`;
            }
        });
    }

    const tableElements = document.querySelectorAll('table');

    if (tableElements.length) {
        tableElements.forEach((table) => {
            let emptyThead = true;
            const tableHeadElements = table.querySelectorAll('thead th');

            if (tableHeadElements.length) {
                tableHeadElements.forEach((head) => {
                    if (head.hasChildNodes) {
                        emptyThead = false;
                    }
                });
            }

            if (emptyThead) {
                for (const el of table.querySelectorAll(':scope thead')) {
                    el.remove();
                }
            }
        });
    }

    // Load algolia instant search for the first time
    loadInstantSearch((asyncLoad = false));

    if (!bodyClassContains('api')) {
        window.addEventListener('scroll', () => {
            setSidenavMaxHeight();
        });

        window.addEventListener('resize', () => {
            setSidenavMaxHeight();
        });
    }

    updateMainContentAnchors();

    // Add target=_blank to external links
    const newLinks = document.getElementsByTagName('a');
    for (let i = 0; i < newLinks.length; i++) {
        if (
            !newLinks[i].href.includes('docs.datadoghq.com') &&
            !newLinks[i].href.includes('docs-staging.datadoghq.com') &&
            !newLinks[i].href.includes('localhost:1313')
        ) {
            newLinks[i].setAttribute('target', '_blank');
        }
    }

    updateTOC();
    buildTOCMap();
    onScroll();

    if (document.querySelector('.js-group-header')) {
        initializeGroupedListings();
    }

    if (bodyClassContains('integrations')) {
        initializeIntegrations();
    }

    if (document.querySelector('.code-tabs')) {
        initCodeTabs();
    }
};

DOMReady(doOnLoad);

function getVisibleParentPath(ancestralEl, path){
    // returns the closest visible parent path
    // of a child path not visible in the left nav (anything more than 4 levels deep)
    
    let el = document.querySelector(`${ancestralEl} [data-path="${path}"][data-skip="false"]`)
    // account for preview branch name in url
    let endIdx = env === 'preview' ? 6 : 4

    while(!el && endIdx){
        path = path.split('/').slice(0,endIdx).join('/')
        el = document.querySelector(`${ancestralEl} [data-path="${path}"]`)
        endIdx -= 1
    }
    return el
}

// Get sidebar
function hasParentLi(el) {
    while (el) {
        if (el.classList) {
            if (el.classList.contains('sidenav-nav-main')) {
                break;
            }

            // Add open class to li if the li has a child ul
            if (el.closest('li') && el.closest('li').querySelectorAll('ul').length !== 0) {
                el.closest('li').classList.add('open');
            }

            if (el.closest('.sub-menu') && el.closest('.sub-menu').previousElementSibling) {
                el.closest('.sub-menu').previousElementSibling.classList.add('active');
            }
        }

        el = el.parentNode;
    }
}

function getPathElement(event = null) {
    let path = window.location.pathname;
    const activeMenus = document.querySelectorAll('.side .sidenav-nav-main .active, header .sidenav-nav-main .active');

    // remove active class from all sidenav links to close all open menus
    for (let i = 0; i < activeMenus.length; i++) {
        activeMenus[i]?.classList.remove('active');
    }

    path = path.replace(/^\//, '');
    path = path.replace(/\/$/, '');

    let sideNavPathElement = getVisibleParentPath('.side',path)
    
    let mobileNavPathElement = document.querySelector(`header [data-path="${path}"]`);

    // Select sidenav/mobile links by data-path attribute to ensure active class is set correctly on specific sub-pages
    if (path.includes('/guide')) {
        const docsActiveSection = path.substr(0, path.indexOf('/guide'));
        const dataPathString = `${docsActiveSection}/guide`;

        sideNavPathElement = document.querySelector(`.side [data-path*="${dataPathString}"]`);
        mobileNavPathElement = document.querySelector(`header [data-path*="${dataPathString}"]`);
    }

    if (path.includes('account_management/billing')) {
        sideNavPathElement = document.querySelector('.side [data-path*="account_management/billing"]');
        mobileNavPathElement = document.querySelector('header [data-path*="account_management/billing"]');
    }

    // if on a detailed integration page then make sure integrations is highlighted in nav
    if (document.getElementsByClassName('integration-labels').length) {
        sideNavPathElement = document.querySelector('.side .nav-top-level > [data-path*="integrations"]');
        mobileNavPathElement = document.querySelector('header .nav-top-level > [data-path*="integrations"]');
    }

    // if security rules section that has links to hashes, #cat-workload-security etc. try and highlight correct sidenav
    if (path.includes('security/default_rules')) {
        const ref = (event ? event.target.href : window.location.hash) || window.location.hash;
        if (ref) {
            sideNavPathElement = document.querySelector(`.side [href*="${ref}"]`);
            mobileNavPathElement = document.querySelector(`header [href*="${ref}"]`);
        }
    }

    if (path.includes('workflows/actions_catalog')) {
        const workflowsEl = document.querySelector('.side .nav-top-level > [data-path*="workflows"]');
        sideNavPathElement = workflowsEl.nextElementSibling.querySelector('[data-path*="workflows/actions_catalog"]');
        mobileNavPathElement = sideNavPathElement;
    }

    if (sideNavPathElement) {
        sideNavPathElement.classList.add('active');
        hasParentLi(sideNavPathElement);
        scrollActiveNavItemToTop();
    }

    if (mobileNavPathElement) {
        mobileNavPathElement.classList.add('active');
        hasParentLi(mobileNavPathElement);
    }
}

// remove open class from li elements and active class from <a> elements
function closeNav() {
    const activeMenus = document.querySelectorAll('.side .sidenav-nav-main .active, header .sidenav-nav-main .active');
    const openMenus = document.querySelectorAll('.side .sidenav-nav-main .open, header .sidenav-nav-main .open');

    for (let i = 0; i < activeMenus.length; i++) {
        activeMenus[i].classList.remove('active');
    }

    for (let i = 0; i < openMenus.length; i++) {
        openMenus[i].classList.remove('open');
    }
}

function updateSidebar(event) {
    closeNav();
    closeMobileNav();
    getPathElement(event);
    setMobileNav();
    const isLi = event.target.nodeName === 'LI';

    if (isLi) {
        if (event.target.querySelector('a')) {
            event.target.querySelector('a').classList.add('active');
        }

        if (event.target.closest('li').querySelector('ul') && event.target.closest('li')) {
            event.target.closest('li').classList.add('open');
        }
    } else if (event.target.matches('#rules .list-group .js-group a.js-page')) {
        // Condition to update sidebar nav and sub items if click event came from a non-navbar link
        const navMenuItems = document.querySelectorAll('.sidenav-nav .nav-top-level .sub-menu a');
        // Path string to find correct nav top-level and sub item
        const currentLocation = window.location;
        const navMenuMatch = currentLocation.pathname;

        navMenuItems.forEach((element) => {
            // Find anchor that has a data-path attr that matches current pathName
            if (navMenuMatch.includes(element.getAttribute('data-path'))) {
                element.classList.add('active');
                element.closest('.nav-top-level').classList.add('open');

                if (element.closest('.nav-top-level').firstElementChild.nodeName === 'A') {
                    element.closest('.nav-top-level').firstElementChild.classList.add('active');
                }
            }
        });
    } else {
        if (event.target.closest('li').querySelector('a')) {
            event.target.closest('li').querySelector('a').classList.add('active');
        }

        if (event.target.closest('li').querySelector('ul')) {
            event.target.closest('li').classList.add('open');
        }
    }
}

const sideNav = document.querySelector('.side .sidenav-nav-main');
const mobileNav = document.querySelector('header .sidenav-nav-main');

if (sideNav) {
    sideNav.addEventListener('click', navClickEventHandler);
}

if (mobileNav) {
    mobileNav.addEventListener('click', navClickEventHandler);
}

function navClickEventHandler(event) {
    event.stopPropagation();
    // Remove any existing open and active classes
    let newUrl;

    // If what is clicked is not the actual li tag, ie the img icon span
    if (event.target !== this) {
        // Get the targets parent li
        const parentli = event.target.closest('li');

        if (!parentli) {
            return;
        }

        // Get the a
        const a = parentli.querySelector('a');
        newUrl = a.href;
    }

    // Hide mobile nav after clicking nav element
    if (document.querySelector('.navbar-collapse')?.classList.contains('show')) {
        document.querySelector('.navbar-collapse').style.display = 'none';
        closeMobileTOC();
    }

    // History API needed to make sure back and forward still work
    if (window.history === null) return;

    // External links should instead open in a new tab

    newUrl = event.target.closest('li').querySelector('a').href;

    const domain = window.location.origin;

    if (typeof domain !== 'string' || newUrl.search(domain) !== 0) {
        event.preventDefault();
        window.open(newUrl, '_blank');
    } else if (loadViaAjax(event.target)) {
        loadPage(newUrl);
        event.preventDefault();
        window.history.pushState({}, '', newUrl);
        updateSidebar(event);
    } else {
        window.location.href = newUrl;
    }
}

function loadViaAjax(element) {
    let hasClassLoad = false;
    let parentHasClassOpen = false;

    if (element.closest('li')) {
        hasClassLoad = !!element.closest('li').classList.contains('js-load');
    }

    if (element.parentElement) {
        parentHasClassOpen = !!element.parentElement.classList.contains('js-load');
    }

    if (hasClassLoad) {
        return true;
    } else if (parentHasClassOpen) {
        return true;
    } else {
        return false;
    }
}
// Handler for updating the navbar from a default rule click
function rulesListClickHandler(event, pathString) {
    if (event.target.matches('#rules .list-group .js-group a.js-page')) {
        event.preventDefault();
        const targetURL = event.target.href;

        if (targetURL.includes(pathString)) {
            loadPage(targetURL);
            window.history.pushState({}, '' /* title */, targetURL);
            updateSidebar(event);
        }
    }
    // if security rules section that has links to hashes, #cat-workload-security etc. try and highlight correct sidenav
    // by passing the relevant sidenav target to updateSidebar()
    if (event.target.matches('.controls a')) {
        const split = event.target.href.split('#');
        const targetURL = split.length > 1 ? `#${split[1]}` : event.target.href;
        const target = document.querySelector(`.side [href*="${targetURL}"]`);
        if (target) {
            updateSidebar({ target: target });
        }
    }
}

window.addEventListener('click', (event) => {
    rulesListClickHandler(event, 'default_rules');
});

window.onload = function () {
    getPathElement();
    setMobileNav();
};

function replaceURL(inputUrl) {
    let thisurl = `${window.location.protocol}//${window.location.host}`;
    if (thisurl.indexOf('docs-staging') > -1) {
        const path = window.location.pathname.split('/').slice(0, -3).join('/');
        thisurl = `${window.location.protocol}//${window.location.host}${path}`;
        return thisurl;
    }
    return inputUrl.replace('https://www.docs.datadoghq.com', thisurl);
}

window.addEventListener(
    'popstate',
    function (event) {
        setMobileNav();
        loadPage(window.location.href);
        closeNav();
        getPathElement();
    }
);
