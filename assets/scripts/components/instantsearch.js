import { getConfig } from '../helpers/getConfig';
import instantsearch from 'instantsearch.js';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { configure, searchBox, index } from 'instantsearch.js/es/widgets';
import { searchbarHits } from './instantsearch/searchbarHits';
import { searchpageHits } from './instantsearch/searchpageHits';
import { customPagination } from './instantsearch/customPagination';
import { debounce } from '../utils/debounce';

// Helper function to handle navigation with proper anchor scrolling
function navigateToUrl(url) {
    const urlObj = new URL(url, window.location.origin);
    
    // Check if we're navigating to the same page
    if (window.location.pathname === urlObj.pathname) {
        window.history.pushState({}, '', url);
        
        // Close search dropdown since we're staying on the same page
        const hitsContainerContainer = document.querySelector('.hits-container');
        if (hitsContainerContainer) {
            hitsContainerContainer.classList.add('d-none');
        }
        
        // If there's an anchor, scroll to it
        if (urlObj.hash) {
            setTimeout(() => {
                const targetElement = document.getElementById(urlObj.hash.substring(1));
                if (targetElement) {
                    // Calculate offset from fixed header and any page-specific nav
                    const header = document.querySelector('.navbar');
                    const glossaryNav = document.querySelector('.glossary-nav');
                    let offset = 20; // Base padding
                    
                    if (header) offset += header.offsetHeight;
                    if (glossaryNav) offset += glossaryNav.offsetHeight;
                    
                    const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementTop - offset,
                        behavior: 'smooth'
                    });
                }
            }, 50);
        }
        return;
    }
    
    // Check if this is a glossary page with an anchor for cross-page navigation
    if (urlObj.pathname.includes('/glossary/') && urlObj.hash) {
        // For cross-page navigation, store the anchor in sessionStorage and navigate
        sessionStorage.setItem('glossaryScrollTarget', urlObj.hash.substring(1));
        window.location.href = url;
    } else {
        // For other cross-page navigation, use normal navigation
        window.history.pushState({}, '', url);
        window.location.reload();
    }
}

const { env } = document.documentElement.dataset;
const pageLanguage = getPageLanguage();
const typesenseConfig = getConfig(env).typesense;
const docsIndex = typesenseConfig.docsIndex;
const partnersIndex = typesenseConfig.partnersIndex;

