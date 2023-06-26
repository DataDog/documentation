---
title: Dynamic Instrumentation
kind: documentation
aliases:
    - /tracing/dynamic_instrumentation/
is_beta: true
private: false
further_reading:
- link: "/dynamic_instrumentation/how-it-works/"
  tag: "Documentation"
  text: "Learn more about how Dynamic Instrumentation works"
- link: "/tracing/trace_collection/dd_libraries"
  tag: "Documentation"
  text: "Learn more about how to instrument your application"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
- link: "/tracing/services/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "/metrics"
  tag: "Documentation"
  text: "Learn more about Metrics"
---

Dynamic Instrumentation lets you capture data from your production systems at any location in your application's code, including third-party libraries. Dynamic Instrumentation has low overhead and is guaranteed to have no side effects on your system.

# Getting started

## Prerequisites
Dynamic Instrumentation requires the following:

- [Datadog Agent][1] 7.44.0 or higher is installed alongside your service.
- [Remote Configuration][2] is enabled in that Agent.
- For Java applications, tracing library [`dd-trace-java`][3] 1.15.0 or higher.
- For Python applications, tracing library [`dd-trace-py`][4] 1.15.0 or higher.
- For .NET applications, tracing library [`dd-trace-dotnet`][5] 2.32.0 or higher.
- [Unified Service Tagging][6] tags `service`, `env`, and `version` are applied to your deployment.
- Optionally, [Source Code Integration][7] is set up for your service.

**Note**: The "Dynamic Instrumentation Read Configuration" (`debugger_read`) permission is required to access the Dynamic Instrumentation page, and the "Dynamic Instrumentation Write Configuration" (`debugger_write`) permission is required to create or modify instrumentations. For more information about roles and on how to assign roles to users, see [Role Based Access Control][8].

### Create a logs index

Dynamic Instrumentation allows you to create "Dynamic Logs" that are sent to Datadog and appear alongside your regular application logs.

If you use [Exclusion filters][9], ensure Dynamic Instrumentation logs are not filtered:

1. Create a logs index and [configure it][10] to the desired retention with **no sampling**.
2. Set the filter to match on `source:dd_debugger` (all Dynamic Instrumentation logs have this source).
3. Ensure that the new index takes precedence over any other with filters that match that tag, because the first match wins.

## Enable Dynamic Instrumentation

To enable Dynamic Instrumentation on a service, go to the [in-app setup page][16]. 

For more detailed instructions, select the relevant runtime below:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing at runtime. By adding a Dynamic Instrumentation probe you are exporting additional data from your application, without the need to do any code change or redeployment.

# Using Probes

A probe allows you to collect data from specific points in your code without halting the execution of the program. 

If you're a SRE, you can think of probes as a way of enhancing your observability by adding dynamic logs, metrics, and spans to running application without needing to stop or restart anything. This meant you can gather data immediately without disturbing the user experience or requiring lengthy deployments.

If you're a developer, you can think of a probe as a "non-breaking breakpoint". In traditional debugging, a breakpoint is a point in the program where the execution stops, allowing the developer to inspect the state of the program at that point. However, in real-world production environments, it's not practical or even possible to stop the execution of the program. Probes fill in this gap by allowing you to inspect variable state in production environments in a completely non-intrusive way.

## Creating a probe

All probe types require the same initial setup:

1. Go to the [Dynamic Instrumentation page][12].
1. Click **Create Probe** in the top right, or click the three dot context menu on a service and select **Add a probe for this service**.
1. If not prefilled, choose service, runtime, environment and version.
1. In the source code, specify where to set the probe by selecting either a class and method or a source file and line. 
   If you set up Source Code Integration for your service, autocomplete shows suggestions for the selecting a file and displays the file's code so you can choose the line.

## Probe Types

### Log Probes

A *log probe* emits a log when it executes. 

Log probes are enabled by default on all service instances that match the specified environment and version. They are rate limited to execute at most 5000 times per second, on each instance of your service.

If you enable `Capture method parameters and local variables` on the log probe, the following debugging data will be captured and added it to the log event:
  - **Method arguments**, **local variables**, and **fields**, with the following limits by default:
    - Follow references three levels deep (configurable in the UI).
    - The first 100 items inside collections.
    - The first 255 characters for string values.
    - 20 fields inside objects. Static fields are not collected.
  - Call **stack trace**.
  - Caught and uncaught **exceptions**.

