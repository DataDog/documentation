import { CustomizationConfig, CustomizationConfigSchema } from 'cdocs-data';

export const mockMergedCustomizationConfig: CustomizationConfig = {
  traitsById: {
    shape: {
      id: 'shape',
      label: 'Shape',
      internal_notes: ''
    },
    color: {
      id: 'color',
      label: 'Color',
      internal_notes: 'DO NOT USE, testing purposes only.'
    }
  },
  optionsById: {
    circle: {
      id: 'circle',
      label: 'Circle'
    },
    rectangle: {
      id: 'rectangle',
      label: 'Rectangle'
    },
    triangle: {
      id: 'triangle',
      label: 'Triangle'
    },
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
    block_shape_options: [
      {
        id: 'circle',
        label: 'Circle',
        default: true
      },
      {
        id: 'rectangle',
        label: 'Rectangle'
      },
      {
        id: 'triangle',
        label: 'Triangle'
      }
    ],
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
} as const;

CustomizationConfigSchema.parse(mockMergedCustomizationConfig);
