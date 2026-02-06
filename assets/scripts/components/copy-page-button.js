// Store pre-fetched content for one page at a time
let cachedUrl = null;
let cachedText = null;

async function prefetchPageText(copyButton) {
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl) {
        console.warn('No Markdown URL found for prefetching.');
        return;
    }

    if (cachedUrl === mdUrl) {
        return; // Already cached
    }

    try {
        const response = await fetch(mdUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch Markdown: ${response.status}`);
        }

        const text = await response.text();
        cachedUrl = mdUrl;
        cachedText = text;
    } catch (err) {}
}

async function copyPageText(copyButton) {
    console.log('Copying page text to clipboard ...');
    const mdUrl = copyButton.dataset.mdUrl;

    try {
        let text;

        if (!mdUrl) {
            // Use fallback extraction from DOM
            text = extractMainContentAsMarkdown();
        } else if (cachedUrl === mdUrl && cachedText) {
            // Check if we have cached content from hover
            text = cachedText;
        } else {
            // Fallback to fetching if not cached
            const response = await fetch(mdUrl, { credentials: 'omit' });

            if (!response.ok) {
                throw new Error(`Failed to fetch Markdown: ${response.status}`);
            }

            text = await response.text();
        }

        await navigator.clipboard.writeText(text);

        // Optional UX feedback
        displaySuccessFeedback();

        console.log(text);
        console.log('Above text copied to clipboard.');
    } catch (err) {
        console.error('Error copying plaintext markdown:', err);
        alert('Failed to copy page text. Please try again.');
    }
}

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

export function initCopyPageButton() {
    const copyBtn = document.getElementById('page-copy-btn');

    if (copyBtn) {
        // Pre-fetch on hover for faster copy
        copyBtn.addEventListener('mouseenter', function () {
            prefetchPageText(this);
        });

        copyBtn.addEventListener('click', function () {
            copyPageText(this);
        });
    }
}

function extractMainContentAsMarkdown() {
    console.log('Failing back to DOM extraction for copy ...');
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
                lines.push('#'.repeat(level) + ' ' + headingText + '\n\n');
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
