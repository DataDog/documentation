import React, { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitSelector from './selectors/TraitSelector';
import OptionGroupSelector from './selectors/OptionGroupSelector';
import Code from './Code';
import { WizardFilter } from './wizard/types';
import { v4 as uuidv4 } from 'uuid';
import { DocTemplater } from './wizard/DocTemplater';

function buildFilterConfig({
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
  trait_id,
  option_group_id,
  customizationConfig
}: {
  trait_id: string;
  option_group_id: string;
  customizationConfig: CustomizationConfig;
}): WizardFilter {
  const optionGroup = [...customizationConfig.optionGroupsById[option_group_id]];
  console.log('optionGroup', optionGroup);
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
    trait_id,
    option_group_id,
    uuid: uuidv4(),
    customizationConfig: {
      traitsById: {
        [trait_id]: { ...customizationConfig.traitsById[trait_id] }
      },
      optionGroupsById: {
        [option_group_id]: optionGroup
      },
      optionsById
    }
  };
}

export default function QuickFilterBuilder(props: { customizationConfig: CustomizationConfig }) {
  const [traitId, setTraitId] = useState<string | null>(null);
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null);
  const [filterConfig, setFilterConfig] = useState<string>(buildFilterConfig({ traitId, optionGroupId }));
  const [ifBlocksContent, setIfBlocksContent] = useState<string>('');

  const handleTraitSelect = (newTraitId: string) => {
    setTraitId(newTraitId);
    setFilterConfig(buildFilterConfig({ traitId: newTraitId, optionGroupId }));
    if (optionGroupId) {
      console.log('building if blocks');
      const filter = buildWizardFilter({
        trait_id: newTraitId,
        option_group_id: optionGroupId,
        customizationConfig: props.customizationConfig
      });
      const templater = new DocTemplater({
        filters: [filter],
        customizationConfig: props.customizationConfig
      });
      setIfBlocksContent(templater.buildIfBlocks());
    }
  };

  const handleOptionGroupIdSelect = (newOptionGroupId: string) => {
    setOptionGroupId(newOptionGroupId);
    setFilterConfig(buildFilterConfig({ traitId, optionGroupId: newOptionGroupId }));
    if (traitId) {
      console.log('building if blocks');
      const filter = buildWizardFilter({
        trait_id: traitId,
        option_group_id: newOptionGroupId,
        customizationConfig: props.customizationConfig
      });
      const templater = new DocTemplater({
        filters: [filter],
        customizationConfig: props.customizationConfig
      });
      setIfBlocksContent(templater.buildIfBlocks());
    }
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
      <p>Use the dropdowns below to generate markup, then click any snippet to copy it.</p>

      <h2>Filter configuration</h2>

      <h3>Trait</h3>
      <p>Select the user characteristic you want to filter the page on, such as the user's operating system.</p>
      <TraitSelector customizationConfig={props.customizationConfig} onSelect={handleTraitSelect} />

      <h3>Option group</h3>
      <p>Select the list of options to offer for the filter, such as "Linux, Windows, and MacOS".</p>
      <OptionGroupSelector customizationConfig={props.customizationConfig} onSelect={handleOptionGroupIdSelect} />

      <h2>Generated markup</h2>

      <h3>Frontmatter</h3>
      <p>
        Add this to the <code>content_filters:</code> section of your page's frontmatter:
      </p>
      <Code contents={filterConfig} language="yaml" />

      <h3>
        Example <code>if</code> blocks
      </h3>
      {!ifBlocksContent && (
        <p>
          Once you've selected a trait and option group, example <code>if</code> blocks will appear here.
        </p>
      )}
      {ifBlocksContent && <Code contents={ifBlocksContent} language="markdown" />}
    </div>
  );
}
