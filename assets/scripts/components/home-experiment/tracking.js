export const bindHomeTracking = () => {
    const root = document.querySelector('.home-content');
    if (!root) return;

    root.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[data-track-tile-title]');
        if (!anchor) return;
        window.DD_RUM?.addAction?.('home_product_tile_click', {
            variant: document.body.dataset.homeVariant ?? null,
            section: anchor.dataset.trackSection ?? null,
            subsection: anchor.dataset.trackSubsection ?? null,
            tile_title: anchor.dataset.trackTileTitle,
            target_url: anchor.getAttribute('href'),
        });
    }, { capture: true });
};
