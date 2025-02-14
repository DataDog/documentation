import { resolveFilters, FiltersManifest } from 'cdocs-data';
import { buildCustomizationMenuUi } from './customizationMenu';

/**
 * A JSX template for the main content area of a page,
 * including the filter selector if one should be present.
 *
 * JSX templates should not hold state, as they are
 * only rendered once, at compile time.
 */
export const PageTemplate = (props: {
  valsByTraitId: Record<string, string>;
  filtersManifest: FiltersManifest;
  articleHtml: string;
}) => {
  const { valsByTraitId, articleHtml, filtersManifest } = props;

  return (
    <>
      <FilterSelectorTemplate
        valsByTraitId={valsByTraitId}
        filtersManifest={filtersManifest}
      />
      <div
        id="cdoc-content"
        className="customizable"
        dangerouslySetInnerHTML={{ __html: articleHtml }}
      ></div>
    </>
  );
};

function FilterSelectorTemplate(props: {
  valsByTraitId: Record<string, string>;
  filtersManifest: FiltersManifest;
}) {
  const { valsByTraitId, filtersManifest } = props;

  if (Object.keys(filtersManifest.filtersByTraitId).length === 0) {
    return null;
  }

  return (
    <div
      id="cdoc-selector"
      dangerouslySetInnerHTML={{
        __html: buildCustomizationMenuUi(
          resolveFilters({
            valsByTraitId,
            filtersManifest
          })
        )
      }}
    ></div>
  );
}
