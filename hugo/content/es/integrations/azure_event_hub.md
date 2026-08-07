---
app_id: azure-event-hub
app_uuid: e56f664a-0315-4b25-a8bf-39bd3eef6063
assets:
  dashboards:
    azure_event_hub: assets/dashboards/azure_event_hub.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.eventhub_namespaces.incoming_bytes_per_sec
      metadata_path: metadata.csv
      prefix: azure.eventhub
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 160
    source_type_name: Azure Event Hub
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- recopilación de logs
- notificaciones
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_event_hub
integration_id: azure-event-hub
integration_title: Azure Event Hub
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_event_hub
public_title: Azure Event Hub
short_description: Azure Events Hub es un servicio gestionado de flujo de datos a
  gran escala
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::Cloud
  - Category::Log Collection
  - Categoría::Notificaciones
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Events Hub es un servicio gestionado de flujo de datos a gran
    escala
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Event Hub
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Event Hub es un servicio gestionado de flujo (stream) de datos a gran escala.

Obtén métricas de Azure Event Hub para:

- Visualizar el rendimiento de tus Event Hubs
- Correlacionar el rendimiento de tus Event Hubs con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de métricas

En el [cuadro de integración de Azure][1], asegúrate de que `Event Hub` esté marcado en la recopilación de métricas.

### Recopilación de logs

Para recopilar logs de Event Hubs, sigue este proceso general:

- Crea un Azure Event Hub desde el portal de Azure, la CLI de Azure o PowerShell.
- Configura la función Azure de Datadog que reenvía logs desde su centro de eventos a Datadog.
- Reenvía tus logs de Event Hubs al Event Hub recién creado.

Para obtener instrucciones detalladas, consulta la [documentación principal sobre logs de Azure][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_event_hub" >}}


### Eventos

La integración Azure Event Hub no incluye eventos.

### Checks de servicio

La integración Azure Event Hub no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://docs.datadoghq.com/es/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/es/help/