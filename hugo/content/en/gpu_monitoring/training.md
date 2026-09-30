---
title: Optimize Training Workloads with GPU Monitoring
is_beta: true
private: true
description: Troubleshoot stalled or failed training runs and maximize the throughput of your training workloads.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring/tracing"
  tag: "Documentation"
  text: "Continuous Tracing with GPU Monitoring"
- link: "/gpu_monitoring"
  tag: "What is GPU Monitoring?"
  text: "Learn more about what GPU Monitoring offers"
---

{{< beta-callout url="#" btn_hidden="true" >}}
Optimizing training workloads with GPU Monitoring is in Preview.
{{< /beta-callout >}}

## Overview

Training workloads can fail often and cost hundreds of thousands of dollars. Debugging large, distributed training workloads can be time-consuming for your MLOps, platform, and ML engineering teams. The Training Optimization page in GPU Monitoring helps you troubleshoot stalled and failed workloads and maximize the overall throughput of your training runs. It provides full-stack visibility and insights across your AI stack, tying your training runs to the corresponding hardware health and network interconnectivity layers.

With the Training Optimization page, you get:

1. **Agentic root-cause analysis for stalled or failed training workloads**: Pinpoint why training workloads are failing or slowing down, whether the issue resides in unhealthy hardware, communication, memory bandwidth, or scheduling.
2. **Training run performance optimization**: Identify the highest-impact opportunities to increase throughput in successful training runs.

## Setup

### Prerequisites

To begin monitoring your training workloads, you must first meet the following criteria:
- You are running the Datadog Cluster Agent version 7.80 or later with [GPU Monitoring enabled][1].
- Minimum required CUDA and CUPTI version: 13.

### 1. Configure GPU tracing

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

### 2. Label the training workload

Add the label to the controller's pod template. The workload must be outside the Agent namespace. For Jobs, use `spec.template.metadata.labels`. For KubeRay, label the head and worker pod template:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Apply the resource and wait for the rollout to complete.

### 3. Verify setup

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**No setup containers?** Confirm the label is on the pod template, the pod is new, and the workload is outside the Agent namespace. Then check the Cluster Agent logs.

### 4. Explore your training runs

Run the training workload, then open the Training page in [GPU Monitoring][2] to view the status of your training runs and investigate any flagged issues.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: https://app.datadoghq.com/gpu-monitoring
