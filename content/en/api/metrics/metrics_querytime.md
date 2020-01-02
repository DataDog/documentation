---
title: Query timeseries points
type: apicontent
order: 26.3
external_redirect: /api/#query-time-series-points
---

## Query timeseries points
This endpoint allows you to query for metrics from any time period. Use the query syntax described in [From the query to the graph][1].

*Note:* In Python, `from` is a reserved word. So instead, the Python API uses the `start` and `end` parameters in the function call.

**ARGUMENTS**:

* **`from`** [*required except in Python*]:
    Seconds from the unix epoch
* **`to`** [*required except in Python*]:
    Seconds to the unix epoch
* **`start`** [*required in Python*, *default*=**None**]:
    Seconds since the unix epoch
* **`end`** [*required in Python*, *default*=**None**]:
    Seconds since the unix epoch
* **`query`** [*required*]:
    The query string

[1]: /graphing/functions
