import { MarkdocTemplateData, WizardFilter } from './types';

export class DocTemplater {
  data: MarkdocTemplateData;

  constructor(markdocTemplateData: MarkdocTemplateData) {
    this.data = markdocTemplateData;
  }

  buildFrontmatter() {
    let frontmatter = `---
title: Your Title Here`;

    if (this.data.filters.length > 0) {
      frontmatter += `
content_filters:`;

      this.data.filters.forEach((filter) => {
        frontmatter += `
  - trait_id: ${filter.trait_id}
    option_group_id: ${filter.option_group_id}`;
      });
    }

    frontmatter += `
---`;

    return frontmatter;
  }

  buildIfBlock(filter: WizardFilter) {
    const options = Object.values(this.data.filtersManifest.optionGroupsById[filter.option_group_id]);

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

  buildEqualsFnExample() {
    const filters = Object.values(this.data.filtersManifest.filtersByTraitId);
    if (filters.length === 0) {
      return '';
    }

    const firstFilter = filters[0];
    const firstFilterTraitLabel = this.data.filtersManifest.filtersByTraitId[firstFilter.config.trait_id].config.label;
    const firstFilterOption = Object.values(
      this.data.filtersManifest.optionGroupsById[firstFilter.config.option_group_id]
    )[0];

    return `equals($${firstFilter.config.trait_id}, "${firstFilterOption.id}")`;
  }

  buildNestedIfBlockExample() {
    const manifest = this.data.filtersManifest;

    const filters = Object.values(manifest.filtersByTraitId);
    if (filters.length < 2) {
      return '';
    }

    const firstFilter = filters[0];
    const secondFilter = filters[1];
    const firstFilterTraitLabel = manifest.filtersByTraitId[firstFilter.config.trait_id].config.label;
    const secondFilterTraitLabel = manifest.filtersByTraitId[secondFilter.config.trait_id].config.label;
    const firstFilterOption = Object.values(manifest.optionGroupsById[firstFilter.config.option_group_id])[0];
    const secondFilterOption = Object.values(manifest.optionGroupsById[secondFilter.config.option_group_id])[0];

    return `
 ## Nested \`if\` tag example
    
You can nest \`if\` tags to create more complex conditional content. For example, if you have two filters, you can create a nested \`if\` tag to show content based on the combination of the two filters, as shown below.
    
Use "end" comments as shown to avoid confusion around which \`if\` tag is being closed.

{% alert level="info" %}
To make additional content display below this alert, choose ${firstFilterOption.label} for the ${firstFilterTraitLabel} filter and ${secondFilterOption.label} for the ${secondFilterTraitLabel} filter.
{% /alert %}
    
<!-- ${firstFilterOption.label} -->
{% if equals($${firstFilter.config.trait_id}, "${firstFilterOption.id}") %}
    
<!-- ${firstFilterOption.label} > ${secondFilterOption.label} -->
{% if equals($${secondFilter.config.trait_id}, "${secondFilterOption.id}") %}
This line of text only displays when the ${firstFilterTraitLabel} filter is set to ${firstFilterOption.label} and the ${secondFilterTraitLabel} filter is set to ${secondFilterOption.label}.
{% /if %}
<!-- end ${firstFilterOption.label} > ${secondFilterOption.label} -->
    
{% /if %}
<!-- end ${firstFilterOption.label} -->
`;
  }

  buildIfBlocks() {
    let ifBlocks = '';

    this.data.filters.forEach((filter) => {
      ifBlocks += this.buildIfBlock(filter);
    });

    ifBlocks += this.buildNestedIfBlockExample();

    return ifBlocks;
  }

  buildTraitsAndValuesTable() {
    let table = '{% table %}\n';
    table += '* Trait\n';
    table += '* Valid values\n';
    table += '* Equals function to use in `if` tag\n';

    const filters = Object.values(this.data.filtersManifest.filtersByTraitId);
    filters.forEach((filter) => {
      const options = Object.values(this.data.filtersManifest.optionGroupsById[filter.config.option_group_id]);

      // Create a new row
      table += '---\n';

      // Add the trait id - this will take up multiple rows
      table += `* \`${filter.config.trait_id}\` {% rowspan=${options.length} %}\n`;

      // Add the first value to the first row
      table += `* \`${options[0].id}\`\n`;

      // Add the first equals function to the first row
      table += `* \`equals($${filter.config.trait_id}, "${options[0].id}")\`\n`;

      // Add the rest of the rows alongside the trait id cell
      options.forEach((option, idx) => {
        if (idx === 0) {
          return;
        }
        // add another row with an additional value and equals function
        table += '---\n';
        table += `* \`${option.id}\`\n`;
        table += `* \`equals($${filter.config.trait_id}, "${option.id}")\`\n`;
      });
    });

    table += '{% /table %}\n';
    return table;
  }

  /*
  buildTraitsAndValuesTable() {
    let table = '{% table %}\n';
    table += '* Trait\n';
    table += '* Valid values\n';

    const filters = Object.values(this.data.filtersManifest.filtersByTraitId);
    filters.forEach((filter) => {
      // Create a new row
      table += '---\n';

      // Add the trait id
      table += `* \`$${filter.config.trait_id}\`\n`;

      // Add the valid option values as a bulleted list in a single cell
      table += `*\n`;
      const options = Object.values(this.data.filtersManifest.optionGroupsById[filter.config.option_group_id]);
      options.forEach((option) => {
        table += `  * \`"${option.id}"\`\n`;
      });
    });

    table += '{% /table %}\n';
    return table;
  }
  */
}
