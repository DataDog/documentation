/**
 * The Markdoc-Hugo integration's tag templates (shortcode templates)
 * don't have access to the same functions available
 * in Hugo's shortcode templates. This file provides the operations required
 * to implement the most common shortcodes on the Markdoc site.
 */

import md5 from 'md5';
import { HugoConfig } from './schemas/config/hugo';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  HugoGlobalConfig,
  HugoGlobalConfigSchema,
  HugoLanguagesConfig,
  HugoLanguagesConfigSchema,
  HugoSiteConfig,
  HugoSiteConfigSchema,
  HugoSiteParams,
  HugoSiteParamsSchema,
  HugoSubdirsByType,
  i18nConfig,
  i18nConfigSchema
} from './schemas/config/hugo';
import { IntegrationConfig } from './schemas/config/integration';

/**
 * Create a URL-friendly version of a string.
 * For example, creating an anchor name from a heading.
 */
export function anchorize(text: string): string {
  let anchorName: string[] = [];
  let futureDash = false;

  for (const char of text) {
    if (/[a-zA-Z0-9]/.test(char) || /[\u00C0-\u017F]/.test(char)) {
      if (futureDash && anchorName.length > 0) {
        anchorName.push('-');
      }
      futureDash = false;
      anchorName.push(char.toLowerCase());
    } else if (char === ' ') {
      anchorName.push('-');
      futureDash = false;
    } else if (char === '.') {
      futureDash = false;
    } else {
      futureDash = true;
    }
  }

  return anchorName.join('');
}

/**
 * Returns an absolute URL with a language prefix, if any.
 *
 * The JS equivalent of the Hugo template function `absLangURL`:
 * https://gohugo.io/functions/urls/abslangurl/
 */
export function absLangUrl(p: {
  hugoConfig: HugoConfig;
  url: string;
  defaultLang?: string;
}): string {
  let resultBaseUrl = new URL(p.hugoConfig.global.siteConfig.baseURL);
  const lang = p.hugoConfig.page.lang;

  let resultPath = p.url;

  if (resultPath.startsWith('/')) {
    resultBaseUrl = new URL(resultBaseUrl.origin + '/');
  } else {
    resultPath = '/' + resultPath;
  }

  resultPath = `${lang}${resultPath}`;

  const result = new URL(resultBaseUrl.href + resultPath).href;

  if (p.defaultLang && lang === p.defaultLang) {
    return result.replace(`/${lang}/`, '/');
  } else {
    return result;
  }
}

/**
 * Returns the string value of a key in the i18n object.
 * The i18n object is ingested from the JSON files in
 * the `<SITE_DIR>/i18n` folder. It contains translations
 * of text elements in the site UI, such as a translation of
 * the default Further Reading description
 * ("Additional helpful documentation, links, and articles")
 * into French.
 */
export function i18n(p: { hugoConfig: HugoConfig; key: string }): string {
  const i18n = p.hugoConfig.global.i18n;
  const lang = p.hugoConfig.page.lang;

  if (!i18n[lang] && !i18n['en']) {
    throw new Error(`No i18n translations found for language "${lang}" or English.`);
  }

  if (!i18n[lang][p.key] && !i18n['en'][p.key]) {
    throw new Error(
      `No translation found for key "${p.key}" in language "${lang}" or in English.`
    );
  }

  return i18n[lang][p.key].other || i18n['en'][p.key].other;
}

/**
 * Determines whether a given path is an absolute URL,
 * such as `https://example.com/path/to/page`,
 * or a relative path, such as `/path/to/page` or `path/to/page`.
 */
