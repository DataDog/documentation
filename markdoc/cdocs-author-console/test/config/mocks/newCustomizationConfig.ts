import { CustomizationConfig, CustomizationConfigSchema } from 'cdocs-data';

export const mockNewCustomizationConfig: CustomizationConfig = {
  traitsById: {
    shape: {
      id: 'shape',
      label: 'Shape',
      internal_notes: ''
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
    ]
  }
} as const;

CustomizationConfigSchema.parse(mockNewCustomizationConfig);
