---
title: Dynamic Instrumentation
description: Add instrumentation to your running production systems without restarts to collect metrics, spans, and tags from any location in your code.
content_filters:
  - trait_id: prog_lang
    option_group_id: dynamic_instrumentation_language_options
    label: "Language"
aliases:
  - /dynamic_instrumentation/how-it-works/
  - /dynamic_instrumentation/
  - /tracing/dynamic_instrumentation/
  - /tracing/trace_collection/dynamic_instrumentation/enabling/
  - /dynamic_instrumentation/enabling/
  - /tracing/dynamic_instrumentation/enabling
  - /dynamic_instrumentation/enabling/java/
  - /tracing/dynamic_instrumentation/enabling/java
  - /dynamic_instrumentation/enabling/python/
  - /tracing/dynamic_instrumentation/enabling/python
  - /dynamic_instrumentation/enabling/dotnet/
  - /tracing/dynamic_instrumentation/enabling/dotnet
  - /dynamic_instrumentation/enabling/php/
  - /tracing/dynamic_instrumentation/enabling/php
further_reading:
  - link: "/dynamic_instrumentation/expression-language/"
    tag: "Documentation"
    text: "Learn more about the Dynamic Instrumentation Expression Language"
  - link: "/dynamic_instrumentation/sensitive-data-scrubbing/"
    tag: "Documentation"
    text: "Removing sensitive information from your Dynamic Instrumentation data"
  - link: "/tracing/trace_collection/dd_libraries"
    tag: "Documentation"
    text: "Learn more about how to instrument your application"
  - link: "/getting_started/tagging/unified_service_tagging/"
    tag: "Documentation"
    text: "Unified Service Tagging"
  - link: "/internal_developer_portal/catalog/"
    tag: "Documentation"
    text: "Discover and catalog the services reporting to Datadog"
  - link: "/metrics"
    tag: "Documentation"
    text: "Learn more about Metrics"
---

## Overview

Dynamic Instrumentation lets you add metrics, spans, and span tags to running production systems without restarts or code changes, including in third-party libraries.

If you are interested in trying out the latest user experience improvements for Dynamic Instrumentation, consider opting into the [autocomplete and search Preview][17].

## Getting started

### Prerequisites

Dynamic Instrumentation supports Java, Python, .NET, and PHP. It requires the following:

