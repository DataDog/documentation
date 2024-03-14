---
title: Error Tracking Executional Context
kind: documentation
is_beta: true
private: true
description: Learn about the Executional Context in Error Tracking.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Executional Context for APM Error Tracking is in private beta. To request access, contact Support at support@datadoghq.com.
{{< /beta-callout >}}

## Overview

Executional Context in APM Error Tracking automatically captures production variable values so you can reproduce exceptions from Error Tracking issues.

{{< img src="tracing/error_tracking/error_tracking_executional_context-2.png" alt="Error Tracking Explorer Executional Context" style="width:90%" >}}

## Requirements
Supported languages
: Python

- Your Datadog Agent must be configured for APM.
- Your application must be instrumented with `ddtrace`.

Executional Context is only available in APM Error Tracking. Error Tracking for Logs and RUM is not supported.

## Setup

1. Install or upgrade your Agent to version `7.44.0` or higher.
2. Ensure that you are using `ddtrace` version `1.16.0` or higher.
3. Set the `DD_EXCEPTION_DEBUGGING_ENABLED` environment variable to `true` to run your service with Error Tracking Executional Context enabled.

### Hiding sensitive data

To scrub variable data for PII, create a [Sensitive Data Scanner][1] rule and apply it to Logs that match the query `dd_source:debugger`.

## Getting started

1. Navigate to [**APM** > **Error Tracking**][2].
2. Click into any Python Error Tracking issue and scroll down to the stack trace component.
3. Expand stack frames to examine captured variable values.

## Troubleshooting

### A specific Python error trace does not have variable values
To keep the performance overhead of the feature at a minimum, error capturing is rate limited: one error per second includes variable data. If you don't see variable values on a given trace:

1. Click **View Similar Errors**.
2. Expand the time range selection to find another instance of the exception where variable values were captured.

[1]: /sensitive_data_scanner/
[2]: https://app.datadoghq.com/apm/error-tracking

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
