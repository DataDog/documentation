---
title: Update Indexes order
type: apicontent
order: 23.5
external_redirect: /api/#update-indexes-order
---

## Update Indexes Order

This endpoint updates the `IndexOrder` of your organisation. It returns the `IndexOrder` object passed in the request body when the request is sucessful.

##### Arguments


* **`index_names`**  [*required*]: Array of `Strings` identifying by their name(s) the index(es) of your organisation. Logs are tested against the query filter of each index one by one, following the order of the array. Logs are eventually stored in the first matching index.
