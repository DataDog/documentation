---
title: Enabling CSM Enterprise on Hosts
kind: documentation
code_lang: hosts
type: multi-code-lang
code_lang_weight: 80 # a number that represents relative weight. 
---

For a package-based deployment, install the Datadog package with your package manager, and then update the `datadog.yaml`, `security-agent.yaml`, and `system-probe.yaml` files.

By default, Runtime Security is disabled. To enable it, both the `security-agent.yaml` and `system-probe.yaml` files need to be updated.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

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

### Configure the Agent for Vulnerabilities

The following instructions enables the image metadata collection and [Software Bill of Materials (SBOM)][11] collection in the Datadog Agent. This allows you to scan the libraries in your container images and hosts to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers and hosts every hour.

#### Containers

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
container_image:
  enabled: true
```

#### Hosts

**Note**: CSM Enterprise customers can enable both container and host SBOM collection at the same time by combining the [containers](#containers) setup with the following setup for hosts configuration:

```yaml
sbom:
  enabled: true
  host:
    enabled: true
```