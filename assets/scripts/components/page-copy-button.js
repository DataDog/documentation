async function copyPageText(copyButton) {
    const mdUrl = copyButton.dataset.mdUrl;

    if (!mdUrl) {
        console.error('No data-md-url found on button');
        return;
    }

    try {
        // TODO: See if you can just get rid of the credentials option
        const response = await fetch(mdUrl, { credentials: 'omit' });

        if (!response.ok) {
            throw new Error(`Failed to fetch markdown: ${response.status}`);
        }

        const text = await response.text();

        await navigator.clipboard.writeText(text);

        // Optional UX feedback
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy page text';
        }, 1500);
    } catch (err) {
        console.error('Error copying plaintext markdown:', err);
        alert('Failed to copy page text. Please try again.');
    }
}

const copyButton = document.getElementById('copy-plaintext-button');

if (copyButton) {
    copyButton.addEventListener('click', function () {
        copyPageText(this);
    });
}

const sidebarCopyButton = document.getElementById('sidebar-copy-btn');

if (sidebarCopyButton) {
    console.log('Sidebar copy button found');
    sidebarCopyButton.addEventListener('click', function () {
        console.log('Sidebar copy button clicked');
    });
}
