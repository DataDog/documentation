---
title: OpenTelemetry .NET Runtime Metrics
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## OpenTelemetry SDK Configuration

OpenTelemetry (OTel) .NET applications can be instrumented [automatically](https://opentelemetry.io/docs/instrumentation/net/automatic/) or [manually](https://opentelemetry.io/docs/instrumentation/net/manual/). Runtime metrics are automatically enabled when using automatic instrumentation. In order to enable runtime metrics when using manual instrumentation, refer to the documentation for the [OpenTelemetry.Instrumentation.Runtime library](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime).

## Runtime Metric Mappings

This table lists all of the Datadog runtime metrics that we currently support by mapping OTel runtime metrics. At the bottom, metrics with a N/A OTel counterpart are metrics that don't have mappings because there is no OTel counterpart yet.

| Datadog metric | Description |  OTel counterpart |
| --- | --- | --- |
| **runtime.dotnet.threads.contention_count** | The number of times a thread stopped to wait on a lock | process.runtime.dotnet.monitor.lock_contention.count |
| **runtime.dotnet.exceptions.count** | The number of first-chance exceptions | process.runtime.dotnet.exceptions.count |
| **runtime.dotnet.gc.size.gen0** | The size of the gen 0 heap | process.runtime.dotnet.gc.heap.size |
| **runtime.dotnet.gc.size.gen1** | The size of the gen 1 heap | process.runtime.dotnet.gc.heap.size |
| **runtime.dotnet.gc.size.gen2** | The size of the gen 2 heap | process.runtime.dotnet.gc.heap.size |
| **runtime.dotnet.gc.size.loh** | The size of the large object heap | process.runtime.dotnet.gc.heap.size |
| **runtime.dotnet.gc.count.gen0** | The number of gen 0 garbage collections | process.runtime.dotnet.gc.collections.count |
| **runtime.dotnet.gc.count.gen1** | The number of gen 1 garbage collections | process.runtime.dotnet.gc.collections.count |
| **runtime.dotnet.gc.count.gen2** | The number of gen 2 garbage collections | process.runtime.dotnet.gc.collections.count |
| **runtime.dotnet.cpu.system** | The number of milliseconds executing in the kernel | N/A |
| **runtime.dotnet.cpu.user** | The number of milliseconds executing outside the kernel | N/A |
| **runtime.dotnet.cpu.percent** | The percentage of total CPU used by the application | N/A |
| **runtime.dotnet.mem.committed** | Memory usage | N/A |
| **runtime.dotnet.threads.count** | The number of threads | N/A |
| **runtime.dotnet.threads.workers_count** | The number of workers in the threadpool (.NET Core only) | N/A |
| **runtime.dotnet.threads.contention_time** | The cumulated time spent by threads waiting on a lock (.NET Core only) | N/A |
| **runtime.dotnet.gc.memory_load** | The percentage of the total memory used by the process. The GC changes its behavior when this value gets above 85. (.NET Core only) | N/A |
| **runtime.dotnet.gc.pause_time** | The amount of time the GC paused the application threads (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.requests.total** | The total number of HTTP requests received by the server (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.requests.failed** | The number of failed HTTP requests received by the server (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.requests.current** | The total number of HTTP requests that have started but not yet stopped (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.requests.queue_length** | The current length of the server HTTP request queue (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.connections.total** | The total number of HTTP connections established to the server (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.connections.current** | The current number of active HTTP connections to the server (.NET Core only) | N/A |
| **runtime.dotnet.aspnetcore.connections.queue_length** | The current length of the HTTP server connection queue (.NET Core only) | N/A |
