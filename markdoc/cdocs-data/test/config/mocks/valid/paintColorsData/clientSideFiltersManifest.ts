import {
  ClientSideFiltersManifest,
  ClientSideFiltersManifestSchema,
} from '../../../../../src';

export const clientSidePaintColorsManifest: ClientSideFiltersManifest = {
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
    },
  },
  defaultValsByTraitId: {
    color: 'blue',
    finish: 'eggshell',
    paint: 'elegant_royal_e',
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
  },
};

ClientSideFiltersManifestSchema.parse(clientSidePaintColorsManifest);
