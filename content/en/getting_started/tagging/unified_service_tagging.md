---
title: Unified Service Tagging
kind: documentation
further_reading:
- link: "/getting_started/tagging/using_tags"
  tag: "Documentation"
  text: "Learn how to use tags in the Datadog app"
- link: "/tracing/version_tracking"
  tag: "Documentation"
  text: "Use Version tags within Datadog APM to monitor deployments"
- link: "https://www.datadoghq.com/blog/unified-service-tagging/"
  tag: "Blog"
  text: "Tags: Set once, access everywhere"
- link: "https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/"
  tag: "Blog"
  text: "Autodiscovery: Tracking services across ephemeral containers"
algolia:
  tags: ['unified service tags','unified','unified service','service tags']
---

## Overview

Unified service tagging ties Datadog telemetry together by using three [reserved tags][1]: `env`, `service`, and `version`.

With these three tags, you can:

- Identify deployment impact with trace and container metrics filtered by version
- Navigate seamlessly across traces, metrics, and logs with consistent tags
- View service data based on environment or version in a unified fashion

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Unified Service Tagging" video=true >}}

**Notes**:

- The `version` tag is expected to change with each new application deployment. Two different versions of your application's code should have distinct `version` tags.
- The official service of a log defaults to the container short-image if no Autodiscovery logs configuration is present. To override the official service of a log, add Autodiscovery [Docker labels/pod annotations][2]. For example: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- Host information is excluded for database and cache spans because the host associated with the span is not the database/cache host.

### Requirements

- Unified service tagging requires the setup of a [Datadog Agent][3] that is 6.19.x/7.19.x or higher.

- Unified service tagging requires a tracer version that supports new configurations of the [reserved tags][1]. More information can be found per language in the [setup instructions][4].


| Language         | Minimum Tracer Version |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- Unified service tagging requires knowledge of configuring tags. If you are unsure of how to configure tags, read the [Getting Started with Tagging][1] and [Assigning Tags][5] documentation before proceeding to configuration.

## Configuration

To start configuring unified service tagging, choose your environment:

- [Containerized](#containerized-environment)
- [Non-Containerized](#non-containerized-environment)
- [Serverless](#serverless-environment)
- [OpenTelemetry](#opentelemetry-environment)

### Containerized environment

In containerized environments, `env`, `service`, and `version` are set through the service's environment variables or labels (for example, Kubernetes deployment and pod labels, Docker container labels). The Datadog Agent detects this tagging configuration and applies it to the data it collects from containers.

To setup unified service tagging in a containerized environment:

1. Enable [Autodiscovery][6]. This allows the Datadog Agent to automatically identify services running on a specific container and gathers data from those services to map environment variables to the `env`, `service,` and `version` tags.

2. If you are using [Docker][2], make sure the Agent can access your container's [Docker socket][7]. This allows the Agent detect the environment variables and map them to the standard tags.

3. Configure your environment that corresponds to your container orchestration service based on either full configuration or partial configuration as detailed below.

#### Configuration

{{< tabs >}}
{{% tab "Kubernetes" %}}

If you deployed the Datadog Cluster Agent with [Admission Controller][1] enabled, the Admission Controller mutates the pod manifests and injects all required environment variables (based on configured mutation conditions). In that case, manual configuration of `DD_` environment variables in pod manifests is unnecessary. For more information, see the [Admission Controller documentation][1].

##### Full configuration

To get the full range of unified service tagging when using Kubernetes, add environment variables to both the deployment object level and the pod template spec level:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>"
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

##### Partial configuration

###### Pod-level metrics

To configure pod-level metrics, add the following standard labels (`tags.datadoghq.com`) to the pod spec of a Deployment, StatefulSet, or Job:

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
These labels cover pod-level Kubernetes CPU, memory, network, and disk metrics, and can be used for injecting `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` into your service's container through [Kubernetes's downward API][2].

If you have multiple containers per pod, you can specify standard labels by container:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

###### State metrics

To configure [Kubernetes State Metrics][3]:

1. Set `join_standard_tags` to `true` in your configuration file. See this [example configuration file][4] for the setting location.

2. Add the same standard labels to the collection of labels for the parent resource, for example: `Deployment`.

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>"
  ```

###### APM tracer and StatsD client

To configure [APM tracer][5] and [StatsD client][6] environment variables, use the [Kubernetes's downward API][2] in the format below:

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/version']
```


[1]: /agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /tracing/send_traces/
[6]: /integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### Full configuration

Set the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` environment variables and corresponding Docker labels for your container to get the full range of unified service tagging.

The values for `service` and `version` can be provided in the Dockerfile:

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Since `env` is likely determined at deploy time, you can inject the environment variable and label later:

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

You may also prefer to set everything at deploy time:

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \
           ...
```

##### Partial configuration

If your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM) you can just use the Docker labels:

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

As explained in the full configuration, these labels can be set in a Dockerfile or as arguments for launching the container.

{{% /tab %}}

{{% tab "ECS" %}}
##### Full configuration

Set the `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` environment variables and corresponding Docker labels in the runtime environment of each service's container to get the full range of unified service tagging. For instance, you can set all of this configuration in one place through your ECS task definition:

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }
],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Partial configuration

