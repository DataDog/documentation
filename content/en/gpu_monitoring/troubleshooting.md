---
title: Troubleshooting GPU Monitoring
private: true
---

This page provides troubleshooting guidance for common issues you may encounter when using GPU Monitoring. Use this guide to quickly diagnose issues or to gather context before contacting [Datadog support][1].

## Expected hosts not appearing in GPU Monitoring

It may take a few minutes for metrics to start appearing in the GPU monitoring view. However, if the expected hosts still do not show up, the first step is to ensure that the Datadog Agent is running on them. [Fleet Automation][4] can be used to explore running agents and their configuration. If the hosts do not appear in the Fleet Automation view, they are not running the Datadog Agent. Check that the agent is scheduled to run on those hosts and that the configuration is correct.

If the agent is running but crashing before sending data, follow the [Agent Troubleshooting guide][5]. If you are still unsure about the issue, you may open a support ticket with [Datadog support][1].

If the host is a Kubernetes node and it has no Agent pod running on it, there might be several possible reasons for this:

- The Datadog Agent pods expect a runtime class that is not available on the node. The NVIDIA GPU operator defines the `nvidia` runtime class by default, but other runtime classes might be used in the cluster. In some managed Kubernetes services, such as AWS EKS or Oracle Cloud, the default runtime class already allows GPU device access. See the [setup guide][3] for more information on how to configure the runtime class.
- If deploying to a [mixed cluster][2], the affinity selector might be misconfigured. Check the node labels to ensure that the `profileNodeAffinity` selector is targeting the correct nodes.

## NVML library not found

The GPU Monitoring feature requires the NVML library to be accessible to the Datadog Agent. If the NVML library is not found, there will be an error message in the logs of the Datadog Agent similar to the following:

```none
error getting NVML library: LIBRARY_NOT_FOUND
```

This indicates that the NVML library is not accessible to the Datadog Agent. There are several possible causes for this error:

- The NVIDIA drivers are not installed on the host. Run the `nvidia-smi` command to verify that the NVIDIA drivers are installed and loaded correctly.
- The Datadog Agent has the GPU feature enabled on hosts with no GPUs. For example, in Kubernetes clusters where some nodes have GPUs and others do not, the Datadog Agent should be configured to only run on nodes with GPUs.  See the section about mixed Kubernetes clusters in the [setup guide][2] for more information.
- Datadog Agent is not configured properly to access GPU devices. If using Docker, ensure that the `--gpus all` flag is used to access all GPU devices. If using Kubernetes, ensure that the Datadog Agent pod has correct runtime class (usually `nvidia`), this can be con figured with the `features.gpu.requiredRuntimeClassName` (Datadog Operator) or `gpuMonitoring.runtimeClassName` (Helm) configuration options. Refer to the [setup guide][3] for more information.

[1]: /help/
[2]: /gpu_monitoring/setup/#set-up-gpu-monitoring-on-a-mixed-cluster
[3]: /gpu_monitoring/setup/
[4]: /agent/fleet_automation/
[5]: /agent/troubleshooting/
