---
title: Quickstart to GPU Monitoring
---
This page demonstrates how to configure and start using Datadog's GPU Monitoring product.

### Prerequisites

In order to begin using Datadog's GPU Monitoring, you must meet the following critieria:
- Already a Datadog customer  (you have active Datadog infrastructure hosts)
- You have already installed and deployed[1] the latest version[2] of the Datadog agent on all of your GPU-enabled hosts that you'd like to monitor
- Uses Kubernetes and NVIDIA's device plugin for Kubernetes (either directly or through NVIDIA's GPU Operator) 

The minimum version requirements are: 
- Datadog Agent: version 7.70+
- If using the datadog-operator: version 1.18
- If using helm chart: version 3.130.1
- Operating System: Linux. (optional: For advanced eBPF metrics, minimal version is 5.8)
- NVIDIA driver: version 450.51
- Kubernetes: 1.22 with PodResources API active

### Installation Instructions
Your installation method depends on your deployment type (uniform or mixed): 
- Uniform clusters are those where all the nodes have GPU devices
- Mixed clusters have some nodes with GPU devices and others without. 

#### Datadog Operator Users
{{< tabs >}}
{{% tab "Uniform Clusters" %}}

Uniform clusters are those where all the nodes have GPU devices

1. Install and deploy the Datadog Agent on Kubernetes (instructions here[1])
2. Include the additional parameter, `gpu.enabled:true` to the `/etc/datadog-agent/datadog.yaml` configuration file. If you would like to opt-in for more advanced eBPF metrics such as [METRIC NAME HERE], also include the additional parameter of `gpu.privilegedMode:true` as shown in the example snippet below

Example snippet from configuration file: 
   ```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    gpu:
      enabled: true
      privilegedMode: true # Only for advanced eBPF metrics
      patchCgroupPermissions: true # Only for GKE 
      requiredRuntimeClassName: "" # Only for AWS EKS or Oracle Cloud

   ```
3. Restart the Agent
{{% /tab %}}

{{% tab "Mixed Clusters" %}}
Mixed clusters have some nodes with GPU devices and others without. If you have a mixed cluster, you'll need to leverage the Datadog Operator's Datadog Agent Profiles feature to enable GPU monitoring only on your nodes with GPUs.

1. Install and deploy the Datadog Agent on Kubernetes using the Datadog Operator (instructions here[1])
2. Modify your existing DatadogAgent resource with the following changes that can safely be applied to all agents, regardless of whether they run on GPU nodes or not:
```
   spec:
  features:
    oomKill:
      # Only enable this feature if there is nothing else that requires the system-probe container in all Agent pods
      # Examples of system-probe features are npm, cws, usm
      enabled: true
      
override:
    nodeAgent:
      volumes:
        - name: nvidia-devices
          hostPath:
            path: /dev/null
        - name: pod-resources
          hostPath:
            path: /var/lib/kubelet/pod-resources
      containers:
        agent:
          env:
            - name: NVIDIA_VISIBLE_DEVICES
              value: "all"
          volumeMounts:
            - name: nvidia-devices
              mountPath: /dev/nvidia-visible-devices
            - name: pod-resources
              mountPath: /var/lib/kubelet/pod-resources
        system-probe:
          env:
            - name: NVIDIA_VISIBLE_DEVICES
              value: "all"
          volumeMounts:
            - name: nvidia-devices
              mountPath: /dev/nvidia-visible-devices
            - name: pod-resources
              mountPath: /var/lib/kubelet/pod-resources
   ```
3. Once the Datadog Agent configuration is changed, a profile needs to be created so that the GPU feature is enabled only on nodes with GPUs. The profileNodeAffinity selector is a suggestion based on a tag that’s commonly present in nodes with the NVIDIA GPU operator, but any other tag can be used.
```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgentProfile
metadata:
  name: gpu-nodes
spec:
  profileAffinity:
    profileNodeAffinity:
      - key: nvidia.com/gpu.present
        operator: In
        values:
          - "true"
  config:
    override:
      nodeAgent:
        runtimeClassName: nvidia  # Only if not in AWS EKS or Oracle Cloud
        containers:
          # Change system-probe environment variables only for advanced 
          # eBPF metrics, or if running in GKE 
          system-probe:
            env:
              - name: DD_GPU_MONITORING_ENABLED
                value: "true"
              # cgroup permission patching only for GKE
              - name: DD_GPU_MONITORING_CONFIGURE_CGROUP_PERMS
                value: "true"
          agent:
            env:
              - name: DD_GPU_ENABLED
                value: "true"
              # Only for advanced eBPF metrics
              - name: DD_GPU_MONITORING_ENABLED
                value: "true"
```
{{% /tab %}}
{{< /tabs >}}

#### Helm Chart Users
{{< tabs >}}
{{% tab "Uniform Clusters" %}}

Uniform clusters are those where all the nodes have GPU devices.

1. Install and deploy the Datadog Agent on Kubernetes with Helm (instructions here[1])
2. Include the additional parameter, `gpu.enabled:true` to the `datadog-values.yaml` configuration file. If you would like to opt-in for more advanced eBPF metrics such as [METRIC NAME HERE], also include the additional parameter of `gpu.privilegedMode:true` as shown in the example snippet below

Example snippet from datadog-values.yaml configuration file: 
```
  datadog:
  gpuMonitoring:
    enabled: true
    privilegedMode: true        # Only for advanced SP metrics
    configureCgroupPerms: true  # Only for GKE 
    runtimeClassName: ""        # Only for Oracle Cloud
```
3. Restart the Agent
{{% /tab %}}

{{% tab "Mixed Clusters" %}}
Mixed clusters have some nodes with GPU devices and others without. If you have a mixed cluster, you'll need to create two different Helm deployments, one targeting non-GPU nodes and another for GPU nodes.

1. Install and deploy the Datadog Agent on Kubernetes using Helm (instructions here[1])
2. Update the affinity of that deployment within the `datadog-values.yaml` configuration file. The label `nvidia.com/gpu.present` is a suggestion based on common NVIDIA GPU operator settings, but any label can be used to exclude GPU nodes.

Example snippet from datadog-values.yaml configuration file: 
```
agents:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: nvidia.com/gpu.present
            operator: NotIn
            values:
              - "true"
```

3. Create a new `values-gpu.yaml` file with an affinity selector for GPU nodes and the corresponding GPU configuration. This file includes the necessary configuration changes[3] to ensure that it joins the existing cluster agents.
4. 
Example snippet from values-gpu.yaml configuration file: 
```
# GPU-specific values-gpu.yaml (for GPU nodes)
datadog:
  kubeStateMetricsEnabled: false # Disabled as we're joining an existing Cluster Agent
  gpuMonitoring:
    enabled: true
    privilegedMode: true        # Only for advanced SP metrics
    configureCgroupPerms: true  # Only for GKE 
    runtimeClassName: ""        # Only for Oracle Cloud

agents:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: nvidia.com/gpu.present
            operator: In
            values:
              - "true"

existingClusterAgent:
  join: true

# Disabled datadogMetrics deployment since it should have been already deployed with the other chart release.
datadog-crds:
  crds:
    datadogMetrics: false
```

4. Deploy the chart first with the first values.yaml modified as explained above

``` shell
helm install -f values.yaml datadog datadog
```

5. Deploy the chart for a second time with the GPU specific overrides

``` shell
helm install -f values.yaml -f values-gpu.yaml datadog-gpu datadog
```
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases?page=1
[3]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
