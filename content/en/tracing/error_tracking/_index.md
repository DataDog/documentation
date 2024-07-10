---
title: Error Tracking for Backend Services
description: Learn how to search and manage errors collected from your backend services.
further_reading:
- link: "https://www.datadoghq.com/blog/service-page/"
  tag: "Blog"
  text: "Explore a centralized view into service telemetry, Error Tracking, SLOs, and more"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentation"
  text: "Learn about the Trace Explorer"
- link: "/tracing/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "/monitors/types/error_tracking/"
  tag: "Documentation"
  text: "Create an Error Tracking monitor"
algolia:
  tags: ['error tracking']
---

## Overview

{{< img src="error_tracking/error-tracking-overview.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Setup

Error Tracking is available for all the languages supported by APM and does not require using a different SDK.

Optionally, to see code snippets in your stack traces, set up the [GitHub integration][4].

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="An inline code snippet in a stack trace" style="width:70%;" >}}

To get started with configuring your repository, see the [Source Code Integration documentation][6].

## Use span tags to track error spans

The Datadog tracers collect errors through integrations and the manual instrumentation of your backend services' source code. Error spans within a trace are processed by Error Tracking **if the error is located in a service entry span** (the uppermost service span). This span must also contain the `error.stack`, `error.message`, and `error.type` [span tags][1] to be tracked.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph with errors" style="width:100%;" >}}

Error Tracking computes a fingerprint for each error span it processes using the error type, the error message, and the frames that form the stack trace. Errors with the same fingerprint are grouped together and belong to the same issue. For more information, see the [Trace Explorer documentation][2].

## Examine issues to start troubleshooting or debugging

Error Tracking automatically categorizes errors into issues collected from your backend services in the [Error Tracking Explorer][5]. See the [Error Tracking Explorer documentation][3] for a tour of key features.

Issues created from APM include the distribution of impacted spans, the latest most relevant stack trace, span tags, host tags, container tags, and metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace/?tab=spantags#more-information
[2]: /tracing/trace_explorer/trace_view/?tab=spantags
[3]: /tracing/error_tracking/explorer
[4]: /tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /integrations/guide/source-code-integration