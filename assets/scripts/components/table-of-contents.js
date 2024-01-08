import { scrollTop } from '../helpers/scrollTop';
import { bodyClassContains } from '../helpers/helpers';
import { DOMReady } from '../helpers/documentReady';

let sidenavMapping = [];
let tocContainer = document.querySelector('.js-toc-container');
let tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');
const tocMobileBackdrop = document.querySelector('.js-mobile-toc-bg');
const tocCloseIcon = document.querySelector('.js-mobile-toc-toggle .icon-small-x-2');
const tocBookIcon = document.querySelector('.js-mobile-toc-toggle .icon-small-bookmark');
const tocEditBtn = document.querySelector('.js-toc-edit-btn');

function isTOCDisabled() {
    const toc = document.querySelector('#TableOfContents');
    if (!toc) {
        return true;
    }

    return false;
}

function onLoadTOCHandler() {
    tocContainer = document.querySelector('.js-toc-container');
    tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');

    if (isTOCDisabled() && tocContainer) {
        document.querySelector('.js-toc-title').classList.add('d-none');
        document.querySelector('.js-toc').classList.add('d-none');
        if (tocMobileToggle) {
            tocMobileToggle.classList.add('d-none');
        }
    } else if (window.innerWidth < 991 && tocContainer) {
        tocContainer.classList.remove('toc-container');
        tocContainer.classList.add('toc-container-mobile');
        if (tocMobileToggle) {
            tocMobileToggle.classList.remove('d-none');
        }
    }
}

export function closeMobileTOC() {
    if (!isTOCDisabled()) {
        tocContainer = document.querySelector('.js-toc-container');
        if (tocContainer) {
            tocContainer.classList.remove('mobile-open');
        }
        if (tocMobileBackdrop) {
            tocMobileBackdrop.classList.remove('mobile-toc-bg-open');
        }
        if (tocCloseIcon) {
            tocCloseIcon.classList.add('d-none');
        }
        if (tocBookIcon) {
            tocBookIcon.classList.remove('d-none');
        }
    }
}

export function updateTOC() {
    onLoadTOCHandler();
    document.querySelectorAll('#TableOfContents a').forEach((anchor) => {
        anchor.addEventListener('click', () => {
            const href = anchor.getAttribute('href');
            if (!isTOCDisabled()) {
                closeMobileTOC();
            }
            if (href.substr(0, 1) === '#') {
                window.DD_LOGS.logger.log(
                    'Toc used',
                    {
                        toc: {
                            entry: href.substr(1)
                        }
                    },
                    'info'
                );
            }
        });
    });
}

export function buildTOCMap() {
    sidenavMapping = [];
    let link = null;
    const tocAnchors = document.querySelectorAll('#TableOfContents ul a');

    if (tocAnchors.length) {
        tocAnchors.forEach((anchor) => {
            const href = anchor.getAttribute('href');
            const id = href ? href.replace('#', '').replace(' ', '-') : null;
            const header = id ? document.getElementById(`${decodeURI(id)}`) : null;
            const navParentLinks = Array.from(anchor.closest('#TableOfContents').querySelectorAll(':scope ul > li'))
                .filter((node) => node.contains(anchor))
                .filter((element) => element.querySelectorAll(':scope > a'));

            if (header) {
                if (header.nodeName === 'H2' || header.nodeName === 'H3') {
                    sidenavMapping.push({
                        navLink: anchor,
                        navLinkPrev: link,
                        navParentLinks,
                        id,
                        header,
                        isH2: header.nodeName === 'H2',
                        isH3: header.nodeName === 'H3'
                    });
                }
            }

            link = anchor;
        });
    }
}

