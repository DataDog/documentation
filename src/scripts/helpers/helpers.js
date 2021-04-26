function updateMainContentAnchors() {
    // make header tags with ids and make clickable as anchors
    $('.main h2[id], .main h3[id], .main h4[id], .main h5[id]').each(function() {
        const id = $(this).attr('id');
        $(this).wrapInner(`<a href="#${id}"></a>`);
    });
}

// when navigating to asynced nav with a Wistia video, the video script tags need to be removed and readded for the video to load
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

        wistaVideoScript.setAttribute(
            'src',
            'https://fast.wistia.com/assets/external/E-v1.js'
        );
        wistaVideoScript2.setAttribute(
            'src',
            `https://fast.wistia.com/embed/medias/${vidId}.jsonp`
        );

        wistiaCont.appendChild(wistaVideoScript);
        wistiaCont.appendChild(wistaVideoScript2);
    }
}

function gtag(...args) {
    const dataLayer = window.dataLayer || [];
    dataLayer.push(args);
}

const getCookieByName = (name) => {
    let value = '';
    const cookie = document.cookie.split('; ').find(row => row.startsWith(name));

    if (cookie) {
        // eslint-disable-next-line prefer-destructuring
        value = cookie.split('=')[1];
    }

    return value;
}

const getQueryParameterByName = (name, currentURL) => {
    const queryParameterName = name.replace(/[`[\]]/g, '\\$&');
    const url = !currentURL ? window.location.href : currentURL;
    const regex = new RegExp(`[?&]${queryParameterName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


export {updateMainContentAnchors, reloadWistiaVidScripts, gtag, getCookieByName, getQueryParameterByName}
