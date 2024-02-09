---
title: Error Tracking
kind: documentation
disable_toc: false
---

{{< img src="error_tracking/error-tracking-overview.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

## Overview

It is critical for your system's health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. By tracking, triaging, and debugging logs, you can minimize the impact of fatal errors on your browser, mobile, and backend services.

Error Tracking enables you to:

- Set monitors on error tracking events such as high error volumes or new issues introduced.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

Additional features are available depending on the source of the error. See [supported error sources](#supported-error-sources).

## Getting started

- Take a tour of key Error Tracking features in the [Error Tracking Explorer][5] documentation.
- Use the product-specific links in the next section to set up Error Tracking for a particular error source.

## Supported error sources

Error Tracking can ingest errors from APM, Logs, and Real User Monitoring. Additional features are available depending on the source of the error. For example, in errors originating from an APM trace, the [Execution Replay][4] feature automatically captures production variable values. 

For details, see the product-specific Error Tracking documentation:

- [APM][1]
- [Logs][2]
- [Real User Monitoring][3]

[1]: /tracing/error_tracking
[2]: /logs/error_tracking
[3]: /real_user_monitoring/error_tracking
[4]: /tracing/error_tracking/execution_replay
[5]: /error_tracking/explorer