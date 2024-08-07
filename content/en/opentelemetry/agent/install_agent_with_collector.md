---
title: Install the Datadog Agent with Embedded OpenTelemetry Collector
private: true
further_reading:
- link: "/opentelemetry/agent/agent_with_custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

## Overview

The Datadog Agent with embedded OpenTelemetry (OTel) Collector is an open-source Collector distribution that includes:

- Built-in Datadog pipelines and extensions
- Support for traces, metrics, and logs
- A curated set of components for optimal performance with Datadog

Follow this guide to install the Datadog Agent with the OpenTelemetry Collector using Helm.

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].
1. Find or create your [Datadog application key][3].

**Software**:  
Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
- Helm (v3+)
- Docker
- [kubectl][5]

**Configuration**

Configure your local Kubernetes context to point at the cluster.

1. To view available contexts, run:
   ```shell
   kubectl config get-contexts
   ```
1. Configure `kubectl` to interact with your cluster:
   ```shell
   kubectl config use-context <your-cluster-context>
   ```
   Replace <your-cluster-context> with the name of your Kubernetes cluster context.
   
## Install the Datadog Agent with OpenTelemetry Collector

### Add the Datadog Helm Repository

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

### Set up Datadog API and application keys

1. Get the Datadog [API][2] and [application keys][3].
1. Store the keys as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY> \
     --from-literal app-key=<DD_APP_KEY>
   ```
   Replace `<DD_API_KEY>` and `<DD_APP_KEY>` with your actual Datadog API and application keys.

### Configure the Datadog Agent

Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart][4].

1. Create an empty `datadog-values.yaml` file:
   ```shell
   touch datadog-values.yaml
   ```
   <div class="alert alert-info">Unspecified parameters will use defaults from <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>
1. Configure the Datadog API and Application key secrets:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
   {{< /code-block >}}
1. Switch the Datadog Agent Docker repository to use development builds:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: datadog/agent-dev
    tag: nightly-ot-beta-main-jmx
    doNotCheckTag: true
...
   {{< /code-block >}}
   <div class="alert alert-info">This guide uses a Java application example. The <code>-jmx</code> suffix in the image tag enables JMX utilities. For non-Java applications, use <code>nightly-ot-beta-main</code> instead.<br> For more details, see <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">Autodiscovery and JMX integration guide</a>.</div>
1. Enable the OpenTelemetry Collector and configure the essential ports:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
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
   {{< /code-block >}}
1. (Optional) Enable additional Datadog features.
   <div class="alert alert-danger">Enabling these features may incur additional charges. Review the <a href="https://www.datadoghq.com/pricing/"> pricing page</a> and talk to your CSM before proceeding.</div>
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
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
   {{< /code-block >}}
   
{{% collapse-content title="Completed datadog-values.yaml file" level="p" %}}
Your `datadog-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
agents:
  image:
    repository: datadog/agent-dev
    tag: nightly-ot-beta-main-jmx
    doNotCheckTag: true

datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}
   
### Configure the OpenTelemetry Collector



## Use your OpenTelemetry Components with the Converged Agent

If you'd like to build a Converged Datadog Agent image with additional OpenTelemetry components, read [Use Custom OpenTelemetry Components with Datadog Agent][38]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
