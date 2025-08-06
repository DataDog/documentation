---
app_id: hyper-v
app_uuid: 6024e97b-c3c6-45e3-ba71-a48adeebc191
assets:
  dashboards:
    hyper-v: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hyperv.hypervisor_logical_processor.total_run_time
      metadata_path: metadata.csv
      prefix: hyperv.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10046
    source_type_name: HyperV
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- sistema operativo y sistema
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_on_public_website: true
draft: false
git_integration_title: hyperv
integration_id: hyper-v
integration_title: HyperV
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: hyperv
public_title: HyperV
short_description: Monitoriza la tecnología de virtualización de Hyper-V de Microsoft.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::OS & System
  - Category::Windows
  - SO compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza la tecnología de virtualización de Hyper-V de Microsoft.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog
  support: README.md#Soporte
  title: HyperV
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Hyper-V][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Hyper-V está incluido en el paquete del [Datadog Agent][2]. No se necesita ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `hyperv.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para recopilar los datos de rendimiento de Hyper-V. Para conocer todas las opciones de configuración disponibles, consulta el [hyperv.d/conf.yaml de ejemplo][3].

2. [Reinicia el Agent][4].

**Nota**: Las versiones 1.5.0 o posteriores de este check usan una implementación nueva para la recopilación de métricas, que requiere Python 3. Para los hosts que no pueden usar Python 3, o si quieres usar una versión heredada de este check, consulta la siguiente [configuración][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `hyperv` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hyper-v" >}}


### Checks de servicios

Hyper-V no incluye checks de servicio.

### Eventos

Hyper-V no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar Hyper-V de Microsoft con Datadog][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/es/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog
