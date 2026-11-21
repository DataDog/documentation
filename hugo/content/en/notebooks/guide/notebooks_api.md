---
title: Work with notebooks through the API
description: Create, read, and edit notebooks as Markdown documents, or update individual sections, tasks, and widgets.
---

{{< callout url="/help/" header="false" btn_hidden="true" >}}
The Notebooks v2 API is in Preview and is subject to change. Contact [Datadog support](/help/) with feedback.
{{< /callout >}}

Use the Notebooks v2 API to create and maintain notebooks from scripts, integrations, and agents. Read and write a complete notebook as Markdown, make exact text edits, or address a section, task, or widget by its ID.

The v1 and v2 APIs operate on the same notebooks. Existing v1 clients can continue using the [v1 API][1]. For endpoint schemas, permissions, and response codes, see the [Notebooks API reference][1]. For content syntax, see [Notebooks Flavored Markdown][2].

## Choose a representation

Use the same resource URL with different HTTP headers:

| Header | Purpose |
| --- | --- |
| `Accept: text/markdown` | Read a document with a leading title H1 and YAML frontmatter for other metadata. |
| `Accept: application/vnd.api+json` | Read a JSON:API resource with attributes, relationships, and IDs. |
| `Content-Type: text/markdown` | Write a Markdown document or content fragment. |
| `Content-Type: application/json` | Write a JSON resource or a content-operation request. |

Request and response formats are independent. For example, submit JSON and request a Markdown response. Resource requests also accept `application/vnd.api+json`; JSON content operations specifically require `application/json`. JSON responses and all errors use `application/vnd.api+json`, including errors for Markdown requests.

Without `Accept`, responses default to JSON:API. An unsupported response format returns `406`; an unsupported or missing request `Content-Type` returns `415`.

## Create and read a notebook

The examples use API and application keys. Set `DD_API_KEY` and `DD_APP_KEY` in the environment. The application key needs `notebooks_read` for reads and `notebooks_write` for writes, along with access to the notebook. For other authentication options, see [Authentication][3].

Create `notebook.md`:

```markdown
---
tags:
  - "service:checkout"
time:
  live_span: 1h
---

# Checkout latency investigation

## Findings

Latency increased after the deploy.

## Next steps

- [ ] Check database connection wait time
```

Send the document to the API:

```shell
curl --request POST 'https://api.{{< region-param key="dd_site" >}}/api/v2/notebooks' \
  --header "DD-API-KEY: ${DD_API_KEY}" \
  --header "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  --header 'Content-Type: text/markdown' \
  --header 'Accept: application/vnd.api+json' \
  --data-binary @notebook.md
```

A successful create returns `201`, the full notebook, and a `Location` header. Save `data.id` from the JSON response. Replace `<NOTEBOOK_ID>` in subsequent examples with that ID.

Read the notebook as Markdown:

```shell
curl 'https://api.{{< region-param key="dd_site" >}}/api/v2/notebooks/<NOTEBOOK_ID>' \
  --header "DD-API-KEY: ${DD_API_KEY}" \
  --header "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  --header 'Accept: text/markdown'
```

### Titles and metadata

A full-document Markdown response begins with optional frontmatter, followed by an H1 containing the notebook title. JSON `attributes.markdown` includes the same H1; `attributes.title` represents the same stored title. The title H1 is not a section in the notebook body.

Full-document writes consume the leading H1 as the title. Subsequent headings stay in the body, even if they repeat the title. Append fragments and section replacements retain all of their headings as body content.

Creation requires a title from the H1, an explicit JSON `title`, or a non-blank frontmatter `title` when there is no non-blank leading H1. Blank H1s and blank frontmatter titles count as absent. Updates without a supplied title preserve the existing title. An explicit JSON `title: ""` intentionally clears it.

If a JSON request supplies both `title` and a document title, they must agree on creation. On update, if exactly one matches the stored title, the other value wins. If both change to different values, the request returns `422`. This comparison does not provide stale-write protection.

