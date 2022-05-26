import Cookies from 'js-cookie';
import { loadPage } from './async-loading'; // eslint-disable-line import/no-cycle

function toggleCodeBlockVisibility(event) {
    const codeSnippetWrapper = event.target.closest('.code-snippet-wrapper');
    const codeSnippet = codeSnippetWrapper.querySelector('.code-snippet');
    const chevronUp = codeSnippetWrapper.querySelector('.chevron-up');
    const chevronDown = codeSnippetWrapper.querySelector('.chevron-down');

    if (codeSnippet && chevronUp && chevronDown) {
        if (!codeSnippet.classList.contains('d-none')) {
            codeSnippet.classList.add('d-none');
            chevronUp.classList.add('d-none');
            chevronDown.classList.remove('d-none');
        } else {
            codeSnippet.classList.remove('d-none');
            chevronUp.classList.remove('d-none');
            chevronDown.classList.add('d-none');
        }
    }
}

function addCodeBlockVisibilityToggleEventListeners() {
    const jsCodeBlockVisibilityToggleList = document.querySelectorAll('.js-code-block-visibility-toggle');

    if (jsCodeBlockVisibilityToggleList.length) {
        jsCodeBlockVisibilityToggleList.forEach(toggleElement => {
            toggleElement.addEventListener('click', toggleCodeBlockVisibility);
        })
    }
}

function addCodeTabEventListeners() {
    const codeLinks = document.querySelectorAll('.js-code-example-link');
    
    if (codeLinks.length) {
        codeLinks.forEach((codeLink) => {
            codeLink.addEventListener('click', codeLangTabClickHandler);
            codeLink.addEventListener('mouseover', codeLangTabHoverHandler);
        });
    }
}

function redirectCodeLang(codeLang = '') {
    let newCodeLang = codeLang;

    const queryParams = new URLSearchParams(window.location.search);
    const { pageCodeLang } = document.documentElement.dataset;

    if (document.documentElement.dataset.type === 'multi-code-lang') {
        newCodeLang = pageCodeLang;

        Cookies.set('code-lang', newCodeLang, { path: '/' });
        toggleCodeBlocks(newCodeLang);
    } else if (queryParams.get('code-lang')) {
        newCodeLang = queryParams.get('code-lang');

        Cookies.set('code-lang', newCodeLang, { path: '/' });
        toggleCodeBlocks(newCodeLang);
    } else if (Cookies.get('code-lang')) {
        if (newCodeLang !== '') {
            Cookies.set('code-lang', newCodeLang, { path: '/' });
            toggleCodeBlocks(newCodeLang);
        } else {
            newCodeLang = Cookies.get('code-lang');
            toggleCodeBlocks(newCodeLang);
        }
    } else {
        // if cookie is not set, default to python
        newCodeLang = 'python';
        Cookies.set('code-lang', newCodeLang, { path: '/' });

        toggleCodeBlocks(newCodeLang);
    }
}

redirectCodeLang();

// When hovering over multi-code-lang tabs make sure proper href is reflected,
// making it easier for support/sales teams to "Copy Link Address" and send correct URL out.
function codeLangTabHoverHandler(event) {
    if (
        document.documentElement.dataset.type === 'multi-code-lang' &&
        (document.body.classList.contains('kind-section') || document.body.classList.contains('kind-page'))
    ) {
        const tabElement = event.target;
        const codeLang = event.target.dataset.codeLangTrigger;
        const { currentSection, baseUrl } = document.documentElement.dataset;
        const updatedHref = `${baseUrl}${currentSection}${codeLang}/?code-lang=${codeLang}`;
        tabElement.href = updatedHref;
    } 
}

function codeLangTabClickHandler(event) {
    const queryParams = new URLSearchParams(window.location.search);
    const codeLang = event.target.dataset.codeLangTrigger;

    const { currentSection, baseUrl } = document.documentElement.dataset;

    event.preventDefault();

    if (queryParams.get('code-lang')) {
        queryParams.set('code-lang', codeLang);
        window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
        Cookies.set('code-lang', codeLang, { path: '/' });
        toggleCodeBlocks(codeLang);
    } else if (
        document.documentElement.dataset.type === 'multi-code-lang' &&
        (document.body.classList.contains('kind-section') || document.body.classList.contains('kind-page'))
    ) {
        Cookies.set('code-lang', codeLang, { path: '/' });
        loadPage(`${baseUrl}${currentSection}${codeLang}`);
        window.history.replaceState({}, '', `${baseUrl}${currentSection}${codeLang}`);
    } else {
        toggleCodeBlocks(codeLang);
        Cookies.set('code-lang', codeLang, { path: '/' });
    }
}

