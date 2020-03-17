import Cookies from 'js-cookie';
import config from '../../regions.config';
// import datadogLogs from './components/dd-browser-logs-rum';

// const config.allowedRegions = ['us', 'eu'];

// need to wait for DOM since this script is loaded in the <head>
document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.querySelector('.js-region-selector');

    if (regionSelector) {
        regionSelector.addEventListener('change', regionOnChangeHandler);
    }
});

function regionOnChangeHandler(event) {
    console.log('regionOnChangeHandler event: ', event)
    const queryParams = new URLSearchParams(window.location.search);
    let siteRegion = '';

    siteRegion = event.target.value;
    // on change, if query param exists, update the param
    if (config.allowedRegions.includes(queryParams.get('site'))) {
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
    console.log('showRegionSnippet')
    console.log('newSiteRegion: ', newSiteRegion);
    const regionSnippets = document.querySelectorAll('[data-region]');
    const regionParams = document.querySelectorAll('[data-region-param]');
    const externalLinks = document.querySelectorAll(
        '#mainContent a[href*="app.datadoghq."]'
    );

    regionSnippets.forEach(regionSnippet => {
        const { region } = regionSnippet.dataset;

        // hide snippet if not active region
        if (region !== newSiteRegion) {
            regionSnippet.classList.add('d-none');
        } else {
            regionSnippet.classList.remove('d-none');
        }
    });

    regionParams.forEach(param => {
        const { regionParam } = param.dataset;

        // check if the region config object has the key specified in the hugo shortcode
        if (!Object.prototype.hasOwnProperty.call(config, regionParam)) {
            throw new Error(
                `The key used in the hugo shortcode, ${regionParam}, was not found in the regions.config.js file.`
            );
        } else {
            param.innerHTML = config[regionParam][newSiteRegion];
        }
    });

    if (externalLinks) {
        externalLinks.forEach(link => {
            link.href = `https://app.${config.dd_site[newSiteRegion]}${link.pathname}`;
        });
    }
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

    console.log('window.document.referrer: ', window.document.referrer);
    console.log(`${window.location.protocol}//${window.location.host}`)

    if (config.allowedRegions.includes(queryParams.get('site'))) {
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
        config.allowedRegions.includes(Cookies.get('site'))
    ) {
        if (newSiteRegion !== '') {
            Cookies.set('site', newSiteRegion, { path: '/' });
            showRegionSnippet(newSiteRegion);
        } else {
            newSiteRegion = Cookies.get('site');
            showRegionSnippet(newSiteRegion);
        }
    } else {
        newSiteRegion = 'us';

        Cookies.set('site', newSiteRegion, { path: '/' });

        showRegionSnippet(newSiteRegion);
    }

    console.log('newSiteRegion: ', newSiteRegion)

    if (regionSelector) {
        regionSelector.value = newSiteRegion;
    }
}

export { redirectToRegion, showRegionSnippet, regionOnChangeHandler };

redirectToRegion('');
