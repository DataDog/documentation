<!--
This partial contains SDK performance impact content for the iOS SDK.
-->

Use these benchmarks to evaluate the SDK's impact on your application's CPU, memory, startup time, and size.

### Performance impact benchmarks

To simulate the typical usage of Datadog SDK, it was integrated into the [Beam][1] application and typical user behavior (scrolling the feed, browsing subreddits) was simulated.

The SDK features used:
1. Basic RUM instrumentation for tracking views, actions, and resources
2. Logging
3. Tracing

The following table shows the results.

| Measurement       | with SDK                        | without SDK |
|-------------------|---------------------------------|-------------|
| Peak CPU Usage    | 44%                             | 40%         |
| Peak Memory Usage | 72.4 MB                         | 67.96 MB    |
| App startup time  | 0.894 ms                        | 0.649 ms    |
| Bundle size       | 23.6 MB                         | 22.2 MB     |
| Network usage     | 21.88 KB sent, 1.68 KB received | n/a         |

For details on these benchmarks, see the [SDK performance documentation][2].

### Continuous benchmarks

Datadog has an internal infrastructure of continuous benchmarking. UI tests run automatically on a benchmark application for every SDK change. This enables Datadog to detect performance regressions early and prevent them from reaching production releases.

See the [benchmark app's source code on GitHub][3].

[1]: https://github.com/awkward/beam
[2]: https://github.com/DataDog/dd-sdk-ios/blob/develop/docs/sdk_performance.md
[3]: https://github.com/DataDog/dd-sdk-ios/tree/develop/BenchmarkTests
