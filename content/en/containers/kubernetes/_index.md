---
title: Kubernetes
description: Install and configure the Datadog Agent on Kubernetes 
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
    - /integrations/faq/docker-ecs-kubernetes-events/
    - /integrations/faq/container-integration-event/
    - /integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
    - /agent/kubernetes/
further_reading:
    - link: "https://learn.datadoghq.com/courses/getting-started-k8s"
      tag: "Learning Center"
      text: "Getting Started with Kubernetes Observability"
    - link: "https://app.datadoghq.com/release-notes?category=Container%20Monitoring"
      tag: "Release Notes"
      text: "Check out the latest Datadog Containers releases (App login required)."
    - link: '/agent/guide/autodiscovery-management'
      tag: 'Documentation'
      text: 'Limit data collection to a subset of containers only'
    - link: '/agent/guide/docker-deprecation'
      tag: 'Documentation'
      text: 'Docker runtime deprecation in Kubernetes'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session for insights on Kubernetes monitoring'
    - link: 'https://www.datadoghq.com/blog/watermark-pod-autoscaler/'
      tag: 'Blog'
      text: 'A guide on scaling out your Kubernetes pods with the Watermark Pod Autoscaler'
---


{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  This foundation enablement session will focus on how Datadog can monitor Kubernetes. Learn how to configure Datadog for Kubernetes and how to get started. Explore the various views and tools Datadog offers to visualize and analyze your cluster and application metrics, traces, and logs.
{{< /learning-center-callout >}}

## Agent installation

You can install the Agent using either the [Datadog Operator][4] or Helm chart by following the [in-app installation guide in Fleet Automation][5]. This guided interface allows you to:
- Select your Kubernetes distribution (for example EKS, AKS, or GKE)
- Generate helm and kubectl commands with your API key prefilled
- Enable features such as APM, Log Management, tagging and other telemetry through UI-based configuration


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="In-app installation steps for the Datadog Agent on Kubernetes." style="width:90%;">}}


The Datadog Operator flow installs the Datadog Operator and uses Custom Resources to configure observability coverage.

The Helm Chart flow installs the Agent using DaemonSet and offers similar toggles for observability features.

See [Supported Versions][6] for the full list of Kubernetes versions supported by the Datadog Agent.


### Manual installation

For manually install your Agent on Kubernetes, follow the [Manually install and configure the Datadog Agent with a DaemonSet][7]


For Agent commands, see the Agent Commands guides. For information on the Datadog Cluster Agent, see Cluster Agent for Kubernetes.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> allows you to scope hosts and Cluster Checks. This unique name must be dot-separated tokens and abide by the following restrictions:
<ul>
  <li/>Must only contain lowercase letters, numbers, and hyphens
  <li/>Must start with a letter
  <li/>Must end with a number or a letter
  <li/>Must be less than or equal to 80 characters
</ul>
</div>

<br>

## Application Security Protection

The Datadog Appsec Injector automatically configures ingress proxies and gateways to enable Application Security monitoring across your Kubernetes cluster. This provides API-wide security coverage without requiring code changes or manual configuration of each gateway.

### What is the Appsec Injector?

The Appsec Injector is a Kubernetes controller that:
- Automatically detects supported proxies (Envoy Gateway, Istio)
- Configures proxies to route traffic through an external Application Security processor
- Enables threat detection and blocking at your ingress layer

### Quick start

**1. Deploy the external processor:**

Create a Kubernetes Deployment and Service for the Datadog Application Security processor:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
      - name: datadog-aap-extproc-container
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

**2. Enable the Appsec Injector:**

Configure the injector using the Datadog Operator or Helm:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    appsec:
      injector:
        enabled: true
        autoDetect: true
        processor:
          service:
            name: datadog-aap-extproc-service
            namespace: datadog
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      autoDetect: true
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

{{% /tab %}}
{{< /tabs >}}

For detailed configuration options and setup instructions, see the [Appsec Injector documentation][8].

## Additional configuration
### Unprivileged installation

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To run an unprivileged installation, add the following to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=13-18" >}}
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
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent. Datadog recommends [setting this value to 100 since Datadog Agent v7.48+][1].
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

[1]: /data_security/kubernetes/#running-container-as-root-user

Then, deploy the Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
To run an unprivileged installation, add the following to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=4-7" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}


### Select container registries

The in-app UI lets you select the container image registry, defaulting to gcr.io/datadoghq. If Artifact Registry is not accessible in your deployment region, use another registry such as:

- `public.ecr.aws/datadog` (recommended for deploying the Agent in an AWS environment)
- `datadoghq.azurecr.io`
- `docker.io/datadog` (can be subject to rate limits unless a Docker Hub customer)


### Uninstall


{{< tabs >}}
{{% tab "Datadog Operator" %}}
```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

This command deletes all Kubernetes resources created by installing Datadog Operator and deploying the Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u>: Install the Datadog Agent in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Further Configuration</u>: Collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, and reference the full list of available environment variables.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u>: Review base configurations for major Kubernetes distributions, including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Set up trace collection: configure the Agent to accept traces, configure your Pods to communicate with the Agent, and configure your application tracers to emit traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>CSI Driver</u>: Install and set up Datadog CSI driver, and mount DogStatsD and Trace Agent UDS socket using Datadog CSI volumes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Log collection</u>: Set up log collection in a Kubernetes environment.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Tag extraction</u>: Configure the Agent to create and assign tags to all metrics, traces, and logs emitted by a container, Pod, or Node, based on Kubernetes labels or annotations.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations & Autodiscovery</u>: To configure integrations in a Kubernetes environment, use Datadog's Autodiscovery feature.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Collect your exposed Prometheus and OpenMetrics metrics from your application running inside Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Control plane monitoring</u>: Monitor the Kubernetes API server, controller manager, scheduler, and etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Data Collected</u>: See the list of metrics collected by the Agent when deployed on your Kubernetes cluster.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/kubernetes-legacy/
[2]: /agent/configuration/agent-commands/
[3]: /containers/cluster_agent/
[4]: https://docs.datadoghq.com/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: https://docs.datadoghq.com/agent/supported_platforms/?tab=cloudandcontainers
[7]: https://docs.datadoghq.com/containers/guide/kubernetes_daemonset/
[8]: /security/application_security/setup/kubernetes/appsec-injector
