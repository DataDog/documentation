---
aliases:
- /es/integrations/azure_datalakeanalytics
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Data Lake Analytics.
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
draft: false
git_integration_title: azure_data_lake_analytics
has_logo: true
integration_id: azure-datalakeanalytics
integration_title: Microsoft Azure Data Lake Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_analytics
public_title: Integración de Datadog y Microsoft Azure Data Lake Analytics
short_description: Rastrea las métricas clave de Azure Data Lake Analytics.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Data Lake Analytics es un servicio de trabajo de análisis bajo demanda que simplifica el big data.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Lake Analytics.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_data_lake_analytics" >}}


### Eventos

La integración Azure Data Lake Analytics no incluye eventos.

### Checks de servicios

La integración Azure Data Lake Analytics no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/es/help/