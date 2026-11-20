---
app_id: avi-vantage
app_uuid: a3f11e6a-fdb7-421d-ad5c-dbfa987b8df8
assets:
  dashboards:
    Avi Vantage - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - avi_vantage.controller_stats.avg_cpu_usage
      - avi_vantage.pool_healthscore
      - avi_vantage.service_engine_healthscore
      - avi_vantage.virtual_service_healthscore
      metadata_path: metadata.csv
      prefix: avi_vantage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10189
    source_type_name: Avi Vantage
  monitors:
    Virtual service has a high number of errors: assets/monitors/error_rate_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md
display_on_public_website: true
draft: false
git_integration_title: avi_vantage
integration_id: avi-vantage
integration_title: Avi Vantage
integration_version: 5.3.0
is_public: true
manifest_version: 2.0.0
name: avi_vantage
public_title: Avi Vantage
short_description: Monitorizar el mantenimiento y el rendimiento de tus instancias
  de Avi Vantage
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el mantenimiento y el rendimiento de tus instancias de
    Avi Vantage
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Avi Vantage
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Avi Vantage][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Avi Vantage está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `avi_vantage.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu avi_vantage. Para conocer todas las opciones de configuración disponibles, consulta el [avi_vantage.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `avi_vantage` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "avi_vantage" >}}


### Eventos

Avi Vantage no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/