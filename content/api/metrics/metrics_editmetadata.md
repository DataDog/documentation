---
title: Edit Metric Metadata
type: apicontent
order: 5.5
---
## Edit Metric Metadata

The metrics metadata endpoint allows you to edit fields of a metric's metadata.
Find more about supported types [here](/developers/metrictypes)
##### ARGUMENTS
* `type` [*required*]:  
    [Metric type](/developers/metrictypes) such as **gauge** or **rate**
* `description` [*optional*]:  
    String description of the metric" default
* `short_name` [*required*]:  
    Short name string of the metric
* `unit` [*optional*]:  
    Primary unit of the metric such as **byte** or **operation**
* `per_unit` [*optional*]:  
    Per unit of the metric such as **second** in **bytes per second**
* `statsd_interval` [*optional*]:  
    If applicable, statds flush interval in seconds for the metric