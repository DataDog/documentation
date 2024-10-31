import md5 from 'md5';
import { HugoConfig } from '../schemas/hugoConfig';
import fs from 'fs';

/**
 * The Markdoc-Hugo integration's tag templates (shortcode templates)
 * don't have access to the same functions available
 * in Hugo's shortcode templates. This module provides the operations required
 * to implement the most common shortcodes on the Markdoc site.
 */
export class HugoFunctions {
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

  static getFingerprintedPermalink(p: { src: string; hugoConfig: HugoConfig }) {
    const path = p.hugoConfig.dirs.images + '/' + p.src;
    const hash = this.getFileContentsHash(path);

    let prefix = p.hugoConfig.siteConfig.baseURL;
    if (p.hugoConfig.env === 'preview') {
      prefix = `${p.hugoConfig.siteParams.branch}/`;
    }

    const permalink = `${prefix}images/${p.src.replace('.', `.${hash}.`)}`;
    return permalink;
  }

  static getFileContentsHash(path: string): string {
    const contents = fs.readFileSync(path);
    return md5(contents);
  }

  static relUrl(p: { hugoConfig: HugoConfig; url: string }): string {
    console.log('\n\n\n\n\nhugoFunctions.relUrl');
    console.log('args', JSON.stringify(p, null, 2));

    const baseUrl = new URL(p.hugoConfig.siteConfig.baseURL);
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
          'The URL to convert does not share the same origin as the base URL.'
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

    console.log('resultUrl', resultUrl);

    return resultUrl;
  }
}
