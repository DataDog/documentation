---
title: Set Up the OpenTelemetry Collector (OSS)
private: true
description: 'Send OpenTelemetry data to Datadog using the OpenTelemetry Collector with standard OSS components'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "External Site"
  text: "Collector documentation"
- link: "/opentelemetry/setup/collector_exporter/deploy"
  tag: "Documentation"
  text: "Deploy the OpenTelemetry Collector"
- link: "/opentelemetry/config/hostname_tagging"
  tag: "Documentation"
  text: "Configure Hostname and Tagging"
---

## Overview

Send traces, metrics, and logs to Datadog using the [OpenTelemetry Collector Contrib][1] distribution with standard OpenTelemetry components. This setup uses the following key components:

- **OTLP HTTP exporter**: Sends telemetry to Datadog's OTLP intake endpoints.
- **Span metrics connector**: Generates RED (Rate, Error, Duration) metrics from trace data to power APM features such as the Service Catalog and Service Page.
- **Resource detection processor**: Extracts host and cloud metadata for hostname resolution and tagging in Datadog.

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Diagram: OpenTelemetry SDK in code sends data through OTLP to host running any OpenTelemetry Collector with OTLP HTTP exporter, which forwards to Datadog's Observability Platform." style="width:100%;" >}}

<div class="alert alert-warning">This setup is in Preview. Some Datadog features may behave differently compared to the Datadog Exporter setup. For example, the <a href="/infrastructure/list/">Infrastructure List</a> may show less host metadata until host metadata ingestion support is finalized and the Kubernetes Explorer related views may be empty.</div>

## Prerequisites

This setup supports bare metal, VMs, and Kubernetes, including managed distributions such as Amazon EKS and Google GKE. Standard EKS is tested; EKS auto mode is not. This setup does not support serverless or task-based container runtimes such as ECS Fargate or AWS Lambda. To see which Datadog features this setup supports, see the [feature compatibility table][7] under **OTel SDK + OSS Collector**.

- [OpenTelemetry Collector Contrib][1] v0.152.0 or later
- A [Datadog API key][2]
- Your [Datadog site][3] (for example, `datadoghq.com` or `datadoghq.eu`)

## Install and configure

### 1. Download the OpenTelemetry Collector

Download the latest release of the OpenTelemetry Collector Contrib distribution from the [releases page][100].

### 2. Create the Collector configuration

Create a configuration file named `collector.yaml`. The configuration varies depending on your environment. Select the tab that matches your setup:

{{< tabs >}}
{{% tab "Host" %}}

Use this configuration for an uncontainerized Collector running directly on a host (bare metal or VM).

Set the `DD_API_KEY` and `DD_SITE` environment variables before starting the Collector.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host-level metrics for the Infrastructure List
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud metadata for hostname resolution and tagging
  resourcedetection:
    detectors: [env, system]
    timeout: 2s
    override: true
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  spanmetrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    metrics_endpoint: https://otlp.${env:DD_SITE}/api/v2/otlpmetrics
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Send resource attributes and scope metadata as metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch: {}

