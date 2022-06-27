let sidenavMapping = [];
// let apiNavMapping = [];

let tocContainer = document.querySelector('.js-toc-container');
let tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');
const tocMobileBackdrop = document.querySelector('.js-mobile-toc-bg');
const tocCloseIcon = document.querySelector(
    '.js-mobile-toc-toggle .icon-small-x-2'
);
const tocBookIcon = document.querySelector(
    '.js-mobile-toc-toggle .icon-small-bookmark'
);
const tocEditBtn = document.querySelector('.js-toc-edit-btn');

$(window)
    .on('resize scroll', function() {
        onScroll();
    })
    .trigger('scroll');

export function updateTOC() {
    onLoadTOCHandler();
    $('#TableOfContents a').on('click', function() {
        const href = $(this).attr('href');
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
}

export function buildTOCMap() {
    sidenavMapping = [];
    let link = null;
    $('#TableOfContents ul a').each(function() {
        const href = $(this).attr('href');
        const id = href.replace('#', '').replace(' ', '-');
        const header = $(`[id="${id}"]`);
        const navParentLinks = $(this)
            .parents('#TableOfContents')
            .find('ul > li')
            .has($(this))
            .find('> a');

        if (header.length) {
            if (header.is('h2') || header.is('h3')) {
                sidenavMapping.push({
                    navLink: $(this),
                    navLinkPrev: link,
                    navParentLinks,
                    id,
                    header,
                    isH2: header.is('h2'),
                    isH3: header.is('h3')
                });
            }
        }
        link = $(this);
    });
}


export function onScroll() {
    const winTop = $(window).scrollTop();
    const localOffset = 110;

    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
        // we are at the bottom of the screen  just highlight the last item
    } else {
        $('.toc_open').removeClass('toc_open');

        // tocMapping
        for (let i = 0; i < sidenavMapping.length; i++) {
            const obj = sidenavMapping[i];
            let j = i + 1;
            if (j > sidenavMapping.length) {
                j = 0;
            }
            const nextobj = sidenavMapping[j];
            obj.navLink.removeClass('toc_scrolled');

            if (
                winTop >= obj.header.offset().top - localOffset &&
                (typeof nextobj === 'undefined' ||
                    winTop < nextobj.header.offset().top - localOffset)
            ) {
                obj.navLink.addClass('toc_scrolled');
                // add toc open to parents of this toc_scrolled
                obj.navParentLinks.each(function() {
                    const href = $(this).attr('href');
                    const id = href.replace('#', '').replace(' ', '-');
                    const header = $(`[id="${id}"]`);
                    if (header.is('h2')) {
                        $(this).addClass('toc_open');
                    }
                });
            }
        }

        // apiMapping
        // for (let i = 0; i < apiNavMapping.length; i++) {
        //     const obj = apiNavMapping[i];
        //     let j = i + 1;
        //     if (j > apiNavMapping.length) {
        //         j = 0;
        //     }
        //     const nextobj = apiNavMapping[j];
        //     obj.navLink.removeClass('toc_scrolled');

        //     if (
        //         winTop >= obj.header.offset().top - localOffset &&
        //         (typeof nextobj === 'undefined' ||
        //             winTop < nextobj.header.offset().top - localOffset)
        //     ) {
        //         obj.navLink.addClass('toc_scrolled');
        //         // add toc open to parents of this toc_scrolled
        //         obj.navParentLinks.each(function() {
        //             const href = $(this).attr('href');
        //             const id = href.replace('#', '').replace(' ', '-');
        //             const header = $(`[id="${id}"]`);
        //             if (header.is('h2')) {
        //                 $(this).addClass('toc_open');
        //             }
        //         });
        //     }
        // }
    }
}

if (tocMobileToggle) {
    tocMobileToggle.addEventListener('click', toggleMobileTOC);
}

if (tocEditBtn) {
    tocEditBtn.addEventListener('click', tocEditBtnHandler);
}

window.addEventListener('load', function() {
    if (!document.body.classList.contains('api')) {
        onLoadTOCHandler();
    }
});

function tocEditBtnHandler(event) {
    if (event.target.tagName === 'A') {
        // if element is anchor tag
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
        if(tocMobileToggle) {
          tocMobileToggle.classList.add('d-none');
        }
    } else if (window.innerWidth < 991 && tocContainer) {
        tocContainer.classList.remove('toc-container');
        tocContainer.classList.add('toc-container-mobile');
        if(tocMobileToggle) {
          tocMobileToggle.classList.remove('d-none');
        }
    }
}

window.addEventListener('resize', function() {
    tocContainer = document.querySelector('.js-toc-container');
    tocMobileToggle = document.querySelector('.js-mobile-toc-toggle');

    if (isTOCDisabled() && tocContainer) {
        const tocTitle = document.querySelector('.js-toc-title');
        if(tocTitle) {
          tocTitle.classList.add('d-none');
        }
        if(tocMobileToggle) {
          tocMobileToggle.classList.add('d-none');
        }
    } else if (window.innerWidth < 991 && tocContainer) {
        tocContainer.classList.remove('toc-container');
        tocContainer.classList.add('toc-container-mobile');
        if(tocMobileToggle) {
          tocMobileToggle.classList.remove('d-none');
        }
    } else if (tocContainer) {
        closeMobileTOC();
        tocContainer.classList.add('toc-container');
        tocContainer.classList.remove('toc-container-mobile');
    }
});

export function closeMobileTOC() {
    if (!isTOCDisabled()) {
        tocContainer = document.querySelector('.js-toc-container');
        if(tocContainer) {
          tocContainer.classList.remove('mobile-open');
        }
        if(tocMobileBackdrop) {
          tocMobileBackdrop.classList.remove('mobile-toc-bg-open');
        }
        if(tocCloseIcon) {
          tocCloseIcon.classList.add('d-none');
        }
        if(tocBookIcon) {
          tocBookIcon.classList.remove('d-none');
        }
    }
}

function toggleMobileTOC() {
    if (tocContainer) {
        document
            .querySelector('.js-mobile-toc-toggle .icon-small-x-2')
            .classList.toggle('d-none');

        document
            .querySelector('.js-mobile-toc-toggle .icon-small-bookmark')
            .classList.toggle('d-none');

        tocContainer.classList.toggle('mobile-open');
        document
            .querySelector('.js-mobile-toc-bg')
            .classList.toggle('mobile-toc-bg-open');
    }
}
