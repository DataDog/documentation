import Tooltip from 'bootstrap/js/dist/tooltip';

const initCardGrid = () => {
    const initTooltips = () => {
        document.querySelectorAll('.card-grid-card[data-bs-toggle="tooltip"]').forEach((el) => {
            new Tooltip(el);
        });
    };

    if (window.clientFiltersManager) {
        clientFiltersManager.registerHook('afterReveal', initTooltips);
        clientFiltersManager.registerHook('afterRerender', initTooltips);
    }

    initTooltips();
};

export default initCardGrid;
