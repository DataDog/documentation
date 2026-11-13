---
aliases:
- /es/security/workload_protection/setup/agent/linux
description: Habilite Workload Protection en hosts Linux con el Datadog Agent basado
  en eBPF.
disable_toc: false
title: Configuración de Workload Protection en Linux (con eBPF)
---
Utilice las siguientes instrucciones para habilitar Workload Protection.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- Datadog Agent versión `7.46` o superior.

## Instalación {#installation}

Para una implementación basada en paquetes, [instale el paquete de Datadog][6] con su administrador de paquetes y, luego, actualice los archivos `datadog.yaml`, `security-agent.yaml` y `system-probe.yaml`.

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

**Notas**:

- También puede utilizar el siguiente [Agent install script][5] para habilitar automáticamente Misconfigurations and Threat Detection:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- De forma predeterminada, Runtime Security está deshabilitado. Para habilitarla, es necesario actualizar los archivos `security-agent.yaml` y `system-probe.yaml`.
- Si utiliza el script de instalación del Agent para habilitar Misconfigurations and Threat Detection, debe actualizar manualmente el archivo `datadog.yaml` para habilitar `host_benchmarks` para Misconfigurations, y `sbom` y `container_image` para contenedor Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```


[5]: /es/getting_started/agent/#installation
[6]: /es/agent/?tab=Linux