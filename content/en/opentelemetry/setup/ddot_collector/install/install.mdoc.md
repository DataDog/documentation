---
title: Install the DDOT Collector
description: "Install the Datadog Distribution of OpenTelemetry (DDOT) Collector on Kubernetes, Linux, ECS Fargate, or EKS Fargate."
aliases:
  - /opentelemetry/agent/install_agent_with_collector
  - /opentelemetry/setup/ddot_collector/install/kubernetes
  - /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset
  - /opentelemetry/setup/ddot_collector/install/kubernetes_gateway
  - /opentelemetry/setup/ddot_collector/install/linux
  - /opentelemetry/setup/ddot_collector/install/ecs_fargate
  - /opentelemetry/setup/ddot_collector/install/eks_fargate
content_filters:
  - trait_id: deployment
    option_group_id: ddot_collector_deployment_options
    label: "Deployment"
further_reading:
  - link: "/opentelemetry/setup/ddot_collector/custom_components"
    tag: "Documentation"
    text: "Use Custom OpenTelemetry Components with Datadog Agent"
  - link: "https://www.datadoghq.com/blog/ddot-gateway"
    tag: "Blog"
    text: "Centralize and govern your OpenTelemetry pipeline with the DDOT gateway"
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

{% if equals($deployment, "linux") %}
{% callout btn_hidden=true %}
Support for deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is in Preview.
{% /callout %}
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
{% callout btn_hidden=true %}
Support for installing the DDOT Collector as a gateway on Kubernetes is in Preview.
{% /callout %}
{% /if %}

{% if equals($deployment, "ecs_fargate") %}
{% callout btn_hidden=true %}
Support for deploying the DDOT Collector on ECS Fargate is in Preview.
{% /callout %}
{% /if %}

{% if equals($deployment, "eks_fargate") %}
{% callout btn_hidden=true %}
Support for deploying the DDOT Collector on EKS Fargate is in Preview.
{% /callout %}
{% /if %}

## Overview

{% if equals($deployment, "kubernetes_daemonset") %}
Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector as a Kubernetes DaemonSet using Helm or the Datadog Operator.

{% alert %}
**Need additional OpenTelemetry components?** If you need components beyond those included in the default package, follow [Use Custom OpenTelemetry Components][101] to extend the Datadog Agent's capabilities. For a list of components included by default, see [OpenTelemetry Collector components][102].
{% /alert %}
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
The OpenTelemetry Collector can be deployed in multiple ways. The *daemonset* pattern is a common deployment where a Collector instance runs on every Kubernetes node alongside the core Datadog Agent.

{% img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="Architecture diagram of the OpenTelemetry Collector daemonset pattern. A Kubernetes cluster contains three nodes. On each node, an application instrumented with OpenTelemetry sends OTLP data to a local Agent DaemonSet. The Agent DaemonSet then forwards this data directly to the Datadog backend." style="width:100%;" /%}

The [gateway][201] pattern provides an additional deployment option that uses a centralized, standalone Collector service. This gateway layer can perform actions such as tail-based sampling, aggregation, filtering, and routing before exporting the data to one or more backends such as Datadog. It acts as a central point for managing and enforcing observability policies.

{% img src="opentelemetry/embedded_collector/ddot_gateway.png" alt="Architecture diagram of the OpenTelemetry Collector gateway pattern. Applications send OTLP data to local Agent DaemonSets running on each node. The DaemonSets forward this data to a central load balancer, which distributes it to a separate deployment of gateway Collector pods. These gateway pods then process and send the telemetry data to Datadog." style="width:100%;" /%}

When you enable the gateway:
1.  A Kubernetes Deployment (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) manages the standalone **gateway Collector pods**.
2.  A Kubernetes Service (`<RELEASE_NAME>-datadog-otel-agent-gateway`) exposes the gateway pods and provides load balancing.
3.  The existing **DaemonSet Collector pods** are configured by default to send their telemetry data to the gateway service instead of directly to Datadog.

{% alert %}
This guide assumes you are familiar with deploying the DDOT Collector as a DaemonSet. For more information, select **Kubernetes (DaemonSet)** from the Deployment filter above.
{% /alert %}
{% /if %}

{% if equals($deployment, "linux") %}
Follow this guide to install the Datadog Distribution of OpenTelemetry (DDOT) Collector on Linux-based bare-metal hosts and virtual machines.
{% /if %}

{% if equals($deployment, "ecs_fargate") %}
Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector alongside the Datadog Agent on Amazon ECS Fargate. Because ECS Fargate does not support host-based deployments, the Datadog Agent runs as a sidecar container in the same ECS task as your application.

{% alert %}
**Need additional OpenTelemetry components?** If you need components beyond those included in the default package, follow [Use Custom OpenTelemetry Components][101] to extend the Datadog Agent's capabilities. For a list of components included by default, see [OpenTelemetry Collector components][102].
{% /alert %}
{% /if %}

{% if equals($deployment, "eks_fargate") %}
Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector alongside the Datadog Agent on Amazon EKS Fargate. Because EKS Fargate does not support DaemonSets, the Datadog Agent runs as a sidecar container in each application pod.

{% alert %}
**Need additional OpenTelemetry components?** If you need components beyond those included in the default package, follow [Use Custom OpenTelemetry Components][101] to extend the Datadog Agent's capabilities. For a list of components included by default, see [OpenTelemetry Collector components][102].
{% /alert %}
{% /if %}

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

{% if equals($deployment, "kubernetes_daemonset") %}
**Software**:
Install and set up the following on your machine:

- A Kubernetes cluster (v1.29+)
  - **Note**: EKS Fargate and GKE Autopilot environments are not supported
