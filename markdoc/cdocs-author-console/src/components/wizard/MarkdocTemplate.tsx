import { WizardFilter } from './types';
import { CustomizationConfig, buildFiltersManifest, Frontmatter } from 'cdocs-data';
import Code from '../Code';
import { MarkdocTemplateData } from './types';
import { DocTemplater } from './DocTemplater';

function buildMarkup(templateData: MarkdocTemplateData) {
  const templater = new DocTemplater(templateData);

  return `
${templater.buildFrontmatter()}

## Overview
  
This is a template for a customizable doc. It includes some example tags and resources.
  
This paragraph is top-level content (content that is not inside an \`if\` tag). It will show on the page regardless of any filters.

## Conditional content example
  
The \`if\` tags on this generated page are already set up for the filters you configured in the Page Wizard.
  
You might want to leave this section at the bottom of your page for reference until you're finished writing content.

{% alert level="info" %}
Change any of the filters for this page to update the ${templateData.filters.length} lines below.
{% /alert %}

${templater.buildIfBlocks()}

## Valid traits and their values (option IDs)
  
Just for your reference, here's a handy list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the \`equals\` function in your \`if\` tags: \`equals(<TRAIT>, <VALUE>)\`. Example: \`${templater.buildEqualsFnExample()}\`. For details on using \`if\` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
${templater.buildTraitsAndValuesTable()}
  
## Guidelines and resources
  
- When possible, keep headers at the top level, giving each section its own \`if\` tags.
- If you can't keep headers at the top level, follow the [best practices for avoiding duplicate headers](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#Avoid-duplicate-headers) to make sure your page's right nav works properly.
- Need to add an alert or other element? See the [Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference).
- If you need to link to this page, follow the [best practices for linking to a customizable doc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#When-you-link-to-a-top-level-header,-do-not-include-the-filter-params-in-the-URL).
`.trimStart();
}

function MarkdocTemplate({
  filters,
  wizardCustomizationConfig
}: {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
}) {
  const templateData: MarkdocTemplateData = {
    filters,
    wizardCustomizationConfig,
    filtersManifest: buildFiltersManifest({
      frontmatter: buildFrontmatterData({ filters }),
      customizationConfig: wizardCustomizationConfig
    }),
    frontmatter: buildFrontmatterData({ filters })
  };

  const contents = buildMarkup(templateData);
  return <Code contents={contents} language="markdown" />;
}

export default MarkdocTemplate;

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
