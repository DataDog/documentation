---
title: Troubleshooting Admission Controller
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/"
  tag: "Blog"
  text: "Auto Instrument Kubernetes Tracing"
- link: "/containers/cluster_agent/admission_controller/"
  tag: "Documentation"
  text: "Cluster Agent Admission Controller"
- link: "/tracing/trace_collection/library_injection_local/?tab=kubernetes"
  tag: "Documentation"
  text: "Kubernetes Library Injection"
---

The [Cluster Agent's Admission Controller][1] feature helps setup APM in Kubernetes between [Library Injection][2], APM Configuration, and Unified Service Tagging. The document below can help diagnose common problems with the Admission Controller setup and networking requirements. 

## Common problems

### Order
The Admission Controller responds to the creation of new pods within your Kubernetes cluster. More specifically the Cluster Agent receives a request from Kubernetes at pod creation, and responds with the details of what changes to make to the pod. 

This does mean that the Admission Controller does not mutate existing pods within your cluster. If you have recently enabled the Admission Controller or made other environmental changes, you can delete your existing pod and let Kubernetes re-create it to verify if the Admission Controller has updated your pod. 

### Labels and Annotations
The Cluster Agent responds to labels and annotations on the created pod, not the workload (Deployment, DaemonSet, CronJob, etc) that created that pod. Be sure to double check that your pod template references this accordingly. For example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)  
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

## Review cluster agent logs and status

### Admission controller status
The Cluster Agent's status output provides information to verify that it has created the `datadog-webhook` for the `MutatingWebhookConfiguration` and has a valid certificate.

```
% kubectl exec -it <Cluster Agent Pod> -- agent status
...
Admission Controller
====================
  
    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags
  
    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

The above output is relative to the Cluster Agent deployed in the `default` namespace. The Service and Secret should match your corresponding namespace.

### Admission controller logs

It can be helpful to [enable debug logging][3] for the Cluster Agent, especially at startup to validate it has setup the Admission Controller properly. With debug logging you would see logs like:

#### Discovery of datadog-webhook
```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

If you are not seeing that the `datadog-webhook` has been reconciled successfully, double check that you have enabled the Admission Controller correctly relative to the [provided configurations][1]. 

#### Processing a sample pod

```
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

The Cluster Agent will print debug logs when it is working with a given pod. If you are seeing errors with the injection for a given pod reach out to Datadog support with your Datadog configuration as well as your pod configuration. 

If you are not seeing the injection attempts for *any pod* first double check your `mutateUnlabelled` settings and that your pod labels match up with the expected value. If these match up the issue is more likely with the networking between the Control Plane, Webhook, and Service.

## Networking

### Network policies

### Kubernetes distributions

#### EKS

#### AKS

#### GKE

#### OpenShift

#### Rancher

[1]: /containers/cluster_agent/admission_controller
[2]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[3]: /agent/troubleshooting/debug_mode/