- [Helm (v3+)][3]
- [kubectl][4]
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
**Software**:
- A Kubernetes cluster (v1.29+). EKS Fargate and GKE Autopilot are not supported.
- [Helm][3] (v3+).
- Datadog Helm chart version 3.160.1+ or Datadog Operator version 1.23.0+.
- [kubectl][4].
{% /if %}

{% if equals($deployment, "linux") %}
**Software**:
- A supported Linux distribution (for example, Debian, Ubuntu, CentOS, RHEL, Fedora, SUSE).
- `curl` must be installed to use the one-line installation script.
{% /if %}

{% if equals($deployment, "ecs_fargate") %}
**AWS**:
- An AWS account with access to Amazon ECS Fargate.
- The [AWS CLI][5] configured with permissions to create and manage ECS task definitions and services.
{% /if %}

{% if equals($deployment, "eks_fargate") %}
**Software**:
- An EKS cluster with a [Fargate profile][6] configured.
- [kubectl][4]
{% /if %}

**Network**:

{% partial file="opentelemetry/otel-network-requirements.mdoc.md" /%}

## Install the Datadog Agent with OpenTelemetry Collector

{% alert %}
This installation is required for both Datadog SDK + DDOT and OpenTelemetry SDK + DDOT configurations. While the Datadog SDK implements the OpenTelemetry API, it still requires the DDOT Collector to process and forward OTLP metrics and logs.
{% /alert %}

{% if equals($deployment, "linux") %}
### Installation

To install the DDOT Collector on a Linux host, use the following one-line installation command:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{% region-param key="dd_site" /%}" DD_OTELCOLLECTOR_ENABLED=true DD_AGENT_MAJOR_VERSION=7 DD_AGENT_MINOR_VERSION=75.0-1 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This command installs both the core Datadog Agent package and the DDOT Collector that runs alongside it.

### Validation

Run the Agent's [status command][7] to verify installation.

```shell
sudo datadog-agent status
```
A successful installation returns an Agent Status report that begins with Agent information like this:

```text
====================
Agent (v7.x.x)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

There will also be an **OTel Agent** status section that includes OpenTelemetry information:

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
### Select installation method

Choose one of the following installation methods:

- [Datadog Operator][8]: A [Kubernetes-native][9] approach that automatically reconciles and maintains your Datadog setup. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.
- [Helm chart][10]: A straightforward way to deploy Datadog Agent. It provides versioning, rollback, and templating capabilities, making deployments consistent and easier to replicate.

{% tabs %}
{% tab label="Datadog Operator" %}
### Install the Datadog Operator

You can install the Datadog Operator in your cluster using the [Datadog Operator Helm chart][11]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```
{% /tab %}
{% tab label="Helm" %}
### Add the Datadog Helm Repository

To add the Datadog repository to your Helm repositories:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```
{% /tab %}
{% /tabs %}

### Set up Datadog API key

1. Get the Datadog [API key][2].
1. Store the API key as a Kubernetes secret:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the Datadog Agent

{% tabs %}
{% tab label="Datadog Operator" %}
After deploying the Datadog Operator, create the `DatadogAgent` resource that triggers the deployment of the Datadog Agent, Cluster Agent and Cluster Checks Runners (if used) in your Kubernetes cluster. The Datadog Agent deploys as a DaemonSet, running a pod on every node of your cluster.

1. Use the `datadog-agent.yaml` file to specify your `DatadogAgent` deployment configuration.

```yaml {% filename="datadog-agent.yaml" %}
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
  - Replace `<DATADOG_SITE>` with your [Datadog site][12]. Your site is {% region-param key="dd_site" code=true /%}. (Ensure the correct **DATADOG SITE** is selected on the right.)

2. Enable the OpenTelemetry Collector:

```yaml {% filename="datadog-agent.yaml" %}
  # Enable Features
  features:
    otelCollector:
      enabled: true
```

The Datadog Operator automatically binds the OpenTelemetry Collector to ports `4317` (named `otel-grpc`) and `4318` (named `otel-http`) by default.

3. (Optional) Enable additional Datadog features:

{% alert level="warning" %}
Enabling these features may incur additional charges. Review the [pricing page][13] and talk to your Customer Success Manager before proceeding.
{% /alert %}

```yaml {% filename="datadog-agent.yaml" %}
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

**Note**: As of operator `v1.22.0`, the DDOT container uses the `ddot-collector` image instead of the `-full` agent image.
- When overriding the node agent image tag, use a tag >= `7.67.0` so the OTel container is scheduled (the `ddot-collector` image is only supported in >= `7.67.0`).
- The `ddot-collector` image has no `-full` variant. If you need a `-full` image, set `spec.override.nodeAgent.image.name` to a full agent image (for example, `gcr.io/datadoghq/agent:7.72.1-full`).
{% /tab %}
{% tab label="Helm" %}
Use a YAML file to specify the Helm chart parameters for the [Datadog Agent chart][10].

1. Create an empty `datadog-values.yaml` file:

```shell
touch datadog-values.yaml
```

{% alert %}
Unspecified parameters use defaults from [values.yaml][14].
{% /alert %}

2. Configure the Datadog API key secret:

```yaml {% filename="datadog-values.yaml" %}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
```

Set `<DATADOG_SITE>` to your [Datadog site][12]. Otherwise, it defaults to `datadoghq.com`, the US1 site.

3. Enable the OpenTelemetry Collector and configure the essential ports:

```yaml {% filename="datadog-values.yaml" %}
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

4. (Optional) Enable additional Datadog features:

{% alert level="warning" %}
Enabling these features may incur additional charges. Review the [pricing page][13] and talk to your Customer Success Manager before proceeding.
{% /alert %}

```yaml {% filename="datadog-values.yaml" %}
datadog:
  ...
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
```

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.

5. (Optional) Collect pod labels and use them as tags to attach to metrics, traces, and logs:

