import md5 from 'md5';
import { HugoConfig, HugoSubdirsByType } from '../schemas/config/hugo';
import fs from 'fs';

/**
 * The Markdoc-Hugo integration's tag templates (shortcode templates)
 * don't have access to the same functions available
 * in Hugo's shortcode templates. This module provides the operations required
 * to implement the most common shortcodes on the Markdoc site.
 */
export class HugoFunctions {
  /**
   * Returns an absolute URL with a language prefix, if any.
   *
   * The JS equivalent of the Hugo template function `absLangURL`:
   * https://gohugo.io/functions/urls/abslangurl/
   */
  static absLangUrl(p: {
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

    console.log('\n\n\n');
    console.log('url', p.url);
    console.log('lang', lang);
    console.log('resultPath', resultPath);
    console.log('resultBaseUrl', resultBaseUrl);
    console.log('final result', new URL(resultPath, resultBaseUrl));
    const result = new URL(resultBaseUrl.href + resultPath).href;

    if (p.defaultLang && lang === p.defaultLang) {
      return result.replace(`/${lang}/`, '/');
    } else {
      return result;
    }
  }

  /**
   * When given the top-level directory for a Hugo site,
   * returns an object with the paths to any subdirectories
   * the integration needs to access.
   */
  static getSubdirsByType(siteDir: string): HugoSubdirsByType {
    return {
      content: siteDir + '/content',
      filtersConfig: siteDir + '/config/_default/content_filters',
      partials: siteDir + '/layouts/partials',
      images: siteDir + '/static/images'
    };
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
  static i18n(p: { hugoConfig: HugoConfig; key: string }): string {
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
  static isAbsUrl(path: string): boolean {
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
  static getFingerprintedPermalink(p: { src: string; hugoConfig: HugoConfig }) {
    const globalHugoConfig = p.hugoConfig.global;

    const path = globalHugoConfig.dirs.images + '/' + p.src;
    const hash = this.getFileContentsHash(path);

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
  static getFileContentsHash(path: string): string {
    const contents = fs.readFileSync(path);
    return md5(contents);
  }

  /**
   * The JavaScript equivalent of the Hugo template function `relURL`:
   * https://gohugo.io/functions/urls/relurl/
   */
  static relUrl(p: { hugoConfig: HugoConfig; url: string }): string {
    const baseUrl = new URL(p.hugoConfig.global.siteConfig.baseURL);
    let resultUrl: string;

    if (p.url.startsWith('/')) {
      // If the input URL starts with a slash, make it relative to the protocol+host of the base URL
      resultUrl = p.url;
    } else if (this.isAbsUrl(p.url)) {
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
}
