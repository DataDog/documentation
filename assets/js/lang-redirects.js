/* eslint no-console: ["error", { allow: ["log", "warn"] }] */
import Cookies from 'js-cookie';
/* eslint-disable no-unused-vars */

// This is a placeholder array meant to filter any paths that we want to ignore redirect rules.
const ignoredPaths = [];

/* eslint-enable no-unused-vars */

const allowedLanguages = ['en', 'ja', 'fr'];
const redirectLanguages = ['ja', 'fr'];
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
    href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
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
	let uri = thisUrl.pathname;
	let previewPath = '';
	let acceptLanguage = 'en';
	let logMsg = '';

	const curLang = uri.split('/').filter((i) => allowedLanguages.indexOf(i) !== -1);

	/* Update URI based on preview links. Branch/feature needs to be moved in front of language redirect
		instead of being appended to the end
		ex: /mybranch/myfeature/index.html => /mybranch/myfeature/ja/index.html
	*/
	if ( subdomain.includes('preview') || subdomain.includes('docs-staging') ) {
		const commitRef = `/${document.documentElement.dataset.commitRef}`;

		previewPath = commitRef || uri.split('/').slice(0,3).join('/');
		uri = uri.replace(previewPath, '');
		logMsg += `Preview path is ${ previewPath }, URI set to: ${ uri } `;
	}

	if ( subMatch.length ) {
		// order of precedence: url > cookie > header
		if ( params['lang_pref'] ) {
			if (allowedLanguages.indexOf(params['lang_pref']) !== -1) {
				acceptLanguage = params['lang_pref'];

				logMsg += `Change acceptLanguage based on URL Param: ${ acceptLanguage }`;

				Cookies.set("lang_pref", acceptLanguage, {path: cookiePath});

				window.location.replace( window.location.origin + `${ previewPath }/${ uri }${getQueryString(params)}`.replace(/\/+/g,'/') );
			} else {
				// If lang_pref query parameter is present but not an accepted language, remove it from query string without redirecting.
				const updatedUrl = window.location.origin + `${ previewPath }/${ uri }${getQueryString(params)}`.replace(/\/+/g,'/');
				window.history.pushState({}, document.title, updatedUrl);
			}
		}

		else if ( Cookies.get('lang_pref') && allowedLanguages.indexOf(Cookies.get('lang_pref')) !== -1 ) {
			acceptLanguage = Cookies.get('lang_pref');

			logMsg += `Change acceptLanguage based on lang_pref Cookie: ${ acceptLanguage }`;
		}

		else if ( redirectLanguages.indexOf(supportedLanguage) !== -1 ) {
			logMsg += `Set acceptLanguage based on navigator.language header value: ${  supportedLanguage  } ; DEBUG: ${ supportedLanguage.startsWith('ja') }`;

			acceptLanguage = redirectLanguages.filter(lang => supportedLanguage.match(lang)).toString();
		}

		if ( !uri.includes(`/${ acceptLanguage }/`) ) {
			if (acceptLanguage === 'en') {
				logMsg += '; desired language not in URL, but dest is `EN` so this is OK';
			}
			else {
				const dest = `${ previewPath }/${ acceptLanguage }/${ uri.replace(curLang, '') }${getQueryString(params)}`.replace(/\/+/g,'/');

				logMsg += `; acceptLanguage ${ acceptLanguage } not in URL, triggering redirect to ${ dest }`;

				Cookies.set("lang_pref", acceptLanguage, {path: cookiePath});

				window.location.replace( dest );
			}
		}
	}
	if ( window.DD_LOGS ) {
		window.DD_LOGS.logger.info("Lang-Redirects", { log: logMsg, requested_url: baseURL, subdomain, uri, acceptLanguage, previewPath });
	}
}

handleLanguageBasedRedirects();
