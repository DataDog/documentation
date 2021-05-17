import docsearch from 'docsearch.js';
import configDocs from '../config/config-docs';

const { env } = document.documentElement.dataset;
const lang = document.documentElement.lang || 'en';

// Set baseUrl based on environment
let baseUrl = window.location.origin;
const uri = window.location.pathname;
const subdomain = baseUrl.split('.')[0];
const previewPath = uri
    .split('/')
    .slice(0, 3)
    .join('/');

if (subdomain.includes('docs-staging')) {
    baseUrl += previewPath;
}

function getConfig() {
    if (env === 'live') {
        return configDocs['live'];
    } else if (env === 'preview') {
        return configDocs['preview'];
    } else {
        return configDocs['development'];
    }
}

const { algoliaConfig } = getConfig();

let algoliaTimer;

const isApiPage = () => document.body.classList.value.includes('api');
const alogliaApiDocsearchInput = document.getElementById('search-input-api');

const handleSearchPageRedirect = () => {
    const docsearchInput = document.querySelector('.docssearch-input.ds-input');

    if (docsearchInput.value !== '') {
        window.location = `${baseUrl}/search?s=${docsearchInput.value}`;
    }
}

const appendHomeLinkToAutocompleteWidget = () => {
    const headers = document.querySelectorAll('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');
    const autocompleteHeaderElement = headers[0];
    const searchPageLink = document.createElement('a');

    searchPageLink.className = "font-regular text-underline pl-2 js-api-search";
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
                }
            }
        }
    })
}

const searchDesktop = docsearch({
    appId: algoliaConfig.appId,
    apiKey: algoliaConfig.apiKey,
    indexName: isApiPage() ? algoliaConfig.api_index : algoliaConfig.index,
    inputSelector: '.docssearch-input',
    algoliaOptions: {
        facetFilters: [`language:${lang}`]
    },
    autocompleteOptions: {
        autoselect: false
    },
    queryHook(query) {
        // eslint-disable-next-line no-underscore-dangle
        if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
            clearTimeout(algoliaTimer);
            algoliaTimer = setTimeout(function() {
                if (query.length > 0) {
                    window.DD_LOGS.logger.log(
                        'Algolia Search',
                        {
                            browser: {
                                algolia: {
                                    search: query.toLowerCase()
                                }
                            }
                        },
                        'info'
                    );
                }
            }, 1000);
        }
    },
    debug: false // Set debug to true if you want to inspect the dropdown
});

let desktopEnableEnter = true;
const searchBtn = document.querySelector('.js-search-btn');
const searchContainer = document.querySelector('.search-container');

searchDesktop.autocomplete.on('keyup', function(e) {
    if ($('.algolia-docsearch-suggestion').length > 0) {
        if ($('.algolia-autocomplete')) {
            $('.algolia-autocomplete').css('borderBottomLeftRadius', '0px');
            $('.algolia-autocomplete').css('borderBottomRightRadius', '0px');
        }
    } else {
        $('.algolia-autocomplete').css('borderTopLeftRadius', '3px');
        $('.algolia-autocomplete').css('borderBottomLeftRadius', '3px');
    }
    if (e.keyCode === 13 && desktopEnableEnter) {
        window.location = `${baseUrl}/search/?s=${this.value}`;
    }

    if (isApiPage()) {
        const searchLink = document.querySelector('.js-api-search');
        const searchInput = document.getElementById('search-input-api');

        // The search query's first input character is handled by appendHomeLinkToAutocompleteWidget()
        // This is because it must be handled during algolia's autocomplete:shown function so we have access to algolia's autocomplete elements.
        if (searchLink && searchInput && searchInput.length > 1) {
            searchLink.href += !searchLink.href.includes('?') ? `?s=${searchInput.value}` : searchInput.value;
        }
    }
});

// if user clicks search button
if (searchBtn) {
    searchBtn.addEventListener('click', handleSearchPageRedirect);
}

searchDesktop.autocomplete.on('autocomplete:shown', function() {
    if (isApiPage()) {
        enhanceApiResultStyles();
        setApiEndpointAsSubcategory();
        appendHomeLinkToAutocompleteWidget();
    }
})

searchDesktop.autocomplete.on('autocomplete:closed', function(e) {
    if ($('.algolia-docsearch-suggestion').length > 0) {
        if ($('.algolia-autocomplete')) {
            $('.algolia-autocomplete').css('borderBottomLeftRadius', '0px');
            $('.algolia-autocomplete').css('borderBottomRightRadius', '0px');
        }
    } else {
        $('.algolia-autocomplete').css('borderTopLeftRadius', '3px');
        $('.algolia-autocomplete').css('borderBottomLeftRadius', '3px');
    }
    if (e.keyCode === 13 && desktopEnableEnter) {
        window.location = `${baseUrl}/search/?s=${this.value}`;
    }
});
searchDesktop.autocomplete.on('autocomplete:cursorchanged', function() {
    desktopEnableEnter = false;
});
searchDesktop.autocomplete.on('autocomplete:cursorremoved', function() {
    desktopEnableEnter = true;
});

if (searchContainer) {
    document.querySelector('.search-container').style.display = 'block';
}

const searchMobile = docsearch({
    appId: algoliaConfig.appId,
    apiKey: algoliaConfig.apiKey,
    indexName: isApiPage() ? algoliaConfig.api_index : algoliaConfig.index,
    inputSelector: '.docssearch-input-mobile',
    algoliaOptions: {
        facetFilters: [`language:${lang}`]
    },
    autocompleteOptions: {
        autoselect: false
    },
    debug: false // Set debug to true if you want to inspect the dropdown
});

let mobileEnableEnter = true;

searchMobile.autocomplete.on('keyup', function(e) {
    if (e.keyCode === 13 && mobileEnableEnter) {
        window.location = `${baseUrl}/search/?s=${this.value}`;
    }
});

searchMobile.autocomplete.on('autocomplete:cursorchanged', function() {
    mobileEnableEnter = false;
});

searchMobile.autocomplete.on('autocomplete:cursorremoved', function() {
    mobileEnableEnter = true;
});

searchMobile.autocomplete.on('autocomplete:shown', function() {
    if (isApiPage()) {
        enhanceApiResultStyles();
        setApiEndpointAsSubcategory();
        appendHomeLinkToAutocompleteWidget();
    }
})
