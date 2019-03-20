---
title: Get a list of logs
type: apicontent
order: 16.2
external_redirect: /api/#list-logs
---

## Get a list of logs

List endpoint returns logs that match a log search query. Results are paginated.


##### ARGUMENTS

* **`query`** [*required*]:  
    The search query - following the [Log search syntax][1] .
* **`time.from`** [*required*]:  
    Minimum timestamp for requested logs. Format can be either
    - an ISO-8601 string
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.to`** [*required*]:  
    Maximum timestamp for requested logs. Format can be either
    - an ISO-8601 string with minute, second or millisecond precision 
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.timezone`** [*optional*, *default*=**None**]:
   Can be specified both as an offset (e.g. "UTC+03:00") or a regional zone (e.g. "Europe/Paris")
* **`time.offset`** [*optional*, *default*=**None**]:
   Equivalent to `time.timezone`. But value in seconds.
   If both timezone and offset are specified, timezone is ignored.
* **`startAt`** [*optional*, *default*=**None**]:  
   Hash identifier of the first log to return in the list, available in a log `id` attribute. This parameter is used for the [pagination feature](#pagination).
   **Note**: this parameter is ignored if the corresponding log is out of the scope of the specified time window. 
* **`sort`** [*optional*, *default*=**desc**]:  
    Time-ascending `asc` or time-descending `desc`results.
* **`limit`** [*optional*, *default*=**10**]:  
    Number of logs return in the response (maximum is 1000)

##### PAGINATION

Retrieve a log list longer than the 1000 logs limit with the Log List API Pagination feature:

* for the first request, use no `startAt` parameter.
* for the N-th request, use `nextLogID` of N-1th request result as the `startAt` parameter value. 

For better control over pagination results, you should use an absolute `time` parameter - don't use the`now` keyword.

**If you consider archiving logs for your organisation, use rather Datadog archive capabilities instead of the log list API. See [Datadog Logs Archive documentation][2].**

[1]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[2]: https://docs.datadoghq.com/logs/archives/
