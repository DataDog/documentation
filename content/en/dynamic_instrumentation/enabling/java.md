---
title: Enable Dynamic Instrumentation for Java
kind: Documentation
aliases:
    - /tracing/dynamic_instrumentation/enabling/java/
is_beta: false
private: false
code_lang: java
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of supporting Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, ensure your Agent and tracing library are on the required version, and go directly to enabling Dynamic Instrumentation in step 4.

## Requirements

- The Datadog Dynamic Instrumentation library is supported in JDK version 8 and above.
- Optionally, [autocomplete and search (open beta)][7] is enabled.

## Installation

1. Install or upgrade your Agent to version [7.44.0 (recommended 7.45.0)][2] or higher.
2. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

3. Download `dd-java-agent.jar`:
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

   **Note**: Dynamic Instrumentation is available in the `dd-java-agent.jar` library in versions 1.24.0 (recommended 1.34.0) and later.

3. Run your service with Dynamic Instrumentation enabled by setting `-Ddd.dynamic.instrumentation.enabled` flag or `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` Unified Service Tags so you can filter and group your probes and target active clients across these dimensions.
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
| `DD_ENV`                                         | String        | The [environment][5] name, for example: `production`.                                                                     |
| `DD_VERSION`                                     | String        | The [version][5] of your service.                                                                                         |
| `DD_TAGS`                                        | String        | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.   |

## What to do next

See [Dynamic Instrumentation][6] for information about setting snapshot and metric probes and browsing and indexing the data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: /tracing/dynamic_instrumentation/
[7]: /dynamic_instrumentation/symdb/
