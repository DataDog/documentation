import React, { useState } from 'react';
import { CreatedPref } from './types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { DbData } from '../../db/types';
import PrefIdSelector from './PrefIdSelector';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OptionsSelector = (props: { pref: CreatedPref }) => {
  const [localPref, setLocalPref] = useState<CreatedPref>(props.pref);

  const handleOptionsSetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedLocalPref = { ...localPref, optionSetId: value };
    setLocalPref(updatedLocalPref);
  };

  return (
    <div>
      <div>
        <div></div>
        <p>
          Give this set of options a name, such as <code>dbm_database_options</code>.
        </p>
        <Box>
          <TextField
            id="options-set-name"
            variant="outlined"
            label="options set name"
            sx={{ width: '100%', marginBottom: '15px ' }}
            onChange={handleOptionsSetNameChange}
          />
        </Box>
        <Accordion>
          <AccordionSummary
            sx={{ fontSize: '0.9em' }}
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="info-usage-content"
            id="info-usage"
          >
            Help me choose
          </AccordionSummary>
          <AccordionDetails>
            <p>
              This name should describe a specific, single question we are asking the
              customer.
              <ul>
                <li>
                  <DangerousIcon sx={{ color: 'red' }} />
                  <code>host_options</code> is not a good name, because it's too vague. It
                  could represent many individual questions we might ask the customer,
                  such as "What is your Postgres host?" or the question "What is your web
                  application host?"
                </li>
                <li>
                  <CheckCircleIcon sx={{ color: 'green' }} />
                  <code>agent_host_options</code> is a good name, because it represents a
                  single question. The choice might appear multiple times on the site. The
                  customer may even provide a different answer on different days,
                  depending on the context of the problem they are trying to solve. But
                  every time the choice appears on a page, it represents the same
                  underlying question: "Where is your Datadog Agent hosted?"
                </li>
              </ul>
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{ fontSize: '0.9em' }}
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="info-usage-content"
            id="info-usage"
          >
            How is this information used?
          </AccordionSummary>
          <AccordionDetails>
            <p>
              It will be used as a label for the set of options, so future authors can
              <ul>
                <li>understand the question this set of options is answering</li>
                <li>reuse the set on their page, if they are asking the same question</li>
                <li>assess whether the options in the set are outdated</li>
                <li>otherwise maintain the set to keep it accurate</li>
              </ul>
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

interface Step {
  label: string;
  completed: boolean;
}

export default function NewPrefForm(props: {
  pref: CreatedPref;
  allowlist: DbData['allowlist'];
  // onPrefChange: (pref: CreatedPref) => void;
}) {
  const { pref, allowlist } = props;

  const [localPref, setLocalPref] = useState<CreatedPref>(pref);

  const [steps, setSteps] = useState<Step[]>([
    { label: 'Choose the pref', completed: false },
    { label: 'Choose the options', completed: false }
  ]);

  const [activeStep, setActiveStep] = React.useState(0);

  const markStepCompleted = (stepIndex: number) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].completed = true;
    setSteps(updatedSteps);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div style={{ borderTop: '1px solid black', marginTop: '30px' }}>
      <h2>Add a choice to the page</h2>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <div style={{ marginBottom: '20px' }}>
                  {activeStep === 0 && (
                    <PrefIdSelector
                      pref={pref}
                      onCompleted={(pref: CreatedPref) => {
                        markStepCompleted(0);
                        setLocalPref(pref);
                      }}
                      allowlist={allowlist}
                    />
                  )}
                  {activeStep === 1 && <OptionsSelector />}
                </div>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    disabled={!step.completed}
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  {activeStep !== 0 && (
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div style={{ marginTop: '100px', padding: '20px', border: '2px solid red' }}>
          <p>Local pref: {JSON.stringify(localPref, null, 2)}</p>
        </div>
      </Box>
    </div>
  );
}
