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
  - /tracing/trace_collection/dynamic_instrumentation/enabling/java/
  - /dynamic_instrumentation/enabling/python/
  - /tracing/dynamic_instrumentation/enabling/python
  - /tracing/trace_collection/dynamic_instrumentation/enabling/python/
  - /dynamic_instrumentation/enabling/dotnet/
  - /tracing/dynamic_instrumentation/enabling/dotnet
  - /tracing/trace_collection/dynamic_instrumentation/enabling/dotnet/
  - /dynamic_instrumentation/enabling/php/
  - /tracing/dynamic_instrumentation/enabling/php
  - /tracing/trace_collection/dynamic_instrumentation/enabling/php/
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

**Note**: Dynamic Instrumentation is not compatible with Azure App Services or serverless environments.

## Requirements

<!-- Java -->
{% if equals($prog_lang, "java") %}

- **[Datadog Java SDK][18]** (JDK 8 or higher)
  - Minimum for [in-app enablement](#enable-in-app): 1.48.0
  - Minimum for [manual enablement](#enable-with-environment-variables): 1.34.0
  - Does not support Kotlin coroutines
- **[Datadog Agent][1]**, version 7.49.0 or higher

{% /if %}
<!-- end Java -->

<!-- Python -->
{% if equals($prog_lang, "python") %}

- **[Datadog Python SDK (`ddtrace`)][19]**
  - Minimum for [in-app enablement](#enable-in-app): 3.10.0
  - Minimum for [manual enablement](#enable-with-environment-variables): 2.2.0
- **[Datadog Agent][1]**, version 7.49.0 or higher

{% /if %}
<!-- end Python -->

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}

- Datadog .NET SDK ([.NET Framework][22] or [.NET Core][20])
  - Minimum for [in-app enablement](#enable-in-app): 3.29.0
  - Minimum for [manual enablement](#enable-with-environment-variables): 2.54.0
- **[Datadog Agent][1]**, version 7.49.0 or higher

{% /if %}
<!-- end .NET -->

<!-- PHP -->
{% if equals($prog_lang, "php") %}

- **[Datadog PHP SDK (`dd-trace-php`)][21]**, minimum version 1.5.0
  - File and line instrumentations are not supported
- **[Datadog Agent][1]**, version 7.49.0 or higher

{% /if %}
<!-- end PHP -->

### Datadog configuration

- **[Unified Service Tagging][6]** configured with `service`, `env`, and `version` tags on your deployment
- **[Remote Configuration][2]** enabled in the Agent
- (Recommended) **[Source Code Integration][7]**

### Permissions

The following permissions are required to use Dynamic Instrumentation:

- **Dynamic Instrumentation Read Configuration** (`debugger_read`): Required to access the Dynamic Instrumentation page.
- One of the following write permissions:
  - **Dynamic Instrumentation Write Configuration** (`debugger_write`): Required to create or modify instrumentations in any environment.
  - **Dynamic Instrumentation Write Pre-Prod** (`debugger_write_preprod`): Required to create or modify instrumentations in known pre-production environments only (such as staging or QA).

For more information about roles and how to assign roles to users, see [Role Based Access Control][8].

## Enable Dynamic Instrumentation {% #enable-dynamic-instrumentation %}

{% alert %}
Dynamic Instrumentation and [Live Debugger](/tracing/live_debugger/) share the same enablement state per service and environment: enabling or disabling one also enables or disables the other. The two products have separate permissions and Settings pages.
{% /alert %}

{% if includes($prog_lang, ["java", "python", "dot_net"]) %}

You can enable Dynamic Instrumentation in-app or with environment variables.

### Enable in-app (recommended) {% #enable-in-app %}

Enable Dynamic Instrumentation in-app in one of two ways:

- On the [Dynamic Instrumentation Settings page][16], enable the service and environment.
- Create an instrumentation. Dynamic Instrumentation is enabled automatically on the selected service and environment.

### Enable with environment variables {% #enable-with-environment-variables %}

Set the following environment variables if your SDK is below the [in-app minimum](#requirements), or if you want to manage enablement outside the Datadog UI.

{% /if %}

<!-- Java -->
{% if equals($prog_lang, "java") %}

1. If you don't already have APM enabled, set `DD_APM_ENABLED=true` in your Agent configuration and listen on port `8126/TCP`.
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

3. Start your service with Dynamic Instrumentation enabled. The `-javaagent` argument must come before `-jar`:

    {% tabs %}

    {% tab label="Command arguments" %}

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

    **Note**: On JDK 18 and earlier, classes compiled with the `-parameters` flag (default in Spring 6+, Spring Boot 3+, and Scala) may fail to instrument with the error `Method Parameters detected`.

4. After you start your service with Dynamic Instrumentation enabled, you can start using it on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end Java -->

<!-- Python -->
{% if equals($prog_lang, "python") %}

1. If you don't already have APM enabled, set `DD_APM_ENABLED=true` in your Agent configuration and listen on port `8126/TCP`.
2. Install `ddtrace`:

    ```shell
    pip install ddtrace
    ```

3. Enable Dynamic Instrumentation with environment variables or in code:

    {% tabs %}

    {% tab label="Environment variables" %}

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

    import ddtrace.auto  # this must be imported as soon as possible
    ```

    {% /tab %}

    {% /tabs %}

4. After you start your service with Dynamic Instrumentation enabled, you can start using it on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end Python -->

<!-- .NET -->
{% if equals($prog_lang, "dot_net") %}

1. If you don't already have APM enabled, set `DD_APM_ENABLED=true` in your Agent configuration and listen on port `8126/TCP`.
2. Start your service with the following environment variables set:

    ```shell
    DD_SERVICE=<YOUR_SERVICE>
    DD_ENV=<YOUR_ENV>
    DD_VERSION=<YOUR_VERSION>
    DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
    ```

3. After you start your service with Dynamic Instrumentation enabled, you can start using it on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end .NET -->

<!-- PHP -->
{% if equals($prog_lang, "php") %}

1. If you don't already have APM enabled, set `DD_APM_ENABLED=true` in your Agent configuration and listen on port `8126/TCP`.
2. Start your service with the following environment variables set:

    ```shell
    DD_SERVICE=<YOUR_SERVICE>
    DD_ENV=<YOUR_ENV>
    DD_VERSION=<YOUR_VERSION>
    DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
    ```

3. After you start your service with Dynamic Instrumentation enabled, you can start using it on the [Dynamic Instrumentation page][12].

{% /if %}
<!-- end PHP -->

## Configure Dynamic Instrumentation

Configure Dynamic Instrumentation using the following environment variables:

| Environment variable | Type | Description |
| -------------------- | ---- | ----------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED` | Boolean | Set to `true` to enable Dynamic Instrumentation. |
| `DD_SERVICE` | String | The [service][6] name, for example, `web-backend`. |
| `DD_ENV` | String | The [environment][6] name, for example, `production`. |
| `DD_VERSION` | String | The [version][6] of your service. |
| `DD_TAGS` | String | Tags to apply to produced data. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`. |

## Explore Dynamic Instrumentation {% #explore-dynamic-instrumentation %}

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
1. {% if includes($prog_lang, ["java", "python", "dot_net"]) %}Specify where to set the instrumentation in the source code by selecting either a class and method, or a specific line of code in a file.{% /if %}{% if equals($prog_lang, "php") %}Specify where to set the instrumentation in the source code by selecting a class and method.{% /if %} When autocomplete and search are available, use them to find files, methods, or symbols.

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

Metric instrumentations are automatically enabled on all service instances that match the configured environment and version. Metric instrumentations are not rate limited and execute every time the method{% if includes($prog_lang, ["java", "python", "dot_net"]) %} or line{% /if %} is invoked.

Dynamic Instrumentation supports the following metric types:

- {% ui %}Count{% /ui %}: Counts how many times a given method{% if includes($prog_lang, ["java", "python", "dot_net"]) %} or line{% /if %} is executed. Can be combined with [metric expressions][15] to use the value of a variable to increment the count.
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
[13]: /tracing/trace_collection/custom_instrumentation/server-side/
[14]: /tracing/trace_collection/custom_instrumentation/server-side/
[15]: /dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/settings
[17]: /dynamic_instrumentation/symdb/
[18]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[19]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[20]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[21]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[22]: /tracing/trace_collection/dd_libraries/dotnet-framework/
