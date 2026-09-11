/* eslint-disable prefer-rest-params */
function updateMainContentAnchors() {
    // Make header tags with ids and make clickable as anchors
    const mainHeaderTags = document.querySelectorAll('.main h2[id], .main h3[id], .main h4[id], .main h5[id]');

    if (mainHeaderTags.length) {
        mainHeaderTags.forEach((header) => {
            const id = header.id;
            const innerText = header.textContent;
            header.innerHTML = `<a href="#${id}">${innerText}</a>`;
        });
    }
}

// When navigating to async nav with a Wistia video, the video script tags need to be removed and re-added for the video to load
function reloadWistiaVidScripts(vidId) {
    const oldWistiaScripts = document.querySelectorAll('.wistia script');
    const wistiaCont = document.querySelector('.wistia');

    if (wistiaCont && vidId) {
        // remove current script tags
        for (let i = 0; i < oldWistiaScripts.length; i += 1) {
            oldWistiaScripts[i].remove();
        }

        // create new script tags
        const wistaVideoScript = document.createElement('script');
        const wistaVideoScript2 = document.createElement('script');

        wistaVideoScript.setAttribute('src', 'https://fast.wistia.com/assets/external/E-v1.js');
        wistaVideoScript2.setAttribute('src', `https://fast.wistia.com/embed/medias/${vidId}.jsonp`);

        wistiaCont.appendChild(wistaVideoScript);
        wistiaCont.appendChild(wistaVideoScript2);
    }
}

function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
}

const getCookieByName = (name) => {
    let value = '';
    const cookie = document.cookie.split('; ').find((row) => row.startsWith(name));

    if (cookie) {
        // eslint-disable-next-line prefer-destructuring
        value = cookie.split('=')[1];
    }

    return value;
};

const bodyClassContains = (string) => document.body.classList.contains(string);

export { updateMainContentAnchors, reloadWistiaVidScripts, gtag, getCookieByName, bodyClassContains };
