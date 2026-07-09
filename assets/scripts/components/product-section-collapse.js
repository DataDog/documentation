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

// Pin each section's min-height to the row's max once at load time, so when a
// user collapses one section the layout doesn't visually pull/shrink its row
// neighbors. Only applies at desktop widths (>=1280px) where sections share a
// row; below that, sections stack in a single column and don't interact.
const DESKTOP_MIN_WIDTH = 1280;

function lockSectionHeightsInRows() {
	const grid = document.querySelector('.products-browse__grid');
	if (!grid) return;
	const sections = Array.from(grid.querySelectorAll('.product-section'));
	sections.forEach((s) => { s.style.minHeight = ''; });
	if (window.innerWidth < DESKTOP_MIN_WIDTH) return;

	const allOpen = sections.every((s) => s.classList.contains('is-open'));
	if (!allOpen) return;

	const rows = new Map();
	sections.forEach((section) => {
		const top = Math.round(section.getBoundingClientRect().top);
		if (!rows.has(top)) rows.set(top, []);
		rows.get(top).push(section);
	});

	rows.forEach((rowSections) => {
		if (rowSections.length < 2) return;
		const maxH = Math.max(...rowSections.map((s) => s.getBoundingClientRect().height));
		rowSections.forEach((s) => { s.style.minHeight = `${maxH}px`; });
	});
}

function debounce(fn, ms) {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), ms);
	};
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initProductSections);
} else {
	initProductSections();
}

if (document.readyState === 'complete') {
	lockSectionHeightsInRows();
} else {
	window.addEventListener('load', lockSectionHeightsInRows);
}

window.addEventListener('resize', debounce(lockSectionHeightsInRows, 200));
