import { ResolvedPagePrefs } from '../../../schemas/resolvedPagePrefs';

export const buildFilterSelectorUi = (resolvedPagePrefs: ResolvedPagePrefs): string => {
  let selectorHtml = '<div>';
  Object.keys(resolvedPagePrefs).forEach((prefId) => {
    const resolvedPref = resolvedPagePrefs[prefId];
    const currentValue = resolvedPref.currentValue || resolvedPref.defaultValue;
    selectorHtml += '<div class="mdoc-pref__container">';
    // Render the label
    selectorHtml += `<div class="mdoc-pref__label">${resolvedPref.displayName}</div>`;
    // Render each option pill
    resolvedPref.options.forEach((option) => {
      const selected = option.id === currentValue ? 'selected' : '';
      selectorHtml += `<div class="mdoc-pref__pill ${selected}" data-pref-id="${resolvedPref.id}" data-option-id="${option.id}">${option.displayName}</div>`;
    });
    selectorHtml += '</div>';
  });
  selectorHtml += '<hr />';
  selectorHtml += '</div>';
  return selectorHtml;
};
