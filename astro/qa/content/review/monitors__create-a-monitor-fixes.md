# Fixes: monitors/create-a-monitor

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/monitors/create-a-monitor.md | https://docs.datadoghq.com/api/latest/monitors/create-a-monitor/
- Astro local (fixed): http://localhost:4321/api/latest/monitors/create-a-monitor.md | http://localhost:4321/api/latest/monitors/create-a-monitor/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/create-a-monitor.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/monitors/create-a-monitor/

## F5. Line breaks inside .md table cells break the tables

Covered by aws-integration/list-all-aws-integrations F1. Checked on this page: local has no table row that doesn't end in `|` (staging snapshot: 35 on monitors/create-a-monitor).

## F12. .md drops the link on "scope" in the OAuth sentence

Covered by dashboard-lists/get-all-dashboard-lists F1. Checked on this page: local has `authorization [scope](http://localhost:4321/api/latest/scopes.md#monitors)`.

## F4. `additionalProperties` fields are missing

Covered by aws-integration/list-all-aws-integrations F2. Checked on this page: local shows `<any-key>` under `state.groups` in the 200 model, with `last_nodata_ts`, `name`, `status` and the rest under it.
