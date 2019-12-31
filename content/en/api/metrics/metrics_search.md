---
title: Search metrics
type: apicontent
order: 26.6
external_redirect: /api/#search-metrics
---

## Search metrics

This endpoint allows you to search for metrics from the last 24 hours in Datadog.

**ARGUMENTS**:

* `q` [*required*]:
    The query string to search metrics upon.
    Must be prefixed with `metrics:`

**Note**: The prefix `host:` is also supported for the query to seach over host names, but it is deprecated, use the [host search endpoint][1] instead.
[1]: /api/?lang=bash#search-hosts
