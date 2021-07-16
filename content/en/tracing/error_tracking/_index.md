---
title: Error Tracking
kind: documentation
further_reading:
- link: "/tracing/error_tracking/explorer"
  tag: "Documentation"
  text: "Error Tracking Explorer"
- link: "https://app.datadoghq.com/apm/error-tracking"
  tag: "UI"
  text: "Error tracking"
---

{{< img src="real_user_monitoring/error_tracking/page.png" alt="Error Tracking Page"  >}}

## What is error tracking?

Datadog collects a lot of errors. It's critical to your system's health to monitor these errors, but there can be so many individual error events that it’s hard to identify which ones matter the most and should be fixed first. Error Tracking makes it easier to monitor these errors by:

- __Grouping similar errors into issues__ to reduce the noise and help identify the most important ones.
- __Following issues over time__ to know when they first started, if they are still ongoing, and how often they are occurring.
- __Getting all the context needed in one place__ to facilitate troubleshooting the issue.

## How does it work?

The Datadog tracers are collecting errors through existing integrations and manual instrumentation of the source code. The different error spans within a trace are processed by Error Tracking __whenever they are located in the uppermost service span__ (also called service entry span).

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flamegraph with errors"  >}}

Error Tracking computes a fingerprint for each individual error span it processes using the error type, the error message as well as the different frames forming the stack trace. Errors with the same fingerprint are grouped together and belong to the same issue.

<div class="alert alert-info">Error Tracking is available for all the different languages supported by APM and does not require using a different SDK.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
