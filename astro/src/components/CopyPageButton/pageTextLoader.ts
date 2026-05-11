let cachedUrl: string | null = null;
let cachedText: string | null = null;
let loadingPromise: Promise<string> | null = null;

/**
 * Build the URL of the plaintext (.md) page
 * from the URL of the current HTML page.
 *
 * Uses the current window's origin so previews, branch builds, and the live
 * site each fetch the .md sibling of the page the user is actually looking
 * at, instead of always pointing at production.
 */
export function getMdUrl(): string {
    const commitRef = document.documentElement.dataset.commitRef || '';
    const commitRefLen = commitRef.length ? commitRef.length + 1 : 0;

    let pathname = window.location.pathname;
    if (commitRefLen > 0) {
        pathname = pathname.slice(commitRefLen);
    }

    let url = window.location.origin + pathname;
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    return url + '.md';
}

/**
 * Fetch the .md version of the page, falling back to
 * extracting text from the DOM if the fetch fails.
 */
export async function loadPageText(): Promise<string> {
    const mdUrl = getMdUrl();

    if (cachedUrl === mdUrl && cachedText) {
        return cachedText;
    }

    if (loadingPromise) {
        return loadingPromise;
    }

    loadingPromise = (async () => {
        try {
            const response = await fetch(mdUrl, { credentials: 'omit' });
            if (!response.ok) {
                throw new Error(`Failed to fetch Markdown: ${response.status}`);
            }
            const text = await response.text();
            cachedUrl = mdUrl;
            cachedText = text;
            return text;
        } catch {
            const root = document.querySelector('.prose');
            const text = root ? extractPageText(root) : '';
            cachedUrl = mdUrl;
            cachedText = text;
            return text;
        } finally {
            loadingPromise = null;
        }
    })();

    return loadingPromise;
}

/**
 * Extract content from the DOM as markdown-ish text.
 * Used as a fallback when the .md fetch fails.
 */
export function extractPageText(root: Element): string {
    const lines: string[] = [];
    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
            acceptNode(node: Node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const style = window.getComputedStyle(node as Element);
                    if (style.display === 'none' || style.visibility === 'hidden') {
                        return NodeFilter.FILTER_REJECT;
                    }
                }
                return NodeFilter.FILTER_ACCEPT;
            },
        },
    );

    let currentNode: Node | null;
    let lastAddedNewline = false;
    let skipUntilAfter: Node | null = null;

    while ((currentNode = walker.nextNode())) {
        if (skipUntilAfter) {
            if (skipUntilAfter.contains(currentNode)) {
                continue;
            }
            skipUntilAfter = null;
        }

        if (currentNode.nodeType === Node.TEXT_NODE) {
            const text = (currentNode.textContent ?? '').trim();
            if (text) {
                lines.push(text);
                lastAddedNewline = false;
            }
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const el = currentNode as HTMLElement;
            const tagName = el.tagName.toLowerCase();

            if (/^h[1-6]$/.test(tagName)) {
                if (!lastAddedNewline && lines.length > 0) {
                    lines.push('\n');
                }
                const level = parseInt(tagName[1]);
                const headingText = (el.textContent ?? '').trim();
                lines.push('\n' + '#'.repeat(level) + ' ' + headingText + '\n\n');
                lastAddedNewline = true;
                skipUntilAfter = currentNode;
                continue;
            }

            if (tagName === 'a' && (el as HTMLAnchorElement).href) {
                const linkText = (el.textContent ?? '').trim();
                if (linkText) {
                    lines.push(`[${linkText}](${(el as HTMLAnchorElement).href})`);
                    lastAddedNewline = false;
                }
                skipUntilAfter = currentNode;
                continue;
            }

            if (['p', 'div', 'li', 'br', 'hr'].includes(tagName)) {
                if (!lastAddedNewline && lines.length > 0) {
                    lines.push('\n');
                    lastAddedNewline = true;
                }
            }
        }
    }

    return lines
        .join(' ')
        .replace(/ +\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * Reset the module-level cache. Exposed for testing only.
 */
export function _resetCache(): void {
    cachedUrl = null;
    cachedText = null;
    loadingPromise = null;
}
