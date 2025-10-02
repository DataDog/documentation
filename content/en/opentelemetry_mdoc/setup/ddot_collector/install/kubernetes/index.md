---
title: Install the Datadog Distribution of OTel Collector on Kubernetes
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  Distribution of OpenTelemetry Collector > Install > Install the Datadog
  Distribution of OTel Collector on Kubernetes
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/kubernetes/index.html
---

# Install the Datadog Distribution of OTel Collector on Kubernetes

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com



{% alert level="danger" %}
FedRAMP customers should not enable or use the embedded OpenTelemetry Collector.
{% /alert %}


{% /callout %}

## Overview{% #overview %}

Follow this guide to install the Datadog Distribution of OpenTelemetry (DDOT) Collector using Helm or the Datadog Operator.

{% alert level="info" %}
**Need additional OpenTelemetry components?** If you need components beyond those included in the default package, follow [Use Custom OpenTelemetry Components](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components) to extend the Datadog Agent's capabilities. For a list of components included by default, see [OpenTelemetry Collector components](https://docs.datadoghq.com/opentelemetry/agent/#opentelemetry-collector-components).
{% /alert %}

## Requirements{% #requirements %}

To complete this guide, you need the following:

**Datadog account**:

1. [Create a Datadog account](https://www.datadoghq.com/free-datadog-trial/) if you don't have one.
1. Find or create your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys/).

**Software**: Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
  - **Note**: EKS Fargate and GKE Autopilot environments are not supported
