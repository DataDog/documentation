let pageTextLoadingPromise = null;

const pageTextCache = {
    mdUrl: null,
    text: null
};

export function initCopyPageButton() {
    const copyBtn = document.getElementById('page-copy-btn');

    if (copyBtn) {
        copyBtn.addEventListener('mouseenter', function () {
            loadPageText();
        });

        copyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            copyPageText();
        });
    }
}

/**
 * Copy the page text to clipboard
 * and display a success indicator.
 */
async function copyPageText() {
    const text = await loadPageText();
    await navigator.clipboard.writeText(text);

    displaySuccessFeedback();
}

/**
 * Build the URL of the plaintext page
 * from the URL of the HTML page.
 */
function getMdUrl() {
    const commitRef = document.documentElement.dataset.commitRef || '';
    const commitRefLen = commitRef.length ? commitRef.length + 1 : 0;

    // Remove branch name from pathname if in preview/staging
    let pathname = window.location.pathname;
    if (commitRefLen > 0) {
        pathname = pathname.slice(commitRefLen);
    }

    let url = `https://docs.datadoghq.com` + pathname;
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    return url + '.md';
}

/**
 * Attempt to load the page's .md URL contents,
 * failing over to extracting the text from the DOM.
 */
async function loadPageText() {
    const mdUrl = getMdUrl();

    // If already cached, return immediately
    if (pageTextCache.mdUrl === mdUrl && pageTextCache.text) {
        return pageTextCache.text;
    }

    // If currently loading, wait for the existing promise
    if (pageTextLoadingPromise) {
        return pageTextLoadingPromise;
    }

    // Start a new load
    pageTextLoadingPromise = (async () => {
        try {
            const response = await fetch(mdUrl, { credentials: 'omit' });

            if (!response.ok) {
                throw new Error(`Failed to fetch Markdown: ${response.status}`);
            }

            const text = await response.text();
            pageTextCache.mdUrl = mdUrl;
            pageTextCache.text = text;
            return text;
        } catch (err) {
            // Fail over to extracting text from the DOM
            const text = extractPageText();
            pageTextCache.text = text;
            pageTextCache.mdUrl = mdUrl;
            return text;
        } finally {
            pageTextLoadingPromise = null;
        }
    })();

    return pageTextLoadingPromise;
}

/**
 * Show "Copied" feedback and a success icon.
 */
function displaySuccessFeedback() {
    const copyText = document.getElementById('page-copy-text');
    const copiedText = document.getElementById('page-copied-text');

    copyText.style.display = 'none';
    copiedText.style.display = 'inline';

    const beforeIcon = document.querySelector('#page-copy-btn .copy-btn-icon__before');
    const afterIcon = document.querySelector('#page-copy-btn .copy-btn-icon__after');

    beforeIcon.style.opacity = '0';
    afterIcon.style.opacity = '1';

    setTimeout(() => {
        copyText.style.display = 'inline';
        copiedText.style.display = 'none';
        beforeIcon.style.opacity = '1';
        afterIcon.style.opacity = '0';
    }, 3000);
}

/**
 * Extract the content of the page from the DOM
 * (used as a fallback if fetching the .md file fails).
 */
function extractPageText() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) {
        return '';
    }

    const lines = [];
    const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            // Skip hidden elements
            if (node.nodeType === Node.ELEMENT_NODE) {
                const style = window.getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden') {
                    return NodeFilter.FILTER_REJECT;
                }
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    let currentNode;
    let lastAddedNewline = false;

    while ((currentNode = walker.nextNode())) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            const text = currentNode.textContent.trim();
            if (text) {
                lines.push(text);
                lastAddedNewline = false;
            }
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const tagName = currentNode.tagName.toLowerCase();

            // Handle headings
            if (/^h[1-6]$/.test(tagName)) {
                if (!lastAddedNewline && lines.length > 0) {
                    lines.push('\n');
                }
                const level = parseInt(tagName[1]);
                const headingText = currentNode.textContent.trim();
                lines.push('\n' + '#'.repeat(level) + ' ' + headingText + '\n\n');
                lastAddedNewline = true;
                // Skip children since we already got the text
                walker.currentNode = currentNode;
                continue;
            }

            // Handle links
            if (tagName === 'a' && currentNode.href) {
                const linkText = currentNode.textContent.trim();
                if (linkText) {
                    lines.push(`[${linkText}](${currentNode.href})`);
                    lastAddedNewline = false;
                }
                // Skip children since we already got the text
                walker.currentNode = currentNode;
                continue;
            }

            // Add newlines for block elements
            if (['p', 'div', 'li', 'br', 'hr'].includes(tagName)) {
                if (!lastAddedNewline && lines.length > 0) {
                    lines.push('\n');
                    lastAddedNewline = true;
                }
            }
        }
    }

    return lines
        .join(' ')
        .replace(/ +\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
