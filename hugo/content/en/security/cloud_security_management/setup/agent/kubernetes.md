---
title: Setting up Cloud Security on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_pro/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
---

Use the following instructions to enable Misconfigurations and Cloud Security Vulnerabilities.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prerequisites

- Latest Datadog Agent version. For installation instructions, see [Getting Started with the Agent][5] or install the Agent from the [Datadog UI][6].

**Note**: SBOM collection is not compatible with the image streaming feature in Google Kubernetes Engine (GKE). To disable it, see the [Disable Image streaming][7] section of the GKE docs.

## Installation

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Add the following to the `spec` section of the `datadog-agent.yaml` file:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables container image vulnerability scanning
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables host vulnerability scanning
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. Apply the changes and restart the Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `datadog-values.yaml` file:

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables container image vulnerability scanning
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables host vulnerability scanning
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Add the following environment variables to every Agent container in the `daemonset.yaml` file, including `agent`, `security-agent`, and `system-probe`. These variables enable Misconfigurations, Cloud Security Vulnerabilities, mount-based container image scanning, and runtime package prioritization.

    ```yaml
    - name: DD_COMPLIANCE_CONFIG_ENABLED
      value: "true"
    - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
      value: "true"
    - name: DD_SBOM_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
      value: "true"
    - name: DD_SBOM_HOST_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
      value: "true"
    - name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
      value: "true"
    - name: HOST_ROOT
      value: /host/root
    ```

   If your DaemonSet mounts the host root at a different path, set `HOST_ROOT` to that mount path in each Agent container.

2. Set `hostPID: true` in the pod spec and add the following `securityContext` to the `agent` container. These settings are required for mount-based container image scanning with `DD_SBOM_CONTAINER_IMAGE_USE_MOUNT=true`.

    ```yaml
      # Source: datadog/templates/daemonset.yaml
      apiVersion: apps/v1
      kind: DaemonSet
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            hostPID: true
            containers:
            [...]
              - name: agent
                [...]
                securityContext:
                  capabilities:
                    add:
                      - SYS_ADMIN
                  readOnlyRootFilesystem: true
                  appArmorProfile:
                    type: Unconfined
    ```

3. Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

**Note**: `enrichment.usage.enabled: true` requires Datadog Agent **7.79.0 or later**. See the [Runtime Package Prioritization](#runtime-package-prioritization) section for requirements.

**Note**: The `languages` analyzer requires Datadog Agent **7.70 or later**. When enabled, it detects vulnerabilities in application libraries managed by the package managers below, in addition to OS packages. When the `analyzers` field is omitted, Datadog only scans OS packages for container images.

### Supported application library package managers

{{% csm-language-package-managers %}}

## Runtime Package Prioritization

{{% csm-runtime-package-prioritization %}}
- On Kubernetes, Datadog Agent **7.81.0 or later** for the most complete signal coverage.
- On Bottlerocket nodes, the `spc_t` SELinux type for `system-probe`. Bottlerocket's SELinux policy limits an unprivileged container to the files of its own pod. Without this type, only the Agent's own image receives runtime signals. The tabs below show how to set it.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Add the `enrichment` block to the `sbom` section of your `datadog-agent.yaml` file:

```yaml
spec:
  features:
    sbom:
      enabled: true
      containerImage:
        enabled: true
      # Enables runtime package prioritization (Agent 7.79+)
      enrichment:
        usage:
          enabled: true
```

If your nodes run Bottlerocket, also set the SELinux type of the node Agent pod. This override replaces the security context of the pod, so keep `runAsUser: 0`:

```yaml
spec:
  override:
    nodeAgent:
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          user: system_u
          role: system_r
          type: spc_t
          level: s0
```

Apply the changes and restart the Agent.

{{% /tab %}}

{{% tab "Helm" %}}

Add the `enrichment` block to the `sbom` section of your `datadog-values.yaml` file:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    # Enables runtime package prioritization (Agent 7.79+)
    enrichment:
      usage:
        enabled: true
```

If your nodes run Bottlerocket, also add the following to your `datadog-values.yaml` file:

```yaml
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: system_u
          role: system_r
          type: spc_t
          level: s0
```

Restart the Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

Set `hostPID: true` in the pod spec, and add the following environment variables to every Agent container in your `daemonset.yaml` file, including `agent`, `security-agent`, and `system-probe`:

```yaml
# Pod spec
hostPID: true

# Add to each Agent container's env section.
- name: DD_SBOM_ENABLED
  value: "true"
- name: DD_SBOM_CONTAINER_IMAGE_ENABLED
  value: "true"
- name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
  value: "true"
```

If your nodes run Bottlerocket, also add `seLinuxOptions` to the security context of the `system-probe` container:

```yaml
# system-probe container
securityContext:
  seLinuxOptions:
    user: system_u
    role: system_r
    type: spc_t
    level: s0
```

Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

To verify the setup, filter vulnerability findings by [runtime signals][10].

[5]: /getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[10]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
