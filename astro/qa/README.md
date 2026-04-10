## API Docs QA Tool

Compares built Hugo and Astro API pages by extracting visible text and reporting discrepancies. Requires both `public/api/latest/` (Hugo) and `astro/dist/api/latest/` (Astro) to be pre-built.

```bash
# From astro/
npm run qa:compare                    # Full comparison
npm run qa:compare -- --json          # Also write qa/report.json
npm run qa:compare -- --page logs     # Compare a single page
npm run qa:compare -- --no-code       # Exclude code blocks
```

Delete the entire `qa/` directory when no longer needed.
