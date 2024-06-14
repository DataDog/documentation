---
title: Set Up the Datadog Cluster Agent
kind: documentation
aliases:
- /agent/cluster_agent/setup
- /agent/cluster_agent/event_collection
- /containers/cluster_agent/event_collection
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
algolia:
  tags: ['cluster agent']
---

If you deploy the Datadog Agent using Helm chart v2.7.0+ or Datadog Operator v0.7.0+, the Cluster Agent is enabled by default.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

The Cluster Agent is enabled by default since Datadog Operator v1.0.0. The Operator creates the necessary RBACs, deploys the Cluster Agent, and modifies the Agent DaemonSet configuration.

This also automatically generates a random token in a `Secret` shared by both the Cluster Agent and the Datadog Agent to secure communication. You can manually specify this token by setting the `global.clusterAgentToken` field. You can alternatively set this by referencing the name of an existing `Secret` and the data key containing this token.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
      clusterAgentTokenSecret:
        secretName: <SECRET_NAME>
        keyName: <KEY_NAME>
  ```

When set manually, this token must be 32 alphanumeric characters.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

The Cluster Agent is enabled by default since Helm chart v2.7.0.

To activate it on older versions, or if you use a custom [datadog-values.yaml][1] that overrides the `clusterAgent` key, update your [datadog-values.yaml][1] file with the following Cluster Agent configuration:

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

Then, upgrade your Datadog Helm chart.

This automatically updates the necessary RBAC files for the Cluster Agent and Datadog Agent. Both Agents use the same API key.

This also automatically generates a random token in a `Secret` shared by both the Cluster Agent and the Datadog Agent to secure communication. You can manually specify this token using the `clusterAgent.token` configuration. You can alternatively set this by referencing the name of an existing `Secret` containing a `token` value through the `clusterAgent.tokenExistingSecret` configuration.

When set manually, this token must be 32 alphanumeric characters.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}

To set up the Datadog Cluster Agent using a DaemonSet:
1. [Configure Cluster Agent RBAC permissions](#configure-cluster-agent-rbac-permissions).
2. [Secure Cluster Agent to Agent communication](#secure-cluster-agent-to-agent-communication).
3. [Create the Cluster Agent and its service](#create-the-cluster-agent-and-its-service).
4. [Configure the node Agent to communicate with the Cluster Agent](#configure-datadog-agent-communication).

### Configure Cluster Agent RBAC permissions

The Datadog Cluster Agent needs a proper RBAC to be up and running:

1. Review the manifests in the [Datadog Cluster Agent RBAC folder][1]. **Note**: When using the Cluster Agent, your node Agents are not able to interact with the Kubernetes API server—only the Cluster Agent is able to do so.

2. To configure Cluster Agent RBAC permissions, apply the following manifests. (You may have done this already when setting up the [node Agent daemonset][2].)

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  This creates the appropriate `ServiceAccount`, `ClusterRole`, and `ClusterRoleBinding` for the Cluster Agent and updates the `ClusterRole` for the node Agent.

If you are using Azure Kubernetes Service (AKS), you may require extra permissions. See the [RBAC for DCA on AKS][3] FAQ.

### Secure Cluster Agent to Agent communication

The Datadog Agent and Cluster Agent require a token to secure their communication. It is recommended that you save this token in a `Secret` that both the Datadog Agent and Cluster Agent can reference in the environment variable `DD_CLUSTER_AGENT_AUTH_TOKEN`. This helps to maintain consistency and to avoid the token being readable in the `PodSpec`.

To create this token run this one line command to generate a `Secret` named `datadog-cluster-agent` with a `token` set. Replace the `<TOKEN>` with 32 alphanumeric characters.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**Note:** This creates a `Secret` in the default namespace. If you are in a custom namespace, update the namespace parameter of the command before running it.

The default `cluster-agent-deployment.yaml` provided for the Cluster Agent is already configured to see this `Secret` with the environment variable configuration:
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

This environment variable must be configured (using the same setup) when [Configuring the Datadog Agent][4].

### Create the Cluster Agent and its service

1. Download the following manifests:

    * [`agent-services.yaml`: The Cluster Agent Service manifest][5]
    * [`secret-api-key.yaml`: The secret holding the Datadog API key][6]
    * [`secret-application-key.yaml`: The secret holding the Datadog Application Key][7]
    * [`cluster-agent-deployment.yaml`: Cluster Agent manifest][8]
    * [`install_info-configmap.yaml`: Install Info Configmap][9]

2. In the `secret-api-key.yaml` manifest, replace `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` with [your Datadog API key][10] encoded in base64. To get the base64 version of your API key, you can run:

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. In the `secrets-application-key.yaml` manifest, replace `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` with [your Datadog Application key][11] encoded in base64.
4. By default, the `cluster-agent-deployment.yaml` manifest refers to the token created previously in the `Secret` `datadog-cluster-agent`. If you are storing this token in an alternative way, configure your `DD_CLUSTER_AGENT_AUTH_TOKEN` environment variable accordingly.
5. Deploy these resources for the Cluster Agent Deployment to use:
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. Finally, deploy the Datadog Cluster Agent:
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**Note**: In your Datadog Cluster Agent, set the environment variable `DD_SITE` to your Datadog site: {{< region-param key="dd_site" code="true" >}}. It defaults to the `US` site `datadoghq.com`

### Verification

At this point, you should see:

```shell
kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

