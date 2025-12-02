---
title: Set up GPU Monitoring
private: true
---
This page provides instructions on setting up Datadog's GPU Monitoring on your infrastructure. The configuration instructions depend on the environment to monitor.

### Prerequisites

To begin using Datadog's GPU Monitoring, your environment must meet the following criteria:

- You are a Datadog user with active Datadog infrastructure hosts. If not, see the following guides:
  - [Install the Datadog Agent on Kubernetes][1]
  - [Install the Datadog Agent on Docker][7]
  - [Install the Datadog Agent on non-containerized Linux][8]
- The NVIDIA drivers are installed on the hosts. If using Kubernetes, the NVIDIA device plugin for Kubernetes is installed ([directly][3], or through [NVIDIA GPU Operator][4])

#### Minimum version requirements

- **Datadog Agent**: version 7.72.2
- **Operating system**: Linux
   - (Optional) For advanced eBPF metrics, Linux kernel version 5.8
- **NVIDIA driver**: version 450.51

If using Kubernetes, the following requirements must be met:

- [**Datadog Operator**][5]: version 1.18, _or_ [**Datadog Helm chart**][6]: version 3.137.3
- **Kubernetes**: 1.22 with PodResources API active

## Set up GPU Monitoring on a uniform Kubernetes cluster or non-Kubernetes environment

The following instructions are the basic steps to set up GPU Monitoring in the following environments:
- In a Kubernetes cluster where **all** the nodes have GPU devices
- In a non-Kubernetes environment, such as Docker or non-containerized Linux.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
1. Ensure that the [latest version of the Datadog Agent][2] is [installed and deployed][1] on every GPU host you wish to monitor.
2. Modify your `DatadogAgent` resource with the following parameters:

   `gpu.enabled: true`
   : Enables GPU Monitoring.

   `gpu.privilegedMode: true`
   : _Optional_. Enables advanced eBPF metrics, such as GPU core utilization (`gpu.process.core.usage`).

   `gpu.patchCgroupPermissions: true`
   : _Only for GKE_. Enables a code path in `system-probe` that ensures the Agent can access GPU devices.

   `gpu.requiredRuntimeClassName:<runtime-name>`
   : _Optional_. Specifies the container runtime for pods that need access to GPU devices, for example: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. The default value is `nvidia`, as that is the default runtime defined by the NVIDIA GPU Operator. In EKS and Oracle Cloud, this value should be set to the empty string as the default runtime class already allows GPU device access.

   Example `datadog-agent.yaml`, running on GKE with advanced eBPF metrics enabled:

   ```yaml
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

3. Apply your changes and restart the Datadog Agent.

[1]: /containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}
1. Ensure that the [latest version of the Datadog Agent][2] is [installed and deployed][1] on every GPU host you wish to monitor.

2. Modify your `datadog-values.yaml` configuration file with the following parameters:

   `gpuMonitoring.enabled: true`
   : Enables GPU Monitoring.

   `gpuMonitoring.privilegedMode: true`
   : _Optional_. Enables advanced eBPF metrics, such as GPU core utilization (`gpu.process.core.usage`).

   `gpuMonitoring.configureCgroupPerms: true`
   : _Only for GKE_. Enables a code path in `system-probe` that ensures the Agent can access GPU devices.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Optional_. Specifies the container runtime for pods that need access to GPU devices, for example: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. The default value is `nvidia`, as that is the default runtime defined by the NVIDIA GPU Operator. In EKS and Oracle Cloud, this value should be set to the empty string as the default runtime class already allows GPU device access.

   Example `datadog-values.yaml`, running on GKE with advanced eBPF metrics enabled:

   ```yaml
   datadog:
     gpuMonitoring:
       enabled: true
       privilegedMode: true        # Only for advanced SP metrics
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS
   ```

3. Upgrade your Helm chart and restart the Datadog Agent.

[1]: /containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Docker" %}}

To enable GPU Monitoring in Docker without advanced eBPF metrics, use the following configuration when starting the container Agent:

```shell
docker run \
--pid host \
--gpus all \
-e DD_GPU_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
gcr.io/datadoghq/agent:latest
```

To enable advanced eBPF metrics, use the following configuration for the required permissions to run eBPF programs:

```shell
docker run \
--cgroupns host \
--pid host \
--gpus all \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_GPU_MONITORING_ENABLED=true \
-e DD_GPU_ENABLED=true \
-v /:/host/root:ro \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /lib/modules:/lib/modules:ro \
-v /usr/src:/usr/src:ro \
-v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
-v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
-v /etc/apt:/host/etc/apt:ro \
-v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
-v /etc/zypp:/host/etc/zypp:ro \
-v /etc/pki:/host/etc/pki:ro \
-v /etc/yum/vars:/host/etc/yum/vars:ro \
-v /etc/dnf/vars:/host/etc/dnf/vars:ro \
-v /etc/rhsm:/host/etc/rhsm:ro \
-e HOST_ROOT=/host/root \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Docker Compose" %}}

