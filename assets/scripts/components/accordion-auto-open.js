// Automatically opens an accordion when the URL contains an anchor that matches the accordion's ID - adapted from https://stackoverflow.com/questions/37033406/automatically-open-details-element-on-id-call

function openAccordion() {
	const hash = location.hash.substring(1);
	if (hash) var details = document.getElementById(hash);
	if (details && details.tagName.toLowerCase() === 'details') {
			details.setAttribute('open', '');
	}
}
window.addEventListener('hashchange', openAccordion);
window.addEventListener('load', openAccordion);
openAccordion();

export {openAccordion};