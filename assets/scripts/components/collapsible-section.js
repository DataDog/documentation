document.addEventListener('DOMContentLoaded', function() {
  window.toggleCollapse = function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const section = event.target.closest('.collapsible-section');
      const isOpen = section.hasAttribute('open');
      section.toggleAttribute('open');
      event.target.setAttribute('aria-expanded', !isOpen);
    }
  };

  const collapsibleHeaders = document.querySelectorAll('.collapsible-section .collapsible-header');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('keydown', window.toggleCollapse);
  });
});