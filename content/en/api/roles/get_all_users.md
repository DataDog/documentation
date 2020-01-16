---
title: Get all users of a role
type: apicontent
order: 37.12
external_redirect: /api/#get-all-users
---

## Get all users of a role

Gets all users of a role.

##### ARGUMENTS

* **`page[size]`** [*optional*, *default*=**10**]:
Number of users to return for a given page.
* **`page[number]`** [*optional*, *default*=**0**]:
Specific page number to return.
* **`sort`** [*optional*, *default*=**name**]:
Sort users depending on the given field. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign (Eg: *sort=-name*).
  * Options: **name**, **email**, **status**
* **`filter`**[*optional*, *default*=**None**]:
Filter all users by the given string.

Replace the `<YOUR_DATADOG_API_KEY>` and `<YOUR_DATADOG_APPLICATION_KEY>` placeholders with the corresponding [API and application keys for your organization][1]. See the [Permission UUID section](#permission-uuids) to see what role UUIDs are available for the `<ROLE_UUID>` placeholder.

[1]: https://app.datadoghq.com/account/settings#api
