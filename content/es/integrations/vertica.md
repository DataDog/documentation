---
app_id: vertica
app_uuid: c5946789-de76-4ec6-9485-db83dd66fd28
assets:
  dashboards:
    Vertica Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vertica.connection.active
      metadata_path: metadata.csv
      prefix: vertica.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10072
    source_type_name: Vertica
  monitors:
    Vertica Nodes down above K-safety level: assets/monitors/vertica_replication_safety.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vertica/README.md
display_on_public_website: true
draft: false
git_integration_title: vertica
integration_id: vertica
integration_title: Vertica
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: vertica
public_title: Vertica
short_description: Monitoriza el almacenamiento de proyección de Vertica, el uso de
  licencias y más.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el almacenamiento de proyección de Vertica, el uso de licencias
    y más.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Vertica
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Vertica][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Vertica está incluido en el paquete del [Datadog Agent][2]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

Edita el archivo `vertica.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Vertica. Para conocer todas las opciones de configuración disponibles, consulta el [vertica.d/conf.yaml de ejemplo][3].

#### Activación de SSL

La integración Vertica permite conectarse a Vertica a través de SSL. Para activarla, configura `use_tls` en `conf.yaml` como `true`. 

**Nota**: Para las versiones 1.9.0 o anteriores de la integración Vertica, configura `tls_verify` como `true`. Para la compatibilidad legacy, si `tls_verify` se configura explícitamente como `true`, `use_tls` se configura como `true`.

#### Preparación de Vertica

Crea un usuario de base de datos para el Datadog Agent. Desde [vsql][4], conéctate a la base de datos como superusuario. A continuación, ejecuta la sentencia `CREATE USER`.

```text
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

El usuario utilizado para conectarse a la base de datos debe tener el rol [SYSMONITOR][5] para poder acceder a las tablas del sistema de monitorización.

```text
GRANT SYSMONITOR TO datadog WITH ADMIN OPTION;
```

Debido a que las métricas para el uso actual de la licencia utiliza los valores de la [auditoría][6] más reciente, Datadog recomienda programar las auditorías para que se produzcan con la mayor frecuencia posible. Para obtener más información, consulta la [guía de licencias de auditoría de Vertica][7].

[Reinicia el Agent][8] para empezar a enviar métricas de Vertica a Datadog.

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `vertica.d/conf.yaml` para empezar a recopilar logs de Vertica:

    ```yaml
    logs:
      - source: vertica
        type: file
        path: "/<CATALOG_PATH>/<DATABASE_NAME>/<NODE_NAME>_catalog/vertica.log"
        service: vertica
    ```

3. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `vertica` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "vertica" >}}


### Eventos

Vertica no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "vertica" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].


[1]: https://www.vertica.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example
[4]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/Glossary/vsql.htm
[5]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/DBUsersAndPrivileges/Roles/SYSMONITORROLE.htm
[6]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/SQLReferenceManual/Functions/VerticaFunctions/LicenseManagement/AUDIT_LICENSE_SIZE.htm
[7]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Licensing/MonitoringDatabaseSizeForLicenseCompliance.htm
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/vertica/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/vertica/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/