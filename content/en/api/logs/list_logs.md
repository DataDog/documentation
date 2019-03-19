---
title: Get list of logs
type: apicontent
order: 16.2
external_redirect: /api/#list-logs
---

## Get list of logs

List endpoint returns logs that match a log search query. Results are paginated.


##### ARGUMENTS

* **`query`** [*required*]:  
    the search query - following the [Log search syntax][1] .
* **`time.from`** [*required*]:  
    minimum timestamp for requested logs. Format can be either
    - an ISO-8601 string
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.to`** [*required*]:  
    maximum timestamp for requested logs. Format can be either
    - an ISO-8601 string with minute, second or millisecond precision 
    - a unix timestamp (number representing the elapsed millisec since epoch)
* **`time.timezone`** [*optional*, *default*=**None**]:
   Can be specified both as an offset (eg "UTC+03:00") or a regional zone (eg "Europe/Paris")
* **`time.offset`** [*optional*, *default*=**None**]:
   Equivalent to time.timezone. But value in seconds.
   If both timezone and offset are specified, timezon is ignored.
* **`startAt`** [*optional*, *default*=**None**]:  
   Hash identifier of the first log to return in the list.  
   **Note** that this parameter is ignored if the corresponding log is out of the scope of the specified time window. 
* **`sort`** [*optional*, *default*=**desc**]:  
    Time-ascending `asc` or time-descending `desc`results.
* **`limit`** [*optional*, *default*=**10**]:  
    Number of logs return in the response (maximum is 1000)
    
[1]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax


##### HOW TO USE PAGINATION

Pagination is a typical interaction with the Log List API. It enables to retrive a log list longer than the 1000 limit, within the rate limit (number of calls per hour) for your organization though [2].

How to use paginated results:

* for the first request, use no `startAt` parameter
* for the Nth request, use `nextLogID` of N-1th request result as a `startAt` parameter 
* for bettter control, we recommend to use an absolute `time` parameter (meaning not using `now` keyword)

If you consider archiving the logs for your organisation, we recommend to use our archive capabilities instead of the log list API. See [3].

[2]: /api/?lang=python#rate-limiting
[3]: https://docs.datadoghq.com/logs/archives/


