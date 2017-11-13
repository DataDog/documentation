---
title: Post Time Series Points
type: apicontent
order: 5.2
---

## Post Time Series Points
The metrics end-point allows you to post time-series data that can be graphed on Datadog's dashboards.

#### ARGUMENTS
* `series` [*optional*, *default*=**None**]:  
    To submit multiple metrics, you may pass a JSON array where each item in the array contains the following arguments. To submit a single metric, you may pass the following arguments as separate arguments.
    
* `metric` [*required*]:  
    The name of the time series
* `points` [*required*]:  
    A JSON array of points. Each point is of the form:  
    `[[POSIX_timestamp, numeric_value], ...]`  
    Note that the timestamp should be in seconds, must be current, and the numeric value is a 32bit float gauge-type value.
    Current is defined as not more than 10 minutes in the future or more than 1 hour in the past.
* `host` [*required*]:  
    The name of the host that produced the metric.
* `tags` [*optional*, *default*=**None**]:  
    A list of tags associated with the metric.