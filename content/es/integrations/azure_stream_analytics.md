---
aliases:
- /es/integrations/azure_streamanalytics
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Stream Analytics.
doc_link: https://docs.datadoghq.com/integrations/azure_stream_analytics/
draft: false
git_integration_title: azure_stream_analytics
has_logo: true
integration_id: azure-streamanalytics
integration_title: Microsoft Azure Stream Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_stream_analytics
public_title: Integración de Datadog y Microsoft Azure Stream Analytics
short_description: Rastrea las métricas clave de Azure Stream Analytics.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Stream Analytics es un motor de procesamiento de eventos que te permite examinar grandes volúmenes de transmisión de datos procedentes de dispositivos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Stream Analytics.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_stream_analytics" >}}


### Eventos

La integración Azure Stream Analytics no incluye eventos.

### Checks de servicios

La integración Azure Stream Analytics no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_stream_analytics/azure_stream_analytics_metadata.csv
[3]: https://docs.datadoghq.com/es/help/