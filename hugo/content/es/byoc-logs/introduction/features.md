---
aliases:
- /es/cloudprem/introduction/features/
description: Aprenda qué funciones de Datadog Log Explorer son compatibles con BYOC
  Logs
title: Funciones compatibles
---
## Descripción general {#overview}

Datadog BYOC (Bring Your Own Cloud) Logs lleva las capacidades principales de Log Explorer a su entorno autohospedado. Esta página describe las funciones disponibles, señala cualquier diferencia con la plataforma SaaS y le ayuda a planificar sus flujos de trabajo de registros.

## Funciones compatibles {#supported-features}

### Búsqueda y visualización {#search-and-visualization}

- Búsqueda de texto completo en cualquier atributo de registro
- Visualizaciones de lista, series temporales, lista principal, tabla, mapa de árbol, gráfico circular y gráfico de dispersión
- Agrupación en Fields y Patterns (excepto el desplazamiento temporal mensual)
- Agrupar y ordenar, incluyendo agrupar y ordenar con conteo único
- Consultas con agrupación plana
- Filtrado y desglose basados en facetas
- Descarga de CSV
- Paginación
- Notebooks (Vista previa)

### Dashboards y monitores {#dashboards-and-monitors}

- Dashboards con datos de BYOC Logs
- Monitores de registros en índices de BYOC Logs

### Gestión de índices {#index-management}

- Índices múltiples con periodos de retención y reglas de enrutamiento independientes

### Control de acceso {#access-control}

- RBAC mediante [consultas de restricción de registros][1]

### Correlación {#correlation}

- Correlación de un registro en BYOC Logs con métricas enviadas a Datadog SaaS
- Correlación de un registro en BYOC Logs con trazas enviadas a Datadog SaaS
- Correlación de un registro en BYOC Logs con procesos enviados a Datadog SaaS

### Procesamiento {#processing}

- Pipelines de procesamiento configurables mediante Observability Pipelines
- Conexión de Observability Pipeline

### Funciones de IA {#ai-features}

- Bits Investigation (Vista previa)
- MCP Server (Vista previa)

## Funciones no compatibles {#unsupported-features}

BYOC Logs no admite las siguientes características:

- SIEM
- Watchdog
- Búsqueda federada
- LiveTail
- Visualizar el contexto del registro

### Capacidades de consulta no compatibles {#unsupported-query-capabilities}

- Consulta CIDR
- Agrupar por transacciones
- Capacidades de consulta avanzadas:
  - Campos calculados
  - Extracción Grok (parseo en tiempo de consulta)

[1]: /es/api/latest/logs-restriction-queries/