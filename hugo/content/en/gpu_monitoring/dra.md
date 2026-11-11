---
title: Set Up GPU Monitoring with Dynamic Resource Allocation
description: Configure the Datadog Agent and Cluster Agent to monitor GPUs allocated through Kubernetes Dynamic Resource Allocation (DRA).
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/integrations/kubernetes_state_core/"
  tag: "Documentation"
  text: "Kubernetes State Metrics Core"
- link: "https://www.datadoghq.com/blog/how-kubernetes-dra-can-improve-gpu-utilization-and-cut-costs/"
  tag: "Blog"
  text: "How Kubernetes DRA can improve GPU utilization and cut costs"
---

## Overview

[Dynamic Resource Allocation][1] (DRA) lets Kubernetes allocate GPUs to workloads through ResourceClaims, instead of the counted `nvidia.com/gpu` resources of the NVIDIA device plugin. If your GPUs are allocated by the [NVIDIA DRA driver][2], complete the steps on this page in addition to the [GPU Monitoring setup][3].

After setup, Datadog:

- Attributes GPU metrics to the pods that hold each device, so per-pod utilization, cost, and idle cost work on DRA nodes. This includes MIG instances allocated through DRA.
- Collects DRA objects from the Kubernetes API (ResourceClaims, ResourceSlices, and DeviceTaintRules), so you can track pending claims, allocated devices, and the devices that are advertised to the scheduler.

## Prerequisites

| Component | Minimum version |
|---|---|
| Datadog Agent | 7.85.4 |
| Datadog Cluster Agent and Cluster Checks Runner | 7.85.4 |
| [Datadog Operator][4] | 1.33.0 |
| [Datadog Helm chart][5] | 3.266.0 |
| Kubernetes | 1.34 |

- GPU Monitoring is [set up][3] on your GPU nodes.
- The NVIDIA DRA driver is installed and allocates the GPUs on these nodes.
- The [Cluster Agent][9] is enabled, with [Cluster Checks Runners][8], to collect DRA resource metrics (Step 2). The Cluster Agent is enabled by default in the Datadog Operator and the Helm chart.

On Kubernetes 1.34 and later, the kubelet reports DRA allocations through the PodResources API by default (`KubeletPodResourcesDynamicResources` feature gate). No kubelet changes are required.

## Step 1: Attribute GPUs to pods

The Agent matches each DRA device to a physical GPU by reading the [CDI][6] specifications that the DRA driver writes to `/var/run/cdi` on the host.

With Datadog Operator 1.33.0 or later, or Datadog Helm chart 3.266.0 or later, enabling GPU Monitoring mounts this directory into the Agent container. No additional configuration is required. On GKE Autopilot, the Operator does not mount it, because the path is not in the Autopilot workload allowlist.

If you deploy the Agent with your own manifests, or use an older Operator or Helm chart version, add a read-only `hostPath` volume for `/var/run/cdi` and mount it at `/host/var/run/cdi` in the `agent` container. With the Operator, set it under `spec.override.nodeAgent.volumes` and `spec.override.nodeAgent.containers.agent.volumeMounts`:

```yaml
volumes:
  - name: cdi
    hostPath:
      path: /var/run/cdi
      type: DirectoryOrCreate
containers:
  - name: agent
    volumeMounts:
      - name: cdi
        mountPath: /host/var/run/cdi
        readOnly: true
```

<div class="alert alert-info">Without access to <code>/var/run/cdi</code>, the Agent falls back to matching whole GPUs by the DRA device name (<code>gpu-0</code>, <code>gpu-1</code>, ...). In that mode, MIG instances allocated through DRA are not attributed to pods.</div>

## Step 2: Collect DRA resource metrics

The [`kubernetes_state_core`][7] check can collect ResourceClaims, ResourceSlices, and DeviceTaintRules. These collectors are not enabled by default.