If using `docker-compose`, make the following additions to the Datadog Agent service.

```yaml
version: '3'
services:
  datadog:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_GPU_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

To enable advanced eBPF metrics, use the following configuration for the required permissions to run eBPF programs:

```yaml
version: '3'
services:
  datadog:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_GPU_MONITORING_ENABLED=true  # only for advanced eBPF metrics
      - DD_GPU_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
      - HOST_ROOT=/host/root
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /sys/kernel/debug:/sys/kernel/debug
      - /:/host/root
    cap_add:
      - SYS_ADMIN
      - SYS_RESOURCE
      - SYS_PTRACE
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

{{% /tab %}}
{{% tab "Linux (non-containerized)" %}}

Modify your `/etc/datadog-agent/datadog.yaml` file to enable GPU monitoring

```yaml
gpu:
  enabled: true
```

Additionally, to enable advanced eBPF-based metrics such as GPU core utilization (`gpu.process.core.usage`), follow these steps:

1. If `/etc/datadog-agent/system-probe.yaml` does not exist, create it from `system-probe.yaml.example`:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

2. Edit `/etc/datadog-agent/system-probe.yaml` and enable GPU monitoring in system-probe:

    ```yaml
    gpu_monitoring:
      enabled: true
    ```

3. Restart the Datadog Agent

    ```shell
    sudo systemctl restart datadog-agent
    ```

{{% /tab %}}

{{< /tabs >}}

## Set up GPU Monitoring on a mixed Kubernetes cluster

In a mixed cluster, some nodes have GPU devices while other nodes do not. Due to the way that the NVIDIA device plugin for Kubernetes works, the agent needs to have a specific runtime class to access the GPU devices that is only present on GPU nodes. Therefore, two separate DaemonSets, one for the runtime class in GPU nodes, and another for non-GPU nodes, are required.

The recommended method to set up the Agent in this case is using the Datadog Operator, version 1.20 or greater, which provides features to make this setup easier. However, for compatibility reasons instructions are also provided for Helm installations or for older versions of the Datadog Operator.

{{< tabs >}}
{{% tab "Datadog Operator (1.20 or greater)" %}}

To set up GPU Monitoring on a mixed cluster with the Datadog Operator, use the Operator's [Agent Profiles][2] feature to selectively enable GPU Monitoring only on nodes with GPUs.

1. Configure the Datadog Operator to enable the Datadog Agent Profile feature in the DatadogAgentInternal mode.

   If the Datadog Operator was deployed with Helm directly without a values file, the configuration can be toggled from the command line:

   ```shell
   helm upgrade --set datadogAgentProfile.enabled=true --set datadogAgentInternal.enabled=true --set datadogCRDs.crds.datadogAgentProfiles=true --set datadogCRDs.crds.datadogAgentInternal=true <release-name> datadog/datadog-operator
   ```

   If the Datadog Operator was deployed with a values file, the configuration can be toggled by adding the following settings to the values file:

   ```yaml
   datadogAgentProfile:
     enabled: true

   datadogAgentInternal:
     enabled: true

    datadogCRDs:
      crds:
        datadogAgentProfiles: true
        datadogAgentInternal: true
   ```

   Then re-deploy the Datadog Operator with: `helm upgrade --install <release-name> datadog/datadog-operator -f datadog-operator.yaml`.

