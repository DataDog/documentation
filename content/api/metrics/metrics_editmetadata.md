---
title: Edit Metric Metadata
type: apicontent
order: 5.5
---
## Edit Metric Metadata

The metrics metadata endpoint allows you to edit fields of a metric's metadata.

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="type" description="metric type such as 'gauge' or 'rate'" default="None" >}}
    {{< argument name="description" description="string description of the metric" default="None" >}}
    {{< argument name="short_name" description="short name string of the metric" default="None" >}}
    {{< argument name="unit" description="primary unit of the metric such as 'byte' or 'operation'" default="None" >}}
    {{< argument name="per_unit" description="'per' unit of the metric such as 'second' in 'bytes per second'" default="None" >}}
    {{< argument name="statsd_interval" description="if applicable, statds flush interval in seconds for the metric" default="None" >}}
</ul>