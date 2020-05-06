// OLD API Redirect to new API page
// only fire code on API page
// only redirect when user visits https://docs.datadoghq.com/api/#some-anchor and some-anchor exists as an API page like https://docs.datadoghq.com/api/v1/some-anchor

import redirectUrls from './config/testapi-map';

function redirectToAPIPage() {
    let previewPath = '';

    if (window.location.href.includes('docs-staging')) {
        previewPath = `${document.documentElement.dataset.commitRef}`;
    }

    const currentURL =
        window.location.origin + previewPath + window.location.pathname;

    // check if on main /api/ page
    if (currentURL === `${window.location.origin + previewPath}/api/`) {

        if (window.location.hash) {

            redirectUrls.some((redirectUrl) => {
                if (window.location.hash === redirectUrl.anchor) {

                    console.log(
                        'redirect to: ',
                        `${window.location.origin + previewPath}/${
                            redirectUrl.redirectURL
                        }`
                    );

                    window.location.href = `${window.location.origin + previewPath}/${
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
