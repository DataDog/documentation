---
title: Post timeseries points
type: apicontent
order: 26.2
external_redirect: /api/#post-time-series-points
---

## Post timeseries points

The metrics end-point allows you to post time-series data that can be graphed on Datadog's dashboards. The limit for compressed payloads is 3.2 megabytes (3200000), and 62 megabytes (62914560) for decompressed payloads.

**Overhead**:

If you're submitting metrics directly to the Datadog API *without* using [DogStatsD][1], expect:

* 64 bits for the timestamp
* 64 bits for the value
* 20 bytes for the metric names
* 50 bytes for the timeseries

The full payload is approximately \~ 100 bytes. However, with the DogStatsD API, compression is applied, which reduces the payload size.

**ARGUMENTS**:

* **`series`** [*required*]:
    Pass a JSON array where each item in the array contains the following arguments:

    * **`metric`** [*required*]:
        The name of the timeseries
    * **`type`** [*optional*, *default*=**gauge**]:
        [Type][2] of your metric either: `gauge`, `rate`, or `count`
    * **`interval`** [*optional*, *default*=**None**]:
        If the [type][2] of the metric is `rate` or `count`, define the corresponding interval.
    * **`points`** [*required*]:
        A JSON array of points. Each point is of the form:
        `[[POSIX_timestamp, numeric_value], ...]`
        **Note**: The timestamp should be in seconds, current. The numeric value format should be a 32bit float gauge-type value.
        Current is defined as not more than 10 minutes in the future or more than 1 hour in the past.
    * **`host`** [*optional*]:
        The name of the host that produced the metric.
    * **`tags`** [*optional*, *default*=**None**]:
        A list of tags associated with the metric.

[1]: /developers/dogstatsd
[2]: /developers/metrics/types