Use `PATCH /api/v2/notebooks/<NOTEBOOK_ID>` with JSON to update metadata without replacing content:

```json
{
  "data": {
    "type": "notebooks",
    "id": "<NOTEBOOK_ID>",
    "attributes": {
      "tags": ["service:checkout", "team:payments"]
    }
  }
}
```

Omitted attributes stay unchanged. A full-document Markdown PATCH replaces the body and applies supplied frontmatter metadata. Read-only frontmatter is ignored; unknown writable fields are rejected. In JSON resource writes, supply metadata as attributes. Body-only clients should use the content operations below.

## Choose a content operation

Send document changes to `POST /api/v2/notebooks/<NOTEBOOK_ID>/content`:

| Operation | Use it to | JSON `data` |
| --- | --- | --- |
| `append` | Add content at the end of the notebook or a section, after its descendants. | `{"markdown":"More notes."}` |
| `replace` | Replace the full document or a section subtree. | `{"markdown":"## Findings\n\nUpdated notes."}` |
| `edit` | Replace exact existing text, optionally within a section. | `{"old_text":"before","new_text":"after"}` |
| `remove` | Clear the body or remove a section subtree. | Omit `data`. |

A JSON request contains an `operations` array. Supply one append, replace, or remove operation, or an ordered batch of 1 to 100 edits. Mixed batches and multiple non-edit operations are rejected. Each operation can have its own section scope.

Every successful content request returns `200` and the full resulting notebook, including section-scoped requests, deletions, and no-ops. Use that response as the result of the write. Task and widget updates return the updated task or widget instead.

Whole-document replacement and edits include the title H1, so changing it can rename the notebook. Append and section-scoped operations preserve the title. Content operations leave other notebook metadata unchanged.

### Append content

```shell
curl --request POST 'https://api.{{< region-param key="dd_site" >}}/api/v2/notebooks/<NOTEBOOK_ID>/content' \
  --header "DD-API-KEY: ${DD_API_KEY}" \
  --header "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  --header 'Content-Type: application/json' \
  --header 'Accept: text/markdown' \
  --data '{"operations":[{"op":"append","data":{"markdown":"## Update\n\nThe rollback reduced latency."}}]}'
```

A single operation can also use Markdown. Set an explicit `op` query parameter and send the fragment as the body:

```shell
curl --request POST 'https://api.{{< region-param key="dd_site" >}}/api/v2/notebooks/<NOTEBOOK_ID>/content?op=append' \
  --header "DD-API-KEY: ${DD_API_KEY}" \
  --header "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  --header 'Content-Type: text/markdown' \
  --header 'Accept: text/markdown' \
  --data-binary @update.md
```

For JSON requests, put operation fields in the body. For Markdown requests, put them in the query. Combining JSON operations with operation-related query parameters returns `400`, even when the values agree. URL-encode query values and supply each parameter once.

### Make exact text edits

Use an edit when changing part of an existing paragraph:

```json
{
  "operations": [
    {
      "op": "edit",
      "data": {
        "old_text": "Latency increased after the deploy.",
        "new_text": "Latency returned to normal after the rollback.",
        "expected_match_count": 1
      }
    }
  ]
}
```

Matching is literal, case-sensitive, and non-overlapping. It does not normalize whitespace or Unicode or interpret regular expressions. `old_text` must be nonempty. An empty `new_text` deletes the matches. `expected_match_count` defaults to `1` and must be a positive integer; every match is replaced only when the count equals the expected value.

For a batch, later edits see the results of earlier edits. The batch is atomic: if any edit or final validation fails, none of the changes are saved. Document-size and processing limits can reject a batch with `413` even when it has fewer than 100 edits. Parallel requests do not provide the ordering or atomicity of one batch.

