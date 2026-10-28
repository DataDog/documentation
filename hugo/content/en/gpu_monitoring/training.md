---
title: Optimize Training Workloads with GPU Monitoring
description: Troubleshoot stalled or failed training runs and maximize the throughput of your training workloads.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring/tracing"
  tag: "Documentation"
  text: "Continuous Tracing with GPU Monitoring"
- link: "/integrations/slurm/"
  tag: "Documentation"
  text: "Slurm integration"
- link: "/gpu_monitoring"
  tag: "Documentation"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-training-obs/" >}}
Optimizing training workloads with GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Training workloads often fail, and each failure wastes expensive GPU time. Debugging large, distributed training workloads can be time-consuming for your MLOps, platform, and ML engineering teams. The Training page in GPU Monitoring helps you troubleshoot stalled and failed workloads and maximize the overall throughput of your training runs. The page ties each training run to the health of the GPU hardware and network interconnect it ran on.

With the Training page, you get:

- **Agentic root-cause analysis for stalled or failed training workloads**: Pinpoint why training workloads are failing or slowing down, whether the cause is unhealthy hardware, communication, memory bandwidth, or scheduling.
- **Training run performance optimization**: Identify the highest-impact opportunities to increase throughput in successful training runs.

{{< img src="gpu_monitoring/training-page.png" alt="Training page in GPU Monitoring showing training run insights, a bar graph of runs over time, and a list of training runs." style="width:100%;" >}}

## Setup

Select the tab that matches your environment:

{{< tabs >}}
{{% tab "Kubernetes" %}}

### Prerequisites

To begin monitoring your training workloads, you must first meet the following criteria:
- You have [GPU Monitoring enabled][1].
- You are running CUDA and CUDA Profiling Tools Interface (CUPTI) version 13 or later.

### 0. Enable GPU Monitoring

If you haven't already, [set up GPU Monitoring][1] on your GPU hosts before moving to the next step.

### 1. Connect training runs to GPU hardware

Your Kubernetes workloads may have labels or annotations that identify a training run or a group of runs. In this step, you add those identifiers to GPU metrics as tags, which ties training run data directly to the GPU hardware it ran on. Step 2 adds the same identifiers to traces.

The following examples use the `company.name/run-id` and `company.name/group-id` pod annotations. Replace them with the annotations your workloads use.

For metrics, use [tag extraction][2] to map the annotations to tags. Merge the following configuration into the existing `DatadogAgent` resource:

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

To use pod labels instead of annotations, use `kubernetesResourcesLabelsAsTags` for metrics.

After you apply this configuration, GPU metrics are tagged with `training_run_id` and `training_group_id`.

### 2. Configure GPU tracing

To enable GPU tracing and add the training run and group identifiers to traces, merge the following configuration into the existing DatadogAgent resource:

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
              - name: DD_TRAINING_RUN_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/run-id']
              - name: DD_TRAINING_GROUP_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/group-id']
```

To use pod labels instead of annotations, set `metadata.labels['<LABEL_KEY>']` as the `fieldPath` for traces.

Apply the configuration and wait for the `DatadogAgent` rollout to complete. With this configuration, traces from the workloads you label in the [Label the GPU workload](#3-label-the-gpu-workload) step are tagged with `training.run_id` and `training.group_id`.

### 3. Label the GPU workload

Add the `admission.datadoghq.com/gpu.enabled: "true"` label to the pod template of your workload's controller, such as a Job. The workload must run outside the namespace where the Agent is deployed. For Jobs, add the label under `spec.template.metadata.labels`:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Apply the resource and wait for the rollout to complete.

### 4. Verify setup

Run the following commands against a newly created GPU pod to confirm the setup:

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**No setup containers?** Confirm the label is on the pod template, the pod was created after you applied the configuration, and the workload runs outside the Agent namespace. Then check the Cluster Agent logs.

After you complete setup, GPU metrics are tagged with `training_run_id` and `training_group_id`, and traces are tagged with `training.run_id` and `training.group_id`. Use these tags to filter GPU metrics and traces for the same training run.

[1]: /gpu_monitoring/setup
[2]: /containers/kubernetes/tag/?tab=datadogoperator#tag-extraction

{{% /tab %}}
{{% tab "Slurm" %}}

### Prerequisites

To begin monitoring your Slurm training jobs, you must first meet the following criteria:
- You have [GPU Monitoring enabled][1].
- You are running CUDA and CUDA Profiling Tools Interface (CUPTI) version 13 or later.

### 0. Enable GPU Monitoring

If you haven't already, [set up GPU Monitoring][1] on your GPU hosts before moving to the next step.

### 1. Install the Agent with Single Step Instrumentation

On each Slurm compute node, install the Datadog Agent with [Single Step Instrumentation][2] enabled for the host and the Datadog C SDK:

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

### 4. Verify setup

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
