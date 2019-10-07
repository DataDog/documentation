---
title: Get a list of logs
type: apicontent
order: 22.2
external_redirect: /api/#list-logs
---

## Get a list of logs

List endpoint returns logs that match a log search query. [Results are paginated][1].

**If you are thinking about archiving logs for your organization, consider using Datadog archive capabilities instead of the log list API. See [Datadog Logs Archive documentation][2].**

**ARGUMENTS**:

* **`query`** [*required*]:
    The search query - following the [Log search syntax][3] .
* **`time.from`** [*required*]:
    Minimum timestamp for requested logs. Format can be either
    - an ISO-8601 string
    - a unix timestamp (number representing the elapsed millisec since epoch)
    - a relative time (`now -10m`, `now - 1h`, `now - 1d`)
* **`time.to`** [*required*]:
    Maximum timestamp for requested logs. Format can be either
    - an ISO-8601 string with minute, second or millisecond precision
    - a unix timestamp (number representing the elapsed millisec since epoch)
    - a relative time (`now`, `now -10m`, `now - 1h`, `now - 1d`)
* **`time.timezone`** [*optional*, *default*=**None**]:
   Can be specified both as an offset (e.g. "UTC+03:00") or a regional zone (e.g. "Europe/Paris")
* **`time.offset`** [*optional*, *default*=**None**]:
   Equivalent to `time.timezone`. But value in seconds.
   If both timezone and offset are specified, timezone is ignored.
* **`startAt`** [*optional*, *default*=**None**]:
   Hash identifier of the first log to return in the list, available in a log `id` attribute. This parameter is used for the [pagination feature][1].
   **Note**: this parameter is ignored if the corresponding log is out of the scope of the specified time window.
* **`sort`** [*optional*, *default*=**desc**]:
    Time-ascending `asc` or time-descending `desc`results.
* **`limit`** [*optional*, *default*=**10**]:
    Number of logs return in the response (maximum is 1000)
* **`index`** [*optional*, *default*=**main**]:
    For multi-index organizations, the log index in which the request is performed.

[1]: /logs/guide/collect-multiple-logs-with-pagination
[2]: https://docs.datadoghq.com/logs/archives
[3]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
