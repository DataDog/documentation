---
title: Error Tracking for Web and Mobile Applications
kind: documentation
description: Learn how to search and manage errors collected from your web and mobile applications.
further_reading:
- link: "https://www.datadoghq.com/blog/error-tracking/"
  tag: "Blog"
  text: "Make sense of application issues with Datadog Error Tracking"
- link: "https://www.datadoghq.com/blog/ios-crash-reporting-datadog"
  tag: "Blog"
  text: "Debug iOS crashes efficiently with Datadog RUM"
- link: "https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/"
  tag: "Blog"
  text: "How Datadog's Technical Solutions team uses RUM, Session Replay, and Error Tracking to resolve customer issues"
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "https://www.datadoghq.com/blog/error-tracking-logs/"
  tag: "Blog"
  text: "Track and triage errors in your logs with Datadog Error Tracking"
---

## Overview

It is critical for your system's health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting. By tracking, triaging, and debugging crashes, you can minimize the impact of fatal errors on your web and mobile applications' user experience.

{{< img src="real_user_monitoring/error_tracking/page.png" alt="The Error Tracking Explorer for RUM displaying issues from your web and mobile application's crash reports" style="width:100%;" >}}

Error Tracking enables you to:

- Set alerts on Error Tracking events. This helps you to remain informed of fatal issues that may occur.
- Group similar errors into issues, so that you can more easily identify important errors and reduce noise.
- Follow issues over time to know when they first started, if they are still ongoing, and how often they are occurring.
- Collect all the necessary context in one place to facilitate troubleshooting.

## Upload crash reports

{{< whatsnext desc="To get started with Datadog Error Tracking for RUM, see the corresponding documentation to upload source maps for your framework:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
{{< /whatsnext >}}

## Examine issues to start troubleshooting or debugging

Error Tracking automatically categorizes crashes collected from your web and mobile applications into issues in the [Error Tracking Explorer][1]. 

Click on an issue to view debugging information, such as the stack trace, user session timelines, and metadata—including user location, version, and any custom attributes you included in your crash reports. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
