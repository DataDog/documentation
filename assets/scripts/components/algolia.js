import { getConfig } from '../helpers/getConfig';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure, searchBox } from 'instantsearch.js/es/widgets';
import { searchbarHits } from './algolia/searchbarHits';
import { searchpageHits } from './algolia/searchpageHits';
import { customPagination } from './algolia/customPagination';
import { debounce } from '../utils/debounce';

function getPageLanguage() {
    const pageLanguage = document.documentElement.lang;

    // Page lang element is set to en-US due to Zendesk
    if (pageLanguage) {
        return pageLanguage.toLowerCase() === 'en-us' ? 'en' : pageLanguage;
    }

    return 'en';
}

function sendSearchRumAction(searchQuery, clickthroughLink = '') {
    if (window.DD_RUM && window._DATADOG_SYNTHETICS_BROWSER === undefined && searchQuery !== '') {
        window.DD_RUM.addAction('userSearch', {
            query: searchQuery.toLowerCase(),
            page: window.location.pathname,
            lang: getPageLanguage(),
            clickthroughLink
        })
    }
}

const { env } = document.documentElement.dataset;
const pageLanguage = getPageLanguage();
const algoliaConfig = getConfig(env).algoliaConfig;
const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
const indexName = algoliaConfig.index;

function loadInstantSearch(currentPageWasAsyncLoaded) {
    const searchBoxContainerContainer = document.querySelector('.searchbox-container');
    const searchBoxContainer = document.querySelector('#searchbox');
    const hitsContainerContainer = document.querySelector('.hits-container');
    const hitsContainer = document.querySelector('#hits');
    const paginationContainer = document.querySelector('#pagination');
    const pageTitleScrollTo = document.querySelector('#pagetitle');
    const filtersDocs = `language: ${pageLanguage}`;
    const homepage = document.querySelector('.kind-home');
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

    if (searchResultsPage) {
        numHits = 10;
        hitComponent = searchpageHits;
    }

    // No searchBoxContainer means no instantSearch
    if (searchBoxContainer) {
        const search = instantsearch({
            indexName,
            searchClient,
            // routing handles search state URL sync
            routing: {
                stateMapping: {
                    stateToRoute(uiState) {
                        const indexUiState = uiState[indexName];
                        return {
                            s: indexUiState.query
                        };
                    },
                    routeToState(routeState) {
                        return {
                            [indexName]: {
                                query: routeState.s
                            }
                        };
                    }
                }
            },
            // Handle hitting algolia API based on query and page
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
                container: hitsContainer,
                basePathName: basePathName
            }),

            customPagination({
                isNotSearchPage: !searchResultsPage,
                container: paginationContainer,
                scrollTo: pageTitleScrollTo,
                padding: 5
            })
        ]);

        // Start up frontend search
        search.start();

        // Handle clicks for non-search page
        if (!searchResultsPage) {
            const aisSearchBoxInput = document.querySelector('.ais-SearchBox-input');
            const aisSearchBoxSubmit = document.querySelector('.ais-SearchBox-submit');
            const searchPathname = `${basePathName}search`;

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
                // Intercept user clicks within algolia dropdown to send custom RUM event before redirect.
                if (hitsContainer.contains(e.target)) {
                    e.preventDefault()
                }
                
                let target = e.target;

                do {
                    if (target === searchBoxContainerContainer) return;

                    if (target && target.href && hitsContainer.contains(e.target)) {
                        sendSearchRumAction(search.helper.state.query, target.href)
                        window.history.pushState({}, '', target.href)
                        window.location.reload()
                    }

                    target = target.parentNode;
                } while (target);

                hitsContainerContainer.classList.add('d-none');
            };

            aisSearchBoxInput.addEventListener('keydown', handleSearchbarKeydown);
            aisSearchBoxSubmit.addEventListener('click', handleSearchbarSubmitClick);
            document.addEventListener('click', handleOutsideSearchbarClick);
        } else {
            // Handle sending search RUM events from click events on the search results page.
            hitsContainer.addEventListener('click', (e) => {
                e.preventDefault()
                let target = e.target

                do {
                    if (target.href) {
                        sendSearchRumAction(search.helper.state.query, target.href)
                        window.history.pushState({}, '', target.href)
                        window.location.reload()
                    }

                    target = target.parentNode
                } while (target)
            })
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

            window.addEventListener('resize', handleResizeDebounced);

            handleResizeDebounced();
        }
    }
}

export { loadInstantSearch };