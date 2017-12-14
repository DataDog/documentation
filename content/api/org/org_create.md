---
title: Organizations
type: apicontent
order: 17.1
---

## Create Child-Organization

This endpoint requires the [multi-org account](/account_management/multi_organization) feature and must be enabled by [contacting support](/help).

##### ARGUMENTS

* `name` [*required*]:
    The name of the new child-organization, limited to 32 characters.
* `subscription` [*required*]:
    A JSON array of subscription type. Types available are `trial`, `free`, and `pro`.
* `billing` [*required*]:
    A JSON array of billing type. Currently only `parent_billing` is supported.

Once a new child-organization is created, you can interact with it by using the `org.public_id`, `api_key.key`, and `application_key.hash` provided in the response.
