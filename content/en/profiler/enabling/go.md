---
title: Enabling the Go Profiler
kind: Documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/go'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/go/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][18].

The Datadog Profiler requires Go 1.19+.

For [Code Hotspots][2] and [Endpoint Profiling][3], use `dd-trace-go` version 1.37.0+.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][19].

2. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Note**: Profiler is available in the `dd-trace-go` library for versions 1.23.0+.

3. Import the [profiler][6] at the start of your application:

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. Add the following snippet to start the profiler:

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>", "<KEY2>:<VALUE2>"),
        profiler.WithProfileTypes(
          profiler.CPUProfile,
          profiler.HeapProfile,
          // The profiles below are disabled by default to keep overhead
          // low, but can be enabled as needed.

          // profiler.BlockProfile,
          // profiler.MutexProfile,
          // profiler.GoroutineProfile,
        ),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. Optional: Enable the [timeline feature][7] (beta), see [prerequisites][8].

5. Optional: Set up [Source Code Integration][9] to connect your profiling data with your Git repositories.

6. After a minute or two, visualize your profiles in the [Datadog APM > Profiler page][10].

**Note**: By default, only the CPU and Heap profiles are enabled. Use [profiler.WithProfileTypes][11] to enable additional [profile types][12].

## Configuration

You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][13] name, for example, `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][14] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | List of strings        | A list of tags to apply to an uploaded profile. Tags must be of the format `<KEY>:<VALUE>`. |

Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | String        | The [environment][13] name, for example, `production`. |
| `DD_SERVICE`                                     | String        | The [service][13] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][13] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

### Showing C function calls in CPU profiles

By default, Go's CPU profiler only shows detailed information for Go code. If your program calls C code, the time spent running C code is reflected in the profile, but the call stacks only show Go function calls.

To add detailed C function call information to CPU profiles, you may opt to use library such as [ianlancetaylor/cgosymbolizer][14]. To use this library:

1. Download the package:

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. Add the following import anywhere in your program:

    ```Go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

**Note**: This library is considered experimental. It can cause (infrequent) deadlocks in programs that use C++ exceptions, or that use libraries such as `tcmalloc`, which also collect call stacks.

## Save up to 14% CPU in production with PGO

Starting [Go 1.21][15], the Go compiler supports Profile-Guided Optimization (PGO). PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with Datadog Go Continuous Profiler and can be used for production builds.

Follow [this guide][16] to set it up.

## Not sure what to do next?

The [Getting Started with Profiler][17] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[3]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[7]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[8]: /profiler/connect_traces_and_profiles/#prerequisites
[9]: /integrations/guide/source-code-integration/?tab=go
[10]: https://app.datadoghq.com/profiling
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[13]: /getting_started/tagging/unified_service_tagging
[14]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
[15]: https://tip.golang.org/doc/go1.21
[16]: /profiler/guide/save-cpu-in-production-with-go-pgo
[17]: /getting_started/profiler/
[18]: /profiler/enabling/supported_versions/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