export function onScroll() {
    const windowTopPosition = scrollTop(window);
    const windowHeight = window.innerHeight;
    const localOffset = 65;

    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.ceil(
        Math.max(body.getBoundingClientRect().height, html.getBoundingClientRect().height)
    );

    if (windowTopPosition + windowHeight === documentHeight) {
        // At bottom of page - highlight the last item
    } else {
        const elementTocOpen = document.querySelector('.toc_open');
        elementTocOpen ? elementTocOpen.classList.remove('toc_open') : null;

        // TOC mapping
        for (let i = 0; i < sidenavMapping.length; i++) {
            const sideNavItem = sidenavMapping[i];
            let j = i + 1;
            if (j > sidenavMapping.length) {
                j = 0;
            }
            const nextSideNavItem = sidenavMapping[j];
            sideNavItem.navLink.classList.remove('toc_scrolled');

            if (
                sideNavItem.header.getBoundingClientRect().top <= 0 + localOffset &&
                (typeof nextSideNavItem === 'undefined' ||
                    nextSideNavItem.header.getBoundingClientRect().top > 0 + localOffset)
            ) {
                sideNavItem.navLink.classList.add('toc_scrolled');
                // Add toc open to parents of this toc_scrolled
                sideNavItem.navParentLinks.forEach((li) => {
                    const link = li.querySelector('a');
                    const href = link.getAttribute('href');

                    if (href) {
                        const id = href.replace('#', '').replace(' ', '-');
                        const header = document.getElementById(`${(decodeURI(id))}`);
                        if (header && header.nodeName === 'H2') {
                            link.classList.add('toc_open');
                        }
                    }
                });
            }
        }
    }
}

function onResize() {
    tocContainer = document.querySelector('.js-toc-container');
    tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');

    if (isTOCDisabled() && tocContainer) {
        const tocTitle = document.querySelector('.js-toc-title');
        if (tocTitle) {
            tocTitle.classList.add('d-none');
        }
        if (tocMobileToggle) {
            tocMobileToggle.classList.add('d-none');
        }
    } else if (window.innerWidth < 991 && tocContainer) {
        tocContainer.classList.remove('toc-container');
        tocContainer.classList.add('toc-container-mobile');
        if (tocMobileToggle) {
            tocMobileToggle.classList.remove('d-none');
        }
    } else if (tocContainer) {
        closeMobileTOC();
        tocContainer.classList.add('toc-container');
        tocContainer.classList.remove('toc-container-mobile');
    }
}

function tocEditBtnHandler(event) {
    if (event.target.tagName === 'A') {
        // If element is anchor tag
        window.DD_LOGS.logger.log(
            'Edit btn clicked',
            {
                edit_btn: {
                    target: event.target.href
                }
            },
            'info'
        );
    }

    event.stopPropagation();
}

function toggleMobileTOC() {
    if (tocContainer) {
        document.querySelector('.js-mobile-toc-toggle .icon-small-x-2').classList.toggle('d-none');

        document.querySelector('.js-mobile-toc-toggle .icon-small-bookmark').classList.toggle('d-none');

        tocContainer.classList.toggle('mobile-open');
        document.querySelector('.js-mobile-toc-bg').classList.toggle('mobile-toc-bg-open');
    }
}

function handleAPIPage() {
    if (!bodyClassContains('api')) {
        onLoadTOCHandler();
    }
}

if (tocMobileToggle) {
    tocMobileToggle.addEventListener('click', toggleMobileTOC);
}

if (tocEditBtn) {
    tocEditBtn.addEventListener('click', tocEditBtnHandler);
}

window.addEventListener('resize', () => {
    onScroll();
    onResize();
});

window.addEventListener('scroll', () => {
    onScroll();
});

DOMReady(handleAPIPage);

// Fixes Chrome issue where pages with hash params are not scrolling to anchor
window.addEventListener('load', () => {
    const isChrome = /Chrome/.test(navigator.userAgent);
    if (window.location.hash && isChrome) {
        setTimeout(function () {
            const hash = window.location.hash;
            window.location.hash = '';
            window.location.hash = hash;
        }, 300);
    }
});
