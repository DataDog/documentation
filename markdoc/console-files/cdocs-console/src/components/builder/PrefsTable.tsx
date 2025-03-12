import { useState } from 'react';
import { CreatedPref } from './types';

export default function PrefsTable(props: { prefs: CreatedPref[] }) {
  const [prefs, setPrefs] = useState(props.prefs);

  const handleDefaultChange = (prefId: string, optionId: string) => {
    setPrefs((prevPrefs) =>
      prevPrefs.map((pref) =>
        pref.id === prefId
          ? {
              ...pref,
              options: pref.options.map((option) =>
                option.id === optionId
                  ? { ...option, default: true }
                  : { ...option, default: false }
              )
            }
          : pref
      )
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Pref ID</th>
          <th>Option Set ID</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {prefs.map((pref) => (
          <tr key={pref.id}>
            <td>{pref.id}</td>
            <td>{pref.optionSetId}</td>
            <td>
              <ul>
                {pref.options.map((option) => (
                  <li key={option.id}>
                    <label>
                      <input
                        type="radio"
                        name={`default-${pref.id}`}
                        checked={option.default}
                        onChange={() => handleDefaultChange(pref.id, option.id)}
                      />
                      {option.value} {option.default ? '(default)' : ''}
                    </label>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
