---
app_id: azure-hdinsight
app_uuid: 2b5359ca-2d39-4a43-8f8a-49ec30f6bee3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.hdinsight_clusters.gateway_requests
      metadata_path: metadata.csv
      prefix: azure.hdinsight_clusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 294
    source_type_name: Azure HD Insight
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
git_integration_title: azure_hd_insight
integration_id: azure-hdinsight
integration_title: Azure HD Insight
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_hd_insight
public_title: Azure HD Insight
short_description: Rastrea las métricas clave de Azure HD Insight.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure HD Insight.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure HD Insight
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure HDInsight es un servicio en la nube que permite procesar de forma fácil, rápida y rentable grandes cantidades de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure HDInsight.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_hd_insight" >}}


### Eventos

La integración Azure HDInsight no incluye ningún evento.

### Checks de servicio

La integración Azure HDInsight no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/es/help/