---
title: Add scope and context for metric-based SLO graph queries
kind: guide
disable_toc: false
further_reading:
- link: "/dashboards/widgets/slo/"
  tag: "Documentation"
  text: "SLO Summary Widget"
---

<div class="alert alert-info">This feature is only available for <strong>metric-based</strong> SLO queries.</div>

## Overview

Add scope and context to your graphs so you can visualize the Service Level Objective (SLO) metrics that are important to you. With [SLO Summary Widgets][1], you can use template variables to dynamically scope graphs without affecting your original query.

## Walk through of an SLO Query

### Metric-based SLO query
Create a [metric-based Service Level Objective][2]. For example, we have the following trace metrics to measure the availability SLO for our `web-store` service.

##### Good events (numerator)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### Total events (denominator)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="/monitors/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="SLO configuration showing example trace metrics" style="width:100%;" >}}

### SLO summary widget query
Build out a [SLO Summary widget][1] with the metric-based SLO. Even though the original query is filtered by `service:web-store` you can add template variables to dynamically scope your graphs. We add the `$env` and `$availability-zone` dynamic tags in the *filter by* field of the widget configuration. 

{{< img src="/monitors/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="SLO Summary editor with dynamic tags for $env and $availability-zone" style="width:100%;" >}}

With this configuration, what happens when the [Dashboard template variable][3] is changed to tbe `env:prod` and `availability-zone:northcentralus`?

The SLO widget takes the original query and amends it for your visualization purposes:
##### Good events (numerator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### Total events (denominator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

### What if the metric doesn't have the tags used in a filter? 

What would happen if we added the `$random-example` tag even though none of the trace metrics have this tag associated with it? The query becomes:

##### Good events (numerator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus, random-example:*} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus, random-example:*} by {resource_name}.as_count()`

##### Total events (denominator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus, random-example:*} by {resource_name}.as_count()`

This query does not return any data, the SLO widget query behaves the same way the SLO metric query does. It cannot show data for tags that the metric is not associated with.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/slo/
[2]: /monitors/service_level_objectives/metric/
[3]: /dashboards/template_variables/
