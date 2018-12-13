---
title: Datadog Cluster Agent for Kubernetes
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "agent/kubernetes/daemonset_setup"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "agent/kubernetes/integrations"
  tag: "Documentation"
  text: "Custom Integrations"
- link: "https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting"
  tag: "Github"
  text: "Troubleshooting the Datadog Cluster Agent"
---

The Datadog Cluster Agent provides a streamlined, centralized approach to collecting cluster-level monitoring data. By acting as a proxy between the API server and node-based Agents, the Cluster Agent helps to alleviate server load. It also relays cluster-level metadata to node-based Agents, allowing them to enrich the metadata of locally collected metrics. 

Using the Datadog Cluster Agent helps you to:

* alleviate the impact of Agents on your infrastructure.
* isolate node-based Agents to their respective nodes, reducing RBAC rules to solely read metrics and metadata from the kubelet.
* leverage horizontal pod autoscaling with custom Kubernetes metrics. Refer to [the dedicated guide][1] for more details about this feature.

## Setup

### Configure RBAC permissions for the Cluster Agent

1. Review the manifests in the [Datadog Cluster Agent RBAC folder][2].

2. Enter the `datadog-agent` directory, and run:

  ```
  kubectl apply -f Dockerfiles/manifests/cluster-agent/rbac/rbac-cluster-agent.yaml
  ```

  This creates the appropriate ServiceAccount, ClusterRole, and ClusterRoleBinding.

### Secure Cluster-Agent-to-Agent Communication

Secure communication between the Agent and the Cluster Agent by creating a secret. 

Run:

```
echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
```

Use this string in the `dca-secret.yaml` file located in the [`manifest/cluster-agent` directory][3].

Alternatively, run this one-line command:
```
kubectl create secret generic datadog-auth-token --from-literal=token=<ThirtyX2XcharactersXlongXtoken>
```

Refer to this secret with the environment variable `DD_CLUSTER_AGENT_AUTH_TOKEN` in the manifests of the Cluster Agent and the node-based Agent.

```yaml
          - name: DD_CLUSTER_AGENT_AUTH_TOKEN
            valueFrom:
              secretKeyRef:
                name: datadog-auth-token
                key: token
```

**Note**: This needs to be set in the manifest of the Cluster Agent **and** the node agent.

Alternatively, if you do not want to rely on environment variables, mount the `datadog.yaml` file. Datadog recommends using a ConfigMap. To do so, add the following into the Cluster Agent manifest:

```
[...]
        volumeMounts:
        - name: "dca-yaml"
          mountPath: "/etc/datadog-agent/datadog.yaml"
          subPath: "datadog-cluster.yaml"
      volumes:
        - name: "dca-yaml"
          configMap:
            name: "dca-yaml"
[...]
```

Then, create your `datadog-cluster.yaml` with the variables of your choice. Create the ConfigMap accordingly:
```
kubectl create configmap dca-yaml --from-file datadog-cluster.yaml

```

### Create the Cluster Agent and its service

Locate the following manifests, and replace `<DD_API_KEY>` with [your API key][4]:

* `Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`
* `Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`

Then, run:

`kubectl apply -f Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`

and

`kubectl apply -f Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`

### Verification

At this point, you should see:

```
-> kubectl get deploy
NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret
NAME                   TYPE                                  DATA      AGE
datadog-auth-token     Opaque                                1         1d

-> kubectl get pods -l app:datadog-cluster-agent
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app:datadog-cluster-agent
NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

### Configure RBAC permissions for node-based Agents

Review the manifest found at [`Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml`][5]. This limits an Agent's access to the kubelet API.

Run:

```
kubectl apply -f Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
```

### Enable the Datadog Cluster Agent

Add the following environment variables to the `Dockerfiles/manifests/agent.yaml`:

```yaml
    - name: DD_CLUSTER_AGENT_ENABLED
            value: 'true'
    - name: DD_CLUSTER_AGENT_AUTH_TOKEN
      valueFrom:
        secretKeyRef:
          name: datadog-auth-token
          key: token
#      value: "<ThirtyX2XcharactersXlongXtoken>" # If you are not using the secret, just set the string.
```

Create the DaemonSet with this command:
```
kubectl apply -f Dockerfiles/manifests/agent.yaml
```

### Final Verification

Run:

```
kubectl get pods | grep agent
```

You should see:

```
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

Kubernetes events are beginning to flow into your Datadog account, and relevant metrics collected by your Agents are tagged with their corresponding cluster-level metadata.

## Cluster Agent commands

The available commands for the Datadog Cluster Agents are:

