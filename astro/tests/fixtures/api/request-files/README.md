# Request file fixtures

Frozen copies of Hugo's request example files (`hugo/content/en/api/<version>/<tag>/request.<operationId><suffix>.json`), taken on 2026-10-23. JSON can't carry a provenance banner, so this note stands in for one.

`vitest.unit.config.ts` points the `@hugo-site/content/en/api` alias here, so `requestFileLoader.ts` reads these in unit tests instead of the live Hugo files.

The CreateMonitor files are chosen to pin Hugo's selection rule. They cover `CodeExamples` entries 1, 3 and 8, not entry 2. Hugo takes the first 3 entries and skips any without a file, so only entries 1 and 3 should show.

The UpdateRole file pins the fallback: UpdateRole has no `CodeExamples` entry, so Hugo shows `request.UpdateRole.json`, the file without a suffix.