- [Helm (v3+)](https://helm.sh)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

{% callout %}
##### Join the Preview!

Support for deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is in Preview. To get started, follow the [Linux documentation](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/linux).
{% /callout %}

## Install the Datadog Agent with OpenTelemetry Collector{% #install-the-datadog-agent-with-opentelemetry-collector %}

### Select installation method{% #select-installation-method %}

Choose one of the following installation methods:

- [Datadog Operator](https://docs.datadoghq.com/containers/datadog_operator): A [Kubernetes-native](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) approach that automatically reconciles and maintains your Datadog setup. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.
- [Helm chart](https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md): A straightforward way to deploy Datadog Agent. It provides versioning, rollback, and templating capabilities, making deployments consistent and easier to replicate.

{% tab title="Datadog Operator" %}
### Install the Datadog Operator{% #install-the-datadog-operator %}

You can install the Datadog Operator in your cluster using the [Datadog Operator Helm chart](https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md):

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

{% /tab %}

{% tab title="Helm" %}
### Add the Datadog Helm Repository{% #add-the-datadog-helm-repository %}

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{% /tab %}

### Set up Datadog API key{% #set-up-datadog-api-key %}

1. Get the Datadog [API key](https://app.datadoghq.com/organization-settings/api-keys/).
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the Datadog Agent{% #configure-the-datadog-agent %}

{% tab title="Datadog Operator" %}
After deploying the Datadog Operator, create the `DatadogAgent` resource that triggers the deployment of the Datadog Agent, Cluster Agent and Cluster Checks Runners (if used) in your Kubernetes cluster. The Datadog Agent deploys as a DaemonSet, running a pod on every node of your cluster.

1. Use the `datadog-agent.yaml` file to specify your `DatadogAgent` deployment configuration.

In the `datadog-agent.yaml` file:

```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
```

- Replace `<CLUSTER_NAME>` with a name for your cluster.
- Replace `<DATADOG_SITE>` with your [Datadog site](https://docs.datadoghq.com/getting_started/site). Your site is . (Ensure the correct **DATADOG SITE** is selected on the right.)
Enable the OpenTelemetry Collector:
In the `datadog-agent.yaml` file:

```yaml
  # Enable Features
  features:
    otelCollector:
      enabled: true
```

The Datadog Operator automatically binds the OpenTelemetry Collector to ports `4317` (named `otel-grpc`) and `4318` (named `otel-http`) by default.
(Optional) Enable additional Datadog features:
{% alert level="danger" %}
Enabling these features may incur additional charges. Review the [pricing page](https://www.datadoghq.com/pricing/) and talk to your Customer Success Manager before proceeding.
{% /alert %}

In the `datadog-agent.yaml` file:

```yaml
  # Enable Features
  features:
  ...
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
```

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.
{% /tab %}

{% tab title="Helm" %}
Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart](https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md).

1. Create an empty `datadog-values.yaml` file:

```shell
touch datadog-values.yaml
```

{% alert level="info" %}
Unspecified parameters use defaults from [values.yaml](https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml).
{% /alert %}
Configure the Datadog API key secret:
In the `datadog-values.yaml` file:

```yaml
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
```

Set `<DATADOG_SITE>` to your [Datadog site](https://docs.datadoghq.com/getting_started/site/). Otherwise, it defaults to `datadoghq.com`, the US1 site.
Enable the OpenTelemetry Collector and configure the essential ports:
In the `datadog-values.yaml` file:

```yaml
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
```

Set the `hostPort` to expose the container port to the external network. This enables configuring the OTLP exporter to point to the IP address of the node where the Datadog Agent is assigned.

If you don't want to expose the port, you can use the Agent service instead:

- Remove the `hostPort` entries from your `datadog-values.yaml` file.
- In your application's deployment file (`deployment.yaml`), configure the OTLP exporter to use the Agent service:
  ```yaml
  env:
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
    - name: OTEL_EXPORTER_OTLP_PROTOCOL
      value: 'grpc'
  ```
(Optional) Enable additional Datadog features:
{% alert level="danger" %}
Enabling these features may incur additional charges. Review the [pricing page](https://www.datadoghq.com/pricing/) and talk to your Customer Success Manager before proceeding.
{% /alert %}

In the `datadog-values.yaml` file:

```yaml
datadog:
  ...
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
```

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.
(Optional) Collect pod labels and use them as tags to attach to metrics, traces, and logs:
{% alert level="danger" %}
Custom metrics may impact billing. See the [custom metrics billing page](https://docs.datadoghq.com/account_management/billing/custom_metrics) for more information.
{% /alert %}

In the `datadog-values.yaml` file:

```yaml
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
```

{% collapsible-section %}
Completed datadog-values.yaml file
Your `datadog-values.yaml` file should look something like this:

In the `datadog-values.yaml` file:

```yaml
datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   
```

{% /collapsible-section %}

{% /tab %}

### Configure the OpenTelemetry Collector{% #configure-the-opentelemetry-collector %}

{% tab title="Datadog Operator" %}
The Datadog Operator provides a sample OpenTelemetry Collector configuration that you can use as a starting point. If you need to modify this configuration, the Datadog Operator supports two ways of providing a custom Collector configuration:

- **Inline configuration**: Add your custom Collector configuration directly in the `features.otelCollector.conf.configData` field.
- **ConfigMap-based configuration**: Store your Collector configuration in a ConfigMap and reference it in the `features.otelCollector.conf.configMap` field. This approach allows you to keep Collector configuration decoupled from the `DatadogAgent` resource.

#### Inline Collector configuration{% #inline-collector-configuration %}

In the snippet below, the Collector configuration is placed directly under the `features.otelCollector.conf.configData` parameter:

In the `datadog-agent.yaml` file:

```yaml
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "otelcol"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
            otlp:
              protocols:
                grpc:
                  endpoint: 0.0.0.0:4317
                http:
                  endpoint: 0.0.0.0:4318
          exporters:
            debug:
              verbosity: detailed
            datadog:
              api:
                key: ${env:DD_API_KEY}
                site: ${env:DD_SITE}
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
```

When you apply the `datadog-agent.yaml` file containing this `DatadogAgent` resource, the Operator automatically mounts the Collector configuration into the Agent DaemonSet.

{% collapsible-section %}
Completed datadog-agent.yaml file with inlined Collector config
Completed `datadog-agent.yaml` with inline Collector configuration should look something like this:

In the `datadog-agent.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "datadog-agent"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
            otlp:
              protocols:
                grpc:
                  endpoint: 0.0.0.0:4317
                http:
                  endpoint: 0.0.0.0:4318
          exporters:
            debug:
              verbosity: detailed
            datadog:
              api:
                key: ${env:DD_API_KEY}
                site: ${env:DD_SITE}
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
```

{% /collapsible-section %}

#### ConfigMap-based Collector Configuration{% #configmap-based-collector-configuration %}

For more complex or frequently updated configurations, storing Collector configuration in a ConfigMap can simplify version control.

1. Create a ConfigMap that contains your Collector configuration:

In the `configmap.yaml` file:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    exporters:
      debug:
        verbosity: detailed
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
```

{% alert level="warning" %}
The field for Collector config in the ConfigMap must be called `otel-config.yaml`.
{% /alert %}
Reference the `otel-agent-config-map` ConfigMap in your `DatadogAgent` resource using `features.otelCollector.conf.configMap` parameter:
In the `datadog-agent.yaml` file:

```yaml
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
```

The Operator automatically mounts `otel-config.yaml` from the ConfigMap into the Agent's OpenTelemetry Collector DaemonSet.

{% collapsible-section %}
Completed datadog-agent.yaml file with Collector config in the ConfigMap
Completed `datadog-agent.yaml` with Collector configuration defined as ConfigMap should look something like this:

In the `datadog-agent.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    exporters:
      debug:
        verbosity: detailed
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
```

{% /collapsible-section %}

{% /tab %}

{% tab title="Helm" %}
The Datadog Helm chart provides a sample OpenTelemetry Collector configuration that you can use as a starting point. This section walks you through the predefined pipelines and included OpenTelemetry components.

This is the full OpenTelemetry Collector configuration in `otel-config.yaml`:

In the `otel-config.yaml` file:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
         endpoint: 0.0.0.0:4317
      http:
         endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
```

{% /tab %}

#### Key components{% #key-components %}

To send telemetry data to Datadog, the following components are defined in the configuration:

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/components-2.74385f27545b6fc024ea25bc6cd7353f.png?auto=format"
   alt="Diagram depicting the Agent deployment pattern" /%}

##### Datadog connector{% #datadog-connector %}

The [Datadog connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector) computes Datadog APM trace metrics.

In the `otel-config.yaml` file:

```yaml
connectors:
  datadog/connector:
    traces:
```

##### Datadog exporter{% #datadog-exporter %}

The [Datadog exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter) exports traces, metrics, and logs to Datadog.

In the `otel-config.yaml` file:

```yaml
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
```

**Note**: If `key` is not specified or set to a secret, or if `site` is not specified, the system uses values from the core Agent configuration. By default, the core Agent sets site to `datadoghq.com` (US1).

##### Prometheus receiver{% #prometheus-receiver %}

The [Prometheus receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver) collects health metrics from the OpenTelemetry Collector for the metrics pipeline.

In the `otel-config.yaml` file:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
```

For more information, see the [Collector Health Metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver) documentation.

### Deploy the Agent with the OpenTelemetry Collector{% #deploy-the-agent-with-the-opentelemetry-collector %}

{% tab title="Datadog Operator" %}
Deploy the Datadog Agent with the configuration file:

```shell
kubectl apply -f datadog-agent.yaml
```

This deploys the Datadog Agent as a DaemonSet with the DDOT OpenTelemetry Collector. The Collector runs on the same host as your application, following the [Agent deployment pattern](https://opentelemetry.io/docs/collector/deployment/agent/). The [Gateway deployment pattern](https://opentelemetry.io/docs/collector/deployment/gateway/) is not supported.
{% /tab %}

{% tab title="Helm" %}
To install or upgrade the Datadog Agent with OpenTelemetry Collector in your Kubernetes environment, use one of the following Helm commands:

- For default OpenTelemetry Collector configuration:

  ```shell
  helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
  ```

- For custom OpenTelemetry Collector configuration:

  ```shell
  helm upgrade -i <RELEASE_NAME> datadog/datadog \
    -f datadog-values.yaml \
    --set-file datadog.otelCollector.config=otel-config.yaml
  ```

This command allows you to specify your own `otel-config.yaml` file.

Replace `<RELEASE_NAME>` with the Helm release name you are using.

{% alert level="info" %}
You may see warnings during the deployment process. These warnings can be ignored.
{% /alert %}

This Helm chart deploys the Datadog Agent with OpenTelemetry Collector as a DaemonSet. The Collector is deployed on the same host as your application, following the [Agent deployment pattern](https://opentelemetry.io/docs/collector/deployment/agent/). The [Gateway deployment pattern](https://opentelemetry.io/docs/collector/deployment/gateway/) is not supported.
{% /tab %}

{% collapsible-section %}
Deployment diagram
{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/deployment-2.01ec8236124c329cdfadd56354cb0242.png?auto=format"
   alt="Diagram depicting the Agent deployment pattern" /%}

{% /collapsible-section %}

## Send your telemetry to Datadog{% #send-your-telemetry-to-datadog %}

To send your telemetry data to Datadog:

1. Instrument your application
1. Configure the application
1. Correlate observability data
1. Run your application

### Instrument the application{% #instrument-the-application %}

Instrument your application [using the OpenTelemetry API](https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/otel_instrumentation/).

{% collapsible-section %}
Example application instrumented with the OpenTelemetry API
As an example, you can use the [Calendar sample application](https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar) that's already instrumented for you. The following code instruments the [CalendarService.getDate()](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48) method using the OpenTelemetry annotations and API:

In the `CalendarService.java` file:

```java
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
```

{% /collapsible-section %}

### Configure the application{% #configure-the-application %}

Your application container must send data to the DDOT Collector on the same host. Since the Collector runs as a DaemonSet, you need to specify the local host as the OTLP endpoint.

If the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is not already set, add it to your application's Deployment manifest file:

In the `deployment.yaml` file:

```yaml
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   
```



### Correlate observability data{% #correlate-observability-data %}

[Unified service tagging](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging) ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

Unified service tagging ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, `env`, `service`, and `version` are set through the OpenTelemetry Resource Attributes environment variables or Kubernetes labels on your deployments and pods. The DDOT detects this tagging configuration and applies it to the data it collects from containers.

To get the full range of unified service tagging, add **both** the environment variables and the deployment/pod labels:

In the `deployment.yaml` file:

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
      - name: OTEL_SERVICE_NAME
        value: "<SERVICE>"
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME),
          service.version=<VERSION>,
          deployment.environment.name=<ENV>
```

### Run the application{% #run-the-application %}

Redeploy your application to apply the changes made in the deployment manifest. Once the updated configuration is active, Unified Service Tagging will be fully enabled for your metrics, traces, and logs.

## Explore observability data in Datadog{% #explore-observability-data-in-datadog %}

Use Datadog to explore the observability data for your application.

### Fleet automation{% #fleet-automation %}

Explore your Datadog Agent and Collector configuration.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/fleet_automation.baf78a14f2401833d04f1b19c38ddcf4.png?auto=format"
   alt="Review your Agent and Collector configuration from the Fleet Automation page." /%}

### Live container monitoring{% #live-container-monitoring %}

Monitor your container health using Live Container Monitoring capabilities.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/containers.14b4025c2f3b0e554692286e4a01f383.png?auto=format"
   alt="Monitor your container health from the Containers page." /%}

### Infrastructure node health{% #infrastructure-node-health %}

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your nodes.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/infrastructure.c8fe3b51603bf26daef58b0c3fbdbb6d.png?auto=format"
   alt="View runtime and infrastructure metrics from the Host List." /%}

### Logs{% #logs %}

View logs to monitor and troubleshoot application and system operations.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/logs.3399501b14c5a2c7bf9ab8dd4aa8bf52.png?auto=format"
   alt="View logs from the Log Explorer." /%}

### Traces{% #traces %}

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/traces.0dfe8b50575dbfcea5b0d06131826db9.png?auto=format"
   alt="View traces from the Trace Explorer." /%}

### Runtime metrics{% #runtime-metrics %}

Monitor your runtime (JVM) metrics for your applications.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/metrics.1f91a119276f91ecfb2976f16eed58ef.png?auto=format"
   alt="View JVM metrics from the JVM Metrics dashboard" /%}

### Collector health metrics{% #collector-health-metrics %}

View metrics from the DDOT Collector to monitor the Collector health.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/dashboard.f6e65b6b9a8708b1a7e172da215947af.png?auto=format"
   alt="View Collector health metrics from the OTel dashboard." /%}

## Further reading{% #further-reading %}

- [Use Custom OpenTelemetry Components with Datadog Agent](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components)
