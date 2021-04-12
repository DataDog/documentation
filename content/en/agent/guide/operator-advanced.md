---
title: Advanced setup for Datadog Operator
kind: faq
further_reading:
  - link: 'agent/kubernetes/log'
    tag: 'Documentation'
    text: 'Datadog and Kubernetes'
---

<div class="alert alert-warning">The Datadog Operator is in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.</div>

[The Datadog Operator][1] is a way to deploy the Datadog Agent on Kubernetes and OpenShift. It reports deployment status, health, and errors in its Custom Resource status, and it limits the risk of misconfiguration thanks to higher-level configuration options.

## Prerequisites

Using the Datadog Operator requires the following prerequisites:

- **Kubernetes Cluster version >= v1.14.X**: Tests were done on versions >= `1.14.0`. Still, it should work on versions `>= v1.11.0`. For earlier versions, because of limited CRD support, the Operator may not work as expected.
- [`Helm`][2] for deploying the `datadog-operator`.
- [`Kubectl` CLI][3] for installing the `datadog-agent`.

## Deploy the Datadog Operator

To use the Datadog Operator, deploy it in your Kubernetes cluster. Then create a `DatadogAgent` Kubernetes resource that contains the Datadog deployment configuration:

1. Add the Datadog Helm repo:
  ```
  helm repo add datadog https://helm.datadoghq.com
  ```

2. Install the Datadog Operator:
  ```
  helm install my-datadog-operator datadog/datadog-operator
  ```
  
## Deploy the Datadog Agents with the Operator

After deploying the Datadog Operator, create the `DatadogAgent` resource that triggers the Datadog Agent's deployment in your Kubernetes cluster. By creating this resource in the `Datadog-Operator` namespace, the Agent is deployed as a `DaemonSet` on every `Node` of your cluster.

Create the `datadog-agent.yaml` manifest out of one of the following templates:

* [Manifest with Logs, APM, process, and metrics collection enabled.][4]
* [Manifest with Logs, APM, and metrics collection enabled.][5]
* [Manifest with Logs and metrics collection enabled.][6]
* [Manifest with APM and metrics collection enabled.][7]
* [Manifest with Cluster Agent.][8]
* [Manifest with tolerations.][9]

Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][10], then trigger the Agent installation with the following command:

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog created
```

You can check the state of the `DatadogAgent` ressource with:

```shell
kubectl get -n $DD_NAMESPACE dd datadog
NAME            ACTIVE   AGENT             CLUSTER-AGENT   CLUSTER-CHECKS-RUNNER   AGE
datadog-agent   True     Running (2/2/2)                                           110m
```

In a 2-worker-nodes cluster, you should see the Agent pods created on each node.

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get -n $DD_NAMESPACE pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```


## Cleanup

The following command deletes all the Kubernetes resources created by the above instructions:

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

### Tolerations

Update your `datadog-agent.yaml` file with the following configuration to add the toleration in the `Daemonset.spec.template` of your `DaemonSet` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: "<DATADOG_API_KEY>"
    appKey: "<DATADOG_APP_KEY>"
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    config:
      tolerations:
       - operator: Exists
```

Apply this new configuration:

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

The DaemonSet update can be validated by looking at the new desired pod value:

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs-apm.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-apm.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[10]: https://app.datadoghq.com/account/settings#api
