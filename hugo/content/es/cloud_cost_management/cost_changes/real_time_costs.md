---
aliases:
- /es/cloud_cost_management/real_time_costs
description: Visualice y analice el gasto en la nube en tiempo real.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
title: Costos en tiempo real
---
## Descripción general {#overview}

Real-Time Costs proporciona estimaciones casi en tiempo real de sus costos de Amazon EC2, incluida la asignación de costos de Kubernetes, para que pueda reaccionar a los cambios de costos en minutos y horas, en lugar de días. Las estimaciones se generan utilizando datos de uso en tiempo real del Datadog Agent, basados en los precios netos amortizados promedio por hora recientes de EC2 por tipo de instancia, región y cuenta de AWS.

Utilice los costos en tiempo real para:
- Detectar anomalías tempranamente
- Observar el impacto de cambios recientes
- Hacer un seguimiento de las tendencias de gasto por hora o menos de una hora
- Obtener una visibilidad más profunda de los clústeres de Kubernetes que cambian rápidamente

Los costos en tiempo real están disponibles para:
- Gasto de Amazon EC2 (excluyendo EBS, redes y servicios similares)
- Kubernetes ejecutándose en EC2

## Requisitos {#requirements}

Real-Time Costs está disponible para clientes de Cloud Cost Management Enterprise.

- Cloud Cost Management está habilitado para la cuenta de AWS
- Datadog Agent está instalado en cada instancia de EC2
- (Opcional) Para ver los costos de Kubernetes en tiempo real, habilite Datadog Container Monitoring para sus clústeres siguiendo la guía de configuración en [Container Cost Allocation][2]

## Cómo consultar los costos en tiempo real {#how-to-query-real-time-costs}

Los costos en tiempo real se pueden encontrar bajo la fuente {{< ui >}}Metrics{{< /ui >}} estándar en Metrics Explorer y tableros, y deben consultarse usando `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)`:
- la agregación `sum` o `sum by`
- como `count` (obtenga más información sobre [métricas de tasa frente a recuento][1])
- rollup `sum`, mínimo de 5 minutos (o 300 segundos en la consulta anterior, ya que los costos en tiempo real se actualizan cada 5 minutos)

Los rollups pueden ser más largos, como de 1 hora, para ver los costos por hora. Los costos por hora pueden ser útiles para comprender mejor los patrones de uso antes de comprar planes de ahorro y reservas.

## Asignación de Kubernetes en tiempo real {#real-time-kubernetes-allocation}

De manera similar a la asignación de costos de contenedores existente, los costos de las instancias EC2 se desglosan en los pods de Kubernetes que se ejecutaron en ellas. Todas las etiquetas utilizadas en su pod están disponibles en tiempo real, incluidas las **etiquetas personalizadas en sus pods**, como equipo, servicio o entorno, y las **etiquetas de Kubernetes listas para usar**:
- `allocated_spend_type`, que divide los costos de cómputo en CPU y memoria utilizados por una carga de trabajo (`usage`), solicitados por una carga de trabajo pero no utilizados (`workload_idle`), y no reservados por ninguna carga de trabajo (`cluster_idle`)
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `pod_name`
- `pod_phase`
- `pod_status`

Los nodos que están inactivos o que no ejecutan pods conservan sus etiquetas de Kubernetes, como `kube_cluster_name` y `orchestrator:kubernetes`, para que pueda agrupar y visualizar el costo de los clústeres que están completamente inactivos.

## Etiquetas {#tags}

Las etiquetas para los costos en tiempo real son similares a las de otras métricas de Cloud Cost Management, pero no idénticas.
- Todos los valores de las etiquetas están en minúsculas, normalizados como los datos de métricas
- No se aplican Tag Pipelines ni Custom Allocation Rules
- Es posible que algunas etiquetas específicas del Informe de costos y uso (CUR) y etiquetas FOCUS no existan en la métrica de costos en tiempo real, ya que los costos en tiempo real se derivan principalmente mediante el uso de datos recopilados por el Datadog Agent, no por el CUR

## Precisión {#accuracy}

Los costos en tiempo real pretenden tener una precisión del 10% respecto a los datos de los costos diarios de EC2 en su CUR, para los hosts de EC2 monitoreados por el Datadog Agent. Debido a que los costos en tiempo real priorizan la entrega de baja latencia, ocasionalmente pueden ocurrir caídas o brechas temporales en los datos. Para el análisis de tendencias de costos a largo plazo, Datadog recomienda utilizar métricas de Cloud Cost basadas en datos de facturación directos de AWS.

Puede utilizar la etiqueta `estimated_hourly_cost` para comprender el costo unitario estimado de un tipo de instancia por hora.

- Las fuentes de varianza incluyen:
  - Promedios por hora que cambian con su combinación reciente de gastos bajo demanda, de compromiso y spot
  - Diferencias menores entre los tiempos reales de inicio y finalización de la instancia frente a lo que informa el agente
- La subestimación puede ocurrir cuando:
  - Las instancias EC2 no son monitoreadas por el Datadog Agent
  - Los tipos de instancia o regiones recién utilizados aún no han aparecido en los datos de facturación de CCM
  - Las estimaciones cubren solo el cómputo (no EBS, redes, etcétera)
- La sobreestimación puede ocurrir cuando:
  - Las instancias son monitoreadas por el Datadog Agent pero no están incluidas en los datos de facturación de CCM

[1]: /es/metrics/types/?tab=rate#metric-types
[2]: /es/cloud_cost_management/allocation/container_cost_allocation/