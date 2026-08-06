---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Aprenda cómo se ha actualizado la experiencia de Custom Metrics en Datadog
  para reflejar Metric Name Pricing, incluidos los cambios en el modal de Administrar
  Etiquetas, el panel lateral de Métricas, la página de Gestión de Volumen, la página
  de Plan y Uso y las métricas de uso estimadas.
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentación
  text: Metric Name Pricing para Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: Documentación
  text: Métricas de Uso Estimadas
- link: /metrics/volume/
  tag: Documentación
  text: Gestión del Volumen de Métricas
title: Cambios en la Experiencia de Métricas para Metric Name Pricing
---
## Resumen {#overview}

Con el [billing model de Metric Name Pricing][1] para Custom Metrics, Datadog actualizó la experiencia de métricas para reflejar cómo se mide el uso. Esta guía describe lo que ha cambiado en la interfaz de usuario y las API de Datadog para organizaciones en Metric Name Pricing.

**Nota**: Esta página se aplica solo si su organización está en [Metric Name Pricing][1]. Si su contrato utiliza la tarificación por series temporales (cardinalidad), su experiencia de métricas no ha cambiado.

## Resumen de cambios {#summary-of-changes}

| Característica | Descripción |
|---------|-------------|
| [Modal de Administrar Etiquetas](#manage-tags-modal) | Estima el impacto de los cambios de etiquetas en el volumen de puntos en lugar del volumen de cardinalidad. |
| [Panel lateral de Métricas](#metric-side-panel) | Muestra el volumen de puntos ingeridos e indexados en lugar del volumen de series temporales. |
| [Página de Gestión de Volumen](#volume-management-page) | Los gráficos de Resumen de Volumen muestran nuevas dimensiones de facturación para la Tarificación por Nombre de Métrica. |
| [Página de Plan y Uso](#plan--usage-page) | Refleja el desglose de facturación de la Tarificación por Nombre de Métrica. |
| [Métricas de uso estimadas](#estimated-usage-metrics) | Las nuevas métricas de volumen de puntos reemplazan las métricas de uso estimadas basadas en cardinalidad. |

## Modal de Administrar Etiquetas {#manage-tags-modal}

Al configurar etiquetas en Custom Metrics, el **Modal de Administrar Etiquetas** estima el impacto de los cambios de etiquetas en **el volumen de puntos** en lugar del volumen de cardinalidad.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="El Modal de Administrar Etiquetas muestra un gráfico de proyección de uso con tres líneas: uso hasta la fecha del mes, uso con la configuración actual y uso con la configuración propuesta. Las etiquetas de centro de datos y servicio están configuradas en la pestaña Incluir etiquetas." style="width:100%;" >}}

Para más información sobre cómo configurar etiquetas, consulte [Metrics without Limits™][2].

## Panel lateral de métricas {#metric-side-panel}

El panel lateral de detalles de métricas muestra **el volumen de puntos ingeridos e indexados** en lugar del volumen de series temporales.

Para abrir el panel lateral de métricas, haga clic en cualquier nombre de métrica en la [Metrics Summary page][3].

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="El panel lateral de detalles de métricas muestra PUNTOS INGESTADOS y PUNTOS INDEXADOS en la parte superior, junto a Servidores y Valores de etiquetas." style="width:100%;" >}}

## Página de Gestión de Volumen {#volume-management-page}

Los gráficos de Visión General de Volumen en la [Metrics Volume Management page][4] muestran las siguientes dimensiones de facturación de Metric Name Pricing:

- Nombres de métricas únicos estimados
- Volumen de puntos indexados facturables
- Relación de puntos ingeridos a indexados

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Tres gráficos de Visión General de Volumen para Metric Name Pricing: Nombres de Métricas Únicas Estimadas (conteo de métricas con más de 100 puntos indexados hasta la fecha del mes), Total de Puntos Estimados (total de puntos indexados que superan la asignación de 10M por métrica hasta la fecha del mes), y Relación de Puntos Ingeridos a Indexados Estimada." style="width:100%;" >}}

## Página de Plan y Uso {#plan-usage-page}

La [Plan & Usage page][5] refleja el desglose de facturación de Metric Name Pricing para organizaciones en el nuevo modelo.

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="La Plan & Usage Cost Breakdown page muestra Puntos Indexados, Puntos Ingeridos y Nombres de Métricas como elementos de línea de producto distintos en la tabla de Resumen y el gráfico de Desglose de Costos Acumulados." style="width:100%;" >}}

