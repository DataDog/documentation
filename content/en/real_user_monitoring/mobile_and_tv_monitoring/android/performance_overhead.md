---
title: Performance overhead
description: Learn about how SDK impacts performance of your application.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/performance_overhead/android
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: dd-sdk-android Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Performance overhead measurements

You can read the following pages with detailed explanation of how we measure performance overhead of the SDK: [Android][1], [iOS][2].

## Continuous benchmarks

We also have an internal infrastructure of continuous benchmarking. There is an internal set of ui tests that run on a special benchmark application for every change made to the sdk. This way we are able to detect performance regression early and don't allow the corresponding changes to be included in the following release.

You can find the source code of the benchmark app here: [Android][3], [iOS][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md
[2]: https://github.com/DataDog/dd-sdk-ios/blob/develop/docs/session_replay_performance.md
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample/benchmark
[4]: https://github.com/DataDog/dd-sdk-ios/tree/develop/BenchmarkTests
