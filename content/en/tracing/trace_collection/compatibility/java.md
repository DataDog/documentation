---
title: Java Compatibility Requirements
description: 'Compatibility Requirements for the Java tracer'
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
    - /tracing/compatibility_requirements/
    - /tracing/compatibility_requirements/java
    - /tracing/setup_overview/compatibility_requirements/java
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/java'
      tag: 'Documentation'
      text: 'Instrument Your Application'
---

## Compatibility

The Java Datadog Trace library is open source - view the [GitHub repository][1] for more information.

### Supported Java runtimes

The Java Tracer supports automatic instrumentation for the following Oracle JDK, OpenJDK JVM, and [GraalVM](#graalvm-native-image-support) runtimes.

#### Java Tracer v1 (latest)

<table>
  <thead>
    <th>Java versions</th>
    <th>Operating Systems</th>
    <th>Support level</th>
  </thead>
  <tr>
    <td>from 22 and upward</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
  <tr>
    <td>from 18 to 21</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">from 8 to 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
</table>

Datadog does not officially support any early-access versions of Java.

#### Java Tracer v0 (maintenance)

| Java versions      | Operating Systems                                                               | Support level                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| 7 only             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Maintenance](#levels-of-support) |
| 7 only             | Linux (arm64)<br>Mac (arm64)                                                    | [End-of-life](#levels-of-support) |

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. Contact [Datadog support][2] for special requests.                                                                              |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features and bug and security fixes are provided on a best-effort basis. |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features and bug and security fixes.                                                     |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug and security fixes only.                                  |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                        |

## Integrations

Link

## GraalVM Native Image support

GraalVM Native Image is a technology that allows you to compile Java applications into native executables. The Datadog Java tracer supports GraalVM Native Image. This allows you to compile your applications into native executables while still benefiting from the tracing capabilities offered by the library.

### Requirements

Use the latest versions of:

- [GraalVM][7]
- [Datadog Java tracer][1]

### Setup

{{< tabs >}}
{{% tab "GraalVM" %}}
To set up the Datadog Java tracer with GraalVM Native Image, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. When you build a native executable with the `native-image` command, add the `-J-javaagent:/path/to/dd-java-agent.jar` argument. For example:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true -–enable-monitoring=jfr`.
   - For tracer versions before `1.39.1`, when executing the generated native executable, ensure that `DD_PROFILING_START_FORCE_FIRST=true` is set as an environment variable.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
To set up the Datadog Java tracer with Quarkus Native, follow these steps:

1. Instrument your application, following the steps described in [Tracing Java Applications][6].
2. When you build a native executable, use the `quarkus.native.additional-build-args` property. For example:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Optional) Enable the profiler integration by adding the following argument:
`-J-Ddd.profiling.enabled=true -–enable-monitoring=jfr`.
   - For tracer versions before `1.39.1`, when executing the generated native executable, ensure that `DD_PROFILING_START_FORCE_FIRST=true` is set as an environment variable.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
To set up the Datadog Java tracer with Spring Native, follow these steps:

1. Instrument your application, following the steps described on [Tracing Java Applications][6].
2. For Spring Native builds based on Buildpacks, enable the [Paketo Buildpack for Datadog][8] using `BP_DATADOG_ENABLED=true`.
    - You can do this at the build tool level, like Maven:
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - Alternatively, you can use the `pack build` command with `--env BP_DATADOG_ENABLED=true` option to enable the Datadog buildpack.
3. (Optional) Enable the profiler integration by setting the environment variable `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true -–enable-monitoring=jfr’`.
   - For tracer versions before `1.39.1`, when executing the generated native executable, ensure that `DD_PROFILING_START_FORCE_FIRST=true` is set as an environment variable.

[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

#### Usage

After completing the setup, the service should send traces to Datadog.

You can view traces using the [Trace Explorer][9].

{{% collapse-content title="Troubleshooting" level="h4" %}}
##### Features are not enabled or configured correctly for native images

There are known issues with accessing system properties at runtime from a binary built with Graal Native Image.

- For runtime configuration, use environment variables (`DD_PROPERTY_NAME=value`), instead of system properties (`-Ddd.property.name=value`).
- The exception to this rule is when enabling the profiler. In this case, pass `-J-Ddd.profiling.enabled=true` to the `native-image` tool at _build time_.

##### Native-image buildpack versions older than 5.12.2

Older native-image buildpack versions expose the following option: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

When this option is `false`, exceptions like the following can occur:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Solutions to this issue are:

- Set `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explicitly to true in the image env configuration,
- Or upgrade the `native-image` buildpack to version 5.12.2 or later. The best way to do this is by upgrading the `java-native-image` buildpack to 8.13.0 or later.

##### Paketo buildpack for Datadog versions older than 4.6.0

Paketo buildpack for Datadog had a bug in older versions that materialized with the following error message:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

The solution to this issue is to upgrade to version 4.6.0 or later.

{{% /collapse-content %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /tracing/trace_explorer/
[10]: /opentelemetry/interoperability/instrumentation_libraries/?tab=java
