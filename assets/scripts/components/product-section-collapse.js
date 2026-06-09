function initProductSections() {
	document.querySelectorAll('.product-section__caret-button').forEach((button) => {
		button.addEventListener('click', () => {
			const section = button.closest('.product-section');
			if (!section) return;
			const isOpen = section.classList.toggle('is-open');
			button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			const title = section.querySelector('.product-section__title')?.textContent?.trim() ?? 'section';
			button.setAttribute('aria-label', `${isOpen ? 'Collapse' : 'Expand'} ${title}`);
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initProductSections);
} else {
	initProductSections();
}
