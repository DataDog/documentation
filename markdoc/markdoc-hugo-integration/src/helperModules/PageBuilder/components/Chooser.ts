import { ResolvedPagePrefs } from '../../../schemas/resolvedPagePrefs';

export const getChooserHtml = (resolvedPagePrefs: ResolvedPagePrefs): string => {
  let chooserHtml = '<div>';
  Object.keys(resolvedPagePrefs).forEach((prefId) => {
    const resolvedPref = resolvedPagePrefs[prefId];
    const currentValue = resolvedPref.currentValue || resolvedPref.defaultValue;
    chooserHtml += '<div class="markdoc-pref__container">';
    // Render the label
    chooserHtml += `<div class="markdoc-pref__label">${resolvedPref.displayName}</div>`;
    // Render each option pill
    resolvedPref.options.forEach((option) => {
      const selected = option.id === currentValue ? 'selected' : '';
      chooserHtml += `<div class="markdoc-pref__pill ${selected}" data-pref-id="${resolvedPref.id}" data-option-id="${option.id}">${option.displayName}</div>`;
    });
    chooserHtml += '</div>';
  });
  chooserHtml += '<hr />';
  chooserHtml += '</div>';
  return chooserHtml;
};
