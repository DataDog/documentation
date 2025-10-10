---
app_id: windows-performance-counters
app_uuid: ec86de4d-a080-4160-8b0a-b937bbea08e9
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10241
    source_type_name: Contadores de rendimiento de Windows
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- iot
- Windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_performance_counters
integration_id: windows-performance-counters
integration_title: Contadores de rendimiento de Windows
integration_version: 3.1.0
is_public: true
manifest_version: 2.0.0
name: windows_performance_counters
public_title: Contadores de rendimiento de Windows
short_description: Monitoriza contadores de rendimiento en los sistemas operativos
  Windows.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::IoT
  - Category::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza contadores de rendimiento en los sistemas operativos Windows.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/windows-performance-counters-datadog/
  support: README.md#Support
  title: Contadores de rendimiento de Windows
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [contadores de rendimiento de Windows][1] a través del Datadog Agent.

**Nota:** la versión mínima compatible del Agent es la versión 7.33.0.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de los contadores de rendimiento de Windows se incluye en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `windows_performance_counters.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de windows_performance_counters. Ve el [windows_performance_counters.d/conf.yaml de ejemplo][4] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `windows_performance_counters` en la sección Checks.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por el check de los contadores de rendimiento de Windows son reenviadas a Datadog como [métricas personalizadas][7], lo que puede afectar a tu [facturación][8].

### Eventos

La integración de los contadores de rendimiento de Windows no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "windows_performance_counters" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitoriza los contadores de rendimiento de Windows con Datadog][11]

[1]: https://docs.microsoft.com/en-us/windows/win32/perfctrs/about-performance-counters
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/datadog_checks/windows_performance_counters/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/es/account_management/billing/custom_metrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/windows_performance_counters/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/windows-performance-counters-datadog/