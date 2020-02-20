import Cookies from 'js-cookie';
// import datadogLogs from './components/dd-browser-logs-rum';

const allowedRegions = ['us', 'eu'];

// need to wait for DOM since this script is loaded in the <head>
document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.querySelector('.js-region-selector');

    if (regionSelector) {
        regionSelector.addEventListener('change', regionOnChangeHandler);
    }
});

function regionOnChangeHandler(event) {
    const queryParams = new URLSearchParams(window.location.search);
    let siteRegion = '';

    siteRegion = event.target.value;
    // on change, if query param exists, update the param
    if (allowedRegions.includes(queryParams.get('site'))) {
        queryParams.set('site', siteRegion);

        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${queryParams}`
        );
        showRegionSnippet(siteRegion);
        Cookies.set('site', siteRegion, { path: '/' });
    } else {
        redirectToRegion(siteRegion);
    }
}

function showRegionSnippet(newSiteRegion) {
    const regionSnippets = document.querySelectorAll(`[data-region]`);
    regionSnippets.forEach(regionSnippet => {
        const { region } = regionSnippet.dataset;

        // hide snippet if not active region
        if (region !== newSiteRegion) {
            regionSnippet.classList.add('d-none');
        } else {
            regionSnippet.classList.remove('d-none');
        }
    });
}

// have option to pass new site region to function.
function redirectToRegion(region = '') {
    const regionSelector = document.querySelector('.js-region-selector');

    const queryParams = new URLSearchParams(window.location.search);

    let newSiteRegion = region;

    // const thisUrl = new URL(window.location.href);
    // const baseURL = thisUrl.hostname;
    // const subdomain = baseURL.split('.')[0];
    // const uri = thisUrl.pathname;
    // const previewPath = '';
    // console.log('region: ', region)
    // console.log('thisUrl: ', thisUrl);
    // console.log('baseURL: ', baseURL);
    // console.log('subdomain: ', subdomain);
    // console.log('uri: ', uri);

    // if (subdomain.includes('preview') || subdomain.includes('docs-staging')) {
    //     previewPath = uri
    //         .split('/')
    //         .slice(0, 3)
    //         .join('/');
    //     uri = uri.replace(previewPath, '');
    //     // logMsg += `Preview path is ${ previewPath }, URI set to: ${ uri } `;
    // }

    // Cookies.set('site', siteRegion, { path: '/' });

    if (allowedRegions.includes(queryParams.get('site'))) {
        newSiteRegion = queryParams.get('site');
        showRegionSnippet(newSiteRegion);

        Cookies.set('site', newSiteRegion, { path: '/' });
    } else if ( 
        window.document.referrer.includes('datadoghq.eu') &&
        window.document.referrer.indexOf(
            `${window.location.protocol}//${window.location.host}` // check referrer is not from own domain
        ) === -1
    ) {
        newSiteRegion = 'eu';
        Cookies.set('site', newSiteRegion, { path: '/' });
        showRegionSnippet(newSiteRegion);
    } else if (
        window.document.referrer.includes('datadoghq.com') &&
        window.document.referrer.indexOf(
            `${window.location.protocol}//${window.location.host}` // check referrer is not from own domain
        ) === -1
    ) {
        // not current domain
        newSiteRegion = 'us';
        Cookies.set('site', newSiteRegion, { path: '/' });
        showRegionSnippet(newSiteRegion);
    } else if (
        Cookies.get('site') &&
        allowedRegions.includes(Cookies.get('site'))
    ) {
        if (newSiteRegion !== '') {
            Cookies.set('site', newSiteRegion, { path: '/' });
            showRegionSnippet(newSiteRegion);
        } else {
            newSiteRegion = Cookies.get('site');
        }

        showRegionSnippet(newSiteRegion);
    } else {
        newSiteRegion = 'us';

        Cookies.set('site', newSiteRegion, { path: '/' });

        showRegionSnippet(newSiteRegion);
    }

    if (regionSelector) {
        regionSelector.value = newSiteRegion;
    }
}

export { redirectToRegion, showRegionSnippet, regionOnChangeHandler };

redirectToRegion('');
