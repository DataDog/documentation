---
title: Update Indexes Order
type: apicontent
order: 24.5
external_redirect: /api/#update-indexes-order
---

## Update Indexes Order

<div class="alert alert-warning">
This endpoint is in public beta. If you have any feedback, <a href="/help">contact Datadog support</a>.
</div>

This endpoint updates the `IndexOrder` of your organization. It returns the `IndexOrder` object passed in the request body when the request is successful.

**ARGUMENTS**:

* **`index_names`**  [*required*]: Array of `Strings` identifying by their name(s) the index(es) of your organisation. Logs are tested against the query filter of each index one by one, following the order of the array. Logs are eventually stored in the first matching index.
