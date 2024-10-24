import { resolvePagePrefs } from '../../prefsResolution';
import { buildFilterSelectorUi } from '../components/ContentFilter';
import { Frontmatter } from '../../../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../../../schemas/yaml/prefOptions';

/**
 * A JSX template for the main content area of a page,
 * including the filter selector if one should be present.
 *
 * JSX templates should not hold state, as they are
 * only rendered once, at compile time.
 */
export const PageTemplate = (props: {
  frontmatter: Frontmatter;
  prefOptionsConfig: PrefOptionsConfig;
  valsByPrefId: Record<string, string>;
  articleHtml: string;
}) => {
  const { frontmatter, prefOptionsConfig, valsByPrefId, articleHtml } = props;

  return (
    <>
      <FilterSelectorTemplate
        frontmatter={frontmatter}
        prefOptionsConfig={prefOptionsConfig}
        valsByPrefId={valsByPrefId}
      />
      <div
        id="mdoc-content"
        className="customizable"
        dangerouslySetInnerHTML={{ __html: articleHtml }}
      ></div>
    </>
  );
};

function FilterSelectorTemplate(props: {
  frontmatter: Frontmatter;
  prefOptionsConfig: PrefOptionsConfig;
  valsByPrefId: Record<string, string>;
}) {
  const { frontmatter, prefOptionsConfig, valsByPrefId } = props;

  if (!frontmatter.page_preferences) {
    return null;
  }

  return (
    <div
      id="mdoc-selector"
      dangerouslySetInnerHTML={{
        __html: buildFilterSelectorUi(
          resolvePagePrefs({
            pagePrefsConfig: frontmatter.page_preferences,
            prefOptionsConfig: prefOptionsConfig,
            valsByPrefId
          })
        )
      }}
    ></div>
  );
}
