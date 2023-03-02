import Cookies from 'js-cookie';
import config from './config/regions.config'

// need to wait for DOM since this script is loaded in the <head>
document.addEventListener('DOMContentLoaded', () => {
    const regionSelector = document.querySelector('.js-region-select')
    const currentUserSavedRegion = Cookies.get('site')
    const currentReferrerAppRegion = getDDSiteFromReferrer()

    // keep docs/app saved regions in sync.   if user navigates to docs from app,
    // we want docs links back to the app returning user to DD app region they came from.
    // reloading resets document.referrer ensuring user region remains in sync.
    if (currentReferrerAppRegion && currentReferrerAppRegion !== currentUserSavedRegion) {
        regionOnChangeHandler(currentReferrerAppRegion)
        window.location.reload()
    } else {
        redirectToRegion()
    }
    hideNonRegionSpecificTOC()

    if (regionSelector) {
        const options = regionSelector.querySelectorAll('.dropdown-item');

        options.forEach(option => {
            option.addEventListener('click', () => {
                const region = option.dataset.value;
                regionOnChangeHandler(region);
                hideNonRegionSpecificTOC(true)
            })
        })
    }
});

// returns the Datadog site associated with referrer URL, if applicable.
// i.e. 'app.datadoghq.eq' => 'eu'
const getDDSiteFromReferrer = () => {
    const ddFullSitesObject = config.dd_full_site
    let referrerSite = ''

    if (document.referrer) {
        const referrerHostname = new URL(document.referrer).hostname

        for (const site in ddFullSitesObject) {
            if (ddFullSitesObject[site] === referrerHostname) {
                referrerSite = site
            }
        }
    }
    
    return referrerSite
}

function replaceButtonInnerText(value) {
    const selectedRegion = config.dd_datacenter[value];
    const regionSelector = document.querySelector('.js-region-select');
    const buttonInner = regionSelector.querySelector('.btn-inner');
    buttonInner.innerText = selectedRegion;
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
    } else if (config.allowedRegions.includes(region)) {
        showRegionSnippet(region);
        replaceButtonInnerText(region);
        Cookies.set('site', region, { path: '/' });
    } else {
        redirectToRegion(region);
    }
}

/**
 * Hides Hugo TOC items that are not {{% site-region %}} specific
 * @param {boolean} regionSelected - region selected via site select dropdown
 */
function hideNonRegionSpecificTOC(regionSelected=false) {
    const allTOCItems = document.querySelectorAll('#TableOfContents li')
    const hiddenHeaders = document.querySelectorAll('.site-region-container.d-none > h3')
    const hiddenHeaderIDs = [...hiddenHeaders].map(el => `#${el.id}`)

    allTOCItems.forEach(item => {
        const refID = item.querySelector('a')?.hash
        if(regionSelected){
            // display all items
            item.classList.remove('d-none')
        }
        if(hiddenHeaderIDs.includes(refID)){
            item.classList.add('d-none')
        }
    })
}

function showRegionSnippet(newSiteRegion) {
    const regionSnippets = document.querySelectorAll('[data-region]');
    const regionParams = document.querySelectorAll('[data-region-param]');

    // build list of external app links using config
    let externalLinksQuery = '';
    Object.entries(config.dd_full_site).forEach(e => {
        externalLinksQuery += `#mainContent a[href*="${e[1]}"],`
    })

    // query selector for all app links, removing trailing comma
    const externalLinks = document.querySelectorAll(externalLinksQuery.slice(0, -1));

    regionSnippets.forEach(regionSnippet => {
        const { region } = regionSnippet.dataset;

        if (region.split(',').indexOf(newSiteRegion) === -1) {
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
            link.href = `https://${config.dd_full_site[newSiteRegion]}${link.pathname}${link.search}${link.hash}`;
        });
    }
}

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

export { redirectToRegion, getDDSiteFromReferrer };
