---
app_id: azure-app-services
app_uuid: 8ff64e3c-1588-478d-9ace-20433839978a
assets:
  dashboards:
    azure_app_service: assets/dashboards/azure_app_service.json
    azure_functions: assets/dashboards/azure_functions.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.app_services.requests
      metadata_path: metadata.csv
      prefix: azure.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 143
    source_type_name: Azure App Services
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_app_services
integration_id: azure-app-services
integration_title: Azure App Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_services
public_title: Azure App Services
short_description: Creación rápida y sencilla de aplicaciones web y móviles para todas
  las plataformas y dispositivos.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Creación rápida y sencilla de aplicaciones web y móviles para todas
    las plataformas y dispositivos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure App Services
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure App Service es una plataforma como servicio (PaaS) que ejecuta aplicaciones web, móviles, de API y de lógica empresarial, al tiempo que gestiona automáticamente los recursos que requieren dichas aplicaciones.

Utiliza la integración de Datadog para recopilar métricas de Azure App Service y:

- Visualizar el rendimiento de tu aplicación
- Correlaciona el rendimiento de Azure App con el resto de tu infraestructura

### Vista de Azure App Service 

Además del dashboard preconfigurado de Azure App Service, también puedes utilizar la vista exclusiva de Azure App Service.

Utiliza la vista de Azure App Service para:

- Identificar rápidamente las aplicaciones con alta latencia o errores

- Realizar un seguimiento del uso de tus aplicaciones web, aplicaciones de funciones y planes de Azure App Service

- Conoce los costes de tus App Service Plans al visualizar las instancias activas e identificar qué aplicaciones están enviando trazas o logs a Datadog

- Asigna las aplicaciones a tus App Service Plans para identificar las aplicaciones que pueden estar generando costes o afectando al rendimiento.

Para habilitar Datadog APM y métricas personalizadas para aplicaciones que se ejecutan en Azure App Service, consulta la [extensión de Datadog Azure App Service][1].

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ningún paso de instalación adicional.

Para opciones adicionales de monitorización, como la recolección de logs y la inyección de ID de trazas, consulta la [extensión de Azure App Service][1].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_app_services" >}}


### Eventos

La integración Azure App Service no incluye eventos.

### Checks de servicio

La integración Azure App Service no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://docs.datadoghq.com/es/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/es/help/