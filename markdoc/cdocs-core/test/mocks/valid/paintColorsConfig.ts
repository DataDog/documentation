import {
  ContentFiltersConfig,
  ContentFiltersConfigSchema,
} from '../../../src/schemas/contentFiltersConfig';
import { Frontmatter, FrontmatterSchema } from '../../../src/schemas/frontMatter';

export const paintColorsFrontmatter: Frontmatter = {
  title: 'My Page',
  content_filters: [
    {
      display_name: 'Color',
      id: 'color',
      options_source: 'color_options',
    },
    {
      display_name: 'Finish',
      id: 'finish',
      options_source: 'finish_options',
    },
    {
      display_name: 'Paint color',
      id: 'paint',
      options_source: '<FINISH>_<COLOR>_paint_options',
    },
  ],
};
FrontmatterSchema.parse(paintColorsFrontmatter);

export const paintColorsContentFiltersConfig: ContentFiltersConfig = {
  filterGlossary: {
    color: {
      id: 'color',
      display_name: 'Color',
    },
    finish: {
      id: 'finish',
      display_name: 'Finish',
    },
    paint: {
      id: 'paint',
      display_name: 'Paint color',
    },
  },
  optionGlossary: {
    blue: {
      id: 'blue',
      display_name: 'Blue',
    },
    red: {
      id: 'red',
      display_name: 'Red',
    },
    matte: {
      id: 'matte',
      display_name: 'Matte',
    },
    eggshell: {
      id: 'eggshell',
      display_name: 'Eggshell',
    },
    gloss: {
      id: 'gloss',
      display_name: 'Gloss',
    },
    powder_blue: {
      id: 'powder_blue',
      display_name: 'Powder Blue',
    },
    elegant_royal: {
      id: 'elegant_royal',
      display_name: 'Elegant Royal',
    },
    robins_egg: {
      id: 'robins_egg',
      display_name: "Robin's Egg",
    },
    sky_blue: {
      id: 'sky_blue',
      display_name: 'Sky Blue',
    },
    navy: {
      id: 'navy',
      display_name: 'Navy',
    },
    brick: {
      id: 'brick',
      display_name: 'Brick',
    },
    scarlet: {
      id: 'scarlet',
      display_name: 'Scarlet',
    },
    rose: {
      id: 'rose',
      display_name: 'Rose',
    },
    ruby: {
      id: 'ruby',
      display_name: 'Ruby',
    },
    fire_engine: {
      id: 'fire_engine',
      display_name: 'Fire Engine',
    },
    crimson: {
      id: 'crimson',
      display_name: 'Crimson',
    },
  },
  optionGroupGlossary: {
    color_options: [
      { id: 'blue', display_name: 'Blue', default: true },
      { id: 'red', display_name: 'Red' },
    ],
    finish_options: [
      { id: 'matte', display_name: 'Matte' },
      { id: 'eggshell', display_name: 'Eggshell', default: true },
      { id: 'gloss', display_name: 'Gloss' },
    ],
    matte_blue_paint_options: [
      { id: 'powder_blue', display_name: 'Powder Blue', default: true },
    ],
    eggshell_blue_paint_options: [
      { id: 'elegant_royal', display_name: 'Elegant Royal', default: true },
      { id: 'robins_egg', display_name: "Robin's Egg" },
    ],
    gloss_blue_paint_options: [
      { id: 'sky_blue', display_name: 'Sky Blue', default: true },
      { id: 'navy', display_name: 'Navy' },
    ],
    matte_red_paint_options: [
      { id: 'brick', display_name: 'Brick', default: true },
      { id: 'scarlet', display_name: 'Scarlet' },
    ],
    eggshell_red_paint_options: [
      { id: 'rose', display_name: 'Rose', default: true },
      { id: 'ruby', display_name: 'Ruby' },
    ],
    gloss_red_paint_options: [
      { id: 'fire_engine', display_name: 'Fire Engine', default: true },
      { id: 'crimson', display_name: 'Crimson' },
    ],
  },
};
ContentFiltersConfigSchema.parse(paintColorsContentFiltersConfig);
