function openAccordion() {
	const hash = location.hash.substring(1);

	if (hash) {
		const details = document.getElementById(hash);

		if (details && details.tagName.toLowerCase() === 'details') {
			details.setAttribute('open', '');
		}
	}
}

window.addEventListener('hashchange', openAccordion);
openAccordion();

export {openAccordion};