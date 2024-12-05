document.addEventListener('DOMContentLoaded', () => {
  const tooltipContainers = document.querySelectorAll('.tooltip-container');
  let activeTooltip = null;
  let hideTimeout = null;

  function positionTooltip(tooltip, trigger) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Reset position and width
    tooltip.style.left = '';
    tooltip.style.right = '';
    tooltip.style.top = '';
    tooltip.style.bottom = '';
    tooltip.style.width = '';

    // Set max-width based on viewport
    const maxWidth = Math.min(300, viewportWidth - 20); // 20px margin
    tooltip.style.maxWidth = `${maxWidth}px`;

    // Recalculate tooltip dimensions after setting max-width
    const updatedTooltipRect = tooltip.getBoundingClientRect();

    // Position above by default
    let topPosition = triggerRect.top + window.pageYOffset - updatedTooltipRect.height - 5;

    // Check if tooltip goes above viewport
    if (topPosition < window.pageYOffset) {
      // Position below if it goes above viewport
      topPosition = triggerRect.bottom + window.pageYOffset + 5;
      tooltip.classList.add('bottom');
    } else {
      tooltip.classList.remove('bottom');
    }

    tooltip.style.top = `${topPosition}px`;

    // Center align the tooltip
    let leftPosition = triggerRect.left + (triggerRect.width - updatedTooltipRect.width) / 2;

    // Check if tooltip goes beyond left or right viewport edge
    if (leftPosition < 0) {
      // Align to left edge of viewport
      leftPosition = 5;
    } else if (leftPosition + updatedTooltipRect.width > viewportWidth) {
      // Align to right edge of viewport
      leftPosition = viewportWidth - updatedTooltipRect.width - 5;
    }

    tooltip.style.left = `${leftPosition}px`;
  }

  function showTooltip(tooltip, trigger) {
    clearHideTimeout();
    if (activeTooltip && activeTooltip !== tooltip) {
      hideTooltip(activeTooltip);
    }
    document.body.appendChild(tooltip);
    tooltip.classList.add('show');
    positionTooltip(tooltip, trigger);
    activeTooltip = tooltip;
  }
  
  function setHideTimeout(tooltip) {
    hideTimeout = setTimeout(() => {
      hideTooltip(tooltip);
    }, 100); // 100ms delay before hiding
  }

  function clearHideTimeout() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  function hideTooltip(tooltip) {
    tooltip.classList.remove('show');
    if (tooltip.parentNode === document.body) {
      document.body.removeChild(tooltip);
    }
    activeTooltip = null;
  }

  tooltipContainers.forEach((container) => {
    const trigger = container.querySelector('.tooltip-trigger');
    const tooltip = container.querySelector('.tooltip-content');
    
    if (!trigger || !tooltip) return;

    trigger.addEventListener('mouseenter', () => showTooltip(tooltip, trigger));
    trigger.addEventListener('mouseleave', () => setHideTimeout(tooltip));

    tooltip.addEventListener('mouseenter', clearHideTimeout);
    tooltip.addEventListener('mouseleave', () => setHideTimeout(tooltip));

    // For mobile devices
    trigger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (tooltip.classList.contains('show')) {
        hideTooltip(tooltip);
      } else {
        showTooltip(tooltip, trigger);
      }
    }, { passive: false });
  });

  // Close tooltip when tapping outside
  document.addEventListener('touchstart', (e) => {
    if (activeTooltip && !activeTooltip.contains(e.target) && !e.target.classList.contains('tooltip-trigger')) {
      hideTooltip(activeTooltip);
    }
  }, { passive: true });

  // Reposition tooltips on window resize
  window.addEventListener('resize', () => {
    if (activeTooltip) {
      const trigger = activeTooltip.previousElementSibling;
      positionTooltip(activeTooltip, trigger);
    }
  });
});