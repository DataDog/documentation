---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /es/security/cloud_security_management/setup/csm_pro/agent/linux/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Configuración de Cloud Security Management en Linux
type: multi-code-lang
---

Sigue las instrucciones a continuación para activar las funciones de Misconfigurations, Threat Detection y Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Requisitos previos

- Datadog Agent versión `7.46` o posterior.

## Instalación

Para una implementación basada en paquetes, [instala el paquete de Datadog][6] con tu gestor de paquetes y, a continuación, actualiza los archivos `datadog.yaml`, `security-agent.yaml` y `system-probe.yaml`.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
remote_configuration:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establecer en true para habilitar la configuración remota.
  activado: true

runtime_security_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establecer en true para activar la Threat Detection
  activado: true

compliance_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establécelo en true para habilitar los referencias CIS para Misconfigurations.
  #
  activado: true
  host_benchmarks:
    activado: true

# Las vulnerabilidades se evalúan y escanean en comparación con tus contenedores y hosts cada hora.
sbom:
  activado: true
  # Establécelo en true para activar Container Vulnerability Management
  container_image:
    activado: true
  # Establécelo en true para activar Host Vulnerability Management
  host:
    activado: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establécelo en true para activar Threat Detection
  activado: true

compliance_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establécelo en true para habilitar los referencias CIS para Misconfigurations.
  #
  activado: true
 host_benchmarks:
    activado: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establécelo en true para activar Threat Detection
  activado: true

  remote_configuration:
    ## @param activado - booleano - opcional - predeterminado: false
    activado: true
{{< /code-block >}}

**Notas**:

- También puedes utilizar el siguiente [script de instalación del Agent][5] para activar automáticamente Misconfigurations y Threat Detection:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Por defecto, Runtime Security está desactivado. Para activarlo, es necesario actualizar los archivos `security-agent.yaml` y `system-probe.yaml`.
- Si utilizas el script de instalación del Agent para activar Misconfigurations y Threat Detection, debes actualizar manualmente el archivo `datadog.yaml` para habilitar `host_benchmarks` para Misconfigurations, y `sbom` y `container_image` para Container Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /es/getting_started/agent/#installation
[6]: /es/agent/?tab=Linux