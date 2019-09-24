---
title: Datadog Cluster Agent Setup
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/autodiscovery/clusterchecks"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
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

To setup the Datadog Cluster Agent on your Kubernetes cluster, follow the instructions below:

## Configure RBAC permissions for the Cluster Agent

1. Review the manifests in the [Datadog Cluster Agent RBAC folder][1].

2. Enter the `datadog-agent` directory, and run:

  ```
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
  ```

  This creates the appropriate ServiceAccount, ClusterRole, and ClusterRoleBinding.

### Secure Cluster-Agent-to-Agent Communication

Secure communication between the Agent and the Cluster Agent by creating a secret.

Run:

```
echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
```

Use this string in the `dca-secret.yaml` file located in the [`manifest/cluster-agent` directory][2].

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

Locate the following manifests, and replace `<DD_API_KEY>` with [your API key][3]:

* [`Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`][4]
* [`Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`][5]

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

-> kubectl get pods -l app=datadog-cluster-agent
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent
NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

### Configure RBAC permissions for node-based Agents

Review the manifest found at [`Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml`][6]. This limits an Agent's access to the kubelet API.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent/rbac
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/dca-secret.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/cluster-agent.yaml
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
