---
title: Enabling the Profiler for GraalVM Native Image
code_lang: graalvm
type: multi-code-lang
code_lang_weight: 15
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/java'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<div class="alert alert-warning">
Datadog Profiler support for GraalVM native-image is in beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

This page describes how to enable profiling for applications compiled as GraalVM native images. For standard JVM applications, see [Enabling the Java Profiler][1].

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

Minimum version
: GraalVM 17+

Supported platforms
: Linux, Windows, macOS

Available profile types
: CPU, Allocations

## Installation

### 1. Build your native image with the Datadog tracer

Follow the [Tracer Setup Instructions][3] to build your GraalVM native image with the Datadog Java Profiler instrumentation.

### 2. Run with profiling enabled

After the service binary is built, enable the profiler using environment variables:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
export DD_PROFILING_DIRECTALLOCATION_ENABLED=true
./my_service
```

### 3. Verify profiles are collected

After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][4].

## Configuration

| Environment variable              | Description                                                              |
|-----------------------------------|--------------------------------------------------------------------------|
| `DD_PROFILING_ENABLED`            | Set to `true` to enable the profiler.                                    |
| `DD_PROFILING_DIRECTALLOCATION_ENABLED` | Set to `true` to enable allocation profiling.                      |
| `DD_SERVICE`                      | The [service][5] name.                                                   |
| `DD_ENV`                          | The [environment][5] name.                                               |
| `DD_VERSION`                      | The [version][5] of your service.                                        |

## Limitations

- Only JFR-based profiling is supported for GraalVM native-image applications.
- Wallclock and live heap profiling are not available.

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/enabling/java/
[2]: /profiler/enabling/supported_versions/
[3]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/tagging/unified_service_tagging
[6]: /getting_started/profiler/

