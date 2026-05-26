import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

let markedConfigured = false;

function ensureMarkedConfigured() {
    if (markedConfigured) return;
    markedConfigured = true;

    marked.use(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            }
        }),
        { breaks: true, gfm: true }
    );

    marked.use({
        renderer: {
            link({ href, title, text }) {
                return `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`;
            }
        }
    });
}

export function parseMarkdown(text) {
    ensureMarkedConfigured();
    return marked.parse(text);
}

// Converts [N] tokens to numbered badge chips, skipping code blocks.
export function inlineRefChips(html) {
    return html.replace(
        /(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)|(\[(\d{1,3})\])/gi,
        (match, codeBlock, _ref, num) => {
            if (codeBlock) return codeBlock;
            return '<span class="conv-search-source-ref-wrap">'
                + `<button type="button" class="conv-search-source-ref-btn" data-source-number="${num}">`
                + `<span class="conv-search-source-ref-number">${num}</span>`
                + '</button></span>';
        }
    );
}

export function renderMessageWithSources(markdownText, { attachTooltips, buildSourceCards }) {
    const { displayMarkdown, sources } = extractSources(markdownText);
    const html = inlineRefChips(parseMarkdown(displayMarkdown));

    const container = document.createElement('div');
    container.innerHTML = html;

    if (sources.length > 0) {
        const byNumber = new Map();
        sources.forEach((s) => byNumber.set(s.number, s));
        attachTooltips(container, byNumber);
        container.appendChild(buildSourceCards(sources));
    }

    return container.innerHTML;
}

// Pipe-delimited format:   [sources]\n 1 | Title | https://...
// Fallback: legacy ```sources``` JSON block.
export function extractSources(markdownText) {
    const markerIdx = markdownText.indexOf('[sources]');

    if (markerIdx !== -1) {
        const displayMarkdown = markdownText.slice(0, markerIdx).trim();
        const sources = parseSourceLines(markdownText.slice(markerIdx + 9));
        return { displayMarkdown, sources };
    }

    const jsonRe = /```(?:sources|docs-sources|sources-json|json)\s*([\s\S]*?)```/gi;
    let displayMarkdown = markdownText;
    let sources = [];

    for (const match of markdownText.matchAll(jsonRe)) {
        const parsed = parseJsonSources(match[1]);
        if (parsed.length > 0) sources = parsed;
        displayMarkdown = displayMarkdown.replace(match[0], '');
    }

    displayMarkdown = displayMarkdown
        .replace(/```(?:sources|docs-sources|sources-json|json)[\s\S]*$/gi, '')
        .replace(/\[sources?\]?\s*$/i, '');

    sources.forEach((s, i) => { if (!s.number) s.number = i + 1; });
    return { displayMarkdown: displayMarkdown.trim(), sources };
}

function parseSourceLines(text) {
    const sources = [];
    const lineRe = /^(\d+)\s*\|\s*(.+?)\s*\|\s*(\S+)\s*$/;

    for (const raw of text.split('\n')) {
        const m = raw.trim().match(lineRe);
        if (!m) continue;
        const href = normalizeHref(m[3]);
        if (!href) continue;
        sources.push({ number: parseInt(m[1], 10), href, label: m[2].trim() });
    }
    return sources;
}

function parseJsonSources(jsonText) {
    try {
        const relaxed = jsonText.trim()
            .replace(/^\s*\{\s*sources\s*:/i, '{"sources":')
            .replace(/([{,]\s*)([a-zA-Z_]\w*)\s*:/g, '$1"$2":')
            .replace(/'/g, '"')
            .replace(/,\s*([}\]])/g, '$1');

        const parsed = JSON.parse(relaxed);
        const list = Array.isArray(parsed) ? parsed : parsed?.sources;
        if (!Array.isArray(list)) return [];

        const out = [];
        const seen = new Set();
        list.forEach((item, i) => {
            const href = normalizeHref(item?.url || item?.href || '');
            if (!href || seen.has(href)) return;
            seen.add(href);
            out.push({
                number: typeof item?.number === 'number' ? item.number : i + 1,
                href,
                label: (item?.title || item?.label || href).toString().trim()
            });
        });
        return out;
    } catch {
        return [];
    }
}

export function normalizeHref(rawHref) {
    const href = (rawHref || '').toString().trim();
    if (!href) return '';

    try {
        const url = new URL(href, window.location.origin);
        if (!['http:', 'https:'].includes(url.protocol)) return '';
        return url.href;
    } catch {
        return '';
    }
}
