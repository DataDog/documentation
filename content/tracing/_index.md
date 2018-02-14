---
title: APM (Tracing)
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/setup"
  tag: "Documentation"
  text: Instrument your code to send your first traces
- link: "/tracing/services"
  tag: "Documentation"
  text: Analyse your services
- link: "/tracing/product_specs/distributed_tracing"
  tag: "Documentation"
  text: "Getting started: Distributed tracing"
- link: "https://datadoghq.slack.com/messages/apm"
  tag: "Slack"
  text: "Join the APM channel in our Datadog Slack for additional help from Datadog staff "
---

## What is APM?

* Where do I find it in the product?

* Who has access to APM? 

Aggregate metrics for components of your application (latency of your web service, etc.)
This helps you get a sense of the overall health of your application performance

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available.
Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home) to get started.

## Data collected.

The Datadog APM product collects the following data:

### Service

Name of a set of processes that do the same job

Services are displayed on the [Datadog Services list](/tracing/services) and have [out of the box performances graphs](/tracing/services/service/#out-of-the-box-graphs)

### Resource

Particular action for a service

Resources are available on the [Resources list for each service](/tracing/services/service/#resources) and have [out of the box performances graphs](/tracing/services/resource/#out-of-the-box-graphs)

### Trace
A trace can be collected in [any language](/tracing/setup) it's a representation of a request as it flows across a distributed system. Datadog collects timings and metadata about network requests, database calls, microservice requests. Each trace consists of one or more spans.

Traces are found in the [Traces list for each resources](/tracing/services/resource/#traces) or in the [Trace search directly](/tracing/traces)

We use traces to find bottlenecks, errors and other trends in distributed systems.

We also collect statistics from the trace, and we can alert them on them, graph them, etc.

### Span 

A logical unit of work in the system*

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
