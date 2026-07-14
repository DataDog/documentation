---
app_id: silk
app_uuid: 1f436ae6-e063-408f-ad35-37ee37fa2183
assets:
  dashboards:
    Silk - Overview: assets/dashboards/silk_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: silk.system.capacity.free
      metadata_path: metadata.csv
      prefix: silk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10250
    source_type_name: Silk
  monitors:
    Latency is high: assets/monitors/latency_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- almacenes de datos
- suministrar
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silk/README.md
display_on_public_website: true
draft: false
git_integration_title: silk
integration_id: silk
integration_title: Silk
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: silk
public_title: Silk
short_description: Monitoriza el rendimiento de Silk y estadísticas del sistema.
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
  - Category::Data Stores
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza el rendimiento de Silk y estadísticas del sistema.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Silk
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza a [Silk][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Silk está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `silk.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu Silk. Para conocer todas las opciones de configuración disponibles, consulta el [silk.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `silk` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "silk" >}}


### Eventos

La integración de Silk registra eventos emitidos por el servidor de Silk. Los niveles de evento se asignan de la siguiente manera:

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### Checks de servicio
{{< get-service-checks-from-git "silk" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/