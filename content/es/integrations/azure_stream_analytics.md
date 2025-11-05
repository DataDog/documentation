---
app_id: azure-streamanalytics
app_uuid: 190f11bb-ba6e-42ed-bdf8-b86c747d64be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.streamanalytics_streamingjobs.input_events
      metadata_path: metadata.csv
      prefix: azure.streamanalytics_streamingjobs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 302
    source_type_name: Azure Flujo (stream) Analytics
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
git_integration_title: azure_stream_analytics
integration_id: azure-streamanalytics
integration_title: Azure Flujo (stream) Analytics
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_stream_analytics
public_title: Azure Flujo (stream) Analytics
short_description: Rastrea las métricas clave de Azure Stream Analytics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Stream Analytics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Flujo (stream) Analytics
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Stream Analytics es un motor de procesamiento de eventos que te permite examinar grandes volúmenes de transmisión de datos procedentes de dispositivos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Stream Analytics.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-streamanalytics" }}


### Eventos

La integración Azure Stream Analytics no incluye eventos.

### Checks de servicio

La integración Azure Stream Analytics no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_stream_analytics/azure_stream_analytics_metadata.csv
[3]: https://docs.datadoghq.com/es/help/