## Métricas de uso estimadas {#estimated-usage-metrics}

Datadog proporciona métricas de uso estimadas para que pueda monitorear su uso de Metric Name Pricing en tiempo real. Utilice estas métricas para configurar monitors y dashboards para la visibilidad de costos.

<div class="alert alert-warning">Métricas de uso estimadas basadas en cardinalidad ({<code>datadog.estimated_usage.metrics.custom</code> y métricas relacionadas) ya no están disponibles para organizaciones en Metric Name Pricing. Cualquier monitor, dashboard u otro activo que utilice las métricas basadas en cardinalidad ha dejado de recibir datos. Utilice las métricas de volumen de puntos que se enumeran a continuación en su lugar.</div>

### Métricas de uso facturable {#billable-usage-metrics}

Utilice estas métricas para estimar su uso facturable hasta la fecha de este mes:

| Métrica | Lo que representa |
|--------|-------------------|
| `datadog.estimated_usage.billable.metrics` | Conteo de nombres de métricas con más de 100 puntos indexados, hasta la fecha de este mes. |
| `datadog.estimated_usage.billable.points` | Suma de puntos indexados por encima de los 10M de puntos incluidos por nombre de métrica, hasta la fecha de este mes. |
| `datadog.estimated_usage.metrics.points.ratio` | Comparación de puntos totales ingeridos con puntos totales indexados. |

### Métricas de uso de volumen de puntos {#points-volume-usage-metrics}

Para un análisis más detallado, utilice las siguientes métricas en tiempo real y por hora:

| Métrica | Lo que representa |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | Puntos de Custom Metrics indexados estimados durante una ventana móvil de 60 minutos. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | Puntos de Custom Metrics indexados estimados durante una ventana móvil de 60 minutos, desglosados por etiquetas de atribución de uso. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | Total estimado de puntos de Custom Metrics indexados enviados cada hora, para cálculos acumulativos del mes hasta la fecha. |
| `datadog.estimated_usage.metrics.points.ingested` | Total estimado de puntos de Custom Metrics ingeridos durante una ventana móvil de 60 minutos. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | Total estimado de puntos de Custom Metrics ingeridos enviados cada hora, para cálculos acumulativos del mes hasta la fecha. |

Para más información, consulte [Estimated Usage Metrics][6].

## Gestionar el uso de métricas {#managing-your-metric-usage}

Para optimizar su uso en Metric Name Pricing, utilice las siguientes herramientas:

- **Nombres de métricas**: Utilice [Agent-side filtering][9] para evitar que Custom Metrics no utilizadas o no deseadas sean enviadas a Datadog, reduciendo el conteo de nombres de métricas facturables.
- **Puntos indexados e ingeridos**: Utilice [Metrics without Limits™][2] para configurar listas de permitidos o bloqueados por métrica, o [Tag Indexing Rules][10] para aplicar configuraciones de etiquetas a nivel de organización en grupos de métricas, reduciendo el volumen de puntos indexados y su exceso por métrica.

## Resolución de Problemas {#troubleshooting}

Para preguntas técnicas, contacte a [soporte de Datadog][7].

Para preguntas de facturación, contacte a su [Customer Success] Manager.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/metric_name_pricing/
[2]: /es/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/summary
[4]: https://app.datadoghq.com/metric/volume
[5]: https://app.datadoghq.com/billing/usage
[6]: /es/account_management/billing/usage_metrics/
[7]: /es/help/
[8]: mailto:success@datadoghq.com
[9]: /es/metrics/guide/agent-filtering-for-custom-metrics/
[10]: /es/metrics/guide/tag-indexing-rules/