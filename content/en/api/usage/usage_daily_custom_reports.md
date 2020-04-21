---
title: Get daily usage attribution available files
type: apicontent
order: 35.95
external_redirect: /api/#get-daily-usage-attribution-available-files
aliases:
 - /api/#get-daily-custom-reporting-available-files
---

## Get daily usage attribution available files

Returns the list of availalbe daily usage attribution files.

**ARGUMENTS**:

* **`page [size]`** [*optional*, *default*=**60**]:
    The number of files.
* **`page [number]`** [*optional*, *default*=**0**]:
    The page to start.
* **`sort_dir`** [*optional*, *default*=**desc**]:
    The direction to sort by. One of [`desc`, `asc`]
* **`sort`** [*optional*, *default*=**start_date**]:
    The field to sort by. One of [`computed_on`, `size`, `start_date`, `end_date`]