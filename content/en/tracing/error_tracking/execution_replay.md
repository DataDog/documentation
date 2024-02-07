---
title: Error Tracking Execution Replay
kind: documentation
is_beta: true
description: Learn about Execution Replay in Error Tracking.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
aliases:
  - /tracing/error_tracking/executional_context
---

<div class="alert alert-info">
Execution Replay for APM Error Tracking is in beta.
</div>

## Overview

Execution Replay in APM Error Tracking automatically captures production variable values so you can reproduce exceptions from Error Tracking issues.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Error Tracking Explorer Execution Replay" style="width:90%" >}}

## Requirements
Supported languages
: Python

- Your Datadog Agent must be configured for APM.
- Your application must be instrumented with `ddtrace`.

Executional Replay is only available in APM Error Tracking. Error Tracking for Logs and RUM is not supported.

## Setup

1. Install or upgrade your Agent to version `7.44.0` or higher.
2. Ensure that you are using `ddtrace` version `1.16.0` or higher.
3. Set the `DD_EXCEPTION_DEBUGGING_ENABLED` environment variable to `true` to run your service with Error Tracking Executional Replay enabled.

### Hiding sensitive data

By default, variable data linked to specific identifiers deemed sensitive, such as `password` and `accessToken`, is automatically redacted. See the full [list of redacted identifiers][1].

You can also scrub variable data for PII by:
- [Creating custom identifier redaction][2].
- [Redacting based on specific classes or types][3].
- Creating a [Sensitive Data Scanner][4] rule and apply it to Logs that match the query `dd_source:debugger`.

Learn more about how you can scrub variable data [here][5].

## Getting started

1. Navigate to [**APM** > **Error Tracking**][6].
2. Click into any Python Error Tracking issue and scroll down to the stack trace component.
3. Expand stack frames to examine captured variable values.

## Troubleshooting

### A specific Python error trace does not have variable values
To keep the performance overhead of the feature at a minimum, error capturing is rate limited: one error per second includes variable data. If you don't see variable values on a given trace:

1. Click **View Similar Errors**.
2. Expand the time range selection to find another instance of the exception where variable values were captured.

[1]: https://github.com/DataDog/dd-trace-py/blob/2bd8e73b639af811cee2703198aa9e7e32b2f74e/ddtrace/debugging/_redaction.py
[2]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[3]: /dynamic_instrumentation/sensitive-data-scrubbing/#redact-based-on-specific-classes-or-types
[4]: /sensitive_data_scanner/
[5]: /dynamic_instrumentation/sensitive-data-scrubbing/
[6]: https://app.datadoghq.com/apm/error-tracking

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
