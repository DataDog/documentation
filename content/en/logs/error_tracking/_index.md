---
title: Error Tracking for Logs
kind: documentation
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

{{< callout btn_hidden="true" >}}
  Error Tracking for Logs is in beta.

  Billing begins in March 2024. The pricing plan starts at $0.25 per 1k error events, per month.
{{< /callout >}} 

## Overview

It is critical for your system's health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. By tracking, triaging, and debugging logs, you can minimize the impact of fatal errors on your browser, mobile, and backend services.

Once you have set up [Logs][2] for **Browser and Mobile** or **Backend** error tracking, the issue list populates with cards. Navigate to [**Logs** > **Error Tracking**][1] to view open, ignored, or all issues, sort issues by volume or age, and filter issues by all custom and default facets on your logs.

{{< img src="logs/error_tracking/homepage.png" alt="The Error Tracking Explorer for Logs displaying Java issues" style="width:100%;" >}}

Error Tracking enables you to:

- Set monitors on error tracking events such as high error volumes or new issues introduced.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

## Setup

Error Tracking for Logs processes properly configured error logs with stack traces.

{{< whatsnext desc="To get started with Datadog Error Tracking for Logs, see the corresponding documentation for your framework:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Browser and Mobile{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Investigate issues and start triaging

An *issue* is a grouping of any number of errors based on a fingerprinting algorithm that groups certain error logs with required attributes like a stack trace.

{{< img src="logs/error_tracking/sidepanel.png" alt="A sidepanel consisting of details of a log error" style="width:100%;" >}}

Click on an issue to see seasonality patterns, a stack trace, and the error's distribution across `env` and `version` tags. The issue panel displays the first and last versions impacted with timestamps. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: /logs/log_collection
