export function attachTooltips(container, sourcesByNumber) {
    container.querySelectorAll('.conv-search-source-ref-btn[data-source-number]').forEach((btn) => {
        const num = parseInt(btn.dataset.sourceNumber, 10);
        const source = sourcesByNumber.get(num);
        if (!source) return;

        btn.setAttribute('aria-label', `Source ${num}: ${source.label}`);
        btn.setAttribute('aria-expanded', 'false');

        const tooltip = document.createElement('span');
        tooltip.className = 'conv-search-source-tooltip';
        tooltip.innerHTML = `<a href="${source.href}" target="_blank" rel="noopener noreferrer">${source.label}</a>`;

        btn.parentNode.appendChild(tooltip);
    });
}

export function buildSourceCards(sources) {
    const section = document.createElement('div');
    section.className = 'conv-search-sources';

    const title = document.createElement('p');
    title.className = 'conv-search-sources-title';
    title.textContent = 'Sources';
    section.appendChild(title);

    const cards = document.createElement('div');
    cards.className = 'conv-search-sources-cards';

    sources.forEach((source) => {
        const card = document.createElement('article');
        card.className = 'conv-search-source-card';

        const badge = document.createElement('span');
        badge.className = 'conv-search-source-card-number';
        badge.textContent = String(source.number);

        const link = document.createElement('a');
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = source.label;

        const arrow = document.createElement('span');
        arrow.className = 'conv-search-source-card-arrow';
        arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';

        card.appendChild(badge);
        card.appendChild(link);
        card.appendChild(arrow);
        cards.appendChild(card);
    });

    section.appendChild(cards);
    return section;
}

export function showSourceTooltip(button) {
    const wrap = button.closest('.conv-search-source-ref-wrap');
    if (!wrap) return;

    const tooltip = wrap.querySelector('.conv-search-source-tooltip');
    if (!tooltip) return;

    tooltip.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
}

export function closeAllSourceTooltips(messagesContainer) {
    messagesContainer.querySelectorAll('.conv-search-source-tooltip.open').forEach((tooltip) => {
        tooltip.classList.remove('open');
        tooltip.removeAttribute('style');
    });
    messagesContainer.querySelectorAll('.conv-search-source-ref-btn[aria-expanded="true"]').forEach((btn) => {
        btn.setAttribute('aria-expanded', 'false');
    });
}

export function repositionTooltip(tooltip, sidebar) {
    const dialogRect = sidebar.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();

    if (tipRect.left < dialogRect.left + 8) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
    } else if (tipRect.right > dialogRect.right - 8) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'none';
    }
}