{% alert level="warning" %}
Custom metrics may impact billing. See the [custom metrics billing page][15] for more information.
{% /alert %}

```yaml {% filename="datadog-values.yaml" %}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
```

{% collapse-content title="Completed datadog-values.yaml file" %}
Your `datadog-values.yaml` file should look something like this:

```yaml {% filename="datadog-values.yaml" %}
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
{% /collapse-content %}
{% /tab %}
{% /tabs %}
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
This guide shows how to configure the DDOT Collector gateway using either the Datadog Operator or Helm chart.

Choose one of the following installation methods:

- **Datadog Operator**: A Kubernetes-native approach that automatically reconciles and maintains your Datadog setup. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.
- **Helm chart**: A straightforward way to deploy Datadog Agent. It provides versioning, rollback, and templating capabilities, making deployments consistent and easier to replicate.

### Install the Datadog Operator or Helm

{% tabs %}
{% tab label="Datadog Operator" %}

If you haven't already installed the Datadog Operator, you can install it in your cluster using the Datadog Operator Helm chart:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

For more information, see the [Datadog Operator documentation][9].

{% /tab %}
{% tab label="Helm" %}

If you haven't already added the Datadog Helm repository, add it now:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

For more information about Helm configuration options, see the [Datadog Helm chart README][10].

{% /tab %}
{% /tabs %}

### Deploying the gateway with a DaemonSet

{% tabs %}
{% tab label="Datadog Operator" %}

To get started, enable both the gateway and the DaemonSet Collector in your `DatadogAgent` resource. This is the most common setup.

Create a file named `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    # Enable the Collector in the Agent DaemonSet
    otelCollector:
      enabled: true

    # Enable the standalone Gateway Deployment
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"
```

Apply the configuration:

```shell
kubectl apply -f datadog-agent.yaml
```

{% /tab %}
{% tab label="Helm" %}

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

{% /tab %}
{% /tabs %}

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
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes]
      exporters: [otlphttp]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
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
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
extension:
  datadog:
    api:
      key: ${env:DD_API_KEY}
    deployment_type: gateway
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

{% alert %}
**For Helm users:** Configure `otelAgentGateway.affinity` or `otelAgentGateway.nodeSelector` to control pod placement, and adjust `otelAgentGateway.replicas` to scale the gateway.
**For Operator users:** Use `override.otelAgentGateway.affinity`, `override.otelAgentGateway.nodeSelector`, and `override.otelAgentGateway.replicas` for these settings.
{% /alert %}

### Deploying a standalone gateway

{% tabs %}
{% tab label="Datadog Operator" %}

If you have an existing DaemonSet deployment, you can deploy the gateway independently by disabling other components:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gateway
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"

    # Disable the Agent DaemonSet
    nodeAgent:
      disabled: true
    # Disable the Cluster Agent
    clusterAgent:
      disabled: true
```

After deploying the gateway, you must update the configuration of your existing DaemonSet Collectors to send data to the new gateway service endpoint (for example, `http://datadog-gateway-otel-agent-gateway:4318`).

{% /tab %}
{% tab label="Helm" %}

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

After deploying the gateway, you must update the configuration of your existing DaemonSet Collectors to send data to the new gateway service endpoint (for example, `http://gw-only-otel-agent-gateway:4318`).

{% /tab %}
{% /tabs %}
{% /if %}

{% if equals($deployment, "ecs_fargate") %}
### Create an ECS task definition

On ECS Fargate, the Datadog Agent and your application run as containers within the same ECS task. Create an ECS task definition that includes both containers.

{% alert %}
The Datadog Agent image must be `public.ecr.aws/datadog/agent:latest-full`. The `latest-full` image includes the DDOT Collector. The standard `latest` image does not.
{% /alert %}

Use the following task definition as a starting point:

```json {% filename="task-definition.json" %}
{
    "family": "<TASK_FAMILY>",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest-full",
            "essential": true,
            "cpu": 0,
            "environment": [
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_LOGS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_OTELCOLLECTOR_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_SITE",
                    "value": "<DATADOG_SITE>"
                },
                {
                    "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
                    "value": "true"
                }
            ],
            "secrets": [
                {
                    "name": "DD_API_KEY",
                    "valueFrom": "<DD_API_KEY_SECRET_ARN>"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/<TASK_FAMILY>",
                    "awslogs-create-group": "true",
                    "awslogs-region": "<AWS_REGION>",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "mountPoints": [],
            "portMappings": [],
            "volumesFrom": []
        },
        {
            "name": "<APP_CONTAINER_NAME>",
            "image": "<APP_IMAGE>",
            "essential": true,
            "cpu": 0,
            "environment": [
                {
                    "name": "OTEL_SERVICE_NAME",
                    "value": "<SERVICE_NAME>"
                },
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "service.version=<VERSION>,deployment.environment.name=<ENV>"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/<TASK_FAMILY>",
                    "awslogs-create-group": "true",
                    "awslogs-region": "<AWS_REGION>",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "mountPoints": [],
            "portMappings": [],
            "volumesFrom": []
        }
    ],
    "executionRoleArn": "<EXECUTION_ROLE_ARN>",
    "networkMode": "awsvpc",
    "volumes": [],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "256",
    "memory": "512"
}
```

Replace the following placeholders:
- `<TASK_FAMILY>`: A name for your ECS task definition family.
- `<DD_API_KEY_SECRET_ARN>`: The ARN of the AWS Secrets Manager secret or SSM Parameter Store parameter that contains your Datadog API key. The task execution role must have `secretsmanager:GetSecretValue` (Secrets Manager) or `ssm:GetParameters` (SSM) permission to retrieve the secret.
- `<DATADOG_SITE>`: Your [Datadog site][12]. Your site is {% region-param key="dd_site" code=true /%}. (Ensure the correct **DATADOG SITE** is selected on the right.)
- `<AWS_REGION>`: The AWS region where your ECS tasks run (for example, `us-east-1`).
- `<APP_CONTAINER_NAME>`: The name of your application container.
- `<APP_IMAGE>`: Your application container image.
- `<SERVICE_NAME>`: The name of your service.
- `<VERSION>`: The version of your service.
- `<ENV>`: Your deployment environment (for example, `production`).
- `<EXECUTION_ROLE_ARN>`: The ARN of your ECS task execution IAM role.

