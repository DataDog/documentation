import CookieHandler from './utils/cookieJar';

export const UTMCookies = new CookieHandler({
    domain: `.datadoghq.com`,
    // domain: `localhost`,
    path: '/',
    sameSite: 'strict',
    secure: true
});

// Iterate over paramaters and set cookies
function utmHandler() {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    params.forEach((value, param) => {
        if (param.startsWith('utm')) {
            UTMCookies.set(`dd-${param.replace('_', '-')}`, value);
        }
    });
}

function ctaHandler() {
    const ctaList = document.querySelectorAll('[class*=js-cta-]');

    function getCTAName(element) {
        let className = null;

        element.classList.forEach((item) => {
            if (item.startsWith('js-cta-')) {
                className = item;
            }
        });

        if (className) {
            return className;
        } else {
            throw new Error('No CTA classname found');
        }
    }

    function clearCTACookies() {
        const allCookies = UTMCookies.getAll();

        for (const cookie in allCookies) {
            if (Object.prototype.hasOwnProperty.call(allCookies, cookie)) {
                if (cookie === 'dd-utm-url' || cookie === 'dd-utm-conversion') {
                    UTMCookies.remove(cookie);
                }
            }
        }
    }

    if (ctaList) {
        clearCTACookies();

        ctaList.forEach((cta) => {
            const ctaName = getCTAName(cta);

            cta.addEventListener('click', () => {
                const url = new URL(window.location.href);
                const params = url.searchParams;
                const { hostname, pathname } = url;

                params.append('utm_url', `${hostname}${pathname}`);
                params.append('utm_conversion', `${ctaName}`);

                UTMCookies.set('dd-utm-url', `${hostname}${pathname}`);
                UTMCookies.set('dd-utm-conversion', `${ctaName}`);
            });
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    utmHandler();
    ctaHandler();
});
