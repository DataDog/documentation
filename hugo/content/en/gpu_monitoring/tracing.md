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

{{< callout url="#" btn_hidden="true" >}}
Continuous tracing with GPU Monitoring is in Early Access Preview.
{{< /callout >}}

## Overview

Continuous tracing with GPU Monitoring enables lightweight GPU activity tracing for selected Kubernetes workloads. Troubleshooting large, distributed workloads can be cumbersome and time-consuming. With this tracing capability in GPU Monitoring, you can identify and investigate bottlenecks using detailed execution traces that tie CUDA and NCCL operations back to your model and PyTorch operations.

{{< img src="gpu_monitoring/gpu-tracing.png" alt="Flame graph view of a torch.step trace, showing CPU spans aligned with GPU stream activity, including NCCL allgather operations and CUDA kernel launches." style="width:100%;" >}}

## Setup

### Prerequisites

To begin continuously tracing your workloads, you must first meet the following criteria:
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
              c: "0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
```

Apply the configuration and wait for the `DatadogAgent` rollout to complete.

### 2. Label the GPU workload

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

### 4. Explore traces

Run the workload, then query [APM Trace Explorer][2] with:

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## Connect training runs to GPU hardware

If your Kubernetes workloads use labels or annotations to identify a training run or a group of runs, you can add those identifiers as tags on GPU metrics and spans. These tags tie training run data directly to the GPU hardware it ran on.

The following examples use the `company.name/run-id` and `company.name/group-id` pod annotations. Replace them with the annotations your workloads use.

For metrics, use [tag extraction][3] to map the annotations to tags. Merge the following configuration into the existing `DatadogAgent` resource:

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

For traces, add `DD_TRAINING_RUN_ID` and `DD_TRAINING_GROUP_ID` to the `ddTraceConfigs` block in [Step 1: Configure GPU tracing](#1-configure-gpu-tracing). Set each variable from the same annotations:

```yaml
ddTraceConfigs:
  - name: DD_INJECT_NATIVE
    value: "always"
  - name: DD_TRACE_HOOK_MODULES
    value: "gpu"
  - name: DD_TRAINING_RUN_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.annotations['company.name/run-id']
  - name: DD_TRAINING_GROUP_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.annotations['company.name/group-id']
```

To use pod labels instead of annotations, set `kubernetesResourcesLabelsAsTags` for metrics, and set `fieldPath` to `metadata.labels['<LABEL_KEY>']` for traces.

After you apply the configuration, GPU metrics are tagged with `training_run_id` and `training_group_id`, and spans are tagged with `training.run_id` and `training.group_id`. Use these tags to filter GPU metrics and traces for the same training run.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: /tracing/trace_explorer/
[3]: /containers/kubernetes/tag/?tab=datadogoperator#tag-extraction
