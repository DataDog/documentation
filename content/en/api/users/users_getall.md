---
title: Get all users
type: apicontent
order: 36.3
external_redirect: /api/#get-all-users
---

## Get all users

Get the list of all users in the organization. This list includes all users even if they are disabled or unverified.

**ARGUMENTS**:

* **`page[size]`** [*optional*, *default*=**10**]: Number of roles to return for a given page.
* **`page[number]`** [*optional*, *default*=**0**]: Specific page number to return.
* **`sort`** [*optional*, *default*=**name**]: User attribute to order results by. Sort order is **ascending** by default. Sort order is **descending** if the field is prefixed by a negative sign, for example: *sort=-name*.
  * Options: **name**, **modified_at**, **user_count**
* **`sort_dir`** [*optional*, *default*=**desc**]: Direction of sort.
    * Options: `asc`, `desc`.
* **`filter`**[*optional*, *default*=**None**]: Filter all roles by the given string.
* **`filter[status]`**[*optional*, *default*=**None**]: Filter on `status` attribute. Comma separated list: `Active`, `Pending`, and `Disabled`.
