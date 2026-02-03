---
title: Troubleshooting the Java Profiler
code_lang: java
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Profiler engines

The Java profiler uses two different profiling engines depending on your operating system:

| Engine | Platforms | Description |
|--------|-----------|-------------|
| **Datadog Profiler** | Linux | A native profiler based on async-profiler. Uses the `AsyncGetCallTrace` JVM API and perf events for accurate CPU sampling. Provides the full set of profile types including wallclock profiling for latency analysis. Default since dd-trace-java v1.7.0. |
| **Java Flight Recorder (JFR)** | Windows, macOS, Linux (fallback) | Uses the JVM's built-in flight recorder. Available on all platforms but with fewer profile types. On Linux, used as a fallback when the Datadog Profiler cannot be enabled. |

The profiler automatically selects the appropriate engine based on your environment. You do not need to configure this manually.

## Supported versions and profile types

### Linux (Datadog Profiler)

On Linux, the Datadog profiler engine provides the full set of profile types.

| JDK Version | CPU | Wallclock | Allocation | Live Heap |
|-------------|:---:|:---------:|:----------:|:---------:|
| OpenJDK 8u352+, 11.0.17+, 17.0.5+, 21+ | ✓ | ✓ | ✓ | ✓ (21.0.3+) |
| Oracle JDK 8u351+, 11.0.17+, 17.0.5+, 21+ | ✓ | ✓ | ✓ | ✓ (21.0.3+) |
| OpenJ9 8u372+, 11.0.18+, 17.0.6+ | ✓ | ✓ | ✓ | ✓ |
| Azul Platform Prime 23.05.0.0+ | ✓ | ✓ | ✓ | ✓ |

<div class="alert alert-info">
<strong>Version requirements</strong>: The Datadog Profiler requires specific JDK versions due to a fix for a <a href="https://bugs.openjdk.org/browse/JDK-8283849">known issue</a> in the <code>AsyncGetCallTrace</code> JVM API. This fix was backported to 8u352, 11.0.17, and 17.0.5.
</div>

**Live heap profiling** requires JDK 11.0.23+, 17.0.11+, 21.0.3+, or 22+ due to JVMTI API stability requirements.

### Windows and macOS (JFR)

On Windows and macOS, the profiler uses Java Flight Recorder (JFR).

| JDK Version | CPU | Allocation |
|-------------|:---:|:----------:|
| OpenJDK 8u262+, 11+ | ✓ | ✓ (JDK 16+ by default) |
| Oracle JDK 11+ | ✓ | ✓ |
| Azul Zulu 8u212+, 11+ | ✓ | ✓ |
| GraalVM 17+ (JIT mode) | ✓ | ✓ |

<div class="alert alert-warning">
Oracle JDK 11+ may require a commercial license from Oracle to enable JFR. Contact your Oracle representative to confirm whether JFR is included in your license.
</div>

### GraalVM native-image

For applications compiled as GraalVM native images, see [Enabling the Profiler for GraalVM Native Image][3].

| Platform | CPU | Allocation |
|----------|:---:|:----------:|
| Linux, Windows, macOS | ✓ | ✓ |

### Trace to profiling integration

The [Trace to Profiling integration][4] identifies code hotspots in slow traces. The following minimum versions are required:

| JDK | Minimum version | dd-trace-java version |
|-----|-----------------|----------------------|
| OpenJDK | 8u352, 11.0.17, 17.0.5 | 1.17.0+ |
| OpenJ9 | 8u362, 11.0.18, 17.0.6 | 1.17.0+ |

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Java OpenJDK 11 AdoptOpenJDK)


## Reduce overhead from default setup

If the default setup overhead is not acceptable, you can use the profiler with minimal configuration settings. Minimal configuration has the following changes compared to the default:

- Increases sampling threshold to 500ms for `ThreadSleep`, `ThreadPark`, and `JavaMonitorWait` events compared to 100ms default
- Disables `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` events

To use the minimal configuration ensure you have `dd-java-agent` version `0.70.0` then change your service invocation to the following:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Increase profiler information granularity

If you want more granularity in your profiling data, you can specify the `comprehensive` configuration. Note that this approach will increase your profiler overhead at the cost of further granularity. Comprehensive configuration has the following changes compared to the default:

- Reduces sampling threshold to 10ms for `ThreadSleep`, `ThreadPark`, and `JavaMonitorWait` events compared to 100ms default
- Enables `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample`, `ExceptionCount` events

To use the comprehensive configuration ensure you have `dd-trace-java` version `0.70.0` then change your service invocation to the following:

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## Enabling the allocation profiler

On Java 15 and lower, the allocation profiler is turned off by default because it can overwhelm the profiler in allocation-heavy applications.

