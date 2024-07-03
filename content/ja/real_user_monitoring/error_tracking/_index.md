---
algolia:
  tags:
  - error tracking
description: Learn how to search and manage errors collected from your web and mobile
  applications.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Make sense of application issues with Datadog Error Tracking
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: Blog
  text: Debug iOS crashes efficiently with Datadog RUM
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: How Datadog's Technical Solutions team uses RUM, Session Replay, and Error
    Tracking to resolve customer issues
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Track and triage errors in your logs with Datadog Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Learn about the Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentation
  text: Create an Error Tracking monitor
kind: documentation
title: Error Tracking for Web and Mobile Applications
---

## Overview

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Issues from RUM errors include the stack trace, user session timelines, and metadata—including user location, version, and any custom attributes you included in your crash reports.

Take a tour of key Error Tracking features in the [Error Tracking Explorer][3] documentation. To view the Error Tracking Explorer for RUM, navigate to [**Digital Experience** > **Error Tracking**][1].

## セットアップ

{{< whatsnext desc="To get started with Datadog Error Tracking for RUM, see the corresponding documentation:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ja/real_user_monitoring/
[3]: /ja/error_tracking/explorer