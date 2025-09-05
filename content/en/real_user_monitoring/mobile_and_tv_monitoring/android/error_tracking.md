---
title: Android Crash Reporting and Error Tracking
description: Set up Error Tracking for your Android applications.
aliases:
    - /real_user_monitoring/error_tracking/android
    - /real_user_monitoring/error_tracking/mobile/android
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'

---

## Overview

Error Tracking processes errors collected from the Android SDK. 

Enable Android Crash Reporting and Error Tracking to get comprehensive crash reports and error trends. With this feature, you can access:

- Aggregated Android crash dashboards and attributes
- Deobfuscated Android crash reports
- Trend analysis with Android error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Android SDK yet, follow the [in-app setup instructions][2] or see the [Android Crash Reporting and Error Tracking setup documentation][3].

### Add NDK crash reporting

If your Android app uses native code (C/C++) through the Android NDK (Native Development Kit), you can track crashes that occur in this native code. Native code is often used for performance-critical operations, image processing, or when reusing existing C/C++ libraries.

Learn how to [add NDK crash reporting][6].

### Add ANR reporting

An "Application Not Responding" ([ANR][6]) is an Android-specific type of error that gets triggered when the application is unresponsive for too long.

Learn how to [add ANR reporting][7].

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. 

Learn how to [get deobfuscated stack traces][8].

## Test your implementation

Learn how to verify your Android Crash Reporting and Error Tracking configuration in [Test your implementation][9].

## Limitations

To review limitations of Crash Reporting for the Android SDK, see [Error Tracking Limitations][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /error_tracking/frontend/mobile/android
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tabs=kotlin#initialization-parameters
[6]: /error_tracking/frontend/mobile/android/#step-5---add-ndk-crash-reporting
[7]: /error_tracking/frontend/mobile/android/#step-6---add-anr-reporting
[8]:/error_tracking/frontend/mobile/android/#get-deobfuscated-stack-traces
[9]: /error_tracking/frontend/mobile/android/#test-your-implementation
[10]: /error_tracking/frontend/mobile/android/#limitations