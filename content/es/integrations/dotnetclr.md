---
app_id: dotnetclr
app_uuid: 2147d078-2742-413e-83eb-58400657de56
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dotnetclr.memory.time_in_gc
      metadata_path: metadata.csv
      prefix: dotnetclr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10069
    source_type_name: CLR .NET
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md
display_on_public_website: true
draft: false
git_integration_title: dotnetclr
integration_id: dotnetclr
integration_title: CLR .NET
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: dotnetclr
public_title: CLR .NET
short_description: Visualizar y monitorizar estados de Dotnetclr
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Lenguajes
  - Category::Windows
  - Offering::Integración
  configuration: README.md#Configuración
  description: Visualizar y monitorizar estados de Dotnetclr
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: CLR .NET
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas del servicio CLR .NET en tiempo real para:

- Visualiza y monitoriza estados CLR .NET.
- Recibe notificaciones sobre fallos y eventos CLR .NET.

## Configuración

### Instalación

El check de CLR .NET está incluido en el paquete del [Datadog Agent][1]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `dotnetclr.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2], para empezar a recopilar los datos de rendimiento de tu CLR .NET. Para conocer todas las opciones de configuración disponibles, consulta el [dotnetclr.d/conf.yaml de ejemplo][3].
2. [Reinicia el Agent][4].

**Nota**: Las versiones 1.10.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para los hosts que no pueden utilizar Python 3, o si quieres utilizar una versión heredada de este check, consulta la siguiente [configuración][5].

## Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `dotnetclr` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "dotnetclr" >}}


### Checks de servicios

El check de CLR .NET no incluye checks de servicio.

### Eventos

El check de CLR .NET no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/es/help/