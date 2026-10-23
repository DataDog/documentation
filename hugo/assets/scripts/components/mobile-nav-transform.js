/*
  Builds the mobile drawer's "Docs main nav" content client-side from the desktop
  sidenav's already-rendered, already section-scoped DOM (nav/left-nav.html, mounted
  as .sidenav-nav-js-load), instead of Hugo independently rendering the same menu tree
  a second time in nav/mobile-documentation.html. See WEB-9804.

  Output shape must stay in sync with what nav/mobile-documentation.html's "Docs main
  nav" branch used to render, and with the classes/attributes mobile-nav.js depends on:
  dropdown, dropdown-menu, dropdown-toggle, sub-nav, d-none, data-path, data-skip.

  Desktop always renders its L1->L2 for every top-level item and scopes L3->L4 to the
  current top section. Mobile has only ever gone one level shallower -- nothing past
  the L1 leaf link outside the current section, then two more levels (this file's L2/L3)
  within it -- and has never rendered desktop's L4. This transform reproduces exactly
  that depth; it does not walk into desktop's L4, since that would grow mobile's page
  weight beyond what it ships today.
*/

// Filters direct children by tag/class rather than relying on the ":scope >" combinator,
// which some jsdom versions (used in this repo's jest tests) resolve incorrectly against
// a detached/queried root, matching descendants at any depth instead of just direct children.
function directChildren(el, selector) {
    return Array.from(el.children).filter((child) => child.matches(selector));
}

function directChild(el, selector) {
    return directChildren(el, selector)[0] || null;
}

function copyAttrs(destEl, srcEl, names) {
    names.forEach((name) => {
        if (srcEl.hasAttribute(name)) {
            destEl.setAttribute(name, srcEl.getAttribute(name));
        }
    });
}

function textOf(anchorEl) {
    const span = anchorEl.querySelector('span');
    return (span ? span.textContent : anchorEl.textContent).trim();
}

function buildToggle(groupName) {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'dropdown-toggle text-uppercase fw-semibold';
    a.setAttribute('data-bs-toggle', 'dropdown');
    a.setAttribute('role', 'button');
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'true');
    a.innerHTML = `<div class="nav-menu-item ms-2">${groupName}<span class="caret"><svg viewBox="0 0 17.78 10.51" width="10px"><polyline class="dropdown-arrow" points="16.92 1.14 8.92 9.14 0.92 1.14" /></svg></span></div>`;
    return a;
}

// The real top-level item (mobile's L1, e.g. "Tracing") wraps its text in a
// nav-menu-item-children div, matching the vendored "Docs main nav" markup this
// replaces.
function buildTopLevelLeafLink(desktopAnchor) {
    const a = document.createElement('a');
    a.className = 'mb-0 pb-0';
    copyAttrs(a, desktopAnchor, ['href', 'data-path', 'data-skip']);
    const div = document.createElement('div');
    div.className = 'nav-menu-item-children pb-0 mb-0';
    div.textContent = textOf(desktopAnchor);
    a.appendChild(div);
    return a;
}

// Deeper items (mobile's L2/L3) render as plain 16px text directly in the anchor.
function buildNestedLeafLink(desktopAnchor) {
    const a = document.createElement('a');
    a.className = 'mb-0 pb-0';
    copyAttrs(a, desktopAnchor, ['href', 'data-path', 'data-skip']);
    a.style.fontSize = '16px';
    a.textContent = textOf(desktopAnchor);
    return a;
}

// Builds one nested <ul class="sub-nav d-none"> level from a desktop <ul class="sub-menu">.
// `allowDeeper` caps recursion at mobile's L3 -- desktop's L4 is never carried over.
function buildSubNavLevel(desktopListEl, allowDeeper) {
    const ul = document.createElement('ul');
    ul.className = 'sub-nav ms-2 d-none';

    directChildren(desktopListEl, 'li').forEach((desktopLi) => {
        const desktopAnchor = directChild(desktopLi, 'a');
        if (!desktopAnchor) {
            return;
        }

        const li = document.createElement('li');
        li.appendChild(buildNestedLeafLink(desktopAnchor));

        const nextList = allowDeeper && directChild(desktopLi, 'ul.sub-menu');
        if (nextList) {
            li.appendChild(buildSubNavLevel(nextList, false));
        }

        ul.appendChild(li);
    });

    return ul;
}

export function buildMobileDocsNav(desktopSidenavEl) {
    const fragment = document.createDocumentFragment();

    if (!desktopSidenavEl) {
        return fragment;
    }

    const children = Array.from(desktopSidenavEl.children);

    for (let i = 0; i < children.length; i += 2) {
        const headingEl = children[i];
        const groupListEl = children[i + 1];

        if (!headingEl || !groupListEl || groupListEl.tagName !== 'UL') {
            continue;
        }

        const groupLi = document.createElement('li');
        groupLi.className = 'dropdown';
        groupLi.appendChild(buildToggle(headingEl.textContent.trim()));

        const dropdownMenuUl = document.createElement('ul');
        dropdownMenuUl.className = 'dropdown-menu';

        directChildren(groupListEl, 'li.nav-top-level').forEach((l1Li) => {
            const l1Anchor = directChild(l1Li, 'a');
            if (!l1Anchor) {
                return;
            }

            const isCurrentTopSection = l1Li.classList.contains('active');

            const mobileL1Li = document.createElement('li');
            mobileL1Li.appendChild(buildTopLevelLeafLink(l1Anchor));

            const l2Ul = directChild(l1Li, 'ul.sub-menu');
            if (isCurrentTopSection && l2Ul) {
                mobileL1Li.appendChild(buildSubNavLevel(l2Ul, true));
            }

            dropdownMenuUl.appendChild(mobileL1Li);
        });

        groupLi.appendChild(dropdownMenuUl);
        fragment.appendChild(groupLi);
    }

    return fragment;
}