If your service has no need for the Datadog environment variables (for example, third party software like Redis, PostgreSQL, NGINX, and applications not traced by APM) you can just use the Docker labels in your ECS task definition:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### Non-containerized environment

Depending on how you build and deploy your services' binaries or executables, you may have several options available for setting environment variables. Since you may run one or more services per host, Datadog recommends scoping these environment variables to a single process.

To form a single point of configuration for all telemetry emitted directly from your services' runtime for [traces][8], [logs][9], [RUM resources][10], [Synthetics tests][11], [StatsD metrics][12], or system metrics, either:

1. Export the environment variables in the command for your executable:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. Or use [Chef][13], [Ansible][14], or another orchestration tool to populate a service's systemd or initd configuration file with the `DD` environment variables. When the service process starts, it has access to those variables.

   {{< tabs >}}
   {{% tab "Traces" %}}

   When configuring your traces for unified service tagging:

   1. Configure the [APM Tracer][1] with `DD_ENV` to keep the definition of `env` closer to the application that is generating the traces. This method allows the `env` tag to be sourced automatically from a tag in the span metadata.

   2. Configure spans with `DD_VERSION` to add version to all spans that fall under the service that belongs to the tracer (generally `DD_SERVICE`). This means that if your service creates spans with the name of an external service, those spans do not receive `version` as a tag.

      As long as version is present in spans, it is added to trace metrics generated from those spans. The version can be added manually in-code or automatically by the APM Tracer. When configured, these are used by the APM and [DogStatsD clients][2] to tag trace data and StatsD metrics with `env`, `service`, and `version`. If enabled, the APM tracer also injects the values of these variables into your logs.

      **Note**: There can only be **one service per span**. Trace metrics generally have a single service as well. However, if you have a different service defined in your hosts' tags, that configured service tag shows up on all trace metrics emitted from that host.

[1]: /tracing/setup/
[2]: /developers/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

   If you're using [connected logs and traces][1], enable automatic logs injection if supported for your APM Tracer. Then, the APM Tracer automatically injects `env`, `service`, and `version` into your logs, therefore eliminating manual configuration for those fields elsewhere.

[1]: /tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM & Session Replay" %}}

   If you're using [connected RUM and traces][1], specify the browser application in the `service` field, define the environment in the `env` field, and list the versions in the `version` field of your initialization file.

   When you [create a RUM application][2], confirm the `env` and `service` names.


[1]: /real_user_monitoring/platform/connect_rum_and_traces/
[2]: /real_user_monitoring/browser/setup
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   If you're using [connected Synthetic browser tests and traces][1], specify a URL to send headers to under the **APM Integration for Browser Tests** section of the [Integration Settings page][2].

   You can use `*` for wildcards, for example: `https://*.datadoghq.com`.

[1]: /synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Custom Metrics" %}}

   Tags are added in an append-only fashion for [custom StatsD metrics][1]. For example, if you have two different values for `env`, the metrics are tagged with both environments. There is no order in which one tag overrides another of the same name.

   If your service has access to `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`, then the DogStatsD client automatically adds the corresponding tags to your custom metrics.

   **Note**: The Datadog DogStatsD clients for .NET and PHP do not support this functionality.

[1]: /metrics/
   {{% /tab %}}

   {{% tab "System Metrics" %}}

   You can add `env` and `service` tags to your infrastructure metrics. In non-containerized contexts, tagging for service metrics is configured at the Agent level.

   Because this configuration does not change for each invocation of a service's process, adding `version` is not recommended.

#### Single service per host

Set the following configuration in the Agent's [main configuration file][1]:

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

This setup guarantees consistent tagging of `env` and `service` for all data emitted by the Agent.

#### Multiple services per host

Set the following configuration in the Agent's [main configuration file][1]:

```yaml
env: <ENV>
```

