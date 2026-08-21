---
title: Data Deletion
description: How LLM Observability handles data deletion requests, including automatic deletion of dataset records that match an Event Platform deletion search.
further_reading:
  - link: "/llm_observability/data_security_and_rbac"
    tag: "Documentation"
    text: "Data Security and RBAC"
  - link: "/llm_observability/experiments/datasets"
    tag: "Documentation"
    text: "Datasets"
---

When a data deletion request is submitted for LLM Observability events in the Event Platform — for example to satisfy a GDPR or CCPA right-to-erasure request — Datadog automatically extends the deletion to any **dataset records** that were created from those events. This helps ensure that sensitive data is consistently removed from both the trace store and the Experiments dataset store.

## How it works

1. A deletion request arrives carrying an org ID, a time range, and a tag-based search filter (for example `env:prod service:myapp` or `@trace_id:<id>`).
2. Before the Event Platform deletion runs, LLM Observability translates the search filter into a tag-containment condition and starts a row-scoped deletion workflow targeting the dataset records store.
3. Dataset records whose tags match the translated condition and whose org ID matches are deleted.
4. If the search cannot be translated to an exact tag filter — for example it contains free-text terms, wildcard patterns on tag values, or unsupported query constructs — the dataset record deletion is skipped and the Event Platform deletion still proceeds. The system fails closed to avoid deleting the wrong rows.
5. The deletion workflow is idempotent: if the same deletion request is redelivered, a second workflow is not started.

## Tag filter translation

The following query forms are supported and translated to tag-containment filters:

- **`key:value`** terms (for example `env:prod`) — matched against the tags on the dataset record
- **`@tags:"key:value"`** quoted form, equivalent to the bare `key:value` form
- **AND / OR / NOT** combinations of the above
- **`key:(value1 OR value2)`** value lists

Reserved scalar attributes are matched against their own dedicated columns rather than the tags object:

- `@trace_id:<value>` — equality match on the `trace_id` column
- `@span_id:<value>` — equality match on the `span_id` column
- `@trace_id:<glob>` / `@span_id:<glob>` — pattern match on the column

The following are **not supported** and cause the dataset record deletion to be skipped (the Event Platform deletion still proceeds):

- Free-text terms with no `key:` prefix
- Wildcard or glob patterns on tag values (for example `service:ai-*`)
- Numeric comparisons or range queries
- Queries consisting only of event-scoping attributes such as `@event_type`, which have no dataset record counterpart

## Relationship to org-level deletion

When an organization leaves Datadog, all of its LLM Observability data — including every dataset record row — is removed through a separate org-wide deletion flow. The tag-scoped deletion described on this page is a complementary, targeted mechanism for individual data-subject requests; it deletes only the rows that match the specific search filter of the request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