2. Modify your `DatadogAgent` resource with the following changes:

   1. Add the `agent.datadoghq.com/update-metadata` annotation to the `DatadogAgent` resource.
   2. If advanced eBPF metrics are wanted, ensure at least one system-probe feature is enabled. Examples of system-probe features are `npm`, `cws`, `usm`. If none is enabled, the `oomKill` feature can be enabled.

   The additions to the `datadog-agent.yaml` file should look like this:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/update-metadata: "true"  # Required for the Datadog Agent Internal mode to work.
   spec:
     features:
       oomKill:
         # Only enable this feature if there is nothing else that requires the system-probe container in all Agent pods
         # Examples of system-probe features are npm, cws, usm
         enabled: true
   ```

3. Apply your changes to the `DatadogAgent` resource. These changes are safe to apply to all Datadog Agents, regardless of whether they run on GPU nodes.

4. Create a [Datadog Agent Profile][2] that targets GPU nodes and enables GPU Monitoring on these targeted nodes.

   In the following example, the `profileNodeAffinity` selector is targeting nodes with the label [`nvidia.com/gpu.present=true`][3], because this label is commonly present on nodes with the NVIDIA GPU Operator. You may use another label if you wish.

   ```yaml
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
       features:
         gpu:
           enabled: true
           privilegedMode: true # Only for advanced eBPF metrics
           patchCgroupPermissions: true # Only for GKE
   ```

5. After you apply this new [Datadog Agent Profile][2], the Datadog Operator creates a new DaemonSet, `gpu-nodes-agent`.

[1]: /containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{% tab "Datadog Operator (1.18 or 1.19)" %}}
To set up GPU Monitoring on a mixed cluster with the Datadog Operator, use the Operator's [Agent Profiles][2] feature to selectively enable GPU Monitoring only on nodes with GPUs.

1. Ensure that the [latest version of the Datadog Agent][4] is [installed and deployed][1] on every GPU host you wish to monitor.

2. Modify your `DatadogAgent` resource with the following changes:

   ```yaml
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

2. Apply your changes to the `DatadogAgent` resource. These changes are safe to apply to all Datadog Agents, regardless of whether they run on GPU nodes.

3. Create a [Datadog Agent Profile][2] that targets GPU nodes and enables GPU Monitoring on these targeted nodes.

   In the following example, the `profileNodeAffinity` selector is targeting nodes with the label [`nvidia.com/gpu.present=true`][3], because this label is commonly present on nodes with the NVIDIA GPU Operator. You may use another label if you wish.

   ```yaml
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

4. After you apply this new Datadog Agent Profile, the Datadog Operator creates a new DaemonSet, `datadog-agent-with-profile-<namespace>-gpu-nodes`.

[1]: /containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}

To set up GPU Monitoring on a mixed cluster with Helm, create two different Helm deployments: one deployment for GPU nodes, and one deployment for non-GPU nodes.

1. Ensure that the [latest version of the Datadog Agent][3] is [installed and deployed][1] on every GPU host you wish to monitor.

2. Modify your `datadog-values.yaml` configuration file to target non-GPU nodes.

   The following example targets nodes that do **not** have the label `nvidia.com/gpu.present=true`, because this label is commonly present on nodes with the NVIDIA GPU Operator. If you wish, you may use another label to exclude GPU nodes.

   ```yaml
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

3. Create a new values file, `datadog-gpu-values.yaml`. Configure this file to:
   - Target only GPU nodes
   - [Join existing Datadog Cluster Agents][2]
   - Enable GPU Monitoring with the following parameters:

   `gpuMonitoring.enabled: true`
   : Enables GPU Monitoring.

   `gpuMonitoring.privilegedMode: true`
   : _Optional_. Enables advanced eBPF metrics, such as GPU core utilization (`gpu.process.core.usage`).

   `gpuMonitoring.configureCgroupPerms: true`
   : _Only for GKE_. Enables a code path in `system-probe` that ensures the Agent can access GPU devices.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Optional_. Specifies the container runtime for pods that need access to GPU devices, for example: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. The default value is `nvidia`, as that is the default runtime defined by the NVIDIA GPU Operator. In EKS and Oracle Cloud, this value should be set to the empty string as the default runtime class already allows GPU device access.

   Example `datadog-gpu-values.yaml`:

   ```
   # GPU-specific datadog-gpu-values.yaml (for GPU nodes)
   datadog:
     kubeStateMetricsEnabled: false # Disabled, as you're joining an existing Cluster Agent
     gpuMonitoring:
       enabled: true
       privilegedMode: true        # Only for advanced eBPF metrics
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS

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

   # Join with existing Cluster Agent
   existingClusterAgent:
     join: true

   # Disabled datadogMetrics deployment, since it should have been already deployed with the other chart release.
   datadog-crds:
     crds:
       datadogMetrics: false
   ```

4. Deploy the Helm chart with your modified `datadog-values.yaml`.

   ```shell
   helm install -f datadog-values.yaml datadog datadog
   ```

5. Deploy the Helm chart again with GPU-specific overrides.

   ```shell
   helm install -f datadog-values.yaml -f datadog-gpu-values.yaml datadog-gpu datadog
   ```
[1]: /containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
[3]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://github.com/NVIDIA/k8s-device-plugin
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[5]: https://github.com/DataDog/datadog-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[7]: /containers/docker/
[8]: /agent/supported_platforms/linux/
