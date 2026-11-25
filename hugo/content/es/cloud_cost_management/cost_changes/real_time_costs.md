---
aliases:
- /es/cloud_cost_management/real_time_costs
description: Visualice y analice el gasto en la nube en tiempo real.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
  tag: Documentación
  text: Cree un monitor de anomalías en tiempo real
title: Costos en tiempo real
---
<div class="alert alert-info">Los costos en tiempo real para Azure y Google Cloud están en versión preliminar.</div>

## Descripción general {#overview}

Real-Time Costs estima sus costos de cómputo de AWS, Azure y Google Cloud casi en tiempo real, para que pueda reaccionar a los cambios de costos en minutos u horas en lugar de días. Datadog genera estimaciones a partir de datos de uso en tiempo real que recopila el Datadog Agent, y calcula el precio de ese uso con sus costos promedio recientes por hora de los datos de facturación de Cloud Cost Management.

Utilice los costos en tiempo real para:
- Detecte anomalías a tiempo y alerte sobre ellas con [monitores de anomalías en tiempo real][3]
- Observar el impacto de cambios recientes
- Hacer un seguimiento de las tendencias de gasto por hora o menos de una hora
- Obtener una visibilidad más profunda de los clústeres de Kubernetes que cambian rápidamente

Los costos en tiempo real están disponibles para:

| Proveedor | Gasto cubierto | Métrica en tiempo real | Precio calculado a partir de |
|---|---|---|---|
| AWS | Instancias de Amazon EC2 y Kubernetes ejecutándose en EC2 | `aws.cost.net.amortized.realtime.estimated` | Precios netos amortizados promedio por hora recientes de EC2 por tipo de instancia, región y cuenta de AWS |
| Azure (versión preliminar) | Cómputo de Azure Virtual Machines y Kubernetes ejecutándose en VM de Azure | `azure.cost.amortized.realtime.estimated` | Precios amortizados promedio por hora recientes de VM por tipo de instancia, región y suscripción de Azure |
| Google Cloud (versión preliminar) | Instancias de Compute Engine (vCPU y memoria) y Kubernetes ejecutándose en Compute Engine | `gcp.cost.amortized.realtime.estimated` | Precios amortizados promedio por hora recientes de vCPU y memoria por tipo de máquina, región y proyecto de Google Cloud |

Los costos en tiempo real cubren solo el cómputo. Se excluyen los siguientes cargos:
- **AWS**: EBS, redes y otros cargos fuera del cómputo de instancias de Amazon EC2.
- **Azure**: Discos administrados, almacenamiento, ancho de banda, redes y otros cargos fuera del uso de cómputo de Virtual Machines (`chargetype:Usage`). También se excluyen las reservas de capacidad de Azure no utilizadas.
- **Google Cloud**: Persistent Disk, GPU, redes, licencias de SO, direcciones IP externas y otros cargos fuera de las SKU de vCPU (núcleo) y memoria (RAM) de las instancias de Compute Engine. También se excluyen los créditos y los cargos por reserva.

## Requisitos {#requirements}

Real-Time Costs está disponible para clientes de Cloud Cost Management Enterprise. Antes de comenzar, confirme que:

- Cloud Cost Management esté habilitado para la cuenta de AWS, la suscripción de Azure o el proyecto de Google Cloud.
- El Datadog Agent esté instalado en cada instancia de EC2, VM de Azure o instancia de Compute Engine.
- (Opcional) Para los costos de Kubernetes en tiempo real, Datadog Container Monitoring esté habilitado para sus clústeres. Consulte [Asignación de costos de contenedores][2] para la configuración.

## Consultar costos en tiempo real {#query-real-time-costs}

Encuentre los costos en tiempo real bajo la fuente {{< ui >}}Metrics{{< /ui >}} estándar en Metrics Explorer y los paneles. Utilice la consulta para su proveedor:

| Proveedor | Consulta |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

Consulte los costos en tiempo real con:
- La agregación `sum` o `sum by`
- El modificador `.as_count()` (obtenga más información sobre [métricas de tasa frente a recuento][1])
- Una agrupación `sum` de al menos 5 minutos (300 segundos en las consultas anteriores, porque los costos en tiempo real se actualizan cada 5 minutos)

Los rollups pueden ser más largos, como de 1 hora, para ver los costos por hora. Los costos por hora le ayudan a comprender los patrones de uso antes de comprar Savings Plans y reservas.

## Ver costos en tiempo real en paneles {#view-real-time-costs-in-dashboards}