### Configure ECS resource detection

The DDOT Collector's `infraattributes` processor enriches your telemetry with ECS infrastructure tags when the `aws.ecs.task.arn` resource attribute is present. To provide this attribute, add the ECS resource detector to your OpenTelemetry SDK.

The ECS resource detector automatically populates the following attributes:
- `aws.ecs.task.arn`
- `aws.ecs.launchtype` (set to `fargate`)
- `cloud.provider`

Refer to your language's OpenTelemetry SDK documentation to add the ECS resource detector. For example:
- **Go**: [go.opentelemetry.io/contrib/detectors/aws/ecs][16]
- **All languages**: See the [ECS resource detector documentation][17] in the OpenTelemetry Collector contrib repository.
{% /if %}

{% if equals($deployment, "eks_fargate") %}
### Set up Datadog API key

Store the Datadog API key as a Kubernetes secret:

```shell
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

Replace `<DD_API_KEY>` with your actual Datadog API key.

### Add the Datadog Agent sidecar to your pod spec

Add the Datadog Agent as a sidecar container in your application's pod spec. The agent and application containers share the same pod network namespace, so the application sends OTLP data to `localhost`.

{% alert %}
The Datadog Agent image must be `public.ecr.aws/datadog/agent:latest-full`. The `latest-full` image includes the DDOT Collector. The standard `latest` image does not.
{% /alert %}

```yaml {% filename="deployment.yaml" %}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  selector:
    matchLabels:
      app: <SERVICE>
  template:
    metadata:
      labels:
        app: <SERVICE>
    spec:
      containers:
        - name: <SERVICE>
          image: <APP_IMAGE>
          env:
            - name: OTEL_EXPORTER_OTLP_ENDPOINT
              value: "http://localhost:4317"
            - name: OTEL_EXPORTER_OTLP_PROTOCOL
              value: "grpc"
            - name: OTEL_SERVICE_NAME
              value: "<SERVICE>"
            - name: OTEL_RESOURCE_ATTRIBUTES
              value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
        - name: datadog-agent
          image: public.ecr.aws/datadog/agent:latest-full
          env:
            - name: DD_API_KEY
              valueFrom:
                secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: DD_SITE
              value: "<DATADOG_SITE>"
            - name: DD_OTELCOLLECTOR_ENABLED
              value: "true"
            - name: DD_EKS_FARGATE
              value: "true"
            - name: DD_LOGS_ENABLED
              value: "true"
            - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
```

Replace the following placeholders:
- `<SERVICE>`: The name of your service.
- `<APP_IMAGE>`: Your application container image.
- `<VERSION>`: The version of your service.
- `<ENV>`: Your deployment environment (for example, `production`).
- `<DATADOG_SITE>`: Your [Datadog site][12]. Your site is {% region-param key="dd_site" code=true /%}. (Ensure the correct **DATADOG SITE** is selected on the right.)

### Configure EKS resource detection

The DDOT Collector's `infraattributes` processor enriches your telemetry with EKS infrastructure tags when Kubernetes resource attributes are present. Add the EKS resource detector to your OpenTelemetry SDK, or configure the `resourcedetection` processor in your collector configuration.

**Using the OpenTelemetry SDK (recommended)**: Add the AWS EKS resource detector to your application. This provides attributes such as `cloud.provider`, `cloud.platform`, `k8s.cluster.name`, and Fargate-specific metadata.

**Using the collector's `resourcedetection` processor**: If you control the collector configuration, add the `eks` and `env` detectors:

```yaml {% filename="otel-config.yaml" %}
processors:
  resourcedetection:
    detectors: [env, eks]
    timeout: 2s
    override: false
```

Add `resourcedetection` to your pipeline processors alongside `infraattributes`:

```yaml {% filename="otel-config.yaml" %}
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [resourcedetection, infraattributes]
      exporters: [datadog]
