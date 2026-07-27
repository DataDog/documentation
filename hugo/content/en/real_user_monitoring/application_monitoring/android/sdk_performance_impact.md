---
title: SDK Performance Impact
description: Learn about how the SDK impacts performance of your application.
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/android/sdk_performance_impact
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

When integrating any SDK into your Android application, understanding its performance impact is crucial for maintaining a smooth user experience. The Datadog RUM SDK is designed with performance in mind and provides transparent measurements to help you make informed decisions.

## Performance impact benchmarks

To simulate the typical usage of the Datadog SDK, it was integrated into the [Docile-Alligator/Infinity-For-Reddit][3] application and typical user behavior (in other words, scrolling the feed, browsing subreddits) was simulated.

The following SDK modules were added to the application:

* `dd-sdk-android-logs`
* `dd-sdk-android-trace`
* `dd-sdk-android-rum`
* `dd-sdk-android-okhttp`
* `dd-sdk-android-glide`

The SDK was set up with default settings.

Below are the results of the measurements.

| Measurement       | with SDK                       | without SDK    |
|-------------------|--------------------------------|----------------|
| Peak CPU Usage    | 26.8%                          | 25.2%          |
| Peak Memory Usage | 432.6 MB                       | 437 MB         |
| App startup time  | 243 ms                         | 228.8 ms       |
| Apk size          | 11566506 bytes                 | 11044045 bytes |
| Network usage     | 72.5 KB sent, 22.9 KB received | n/a            |

You can read the following [page][1] for more details about these benchmarks.

## Continuous benchmarks

Datadog has an internal infrastructure of continuous benchmarking. There is an internal set of UI tests that run on a special benchmark application for every change made to the SDK. This way Datadog is able to detect performance regression early to ensure that they are prevented from reaching production releases.

See the [benchmark app source code][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample/benchmark
[3]: https://github.com/Docile-Alligator/Infinity-For-Reddit
