---
title: APM Error Tracking
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

The Datadog tracers are collecting errors through existing integrations and manual instrumentation of the source code. The different error spans contained in a trace are processed by Error Tracking whenever they are located in the uppermost service span (also called service entry span) because this is the span better describing the outcome of a given request to the service.

{{< img src="tracking/error_tracking/flamegraph_with_errors.png" alt="Flamegraph with errors"  >}}

Those errors are then grouped into issues thanks to our fingerprinting algorithm which is based on the `Error Type`, the `Error Message` as well as on the different frames forming the stack trace.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
