import { WizardFilter } from './types';
import { CustomizationConfig, Frontmatter, buildFiltersManifest, FiltersManifest } from 'cdocs-data';

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

This is top-level content (content that is not inside an \`if\` tag), so it will show on the page regardless of any filters.

## Generated \`if\` block templates

You might want to leave this section at the bottom of your page for reference until you're finished writing content.
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
Your ${option.label}-specific content goes here.
{% /if %}
`;
  });

  return markup;
}

function buildNestedIfBlockExample({ filtersManifest }: { filtersManifest: FiltersManifest }) {
  const filters = Object.values(filtersManifest.filtersByTraitId);
  if (filters.length < 2) {
    return '';
  }

  const firstFilter = filters[0];
  const secondFilter = filters[1];
  const firstFilterOption = Object.values(filtersManifest.optionGroupsById[firstFilter.config.option_group_id])[0];
  const secondFilterOption = Object.values(filtersManifest.optionGroupsById[secondFilter.config.option_group_id])[0];

  return `
## Nested \`if\` tag example

You can nest \`if\` tags to create more complex conditional content. For example, if you have two filters, you can create a nested \`if\` tag to show content based on the combination of the two filters, as shown below.

Use "end" comments as shown to avoid confusion around which \`if\` tag is being closed.

<!-- ${firstFilterOption.label} -->
{% if equals($${firstFilter.config.trait_id}, "${firstFilterOption.id}") %}

  <!-- ${firstFilterOption.label} > ${secondFilterOption.label} -->
  {% if equals($${secondFilter.config.trait_id}, "${secondFilterOption.id}") %}
    Your content goes here.
  {% /if %}
  <!-- end ${firstFilterOption.label} > ${secondFilterOption.label} -->

{% /if %}
<!-- end ${firstFilterOption.label} -->
`;
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

  ifBlocks += buildNestedIfBlockExample({ filtersManifest });

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
