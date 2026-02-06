// Store pre-fetched content for one page at a time
let cachedUrl = null;
let cachedText = null;

async function prefetchPageText(copyButton) {
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl || cachedUrl === mdUrl) {
        return; // Already cached or no URL
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
        displaySuccessFeedback();

        console.log('... text copied to clipboard.');
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

    beforeIcon.style.display = 'none';
    afterIcon.style.display = 'inline';
    afterIcon.querySelector('img').style.display = 'inline';

    setTimeout(() => {
        copyText.style.display = 'inline';
        copiedText.style.display = 'none';
        beforeIcon.style.display = 'inline';
        afterIcon.style.display = 'none';
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