An optional request-wide `reasoning: {"explanation":"Correct the confirmed recovery time."}` records why the content changed without adding that explanation to the document. The explanation accepts Markdown and has a 1,000-character limit. Supply it alongside `operations`; Markdown requests do not carry reasoning.

### Work within a section

Read `GET /api/v2/notebooks/<NOTEBOOK_ID>/sections` as JSON to discover section IDs. Fetch `/sections/<SECTION_ID>` to read one section. IDs identify document nodes and remain stable when heading text changes.

To replace a section, use its returned ID:

```json
{
  "operations": [
    {
      "op": "replace",
      "scope": {"type": "notebook_sections", "id": "<SECTION_ID>"},
      "data": {"markdown": "## Findings\n\nThe rollback restored normal latency."}
    }
  ]
}
```

A nonempty section replacement must start with a heading. Its first heading keeps the selected section's ID. An empty or whitespace-only replacement removes the section. Changing heading levels can restructure the surrounding hierarchy, which is why the response contains the full notebook.

Use the same `scope` on an edit to restrict matching and match counts to that section. An unavailable scope returns an error; the server does not widen the request to the whole document. For Markdown requests, supply both `scope[type]=notebook_sections` and `scope[id]=<SECTION_ID>` as URL-encoded query parameters.

Omitting scope targets the full document. An explicit `notebooks` scope is equivalent when its ID matches the notebook URL.

## Read and update tasks and widgets

Use structured resources for task state and widget definitions:

| Resource | Read | Update |
| --- | --- | --- |
| Sections | `GET /sections` or `/sections/<SECTION_ID>` | Use a scoped content operation. |
| Tasks | `GET /tasks` or `/tasks/<TASK_ID>` | `PATCH /tasks/<TASK_ID>` with `text`, `checked`, or both. |
| Widgets | `GET /widgets` or `/widgets/<WIDGET_ID>` | `PATCH /widgets/<WIDGET_ID>` with `definition`, `graph_size`, `time`, or `split_by`. |

Paths are relative to `/api/v2/notebooks/<NOTEBOOK_ID>`. Resource PATCH requests use a JSON:API `data` object with the matching ID, resource type (`notebook_tasks` or `notebook_widgets`), and `attributes`.

Widget definitions use the [dashboard widget schemas][4]. A supplied `definition` replaces the entire definition; preserve fields that should remain. Widget titles belong in `definition.title`. Use the structured widget endpoint to change a graph instead of editing its serialized Markdown fence.

Add `?include=sections,tasks,widgets` to a JSON notebook GET to retrieve related resources in one response. Section Markdown is opt-in through `fields[notebook_sections]`; see the API reference for field selection. Markdown responses ignore `include`. Section-list and task-list Markdown are reports, rather than round-trip mutation formats. Standalone widget resources use JSON.

## Handle conflicts and uncertain writes

Guarded edits check exact content against the latest persisted document. A match-count mismatch, missing section, or conflicting persistence change can return `409`. Read the latest state, inspect the error's `code` and `source`, and adjust the intended edit before retrying. Use a larger exact string or a section scope to resolve ambiguous matches.

There is no request idempotency guarantee. A lost response can follow a successful write. Read and reconcile the notebook before repeating a mutation: blind retries can create duplicate notebooks, duplicate appended text, or apply an edit twice. Exact-match guards alone do not make every edit safe to repeat.

Writes validate widgets strictly by default. When supported for the caller, `Prefer: handling=lenient` allows recoverable invalid widgets to remain as placeholders. `Preference-Applied: handling=lenient` confirms that the preference was honored. Inspect JSON `meta.warnings` or Markdown frontmatter `warnings`, repair the preserved widget definition, and read again to confirm the warnings clear. Warnings can also describe invalid widgets saved earlier.

[1]: /api/latest/notebooks/
[2]: /notebooks/notebooks_flavored_markdown/
[3]: /api/latest/authentication/
[4]: /dashboards/widgets/
