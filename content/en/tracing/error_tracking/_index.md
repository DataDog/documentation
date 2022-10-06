---
title: Error Tracking For Backend Services
kind: documentation
description: Learn how to search and manage errors collected from your backend services.
further_reading:
- link: "https://www.datadoghq.com/blog/service-page/"
  tag: "Blog"
  text: "Explore a centralized view into service telemetry, Error Tracking, SLOs, and more"
- link: "/tracing/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Learn about the Trace Explorer"
---

## Overview

Datadog collects a lot of errors, and it is critical for your system's health to consistently monitor these errors. When there are so many individual error events, it becomes hard to identify which ones matter the most and which ones should be fixed first. By tracking, triaging, and debugging errors, you can minimize the impact of fatal errors on your backend services.

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="The Error Tracking Explorer for APM displaying issues from your backend services" style="width:100%;" >}}

## Use span tags to track error spans

<div class="alert alert-info">Error Tracking is available for all the languages supported by APM and does not require using a different SDK.</div>

The Datadog tracers collect errors through integrations and the manual instrumentation of your backend services' source code. Error spans within a trace are processed by Error Tracking **when they are located in the uppermost service span**, are called the _service entry span_. In order to be tracked, the span must contain the `error.stack`, `error.message`, and `error.fingerprint` [span tags][1].

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph with errors" style="width:90%;" >}}

Error Tracking computes a fingerprint for each error span it processes using the error type, the error message, and the frames that form the stack trace. Errors with the same fingerprint are grouped together and belong to the same issue. For more information, see the [Trace Explorer documentation][2].

## Examine issues to start troubleshooting or debugging

Error Tracking automatically categorizes errors into issues collected from your backend services in the [Error Tracking Explorer][1]. 

Click on an issue to see a summary of the error, the distribution of impacted spans, the latest most relevant stack trace, span tags, host tags, container tags, and metrics.

You can set alerts on Error Tracking events to stay on top of fatal issues that may occur, along with the following actions:

- **Grouping similar errors into issues** to turn this noisy flow of errors into a small list of manageable issues.
- **Following issues over time** to show when they first started, if they are ongoing, and how often they are occurring, which helps you identify the most important ones.
- **Getting all the context in one place** to facilitate troubleshooting.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace/?tab=spantags#more-information
[2]: /tracing/trace_explorer/trace_view/?tab=spantags
