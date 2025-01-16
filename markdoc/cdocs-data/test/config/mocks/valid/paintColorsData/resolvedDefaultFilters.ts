import { ResolvedFilters, ResolvedFiltersSchema } from '../../../../../src';

export const resolvedPaintColorsFilters: ResolvedFilters = {
  color: {
    id: 'color',
    label: 'Color',
    defaultValue: 'blue',
    currentValue: 'blue',
    options: [
      {
        id: 'blue',
        label: 'Blue',
      },
      {
        id: 'red',
        label: 'Red',
      },
    ],
  },
  finish: {
    id: 'finish',
    label: 'Finish',
    defaultValue: 'eggshell',
    currentValue: 'eggshell',
    options: [
      {
        id: 'matte',
        label: 'Matte',
      },
      {
        id: 'eggshell',
        label: 'Eggshell',
      },
      {
        id: 'gloss',
        label: 'Gloss',
      },
    ],
  },
  paint: {
    id: 'paint',
    label: 'Paint color',
    defaultValue: 'elegant_royal_e',
    currentValue: 'elegant_royal_e',
    options: [
      {
        id: 'elegant_royal_e',
        label: 'Elegant Royal',
      },
      {
        id: 'robins_egg_e',
        label: "Robin's Egg",
      },
    ],
  },
};

ResolvedFiltersSchema.parse(resolvedPaintColorsFilters);