export function isAbsUrl(path: string): boolean {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return true;
  }
  try {
    new URL(path);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Build a permalink for an image that includes an md5
 * hash of the image's contents, in order to validate
 * the image's integrity.
 */
export function getFingerprintedPermalink(p: { src: string; hugoConfig: HugoConfig }) {
  const globalHugoConfig = p.hugoConfig.global;

  const path = globalHugoConfig.dirs.images + '/' + p.src;
  const hash = getFileContentsHash(path);

  let prefix = globalHugoConfig.siteConfig.baseURL;
  if (globalHugoConfig.env === 'preview') {
    prefix = `${globalHugoConfig.siteParams.branch}/`;
  }

  const permalink = `${prefix}images/${p.src.replace('.', `.${hash}.`)}`;
  return permalink;
}

/**
 * Returns the md5 hash of the contents of a file at a given path.
 */
export function getFileContentsHash(path: string): string {
  const contents = fs.readFileSync(path);
  return md5(contents);
}

/**
 * The JavaScript equivalent of the Hugo template function `relURL`:
 * https://gohugo.io/functions/urls/relurl/
 */
export function relUrl(p: { hugoConfig: HugoConfig; url: string }): string {
  const baseUrl = new URL(p.hugoConfig.global.siteConfig.baseURL);
  let resultUrl: string;

  if (p.url.startsWith('/')) {
    // If the input URL starts with a slash, make it relative to the protocol+host of the base URL
    resultUrl = p.url;
  } else if (isAbsUrl(p.url)) {
    const fullUrl = new URL(p.url);
    if (fullUrl.origin === baseUrl.origin) {
      resultUrl = fullUrl.pathname + fullUrl.search + fullUrl.hash;
    } else {
      throw new Error(
        `The URL to convert ("${p.url}") does not share the same origin as the base URL ("${baseUrl}").`
      );
    }
  } else {
    resultUrl = new URL(p.url, baseUrl).pathname;
  }

  // Ensure the result URL starts with a slash
  if (!resultUrl.startsWith('/')) {
    resultUrl = '/' + resultUrl;
  }

  // Remove trailing slash if present
  if (resultUrl.length > 1 && resultUrl.endsWith('/')) {
    resultUrl = resultUrl.slice(0, -1);
  }

  return resultUrl;
}

export function buildHugoGlobalConfig(p: IntegrationConfig): HugoGlobalConfig {
  const config: HugoGlobalConfig = {
    siteParams: loadSiteParams(p),
    siteConfig: loadSiteConfig(p),
    languages: loadLanguages(p),
    env: p.env,
    siteDir: p.baseSiteDir,
    i18n: loadI18n(p),
    dirs: getSubdirsByType(p)
  };

  HugoGlobalConfigSchema.parse(config);
  return config;
}

// PRIVATE HELPERS -----------------------------------------------------------

function getSubdirsByType(p: IntegrationConfig): HugoSubdirsByType {
  return {
    content: p.baseSiteDir + '/content',
    customizationConfig: p.baseSiteDir + '/customization_config',
    partials: p.baseSiteDir + '/layouts/partials',
    images: p.baseSiteDir + '/static/images',
    static: p.baseSiteDir + '/static'
  };
}

function loadSiteParams(p: IntegrationConfig): HugoSiteParams {
  const defaultSiteParamsFile = p.baseSiteDir + '/config/_default/params.yaml';
  const defaultSiteParams = yaml.load(fs.readFileSync(defaultSiteParamsFile, 'utf8'));

  const envSiteParamsFile = p.baseSiteDir + `/config/${p.env}/params.yaml`;
  const envSiteParams = yaml.load(fs.readFileSync(envSiteParamsFile, 'utf8'));

  const siteParams = Object.assign(
    {},
    defaultSiteParams,
    envSiteParams
  ) as HugoSiteParams;
  HugoSiteParamsSchema.parse(siteParams);

  return siteParams;
}

function loadSiteConfig(p: IntegrationConfig): HugoSiteConfig {
  const defaultSiteConfigFile = p.baseSiteDir + '/config/_default/config.yaml';
  const defaultSiteConfig = yaml.load(fs.readFileSync(defaultSiteConfigFile, 'utf8'));

  const envSiteConfigFile = p.baseSiteDir + `/config/${p.env}/config.yaml`;
  const envSiteConfig = yaml.load(fs.readFileSync(envSiteConfigFile, 'utf8'));

  const siteConfig = Object.assign(
    {},
    defaultSiteConfig,
    envSiteConfig
  ) as HugoSiteConfig;
  HugoSiteConfigSchema.parse(siteConfig);

  return siteConfig;
}

function loadLanguages(p: IntegrationConfig): HugoLanguagesConfig {
  const languagesFile = p.baseSiteDir + '/config/_default/languages.yaml';
  const languagesConfig = yaml.load(fs.readFileSync(languagesFile, 'utf8'));
  // @ts-ignore, data is validated by the schema on the next line
  const languages = Object.keys(languagesConfig);
  HugoLanguagesConfigSchema.parse(languages);
  return languages;
}

function loadI18n(p: IntegrationConfig): i18nConfig {
  const i18n = {};
  const i18nDir = p.baseSiteDir + '/i18n';
  const files = fs.readdirSync(i18nDir);
  files.forEach((file) => {
    const lang = file.replace('.json', '');
    // @ts-ignore, data is validated by the schema on the next line
    i18n[lang] = yaml.load(fs.readFileSync(path.resolve(i18nDir, file), 'utf8'));
  });
  i18nConfigSchema.parse(i18n);
  return i18n;
}