To enable DRA collection, add the DRA collectors in addition to the existing collectors, as a second check instance. Run the check on [Cluster Checks Runners][8].

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Enable Cluster Checks Runners and add the configuration with `features.kubeStateMetricsCore.conf.configData`. The Operator does not add the cluster check settings to a custom `configData`, so `cluster_check: true` and `skip_leader_election: true` are required:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
    kubeStateMetricsCore:
      enabled: true
      conf:
        configData: |-
          cluster_check: true
          init_config:
          instances:
            - skip_leader_election: true  # Existing collectors
            - skip_leader_election: true
              collectors:
                - resourceclaims
                - resourceslices
                - devicetaintrules
              # Optional: only count claims that request these DeviceClasses.
              # dra_device_classes:
              #   - gpu.nvidia.com
```

With Datadog Operator 1.33.0 or later, the Operator grants the Cluster Checks Runner `list` and `watch` permissions on `resourceclaims`, `resourceslices`, and `devicetaintrules` when the Cluster Checks Runner is 7.85.0 or later.

{{% /tab %}}
{{% tab "Helm" %}}

Enable Cluster Checks Runners and add a `kubernetes_state_core.yaml` file under `clusterAgent.confd`. This file takes precedence over the chart's default `kubernetes_state_core` configuration, so `cluster_check: true` and `skip_leader_election: true` are required:

```yaml
datadog:
  kubeStateMetricsCore:
    useClusterCheckRunners: true
clusterChecksRunner:
  enabled: true
  image:
    tag: 7.85.4
clusterAgent:
  confd:
    kubernetes_state_core.yaml: |-
      cluster_check: true
      init_config:
      instances:
        - skip_leader_election: true  # Existing collectors
        - skip_leader_election: true
          collectors:
            - resourceclaims
            - resourceslices
            - devicetaintrules
          # Optional: only count claims that request these DeviceClasses.
          # dra_device_classes:
          #   - gpu.nvidia.com
```

With Datadog Helm chart 3.266.0 or later, the chart grants the Cluster Checks Runner `list` and `watch` permissions on `resourceclaims`, `resourceslices`, and `devicetaintrules` when the Cluster Checks Runner is 7.85.0 or later. The chart does not add the collectors. Set `clusterChecksRunner.image.tag` explicitly: the chart's default runner image can be older than 7.85.0, and then the second instance fails with `resource devicetaintrules does not exist`.

{{% /tab %}}
{{% tab "Manual (RBAC)" %}}

If you manage the RBAC yourself, grant `list` and `watch` permissions on the DRA resources to the Cluster Checks Runner service account, then add the collectors to your `kubernetes_state_core` configuration as shown in the other tabs.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-cluster-checks-runner-dra
rules:
  - apiGroups: ["resource.k8s.io"]
    resources: ["resourceclaims", "resourceslices", "devicetaintrules"]
    verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-cluster-checks-runner-dra
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-cluster-checks-runner-dra
subjects:
  - kind: ServiceAccount
    name: <CLUSTER_CHECKS_RUNNER_SERVICE_ACCOUNT>
    namespace: <DATADOG_NAMESPACE>
```

{{% /tab %}}
{{< /tabs >}}

The check detects which DRA API version the cluster serves and skips any collector whose resource the cluster does not serve. DeviceTaintRules are stable in Kubernetes 1.37. On earlier versions, they are collected only if the `DRADeviceTaints` feature gate and the alpha API are enabled.

Set `dra_device_classes` to count only claims that request the listed DeviceClasses, for example `gpu.nvidia.com`. If it is not set, claims for every DRA driver in the cluster are counted.

## Step 3: Verify the setup

1. Confirm that the Agent can read the CDI specifications. The output should list the DRA driver's CDI files:

   ```shell
   kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD_ON_A_GPU_NODE> -c agent -- ls /host/var/run/cdi
   ```

