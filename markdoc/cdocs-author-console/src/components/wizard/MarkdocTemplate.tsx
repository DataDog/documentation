import { WizardFilter } from './types';
import { CustomizationConfig, Frontmatter, buildFiltersManifest, FiltersManifest } from 'cdocs-data';
import { TraitConfig } from './types';

function buildMarkup({
  filters,
  wizardCustomizationConfig
}: {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
}) {
  let markup = '';
  markup += buildFrontmatterMarkup({ filters });
  markup += `
## Some heading here

This is top-level content, so it will show on the page regardless of any filters.
`;
  markup += buildIfBlocks({ filters, wizardCustomizationConfig });
  return markup;
}

function buildFrontmatterData({ filters }: { filters: WizardFilter[] }) {
  let frontmatter: Frontmatter = {
    title: 'Your Title Here',
    content_filters: filters.map((filter) => ({
      trait_id: filter.trait_id,
      option_group_id: filter.option_group_id
    }))
  };

  return frontmatter;
}

function buildFrontmatterMarkup({ filters }: { filters: WizardFilter[] }) {
  let frontmatter = `---
title: Your Title Here`;

  if (filters.length > 0) {
    frontmatter += `
content_filters:`;

    filters.forEach((filter) => {
      frontmatter += `
  - trait_id: ${filter.trait_id}
    option_group_id: ${filter.option_group_id}`;
    });
  }

  frontmatter += `
---`;

  return frontmatter;
}

function buildIfBlock({ filter, filtersManifest }: { filter: WizardFilter; filtersManifest: FiltersManifest }) {
  const options = Object.values(filtersManifest.optionGroupsById[filter.option_group_id]);

  let markup = '';

  options.forEach((option) => {
    markup += `
<!-- ${option.label} -->
{% if equals($${filter.trait_id}, "${option.id}") %}
This content will only display if the user has chosen ${option.label}.
{% /if %}
`;
  });

  return markup;
}

function buildIfBlocks({
  filters,
  wizardCustomizationConfig
}: {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
}) {
  const frontmatter = buildFrontmatterData({ filters });
  const filtersManifest = buildFiltersManifest({ frontmatter, customizationConfig: wizardCustomizationConfig });

  let ifBlocks = '';

  filters.forEach((filter) => {
    ifBlocks += buildIfBlock({ filter, filtersManifest });
  });

  return ifBlocks;
}

function MarkdocTemplate({
  filters,
  wizardCustomizationConfig
}: {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
}) {
  return (
    <div>
      <pre>{buildMarkup({ filters, wizardCustomizationConfig })}</pre>
    </div>
  );
}

export default MarkdocTemplate;
