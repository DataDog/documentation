---
title: Add tags to a host
type: apicontent
order: 30.3
external_redirect: /api/#add-tags-to-a-host
---

## Add tags to a host
This endpoint allows you to add new tags to a host, optionally specifying where these tags come from.

**ARGUMENTS**:

* **`tags`** [*required*]:
    A list of tags to apply to the host
* **`source`** [*optional*, *default*=**users**]:
    The source of the tags (e.g. chef, puppet).
    [Complete list of source attribute values][1]

[1]: /integrations/faq/list-of-api-source-attribute-value
