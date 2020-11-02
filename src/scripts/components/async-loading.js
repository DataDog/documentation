import { updateTOC, buildTOCMap } from './table-of-contents';
import codeTabs from './codetabs';
import { redirectToRegion } from '../region-redirects';
import { initializeIntegrations } from './integrations';
import { initializeSecurityRules } from './security-rules';
import {updateMainContentAnchors, reloadWistiaVidScripts, gtag } from '../helpers/helpers';
import configDocs from '../config/config-docs';
import {redirectCodeLang, addCodeTabEventListeners} from './code-languages';

const { env } = document.documentElement.dataset;
const { gaTag } = configDocs[env];


function loadPage(newUrl) {
    // scroll to top of page on new page load
    window.scroll(0, 0);

    let mainContent = document.getElementById('mainContent');

    if (mainContent) {
        const currentTOC = document.querySelector('.js-toc-container');

        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            // cancel httprequest if hash is changed to prevent page replacing
            window.addEventListener('hashchange', function () {
                httpRequest.abort();
            });

            if (httpRequest.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            const newDocument = httpRequest.responseXML;

            if (newDocument === null) {
                return;
            }

            const mainContentWrapper = document.querySelector(
                '.mainContent-wrapper'
            );
            const newmainContentWrapper = httpRequest.responseXML.querySelector(
                '.mainContent-wrapper'
            );

            const newContent = httpRequest.responseXML.getElementById(
                'mainContent'
            );
            const newTOC = httpRequest.responseXML.querySelector(
                '.js-toc-container'
            );

            if (newContent === null) {
                return;
            }

            document.title = newDocument.title;

            const meta = {
                itemprop: ['name', 'description'],
                name: [
                    'twitter\\:site',
                    'twitter\\:title',
                    'twitter\\:description',
                    'twitter\\:creator'
                ],
                property: [
                    'og\\:title',
                    'og\\:type',
                    'og\\:url',
                    'og\\:image',
                    'og\\:description',
                    'og\\:site_name',
                    'article\\:author'
                ]
            };

            const keys = Object.keys(meta);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                for (let k = 0; k < meta[key].length; k++) {
                    const selectorPart = meta[key][k];
                    try {
                        if (
                            newDocument.head.querySelector(
                                `[${key}=${selectorPart}]`
                            )
                        ) {
                            const { content } = newDocument.head.querySelector(
                                `[${key}=${selectorPart}][content]`
                            );
                            document.head.querySelector(
                                `[${key}=${selectorPart}][content]`
                            ).content = content;
                        }
                    } catch (e) {
                        console.log(e); // eslint-disable-line no-console
                    }
                }
            }

            // update data-relPermalink
            document.documentElement.dataset.relpermalink =
                newDocument.documentElement.dataset.relpermalink;

            // check if loaded page has inline JS. if so, we want to return as script will not execute
            const hasScript = newContent.getElementsByTagName('script').length;

            // if there is error finding the element, reload page at requested url
            if (mainContent.parentElement && !hasScript) {
                mainContent.parentElement.replaceChild(newContent, mainContent);
                mainContent = newContent;

                // update mainContent-wrapper classes
                mainContentWrapper.className = `${newmainContentWrapper.classList}`;
            } else {
                window.location.href = newUrl;
            }

            const wistiaVid = document.querySelector(
                '.wistia [data-wistia-id]'
            );

            let wistiaVidId;
            if (wistiaVid) {
                wistiaVidId = wistiaVid.dataset.wistiaId;
            }

            initializeSecurityRules();

            // if newly requested TOC is NOT disabled
            if (newTOC.querySelector('#TableOfContents')) {
                currentTOC.replaceWith(newTOC);
                buildTOCMap();
                updateTOC();
                updateMainContentAnchors();
                reloadWistiaVidScripts(wistiaVidId);
                initializeIntegrations();
            } else if (
                document.querySelector('.js-toc-container #TableOfContents')
            ) {
                // toc is disabled, but old TOC exists and needs to be removed.
                document
                    .querySelector('.js-toc-container #TableOfContents')
                    .remove();
                updateTOC();
            }

            const pathName = new URL(newUrl).pathname;

            // sets query params if code tabs are present

            codeTabs();

            const regionSelector = document.querySelector('.js-region-selector');
            if (regionSelector) {
                redirectToRegion(regionSelector.value);
            }

            addCodeTabEventListeners();
            redirectCodeLang();

            // Gtag virtual pageview
            gtag('config', gaTag, { page_path: pathName });

            // Marketo
            if (typeof window.Munchkin !== 'undefined') {
                window.Munchkin.munchkinFunction('clickLink', { href: newUrl });
            } else {
                window.DD_LOGS.logger.info('Munchkin called before ready..');
            }
        }; // end onreadystatechange

        httpRequest.responseType = 'document';
        httpRequest.open('GET', newUrl);
        httpRequest.send();
    } else {
        window.location.href = newUrl;
    }
}

export {loadPage};
