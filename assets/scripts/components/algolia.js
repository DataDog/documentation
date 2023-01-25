import configDocs from '../config/config-docs';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { configure, searchBox } from 'instantsearch.js/es/widgets';
import { searchbarHits } from './algolia/searchbarHits';
import { searchpageHits } from './algolia/searchpageHits';
import { customPagination } from './algolia/customPagination';

function getConfig(environment) {
    if (environment === 'live') {
        return configDocs['live'];
    } else if (environment === 'preview') {
        return configDocs['preview'];
    } else return configDocs['development'];
}

function getPageLanguage() {
    const pageLanguage = document.documentElement.lang

    // Page lang element is set to en-US due to Zendesk
    if (pageLanguage) {
        return pageLanguage.toLowerCase() === 'en-us' ? 'en' : pageLanguage
    }

    return 'en'
}

const { env } = document.documentElement.dataset;
const pageLanguage =getPageLanguage();
const algoliaConfig = getConfig(env).algoliaConfig;

const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
const indexName = algoliaConfig.index;
const searchResultsPage = document.querySelector('.search_results_page');
const searchBoxContainerContainer = document.querySelector('.searchbox-container');
const searchBoxContainer = document.querySelector('#searchbox');
const hitsContainerContainer = document.querySelector('.hits-container');
const hitsContainer = document.querySelector('#hits');
const filtersDocs = `language: ${pageLanguage}`;
let basePathName = '';
let numHits = 5;
let hitComponent = searchbarHits;

if (document.documentElement.dataset.commitRef) {
    basePathName = `/${document.documentElement.dataset.commitRef}/`;
}

if (searchResultsPage) {
    numHits = 10;
    hitComponent = searchpageHits;
}

<<<<<<< HEAD
// No searchBoxContainer means no instantSearch
if (searchBoxContainer) {
    console.log('searchBoxContainer')
    console.log(indexName)
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
=======
const { algoliaConfig } = getConfig();

let algoliaTimer;

const isApiPage = () => document.body.classList.value.includes('api');
const alogliaApiDocsearchInput = document.getElementById('search-input-api');

const handleSearchPageRedirect = () => {
    const docsearchInput = document.querySelector('.docssearch-input.ds-input');

    if (docsearchInput.value !== '') {
        let inputValue = docsearchInput.value;

        if (inputValue.indexOf('#') > -1) {
            inputValue = inputValue.replace("#", encodeURIComponent("#"));
        }

        window.location = `${baseUrl}/search/?s=${inputValue}`;
    }
}

const appendHomeLinkToAutocompleteWidget = () => {
    const headers = document.querySelectorAll('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');
    const autocompleteHeaderElement = headers[0];
    const searchPageLink = document.createElement('a');

    searchPageLink.className = "font-regular text-underline ps-2 js-api-search";
    searchPageLink.innerText = 'Click here to search the full docs';
    searchPageLink.href = `${baseUrl}/search/`;

    if (alogliaApiDocsearchInput && alogliaApiDocsearchInput.value !== '') {
        searchPageLink.href += `?s=${alogliaApiDocsearchInput.value}`;
    }

    if (autocompleteHeaderElement) {
        autocompleteHeaderElement.appendChild(searchPageLink)
    }
}

const enhanceApiResultStyles = () => {
    const headers = document.querySelectorAll('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');

    headers.forEach(header => {
        if (header.textContent.toLowerCase().includes('api')) {
            header.style.fontWeight = '800';
            header.style.color = '#632ca6';
        }
    })
}

// Transforms API-specific results to show API endpoint as title on both left & right-hand columns of autocomplete widget.
const setApiEndpointAsSubcategory = () => {
    const searchResultSubcategoryNodeList = document.querySelectorAll('.algolia-docsearch-suggestion--subcategory-column-text');

    searchResultSubcategoryNodeList.forEach(subcategory => {
        const parentAnchor = subcategory.closest('a');

        if (parentAnchor) {
            const categoryHeader = parentAnchor.querySelector('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');

            if (categoryHeader && categoryHeader.textContent.toLowerCase().includes('api')) {
                const subcategoryContainer = subcategory.closest('.algolia-docsearch-suggestion--subcategory-column');

                if (subcategoryContainer && subcategoryContainer.nextElementSibling) {
                    const content = subcategoryContainer.nextElementSibling;

                    if (content) {
                        const apiEndpointTitle = content.querySelector('.algolia-docsearch-suggestion--title');
                        subcategory.textContent = apiEndpointTitle.textContent;
                        subcategory.style.fontWeight = '800';
                        subcategory.style.color = '#000';
                    }
>>>>>>> master
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
            container: hitsContainer
        }),

        customPagination({
            isNotSearchPage: !searchResultsPage,
            container: document.querySelector('#pagination'),
            scrollTo: document.querySelector('#pagetitle'),
            padding: 5
        })
    ]);

    search.start();

    if (!searchResultsPage) {
        const handleSearchbarKeydown = (e) => {
            if (e.code === 'Enter') {
                e.preventDefault();
                window.location.pathname = `${basePathName}search`;
            }
        };

        const handleSearchbarSubmitClick = () => {
            if (document.querySelector('.ais-SearchBox-input').value) {
                window.location.pathname = `${basePathName}search`;
            }
        };

        const handleOutsideSearchbarClick = (e) => {
            let target = e.target;
            do {
                if (target === searchBoxContainerContainer) {
                    return;
                }
                target = target.parentNode;
            } while (target);

            hitsContainerContainer.classList.add('d-none');
        };

        document.querySelector('.ais-SearchBox-input').addEventListener('keydown', handleSearchbarKeydown);
        document.querySelector('.ais-SearchBox-submit').addEventListener('click', handleSearchbarSubmitClick);
        document.addEventListener('click', handleOutsideSearchbarClick);
    }
}
