## Metrics
The metrics end-point allows you to:

Post metrics data so it can be graphed on Datadog's dashboards
Query metrics from any time period
As occurs within the Datadog UI, a graph can only contain a set number of points and as the timeframe over which a metric is viewed increases, aggregation between points will occur to stay below that set number.

Thus, if you are querying for larger timeframes of data, the points returned will be more aggregated. The max granularity within Datadog is one point per second, so if you had submitted points at that interval and requested a very small interval from the query API (in this case, probably less than 100 seconds), you could end up getting all of those points back. Otherwise, our algorithm tries to return about 150 points per any given time window, so you'll see coarser and coarser granularity as the amount of time requested increases. We do this time aggregation via averages.

## Get List Of Active Metrics
Get the list of actively reporting metrics from a given time until now. This endpoint is not available in the Python and Ruby libraries.

ARGUMENTS

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

## Query Time Series Points
This end point allows you to query for metrics from any time period.

ARGUMENTS

query [required]
The query strong
QUERY LANGUAGE

Any query used for a graph can be used here. See here for more details. The time between from and to should be less than 24 hours. If it is longer, you will receive points with less granularity.

## View Metric Metadata

The metrics metadata endpoint allows you to get metadata about a specific metric.

ARGUMENTS

This end point takes no JSON arguments.'


## Edit Metric Metadata

The metrics metadata endpoint allows you to edit fields of a metric's metadata.

ARGUMENTS

type [optional, default=None]
metric type such as 'gauge' or 'rate'
description [optional, default=None]
string description of the metric
short_name [optional, default=None]
short name string of the metric
unit [optional, default=None]
primary unit of the metric such as 'byte' or 'operation'
per_unit [optional, default=None]
'per' unit of the metric such as 'second' in 'bytes per second'
statsd_interval [optional, default=None]
if applicable, statds flush interval in seconds for the metric