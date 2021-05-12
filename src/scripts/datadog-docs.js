import Stickyfill from 'stickyfilljs';
import algoliasearch from 'algoliasearch';
import Choices from 'choices.js';

import { initializeIntegrations } from './components/integrations';
import { initializeSecurityRules } from './components/security-rules';
import { updateTOC, buildTOCMap, onScroll, closeMobileTOC } from './components/table-of-contents';
import codeTabs from './components/codetabs';
import configDocs from './config/config-docs';
import {loadPage} from './components/async-loading';
import {updateMainContentAnchors, gtag} from './helpers/helpers';

const { env } = document.documentElement.dataset;
const { imgUrl, gaTag } = configDocs[env];

// custom region and API version selector dropdown
const versionSelect = document.querySelector('.js-api-version-select');
const regionSelect = document.querySelector('.js-region-selector');

const regionChoiceOptions = {
    searchEnabled: false,
    placeholder: false,
    shouldSort: false,
    itemSelectText: '',
    renderSelectedChoices: false,
    callbackOnCreateTemplates (template){
        return {
            item: (classNames, data) => template(`
                <div class="${classNames.item} ${
                data.highlighted
                  ? classNames.highlightedState
                  : classNames.itemSelectable
              } ${
                data.placeholder ? classNames.placeholder : ''
              }" data-item data-id="${data.id}" data-value="${data.value}" ${
                data.active ? 'aria-selected="true"' : ''
              } ${data.disabled ? 'aria-disabled="true"' : ''}>
                   ${data.label}<img alt="${data.value} region selector icon" src="${imgUrl}images/icons/region-flag-${data.value}.png">
                </div>
              `),
            choice: (classNames, data) => template(`
                <div class="${classNames.item} ${classNames.itemChoice} ${
                data.disabled ? classNames.itemDisabled : classNames.itemSelectable
              }" data-select-text="${this.config.itemSelectText}" data-choice ${
                data.disabled
                  ? 'data-choice-disabled aria-disabled="true"'
                  : 'data-choice-selectable'
              } data-id="${data.id}" data-value="${data.value}" ${
                data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
              }>
                   ${data.label}
                </div>
              `)
          };
    }
}

const versionChoiceOptions = {
    searchEnabled: false,
    placeholder: false,
    itemSelectText: '',
    renderSelectedChoices: false
}
if (versionSelect) {
    const choices = new Choices(versionSelect, versionChoiceOptions);
}
if (regionSelect) {
    const regionChoices = new Choices(regionSelect, regionChoiceOptions);
}

// Setup for large screen ToC

// gTag
window.dataLayer = window.dataLayer || [];

const siteEnv = document.querySelector('html').dataset.env;

