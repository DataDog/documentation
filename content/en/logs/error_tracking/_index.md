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

It is critical for your system’s health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. [Error Tracking for Logs](https://app.datadoghq.com/logs/error-tracking) intelligently groups error logs into Issues that help you understand and triage errors by cutting through noise. It reduces thousands to millions of raw data points to a few issues rich with diagnostic data like a stack trace, error distributions, and code snippets that help you understand the underlying bug’s root cause.

**Error Tracking can easily be enabled in-app with just a few clicks. Start by navigating to the Error Tracking item in the Logs menu.**

Once you have setup logs for *Browser and Mobile* or *Backend* error tracking, the issue List will populate with cards like the `java.lang.ArithmeticException` issue below. You can choose to sort by volume, age, and filter by all custom and default facets on your logs.

{{< img src="logs/error_tracking/homepage.png" alt="The Error Tracking Explorer for Logs displaying Java issues" style="width:100%;" >}}

Error Tracking enables you to:

- Set monitors on error tracking events, like high error volumes or new issues introduced.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

Error Tracking for Logs processes properly configured error logs with stack traces.

## Setup

{{< whatsnext desc="To get started with Datadog Error Tracking for Logs, see the corresponding documentation for your framework:" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}Browser and Mobile{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}Backend{{< /nextlink >}}
{{< /whatsnext >}}

## Investigate issues and to start triaging

An *issue* is a grouping of any number of errors based on a fingerprinting algorithm that groups certain error logs with required attributes (like a stack trace).

{{< img src="logs/error_tracking/sidepanel.png" alt="A sidepanel consisting of details of a log error" style="width:100%;" >}}


Click on an issue to see seasonality patterns, a stack trace, and the error’s distribution across `env` and `version` tags. The issue panel also displays the first and last versions impacted with timestamps. *This metadata lives beyond your standard log retention*. If errors grouped into this issue have different stacktraces, you can examine them by clicking Group Into Patterns.

To learn more about Error Tracking for Logs, read our beta launch [blog post][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: datadoghq.com/blog/error-tracking-logs/