import { DOMReady } from '../helpers/documentReady';
import { isMobile } from '../utils/isMobile';
import { getGeoloc, getAppBaseUrl } from 'geo-locate';
import { UTMCookies } from '../utms';

const doOnLoad = () => {
    const signupModal = document.getElementById('signupModal');

    const getLanguageParam = () => {
        let langParam = '';
        let lang = '';

        if (document.documentElement.lang) {
            lang = document.documentElement.lang;
        } else {
            lang = ddc.lang;
        }

        if (lang === 'fr' || lang === 'ja' || lang === 'ko') {
            langParam = `?lang=${lang}`;
        } else {
            langParam = '';
        }

        return langParam;
    };

    const appendUrlQueryParams = (url) => {
        let completeUrl = url;
        let operator = completeUrl.includes('?') ? '&' : '?';
        const currentUrl = new URL(window.location.href);
        const currentParams = currentUrl.searchParams;

        // If non-english lang, append param
        if (getLanguageParam()) {
            completeUrl += `${operator}${getLanguageParam()}`;
            operator = '&';
        }

        // If mobile, append param
        if (isMobile()) {
            completeUrl += `${operator}mobile=true`;
            operator = '&';
        }

        // Convert selected cookies to query params so they are preserved during signup process per https://datadoghq.atlassian.net/browse/WEB-4695
        const allCookies = UTMCookies.getAll();
        let customSignupUTM = ['gclid', 'MSCLKID', '_mkto_trk'];
        for (const [key, value] of Object.entries(allCookies)) {
            if (customSignupUTM.includes(key)) {
                completeUrl += `${operator}${key}=${encodeURIComponent(value)}`;
                operator = '&';
            }
        }

        // Rebuild UTM params from original query params
        let utmParam = false;
        currentParams.forEach((value, key) => {
            if (key.startsWith('utm')) {
                utmParam = true;
                completeUrl += `${operator}${`dd-${key.replace('_', '-')}`}=${encodeURIComponent(value)}`;
                operator = '&';
            }
        });

        // If no UTM values were detected in query params, check to see if they already exist as a cookie
        if (!utmParam) {
            const allCookies = UTMCookies.getAll();
            for (const [key, value] of Object.entries(allCookies)) {
                if (key.includes('dd-utm')) {
                    completeUrl += `${operator}${key}=${encodeURIComponent(value)}`;
                    operator = '&';
                }
            }
        }

        return completeUrl;
    };

    signupModal.addEventListener('show.bs.modal', () => {

        getGeoloc().then((loc) => {
            const baseUrl = `https://${getAppBaseUrl(loc.appRegion)}/signup_corp`;
            document.querySelector('#signUpIframe').setAttribute('src', appendUrlQueryParams(baseUrl));;
        });
    });

    signupModal.addEventListener('hide.bs.modal', () => {
        document.querySelector('#signUpIframe').setAttribute('src', '');
    });

    const imageModal = document.getElementById('popupImageModal');
    let modalContent, modalBody, modalDialog;

    if (imageModal) {
        modalContent = imageModal.querySelector('.modal-content');
        modalBody = imageModal.querySelector('.modal-body');
        modalDialog = imageModal.querySelector('.modal-dialog');

        imageModal.addEventListener('show.bs.modal', (e) => {
            const loaderElement = document.createElement('div');
            const imageElement = document.createElement('img');
            const url = `${e.relatedTarget.href}&w=${window.innerWidth}&h=${window.innerHeight}`;
            const srcsetUrl = `${url}, ${url}&dpr=2 2x`;

            loaderElement.setAttribute('class', 'loader');
            loaderElement.style.position = 'absolute';
            loaderElement.style.top = '50%';
            loaderElement.style.margin = '-50px 0 0 -50px';
            loaderElement.style.height = '100px';
            loaderElement.style.width = '100px';

            imageElement.setAttribute('src', url);
            imageElement.setAttribute('srcset', srcsetUrl);
            imageElement.setAttribute('class', 'img-fluid');
            imageElement.style.display = 'none';
            imageElement.addEventListener('load', (e) => {
                resize(imageElement.naturalWidth, imageElement.naturalHeight);
                loaderElement.style.display = 'none';
                imageElement.style.display = 'block';
            });

            document.querySelector('body').classList.remove('modal-open');

            if (modalContent) {
                modalContent.style.background = 'transparent';
                modalContent.style.border = 'none';
                modalContent.style.height = '100%';
            }

            if (modalBody) {
                modalBody.style.height = '100%';
                modalBody.appendChild(loaderElement);
                modalBody.appendChild(imageElement);
            }

            if (modalDialog) {
                modalDialog.style.height = '100%';
            }
        });

        imageModal.addEventListener('hide.bs.modal', () => {
            modalBody.replaceChildren();
        });

        window.addEventListener('resize', () => {
            imageModalVisible = !!(
                imageModal.offsetWidth ||
                imageModal.offsetHeight ||
                imageModal.getClientRects().length
            );
            if (imageModalVisible) {
                const imageElement = imageModal.querySelector('img');
                resize(imageElement.naturalWidth, imageElement.naturalHeight);
            }
        });
    }

    function resize(w, h) {
        var el = document.querySelector('#popupImageModal .modal-body img');
        var p = document.querySelector('#popupImageModal .modal-dialog');
        var parentW = (parseInt(window.innerWidth) / 100) * 90;
        var parentH = (parseInt(window.innerHeight) / 100) * 90;

        if (el && p && w && h) {
            /* Reset apparent image size first so container grows */
            el.style.width = '';
            el.style.height = '';
            p.style.width = '';
            p.style.height = '';

            /* Calculate the worst ratio so that dimensions fit */
            /* Note: -1 to avoid rounding errors */
            var ratio = Math.max(w / (parentW - 1), h / (parentH - 1));
            /* Resize content */
            if (ratio > 1) {
                ratio = h / Math.floor(h / ratio); /* Round ratio down so height calc works */
                el.style.width = `${w / ratio}px`;
                el.style.height = `${h / ratio}px`;
                p.style.width = `${w / ratio}px`;
                p.style.height = `${h / ratio}px`;
            } else {
                el.style.width = `${w}px`;
                el.style.height = `${h}px`;
                p.style.width = `${w}px`;
                p.style.height = `${h}px`;
            }
        }
    }
};

DOMReady(doOnLoad);
