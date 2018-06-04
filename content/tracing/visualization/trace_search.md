---
title: Traces List
kind: Documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

All traces collected by your Agents are listed in the [traces list page][1]:

{{< img src="tracing/traces/trace_search.png" alt="Trace search UI" responsive="true" popup="true">}}

## Trace time frame

Select the trace time frame you want to display with the time selector in the upper right corner.

{{< img src="tracing/traces/traces_time_selector.png" alt="Trace search UI" responsive="true" popup="true" style="width:40%;">}}

## Filtering traces

Filter your traces depending on:

* [Environment][2]
* [Primary Tag][4]
* Their [service name][3]
* Their duration

[1]: https://app.datadoghq.com/apm/search
[2]: /tracing/setup/first_class_dimensions#environment
[3]: /tracing/visualization/services_list/
[4]: /tracing/setup/first_class_dimensions#primary-tag
