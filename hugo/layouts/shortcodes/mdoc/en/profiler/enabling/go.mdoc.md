<!--
Go profiler setup — self-contained.
-->

The profiler is shipped within Datadog SDKs. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

The Datadog Profiler requires one of the latest two major Go releases. These are the major Go releases [supported by the Go project][4].

For the [Trace to Profiling integration][5] and [Endpoint Profiling][6], use `dd-trace-go` version 1.51.0+.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation
To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Install `dd-trace-go`:

    ```shell
    go get github.com/DataDog/dd-trace-go/v2/profiler
    ```

    {% alert %}
    If you are using v1 of the Go tracer,
    see the [migration guide][7]
    to upgrade to v2 and for all future updates and features.
    {% /alert %}

3. Import the [profiler][8] and start it in your application:

    ```go
    import "github.com/DataDog/dd-trace-go/v2/profiler"
    ```

    ```go
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

    Optional: Enable the [timeline feature][9], see [prerequisites][10].

4. Optional: Set up [Source Code Integration][11] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][12]. If they do not, see the [Troubleshooting][13] guide.

{% alert %}
By default, only the CPU and Heap profiles are enabled. Use [profiler.WithProfileTypes][14] and [profile types][15]. For legacy v1 documentation, view [profiler.WithProfileTypes][16] to enable additional [profile types][17].
{% /alert %}

If you automatically instrument your Go application with [Orchestrion][18], it adds the continuous profiler code to your application. To enable the profiler at runtime, set the environment variable `DD_PROFILING_ENABLED=true`.

### AI-assisted installation

Use the following prompt with a local AI coding agent to set up the Go profiler for your service. Copy and paste this prompt into your AI agent to get started.

```text
You are helping me set up Datadog Continuous Profiler for my Go service.

First, scan my project to auto-detect as much as possible. Look for:
- go.mod and go.sum to determine the Go version and whether dd-trace-go
  is already a dependency. Check whether it is v1
  (gopkg.in/DataDog/dd-trace-go.v1) or v2
  (github.com/DataDog/dd-trace-go/v2). If v1, note the exact version
  pinned in go.sum.
- The main package (main.go or cmd/ directory) to find the application
  entrypoint.
- Existing imports of the profiler or tracer packages to detect current
  APM or profiler usage.
- Dockerfile, docker-compose.yml, or Kubernetes manifests for startup
  commands and existing Datadog Agent configuration. Check whether the
  application targets a serverless platform (AWS Lambda, Cloud Functions)
  where Continuous Profiler is not supported.
- Existing environment variables or config files referencing DD_SERVICE,
  DD_ENV, DD_VERSION, or DD_PROFILING_ENABLED.
- Use of cgo (import "C" statements) that would benefit from
  cgosymbolizer.
- Orchestrion configuration (orchestrion.tool.go or go generate
  directives) for automatic instrumentation.

Present a summary of what you detected, then ask ONLY about what you
could not determine:
- DD_SERVICE, DD_ENV, and DD_VERSION values (if not already set).
- Datadog Agent deployment method (if no Agent config found in the
  project).
- Which extra profile types to enable beyond CPU and Heap
  (BlockProfile, MutexProfile, GoroutineProfile).
- Anything ambiguous from the project files.

Generate the setup steps tailored to what you found:
- If a serverless platform is detected, warn that Continuous Profiler
  is not supported there and stop.
- dd-trace-go v2 is recommended for all projects. Add the
  github.com/DataDog/dd-trace-go/v2/profiler dependency.
  If v1 is detected, recommend migrating to v2 and link the migration
  guide: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/go/migration
  If v1 must be kept, use the v1 import path instead.
- If v1 is detected at a version older than 1.51.0, warn that
  Trace-to-Profiling integration and Endpoint Profiling require
  dd-trace-go v1.51.0+.
- Add the profiler.Start() call in the main() function with
  WithService, WithEnv, WithVersion, and the requested
  WithProfileTypes. Handle the error:
    err := profiler.Start(...)
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
  IMPORTANT: defer profiler.Stop() must be in the same function scope
  as profiler.Start() (typically main) for the defer to execute on
  shutdown.
- If Orchestrion is detected, use the DD_PROFILING_ENABLED=true
  environment variable approach instead of code changes.
- If cgo is detected, suggest adding the cgosymbolizer package:
  go get github.com/ianlancetaylor/cgosymbolizer@latest
  and import _ "github.com/ianlancetaylor/cgosymbolizer".
  Warn that this library is experimental and can cause infrequent
  deadlocks in programs that use C++ exceptions or libraries like
  tcmalloc that also collect call stacks.
- If Go version is 1.21+, mention that Profile-Guided Optimization
  (PGO) is available and can save up to 14% CPU using Datadog
  profiler data. Link the guide:
  https://docs.datadoghq.com/profiler/guide/save-cpu-in-production-with-go-pgo
- Mention the optional timeline feature for connecting traces and
  profiles with span execution timelines.
- Suggest setting up Source Code Integration to connect profiling
  data with Git repositories.
- Show the complete modified main() function or Dockerfile.

Reference: https://docs.datadoghq.com/profiler/enabling/?code-lang=go
```

## Save up to 14% CPU in production with PGO

Starting [Go 1.21][19], the Go compiler supports Profile-Guided Optimization (PGO). PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with Datadog Go Continuous Profiler and can be used for production builds.

Follow [the PGO setup guide][20] to set it up.

## Configuration

You can set profiler parameters in code with these functions:

| Function | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | String        | The Datadog [service][21] name, for example, `my-web-app`.             |
|  WithEnv         | String        | The Datadog [environment][21] name, for example, `production`.         |
|  WithVersion     | String        | The version of your application.                                                                             |
|  WithTags        | List of strings        | A list of tags to apply to an uploaded profile. Tags must be of the format `<KEY>:<VALUE>`. |

Alternatively you can set profiler configuration using environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | String        | The [environment][21] name, for example, `production`. |
| `DD_SERVICE`                                     | String        | The [service][21] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][21] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

### Showing C function calls in CPU profiles

By default, Go's CPU profiler only shows detailed information for Go code. If your program calls C code, the time spent running C code is reflected in the profile, but the call stacks only show Go function calls.

To add detailed C function call information to CPU profiles, you may opt to use a library such as [ianlancetaylor/cgosymbolizer][22]. To use this library:

1. Download the package:

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. Add the following import anywhere in your program:

    ```go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

{% alert level="warning" %}
This library is considered experimental. It can cause (infrequent) deadlocks in programs that use C++ exceptions, or that use libraries such as `tcmalloc`, which also collect call stacks.
{% /alert %}

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://go.dev/doc/devel/release
[5]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[6]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[7]: /tracing/trace_collection/custom_instrumentation/go/migration
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#pkg-constants
[9]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[10]: /profiler/connect_traces_and_profiles/#prerequisites
[11]: /integrations/guide/source-code-integration/?tab=go
[12]: https://app.datadoghq.com/profiling
[13]: /profiler/profiler_troubleshooting/go/
[14]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#WithProfileTypes
[15]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#ProfileType
[16]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[17]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[18]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[19]: https://tip.golang.org/doc/go1.21
[20]: /profiler/guide/save-cpu-in-production-with-go-pgo
[21]: /getting_started/tagging/unified_service_tagging
[22]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
