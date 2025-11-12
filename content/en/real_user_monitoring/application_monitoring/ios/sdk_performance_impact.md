---
title: SDK Performance Impact
description: Learn about how the SDK impacts performance of your application.
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/sdk_performance_impact
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: "Source Code"
  text: dd-sdk-ios Source code
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Real User Monitoring
---

## Overview

When integrating any SDK into your iOS application, understanding its performance impact is crucial for maintaining a smooth user experience. The Datadog RUM SDK is designed with performance in mind and provides transparent measurements to help you make informed decisions.

## Performance impact benchmarks

To simulate the typical usage of Datadog SDK, it was integrated into the [Beam][3] application and typical user behavior (scrolling the feed, browsing reddits) was simulated.

The SDK features that were used:
1. Basic RUM instrumentation for tracking views, actions, and resources
2. Logging
3. Tracing

Below are the results of the measurements.

| Measurement       | with SDK                        | without SDK |
|-------------------|---------------------------------|-------------|
| Peak CPU Usage    | 44%                             | 40%         |
| Peak Memory Usage | 72.4 MB                         | 67.96 MB    |
| App startup time  | 0.894 ms                        | 0.649 ms    |
| Bundle size       | 23.6 MB                         | 22.2 MB     |
| Network usage     | 21.88 KB sent, 1.68 KB received | n/a         |

See the [SDK performance details on GitHub][2] for more information.

## Continuous benchmarks

Datadog has an internal infrastructure of continuous benchmarking. UI tests run automatically on a benchmark application for every SDK change. This enables Datadog to detect performance regressions early to ensure that they are prevented from reaching production releases.

You can find the source code of the benchmark app [here][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/DataDog/dd-sdk-ios/blob/develop/docs/sdk_performance.md
[4]: https://github.com/DataDog/dd-sdk-ios/tree/develop/BenchmarkTests
[3]: https://github.com/awkward/beam
