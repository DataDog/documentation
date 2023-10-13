---
title: Enabling the Java Profiler
kind: Documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 10
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
aliases:
  - /tracing/profiler/enabling/java/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

As of dd-trace-java 1.0.0, you have two options for the engine that generates profile data for Java applications: [Java Flight Recorder (JFR)][2] or the Datadog Profiler. As of dd-trace-java 1.7.0, Datadog Profiler is the default. Each profiler engine has different side effects, requirements, available configurations, and limitations, and this page describes each. You can enable either one or both engines. Enabling both captures both profile types at the same time.

{{< tabs >}}
{{% tab "Datadog Profiler" %}}

Minimum JDK versions:
- OpenJDK 8u352+, 11.0.17+, 17.0.5+ (including builds on top of it: Amazon Corretto, Azul Zulu, and others)
- Oracle JDK 8u352+, 11.0.17+, 17.0.5+
- OpenJ9 JDK 8u372+, 11.0.18+, 17.0.6+ (used on Eclipse OpenJ9, IBM JDK, IBM Semeru Runtime)
- Azul Platform Prime 23.05.0.0+ (formerly Azul Zing)

The Datadog Profiler uses the JVMTI `AsyncGetCallTrace` function, in which there is a [known issue][1] prior to JDK release 17.0.5. This fix was backported to 11.0.17 and 8u352. The Datadog Profiler is not enabled unless the JVM the profiler is deployed into has this fix. Upgrade to at least 8u352, 11.0.17, 17.0.5, or the latest non-LTS JVM version to use the Datadog Profiler.

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

Minimum JDK versions:
- OpenJDK [1.8.0.262/8u262+][3], 11+ (including builds on top of it: Amazon Corretto, and others)
- Oracle JDK 11+ (Enabling the JFR may require a commercial license from Oracle. Reach out to your Oracle representative to confirm whether this is part of your license)
- Azul Zulu 8 (version 1.8.0.212/8u212+), 11+.

Because non-LTS JDK versions may not contain stability and performance fixes related to the Datadog Profiler library, use versions 8, 11, and 17 of the Long Term Support JDK.

Additional requirements for profiling [Code Hotspots][11]:
 - OpenJDK 11+ and `dd-trace-java` version 0.65.0+
 - OpenJDK 8 8u282+ and `dd-trace-java` version 0.77.0+

[3]: /profiler/profiler_troubleshooting/java/#java-8-support
[11]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your Agent to version [7.20.2][4]+ or [6.20.2][5]+. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

     **Note**: Profiler is available in the `dd-java-agent.jar` library in versions 0.55+.

3. Enable the profiler by setting `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` so you can filter and group your profiles across these dimensions:
   {{< tabs >}}
{{% tab "Command arguments" %}}

Invoke your service:
```diff
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.profiling.enabled=true \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{% tab "Environment variables" %}}

```diff
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

    **Note**: The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][6]:

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

4. After a minute or two, you can visualize your profiles on the [Datadog APM > Profiling page][7].

### Enabling CPU profiler engine options

Since dd-trace-java version 1.5.0, you have two options for the CPU profiler used, Datadog or Java Flight Recorder (JFR). Since version 1.7.0, Datadog is the default, but you can also optionally enable JFR for CPU profiling. You can enable either one or both engines. Enabling both captures both profile types at the same time.

The Datadog profiler records the active span on every sample, which improves the fidelity of the Code Hotspots and Endpoint profiling features. Enabling this engine supports much better integration with APM tracing.

The Datadog profiler consists of several profiling engines, including CPU, wallclock, allocation, and memory leak profilers.


{{< tabs >}}
{{% tab "Datadog Profiler" %}}

The Datadog profiler is enabled by default in dd-trace-java versions 1.7.0+. Datadog CPU profiling is scheduled through perf events and is more accurate than JFR CPU profiling. To enable CPU profiling:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_CPU_ENABLED=true
```

or:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.cpu.enabled=true
```

For JDK Mission Control (JMC) users, the Datadog CPU sample event is `datadog.ExecutionSample`.

#### Linux settings

