import { resolvePagePrefs } from '../../prefsResolution';
import { buildFilterSelectorUi } from '../components/ContentFilter';
import { Frontmatter } from '../../../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../../../schemas/yaml/prefOptions';

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
      />
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
    />
  );
}
