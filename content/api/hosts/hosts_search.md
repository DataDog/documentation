---
title: Search hosts
type: apicontent
order: 13.1
external_redirect: /api/#search-hosts
---

## Search hosts
This endpoint allows searching for hosts by name, alias, or tag. Hosts live within the past 3 hours are included. Results are paginated with a max of 100 results at a time.

##### ARGUMENTS

* **`filter`** [*optional*, *default*=**None**]:
    Query string to filter search results.
* **`sort_field`** [*optional*, *default*=**cpu**]:
    Sort hosts by the given field.
    Options: **status**, **apps**, **cpu**, **iowait**, **load**
* **`sort_dir`** [*optional*, *default*=**desc**]:
    Direction of sort.
    Options: **asc**, **desc**
* **`start`** [*optional*, *default*=**0**]:
    Host result to start search from.
* **`count`** [*optional*, *default*=**100**]:
    Number of host results to return. Max 100.
