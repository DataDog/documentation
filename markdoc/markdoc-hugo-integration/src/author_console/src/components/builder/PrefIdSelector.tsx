import React, { useState } from 'react';
import { CreatedPref } from './types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DbData } from '../../db/types';

export default function PrefIdSelector(props: {
  allowlist: DbData['allowlist'];
  onCompleted: (pref: CreatedPref) => void;
  pref: CreatedPref;
}) {
  const prefOptions = Object.keys(props.allowlist.prefsById).map((prefId) => {
    const pref = props.allowlist.prefsById[prefId];
    const label = `${pref.display_name} (\`${pref.id}\`)${pref.description && ':'} ${
      pref.description || ''
    }`;
    return { label, value: pref.id };
  });

  const [localPref, setLocalPref] = useState<CreatedPref>(props.pref);
  const handlePrefChange = (
    _event: React.SyntheticEvent,
    selection: { label: string; value: string } | null
  ) => {
    const prefId = selection?.value || '';
    if (prefId === localPref.id) {
      return;
    }
    const updatedLocalPref = { ...localPref, id: prefId };
    setLocalPref(updatedLocalPref);
    props.onCompleted(updatedLocalPref);
  };

  return (
    <div>
      <p>What customer characteristic is being chosen?</p>
      <Autocomplete
        disablePortal
        options={prefOptions}
        sx={{ width: '100%', marginBottom: '15px ' }}
        renderInput={(params) => <TextField {...params} />}
        onChange={handlePrefChange}
      />
      <Accordion>
        <AccordionSummary
          sx={{ fontSize: '0.9em' }}
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="help-me-choose-content"
          id="help-me-choose"
        >
          Help me choose
        </AccordionSummary>
        <AccordionDetails>
          <p>
            The pref ID is a category used to group similar choices together, so the
            customer's preference can travel between those choices, and the customer does
            not have to repeat themselves.
          </p>
          <p>
            For example, all three of the choices below would use the <code>host</code>{' '}
            pref ID:
          </p>
          <ul>
            <li>whether they're running the Agent on AWS or GCP</li>
            <li>whether their instance of Postgres is hosted on AWS or Azure</li>
            <li>which cloud host to configure for cost management features</li>
          </ul>
          <p>
            While each of the above choices is distinctly unique, all of them represent
            the choice of a <code>host</code>. It makes sense for a customer's selection
            on one choice to travel to the others, so they all use the same pref ID of{' '}
            <code>host</code>.
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
            The pref ID is a category used to group similar choices together, so the
            customer's preference can travel between those choices, and the customer does
            not have to repeat themselves.
          </p>
          <p>
            If they choose AWS as their host on one page, we also apply this selection to
            different choices on other pages when appropriate, so the customer enjoys a
            customized experience without needing to configure each page individually.
          </p>
          <p>
            The pref ID also appears in the URL, such as{' '}
            <code>docs.datadoghq.com/agent/setup?host=aws</code>.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