The CPU engine works on most systems, but if the value of `/proc/sys/kernel/perf_event_paranoid` is set to `3`, the profiler can't use perf events to schedule CPU sampling. This results in degraded profile quality, falling back to using `itimer`. Set `/proc/sys/kernel/perf_event_paranoid` to `2` or lower with the following command:

```
sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'
```

{{% /tab %}}

{{% tab "JFR" %}}

For version 1.7.0+, to switch from the default Datadog to JFR CPU profiling:

```
export DD_PROFILING_DDPROF_CPU_ENABLED=false
```
or:
```
-Ddd.profiling.ddprof.cpu.enabled=false
```
For JDK Mission Control (JMC) users, the JFR CPU sample event is `jdk.ExecutionSample`.

{{% /tab %}}
{{< /tabs >}}


### Datadog profiler wallclock engine

The wallclock profiling engine is useful for profiling latency and integrates tightly with APM tracing. The engine samples all threads, on- or off-CPU, with active tracing activity and can be used to diagnose trace or span latency. The engine has been enabled by default since 1.7.0.

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.wall.enabled=true
```

For version 1.7.0+, to disable the wallclock profiler:

```
export DD_PROFILING_DDPROF_WALL_ENABLED=false
```
or:
```
-Ddd.profiling.ddprof.wall.enabled=false
```

For JMC users, the `datadog.MethodSample` event is emitted for wallclock samples.

The wallclock engine does not depend on the `/proc/sys/kernel/perf_event_paranoid` setting.

### Datadog profiler allocation engine

_Requires JDK 11+._

The Datadog allocation profiling engine contextualizes allocation profiles, which supports allocation profiles filtered by endpoint.
In dd-java-agent earlier than v1.17.0 it is disabled by default, but you can enable it with:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true # this is the default in v1.17.0+
```

or:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.alloc.enabled=true # this is the default in v1.17.0+
```

For JMC users, the Datadog allocation events are `datadog.ObjectAllocationInNewTLAB` and `datadog.ObjectAllocationOutsideTLAB`.

The allocation profiler engine does not depend on the `/proc/sys/kernel/perf_event_paranoid` setting.

### Live-heap profiler engine

_Since: v1.17.0. Requires JDK 11+._

The live-heap profiler engine is useful for investigating the overall memory usage of your service and identifying potential memory leaks.
The engine samples allocations and keeps track of whether those samples survived the most recent garbage collection cycle. The number of surviving samples is used to estimate the number of live objects in the heap.
The number of tracked samples is limited to avoid unbounded growth of the profiler's memory usage.

The engine is disabled by default, but you can enable it with:

```
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true
```

or:

```
-Ddd.profiling.ddprof.liveheap.enabled=true
```

For JMC users, the Datadog live-heap event is `datadog.HeapLiveObject`.

The allocation engine does not depend on the `/proc/sys/kernel/perf_event_paranoid` setting.

### Collecting native stack traces

If the Datadog profiler CPU or wallclock engines are enabled, you can collect native stack traces. Native stack traces include things like JVM internals, native libraries used by your application or the JVM, and syscalls.

<div class="alert alert-warning">Native stack traces are not collected by default because usually they do not provide actionable insights and walking native stacks can potentially impact application stability. Test this setting in a non-production environment before you try using it in production.</a></div>

To enable native stack trace collection, understanding that it can destabilize your application, set:

```
export DD_PROFILING_DDPROF_ENABLED=true # this is the default in v1.7.0+
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

or:

```
-Ddd.profiling.ddprof.enabled=true # this is the default in v1.7.0+
-Ddd.profiling.ddprof.cstack=dwarf
```



## Configuration

You can configure the profiler using the following environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiler.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | Alternate for `-Ddd.profiling.allocation.enabled` argument. Set to `true` to enable the allocation profiler. It requires the profiler to be enabled already. |
| `DD_ENV`                                         | String        | The [environment][9] name, for example: `production`. |
| `DD_SERVICE`                                     | String        | The [service][9] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][9] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

## Not sure what to do next?

The [Getting Started with Profiler][10] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://app.datadoghq.com/profiling
[8]: /profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[9]: /getting_started/tagging/unified_service_tagging
[10]: /getting_started/profiler/
[11]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