const adapterOptions = {
    server: {
        apiKey: typesenseConfig.public_key,
        nearestNode: {
            host: `${typesenseConfig.host}.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        },
        nodes: [
            {
                host: `${typesenseConfig.host}-1.a1.typesense.net`,
                port: 443,
                protocol: 'https'
            },
            {
                host: `${typesenseConfig.host}-2.a1.typesense.net`,
                port: 443,
                protocol: 'https'
            },
            {
                host: `${typesenseConfig.host}-3.a1.typesense.net`,
                port: 443,
                protocol: 'https'
            }
        ],
        cacheSearchResultsForSeconds: 2 * 60
    },
    collectionSpecificSearchParameters: {
        [docsIndex]: {
            preset: 'docs_alias_view',
            collection: docsIndex
        },
        [partnersIndex]: {
            preset: 'docs_partners_view',
            collection: partnersIndex
        }
    }
};

const typesenseInstantSearchAdapter = new TypesenseInstantSearchAdapter(adapterOptions);

const searchClient = typesenseInstantSearchAdapter.searchClient;

function getPageLanguage() {
    const pageLanguage = document.documentElement.lang;

    // Page lang element is set to en-US due to Zendesk
    if (pageLanguage) {
        return pageLanguage.toLowerCase() === 'en-us' ? 'en' : pageLanguage;
    }

    return 'en';
}

function sendSearchRumAction(searchQuery, clickthroughLink = '', clickedLinkPosition = -1) {
    if (window.DD_RUM && window._DATADOG_SYNTHETICS_BROWSER === undefined && searchQuery !== '') {
        const userSearchData = {
            query: searchQuery.toLowerCase(),
            page: window.location.pathname,
            lang: getPageLanguage()
        };

        if (clickthroughLink) {
            userSearchData.clickthroughLink = clickthroughLink;
        }

        if (clickedLinkPosition >= 0) {
            userSearchData.clickPosition = clickedLinkPosition;
        }

        window.DD_RUM.addAction('userSearch', userSearchData);
    }
}

const getSearchResultClickPosition = (clickedTargetHref, hitsArray, numberOfHitsPerPage, currentPage) => {
    let clickedTargetRelPermalink = clickedTargetHref;

    if (env === 'preview') {
        const commitRef = document.documentElement.dataset.commitRef;
        clickedTargetRelPermalink = clickedTargetRelPermalink.replace(`/${commitRef}`, '');
    }

    const { pathname, hash } = new URL(clickedTargetRelPermalink);
    const relPath = `${pathname}${hash}`;
    const clickedSearchResultIndexOnPage = hitsArray.findIndex((hit) => hit.relpermalink == relPath);
    return clickedSearchResultIndexOnPage + currentPage * numberOfHitsPerPage;
};

function loadInstantSearch(currentPageWasAsyncLoaded) {
    const searchBoxContainerContainer = document.querySelector('.searchbox-container');
    const searchBoxContainer = document.querySelector('#searchbox');
    const hitsContainerContainer = document.querySelector('.hits-container');
    const hitsContainer = document.querySelector('#hits');
    const partnersHitsContainer = document.querySelector('#hits-partners');
    const paginationContainer = document.querySelector('#pagination');
    const pageTitleScrollTo = document.querySelector('#pagetitle');
    const filtersDocs = `language: ${pageLanguage}`;
    const homepage = document.querySelector('.kind-home');
    const apiPage = document.querySelector('body.api');
    const partnersPage = document.querySelector('body.partners');
    let searchResultsPage = document.querySelector('.search_results_page');
    let basePathName = '/';
    let numHits = 5;
    let hitComponent = searchbarHits;

    // If asyncLoad is true, we're not on the search page anymore
    if (currentPageWasAsyncLoaded === true) {
        searchResultsPage = false;
    }

    if (document.documentElement.dataset.commitRef) {
        basePathName += `${document.documentElement.dataset.commitRef}/`;
    }

    if (pageLanguage !== 'en') {
        basePathName += `${pageLanguage}/`;
    }

    if (apiPage) {
        typesenseInstantSearchAdapter.updateConfiguration({
            ...adapterOptions,
            ...{
                collectionSpecificSearchParameters: {
                    [docsIndex]: {
                        preset: 'docs_alias_api_view',
                        collection: docsIndex
                    },
                    [partnersIndex]: {
                        preset: 'docs_partners_view',
                        collection: partnersIndex
                    }
                }
            }
        });
    }

    if (searchResultsPage) {
        numHits = 10;
        hitComponent = searchpageHits;
    }

    // No searchBoxContainer means no instantSearch
    if (searchBoxContainer) {
        const search = instantsearch({
            indexName: docsIndex,
            searchClient,
            // routing handles search state URL sync
            routing: {
                stateMapping: {
                    stateToRoute(uiState) {
                        const indexUiState = uiState[docsIndex];
                        return {
                            s: indexUiState.query?.trim()
                        };
                    },
                    routeToState(routeState) {
                        return {
                            [docsIndex]: {
                                query: routeState.s
                            }
                        };
                    }
                }
            },
            // Handle hitting Typesense API based on query and page
            // TODO: Replace searchFunction with `onStateChange`
            searchFunction(helper) {
                if (helper.state.query) {
                    helper.search();
                    if (!searchResultsPage) {
                        searchBoxContainerContainer.classList.add('active-search');
                        hitsContainerContainer.classList.remove('d-none');
                    }
                } else {
                    if (!searchResultsPage) {
                        searchBoxContainerContainer.classList.remove('active-search');
                        hitsContainerContainer.classList.add('d-none');
                    } else {
                        helper.search();
                    }
                }
            },
            future: {
                preserveSharedStateOnUnmount: true
            }
        });

        search.addWidgets([
            configure({
                hitsPerPage: numHits,
                filters: filtersDocs,
                distinct: 1
            }),

            searchBox({
                container: searchBoxContainer,
                placeholder: 'Search documentation...',
                autofocus: false,
                showReset: false,
                showSubmit: true,
                templates: {
                    submit({ cssClasses }, { html }) {
                        return html`<span id="submit-text" class="${cssClasses.submit}">search</span
                            ><i id="submit-icon" class="${cssClasses.submit} icon-search"></i>`;
                    }
                }
            }),

            hitComponent({
                partnersPage: partnersPage,
                container: hitsContainer,
                basePathName: basePathName
            }),

            customPagination({
                isNotSearchPage: !searchResultsPage,
                container: paginationContainer,
                scrollTo: pageTitleScrollTo,
                padding: 5
            }),

            // Add second index: Partners
            index({
                indexName: partnersIndex
            }).addWidgets([
                configure({
                    hitsPerPage: numHits,
                    distinct: 1
                }),

                hitComponent({
                    partnersPage: partnersPage,
                    container: partnersHitsContainer,
                    basePathName: basePathName
                })
            ])
        ]);

        // Start up frontend search
        search.start();

        // Handle clicks for non-search page
        if (!searchResultsPage) {
            const aisSearchBoxInput = document.querySelector('.ais-SearchBox-input');
            const aisSearchBoxSubmit = document.querySelector('.ais-SearchBox-submit');
            const searchPathname = `${basePathName}search`;

            const handleGlobalKeydown = (e) => {
                if ((e.key === '/' ||(e.key === 'k' && (e.metaKey || e.ctrlKey))) && !['input', 'textarea'].includes(e.target.tagName.toLowerCase()) && !e.target.isContentEditable) {
                    e.preventDefault();
                    aisSearchBoxInput.focus();
                    aisSearchBoxInput.value = ' ';
                    const inputEvent = new Event('input', { bubbles: true });
                    aisSearchBoxInput.dispatchEvent(inputEvent);
                    aisSearchBoxInput.setSelectionRange(1, 1);
                    
                }

                if (e.key === 'Escape') {
                    aisSearchBoxInput.value = '';
                    const inputEvent = new Event('input', { bubbles: true });
                    aisSearchBoxInput.dispatchEvent(inputEvent);
                    aisSearchBoxInput.blur();
                }
            };
            
            const handleSearchbarKeydown = (e) => {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    sendSearchRumAction(search.helper.state.query);

                    // Give query-url sync 500ms to update
                    setTimeout(() => {
                        window.location.pathname = searchPathname;
                    }, 500);
                }
            };

            const handleSearchbarSubmitClick = () => {
                if (aisSearchBoxInput.value) {
                    sendSearchRumAction(search.helper.state.query);
                    window.location.pathname = searchPathname;
                }
            };
            
            const handleOutsideSearchbarClick = (e) => {
                // Intercept user clicks within instantSearch dropdown to send custom RUM event before redirect.
                const targetIsDescendant = [hitsContainer, partnersHitsContainer].some((c) => c.contains(e.target));
                
                if (targetIsDescendant) {
                    e.preventDefault();
                }

                let target = e.target;

                do {
                    if (target === searchBoxContainerContainer) return;

                    if (target && target.href && targetIsDescendant) {
                        sendSearchRumAction(search.helper.state.query, target.href);
                        navigateToUrl(target.href);
                    }

                    target = target.parentNode;
                } while (target);

                hitsContainerContainer.classList.add('d-none');
            };

            aisSearchBoxInput.addEventListener('keydown', handleSearchbarKeydown);
            aisSearchBoxSubmit.addEventListener('click', handleSearchbarSubmitClick);
            document.addEventListener('click', handleOutsideSearchbarClick);
            document.addEventListener('keydown', handleGlobalKeydown);
        } else {
            // Handle sending search RUM events from click events on the search results page.
            hitsContainer.addEventListener('click', (e) => {
                e.preventDefault();
                let target = e.target;

                do {
                    if (target.href) {
                        const hitsArray = search.helper.lastResults.hits;
                        const page = search.helper.state.page;
                        const clickPosition = getSearchResultClickPosition(target.href, hitsArray, numHits, page);
                        sendSearchRumAction(search.helper.state.query, target.href, clickPosition);

                        if (e.metaKey || e.ctrlKey) {
                            window.open(target.href, '_blank');
                        } else {
                            navigateToUrl(target.href);
                        }
                    }

                    target = target.parentNode;
                } while (target);
            });
        }

        // Pages that aren't homepage or search page need to move the searchbar on mobile
        if (!homepage && !searchResultsPage) {
            const handleResize = () => {
                const searchBoxWrapper = document.querySelector('.nav-search-wrapper');
                const searchBoxWrapperMobile = document.querySelector('.mobile-nav-search-wrapper');

                if (window.innerWidth <= 991) {
                    searchBoxWrapperMobile?.appendChild(searchBoxContainerContainer);
                } else {
                    searchBoxWrapper?.appendChild(searchBoxContainerContainer);
                }
            };

            const handleResizeDebounced = debounce(handleResize, 500, false);

            handleResizeDebounced();

            // Bugfix for disappearing android keyboard on search input focus/autoresizing
            if (!navigator.userAgent.toLowerCase().match(/android/i)) {
                window.addEventListener('resize', handleResizeDebounced);
            }
        }
    }
}

export { loadInstantSearch };
