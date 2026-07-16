---
description: Descubre qué funciones del Datadog Log Explorer son compatibles con CloudPrem.
title: Funciones compatibles
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}
## Información general

Datadog CloudPrem lleva las principales funciones del Log Explorer a tu entorno autoalojado. En la página se describen las funciones disponibles, se indican las diferencias con la plataforma SaaS y se te ayuda a planificar tus flujos de logs.

## Funciones compatibles

Las siguientes funciones de logs ya son compatibles:
- Búsqueda de texto completo en cualquier atributo de log
- Visualización de listas, series temporales, listas principales, tablas, diagramas de árbol, gráficos circulares y diagramas de dispersión
- Agrupación por campos y patrones (excepto el cambio de horario mensual)
- Dashboards
- Monitores de logs
- RBAC a través de [consultas de restricción de logs][1]
- Descargar CSV
- Correlación de un log a las métricas enviadas a Datadog SaaS (aún no se admite la operación inversa).
- Correlación de un log a las trazas (traces) enviadas a Datadog SaaS (aún no se admite la operación inversa).

## Funciones no compatibles

El soporte de funciones está evolucionando activamente. Actualmente no se admiten las siguientes:
- Bits AI SRE
- Gestión de índices para múltiples periodos de conservación y necesidades de segmentación
- Notebooks
- Búsqueda federada
- LiveTail
- Watchdogs

[1]: /es/api/latest/logs-restriction-queries/