- [Datadog Agent][1] 7.49.0 or higher is installed alongside your service.
- [Remote Configuration][2] is enabled in that Agent.
- A supported Datadog SDK is installed and up to date. See the [Enable Dynamic Instrumentation](#enable-dynamic-instrumentation) section for version requirements.
- [Unified Service Tagging][6] tags `service`, `env`, and `version` are applied to your deployment.
- Recommended: [Source Code Integration][7] is set up for your service.

### Permissions

The following permissions are required to use Dynamic Instrumentation:

- **Dynamic Instrumentation Read Configuration** (`debugger_read`): Required to access the Dynamic Instrumentation page.
- One of the following write permissions:
  - **Dynamic Instrumentation Write Configuration** (`debugger_write`): Required to create or modify instrumentations in any environment.
  - **Dynamic Instrumentation Write Pre-Prod** (`debugger_write_preprod`): Required to create or modify instrumentations in known pre-production environments only (such as staging or QA).

For more information about roles and how to assign roles to users, see [Role Based Access Control][8].

### Enable Dynamic Instrumentation

{% alert %}
Dynamic Instrumentation and [Live Debugger](/tracing/live_debugger/) share the same enablement state per service and environment: enabling or disabling one also enables or disables the other. The two products have separate permissions and Settings pages.
{% /alert %}

#### (Recommended) In-app enablement {% #in-app-enablement %}

Manage Dynamic Instrumentation for each service and environment from the [Dynamic Instrumentation Settings page][16]. In-app enablement is supported on the following minimum SDK versions:

- [Java][18] ≥ 1.48.0
- [Python][19] ≥ 3.10.0
- [.NET][20] ≥ 3.29.0

If your SDK meets the minimum version and all prerequisites are met, Datadog automatically attempts to enable the service the first time you create an instrumentation for it.

#### Manual enablement

Manual enablement is required for PHP and for older SDK versions of Java, Python, and .NET. You can also choose manual enablement on supported SDK versions if you prefer to manage enablement through environment variables (for example, to enable Dynamic Instrumentation in bulk across many services).

Select your runtime from the dropdown above for manual enablement instructions.

<!-- Java -->
{% if equals($prog_lang, "java") %}

##### Prerequisites

Java applications also require:

- JDK version 8 or higher.
- Tracing library [`dd-java-agent.jar`][21] version 1.34.0 or higher. See the [installation instructions][22] for setup details.

##### Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Download `dd-java-agent.jar`:

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

3. Run your service with Dynamic Instrumentation enabled by setting the `-Ddd.dynamic.instrumentation.enabled` flag or `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `dd.service`, `dd.env`, and `dd.version` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.

{% tabs %}

{% tab label="Command arguments" %}

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

{% /tab %}

{% tab label="Environment variables" %}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{% /tab %}

{% /tabs %}

   **Note**: The `-javaagent` argument needs to be before `-jar`, adding it as a JVM option rather than an application argument. For more information, see the [Oracle documentation][23]:

   ```shell
   # Good:
   java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
   # Bad:
   java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

4. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [Dynamic Instrumentation page][12].

##### Limitations

- On JDK 18 and below, classes compiled with the `-parameters` flag may fail to instrument with the error message "Method Parameters detected". Spring 6+, Spring Boot 3+, and Scala use this flag by default.

{% /if %}
<!-- end Java -->

<!-- Python -->
{% if equals($prog_lang, "python") %}

##### Prerequisites

Python applications also require:

- Tracing library [`ddtrace`][24] version 2.2.0 or higher. See the [installation instructions][25] for setup details.

##### Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.

2. Install `ddtrace`, which provides both tracing and Dynamic Instrumentation:

   ```shell
   pip install ddtrace
   ```

3. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.

{% tabs %}

{% tab label="Environment variables" %}

Invoke your service:

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```

{% /tab %}

{% tab label="In code" %}

```python
import os

os.environ["DD_DYNAMIC_INSTRUMENTATION_ENABLED"] = "true"

import ddtrace.auto  # IMPORTANT: this must be imported as soon as possible.
```

{% /tab %}

{% /tabs %}

4. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end Python -->

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}

##### Prerequisites

.NET applications also require:

- .NET SDK version 2.54.0 or higher. See the installation instructions for [.NET Framework][26] or [.NET Core][27].

##### Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
2. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
3. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end .NET -->

<!-- PHP -->
{% if equals($prog_lang, "php") %}

##### Prerequisites

PHP applications also require:

- Tracing library [`dd-trace-php`][28] version 1.5.0 or higher. See the [installation instructions][29] for setup details.

##### Installation

1. If you don't already have APM enabled, in your Agent configuration, set the `DD_APM_ENABLED` environment variable to `true` and listening to the port `8126/TCP`.
2. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`. Specify `DD_SERVICE`, `DD_ENV`, and `DD_VERSION` Unified Service Tags so you can filter and group your instrumentations and target active clients across these dimensions.
3. After starting your service with Dynamic Instrumentation enabled, you can start using Dynamic Instrumentation on the [Dynamic Instrumentation page][12].

##### Limitations

###### Supported features

- Metrics, Spans, and Span Tags
- [PII redaction][30] based on variable/property names and classes
- [Source code integration][31]

###### Unsupported features

- Instrumentation attached to a specific file/line

{% /if %}
<!-- end PHP -->

{% if includes($prog_lang, ["java", "python", "dot_net", "php"]) %}

##### Configuration

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable | Type | Description |
| -------------------- | ---- | ----------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED` | Boolean | Set to `true` to enable Dynamic Instrumentation. For Java, this is an alternate for the `-Ddd.dynamic.instrumentation.enabled` argument. |
| `DD_SERVICE` | String | The [service][6] name, for example, `web-backend`. |
| `DD_ENV` | String | The [environment][6] name, for example, `production`. |
| `DD_VERSION` | String | The [version][6] of your service. |
| `DD_TAGS` | String | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`. |

{% /if %}

### Limitations

- Dynamic Instrumentation is not compatible with Azure App Services or serverless environments.
- Not all instrumentation types are supported in every language. Select your language from the dropdown above for supported features and limitations.
- The Java SDK does not support Kotlin coroutines.

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing at runtime. By adding an instrumentation at a specific code location, you can capture additional telemetry from your application without the need to change code or redeploy it.

### Using instrumentations

An instrumentation allows you to collect additional telemetry from specific points in your code without halting the execution of the program.

Dynamic spans, span tags, and metrics are a UI-based alternative to adding custom instrumentation directly to your source code. Datadog receives the instrumentation configurations you define and dynamically applies them to the running service without requiring restarts.

Datadog captures and processes spans, tags, and metrics generated by Dynamic Instrumentation like other telemetry from the running application. Unlike manual custom instrumentation, Dynamic Instrumentation does not require code changes, deployments, or service restarts. To stop collecting data, disable the instrumentation in Datadog.

### Creating an instrumentation

All instrumentation types require the same initial setup:

1. Go to the [Dynamic Instrumentation page][12].
1. Click {% ui %}Create Instrumentation{% /ui %} in the top right, or click the three-dot menu on a service and select {% ui %}Add an instrumentation for this service{% /ui %}.
1. If they are not prefilled, choose service, runtime, environment, and version (optional).
1. Specify where to set the instrumentation in the source code by selecting either a class and method, or a specific line of code in a file. When autocomplete and search are available, use them to find files, methods, or symbols.

For the best experience, set up [Source Code Integration][7] to view code directly in Datadog and select instrumentation locations as you would with breakpoints in an IDE.

For creation steps specific to each instrumentation type, see the following sections.

{% alert %}
Dynamic log instrumentations are supported in [Live Debugger](/tracing/live_debugger/). Use Live Debugger to capture logs and variable snapshots in real time from running applications.
{% /alert %}

### Creating dynamic metrics

A dynamic metric emits a metric when it executes. To create a dynamic metric:

1. Select {% ui %}Metric{% /ui %} as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, and location).
1. Specify a name for the metric, which is prefixed with `dynamic.instrumentation.metric.probe.`.
1. Select a metric type (count, gauge, or histogram).
1. Choose the value of the metric using the [Dynamic Instrumentation expression language][15]. You can use any numeric value you'd like from the execution context, such as a method parameter, local variable, a class field, or an expression that yields a numeric value. For count metrics this is optional, and if you omit it, every invocation increments the count by one.

