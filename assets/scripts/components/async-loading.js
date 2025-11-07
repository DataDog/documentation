import { updateTOC, buildTOCMap } from './table-of-contents';
import initCodeTabs from './codetabs';
import { redirectToRegion, hideTOCItems } from '../region-redirects';
import { initCopyCode } from './copy-code';
import { initializeIntegrations } from './integrations';
import { initializeGroupedListings } from './grouped-item-listings';
import {updateMainContentAnchors, reloadWistiaVidScripts, gtag, getCookieByName } from '../helpers/helpers';
import configDocs from '../config/config-docs';
import { redirectCodeLang, addCodeTabEventListeners, addCodeBlockVisibilityToggleEventListeners, activateCodeLangNav, toggleMultiCodeLangNav } from './code-languages'; // eslint-disable-line import/no-cycle
import { loadInstantSearch } from './instantsearch';

const { env } = document.documentElement.dataset;
const { gaTag } = configDocs[env];

function loadPage(newUrl) {
    // scroll to top of page on new page load
    // but only if there is no hash in the URL
    const newHash = new URL(newUrl).hash;
    if (!newHash) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }

    const pathName = new URL(newUrl).pathname;
    const commitRef = document.documentElement.dataset.commitRef
    const commitRefLen = commitRef.length ? (commitRef.length + 1) : 0

    let mainContent = document.getElementById('mainContent');

    // temp workaround for integrations page https://datadoghq.atlassian.net/browse/WEB-5018
    let isIntegrations = document.querySelector('.integrations')

    if (mainContent && !isIntegrations) {
        const currentTOC = document.querySelector('.js-toc-container');

        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            // cancel httprequest if hash is changed to prevent page replacing
            window.addEventListener('hashchange', function () {
                httpRequest.abort();
            });

            if (httpRequest.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            const newDocument = httpRequest.responseXML;

            if (newDocument === null) {
                return;
            }

            const mainContentWrapper = document.querySelector(
                '.mainContent-wrapper'
            );
            const newmainContentWrapper = newDocument.querySelector(
                '.mainContent-wrapper'
            );

            const newContent = newDocument.getElementById(
                'mainContent'
            );
            const newTOC = newDocument.querySelector(
                '.js-toc-container'
            );

            const currentSidebar = document.querySelector('.sidebar');
            const newSidebar = newDocument.querySelector('.sidebar');

            const currentPageIsSearchPage = (document.documentElement.dataset.relpermalink || "").includes("search");
            const newPageIsSearchPage = (newDocument.querySelector("html").dataset.relpermalink || "").includes("search");

            // For going from search page (/search) with no sidenav searchbar, to another page with sidenav searchbar
            if (currentPageIsSearchPage && !newPageIsSearchPage) {
                const sidenavSearchbarMount = document.querySelector('#async-searchbar-mount');

                const searchBoxContainer = document.createElement("div");
                searchBoxContainer.classList.add("searchbox-container");
                const searchBox = document.createElement("div");
                searchBox.setAttribute("id", "searchbox");
                const hitsContainer = document.createElement("div");
                hitsContainer.classList.add("hits-container", "d-none");
                const hits = document.createElement("div");
                hits.setAttribute("id", "hits");
                const hitsPartners = document.createElement("div");
                hitsPartners.setAttribute("id", "hits-partners");

                searchBoxContainer.append(searchBox);
                searchBoxContainer.append(hitsContainer);
                hitsContainer.append(hits);
                hitsContainer.append(hitsPartners);

                if(sidenavSearchbarMount) {
                  sidenavSearchbarMount.append(searchBoxContainer);
                }

                loadInstantSearch(asyncLoad=true);
            }

            if (newContent === null) {
                return;
            }

            document.title = newDocument.title;

            const meta = {
                itemprop: ['name', 'description'],
                name: [
                    'twitter\\:site',
                    'twitter\\:title',
                    'twitter\\:description',
                    'twitter\\:creator'
                ],
                property: [
                    'og\\:title',
                    'og\\:type',
                    'og\\:url',
                    'og\\:image',
                    'og\\:description',
                    'og\\:site_name',
                    'article\\:author'
                ]
            };

            const keys = Object.keys(meta);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                for (let k = 0; k < meta[key].length; k++) {
                    const selectorPart = meta[key][k];
                    try {
                        if (
                            newDocument.head.querySelector(
                                `[${key}=${selectorPart}]`
                            )
                        ) {
                            const { content } = newDocument.head.querySelector(
                                `[${key}=${selectorPart}][content]`
                            );
                            document.head.querySelector(
                                `[${key}=${selectorPart}][content]`
                            ).content = content;
                        }
                    } catch (e) {
                        console.log(e); // eslint-disable-line no-console
                    }
                }
            }

            // update data-relPermalink
            document.documentElement.dataset.relpermalink =
                newDocument.documentElement.dataset.relpermalink;

            // update data-type
            document.documentElement.dataset.type =
                newDocument.documentElement.dataset.type;

            // update data-code-lang
            document.documentElement.dataset.pageCodeLang =
            newDocument.documentElement.dataset.pageCodeLang;

            // update data-current-section
            document.documentElement.dataset.currentSection =
            newDocument.documentElement.dataset.currentSection;

            // check if loaded page has inline JS. if so, we want to return as script will not execute
            const hasScript = newContent.getElementsByTagName('script').length;

            // if there is error finding the element, reload page at requested url
            if (mainContent.parentElement && !hasScript) {
                mainContent.parentElement.replaceChild(newContent, mainContent);
                mainContent = newContent;

                // update mainContent-wrapper classes
                mainContentWrapper.className = `${newmainContentWrapper.classList}`;
            } else {
                window.location.href = newUrl;
            }

            const wistiaVid = document.querySelector(
                '.wistia [data-wistia-id]'
            );

            let wistiaVidId;
            if (wistiaVid) {
                wistiaVidId = wistiaVid.dataset.wistiaId;
            }

            initializeGroupedListings();

            // if newly requested TOC is NOT disabled
            if (newTOC && newTOC.querySelector('#TableOfContents') && currentTOC) {
                currentTOC.replaceWith(newTOC);
                buildTOCMap();
                updateTOC();
                updateMainContentAnchors();
                reloadWistiaVidScripts(wistiaVidId);
                initializeIntegrations();
            } else if (
                document.querySelector('.js-toc-container #TableOfContents')
            ) {
                // toc is disabled, but old TOC exists and needs to be removed.
                document
                    .querySelector('.js-toc-container #TableOfContents')
                    .remove();
                updateTOC();
            }

            // Ensure sidebar is displayed or hidden properly based on HTTP response.  I'm certain we can implement a better strategy for what's happening in this script, but this should hold us over until then.
            if (newSidebar && !currentSidebar) {
                const jsContentContainer = document.querySelector('.js-content-container');
                jsContentContainer.appendChild(newSidebar);
            }

            if (!newSidebar && currentSidebar) {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.add('d-none');
            }

            if (newSidebar && currentSidebar) {
                const sidebar = document.querySelector('.sidebar');

                if (sidebar.classList.value.includes('d-none')) {
                    sidebar.classList.remove('d-none');
                }
            }

            // Clean window pathname in order to update language dropdown items href
            const nonEnPage = document.documentElement.lang !== 'en-US' // check if page is not in english

            const noCommitRefPathName = pathName.slice(commitRefLen) // adjust pathname to remove commit ref if in preview env
            const noCommitRefNoLangPathName = nonEnPage ? noCommitRefPathName.slice(3) : noCommitRefPathName // adjust pathname to remove language if not in english e.g. /ja/agent -> /agent

            document.querySelectorAll('.language-select-container .dropdown-menu > a.dropdown-item').forEach((ddItem) => {
                // Updates langauge dropdown item hrefs on asynchronous page loads
                const noFtBranchddItemPathName = ddItem.pathname.slice(commitRefLen) // adjust dd item pathname to remove commit ref if in preview env
                const noFtBranchNoLangddItemPathName = ddItem.dataset.lang ? noFtBranchddItemPathName.slice(3) : noFtBranchddItemPathName // adjust dd item pathname to remove language if not in english e.g. /ja/agent -> /agent

                const updatedURL = ddItem.href.replace(noFtBranchNoLangddItemPathName, noCommitRefNoLangPathName)
                ddItem.setAttribute('href', updatedURL)
            })

            // sets query params if code tabs are present
            initCodeTabs();

            const regionSelector = document.querySelector('.js-region-select');

            if (regionSelector) {
                const region = getCookieByName('site');
                redirectToRegion(region);
            }

            const {pageCodeLang} = document.documentElement.dataset;
            addCodeTabEventListeners();
            addCodeBlockVisibilityToggleEventListeners();
            activateCodeLangNav(pageCodeLang)
            redirectCodeLang();
            toggleMultiCodeLangNav(pageCodeLang);
            hideTOCItems(true)
            initCopyCode()

            // Gtag virtual pageview
            gtag('config', gaTag, { page_path: pathName });

            // Marketo
            if (typeof window.Munchkin !== 'undefined' && typeof window.Munchkin.munchkinFunction === 'function') {
                window.Munchkin.munchkinFunction('clickLink', { href: newUrl });
            } else {
                window.DD_LOGS.logger.info('Munchkin called before ready..');
            }
        }; // end onreadystatechange

        httpRequest.responseType = 'document';
        httpRequest.open('GET', newUrl);
        httpRequest.send();
    } else {
        // Integrations Pages

        if(pathName.slice(commitRefLen) !== document.documentElement.dataset.relpermalink) {
            // if switching between integrations pages, reload page. adjusts the pathName to remove commit ref if in preview env.
            window.location.href = newUrl;
        }
    }
}

export {loadPage};


