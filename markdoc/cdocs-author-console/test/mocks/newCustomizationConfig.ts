import { CustomizationConfig } from 'cdocs-data';

export const newCustomizationConfig: CustomizationConfig = {
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
        label: 'Rectangle',
        default: false
      },
      {
        id: 'triangle',
        label: 'Triangle',
        default: false
      }
    ]
  }
};