```
{% /if %}

{% if equals($deployment, "linux") %}
## Configure the Datadog Agent

### Enable the DDOT Collector
The configuration file for the Datadog Agent is automatically installed at `/etc/datadog-agent/datadog.yaml`. The installation script adds the following configuration settings to `/etc/datadog-agent/datadog.yaml` to enable the DDOT Collector:

```yaml {% filename="datadog-agent.yaml" %}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
```

DDOT automatically binds the OpenTelemetry Collector to ports 4317 (grpc) and 4318 (http) by default.

### (Optional) Enable additional Datadog features

{% alert level="warning" %}
Enabling these features may incur additional charges. Review the [pricing page][13] and talk to your Customer Success Manager before proceeding.
{% /alert %}

For a complete list of available options, refer to the fully commented reference file at `/etc/datadog-agent/datadog.yaml.example` or the sample [`config_template.yaml`][18] file.

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.
{% /if %}

{% if includes($deployment, ["linux", "kubernetes_daemonset"]) %}
## Configure the OpenTelemetry Collector

{% if equals($deployment, "linux") %}
The installation script provides a sample OpenTelemetry Collector configuration at `/etc/datadog-agent/otel-config.yaml` that you can use as a starting point.

{% collapse-content title="Sample otel-config.yaml file from installation" %}
Sample `otel-config.yaml` from installation will look something like this:

```yaml {% filename="otel-config.yaml" %}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
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
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]
```
{% /collapse-content %}
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
{% tabs %}
{% tab label="Datadog Operator" %}
The Datadog Operator provides a sample OpenTelemetry Collector configuration that you can use as a starting point. If you need to modify this configuration, the Datadog Operator supports two ways of providing a custom Collector configuration:

- **Inline configuration**: Add your custom Collector configuration directly in the `features.otelCollector.conf.configData` field.
- **ConfigMap-based configuration**: Store your Collector configuration in a ConfigMap and reference it in the `features.otelCollector.conf.configMap` field. This approach allows you to keep Collector configuration decoupled from the `DatadogAgent` resource.

####  Inline Collector configuration

In the snippet below, the Collector configuration is placed directly under the `features.otelCollector.conf.configData` parameter:

```yaml {% filename="datadog-agent.yaml" %}
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
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
```

{% partial file="opentelemetry/otel-infraattributes-prereq.mdoc.md" /%}

When you apply the `datadog-agent.yaml` file containing this `DatadogAgent` resource, the Operator automatically mounts the Collector configuration into the Agent DaemonSet.

{% collapse-content title="Completed datadog-agent.yaml file with inlined Collector config" %}
Completed `datadog-agent.yaml` with inline Collector configuration should look something like this:

```yaml {% filename="datadog-agent.yaml" %}
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
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
```
{% /collapse-content %}

#### ConfigMap-based Collector Configuration

For more complex or frequently updated configurations, storing Collector configuration in a ConfigMap can simplify version control.

1. Create a ConfigMap that contains your Collector configuration:

```yaml {% filename="configmap.yaml" %}
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
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
```

{% alert level="danger" %}
The field for Collector config in the ConfigMap must be called `otel-config.yaml`.
{% /alert %}

2. Reference the `otel-agent-config-map` ConfigMap in your `DatadogAgent` resource using `features.otelCollector.conf.configMap` parameter:

```yaml {% filename="datadog-agent.yaml" %}
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

{% collapse-content title="Completed datadog-agent.yaml file with Collector config in the ConfigMap" %}
Completed `datadog-agent.yaml` with Collector configuration defined as ConfigMap should look something like this:

```yaml {% filename="datadog-agent.yaml" %}
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
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
```
{% /collapse-content %}

{% /tab %}
{% tab label="Helm" %}
The Datadog Helm chart provides a sample OpenTelemetry Collector configuration that you can use as a starting point. This section walks you through the predefined pipelines and included OpenTelemetry components.

This is the full OpenTelemetry Collector configuration in `otel-config.yaml`:

```yaml {% filename="otel-config.yaml" %}
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
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]
```

{% partial file="opentelemetry/otel-infraattributes-prereq.mdoc.md" /%}

{% /tab %}
{% /tabs %}
{% /if %}

#### Key components

To send telemetry data to Datadog, the following components are defined in the configuration:

