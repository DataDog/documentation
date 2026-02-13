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

{{< img src="error_tracking/error-tracking-overview-2.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

## Setup

Error Tracking is available for all languages supported by APM. It requires no additional SDK and no configuration changes.

Optionally, to see code snippets in your stack traces, set up the [GitHub integration][4].

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="An inline code snippet in a stack trace" style="width:70%;" >}}

To get started with configuring your repository, see the [Source Code Integration documentation][6].

## Use span attributes to track error spans

The Datadog tracers collect errors through integrations and the manual instrumentation of your backend services' source code. An error span must contain the `error.stack`, `error.message`, and `error.type` [span attributes][1] and belong to a complete trace to be tracked. If an error is reported multiple times within a service, only the top-most error is kept.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph with errors" style="width:100%;" >}}

Error Tracking computes a fingerprint for each error span it processes using the error type, the error message, and the frames that form the stack trace. Errors with the same fingerprint are grouped together and belong to the same issue. For more information, see the [Trace Explorer documentation][2].

## Control which errors are tracked

Error Tracking automatically processes all error spans, but you can control which errors are ingested and how they are managed:

- **Filter errors with inclusion and exclusion rules**: Define rules to include or exclude errors based on attributes such as service, environment, or error type. See [Manage Data Collection][7].
- **Set rate limits**: Control the volume of errors ingested per day to manage costs. See [Manage Data Collection][7].
- **Exclude specific issues**: Mark recurring non-actionable issues as `EXCLUDED` to stop collecting them. See [Issue States][8].
- **Filter entire traces**: Prevent traces from being sent to Datadog (rather than filtering errors). See [Ignoring Unwanted Resources in APM][9].

## Examine issues to start troubleshooting or debugging

Error Tracking automatically categorizes errors into issues collected from your backend services in the [Error Tracking Explorer][5]. See the [Error Tracking Explorer documentation][3] for a tour of key features.

Issues created from APM include the distribution of impacted spans, the latest most relevant stack trace, span attributes, host tags, container tags, and metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace/?tab=spantags#more-information
[2]: /tracing/trace_explorer/trace_view/?tab=spantags
[3]: /tracing/error_tracking/explorer
[4]: /tracing
[5]: https://app.datadoghq.com/apm/error-tracking
[6]: /integrations/guide/source-code-integration
[7]: /error_tracking/manage_data_collection/
[8]: /error_tracking/issue_states/
[9]: /tracing/guide/ignoring_apm_resources/
