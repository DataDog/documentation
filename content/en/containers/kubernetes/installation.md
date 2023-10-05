---
title: Install the Datadog Agent on Kubernetes
kind: documentation
aliases:
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
    - /agent/kubernetes/installation
further_reading:
    - link: '/agent/kubernetes/configuration'
      tag: 'Documentation'
      text: 'Further Configure the Datadog Agent on Kubernetes'
    - link: 'https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options'
      tag: 'GitHub'
      text: 'Datadog Helm chart - All configuration options'
    - link: 'https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading'
      tag: 'GitHub'
      text: 'Upgrading Datadog Helm'
---

## Overview

This page provides instructions on installing the Datadog Agent in a Kubernetes environment. By default, the Datadog Agent runs in a DaemonSet.

For dedicated documentation and examples for major Kubernetes distributions including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE), see [Kubernetes distributions][1].

For dedicated documentation and examples for monitoring the Kubernetes control plane, see [Kubernetes control plane monitoring][2].

### Minimum Kubernetes and Datadog Agent versions

Some features related to later Kubernetes versions require a minimum Datadog Agent version.

| Kubernetes version | Agent version  | Reason                                |
|--------------------|----------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | Kubelet metrics deprecation           |
| 1.21.0+            | 7.36.0+        |  Kubernetes resource deprecation       |
| 1.22.0+            | 7.37.0+        |  Support dynamic service account token |

See also: [Minimum Kubernetes and Cluster Agent versions][8].

## Installation

You have the following options for installing the Datadog Agent on Kubernetes:

- The [Datadog Operator][9], a [Kubernetes Operator][10] (Recommended)
- [Helm][11]
- Manual installation. See [Manually install and configure the Datadog Agent on Kubernetes with DaemonSet][12].

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">The Datadog Operator is Generally Available with the 1.0.0 version, and it reconciles the version <code>v2alpha1</code> of the DatadogAgent Custom Resource. </div>

The [Datadog Operator][1] is a way to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.

### Prerequisites

Using the Datadog Operator requires the following prerequisites:

- **Kubernetes Cluster version v1.20.X+**: Tests were done on v1.20.0+; should be supported in v1.11.0+. For earlier versions, because of limited CRD support, the Operator may not work as expected.
- [`Helm`][2] for deploying the `datadog-operator`.
- [`Kubectl` CLI][3] for installing the `datadog-agent`.

### Deploy an Agent with the Operator

1. Install the [Datadog Operator][5]:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. Create a Kubernetes secret with your API and app keys

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API][6] and [application keys][7].

2. Create a file, `datadog-agent.yaml`, with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:

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
[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://app.datadoghq.com/organization-settings/application-keys
[10]: /getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

### Prerequisites

- [Helm][1]
- If this is a fresh install, add the Helm Datadog repo:
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

### Install the chart

1. Create an empty `datadog-values.yaml` file. Any parameters not specified in this file default to those set in [`values.yaml`][14].

2. Create a Kubernetes Secret to store your Datadog [API key][3] and [app key][15]:
   
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```
3. Set the following parameters in your `datadog-values.yaml` to reference the secret:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    appKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][13]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).
3. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

- `<RELEASE_NAME>`: Your release name. For example, `datadog-agent`.

- `<TARGET_SYSTEM>`: The name of your OS. For example, `linux` or `windows`.


**Note**: If you are using Helm `2.x`, run the following:
   ```bash
   helm install --name <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /agent/kubernetes/apm?tab=helm
[6]: /agent/kubernetes/log?tab=helm

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /integrations/kubernetes_state_core
[13]: /getting_started/site
[14]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[15]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

### Cleanup

{{< tabs >}}
{{% tab "Operator" %}}
The following command deletes all the Kubernetes resources created by the above instructions:

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

For further details on setting up Datadog Operator, including information about using tolerations, refer to the [Datadog Operator advanced setup guide][1].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md

{{% /tab %}}
{{% tab "Helm" %}}
To uninstall/delete the `<RELEASE_NAME>` deployment:

```bash
helm uninstall <RELEASE_NAME>
```
{{% /tab %}}
{{< /tabs >}}


### Unprivileged

(Optional) To run an unprivileged installation:

{{< tabs >}}
{{% tab "Operator" %}}
Add the following to the Datadog custom resource (CR) in your `datadog-agent`.yaml:

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{% tab "Helm" %}}
Add the following in your `datadog-values.yaml` file:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

- `<USER_ID>` is the UID to run the Agent.
- `<DOCKER_GROUP_ID>` is the group ID owning the Docker or containerd socket.

### Container registries

{{< tabs >}}
{{% tab "Operator" %}}

To modify the container image registry, see the [Changing Container Registry][9] guide.


[9]: /agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from GCR or ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

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

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/

{{% /tab %}}
{{< /tabs >}}

## Next steps

- **Monitor your Kubernetes infrastructure in Datadog**. If you used a Datadog Operator or Helm install, you can start monitoring your containers in Datadog's [Containers view][13]. For more information, see the [Containers view documentation][14].

- **Configure APM**. See [Kubernetes APM - Trace Collection][15].
- **Configure log collection**. See [Kubernetes log collection][7].
- **Configure integrations**. See [Integrations & Autodiscovery][5].
- **Other configurations**: To collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, or reference the full list of available environment variables, see [Further Kubernetes Configuration][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/distributions
[2]: /agent/kubernetes/control_plane
[3]: /infrastructure/livecontainers/configuration/
[4]: /agent/kubernetes/configuration/
[5]: /agent/kubernetes/integrations/
[6]: /agent/kubernetes/apm/
[7]: /agent/kubernetes/log/
[8]: /containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /infrastructure/containers
[15]: /containers/kubernetes/apm