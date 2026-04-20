<!--
Java profiler setup — self-contained.
Runtime filter (jvm | graalvm_native_image) is declared by the parent page.
-->

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

<!-- JVM -->
{% if equals($runtime, "jvm") %}

{% tabs %}

{% tab label="Linux" %}

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

{% /tab %}

{% tab label="Windows" %}

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

{% /tab %}

{% /tabs %}

- All JVM-based languages, such as Java, Scala, Groovy, Kotlin, and Clojure are supported.
- The profiler supports only actively maintained LTS JDK versions and the most recent General Availability (GA) JDK releases.
- Continuous Profiler is not supported on serverless platforms.

{% /if %}
<!-- end JVM -->

<!-- GraalVM Native Image -->
{% if equals($runtime, "graalvm_native_image") %}

{% alert level="warning" %}
Datadog Profiler support for GraalVM native-image is in Preview. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
{% /alert %}

Minimum version
: GraalVM 17+

Supported platforms
: Linux, Windows, macOS

Available profile types
: CPU, Allocations

{% /if %}
<!-- end GraalVM Native Image -->

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

<!-- JVM -->
{% if equals($runtime, "jvm") %}

2. Download `dd-java-agent.jar`, which contains the Java Agent class files:

   {% tabs %}

   {% tab label="Wget" %}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="cURL" %}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {% /tab %}

   {% tab label="Dockerfile" %}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {% /tab %}

   {% /tabs %}

3. Enable the profiler and specify your service, environment, and version:

   {% tabs %}

   {% tab label="Command arguments" %}
   ```shell
   java \
       -javaagent:dd-java-agent.jar \
       -Ddd.service=<YOUR_SERVICE> \
       -Ddd.env=<YOUR_ENVIRONMENT> \
       -Ddd.version=<YOUR_VERSION> \
       -Ddd.profiling.enabled=true \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% tab label="Environment variables" %}
   ```shell
   export DD_SERVICE=<YOUR_SERVICE>
   export DD_ENV=<YOUR_ENV>
   export DD_VERSION=<YOUR_VERSION>
   export DD_PROFILING_ENABLED=true
   java \
       -javaagent:dd-java-agent.jar \
       -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
   ```
   {% /tab %}

   {% /tabs %}

   {% alert %}
   The `-javaagent` argument needs to be before `-jar`. This adds it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][4].
   {% /alert %}

4. Optional: Set up [Source Code Integration][5] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][6]. If they do not, see the [Troubleshooting][10] guide.

For more information on available profile types, see [Profile Types][7].

{% alert %}
For GraalVM native-image applications, switch the **Runtime** filter above to **GraalVM Native Image**.
{% /alert %}

{% /if %}
<!-- end JVM -->

<!-- GraalVM Native Image -->
{% if equals($runtime, "graalvm_native_image") %}

2. Follow the [Tracer Setup Instructions][8] to build your GraalVM native image with the Datadog Java Profiler instrumentation.

3. Run with profiling enabled:

   ```shell
   export DD_SERVICE=<YOUR_SERVICE>
   export DD_ENV=<YOUR_ENV>
   export DD_VERSION=<YOUR_VERSION>
   export DD_PROFILING_ENABLED=true
   export DD_PROFILING_DIRECTALLOCATION_ENABLED=true
   ./my_service
   ```

4. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][6].

### Limitations

- Only JFR-based profiling is supported for GraalVM native-image applications.
- Wallclock and live heap profiling are not available.

{% /if %}
<!-- end GraalVM Native Image -->

## Configuration

In addition to the environment, service, and version variables shown in the installation steps, you can apply custom tags to uploaded profiles with `DD_TAGS` (a comma-separated list of `<key>:<value>` pairs such as `layer:api, team:intake`).

<!-- JVM -->
{% if equals($runtime, "jvm") %}
For additional configuration options, see the [Configuration reference][9] in the troubleshooting guide.
{% /if %}
<!-- end JVM -->

<!-- GraalVM Native Image -->
{% if equals($runtime, "graalvm_native_image") %}
For profile type configuration options, see the [Configuration reference][9] in the Java profiler troubleshooting guide.
{% /if %}
<!-- end GraalVM Native Image -->



[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: /integrations/guide/source-code-integration/?tab=java
[6]: https://app.datadoghq.com/profiling
[7]: /profiler/profile_types/?tab=java
[8]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
[9]: /profiler/profiler_troubleshooting/java/#configuration-reference
[10]: /profiler/profiler_troubleshooting/java/
