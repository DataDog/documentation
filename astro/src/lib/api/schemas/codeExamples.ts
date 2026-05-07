export interface CodeExampleEntry {
  /** Human-readable description of this example */
  description: string;
  /** The raw source code */
  code: string;
  /** Syntax highlighting language identifier */
  syntax: string;
  /** Pre-rendered highlighted HTML (populated at build time) */
  highlightedCode?: string;
  /**
   * Optional per-region variants of this entry. When present, the UI renders
   * one wrapper per region with `data-region="<key>"` so the visible variant
   * updates reactively with the site selector. `code` above is the fallback
   * used when no region is active. Currently used for curl.
   */
  regionVariants?: Record<string, { code: string; highlightedCode?: string }>;
}

export interface CodeExampleSet {
  /** Language identifier (e.g. 'python', 'ruby') */
  language: string;
  /** Display label (e.g. 'Python', 'Ruby') */
  label: string;
  /** One or more code examples for this language */
  entries: CodeExampleEntry[];
}
