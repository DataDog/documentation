---
app_id: n2ws
app_uuid: 6c0176c4-b878-43e0-a5a8-d280b0fa123e
assets:
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntityTypesDetails.json
    N2WSBackup&Recovery-EntitiesSpecificDashboardV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-EntityTypesDetails.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(ColumnGraphs).json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-BackupSuccessRates(AreasGraphs).json
    N2WSBackup&Recovery-GraphicalVersionV4.0: assets/dashboards/N2WSBackup&Recoveryv4.1-BackupSuccessRates(ColumnGraphs).json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cpm_metric.dashboard_activity.backup_success_num
      metadata_path: metadata.csv
      prefix: cpm_metric.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10129
    source_type_name: N2WS Backup & Recovery
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: N2WS
  sales_email: eliad.eini@n2ws.com
  support_email: eliad.eini@n2ws.com
categories:
- nube
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md
display_on_public_website: true
draft: false
git_integration_title: n2ws
integration_id: n2ws
integration_title: N2WS
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: n2ws
public_title: N2WS
short_description: Ver datos resumidos de todos los hosts conectados de N2WS Backup
  & Recovery
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Ver datos resumidos de todos los hosts conectados de N2WS Backup &
    Recovery
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: N2WS
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general


N2WS Backup & Recovery (CPM), conocido como N2WS, es una solución empresarial de copia de seguridad, recuperación y recuperación de desastres para Amazon Web Services (AWS) y Microsoft Azure. N2WS utiliza tecnologías nativas en la nube (snapshots) para brindar capacidades de copia de seguridad y restauración en AWS y Azure.

Tu instancia de N2WS Backup and Recovery admite la monitorización de copias de seguridad, recuperación de desastres, copia a S3, alertas,
y mucho más con el servicio d emonitorización de Datadog. Esta integración permite a los usuarios monitorizar y analizar las métricas de dashboard de N2WS Backup and Recovery.

## Configuración

### Instalación

1.  Instala la [integración de Python][1].

2.  Habilita la compatibilidad con Datadog en tu instancia de N2WS:
    - Conéctate a tu instancia de N2WS Backup and Recovery con SSH.
    - Añade las líneas siguientes a `/cpmdata/conf/cpmserver.cfg`. Es posible que necesites privilegios `sudo` para realizar esta acción.
        ```
        [external_monitoring]
        enabled=True
        ```
    - Ejecuta `service apache2 restart`

3.  Instala el Datadog Agent en tu instancia de N2WS.
    - Inicia sesión en Datadog y ve a Integrations -> Agent -> Ubuntu (Integraciones -> Agent -> Ubuntu)
    - Copia el comando de instalación en un solo paso del Agent.
    - Conéctate a tu instancia de N2WS Backup and Recovery con SSH y ejecuta el comando. Es posible que necesites privilegios `sudo` para realizar esta acción.

4.  Configura las métricas de dashboard de Datadog:
    - Ve a [**Metrics** -> **Explorer**][2] (Métricas -> Explorador)

    **Gráfico**: selecciona tu métrica en la lista. Todas las métricas de N2WS comienzan con la cadena `cpm_metric`.

    **Sobre**: selecciona los datos de la lista. Todos los datos de los usuarios de N2WS comienzan con la cadena `cpm:user:<user-name>`.
              Puedes seleccionar un usuario específico o toda la instancia de N2WS.


5.  Obtén dashboards de N2WS
    - En [Integraciones de Datadog][3], busca el cuadro `N2WS` e instálalo.
    - Cinco dashboards están instalados en tu cuenta:
    `N2WSBackup&Recovery-Graphicalversion`, `N2WSBackup&Recovery-Graphicalversion-areas` y `N2WSBackup&Recovery-EntitiesSpecificDashboard` para N2WS Backup & Recovery v3.2.1
    **Nota**: Estos dashboards solo están disponibles para los usuarios de AWS.
    `N2WSBackup&Recovery-EntitiesSpecificDashboardV4.1` y `N2WSBackup&Recovery-GraphicalVersionV4.1` para N2WS Backup & Recovery v4.1

    Alternativamente, puedes [importar plantillas JSON desde N2WS][4] para crear tus dashboards.

## Datos recopilados

Datadog recopila los siguientes datos sobre las copias de seguridad de N2WS Backup & Recovery:

- El número de snapshots de cada tipo
- Copias de seguridad correctas (solo AWS)
- Copias de seguridad fallidas (solo AWS)
- Copias de seguridad parcialmente correctas (solo AWS)
- Recursos protegidos de cualquier tipo
- Datos sobre la capacidad del volumen (solo AWS), alertas, etc.

### Métricas
{{< get-metrics-from-git "n2ws" >}}


### Eventos

Datadog recopila los mensajes de alerta de todos los hosts de N2WS Backup & Recovery.

### Checks de servicio

La integración de N2WS Backup & Recovery no incluye ningún check de servicio.

## Solucionar problemas

- [Guía del usuario y documentación de N2WS][6]
- [Soporte de N2WS][7]
- [Soporte de Datadog][8]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations/n2ws
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support
[8]: https://docs.datadoghq.com/es/help/