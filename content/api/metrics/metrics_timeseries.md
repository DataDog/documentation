---
title: Post time series points
type: apicontent
order: 15.2
external_redirect: /api/#post-time-series-points
---

## Post time series points
The metrics end-point allows you to post time-series data that can be graphed on Datadog's dashboards.

#### ARGUMENTS

* **`series`** [*required*]:  
    Pass a JSON array where each item in the array contains the following arguments:
    
    * **`metric`** [*required*]:  
        The name of the time series
    * **`type`** [*optional*, *default*=**gauge**]:  
        [Type](/developers/metrics/#metric-types) of your metric either: `gauge`, `rate`, or `count`
    * **`interval`** [*optional*, *default*=**None**]:  
        If the [type](/developers/metrics/#metric-types) of the metric is `rate` or `count`, define the corresponding interval.
    * **`points`** [*required*]:  
        A JSON array of points. Each point is of the form:  
        `[[POSIX_timestamp, numeric_value], ...]`  
        **Note**: The timestamp should be in seconds, current, and its format should be a 32bit float gauge-type value.
        Current is defined as not more than 10 minutes in the future or more than 1 hour in the past.
    * **`host`** [*optional*]:  
        The name of the host that produced the metric.
    * **`tags`** [*optional*, *default*=**None**]:  
        A list of tags associated with the metric.

