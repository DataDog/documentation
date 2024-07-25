import { ResolvedPagePrefs } from '../../../schemas/resolvedPagePrefs';
import { elementOpen, elementClose, elementVoid, text, patch } from 'incremental-dom';

/**
 * The chooser component. Only used in initial compilation,
 * not re-rendering on the client side.
 */
export const Chooser = (resolvedPagePrefs: ResolvedPagePrefs) => {
  return (
    <div>
      {Object.keys(resolvedPagePrefs).map((prefId) => {
        const resolvedPref = resolvedPagePrefs[prefId];
        const currentValue = resolvedPref.currentValue || resolvedPref.defaultValue;
        return (
          <div key={prefId} className="markdoc-pref__container">
            <div className="markdoc-pref__label">{resolvedPref.displayName}</div>
            {resolvedPref.options.map((option) => {
              const selected = option.id === currentValue ? 'selected' : '';
              return (
                <div
                  key={option.id}
                  className={`markdoc-pref__pill ${selected}`}
                  data-pref-id={resolvedPref.identifier}
                  data-option-id={option.id}
                >
                  {option.displayName}
                </div>
              );
            })}
          </div>
        );
      })}
      <hr />
    </div>
  );
};

/**
 * Patch an existing element with the incrementally rendered chooser component.
 */
export const rerenderChooser = (p: {
  resolvedPagePrefs: ResolvedPagePrefs;
  elementToPatch: Element;
}) => {
  const node = patch(p.elementToPatch, () =>
    renderChooserIncrementally(p.resolvedPagePrefs)
  );
  return node;
};

/**
 * Render the chooser component incrementally.
 */
const renderChooserIncrementally = (resolvedPagePrefs: ResolvedPagePrefs) => {
  elementOpen('div', null);
  Object.keys(resolvedPagePrefs).forEach((prefId) => {
    const resolvedPref = resolvedPagePrefs[prefId];
    const currentValue = resolvedPref.currentValue || resolvedPref.defaultValue;
    elementOpen('div', null, ['class', 'markdoc-pref__container']);
    // Render the label
    elementOpen('div', null, ['class', 'markdoc-pref__label']);
    text(resolvedPref.displayName);
    elementClose('div');
    // Render each option pill
    resolvedPref.options.forEach((option) => {
      const selected = option.id === currentValue ? 'selected' : '';
      elementOpen(
        'div',
        null,
        [],
        'key',
        `${prefId}-${option.id}`,
        'class',
        `markdoc-pref__pill ${selected}`,
        'data-pref-id',
        resolvedPref.identifier,
        'data-option-id',
        option.id
      );
      text(option.displayName);
      elementClose('div');
    });
    elementClose('div');
  });
  elementVoid('hr');
  elementClose('div');
};