extensions:
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, hostmetrics]
      processors: [resourcedetection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [forward, spanmetrics]
    traces/sampling:
      receivers: [forward]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/spanmetrics:
      receivers: [spanmetrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

For cloud-specific environments, add the appropriate resource detection detector:
- **Amazon EC2**: `detectors: [ec2, env, system]`
- **Google Cloud**: `detectors: [gcp, env, system]`
- **Azure**: `detectors: [azure, env, system]`

See the [full configuration files][500] for an optional config to gather additional metadata about the system.

[500]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Docker" %}}

Use this configuration for a containerized Collector. The `hostmetrics` receiver requires mounting the host filesystem at `/hostfs`.

Set the `DD_API_KEY` and `DD_SITE` environment variables before starting the Collector.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host-level metrics for the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  hostmetrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud metadata for hostname resolution and tagging
  resourcedetection:
    detectors: [env]
    timeout: 2s
    override: true
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  spanmetrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    metrics_endpoint: https://otlp.${env:DD_SITE}/api/v2/otlpmetrics
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Send resource attributes and scope metadata as metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch: {}

extensions:
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, hostmetrics]
      processors: [resourcedetection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [forward, spanmetrics]
    traces/sampling:
      receivers: [forward]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/spanmetrics:
      receivers: [spanmetrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

Run the Collector with the host filesystem mounted:

```shell
docker run \
    -p 4317:4317 \
    -p 4318:4318 \
    -e DD_API_KEY \
    -e DD_SITE \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.152.0 \
    --config /etc/otelcol-contrib/config.yaml
```

{{% /tab %}}

{{% tab "Kubernetes (DaemonSet)" %}}

Use this configuration for a Collector deployed as a Kubernetes DaemonSet. This includes the `k8s_attributes` processor for enriching telemetry with Kubernetes metadata.

Set the `DD_API_KEY` and `DD_SITE` environment variables before starting the Collector.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host-level metrics for the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  hostmetrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud metadata for hostname resolution and tagging
  resourcedetection:
    detectors: [env]
    timeout: 2s
    override: true
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}
  # Enrich telemetry with Kubernetes pod and container metadata
  k8s_attributes:
    extract:
      otel_annotations: true
      metadata:
        - k8s.node.name
        - k8s.namespace.name
        - service.namespace
        - service.name
        - service.version
        - service.instance.id
        - k8s.deployment.name
        - k8s.replicaset.name
        - k8s.daemonset.name
        - k8s.statefulset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.pod.uid
        - k8s.pod.name
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  spanmetrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    metrics_endpoint: https://otlp.${env:DD_SITE}/api/v2/otlpmetrics
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Send resource attributes and scope metadata as metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch: {}

extensions:
  # Required for Kubernetes liveness/readiness probes
  health_check:
    endpoint: ${env:MY_POD_IP}:13133
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - health_check
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [k8s_attributes, resourcedetection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, hostmetrics]
      processors: [k8s_attributes, resourcedetection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [k8s_attributes, resourcedetection]
      exporters: [forward, spanmetrics]
    traces/sampling:
      receivers: [forward]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/spanmetrics:
      receivers: [spanmetrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

For EKS environments, add the `eks` and `ec2` detectors to the `resourcedetection` processor:

```yaml
processors:
  resourcedetection:
    detectors: [eks, ec2, env]
    timeout: 2s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    ec2:
      tags: ['^kubernetes\.io/cluster/.*$']
```

The `k8s_attributes` processor requires a ServiceAccount with permissions to read pod metadata. See the [Kubernetes Attributes Processor documentation][101] for RBAC setup instructions.

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control

{{% /tab %}}

{{% tab "Kubernetes (Helm chart)" %}}

You can deploy the Collector as a DaemonSet in Kubernetes using the [official OpenTelemetry Collector Helm chart][102].

1. Create a Kubernetes secret with your Datadog API key:

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. Add the OpenTelemetry Helm repository:

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. Download the [example values file][103] and save it as `values.yaml`. This file configures the Collector as a DaemonSet with the recommended Datadog settings. If your Datadog site is not `datadoghq.com`, update the `DD_SITE` value in `values.yaml` before installing.

1. Install the Collector:

   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --values values.yaml
   ```

[102]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[103]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset.yaml

{{% /tab %}}
{{< /tabs >}}

### 3. Run the Collector

Start the Collector. If you are using Docker or Kubernetes, the run command is included in the [Create the collector configuration](#2-create-the-collector-configuration) section.

For Host installations, run:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml
```

### 4. Configure your application

Configure your OpenTelemetry-instrumented application to send data to the Collector. Set the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to point to the Collector:

{{< tabs >}}
{{% tab "Host" %}}
```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```
{{% /tab %}}

{{% tab "Docker" %}}
Set the following environment variables in your application container:
```
OTEL_EXPORTER_OTLP_ENDPOINT=http://<collector-hostname>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```
Both containers must be on the same network. If you use Docker Compose, this is handled automatically.
{{% /tab %}}

{{% tab "Kubernetes" %}}
In your application deployment manifest, configure the endpoint using the host IP:
```yaml
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://$(HOST_IP):4318"
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: "http/protobuf"
```
{{% /tab %}}
{{< /tabs >}}

Apply [Unified Service Tagging][4] by setting the `service.name`, `deployment.environment.name`, and `service.version` resource attributes in your application's OpenTelemetry configuration.

## Verify the setup

After your application sends telemetry to the Collector, verify that data appears in Datadog:

1. In Datadog, go to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}} and confirm that your `service.name` appears.
2. Open {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}} and search for your service.
3. Go to {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}} and confirm that the host running the Collector appears.
4. If you send logs through OTLP, go to {{< ui >}}Logs Explorer{{< /ui >}} and search for your service name.

