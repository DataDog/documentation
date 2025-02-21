import { useState } from 'react';
import PrefsTable from './PrefsTable';
import { CreatedPref } from './types';
import NewPrefForm from './NewPrefForm';
import { DbData } from '../../db/types';

export default function PrefsBuilder(props: { allowlist: DbData['allowlist'] }) {
  const initNewPref = (): CreatedPref => {
    return {
      id: '',
      optionSetId: '',
      options: []
    };
  };

  const [prefs, _updatePrefs] = useState<CreatedPref[]>([
    {
      id: 'host',
      optionSetId: 'dbm_host_options',
      options: [
        {
          id: 'aws',
          value: 'AWS',
          default: true
        },
        {
          id: 'gcp',
          value: 'GCP',
          default: false
        },
        {
          id: 'azure',
          value: 'Azure',
          default: false
        }
      ]
    }
  ]);

  const [newPref, setNewPref] = useState<CreatedPref | null>(null);

  return (
    <div>
      <PrefsTable prefs={prefs} />
      {!newPref && (
        <button
          onClick={() => {
            setNewPref(initNewPref());
          }}
        >
          Add another choice to the page
        </button>
      )}
      {newPref && (
        <button
          onClick={() => {
            setNewPref(null);
          }}
        >
          Cancel choice addition
        </button>
      )}
      {newPref && <NewPrefForm pref={newPref} allowlist={props.allowlist} />}
    </div>
  );
}
