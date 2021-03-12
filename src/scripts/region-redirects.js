import Cookies from 'js-cookie';
import config from '../../regions.config';

// need to wait for DOM since this script is loaded in the <head>
document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.querySelector('.js-region-select');

    if (regionSelector) {
        const options = regionSelector.querySelectorAll('.dropdown-item');

        options.forEach(option => {
            option.addEventListener('click', () => {
                const region = option.dataset.value;
                regionOnChangeHandler(region);
            })
        })
    }
});

function replaceButtonInnerText(value) {
    const selectedRegion = config.dd_datacenter[value];
    const regionSelector = document.querySelector('.js-region-select');
    const buttonInner = regionSelector.querySelector('.btn-inner');
    buttonInner.innerText = selectedRegion;
}

function isReferrerEU() {
    if (window.document.referrer.includes('datadoghq.eu') &&
    window.document.referrer.indexOf(
        `${window.location.protocol}//${window.location.host}` // check referrer is not from own domain
    ) === -1) {
        return true;
    }

    return false;
}

function regionOnChangeHandler(region) {
    const queryParams = new URLSearchParams(window.location.search);

    // on change, if query param exists, update the param
    if (config.allowedRegions.includes(queryParams.get('site'))) {
        queryParams.set('site', region);

        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${queryParams}`
        );

        showRegionSnippet(region);
        replaceButtonInnerText(region);
        Cookies.set('site', region, { path: '/' });
    } else if (isReferrerEU()) {
        // need to reload the page if referrer is from EU to reset window.document.referrer
        Cookies.set('site', region, { path: '/' });
        window.location.reload();
    }
    else if (config.allowedRegions.includes(region)){
        showRegionSnippet(region);
        replaceButtonInnerText(region);
        Cookies.set('site', region, { path: '/' });
    } else {
        redirectToRegion(region);
    }
}

function showRegionSnippet(newSiteRegion) {
    const regionSnippets = document.querySelectorAll('[data-region]');
    const regionParams = document.querySelectorAll('[data-region-param]');
    const externalLinks = document.querySelectorAll(
        '#mainContent a[href*="app.datadoghq."]'
    );

    regionSnippets.forEach(regionSnippet => {
        const { region } = regionSnippet.dataset;

        if (!region.includes(newSiteRegion)) {
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
            // checks if there are two `<code>` elements next to each other, and allows them to 'blend' together(no padding or border radius in between the two)
            if (param.previousElementSibling && param.previousElementSibling.tagName === 'CODE'){
                param.previousElementSibling.style.paddingRight = '0';
                param.previousElementSibling.style.borderTopRightRadius = '0';
                param.previousElementSibling.style.borderBottomRightRadius = '0';
            }
        }
    });

    if (externalLinks) {
        externalLinks.forEach(link => {
            link.href = `https://${config.dd_full_site[newSiteRegion]}${link.pathname}${link.hash}`;
        });
    }
}

// have option to pass new site region to function.
function redirectToRegion(region = '') {
    const regionSelector = document.querySelector('.js-region-select');
    const queryParams = new URLSearchParams(window.location.search);

    let newSiteRegion = region;

    if (config.allowedRegions.includes(queryParams.get('site'))) {
        newSiteRegion = queryParams.get('site');
        showRegionSnippet(newSiteRegion);

        Cookies.set('site', newSiteRegion, { path: '/' });
    } else if (newSiteRegion !== '') {
        Cookies.set('site', newSiteRegion, { path: '/' });
        showRegionSnippet(newSiteRegion);
    } else if (isReferrerEU()) {
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

    if (regionSelector) {
        replaceButtonInnerText(newSiteRegion);
    }
}

redirectToRegion();

export { redirectToRegion, showRegionSnippet, regionOnChangeHandler };
