import { useState } from 'react';
import { CustomizationConfig } from 'cdocs-data';
import { OptionGroup } from './../../types';
import { WizardFilter, TraitConfig, FormStatus } from '../../types';
import FlexibleTraitSelector from './traits/FlexibleTraitSelector';
import FlexibleOptionGroupSelector from './optionGroups/FlexibleOptionGroupSelector';

function FilterForm(props: {
  filter: WizardFilter;
  customizationConfig: CustomizationConfig;
  onStatusChange: (p: { status: FormStatus; data?: WizardFilter }) => void;
}) {
  const formHeaderStyles: React.CSSProperties = {
    backgroundColor: '#eff1f5',
    fontSize: '0.9em',
    padding: '0.5em',
    textAlign: 'center',
    marginBottom: '1em',
    marginTop: '0.5em'
  };

  // The local copy of the filter, to hold any pending changes
  const [localFilter, setLocalFilter] = useState<WizardFilter>(props.filter);
  const [traitFormStatus, setTraitFormStatus] = useState<FormStatus>('waiting');
  const [optionGroupFormStatus, setOptionGroupFormStatus] = useState<FormStatus>('waiting');

  const handleTraitSave = ({ traitConfig }: { traitConfig: TraitConfig }) => {
    console.log('handleTraitSave', traitConfig);
    const updatedFilter = {
      ...localFilter,
      trait_id: traitConfig.id,
      label: traitConfig.label,
      customizationConfig: {
        ...localFilter.customizationConfig,
        traitsById: {
          [traitConfig.id]: traitConfig
        }
      }
    };
    setLocalFilter(updatedFilter);

    console.log('updatedFilter after trait save', updatedFilter);

    setTraitFormStatus('done');

    if (optionGroupFormStatus === 'done') {
      props.onStatusChange({ status: 'done', data: updatedFilter });
    }
  };

  const handleOptionGroupSave = (p: { optionGroupId: string; optionGroup: OptionGroup }) => {
    console.log('handleOptionGroupSave', p);
    const newCustomizationConfig: CustomizationConfig = {
      ...localFilter.customizationConfig,
      optionGroupsById: {
        [p.optionGroupId]: p.optionGroup
      },
      optionsById: {}
    };

    p.optionGroup.forEach((option) => {
      const optionId = option.id;
      newCustomizationConfig.optionsById[optionId] = props.customizationConfig.optionsById[optionId] || option;
    });

    const updatedFilter = {
      ...localFilter,
      option_group_id: p.optionGroupId,
      customizationConfig: newCustomizationConfig
    };

    setLocalFilter(updatedFilter);

    console.log('updatedFilter after option group save', updatedFilter);

    setOptionGroupFormStatus('done');

    if (traitFormStatus === 'done') {
      props.onStatusChange({ status: 'done', data: updatedFilter });
    }
  };

  return (
    <div>
      <h2 style={formHeaderStyles}>Choose a trait</h2>
      <p style={{ fontSize: '0.9em' }}>
        The user characteristic to filter on, such as their host or programming language.
      </p>
      <FlexibleTraitSelector
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          if (p.status === 'done' && p.data) {
            handleTraitSave({ traitConfig: p.data });
          }
        }}
      />
      <h2 style={{ ...formHeaderStyles, marginTop: '30px' }}>Choose an option group</h2>
      <p style={{ fontSize: '0.9em' }}>
        The list of options the user can select for this filter. For example, if you've chosen the{' '}
        <code>prog_lang</code> trait above, your option group would contain options like Python and JavaScript.
      </p>
      <FlexibleOptionGroupSelector
        customizationConfig={props.customizationConfig}
        onStatusChange={(p) => {
          if (p.status === 'done' && p.data) {
            handleOptionGroupSave({ optionGroupId: p.data.optionGroupId, optionGroup: p.data.optionGroup });
          }
        }}
      />
    </div>
  );
}

export default FilterForm;

/*

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
  */
