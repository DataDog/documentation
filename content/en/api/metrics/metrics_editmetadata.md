---
title: Edit metric metadata
type: apicontent
order: 25.5
external_redirect: /api/#edit-metric-metadata
---
## Edit metric metadata

The metrics metadata endpoint allows you to edit fields of a metric's metadata.
[Find more about supported types][1]

**ARGUMENTS**:

* **`type`** [*required*]:
    [Metric type][1] such as **gauge** or **rate**
* **`description`** [*optional*, *default*=**None**]:
    String description of the metric" default
* **`short_name`** [*required*]:
    Short name string of the metric
* **`unit`** [*optional*, *default*=**None**]:
    Primary unit of the metric such as **byte** or **operation**
* **`per_unit`** [*optional*, *default*=**None**]:
    Per unit of the metric such as **second** in **bytes per second**
* **`statsd_interval`** [*optional*, *default*=**None**]:
    If applicable, statds flush interval in seconds for the metric

[1]: /developers/metrics
