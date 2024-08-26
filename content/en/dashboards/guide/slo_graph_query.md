---
title: Scope metric-based SLO queries
disable_toc: false
further_reading:
- link: "/dashboards/widgets/slo/"
  tag: "Documentation"
  text: "SLO Widget"
---

<div class="alert alert-info">This feature is only available for <strong>metric-based</strong> SLO queries.</div>

## Overview

The [SLO widget][1] supports advanced metric query filtering, including the use of template variables to dynamically scope results displayed. 

## Walk through of an SLO query

### Metric-based SLO query
First, create a [metric-based SLO][2]. This example uses APM trace metrics to measure the availability of an example service called `web-store`.

##### Good events (numerator)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### Total events (denominator)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="service_management/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="SLO configuration showing example trace metrics" style="width:100%;" >}}

### SLO widget

Select the SLO in the [SLO widget editor][1]. You can apply additional filters in the widget configuration to further scope the results displayed. This does not modify the original definition of the SLO. In the example, we add the `$env` and `$availability-zone` tags to the **filter by** field of the widget. 

{{< img src="service_management/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="SLO Summary editor with dynamic tags for $env and $availability-zone" style="width:100%;" >}}

With this configuration, what happens when the [Dashboard template variable][3] is changed to `env:prod` and `availability-zone:northcentralus`?

The SLO widget filters the SLO metric queries by those additional tags for your visualization purposes:

##### Good events (numerator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### Total events (denominator)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/slo/
[2]: /service_management/service_level_objectives/metric/
[3]: /dashboards/template_variables/
