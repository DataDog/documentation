import { FiltersManifest, FiltersManifestSchema } from '../../../../../src';

export const paintColorsManifest: FiltersManifest = {
  filtersByTraitId: {
    color: {
      config: {
        label: 'Color',
        trait_id: 'color',
        option_group_id: 'color_options',
      },
      defaultValsByOptionGroupId: {
        color_options: 'blue',
      },
      possibleVals: ['blue', 'red'],
      optionLabelsByOptionId: {
        blue: 'Blue',
        red: 'Red',
      },
    },
    finish: {
      config: {
        label: 'Finish',
        trait_id: 'finish',
        option_group_id: 'finish_options',
      },
      defaultValsByOptionGroupId: {
        finish_options: 'eggshell',
      },
      possibleVals: ['matte', 'eggshell', 'gloss'],
      optionLabelsByOptionId: {
        matte: 'Matte',
        eggshell: 'Eggshell',
        gloss: 'Gloss',
      },
    },
    paint: {
      config: {
        label: 'Paint color',
        trait_id: 'paint',
        option_group_id: '<FINISH>_<COLOR>_paint_options',
      },
      defaultValsByOptionGroupId: {
        matte_blue_paint_options: 'powder_blue_m',
        matte_red_paint_options: 'brick_m',
        eggshell_blue_paint_options: 'elegant_royal_e',
        eggshell_red_paint_options: 'rose_e',
        gloss_blue_paint_options: 'sky_blue_g',
        gloss_red_paint_options: 'fire_engine_g',
      },
      possibleVals: [
        'powder_blue_m',
        'brick_m',
        'scarlet_m',
        'elegant_royal_e',
        'robins_egg_e',
        'rose_e',
        'ruby_e',
        'sky_blue_g',
        'navy_g',
        'fire_engine_g',
        'crimson_g',
      ],
      optionLabelsByOptionId: {
        powder_blue_m: 'Powder Blue',
        brick_m: 'Brick',
        scarlet_m: 'Scarlet',
        elegant_royal_e: 'Elegant Royal',
        robins_egg_e: "Robin's Egg",
        rose_e: 'Rose',
        ruby_e: 'Ruby',
        sky_blue_g: 'Sky Blue',
        navy_g: 'Navy',
        fire_engine_g: 'Fire Engine',
        crimson_g: 'Crimson',
      },
    },
    palette_version: {
      config: {
        label: 'Palette Version',
        trait_id: 'palette_version',
        option_group_id: 'palette_version_options',
      },
      defaultValsByOptionGroupId: {
        palette_version_options: '1_0_0',
      },
      possibleVals: ['1_0_0', '1_1_0', 'gt_1_0_0'],
      optionLabelsByOptionId: {
        '1_0_0': '1.0.0',
        '1_1_0': '1.1.0',
        gt_1_0_0: '>1.0.0',
      },
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
    palette_version_options: [
      {
        default: true,
        id: '1_0_0',
        label: '1.0.0',
      },
      {
        id: '1_1_0',
        label: '1.1.0',
      },
      {
        id: 'gt_1_0_0',
        label: '>1.0.0',
      },
    ],
  },
  errors: [],
  defaultValsByTraitId: {
    color: 'blue',
    finish: 'eggshell',
    paint: 'elegant_royal_e',
    palette_version: '1_0_0',
  },
};

FiltersManifestSchema.parse(paintColorsManifest);