| Command                                     | Description                                                                                                                                                                                                                                   |
|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog-cluster-agent status`              | Gives an overview of the components of the agent and their health.                                                                                                                                                                            |
| `datadog-cluster-agent metamap <NODE_NAME>` | Queries the local cache of the mapping between the pods living on `NODE_NAME`  and the cluster level metadata it's associated with (endpoints ...). Not specifying the `NODE_NAME` runs the mapper on all the nodes of the cluster.           |
| `datadog-cluster-agent flare <CASE_ID>`     | Similarly to the node agent, the cluster agent can aggregate the logs and the configurations used and forward an archive to the support team or be deflated and used locally. **Note** this command is run from within the Cluster Agent pod. |

## Custer Agent Options

The following environment variables are supported:

| Variable                                      | Description                                                                                                                                                                   |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                                  | Your [Datadog API key][4].                                                                                                                                                    |
| `DD_HOSTNAME`                                 | Hostname to use for the Datadog Cluster Agent.                                                                                                                                |
| `DD_CLUSTER_AGENT_CMD_PORT`                   | Port for the Datadog Cluster Agent to serve, default is `5005`.                                                                                                               |
| `DD_USE_METADATA_MAPPER`                      | Enables the cluster level metadata mapping, default is `true`.                                                                                                                |
| `DD_COLLECT_KUBERNETES_EVENTS`                | Configures the agent to collect Kubernetes events. Default to `false`. See the [Event collection section](#event-collection) for more details.                                |
| `DD_LEADER_ELECTION`                          | Activates the [leader election](#leader-election). You must set `DD_COLLECT_KUBERNETES_EVENTS` to `true` to activate this feature. Default value is `false`.                  |
| `DD_LEADER_LEASE_DURATION`                    | Used only if the leader election is activated. See the details [in the leader election section](#leader-election-lease). Value in seconds, 60 by default.                     |
| `DD_CLUSTER_AGENT_AUTH_TOKEN`                 | 32 characters long token that needs to be shared between the node agent and the Datadog Cluster Agent.                                                                        |
| `DD_KUBE_RESOURCES_NAMESPACE`                 | Configures the namespace where the Cluster Agent creates the configmaps required for the Leader Election, the Event Collection (optional) and the Horizontal Pod Autoscaling. |
| `DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       | Frequency in seconds to query the API Server to resync the local cache. The default is 5 minutes.                                                                             |
| `DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  | Timeout in seconds of the client communicating with the API Server. Default is 60 seconds.                                                                                    |
| `DD_EXPVAR_PORT`                              | Change the port for fetching [expvar][6] public variables from the Datadog Cluster Agent. The default is port is `5000`.                         |
| `DD_EXTERNAL_METRICS_BATCH_WINDOW`            | Time waited in seconds to process a batch of metrics from multiple Autoscalers. Default to 10 seconds.                                                                        |
| `DD_EXTERNAL_METRICS_MAX_AGE`                 | Maximum age in seconds of a datapoint before considering it invalid to be served. Default to 90 seconds.                                                                      |
| `DD_EXTERNAL_METRICS_AGGREGATOR`              | Aggregator for the Datadog metrics. Applies to all Autoscalers processed. Chose among `sum`/`avg`/`max`/`min`.                                                                |
| `DD_EXTERNAL_METRICS_BUCKET_SIZE`             | Size of the window in seconds used to query metric from Datadog. Default to 300 seconds.                                                                                      |
| `DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` | Rate to resync local cache of processed metrics with the global store. Useful when there are several replicas of the Cluster Agent.                                           |

## Feature Activation
### Event collection

In order to collect events, you need the following environment variables in your `datadog-agent.yaml` manifest:

```
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
```
Enabling the leader election ensures that only one agent collects the events.

#### Cluster metadata provider

In the Node Agent, set the environment variable `DD_CLUSTER_AGENT_ENABLED` to true.

The environment variable `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` can be set to specify how often the Node Agents hit the Datadog Cluster Agent.

Disable the Kubernetes metadata tag collection with `DD_KUBERNETES_COLLECT_METADATA_TAGS`.

#### Custom Metrics Server

The Datadog Cluster Agent implements the External Metrics Provider's interface (currently in beta). Therefore it can serve Custom Metrics to Kubernetes for Horizontal Pod Autoscalers. It is referred throughout the documentation as the Custom Metrics Server, per Kubernetes' terminology.

To enable the Custom Metrics Server:

1. Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` to `true` in the Deployment of the Datadog Cluster Agent.
2. Configure the `<DD_APP_KEY>` as well as the `<DD_API_KEY>` in the Deployment of the Datadog Cluster Agent.
3. Create a [service exposing the port 443][7] and [register it as an APIService for External Metrics][8].

Refer to [the dedicated Custom metrics server guide][1] to configure the Custom Metrics Server and get more details about this feature.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent/rbac
[3]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/dca-secret.yaml
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
[6]: https://golang.org/pkg/expvar
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/cluster-agent-hpa-svc.yaml
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
