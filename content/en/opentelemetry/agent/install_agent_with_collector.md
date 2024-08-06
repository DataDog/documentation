---
title: Install the Datadog Agent with the OpenTelemetry Collector
private: true
---

## Overview

Follow this guide to install the Datadog Agent with the OpenTelemetry (OTel) Collector using Helm.

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].
1. Find or create your [Datadog application key][20].

**Software**:  
Install the following tools on your machine:

- Kubernetes v1.29+  
- Helm v3+  
- Docker  
- [kind][3]  
- [kubectl][4]

**Datadog feature flags**:  
Ensure the following feature flags are enabled in the **Datadog OpenTelemetry (698785)** organization:

- `fleet_view_config_layers` [using SDP][5] (enabled by default for dev, staging; prod requires enabling manually with approval).
- `event_platform_resource_writer_write_datadog_agent_otel` (enabled by default for all environments).   

## Install OpenTelemetry demo

This guide uses the [OpenTelemetry Demo][12] project in a Kubernetes environment to illustrate the implementation of the [OpenTelemetry Collector in the Datadog Agent][13].

### Connect to the Kubernetes cluster

1. Create a local Kubernetes cluster using `kind`:
   ```shell
   kind create cluster --name workshop
   ```
1. Verify that you created the cluster:
   ```shell
   kubectl cluster-info --context kind-workshop
   ```
1. Create a Kubernetes namespace for the workshop. Use your first name as the namespace:
   ```shell
   kubectl create namespace <YOUR_NAME>
   ```
1. Optionally, set this namespace as the default to avoid specifying it in subsequent kubectl and helm commands:
   ```shell
   kubectl config set-context --current --namespace=<YOUR_NAME>
   ```
1. Verify the namespace configuration was set as default for the `kind-workshop` context:
   ```shell
   kubectl config get-contexts
   ```
{{% collapse-content title="Optional configuration for EKS clusters" level="p" %}}
If you're using an Amazon EKS cluster instead of a local cluster:
1. Connect your <code>kubectl</code> to the cluster by creating a <code>kubeconfig</code> file:
   ```shell
    aws eks update-kubeconfig --region us-east-2 --name <YOUR_CLUSTER_NAME>
   ```
1. Verify the `kubectl` configuration to ensure your new context was added successfully:
   ```shell
   kubectl config get-contexts
   ```
{{% /collapse-content %}}

### Get the otel-demo Helm chart

1. Add OpenTelemetry Helm repository:
   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```
   <div class="alert alert-info">If you already have the repository, update it to the latest version: <code>helm repo update</code>.</div>

1. Check the version of `opentelemetry-demo` chart:
   ```shell
   helm show chart open-telemetry/opentelemetry-demo
   ```
   Ensure that the version is 0.32.3 or higher.

### Configure the OpenTelemetry Collector

The OpenTelemetry Collector configuration for the `otel-demo` Helm chart is pre-configured. For this guide, use the default configuration without modifications.

If you are curious you can:

- [View the configuration on GitHub][14].
- [Inspect the configuration using OTelBin][15].

### Install `otel-demo` chart

1. Install the chart with the release name `demo`:
   ```shell
   helm upgrade --install demo open-telemetry/opentelemetry-demo --namespace <YOUR_NAME>
   ```
1. Verify that all `otel-demo` apps are running:
   ```shell
   kubectl get pods --namespace <YOUR_NAME>
   ```
1. Set up port forwarding to access the `otel-demo` apps:
   ```shell
   kubectl port-forward svc/demo-frontendproxy 8080:8080 --namespace <YOUR_NAME>
   ```
1. Access the `otel-demo` apps in your browser:

- [Webstore][16]
- [Grafana][17]
- [Load Generator UI][18]
- [Jaeger UI][19]

Congratulations! The `otel-demo` project is up and running.

## Install the Datadog Agent with the OpenTelemetry Collector

This section guides you through installing the Datadog Agent with the embedded OpenTelemetry Collector using Helm.

### Get the latest version of the Agent Helm chart

1. Add the DataDog repository to your Helm repositories:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```
   <div class="alert alert-info">If you already have the repository, update it to the latest version: <code>helm repo update</code></div>

2. Verify the `datadog` chart version:
   ```shell
   helm show chart datadog/datadog
   ```
   Ensure that the version is 3.69.0 or higher.

### Store your keys as a Kubernetes secret

