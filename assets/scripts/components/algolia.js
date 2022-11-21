import configDocs from '../config/config-docs';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure, searchBox } from 'instantsearch.js/es/widgets';
import { searchbarHits } from './algolia/searchbarHits';
import { searchpageHits } from './algolia/searchpageHits';

function getConfig(environment) {
    if (environment === 'live') {
        return configDocs['live'];
    } else if (environment === 'preview') {
        return configDocs['preview'];
    } else return configDocs['development'];
}

const { env } = document.documentElement.dataset;
const pageLanguage = document.documentElement.lang || 'en';
const algoliaConfig = getConfig(env).algoliaConfig;

const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
const indexName = algoliaConfig.index;
const searchResultsPage = document.querySelector('.search_results_page');
const searchBoxContainerContainer = document.querySelector('.searchbox-container');
const searchBoxContainer = document.querySelector('#searchbox');
const hitsContainerContainer = document.querySelector('.hits-container');
const hitsContainer = document.querySelector('#hits');
const filtersDocs = `language: ${pageLanguage}`;
let numHits = 5;
let hitComponent = searchbarHits;

if (searchResultsPage) {
    numHits = 10;
    hitComponent = searchpageHits;
}

// No searchBoxContainer means no instantSearch
if (searchBoxContainer) {
    const search = instantsearch({
        indexName,
        searchClient,
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
                    return html`<span class="${cssClasses.submit}">search</span>`;
                }
            }
        }),

        hitComponent({
            container: hitsContainer
        })
    ]);

    search.start();

    if (!searchResultsPage) {
        const handleSearchbarKeydown = (e) => {
            if (e.code === 'Enter') {
                window.location.pathname += 'search';
            }
        };

        const handleSearchbarSubmitClick = () => {
            if (document.querySelector('.ais-SearchBox-input').value) {
                window.location.pathname += 'search';
            }
        };

        document.querySelector('.ais-SearchBox-input').addEventListener('keydown', handleSearchbarKeydown);
        document.querySelector('.ais-SearchBox-submit').addEventListener('click', handleSearchbarSubmitClick);
    }
}
