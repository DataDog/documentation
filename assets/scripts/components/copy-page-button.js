// Store pre-fetched content for one page at a time
let cachedUrl = null;
let cachedText = null;

async function prefetchPageText(copyButton) {
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl || cachedUrl === mdUrl) {
        return; // Already cached or no URL
    }

    try {
        const response = await fetch(mdUrl, { credentials: 'omit' });

        if (!response.ok) {
            throw new Error(`Failed to fetch Markdown: ${response.status}`);
        }

        const text = await response.text();
        cachedUrl = mdUrl;
        cachedText = text;
    } catch (err) {
        console.error('Error prefetching markdown:', err);
        // Silently fail on prefetch - will try again on click
    }
}

async function copyPageText(copyButton) {
    console.log('Copying page text to clipboard ...');
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl) {
        console.error('No data-md-url found on button');
        return;
    }

    try {
        let text;

        // Check if we have cached content from hover
        if (cachedUrl === mdUrl && cachedText) {
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
        const copyText = document.getElementById('page-copy-text');
        const copiedText = document.getElementById('page-copied-text');

        if (copyText && copiedText) {
            const icon = copyButton.closest('.copy-btn-icon');
            if (icon) {
                icon.src = icon.src.replace('clipboard-mdi.svg', 'clipboard-mdi-success.svg');
            }
            copyText.style.display = 'none';
            copiedText.style.display = 'inline';

            setTimeout(() => {
                copyText.style.display = 'inline';
                copiedText.style.display = 'none';
                if (icon) {
                    icon.src = icon.src.replace('clipboard-mdi-success.svg', 'clipboard-mdi.svg');
                }
            }, 1500);
        }

        console.log('... text copied to clipboard.');
    } catch (err) {
        console.error('Error copying plaintext markdown:', err);
        alert('Failed to copy page text. Please try again.');
    }
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
