---
title: Error Tracking for Logs
kind: documentation
description: Learn about Error Tracking for Log Management.
is_beta: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: '/logs/error_tracking/explorer'
    tag: 'Documentation'
    text: 'Learn about the Error Tracking Explorer'
  - link: "https://www.datadoghq.com/blog/error-tracking-logs/"
    tag: "Blog"
    text: "Track and triage errors in your logs with Datadog Error Tracking"
---

{{< beta-callout btn_hidden="true" >}}
  Error Tracking for Logs is in beta.
{{< /beta-callout >}} 

## Overview

It is critical for your system’s health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. 

Once you have setup logs for **Browser and Mobile** or **Backend** error tracking, the issue list populates with cards. You can sort by volume or age, and filter by all custom and default facets on your logs.

{{< img src="logs/error_tracking/homepage.png" alt="The Error Tracking Explorer for Logs displaying Java issues" style="width:100%;" >}}

Error Tracking enables you to:

- Set monitors on error tracking events such as high error volumes or new issues introduced.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

## Setup

Error Tracking for Logs processes properly configured error logs with stack traces. To enable Error Tracking for Logs, navigate to [**Logs** > **Error Tracking**][1].

{{< whatsnext desc="To get started with Datadog Error Tracking for Logs, see the corresponding documentation for your framework:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Browser and Mobile{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Investigate issues and start triaging

An *issue* is a grouping of any number of errors based on a fingerprinting algorithm that groups certain error logs with required attributes like a stack trace.

{{< img src="logs/error_tracking/sidepanel.png" alt="A sidepanel consisting of details of a log error" style="width:100%;" >}}

Click on an issue to see seasonality patterns, a stack trace, and the error’s distribution across `env` and `version` tags. The issue panel displays the first and last versions impacted with timestamps. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
