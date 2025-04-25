---
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: Documentación
  text: Más información sobre el resumen de métricas
- link: /metrics/explorer/
  tag: Documentación
  text: Utiliza el Metrics Explorer para explorar y analizar tus métricas
- link: /getting_started/dashboards/
  tag: Documentación
  text: Empezando con dashboards
- link: /getting_started/monitors/
  tag: Documentación
  text: Empezando con monitores
title: Métricas
---

## Información general

Este documento enumera algunas de las métricas disponibles en Observability Pipelines. Puedes:

- Crea tus propios [dashboards][1], [notebooks][2] y [monitores][3] con estas métricas.
- Utiliza el [Resumen de métricas][5] para ver los metadatos y etiquetas (tags) disponibles de las métricas. También puedes ver qué dashboards, notebooks, monitores y SLOs están usando esas métricas.

Consulta [Empezando con etiquetas][4] para obtener más información sobre cómo utilizar etiquetas para agrupar métricas por pipelines, workers y componentes específicos.

## Métrica de uso estimado

Bytes ingeridos de Observability Pipelines
: **Métrica**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **Descripción: el volumen de datos ingeridos por Observability Pipelines. Consulta [Métricas de uso estimado][6] para obtener más información.

## Métricas de pipeline

Bytes por segundo
: **Métricas**: `pipelines.host.network_receive_bytes_total`
: **Descripción:** el número de eventos que recibe el pipeline por segundo.

Bytes por segundo
: **Métricas**: `pipelines.host.network_receive_bytes_total`
: **Descripción:** el número de bytes que el pipeline recibe por segundo.

## Métricas de componente

Estas métricas están disponibles para fuentes, procesadores y destinos.

Bytes por segundo
: **Métrica**: `pipelines.component_received_bytes_total`
: **Descripción**: el número de bytes que recibe el componente por segundo.
: **Disponible para**: fuentes, procesadores y destinos.

Bytes por segundo
: **Métrica**: `pipelines.component_sent_event_bytes_total`
: **Descripción**: el número de bytes que el componente envía a los destinos.
: **Disponible para**: fuentes, procesadores y destinos.

Entrada de eventos por segundo
: **Métrica**: `pipelines.component_received_event_bytes_total`
: **Descripción**: el número de eventos que el componente recibe por segundo.
: **Disponible para**: fuentes, procesadores y destinos.

Salida de eventos por segundo
: **Métrica**: `pipelines.component_sent_event_bytes_total`
: **Descripción**: el número de eventos que el componente envía a los destinos.
: **Disponible para**: fuentes, procesadores y destinos.

Errores
: **Métrica**: `pipelines.component_errors_total`
: **Descripción**: el número de errores encontrados por el componente.
: **Disponible para**: fuentes, procesadores y destinos.

Datos eliminados intencionalmente o no intencionalmente
: **Métrica**: `pipelines.component_discarded_events_total`
: **Descripción: el número de eventos eliminados. **Nota**: Para desglosar esta métrica, utiliza la etiqueta `intentional:true` para filtrar los eventos que se eliminaron intencionalmente o la etiqueta `intentional:false` para los eventos que no se eliminaron intencionalmente.
: **Disponible para**: fuentes, procesadores y destinos.

Utilización
: **Métrica**: `pipelines.utilization`
: **Descripción**: la actividad del componente. Un valor de `0` indica un componente inactivo que está esperando una entrada. Un valor de `1` indica un componente que nunca está inactivo, lo que significa que el componente es probablemente un cuello de botella en la topología de procesamiento que está creando contrapresión, lo que podría causar que eventos se eliminen.
: **Disponible para**: procesadores y destinos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/dashboards/
[2]: /es/notebooks/
[3]: /es/getting_started/monitors/
[4]: /es/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/es/account_management/billing/usage_metrics/