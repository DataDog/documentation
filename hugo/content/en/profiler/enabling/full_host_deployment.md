---
title: Deploying the Full-Host Profiler
private: true
further_reading:
    - link: 'profiler/enabling/full_host'
      tag: 'Documentation'
      text: 'Enabling the Full-Host Profiler'
    - link: 'profiler/profiler_troubleshooting/full_host'
      tag: 'Documentation'
      text: 'Full-Host Profiler Troubleshooting'
---

{{< callout url="https://www.datadoghq.com/product-preview/full-host-profiler/" btn_hidden="false" header="Join the Preview!" >}}
Full-Host Profiler is in Preview.
{{< /callout >}}

Before you continue, review the [supported environments][1] for the Full-Host Profiler.

Select the tab that matches how your Kubernetes cluster is managed. If the Datadog Agent is already installed, including deployments that also run the Datadog Distribution of OpenTelemetry (DDOT), use a Datadog Agent tab so the Agent can enrich profiles with infrastructure metadata. Otherwise, use an OpenTelemetry tab.

{{< tabs >}}

{{% tab "Datadog Helm chart" %}}

Use this path when the Datadog Agent is already installed with Helm, including DDOT deployments. If your Agent is managed by the Datadog Operator, use the **Datadog Operator** tab instead.

The Full-Host Profiler runs as a sidecar in the Datadog Agent DaemonSet, and the Agent enriches profiles with Datadog infrastructure metadata.

**Prerequisite**: Datadog Agent Helm chart version `3.240.2` or later. See [Install the Datadog Agent][2].

**Deploy**:

1. Add the Full-Host Profiler configuration to the `values.yaml` file for your Datadog Agent Helm release:

   ```yaml
   datadog:
     hostProfiler:
       enabled: true
       image: "registry.datadoghq.com/ddot-ebpf:7.81.0-preview-host-profiler-1.0"
   agents:
     containers:
       hostProfiler:
         # Explicit zero requests avoid reserving CPU or memory on every node,
         # while limits cap runaway usage.
         resources:
           requests:
             cpu: "0"
             memory: "0"
           limits:
             cpu: "500m"
             memory: "1Gi"
   ```

   The preview image is available in Datadog's production container registries. If your cluster pulls images from another Datadog registry, replace the `registry.datadoghq.com` prefix with your preferred registry prefix. See [Changing your container registry][3].

2. Upgrade your existing Datadog Agent Helm release with the updated values. Adapt this command to your Helm or GitOps workflow, and include any existing values files you already use for the release:

   ```shell
   helm upgrade <RELEASE_NAME> datadog/datadog \
     --namespace <NAMESPACE> \
     --values values.yaml
   ```

The Datadog Helm chart configures the required capabilities and seccomp profile automatically.

