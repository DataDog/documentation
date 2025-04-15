import { CustomizationConfig } from 'cdocs-data';

export const existingCustomizationConfig: CustomizationConfig = {
  traitsById: {
    color: {
      id: 'color',
      label: 'Color',
      internal_notes: 'DO NOT USE, testing purposes only.'
    }
  },
  optionsById: {
    red: {
      id: 'red',
      label: 'Red'
    },
    yellow: {
      id: 'yellow',
      label: 'Yellow'
    },
    green: {
      id: 'green',
      label: 'Green'
    },
    blue: {
      id: 'blue',
      label: 'Blue'
    }
  },
  optionGroupsById: {
    traffic_light_color_options: [
      {
        id: 'red',
        label: 'Red'
      },
      {
        id: 'yellow',
        label: 'Yellow'
      },
      {
        default: true,
        id: 'green',
        label: 'Green'
      }
    ]
  }
};
