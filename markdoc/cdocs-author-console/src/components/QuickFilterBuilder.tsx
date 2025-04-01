import React, { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitSelector from './selectors/TraitSelector';
import OptionGroupSelector from './selectors/OptionGroupSelector';
import Code from './Code';

function buildFilterConfig({
  traitId,
  optionGroupId
}: {
  traitId: string | null;
  optionGroupId: string | null;
}): string {
  return `content_filters:
  - trait_id: ${traitId || '<CHOOSE_A_TRAIT_BELOW>'}
    option_group_id: ${optionGroupId || '<CHOOSE_AN_OPTION_GROUP_BELOW>'}
`;
}

export default function QuickFilterBuilder(props: { customizationConfig: CustomizationConfig }) {
  const [traitId, setTraitId] = useState<string | null>(null);
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null);
  const [filterConfig, setFilterConfig] = useState<string>(buildFilterConfig({ traitId, optionGroupId }));

  const handleTraitSelect = (newTraitId: string) => {
    setTraitId(newTraitId);
    setFilterConfig(buildFilterConfig({ traitId: newTraitId, optionGroupId }));
  };

  const handleOptionGroupIdSelect = (newOptionGroupId: string) => {
    setOptionGroupId(newOptionGroupId);
    setFilterConfig(buildFilterConfig({ traitId, optionGroupId: newOptionGroupId }));
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
      <p>Use the dropdowns below to update this frontmatter snippet, then click the snippet to copy it:</p>
      <Code contents={filterConfig} language="yaml" />
      <h3>Choose a trait</h3>
      <p>Select the user characteristic you want to filter the page on, such as the user's operating system.</p>
      <TraitSelector customizationConfig={props.customizationConfig} onSelect={handleTraitSelect} />
      <h3>Choose an option group</h3>
      <p>Select the list of options to offer for the filter, such as "Linux, Windows, and MacOS".</p>
      <OptionGroupSelector customizationConfig={props.customizationConfig} onSelect={handleOptionGroupIdSelect} />
    </div>
  );
}
