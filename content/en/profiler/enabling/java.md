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

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][13].

As of dd-trace-java 1.0.0, you have two options for the engine that generates profile data for Java applications: [Java Flight Recorder (JFR)][2] or the Datadog Profiler. As of dd-trace-java 1.7.0, Datadog Profiler is the default. Each profiler engine has different side effects, requirements, available configurations, and limitations, and this page describes each. You can enable either one or both engines. Enabling both captures both profile types at the same time.

{{< tabs >}}
{{% tab "Datadog Profiler" %}}

Supported operating systems:
- Linux

Minimum JDK versions:
- OpenJDK 8u352+, 11.0.17+, 17.0.5+, 21+ (including builds on top of it: Amazon Corretto, Azul Zulu, and others)
- Oracle JDK 8u351+, 11.0.17+, 17.0.5+, 21+
- OpenJ9 JDK 8u372+, 11.0.18+, 17.0.6+ (used on Eclipse OpenJ9, IBM JDK, IBM Semeru Runtime). The profiler is disabled by default for OpenJ9 due to the possibility of crashing JVM caused by a subtle bug in JVTMI implementation. If you are not experiencing any crashes, you can enable the profiler by adding `-Ddd.profiling.ddprof.enabled=true`.
- Azul Platform Prime 23.05.0.0+ (formerly Azul Zing)

The Datadog Profiler uses the JVMTI `AsyncGetCallTrace` function, in which there is a [known issue][1] prior to JDK release 17.0.5. This fix was backported to 11.0.17 and 8u352. The Datadog Profiler is not enabled unless the JVM the profiler is deployed into has this fix. Upgrade to at least 8u352, 11.0.17, 17.0.5, 21, or the latest non-LTS JVM version to use the Datadog Profiler.

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

Supported operating systems:
- Linux
- Windows

Minimum JDK versions:
- OpenJDK [1.8.0.262/8u262+][3], 11+ (including builds on top of it: Amazon Corretto, and others)
- Oracle JDK 11+ (Enabling the JFR may require a commercial license from Oracle. Reach out to your Oracle representative to confirm whether this is part of your license)
- Azul Zulu 8 (version 1.8.0.212/8u212+), 11+
- GraalVM 17+ - both, JIT and AOT (native-image) versions

Because non-LTS JDK versions may not contain stability and performance fixes related to the Datadog Profiler library, use versions 8, 11, and 17 of the Long Term Support JDK.

Additional requirements for profiling [Trace to Profiling integration][12]:
 - OpenJDK 17.0.5+ and `dd-trace-java` version 1.17.0+
 - OpenJDK 11.0.17+ and `dd-trace-java` version 1.17.0+
 - OpenJDK 8 8u352+ and `dd-trace-java` version 1.17.0+
 - OpenJ9 17.0.6+ and `dd-trace-java` version 1.17.0+
 - OpenJ9 11.0.18+ and `dd-trace-java` version 1.17.0+
 - OpenJ9 8.0.362+ and `dd-trace-java` version 1.17.0+

[3]: /profiler/profiler_troubleshooting/java/#java-8-support
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.

Continuous Profiler is not supported on some serverless platforms, such as AWS Lambda.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][4]. If you don't have APM enabled to set up your application to send data to Datadog, in your Agent, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

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

Invoke your service:
```diff
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

```diff
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

{{% collapse-content title="(Optional) Build and run Graal native-image" level="h4" %}}

Follow the [Tracer Setup Instructions][14] to build your Graal native image with the Datadog Java Profiler.

When the service binary is built, you can use environment variables to enable and configure the Datadog Java Profiler:

   ```shell
   DD_PROFILING_ENABLED=true DD_PROFILING_DIRECTALLOCATION_ENABLED=true ./my_service
   ```

**Note**: Only JFR-based profiling is supported for the GraalVM native-image applications. None of the <code>DDPROF</code> related configuration options are effective.
{{% /collapse-content %}}

   **Note**: The `-javaagent` argument needs to be before `-jar`. This adds it as a JVM option rather than an application argument. For example, `java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags`. For more information, see the [Oracle documentation][6].

4. Optional: Set up [Source Code Integration][7] to connect your profiling data with your Git repositories.

5. After a minute or two, you can visualize your profiles on the [Datadog APM > Profiling page][8].


## Configuration

You can configure the profiler using the following environment variables:

| Environment variable                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | Alternate for `-Ddd.profiling.enabled` argument. Set to `true` to enable profiler.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | Alternate for `-Ddd.profiling.allocation.enabled` argument. Set to `true` to enable the allocation profiler. It requires the profiler to be enabled already. |
| `DD_PROFILING_DDPROF_WALL_ENABLED`                | Boolean       | Alternate for `-Ddd.profiling.ddprof.enabled=true` argument. Set to `true` to enable wall time profiler. It requires . |
| `DD_ENV`                                         | String        | The [environment][10] name, for example: `production`. |
| `DD_SERVICE`                                     | String        | The [service][10] name, for example, `web-backend`. |
| `DD_VERSION`                                     | String        | The [version][10] of your service. |
| `DD_TAGS`                                        | String        | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas such as: `layer:api, team:intake`.  |

## Not sure what to do next?

The [Getting Started with Profiler][11] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: /integrations/guide/source-code-integration/?tab=java
[8]: https://app.datadoghq.com/profiling
[9]: /profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[10]: /getting_started/tagging/unified_service_tagging
[11]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/enabling/supported_versions/
[14]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
