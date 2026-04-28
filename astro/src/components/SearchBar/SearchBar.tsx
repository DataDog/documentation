import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import styles from './SearchBar.module.css';
import { classListFactory } from '../../utils/classListFactory';
import { multiSearch, type MultiSearchResponse, type TypesenseHit } from '../../utils/typesense';
import { getTypesenseConfig, type TypesenseEnv } from '../../config/typesense';
// Same magnifying-glass shape Hugo's side-nav search uses (Hugo loads it as an
// icomoon font glyph; here we inline it as SVG so the icon scales freely and
// inherits the input-bar text color via `currentColor`).
import searchIconSvg from '../../mocked_dependencies/hugo_site/static/images/svg-icons/searchbar_search.svg?raw';

interface Props {
  /**
   * Override Typesense config in tests. Production usage reads from the
   * baked-in config via `getTypesenseConfig()`.
   */
  env?: TypesenseEnv;
  /**
   * Override the search function. Tests pass a stub that resolves a fixture
   * synchronously instead of hitting the network.
   */
  search?: (query: string, env: TypesenseEnv, signal?: AbortSignal) => Promise<MultiSearchResponse>;
}

interface NormalizedHit {
  title: string;
  category: string;
  subcategory: string;
  sectionHeader: string;
  snippetHtml: string;
  url: string;
  isApi: boolean;
}

const HUGO_ORIGIN = 'https://docs.datadoghq.com';
const DEBOUNCE_MS = 200;
const STOP_WORDS = new Set(['the', 'and', 'for']);

const cl = classListFactory(styles);

// Category order on API pages, mirroring `instantsearch.js:300-313` after the
// API-pinned-first transform.
const CATEGORY_ORDER: Array<{ label: string; key: string }> = [
  { label: 'API', key: 'api' },
  { label: 'Getting Started', key: 'getting started' },
  { label: 'Documentation', key: 'documentation' },
  { label: 'Guides', key: 'guide' },
  { label: 'Integrations', key: 'integrations' },
];

/**
 * Replicates Hugo's `getHitData` + `getSnippetForDisplay` logic against
 * Typesense's native response shape (we removed instantsearch.js + the adapter,
 * so highlights arrive as `[{ field, snippet|value }]` rather than as
 * `_highlightResult`).
 */
function normalizeHit(hit: TypesenseHit, query: string, indexLabel: 'docs' | 'partners'): NormalizedHit {
  const doc = hit.document;
  const highlights = new Map<string, string>();
  for (const h of hit.highlights ?? []) {
    highlights.set(h.field, h.snippet ?? h.value ?? '');
  }

  const title = doc.title ?? '';
  const subcategory = doc.subcategory ?? title;
  const rawCategory = indexLabel === 'partners' ? 'Partners' : doc.category ?? 'Documentation';

  const highlightedTitle = highlights.get('title') ?? title;
  const highlightedSection = highlights.get('section_header') ?? doc.section_header ?? '';
  const highlightedContent = highlights.get('content') ?? '';

  const regex = buildHighlightRegex(query);
  const titleHtml = injectMissingMarks(highlightedTitle, regex);
  const sectionHtml = injectMissingMarks(highlightedSection, regex);
  const contentHtml = injectMissingMarks(highlightedContent, regex);

  const snippetHtml = makeSnippet(contentHtml, doc.section_header ?? '');
  const isApi = rawCategory.toLowerCase() === 'api';

  return {
    title: titleHtml,
    category: rawCategory,
    subcategory,
    sectionHeader: sectionHtml,
    snippetHtml,
    url: buildUrl(doc.relpermalink ?? '', isApi),
    isApi,
  };
}

function buildHighlightRegex(query: string): RegExp | null {
  const words = query
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()))
    .map(escapeRegex);
  if (words.length === 0) return null;
  return new RegExp(`(${words.join('|')})`, 'gi');
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function injectMissingMarks(text: string, regex: RegExp | null): string {
  if (!text) return '';
  if (text.includes('<mark>')) return text;
  if (!regex) return text;
  return text.replace(regex, '<mark>$1</mark>');
}

