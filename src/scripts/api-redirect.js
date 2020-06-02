// OLD API Redirect to new API page
// only fire code on API page
// only redirect when user visits https://docs.datadoghq.com/api/#some-anchor and some-anchor exists as an API page like https://docs.datadoghq.com/api/v1/some-anchor

import redirectUrls from './config/testapi-map';

function redirectToAPIPage() {
    let url = "";

    const {env} = document.documentElement.dataset;
    
    if (env === "preview") {
        url = `https://docs-staging.datadoghq.com/${document.documentElement.dataset.commitRef}/`
    } else if (env === "live") {
        url = "https://docs.datadoghq.com/"
    } else {
        url = "http://localhost:1313/"
    }

    // check if on main /api/ page
    if (window.location.origin + window.location.pathname ===  `${url}api/`) {

        if (window.location.hash) {

            redirectUrls.some((redirectUrl) => {
                if (window.location.hash === redirectUrl.anchor) {

                    window.location.href = `${url}${
                        redirectUrl.redirectURL
                    }`;

                    return null;
                }

                return null;
            });
        }
    }
}

redirectToAPIPage();

export { redirectToAPIPage };
