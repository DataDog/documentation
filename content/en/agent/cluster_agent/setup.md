---
title: Cluster Agent Setup
kind: documentation
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
- link: "/agent/kubernetes/daemonset_setup/"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

To set up the Datadog Cluster Agent on your Kubernetes cluster, follow these steps:

1. [Set up the Datadog Cluster Agent](#configure-the-datadog-cluster-agent).
2. [Configure your Agent to communicate with the Datadog Cluster Agent](#configure-the-datadog-agent)

## Configure the Datadog Cluster Agent

### Configure RBAC permissions

The Datadog Cluster Agent needs a proper RBAC to be up and running:

1. Review the manifests in the [Datadog Cluster Agent RBAC folder][1]. Note that when using the Cluster Agent, your node Agents are not able to interact with the Kubernetes API server—only the Cluster Agent is able to do so.

2. To configure Cluster Agent RBAC permissions, apply the following manifests. (You may have done this already when setting up the [node Agent daemonset][2].)

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  This creates the appropriate `ServiceAccount`, `ClusterRole`, and `ClusterRoleBinding` for the Cluster Agent and updates the `ClusterRole` for the node Agent.

If you are using Azure Kubernetes Service (AKS), you may require extra permissions. See the [RBAC for DCA on AKS][3] FAQ.

### Secure Cluster Agent to Agent communication

Use one of the following options to secure communication between the Datadog Agent and the Datadog Cluster Agent.

* Create a secret and access it with an environment variable.
* Set a token in an environment variable.
* Use a ConfigMap to manage your secrets.

Setting the value without a secret results in the token being readable in the `PodSpec`.

{{< tabs >}}
{{% tab "Secret" %}}

1. Run the following command to create a secret token. Your token must be at least 32 characters long.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Run this one line command:

    ```shell
    kubectl create secret generic datadog-cluster-agent --from-literal=token='<ThirtyX2XcharactersXlongXtoken>'
    ```

    Alternatively, modify the value of the secret in the `agent-secret.yaml` file located in the [manifest/cluster-agent directory][1] or create it with:

    `kubectl create -f Dockerfiles/manifests/cluster-agent/agent-secret.yaml`

3. Refer to this secret with the environment variable `DD_CLUSTER_AGENT_AUTH_TOKEN` in the manifests of the Cluster Agent. See [Create the Cluster Agent and its service][2] and [Configure the Datadog Cluster Agent][3].

[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/agent-secret.yaml
[2]: /agent/cluster_agent/setup/?tab=secret#create-the-cluster-agent-and-its-service
[3]: /agent/cluster_agent/setup/?tab=secret#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Environment Variable" %}}

1. Run the following command to create a secret token. Your token must be at least 32 characters long.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Refer to this secret with the environment variable `DD_CLUSTER_AGENT_AUTH_TOKEN` in the manifests of the Cluster Agent and the node-based Agent.

    ```yaml
              - name: DD_CLUSTER_AGENT_AUTH_TOKEN
                value: "<ThirtyX2XcharactersXlongXtoken>"
    ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

1. Run the following command to create a secret token. Your token must be at least 32 characters long.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Create your `datadog-cluster.yaml` with the variables of your choice within the `datadog.yaml` file and create the ConfigMap accordingly:

    ```shell
    kubectl create configmap dca-yaml --from-file datadog-cluster.yaml
    ```

{{% /tab %}}
{{< /tabs >}}

**Note**: This needs to be set in the manifest of the Cluster Agent **and** the node agent.

### Create the Cluster Agent and its service

1. Download the following manifests:

  * [`agent-services.yaml`: The Cluster Agent Service manifest][4]
  * [`secrets.yaml`: The secret holding the Datadog API key][5]
  * [`cluster-agent-deployment.yaml`: Cluster Agent manifest][6]
  * [`install_info-configmap.yaml`: Install Info Configmap][7]

2. In the `secrets.yaml` manifest, replace `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` with [your Datadog API key][8] encoded in base64:

    ```shell
    echo -n '<Your API key>' | base64
    ```

3. In the `cluster-agent-deployment.yaml` manifest, set the token from [Secure Cluster-Agent-to-Agent Communication][11]. The format depends on how you set up your secret; instructions can be found in the manifest directly.
4. Run: `kubectl apply -f agent-services.yaml`
5. Run: `kubectl apply -f secrets.yaml`
6. Run: `kubectl apply -f install_info-configmap.yaml`
6. Finally, deploy the Datadog Cluster Agent: `kubectl apply -f cluster-agent-deployment.yaml`

**Note**: In your Datadog Cluster Agent, set `<DD_SITE>` to your Datadog site: {{< region-param key="dd_site" code="true" >}}. The default value is `datadoghq.com`

### Verification

At this point, you should see:

```shell
-> kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret

NAME                         TYPE                                  DATA      AGE
datadog-agent-cluster-agent  Opaque                                1         1d

-> kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**Note**: If you already have the Datadog Agent running, you may need to apply the [agent-rbac.yaml manifest][12] before the Cluster Agent can start running.

## Configure the Datadog Agent

After having set up the Datadog Cluster Agent, configure your Datadog Agent to communicate with the Datadog Cluster Agent.

### Setup

#### Set RBAC permissions for node-based Agents

1. Download the the [agent-rbac.yaml manifest][9]. **Note**: When using the Cluster Agent, your node Agents are not able to interact with the Kubernetes API server—only the Cluster Agent is able to do so.

2. Run: `kubectl apply -f agent-rbac.yaml`

#### Enable the Datadog Agent

1. Download the [daemonset.yaml manifest][10].

3. In the `daemonset.yaml` manifest, replace `<DD_SITE>` with your Datadog site: `{{< region-param key="dd_site">}}`. Defaults to `datadoghq.com`.

4. In the `daemonset.yaml` manifest, set the token from [Secure Cluster-Agent-to-Agent Communication][11]. The format depends on how you set up your secret; instructions can be found in the manifest directly.

5. In the `daemonset.yaml` manifest, check that the environment variable `DD_CLUSTER_AGENT_ENABLED` is set to `true`.

6. (Optional) If your cluster encompasses a single environment, you can also set `<DD_ENV>` in the `agent.yaml`.

7. Create the DaemonSet with this command: `kubectl apply -f daemonset.yaml`

### Verification

Run:

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

Kubernetes events are beginning to flow into your Datadog account, and relevant metrics collected by your Agents are tagged with their corresponding cluster level metadata.

#### Monitoring AWS managed services

To monitor an AWS managed service like MSK, ElastiCache, or RDS, set `clusterChecksRunner` to create a pod with an IAM role assigned through the serviceAccountAnnotation in the Helm chart. Then, set the integration configurations under `clusterAgent.confd`.

{{< code-block lang="yaml" >}}
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

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent
[2]: /agent/kubernetes/
[3]: /agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[8]: https://app.datadoghq.com/account/settings#api
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[10]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
[11]: /agent/cluster_agent/setup/?tab=secret#secure-cluster-agent-to-agent-communication
[12]: /agent/cluster_agent/setup/?tab=secret#configure-rbac-permissions
