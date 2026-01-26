---
title: Install the DDOT Collector as a Gateway on Kubernetes
private: true
# code_lang: kubernetes_gateway
# type: multi-code-lang
# code_lang_weight: 2
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
- link: "https://opentelemetry.io/docs/collector/deployment/gateway/"
  tag: "OpenTelemetry"
  text: "Collector Deployment: Gateway"
- link: "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter"
  tag: "OpenTelemetry"
  text: "Load Balancing Exporter"
- link: "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor"
  tag: "OpenTelemetry"
  text: "Tail Sampling Processor"
---

{{< callout header="false" btn_hidden="true">}}
  Support for installing the DDOT Collector as a gateway on Kubernetes is in Preview.
{{< /callout >}}

<div class="alert alert-info">
This guide assumes you are familiar with deploying the DDOT Collector as a DaemonSet. For more information, see <a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">Install the DDOT Collector as a DaemonSet on Kubernetes</a>.
</div>

## Overview

The OpenTelemetry Collector can be deployed in multiple ways. The *daemonset* pattern is a common deployment where a Collector instance runs on every Kubernetes node alongside the core Datadog Agent.

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="Architecture diagram of the OpenTelemetry Collector daemonset pattern. A Kubernetes cluster contains three nodes. On each node, an application instrumented with OpenTelemetry sends OTLP data to a local Agent DaemonSet. The Agent DaemonSet then forwards this data directly to the Datadog backend." style="width:100%;" >}}

The [gateway][6] pattern provides an additional deployment option that uses a centralized, standalone Collector service. This gateway layer can perform actions such as tail-based sampling, aggregation, filtering, and routing before exporting the data to one or more backends such as Datadog. It acts as a central point for managing and enforcing observability policies.

{{< img src="opentelemetry/embedded_collector/ddot_gateway.png" alt="Architecture diagram of the OpenTelemetry Collector gateway pattern. Applications send OTLP data to local Agent DaemonSets running on each node. The DaemonSets forward this data to a central load balancer, which distributes it to a separate deployment of gateway Collector pods. These gateway pods then process and send the telemetry data to Datadog." style="width:100%;" >}}

When you enable the gateway:
1.  A Kubernetes Deployment (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) manages the standalone **gateway Collector pods**.
2.  A Kubernetes Service (`<RELEASE_NAME>-datadog-otel-agent-gateway`) exposes the gateway pods and provides load balancing.
3.  The existing **DaemonSet Collector pods** are configured by default to send their telemetry data to the gateway service instead of directly to Datadog.

## Requirements

Before you begin, ensure you have the following:

* **Datadog Account**:
    * A [Datadog account][1].
    * Your Datadog [API key][2].
* **Software**:
    * A Kubernetes cluster (v1.29+). EKS Fargate and GKE Autopilot are not supported.
    * [Helm][3] (v3+).
    * Datadog Helm chart version 3.160.1 or higher.
    * [kubectl][4].
* **Network**:
  {{% otel-network-requirements %}}

## Installation and configuration

This guide uses the Datadog Helm chart to configure the DDOT Collector gateway. Check out all the available configurations on the [Datadog Helm chart README][8].

<div class="alert alert-info">This installation is required for both Datadog SDK + DDOT and OpenTelemetry SDK + DDOT configurations. While the Datadog SDK implements the OpenTelemetry API, it still requires the DDOT Collector to process and forward OTLP metrics and logs.</div>

### Deploying the gateway with a daemonset

To get started, enable both the gateway and the DaemonSet Collector in your `values.yaml` file. This is the most common setup.

```yaml
# values.yaml
targetSystem: "linux"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable the Collector in the Agent Daemonset
  otelCollector:
    enabled: true

# Enable the standalone Gateway Deployment
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    # Example selector to place gateway pods on specific nodes
    gateway: "true"
```