Next, create a secret containing your Datadog API and application keys. This secret is used in the manifest to deploy the Datadog Agent.

1. Create a secret containing your Datadog API and application keys:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY> \
     --from-literal app-key=<DD_APP_KEY>
   ```
   Replace the `<DD_API_KEY>` and `<DD_APP_KEY>` with the API and application keys for your organization.
1. Verify you created the secret:
   ```shell
   kubectl get secret datadog-secret
   ```

### Install and configure the Datadog Agent

To install the Datadog Agent with the OpenTelemetry Collector, you need to provide specific configuration details.

#### Datadog Agent configuration

Add the following configuration to your Agent's `datadog-values.yaml` file.

<div class="alert alert-info">You can review the <a href="https://github.com/DataDog/agent-psa-internal/blob/main/otel-agent/step23/datadog-values.yaml">datadog-values.yaml</a> file to see the complete Agent configuration.</div>

1. Use the `datadog/agent-dev:nightly-ot-beta-main` image:
   ```yaml
   agents:
     image:
       repository: datadog/agent-dev
       tag: nightly-ot-beta-main
       doNotCheckTag: true
   ```

1. Enable the OTel Collector in the Agent:
   ```yaml
   datadog:
     ...
     otelCollector:
       enabled: true
       ports:
         - containerPort: "4317"
           hostPort: "4317"
           name: otel-grpc
         - containerPort: "4318"
           hostPort: "4318"
           name: otel-http
   ```
1. Enable the necessary Agent features:
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
     networkMonitoring:
       enabled: true
   ```
   <div class="alert alert-warning">Do not enable logs collection in the Agent! Running the OTel Collector with <code>debug</code> exporter produces extensive amount of logs for the <code>otel-demo</code> environment.</div>
1. Set the following envionmrnt variables to prevent data collision:
   ```yaml
   datadog:
     ...
     env:
       - name: DD_ENV
         value: "<YOUR_NAME>"
       - name: DD_HOSTNAME
         value: "<YOUR_NAME>"
   ```

#### OpenTelemetry Collector configuration

