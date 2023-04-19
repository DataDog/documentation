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
    - link: 'profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'profiler/profiler_troubleshooting/go'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/go/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

The Datadog Profiler requires Go 1.12+.

For [Code Hotspots][12] and [Endpoint Profiling][13], use Go version 1.18+ and `dd-trace-go` version 1.37.0+.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your agent to version [7.20.2][2]+ or [6.20.2][3]+.

2. Get `dd-trace-go` using the command:

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Note**: Profiler is available in the `dd-trace-go` library for versions 1.23.0+.

3. Import the [profiler][4] at the start of your application:

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

4. After a minute or two, visualize your profiles in the [Datadog APM > Profiler page][5].

**Note**: By default only the CPU and Heap profile are enabled. Use [profiler.WithProfileTypes][6] to enable additional [profile types][7].

## Configuration

You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][8] name, for example `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][9] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | List of strings        | A list of tags to apply to an uploaded profile. Tags must be of the format `<KEY>:<VALUE>`. |

Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | String        | The [environment][8] name, for example: `production`. |
| `DD_SERVICE`                                     | String        | The [service][8] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][8] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

### Showing C function calls in CPU profiles

By default, Go's CPU profiler only shows detailed information for Go code. If your program calls C code, the time spent running C code is reflected in the profile, but the call stacks only show Go function calls.

To add detailed C function call information to CPU profiles, you may opt to use library such as [ianlancetaylor/cgosymbolizer][10]. To use this library:

1. Download the package:

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. Add the following import anywhere in your program:

    ```Go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

**Note**: This library is considered experimental. It can cause (infrequent) deadlocks in programs that use C++ exceptions, or that use libraries such as `tcmalloc`, which also collect call stacks.

## Not sure what to do next?

The [Getting Started with Profiler][9] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[5]: https://app.datadoghq.com/profiling
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[8]: /getting_started/tagging/unified_service_tagging
[9]: /getting_started/profiler/
[10]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