In this case, the daemonset Collector uses a default config that sends OTLP data to the gateway's Kubernetes service:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  otlphttp:
    endpoint: http://<release>-datadog-otel-agent-gateway:4318
    tls:
      insecure: true
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [otlphttp, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes, batch]
      exporters: [otlphttp]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [otlphttp]
```

The gateway Collector uses a default config that listens on the service ports and sends data to Datadog:

```yaml
receivers:
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
processors:
  batch:
    timeout: 10s
extension:
  datadog:
    api:
      key: ${env:DD_API_KEY}
    deployment_type: gateway
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
```

<div class="alert alert-tip">
Always configure <code>otelAgentGateway.affinity</code> or <code>otelAgentGateway.nodeSelector</code> to control the nodes where the gateway pods are scheduled.<br>Adjust <code>otelAgentGateway.replicas</code> (default is 1) to scale the number of gateway pods based on your needs.</div>

### Deploying a standalone gateway

If you have an existing DaemonSet deployment, you can deploy the gateway independently.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "gw-only"
agents:
  enabled: false
clusterAgent:
  enabled: false
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
```

After deploying the gateway, you must update the configuration of your existing  DaemonSet Collectors to send data to the new gateway service endpoint (for example, `http://gw-only-otel-agent-gateway:4318`).

### Customizing Collector configurations

You can override the default configurations for both the DaemonSet and gateway Collectors using the `datadog.otelCollector.config` and `otelAgentGateway.config` values, respectively.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable and configure the DaemonSet Collector
  otelCollector:
    enabled: true
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        otlp:
          endpoint: http://my-gw-otel-agent-gateway:4317
          tls:
            insecure: true
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [otlp]
          metrics:
            receivers: [otlp]
            exporters: [otlp]
          logs:
            receivers: [otlp]
            exporters: [otlp]

# Enable and configure the gateway Collector
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

{{% otel-infraattributes-prereq %}}

<div class="alert alert-info">
If you set <code>fullnameOverride</code>, the gateway's Kubernetes service name becomes <code><fullnameOverride>-otel-agent-gateway</code>. The ports defined in <code>otelAgentGateway.ports</code> are exposed on this service. Ensure these ports match the OTLP receiver configuration in the gateway and the OTLP exporter configuration in the DaemonSet.
</div>

The example configurations use insecure TLS for simplicity. Follow the [OTel configtls instructions][7] if you want to enable TLS.

## Advanced use cases

### Tail sampling with the load balancing exporter

A primary use case for the gateway is tail-based sampling. To ensure that all spans for a given trace are processed by the same gateway pod, use the **load balancing exporter** in your DaemonSet Collectors. This exporter consistently routes spans based on a key, such as `traceID`.

In the `values.yaml` below:

1.  The daemonset Collector (`datadog.otelCollector`) is configured with the `loadbalancing` exporter, which uses the Kubernetes service resolver to discover and route data to the gateway pods.
2.  The gateway Collector (`otelAgentGateway`) uses the `tail_sampling` processor to sample traces based on defined policies before exporting them to Datadog.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY> 
  otelCollector:
    enabled: true
    # RBAC permissions are required for the k8s resolver in the loadbalancing exporter
    rbac:
      create: true
      rules:
        - apiGroups: [""]
          resources: ["endpoints"]
          verbs: ["get", "watch", "list"]
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        loadbalancing:
          routing_key: "traceID"
          protocol:
            otlp:
              tls:
                insecure: true
          resolver:
            k8s:
              service: my-gw-otel-agent-gateway
              ports:
                - 4317
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [loadbalancing]

otelAgentGateway:
  enabled: true
  replicas: 3
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies: <Add your sampling policies here>
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

<div class="alert alert-warning">
To ensure APM Stats are calculated on 100% of your traces before sampling, the <code>datadog/connector</code> runs in a separate pipeline without the <code>tail_sampling</code> processor. The Connector can run in either the DaemonSet or the gateway layer.
</div>

### Using a custom Collector image

