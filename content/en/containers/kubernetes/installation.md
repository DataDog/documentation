---
title: Install the Datadog Agent on Kubernetes
kind: documentation
aliases:
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
    - /agent/kubernetes/installation
further_reading:
    - link: 'infrastructure/livecontainers/'
      tag: 'Documentation'
      text: 'Live Containers'
    - link: '/agent/kubernetes/configuration'
      tag: 'Documentation'
      text: 'Configure the Datadog Agent on Kubernetes'
    - link: '/agent/kubernetes/integrations'
      tag: 'Documentation'
      text: 'Configure integrations'
    - link: '/agent/kubernetes/apm'
      tag: 'Documentation'
      text: 'Collect your application traces'
    - link: 'agent/kubernetes/log'
      tag: 'Documentation'
      text: 'Collect your application logs'
    - link: '/agent/kubernetes/tag'
      tag: 'Documentation'
      text: 'Assign tags to all data emitted by a container, Pod, or Node'
---

## Installation

This page provides instructions on installing the Datadog Agent in a Kubernetes environment. For dedicated documentation and examples for major Kubernetes distributions including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE), see [Kubernetes distributions][1].

For dedicated documentation and examples for monitoring the Kubernetes control plane, see [Kubernetes control plane monitoring][2].

### Minimum Agent and Cluster Agent versions

Some features related to later Kubernetes versions require a minimum Datadog Agent version.

| Kubernetes version | Agent version  | Cluster Agent version | Reason                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Kubelet metrics deprecation           |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Kubernetes resource deprecation       |
| 1.22.0+            | 7.37.0+        | 7.37.0+               | Support dynamic service account token |

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">The Datadog Operator is Generally Available with the 1.0.0 version, and it reconciles the version <code>v2alpha1</code> of the DatadogAgent Custom Resource. </div>

[The Datadog Operator][1] is a way to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.

## Prerequisites

Using the Datadog Operator requires the following prerequisites:

- **Kubernetes Cluster version >= v1.20.X**: Tests were done on versions >= `1.20.0`. Still, it should work on versions `>= v1.11.0`. For earlier versions, because of limited CRD support, the Operator may not work as expected.
- [`Helm`][2] for deploying the `datadog-operator`.
- [`Kubectl` CLI][3] for installing the `datadog-agent`.

## Deploy an Agent with the Operator

To deploy the Datadog Agent with the operator in the minimum number of steps, see the [`datadog-operator`][4] Helm chart. Here are the steps:

1. Install the [Datadog Operator][5]:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. Create a Kubernetes secret with your API and app keys

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][6]

2. Create a file with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
   ```

   Replace `<DATADOG_SITE>` with your [Datadog site][10]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

3. Deploy the Datadog Agent with the above configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

## Cleanup

The following command deletes all the Kubernetes resources created by the above instructions:

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

For further details on setting up Operator, including information about using tolerations, refer to the [Datadog Operator advanced setup guide][7].

## Unprivileged

(Optional) To run an unprivileged installation, add the following to the [Datadog custom resource (CR)][8]:

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the Docker or containerd socket.

## Container registries

To modify the container image registry, see the [Changing Container Registry][9] guide.

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
[9]: /agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator
[10]: /getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

To install the chart with a custom release name, `<RELEASE_NAME>` (for example, `datadog-agent`):

1. [Install Helm][1].
2. Using the [Datadog `values.yaml` configuration file][2] as a reference, create your `values.yaml`. Datadog recommends that your `values.yaml` only contain values that need to be overridden, as it allows a smooth experience when upgrading chart versions.
3. If this is a fresh install, add the Helm Datadog repo:
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
4. Retrieve your Datadog API key from your [Agent installation instructions][3] and run:

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    Replace `<TARGET_SYSTEM>` with the name of your OS: `linux` or `windows`.

- **Helm v1/v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

This chart adds the Datadog Agent to all nodes in your cluster with a DaemonSet. It also optionally deploys the [kube-state-metrics chart][4] and uses it as an additional source of metrics about the cluster. A few minutes after installation, Datadog begins to report hosts and metrics.

Next, enable the Datadog features that you'd like to use: [APM][5], [Logs][6]

**Notes**:

- For a full list of the Datadog chart's configurable parameters and their default values, see the [Datadog Helm repository README][7].

### Container registries

<div class="alert alert-warning">On July 10 2023, Docker Hub will start enforcing download rate limits to Datadog's Docker Hub registries. Image pulls from these registries count against your rate limit quota.<br/><br/>

Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from other registries where no rate limits apply. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

If Google Container Registry ([gcr.io/datadoghq][8]) is not accessible in your deployment region, use another registry with the following configuration in the `values.yaml` file:

- For the public AWS ECR registry ([public.ecr.aws/datadog][9]), use the following:

  ```yaml
  registry: public.ecr.aws/datadog
  ```

- For the Docker Hub registry ([docker.io/datadog][10]), use the following:

  ```yaml
  registry: docker.io/datadog
  ```

**Note**:

- It is recommended to use the public AWS ECR registry ([public.ecr.aws/datadog][9]) when the Datadog chart is deployed in an AWS environment.

### Upgrading from chart v1.x

The Datadog chart has been refactored in v2.0 to regroup the `values.yaml` parameters in a more logical way.

If your current chart version deployed is earlier than `v2.0.0`, follow the [migration guide][11] to map your previous settings with the new fields.

### Kube state metrics core in chart v2.x

In new deployments, Datadog recommends using the newer `kube-state-metrics` core with the following values:

```yaml
...
datadog:
...
  kubeStateMetricsCore:
    enabled: true
...
```

For details about `kube-state-metrics` core, read the [Kubernetes State Metrics Core documentation][12].

### Unprivileged

(Optional) To run an unprivileged installation, add the following in the `values.yaml` file:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /agent/kubernetes/apm?tab=helm
[6]: /agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /integrations/kubernetes_state_core
{{% /tab %}}
{{< /tabs >}}

## Next steps

To configure Live Containers, see [Live Containers][3].

To collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, or reference the full list of available environment variables, see [Configure the Datadog Agent on Kubernetes][4].

To configure integrations, see [Integrations & Autodiscovery][5].

To set up APM, see [Kubernetes Trace Collection][6].

To set up log collection, see [Kubernetes Log Collection][7].

[1]: /agent/kubernetes/distributions
[2]: /agent/kubernetes/control_plane
[3]: /infrastructure/livecontainers/configuration/
[4]: /agent/kubernetes/configuration/
[5]: /agent/kubernetes/integrations/
[6]: /agent/kubernetes/apm/
[7]: /agent/kubernetes/log/
