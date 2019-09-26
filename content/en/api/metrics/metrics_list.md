---
title: Get list of active metrics
type: apicontent
order: 25.1
external_redirect: /api/#get-list-of-active-metrics
---

## Get list of active metrics

<mark>This endpoint is not supported in Datadog's Ruby client library. To request this functionality, contact [Datadog Support][1].</mark>

Get the list of actively reporting metrics from a given time until now. This endpoint is not available in the Python and Ruby libraries.

**ARGUMENTS**:

* **`from`** [*required*]:
    Seconds since the Unix epoch
* **`host`** [*optional*]:
    Hostname for filtering the list of metrics returned. If set, metrics retrieved are those with the corresponding hostname tag.

[1]: /help
