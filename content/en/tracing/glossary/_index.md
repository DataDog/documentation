---
title: APM Terms and Concepts
kind: documentation
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
  - /tracing/visualization/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "/tracing/services/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< jqmath-vanilla >}}

The APM UI provides many tools to troubleshoot application performance and correlate it throughout the product, which helps you find and resolve issues in distributed systems.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of building your application.                                  |
| [Resource](#resources)          | Resources represent a particular domain of a customer application - they are typically an instrumented web endpoint, database query, or background job.                                                              |
| [Monitors][1]                   | APM metric monitors work like regular metric monitors, but with controls tailored specifically to APM. Use these monitors to receive alerts at the service level on hits, errors, and a variety of latency measures. |
| [Trace](#trace)                 | A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans.                                                             |
| [Span](#spans)                  | A span represents a logical unit of work in a distributed system for a given time period. Multiple spans construct a trace.                                                                                          |
| [Service entry span](#service-entry-span) | A span is a service entry span when it is the entrypoint method for a request to a service. You can visualize this within Datadog APM when the color of the immediate parent on a flame graph is a different color.                                                                                            |
| [Trace root span](#trace-root-span) | A span is the root span when it is the entrypoint method for the trace. Its start marks the beginning of the trace |
| [Trace metrics](#trace-metrics) | Trace metrics are automatically collected and kept with a 15-month retention policy similar to other [Datadog metrics][2]. They can be used to identify and alert on hits, errors, or latency. Statistics and metrics are always calculated based on _all_ traces, and are not impacted by ingestion controls.                       |
| [Indexed Span](#indexed-span) | Indexed Spans represent all spans indexed by retention filters or legacy App Analytics analyzed spans and can be used to search, query, and monitor in *Analytics*.                                                                                                |
| [Span tags](#span-tags)         | Tag spans in the form of key-value pairs to correlate a request in the *Trace View* or filter in *Analytics*.                                                                                                    |
| [Retention Filters](#retention-filters) | Retention filters are tag-based controls set within the Datadog UI that determine what spans to index in Datadog for 15 days.                                                                                              |
| [Ingestion Controls](#ingestion-controls) | Ingestion controls are used to send up to 100% of traces to Datadog for live search and analytics for 15 minutes.
| [Sublayer Metric](#sublayer-metric) | A sublayer metric is the execution duration of a given type / service within a trace.
| [Execution Time](#execution-time) | Total time that a span is considered 'active' (not waiting for a child span to complete).

## Services

After [instrumenting your application][3], the [Services List][4] is your main landing page for APM data.

{{< img src="tracing/visualization/service_list.png" alt="service list" >}}

Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of scaling instances. Some examples:

* A group of URL endpoints may be grouped together under an API service.
* A group of DB queries that are grouped together within one database service.
* A group of periodic jobs configured in the crond service.

The screenshot below is a microservice distributed system for an e-commerce site builder. There's a `web-store`, `ad-server`, `payment-db`, and `auth-service` all represented as services in APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" >}}

All services can be found in the [Service List][4] and visually represented on the [Service Map][5]. Each service has its own [Service page][6] where [trace metrics](#trace-metrics) like throughput, latency, and error rates can be viewed and inspected. Use these metrics to create dashboard widgets, create monitors, and see the performance of every resource such as a web endpoint or database query belonging to the service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="service page" >}}

<div class="alert alert-info">
Don’t see the HTTP endpoints you were expecting on the Service page? In APM, endpoints are connected to a service by more than the service name. It is also done with the `span.name` of the entry-point span of the trace. For example, on the web-store service above, `web.request` is the entry-point span. More info on this <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">here</a>.
</div>

## Resources

Resources represent a particular domain of a customer application. They could typically be an instrumented web endpoint, database query, or background job. For a web service, these resources can be dynamic web endpoints that are grouped by a static span name -  `web.request`. In a database service, these would be database queries with the span name `db.query`. For example the `web-store` service has automatically instrumented resources - web endpoints - which handle checkouts, updating carts, adding items, and so on. A Resource name can be the HTTP method and the HTTP route, for example `GET /productpage` or `ShoppingCartController#checkout`. 

Each resource has its own [Resource page][7] with [trace metrics](#trace-metrics) scoped to the specific endpoint. Trace metrics can be used like any other Datadog metric - they are exportable to a dashboard or can be used to create monitors. The Resource page also shows the span summary widget with an aggregate view of [spans](#spans) for all [traces](#trace), latency distribution of requests, and traces which show requests made to this endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="resource page" >}}

## Trace

A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans. During the lifetime of the request, you can see distributed calls across services (because a [trace-id is injected/extracted through HTTP headers][8]), [automatically instrumented libraries][3], and [manual instrumentation][9] using open-source tools like [OpenTracing][10] in the flame graph view. In the Trace View page, each trace collects information that connects it to other parts of the platform, including [connecting logs to traces][11], [adding tags to spans][12], and [collecting runtime metrics][13].

{{< img src="tracing/visualization/trace_view.png" alt="trace view" >}}

## Spans

A span represents a logical unit of work in the system for a given time period. Each span consists of a `span.name`, start time, duration, and [span tags](#span-tags). For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger request. Spans can be nested within each other, which creates a parent-child relationship between the spans.

For the example below, the span `rack.request` is the entry-point span of the trace. This means the web-store service page is displaying resources that consist of traces with an entry-point span named `rack.request.` The example also shows the tags added application side (`merchant.store_name`, `merchant.tier`, etc). These user-defined tags can be used to search and analyze APM data in [Analytics][14].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" >}}

### Service entry span

A span is a service entry span when it is the entrypoint method for a request to a service. You can visualize this within Datadog APM when the color of the immediate parent on a flame graph is a different color. Services are also listed on the right when viewing a flame graph.

### Trace root span

A span is a trace root span when it is the first span of a trace. The root span is the entry-point method of the traced request. Its start marks the beginning of the trace.

For the example below, the **service entry spans** are:
- `rack.request` (which is also the _root span_)
- `aspnet_coremvc.request`
- The topmost green span below `aspnet_coremvc.request`
- Every orange `mongodb` span

{{< img src="tracing/visualization/toplevelspans.png" alt="span" >}}

## Span summary

The span summary table shows metrics for spans aggregated across all traces, including how often the span shows up among all traces, what percent of traces contain the span, the average duration for the span, and its typical share of total execution time of the requests. This helps you detect N+1 problems in your code so you can improve your application performance.


The span summary table is only available for resources containing service entry spans.


The span summary table contains the following columns:

Average spans per trace
: Average number of occurrences of the span for traces, including the current resource, where the span is present at least once.

Percentage of traces
: Percentage of traces, including the current resource, where the span is present at least once.

Average duration
: Average duration of the span for traces, including the current resource, where the span is present at least once.

Average percentage of execution time
: Average ratio of execution time for which the span was active for traces, including the current resource, where the span is present at least once.

{{< img src="tracing/visualization/span-summary.png" alt="Span summary table" >}}

## Trace metrics

[Trace metrics][15] are automatically collected and kept at a 15-month retention policy similar to any other [Datadog metric][2]. They can be used to identify and alert on hits, errors, or latency. Trace metrics are tagged by the host receiving traces along with the service or resource. For example, after instrumenting a web service trace metrics are collected for the entry-point span `web.request` in the [Metric Summary][16].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="trace metrics" >}}

### Dashboard

Trace metrics can be exported to a dashboard from the *Service* or *Resource* page. Additionally, trace metrics can be queried from an existing dashboard.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="trace metrics dashboard" >}}

### Monitoring

Trace metrics are useful for monitoring. APM monitors can be set up on the [New Monitors][17], [Service][6], or [Resource][7] page. A set of suggested monitors is available on the [Service][6], or [Resource][7] page.

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="trace metrics monitor" >}}

## Trace Explorer

[Explore and perform analytics][14] on 100% of ingested traces for 15 minutes and all [indexed spans](#indexed-span) for 15 days.

## Indexed span

Indexed Spans represent spans indexed by a [retention filter](#retention-filters) stored in Datadog for 15 days that can be used to search, query, and monitor in [Trace Search and Analytics][14] by the [tags](#span-tags) included on the span.

<div class="alert alert-info">
Creating <a href="https://app.datadoghq.com/apm/traces/retention-filters">tag based retention filters</a> after ingestion allows you to control and visualize exactly how many spans are being indexed per service.
</div>

## Span tags

Tag spans in the form of key-value pairs to correlate a request in the *Trace View* or filter in *Analytics*. Tags can be added to a single span or globally to all spans. For the example below, the requests (`merchant.store_name`, `merchant.tier`, etc.) have been added as tags to the span.

{{< img src="tracing/visualization/span_tag.png" alt="span tag" >}}

To get started tagging spans in your application, check out this [walkthrough][12].

After a tag has been added to a span, search and query on the tag in Analytics by clicking on the tag to add it as a [facet][18]. Once this is done, the value of this tag is stored for all new traces and can be used in the search bar, facet panel, and trace graph query.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:50%;">}}

## Retention filters

[Set tag-based filters][19] in the Datadog UI to index spans for 15 days for use with [Trace Search and Analytics](#trace-search-and-analytics)

## Ingestion controls

[Send 100% of traces][20] from your services to Datadog and combine with [tag-based retention filters](#retention-filters) to keep traces that matter for your business for 15 days.

## Sublayer metric

Some [Tracing Application Metrics][15] are tagged with `sublayer_service` and `sublayer_type` so that you can see the execution time for individual services within a trace.

Sublayer metrics are only available if a service has downstream dependencies. 

## Execution time

Execution time is calculated by adding up the time that a span is active, meaning it has no child spans. For non-concurrent work, this is straightforward. In the following image, the execution time for Span 1 is $\D1 + \D2 + \D3$. The execution time for Spans 2 and 3 are their respective widths.

{{< img src="tracing/visualization/execution-time1.png" style="width:50%;" alt="Execution time" >}}

When child spans are concurrent, execution time is calculated by dividing the overlapping time by the number of concurrently active spans. In the following image, Spans 2 and 3 are concurrent (both are children of Span 1), overlapping for the duration of Span 3, so the execution time of Span 2 is $\D2 ÷ 2 + \D3$, and the execution time of Span 3 is $\D2 ÷ 2$.

{{< img src="tracing/visualization/execution-time2.png" style="width:50%;" alt="Execution time for concurrent work" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/create/types/apm/
[2]: /developers/guide/data-collection-resolution-retention/
[3]: /tracing/setup/
[4]: /tracing/services/services_list/
[5]: /tracing/services/services_map/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /tracing/manual_instrumentation/
[10]: /tracing/opentracing/
[11]: /tracing/other_telemetry/connect_logs_and_traces/
[12]: /tracing/guide/add_span_md_and_graph_it/
[13]: /tracing/metrics/runtime_metrics/
[14]: /tracing/trace_explorer/
[15]: /tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /tracing/trace_explorer/query_syntax/#facets
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /tracing/trace_pipeline/ingestion_controls/
