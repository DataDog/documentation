// Treats /foo and /foo/ as the same page.
const normalizePath = (path) => path.replace(/\/+$/, '') || '/';

/**
 * Determines if a history entry points to a different page than the one showing.
 * Hash-only and query-only changes stay on the same page, so they shouldn't reload content.
 * @param {string} loadedPath pathname of the content in #mainContent
 * @param {string} url full URL of the history entry
 * @returns boolean
 */
export const isDifferentPage = (loadedPath, url) =>
    normalizePath(new URL(url).pathname) !== normalizePath(loadedPath);
