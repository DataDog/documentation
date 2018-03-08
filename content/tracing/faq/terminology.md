---
title: Terminology
kind: faq
---

|Term|Definition|Note|
|:----|:-----|:---|
|[Service](/tracing/visualization/service)|Name of a set of processes that do the same job| Services are displayed on the [Datadog Services list](/tracing/visualization/services_list/) and have [out of the box performances graphs](/tracing/visualization/service/#out-of-the-box-graphs).|
|[Resource](/tracing/visualization/resource)|Particular action for a service|Resources are available on the [Resources list for each service](/tracing/visualization/service/#resources) and have [out of the box performances graphs](/tracing/visualization/resource/#out-of-the-box-graphs)|
|[Trace](/tracing/visualization/trace)|Representation of a request as it flows across a distributed system| A trace can be collected in [any language](/tracing/setup). Traces are found in the [Traces list for each resources](/tracing/visualization/resource/#traces) or in the [Trace search directly](/tracing/visualization/trace_search/)|
|[Span](/tracing/visualization/trace/#spans) |A logical unit of work in the system| Spans are associated with a [Service](/tracing/visualization/service) and optionally a [Resource](/tracing/visualization/resource). Each span consists of a start time, a duration, and optional tags.|