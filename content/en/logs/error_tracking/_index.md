---
title: Error Tracking for Logs
description: Learn about Error Tracking for Log Management.
is_beta: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: 'https://www.datadoghq.com/blog/error-tracking-logs/'
    tag: 'Blog'
    text: 'Track and triage errors in your logs with Datadog Error Tracking'
  - link: '/logs/error_tracking/explorer'
    tag: 'Documentation'
    text: 'Learn about the Error Tracking Explorer'
  - link: '/monitors/types/error_tracking/'
    tag: 'Documentation'
    text: 'Create an Error Tracking monitor'
---

## Overview

{{< img src="logs/error_tracking/logs-error-tracking-explorer.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Take a tour of key Error Tracking features in the [Error Tracking Explorer][3] documentation. To view the Error Tracking Explorer for Logs in Datadog, navigate to [**Logs** > **Error Tracking**][1].

## Setup

Error Tracking for Logs processes properly configured error logs with stack traces.

{{< whatsnext desc="To get started with Datadog Error Tracking for Logs, see the corresponding documentation for your framework:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Browser and Mobile{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: /logs/log_collection
[3]: /error_tracking/explorer
