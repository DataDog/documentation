---
"app_id": "ssh"
"app_uuid": "66833cbe-1bfc-4104-9d77-7b828219470b"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "sftp.response_time"
      "metadata_path": "metadata.csv"
      "prefix": "sftp"
    "process_signatures":
    - "ssh"
    - "sftp"
    - "sshd"
    - "sshd:"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "90"
    "source_type_name": "SSH"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "developer tools"
- "network"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "ssh_check"
"integration_id": "ssh"
"integration_title": "SSH"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "ssh_check"
"public_title": "SSH"
"short_description": "Monitoriza la conectividad SSH y la latencia SFTP"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Herramientas para desarrolladores"
  - "Category::Red"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Monitoriza la conectividad SSH y la latencia SFTP"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "SSH"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check te permite monitorizar la conectividad SSH con hosts remotos y los tiempos de respuesta SFTP.

## Configuración

### Instalación

El check de SSH/SFTP está incluido en el paquete del [Datadog Agent][1]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `ssh_check.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [ssh_check.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     - host: "<SOME_REMOTE_HOST>" # required
       username: "<SOME_USERNAME>" # required
       password: "<SOME_PASSWORD>" # or use private_key_file
       # private_key_file: <PATH_TO_PRIVATE_KEY>
       # private_key_type:         # rsa or ecdsa; default is rsa
       # port: 22                  # default is port 22
       # sftp_check: False         # set False to disable SFTP check; default is True
       # add_missing_keys: True    # default is False
   ```

2. [Reinicia el Agent][3] para empezar a enviar métricas y checks de servicio de SSH/SFTP a Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                        |
| -------------------- | ------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `ssh_check`                                                  |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"22", "username":"<USERNAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][2] y busca `ssh_check` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ssh_check" >}}


### Eventos

El check de SSH no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ssh_check" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
