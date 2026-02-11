---
title: Enabling the Java Profiler
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

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

{{< tabs >}}
{{% tab "Linux" %}}

**Available profile types**:
- CPU
- Wallclock (latency)
- Allocations
- Live heap (memory leak detection)
- Exception profiling

**Note**: On Linux, the Datadog profiler engine (ddprof) provides the full set of profile types.

| JDK Version | CPU | Wallclock | Allocation | Live Heap |
|-------------|:---:|:---------:|:----------:|:---------:|
| OpenJDK 8u352+, 11.0.17+, 17.0.5+, 21+ | ✓ | ✓ | ✓ | ✓ |
| Oracle JDK 8u351+, 11.0.17+, 17.0.5+, 21+ | ✓ | ✓ | ✓ | ✓ |
| OpenJ9 JDK 8u372+, 11.0.18+, 17.0.6+ | ✓ | ✓ | ✓ | ✓ |
| Azul Platform Prime 23.05.0.0+ | ✓ | ✓ | ✓ | ✓ |

{{% /tab %}}
{{% tab "Windows" %}}

**Available profile types**:
- CPU
- Allocations

**Minimum JDK Versions**:

| JDK Distribution | Minimum Version | Notes |
|------------------|-----------------|-------|
| OpenJDK | 8u282+, 11.0.17+, 17.0.5+, 21.0.3+ | Includes builds from Amazon Corretto, Azul Zulu, Eclipse Temurin, BellSoft Liberica, and other OpenJDK-based distributions |
| Oracle JDK | 11.0.17+, 17.0.5+, 21.0.3+ | JFR may require commercial license. Oracle JDK 8u40+ supported with limited features (CPU profiling only) |
| Azul Zulu | 8u212+, 11.0.17+, 17.0.5+, 21.0.3+ | |
| OpenJ9 JDK | 8u372+, 11.0.18+, 17.0.6+ | Used in Eclipse OpenJ9, IBM JDK, IBM Semeru Runtime |
| GraalVM | 17.0.11+, 21.0.3+ | JIT mode only; native-image (AOT) not supported |

{{% /tab %}}
{{< /tabs >}}

- All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.

- Java Continuous Profiler is not supported on serverless platforms such as AWS Lambda.


## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3]. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {{% /tab %}}
   {{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {{% /tab %}}
   {{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **Note**: Profiler is available in the `dd-java-agent.jar` library in versions 0.55+.

3. Enable the profiler by setting `-Ddd.profiling.enabled` flag or `DD_PROFILING_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` so you can filter and group your profiles across these dimensions:

   {{< tabs >}}
{{% tab "Command arguments" %}}

```shell
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.profiling.enabled=true \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{% tab "Environment variables" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

   **Note**: The `-javaagent` argument needs to be before `-jar`. This adds it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][4].

4. Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

5. For more information on available profile types , see [Profile Types][11].

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiling page][6]. 

7. For GraalVM native-image applications, see [Enabling the Profiler for GraalVM Native Image][8].




## Configuration

You can configure the profiler using the following environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiler.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | Alternate for `-Ddd.profiling.allocation.enabled` argument. Set to `true` to enable the allocation profiler. It requires the profiler to be enabled already. |
| `DD_ENV`                                         | String        | The [environment][7] name, for example: `production`. |
| `DD_SERVICE`                                     | String        | The [service][7] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][7] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |



## Not sure what to do next?

The [Getting Started with Profiler][9] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

For additional configuration options and troubleshooting guidance, see [Java Profiler Troubleshooting][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: /integrations/guide/source-code-integration/?tab=java
[6]: https://app.datadoghq.com/profiling
[7]: /getting_started/tagging/unified_service_tagging
[8]: /profiler/enabling/graalvm/
[9]: /getting_started/profiler/
[10]: /profiler/profiler_troubleshooting/java/
[11]: /profiler/profile_types/?tab=java

