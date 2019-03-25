---
title: Get a list of Traces
type: apicontent
order: 16.2
external_redirect: /api/#list-traces
---

## Get a list of Traces

List endpoint returns traces that match a trace search query. Results are paginated.


##### ARGUMENTS

* **`query`** [*required*]:  
    The search query - following the [Trace search syntax][1] .
* **`time.from`** [*required*]:  
    Minimum timestamp for requested traces. Format can be either
    - an ISO-8601 string
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.to`** [*required*]:  
    Maximum timestamp for requested traces. Format can be either
    - an ISO-8601 string with minute, second or millisecond precision 
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.timezone`** [*optional*, *default*=**None**]:
   Can be specified both as an offset (e.g. "UTC+03:00") or a regional zone (e.g. "Europe/Paris")
* **`time.offset`** [*optional*, *default*=**None**]:
   Equivalent to `time.timezone`. But value in seconds.
   If both timezone and offset are specified, timezone is ignored.
* **`startAt`** [*optional*, *default*=**None**]:  
   Hash identifier of the first trace to return in the list, available in a trace `id` attribute. This parameter is used for the [pagination feature](#pagination).
   **Note**: this parameter is ignored if the corresponding trace is out of the scope of the specified time window. 
* **`sort`** [*optional*, *default*=**desc**]:  
    Time-ascending `asc` or time-descending `desc`results.
* **`limit`** [*optional*, *default*=**10**]:  
    Number of traces return in the response (maximum is 1000)

##### PAGINATION

Retrieve a trace list longer than the 1000 traces limit with the Trace List API Pagination feature:

* for the first request, use no `startAt` parameter.
* for the N-th request, use `nextTraceID` of N-1th request result as the `startAt` parameter value. 

For better control over pagination results, you should use an absolute `time` parameter - don't use the`now` keyword.


[1]: https://docs.datadoghq.com/tracing/visualization/search/#search-syntax
