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

The profiler is shipped within Datadog SDKs. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

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
- I/O profiling


| JDK Distribution | Minimum Version | Notes |
|------------------|-----------------|-------|
| OpenJDK | 8u352+, 11.0.17+, 17.0.5+, 21+ | Includes builds from Amazon Corretto, Azul Zulu, Eclipse Temurin, BellSoft Liberica, and other OpenJDK-based distributions |
| Oracle JDK | 8u351+, 11.0.17+, 17.0.5+, 21+ | |
| OpenJ9 JDK | 8u372+, 11.0.18+, 17.0.6+ | Includes Eclipse OpenJ9, IBM JDK, and IBM Semeru Runtime |
| Azul Platform Prime | 23.05.0.0+ | |

{{% /tab %}}
{{% tab "Windows" %}}

**Available profile types**:
- CPU
- Allocations
- I/O profiling
- Exception


| JDK Distribution | Minimum Version | Notes |
|------------------|-----------------|-------|
| OpenJDK | 8u282+, 11.0.17+, 17.0.5+, 21.0.3+ | Includes builds from Amazon Corretto, Azul Zulu, Eclipse Temurin, BellSoft Liberica, and other OpenJDK-based distributions |
| Oracle JDK | 11.0.17+, 17.0.5+, 21.0.3+ | JFR may require commercial license. Oracle JDK 8u40+ supported with limited features (CPU profiling only) |
| Azul Zulu | 8u212+, 11.0.17+, 17.0.5+, 21.0.3+ | |
| GraalVM | 17.0.11+, 21.0.3+ | JIT mode and native-image(AOT) |

{{% /tab %}}
{{< /tabs >}}

- All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.

- The profiler supports only actively maintained LTS JDK versions and the most recent General Availability (GA) JDK releases.

- Java Profiler is not supported on serverless environments.

## Installation

To begin profiling applications:

1. Install and run Datadog Agent v6+. Datadog recommends using [Datadog Agent v7+][3]. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

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

Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

4. After a couple of minutes, your profiles appear on the [Datadog APM > Profiling page][6].

5. For more information on available profile types, see [Profile Types][11].

**Note**: For GraalVM native-image applications, see [Enabling the Profiler for GraalVM Native Image][8].


## Configuration

In addition to the environment, service, and version variables shown in the installation steps, you can apply custom tags to uploaded profiles with `DD_TAGS` (a comma-separated list of `<key>:<value>` pairs such as `layer:api, team:intake`).

For additional configuration options, see the [Configuration reference][10] in the troubleshooting guide.


## Not sure what to do next?

The [Getting Started with Profiler][9] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

Facing issues while enabling the profiler or need troubleshooting guidance? See the [Java Profiler Troubleshooting][12] guide.

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
[10]: /profiler/profiler_troubleshooting/java/#configuration-reference
[11]: /profiler/profile_types/?tab=java
[12]: /profiler/profiler_troubleshooting/java/

