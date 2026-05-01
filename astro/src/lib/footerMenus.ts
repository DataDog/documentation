/**
 * Typed loader for the Hugo docs footer menus. Parses the copied-verbatim
 * websites-modules menus.en.yaml and exposes the footer_* menu lists.
 *
 * URL resolution mirrors footer_link.html: relative URLs get prefixed with
 * https://www.datadoghq.com/ (with an optional lang prefix once non-English
 * pages land), absolute URLs pass through.
 */
import { parse as parseYaml } from 'yaml';
// @ts-ignore — Vite raw import
import menusRaw from '../mocked_dependencies/websites_modules/config/_default/menus/menus.en.yaml?raw';

export type FooterMenuItem = {
  name: string;
  url: string;
  target?: '_blank';
  weight: number;
};

export type FooterSocialItem = FooterMenuItem & {
  pre: string;
};

type MenusFile = {
  footer_resources: FooterMenuItem[];
  footer_about: FooterMenuItem[];
  footer_blog: FooterMenuItem[];
  footer_sub: FooterMenuItem[];
  footer_social: FooterSocialItem[];
};

const menus = parseYaml(menusRaw) as MenusFile;

const byWeight = <T extends { weight: number }>(a: T, b: T) => a.weight - b.weight;

export function getFooterResources(): FooterMenuItem[] {
  return [...menus.footer_resources].sort(byWeight);
}

export function getFooterAbout(): FooterMenuItem[] {
  return [...menus.footer_about].sort(byWeight);
}

export function getFooterBlog(): FooterMenuItem[] {
  return [...menus.footer_blog].sort(byWeight);
}

export function getFooterSub(): FooterMenuItem[] {
  return [...menus.footer_sub].sort(byWeight);
}

export function getFooterSocial(): FooterSocialItem[] {
  return [...menus.footer_social].sort(byWeight);
}

/**
 * Resolve a footer menu URL exactly as footer_link.html does for non-corp-hugo
 * sites: hasPrefix "http" → pass through, else prepend the datadoghq.com host
 * (and optional lang prefix, empty for English).
 */
export function resolveFooterUrl(url: string, langPrefix = ''): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const trimmed = url.replace(/^\/+/, '');
  return `https://www.datadoghq.com/${langPrefix}${trimmed}`;
}

/** Split a list in half, first half is length-ceiling(len/2). Matches Hugo's `first`/`last` split. */
export function splitHalves<T>(items: T[]): { first: T[]; second: T[] } {
  const len = items.length;
  const secondLen = Math.floor(len / 2);
  const firstLen = len - secondLen;
  return { first: items.slice(0, firstLen), second: items.slice(firstLen) };
}