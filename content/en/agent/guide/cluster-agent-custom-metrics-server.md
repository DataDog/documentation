---
title: Custom Metrics Server for the Cluster Agent
kind: guide
disable_toc: false
further_reading:
- link: "agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Datadog Cluster Agent"
---

## Introduction

Kubernetes v1.2 introduced [Horizontal Pod Autoscaling][1]. This allows users to autoscale off of basic metrics like `CPU`—it requires a resource called `metrics-server` to run alongside your application.
As of Kubernetes v1.6, it is possible to autoscale off of [custom metrics][2].
Custom metrics are user defined and are collected from within the cluster.
Kubernetes v1.10 introduced support for external metrics, so that users can autoscale off of any metric from outside the cluster that is collected for you by Datadog.

The custom and external metric providers, as opposed to the metrics server, are resources that have to be implemented and registered by the user.

As of v1.0.0, the Custom Metrics Server in the Datadog Cluster Agent implements the External Metrics Provider interface for external metrics.
This guide explains how to set up and autoscale your Kubernetes workload based off of your Datadog metrics.

## Requirements

1. Running Kubernetes >v1.10 in order to be able to register the External Metrics Provider resource against the API Server.
2. Having the Aggregation layer enabled. Refer to the [Kubernetes aggregation layer configuration documentation][3] to learn how to enable it.

## Walkthrough

### Preliminary disclaimer

Autoscaling over external metrics does not require the Node Agent to be running—you only need the metrics to be available in your Datadog account. Nevertheless, this guide describes autoscaling an NGINX deployment based off of NGINX metrics, collected by a Node Agent.

The following assumptions are made:
1. You have Node Agents running (ideally from a DaemonSet) with the [Autodiscovery][8] process enabled and functional.
2. Agents are configured to securely communicate with the Datadog Cluster Agent. See [the security premise section][4] of the official documentation. This is not mandatory, but it enables the enrichment of the metadata collected by the Node Agents. 

### Spinning up the Datadog Cluster Agent

In order to spin up the [Datadog Cluster Agent][9], perform the following steps:

1. Create the appropriate RBAC rules. The Datadog Cluster Agent acts as a proxy between the API Server and the Node Agent, and to this extent it needs to have access to some cluster level resources.<br/>
  `kubectl apply -f Dockerfiles/manifests/cluster-agent/rbac/rbac-cluster-agent.yaml`<br/>
  ```
  clusterrole.rbac.authorization.k8s.io "dca" created
  clusterrolebinding.rbac.authorization.k8s.io "dca" created
  serviceaccount "dca" created
  ```

2. Create the Datadog Cluster Agent and its services. Add your `<API_KEY>` and `<APP_KEY>` in the Deployment manifest of the Datadog Cluster Agent.

3. Enable HPA processing by setting the `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` variable to `true`.

4. Spin up the resources:<br/>
  - `kubectl apply -f Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml`
  - `kubectl apply -f Dockerfiles/manifests/cluster-agent/hpa-example/cluster-agent-hpa-svc.yaml`
  - `kubectl apply -f Dockerfiles/manifests/cluster-agent/cluster-agent.yaml`

**Note**: the first service is used for the communication between the Node Agents and the Datadog Cluster Agent, but the second is used by Kubernetes to register the External Metrics Provider.

At this point, you should see:

```
PODS:

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          28m

SVCS:

NAMESPACE     NAME                            TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)         AGE
default       datadog-custom-metrics-server   ClusterIP   192.168.254.87    <none>        443/TCP         28m
default       datadog-cluster-agent           ClusterIP   192.168.254.197   <none>        5005/TCP        28m

```

### Register the External Metrics Provider

Once the Datadog Cluster Agent is up and running, register it as an External Metrics Provider via the service exposing the port `443`.

To do so, apply the following RBAC rules:

`kubectl apply -f Dockerfiles/manifests/hpa-example/rbac-hpa.yaml`

```
clusterrolebinding.rbac.authorization.k8s.io "system:auth-delegator" created
rolebinding.rbac.authorization.k8s.io "dca" created
apiservice.apiregistration.k8s.io "v1beta1.external.metrics.k8s.io" created
clusterrole.rbac.authorization.k8s.io "external-metrics-reader" created
clusterrolebinding.rbac.authorization.k8s.io "external-metrics-reader" created
```
 
Once you have the Datadog Cluster Agent running and the service registered, create an HPA manifest and let the Datadog Cluster Agent pull metrics from Datadog.

## Running the HPA

At this point, you should see:

```
PODS

NAMESPACE     NAME                                     READY     STATUS    RESTARTS   AGE
default       datadog-agent-4c5pp                      1/1       Running   0          14m
default       datadog-agent-ww2da                      1/1       Running   0          14m
default       datadog-agent-2qqd3                      1/1       Running   0          14m
[...]
default       datadog-cluster-agent-7b7f6d5547-cmdtc   1/1       Running   0          16m
```

Now, create a Horizontal Pod Autoscaler manifest. If you take a look at [the hpa-manifest.yaml file][5], you see that:

* The HPA is configured to autoscale the deployment called `nginx`
* The maximum number of replicas created is `5` and the minimum is `1`
* The metric used is `nginx.net.request_per_s` and the scope is `kube_container_name: nginx`. Note that this metric format corresponds to the Datadog one.

Every 30 seconds, Kubernetes queries the Datadog Cluster Agent to get the value of this metric and autoscales proportionally if necessary.
For advanced use cases, it is possible to have several metrics in the same HPA, as you can see [in the Kubernetes horizontal pod autoscale documentation][6]. The largest of the proposed values is the one chosen.

1. Create the NGINX deployment:
  `kubectl apply -f Dockerfiles/manifests/cluster-agent/hpa-example/nginx.yaml`

2. Then, apply the HPA manifest.
  `kubectl apply -f Dockerfiles/manifests/cluster-agent/hpa-example/hpa-manifest.yaml`

You should be seeing your NGINX pod running with the corresponding service:

```
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

```
$ curl 192.168.254.216:8090/nginx_status

Active connections: 1 
server accepts handled requests
 1 1 1 
Reading: 0 Writing: 1 Waiting: 0 
```

Behind the scenes, the number of requests per second also increased. 
This metric is being collected by the Node Agent, as it Autodiscovered the NGINX pod through its annotations. For more information on how Autodiscovery works, see the [Autodiscovery documentation][7].
Therefore, if you stress it, you should see the uptick in your Datadog app.
As you referenced this metric in your HPA manifest, the Datadog Cluster Agent is also pulling its latest value regularly.
Then, as Kubernetes queries the Datadog Cluster Agent to get this value, it notices that the number is going above the threshold and autoscales accordingly.

To do this, run: `while true; do curl <nginx_svc>:8090/nginx_status; sleep 0.1; done`

You should soon see the number of requests per second spiking and going above 9, the threshold over which the NGINX pods autoscale.
Then, you should see new NGINX pods being created:

```
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


### Troubleshooting

* Make sure you have the aggregation layer and the certificates set up as per the requirements section.
* Always make sure the metrics you want to autoscale on are available.
* As you create the HPA, the Datadog Cluster Agent parses the manifest and queries Datadog to try to fetch the metric.
* If there is a typographic issue with your metric name or if the metric does not exist within your Datadog application, the following error is raised:<br/>
	```
	2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
	```

You can run the `datadog-cluster-agent status` command to see the status of the External Metrics Provider process:

```
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```
**Note**: Errors with the External Metrics Provider process are displayed with this command.
If you want a more verbose output, run the flare command:
`datadog-cluster-agent flare`.
The flare command generates a zip file containing a `custom-metrics-provider.log` which displays the following information:

```
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
    
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0
    
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456


```
 
If the metric's flag `Valid` is set to false, the metric is not considered in the HPA pipeline.

* If you see the following message when describing the HPA manifest:

```
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

Then it is likely that you do not have the proper RBAC set for the HPA.
Make sure that `kubectl api-versions` shows:

```
autoscaling/v2beta1
[...]
external.metrics.k8s.io/v1beta1 
```

The latter shows up if the Datadog Cluster Agent properly registers as an External Metrics Provider—and if you have the same service name referenced in the APIService for the External Metrics Provider, as well as the one for the Datadog Cluster Agent on port 443.
Also, make sure you have created the RBAC from the "Register the External Metrics Provider" step.

* If you see the following error when describing the HPA manifest:

```
  Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Make sure the Datadog Cluster Agent is running, and the service exposing the port 443 (whose name is registered in the APIService) is up.

* If you are not seeing the same value in Datadog and in Kubernetes:

As Kubernetes autoscales your resources, the current target is weighted by the number of replicas of the scaled Deployment.
Therefore, value returned by the Datadog Cluster Agent is fetched from Datadog and should be proportionally equal to the current target, multiplied by the number of replicas. 
Example:

```
    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - app: puppet
    - env: demo
    metricName: nginx.net.request_per_s
    ts: 1532042322
    valid: true
    value: 2472
``` 

2472 was fetched, but the HPA indicates:

```
NAMESPACE   NAME       REFERENCE          TARGETS       MINPODS   MAXPODS   REPLICAS   AGE
default     nginxext   Deployment/nginx   824/9 (avg)   1         3         3          41m
```

And indeed, 824 * 3 replicas = 2472.

*Disclaimer*: The Datadog Cluster Agent processes the metrics set in different HPA manifests and queries Datadog to get values every 30 seconds, by default. Kubernetes queries the Datadog Cluster Agent every 30 seconds, by default.
Both frequencies are configurable.
As this process is done asynchronously, you should not expect to see the above rule verified at all times, especially if the metric varies.

[1]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#before-you-begin
[2]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics
[3]: https://kubernetes.io/docs/tasks/access-kubernetes-api/configure-aggregation-layer
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/cluster-agent/README.md#security-premise
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/hpa-manifest.yaml
[6]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-multiple-metrics
[7]: /agent/autodiscovery/#template-source-kubernetes-pod-annotations
[8]: /agent/autodiscovery
[9]: /agent/kubernetes/cluster
