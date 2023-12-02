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

### Admission controller logs

## Networking

### Network policies

### Kubernetes distributions

#### EKS

#### AKS

#### GKE

#### OpenShift

#### Rancher

[1]: /containers/cluster_agent/admission_controller
[2]: /tracing/trace_collection/library_injection_local/?tab=kubernetes"
