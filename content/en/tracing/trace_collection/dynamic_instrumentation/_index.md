---
title: Dynamic Instrumentation
description: Add instrumentation to your running production systems without restarts to collect metrics, spans, and tags from any location in your code.
aliases:
    - /dynamic_instrumentation/how-it-works/
    - /dynamic_instrumentation/
    - /tracing/dynamic_instrumentation/
is_beta: false
private: false
further_reading:
- link: "/dynamic_instrumentation/expression-language/"
  tag: "Documentation"
  text: "Learn more about the Dynamic Instrumentation Expression Language"
- link: "dynamic_instrumentation/sensitive-data-scrubbing/"
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

Dynamic Instrumentation allows you to add instrumentation into your running production systems without any restarts and at any location in your application's code, including third-party libraries. You can add or modify telemetry for metrics, spans, and corresponding tagging, from the Datadog UI. Dynamic Instrumentation has low overhead and has no side effects on your system.

If you are interested in trying out the latest user experience improvements for Dynamic Instrumentation, consider opting into the [autocomplete and search Preview][17].

## Getting started

### Prerequisites

Dynamic Instrumentation requires the following:

- [Datadog Agent][1] 7.49.0 or higher is installed alongside your service (7.73.0 or higher for Go).
- [Remote Configuration][2] is enabled in that Agent.
- A supported Datadog SDK is installed and up to date. See the [language-specific setup instructions](#enable-dynamic-instrumentation) for version requirements.
- [Unified Service Tagging][6] tags `service`, `env`, and `version` are applied to your deployment.
- Recommended: [Autocomplete and search (in Preview)][17] are enabled.
- Recommended: [Source Code Integration][7] is set up for your service.

### Permissions

The following permissions are required to use Dynamic Instrumentation:

- **Dynamic Instrumentation Read Configuration** (`debugger_read`) - Required to access the Dynamic Instrumentation page.
- One of the following write permissions:
  - **Dynamic Instrumentation Write Configuration** (`debugger_write`) - Required to create or modify instrumentations in any environment.
  - **Dynamic Instrumentation Write Pre-Prod** (`debugger_write_preprod`) - Required to create or modify instrumentations in known pre-production environments only (such as staging or QA).
- **Dynamic Instrumentation Capture Variables** (`debugger_capture_variables`) - Required to use the **Capture method parameters and local variables** option.

For more information about roles and how to assign roles to users, see [Role Based Access Control][8].

### Enable Dynamic Instrumentation

Dynamic Instrumentation supports Java, Python, .NET, and PHP. Manage Dynamic Instrumentation for each service and environment from the [Dynamic Instrumentation Settings page][16]. Select a service and environment to see its current status, then use the **Enable Dynamic Instrumentation** or **Disable Dynamic Instrumentation** action to change it.

On supported tracer versions, you do not need to enable a service from the Settings page first. Datadog automatically attempts to enable the service the first time you create an instrumentation for it, as long as all prerequisites are met.

#### In-app enablement

In-app enablement is supported on the following minimum tracer versions:

- [Java][18] ≥ 1.64.0
- [Python][19] ≥ 4.11.0
- [.NET][20] ≥ 3.46.0

Datadog recommends keeping your tracer up to date to take advantage of in-app enablement.

#### Manual enablement

Manual enablement is required for PHP, and for older tracer versions of Java, Python, and .NET. You can also choose manual enablement on supported tracer versions if you prefer to manage enablement through environment variables, for example, to enable Dynamic Instrumentation in bulk across many services.

Select your runtime for manual enablement instructions:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/php" src="integrations_logos/php.png" alt="PHP" >}}
{{< /card-grid >}}

<div class="alert alert-info">Dynamic Instrumentation and <a href="/tracing/live_debugger/">Live Debugger</a> share the same enablement state per service and environment. Enabling or disabling one also enables or disables the other for that service and environment, although the two products have separate permissions and Settings pages.</div>

### Limitations

- Dynamic Instrumentation is not compatible with Azure App Services or serverless environments.
- Not all instrumentation types are supported in every language. See the [language-specific setup instructions](#enable-dynamic-instrumentation) for supported features and limitations.
- The Java SDK does not support Kotlin coroutines.

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing at runtime. By adding an instrumentation at a specific code location, you can capture additional telemetry from your application without the need to change code or redeploy it.

### Using instrumentations

An instrumentation allows you to collect additional telemetry from specific points in your code without halting the execution of the program.

Dynamic spans, span tags, and metrics are a UI-based alternative to manually adding custom instrumentation directly to your source code. The instrumentation configurations you define in the Datadog platform are received and dynamically applied to the running service - no restarts required. The new telemetry is collected when the specific part of the code defined in the instrumentation configuration is executed.

Spans, tags, and metrics generated by Dynamic Instrumentation will be captured and processed in Datadog like any other telemetry produced by your running application. The benefit of using Dynamic Instrumentation over manual custom instrumentation is that there's no need to change code, deploy it, or restart a service. You can begin capturing the additional data points within seconds, without disturbing the user experience or requiring lengthy deployments. Turning off individual dynamic instrumentations is also easy - just disable the instrumentation in the Datadog app to stop collecting that data.

### Creating an instrumentation

All instrumentation types require the same initial setup:

1. Go to the [Dynamic Instrumentation page][12].
1. Click **Create Instrumentation** in the top right, or click the three-dot menu on a service and select **Add an instrumentation for this service**.
1. If they are not prefilled, choose service, runtime, environment, and version (optional).
1. Specify where to set the instrumentation in the source code by specifying either a class and method, or a specific line of code in a given file. In most cases, there should be an autocomplete search available for you to easily find the files, methods, or symbols you're looking for.

For the best experience, we strongly recommend setting up your [Source Code Integration][7], so that you can see your code directly in Datadog and select the instrumentation code location - like you would with a breakpoint in an IDE.

See the individual instrumentation types below for specific creation steps for each instrumentation type.

<div class="alert alert-info">Dynamic log instrumentations are supported in <a href="/tracing/live_debugger/">Live Debugger</a>. Use Live Debugger to capture logs and variable snapshots in real time from running applications.</div>

### Creating dynamic metrics

A dynamic metric emits a metric when it executes.

To create a dynamic metric:

1. Select **Metric** as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, and location).
1. Specify a name for the metric, which will be prefixed with `dynamic.instrumentation.metric.probe.`.
1. Select a metric type (count, gauge, or histogram).
1. Choose the value of the metric using the [Dynamic Instrumentation expression language][15]. You can use any numeric value you'd like from the execution context, such as a method parameter, local variable, a class field, or an expression that yields a numeric value. For count metrics this is optional, and if you omit it, every invocation increments the count by one.

Metric instrumentations are automatically enabled on all service instances that match the configured environment and version. Metric instrumentations are not rate limited and execute every time the method or line is invoked.

Dynamic Instrumentation supports the following metric types:

- **Count**: Counts how many times a given method or line is executed. Can be combined with [metric expressions][15] to use the value of a variable to increment the count.
- **Gauge**: Generates a gauge based on the last value of a variable. This metric requires a [metric expression][15].
- **Histogram**: Generates a statistical distribution of a variable. This metric requires a [metric expression][15].

### Creating dynamic spans

A *dynamic span* emits a span when a method is executed.

To create a dynamic span:

1. Select **Span** as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, version, and location).

You can use a *dynamic span* as an alternative to [creating new spans with Custom Instrumentation][13]. If the method throws an exception, the details of the exception are associated with the newly created span's `error` tag.

### Creating dynamic span tags

A *dynamic span tag* adds a tag value to an existing span. You can add a tag either to the _active_ span or to the _service entry_ span.
Keep in mind that internal spans are not indexed by default and so might not be searchable in APM.

To create a dynamic span tag:

1. Select **Span Tag** as the instrumentation type.
1. Complete the [generic instrumentation setup](#creating-an-instrumentation) (choose service, environment, version, and location).
1. Specify a name for the tag.
1. Specify the value of the tag using the [Dynamic Instrumentation expression language][15].
1. Optionally define a condition using the Dynamic Instrumentation expression language. The tag will only be added when the expression evaluates to true.
1. Optionally add additional tags, each with their own name, expression, and optional condition.


You can use a *dynamic span tag* as an alternative to [using Custom Instrumentation to add tags in code][14].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

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