Because capturing this data is performance-intensive, by default it is enabled on only one instance of your service that matches the specified environment and version. Probes with this setting enabled are rate limited to one hit per second.

You must set a log message template on every log probe. The template supports embedding [expressions](#expression-language) inside curly brackets. For example: `User {user.id} purchased {count(products)} products`.

You can also set a condition on a log probe using the [expression language](#expression-language). The expression must evaluate to a Boolean. The probe executes if the expression is true, and does not capture or emit any data if the expression is false.

To create a log probe:

1. Select **Log** as the probe type.
1. Complete the generic probe setup (choose service, environment, version, and probe location).
1. Define a log message template. You can use the Dynamic Instrumentation expression language to reference values from the execution context.
1. Optionally enable extra data capturing from the probe.
1. Optionally define a condition using the Dynamic Instrumentation expression language. The log is emitted when the expression evaluates to true.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Creating a Dynamic Instrumentation log probe" >}}

### Metric probes

A *metric probe* emits a metric when it executes. 

Metric probes are automatically enabled on all service instances that match the configured environment and version. Metric probes are not rate limited and execute every time the method or line is invoked.

Dynamic Instrumentation metric probes support the following metric types:

- [**Count**][1]: Counts how many times a given method or line is executed. Can be combined with [metric expressions](#expression-language) to use the value of a variable to increment the count.
- [**Gauge**][2]: Generates a gauge based on the last value of a variable. This metric requires a [metric expression](#expression-language).
- [**Histogram**][3]: Generates a statistical distribution of a variable. This metric requires a [metric expression](#expression-language).

To create a metric probe:

1. Select **Metric** as the probe type.
1. Complete the generic probe setup (choose service, environment, version, and probe location).
1. Specify a name for the metric, which will be prefixed with `dynamic.instrumentation.metric.probe.`.
1. Select a metric type (count, gauge, or histogram).
1. Choose the value of the metric using the [Dynamic Instrumenation expression language][15]. You can use any numeric value you'd like from the execution context, such as a method parameter, local variable, a class field, or an expression that yields a numeric value. For count metrics this is optional, and if you omit it, every invocation increments the count by one.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Creating a Dynamic Instrumentation metric probe" >}}

### Span probes

A *span probe* emits a span when a method is executed. 

You can use a *span probe* as a more efficient alternative to [creating new spans with Custom Instrumentation][13]. If the method throws an exception, the details of the exception will be associated with the newly created span's `error` tag.

To create a span probe:

1. Select **Span** as the probe type.
1. Complete the generic probe setup (choose service, environment, version, and probe location). 


### Span tag probes

A *span tag* probe decorates an existing span with a tag value.  

You can use a *span tag probe* as a more efficient alternative to [using Custom Instrumentation to addings tags in code][14].

To create a span tag probe:

1. Select **Span Tag** as the probe type.
1. Complete the generic probe setup (choose service, environment, version, and probe location). 
1. Specify a name for the tag.
1. Specify the value of the tag using the [Dynamic Instrumentation expression language][15]. 
1. Optionally define a condition using the Dynamic Instrumentation expression language. The tag will only be added when the expression evaluates to true.
1. Optionally add additional tags, each with their own name, expression, and optional condition.
 
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[10]: /logs/log_configuration/indexes/#add-indexes
[11]: /dynamic_instrumentation/how-it-works/
[12]: https://app.datadoghq.com/dynamic-instrumentation
[13]: /tracing/trace_collection/custom_instrumentation/java/#adding-spans
[14]: /tracing/trace_collection/custom_instrumentation/java/#adding-tags
[15]: /dynamic_instrumentation/expression-language
[16]: https://app.datadoghq.com/dynamic-instrumentation/setup
[2]: /agent/remote_config/
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-py
[5]: https://github.com/DataDog/dd-trace-dotnet
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /integrations/guide/source-code-integration/
[8]: /account_management/rbac/permissions#apm
[9]: /logs/log_configuration/indexes/#exclusion-filters