import { CustomizationConfig, CustomizationConfigSchema } from '../../../../../src';

export const paintColorsCustomizationConfig: CustomizationConfig = {
  traitsById: {
    color: {
      id: 'color',
      label: 'Color',
      internal_notes:
        "A high-level color that can help the user find the right paint, such as 'red'.",
    },
    finish: {
      id: 'finish',
      label: 'Finish',
      internal_notes: "A sheen such as 'glossy' or 'matte'.",
    },
    paint: {
      id: 'paint',
      label: 'Paint Color',
      internal_notes: "A specific color of paint, such as 'Fire Engine Red'.",
    },
  },
  optionsById: {
    blue: {
      id: 'blue',
      label: 'Blue',
    },
    red: {
      id: 'red',
      label: 'Red',
    },
    matte: {
      id: 'matte',
      label: 'Matte',
    },
    eggshell: {
      id: 'eggshell',
      label: 'Eggshell',
    },
    gloss: {
      id: 'gloss',
      label: 'Gloss',
    },
    powder_blue_m: {
      id: 'powder_blue_m',
      label: 'Powder Blue',
    },
    elegant_royal_e: {
      id: 'elegant_royal_e',
      label: 'Elegant Royal',
    },
    sky_blue_g: {
      id: 'sky_blue_g',
      label: 'Sky Blue',
    },
    robins_egg_e: {
      id: 'robins_egg_e',
      label: "Robin's Egg",
    },
    navy_g: {
      id: 'navy_g',
      label: 'Navy',
    },
    brick_m: {
      id: 'brick_m',
      label: 'Brick',
    },
    scarlet_m: {
      id: 'scarlet_m',
      label: 'Scarlet',
    },
    rose_e: {
      id: 'rose_e',
      label: 'Rose',
    },
    ruby_e: {
      id: 'ruby_e',
      label: 'Ruby',
    },
    fire_engine_g: {
      id: 'fire_engine_g',
      label: 'Fire Engine',
    },
    crimson_g: {
      id: 'crimson_g',
      label: 'Crimson',
    },
  },
  optionGroupsById: {
    color_options: [
      {
        default: true,
        id: 'blue',
        label: 'Blue',
      },
      {
        id: 'red',
        label: 'Red',
      },
    ],
    eggshell_blue_paint_options: [
      {
        default: true,
        id: 'elegant_royal_e',
        label: 'Elegant Royal',
      },
      {
        id: 'robins_egg_e',
        label: "Robin's Egg",
      },
    ],
    eggshell_red_paint_options: [
      {
        default: true,
        id: 'rose_e',
        label: 'Rose',
      },
      {
        id: 'ruby_e',
        label: 'Ruby',
      },
    ],
    finish_options: [
      {
        id: 'matte',
        label: 'Matte',
      },
      {
        default: true,
        id: 'eggshell',
        label: 'Eggshell',
      },
      {
        id: 'gloss',
        label: 'Gloss',
      },
    ],
    gloss_blue_paint_options: [
      {
        default: true,
        id: 'sky_blue_g',
        label: 'Sky Blue',
      },
      {
        id: 'navy_g',
        label: 'Navy',
      },
    ],
    gloss_red_paint_options: [
      {
        default: true,
        id: 'fire_engine_g',
        label: 'Fire Engine',
      },
      {
        id: 'crimson_g',
        label: 'Crimson',
      },
    ],
    matte_blue_paint_options: [
      {
        default: true,
        id: 'powder_blue_m',
        label: 'Powder Blue',
      },
    ],
    matte_red_paint_options: [
      {
        default: true,
        id: 'brick_m',
        label: 'Brick',
      },
      {
        id: 'scarlet_m',
        label: 'Scarlet',
      },
    ],
  },
};

CustomizationConfigSchema.parse(paintColorsCustomizationConfig);
