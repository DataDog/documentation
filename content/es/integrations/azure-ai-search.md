---
aliases:
- /es/integrations/azure_ai_search
app_id: azure-ai-search
categories:
- azure
- ia/ml
- métricas
custom_kind: integración
description: Utiliza la integración Azure AI Search para realizar un seguimiento del
  rendimiento y el uso de servicios Azure AI Search.
integration_version: 1.0.0
media: []
title: Azure AI Search
---
## Información general

Azure AI Search proporciona una recuperación de la información para aplicaciones tradicionales y generativas de búsqueda IA. Utiliza la integración Datadog para realizar un seguimiento del rendimiento y el uso de servicios Azure AI Search.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.search_searchservices.search_latency** <br>(gauge) | Latencia media de búsqueda para el servicio de búsqueda<br>_Se muestra como segundos_. |
| **azure.search_searchservices.search_queries_per_second** <br>(gauge) | Consultas de búsqueda por segundo para el servicio de búsqueda<br>_Se muestra como consulta_ |
| **azure.search_searchservices.throttled_search_queries_percentage** <br>(gauge) | Porcentaje de consultas de búsqueda limitadas para el servicio de búsqueda<br>_Se muestra como porcentaje_ |
| **azure.search_searchservices.count** <br>(gauge) | Recuento de todos los recursos de Azure Search|
| **azure.search_searchservices.documents_processed_count** <br>(gauge) | Número de documentos procesados|
| **azure.search_searchservices.skill_execution_count** <br>(gauge) | Número de ejecuciones de habilidades|

### Checks de servicio

Azure AI Search no incluye checks de servicios.

### Eventos

Azure AI Search no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Azure AI Search con Datadog](https://www.datadoghq.com/blog/monitor-azure-ai-search-datadog/)