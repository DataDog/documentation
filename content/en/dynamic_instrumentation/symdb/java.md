---
title: Enable Symbol Database for Java
is_beta: true
private: true
code_lang: java
type: multi-code-lang
code_lang_weight: 10
---

{{< beta-callout-private url="https://forms.gle/UG9EELAy8Li6z2jW8" >}}
Interested in an improved user experience when creating Dynamic Instrumentation probes? Join the Symbol Database private beta here.
{{< /beta-callout-private >}}

[Symbol Database][6] is a feature of Dynamic Instrumentation in private beta.

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-java`][6] 1.25.0 or higher is installed.

## Installation

To run your service with Dynamic Instrumentation enabled, and additionally enable Symbol Database uploads:

1. Set the `-Ddd.symbol.database.upload.enabled` flag or the `DD_SYMBOL_DATABASE_UPLOAD_ENABLED` environment variable to `true`. 
2. Set the `-Ddd.symbol.database.includes` flag or the `DD_SYMBOL_DATABASE_INCLUDES` environment variable to your package prefix (for example, `com.datadoghq`). The setting expects a comma-separated list, so you can add multiple prefixes. 
3. Specify the `dd.service` and `dd.version` [Unified Service Tags][5].

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
    -Ddd.symbol.database.upload.enabled=true \
    -Ddd.symbol.database.includes=<YOUR_PACKAGE_PREFIX> \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}

{{% tab "Environment variables" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
export DD_SYMBOL_DATABASE_INCLUDES=<YOUR_PACKAGE_PREFIX>
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

   **Note**: The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][3]:

   ```
   # Correct:
   $ java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags

   # Incorrect:
   $ java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

2. After starting your service with Symbol Database enabled, you can use Symbol Database's IDE-like features on the [APM > Dynamic Instrumentation page][4].

[1]: /dynamic_instrumentation
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: /dynamic_instrumentation/symdb
