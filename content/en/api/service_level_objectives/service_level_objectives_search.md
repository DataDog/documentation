---
title: Search Service Level Objectives
type: apicontent
order: 29.07
external_redirect: /api/#search-service-level-objectives
---

## Search Service Level Objectives

Search and filter your service level objectives.

**ARGUMENTS**:

* **`ids`** [*optional*]:

    Query multiple SLOs by their IDs.

* **`query`** [*optional*]:

    After entering a search query in your [List Service Level Objectives page][1], use the query parameter value in the URL of the page as value for this parameter. For more information on building a query, see [Searching SLOs][2].

    The query can contain any number of space-separated monitor attributes, for instance `query="type:metric foo"`.

* **`offset`** [*optional*, *default* = **0**]:

    Offset to start from.

* **`limit`** [*optional*, *default*=**30**]:

    Number of SLOs to return per query.



[1]: https://app.datadoghq.com/slo
[2]: /monitors/service_level_objectives/#searching-slos
