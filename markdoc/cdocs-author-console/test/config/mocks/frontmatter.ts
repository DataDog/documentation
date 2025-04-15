import { Frontmatter, FrontmatterSchema } from 'cdocs-data';

export const mockFrontmatter: Frontmatter = {
  title: 'Your Title Here',
  content_filters: [
    {
      trait_id: 'color',
      option_group_id: 'traffic_light_color_options'
    },
    {
      trait_id: 'shape',
      option_group_id: 'block_shape_options'
    }
  ]
} as const;

FrontmatterSchema.parse(mockFrontmatter);
