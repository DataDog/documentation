---
title: Create child-organization
type: apicontent
order: 28.1
external_redirect: /api/#create-child-organization
---

## Create child-organization

This endpoint requires the [multi-org account][1] feature and must be enabled by [contacting support][2].

**ARGUMENTS**:

* **`name`** [*required*]:
    The name of the new child-organization, limited to 32 characters.
* **`subscription`** [*required*]:
    A JSON array of subscription type. Types available are `trial`, `free`, and `pro`.
* **`billing`** [*required*]:
    A JSON array of billing type. Note that only `parent_billing` is supported.

Once a new child-organization is created, you can interact with it by using the `org.public_id`, `api_key.key`, and `application_key.hash` provided in the response.

[1]: /account_management/multi_organization
[2]: /help
