---
title: Custom Metrics Server for the Cluster Agent
kind: guide
further_reading:
- link: "/agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Datadog Cluster Agent"
---

## Introduction

Kubernetes v1.2 introduced [Horizontal Pod Autoscaling][1]. Kubernetes v1.6 introduced autoscaling off of custom metrics that are user-defined and are collected from within the cluster. Kubernetes v1.10 introduced support for external metrics so that users can autoscale off of any metric from outside the cluster that is collected for you by Datadog. The custom and external metric providers, as opposed to the metrics server, are resources that have to be implemented and registered by the user. As of v1.0.0, the Custom Metrics Server in the [Datadog Cluster Agent][2] implements the External Metrics Provider interface for external metrics.

This guide explains how to set up and autoscale your Kubernetes workload based off of your Datadog metrics.

## Requirements

1. Run Kubernetes >v1.10 to be able to register the External Metrics Provider resource against the API Server.
2. Enable the Aggregation layer. Refer to the [Kubernetes aggregation layer configuration documentation][3] to learn how to enable it.

## Walkthrough

### Preliminary disclaimer

Autoscaling over external metrics does not require the Node Agent to be running — you only need the metrics to be available in your Datadog account. Nevertheless, this guide describes autoscaling an NGINX deployment based on NGINX metrics, collected by a Node Agent.

The following assumptions are made:

1. You have Node Agents running (ideally from a DaemonSet) with the [Autodiscovery][4] process enabled and functional.
2. [Optional] Configure your Agents to securely communicate with the Datadog Cluster Agent to enable the enrichment of the metadata collected by the Node Agents. For more information, see [the security premise section][5].

### Spinning up the Datadog Cluster Agent

To spin up the [Datadog Cluster Agent][6], perform the following steps:

1. Create appropriate RBAC rules. The Datadog Cluster Agent acts as a proxy between the API Server and the Node Agent, and it needs to have access to some cluster-level resources.

    `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-rbac.yaml"`

    Which should produce the following output:

    ```
    clusterrole.rbac.authorization.k8s.io "datadog-cluster-agent" created
    clusterrolebinding.rbac.authorization.k8s.io "datadog-cluster-agent" created
    serviceaccount "datadog-cluster-agent" created
    ```

2. Create the Datadog Cluster Agent and its services. Add your `<API_KEY>` and `<APP_KEY>` in the Deployment manifest of the Datadog Cluster Agent.

3. Enable HPA processing by setting the `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` variable to `true`.

4. Spin up the resources:
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/cluster-agent-hpa-svc.yaml"`
  * `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml"`

**Note**: The first service is used for the communication between the Node Agents and the Datadog Cluster Agent, but the second is used by Kubernetes to register the External Metrics Provider.

At this point, you should see:

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          28m

SVCS:

NAMESPACE     NAME                            TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       datadog-custom-metrics-server   ClusterIP   192.168.254.87    <none>        443/TCP         28m
default       datadog-cluster-agent           ClusterIP   192.168.254.197   <none>        5005/TCP        28m

```

### External metrics provider

Once the Datadog Cluster Agent is up and running, register it as an External Metrics Provider with the service, exposing the port `443`. To do so, apply the following RBAC rules:

`kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/rbac-hpa.yaml"`

Which should produce the following results:

```text
clusterrolebinding.rbac.authorization.k8s.io "system:auth-delegator" created
rolebinding.rbac.authorization.k8s.io "dca" created
apiservice.apiregistration.k8s.io "v1beta1.external.metrics.k8s.io" created
clusterrole.rbac.authorization.k8s.io "external-metrics-reader" created
clusterrolebinding.rbac.authorization.k8s.io "external-metrics-reader" created
```

Once you have the Datadog Cluster Agent running and the service registered, create an HPA manifest and let the Datadog Cluster Agent pull metrics from Datadog.

## Running the HPA

At this point, you should see:

```text
PODS

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-agent-4c5pp                      1/1       Running   0          14m
default       datadog-agent-ww2da                      1/1       Running   0          14m
default       datadog-agent-2qqd3                      1/1       Running   0          14m
[...]
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          16m
```

Now, create a Horizontal Pod Autoscaler manifest. If you take a look at [the hpa-manifest.yaml file][7], you see that:

* The HPA is configured to autoscale the deployment called `nginx`.
* The maximum number of replicas created is `5` and the minimum is `1`.
* The metric used is `nginx.net.request_per_s`, and the scope is `kube_container_name: nginx`. This metric format corresponds to the Datadog one.

Every 30 seconds, Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary.
For advanced use cases, it is possible to have several metrics in the same HPA, as you can see [in the Kubernetes horizontal pod autoscale documentation][8]. The largest of the proposed values is the one chosen.

1. Create the NGINX deployment:
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/nginx.yaml"`

2. Then, apply the HPA manifest.
  `kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml"`

You should be seeing your NGINX pod running with the corresponding service:

```text
POD:

default       nginx-6757dd8769-5xzp2                   1/1       Running   0          3m

SVC:

NAMESPACE     NAME                  TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       nginx                 ClusterIP   192.168.251.36    none          8090/TCP        3m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   0/9 (avg)       1         3         1        3m

```

### Stressing your service

At this point, the setup is ready to be stressed.
As a result of the stress, Kubernetes autoscales the NGINX pods.

Curl the IP of the NGINX service as follows:

`curl <nginx_svc>:8090/nginx_status`

You should receive output resembling:

```shell
$ curl 192.168.254.216:8090/nginx_status

Active connections: 1
server accepts handled requests
 1 1 1
Reading: 0 Writing: 1 Waiting: 0
```

Behind the scenes, the number of requests per second also increased. This metric is being collected by the Node Agent, using Autodiscovery detecting the NGINX pod through its annotations. For more information on how Autodiscovery works, see the [Autodiscovery documentation][9]. So, if you stress it, you should see the uptick in your Datadog app. As you reference this metric in your HPA manifest, the Datadog Cluster Agent is also pulling the latest value regularly. Then, as Kubernetes queries the Datadog Cluster Agent to get this value, it notices that the number is going above the threshold and autoscales accordingly.

To do this, run: `while true; do curl <nginx_svc>:8090/nginx_status; sleep 0.1; done`

You should soon see the number of requests per second spiking and going above 9, the threshold over which the NGINX pods autoscale.
Then, you should see new NGINX pods being created:

```text
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          9m
default       nginx-6757dd8769-5xzp2                   1/1       Running   0          2m
default       nginx-6757dd8769-k6h6x                   1/1       Running   0          2m
default       nginx-6757dd8769-vzd5b                   1/1       Running   0          29m

HPAS:

NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   30/9 (avg)     1         3         3         29m

```

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: /agent/cluster_agent/
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: /agent/kubernetes/integrations/
[5]: /agent/cluster_agent/setup/
[6]: /agent/kubernetes/cluster/
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/hpa-example/hpa-manifest.yaml
[8]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[9]: /agent/kubernetes/#template-source-kubernetes-pod-annotations