function makeSnippet(highlightedContent: string, sectionHeader: string): string {
  const limit = 180;
  if (!highlightedContent) return '';
  // Prefer a window around the first <mark> when present (matches Hugo's
  // `truncateContentAtHighlight`); otherwise truncate from the start.
  const markIdx = highlightedContent.indexOf('<mark>');
  if (markIdx === -1) {
    return truncate(highlightedContent, limit);
  }
  if (!sectionHeader) {
    const start = truncate(highlightedContent, limit);
    if (start.includes('<mark>')) return start;
  }
  return truncateAtHighlight(highlightedContent, limit, markIdx);
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/, '')}…`;
}

function truncateAtHighlight(text: string, limit: number, markIdx: number): string {
  const half = Math.floor(limit / 2);
  const start = Math.max(0, markIdx - half);
  const end = Math.min(text.length, start + limit);
  const window = text.slice(start, end);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  // Don't slice through a <mark> tag — extend right edge to a tag boundary.
  const safe = window.replace(/<mark>[^<]*$/, (m) => m + '</mark>');
  return `${prefix}${safe}${suffix}`;
}

function buildUrl(relpermalink: string, isApi: boolean): string {
  if (!relpermalink) return '';
  if (isApi) return relpermalink;
  return `${HUGO_ORIGIN}${relpermalink}`;
}

function groupHits(response: MultiSearchResponse, query: string): Map<string, NormalizedHit[]> {
  const buckets = new Map<string, NormalizedHit[]>();
  for (const cat of CATEGORY_ORDER) buckets.set(cat.key, []);
  buckets.set('partners', []);

  for (const hit of response.docs.hits) {
    const normalized = normalizeHit(hit, query, 'docs');
    const key = normalized.category.toLowerCase();
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(normalized);
  }
  for (const hit of response.partners.hits) {
    const normalized = normalizeHit(hit, query, 'partners');
    buckets.get('partners')!.push(normalized);
  }
  return buckets;
}

export default function SearchBar({ env, search }: Props) {
  const config = useMemo(() => env ?? getTypesenseConfig(), [env]);
  const searchFn = search ?? multiSearch;

  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<MultiSearchResponse | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [popupRect, setPopupRect] = useState<{ top: number; left: number; width: number } | null>(null);

  const trimmedQuery = query.trim();

  // Debounced fetch. Aborts in-flight requests when the query changes.
  useEffect(() => {
    if (!trimmedQuery) {
      setHits(null);
      setSelectedIndex(-1);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      searchFn(trimmedQuery, config, controller.signal)
        .then((response) => {
          if (!controller.signal.aborted) {
            setHits(response);
            setSelectedIndex(-1);
          }
        })
        .catch((err) => {
          if (err?.name !== 'AbortError') {
            setHits({ docs: { found: 0, hits: [] }, partners: { found: 0, hits: [] } });
          }
        });
    }, DEBOUNCE_MS);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [trimmedQuery, config, searchFn]);

  // Global keyboard shortcuts: `/` and Cmd/Ctrl+K focus the input; Esc clears.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase() ?? '';
      const inEditable = tag === 'input' || tag === 'textarea' || target?.isContentEditable;

      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) && !inEditable) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        if (document.activeElement === inputRef.current || wrapperRef.current?.contains(document.activeElement)) {
          setQuery('');
          setOpen(false);
          inputRef.current?.blur();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close popup on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // The popup is `position: fixed` so it escapes the side nav's `overflow: auto`
  // clip and sits above all other content. Recompute its coordinates from the
  // form's bounding rect whenever the popup opens or the layout shifts.
  useEffect(() => {
    if (!open) return;
    const recompute = () => {
      const form = formRef.current;
      if (!form) return;
      const rect = form.getBoundingClientRect();
      setPopupRect({ top: rect.bottom, left: rect.left, width: rect.width });
    };
    recompute();
    window.addEventListener('resize', recompute);
    window.addEventListener('scroll', recompute, true);
    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('scroll', recompute, true);
    };
  }, [open]);

  const grouped = hits ? groupHits(hits, trimmedQuery) : null;
  const flatHits: NormalizedHit[] = [];
  if (grouped) {
    for (const cat of CATEGORY_ORDER) {
      const list = grouped.get(cat.key) ?? [];
      flatHits.push(...list);
    }
    flatHits.push(...(grouped.get('partners') ?? []));
  }
  const totalHits = flatHits.length;
  // Selection grid: index -1 means nothing selected; 0 is the Ask AI suggestion;
  // 1..totalHits are search results.
  const aiSelected = selectedIndex === 0;
  const hitSelected = selectedIndex > 0 ? selectedIndex - 1 : -1;
  const popupVisible = open && trimmedQuery.length > 0;

  const navigateToSearchPage = () => {
    if (!trimmedQuery) return;
    // Hugo hosts the canonical search results page at /search. Send the user
    // there with the same `?s=` param Hugo uses; cross-origin since Astro is
    // API-only for now.
    window.location.href = `${HUGO_ORIGIN}/search/?s=${encodeURIComponent(trimmedQuery)}`;
  };

  const onInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const max = totalHits; // 0 (Ask AI) ... totalHits (last hit)
      setSelectedIndex((i) => (i < max ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => {
        if (i <= 0) {
          inputRef.current?.focus();
          return -1;
        }
        return i - 1;
      });
    } else if (e.key === 'Enter') {
      if (hitSelected >= 0 && flatHits[hitSelected]) {
        e.preventDefault();
        window.location.href = flatHits[hitSelected].url;
      } else {
        e.preventDefault();
        navigateToSearchPage();
      }
      // Enter on the Ask AI placeholder is a no-op for now (Placeholder).
    }
  };

  return (
    <div ref={wrapperRef} class={cl('search-bar')}>
      <form
        ref={formRef}
        class={cl('search-bar__form')}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (hitSelected >= 0 && flatHits[hitSelected]) {
            window.location.href = flatHits[hitSelected].url;
          } else {
            navigateToSearchPage();
          }
        }}
      >
        <button
          type="submit"
          class={cl('search-bar__submit')}
          aria-label="Search"
          dangerouslySetInnerHTML={{ __html: searchIconSvg }}
        />
        <input
          ref={inputRef}
          type="search"
          class={cl('search-bar__input')}
          placeholder="Search documentation..."
          aria-label="Search documentation"
          value={query}
          onInput={(e) => {
            setQuery((e.target as HTMLInputElement).value);
            setOpen(true);
          }}
          onFocus={() => {
            if (trimmedQuery) setOpen(true);
          }}
          onKeyDown={onInputKeyDown}
        />
        {/* Visual hint that the user can press `/` to focus the input. Hidden
            on focus and on narrow viewports — matches Hugo's behavior. */}
        <span class={cl('search-bar__shortcut')} aria-hidden="true">/</span>
      </form>

      {popupVisible && (
        <div
          class={cl('search-bar__popup')}
          role="listbox"
          style={popupRect ? { top: `${popupRect.top}px`, left: `${popupRect.left}px`, width: `${Math.max(popupRect.width, 480)}px` } : undefined}
        >
          <div
            class={[cl('search-bar__ai-suggestion', 'placeholder'), aiSelected ? cl('search-bar__ai-suggestion--selected') : ''].filter(Boolean).join(' ')}
            data-placeholder-name={'"Ask AI" Button Goes Here'}
          >
            <span>{'"Ask AI" Button Goes Here'}</span>
          </div>

          {totalHits === 0 ? (
            <div class={cl('search-bar__no-hits')}>No results.</div>
          ) : (
            CATEGORY_ORDER.concat([{ label: 'Partners', key: 'partners' }])
              .map((cat) => {
                const list = grouped?.get(cat.key) ?? [];
                if (list.length === 0) return null;
                return (
                  <div class={cl('search-bar__category')} key={cat.key}>
                    <p class={cl('search-bar__category-label')}>{cat.label}</p>
                    <ol class={cl('search-bar__list')}>
                      {list.map((hit) => {
                        const indexInFlat = flatHits.indexOf(hit);
                        const isSelected = hitSelected === indexInFlat;
                        return (
                          <li
                            class={[cl('search-bar__hit'), isSelected ? cl('search-bar__hit--selected') : ''].filter(Boolean).join(' ')}
                            key={`${hit.url}-${indexInFlat}`}
                          >
                            <a
                              class={cl('search-bar__hit-link')}
                              href={hit.url}
                              target={hit.isApi ? undefined : '_blank'}
                              rel={hit.isApi ? undefined : 'noopener noreferrer'}
                            >
                              <p class={cl('search-bar__hit-subcategory')}>{hit.subcategory}</p>
                              <div class={cl('search-bar__hit-body')}>
                                <p class={cl('search-bar__hit-title')}>
                                  <strong dangerouslySetInnerHTML={{ __html: hit.title }} />
                                  {hit.sectionHeader && (
                                    <span class={cl('search-bar__hit-section')}>
                                      {' » '}
                                      <strong dangerouslySetInnerHTML={{ __html: hit.sectionHeader }} />
                                    </span>
                                  )}
                                </p>
                                {hit.snippetHtml && (
                                  <p class={cl('search-bar__hit-snippet')} dangerouslySetInnerHTML={{ __html: hit.snippetHtml }} />
                                )}
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })
          )}
        </div>
      )}
    </div>
  );
}
