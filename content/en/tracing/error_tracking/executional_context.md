---
title: Error Tracking Executional Context
kind: documentation
beta: true
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

Executional Context in APM Error Tracking automatically captures production variable values so you can easily reproduce exceptions from Error Tracking Issues.

*Note: We currently only support Executional Context for Python.*

{{< img src="tracing/error_tracking/error_tracking_executional_context.gif" alt="Error Tracking Explorer Executional Context" style="width:100%" >}}

## Setup & Requirements

This setup assumes that you have correctly configured the Datadog Agent for APM and are instrumented with `ddtrace`.

- Install or upgrade your Agent to version `7.44.0` or higher
- Ensure that you are using `ddtrace` version `1.16.0` or higher
- Set the `DD_EXCEPTION_DEBUGGING_ENABLED` environment variable to `true` to run your service with Error Tracking Executional Context enabled

## Getting Started
1. Navigate to **APM** > **Error Tracking**
2. Click into any Python Error Tracking Issue and scroll down to the stack trace component
3. Expand stack frames to examine captured variable values

{{< img src="tracing/error_tracking/error_tracking_executional_context.png" alt="Error Tracking Explorer Executional Context" style="width:80%" >}}

## FAQ
### What languages are supported? Which languages will be supported in the future?
Currently only Python is supported. We intend to release support for .NET and Java by early 2024.

### Will I see this in all Error Tracking Issues?
This feature is only available on Error Tracking for APM issues for Python. Error Tracking for Logs and RUM are not yet supported.

### I don’t see variable values for a Python Error in a specific Trace. What’s wrong?
To keep the performance overhead of the feature at a minimum, we use rate limiting such that not every error gets captured. If you don’t see variable values on a given trace, try clicking “View Similar Errors”, and expanding the time range selection to ensure you find another instance of the same exception where variable values were captured.

### What is the sampling rate on APM?
Currently, we limit the capturing of variable data to 1 error per second.

### Are variable values scrubbed for PII or other sensitive data?
We recommend using Sensitive Data Scanner to scrub the variable data for PII. To do that, create a Sensitive Data Scanner rule and apply it to Logs that match the query `dd_source:debugger`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
