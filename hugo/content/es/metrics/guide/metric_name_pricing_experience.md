---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Aprenda cómo se ha actualizado la experiencia de métricas personalizadas
  en Datadog para reflejar el Precio por Nombre de Métrica, incluyendo cambios en
  el modal Administrar etiquetas, el panel lateral de métricas, la página de Gestión
  de volumen, la página de Plan y uso, y las métricas de uso estimado.
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentación
  text: Precios por nombre de métrica para Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: Documentación
  text: Métricas de uso estimado
- link: /metrics/volume/
  tag: Documentación
  text: Gestión del volumen de métricas
title: Cambios en la experiencia de métricas para el Precio por Nombre de Métrica
---
## Descripción general {#overview}

Con el [modelo de facturación de Precio por Nombre de Métrica][1] para métricas personalizadas, Datadog actualizó la experiencia de métricas para reflejar cómo se mide el uso. Esta guía describe qué ha cambiado en la interfaz de usuario y las API de Datadog para las organizaciones con Precio por Nombre de Métrica.

**Nota**: Esta página solo se aplica si su organización utiliza [Precio por Nombre de Métrica][1]. Si su contrato utiliza precios de series temporales (cardinalidad), su experiencia de métricas no cambia.

## Resumen de cambios {#summary-of-changes}

| Funcionalidad | Descripción |
|---------|-------------|
| [Modal Administrar etiquetas](#manage-tags-modal) | Estima el impacto de los cambios de etiquetas en el volumen de puntos en lugar del volumen de cardinalidad. |
| [Panel lateral de métricas](#metric-side-panel) | Muestra el volumen de puntos ingeridos e indexados en lugar del volumen de series temporales. |
| [Página de Gestión de volumen](#volume-management-page) | Los gráficos de Resumen de volumen muestran nuevas dimensiones de facturación para el Precio por Nombre de Métrica. |
| [Plan & Usage page](#plan--usage-page) | Refleja el desglose de facturación del Precio por Nombre de Métrica. |
| [Métricas de uso estimado](#estimated-usage-metrics) | Las nuevas métricas de volumen de puntos reemplazan a las métricas de uso estimado basadas en cardinalidad. |

## Modal Administrar etiquetas {#manage-tags-modal}

Al configurar etiquetas en métricas personalizadas, el modal {{< ui >}}Manage Tags{{< /ui >}} estima el impacto de los cambios de etiquetas en el **volumen de puntos** en lugar del volumen de cardinalidad.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="El modal Administrar etiquetas muestra un gráfico de proyección de uso con tres líneas: uso del mes a la fecha, uso con la configuración actual y uso con la configuración propuesta. Las etiquetas datacenter y servicio están configuradas en la pestaña Incluir etiquetas." style="width:100%;" >}}

Para obtener más información sobre la configuración de etiquetas, consulte [Metrics without Limits™][2].

## Panel lateral de métricas {#metric-side-panel}

El panel lateral de detalles de la métrica muestra el **volumen de puntos ingeridos e indexados** en lugar del volumen de series temporales.

Para abrir el panel lateral de métricas, haga clic en cualquier nombre de métrica en la [Metrics Summary page][3].

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="El panel lateral de detalles de métricas que muestra PUNTOS INGERIDOS y PUNTOS INDEXADOS en la parte superior, junto con servidores y Valores de etiqueta." style="width:100%;" >}}

## Página de Gestión de volumen {#volume-management-page}

Los gráficos de Resumen de volumen en la [Metrics Volume Management page][4] muestran las siguientes dimensiones de facturación de Precio por Nombre de Métrica:

- Nombres de métricas únicos estimados
- Volumen de puntos indexados facturables
- Relación de puntos ingeridos a indexados

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Tres gráficos de Resumen de volumen para Precio por Nombre de Métrica: Nombres de métricas únicos estimados (recuento de métricas con más de 100 puntos indexados en el mes hasta la fecha), Puntos totales estimados (total de puntos indexados que exceden la asignación de 10M por métrica en el mes hasta la fecha) y Relación estimada de puntos ingeridos a indexados." style="width:100%;" >}}

## Plan & Usage page {#plan-usage-page}

La [Plan & Usage page][5] refleja el desglose de facturación de Precio por Nombre de Métrica para las organizaciones en el nuevo modelo.

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="La página de Desglose de costos de Plan y uso muestra los Puntos indexados, los Puntos ingeridos y los Nombres de métricas como partidas de línea de producto distintas en la tabla de Resumen y en el gráfico de Desglose de costos acumulados." style="width:100%;" >}}

