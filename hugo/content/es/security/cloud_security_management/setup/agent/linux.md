---
aliases:
- /es/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /es/security/cloud_security_management/setup/csm_pro/agent/linux/
- /es/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Configuración de Cloud Security en Linux
type: multi-code-lang
---

Siga las siguientes instrucciones para activar la Gestión de Vulnerabilidades y Desconfiguraciones.

{{< partial name="security-platform/CSW-billing-note.html" >}}


## Requisitos previos

- Datadog Agent versión `7.46` o posterior.

## Instalación

Para una implantación basada en paquetes, [instale el paquete Datadog ][6] con su gestor de paquetes y, a continuación, actualice los archivos que se indican a continuación.

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
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
compliance_config:
  ## @param activado - booleano - opcional - predeterminado: false
  ## Establécelo en true para habilitar los referencias CIS para Misconfigurations.
  #
  activado: true
 host_benchmarks:
    activado: true
{{< /code-block >}}

**Notas**: 

- También puedes utilizar el siguiente [script de instalación del Agent][5] para activar automáticamente Misconfigurations y Threat Detection:

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Si utiliza el script de instalación Agent para activar Misconfigurations y Vulnerability Management, debe actualizar manualmente el archivo `datadog.yaml` para activar `host_benchmarks` para Misconfigurations, y `sbom` y `container_image` para Vulnerability Management.

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/threats
[3]: /es/security/cloud_security_management/vulnerabilities
[4]: /es/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /es/getting_started/agent/#installation
[6]: /es/agent/?tab=Linux