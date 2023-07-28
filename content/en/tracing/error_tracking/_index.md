---
title: Error Tracking for Backend Services
kind: documentation
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

It is critical for your system's health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. By tracking, triaging, and debugging stack traces, you can minimize the impact of fatal errors on your backend services.

Once you have set up [APM][4] for **Backend Services** error tracking, the issue list populates with cards. Navigate to **APM** > **Error Tracking** to view open, ignored, or all issues, sort issues by volume or age, and filter issues by all custom and default facets on your backend services.

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="The Error Tracking Explorer for APM displaying issues from your backend services" style="width:100%;" >}}

Error Tracking enables you to:

- Set alerts on Error Tracking events. This helps you to remain informed of fatal issues that may occur.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.
- Access a trace in its source code repository, a Git blame, or a commit.

## Use span tags to track error spans

<div class="alert alert-info">Error Tracking is available for all the languages supported by APM and does not require using a different SDK.</div>

The Datadog tracers collect errors through integrations and the manual instrumentation of your backend services' source code. Error spans within a trace are processed by Error Tracking **if the error is located in a service entry span** (the uppermost service span). This span must also contain the `error.stack`, `error.message`, and `error.type` [span tags][1] to be tracked.

{{< img src="tracing/error_tracking/flamegraph_with_errors.png" alt="Flame graph with errors" style="width:100%;" >}}

Error Tracking computes a fingerprint for each error span it processes using the error type, the error message, and the frames that form the stack trace. Errors with the same fingerprint are grouped together and belong to the same issue. For more information, see the [Trace Explorer documentation][2].

## Examine issues to start troubleshooting or debugging

Error Tracking automatically categorizes errors into issues collected from your backend services in the [Error Tracking Explorer][3]. 

Click on an issue to see a summary of the error, the distribution of impacted spans, the latest most relevant stack trace, span tags, host tags, container tags, and metrics.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/trace/?tab=spantags#more-information
[2]: /tracing/trace_explorer/trace_view/?tab=spantags
[3]: /tracing/error_tracking/explorer
[4]: /tracing