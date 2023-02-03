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

Dynamic Instrumentation lets you capture data from your live applications without needing to do any code changes or redployment.

## Getting started

### Requirements
Dynamic Instrumentation requires the following:

- [Datadog Agent][1] 7.41.1 or higher is installed alongside your service.
- [Remote Configuration][2] is enabled in that Agent.
- For Java applications, tracing library [`dd-trace-java`][3] 1.5 or higher.
- For Python applications, tracing library [`dd-trace-py`][4] 1.5 or higher.
- For .NET applications, tracing library [`dd-trace-dotnet`][5] 2.22 or higher.
- [Unified Service Tagging][6] tags `service`, `env`, and `version` are applied to your deployment.
- Optionally, [Source Code Integration][7] is set up for your service.

**Note**: `debugger_read` and `debugger_write` permissions are required to access the Dynamic Instrumentation page. For more information about roles and on how to assign roles to users, see [Role Based Access Control][8].


### Create a logs index

Dynamic Instrumentation snapshots are sent to Datadog logs. They appear alongside your application logs.  

If you use Logs Indexes with [Exclusion filters][9], ensure Dynamic Instrumentation snapshots are not filtered from logs:

1. Create a logs index and [configure it][10] to the desired retention with **no sampling**.
2. Set the filter to match on `source:dd_debugger`. 
3. Ensure that the new index takes precedence over any other indexes with filters that might match on that tag, because logs enter the first index whose filter they match on.

### Enable Dynamic Instrumentation

To enable Dynamic Instrumentation on a service, select its runtime and follow the setup instructions:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing at runtime. By adding a Dynamic Instrumentation probe you are exporting additional data from your application, without the need to do any code change or redeployment.

### Creating a snapshot probe

A *snapshot probe* exports the context in which it was configured to Datadog. It captures class properties, method arguments and local variables. For more information, read [How Dynamic Instrumentation Works][11].

To create a snapshot probe:

1. Go to the [Dynamic Instrumentation page][12].
2. Click **Create Probe** in the top right, or click the three dot context menu on a service and select **Add a probe for this service**.
3. Select **Snapshot** as the probe type.
4. If not prefilled, choose a service from the list.
5. If not prefilled, choose runtime, environment and version.
6. If you set up Source Code Integration for the service, you can select the file where you want to set the probe.
7. In the source code, select a line on which to set the probe.

### Creating a metric probe

Metric probes emit metrics at a chosen location in your code. Use the Dynamic Instrumentation expression language to reference numeric values from the context, such as from a local variable or a class field. For more information, read [How Dynamic Instrumentation Works][11].

To create a metric probe:

1. Go to the [Dynamic Instrumentation page][12].
2. Click **Create Probe** in the top right, or click the three dot context menu on a service and select **Add a probe for this service**.
3. Select **Metric** as the probe type.
4. Specify a name for the metric.
5. Select a metric type.
6. Input a metric expression.
7. If not prefilled, choose a service from the list.
5. If not prefilled, choose runtime, environment and version.
9. If you set up Source Code Integration for the service, you can select the file where you want to set the probe.
10. In the source code, select a line on which to set the probe.

### Selecting instrumented instances

By default, Dynamic Instrumentation is enabled on only one randomly selected instance of your service for each environment and version combination. If the enabled instance is destroyed, a new one is selected at random from the remaining ones.

Alternatively, you can explicitly configure which instances of your service are enabled. You can use this feature to enable Dynamic Instrumentation on more service instances, or to restrict enablement in certain environments.

To select a service:

1. Click the three dot context menu next to the service in the probes list and select **Apply filters for service instrumentation**. 
2. Create one or more queries to select active instances based on tags. 
3. Click **Apply Filter**.

To remove the filter, open the same menu item and click **Delete Filter**.

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
