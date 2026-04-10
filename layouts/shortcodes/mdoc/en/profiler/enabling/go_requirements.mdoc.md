<!--
Requirements for Go profiler.
-->

The Datadog Profiler requires one of the latest two major Go releases. These are the major Go releases [supported by the Go project][1].

For the [Trace to Profiling integration][2] and [Endpoint Profiling][3], use `dd-trace-go` version 1.51.0+.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

[1]: https://go.dev/doc/devel/release
[2]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[3]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
