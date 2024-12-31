import { ResolvedPageFilters, ResolvedPageFilter } from '../../../schemas/pageFilters';

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
  let menuHtml = '<div>';
  Object.keys(resolvedPageFilters).forEach((filterId) => {
    const resolvedFilter = resolvedPageFilters[filterId];
    menuHtml += buildFilterSelectorNew({ filter: resolvedFilter });
  });
  menuHtml += '<hr />';
  menuHtml += '</div>';
  return menuHtml;
};

function buildFilterSelector(p: { filter: ResolvedPageFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;
  let selectorHtml = '<div class="cdoc-filter__container">';
  // Render the label
  selectorHtml += `<div class="cdoc-filter__label">${p.filter.displayName}</div>`;
  // Render each option pill
  p.filter.options.forEach((option) => {
    const selected = option.id === currentValue ? 'selected' : '';
    selectorHtml += `<div class="cdoc-filter__option cdoc-pill ${selected}" data-filter-id="${p.filter.id}" data-option-id="${option.id}">${option.displayName}</div>`;
  });
  selectorHtml += '</div>';
  return selectorHtml;
}

/*
<div class="cdoc-dropdown-container">
    <p class="cdoc-filter-label">Color</p>
    <div class="cdoc-dropdown cdoc-dropdown__expanded">
      <button class="cdoc-dropdown-btn" type="button">
        <span class="cdoc-btn-label">Red</span>
        <div class="cdoc-chevron cdoc-down"></div>
        <div class="cdoc-chevron cdoc-up"></div>
      </button>
      <div class="cdoc-dropdown-options-list">
        <a class="cdoc-dropdown-option">Red</a>
        <a class="cdoc-dropdown-option">Blue</a>
        <a class="cdoc-dropdown-option">Burgundy</a>
      </div>
    </div>
</div>
*/

function buildFilterSelectorNew(p: { filter: ResolvedPageFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;
  let selectorHtml = '<div class="cdoc-dropdown-container">';

  // Render the label
  selectorHtml += `<p class="cdoc-filter-label">${p.filter.displayName}</p>`;

  // Render the dropdown
  selectorHtml += `<div class="cdoc-dropdown">
    <button class="cdoc-dropdown-btn" type="button">
      <span class="cdoc-btn-label">${currentValue}</span>
      <div class="cdoc-chevron cdoc-down"></div>
      <div class="cdoc-chevron cdoc-up"></div>
    </button>
    <div class="cdoc-dropdown-options-list">`;
  p.filter.options.forEach((option) => {
    const selected = option.id === currentValue ? 'selected' : '';
    selectorHtml += `<a class="cdoc-dropdown-option ${selected}" data-filter-id="${p.filter.id}" data-option-id="${option.id}">${option.displayName}</a>`;
  });

  // Close options list
  selectorHtml += '</div>';

  // Close dropdown
  selectorHtml += '</div>';

  // Close container
  selectorHtml += '</div>';
  return selectorHtml;
}
