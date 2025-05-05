import React, { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import StrictTraitSelector from './forms/traits/StrictTraitSelector';
import StrictOptionGroupSelector from './forms/optionGroups/StrictOptionGroupSelector';
import Code from './Code';
import { DocTemplater } from './DocTemplater';
import { buildWizardFilter } from '../dataUtils';

function buildFrontmatterMarkup({
  traitId,
  optionGroupId
}: {
  traitId: string | null;
  optionGroupId: string | null;
}): string {
  return `  - trait_id: ${traitId || '<CHOOSE_A_TRAIT_ABOVE>'}
    option_group_id: ${optionGroupId || '<CHOOSE_AN_OPTION_GROUP_ABOVE>'}
`;
}

export default function QuickFilterBuilder(props: { customizationConfig: CustomizationConfig }) {
  const [traitId, setTraitId] = useState<string | null>(null);
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null);
  const [ifBlocksContent, setIfBlocksContent] = useState<string>('');

  const refreshIfBlocks = ({ traitId, optionGroupId }: { traitId: string | null; optionGroupId: string | null }) => {
    if (!traitId || !optionGroupId) {
      setIfBlocksContent('');
      return;
    }

    const filter = buildWizardFilter({
      traitId,
      optionGroupId,
      customizationConfig: props.customizationConfig
    });
    const templater = new DocTemplater({
      filters: [filter],
      customizationConfig: props.customizationConfig
    });
    setIfBlocksContent(templater.buildIfBlocks());
  };

  const handleTraitSelect = (newTraitId: string) => {
    setTraitId(newTraitId);
    refreshIfBlocks({ traitId: newTraitId, optionGroupId });
  };

  const handleOptionGroupIdSelect = (newOptionGroupId: string) => {
    setOptionGroupId(newOptionGroupId);
    refreshIfBlocks({ traitId, optionGroupId: newOptionGroupId });
  };

  return (
    <div>
      <p>
        With this tool, you can quickly configure a{' '}
        <a href="https://github.com/DataDog/corp-node-packages/tree/master/packages/cdocs-data#key-terms">
          page filter
        </a>{' '}
        with an <strong>existing</strong> trait and option group.
      </p>
      <p>Use the dropdowns below to generate markup.</p>

      <h2>Filter configuration</h2>

      <h3>Trait</h3>
      <p>Select the user characteristic you want to filter the page on, such as the user's operating system.</p>
      <StrictTraitSelector customizationConfig={props.customizationConfig} onSave={handleTraitSelect} />

      <h3>Option group</h3>
      <p>Select the list of options to offer for the filter, such as "Linux, Windows, and MacOS".</p>
      <StrictOptionGroupSelector customizationConfig={props.customizationConfig} onSelect={handleOptionGroupIdSelect} />

      {traitId && optionGroupId && (
        <>
          <h2>Generated markup</h2>
          <p>Click any snippet to copy it.</p>

          <h3>Frontmatter</h3>
          <p>
            Add this to the <code>content_filters:</code> section of your page's frontmatter:
          </p>
          <Code contents={buildFrontmatterMarkup({ traitId, optionGroupId })} language="yaml" />

          <h3>
            Example <code>if</code> blocks
          </h3>
          <Code contents={ifBlocksContent} language="text" />
        </>
      )}
    </div>
  );
}
