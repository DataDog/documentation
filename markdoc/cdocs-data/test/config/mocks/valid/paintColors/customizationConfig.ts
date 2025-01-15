import { CustomizationConfig, CustomizationConfigSchema } from '../../../../../src';

export const paintColorsCustomizationConfig: CustomizationConfig = {
  traitsById: {
    color: {
      id: 'color',
      label: 'Color',
    },
    finish: {
      id: 'finish',
      label: 'Finish',
    },
    paint: {
      id: 'paint',
      label: 'Paint color',
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
    powder_blue: {
      id: 'powder_blue',
      label: 'Powder Blue',
    },
    elegant_royal: {
      id: 'elegant_royal',
      label: 'Elegant Royal',
    },
    robins_egg: {
      id: 'robins_egg',
      label: "Robin's Egg",
    },
    sky_blue: {
      id: 'sky_blue',
      label: 'Sky Blue',
    },
    navy: {
      id: 'navy',
      label: 'Navy',
    },
    brick: {
      id: 'brick',
      label: 'Brick',
    },
    scarlet: {
      id: 'scarlet',
      label: 'Scarlet',
    },
    rose: {
      id: 'rose',
      label: 'Rose',
    },
    ruby: {
      id: 'ruby',
      label: 'Ruby',
    },
    fire_engine: {
      id: 'fire_engine',
      label: 'Fire Engine',
    },
    crimson: {
      id: 'crimson',
      label: 'Crimson',
    },
  },
  optionGroupsById: {
    color_options: [
      { id: 'blue', label: 'Blue', default: true },
      { id: 'red', label: 'Red' },
    ],
    finish_options: [
      { id: 'matte', label: 'Matte' },
      { id: 'eggshell', label: 'Eggshell', default: true },
      { id: 'gloss', label: 'Gloss' },
    ],
    matte_blue_paint_options: [
      { id: 'powder_blue', label: 'Powder Blue', default: true },
    ],
    eggshell_blue_paint_options: [
      { id: 'elegant_royal', label: 'Elegant Royal', default: true },
      { id: 'robins_egg', label: "Robin's Egg" },
    ],
    gloss_blue_paint_options: [
      { id: 'sky_blue', label: 'Sky Blue', default: true },
      { id: 'navy', label: 'Navy' },
    ],
    matte_red_paint_options: [
      { id: 'brick', label: 'Brick', default: true },
      { id: 'scarlet', label: 'Scarlet' },
    ],
    eggshell_red_paint_options: [
      { id: 'rose', label: 'Rose', default: true },
      { id: 'ruby', label: 'Ruby' },
    ],
    gloss_red_paint_options: [
      { id: 'fire_engine', label: 'Fire Engine', default: true },
      { id: 'crimson', label: 'Crimson' },
    ],
  },
};

CustomizationConfigSchema.parse(paintColorsCustomizationConfig);
