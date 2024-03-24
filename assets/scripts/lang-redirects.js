/* eslint no-console: ["error", { allow: ["log", "warn"] }] */
import Cookies from 'js-cookie';
/* eslint-disable no-unused-vars */

// This is a placeholder array meant to filter any paths that we want to ignore redirect rules.
const ignoredPaths = [];

/* eslint-enable no-unused-vars */

const allowedLanguages = ['en', 'ja', 'fr', 'ko'];
const redirectLanguages = ['ja', 'fr', 'ko'];
const enabledSubdomains = [
    'www',
    'docs',
    'docs-staging',
    'corpsite-preview',
    'corpsite-staging',
    'localhost'
];
const cookiePath = '/';

export const getUrlVars = () => {
    const vars = {};
    const href = window.location.href.replace(window.location.hash, '');
    href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

// All query parameters should be retained with the exception of 'lang_pref', which we don't want being indexed/crawled.
export const getQueryString = (params) => {
    if (Object.prototype.hasOwnProperty.call(params, 'lang_pref')) {
        delete params.lang_pref;
    }

    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    return queryString.length > 0 ? `?${queryString}` : '';
}

export function handleLanguageBasedRedirects() {
    const params = getUrlVars();
    const thisUrl = new URL(window.location.href);
    const supportedLanguage = navigator.language.split('-')[0] || navigator.browserLanguage.split('-')[0];
    const baseURL = thisUrl.hostname;
    const subdomain = baseURL.split('.')[0];
    const subMatch = enabledSubdomains.filter((i) => subdomain === i);
    const cookieDomain = subdomain === 'localhost' ? 'localhost' : '.datadoghq.com';
    let uri = thisUrl.pathname;
    let previewPath = '';
    let acceptLanguage = 'en';
    let logMsg = '';

    const curLang = uri.split('/').filter((i) => allowedLanguages.indexOf(i) !== -1);

    /* Update URI based on preview links. Branch/feature needs to be moved in front of language redirect
        instead of being appended to the end
        ex: /mybranch/myfeature/index.html => /mybranch/myfeature/ja/index.html
    */


    // Remove legacy site-specific domain cookie
    if (Cookies.get('lang_pref', { domain: 'docs.datadoghq.com' })) {
        Cookies.remove('lang_pref', { domain: 'docs.datadoghq.com' });
    }

    if (Cookies.get('lang_pref', { domain: 'docs-staging.datadoghq.com' })) {
        Cookies.remove('lang_pref', { domain: 'docs-staging.datadoghq.com' });
    }

    if (subdomain.includes('preview') || subdomain.includes('docs-staging')) {
        const commitRef = `/${document.documentElement.dataset.commitRef}`;

        previewPath = commitRef || uri.split('/').slice(0, 3).join('/');
        uri = uri.replace(previewPath, '');
        logMsg += `Preview path is ${previewPath}, URI set to: ${uri} `;
    }

    if (subMatch.length) {

        // By default, set the lang_pref cookie based on the url path. This can be overriden by the subsequent logic below
        const langCookie = Cookies.get('lang_pref');
        const tmpCurLang = curLang.length == 0 ? ['en'] : curLang;
        let defaultLangFlag = false;
        
        // If the lang cookie is not found OR the lang cookie value is not equal to the lang found in the URL
        // then set the lang cookie to equal whatever is in the URL (or set it to default 'en')
        if (!langCookie || langCookie != tmpCurLang[0]) {
            defaultLangFlag = true;
            Cookies.set("lang_pref", tmpCurLang[0], { path: cookiePath, domain: cookieDomain });
        }

        /** order of precedence: url > cookie > header **/ 
        // If lang found in the URL
        if (params['lang_pref']) {
            // If the lang found in the URL is valid
            if (allowedLanguages.indexOf(params['lang_pref']) !== -1) {
                acceptLanguage = params['lang_pref'];

                logMsg += `Change acceptLanguage based on URL Param: ${acceptLanguage}`;

                Cookies.set("lang_pref", acceptLanguage, { path: cookiePath, domain: cookieDomain });

                window.location.replace(window.location.origin + `${previewPath}/${uri}${getQueryString(params)}`.replace(/\/+/g, '/'));
            } else {
                // If lang_pref query parameter is present but not an accepted language, remove it from query string without redirecting.
                const updatedUrl = window.location.origin + `${previewPath}/${uri}${getQueryString(params)}`.replace(/\/+/g, '/');
                window.history.pushState({}, document.title, updatedUrl);
            }
        }

        // If the lang cookie is found AND it's a valid lang AND the cookie has not already been set by default
        else if (Cookies.get('lang_pref') && allowedLanguages.indexOf(Cookies.get('lang_pref')) !== -1 && !defaultLangFlag) {
            acceptLanguage = Cookies.get('lang_pref');

            logMsg += `Change acceptLanguage based on lang_pref Cookie: ${acceptLanguage}`;
        }

        else if (redirectLanguages.indexOf(supportedLanguage) !== -1) {
            logMsg += `Set acceptLanguage based on navigator.language header value: ${supportedLanguage} ; DEBUG: ${supportedLanguage.startsWith('ja')}`;

            acceptLanguage = redirectLanguages.filter(lang => supportedLanguage.match(lang)).toString();
        }

        if (!uri.includes(`/${acceptLanguage}/`)) {
            if (acceptLanguage === 'en') {
                logMsg += '; desired language not in URL, but dest is `EN` so this is OK';
            }
            else {
                const dest = `${previewPath}/${acceptLanguage}/${uri.replace(curLang, '')}${getQueryString(params)}`.replace(/\/+/g, '/');

                logMsg += `; acceptLanguage ${acceptLanguage} not in URL, triggering redirect to ${dest}`;

                Cookies.set("lang_pref", acceptLanguage, { path: cookiePath, domain: cookieDomain });

                window.location.replace(dest);
            }
        }


    }
    if (window.DD_LOGS) {
        window.DD_LOGS.logger.info("Lang-Redirects", { log: logMsg, requested_url: baseURL, subdomain, uri, acceptLanguage, previewPath });
    }
}

handleLanguageBasedRedirects();