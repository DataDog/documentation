function openAccordion() {
	const hash = location.hash.substring(1);
	if (hash) {
	  var details = document.getElementById(hash)
	}
	if (details && details.tagName.toLowerCase() === 'details') {
			details.setAttribute('open', '');
	}
}
window.addEventListener('hashchange', openAccordion);
window.addEventListener('load', openAccordion);
openAccordion();

export {openAccordion};