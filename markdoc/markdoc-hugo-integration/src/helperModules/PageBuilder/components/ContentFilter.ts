import { ResolvedPageFilters } from '../../../schemas/pageFilters';

/**
 * Given a resolved page filters object, build the UI for the filter selector
 * that goes at the top of the page.
 *
 * This runs at compile time, but also client-side on filter selection change,
 * so JSX templating is not available.
 */
export const buildFilterSelectorUi = (
  resolvedPageFilters: ResolvedPageFilters
): string => {
  let selectorHtml = '<div>';
  Object.keys(resolvedPageFilters).forEach((filterId) => {
    const resolvedFilter = resolvedPageFilters[filterId];
    const currentValue = resolvedFilter.currentValue || resolvedFilter.defaultValue;
    selectorHtml += '<div class="cdoc-filter__container">';
    // Render the label
    selectorHtml += `<div class="cdoc-filter__label">${resolvedFilter.displayName}</div>`;
    // Render each option pill
    resolvedFilter.options.forEach((option) => {
      const selected = option.id === currentValue ? 'selected' : '';
      selectorHtml += `<div class="cdoc-filter__pill ${selected}" data-filter-id="${resolvedFilter.id}" data-option-id="${option.id}">${option.displayName}</div>`;
    });
    selectorHtml += '</div>';
  });
  selectorHtml += '<hr />';
  selectorHtml += '</div>';
  return selectorHtml;
};