kubectl get secret

NAME                    TYPE                                  DATA      AGE
datadog-cluster-agent   Opaque                                1         1d

kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**Note**: If you already have the Datadog Agent running, you may need to apply the [Agent's `rbac.yaml` manifest][12] before the Cluster Agent can start running.

## Configure Datadog Agent communication

Modify your Datadog Agent configuration to communicate with the Datadog Cluster Agent.

In your existing DaemonSet [manifest file][2], set the environment variable `DD_CLUSTER_AGENT_ENABLED` to `true`. Then, set the `DD_CLUSTER_AGENT_AUTH_TOKEN` using the same syntax used in [Secure Cluster-Agent-to-Agent Communication][13].

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

After redeploying your DaemonSet with these configurations in place, the Datadog Agent is able to communicate with the Cluster Agent. You can reference the provided Cluster Agent [`daemonset.yaml` manifest][14] for a full example.

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests/cluster-agent
[2]: /agent/kubernetes/?tab=daemonset
[3]: /agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: /agent/cluster_agent/setup/?tab=daemonset#configure-the-datadog-agent
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/manifests/cluster-agent/secret-application-key.yaml
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/access/application-keys
[12]: /agent/cluster_agent/setup/?tab=daemonset#configure-rbac-permissions
[13]: /agent/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[14]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
{{% /tab %}}
{{< /tabs >}}

### Verification

You can verify your Datadog Agent Pods and Cluster Agent Pods are running by executing the command:

```shell
kubectl get pods | grep agent
```

You should see:

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

You can additionally verify the Datadog Agent has successfully connected to the Cluster Agent with the [Agent status output][1].

```shell
kubectl exec -it <AGENT_POD_NAME> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

Kubernetes events are beginning to flow into your Datadog account, and relevant metrics collected by your Agents are tagged with their corresponding cluster level metadata.

## Windows containers

The Datadog Cluster Agent can only be deployed on Linux nodes.

To monitor Windows containers, use two installations of the Helm chart in a mixed cluster. The first Helm chart deploys the Datadog Cluster Agent and the Agent DaemonSet for Linux nodes (with `targetSystem: linux`). The second Helm chart (with `targetSystem: windows`) deploys the Agent only on Windows nodes and connects to the existing Cluster Agent deployed as part of the first Helm chart.

Use the following `datadog-values.yaml` file to configure communication between Agents deployed on Windows nodes and the Cluster Agent.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

For more information, see [Troubleshooting Windows Container Issues][2].

## Monitoring AWS managed services

To monitor an AWS managed service like MSK, ElastiCache, or RDS, set `clusterChecksRunner` in your Helm chart to create a Pod with an IAM role assigned through `serviceAccountAnnotation`. Then, set the integration configurations under `clusterAgent.confd`.

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- If true, create & use RBAC resources
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows
