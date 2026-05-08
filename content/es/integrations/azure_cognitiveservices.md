---
app_id: azure-cognitiveservices
app_uuid: 0d77c8ca-d9b6-46a5-925e-c942e00425a2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.cognitiveservices_accounts.total_calls
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 282
    source_type_name: Azure Cognitive Services
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
git_integration_title: azure_cognitiveservices
integration_id: azure-cognitiveservices
integration_title: Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cognitiveservices
public_title: Azure Cognitive Services
short_description: Rastrea las métricas clave de Azure Cognitive Services.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Cognitive Services.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Cognitive Services
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Cognitive Services son API, SDK y servicios disponibles para ayudar a los desarrolladores a crear aplicaciones inteligentes sin necesidad de tener habilidades o conocimientos directos de inteligencia artificial o ciencia de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Cognitive Services.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ninguna instalación adicional.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_cognitiveservices" >}}


### Eventos

La integración Azure Cognitive Services no incluye eventos.

### Checks de servicio

La integración Azure Cognitive Services no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/es/help/