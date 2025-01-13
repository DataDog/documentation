import { ResolvedPageFilters, ResolvedPageFilter } from 'cdocs-core';

/**
 * Given a resolved page filters object, build the UI for the filter selector
 * that goes at the top of the page.
 *
 * This runs at compile time, but also client-side on filter selection change,
 * so JSX templating is not available.
 */
export const buildCustomizationMenuUi = (
  resolvedPageFilters: ResolvedPageFilters
): string => {
  let menuHtml = '<div id="cdoc-filters-menu">';
  // Build the displayed pills menu
  menuHtml += buildFilterSelectorPillsMenu({ filters: resolvedPageFilters });
  // Build a hidden dropdown menu in case the pills don't fit on the client
  menuHtml += buildFilterSelectorDropdownsMenu({ filters: resolvedPageFilters });
  menuHtml += '</div>';
  menuHtml += '<hr />';
  return menuHtml;
};

function buildFilterSelectorPillsMenu(p: { filters: ResolvedPageFilters }) {
  let menuHtml = '<div class="filter-selector-menu" id="cdoc-filters-pill-menu">';
  Object.keys(p.filters).forEach((filterId) => {
    const resolvedFilter = p.filters[filterId];
    menuHtml += buildFilterSelectorPills({ filter: resolvedFilter });
  });
  menuHtml += '</div>';
  return menuHtml;
}

function buildFilterSelectorPills(p: { filter: ResolvedPageFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;

  // Open the top-level container
  let selectorHtml = '<div class="cdoc-pills-container">';

  // Render the label
  selectorHtml += `<p 
    id="cdoc-${p.filter.id}-pills-label" 
    class="cdoc-filter-label"
  >${p.filter.label}</p>`;

  // Render each option
  p.filter.options.forEach((option) => {
    const isSelected = option.id === currentValue;
    selectorHtml += `<button
      class="cdoc-filter__option cdoc-pill ${isSelected ? 'selected' : ''}" 
      data-filter-id="${p.filter.id}" 
      data-option-id="${option.id}"
      aria-selected="${isSelected}"
      tabIndex="0"
    >${option.label}</button>`;
  });

  // Close the top-level container
  selectorHtml += '</div>';

  return selectorHtml;
}

function buildFilterSelectorDropdownsMenu(p: { filters: ResolvedPageFilters }) {
  let menuHtml =
    '<div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu">';
  Object.keys(p.filters).forEach((filterId) => {
    const resolvedFilter = p.filters[filterId];
    menuHtml += buildFilterSelectorDropdown({ filter: resolvedFilter });
  });
  menuHtml += '</div>';
  return menuHtml;
}

function buildFilterSelectorDropdown(p: { filter: ResolvedPageFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;
  const filterLabelElementId = `cdoc-${p.filter.id}-dropdown-label`;

  // Open the top-level container
  let selectorHtml = '<div class="cdoc-dropdown-container">';

  // Render the label
  selectorHtml += `<p 
    id="${filterLabelElementId}" 
    class="cdoc-filter-label"
  >${p.filter.label}</p>`;

  // Open the wrapper for the button and options list
  selectorHtml += `<div 
    id="cdoc-dropdown-${p.filter.id}" 
    class="cdoc-dropdown">`;

  // Render the button
  selectorHtml += `
    <button
      class="cdoc-dropdown-btn" 
      type="button"
      tabIndex="0"
      aria-haspopup="listbox"
      aria-expanded="false" 
      aria-labelledby="${filterLabelElementId}">
      <span 
        id="cdoc-dropdown-${p.filter.id}-label" 
        class="cdoc-btn-label"
      >${p.filter.options.find((o) => o.id === currentValue)!.label}</span>
      <div class="cdoc-chevron"></div>
    </button>`;

  // Open the options list
  selectorHtml += `<div 
    class="cdoc-dropdown-options-list" 
    role="listbox" 
    aria-labelledby="${filterLabelElementId}">`;

  // Render each option
  p.filter.options.forEach((option) => {
    const isSelected = option.id === currentValue;
    selectorHtml += `<a 
      class="cdoc-dropdown-option 
      cdoc-filter__option ${isSelected ? 'selected' : ''}" 
      data-filter-id="${p.filter.id}" 
      data-option-id="${option.id}"
      role="option" 
      aria-selected="${isSelected}"
      tabIndex="0"
    >${option.label}</a>`;
  });

  // Close the options list
  selectorHtml += '</div>';

  // Close the dropdown container
  selectorHtml += '</div>';

  // Close the top-level container
  selectorHtml += '</div>';

  return selectorHtml;
}
