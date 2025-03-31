import { WizardFilter } from './types';
import { CustomizationConfig } from 'cdocs-data';
import { TraitConfig } from './types';

function buildMarkup({
  filters,
  customizationConfig
}: {
  filters: WizardFilter[];
  customizationConfig: CustomizationConfig;
}) {
  let markup = '';
  markup += buildFrontmatter({ filters });
  markup += `
## Some heading here

This is top-level content, so it will show on the page regardless of any filters.
`;
  markup += buildIfBlocks({ filters, customizationConfig });
  return markup;
}

function buildFrontmatter({ filters }: { filters: WizardFilter[] }) {
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

function buildIfBlock({
  filter,
  customizationConfig
}: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
}) {
  let traitConfig: TraitConfig;

  if (filter.newTraitConfig) {
    traitConfig = filter.newTraitConfig;
  } else {
    traitConfig = customizationConfig.traitsById[filter.trait_id];
  }

  return `
<!-- Filter: ${filter.uuid} -->
{% if equals(${traitConfig.id}, something) %}
Something goes here.
{% /if %}
`;
}

function buildIfBlocks({
  filters,
  customizationConfig
}: {
  filters: WizardFilter[];
  customizationConfig: CustomizationConfig;
}) {
  let ifBlocks = '';

  filters.forEach((filter) => {
    ifBlocks += buildIfBlock({ filter, customizationConfig });
  });

  return ifBlocks;
}

function MarkdocTemplate({
  filters,
  customizationConfig
}: {
  filters: WizardFilter[];
  customizationConfig: CustomizationConfig;
}) {
  return (
    <div>
      <pre>{buildMarkup({ filters, customizationConfig })}</pre>
    </div>
  );
}

export default MarkdocTemplate;