addCodeTabEventListeners();
addCodeBlockVisibilityToggleEventListeners();

function activateCodeLangNav(activeLang) {
    const codeLinks = document.querySelectorAll('.js-code-example-link');

    if (codeLinks.length) {
        codeLinks.forEach((codeLink) => {
            codeLink.classList.remove('active');

            if (codeLink.dataset.codeLangTrigger === activeLang) {
                codeLink.classList.add('active');
            }
        });
    }
}

function toggleCodeBlocks(activeLang) {
    activateCodeLangNav(activeLang);
    toggleMultiCodeLangNav(activeLang);

    // non-api page code blocks
    const codeWrappers = document.querySelectorAll('body:not(.api) [class*=js-code-snippet-wrapper]');

    const allCodeBlocksInWrappers = document.querySelectorAll('.js-code-snippet-wrapper .js-code-block');

    if (allCodeBlocksInWrappers.length) {
        allCodeBlocksInWrappers.forEach((codeBlock) => {
            if (codeBlock.dataset.codeLangBlock === activeLang) {
                codeBlock.style.display = 'block';
            } else {
                codeBlock.style.display = 'none';
            }
        });
    }

    const apiCodeWrappers = document.querySelectorAll('.api [class*=js-code-snippet-wrapper]');

    // there are multiple code wrappers on API pages for each endpoint, need to loop through each wrapper
    // if the active lang, from cookie, or selection does not have an associated code block, default to curl

    if (apiCodeWrappers.length) {
        apiCodeWrappers.forEach((apiCodeWrapper) => {
            const apiCodeBlocks = apiCodeWrapper.querySelectorAll(`[data-code-lang-block="${activeLang}"`);

            const apiCurlCodeBlocks = apiCodeWrapper.querySelectorAll('[data-code-lang-block="curl"');

            if (apiCodeBlocks.length) {
                // loop through code blocks and check if they contain the active lang
                apiCodeBlocks.forEach((apiCodeBlock) => {
                    apiCodeBlock.style.display = 'block';
                });
                if (activeLang !== 'curl') {
                    apiCurlCodeBlocks.forEach((apiCurlCodeBlock) => {
                        apiCurlCodeBlock.style.display = 'none';
                    });
                }
            } else {
                // turn on curl code block for this Code Example wrapper
                apiCurlCodeBlocks.forEach((apiCurlCodeBlock) => {
                    apiCurlCodeBlock.style.display = 'block';

                    apiCodeWrapper.querySelectorAll("[data-code-lang-trigger='curl']").forEach((curlTab) => {
                        curlTab.classList.add('active');
                    });
                });
            }
        });
    }

    if (codeWrappers.length) {
        codeWrappers.forEach((codeWrapper) => {
            const codeBlocks = codeWrapper.querySelectorAll(`[data-code-lang-block="${activeLang}"`);

            if (codeBlocks.length) {
                // loop through code blocks and check if they contain the active lang
                codeBlocks.forEach((codeBlock) => {
                    codeBlock.style.display = 'block';
                });
            } else {
                // find the first code block in the code wrapper and turn on
                const firstCodeBlock = codeWrapper.querySelector('.js-code-block');
                firstCodeBlock.style.display = 'block';
                codeWrapper.querySelector('[data-code-lang-trigger]').classList.add('active');
            }
        });
    }
}

function toggleMultiCodeLangNav(codeLang) {
  /*
  - Find any nav entries with type multi-code-lang
  - Look for child entry that has data-name matching the current code lang
  - Switch that url into the parent url, so its the appropriate language version
   */
  if(typeof(codeLang) === 'string' && codeLang.length > 0) {
    const items = document.querySelectorAll('a[data-type="multi-code-lang"]');
    if(items) {
      items.forEach((item) => {
        const li = item.closest('li');
        const a = (li) ? li.querySelector(`a[data-name="${codeLang}"]`) : null;
        if (a) {
          item.setAttribute('href', a.getAttribute('href'));
        }
      });
    }
  }
}

toggleMultiCodeLangNav(Cookies.get('code-lang') || '');

export { redirectCodeLang, addCodeTabEventListeners, addCodeBlockVisibilityToggleEventListeners, activateCodeLangNav, toggleMultiCodeLangNav };