{% img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" /%}

##### Datadog connector

The [Datadog connector][19] computes Datadog APM trace metrics.

```yaml {% filename="otel-config.yaml" %}
connectors:
  datadog/connector:
    traces:
```

##### Datadog exporter

The [Datadog exporter][20] exports traces, metrics, and logs to Datadog.

```yaml {% filename="otel-config.yaml" %}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
```

**Note**: If `key` is not specified or set to a secret, or if `site` is not specified, the system uses values from the core Agent configuration. By default, the core Agent sets site to `datadoghq.com` (US1).

##### Prometheus receiver

The [Prometheus receiver][21] collects health metrics from the OpenTelemetry Collector for the metrics pipeline.

```yaml {% filename="otel-config.yaml" %}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
```

For more information, see the [Collector Health Metrics][22] documentation.
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
### Deploy the Agent with the OpenTelemetry Collector

{% tabs %}
{% tab label="Datadog Operator" %}
Deploy the Datadog Agent with the configuration file:

```shell
kubectl apply -f datadog-agent.yaml
```

This deploys the Datadog Agent as a DaemonSet with the DDOT OpenTelemetry Collector. The Collector runs on the same host as your application, following the [Agent deployment pattern][23]. The [Gateway deployment pattern][201] is in Preview; for installation instructions, select **Kubernetes (Gateway)** from the Deployment filter above.
{% /tab %}
{% tab label="Helm" %}
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

{% alert %}
You may see warnings during the deployment process. These warnings can be ignored.
{% /alert %}

This Helm chart deploys the Datadog Agent with OpenTelemetry Collector as a DaemonSet. The Collector is deployed on the same host as your application, following the [Agent deployment pattern][23]. The [Gateway deployment pattern][201] is in Preview; for installation instructions, select **Kubernetes (Gateway)** from the Deployment filter above.
{% /tab %}
{% /tabs %}

{% collapse-content title="Deployment diagram" %}
{% img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" /%}
{% /collapse-content %}
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
### Customizing Collector configurations

{% tabs %}
{% tab label="Datadog Operator" %}

You can customize the gateway Collector configuration using ConfigMaps. Create a ConfigMap with your custom configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
          http:
            endpoint: "0.0.0.0:4318"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
      sending_queue:
        batch:
          flush_timeout: 10s
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

Then reference it in your `DatadogAgent` resource:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      # Reference the custom ConfigMap
      config:
        configMap:
          name: otel-gateway-config

  override:
    otelAgentGateway:
      replicas: 3
```

For multi-item ConfigMaps or inline configuration, see the [DatadogAgent examples][24].

{% /tab %}
{% tab label="Helm" %}

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
        sending_queue:
          batch:
            flush_timeout: 10s
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

{% partial file="opentelemetry/otel-infraattributes-prereq.mdoc.md" /%}

{% alert %}
If you set `fullnameOverride`, the gateway's Kubernetes service name becomes `<fullnameOverride>-otel-agent-gateway`. The ports defined in `otelAgentGateway.ports` are exposed on this service. Ensure these ports match the OTLP receiver configuration in the gateway and the OTLP exporter configuration in the DaemonSet.
{% /alert %}

{% /tab %}
{% /tabs %}

The example configurations use insecure TLS for simplicity. Follow the [OTel configtls instructions][25] if you want to enable TLS.

### Advanced configuration options

{% tabs %}
{% tab label="Datadog Operator" %}

The Datadog Operator provides additional configuration options for the OTel Agent Gateway under `override.otelAgentGateway` (**NOT** `features.otelAgentGateway` except `featureGates`):

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

      # Feature gates for OTel collector (feature-specific configuration)
      featureGates: "telemetry.UseLocalHostAsDefaultMetricsAddress"

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3

      # Node selector for pod placement
      nodeSelector:
        kubernetes.io/os: linux
        gateway: "true"

      # Affinity configuration
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - datadog-otel-agent-gateway
              topologyKey: kubernetes.io/hostname

      # Tolerations for tainted nodes
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "otel-gateway"
        effect: "NoSchedule"

      # Priority class for scheduling
      priorityClassName: high-priority

      # Environment variables
      env:
      - name: OTEL_LOG_LEVEL
        value: "info"

      # Environment variables from ConfigMaps or Secrets
      envFrom:
      - configMapRef:
          name: otel-gateway-config

      # Custom image (optional)
      image:
        name: ddot-collector
        tag: "7.74.0"
        pullPolicy: IfNotPresent

      # Pod-level security context
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000

      # Configure resources
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi

      # Additional labels and annotations
      labels:
        team: observability
      annotations:
        prometheus.io/scrape: "true"
```

For a complete reference of all available options, see the [DatadogAgent v2alpha1 configuration documentation][26].

{% /tab %}
{% tab label="Helm" %}

For Helm-based deployments, many of these advanced configuration options can be set directly in the `values.yaml` file under the `otelAgentGateway` section. For a complete reference, see the [Datadog Helm chart README][10].

{% /tab %}
{% /tabs %}
{% /if %}

## Send your telemetry to Datadog

{% if not(equals($deployment, "kubernetes_gateway")) %}
To send your telemetry data to Datadog:

1. [Instrument your application](#instrument-the-application)
{% if includes($deployment, ["linux", "kubernetes_daemonset", "ecs_fargate"]) %}
2. [Configure the application](#configure-the-application)
{% /if %}
{% if not(equals($deployment, "ecs_fargate")) %}
3. [Correlate observability data](#correlate-observability-data)
{% /if %}
{% if not(equals($deployment, "ecs_fargate")) %}
4. [Run your application](#run-the-application)
{% /if %}

### Instrument the application

Instrument your application [using the OpenTelemetry API][27].

{% collapse-content title="Example application instrumented with the OpenTelemetry API" %}
As an example, you can use the [Calendar sample application][28] that's already instrumented for you. The following code instruments the [CalendarService.getDate()][29] method using the OpenTelemetry annotations and API:

```java {% filename="CalendarService.java" %}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
```
{% /collapse-content %}
{% /if %}

{% if equals($deployment, "linux") %}
### Configure the application

Your application must send data to the DDOT Collector on the same host. Ensure that the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is set on your application.

If using the example application, [`run-otel-local.sh`][30] sets up the required environment variables and runs the application:

```bash {% filename="run-otel-local.sh" %}
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
### Configure the application

Your application container must send data to the DDOT Collector on the same host. Since the Collector runs as a DaemonSet, you need to specify the local host as the OTLP endpoint.

If the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is not already set, add it to your application's Deployment manifest file:

```yaml {% filename="deployment.yaml" %}
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
{% /if %}

{% if equals($deployment, "ecs_fargate") %}
### Configure the application

Because the DDOT Collector runs as a sidecar container in the same ECS task, your application sends OTLP data to `localhost`. Add the following environment variables to your application container in the task definition:

```json {% filename="task-definition.json" %}
{
    "name": "OTEL_EXPORTER_OTLP_ENDPOINT",
    "value": "http://localhost:4317"
},
{
    "name": "OTEL_EXPORTER_OTLP_PROTOCOL",
    "value": "grpc"
}
```

### Correlate observability data

[Unified service tagging][31] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

The `OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES` environment variables in the task definition above configure unified service tagging.

### Run the application

1. Register the task definition with AWS:

   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

1. If you don't have an ECS cluster, create one:

   ```bash
   aws ecs create-cluster --cluster-name <CLUSTER_NAME>
   ```

1. Create an ECS service to run the task:

   ```bash
   aws ecs create-service \
     --cluster <CLUSTER_NAME> \
     --service-name <SERVICE_NAME> \
     --task-definition <TASK_FAMILY> \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[<SUBNET_IDS>],securityGroups=[<SECURITY_GROUP_IDS>],assignPublicIp=ENABLED}"
   ```

   Replace `<CLUSTER_NAME>` with your ECS cluster name, `<SERVICE_NAME>` with a name for your ECS service, `<SUBNET_IDS>` with your subnet IDs (comma-separated), and `<SECURITY_GROUP_IDS>` with your security group IDs.

   If you are updating an existing service to a new task definition revision, run:

   ```bash
   aws ecs update-service \
     --cluster <CLUSTER_NAME> \
     --service <SERVICE_NAME> \
     --task-definition <TASK_FAMILY>
   ```

After the task starts, unified service tagging is fully enabled for your metrics, traces, and logs.

### Validate the deployment

1. Verify that your ECS task is running and both containers are in `RUNNING` state:

   ```shell
   aws ecs describe-tasks \
     --cluster <CLUSTER_NAME> \
     --tasks <TASK_ID> \
     --query "tasks[0].containers[*].{name:name,status:lastStatus}" \
     --output table
   ```
{% /if %}

{% if equals($deployment, "linux") %}
### Correlate observability data

[Unified service tagging][31] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In bare-metal environments, `env`, `service`, and `version` are set through the OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from applications.

In the example application, this is done in `run-otel-local.sh`:

```bash {% filename="run-otel-local.sh" %}
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
```

### Run the application

Redeploy your application to apply the changes made in your environment variables. After the updated configuration is active, unified service tagging is fully enabled for your metrics, traces, and logs.
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
### Correlate observability data

[Unified service tagging][31] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, set `env`, `service`, and `version` using OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from containers.

Add the following environment variables to your application's deployment manifest:

```yaml {% filename="deployment.yaml" %}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
```

{% alert %}
Alternatively, you can use [Datadog-specific Kubernetes labels][32] to configure unified service tagging. Do not use both approaches, as this creates duplicate tags.
{% /alert %}

### Run the application

Redeploy your application to apply the changes made in the deployment manifest. Once the updated configuration is active, Unified Service Tagging will be fully enabled for your metrics, traces, and logs.
{% /if %}

{% if equals($deployment, "eks_fargate") %}
### Correlate observability data

[Unified service tagging][31] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, set `env`, `service`, and `version` using OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from containers.

The `OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES` environment variables in the deployment manifest above configure unified service tagging.

### Run the application

Apply the updated deployment manifest:

```shell
kubectl apply -f deployment.yaml
```

After the updated pods are running, unified service tagging is fully enabled for your metrics, traces, and logs.

### Validate the deployment

1. Verify that all containers in the pod are running:

   ```shell
   kubectl get pods -l app=<SERVICE>
   ```
{% /if %}

{% if equals($deployment, "kubernetes_gateway") %}
## Advanced use cases

### Tail sampling with the load balancing exporter

A primary use case for the gateway is tail-based sampling. To ensure that all spans for a given trace are processed by the same gateway pod, use the **load balancing exporter** in your DaemonSet Collectors. This exporter consistently routes spans based on a key, such as `traceID`.

{% tabs %}
{% tab label="Datadog Operator" %}

The DaemonSet Collector is configured with the `loadbalancing` exporter, which uses the Kubernetes service resolver to discover and route data to the gateway pods. The gateway Collector uses the `tail_sampling` processor to sample traces based on defined policies before exporting them to Datadog.

**Note**: RBAC permissions are required for the k8s resolver in the loadbalancing exporter.

Create a ConfigMap for the DaemonSet Collector configuration with the load balancing exporter:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-daemonset-config
data:
  otel-config.yaml: |
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
            service: datadog-otel-agent-gateway
            ports:
              - 4317
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [loadbalancing]
```

Create a ConfigMap for the gateway Collector configuration with tail sampling:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-tailsampling-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies:
          # Add your sampling policies here
          - name: sample-errors
            type: status_code
            status_code:
              status_codes: [ERROR]
          - name: sample-slow-traces
            type: latency
            latency:
              threshold_ms: 1000
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

Apply the DatadogAgent configuration:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      # Reference the custom DaemonSet config
      config:
        configMap:
          name: otel-daemonset-config
      # RBAC permissions for the k8s resolver
      rbac:
        create: true

    otelAgentGateway:
      enabled: true
      # Reference the custom gateway config
      config:
        configMap:
          name: otel-gateway-tailsampling-config

  override:
    otelAgentGateway:
      replicas: 3
```

Create a ClusterRole for the DaemonSet to access endpoints:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-k8s-resolver
rules:
- apiGroups: [""]
  resources: ["endpoints"] # for v0.139.0 and before
  verbs: ["get", "watch", "list"]
- apiGroups: ["discovery.k8s.io"]
  resources: ["endpointslices"] # for v0.140.0 and after
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector-k8s-resolver
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector-k8s-resolver
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

{% alert level="warning" %}
To ensure APM Stats are calculated on 100% of your traces before sampling, the `datadog/connector` runs in a separate pipeline without the `tail_sampling` processor. The Connector can run in either the DaemonSet or the gateway layer.
{% /alert %}

{% /tab %}
{% tab label="Helm" %}

In the configuration below:

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
          resources: ["endpoints"] # for v0.139.0 and before
          verbs: ["get", "watch", "list"]
        - apiGroups: ["discovery.k8s.io"]
          resources: ["endpointslices"] # for v0.140.0 and after
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

{% alert level="warning" %}
To ensure APM Stats are calculated on 100% of your traces before sampling, the `datadog/connector` runs in a separate pipeline without the `tail_sampling` processor. The Connector can run in either the DaemonSet or the gateway layer.
{% /alert %}

{% /tab %}
{% /tabs %}

### Using a custom Collector image

To use a custom-built Collector image for your gateway, specify the image repository and tag. If you need instructions on how to build the custom images, see [Use Custom OpenTelemetry Components][101].

{% alert %}
**Note:** The Datadog Operator supports the following image name formats:
- `name` - The image name (for example, `ddot-collector`)
- `name:tag` - Image name with tag (for example, `ddot-collector:7.74.0`)
- `registry/name:tag` - Full image reference (for example, `gcr.io/datadoghq/ddot-collector:7.74.0`)

The `registry/name` format (without tag in the name field) is **not supported** when using a separate `tag` field. Either include the full image reference with tag in the `name` field, or use the image name with a separate `tag` field.
{% /alert %}

{% tabs %}
{% tab label="Datadog Operator" %}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      image:
        name: <YOUR REPO>:<IMAGE TAG>
```

{% /tab %}
{% tab label="Helm" %}

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

{% /tab %}
{% /tabs %}

### Enable Autoscaling with Horizontal Pod Autoscaler (HPA)

The DDOT Collector gateway supports autoscaling with the Kubernetes Horizontal Pod Autoscaler (HPA) feature.

{% tabs %}
{% tab label="Datadog Operator" %}

**Note**: The Datadog Operator does not directly manage HPA resources. You need to create the HPA resource separately and configure it to target the OTel Agent Gateway deployment.

Create an HPA resource:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: datadog-otel-agent-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: datadog-otel-agent-gateway
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

Apply the DatadogAgent configuration with resource requests/limits (required for HPA):

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      replicas: 4  # Initial replicas, HPA will override based on metrics
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi
```

{% /tab %}
{% tab label="Helm" %}

To enable HPA, configure `otelAgentGateway.autoscaling`:

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

{% /tab %}
{% /tabs %}

You can use resource metrics (CPU or memory), custom metrics (Kubernetes Pod or Object), or external metrics as autoscaling inputs. For resource metrics, ensure that the [Kubernetes metrics server][33] is running in your cluster. For custom or external metrics, consider configuring the [Datadog Cluster Agent metrics provider][34].

### Deploying a multi-layer gateway

For advanced scenarios, you can deploy multiple gateway layers to create a processing chain.

{% tabs %}
{% tab label="Datadog Operator" %}

Deploy each layer as a separate `DatadogAgent` resource, starting from the final layer and working backward.

1.  **Deploy Layer 1 (Final Layer):** This layer receives from Layer 2 and exports to Datadog.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-1
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-1-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-1-config
data:
  otel-gateway-config.yaml: |
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

2.  **Deploy Layer 2 (Intermediate Layer):** This layer receives from the DaemonSet and exports to Layer 1.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-2
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-2-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-2-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-1-otel-agent-gateway:4317
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
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      config:
        configMap:
          name: daemonset-layer2-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: daemonset-layer2-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-2-otel-agent-gateway:4317
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

{% /tab %}
{% tab label="Helm" %}

Deploy each layer as a separate Helm release, starting from the final layer and working backward.

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

{% /tab %}
{% /tabs %}

## View gateway pods on Fleet Automation

The DDOT Collector gateway includes the [Datadog extension][35] by default. This extension exports Collector build information and configurations to Datadog, allowing you to monitor your telemetry pipeline from Infrastructure Monitoring and Fleet Automation.

To view your gateway pods:

1. Navigate to **Integrations > Fleet Automation**.

  {% img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="Fleet Automation page showing DDOT gateway pods" style="width:100%;" /%}

2. Select a gateway pod to view detailed build information and the running Collector configuration.

  {% img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="Fleet Automation page showing the collector config of one DDOT gateway pod" style="width:100%;" /%}

## Known limitations

  * **Startup race condition**: When deploying the DaemonSet and gateway in the same release, DaemonSet pods might start before the gateway service is ready, causing initial connection error logs. The OTLP exporter automatically retries, so these logs can be safely ignored. Alternatively, deploy the gateway first and wait for it to become ready before deploying the DaemonSet.
{% /if %}

## Explore observability data in Datadog

Use Datadog to explore the observability data for your application.

{% if includes($deployment, ["linux", "kubernetes_daemonset"]) %}
### Fleet automation

Explore your Datadog Agent, DDOT, and upstream OpenTelemetry Collector configurations.

{% img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Review your Agent and Collector configuration from the Fleet Automation page." style="width:100%;" /%}
{% /if %}

{% if equals($deployment, "linux") %}
### Infrastructure monitoring

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your hosts.

{% img src="/opentelemetry/embedded_collector/infrastructure.png" alt="View runtime and infrastructure metrics from the Host List." style="width:100%;" /%}
{% /if %}

{% if equals($deployment, "kubernetes_daemonset") %}
### Live container monitoring

Monitor your container health using Live Container Monitoring capabilities.

{% img src="/opentelemetry/embedded_collector/containers.png" alt="Monitor your container health from the Containers page." style="width:100%;" /%}

### Infrastructure node health

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your nodes.

{% img src="/opentelemetry/embedded_collector/infrastructure.png" alt="View runtime and infrastructure metrics from the Host List." style="width:100%;" /%}
{% /if %}

### Logs

View logs to monitor and troubleshoot application and system operations.

{% img src="/opentelemetry/embedded_collector/logs.png" alt="View logs from the Log Explorer." style="width:100%;" /%}

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{% img src="/opentelemetry/embedded_collector/traces.png" alt="View traces from the Trace Explorer." style="width:100%;" /%}

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications.

{% img src="/opentelemetry/embedded_collector/metrics.png" alt="View JVM metrics from the JVM Metrics dashboard" style="width:100%;" /%}

### Collector health metrics

View metrics from the DDOT Collector to monitor the Collector health.

{% img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" /%}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
[6]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[7]: /agent/configuration/agent-commands/#agent-status-and-information
[8]: /containers/datadog_operator
[9]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[11]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
[12]: /getting_started/site
[13]: https://www.datadoghq.com/pricing/
[14]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[15]: https://docs.datadoghq.com/account_management/billing/custom_metrics
[16]: https://pkg.go.dev/go.opentelemetry.io/contrib/detectors/aws/ecs#NewResourceDetector
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/internal/aws/ecs/documentation.md
[18]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[20]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[22]: /opentelemetry/integrations/collector_health_metrics/
[23]: https://opentelemetry.io/docs/collector/deployment/agent/
[24]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent
[25]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[26]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[27]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[28]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[29]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[30]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh
[31]: /getting_started/tagging/unified_service_tagging
[32]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration
[33]: http://github.com/kubernetes-sigs/metrics-server
[34]: /containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
[101]: /opentelemetry/setup/ddot_collector/custom_components
[102]: /opentelemetry/agent/#opentelemetry-collector-components
[201]: https://opentelemetry.io/docs/collector/deployment/gateway/
