import { resolvePageFilters, PageFiltersManifest } from 'cdocs-core';
import { buildCustomizationMenuUi } from '../components/CustomizationMenu';

/**
 * A JSX template for the main content area of a page,
 * including the filter selector if one should be present.
 *
 * JSX templates should not hold state, as they are
 * only rendered once, at compile time.
 */
export const PageTemplate = (props: {
  valsByFilterId: Record<string, string>;
  filtersManifest: PageFiltersManifest;
  articleHtml: string;
}) => {
  const { valsByFilterId, articleHtml, filtersManifest } = props;

  return (
    <>
      <FilterSelectorTemplate
        valsByFilterId={valsByFilterId}
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
  valsByFilterId: Record<string, string>;
  filtersManifest: PageFiltersManifest;
}) {
  const { valsByFilterId, filtersManifest } = props;

  if (Object.keys(filtersManifest.filtersById).length === 0) {
    return null;
  }

  return (
    <div
      id="cdoc-selector"
      dangerouslySetInnerHTML={{
        __html: buildCustomizationMenuUi(
          resolvePageFilters({
            valsByFilterId,
            filtersManifest
          })
        )
      }}
    ></div>
  );
}
