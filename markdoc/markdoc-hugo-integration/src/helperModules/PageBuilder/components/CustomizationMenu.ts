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
    menuHtml += buildFilterSelector({ filter: resolvedFilter });
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

function buildFilterSelectorNew(p: { filter: ResolvedPageFilter }) {
  const currentValue = p.filter.currentValue || p.filter.defaultValue;
  let selectorHtml = '<div class="cdoc-filter__container">';
  selectorHtml += '</div>';
  return selectorHtml;
}
