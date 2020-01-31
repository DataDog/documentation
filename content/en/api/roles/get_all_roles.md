---
title: Get all roles
type: apicontent
order: 37.01
external_redirect: /api/#get-all-roles
---

## Get all roles

Returns all roles, including their names and UUIDs.

**ARGUMENTS**:

* **`page[size]`** [*optional*, *default*=**10**]:
Number of roles to return for a given page.
* **`page[number]`** [*optional*, *default*=**0**]:
Specific page number to return.
* **`sort`** [*optional*, *default*=**name**]:
Sort roles depending on the given field. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign, for example: *sort=-name*.
  * Options: **name**, **modified_at**, **user_count**
* **`filter`**[*optional*, *default*=**None**]:
Filter all roles by the given string.

