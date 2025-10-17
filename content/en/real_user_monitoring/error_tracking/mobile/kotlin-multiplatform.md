---
title: Kotlin Multiplatform Crash Reporting and Error Tracking
description: Set up Error Tracking for your Kotlin Multiplatform applications.
aliases:
    - /real_user_monitoring/error_tracking/kotlin-multiplatform
    - /real_user_monitoring/error_tracking/kotlin_multiplatform
    - /error_tracking/frontend/mobile/kotlin_multiplatform/
type: multi-code-lang
code_lang: kotlin-multiplatform
code_lang_weight: 50
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'

---

## Overview

Error Tracking processes errors collected from the Kotlin Multiplatform SDK. 

Enable Kotlin Multiplatform Crash Reporting and Error Tracking to get comprehensive crash reports and error trends. With this feature, you can access:

- Aggregated Kotlin Multiplatform crash dashboards and attributes
- Deobfuscated Kotlin Multiplatform (iOS and Android) crash reports
- Trend analysis with Kotlin Multiplatform error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Kotlin Multiplatform SDK yet, follow the [in-app setup instructions][2] or see the [Kotlin Multiplatform setup documentation][3]. Then, follow the steps in the [Error Tracking documentation to enable Kotlin Crash Reporting and Error Tracking][4].

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup
[4]: /error_tracking/frontend/mobile/kotlin-multiplatform
