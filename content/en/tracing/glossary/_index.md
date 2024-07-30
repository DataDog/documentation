---
title: APM Terms and Concepts
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
  - /tracing/visualization/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to set up APM tracing with your application"
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Discover and catalog the services reporting to Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Learn how to read a trace in Datadog"
- link: "/monitors/types/apm/"
  tag: "Documentation"
  text: "Learn about APM monitors"
---

{{< jqmath-vanilla >}}

## Overview

The APM UI provides many tools to troubleshoot application performance and correlate it throughout the product, enabling you to find and resolve issues in distributed systems.

For additional definitions and descriptions of important APM terms such as _spans_ and _indexed_, see the [main Glossary][22]. 

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Service](#services)            | Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of building your application.                                  |
| [Resource](#resources)          | Resources represent a particular domain of a customer application - they are typically an instrumented web endpoint, database query, or background job.                                                              |
| [Monitors][23]                   | APM metric monitors work like regular metric monitors, but with controls tailored specifically to APM. Use these monitors to receive alerts at the service level on hits, errors, and a variety of latency measures. |
| [Trace](#trace)                 | A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans.                                                             |
| [Trace Context Propagation](#trace-context-propagation)| The method of passing trace identifiers between services, enabling a Datadog to stitch together individual spans into a complete distributed trace. |
| [Retention Filters](#retention-filters) | Retention filters are tag-based controls set within the Datadog UI that determine what spans to index in Datadog for 15 days.                                                                                              |
| [Ingestion Controls](#ingestion-controls) | Ingestion controls are used to send up to 100% of traces to Datadog for live search and analytics for 15 minutes.
| [Instrumentation](#instrumentation) | Instrumentation is the process of adding code to your application to capture and report observability data. |

## Services

After [instrumenting your application][3], the [Service Catalog][4] is your main landing page for APM data.

{{< img src="tracing/visualization/service_catalog.png" alt="Service Catalog" >}}

Services are the building blocks of modern microservice architectures - broadly a service groups together endpoints, queries, or jobs for the purposes of scaling instances. Some examples:

* A group of URL endpoints may be grouped together under an API service.
* A group of DB queries that are grouped together within one database service.
* A group of periodic jobs configured in the crond service.

The screenshot below is a microservice distributed system for an e-commerce site builder. There's a `web-store`, `ad-server`, `payment-db`, and `auth-service` all represented as services in APM.

{{< img src="tracing/visualization/service_map.png" alt="service map" >}}

All services can be found in the [Service Catalog][4] and visually represented on the [Service Map][5]. Each service has its own [Service page][6] where [trace metrics](#trace-metrics) like throughput, latency, and error rates can be viewed and inspected. Use these metrics to create dashboard widgets, create monitors, and see the performance of every resource such as a web endpoint or database query belonging to the service.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="service page" >}}

<div class="alert alert-info">
Don't see the HTTP endpoints you were expecting on the Service page? In APM, endpoints are connected to a service by more than the service name. It is also done with the `span.name` of the entry-point span of the trace. For example, on the web-store service above, `web.request` is the entry-point span. More info on this <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">here</a>.
</div>

## Resources

Resources represent a particular domain of a customer application. They could typically be an instrumented web endpoint, database query, or background job. For a web service, these resources can be dynamic web endpoints that are grouped by a static span name -  `web.request`. In a database service, these would be database queries with the span name `db.query`. For example the `web-store` service has automatically instrumented resources - web endpoints - which handle checkouts, updating carts, adding items, and so on. A Resource name can be the HTTP method and the HTTP route, for example `GET /productpage` or `ShoppingCartController#checkout`. 

Each resource has its own [Resource page][7] with [trace metrics][15] scoped to the specific endpoint. Trace metrics can be used like any other Datadog metric - they are exportable to a dashboard or can be used to create monitors. The Resource page also shows the span summary widget with an aggregate view of [spans][21] for all [traces](#trace), latency distribution of requests, and traces which show requests made to this endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="resource page" >}}

## Trace

A trace is used to track the time spent by an application processing a request and the status of this request. Each trace consists of one or more spans. During the lifetime of the request, you can see distributed calls across services (because a [trace-id is injected/extracted through HTTP headers][8]), [automatically instrumented libraries][3], and [manual instrumentation][9] using open-source tools like [OpenTracing][10] in the flame graph view. In the Trace View page, each trace collects information that connects it to other parts of the platform, including [connecting logs to traces][11], [adding tags to spans][12], and [collecting runtime metrics][13].

{{< img src="tracing/visualization/trace_view.png" alt="trace view" >}}

## Trace context propagation

Trace context propagation is the method of passing trace identifiers between services in a distributed system. It enables Datadog to stitch together individual spans from different services into a single distributed trace. Trace context propagation works by injecting identifiers, such as the trace ID and parent span ID, into HTTP headers as the request flows through the system. The downstream service then extracts these identifiers and continues the trace. This allows the Datadog to reconstruct the full path of a request across multiple services.

For more information, see the [propagating the trace context][27] for your application's language.

## Retention filters

[Set tag-based filters][19] in the UI to index spans for 15 days for use with [Trace Search and Analytics][14].

## Ingestion controls

[Send 100% of traces][20] from your services to Datadog and combine with [tag-based retention filters](#retention-filters) to keep traces that matter for your business for 15 days.

## Instrumentation

Instrumentation is the process of adding code to your application to capture and report observability data to Datadog, such as traces, metrics, and logs. Datadog provides instrumentation libraries for various programming languages and frameworks.

You can automatically instrument your application when you install the Datadog Agent with [Single Step Instrumentation][24] or when you [manually add Datadog tracing libraries][25] to your code.

You can use custom instrumentation by embedding tracing code directly into your application code. This allows you to programmatically create, modify, or delete traces to send to Datadog.

To learn more, read [Application Instrumentation][26].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/guide/data-collection-resolution-retention/
[3]: /tracing/setup/
[4]: /tracing/service_catalog/
[5]: /tracing/services/services_map/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /tracing/manual_instrumentation/
[10]: /tracing/opentracing/
[11]: /tracing/other_telemetry/connect_logs_and_traces/
[12]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /tracing/metrics/runtime_metrics/
[14]: /tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /tracing/trace_explorer/query_syntax/#facets
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /tracing/trace_pipeline/ingestion_controls/
[21]: /glossary/#span
[22]: /glossary/
[23]: /monitors/types/apm/
[24]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /tracing/trace_collection/
[27]: /tracing/trace_collection/trace_context_propagation