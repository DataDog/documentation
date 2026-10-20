---
title: Continuous Tracing with GPU Monitoring on Slurm
is_beta: true
private: true
description: Enable GPU activity tracing for Slurm batch jobs.
further_reading:
- link: "/gpu_monitoring/tracing"
  tag: "Documentation"
  text: "Continuous Tracing with GPU Monitoring on Kubernetes"
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/integrations/slurm/"
  tag: "Documentation"
  text: "Slurm integration"
---

{{< callout url="#" btn_hidden="true" >}}
Continuous tracing with GPU Monitoring is in Early Access Preview.
{{< /callout >}}

## Overview

Continuous tracing with GPU Monitoring enables lightweight GPU activity tracing for Slurm batch jobs. Use the detailed execution traces to tie CUDA and NCCL operations back to your model and PyTorch operations, and to identify bottlenecks in distributed training jobs.

To trace Kubernetes workloads instead, see [Continuous Tracing with GPU Monitoring][1].

## Setup

### Prerequisites

To begin continuously tracing your Slurm jobs, you must first meet the following criteria:
- Your Slurm compute nodes meet the [GPU Monitoring prerequisites][2].
- Minimum required CUDA and CUPTI version: 13.

### 1. Install the Agent with Single Step Instrumentation

On each Slurm compute node, install the Datadog Agent with [Single Step Instrumentation][3] enabled for the host and the C tracing library:

```shell
DD_API_KEY=<DATADOG_API_KEY> \
DD_SITE="<DATADOG_SITE>" \
DD_APM_INSTRUMENTATION_ENABLED=host \
DD_APM_INSTRUMENTATION_LIBRARIES=c:0 \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][4] and `<DATADOG_SITE>` with your [Datadog site][5].

### 2. Enable the Slurm integration

Set up the [Slurm integration][6] to collect metrics about your Slurm cluster, partitions, nodes, and jobs.

### 3. Enable GPU Monitoring

On each Slurm compute node, follow the [Linux (non-containerized) setup instructions][7] to enable GPU Monitoring in the Agent and system-probe.

### 4. Configure your batch script

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

### 5. Explore traces

Submit the job with `sbatch`, then query [APM Trace Explorer][8] with the service and environment you configured:

```
service:slurm-training env:dev
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/tracing
[2]: /gpu_monitoring/setup/#prerequisites
[3]: /tracing/trace_collection/single-step-apm/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site/
[6]: /integrations/slurm/
[7]: /gpu_monitoring/setup/?tab=linuxnoncontainerized#set-up-gpu-monitoring-on-a-non-kubernetes-environment-or-uniform-kubernetes-cluster
[8]: /tracing/trace_explorer/
