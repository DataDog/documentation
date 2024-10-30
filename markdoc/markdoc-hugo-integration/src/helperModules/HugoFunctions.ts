class HugoFunctions {
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

  static relUrl(base: string, urlToConvert: string): string {
    const baseUrl = new URL(base);
    let resultUrl: string;

    if (urlToConvert.startsWith('/')) {
      // If the input URL starts with a slash, make it relative to the protocol+host of the base URL
      resultUrl = urlToConvert;
    } else if (this.isAbsUrl(urlToConvert)) {
      const fullUrl = new URL(urlToConvert);
      if (fullUrl.origin === baseUrl.origin) {
        resultUrl = fullUrl.pathname + fullUrl.search + fullUrl.hash;
      } else {
        throw new Error(
          'The URL to convert does not share the same origin as the base URL.'
        );
      }
    } else {
      resultUrl = new URL(urlToConvert, baseUrl).pathname;
    }

    // Ensure the result URL starts with a slash
    if (!resultUrl.startsWith('/')) {
      resultUrl = '/' + resultUrl;
    }

    return resultUrl;
  }
}
