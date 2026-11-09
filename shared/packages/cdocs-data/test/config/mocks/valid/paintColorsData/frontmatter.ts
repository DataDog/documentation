import { Frontmatter, FrontmatterSchema } from '../../../../../src/schemas/frontmatter';

export const paintColorsFrontmatter: Frontmatter = {
  title: 'My Page',
  content_filters: [
    {
      label: 'Color',
      trait_id: 'color',
      option_group_id: 'color_options',
    },
    {
      label: 'Finish',
      trait_id: 'finish',
      option_group_id: 'finish_options',
    },
    {
      label: 'Paint color',
      trait_id: 'paint',
      option_group_id: '<FINISH>_<COLOR>_paint_options',
    },
    {
      label: 'Palette Version',
      trait_id: 'palette_version',
      option_group_id: 'palette_version_options',
    },
  ],
};

FrontmatterSchema.parse(paintColorsFrontmatter);
