---
title: Update host tags
type: apicontent
order: 31.4
external_redirect: /api/#update-host-tags
---

## Update host tags
This endpoint allows you to update/replace all tags in an integration source with those supplied in the request.

**ARGUMENTS**:

* **`tags`** [*required*]:
    A list of tags
* **`source`** [*optional*, *default*=**users**]:
    The source of the tags (e.g. chef, puppet).
    [Complete list of source attribute values][1]

[1]: /integrations/faq/list-of-api-source-attribute-value