To use a custom-built Collector image for your gateway, specify the image repository and tag under `otelAgentGateway.image`. If you need instructions on how to build the custom images, see [Use Custom OpenTelemetry Components][5].

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  image:
    repository: <YOUR REPO>
    tag: <IMAGE TAG>
    doNotCheckTag: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
```

### Enable Autoscaling with Horizontal Pod Autoscaler (HPA)

The DDOT Collector gateway supports autoscaling with the Kubernetes Horizontal Pod Autoscaler (HPA) feature. To enable HPA, configure `otelAgentGateway.autoscaling`.

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
  replicas: 4  # 4 replicas to begin with and HPA may override it based on the metrics
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    metrics:
      # Aim for high CPU utilization for higher throughput
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 80
    behavior:
      scaleUp:
        stabilizationWindowSeconds: 30
      scaleDown:
        stabilizationWindowSeconds: 60
```

You can use resource metrics (CPU or memory), custom metrics (Kubernetes Pod or Object), or external metrics as autoscaling inputs. For resource metrics, ensure that the [Kubernetes metrics server][9] is running in your cluster. For custom or external metrics, consider configuring the [Datadog Cluster Agent metrics provider][10].

### Deploying a multi-layer gateway

For advanced scenarios, you can deploy multiple gateway layers to create a processing chain. To do this, deploy each layer as a separate Helm release, starting from the final layer and working backward.

1.  **Deploy Layer 1 (Final Layer):** This layer receives from Layer 2 and exports to Datadog.

    ```yaml
    # layer-1-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-1"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          datadog:
            api:
              key: <API Key>
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [datadog]
            metrics:
              receivers: [otlp]
              exporters: [datadog]
            logs:
              receivers: [otlp]
              exporters: [datadog]
    ```

2.  **Deploy Layer 2 (Intermediate Layer):** This layer receives from the DaemonSet and exports to Layer 1.

    ```yaml
    # layer-2-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-2"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          otlp:
            endpoint: http://gw-layer-1-otel-agent-gateway:4317
            tls:
              insecure: true
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [otlp]
            metrics:
              receivers: [otlp]
              exporters: [otlp]
            logs:
              receivers: [otlp]
              exporters: [otlp]
    ```

3.  **Deploy DaemonSet:** Configure the DaemonSet to export to Layer 2.

    ```yaml
    # daemonset-values.yaml
    targetSystem: "linux"
    datadog:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
      otelCollector:
        enabled: true
        config: |
          receivers:
            otlp:
              protocols:
                grpc:
                  endpoint: "localhost:4317"
          exporters:
            otlp:
              endpoint: http://gw-layer-2-otel-agent-gateway:4317
              tls:
                insecure: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                exporters: [otlp]
              metrics:
                receivers: [otlp]
                exporters: [otlp]
              logs:
                receivers: [otlp]
                exporters: [otlp]
    ```
    
## View gateway pods on Fleet Automation

The DDOT Collector gateway includes the [Datadog extension][11] by default. This extension exports Collector build information and configurations to Datadog, allowing you to monitor your telemetry pipeline from Infrastructure Monitoring and Fleet Automation.

To view your gateway pods:

1. Navigate to **Integrations > Fleet Automation**.

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="Fleet Automation page showing DDOT gateway pods" style="width:100%;" >}}

2. Select a gateway pod to view detailed build information and the running Collector configuration.

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="Fleet Automation page showing the collector config of one DDOT gateway pod" style="width:100%;" >}}

## Known limitations

  * **Startup race condition**: When deploying the DaemonSet and gateway in the same release, DaemonSet pods might start before the gateway service is ready, causing initial connection error logs. The OTLP exporter automatically retries, so these logs can be safely ignored. Alternatively, deploy the gateway first and wait for it to become ready before deploying the DaemonSet.

## Further reading
  
{{< partial name="whats-next/whats-next.html" >}}
  
[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /opentelemetry/setup/ddot_collector/custom_components
[6]: https://opentelemetry.io/docs/collector/deployment/gateway/
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[8]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[9]: http://github.com/kubernetes-sigs/metrics-server
[10]: /containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
