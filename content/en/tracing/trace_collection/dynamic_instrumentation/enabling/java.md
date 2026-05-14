---
title: Enable Dynamic Instrumentation for Java
description: Set up Dynamic Instrumentation for Java applications to add probes and capture data without code changes.
aliases:
    - /dynamic_instrumentation/enabling/java/
    - /tracing/dynamic_instrumentation/enabling/java
private: false
code_lang: java
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of the Datadog SDK that lets you add instrumentation to your application at runtime without code changes or redeployments. Follow these instructions to set up Dynamic Instrumentation for Java.

## Prerequisites

Before you begin, review the [Dynamic Instrumentation prerequisites][9]. Java applications also require:

- JDK version 8 or higher.
- Tracing library [`dd-java-agent.jar`][8] version 1.34.0 or higher. See the [installation instructions][10] for setup details.

## Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`:
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

3. Run your service with Dynamic Instrumentation enabled by setting `-Ddd.dynamic.instrumentation.enabled` flag or `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
   {{< tabs >}}
{{% tab "Command arguments" %}}

Example service startup command:
```shell
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.dynamic.instrumentation.enabled=true \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{% tab "Environment variables" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

   **Note**: The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][3]:

   ```shell
   # Good:
   java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
   # Bad:
   java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

4. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [APM > Dynamic Instrumentation page][4].

## Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable                             | Type          | Description                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | Alternate for `-Ddd.dynamic.instrumentation.enabled` argument. Set to `true` to enable Dynamic Instrumentation.           |
| `DD_SERVICE`                                     | String        | The [service][5] name, for example, `web-backend`.                                                                        |
| `DD_ENV`                                         | String        | The [environment][5] name, for example, `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][5] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## What to do next

See [Dynamic Instrumentation][6] for information about adding instrumentations and browsing and indexing the data.

## Limitations

- On JDK 18 and below, classes compiled with the `-parameters` flag may fail to instrument with the error message "Method Parameters detected". Spring 6+, Spring Boot 3+, and Scala use this flag by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: /tracing/dynamic_instrumentation/
[8]: https://github.com/DataDog/dd-trace-java
[9]: /dynamic_instrumentation/#prerequisites
[10]: /tracing/trace_collection/dd_libraries/java/