## Key components

### Span metrics connector

The `spanmetrics` connector generates RED metrics from trace data. These metrics power APM features including the Service Catalog, Service Page, and Resource Page. The connector is configured with dimensions that enable Datadog to compute host tags, peer services, and operation names from your traces.

For a complete list of dimensions included in the recommended configuration, including those related to container tags, see the [full configuration files][5] in the `opentelemetry-examples` repository.

### OTLP HTTP exporter

The `otlp_http` exporter sends telemetry data to Datadog's OTLP intake endpoints. Key configuration details:

- **Endpoint**: `https://otlp.<YOUR_DD_SITE>` for traces and logs, `https://otlp.<YOUR_DD_SITE>/api/v2/otlpmetrics` for metrics.
- **Compression**: `zstd` is recommended for reduced bandwidth usage. When using `zstd`, set `compression_params.level` explicitly, because the default uses the lowest compression level.

#### `dd-otel-metric-config` header {#dd-otel-metric-config-header}

The `dd-otel-metric-config` header is a JSON payload sent with metrics requests that configures how Datadog processes OTLP metrics. Set it in the `headers` section of the `otlp_http` exporter.

| Field | Type | Default | Description |
|---|---|---|---|
| `resource_attributes_as_tags` | Boolean | `false` | Propagates OTLP resource attributes as Datadog tags on emitted metrics. |
| `instrumentation_scope_metadata_as_tags` | Boolean | `false` | Propagates OTLP instrumentation scope metadata (scope name and version) as tags on emitted metrics. |
| `trace_metrics.namespace` | String | `traces.span.metrics` | Namespace prefix applied to trace-derived metrics. |
| `trace_metrics.instrumentation_metrics_calc` | Boolean | `false` | When `true`, routes supported HTTP instrumentation metrics to power APM trace metrics. |
| `raw_instrumentation_metrics_drop` | Boolean | `false` | When `true`, drops the raw HTTP instrumentation metrics from the regular metrics intake after routing them for APM trace metrics. Only applies when `trace_metrics.instrumentation_metrics_calc` is `true`. |

Example with instrumentation metrics enabled:

```json
{
  "trace_metrics": {
    "namespace": "myapp.traces",
    "instrumentation_metrics_calc": true
  },
  "raw_instrumentation_metrics_drop": false,
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": false
}
```

<div class="alert alert-info">The recommended OSS Collector configuration uses the <code>spanmetrics</code> connector to generate the RED metrics that power APM views. The <code>trace_metrics.instrumentation_metrics_calc</code> and <code>raw_instrumentation_metrics_drop</code> fields support an alternative configuration for setups that derive APM trace metrics from HTTP instrumentation metrics instead. Do not enable <code>instrumentation_metrics_calc</code> alongside the <code>spanmetrics</code> connector, as this computes trace metrics from both sources.</div>

### Datadog extension

The `datadog` extension sends Collector metadata to Datadog for host enrichment. It does not export telemetry data. All telemetry flows through the OTLP HTTP exporter. This extension is part of the [OpenTelemetry Collector Contrib][1] project and handles API key validation and deployment type reporting.

### Cumulative-to-delta processor

The `cumulativetodelta` processor converts cumulative metrics to delta temporality, which is [Datadog's recommended configuration][6] for OpenTelemetry metrics.

### Self-monitoring telemetry

The configuration sends the Collector's own metrics back to its local OTLP receiver (`http://localhost:4318`). This routes the Collector's internal metrics through its own pipelines so they are enriched with resource attributes before being exported to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /account_management/api-app-keys/
[3]: /getting_started/site/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector
[6]: /opentelemetry/guide/otlp_delta_temporality/
[7]: /opentelemetry/compatibility/
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
