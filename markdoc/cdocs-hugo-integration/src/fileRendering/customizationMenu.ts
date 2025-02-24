/**
 * The customization menu appears at the top of each documentation page,
 * and allows users to update their selections for each filter's value.
 * Because this menu must be built both at compile time and at runtime,
 * it uses simple string templating. JSX is not available at runtime in Hugo.
 */

import { ResolvedFilters, ResolvedFilter } from 'cdocs-data';

/**
 * Given a resolved page filters object, build the customization menu UI.
 */
export const buildCustomizationMenuUi = (
  resolvedPageFilters: ResolvedFilters
): string => {
  let menuHtml = '<div id="cdoc-filters-menu">';
  // Build the displayed pills menu
  menuHtml += buildPillsMenu({ filters: resolvedPageFilters });
  // Build a hidden dropdown menu in case the pills don't fit on the client
  menuHtml += buildDropdownsMenu({ filters: resolvedPageFilters });
  menuHtml += '</div>';
  menuHtml += '<hr />';
  return menuHtml;
};

// PILLS MENU TEMPLATING FUNCTIONS ----------------------------------

/**
 * Build a menu that displays a pill for each filter option.
 */
function buildPillsMenu(p: { filters: ResolvedFilters }) {
  let menuHtml = '<div class="filter-selector-menu" id="cdoc-filters-pill-menu">';
  Object.keys(p.filters).forEach((filterId) => {
    const resolvedFilter = p.filters[filterId];
    menuHtml += buildPillsForFilter({ filter: resolvedFilter });
  });
  menuHtml += '</div>';
  return menuHtml;
}

/**
 * Build the set of pills for a single filter
 * (one pill per option, with one pill selected).
 */
function buildPillsForFilter(p: { filter: ResolvedFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;

  // Open the top-level container
  let selectorHtml = '<div class="cdoc-pills-container">';

  // Render the label for the set of pills
  selectorHtml += `<p 
    id="cdoc-${p.filter.id}-pills-label" 
    class="cdoc-filter-label"
  >${p.filter.label}</p>`;

  // Render each option pill
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

// DROPDOWNS MENU TEMPLATING FUNCTIONS ------------------------------

function buildDropdownsMenu(p: { filters: ResolvedFilters }) {
  let menuHtml =
    '<div class="filter-selector-menu cdoc-offscreen" id="cdoc-filters-dropdown-menu">';
  Object.keys(p.filters).forEach((filterId) => {
    const resolvedFilter = p.filters[filterId];
    menuHtml += buildDropdownForFilter({ filter: resolvedFilter });
  });
  menuHtml += '</div>';
  return menuHtml;
}

/**
 * Build the dropdown for a single filter.
 */
function buildDropdownForFilter(p: { filter: ResolvedFilter }) {
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
