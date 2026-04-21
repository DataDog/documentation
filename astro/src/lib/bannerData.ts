/**
 * Typed loader for the announcement banner's site params and the geo-target
 * webinar list. Both come from mocked_dependencies snapshots — swap these
 * for a live feed by editing the two import paths.
 */
import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import paramsRaw from '../mocked_dependencies/hugo_site/config/_default/params.en.yaml?raw';
// @ts-ignore — Vite raw import
import webinarsRaw from '../mocked_dependencies/hugo_site/data/en/webinars.yaml?raw';

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

export type Webinar = {
  codes: string[];
  start_date: string;
  end_date: string;
  supported_language: string;
  desktop_title: string;
  mobile_title: string;
  link?: string;
  lp_link?: string;
  test_message?: boolean;
};

type WebinarFile = { webinars: Webinar[] };

const siteParams = parseYaml(paramsRaw) as { announcement_banner?: BannerParams };
const webinarList = parseYaml(webinarsRaw) as WebinarFile;

export function getBannerParams(): BannerParams {
  return siteParams.announcement_banner ?? {};
}

export function getWebinarList(): WebinarFile {
  return webinarList;
}
