---
title: Dynamic Instrumentation
kind: documentation
aliases:
    - /tracing/dynamic_instrumentation/
is_beta: true
private: true
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

{{< callout url="https://www.datadoghq.com/dynamic-instrumentation-request/" >}}
  Dynamic Instrumentation is in private beta. Fill out this form if you would like to
  access it.
{{< /callout >}}

Dynamic Instrumentation lets you capture data from your live applications without needing to do any code changes or redeployment.

## Getting started

### Requirements
Dynamic Instrumentation requires the following:

- [Datadog Agent][1] 7.41.1 or higher is installed alongside your service.
- [Remote Configuration][2] is enabled in that Agent.
- For Java applications, tracing library [`dd-trace-java`][3] 1.8.0 or higher.
- For Python applications, tracing library [`dd-trace-py`][4] 1.7.5 or higher.
- For .NET applications, tracing library [`dd-trace-dotnet`][5] 2.23.0 or higher.
- [Unified Service Tagging][6] tags `service`, `env`, and `version` are applied to your deployment.
- Optionally, [Source Code Integration][7] is set up for your service.

**Note**: `debugger_read` and `debugger_write` permissions are required to access the Dynamic Instrumentation page. For more information about roles and on how to assign roles to users, see [Role Based Access Control][8].

### Create a logs index

Dynamic Instrumentation logs are sent to Datadog and they appear alongside your application logs.

If you use [Exclusion filters][9], ensure Dynamic Instrumentation logs are not filtered:

1. Create a logs index and [configure it][10] to the desired retention with **no sampling**.
2. Set the filter to match on `source:dd_debugger` (all Dynamic Instrumentation logs have this source).
3. Ensure that the new index takes precedence over any other with filters that match that tag, because the first match wins.

### Enable Dynamic Instrumentation

To enable Dynamic Instrumentation on a service, select its runtime and follow the setup instructions:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing at runtime. By adding a Dynamic Instrumentation probe you are exporting additional data from your application, without the need to do any code change or redeployment.

### Creating a probe

Both log and metric probes require the same initial setup:

1. Go to the [Dynamic Instrumentation page][12].
1. Click **Create Probe** in the top right, or click the three dot context menu on a service and select **Add a probe for this service**.
1. If not prefilled, choose a service from the list.
1. If not prefilled, choose runtime, environment and version.
1. In the source code, specify where to set the probe by selecting either a class and method or a source file and line. 
   If you set up Source Code Integration for your service, autocomplete shows suggestions for the selecting a file and displays the file's code so you can choose the line.

### Creating a log probe

A *log probe* emits a log when it executes.

If you enable `Capture method parameters and local variables` on the log probe, it also captures the following values from the execution context and adds them to the log event:
- method arguments
- local variables
- class fields
- the call stack
- exceptions 
You can see the captured values in the Datadog UI. 

Because capturing this data is performance-intensive, it is enabled on only one instance of your service that matches the probe's environment and version settings. Probes with capture enabled are rate limited to execute once per second.

Log probes without extra data capturing are enabled on all service instances that match the specified environment and version. They are rate limited to execute at most 5000 times per second, on each service instance.

For more information, read [How Dynamic Instrumentation Works][11].

To create a log probe:

1. Complete the generic probe setup (choose service, environment, version, and probe location).
1. Select **Log** as the probe type.
1. Define a log message template. You can use the Dynamic Instrumentation expression language to reference values from the execution context.
1. Optionally enable extra data capturing from the probe.
1. Optionally define a condition using the Dynamic Instrumentation expression language. The log is emitted when the expression evaluates to true.

{{< img src="dynamic_instrumentation/log_probe.png" alt="Creating a Dynamic Instrumentation log probe" >}}

### Creating a metric probe

A *metric probe* emits a metric when it executes.

Metric probes are automatically enabled on all service instances that match the configured environment and version.
You can use the Dynamic Instrumentation expression language to reference numeric values from the context, such as a variable, a class field, or an expression that yields a numeric value.
For more information, read [How Dynamic Instrumentation Works][11].

To create a metric probe:

1. Complete the generic probe setup (choose service, environment, version, and probe location).
1. Select **Metric** as the probe type.
1. Specify a name for the metric, which will be prefixed with `dynamic.instrumentation.metric.probe.`.
1. Select a metric type (count, gauge, or histogram).
1. Choose the value of the metric using the Debugger expression language. For count metrics this is optional, and if you omit it, every invocation increments the count by one.

{{< img src="dynamic_instrumentation/metric_probe.png" alt="Creating a Dynamic Instrumentation metric probe" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /agent/guide/how_remote_config_works/
[3]: https://github.com/DataDog/dd-trace-java
[4]: https://github.com/DataDog/dd-trace-py
[5]: https://github.com/DataDog/dd-trace-dotnet
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /integrations/guide/source-code-integration/
[8]: /account_management/rbac/permissions#apm
[9]: /logs/log_configuration/indexes/#exclusion-filters
[10]: /logs/log_configuration/indexes/#add-indexes
[11]: /dynamic_instrumentation/how-it-works/
[12]: https://app.datadoghq.com/dynamic-instrumentation
