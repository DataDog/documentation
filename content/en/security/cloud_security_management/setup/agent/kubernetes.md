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

Use the following instructions to enable Misconfigurations and Vulnerability Management.

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

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables Host Vulnerability Management
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Preview, Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. Apply the changes and restart the Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

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
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables Host Vulnerability Management
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Preview, Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. Add the following environment variables to every Agent container in the `daemonset.yaml` file, including `agent`, `security-agent`, and `system-probe`. These variables enable Misconfigurations, Vulnerability Management, mount-based container image scanning, and runtime package prioritization.

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

**Note**: `enrichment.usage.enabled: true` is in Preview and requires Datadog Agent **7.79.0 or later**. From 7.79.0, runtime package prioritization runs independently of [Workload Protection][8] and does not affect its usage. See the [Runtime Package Prioritization](#runtime-package-prioritization-preview) section for more details.

**Note**: The `languages` analyzer requires Datadog Agent **7.70 or later**. When enabled, it detects vulnerabilities in application libraries managed by the package managers below, in addition to OS packages. When the `analyzers` field is omitted, Datadog only scans OS packages for container images.

### Supported application library package managers

The `languages` analyzer covers the following package ecosystems:

| Ecosystem | Package manager/format |
|-----------|------------------------|
| Ruby | Bundler, GemSpec |
| Rust | Cargo, Rust binary |
| PHP | Composer |
| Java | Jar, Maven (pom.xml), Gradle lock, Sbt lock |
| JavaScript | npm (package-lock.json), Yarn, pnpm, Node package |
| .NET | NuGet, .NET Core, PackagesProps |
| Python | Python package (egg), pip, Pipenv, Poetry, uv, Conda package, Conda environment |
| Go | Go binary, Go modules |
| C/C++ | Conan lock |
| Swift / Objective-C | CocoaPods, Swift |
| Dart | PubSpec lock |
| Elixir | Mix lock |
| Julia | Julia |

## Runtime Package Prioritization (Preview)

Runtime package prioritization enriches each vulnerability finding with real-time signals from the running environment. When enabled, the Agent uses eBPF to monitor file access at runtime and records how packages are actually used by running processes.

Each vulnerability finding is enriched with the following signals:

| Signal | Description |
|--------|-------------|
| Package is running | The package files are actively being accessed by running processes. |
| Accessed by root process | The package is being accessed by a process running as root (UID 0). |
| SUID binary present | The package contains a binary with the SUID bit set, which can enable privilege escalation. |

These signals power vulnerability prioritization in Cloud Security, surfacing findings where vulnerable code is confirmed running in production.

**Requirements**:
- Datadog Agent **7.79.0 or later**
- Linux only (eBPF dependency)

**Note**: Use Datadog Agent **7.79.0 or later**. Earlier Agent versions enable this feature through [Workload Protection][8] and can affect its usage. From 7.79.0, runtime package prioritization runs independently and does not affect its usage.

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
      # Enables runtime package prioritization (Preview, Agent 7.79+)
      enrichment:
        usage:
          enabled: true
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
    # Enables runtime package prioritization (Preview, Agent 7.79+)
    enrichment:
      usage:
        enabled: true
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

Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[8]: /security/workload_protection/
