import Stickyfill from 'stickyfilljs';
import { initializeIntegrations } from './components/integrations';
import { initializeSecurityRules } from './components/security-rules';
import { updateTOC, buildTOCMap, onScroll, closeMobileTOC } from './components/table-of-contents';
import codeTabs from './components/codetabs';
import configDocs from './config/config-docs';
import { loadPage } from './components/async-loading';
import { updateMainContentAnchors, gtag } from './helpers/helpers';

const { env } = document.documentElement.dataset;
const { gaTag } = configDocs[env];

// gTag
window.dataLayer = window.dataLayer || [];

gtag('js', new Date());
gtag('config', gaTag);

$(document).ready(function () {
    window.history.replaceState({}, '', window.location.href);

    // ie
    document.createElement('picture');

    // bring back size() for jquery pajinate
    // The number of elements contained in the matched element set
    jQuery.fn.size = function () {
        return this.length;
    };

    $('.table-responsive-container table').each(function () {
        if (!$(this).hasClass('table-responsive')) {
            $(this).addClass('table-responsive');
        }
    });

    $('table').each(function () {
        let emptyThead = true;
        $(this)
            .find('thead th')
            .each(function () {
                if (!$(this).is(':empty')) {
                    emptyThead = false;
                }
            });
        if (emptyThead) {
            $(this).find('thead').remove();
        }
    });

    // algolia
    $('.ds-hint').css('background', 'transparent');

    const searchParam = getParameterByName('s');
    if (searchParam) {
        $('.sidenav-search input[name="s"]').val(searchParam);
    }

    if (!document.body.classList.contains('api')){
        $(window).on('resize scroll', function() {
            const headerHeight = $('body > header').height();
            const padding = 200;
            $('.sidenav-nav').css(
                'maxHeight',
                document.documentElement.clientHeight - headerHeight - padding
            );
        });
    }
    

    updateMainContentAnchors();


    // sticky polyfill trigger
    const elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);

    // add targer-blank to external links
    const newLinks = document.getElementsByTagName('a');
    for (let i = 0; i < newLinks.length; i++) {
        if (
            !newLinks[i].href.includes('datadoghq.com') &&
            !newLinks[i].href.includes('localhost:1313')
        ) {
            $(`a[href='${newLinks[i].href}']`).attr('target', '_blank');
        }
    }

    codeTabs();

    // ------------- TODO: move TOC js back to own file when webpack migration complete and can import js modules

    updateTOC();
    buildTOCMap();
    onScroll();

    // TODO: move integrations code to own file after webpack update

    if (document.body.classList.value.includes('security_platform')) {
        initializeSecurityRules();
    }

    if (document.body.classList.value.includes('integrations')) {
        initializeIntegrations();
    }
});



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get sidebar
function hasParentLi(el) {
    const els = [];
    while (el) {
        if(el.classList){

            if(el.classList.contains('sidenav-nav-main')){
            break;
            }

            // Add open class to li if the li has a child ul
            if (
                el.closest('li') &&
                el.closest('li').querySelectorAll('ul').length !== 0
            ) {
                el.closest('li').classList.add('open');
            }

            if (
                el.closest('.sub-menu') &&
                el.closest('.sub-menu').previousElementSibling
            ) {
                el.closest('.sub-menu').previousElementSibling.classList.add(
                    'active'
                );
            }
        }

        els.unshift(el);
        el = el.parentNode;
    }
}

