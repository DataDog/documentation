---
title: APM Glossary & Walkthrough
kind: documentation
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---
The APM UI provides many tools to troubleshoot application performance and correlate it throughout the product, which helps you find and resolve issues in highly distributed systems.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of scaling instances.                                         |
| [Resource](#resources)          | Resources represent a particular domain of a customer application - they are typically an instrumented web endpoint, database query, or background job.                                                              |
| [Monitors][1]                   | APM metric monitors work like regular metric monitors, but with controls tailored specifically to APM. Use these monitors to receive alerts at the service level on hits, errors, and a variety of latency measures. |
| [Trace](#trace)                 | A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans.                                                             |
| [Span](#spans)                  | A span represents a logical unit of work in a distributed system for a given time period. Multiple spans construct a trace.                                                                                          |
| [Trace metrics](#trace-metrics) | Trace metrics are automatically collected and kept with a 15-month retention policy similar to other [Datadog metrics][2]. They can be used to identify and alert on hits, errors, or latency.                       |
| [App Analytics](#app-analytics) | App Analytics is used to filter Analyzed Spans by user-defined tags (customer_id, error_type, app_name, etc.) or infrastructure tags.                                                                                |
| [Analyzed Span](#analyzed-span) | Analyzed Spans represent 100% throughput of a request and can be used to search, query, and monitor in App Analytics.                                                                                                |
| [Span tags](#span-tags)         | Tag spans in the form of key-value pairs to correlate a request in the *Trace View* or filter in *App Analytics*.                                                                                                    |

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

Resources represent a particular domain of a customer application. They could typically be an instrumented web endpoint, database query, or background job. For a web service, these resources can be dynamic web endpoints that are grouped by a static span name -  `web.request`. In a database service, these would be database queries with the span name `db.query`. For example the `web-store` service has automatically instrumented resources - web endpoints - which handle checkouts, updating_carts, add_item, etc. Each resource has its own [Resource page][7] with [trace metrics](#trace-metrics) scoped to the specific endpoint. Trace metrics can be used like any other Datadog metric - they are exportable to a dashboard or can be used to create monitors. The Resource page also shows the span summary widget with an aggregate view of [spans](#spans) for all [traces](#trace), latency distribution of requests, and traces which show requests made to this endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="resource page" >}}

## Trace

A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans. During the lifetime of the request, you can see distributed calls across services (because a [trace-id is injected/extracted through HTTP headers][8]), [automatically instrumented libraries][3], and [manual instrumentation][9] using open-source tools like [OpenTracing][10] in the flamegraph view. In the Trace View page, each trace collects information that connects it to other parts of the platform, including [connecting logs to traces][11], [adding tags to spans][12], and [collecting runtime metrics][13].

{{< img src="tracing/visualization/trace_view.png" alt="trace view" >}}

## Spans

A span represents a logical unit of work in the system for a given time period. Each span consists of a `span.name`, start time, duration, and [span tags](#span-tags). For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger request. Spans can be nested within each other, which creates a parent-child relationship between the spans.

For the example below, the span `rack.request` is the entry-point span of the trace. This means the web-store service page is displaying resources that consist of traces with an entry-point span named `rack.request.` The example also shows the tags added application side (`merchant.name`, `merchant.tier`, etc). These user-defined tags can be used to search and analyze APM data in [App Analytics][14].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" >}}

## Trace Metrics

Trace metrics are automatically collected and kept at a 15-month retention policy similar to any other [Datadog metric][2]. They can be used to identify and alert on hits, errors, or latency. Trace metrics are tagged by the host receiving traces along with the service or resource. For example, after instrumenting a web service trace metrics are collected for the entry-point span `web.request` in the [Metric Summary][15].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="trace metrics" >}}

### Dashboard

Trace metrics can be exported to a dashboard from the *Service* or *Resource* page. Additionally, trace metrics can be queried from an existing dashboard.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="trace metrics dashboard" >}}

### Monitoring

Trace metrics are useful for monitoring. APM monitors can be set up on the [New Monitors][16], [Service][6], or [Resource][7] page. A set of suggested monitors is available on the [Service][6], or [Resource][7] page.

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="trace metrics monitor" >}}

## App Analytics

App Analytics is used to filter [Analyzed Spans](#analyzed-span) by user-defined tags (customer_id, error_type, app_name, etc.) or infrastructure tags. This allows deep exploration of the web requests flowing through your service along with being able to search, graph, and monitor on 100% throughput of hits, errors, and latency. This feature can be enabled with [automatic configuration][17].

{{< wistia vrmqr812sz >}}

## Analyzed Span

Analyzed Spans represent 100% throughput of a request and can be used to search, query, and monitor in App Analytics by the [tags](#span-tags) included on the span. After enabling App Analytics, the tracing client analyzes an entry-point span for web services by default, with the ability to [configure additional services][18] in your application. For example, a Java service with 100 requests generates 100 Analyzed Spans from its `servlet.request` spans. If you set `DD_TRACE_ANALYTICS_ENABLED=true` the `web-store` service analyzes all `rack.request` spans and makes them available in App Analytics. For this example, you can graph the top 10 merchants highest latency in the 99th percentile. `merchant_name` is a user defined tag that was applied to the span in the application.

<div class="alert alert-info">
You can run an estimate on the number of Analyzed Spans that would be generated from your services with the <a href="https://app.datadoghq.com/apm/docs/trace-search">Analyzed Span Estimator</a>. After ingestion, you can filter Analyzed Spans from 100% to a lower percentage on a service-by-service level under <a href="https://app.datadoghq.com/apm/settings">APM settings</a>. This reduces billable Analyzed Spans.
</div>

## Span tags

Tag spans in the form of key-value pairs to correlate a request in the *Trace View* or filter in *App Analytics*. Tags can be added to a single span or globally to all spans. For the example below, the requests (`merchant.store_name`, `merchant.tier`, etc.) have been added as tags to the span.

{{< img src="tracing/visualization/span_tag.png" alt="span tag" >}}

To get started tagging spans in your application, check out this [walkthrough][12].

After a tag has been added to a span, search and query on the tag in App Analytics by clicking on the tag to add it as a [facet][19]. Once this is done, the value of this tag is stored for all new traces and can be used in the search bar, facet panel, and trace graph query.

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:50%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/apm/
[2]: /developers/faq/data-collection-resolution-retention
[3]: /tracing/setup
[4]: /tracing/visualization/services_list
[5]: /tracing/visualization/services_map
[6]: /tracing/visualization/service
[7]: /tracing/visualization/resource
[8]: /tracing/opentracing/?tab=java#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /tracing/manual_instrumentation
[10]: /tracing/opentracing
[11]: /tracing/connect_logs_and_traces
[12]: /tracing/guide/adding_metadata_to_spans
[13]: /tracing/runtime_metrics
[14]: /tracing/app_analytics
[15]: https://app.datadoghq.com/metric/summary
[16]: https://app.datadoghq.com/monitors#/create
[17]: /tracing/app_analytics/#automatic-configuration
[18]: /tracing/app_analytics/#configure-additional-services-optional
[19]: /tracing/app_analytics/search/#facets
