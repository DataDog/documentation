# Fixes: incidents/create-an-incident

Links:

- Hugo prod: https://docs.datadoghq.com/api/latest/incidents/create-an-incident.md | https://docs.datadoghq.com/api/latest/incidents/create-an-incident/
- Astro local (fixed): http://localhost:4321/api/latest/incidents/create-an-incident.md | http://localhost:4321/api/latest/incidents/create-an-incident/
- Astro staging (before): https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/create-an-incident.md | https://docs-staging.datadoghq.com/jen.gilbert/astro-base/api/latest/incidents/create-an-incident/

## F4. Line breaks inside .md table cells break the tables

Covered by aws-integration/list-all-aws-integrations F1. Checked on this page: local has no table row that doesn't end in `|` (staging snapshot: 35 on monitors/create-a-monitor).

## F10. .md drops the link on "scope" in the OAuth sentence

Covered by dashboard-lists/get-all-dashboard-lists F1. Checked on this page: local has `authorization [scope](http://localhost:4321/api/latest/scopes.md#incidents)`.

## F3. `additionalProperties` fields are missing, including oneOf ones

Covered by aws-integration/list-all-aws-integrations F2. Checked on this page: local shows `| additionalProperties | <any-key> | <oneOf> | Dynamic fields for which selections can be made, with field names as keys. |` under `fields`, then Object 1 and Object 2 with `type` and `value`, in both the request and the 201 response.
