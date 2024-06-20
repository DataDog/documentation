---
title: Setting up Cloud Security Management on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 80 # a number that represents relative weight. 
---

Use the following instructions to enable Cloud Security Management's Misconfigurations, Threat Detection, Host Vulnerability Management, and Container Vulnerability Management features.

## Prerequisites

- Datadog Agent version `7.46` or later.

## Installation

For a package-based deployment, install the Datadog package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

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
  # Set to true to enable Host Vulnerability Management  
  host:
    enabled: true
container_image:
  enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
{{< /code-block >}}

**Notes**: 

- You can also use the following [Agent install script][5] to automatically enable the Misconfigurations and Threat Detection features:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
  ```

- By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and `system-probe.yaml` files need to be updated.
- If you use the Agent install script to enable Misconfigurations and Threat Detection, you must manually update the `datadog.yaml` file to enable `host_benchmarks` for Misconfigurations, and `sbom` and `container_image` for Container Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /getting_started/agent/#installation
