---
title: Install the Datadog Agent on Kubernetes
kind: documentation
aliases:
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
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

This page provides instructions on installing the Datadog Agent in a Kubernetes environment through three different methods. Choose the method that best suits your use case:

- [Datadog Operator](?tab=operator)
- [Helm](?tab=helm)
- [DaemonSet](?tab=daemonset)

For dedicated documentation and examples for major Kubernetes distributions including AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, and Oracle Container Engine for Kubernetes (OKE), see [Kubernetes distributions][1].

For dedicated documentation and examples for monitoring the Kubernetes control plane, see [Kubernetes control plane monitoring][2].

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">The Datadog Operator is in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[The Datadog Operator][1] is a way to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.

## Prerequisites

Using the Datadog Operator requires the following prerequisites:

- **Kubernetes Cluster version >= v1.14.X**: Tests were done on versions >= `1.14.0`. Still, it should work on versions `>= v1.11.0`. For earlier versions, because of limited CRD support, the Operator may not work as expected.
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
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
     agent:
       image:
         name: "gcr.io/datadoghq/agent:latest"
     clusterAgent:
       image:
         name: "gcr.io/datadoghq/cluster-agent:latest"
   ```

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

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
{{% /tab %}}
{{% tab "Helm" %}}

To install the chart with a custom release name, `<RELEASE_NAME>` (for example, `datadog-agent`):

1. [Install Helm][1].
2.  Using the [Datadog `values.yaml` configuration file][2] as a reference, create your `values.yaml`. Datadog recommends that your `values.yaml` only contain values that need to be overridden, as it allows a smooth experience when upgrading chart versions.
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
{{% /tab %}}
{{% tab "DaemonSet" %}}

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

To install the Datadog Agent on your Kubernetes cluster:

1. **Configure Agent permissions**: If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. From Kubernetes 1.6 onwards, RBAC is enabled by default. Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding with the following command:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Note**: Those RBAC configurations are set for the `default` namespace. If you are in a custom namespace, update the `namespace` parameter before applying them.


2. **Create the Datadog Agent manifest**. Create the `datadog-agent.yaml` manifest out of one of the following templates:

    | Metrics                   | Logs                      | APM                       | Process                   | NPM                       | Security                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [Manifest template][2]  | [Manifest template][3] (no security)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][4]  | [Manifest template][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [Manifest template][6]  | [Manifest template][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][8]  | [Manifest template][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [Manifest template][10] | no template             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [Manifest template][11] | [Manifest template][12] |

     To enable trace collection completely, [extra steps are required on your application Pod configuration][13]. Refer also to the [logs][14], [APM][15], [processes][16], and [Network Performance Monitoring][17], and [Security][18] documentation pages to learn how to enable each feature individually.

     **Note**: Those manifests are set for the `default` namespace. If you are in a custom namespace, update the `metadata.namespace` parameter before applying them.

3. In the `secret-api-key.yaml` manifest, replace `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` with [your Datadog API key][19] encoded in base64. To get the base64 version of your API key, you can run:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. In the `secret-cluster-agent-token.yaml` manifest, replace `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` with a random string encoded in base64. Length of this string must be 32 or more. To get the base64 version of it, you can run:

    ```shell
    echo -n 'Random string' | base64
    ```

5. **Set your Datadog site** to {{< region-param key="dd_site" code="true" >}} using the `DD_SITE` environment variable in the `datadog-agent.yaml` manifest.

    **Note**: If the `DD_SITE` environment variable is not explicitly set, it defaults to the `US` site `datadoghq.com`. If you are using one of the other sites (`EU`, `US3`, or `US1-FED`) this will result in an invalid API key message. Use the [documentation site selector][20] to see documentation appropriate for the site you're using.

6. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **Verification**: To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    ```shell
    kubectl get daemonset
    ```

     If the Agent is deployed, output similar to the text below appears, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. Optional - **Setup Kubernetes State metrics**: Download the [Kube-State manifests folder][21] and apply them to your Kubernetes cluster to automatically collects [kube-state metrics][22]:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### Unprivileged

(Optional) To run an unprivileged installation, add the following to your [pod template][19]:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /agent/kubernetes/apm/#setup
[14]: /agent/kubernetes/log/
[15]: /agent/kubernetes/apm/
[16]: /infrastructure/process/?tab=kubernetes#installation
[17]: /network_monitoring/performance/setup/
[18]: /security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{< /tabs >}}

## Next steps

To configure Live Containers, see [Live Containers][2].

To collect events, override proxy settings, send custom metrics with DogStatsD, configure container allowlists and blocklists, or reference the full list of available environment variables, see [Configure the Datadog Agent on Kubernetes][3].

To configure integrations, see [Integrations & Autodiscovery][4].

To set up APM, see [Kubernetes Trace Collection][5].

To set up log collection, see [Kubernetes Log Collection][6].

[1]: /agent/kubernetes/control_plane
[2]: /infrastructure/livecontainers/?tab=helm#configuration
[3]: /agent/kubernetes/configuration/
[4]: /agent/kubernetes/integrations/
[5]: /agent/kubernetes/apm/
[6]: /agent/kubernetes/log/
