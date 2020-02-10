---
title: Monitors search
type: apicontent
order: 27.13
external_redirect: /api/#monitors-search
---

## Monitors search

Search and filter your monitors details.

**ARGUMENTS**:

* **`query`** [*optional*]:

    After entering a search query in your [Manage Monitor page][1] use the query parameter value in the URL of the page as value for this parameter. Consult the dedicated [manage monitor documentation][2] page to learn more.

    The query can contain any number of space-separated monitor attributes, for instance `query="type:metric status:alert"`.

* **`page`** [*optional*, *default* = **0**]:

    Page to start paginating from.

* **`per_page`** [*optional*, *default*=**30**]:

    Number of monitors to return per page.

* **`sort`** [*optional*, *default*=**null**]:

    Comma separated string for sort order (e.g. name,asc) supported fields:

    * `name`
    * `status`
    * `tags`

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/manage_monitor/#find-the-monitors