2. Confirm that both `kubernetes_state_core` instances run without errors. The two instances can be dispatched to different Cluster Checks Runners. Find the runner that hosts each instance:

   ```shell
   kubectl exec -n <DATADOG_NAMESPACE> <CLUSTER_AGENT_POD> -- datadog-cluster-agent clusterchecks
   ```

   Then, on each runner that hosts an instance, check its status:

   ```shell
   kubectl exec -n <DATADOG_NAMESPACE> <CLUSTER_CHECKS_RUNNER_POD> -- agent status
   ```

   In the `kubernetes_state_core` section, each instance reports `[OK]` with no errors.

3. In Datadog, confirm that the data arrives:

   - **Pod attribution**: Graph `avg:gpu.gr_engine_active{kube_cluster_name:<CLUSTER>} by {pod_name}`. Pods that hold DRA-allocated GPUs appear with their names.
   - **DRA metrics**: Graph `sum:kubernetes_state.resourceclaim.count{kube_cluster_name:<CLUSTER>} by {state}`. Claims appear as `pending`, `allocated`, or `in_use`.

## DRA with MIG

MIG instances allocated through DRA are attributed to pods when Step 1 is complete. Each MIG instance reports its profile in the `gpu_mig_profile` tag, for example `1g.18gb` or `3g.71gb`. Whole GPUs report `none`.

To check that MIG instances are attributed, graph `avg:gpu.gr_engine_active{gpu_mig_profile:*,!gpu_mig_profile:none} by {pod_name,gpu_mig_profile}`.

## Collected DRA metrics

| Metric | Description | Tags |
|---|---|---|
| `kubernetes_state.resourceclaim.count` | Number of ResourceClaims, by state. | `kube_namespace`, `resourceclaim`, `state` (`pending`, `allocated`, `in_use`) |
| `kubernetes_state.resourceclaim.pending.age` | Time since a pending ResourceClaim was created, in seconds. | `kube_namespace`, `resourceclaim` |
| `kubernetes_state.resourceclaim.devices.allocated` | Number of devices allocated to a ResourceClaim. | `kube_namespace`, `resourceclaim` |
| `kubernetes_state.resourceslice.devices` | Number of devices advertised in a ResourceSlice. | `resourceslice`, `driver`, `pool`, `node` |
| `kubernetes_state.resourceslice.capacity` | Advertised capacity in a ResourceSlice, by capacity name. | `resourceslice`, `driver`, `pool`, `node`, `capacity` |
| `kubernetes_state.dra.device_taint_rule` | DeviceTaintRules applied to DRA devices. | `devicetaintrule`, `driver`, `taint_key`, `taint_effect` |

<div class="alert alert-info"><code>kubernetes_state.resourceslice.devices</code> counts the devices advertised to the scheduler, not physical GPUs. When a driver advertises several alternative partitions of the same GPU, such as a whole GPU and its MIG profiles, each alternative is counted.</div>

## Troubleshooting

GPU metrics on DRA nodes have no pod tags
: Confirm that `/var/run/cdi` is mounted (Step 1) and that the Agent is 7.85.4 or later.

The `kubernetes_state_core` check fails after adding the DRA collectors
: The Cluster Checks Runner is older than 7.85.0. Upgrade it, or remove the DRA collectors.

No `kubernetes_state.resourceclaim.*` or `kubernetes_state.resourceslice.*` metrics
: Check that the cluster runs Kubernetes 1.34 or later, and that the Cluster Checks Runner has `list` and `watch` permissions on the DRA resources. The runner logs a permission error if they are missing.

Other Kubernetes State metrics disappeared
: A custom `collectors` list replaces the default list. Add the missing default collectors back to the list.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/
[2]: https://github.com/NVIDIA/k8s-dra-driver-gpu
[3]: /gpu_monitoring/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[6]: https://github.com/cncf-tags/container-device-interface
[7]: /integrations/kubernetes_state_core/
[8]: /containers/cluster_agent/clusterchecks/#cluster-check-runners
[9]: /containers/cluster_agent/
