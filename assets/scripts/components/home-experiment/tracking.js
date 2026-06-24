export const bindHomeTracking = () => {
    const root = document.querySelector('.home-content');
    if (!root) return;

    root.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[data-track-tile-title]');
        if (!anchor) return;

        const payload = {
            variant: document.body.dataset.homeVariant ?? null,
            section: anchor.dataset.trackSection ?? null,
            subsection: anchor.dataset.trackSubsection ?? null,
            tile_title: anchor.dataset.trackTileTitle,
            target_url: anchor.getAttribute('href'),
        };

        console.log('[home-experiment] tile click', payload);
        window.DD_RUM?.addAction?.('home_product_tile_click', payload);

        // If the click opens a new tab the current page stays alive, so RUM will flush normally.
        const opensInNewTab = event.metaKey || event.ctrlKey || event.shiftKey
            || event.button === 1 || anchor.target === '_blank';
        if (opensInNewTab) return;

        // Otherwise the anchor's default navigation will tear the page down before the
        // RUM batch flushes via sendBeacon. Defer the navigation by a tick so the action
        // makes it into the outgoing beacon.
        event.preventDefault();
        const href = anchor.href;
        setTimeout(() => { window.location.href = href; }, 80);
    }, { capture: true });
};

