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

Use the following instructions to enable Misconfigurations and Cloud Security Vulnerabilities.

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
  # Set to true to enable container image vulnerability scanning
  container_image:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Set to true to enable host vulnerability scanning
  host:
    enabled: true
    # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
    analyzers: ["os", "languages"]
  # Enables runtime package prioritization (Agent 7.79+)
  # See Runtime Package Prioritization section below.
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

**Note**: `enrichment.usage.enabled: true` requires Datadog Agent **7.79.0 or later**. See the [Runtime Package Prioritization](#runtime-package-prioritization) section for requirements.

If `/etc/datadog-agent/security-agent.yaml` does not exist, create it from the example file shipped with the Agent and give the `dd-agent` group read access:

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

Then enable Misconfigurations in `security-agent.yaml`:

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

{{% csm-language-package-managers %}}

## Runtime Package Prioritization

{{% csm-runtime-package-prioritization %}}

Add the `enrichment` block to the `sbom` section of your `datadog.yaml` file:

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
sbom:
  enabled: true
  container_image:
    enabled: true
  # Enables runtime package prioritization (Agent 7.79+)
  enrichment:
    usage:
      enabled: true
{{< /code-block >}}

Restart the Agent after applying the changes.

To verify the setup, filter vulnerability findings by [runtime signals][9].

**Notes**:

- You can also use the following [Agent install script][5] to automatically enable Misconfigurations:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- The Agent install script doesn't enable host benchmarks or Cloud Security Vulnerabilities. If you use the script, manually update the `datadog.yaml` file to enable `host_benchmarks` for Misconfigurations, and `sbom` and `container_image` for Cloud Security Vulnerabilities.

[5]: /getting_started/agent/#installation
[6]: /agent/?tab=Linux
[9]: /security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
