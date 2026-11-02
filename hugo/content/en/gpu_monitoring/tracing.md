---
title: Continuous Tracing with GPU Monitoring
is_beta: true
private: true
description: Enable GPU activity tracing for selected Kubernetes workloads and Slurm batch jobs.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring"
  tag: "What is GPU Monitoring?"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-inference/" >}}
Continuous tracing with GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Continuous tracing with GPU Monitoring enables lightweight GPU activity tracing for selected Kubernetes workloads and Slurm batch jobs. Troubleshooting large, distributed workloads can be cumbersome and time-consuming. With this tracing capability in GPU Monitoring, you can identify and investigate bottlenecks using detailed execution traces that tie CUDA and NCCL operations back to your model and PyTorch operations.

{{< img src="gpu_monitoring/gpu-tracing.png" alt="Flame graph view of a torch.step trace, showing CPU spans aligned with GPU stream activity, including NCCL allgather operations and CUDA kernel launches." style="width:100%;" >}}

## Setup

Select the tab that matches your environment:

{{< tabs >}}
{{% tab "Kubernetes" %}}

### Prerequisites

To begin continuously tracing your workloads, you must first meet the following criteria:
- You are running the Datadog Cluster Agent version 7.80 or later with [GPU Monitoring enabled][1].

### 1. Configure GPU tracing

In both configurations, the `ddTraceVersions.c` setting installs the Datadog C SDK, the native SDK that GPU tracing uses to capture CUDA and NCCL activity.

**Datadog Operator**: Merge the following configuration into the existing `DatadogAgent` resource:

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

**Helm**: Merge the following configuration into your existing `datadog-values.yaml` file:

```yaml
datadog:
  apm:
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

Upgrade your Helm release and wait for the rollout to complete:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

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

[1]: /gpu_monitoring/setup
[2]: /tracing/trace_explorer/

{{% /tab %}}
{{% tab "Slurm" %}}

### Prerequisites

To begin continuously tracing your Slurm jobs, you must have [GPU Monitoring enabled][1].

### 1. Install the Agent with Single Step Instrumentation

On each Slurm compute node, install the Datadog Agent with [Single Step Instrumentation][2] enabled. The following command enables Single Step Instrumentation for the host and installs the Datadog C SDK (`c:0`), the native SDK that GPU tracing uses to capture CUDA and NCCL activity from your jobs:

```shell
DD_API_KEY=<DATADOG_API_KEY> \
DD_SITE="<DATADOG_SITE>" \
DD_APM_INSTRUMENTATION_ENABLED=host \
DD_APM_INSTRUMENTATION_LIBRARIES=c:0 \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][3] and `<DATADOG_SITE>` with your [Datadog site][4].

### 2. Enable the Slurm integration

Set up the [Slurm integration][5] to collect metrics about your Slurm cluster, partitions, nodes, and jobs.

### 3. Configure your batch script

Add the following environment variables to your `sbatch` script:

```shell
export DD_SERVICE=${DD_SERVICE:-slurm-training}
export DD_ENV=${DD_ENV:-dev}
export DD_INJECT_NATIVE=always
export DD_TRACE_HOOK_MODULES=gpu
```

`DD_SERVICE` and `DD_ENV` default to `slurm-training` and `dev`. To use different values, set these variables before you submit the job, or change the defaults in the script.

For example:

```shell
#!/bin/bash
#SBATCH --job-name=training
#SBATCH --nodes=2
#SBATCH --gpus-per-node=8

export DD_SERVICE=${DD_SERVICE:-slurm-training}
export DD_ENV=${DD_ENV:-dev}
export DD_INJECT_NATIVE=always
export DD_TRACE_HOOK_MODULES=gpu

srun python train.py
```

### 4. Explore traces

Submit the job with `sbatch`, then query [APM Trace Explorer][6] with the service and environment you configured:

```
service:slurm-training env:dev
```

[1]: /gpu_monitoring/setup
[2]: /tracing/trace_collection/single-step-apm/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /getting_started/site/
[5]: /integrations/slurm/
[6]: /tracing/trace_explorer/

{{% /tab %}}
{{< /tabs >}}

## Connect training runs to GPU hardware

If your Kubernetes workloads use labels or annotations to identify a training run or a group of runs, you can add those identifiers as tags on GPU metrics and spans. These tags tie training run data directly to the GPU hardware it ran on.

The following examples use the `company.name/run-id` and `company.name/group-id` pod annotations. Replace them with the annotations your workloads use.

For metrics, use [tag extraction][1] to map the annotations to tags:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Merge the following configuration into the existing `DatadogAgent` resource:

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

{{% /tab %}}
{{% tab "Helm" %}}

Merge the following configuration into your existing `datadog-values.yaml` file:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      company.name/run-id: training_run_id
      company.name/group-id: training_group_id
```

{{% /tab %}}
{{< /tabs >}}

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

[1]: /containers/kubernetes/tag/#tag-extraction