function getPathElement() {
    const domain = window.location.origin;
    let path = window.location.pathname;
    const activeMenus = document.querySelectorAll('.side .sidenav-nav-main .active, header .sidenav-nav-main .active');

    for (let i = 0; i < activeMenus.length; i++) {
        activeMenus[i].classList.remove('active');
    }

    path = path.replace(/^\//, '');
    path = path.replace(/\/$/, '');

    let aPath = document.querySelector(`.side [data-path="${path}"]`);
    let maPath = document.querySelector(`header [data-path="${path}"]`);

    // TODO: fix exceptions for specific nav links that have the same url but both open the same place
     if (path.includes('agent/guide')) {
        aPath = document.querySelector('.side [data-path*="agent/guide"]');
        maPath = document.querySelector('header [data-path*="agent/guide"]');
    } 

    if (path.includes('tracing/guide')) {
        aPath = document.querySelector('.side [data-path*="tracing/guide"]');
        maPath = document.querySelector('header [data-path*="tracing/guide"]');
    }

    if (path.includes('monitors/guide')) {
        aPath = document.querySelector('.side [data-path*="monitors/guide"]');
        maPath = document.querySelector('header [data-path*="monitors/guide"]');
    }

    if (path.includes('logs/guide')) {
        aPath = document.querySelector('.side [data-path*="logs/guide"]');
        maPath = document.querySelector('header [data-path*="logs/guide"]');
    }

    if (path.includes('account_management/billing')) {
        aPath = document.querySelector(
            '.side [data-path*="account_management/billing"]'
        );
        maPath = document.querySelector(
            'header [data-path*="account_management/billing"]'
        );
    }


    if (path.includes('developers/guide')) {
        aPath = document.querySelector('.side [data-path*="developers/guide"]');
        maPath = document.querySelector(
            'header [data-path*="developers/guide"]'
        );
    }

    if (path.includes('synthetics/guide')) {
        aPath = document.querySelector('.side [data-path*="synthetics/guide"]');
        maPath = document.querySelector(
            'header [data-path*="synthetics/guide"]'
        );
    }


    // if url is domain + /integrations/**
    if (
        `${replaceURL(domain)}/${replacePath(path)}`.includes(
            `${replaceURL(domain)}/integrations`
        )
    ) {
        aPath = document.querySelector(
            '.side .nav-top-level > [data-path*="integrations"]'
        );
        maPath = document.querySelector(
            'header .nav-top-level > [data-path*="integrations"]'
        );
    }
    
    if (aPath) {
        aPath.classList.add('active');
        hasParentLi(aPath);
    }

    if (maPath) {
        maPath.classList.add('active');
        hasParentLi(maPath);
    }
}

// remove open class from li elements and active class from a elements
function closeNav(){
    const activeMenus = document.querySelectorAll('.side .sidenav-nav-main .active, header .sidenav-nav-main .active');
    const openMenus = document.querySelectorAll('.side .sidenav-nav-main .open, header .sidenav-nav-main .open');

    for(let i = 0; i < activeMenus.length; i++){
        activeMenus[i].classList.remove('active');
    }

    for (let i = 0; i < openMenus.length; i++) {
        openMenus[i].classList.remove('open');
    }
}

function updateSidebar(event) {
    closeNav();
    getPathElement();

    const isLi = event.target.nodeName === 'LI';

    if (isLi) {
        if (event.target.querySelector('a')) {
            event.target.querySelector('a').classList.add('active');
        }

        if (
            event.target.closest('li').querySelector('ul') &&
            event.target.closest('li')
        ) {
            event.target.closest('li').classList.add('open');
        }
    } else if (event.target.matches('#rules .list-group .js-group a.js-page')) {
        // Condition to update sidebar nav and sub items if click event came from a non-navbar link
        const navMenuItems = document.querySelectorAll('.sidenav-nav .nav-top-level .sub-menu a');
        // Path string to find correct nav top-level and sub item
        const currentLocation = window.location;
        const navMenuMatch = currentLocation.pathname;

        navMenuItems.forEach(element => {
            // Find anchor that has a data-path attr that matches current pathName
            if (navMenuMatch.includes(element.getAttribute('data-path'))) {
                element.classList.add('active');
                element.closest('.nav-top-level').classList.add('open');

                if (element.closest('.nav-top-level').firstElementChild.nodeName === 'A') {
                    element.closest('.nav-top-level').firstElementChild.classList.add('active');
                }
            }
        })
        
    } else {
        if (event.target.closest('li').querySelector('a')) {
            event.target
                .closest('li')
                .querySelector('a')
                .classList.add('active');
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

        // Get the a
        const a = parentli.querySelector('a');
        newUrl = a.href;
    }

    // Hide mobile nav after clicking nav element
    if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-collapse').collapse('hide');
        closeMobileTOC();
    }

    // TODO: How to fall back to normal behavior?
    // if (event.target.tagName !== "A")
    //     return;

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
        parentHasClassOpen = !!element.parentElement.classList.contains(
            'js-load'
        );
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
}

window.addEventListener('click', (event) => {
    rulesListClickHandler(event, 'default_rules');
});

window.onload = function () {
    getPathElement();
};

// remove branch name from path
function replacePath(inputPath) {
    const thisurl = `${window.location.protocol}//${window.location.host}`;
    if (thisurl.indexOf('docs-staging') > -1) {
        const path = inputPath.split('/').slice(2, 4).join('/');

        return path;
    }
    return inputPath;
}

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
        const domain = replaceURL(window.location.origin);
        if (event.state) {
            loadPage(window.location.href);
            closeNav();
            getPathElement();
        }
    },
    false
);