To get unique `service` tags on CPU, memory, and disk I/O metrics at the process level, configure a [process check][2] in the Agent's configuration folder (for example, in the `conf.d` folder under `process.d/conf.yaml`):

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**Note**: If you already have a `service` tag set globally in your Agent's main configuration file, the process metrics are tagged with two services. Since this can cause confusion with interpreting the metrics, it is recommended to configure the `service` tag only in the configuration of the process check.

[1]: /agent/configuration/agent-configuration-files
[2]: /integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Serverless environment

For more information about AWS Lambda functions, see [how to connect your Lambda telemetry using tags][15].

### OpenTelemetry environment

In OpenTelemetry environments, you can use the [OpenTelemetry Collector][16] to collect and batch telemetry data (like metrics, traces, and logs) by leveraging the [Datadog Exporter][17] to send the data to Datadog without the Datadog Agent.

Optionally, you can send telemetry data from [applications instrumented with the OpenTelemetry SDKs with the Datadog Agent][20], which collects the data for Datadog.

To set up unified service tagging in an OpenTelemetry environment:

1. Set the required attributes to ensure proper tagging for the OpenTelemetry component you are using.

   For example, with the Python OpenTelemetry SDK:

   ```python
   from opentelemetry.sdk.resources import Resource
   from opentelemetry.sdk.trace import TracerProvider

   resource = Resource(attributes={
      "service.name": "<SERVICE>",
      "deployment.environment": "<ENV>",
      "service.version": "<VERSION>"
    })
    tracer_provider = TracerProvider(resource=resource)
    ```

    For example, with the OpenTelemetry Collector:

    ```yaml
    receivers:
    otlp:
      protocols:
        grpc:
        http:

    processors:
      batch:

    exporters:
      datadog:
        api:
          key: "<DATADOG_API_KEY>"
        metrics:
          attributes:
            service.name: "<SERVICE>"
            deployment.environment: "<ENV>"
            service.version: "<VERSION>"

    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [datadog]
    ```

   
1. To [correlate OpenTelemetry language SDK logs and traces][18], translate the OpenTelemetry `TraceId` and `SpanId` properties (a 128-bit unsigned integer and 64-bit unsigned integer represented as a 32-character and 16-character hexadecimal string) into the Datadog format and add them as attributes in your logs. 

   The following table outlines the key differences between OpenTelemetry and Datadog schemas for tracing and unified service tagging:

   | Domain | OpenTelemetry | Datadog |
   |---|---|---|
   | Tracing | `TraceId` and `SpanId` are stored in OpenTelemetry as strings of 32 hex characters and 16 hex characters, respectively. | Stored in Datadog as 64-bit unsigned int. |
   | Unified service tagging | `service.name`, `deployment.environment`, `service.version` | `service`, `env`, `version` |
   
   Edit your logging configuration to include the trace and span IDs. For example, this Python application uses the `structlog` library:

   ```python
   from opentelemetry import trace

   class CustomDatadogLogProcessor(object):
       def __call__(self, logger, method_name, event_dict):
           current_span = trace.get_current_span()
           if not current_span.is_recording():
               return event_dict

           context = current_span.get_span_context() if current_span is not None else None
           if context is not None:
               event_dict["dd.trace_id"] = str(context.trace_id & 0xFFFFFFFFFFFFFFFF)
               event_dict["dd.span_id"] = str(context.span_id)

           return event_dict        

   import .injection
   import logging
   import structlog
   structlog.configure(
       processors=[
           injection.CustomDatadogLogProcessor(),
           structlog.processors.JSONRenderer(sort_keys=True)
       ],
   )

   log = structlog.getLogger()

   log.info("Example log line with trace correlation information")
   ```

1. To ensure span kind statistics are computed and services are properly aggregated by their peers, you can enable the following settings in the OpenTelemetry Exporter's YAML configuration file:

   ```yaml
   compute_stats_by_span_kind: true
   peer_service_aggregation: true
   ```

For more information, see [Correlating OpenTelemetry Traces and Logs][19]. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/
[2]: /agent/docker/integrations/?tab=docker
[3]: /getting_started/agent
[4]: /tracing/setup
[5]: /getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /getting_started/agent/autodiscovery
[7]: /agent/docker/?tab=standard#optional-collection-agents
[8]: /getting_started/tracing/
[9]: /getting_started/logs/
[10]: /real_user_monitoring/platform/connect_rum_and_traces/
[11]: /getting_started/synthetics/
[12]: /integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /serverless/configuration/#connect-telemetry-using-tags
[16]: /opentelemetry/collector_exporter/
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[18]: /tracing/other_telemetry/connect_logs_and_traces/
[19]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/
[20]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/