<!--
Requirements for Java profiler.
Parent page must declare: prog_lang, runtime filters.
-->

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
