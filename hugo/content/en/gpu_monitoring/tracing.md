---
title: Set Up Continuous Tracing with GPU Monitoring
is_beta: true
private: true
description: Enable GPU activity tracing for selected Kubernetes workloads.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/tracing/trace_collection/single-step-apm/kubernetes/"
  tag: "Documentation"
  text: "Single Step APM Instrumentation for Kubernetes"
- link: "/tracing/trace_explorer/"
  tag: "Documentation"
  text: "APM Trace Explorer"
---

{{< beta-callout url="#" btn_hidden="true" >}}
Continuous tracing with GPU Monitoring is in Preview. To request access, contact your Datadog representative.
{{< /beta-callout >}}

Continuous tracing with GPU Monitoring enables GPU activity tracing for selected Kubernetes workloads.

**Version**: `0.20.0`

**Requires**: Cluster Agent `7.80+` with [GPU Monitoring enabled][1], and CUDA `13+` (CUPTI `13+`) on the GPU workload image.

## Configure GPU tracing

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

## Label the GPU workload

Add the label to the controller's pod template. The workload must be outside the Agent namespace. For Jobs, use `spec.template.metadata.labels`. For KubeRay, label the head and worker pod template:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Apply the resource and wait for the rollout to complete.

## Verify setup

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**No setup containers?** Confirm the label is on the pod template, the pod is new, and the workload is outside the Agent namespace. Then check the Cluster Agent logs.

## Explore traces

Run the workload, then query [APM Trace Explorer][2] with:

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: /tracing/trace_explorer/
