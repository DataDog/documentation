/* eslint no-console: ["error", { allow: ["log", "warn"] }] */
import Cookies from 'js-cookie';
import datadogLogs from './components/dd-browser-logs-rum';

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

const getUrlVars = () => {
	const vars = {};
	const href = window.location.href.replace(window.location.hash, '');
    href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
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
		previewPath = uri.split('/').slice(0,3).join('/');
		uri = uri.replace(previewPath, '');
		logMsg += `Preview path is ${ previewPath }, URI set to: ${ uri } `;
	}

	if ( subMatch.length ) {
		// order of precedence: url > cookie > header
		if ( params['lang_pref'] && allowedLanguages.indexOf(params['lang_pref']) !== -1 ) {
			acceptLanguage = params['lang_pref'];

			logMsg += `Change acceptLanguage based on URL Param: ${ acceptLanguage }`;

			Cookies.set("lang_pref", acceptLanguage, {path: cookiePath});

			window.location.replace( window.location.origin + `${ previewPath }/${ uri }`.replace(/\/+/g,'/') );
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
				const dest = `${ previewPath }/${ acceptLanguage }/${ uri.replace(curLang, '') }`.replace(/\/+/g,'/');

				logMsg += `; acceptLanguage ${ acceptLanguage } not in URL, triggering redirect to ${ dest }`;

				Cookies.set("lang_pref", acceptLanguage, {path: cookiePath});
				window.location.replace( dest );
			}
		}

		datadogLogs.logger.debug("Lang-Redirects", { log: logMsg, requested_url: baseURL, subdomain, uri, acceptLanguage, previewPath });
	}
}

// window.addEventListener('load', handleLanguageBasedRedirects, false);
handleLanguageBasedRedirects();