The DataDog Helm chart provides a recommended OTel Collector configuration. It's a great starting point for most projects.
The full config can be found [on GitHub](https://github.com/DataDog/helm-charts/blob/main/charts/datadog/templates/_otel_agent_config.yaml).
You can inspect the default Collector config in the [OTelBin](https://www.otelbin.io/?#config=receivers%3A*N__prometheus%3A*N____config%3A*N______scrape*_configs%3A*N________-_job*_name%3A_%22otelcol%22*N__________scrape*_interval%3A_10s*N__________static*_configs%3A*N____________-_targets%3A_%5B%220.0.0.0%3A8888%22%5D*N__otlp%3A*N____protocols%3A*N______grpc%3A*N__________endpoint%3A_0.0.0.0%3A%7B%7B_include_%22get-port-number-from-name%22_*Cdict_%22ports%22_.Values.datadog.otelCollector.ports_%22portName%22_%22otel-grpc%22*D_%7D%7D*N______http%3A*N__________endpoint%3A_0.0.0.0%3A%7B%7B_include_%22get-port-number-from-name%22_*Cdict_%22ports%22_.Values.datadog.otelCollector.ports_%22portName%22_%22otel-http%22*D_%7D%7D*Nexporters%3A*N__debug%3A*N____verbosity%3A_detailed*N__datadog%3A*N____api%3A*N______key%3A_*S%7Benv%3ADD*_API*_KEY%7D*Nprocessors%3A*N__infraattributes%3A*N____cardinality%3A_2*N__batch%3A*N____timeout%3A_10s*Nconnectors%3A*N__datadog%2Fconnector%3A*N____traces%3A*N______compute*_top*_level*_by*_span*_kind%3A_true*N______peer*_tags*_aggregation%3A_true*N______compute*_stats*_by*_span*_kind%3A_true*Nservice%3A*N__pipelines%3A*N____traces%3A*N______receivers%3A_%5Botlp%5D*N______processors%3A_%5Bbatch%5D*N______exporters%3A_%5Bdatadog%2Fconnector%5D*N____traces%2Fotlp%3A*N______receivers%3A_%5Botlp%5D*N______processors%3A_%5Binfraattributes%2C_batch%5D*N______exporters%3A_%5Bdatadog%5D*N____metrics%3A*N______receivers%3A_%5Botlp%2C_datadog%2Fconnector%2C_prometheus%5D*N______processors%3A_%5Binfraattributes%2C_batch%5D*N______exporters%3A_%5Bdatadog%5D*N____logs%3A*N______receivers%3A_%5Botlp%5D*N______processors%3A_%5Binfraattributes%2C_batch%5D*N______exporters%3A_%5Bdatadog%5D%7E)

Let's try to modify the default Collector configuration for the demo purposes: let's add `debug` exporter to existing pipelines.

```yaml
...
service:
  telemetry:
    logs:
      level: debug
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [debug, datadog/connector]
    traces/otlp:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [debug, datadog]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [debug, datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [debug, datadog]
```

> [!TIP]
> Check [collector-config.yaml](step23/collector-config.yaml) file to see the complete OTel Collector configuration.

#### Install OpenTelemetry integration

Go to [OpenTelemetry Integration page](https://app.datadoghq.com/integrations/otel) and check if it's installed.

The [OpenTelemetry Integration](https://app.datadoghq.com/integrations/otel) provides two OOTB dashboards that are essential for monitoring and debugging OTel Collector:
- [OpenTelemetry Host Metrics Dashboard](https://app.datadoghq.com/dash/integration/30425/opentelemetry-host-metrics-dashboard)
- [OpenTelemetry Collector Metrics Dashboard](https://app.datadoghq.com/dash/integration/30773/opentelemetry-collector-metrics-dashboard)

#### Install the Agent via Helm

Finally, let's put it all together and install the DataDog Agent with OTel Collector to our demo environment:

```shell
helm upgrade --install otel-agent datadog/datadog \
  --values ./step23/datadog-values.yaml \
  --set-file datadog.otelCollector.config=./step23/collector-config.yaml \
  --namespace <YOUR_NAME>
```

To verify the Agent is up and running, let's get the list of running pods:

```shell
kubectl get pods --namespace <YOUR_NAME>
```

Let's confirm that Agent default enablements are working:
- Infrastructure [Host Map](https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=env).
- [Live Containers Monitoring](https://app.datadoghq.com/containers)
- [Live Processes](https://app.datadoghq.com/process)
- [NPM](https://app.datadoghq.com/network/overview)
- [Fleet Automation](https://app.datadoghq.com/fleet?group_by=env)

### 2.4 Configure the `otel-demo` apps to use the Converged Agent

It's time to switch all the `otel-demo` apps to use Converged DataDog Agent instead of `collector-contrib`.

#### Convert `otel-demo` collector's configuration

> [!TIP]
> Check [collector-config.yaml](step24/collector-config.yaml) file to see the complete OTel Collector configuration.

To convert `otel-demo` Collector's configuration to be compatible with DataDog Converged Agent, we need to remove unsupported or redundant components.

> [!WARNING]
> DataDog Agent with OTel Collector includes the most common and essential components by default.
> Using OTel components that's not included will result in ERROR and failure to start `otel-agent` container -- the Agent pod will be in `CrashLoopBackOff` state.
> You can find the full list of included components in the Agent's [manifest.yaml](https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml) file.

Here's the list of redundant components from the `otel-demo` default configuration:

- The [`spanmetrics` connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md) responsible for aggregating Request, Error and Duration (R.E.D) metrics. Since we already have it covered by DataDog APM out of the box, we can remove this connector.
- The `jaeger` and `zipkin` receivers are not required for the workshop.
- The DataDog Agent provides us with all required telemetry data for Kubernetes cluster, so we can safely remove [`k8sattributes` processors](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor) from the pipelines.
- And since we're no longer using `k8sattributes`, the [`resource` processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourceprocessor) is not needed either.

Unsupported components from the `otel-demo` configuration:

- The [`opensearch` exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/opensearchexporter) used for the logs pipeline is not included into default DataDog Agent distribution. We have to remove it for now.
- The [`httpcheck`](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/httpcheckreceiver) used for synthethic checks against HTTP endpoints is not included into default DataDog Agent distribution. We have to remove `httpcheck/frontendproxy` receiver for now.

As a result, initial `otel-demo` collector configuration will be reduced to the following pipelines:

```yaml
service:
  ...
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlp, debug]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/prometheus, debug]
    logs:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [debug]
```

Now we can merge it into the Agent OTel Collector configuration:

```yaml
exporters:
  ...
  otlp:
    endpoint: "otel-demo-jaeger-collector:4317"
    tls:
      insecure: true
  otlphttp/prometheus:
    endpoint: http://otel-demo-prometheus-server:9090/api/v1/otlp
    tls:
      insecure: true
service:
  ...
  pipelines:
    traces: # Agent traces pipeline
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [debug, datadog/connector]
    traces/otlp: # Agent traces pipeline
      receivers: [otlp]
      processors: [memory_limiter, infraattributes, batch]
      exporters: [debug, datadog]
    traces/jaeger: # otel-demo traces pipeline
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlp, debug]
    metrics: # Agent metrics pipeline
      receivers: [otlp, datadog/connector, prometheus]
      processors: [memory_limiter, infraattributes, batch]
      exporters: [debug, datadog]
    metrics/prometheus: # otel-demo metrics pipeline
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/prometheus, debug]
    logs:  # Agent logs pipeline
      receivers: [otlp]
      processors: [memory_limiter, infraattributes, batch]
      exporters: [debug, datadog]
    logs/opensearch: # otel-demo logs pipeline
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [debug]
```

> [!TIP]
> Check [collector-config.yaml](step24/collector-config.yaml) file to see the complete OTel Collector configuration.

To apply the changes, we need to run `helm upgrade` command. For the Helm values we're going to use [datadog-values.yaml](step23/datadog-values.yaml) file from the previous step:

```shell
helm upgrade otel-agent datadog/datadog \
  --values ./step23/datadog-values.yaml \
  --set-file datadog.otelCollector.config=./step24/collector-config.yaml \
  --namespace <YOUR_NAME>
```

#### Configure `otel-demo` apps to use the Converged Agent as OTel Collector

> [!TIP]
> Check [demo-values.yaml](step24/demo-values.yaml) file to see the complete `otel-demo` Helm chart values.

In the `otel-demo` project, the `OTEL_COLLECTOR_NAME` environment variable controls which Collector will be used by OTel SDKs and auto-instrumentation libraries.
Let's replace its value with the name of the DataDog Agent service: `otel-agent-datadog`:

```yaml
default:
  envOverrides:
    - name: OTEL_COLLECTOR_NAME
      value: "otel-agent-datadog"
```

> [!NOTE]
> We can use either K8S service name (`otel-agent-datadog`) or IP address of the host. If you prefer to use IP address, change it following:
> ```yaml
> default:
>   envOverrides:
>     ...
>     - name: HOST_IP
>       valueFrom:
>         fieldRef:
>           apiVersion: v1
>           fieldPath: status.hostIP
>     - name: OTEL_COLLECTOR_NAME
>       value: $(HOST_IP)
> ```

We also need to update `OTEL_RESOURCE_ATTRIBUTES` environment variable to the following format:

```yaml
default:
  envOverrides:
    ...
    - name: OTEL_RESOURCE_ATTRIBUTES
      value: >-
        service.name=$(OTEL_SERVICE_NAME),
        service.version=1.10.0,
        service.instance.id=$(OTEL_K8S_POD_UID),
        service.namespace=opentelemetry-demo,
        k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
        k8s.node.name=$(OTEL_K8S_NODE_NAME),
        k8s.pod.name=$(OTEL_K8S_POD_NAME),
        k8s.pod.ip=$(POD_IP),
        deployment.environment=$(OTEL_K8S_NAMESPACE)

```

> [!TIP]
> Check [demo-values.yaml](step24/demo-values.yaml) file to see the complete `otel-demo` Helm chart values.

To apply the changes, we need to redeploy all existing `otel-demo` apps. We can do it by running `helm upgrade` command with the new [demo-values.yaml](step24/demo-values.yaml) file:

```shell
helm upgrade demo open-telemetry/opentelemetry-demo \
  --values ./step24/demo-values.yaml \
  --namespace <YOUR_NAME>
```

Verify: check that all agent and `otel-demo` apps pods are up and running:

```shell
kubectl get pods --namespace <YOUR_NAME>
```

Let's check [APM Traces](https://app.datadoghq.com/apm/traces) and [Logs](https://app.datadoghq.com/logs) to make sure we can see correlation between infra metrics (from the Agent) and Traces (from OTel SDKs).

Finally, let's verify that telemetry data is still exported to [Grafana](http://localhost:8080/grafana/) and [Jaeger UI](http://localhost:8080/jaeger/ui/), but not to OpenSearch:

```shell
kubectl port-forward svc/demo-frontendproxy 8080:8080 --namespace <YOUR_NAME>
```

- Explore Prometheus Metrics and OpenSearch Logs in [Grafana](http://localhost:8080/grafana/)
- Explore collected traces in [Jaeger UI](http://localhost:8080/jaeger/ui/)


### 2.5 Shutdown the `collector-contrib` collector

At this point we no longer need `collector-contrib` collector: all OTel data is collected by the Converged Agent.
To retire it, we simply need to disable `opentelemetry-collector` component in the `otel-demo` Helm chart:

```yaml
...
opentelemetry-collector:
  enabled: false
```

> [!TIP]
> Check [demo-values.yaml](step24/demo-values.yaml) file to see the complete `otel-demo` Helm chart values.

To apply the changes via `helm upgrade` command:

```shell
helm upgrade demo open-telemetry/opentelemetry-demo \
  --values ./step25/demo-values.yaml \
  --namespace <YOUR_NAME>
```

Verify: all `otel-demo` apps pods are up and running; agent pods aren't affected by the update:

```shell
kubectl get pods --namespace <YOUR_NAME>
```

Congrats! We've just reached our next **milestone**: the `otel-demo` project, previously instrumented with `collector-contrib` is now using embedded OTel Collector in the DataDog Agent.


## 3: Use BYOC Collector with Converged Agent

Using instructions from [BYOC Workshop](https://docs.google.com/document/d/1_pEm1Wqvt0CVYuD_rNvQ4e06LO-erdXInKCKR8wn4M8/edit), build the collector distribution with [OpenSearch exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/opensearchexporter) support:

```yaml
...
exporters:
  ...
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/exporter/opensearchexporter v0.104.0
```

```shell
docker build . -t agent-byoc:0.104.0
```

Replace agent image with the local one:

```yaml
agents:
  image:
    repository: agent-byoc
    tag: 0.104.0
    doNotCheckTag: true
```

Add [OpenSearch exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/opensearchexporter) to the logs pipeline:

```yaml
exporters:
  ...
  opensearch:
    http:
      endpoint: http://otel-demo-opensearch:9200
      tls:
        insecure: true
    logs_index: otel
    ...
service:
  ...
  pipelines:
    ...
    logs/opensearch:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [debug, opensearch]
```

Load the docker image with custom collector distribution from localhost to the kind K8S cluster:

```shell
kind load docker-image agent-byoc --name workshop
```

Redeploy the agent to apply new changes:

```shell
helm upgrade otel-agent datadog/datadog \
  --values ./step30/datadog-values.yaml \
  --set-file datadog.otelCollector.config=./step30/collector-config.yaml \
  --namespace <YOUR_NAME>
```

Verify: agent pods are up and running:

```shell
kubectl get pods --namespace <YOUR_NAME>
```

Finally, let's verify that logs are exported to OpenSearch:

```shell
kubectl port-forward svc/demo-frontendproxy 8080:8080 --namespace <YOUR_NAME>
```

- Explore OpenSearch Logs in [Grafana](http://localhost:8080/grafana/)


Congrats! That's our final **milestone** of the workshop: we've installed custom distribution of the embedded OTel Collector in the DataDog Agent via Helm.

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://kind.sigs.k8s.io/
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: https://sdp.ddbuild.io/#/feature-flags/fleet_view_config_layers
[6]: https://github.com/DataDog/consul-config/pull/250271
[7]: https://github.com/DataDog/consul-config/pull/250273
[8]: https://github.com/DataDog/consul-config/pull/250274
[9]: https://github.com/DataDog/consul-config/pull/250275
[10]: https://github.com/DataDog/consul-config/pull/250276
[11]: https://github.com/DataDog/consul-config/pull/250277
[12]: https://opentelemetry.io/docs/demo/
[13]: https://www.datadoghq.com/blog/datadog-agent-with-otel-collector/
[14]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-demo/values.yaml#L656-L72
[15]: https://www.otelbin.io/?#config=connectors%3A*N__spanmetrics%3A_%7B%7D*Nexporters%3A*N__debug%3A_%7B%7D*N__opensearch%3A*N____http%3A*N______endpoint%3A_http%3A%2F%2Fotel-demo-opensearch%3A9200*N______tls%3A*N________insecure%3A_true*N____logs*_index%3A_otel*N__otlp%3A*N____endpoint%3A_*%22demo-jaeger-collector%3A4317*%22*N____tls%3A*N______insecure%3A_true*N__otlphttp%2Fprometheus%3A*N____endpoint%3A_http%3A%2F%2Fdemo-prometheus-server%3A9090%2Fapi%2Fv1%2Fotlp*N____tls%3A*N______insecure%3A_true*N__datadog%3A*N____api%3A*N______key%3A_*SDD*_API*_KEY*N____traces%3A*N______endpoint%3A_%22https%3A%2F%2Ftrace.agent.datadoghq.com%22*Nextensions%3A*N__health*_check%3A*N____endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A13133*Nprocessors%3A*N__batch%3A_%7B%7D*N__k8sattributes%3A*N____extract%3A*N______metadata%3A*N______-_k8s.namespace.name*N______-_k8s.deployment.name*N______-_k8s.statefulset.name*N______-_k8s.daemonset.name*N______-_k8s.cronjob.name*N______-_k8s.job.name*N______-_k8s.node.name*N______-_k8s.pod.name*N______-_k8s.pod.uid*N______-_k8s.pod.start*_time*N____passthrough%3A_false*N____pod*_association%3A*N____-_sources%3A*N______-_from%3A_resource*_attribute*N________name%3A_k8s.pod.ip*N____-_sources%3A*N______-_from%3A_resource*_attribute*N________name%3A_k8s.pod.uid*N____-_sources%3A*N______-_from%3A_connection*N__memory*_limiter%3A*N____check*_interval%3A_5s*N____limit*_percentage%3A_80*N____spike*_limit*_percentage%3A_25*N__resource%3A*N____attributes%3A*N____-_action%3A_insert*N______from*_attribute%3A_k8s.pod.uid*N______key%3A_service.instance.id*Nreceivers%3A*N__httpcheck%2Ffrontendproxy%3A*N____targets%3A*N____-_endpoint%3A_http%3A%2F%2Fdemo-frontendproxy%3A8080*N__jaeger%3A*N____protocols%3A*N______grpc%3A*N________endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A14250*N______thrift*_compact%3A*N________endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A6831*N______thrift*_http%3A*N________endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A14268*N__otlp%3A*N____protocols%3A*N______grpc%3A*N________endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A4317*N______http%3A*N________cors%3A*N__________allowed*_origins%3A*N__________-_http%3A%2F%2F***N__________-_https%3A%2F%2F***N________endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A4318*N__prometheus%3A*N____config%3A*N______scrape*_configs%3A*N______-_job*_name%3A_opentelemetry-collector*N________scrape*_interval%3A_10s*N________static*_configs%3A*N________-_targets%3A*N__________-_*S%7Benv%3AMY*_POD*_IP%7D%3A8888*N__redis%3A*N____collection*_interval%3A_10s*N____endpoint%3A_redis-cart%3A6379*N__zipkin%3A*N____endpoint%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A9411*Nservice%3A*N__extensions%3A*N__-_health*_check*N__pipelines%3A*N____logs%3A*N______exporters%3A*N______-_opensearch*N______-_debug*N______processors%3A*N______-_k8sattributes*N______-_memory*_limiter*N______-_resource*N______-_batch*N______receivers%3A*N______-_otlp*N____metrics%3A*N______exporters%3A*N______-_otlphttp%2Fprometheus*N______-_debug*N______processors%3A*N______-_k8sattributes*N______-_memory*_limiter*N______-_resource*N______-_batch*N______receivers%3A*N______-_httpcheck%2Ffrontendproxy*N______-_redis*N______-_otlp*N______-_spanmetrics*N____traces%3A*N______exporters%3A*N______-_otlp*N______-_debug*N______-_spanmetrics*N______processors%3A*N______-_k8sattributes*N______-_memory*_limiter*N______-_resource*N______-_batch*N______receivers%3A*N______-_otlp*N______-_jaeger*N______-_zipkin*N__telemetry%3A*N____metrics%3A*N______address%3A_*S%7Benv%3AMY*_POD*_IP%7D%3A8888%7E
[16]: http://localhost:8080/
[17]: http://localhost:8080/grafana/
[18]: http://localhost:8080/loadgen/
[19]: http://localhost:8080/jaeger/ui/
[20]: https://app.datadoghq.com/organization-settings/application-keys