let indexName = '';
if (siteEnv === 'preview' || siteEnv === 'development') {
    indexName = 'docsearch_docs_preview';
} else if (siteEnv === 'live') {
    indexName = 'docsearch_docs_prod';
}

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

    if (window.location.href.indexOf('/search/') > -1) {
        const client = algoliasearch(
            'EOIG7V0A2O',
            'c7ec32b3838892b10610af30d06a4e42'
        );
        const results = new RegExp('[?&]' + 's' + '=([^&#]*)').exec(
            window.location.href
        );
        
        let query = '';
        try {
            query = results[1];
        } catch (e) {}

        let lang = 'en';
        if (window.location.pathname.indexOf('/fr/') > -1) {
            lang = 'fr';
        }
        if (window.location.pathname.indexOf('/ja/') > -1) {
            lang = 'ja';
        }

        function getTitle(hit) {
            let title = '';
            title = hit['hierarchy']['lvl0'];
            if (hit['hierarchy'].hasOwnProperty('lvl1')) {
                if (hit['hierarchy']['lvl1'] !== null)
                    title += ` &raquo; ${hit['hierarchy']['lvl1']}`;
            }
            if (hit['hierarchy'].hasOwnProperty('lvl2')) {
                if (hit['hierarchy']['lvl2'] !== null)
                    title += ` &raquo; ${hit['hierarchy']['lvl2']}`;
            }
            if (hit['hierarchy'].hasOwnProperty('lvl3')) {
                if (hit['hierarchy']['lvl3'] !== null)
                    title += ` &raquo; ${hit['hierarchy']['lvl3']}`;
            }
            return title;
        }

        // get results from algolia
        client.search(
            [
                {
                    indexName,
                    query: decodeURIComponent(query),
                    params: {
                        hitsPerPage: 200,
                        attributesToRetrieve: '*',
                        facetFilters: [`language:${lang}`]
                    }
                }
            ],
            function (err, results) {
                if (!err) {
                    // format and populate results
                    $('#tipue_search_input').val(decodeURIComponent(query));
                    const hits = results['results'][0]['hits'];
                    let formatted_results = '';
                    if (hits.length) {
                        $('#tipue_search_content').prepend(
                            `<div id="tipue_search_results_count">${hits.length} results</div>`
                        );
                        for (const i in hits) {
                            const hit = hits[i];
                            formatted_results += '<div class="hit">';
                            formatted_results += `${
                                '<div class="tipue_search_content_title">' +
                                '<a href="'
                            }${hit['url']}">${getTitle(hit)}</a></div>`;
                            formatted_results += `${
                                '<div class="tipue_search_content_url">' +
                                '<a href="'
                            }${hit['url']}">${hit['url'].replace(
                                'https://docs.datadoghq.com',
                                ''
                            )}</a></div>`;
                            const text = hit._snippetResult.content.value;
                            formatted_results += `<div class="tipue_search_content_text">${text}</div>`;
                            formatted_results += '</div>';
                        }
                    } else {
                        $('#tipue_search_content').prepend(
                            `<div id="tipue_search_results_count">${hits.length} results</div>`
                        );
                    }
                    $('#tipue_search_content .content').html(formatted_results);

                    // load pagination
                    if (hits.length) {
                        let current_page = 1;
                        const num_page_links_to_display = 9;
                        const items_per_page = 7;
                        let page_nums = [];
                        let btn_next = document.getElementById('btn_next');
                        let btn_prev = document.getElementById('btn_prev');
                        let btn_more;
                        let btn_less;
                        const listing_table = document.getElementsByClassName(
                            'content'
                        )[0];
                        const page_navigation = document.getElementsByClassName(
                            'page_navigation'
                        )[0];
                        let page_span = document.getElementById('page');

                        function numPages() {
                            return Math.ceil(hits.length / items_per_page);
                        }

                        function initPageNums() {
                            const count = Math.min(
                                numPages(),
                                num_page_links_to_display
                            );
                            page_nums = [];
                            for (let i = 1; i < count + 1; i++) {
                                page_nums.push(i);
                            }
                        }

                        function prevPage() {
                            if (current_page > 1) {
                                current_page--;
                                if (current_page < page_nums[0]) {
                                    less(null);
                                } else {
                                    addHistory(current_page);
                                    changePage(current_page);
                                }
                            }
                        }

                        function nextPage() {
                            if (current_page < numPages()) {
                                current_page++;
                                if (
                                    current_page >
                                    page_nums[page_nums.length - 1]
                                ) {
                                    more(null);
                                } else {
                                    addHistory(current_page);
                                    changePage(current_page);
                                }
                            }
                        }

                        function less(e) {
                            if (e) e.preventDefault();
                            // get last in range
                            const first = page_nums[0];
                            const last = page_nums[page_nums.length - 1];
                            page_nums = [];
                            for (
                                let i = first - num_page_links_to_display;
                                i < first;
                                i++
                            ) {
                                page_nums.push(i);
                            }
                            current_page = page_nums[page_nums.length - 1];
                            addHistory(current_page);
                            changePage(current_page);
                            return false;
                        }

                        function more(e) {
                            if (e) e.preventDefault();
                            // get last in range
                            const last = page_nums[page_nums.length - 1];
                            // go from next number to num_page_links_to_display or however many are left
                            const remaining_pages = numPages() - last;
                            const count = Math.min(
                                remaining_pages,
                                num_page_links_to_display
                            );
                            page_nums = [];
                            for (
                                let i = last + 1;
                                i < last + (count + 1);
                                i++
                            ) {
                                page_nums.push(i);
                            }
                            current_page = page_nums[0];
                            addHistory(current_page);
                            changePage(current_page);
                            return false;
                        }

                        function cleanHandlers() {
                            if (btn_next) {
                                btn_next.removeEventListener(
                                    'click',
                                    btnHandler
                                );
                            }
                            if (btn_prev) {
                                btn_prev.removeEventListener(
                                    'click',
                                    btnHandler
                                );
                            }
                            const pagebtns = document.getElementsByClassName(
                                'page-num'
                            );
                            for (let i = 0; i < pagebtns.length; i++) {
                                pagebtns[i].removeEventListener(
                                    'click',
                                    btnHandlerPage
                                );
                            }
                            if (btn_more) {
                                btn_more.removeEventListener('click', more);
                            }
                            if (btn_less) {
                                btn_less.removeEventListener('click', less);
                            }
                        }

                        function btnHandler(e) {
                            e.preventDefault();
                            if (e.target.getAttribute('id') === 'btn_prev') {
                                prevPage();
                            } else if (
                                e.target.getAttribute('id') === 'btn_next'
                            ) {
                                nextPage();
                            }
                            return false;
                        }

                        function btnHandlerPage(e) {
                            e.preventDefault();
                            let page = parseInt(
                                e.target.getAttribute('data-pagenum')
                            );
                            if (page > numPages()) {
                                page = numPages();
                            } else if (page <= 0) {
                                page = 1;
                            }
                            current_page = page;
                            addHistory(current_page);
                            changePage(current_page);
                            return false;
                        }

                        function setHandlers() {
                            // remove any existing handlers
                            btn_next = document.getElementById('btn_next');
                            btn_prev = document.getElementById('btn_prev');
                            if (btn_prev) {
                                btn_prev.addEventListener('click', btnHandler);
                            }
                            if (btn_next) {
                                btn_next.addEventListener('click', btnHandler);
                            }
                            const pagebtns = document.getElementsByClassName(
                                'page-num'
                            );
                            if (pagebtns) {
                                for (let i = 0; i < pagebtns.length; i++) {
                                    pagebtns[i].addEventListener(
                                        'click',
                                        btnHandlerPage
                                    );
                                }
                            }
                            btn_more = document.getElementsByClassName(
                                'more'
                            )[0];
                            btn_less = document.getElementsByClassName(
                                'less'
                            )[0];
                            if (btn_more) {
                                btn_more.addEventListener('click', more);
                            }
                            if (btn_less) {
                                btn_less.addEventListener('click', less);
                            }
                        }

                        function setNavigation() {
                            let html = '';
                            let cls = '';
                            cleanHandlers();
                            html +=
                                '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_prev">Prev</a>';
                            if (page_nums[0] > 1) {
                                html +=
                                    '<a class="mr-1 btn btn-sm-tag btn-outline-secondary less" href="#">...</a>';
                            }
                            for (let i = 0; i < page_nums.length; i++) {
                                cls =
                                    current_page === page_nums[i]
                                        ? 'active'
                                        : '';
                                html += `<a class="mr-1 page-num btn btn-sm-tag btn-outline-secondary ${cls}" href="#" data-pagenum="${page_nums[i]}">${page_nums[i]}</a>`;
                            }
                            if (page_nums[page_nums.length - 1] < numPages()) {
                                html +=
                                    '<a class="mr-1 btn btn-sm-tag btn-outline-secondary more" href="#">...</a>';
                            }
                            html +=
                                '<a class="mr-1 btn btn-sm-tag btn-outline-secondary" href="#" id="btn_next">Next</a>';
                            if (page_navigation) {
                                page_navigation.innerHTML = html;
                            }
                            setHandlers();
                        }

                        window.onpopstate = function (event) {
                            if (event.state) {
                                current_page = event.state.page;
                                changePage(current_page);
                            }
                        };

                        function addHistory(page) {
                            let pageName = `?s=${query}`;
                            if (page !== 1) pageName += `&p=${page}`;
                            window.history.pushState({ page }, '', pageName);
                        }

                        function changePage(page) {
                            page_span = document.getElementById('page');

                            // Validate page
                            if (page < 1) page = 1;
                            if (page > numPages()) page = numPages();

                            if (listing_table) {
                                listing_table.innerHTML = '';
                            }

                            // output our slice of formatted results
                            for (
                                let i = (page - 1) * items_per_page;
                                i < page * items_per_page && i < hits.length;
                                i++
                            ) {
                                let formatted_results = '';
                                formatted_results += '<div class="hit row">';
                                formatted_results += '<div class="col-12">';

                                formatted_results += `${
                                    '<div class="tipue_search_content_title">' +
                                    '<a href="'
                                }${hits[i]['url']}">${getTitle(
                                    hits[i]
                                )}</a></div>`;
                                const text =
                                    hits[i]._snippetResult.content.value;
                                formatted_results += `<div class="tipue_search_content_text">${text}</div>`;

                                formatted_results += '</div>';
                                formatted_results += '</div>';
                                if (listing_table) {
                                    listing_table.innerHTML += formatted_results;
                                }
                            }
                            if (page_span) {
                                page_span.innerHTML = `${page}/${numPages()}`;
                            }

                            setNavigation();

                            // set previous and next buttons class
                            if (btn_prev) {
                                btn_prev.classList[
                                    page === 1 ? 'add' : 'remove'
                                ]('disabled');
                            }
                            if (btn_next) {
                                btn_next.classList[
                                    page === numPages() ? 'add' : 'remove'
                                ]('disabled');
                            }

                            // set active button class
                            const pagebtns = document.getElementsByClassName(
                                'page-num'
                            );
                            for (let i = 0; i < pagebtns.length; i++) {
                                const page = parseInt(
                                    pagebtns[i].getAttribute('data-pagenum')
                                );
                                pagebtns[i].classList[
                                    current_page === page ? 'add' : 'remove'
                                ]('active');
                            }

                            // scroll to top only if there is no hash
                            if (!window.location.hash) {
                                $('html, body').scrollTop(0);
                            }
                        }

                        // init page nums
                        initPageNums();

                        // set initial page
                        const searchParams = new URLSearchParams(
                            window.location.search
                        );
                        if (searchParams.get('p') !== null)
                            current_page = parseInt(searchParams.get('p'));
                            window.history.replaceState({ page: current_page }, '', '');
                        changePage(current_page);
                    }
                } else {
                    const content = document.getElementsByClassName(
                        'content'
                    )[0];
                    if (content) {
                        content.innerHTML = '0 results';
                    }
                }
            }
        );
    }

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

// TODO: move Integrations code to own file after webpack update
