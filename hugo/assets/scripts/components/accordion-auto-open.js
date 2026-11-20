function openAccordion() {
	const hash = location.hash.substring(1);

	if (hash) {
		const details = document.getElementById(hash);

		if (details && details.tagName.toLowerCase() === 'details') {
			details.setAttribute('open', '');
		}
	}
}

function syncHashOnToggle(details) {
	details.addEventListener('toggle', () => {
		if (!details.id) return;

		if (details.open) {
			history.replaceState(null, '', `#${details.id}`);
		} else if (location.hash.substring(1) === details.id) {
			history.replaceState(null, '', location.pathname + location.search);
		}
	});
}

window.addEventListener('hashchange', openAccordion);
openAccordion();

document.querySelectorAll('details.collapsible-section[id]').forEach(syncHashOnToggle);

export {openAccordion};