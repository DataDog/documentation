---
title: Monitors group search
type: apicontent
order: 26.13
external_redirect: /api/#monitors-group-search
---

## Monitors group search

Search and filter your monitor groups details.

**ARGUMENTS**:

* **`query`** [*optional*]:

    After entering a search query in your [Manage Monitor page][1] use the query parameter value in the URL of the page as value for this parameter. Consult the dedicated [manage monitor documentation][2] page to learn more.

* **`page`** [*optional*, *default* = **0**]:

    Page to start paginating from.

* **`per_page`** [*optional*, *default*=**30**]:

    Number of monitors to return per page.

* **`sort`** [*optional*, *default*=**null**]:

    Comma separated string for sort order (e.g. `name,asc`) supported fields:

    * `name`
    * `status`
    * `tags`

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/manage_monitor/#find-the-monitors
