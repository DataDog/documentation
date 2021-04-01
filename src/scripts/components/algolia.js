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

const handleApiResultStyleUpdates = () => {
    const headers = document.querySelectorAll('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');
    const contentTitles = document.querySelectorAll('.algolia-docsearch-suggestion--subcategory-column-text');

    headers.forEach(header => {
        if (header.textContent.toLowerCase().includes('api')) {
            header.style.fontWeight = '800';
            header.style.color = '#632ca6';
        }
    })

    contentTitles.forEach(title => {
        const parentAnchor = title.closest('a');

        if (parentAnchor) {
            const closestHeader = parentAnchor.querySelector('.algolia-autocomplete .algolia-docsearch-suggestion--category-header');

            if (closestHeader.textContent.toLowerCase().includes('api')) {
                const apiContentHeader = title.querySelector('.algolia-docsearch-suggestion--title');
                // TODO: swap title with apiContentHeader.text
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
    debug: true // Set debug to true if you want to inspect the dropdown
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
});

// if user clicks search button
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const docsearchInput = document.querySelector(
            '.docssearch-input.ds-input'
        );
        if (docsearchInput.value !== '') {
            window.location = `${baseUrl}/search?s=${docsearchInput.value}`;
        }
    });
}

searchDesktop.autocomplete.on('autocomplete:shown', function() {
    if (isApiPage()) {
        handleApiResultStyleUpdates();
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
    indexName: algoliaConfig.index,
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
