---
title: APM and Distributed Tracing
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=4"
  tag: "Learning Center"
  text: "Introduction to Application Performance Monitoring"
aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
---

{{< vimeo 203196972 >}}

## What is APM?

Datadog APM provides you with deep insight into your application's performance-from automatically generated dashboards monitoring key metrics, such as request volume and latency, to detailed traces of individual requests-side by side with your logs and infrastructure monitoring.

Datadog APM is offered as an upgrade to the Pro and Enterprise plans. A free 14-day trial is available. Registered users can visit the [APM page of the Datadog application][1] to get started.

{{< whatsnext desc="Get started with Datadog APM">}}
    {{< nextlink href="/agent/apm" >}} 1 - Configure your Agent to collect your Application Traces{{< /nextlink >}}
    {{< nextlink href="/tracing/languages" >}}2 - Set up your Application to send traces to your Datadog Agent{{< /nextlink >}}
    {{< nextlink href="/tracing/visualization" >}} 3 - Visualize services, resources, and traces in Datadog {{< /nextlink >}}
    {{< nextlink href="/tracing/getting_further" >}}4 - Learn more about Datadog APM product specificities{{< /nextlink >}}
    {{< nextlink href="https://datadoghq.slack.com/messages/apm" >}}5 - Join the APM channel in the Public Datadog Slack for additional help from Datadog staff{{< /nextlink >}}
{{< /whatsnext >}}

## Terminology

| Term          | Definition                                                          | Note                                                                                                                                             |
| :----         | :-----                                                              | :---                                                                                                                                             |
| [Service][1]  | Name of a set of processes that do the same job                     | Services are displayed on the [Datadog Services list][2] and have [out of the box performances graphs][3].                                       |
| [Resource][4] | Particular action for a service                                     | Resources are available on the [Resources list for each service][5] and have [out of the box performances graphs][6]                             |
| [Trace][7]    | Representation of a request as it flows across a distributed system | A trace can be collected in [any language][8]. Traces are found in the [Traces list for each resources][9] or in the [Trace search directly][10] |
| [Span][11]    | A logical unit of work in the system                                | Spans are associated with a [service][1] and optionally a [resource][4]. Each span consists of a start time, a duration, and optional tags.      |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/home
[2]: /tracing/visualization/services_list
[3]: /tracing/visualization/service/#out-of-the-box-graphs
[4]: /tracing/visualization/resource
[5]: /tracing/visualization/service/#resources
[6]: /tracing/visualization/resource/#out-of-the-box-graphs
[7]: /tracing/visualization/trace
[8]: /tracing/setup
[9]: /tracing/visualization/resource/#traces
[10]: /tracing/trace_search_and_analytics/search
[11]: /tracing/visualization/trace/#spans
