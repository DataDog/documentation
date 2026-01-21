async function copyPageText(copyButton) {
    console.log('Copying page text to clipboard ...');
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl) {
        console.error('No data-md-url found on button');
        return;
    }

    try {
        // TODO: See if you can just get rid of the credentials option
        const response = await fetch(mdUrl, { credentials: 'omit' });

        if (!response.ok) {
            throw new Error(`Failed to fetch Markdown: ${response.status}`);
        }

        const text = await response.text();

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
        copyBtn.addEventListener('click', function () {
            copyPageText(this);
        });
    }
}