## Métricas de uso estimado {#estimated-usage-metrics}

Datadog proporciona métricas de uso estimado para que pueda hacer un seguimiento de su uso de Precios por nombre de métrica en tiempo real. Utilice estas métricas para configurar monitores y tableros para la visibilidad de costos.

<div class="alert alert-warning">Métricas de uso estimado basadas en cardinalidad (<code>datadog.estimated_usage.metrics.custom</code> y métricas relacionadas) ya no están disponibles para las organizaciones con Precio por Nombre de Métrica. Cualquier monitor, tablero u otro activo que utilice las métricas basadas en cardinalidad ha dejado de recibir datos. Utilice las métricas de volumen de puntos enumeradas a continuación en su lugar.</div>

### Métricas de uso facturable {#billable-usage-metrics}

Utilice estas métricas para estimar su uso facturable del mes hasta la fecha:

#### `datadog.estimated_usage.billable.metrics` {#datadogestimated-usagebillablemetrics}

* **Qué representa:** Recuento de nombres de métricas con más de 100 puntos indexados, en lo que va del mes.
* **Pregunta de facturación respondida:** ¿Cuántos nombres de métricas son facturables en lo que va del mes?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_metrics_example_09012026.png" alt="Ejemplo que muestra el número de nombres de métricas facturables en lo que va del mes" >}}

#### `datadog.estimated_usage.billable.points` {#datadogestimated-usagebillablepoints}

* **Qué representa:** Suma de puntos indexados por encima de los 10 millones de puntos incluidos por nombre de métrica, en lo que va del mes.
* **Preguntas de facturación respondidas:**
  * ¿Cuál es mi volumen total de puntos indexados facturables en lo que va del mes?
  * ¿Qué nombres de métricas están contribuyendo a mi volumen de puntos indexados facturables y en qué cantidad?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_example_08042026.png" alt="Ejemplo que muestra el volumen total de puntos indexados facturables en lo que va del mes" >}}

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_bymetric_example_08042026.png" alt="Ejemplo que muestra el volumen de puntos indexados facturables desglosado por nombre de métrica" >}}

#### `datadog.estimated_usage.metrics.points.ratio` {#datadogestimated-usagemetricspointsratio}

* **Qué representa:** Comparación del total de puntos ingeridos frente al total de puntos indexados.
* **Pregunta de facturación respondida:** ¿Cuál es la proporción de puntos ingeridos frente a puntos indexados?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_points_ratio_example_08042026.png" alt="Ejemplo que muestra la proporción de puntos ingeridos frente a puntos indexados" >}}

### Métricas de uso de volumen de puntos {#points-volume-usage-metrics}

Para un análisis más detallado, utilice las siguientes métricas en tiempo real y por hora:

| Métrica | Qué representa |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | Puntos de métricas personalizadas indexadas estimados en una ventana móvil de 60 minutos. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | Puntos de métricas personalizadas indexadas estimados en una ventana móvil de 60 minutos, desglosados por etiquetas de atribución de uso. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | Puntos de métricas personalizadas indexadas totales estimados enviados cada hora, para cálculos acumulativos desde el inicio del mes. |
| `datadog.estimated_usage.metrics.points.ingested` | Puntos de métricas personalizadas ingeridas estimados en una ventana móvil de 60 minutos. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | Puntos de métricas personalizadas ingeridas totales estimados enviados cada hora, para cálculos acumulativos desde el inicio del mes. |

Para obtener más información, consulte [Métricas de uso estimado][6].

## Administración de su uso de métricas {#managing-your-metric-usage}

Para optimizar su uso bajo la fijación de precios por nombre de métrica, utilice las siguientes herramientas:

- **Nombres de métricas**: utilice el [filtrado del lado del agente][9] para evitar que se envíen a Datadog métricas personalizadas no utilizadas o no deseadas, lo que reduce el recuento de nombres de métricas facturables.
- **Puntos indexados e ingeridos**: Utilice [Metrics without Limits™][2] para configurar lista de permitidos o lista de bloqueados de etiqueta por métrica, o [Reglas de indexación de etiquetas][10] para aplicar configuraciones de etiquetas en toda la organización a través de grupos de métricas, lo que reduce el volumen de puntos indexados y su exceso por métrica.

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][7].

Para preguntas sobre facturación, comuníquese con su gerente de Customer Success ([Customer Success][8]).

## Lecturas adicionales {#further-reading}

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