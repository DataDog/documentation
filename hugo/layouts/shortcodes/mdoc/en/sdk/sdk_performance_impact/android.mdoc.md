<!--
This partial contains SDK performance impact content for the Android SDK.
-->

Use these benchmarks to evaluate the SDK's impact on your application's CPU, memory, startup time, and size.

### Performance impact benchmarks

To simulate the typical usage of the Datadog SDK, it was integrated into the [Docile-Alligator/Infinity-For-Reddit][1] application and typical user behavior (scrolling the feed, browsing subreddits) was simulated.

The following SDK modules were added to the application:

* `dd-sdk-android-logs`
* `dd-sdk-android-trace`
* `dd-sdk-android-rum`
* `dd-sdk-android-okhttp`
* `dd-sdk-android-glide`

The SDK was set up with default settings.

The following table shows the results.

| Measurement       | with SDK                       | without SDK    |
|-------------------|---------------------------------|----------------|
| Peak CPU Usage    | 26.8%                          | 25.2%          |
| Peak Memory Usage | 432.6 MB                       | 437 MB         |
| App startup time  | 243 ms                         | 228.8 ms       |
| Apk size          | 11566506 bytes                 | 11044045 bytes |
| Network usage     | 72.5 KB sent, 22.9 KB received | n/a            |

For details on these benchmarks, see the [SDK performance documentation][2].

### Continuous benchmarks

Datadog has an internal infrastructure of continuous benchmarking. There is an internal set of UI tests that run on a special benchmark application for every change made to the SDK. This way Datadog is able to detect performance regression early and prevent them from reaching production releases.

See the [benchmark app source code][3].

[1]: https://github.com/Docile-Alligator/Infinity-For-Reddit
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample/benchmark