Cada proveedor tiene un panel {{< ui >}}Real-Time Cost Overview{{< /ui >}} preconfigurado. Estos paneles muestran tendencias de costos en tiempo real y cambios de costos día a día antes de que los datos de facturación definitivos estén disponibles. Encuéntrelos en la página [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Dashboards{{< /ui >}}][5] o en [Dashboard List][6].

Los paneles muestran datos después de que usted cumple con los [requisitos de costos en tiempo real][7]. No se requiere configuración adicional.

## Asignación de Kubernetes en tiempo real {#real-time-kubernetes-allocation}

Al igual que con la asignación de costos de contenedores, Datadog desglosa los costos de las instancias de EC2, VM de Azure e instancias de Compute Engine entre los pods de Kubernetes que se ejecutaron en ellas. Todas las etiquetas utilizadas en su pod están disponibles en tiempo real, incluidas las **etiquetas personalizadas en sus pods**, como team, service o env, y las **etiquetas de Kubernetes listas para usar**:
- `allocated_spend_type`, que divide los costos de cómputo en CPU y memoria utilizados por una carga de trabajo (`usage`), solicitados por una carga de trabajo pero no utilizados (`workload_idle`), y no reservados por ninguna carga de trabajo (`cluster_idle`)
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `kube_daemon_set`
- `pod_name`
- `pod_phase`
- `pod_status`

Los nodos que están inactivos o que no ejecutan pods conservan sus etiquetas de Kubernetes, como `kube_cluster_name` y `orchestrator:kubernetes`, para que pueda agrupar y visualizar el costo de los clústeres que están completamente inactivos.

## Etiquetas {#tags}

Las etiquetas para los costos en tiempo real difieren de las etiquetas en otras métricas de Cloud Cost Management de las siguientes maneras:
- Todos los valores de las etiquetas están en minúsculas y normalizados, como los datos de las métricas.
- No se aplican Tag Pipelines ni Custom Allocation Rules.
- Es posible que algunas etiquetas específicas de facturación (del AWS Cost and Usage Report, exportaciones de costos de Azure o exportaciones de facturación de Google Cloud) y las etiquetas FOCUS no existan en las métricas de costos en tiempo real. Los costos en tiempo real provienen principalmente de los datos de uso que recopila el Datadog Agent, no de los datos de facturación.

## Precisión {#accuracy}

Para las instancias monitoreadas por el Agent, Datadog apunta a estimaciones de costos en tiempo real dentro del 10% de los costos de cómputo diarios en sus datos de facturación. Los datos de facturación utilizados para la comparación dependen del proveedor:
- **AWS**: costos de EC2 de su AWS Cost and Usage Report
- **Azure**: costos amortizados de uso de Virtual Machines de su exportación de costos de Azure
- **Google Cloud**: costos amortizados de vCPU y memoria de Compute Engine a partir de su exportación de facturación de Google Cloud

Los costos en tiempo real están optimizados para una entrega de baja latencia, por lo que puede haber disminuciones o faltantes temporales de datos, especialmente en Azure y Google Cloud mientras están en versión preliminar. Para el análisis de tendencias de costos a largo plazo, Datadog recomienda utilizar métricas de Cloud Cost Management basadas en datos de facturación. Estas métricas incluyen los créditos finales.

- Las fuentes de varianza incluyen:
  - Promedios por hora que cambian según su combinación reciente de gastos bajo demanda (pago por uso), por compromisos (Savings Plans, reservas, descuentos por uso comprometido) y en instancias spot
  - Diferencias menores entre los tiempos reales de inicio y finalización de la instancia frente a lo que informa el Agent
- La subestimación puede ocurrir cuando:
  - Las instancias no son monitoreadas por el Datadog Agent
  - Los tipos de instancia o regiones recién utilizados aún no han aparecido en los datos de facturación de CCM
  - Usted compara las estimaciones con el gasto total, que incluye cargos adicionales a los de cómputo (consulte la sección [Descripción general][4])
- La sobreestimación puede ocurrir cuando:
  - Las instancias son monitoreadas por el Datadog Agent pero no están incluidas en los datos de facturación de CCM

Para reducir la varianza, filtre por una cuenta, suscripción o proyecto que cubra Cloud Cost Management y donde el Datadog Agent se ejecute en cada instancia.

Utilice las etiquetas `estimated_hourly_cost` y `estimated_daily_cost` para ver el costo estimado de un tipo de instancia por hora y por día.

[1]: /es/metrics/types/?tab=rate#metric-types
[2]: /es/cloud_cost_management/allocation/container_cost_allocation/
[3]: /es/cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
[5]: https://app.datadoghq.com/cost/analyze/dashboards
[6]: https://app.datadoghq.com/dashboard/lists?q=type%3Aintegration%20cost%20real
[7]: #requirements