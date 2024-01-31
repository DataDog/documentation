---
title: Enabling CSM Enterprise on Linux
kind: documentation
code_lang: linux
type: multi-code-lang
code_lang_weight: 80 # a number that represents relative weight. 
---

Use the following instructions to enable [CSM Misconfigurations][1], [CSM Threats][2], and [CSM Vulnerabilities][3] on your ECS EC2 instances. To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][4].

For a package-based deployment, install the Datadog package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and `system-probe.yaml` files need to be updated.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

**Note**: Vulnerabilities are evaluated and and scanned against your containers and hosts every hour.

```bash
# /etc/datadog-agent/datadog.yaml file
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for CSPM.
  #
  enabled: true
  host_benchmarks:
    enabled: true

sbom:
  enabled: true
  container_image:
    enabled: true
  host:
    enabled: true
container_image:
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for CSPM.
  #
  enabled: true
  host_benchmarks:
    enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable full CSM Threats.
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
```

[1]: /security/misconfigurations/
[2]: /security/threats
[3]: /security/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features