To enable the allocation profiler, start your application with the `-Ddd.profiling.allocation.enabled=true` JVM setting or the `DD_PROFILING_ALLOCATION_ENABLED=true` environment variable.

Alternatively, you can enable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Enabling the heap profiler
<div class="alert alert-info">This feature requires at least Java 11.0.12, 15.0.4, 16.0.2, 17.0.3 or 18 and newer</div>
To enable the heap profiler, start your application with the `-Ddd.profiling.heap.enabled=true` JVM setting or the `DD_PROFILING_HEAP_ENABLED=true` environment variable.

Alternatively, you can enable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=true
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Enabling the heap histogram metrics
<div class="alert alert-info">This feature requires at least Java 17.0.9 or newer and does not work with ZGC</div>

To enable the heap histogram metrics, start your application with the `-Ddd.profiling.heap.histogram.enabled=true` JVM setting or the `DD_PROFILING_HEAP_HISTOGRAM_ENABLED=true` environment variable.

## Removing sensitive information from profiles

If your system properties contain sensitive information such as user names or passwords, turn off the system property event by creating a `jfp` [override template file](#creating-and-using-a-jfr-template-override-file) with `jdk.InitialSystemProperty` disabled:

```
jdk.InitialSystemProperty#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Large allocation events overwhelming the profiler

To turn off allocation profiling, disable the following events in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

## Memory leak detection slowing down garbage collector
{{< tabs >}}
{{% tab "JFR" %}}
To turn off memory leak detection, disable the following event in your `jfp` [override template file](#creating-and-using-a-jfr-template-override-file):

```
jdk.OldObjectSample#enabled=false
```

[Learn how to use override templates.](#creating-and-using-a-jfr-template-override-file)

{{% /tab %}}
{{% tab "Datadog Profiler" %}}
If you are using the alpha feature of live heap profiling, you can tune the overhead by changing the percentage
of the tracked allocation samples.
```shell
# track only 10% of the allocation samples
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.ddprof.liveheap.enabled=true -Ddd.profiling.ddprof.liveheap.sample_percent=10 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

## Exceptions overwhelming the profiler

The Datadog exception profiler has a small footprint and overhead under normal conditions. If a lot of exceptions are created and thrown, it can cause significant overhead for the profiler. This can happen when you use exceptions for control flow. If you have an unusually high exception rate, turn off exception profiling temporarily until you fix the cause.

To disable exception profiling, start the tracer with the `-Ddd.integration.throwables.enabled=false` JVM setting.

Remember to turn this setting back on after you've returned to a more typical rate of exceptions.

## Java 8 support

The following OpenJDK 8 vendors are supported for Continuous Profiling because they include JDK Flight Recorder in their latest versions:

| Vendor                      | JDK version that includes Flight Recorder |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212 (u262 is recommended)                |
| AdoptOpenJDK                | u262                                      |
| RedHat                      | u262                                      |
| Amazon (Corretto)           | u262                                      |
| Bell-Soft (Liberica)        | u262                                      |
| All vendors upstream builds | u272                                      |

If your vendor is not on the list, [open a support ticket][2], as other vendors may be in development or available in Preview support.

## Creating and using a JFR template override file

Override templates let you specify profiling properties to override. However, the default settings are balanced for a good tradeoff between overhead and data density that cover most use cases. To use an override file, perform the following steps:

1. Create an override file in a directory accessible by `dd-java-agent` at service invocation:
    ```
    touch dd-profiler-overrides.jfp
    ```

2. Add your desired overrides to the jfp file. For example, to disable allocation profiling and JVM system properties, your `dd-profiler-overrides.jfp` file would look like the following:

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. When running your application with `dd-java-agent`, your service invocation must point to the override file with `-Ddd.profiling.jfr-template-override-file=</path/to/override.jfp>`, for example:

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

## PODs are getting evicted due to disk usage

The profiler uses ephemeral storage (usually `/tmp`) to save captured profiling data.
If the node is under disk pressure and the pod hasn't requested ephemeral storage, it may be evicted.

Fix: Add a small ephemeral storage request (such as 100MB) in the pod spec to prevent eviction.

## Managing issues related to the tmp folder

The Continuous Profiler may encounter errors related to the use of the system `/tmp` directory, particularly in environments with strict security or limited execution permissions (for example, Docker, Kubernetes, or SELinux-enabled systems). These issues can lead to:

- Profiling startup failures
- Inability to load native `.so` libraries
- Accumulation of stale temp files across JVM restarts or crashes

Below are basic troubleshooting steps for resolving those issues:

- Use dd-trace-java Version 1.47.0 or later
  Starting with v1.47.0, the profiler uses PID-specific subdirectories inside the configured temp directory. This reduces clutter and potential conflicts from orphaned files when JVM processes exit unexpectedly.

- Specify a custom executable temp directory
  To ensure proper operation across environments, explicitly configure a writable, executable temp directory using the following JVM option:
   ```
   -Ddd.profiling.tempdir=<path_to_writable_exec_enabled_directory>
   ```
  Directory Requirements:
  -  Must be writable by the JVM process
  -  Must have execute permissions on all levels of the path
  -  Must comply with SELinux policies, if enforced

   Example:
    ```
    mkdir -p /opt/datadog-profiler-tmp
    chmod 755 /opt/datadog-profiler-tmp
    java -Ddd.profiling.tempdir=/opt/datadog-profiler-tmp -javaagent:/path/to/dd-java-agent.jar ...
    ```
- If you enable profiling using SSI, you can include the below environment variable in the `application_monitoring.yaml`.

    ```
    DD_PROFILING_TEMPDIR: <path_to_writable_exec_enabled_directory>
    ```
## Linux-specific: Degraded CPU profile quality

On Linux, the profiler uses perf events for accurate CPU sampling. If the value of `/proc/sys/kernel/perf_event_paranoid` is set to `3`, the profiler falls back to a less accurate sampling method.

To improve CPU profile quality, set the value to `2` or lower:

```shell
sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'
```

## OpenJ9 JVM crashes

The profiler is disabled by default on OpenJ9 due to potential JVM crashes caused by a JVMTI implementation issue. If you are not experiencing crashes and want to enable the profiler:

```shell
export DD_PROFILING_DDPROF_ENABLED=true
```

or:

```
-Ddd.profiling.ddprof.enabled=true
```

## GraalVM compiler (JVMCI)

The Datadog profiler is disabled by default on the GraalVM compiler. To enable it:

```shell
export DD_PROFILING_DDPROF_ENABLED=true
```

or:

```
-Ddd.profiling.ddprof.enabled=true
```

## Advanced profiler engine configuration

The following settings allow fine-grained control over the profiler engines. These are typically not needed for standard use cases.

| Environment variable | System property | Description |
|---------------------|-----------------|-------------|
| `DD_PROFILING_DDPROF_ENABLED` | `-Ddd.profiling.ddprof.enabled` | Enable the Datadog profiler engine (Linux only, default: true since v1.7.0) |
| `DD_PROFILING_DDPROF_CPU_ENABLED` | `-Ddd.profiling.ddprof.cpu.enabled` | Enable CPU profiling with the Datadog engine |
| `DD_PROFILING_DDPROF_WALL_ENABLED` | `-Ddd.profiling.ddprof.wall.enabled` | Enable wallclock profiling (default: true since v1.7.0) |
| `DD_PROFILING_DDPROF_ALLOC_ENABLED` | `-Ddd.profiling.ddprof.alloc.enabled` | Enable allocation profiling with the Datadog engine |
| `DD_PROFILING_DDPROF_LIVEHEAP_ENABLED` | `-Ddd.profiling.ddprof.liveheap.enabled` | Enable live heap profiling (requires JDK 11.0.23+, 17.0.11+, 21.0.3+, or 22+) |
| `DD_PROFILING_ENABLED_EVENTS` | `-Ddd.profiling.enabled.events` | Enable specific JFR events (for example: `jdk.ObjectAllocationInNewTLAB,jdk.ObjectAllocationOutsideTLAB`) |

## Collecting native stack traces

You can collect native stack traces (JVM internals, native libraries, syscalls) by enabling the following setting:

<div class="alert alert-danger">Native stack traces are not collected by default because they usually do not provide actionable insights and walking native stacks can potentially impact application stability. Test this setting in a non-production environment before using it in production.</div>

```shell
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

or:

```
-Ddd.profiling.ddprof.cstack=dwarf
```

## JDK Mission Control (JMC) event reference

If you are analyzing profiles with JDK Mission Control, the following events are emitted by the profiler:

| Profile type | JFR event | Datadog event |
|--------------|-----------|---------------|
| CPU | `jdk.ExecutionSample` | `datadog.ExecutionSample` |
| Wallclock | - | `datadog.MethodSample` |
| Allocation | `jdk.ObjectAllocationInNewTLAB`, `jdk.ObjectAllocationOutsideTLAB` | `datadog.ObjectAllocationInNewTLAB`, `datadog.ObjectAllocationOutsideTLAB` |
| Live heap | - | `datadog.HeapLiveObject` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/#debugging-and-logging
[2]: /help/
[3]: /profiler/enabling/graalvm/
[4]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
