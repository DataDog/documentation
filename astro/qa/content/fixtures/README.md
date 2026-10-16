# Content QA fixtures

Frozen, hand-trimmed copies of two pages, used by the `normalize` and `extractUnits` tests. Captured 2026-10-16.

- `*.hugo.md`: from prod (`https://docs.datadoghq.com/<path>.md`).
- `*.astro.md`: from `dist/client/<path>.md`.

`authentication.*` are the full category pages. `validate-api-key.*` keep everything through the Code Example section, but only the Curl and Python examples (Hugo's curl block is mangled in its `.md`; it's kept on purpose).
