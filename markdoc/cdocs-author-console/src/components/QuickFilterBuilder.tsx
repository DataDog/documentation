import React, { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import TraitSelector from './selectors/TraitSelector';

function buildFilterConfig({
  traitId,
  optionGroupId
}: {
  traitId: string | null;
  optionGroupId: string | null;
}): string {
  return `
content_filters:
  - trait_id: ${traitId || '<INSERT_TRAIT_ID_HERE>'}
    option_group_id: ${optionGroupId || '<INSERT_OPTION_GROUP_ID_HERE>'}
`;
}

export default function QuickFilterBuilder(props: { customizationConfig: CustomizationConfig }) {
  const [traitId, setTraitId] = useState<string | null>(null);
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null);
  const [filterConfig, setFilterConfig] = useState<string>(buildFilterConfig({ traitId, optionGroupId }));

  const handleTraitSelect = (newTraitId: string) => {
    setTraitId(traitId);
    setFilterConfig(buildFilterConfig({ traitId: newTraitId, optionGroupId }));
  };

  return (
    <div>
      <pre>{filterConfig}</pre>
      <h2>Trait</h2>
      <TraitSelector customizationConfig={props.customizationConfig} onSelect={handleTraitSelect} />
      <h2>Option group</h2>
    </div>
  );
}
