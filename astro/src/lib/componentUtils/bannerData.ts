import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import PARAMS_EN_YAML_RAW from '@hugo-site/config/_default/params.en.yaml?raw';

export type BannerParams = {
  desktop_message?: string;
  mobile_message?: string;
  background_color?: string;
  gradient_color_one?: string;
  gradient_color_two?: string;
  external_link?: string;
  link?: string;
  custom_classes?: string;
  icon?: string;
  icon_color?: string;
  custom_event_banner?: boolean;
  html?: boolean;
};

const siteParams = parseYaml(PARAMS_EN_YAML_RAW) as { announcement_banner?: BannerParams };

export function getBannerParams(): BannerParams {
  return siteParams.announcement_banner ?? {};
}
