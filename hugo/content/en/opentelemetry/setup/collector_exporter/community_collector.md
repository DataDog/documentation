---
title: Set Up the Community OpenTelemetry Collector
aliases:
- /opentelemetry/setup/collector_exporter/oss_setup/
private: true
description: 'Send OpenTelemetry data to Datadog using the Community OpenTelemetry Collector'
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

Send traces, metrics, and logs to Datadog using the Community OpenTelemetry Collector, which is based on the [OpenTelemetry Collector Contrib][1] distribution and standard OpenTelemetry components. This setup uses the following key components:

- **OTLP HTTP exporter**: Sends telemetry to Datadog's OTLP intake endpoints.
- **Span metrics connector**: Generates RED (Rate, Error, Duration) metrics from trace data to power APM features such as the Service Catalog and Service Page.
- **Resource detection processor**: Extracts host and cloud metadata for hostname resolution and tagging in Datadog.

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Diagram: OpenTelemetry SDK in code sends data through OTLP to host running any OpenTelemetry Collector with OTLP HTTP exporter, which forwards to Datadog's Observability Platform." style="width:100%;" >}}

<div class="alert alert-warning">This setup is in Preview. Some Datadog features may behave differently compared to the Datadog Exporter setup. For example, the <a href="/infrastructure/list/">Infrastructure List</a> may show less host metadata until host metadata ingestion support is finalized and the Kubernetes Explorer related views may be empty.</div>

## Prerequisites

This setup supports bare metal, VMs, Docker, and Kubernetes. Supported managed Kubernetes distributions include Amazon EKS (including Auto Mode), Google GKE (Standard and Autopilot), and Azure AKS (including Automatic).

This setup does not support serverless or task-based container runtimes such as ECS Fargate or AWS Lambda. For supported Datadog features, see the [feature compatibility table][7] under **OTel SDK + Community OTel Collector**.

- [OpenTelemetry Collector Contrib][1] v0.154.0 or later
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
  host_metrics:
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
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
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
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

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
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
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

Use this configuration for a containerized Collector. The `host_metrics` receiver requires mounting the host filesystem at `/hostfs`.

Set the following environment variables before starting the Collector:

- `DD_API_KEY` and `DD_SITE`
- `OTEL_RESOURCE_ATTRIBUTES`: The Collector cannot detect host information from inside a container, so provide it here (for example, `host.name=<YOUR_HOST_NAME>`).

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
  host_metrics:
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
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
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
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

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
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
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
    -e OTEL_RESOURCE_ATTRIBUTES \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.154.0 \
    --config /etc/otelcol-contrib/config.yaml
