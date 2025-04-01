import { WizardFilter } from '../types';
import { CustomizationConfig } from 'cdocs-data';
import Code from './Code';
import { DocTemplater } from './DocTemplater';

function buildMarkup(templater: DocTemplater) {
  return `
${templater.buildFrontmatter()}

## Overview
  
This is a template for a customizable doc. It includes some example tags and resources.
  
## Conditional content examples
    
{% alert level="info" %}
Change any of the filters for this page to update the ${templater.filters.length} lines below.
{% /alert %}

${templater.buildIfBlocks()}

## Valid traits and their values (option IDs)
  
For reference, here's a list of all the traits available on this page, and the valid values for each trait.

You can use this table to populate the \`equals\` function in your \`if\` tags: \`equals(<TRAIT>, <VALUE>)\`. Example: \`${templater.buildEqualsFnExample()}\`. For details on using \`if\` tags, see the [relevant section of the Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference#If-and-if/else-(conditional-display-tag)).
  
${templater.buildTraitsAndValuesTable()}
  
## Guidelines and resources
  
- When possible, keep headers at the top level (outside of any \`if\` tags), giving each section its own \`if\` tags.
- If you can't keep headers at the top level, follow the [best practices for avoiding duplicate headers](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#Avoid-duplicate-headers) to make sure your page's right nav works properly.
- Need to add an alert or other element? See the [Tags Reference for Markdoc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4106092805/Tags+Reference).
- If you need to link to this page, follow the [best practices for linking to a customizable doc](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/4897343182/Markdoc+Best+Practices#When-you-link-to-a-top-level-header,-do-not-include-the-filter-params-in-the-URL).
`.trimStart();
}

function CdocMarkupTemplate({
  filters,
  wizardCustomizationConfig
}: {
  filters: WizardFilter[];
  wizardCustomizationConfig: CustomizationConfig;
}) {
  const templater = new DocTemplater({
    filters,
    customizationConfig: wizardCustomizationConfig
  });

  const contents = buildMarkup(templater);
  return <Code contents={contents} language="text" />;
}

export default CdocMarkupTemplate;
