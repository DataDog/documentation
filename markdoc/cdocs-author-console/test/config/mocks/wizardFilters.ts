import { WizardFilter } from '../../../src/types';

/**
 * A list of filters with a combination of new config and old config.
 */
export const mockWizardFilters: WizardFilter[] = [
  {
    uuid: 'cdb8178d-ea3a-44ed-b8ec-3ceb12818479',
    trait_id: 'color',
    option_group_id: 'traffic_light_color_options',
    customizationConfig: {
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
    }
  },
  {
    uuid: '2f7c96ed-5487-4aab-ab97-97d49c308dfe',
    trait_id: 'shape',
    option_group_id: 'block_shape_options',
    customizationConfig: {
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
    }
  }
] as const;
