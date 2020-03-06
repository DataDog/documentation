---
title: Kubernetes
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Metrics collected by the Agent"
- link: "agent/autodiscovery"
  tag: "documentation"
  text: "Autodiscovery with the Agent"
---

## Installation

There are a number of different ways to monitor your Kubernetes system using Datadog. Choosing one depends on how your system is structured and the type of monitoring you desire. There are four options for installing the Datadog Agent for Kubernetes: DaemonSets, Helm charts, installing the Agent directly on the host, and the Datadog Cluster Agent.

**Note**: Agent version 6.0 and above only support versions of Kubernetes higher than 1.7.6. For prior versions of Kubernetes, consult the [Legacy Kubernetes versions section][1].

{{< tabs >}}
{{% tab "DaemonSet" %}}

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog Agent][2] as a deployment on each Kubernetes node.*

To install the Datadog Agent on your Kubernetes cluster:

1. **Configure Agent permissions**: If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. From Kubernetes 1.6 onwards, RBAC is enabled by default. Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding with the following command:

    ```shell
    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

2. **Create a secret that contains your Datadog API Key**. Replace the `<DATADOG_API_KEY>` below with [the API key for your organization][3]. This secret is used in the manifest to deploy the Datadog Agent.

    ```shell
    kubectl create secret generic datadog-secret --from-literal api-key="<DATADOG_API_KEY>"
    ```

3. **Create the Datadog Agent manifest**. Create the `datadog-agent.yaml` manifest out of one of the following templates:

    - [Manifest with Logs, APM, process, metrics collection enabled][4].
    - [Manifest with Logs, APM, and metrics collection enabled][5].
    - [Manifest with Logs and metrics collection enabled][6].
    - [Manifest with APM and metrics collection enabled][7].
    - [Vanilla Manifest with just metrics collection enabled][8].

     Refer to the [logs][9], [traces][10], and [processes][11] documentation page to learn how to enable each one individually.

4. Optional - **Set your Datadog site**. If you are on Datadog EU site set the `DD_SITE` environment variable to `datadoghq.eu` in the `datadog-agent.yaml` manifest.

5. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl create -f datadog-agent.yaml
    ```

6. **Verification**: To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    ```shell
    kubectl get daemonset
    ```

     If the Agent is deployed, you will see output similar to the text below, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h
    ```


[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: /resources/yaml/datadog-agent-all-features.yaml
[5]: /resources/yaml/datadog-agent-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-apm.yaml
[8]: /resources/yaml/datadog-agent-vanilla.yaml
[9]: /agent/kubernetes/logs
[10]: /agent/kubernetes/apm
[11]: /infrastructure/process/?tab=kubernetes#installation
{{% /tab %}}
{{% tab "Helm" %}}

To install the chart with the release name `<RELEASE_NAME>`, retrieve your Datadog API key from your [Agent installation instructions][1] and run:

- **Helm v1/v2**

    ```bash
    helm install --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
    ```

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
    ```

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally deploys the [kube-state-metrics chart][2] and uses it as an additional source of metrics about the cluster. A few minutes after installation, Datadog begins to report hosts and metrics.

**Note**: For a full list of the Datadog chart's configurable parameters and their default values, refer to the [Datadog Helm repository README][3].

### Upgrading from chart v1.x

The Datadog chart has been refactored in v2.0 to regroup the `values.yaml` parameters in a more logical way.

If your current chart version deployed is earlier than `v2.0.0`, follow the [migration guide][4] to map your previous settings with the new fields.

### Configuring the Datadog Helm chart

As a best practice, a YAML file that specifies the values for the chart parameters should be provided to configure the chart:

1. **Copy the default [`datadog-values.yaml`][5] value file.**
2. Set the `apiKey` parameter with your [Datadog API key][1].
3. Upgrade the Datadog Helm chart with the new `datadog-values.yaml` file:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[3]: https://github.com/helm/charts/tree/master/stable/datadog#configuration
[4]: https://github.com/helm/charts/blob/master/stable/datadog/docs/Migration_1.x_to_2.x.md
[5]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

## Integrations

Once the Agent is up and running in your cluster use [Datadog Autodiscovery feature][2] to collect, metrics and logs automatically from your pods.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/kubernetes-legacy
[2]: /agent/autodiscovery
