import { DOMReady } from '../helpers/documentReady';
import { isMobile } from '../utils/isMobile';
import { getGeoloc, getAppBaseUrl } from 'geo-locate';
import { UTMCookies } from '../utms';
import { getSignupFailover } from 'signup-failover';
import Modal from 'bootstrap/js/dist/modal';

const signupIframe = document.querySelector('#signUpIframe');
const ddc = {
  lang: "",
  env: document.documentElement.dataset.env,
  getLanguage: function () {
    const langAttr = document.querySelector("html").lang;
  },
};

const getLanguageParam = () => {
  let lang = "";
  let langParam = "";

  if (document.documentElement.lang) {
    lang = document.documentElement.lang;
  } else {
    lang = ddc.lang;
  }

  // TODO this is likely broken if ddc.lang returns full name. Needs to be fixed
  if (
    lang === "fr" ||
    lang === "es" ||
    lang === "de" ||
    lang === "ja" ||
    lang === "ko"
  ) {
    langParam = `lang=${lang}`;
  } else {
    langParam = "";
  }

  return langParam;
};

const appendUrlQueryParams = (url) => {
  let completeUrl = url;
  let operator = completeUrl.includes("?") ? "&" : "?";
  const currentUrl = new URL(window.location.href);
  const currentParams = currentUrl.searchParams;

  // If non-english lang, append param
  if (getLanguageParam()) {
    completeUrl += `${operator}${getLanguageParam()}`;
    operator = "&";
  }

  // If mobile, append param
  if (isMobile()) {
    completeUrl += `${operator}mobile=true`;
    operator = "&";
  }

  const allCookies = UTMCookies.getAll();
  let customSignupUTM = ["gclid", "MSCLKID", "_mkto_trk"]; // harcoded list of UTM params to preserve
  for (const [key, value] of Object.entries(allCookies)) {
    // If the cookie value exists in the pre-defined list of desired UTM params, append it to the URL
    if (customSignupUTM.includes(key)) {
      completeUrl += `${operator}${key}=${encodeURIComponent(value)}`;
      operator = "&";
    }
  }

  // Rebuild UTM params from original query params
  let utmParam = false;
  currentParams.forEach((value, key) => {
    if (key.startsWith("utm")) {
      utmParam = true;
      completeUrl += `${operator}${`dd-${key.replace(
        "_",
        "-"
      )}`}=${encodeURIComponent(value)}`;
      operator = "&";
    }
  });

  // If no UTM values were detected in query params, check to see if they already exist as a cookie
  if (!utmParam) {
    const allCookies = UTMCookies.getAll();
    for (const [key, value] of Object.entries(allCookies)) {
      if (key.includes("dd-utm")) {
        completeUrl += `${operator}${key}=${encodeURIComponent(value)}`;
        operator = "&";
      }
    }
  }

  // Try to append RUM device ID and session ID
  if (window.DD_RUM) {
    const rumDeviceId = window.DD_RUM.getUser()
      ? window.DD_RUM.getUser().device_id
      : null;
    if (rumDeviceId) {
      completeUrl += `${operator}dd-device-id=${rumDeviceId}`;
      operator = "&";
    }
    const rumSessionId = window.DD_RUM.getInternalContext()
      ? window.DD_RUM.getInternalContext().session_id
      : null;
    if (rumSessionId) {
      completeUrl += `${operator}dd-session-id=${rumSessionId}`;
      operator = "&";
    }
  }

  // Attempt to extract sweepstakes URL
  const sweepstakesUrl = document.getElementById("signup")
    ? document.getElementById("signup").getAttribute("data-sweepstakes-url")
    : "";
  if (sweepstakesUrl) {
    completeUrl += `${operator}sweepstakes_url=${encodeURIComponent(
      sweepstakesUrl
    )}`;
    operator = "&";
  }

  return completeUrl;
};

const loadSignupFormInFrame = (iframeElement, url) => {
  if (iframeElement) {
    iframeElement.src = url;

    // handle a loading issue
    let iframeLoadIssueHandler = () => {
      let newUrl = url.replace("_corp", "");
      window.open(newUrl);

      const modalBody = document.querySelector(
        "#signupModal > div > .modal-content"
      );
      modalBody.innerHTML = `<div class="text-center small w-100 my-3 p-5">Signup Form loading error. <a href="${newUrl}" class="text-underline text-purple-600" target=_blank>Click here</a> to open in a new window</div>`;
    };

    // if adblock detected & we are trying to load eu signup iframe then show error and open in a new tab
    // until datadoghq.eu is removed from 3rd party blocking lists
    if (url.indexOf(".eu") !== -1 && !document.getElementById("TxFnCdowUQWB")) {
      iframeLoadIssueHandler();
    } 
    
    openSignupModal();
  }
};

document.querySelectorAll('.sign-up-trigger').forEach(item => {
  item.addEventListener('click', (event) => {
      event.preventDefault();

      getSignupFailover().then((failoverEnabled) => {
          if (failoverEnabled) {
              const demoModal = document.querySelector('#signupDemo');
              const signupDemoModal = demoModal ? new Modal(demoModal) : null;
              if(signupDemoModal) {
                signupDemoModal.show(item);
              }
          } else {
              initSignup();
          }
      });
  })
})

const initSignup = () => {
  let baseUrl = "";
  let completeUrl = "";
  let cleanCenter = "true";
  let eventV2Param = "&event_v2=true";

  if (document.querySelector(".clean-center-false")) {
    cleanCenter = "false";
  }

  // Event v2 cannot simply be set to false, it must be omitted
  if (document.querySelector(".event-v2-false")) {
    eventV2Param = "";
  }

  // Get users location and set the signup url accordingly
  getGeoloc().then((loc) => {
    baseUrl = `https://${getAppBaseUrl(loc.appRegion)}/signup_corp?lang=${
      document.documentElement.lang
    }`;
    completeUrl = appendUrlQueryParams(baseUrl);
    loadSignupFormInFrame(signupIframe, completeUrl);
  });
};

const openSignupModal = () => {
  const signupModal = new Modal(document.getElementById('signupModal'));
  signupModal.show();
};

const handleDOMReady = () => {
  // Get users location during page load so dont have to wait on CTA click
  getGeoloc();
};

DOMReady(handleDOMReady);
