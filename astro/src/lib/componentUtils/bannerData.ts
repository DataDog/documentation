import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import PARAMS_EN_YAML_RAW from '@hugo-site/config/_default/params.en.yaml?raw';

const BannerParamsSchema = z.object({
  desktop_message: z.string().optional(),
  mobile_message: z.string().optional(),
  background_color: z.string().optional(),
  gradient_color_one: z.string().optional(),
  gradient_color_two: z.string().optional(),
  external_link: z.string().optional(),
  link: z.string().optional(),
  custom_classes: z.string().optional(),
  icon: z.string().optional(),
  icon_color: z.string().optional(),
  custom_event_banner: z.boolean().optional(),
  html: z.boolean().optional(),
});

export type BannerParams = z.infer<typeof BannerParamsSchema>;

const SiteParamsSchema = z.object({
  announcement_banner: BannerParamsSchema.optional(),
});

const siteParams = SiteParamsSchema.parse(parseYaml(PARAMS_EN_YAML_RAW));

export function getBannerParams(): BannerParams {
  return siteParams.announcement_banner ?? {};
}