The Full-Host Profiler infers most configuration from the Datadog Agent configuration. For optional overrides, see [Configuration for bundled deployments](#configuration-for-bundled-deployments).

After you apply the updated values, Helm rolls out a new Agent DaemonSet revision with the Full-Host Profiler sidecar. Wait for that rollout to complete before verifying profiles.

**SELinux**: The Datadog Helm chart configures the Full-Host Profiler with the `spc_t` SELinux type by default. If `spc_t` isn't available in your environment, set `agents.containers.hostProfiler.securityContext.seLinuxOptions.type` to an equivalent type supported by your distribution and security policy:

```yaml
agents:
  containers:
    hostProfiler:
      securityContext:
        seLinuxOptions:
          type: <SELINUX_TYPE>
```

This type applies to the Full-Host Profiler and its seccomp setup init container. The replacement must provide the host and process access the Full-Host Profiler requires.

**AppArmor (optional)**: AppArmor provides extra hardening on Linux distributions and Kubernetes clusters where it's available. The Full-Host Profiler doesn't require AppArmor to run.

Use this only if your nodes support AppArmor and you already manage node-local AppArmor profiles, which must be loaded on each node before Kubernetes can apply them to a pod.

To enable the provided profile, load [`apparmor-profile`][5] on each node, then set:

```yaml
datadog:
  hostProfiler:
    apparmor: localhost/host-profiler
```

The provided profile limits what the Full-Host Profiler container can run. It allows `objcopy`, which is used for debug symbol extraction.

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Use this path when the Datadog Agent is already installed with the Datadog Operator, including DDOT deployments. If your Agent is installed with Helm, use the **Datadog Helm chart** tab instead.

The Full-Host Profiler runs as a sidecar in the Datadog Agent DaemonSet, and the Agent enriches profiles with Datadog infrastructure metadata.

**Prerequisite**: Datadog Operator version `1.25.0` or later. See [Install the Datadog Agent][2].

**Deploy**:

Update your existing `DatadogAgent` custom resource with the following annotations and `host-profiler` container override. Merge this snippet into your existing resource rather than replacing unrelated fields:

```yaml
metadata:
  annotations:
    # Enable the Full-Host Profiler sidecar and set the preview image.
    agent.datadoghq.com/host-profiler-enabled: "true"
    experimental.agent.datadoghq.com/image-override-config: |
      {"host-profiler": {"name": "registry.datadoghq.com/ddot-ebpf:7.81.0-preview-host-profiler-1.0"}}
spec:
  override:
    nodeAgent:
      containers:
        host-profiler:
          # Required for current Datadog Operator versions.
          # Future Operator versions are expected to configure the Full-Host
          # Profiler security context automatically.
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              # Drop default capabilities and add only the ones the Full-Host Profiler needs.
              drop: ["ALL"]
              add: ["BPF", "PERFMON", "SYS_PTRACE", "SYS_RESOURCE", "DAC_READ_SEARCH", "SYSLOG", "CHECKPOINT_RESTORE", "IPC_LOCK"]
            # Keep AppArmor unconfined so it doesn't block cross-process access.
            appArmorProfile:
              type: Unconfined
            # Use spc_t, or an equivalent type, so SELinux permits the required host and process access.
            seLinuxOptions:
              type: spc_t
          # Explicit zero requests avoid reserving CPU or memory on every node,
          # while limits cap runaway usage.
          resources:
            requests:
              cpu: "0"
              memory: "0"
            limits:
              cpu: "500m"
              memory: "1Gi"
```

The preview image is available in Datadog's production container registries. If your cluster pulls images from another Datadog registry, replace the `registry.datadoghq.com` prefix in the image override with your preferred registry prefix. See [Changing your container registry][3].

Apply the updated `DatadogAgent` custom resource through your usual workflow.

The Full-Host Profiler infers most configuration from the Datadog Agent configuration. For optional overrides, see [Configuration for bundled deployments](#configuration-for-bundled-deployments).

After you apply the updated custom resource, the Operator rolls out a new Agent DaemonSet revision with the Full-Host Profiler sidecar. Wait for that rollout to complete before verifying profiles.

**Seccomp (optional)**: Seccomp provides extra hardening by restricting the syscalls available to the Full-Host Profiler container. It isn't required to run in this preview.

Current Operator versions don't install or configure the Full-Host Profiler seccomp profile automatically. A future Operator version is expected to configure seccomp by default.

Use this only if you already manage node-local seccomp profiles or want to add the extra hardening manually. The profile is available at `/etc/dd-host-profiler/seccomp.json` inside the Full-Host Profiler image and must be copied to `/var/lib/kubelet/seccomp/host-profiler.json` on every node.

Then add `seccompProfile` to the same `host-profiler` container override in your `DatadogAgent` custom resource:

```yaml
spec:
  override:
    nodeAgent:
      containers:
        host-profiler:
          securityContext:
            seccompProfile:
              type: Localhost
              localhostProfile: host-profiler.json
```

**AppArmor (optional)**: AppArmor provides extra hardening on Linux distributions and Kubernetes clusters where it's available. The Full-Host Profiler doesn't require AppArmor to run.

Use this only if your nodes support AppArmor and you already manage node-local AppArmor profiles, which must be loaded on each node before Kubernetes can apply them to a pod.

To enable the provided profile, load [`apparmor-profile`][5] on each node, then add `appArmorProfileName` to the `host-profiler` container override in your `DatadogAgent` custom resource:

```yaml
spec:
  override:
    nodeAgent:
      containers:
        host-profiler:
          appArmorProfileName: localhost/host-profiler
```

The provided profile limits what the Full-Host Profiler container can run. It allows `objcopy`, which is used for debug symbol extraction.

{{% /tab %}}

{{% tab "OpenTelemetry Helm chart" %}}

Use this path when your cluster doesn't run the Datadog Agent and you manage deployments with Helm. If the Datadog Agent is already installed, including deployments that also run DDOT, use a Datadog Agent tab instead.

The Full-Host Profiler runs independently and sends profiles directly to Datadog. This path uses the recommended OpenTelemetry Collector Helm chart DaemonSet deployment.

**Prerequisites**:

- [OpenTelemetry Collector Helm chart][6] version `0.152.1` or later.
- A namespace for the Full-Host Profiler. You can reuse an existing namespace or create a dedicated one.
- A Datadog API key available to the Collector as `DD_API_KEY`.

The example values read `DD_API_KEY` from a Kubernetes Secret named `datadog-secret`, using the key `api-key`, in the same namespace as the Helm release. If you use another secret-management mechanism, adapt the configuration files accordingly.

**Note**: Don't put the raw API key directly in Helm values or Collector configuration, since those might be stored in the cluster.

**Adapt the Helm values files**: Before deploying, update the provided Helm values files for your environment. These files are passed to the OpenTelemetry Collector Helm chart with `--values`:

1. In [`collector-values.yaml`][7]:
   - Set `DD_SITE` if your Datadog site isn't `datadoghq.com`. See [Datadog sites][8].
   - Adapt the `DD_API_KEY` secret reference if you don't use the example `datadog-secret` Kubernetes Secret.
   - To use another Datadog container registry, replace the `registry.datadoghq.com` prefix in the Full-Host Profiler image with your preferred registry prefix. See [Changing your container registry][3].
   - Review the remaining pod settings, including resource requests and limits. For all supported values, see the [OpenTelemetry Collector Helm chart values][9].
2. In [`collector-config-values.yaml`][10]:
   - Review the OpenTelemetry Collector pipelines and Datadog export configuration.
   - Adapt it like any other [OpenTelemetry Collector configuration][11].
3. Choose a network policy values file:
   - If your cluster enforces Kubernetes NetworkPolicy, use [`network-policy-values.yaml`][12] by default.
   - If your cluster uses Cilium and you want FQDN-scoped egress enforcement, use [`cilium-network-policy-values.yaml`][13] instead.

If your cluster doesn't enforce NetworkPolicy resources, these values don't restrict egress. Use your cluster's supported network controls instead.

**Deploy**:

The example below uses the Kubernetes NetworkPolicy values file. If your cluster uses Cilium, replace `network-policy-values.yaml` with `cilium-network-policy-values.yaml` before running it.

```shell
helm upgrade --install <RELEASE_NAME> open-telemetry/opentelemetry-collector \
  --namespace <NAMESPACE> \
  --values collector-values.yaml \
  --values collector-config-values.yaml \
  --values network-policy-values.yaml
```

The provided Helm values configure the required capabilities and seccomp profile automatically. An init container installs the seccomp profile onto each node, so no manual seccomp setup is required.

After you apply the values, Helm rolls out an OpenTelemetry Collector DaemonSet with the Full-Host Profiler. Wait for that rollout to complete before verifying profiles.

**AppArmor (optional)**: AppArmor provides extra hardening on Linux distributions and Kubernetes clusters where it's available. The Full-Host Profiler doesn't require AppArmor to run.

Use this only if your nodes support AppArmor and you already manage node-local AppArmor profiles, which must be loaded on each node before Kubernetes can apply them to a pod.

To enable the provided profile, load [`apparmor-profile`][5] on each node, then update `securityContext` in [`collector-values.yaml`][7]:

```yaml
securityContext:
  # ... existing fields ...
  appArmorProfile:
    type: Localhost
    localhostProfile: host-profiler
```

The provided profile limits what the Full-Host Profiler container can run. It allows `objcopy`, which is used for debug symbol extraction.

{{% /tab %}}

{{% tab "OpenTelemetry Operator" %}}

Use this path when your cluster doesn't run the Datadog Agent and you use the OpenTelemetry Operator to manage Collector deployments. If the Datadog Agent is already installed, including deployments that also run DDOT, use a Datadog Agent tab instead.

The Full-Host Profiler runs independently and sends profiles directly to Datadog. This path uses the recommended OpenTelemetry Collector DaemonSet deployment.

**Prerequisites**:

- [OpenTelemetry Operator][14] installed.
- A namespace for the Full-Host Profiler. You can reuse an existing namespace or create a dedicated one.
- A Datadog API key available to the Collector as `DD_API_KEY`.

The example manifests read `DD_API_KEY` from a Kubernetes Secret named `datadog-secret`, using the key `api-key`, in the same namespace as the `OpenTelemetryCollector` custom resource. If you use another secret-management mechanism, adapt [`collector.yaml`][15] accordingly.

**Note**: Don't put the raw API key directly in Collector configuration, since it might be stored in the cluster.

**Adapt the manifests**: Before deploying, update the provided manifests for your environment:

1. In [`rbac.yaml`][16]:
   - If you use a namespace other than `host-profiler`, update the `ClusterRoleBinding` subject namespace.
   - If you change the `OpenTelemetryCollector` name, update the service account name in the `ClusterRoleBinding` subject.
2. In [`collector.yaml`][15]:
   - Set `metadata.namespace` to your chosen namespace.
   - Set `DD_SITE` if your Datadog site isn't `datadoghq.com`. See [Datadog sites][8].
   - Adapt the `DD_API_KEY` secret reference if you don't use the example `datadog-secret` Kubernetes Secret.
   - To use another Datadog container registry, replace the `registry.datadoghq.com` prefix in the Full-Host Profiler image with your preferred registry prefix. See [Changing your container registry][3].
   - Review the resource requests and limits under `spec.resources`.
   - Review the OpenTelemetry Collector configuration under `spec.config`. Adapt it like any other [OpenTelemetry Collector configuration][11].
3. Choose a network policy manifest:
   - If your cluster enforces Kubernetes NetworkPolicy, use [`network-policy.yaml`][17] by default.
   - If your cluster uses Cilium and you want FQDN-scoped egress enforcement, use [`cilium-network-policy.yaml`][18] instead.
   - If you change the namespace or `OpenTelemetryCollector` name, update the policy metadata and pod selectors.

If your cluster doesn't enforce NetworkPolicy resources, these manifests don't restrict egress. Use your cluster's supported network controls instead.

**Deploy**:

Apply the adapted manifests through your usual Kubernetes workflow:

```shell
kubectl apply -f rbac.yaml
kubectl apply -f collector.yaml
kubectl apply -f network-policy.yaml
```

If your cluster uses Cilium, apply [`cilium-network-policy.yaml`][18] instead of [`network-policy.yaml`][17].

The provided manifests configure the required capabilities and seccomp profile automatically. An init container installs the seccomp profile onto each node, so no manual seccomp setup is required.

After you apply the manifests, the OpenTelemetry Operator reconciles the custom resource and rolls out an OpenTelemetry Collector DaemonSet with the Full-Host Profiler. Wait for that rollout to complete before verifying profiles.

**AppArmor (optional)**: AppArmor provides extra hardening on Linux distributions and Kubernetes clusters where it's available. The Full-Host Profiler doesn't require AppArmor to run.

Use this only if your nodes support AppArmor and you already manage node-local AppArmor profiles, which must be loaded on each node before Kubernetes can apply them to a pod.

To enable the provided profile, load [`apparmor-profile`][5] on each node, then update `securityContext` in [`collector.yaml`][15]:

```yaml
securityContext:
  # ... existing fields ...
  appArmorProfile:
    type: Localhost
    localhostProfile: host-profiler
```

The provided profile limits what the Full-Host Profiler container can run. It allows `objcopy`, which is used for debug symbol extraction.

{{% /tab %}}

{{< /tabs >}}

## Configuration for bundled deployments

The bundled Full-Host Profiler (Datadog Helm chart and Datadog Operator paths) runs as a sidecar in the Datadog Agent DaemonSet. It infers most configuration from the Datadog Agent configuration.

### Datadog intake configuration

In bundled deployments, the Full-Host Profiler uses the Datadog Agent configuration to determine where to send profiles and debug symbols. In most cases, you don't need to configure the Datadog site, API key, or profiling intake endpoints separately for the Full-Host Profiler.

The Full-Host Profiler uses:

- `apm_config.profiling_dd_url`, when set, as the preferred profiling intake URL;
- `site`, when `apm_config.profiling_dd_url` isn't set;
- `api_key` for the main Datadog site;
- `apm_config.profiling_additional_endpoints`, when set, to send profiles to additional Datadog sites with their respective API keys.

If your Agent is configured to send profiles to multiple Datadog endpoints, the Full-Host Profiler uses matching destinations for profile export and debug symbol upload.

### Optional overrides

Most bundled deployments don't need these settings. Use them to expose Full-Host Profiler health data, collect diagnostics, or follow instructions from Datadog Support. Set these in the Datadog Agent configuration for either the Datadog Helm chart or the Datadog Operator.

#### Health metrics

| Name                                  | Values | Default          | Description                                                                                                                                      |
|:---------------------------------------|:-------|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| `hostprofiler.health_metrics.enabled` | bool   | `true`            | Sends internal Full-Host Profiler health metrics to Datadog.                                                                                     |
| `hostprofiler.health_metrics.target`  | string | `127.0.0.1:8889`  | Address used for the Full-Host Profiler internal Prometheus metrics endpoint. Change this only if the default address conflicts with another service. |

#### Diagnostics

| Name                            | Values                          | Default                              | Description                                                                                                                                                                                                                                       |
|:---------------------------------|:----------------------------------|:---------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hostprofiler.hpflare.port`     | int                              | `7778`                                | Local port used to collect Full-Host Profiler flare diagnostics. Change this only if the default port conflicts with another service.                                                                                                            |
| `hostprofiler.debug.verbosity`  | `basic`, `normal`, `detailed`    | _(disabled)_                          | Enables the OpenTelemetry debug exporter for troubleshooting. See the [debug exporter verbosity documentation][19]. Use temporarily, since it can increase log volume.                                                                           |
| `hostprofiler.log_file`         | string                           | `${log_path}/host-profiler.log`       | Path to the Full-Host Profiler log file. `${log_path}` resolves to the Agent's configured log directory.                                                                                                                                          |

#### Advanced export settings

| Name                                    | Values              | Default    | Description                                                                                                |
|:------------------------------------------|:----------------------|:-------------|:--------------------------------------------------------------------------------------------------------------|
| `hostprofiler.additional_http_headers`  | map[string]string    | _(empty)_  | Adds custom headers to profile export requests, for example when required by an outbound proxy or gateway. |

#### Self-profiling (Datadog Support diagnostics only)

Leave self-profiling disabled unless Datadog Support asks you to enable it.

| Name                                | Values | Default                     | Description                                                                                                        |
|:--------------------------------------|:-------|:-------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| `hostprofiler.ddprofiling.enabled`  | bool   | `false`                       | Enables Datadog profiling for the Full-Host Profiler process itself. This doesn't control profiling of your workloads. |
| `hostprofiler.ddprofiling.period`   | int    | `60` seconds when enabled     | Self-profiling collection interval. Used only when `hostprofiler.ddprofiling.enabled` is `true`.                       |
| `hostprofiler.ddprofiling.port`     | int    | `7501`                        | Local port used by the self-profiling HTTP server. Used only when `hostprofiler.ddprofiling.enabled` is `true`. Change this only if the default port conflicts with another service. |

## After deployment

Profiles appear on the [Datadog Profiler][20] page within a few minutes after deployment. If profiles don't appear, see [Troubleshooting][21].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/enabling/full_host/#supported-environments
[2]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[3]: /containers/guide/changing_container_registry/
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/apparmor-profile
[6]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[7]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/helm/collector-values.yaml
[8]: /getting_started/site/
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml
[10]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/helm/collector-config-values.yaml
[11]: https://opentelemetry.io/docs/collector/configuration/
[12]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/helm/network-policy-values.yaml
[13]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/helm/cilium-network-policy-values.yaml
[14]: https://opentelemetry.io/docs/kubernetes/operator/
[15]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/operator/collector.yaml
[16]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/operator/rbac.yaml
[17]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/operator/network-policy.yaml
[18]: https://github.com/DataDog/datadog-agent/blob/main/cmd/host-profiler/deploy/standalone/operator/cilium-network-policy.yaml
[19]: https://pkg.go.dev/go.opentelemetry.io/collector/exporter/debugexporter#readme-verbosity-levels
[20]: https://app.datadoghq.com/profiling
[21]: /profiler/profiler_troubleshooting/full_host/
