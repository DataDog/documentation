import { resolvePagePrefs } from '../../prefsResolution';
import { buildFilterSelectorUi } from '../components/ContentFilter';
import { Frontmatter } from '../../../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../../../schemas/yaml/prefOptions';
import { PagePrefsManifest } from '../../../schemas/pagePrefs';

/**
 * A JSX template for the main content area of a page,
 * including the filter selector if one should be present.
 *
 * JSX templates should not hold state, as they are
 * only rendered once, at compile time.
 */
export const PageTemplate = (props: {
  valsByPrefId: Record<string, string>;
  prefsManifest: PagePrefsManifest;
  articleHtml: string;
}) => {
  const { valsByPrefId, articleHtml, prefsManifest } = props;

  return (
    <>
      <FilterSelectorTemplate valsByPrefId={valsByPrefId} prefsManifest={prefsManifest} />
      <div
        id="mdoc-content"
        className="customizable"
        dangerouslySetInnerHTML={{ __html: articleHtml }}
      ></div>
    </>
  );
};

function FilterSelectorTemplate(props: {
  valsByPrefId: Record<string, string>;
  prefsManifest: PagePrefsManifest;
}) {
  const { valsByPrefId, prefsManifest } = props;

  if (Object.keys(prefsManifest.prefsById).length === 0) {
    return null;
  }

  return (
    <div
      id="mdoc-selector"
      dangerouslySetInnerHTML={{
        __html: buildFilterSelectorUi(
          resolvePagePrefs({
            valsByPrefId,
            prefsManifest
          })
        )
      }}
    ></div>
  );
}
