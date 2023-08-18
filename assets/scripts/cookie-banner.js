window.addEventListener('load', function () {
    const { env } = document.documentElement.dataset;

    if (env !== 'development') {
        // add trustarc script to head
        const trustarc = document.createElement('script');
        trustarc.setAttribute('src','https://consent.trustarc.com/v2/notice/ufocto');
        document.head.appendChild(trustarc);

        // add divs
        const divA = document.createElement("div");
        const divB = document.createElement("div");
        divA.id = "teconsent";
        divA.style = "cursor: pointer; color:#fff"
        divB.id = "consent-banner";
        divB.style = "position:fixed; bottom:0px; right:0px; width:100%; z-index:999999";
        document.body.appendChild(divA);
        document.body.appendChild(divB);
        
        // update Cookie link
        this.setTimeout(function () {
            // const target = document.getElementById('truste-consent-track');
            const prefsElement = document.getElementById('teconsent');
            const cookieLink = document.querySelector('footer a[href*="/cookies"]');

            // if (target) {
            //     // update z-index on banner
            //     const observer = new MutationObserver(function (mutations) {
            //         mutations.forEach(function () {
            //             if (target.style.display === 'none') {
            //                 target.parentElement.style.zIndex = -1
            //             } else {
            //                 target.parentElement.style.setProperty('z-index', '999999', 'important');
            //             }
            //         });
            //     });

            //     observer.observe(target, { attributes: true, attributeFilter: ['style'] });
            // }

            // replace Cookie link with Prefs div
            return (cookieLink && document.getElementById('teconsent').innerHTML.length > 0) ? cookieLink.replaceWith(prefsElement) : false;
        }, 500);
    }
});
