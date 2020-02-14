---
title: Search SLOs
type: apicontent
order: 30.09
external_redirect: /api/#search-slo-s
---

## Search SLOs

Search and filter your service level objectives.

**ARGUMENTS**:

* **`ids`** [*optional*]:

    Query multiple SLOs by their IDs.

* **`query`** [*optional*]:

    The query is a simple search of the SLO name, for instance `query="my team"`.

* **`offset`** [*optional*, *default* = **0**]:

    Offset to start from.

* **`limit`** [*optional*, *default*=**30**]:

    Number of SLOs to return per query.


[1]: https://app.datadoghq.com/slo
[2]: /monitors/service_level_objectives/#searching-slos
