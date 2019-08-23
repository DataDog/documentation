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
The APM UI provides many tools to troubleshoot application performance and correlate it throughout the product - making it easy to find and resolve anything slow or broken in highly distributed systems.  

| Concept               | Description             |
|-----------------------|-------------------------|
| [Service](#services)               | Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of scaling instances.                                                            |
| [Resource](#resources)              | Resources represent a particular domain of a customer application - they could typically be an instrumented web endpoint, database query, or background job.   |
| [Trace](#trace)                 | A trace is used to track the time spent by an application processing a single request and the status of this request, each trace consists of one or more spans.                                                          |
| [Span](#spans)                  | A span represents a logical unit of work in a distributed system for a given time period - and together spans construct a trace.                                                                                                    |
| [Trace metrics](#trace-metrics)         | Trace metrics will automatically be collected and kept at a 15 month retention similar to any other [Datadog metric][17]. They can be used to identify and alert on hits, errors or latency.                                                                                                    |
| [Trace Search & Analytics](#trace_search_and_analytics)                 | Trace Search & Analytics is used to filter APM Events by user-defined tags such as customer_id, error_type, or app_name or infrastructure tags to help troubleshoot and filter your requests.            |
| [APM Event](#apm-event)                 | APM Events represent 100% throughput of a request and can be used to search, query, and monitor in Trace Search & Analytics.             |
| [Span Tags](#span-tags)                | You can tag spans in the form of key-value pairs to correlate a request in the Trace View or to use to filter in Trace Search & Analytics.            |

## Services

After [instrumenting your application][1], the [Services List][2] will be your main landing page to get started with APM data. 

{{< img src="tracing/visualization/service_list.png" alt="service list" responsive="true">}}

Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of scaling instances. For example, a group of URL endpoints may be grouped together under an API service. Another example may be a group of DB queries that are grouped together within one database service. Yet another example may be a group of periodic jobs configured in the crond service. In the screenshot below - in this microservice distributed system for an e-commerce site builder, we have a `web-store`, `ad-server`, `payment-db`, `auth-service` all represented as services in APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" responsive="true">}} 

All services can be found in the [Service List][2] and visually represented on the [Service Map][3]. Each Service has its own [Service Page][4] where [trace metrics](#trace-metrics) like throughput, latency and error rates can be viewed and inspected. You can use these metrics for the service and create dashboard widgets, create monitors and see the performance of every resource such as a web endpoint or database query belonging to the service.

{{< img src="tracing/visualization/service_page.gif" alt="service page" responsive="true">}} 

<div class="alert alert-info">
Don’t see the http endpoints you were expecting on the Service Page? In APM, endpoints are connected to a service by more than the service name - it is also done via the `span.name` of the entry-point span of the trace. For example, on the web-store service above -  we’re viewing endpoints where `web.request` is the entry-point span. More info on this <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/"> here </a>.
</div>

## Resources

Resources represent a particular domain of a customer application - they could typically be an instrumented web endpoint, database query, or background job. For a web service, these resources can be dynamic web endpoints that are grouped by a static span name -  `web.request`. In a database service, these would be database queries with the span name `db.query`. For example the `web-store` service has automatically instrumented resources - web endpoints - which handle checkouts, updating_carts, add_item, etc. Each resource has its own [Resource Page][5] with [trace metrics](#trace-metrics) scoped to the specific endpoint. Trace metrics can be used like any other Datadog metric - they are exportable to a dashboard or can be used to create monitors. The Resource Page will also show the span summary widget with an aggregate view of [spans](#spans) for all [traces](#trace), latency distribution of requests, and then traces which show requests made to this endpoint.

{{< img src="tracing/visualization/resource_page.gif" alt="resource page" responsive="true">}} 

## Trace

A trace is used to track the time spent by an application processing a single request and the status of this request, each trace consists of one or more spans. During the lifetime of the request, we can see any distributed calls across services as a [trace-id will be injected/extracted through HTTP headers][6], along with [automatically instrumented libraries][1] and any [manual instrumentation][7] using open-source tools like [OpenTracing][8] in the flamegraph view. In the Trace View page - each trace collects information that allows it to be connected to other parts of the platform, including [connecting logs to traces][9], [adding tags to spans][10], and [collecting runtime metrics][11].

{{< img src="tracing/visualization/trace_view.png" alt="trace view" responsive="true">}} 

## Spans

A span represents a logical unit of work in the system for a given time period. Each span consists of a `span.name`, start time, duration, and [span tags](#tagging-spans). For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger request. Spans can be nested within each other, and in those instances will have a parent-child relationship. 

For the example below, the span `rack.request` is the entry-point span of the trace. This means the web-store service page is displaying resources that consist of traces with an entry-point span named `rack.request.` We can also see the tags that were added application side such as `merchant.name`, `merchant.tier`, etc. These user-defined tags can be used to search & analyze APM data in [Trace Search & Analytics][13].

{{< img src="tracing/visualization/span_with_metadata.png" alt="span" responsive="true">}} 

## Trace Metrics

Trace metrics will automatically be collected and kept at a 15 month retention similar to any other [Datadog metric][17]. They can be used to identify and alert on hits, errors or latency. Trace metrics are tagged by the host receiving traces along with the service or resource. As an example, after instrumenting a web service we can see the trace metrics that are being collected for the entry-point span `web.request` in the Metric Summary. 

{{< img src="tracing/visualization/trace_metrics.gif" alt="trace metrics" responsive="true">}} 

### Dashboard

Trace metrics can be exported to a dashboard directly from the Service or Resource page, and can also be queried directly in an existing dashboard.

{{< img src="tracing/visualization/trace_metric_dashboard.gif" alt="trace metrics dashboard" responsive="true">}} 

### Monitoring

Trace metrics can be used in a monitor - APM monitors can be set up on the [Service Page][4] or [Resource Page][5] with a set of suggested monitors to get started, or on the [New Monitors page][18].

{{< img src="tracing/visualization/trace_metric_monitor.gif" alt="trace metrics monitor" responsive="true">}} 


## Trace Search & Analytics

Trace Search & Analytics is used to filter [APM Events](#apm-event) by user-defined tags such as `customer_id`, `error_type`, or `app_name` or infrastructure tags to help troubleshoot and filter your requests. It allows deep exploration of the web requests flowing through your service along with being able to search, graph, and monitor on 100% throughput of hits, errors, and latency. This feature can be enabled with [automatic configuration][14].

{{< vimeo 278748711 >}}

## APM Event

APM Events represent 100% throughput of a request and can be used to search, query, and monitor in Trace Search & Analytics by the [tags](#span-tags) included on the span. After enabling Trace Search & Analytics, the tracing client will analyze an entry-point span for web services by default, with the ability to [configure additional services][19] in your application. For example, a java service with 100 requests will generate 100 APM Events from its `servlet.request` spans. In this example `web-store` service, after setting `DD_TRACE_ANALYTICS_ENABLED=true` now all `rack.request` spans will be analyzed and are available to use in Trace Search & Analytics. For this example, you can graph the top 10 merchants highest latency in the 99th percentile. `merchant_name` is a user defined tag that was applied to the span in the application.

{{< img src="tracing/visualization/analyzed_span.gif" alt="analyzed span" responsive="true">}} 


<div class="alert alert-info">
You can run an estimate on the number of APM Events that would be generated from your services <a href="https://app.datadoghq.com/apm/docs/trace-search?env=datad0g.com"> here </a>. After ingestion, you can also filter APM Events from 100% to a lower percentage on a service-by-service level, reducing billable APM Events
<a href="https://app.datadoghq.com/apm/settings?env=datad0g.com"> here </a>.  
</div>

## Span Tags

You can tag spans in the form of key-value pairs to correlate a request in the Trace View or to use to filter in Trace Search & Analytics. Tags can be either added to a single span or globally to all spans. On this request `merchant.store_name`, `merchant.tier`, etc. have been added as tags to the span.

{{< img src="tracing/visualization/span_tag.png" alt="span tag" responsive="true">}} 

To get started tagging spans in your application, check out our [walkthrough][15].

After a tag has been added to a span, to search and query on the tag in Trace Search & Analytics, click on it and add it as a [facet][16]. Once this is done, the value of this tag is stored for all new traces and can be used in the search bar, the Facet Panel, and in the Trace graph query.

{{< img src="tracing/trace_search_and_analytics/search/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:50%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/
[2]: /tracing/visualization/services_list
[3]: /tracing/visualization/services_map/
[4]: /tracing/visualization/service
[5]: /tracing/visualization/resource
[6]: /tracing/advanced/opentracing/?tab=java#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[7]: /tracing/advanced/manual_instrumentation
[8]: /tracing/advanced/opentracing
[9]: /tracing/advanced/connect_logs_and_traces/
[10]: /tracing/advanced/adding_metadata_to_spans
[11]: /tracing/advanced/runtime_metrics/
[12]: /tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
[13]: /tracing/trace_search_and_analytics
[14]: /tracing/trace_search_and_analytics/#automatic-configuration
[15]: /tracing/advanced/adding_metadata_to_spans/
[16]: /tracing/trace_search_and_analytics/search/#facets
[17]: /developers/faq/data-collection-resolution-retention/
[18]: https://app.datadoghq.com/monitors#/create
[19]: /tracing/trace_search_and_analytics/#configure-additional-services-optional
