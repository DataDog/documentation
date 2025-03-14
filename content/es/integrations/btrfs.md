---
app_id: btrfs
app_uuid: 471f9447-678b-4199-9503-7170b65d07c5
assets:
  dashboards:
    btrfs: assets/dashboards/btrfs_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.btrfs.total
      metadata_path: metadata.csv
      prefix: system.disk.btrfs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 89
    source_type_name: Btrfs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/btrfs/README.md
display_on_public_website: true
draft: false
git_integration_title: btrfs
integration_id: btrfs
integration_title: Btrfs
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: btrfs
public_title: Btrfs
short_description: Monitoriza el uso de los volúmenes Btrfs para poder responder antes
  de que se llenen.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Sistema operativo y sistema
  - Offering::Integración
  configuration: README.md#Setup
  description: Monitoriza el uso de los volúmenes Btrfs para poder responder antes
    de que se llenen.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Btrfs
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Métrica de BTRFS][1]

## Información general

Obtén métricas de Btrfs en tiempo real para:

- Visualizar y monitorizar esta estados de Btrfs.

## Configuración

### Instalación

El check de Btrfs está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores que usan al menos un sistema de archivos Btrfs.

### Configuración

1. Edita el archivo `btrfs.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][3]. Para conocer todas las opciones de configuración disponibles, consulta el [btrfs.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `btrfs` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "btrfs" >}}


### Eventos

El check de Btrfs no incluye eventos.

### Checks de servicio

El check de Btrfs no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/btrfs/images/btrfs_metric.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/btrfs/datadog_checks/btrfs/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/btrfs/metadata.csv
[8]: https://docs.datadoghq.com/es/help/