Metric instrumentations are automatically enabled on all service instances that match the configured environment and version. Metric instrumentations are not rate limited and execute every time the method or line is invoked.

Dynamic Instrumentation supports the following metric types:

- {% ui %}Count{% /ui %}: Counts how many times a given method or line is executed. Can be combined with [metric expressions][15] to use the value of a variable to increment the count.
- {% ui %}Gauge{% /ui %}: Generates a gauge based on the last value of a variable. This metric requires a [metric expression][15].
- {% ui %}Histogram{% /ui %}: Generates a statistical distribution of a variable. This metric requires a [metric expression][15].

### Creating dynamic spans

A dynamic span emits a span when a method is executed. To create a dynamic span:

1. Select {% ui %}Span{% /ui %} as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, version, and location).

You can use a dynamic span as an alternative to [creating spans with Custom Instrumentation][13]. If the method throws an exception, the details of the exception are associated with the newly created span's `error` tag.

### Creating dynamic span tags

A dynamic span tag adds a tag value to an existing span. You can add a tag to either the _active_ span or the _service entry_ span.

**Note**: Internal spans are not indexed by default and so might not be searchable in APM.

To create a dynamic span tag:

1. Select {% ui %}Span Tag{% /ui %} as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, version, and location).
1. Specify a name for the tag.
1. Specify the value of the tag using the [Dynamic Instrumentation expression language][15].
1. Optionally define a condition using the Dynamic Instrumentation expression language. The tag is added only when the expression evaluates to true.
1. Optionally add additional tags, each with their own name, expression, and optional condition.

You can use a *dynamic span tag* as an alternative to [using Custom Instrumentation to add tags in code][14].

[1]: /agent/
[2]: /tracing/guide/remote_config
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /integrations/guide/source-code-integration/
[8]: /account_management/rbac/permissions#apm
[12]: https://app.datadoghq.com/dynamic-instrumentation
[13]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[14]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags
[15]: /dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/settings
[17]: /dynamic_instrumentation/symdb/
[18]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[19]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[20]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[21]: https://github.com/DataDog/dd-trace-java
[22]: /tracing/trace_collection/dd_libraries/java/
[23]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[24]: https://github.com/DataDog/dd-trace-py
[25]: /tracing/trace_collection/dd_libraries/python/
[26]: /tracing/trace_collection/dd_libraries/dotnet-framework/
[27]: /tracing/trace_collection/dd_libraries/dotnet-core/
[28]: https://github.com/DataDog/dd-trace-php
[29]: /tracing/trace_collection/dd_libraries/php/
[30]: /dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction
[31]: /integrations/guide/source-code-integration/?tab=php
