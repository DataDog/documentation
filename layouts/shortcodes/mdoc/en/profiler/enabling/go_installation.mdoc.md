<!--
Installation steps for Go profiler (steps 2-3 and closing).
Parent page provides shared step 1 (Agent).
-->

2. Install `dd-trace-go`:

    ```shell
    go get github.com/DataDog/dd-trace-go/v2/profiler
    ```

    {% alert %}
    If you are using v1 of the Go tracer,
    see the [migration guide][1]
    to upgrade to v2 and for all future updates and features.
    {% /alert %}

3. Import the [profiler][2] and start it in your application:

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

    Optional: Enable the [timeline feature][3], see [prerequisites][4].

4. Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, refer to the [Troubleshooting][7] guide.

{% alert %}
By default, only the CPU and Heap profiles are enabled. Use [profiler.WithProfileTypes][8] and [profile types][9]. For legacy v1 documentation, view [profiler.WithProfileTypes][10] to enable additional [profile types][11].
{% /alert %}

If you automatically instrument your Go application with [Orchestrion][12], it adds the continuous profiler code to your application. To enable the profiler at run time, set the environment variable `DD_PROFILING_ENABLED=true`.

## Save up to 14% CPU in production with PGO

Starting [Go 1.21][13], the Go compiler supports Profile-Guided Optimization (PGO). PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with Datadog Go Continuous Profiler and can be used for production builds.

Follow [this guide][14] to set it up.

[1]: /tracing/trace_collection/custom_instrumentation/go/migration
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#pkg-constants
[3]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[4]: /profiler/connect_traces_and_profiles/#prerequisites
[5]: /integrations/guide/source-code-integration/?tab=go
[6]: https://app.datadoghq.com/profiling
[7]: /profiler/profiler_troubleshooting/go/
[8]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#WithProfileTypes
[9]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/profiler#ProfileType
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[12]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[13]: https://tip.golang.org/doc/go1.21
[14]: /profiler/guide/save-cpu-in-production-with-go-pgo
