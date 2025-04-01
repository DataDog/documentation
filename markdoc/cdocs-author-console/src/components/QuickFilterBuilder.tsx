import React, { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitSelector from './forms/TraitSelector';
import OptionGroupSelector from './forms/OptionGroupSelector';
import Code from './Code';
import { WizardFilter } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { DocTemplater } from './DocTemplater';

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

function buildWizardFilter({
  traitId,
  optionGroupId,
  customizationConfig
}: {
  traitId: string;
  optionGroupId: string;
  customizationConfig: CustomizationConfig;
}): WizardFilter {
  const optionGroup = [...customizationConfig.optionGroupsById[optionGroupId]];
  const optionIds = optionGroup.map((option) => option.id);
  const optionsById = optionIds.reduce(
    (acc, optionId) => {
      acc[optionId] = { ...customizationConfig.optionsById[optionId] };
      return acc;
    },
    {} as Record<
      string,
      {
        id: string;
        label: string;
      }
    >
  );

  return {
    trait_id: traitId,
    option_group_id: optionGroupId,
    uuid: uuidv4(),
    customizationConfig: {
      traitsById: {
        [traitId]: { ...customizationConfig.traitsById[traitId] }
      },
      optionGroupsById: {
        [optionGroupId]: optionGroup
      },
      optionsById
    }
  };
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
      <TraitSelector customizationConfig={props.customizationConfig} onSelect={handleTraitSelect} />

      <h3>Option group</h3>
      <p>Select the list of options to offer for the filter, such as "Linux, Windows, and MacOS".</p>
      <OptionGroupSelector customizationConfig={props.customizationConfig} onSelect={handleOptionGroupIdSelect} />

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
