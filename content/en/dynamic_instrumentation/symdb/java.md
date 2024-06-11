---
title: Enable autocomplete and search for Java
kind: Documentation
is_beta: true
private: false
code_lang: java
type: multi-code-lang
code_lang_weight: 10
---

{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in public beta.
{{< /beta-callout >}}

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-java`][6] 1.34.0 or higher is installed.

## Installation

Run your service with Dynamic Instrumentation enabled, and additionally enable autocomplete and search:

1. Set the `-Ddd.symbol.database.upload.enabled` flag or the `DD_SYMBOL_DATABASE_UPLOAD_ENABLED` environment variable to `true`.
2. Specify the `dd.service` and `dd.version` [Unified Service Tags][5].

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

3. After starting your service with Dynamic Instrumentation with autocomplete and search enabled, you can use Dynamic Instrumentation's IDE-like features on the [APM > Dynamic Instrumentation page][4].

## Additional configuration

### Third party detection

If your code is accidentally recognized as third-party code or third-party code is accidentally recognized as user code, you can configure the third-party detection with these settings:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

or:

```
  -Ddd.third.party.detection.excludes=<LIST_OF_USER_CODE_PACKAGE_PREFIXES> \
  -Ddd.third.party.detection.includes=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES> \
```


[1]: /dynamic_instrumentation
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: /dynamic_instrumentation/symdb
