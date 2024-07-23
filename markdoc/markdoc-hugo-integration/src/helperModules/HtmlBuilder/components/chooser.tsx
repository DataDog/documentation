import { ResolvedPagePrefs } from '../../../schemas/resolvedPagePrefs';

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
    <div id="chooser">
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
 * Rerender the chooser component incrementally.
 */
export const rerenderChooser = () => {};