```

{{% /tab %}}

{{% tab "Kubernetes (DaemonSet)" %}}

Use this configuration for a Collector deployed as a Kubernetes DaemonSet in a non-cloud environment. It includes the `k8s_attributes` processor for enriching telemetry with Kubernetes metadata and the `kubelet_stats` receiver for node, pod, container, and volume metrics. On a managed Kubernetes distribution, apply the changes described in [Managed Kubernetes distributions](#managed-kubernetes-distributions) after the configuration.

Set the following environment variables in the Collector pod spec, using the Kubernetes downward API where noted:

- `DD_API_KEY` and `DD_SITE`
- `K8S_NODE_NAME`: The name of the Kubernetes node, used by the `kubelet_stats` receiver. Set it from the `spec.nodeName` field.
- `MY_POD_IP`: The pod IP, used by the `health_check` extension. Set it from the `status.podIP` field.
- `OTEL_RESOURCE_ATTRIBUTES`: The Collector cannot determine the host name from inside a container, so provide host information here (for example, `k8s.node.name=$(K8S_NODE_NAME)`). The `$(VAR)` syntax is expanded by Kubernetes, so set this in the pod spec rather than in a shell.

Mount the host filesystem at `/hostfs` so the `host_metrics` receiver can collect host metrics.

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
  host_metrics:
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
  # Collect node, pod, container, and volume metrics from the kubelet
  kubelet_stats:
    collection_interval: 15s
    auth_type: "serviceAccount"
    endpoint: "${env:K8S_NODE_NAME}:10250"
    node: "${env:K8S_NODE_NAME}"
    insecure_skip_verify: true
    metric_groups:
      - node
      - pod
      - container
      - volume

processors:
  # Detect host and cloud metadata for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}
  # Convert selected delta metrics to rates
  deltatorate:
    metrics:
      - k8s.pod.network.io
      - k8s.pod.network.errors
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
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
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
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

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
      processors: [k8s_attributes, resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics, kubelet_stats]
      processors: [k8s_attributes, resource_detection, cumulativetodelta, deltatorate]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
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

This configuration requires a ServiceAccount bound to a ClusterRole that grants `get`, `list`, and `watch` on `pods`, `namespaces`, `nodes`, `nodes/stats`, and `replicasets`. The `k8s_attributes` processor reads pod metadata, and the `kubelet_stats` receiver reads `nodes/stats`. See the [Kubernetes Attributes Processor documentation][101] for RBAC setup instructions, and add `nodes/stats` to the rules it lists.

#### Managed Kubernetes distributions

On a managed Kubernetes distribution, replace the `resource_detection` processor in the previous configuration with the variant for your environment. The cloud detectors provide host information, so you do not need to set `OTEL_RESOURCE_ATTRIBUTES`.

##### Amazon EKS

```yaml
processors:
  resource_detection:
    detectors: [eks, ec2, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    ec2:
      tags: ['^kubernetes\.io/cluster/.*$']
    system:
      resource_attributes:
        host.name:
          enabled: false
```

The `ec2` and `eks` detectors need access to the IMDS endpoint from inside a container. Set the IMDS token hop limit to 2 in your node launch template or in your account settings. The `timeout` is raised to `15s` to allow for IMDS latency.

##### Amazon EKS Auto Mode

```yaml
processors:
  resource_detection:
    detectors: [eks, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
        host.id: { enabled: true } # Required for host name inference
        cloud.account.id: { enabled: true }
        cloud.availability_zone: { enabled: true }
        cloud.region: { enabled: true }
        host.image.id: { enabled: true }
        host.type: { enabled: true }
      node_from_env_var: K8S_NODE_NAME
    system:
      resource_attributes:
        host.name:
          enabled: false
```

The `eks` detector requires a Pod Identity association that assigns the Collector an IAM role with the `EC2:DescribeInstances` permission.

##### Google GKE

```yaml
processors:
  resource_detection:
    detectors: [gcp, env, system]
    timeout: 2s
    override: true
    system:
      resource_attributes:
        host.name:
          enabled: false
```

On older GKE versions, the `gcp` detector may not return a host name. If that happens, supply the node name as `host.name` in `OTEL_RESOURCE_ATTRIBUTES`.

##### Azure AKS

```yaml
processors:
  resource_detection:
    detectors: [aks, azure, env, system]
    timeout: 2s
    override: true
    aks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    system:
      resource_attributes:
        host.name:
          enabled: false
```

##### GKE Autopilot and AKS Automatic

These modes do not allow mounting `/hostfs` or using host ports. Use the GKE or AKS `resource_detection` processor, then make these additional changes:

- Remove the `host_metrics` receiver from the `receivers` block and from the `metrics` pipeline. Node, pod, container, and volume metrics still come from the `kubelet_stats` receiver.
- Disable host ports on the Collector and expose it through a node-local Service instead. Point your applications at that Service rather than at the host IP shown in [Configure your application](#4-configure-your-application).

For the complete configuration files for each environment, see the [`opentelemetry-examples` repository][501].

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control
[501]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Kubernetes (Helm chart)" %}}

You can deploy the Collector as a DaemonSet in Kubernetes using the [official OpenTelemetry Collector Helm chart][102] v0.147.1 or later. The values files below set up the required mounts, environment variables, and RBAC resources.

1. Create a Kubernetes secret with your Datadog API key:

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. Add the OpenTelemetry Helm repository:

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. Download the example values file for your environment and save it as `values.yaml`. If your Datadog site is not `datadoghq.com`, update the `DD_SITE` value in `values.yaml` before installing.

   | Environment | Values file |
   |---|---|
   | Kubernetes (non-cloud) | [`daemonset.yaml`][103] |
   | Amazon EKS | [`daemonset-eks.yaml`][104] |
   | Amazon EKS Auto Mode | [`daemonset-eks-auto.yaml`][105] |
   | Google GKE | [`daemonset-gke.yaml`][106] |
   | Google GKE Autopilot | [`daemonset-gke-autopilot.yaml`][107] |
   | Azure AKS | [`daemonset-aks.yaml`][108] |
   | Azure AKS Automatic | [`daemonset-aks-automatic.yaml`][109] |

   On Amazon EKS, the values files cannot configure the required AWS-side settings. Apply the following outside of Helm:

   - **Amazon EKS**: The `ec2` and `eks` detectors need access to the IMDS endpoint from inside a container. Set the IMDS token hop limit to 2 in your node launch template or in your account settings.
   - **Amazon EKS Auto Mode**: The `eks` detector requires a Pod Identity association that assigns the Collector an IAM role with the `EC2:DescribeInstances` permission.

1. Install the Collector:

   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --values values.yaml
   ```

[102]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[103]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset.yaml
[104]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-eks.yaml
[105]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-eks-auto.yaml
[106]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-gke.yaml
[107]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-gke-autopilot.yaml
[108]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-aks.yaml
[109]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-aks-automatic.yaml

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

The `span_metrics` connector generates RED metrics from trace data. These metrics power APM features including the Service Catalog, Service Page, and Resource Page. The connector is configured with dimensions that enable Datadog to compute host tags, peer services, and operation names from your traces.

For a complete list of dimensions included in the recommended configuration, including those related to container tags, see the [full configuration files][5] in the `opentelemetry-examples` repository. Those files also show how to replace groups of container tag dimensions with glob patterns, such as `- glob: container.**`.

### OTLP HTTP exporter

The `otlp_http` exporter sends telemetry data to Datadog's OTLP intake endpoints. Key configuration details:

- **Endpoint**: `https://otlp.<YOUR_DD_SITE>` for traces, logs, and metrics.
- **Compression**: `zstd` is recommended for reduced bandwidth usage. When using `zstd`, set `compression_params.level` explicitly, because the default uses the lowest compression level.
- **Batching**: The `sending_queue.batch` settings begin flushing at 2 MiB and split serialized batches at 4 MiB. If you receive a 413 response, reduce these sizes.

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

<div class="alert alert-info">The recommended Community OTel Collector configuration uses the <code>span_metrics</code> connector to generate the RED metrics that power APM views. The <code>trace_metrics.instrumentation_metrics_calc</code> and <code>raw_instrumentation_metrics_drop</code> fields support an alternative configuration for setups that derive APM trace metrics from HTTP instrumentation metrics instead. Do not enable <code>instrumentation_metrics_calc</code> alongside the <code>span_metrics</code> connector, as this computes trace metrics from both sources.</div>

### Datadog extension

The `datadog` extension sends Collector metadata to Datadog for host enrichment. It does not export telemetry data. All telemetry flows through the OTLP HTTP exporter. This extension is part of the [OpenTelemetry Collector Contrib][1] project and handles API key validation and deployment type reporting.

### Cumulative-to-delta processor

The `cumulativetodelta` processor converts cumulative metrics to delta temporality, which is [Datadog's recommended configuration][6] for OpenTelemetry metrics.

### Kubelet stats receiver

In Kubernetes deployments, the `kubelet_stats` receiver collects node, pod, container, and volume metrics from the kubelet on each node. The `deltatorate` processor converts the pod network metrics it produces to rates.

### Self-monitoring telemetry

The configuration sends the Collector's own metrics back to its local OTLP receiver (`http://localhost:4318`). This routes the Collector's internal metrics through its own pipelines so they are enriched with resource attributes before being exported to Datadog.

## OTLP intake limits

Datadog enforces the following limits when ingesting OTLP data. Data that exceeds a limit is rejected or dropped as noted.

**Payload size**
: Each intake endpoint enforces a maximum payload size per request. Requests above the limit are rejected with an `HTTP 413 Request Entity Too Large` response. If you receive a 413, reduce the batch size or flush more frequently so each request stays under the limit. For the payload size limit of each endpoint, see [Intake limits][8].

**Histogram bucket count**
: Each histogram datapoint is validated on ingestion, with a maximum per-bucket count (the number of observations in any single bucket) of 2,147,483,647 (2<sup>31</sup> − 1). If any bucket exceeds this, the entire datapoint is dropped.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /account_management/api-app-keys/
[3]: /getting_started/site/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector
[6]: /opentelemetry/guide/otlp_delta_temporality/
[7]: /opentelemetry/compatibility/
[8]: /opentelemetry/setup/otlp_ingest/#intake-limits
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
