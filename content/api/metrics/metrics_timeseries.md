---
title: Metrics
type: apicontent
order: 5.2
---

## Post Time Series Points
The metrics end-point allows you to post time-series data that can be graphed on Datadog's dashboards.

ARGUMENTS

metric [required]
The name of the time series
points [required]
A JSON array of points. Each point is of the form:
[[POSIX_timestamp, numeric_value], ...]
Note that the timestamp should be in seconds, must be current, and the numeric value is a 32bit float gauge-type value. Current is defined as not more than 10 minutes in the future or more than 1 hour in the past.
host [optional, default=None]
The name of the host that produced the metric.
tags [optional, default=None]
A list of tags associated with the metric.