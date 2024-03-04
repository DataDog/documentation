---
title: OpenTelemetry .NET Runtime Metrics
aliases:
- /opentelemetry/runtime_metrics/dotnet/
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 20
---

## Prerequisites

- You are successfully [sending OpenTelemetry metrics to Datadog][1].
- You have installed the language integration for [.NET][2].
- Minimum .NET OTel SDK version of [1.5.0][6].

## OpenTelemetry SDK configuration

If you have instrumented your .NET applications with [OpenTelemetry automatic instrumentation][3], runtime metrics are automatically enabled. 

If you have instrumented your .NET application with [OpenTelemetry manual instrumentation][4], see the documentation for the [OpenTelemetry.Instrumentation.Runtime library][5].

The default metric export interval for the .NET OTel SDK is different from the default for the Datadog .NET SDK. Datadog recommends setting the [OTEL_METRIC_EXPORT_INTERVAL][7] environment variable on your .NET service to match the default Datadog metric export interval for viewing integration metric graphs:
- `OTEL_METRIC_EXPORT_INTERVAL=10000`

## Runtime metric mappings

The following table lists the Datadog runtime metrics that are supported by mapping OpenTelemetry runtime metrics, with "N/A" indicating that there is no OpenTelemetry counterpart.

| Datadog metric | Description |  OpenTelemetry counterpart |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | The number of times a thread stopped to wait on a lock. | `process.runtime.dotnet.`<br/>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | The number of first-chance exceptions. | `process.runtime.dotnet.`<br/>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | The size of the gen 0 heap. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | The size of the gen 1 heap. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | The size of the gen 2 heap. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | The size of the large object heap. | `process.runtime.dotnet.`<br/>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | The number of gen 0 garbage collections. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | The number of gen 1 garbage collections. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | The number of gen 2 garbage collections. | `process.runtime.dotnet.`<br/>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | The number of milliseconds executing in the kernel. | N/A |
| `runtime.dotnet.cpu.user` | The number of milliseconds executing outside the kernel. | N/A |
| `runtime.dotnet.cpu.percent` | The percentage of total CPU used by the application. | N/A |
| `runtime.dotnet.mem.committed` | Memory usage. | N/A |
| `runtime.dotnet.threads.count` | The number of threads. | N/A |
| `runtime.dotnet.threads.workers_count` | The number of workers in the threadpool. (.NET Core only) | N/A |
| `runtime.dotnet.threads.contention_time` | The cumulated time spent by threads waiting on a lock. (.NET Core only) | N/A |
| `runtime.dotnet.gc.memory_load` | The percentage of the total memory used by the process. The garbage collection (GC) changes its behavior when this value gets above 85. (.NET Core only) | N/A |
| `runtime.dotnet.gc.pause_time` | The amount of time the GC paused the application threads. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.total` | The total number of HTTP requests received by the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.failed` | The number of failed HTTP requests received by the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.current` | The total number of HTTP requests that have started but not yet stopped. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`requests.queue_length` | The current length of the server HTTP request queue. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.total` | The total number of HTTP connections established to the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.current` | The current number of active HTTP connections to the server. (.NET Core only) | N/A |
| `runtime.dotnet.aspnetcore.`<br/>`connections.queue_length` | The current length of the HTTP server connection queue. (.NET Core only) | N/A |


[1]: /opentelemetry/otel_metrics
[2]: https://app.datadoghq.com/integrations/dotnet
[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[6]: https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader