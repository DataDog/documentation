function toggleCollapse(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.target.closest('.collapsible-section').toggleAttribute('open');
      event.target.setAttribute('aria-expanded', event.target.closest('.collapsible-section').hasAttribute('open'));
    }
}