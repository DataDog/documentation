import { ResolvedPagePrefs } from '../../../schemas/resolvedPagePrefs';
import {
  elementOpen,
  elementClose,
  elementVoid,
  text,
  patch,
  attr
} from 'incremental-dom';

export interface ChooserProps {
  resolvedPagePrefs: ResolvedPagePrefs;
  valsByPrefId: Record<string, string>;
}

/**
 * The chooser component. Only used in initial compilation,
 * not re-rendering on the client side.
 */
export const Chooser = (props: ChooserProps) => {
  return (
    <div>
      {Object.keys(props.resolvedPagePrefs).map((prefId) => {
        const resolvedPref = props.resolvedPagePrefs[prefId];
        const currentValue = props.valsByPrefId[prefId] || resolvedPref.defaultValue;
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
  chooserProps: ChooserProps;
  elementToPatch: Element;
}) => {
  const node = patch(p.elementToPatch, () => renderChooserIncrementally(p.chooserProps));
  return node;
};

/**
 * Render the chooser component incrementally.
 */
const renderChooserIncrementally = (props: ChooserProps) => {
  console.log('Rendering the chooser incrementally');
  elementOpen('div', null);
  Object.keys(props.resolvedPagePrefs).forEach((prefId) => {
    const resolvedPref = props.resolvedPagePrefs[prefId];
    const currentValue = props.valsByPrefId[prefId] || resolvedPref.defaultValue;
    console.log('Current value is');
    console.log(currentValue);

    elementOpen('div', null, ['class', 'markdoc-pref__container']);
    elementOpen('div', null, ['class', 'markdoc-pref__label']);
    text(resolvedPref.displayName);
    elementClose('div');
    resolvedPref.options.forEach((option) => {
      console.log('Option is');
      console.log(option);
      const selected = option.id === currentValue ? 'selected' : '';
      console.log('Selected is');
      console.log(selected);
      elementOpen(
        'div',
        null,
        [
          'key',
          `${prefId}-${option.id}`,
          'data-pref-id',
          resolvedPref.identifier,
          'data-option-id',
          option.id
        ],
        'class',
        `markdoc-pref__pill ${selected}`
      );
      text(option.displayName);
      elementClose('div');
    });
    elementClose('div');
  });
  elementVoid('hr');
  elementClose('div');
};
