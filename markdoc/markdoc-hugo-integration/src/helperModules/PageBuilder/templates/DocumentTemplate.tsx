import { resolvePagePrefs } from '../../prefsResolution';
import { buildFilterSelectorUi } from '../components/ContentFilter';
import { Frontmatter } from '../../../schemas/yaml/frontMatter';
import { PrefOptionsConfig } from '../../../schemas/yaml/prefOptions';

export const DocumentTemplate = (props: {
  frontmatter: Frontmatter;
  prefOptionsConfig: PrefOptionsConfig;
  valsByPrefId: Record<string, string>;
}) => {
  const { frontmatter, prefOptionsConfig, valsByPrefId } = props;

  return (
    <>
      <FilterSelectorTemplate
        frontmatter={frontmatter}
        prefOptionsConfig={prefOptionsConfig}
        valsByPrefId={valsByPrefId}
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

  return (
    <>
      {frontmatter.page_preferences && (
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
      )}
    </>
  );
}
