import { HugoConfig } from '../schemas/hugoConfig';

/**
 * The Markdoc-Hugo integration's tag templates (shortcode templates)
 * don't have access to the same functions available
 * in Hugo's shortcode templates. This module provides any functions required
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

  static relUrl(p: { hugoConfig: HugoConfig; url: string }): string {
    const baseUrl = new URL(p.hugoConfig.baseURL);
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

    return resultUrl;
  }
}
