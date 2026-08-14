---
title: Setting up Cloud Security on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 80 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
  - /security/cloud_security_management/setup/csm_pro/agent/linux/
  - /security/cloud_security_management/setup/csm_enterprise/agent/linux/
---

Use the following instructions to enable Misconfigurations and Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Prerequisites

- Datadog Agent version `7.46` or later.

## Installation

For a package-based deployment, [install the Datadog package][6] with your package manager, and then update the files listed below.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**Note**: `enrichment.usage.enabled: true` is in Preview and requires Datadog Agent **7.79.0 or later**. From 7.79.0, runtime package prioritization runs independently of [{{< prodname >}}Workload Protection{{< /prodname >}}][7] and does not affect its usage. See the [Runtime Package Prioritization](#runtime-package-prioritization-preview) section for more details.

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**Note**: The `languages` analyzer requires Datadog Agent **7.70 or later**. When enabled, it detects vulnerabilities in application libraries managed by package managers such as npm, pip, Maven/Gradle, NuGet, Go modules, Cargo, and Bundler, in addition to OS packages. When the `analyzers` field is omitted, only OS packages are scanned for container images. See [Supported application library package managers](#supported-application-library-package-managers) for the full list.

### Supported application library package managers

The `languages` analyzer covers the following package ecosystems:

| Ecosystem | Package manager / format |
|-----------|--------------------------|
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

Runtime package prioritization identifies which packages in a container image are used at runtime, so you can prioritize vulnerabilities in code that runs over vulnerabilities in packages that are installed but never executed.

When enabled, the Agent uses eBPF to observe file access on your workloads and adds these signals to vulnerability findings for that image:

| Signal | What it tells you |
|--------|-------------------|
| Package is running | The package's files were observed being accessed by a running process. |
| Accessed by root process | The package was accessed by a process running as root (UID 0). |
| SUID binary present | The package contains a binary with the SUID bit set, which can enable privilege escalation. |

*Package is running* feeds the **Reachability** dimension of the [Runtime Prioritization Engine][8]. To query these signals directly, see [Filter findings by runtime signals][9].

**Requirements**:
- Datadog Agent **7.79.0 or later**
- Linux only (eBPF dependency)
- Applies to operating system packages in container image vulnerability findings

**Note**: Use Datadog Agent **7.79.0 or later**. Earlier Agent versions enable this feature through [{{< prodname >}}Workload Protection{{< /prodname >}}][7] and can affect its usage. From 7.79.0, runtime package prioritization runs independently and does not affect its usage.

Add the `enrichment` block to the `sbom` section of your `datadog.yaml` file:

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Preview, Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

Restart the Agent after applying the changes.

**Notes**:

- You can also use the following [Agent install script][5] to automatically enable Misconfigurations and Threat Detection:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- If you use the Agent install script to enable Misconfigurations and Vulnerability Management, you must manually update the `datadog.yaml` file to enable `host_benchmarks` for Misconfigurations, and `sbom` and `container_image` for Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /getting_started/agent/#installation
[6]: /agent/?tab=Linux
[7]: /security/workload_protection/
[8]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[9]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
