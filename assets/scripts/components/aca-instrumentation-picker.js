const METHOD_LABELS = {
    in_container: 'In-Container',
    sidecar: 'Sidecar',
};

function updatePicker(picker) {
    const basePath = picker.dataset.basePath;
    const methodBtn = picker.querySelector('.aca-instrumentation-picker__method.is-selected');
    const langBtn = picker.querySelector('.aca-instrumentation-picker__language.is-selected');
    const cta = picker.querySelector('.aca-instrumentation-picker__cta');

    if (!methodBtn || !langBtn || !cta) return;

    const method = methodBtn.dataset.method;
    const lang = langBtn.dataset.lang;
    const langLabel = langBtn.dataset.langLabel;
    const methodLabel = METHOD_LABELS[method] || method;

    cta.href = `${basePath}/${method}/${lang}/`;
    cta.textContent = `Go to ${methodLabel} setup for ${langLabel} →`;
}

function initPicker(picker) {
    if (picker.classList.contains('aca-instrumentation-picker--initialized')) return;

    picker.addEventListener('click', (event) => {
        const methodBtn = event.target.closest('.aca-instrumentation-picker__method');
        const langBtn = event.target.closest('.aca-instrumentation-picker__language');

        if (methodBtn) {
            picker.querySelectorAll('.aca-instrumentation-picker__method').forEach((btn) => {
                const isSelected = btn === methodBtn;
                btn.classList.toggle('is-selected', isSelected);
                btn.setAttribute('aria-pressed', String(isSelected));
            });
            updatePicker(picker);
            return;
        }

        if (langBtn) {
            picker.querySelectorAll('.aca-instrumentation-picker__language').forEach((btn) => {
                const isSelected = btn === langBtn;
                btn.classList.toggle('is-selected', isSelected);
                btn.setAttribute('aria-pressed', String(isSelected));
            });
            updatePicker(picker);
        }
    });

    updatePicker(picker);
    picker.classList.add('aca-instrumentation-picker--initialized');
}

function initAllAcaInstrumentationPickers() {
    document.querySelectorAll('.aca-instrumentation-picker:not(.aca-instrumentation-picker--initialized)').forEach(initPicker);
}

if (window.clientFiltersManager) {
    window.clientFiltersManager.registerHook('afterReveal', initAllAcaInstrumentationPickers);
    window.clientFiltersManager.registerHook('afterRerender', initAllAcaInstrumentationPickers);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAcaInstrumentationPickers);
} else {
    initAllAcaInstrumentationPickers();
}

export { initAllAcaInstrumentationPickers };
