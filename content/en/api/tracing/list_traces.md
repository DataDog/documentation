---
title: Get a list of traces
type: apicontent
order: 30.2
---

## Get a list of traces

List endpoint returns traces that match a trace search query. Results are paginated.

##### ARGUMENTS

* **`query`** [*required*]:
    The search query - following the [trace search syntax][1].
* **`time.from`** [*required*]:
    Minimum timestamp for requested traces. Format can be one of the following:
    - an ISO-8601 string
    - a unix timestamp (number representing the elapsed millisec since epoch)
    - a relative time (`now -10m`, `now - 1h`, `now - 1d`)
* **`time.to`** [*required*]:
    Maximum timestamp for requested traces. Format can be one of the following:
    - an ISO-8601 string with minute, second, or millisecond precision
    - a unix timestamp (number representing the elapsed millisec since epoch)
    - a relative time (`now`, `now -10m`, `now - 1h`, `now - 1d`)
* **`time.timezone`** [*optional*, *default*=**None**]:
   Can be specified both as an offset (e.g. "UTC+03:00") or a regional zone (e.g. "Europe/Paris")
* **`time.offset`** [*optional*, *default*=**None**]:
   Equivalent to `time.timezone`. But value in seconds.
   If both timezone and offset are specified, timezone is ignored.
* **`startAt`** [*optional*, *default*=**None**]:
   Hash identifier of the first trace to return in the list, available in a trace `id` attribute. This parameter is used for the [pagination feature](#pagination).
   **Note**: This parameter is ignored if the corresponding trace is out of the scope for the specified time window.
* **`sort`** [*optional*, *default*=**desc**]:
    Time-ascending `asc` or time-descending `desc`results.
* **`limit`** [*optional*, *default*=**10**]:
    Number of traces to return in the response (maximum is 1000)

##### PAGINATION

Retrieve a trace list longer than the 1000 traces limit with the Trace List API Pagination feature:

* For the first request, use no `startAt` parameter.
* For the N-th request, use `nextTraceId` of N-1th request result as the `startAt` parameter value.

For better control over pagination results, use an absolute `time` parameter instead of the `now` keyword.


[1]: /tracing/trace_search_and_analytics/search/#search-syntax
