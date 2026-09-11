---
aliases:
- /fr/security/workload_protection/setup/agent/linux
description: Activez Workload Protection sur les hosts Linux avec le Datadog Agent
  basé sur eBPF.
disable_toc: false
title: Configuration de Workload Protection sur Linux (avec eBPF)
---
Utilisez les instructions suivantes pour activer Workload Protection.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Prérequis {#prerequisites}

- Datadog Agent version `7.46` ou ultérieure.

## Installation {#installation}

Pour un déploiement basé sur des paquets, [installez le paquet Datadog][6] avec votre gestionnaire de paquets, puis mettez à jour les fichiers `datadog.yaml`, `security-agent.yaml` et `system-probe.yaml`.

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

**Remarques** :

- Vous pouvez également utiliser le [Agent install script][5] suivant pour activer automatiquement Misconfigurations et Threat Detection :

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Par défaut, Runtime Security est désactivé. Pour l'activer, les fichiers `security-agent.yaml` et `system-probe.yaml` doivent tous deux être mis à jour.
- Si vous utilisez le Agent install script pour activer Misconfigurations et Threat Detection, vous devez mettre à jour manuellement le fichier `datadog.yaml` pour activer `host_benchmarks` pour Misconfigurations, et `sbom` et `container_image` pour Container Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```


[5]: /fr/getting_started/agent/#installation
[6]: /fr/agent/?tab=Linux