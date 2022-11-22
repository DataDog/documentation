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
---

{{< beta-callout btn_hidden="true" >}}
  Error Tracking for Logs is in beta.
{{< /beta-callout >}} 

## Overview

It is critical for your system’s health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. By tracking, triaging, and debugging crashes, you can minimize the impact of fatal errors on your logs. 

{{< img src="logs/error_tracking/homepage.png" alt="The Error Tracking Explorer for Logs displaying issues from Python logs" style="width:100%;" >}}

Error Tracking enables you to:

- Set alerts on Error Tracking events. This helps you to remain informed of fatal issues that may occur.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

## Setup

{{< whatsnext desc="To get started with Datadog Error Tracking for Logs, see the corresponding documentation for your framework:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Browser and Mobile{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Examine issues to start troubleshooting or debugging

An *issue* is a grouping of any number of errors based on a fingerprinting algorithm that groups certain error logs based on required attributes (such as a stack trace). Error Tracking automatically categorizes crashes collected from your logs into issues in the [Error Tracking Explorer][1]. 

{{< img src="logs/error_tracking/sidepanel.png" alt="A sidepanel consisting of details of a log error" style="width:100%;" >}}

Click on an issue to view debugging information, such as the stack trace, log tags, and the distribution of errors for each `version`, `env`, and `source` tag. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/error_tracking/explorer