---
title: Continuous Tracing with GPU Monitoring
is_beta: true
private: true
description: Enable GPU activity tracing for selected Kubernetes workloads.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring"
  tag: "What is GPU Monitoring?"
  text: "Learn more about what GPU Monitoring offers"
---

{{< beta-callout url="#" btn_hidden="true" >}}
Continuous tracing with GPU Monitoring is in Early Access Preview. 
{{< /beta-callout >}}

## Overview

Continuous tracing with GPU Monitoring enables lightweight GPU activity tracing for selected Kubernetes workloads. Troubleshooting large, distributed workloads can be cumbersome and time-consuming. With this tracing capability in GPU Monitoring, you can quickly identify and dive into bottlenecks with detailed execution traces which directly tie CUDA, NCCL operations back to your actual model and Pytorch operations.

[INSERT IMAGE HERE] 

## Setup
### Prerequisites

To begin continuously tracing your workloads, you must first meet the following critieria: 
- You are running the Datadog Cluster Agent version 7.80+ with GPU Monitoring enabled[1]
- Minimum required CUDA and CUPTI version: 13

1. Configure GPU Tracing
Merge the following configuration into the existing `DatadogAgent` resource:

```yaml
spec:
  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceVersions:
              c: "0.20.0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
```

Apply the configuration and wait for the `DatadogAgent` rollout to complete.

2. Label the GPU workload
Add the label to the controller's pod template. The workload must be outside the Agent namespace. For Jobs, use `spec.template.metadata.labels`. For KubeRay, label the head and worker pod template:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Apply the resource and wait for the rollout to complete.

3. Verify setup

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**No setup containers?** Confirm the label is on the pod template, the pod is new, and the workload is outside the Agent namespace. Then check the Cluster Agent logs.

4. Explore traces

Run the workload, then query [APM Trace Explorer][2] with:

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

Open a trace to see the flame graph, which correlates CPU spans with GPU stream activity, such as CUDA kernels and NCCL collective operations:

{{< img src="gpu_monitoring/gpu-tracing.png" alt="Flame graph view of a torch.step trace, showing CPU spans aligned with GPU stream activity, including NCCL allgather operations and CUDA kernel launches." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: /tracing/trace_explorer/
