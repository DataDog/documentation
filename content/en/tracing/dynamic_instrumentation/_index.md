---
title: Dynamic Instrumentation
kind: documentation
is_beta: true
private: true
further_reading:
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

{{< beta-callout url="http://d-sh.io/dynamic-instrumentation" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
<!-- **!!!TODO: create beta signup form/link!!!** -->
  Dynamic Instrumentation is in private beta. Let us know if you would like to
  access it.
{{< /beta-callout >}}

Dynamic Instrumentation allows you to export more information from your
application into Datadog without needing to do any code changes or
redeployments. It requires an up-to-date APM tracing library, an up-to-date
[Datadog Agent][1] and Remote Configuration being enabled.

## Getting Started

### Supported Versions

| Component             | Version        |
|-----------------------|----------------|
| [datadog-agent][1]    | >=7.39.0       |
| [dd-trace-java][2]    | >=0.108.0      |
| [dd-trace-py][3]      | >=1.5          |

### Prerequisites

- [Datadog Agent][1] 7.39.0 or higher is installed alongside your service.
- [Unified Service Tagging][4] tags `service`, `env` and `version`
  are applied to your deployment.
- [Source Code Integration][5] has been set-up for your service. (optional)

### Enable Remote Configuration

Go to the Remote [Remote Configuration setup page][6] and enable it for your
organisation, then create a new key. Update your datadog-agent with the
provided configuration snippet.

In addition to the snipped it is advised that you also set
`remote_configuration.refresh_interval: 5s` in the datadog-agent configuration.

**Note**
You need to have Datadog admin permissions to enable Remote Configuration
and create a key. This should be a one-time setup per environment. If you do
not have the necessary access rights, please ask an admin.

### Create a Logs index

Dynamic Instrumentation snapshots are sent to Datadog Logs. They will appear
alongside your application logs. To avoid snapshots being sampled, you must
ensure they are sent to an index that retains all messages. It is recommended
you create a logs index with the name `dynamic-instrumentation-snapshots`.

[Configure the index][7] to the desired retention and make sure that no
sampling is configured. You should ensure that the new index takes precedence
over any other indices with filters that may match `source:dd_debugger`. Logs
enter the first index whose filter they match on.

### Enable Dynamic Instrumentation

Choose the runtime of the service that you would like to use Dynamic
Instrumentation with below to learn how to enable it.

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Explore Dynamic Instrumentation

Dynamic Instrumentation can help you understand what your application is doing
at runtime. By adding a Dynamic Instrumentation probe you are exporting
additional data from your application, without the need to do any code change
or redeployment.

### Create a snapshot probe

A snapshot probe is exporting the context in which it was configured to
datadog. It will capture class properties, method arguments and local
variables.

To create a snapshot probe:
1. Go to the [Dynamic Instrumentation page][8]
2. Click "Create Probe" in the top right, or click the three dot context menu
   on a service and select "Add a probe for this service"
3. In the create probe modal select "Snapshot" as probe type
4. If not prefilled, choose a service from the list
5. If not prefilled, choose environment and version
6. If you set up Source Code Integration for the service, you can now search
   the file where you want to set the probe
7. Once you selected a file, you will be presented with the source code of the
   file
8. Click a line to select the line on which to set the probe

### Create a metric probe

Metric probes are used to emit metrics at a chosen location in your code. The
Dynamic Instrumentation expression language can be used to reference numeric
values from the context, for example from a local variable or a class field.

To create a metric probe:
1. Go to the [Dynamic Instrumentation page][8]
2. Click "Create Probe" in the top right, or click the three dot context menu
   on a service and select "Add a probe for this service"
3. In the create probe modal select "Metric" as probe type
4. Choose a name for the metric
5. Select a metric type
6. Input a metric expression
7. If not prefilled, choose a service from the list
8. If not prefilled, choose environment and version
9. If you set up Source Code Integration for the service, you can now search
   the file where you want to set the probe
10. Once you selected a file, you will be presented with the source code of the
    file
11. Click a line to select the line on which to set the probe

### Select instrumented instances

By default, Dynamic Instrumentation in only enabled on one random instance of
your service for each environment and version combination. If the enabled
instance is destroyed, a new one is selected at random from the remaining ones.

You can also explicitly configure which instances of your service are enabled.
You can use this feature to enable Dynamic Instrumentation on more service
instances or restrict enablement in certain environments.

To do this, click the three dot context menu next to a service in the probes
list and select "Select service instances to instrument". In the modal, you can
create multiple queries to select active instances based on tags. Once
finished, click "Apply Filter".

If you want to remove the filter, open up the modal again and click "Delete
Filter".

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/dd-trace-java
[3]: https://github.com/DataDog/dd-trace-py
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://docs.datadog.com/integrations/guide/source-code-integration
[6]: https://app.datadoghq.com/organization-settings/remote-config
[7]: /logs/log_configuration/indexes/#add-indexes
[8]: https://app.datadoghq.com/dynamic-instrumentation
