---
aliases:
- /es/infrastructure/process/generate_process_metrics/
- /es/processes/processing/process_to_metrics/
- /es/infrastructure/generate_process_metrics/
description: Generar métricas a partir de procesos.
further_reading:
- link: metrics/distributions/
  tag: Documentación
  text: Métricas de distribución
- link: monitors/monitor_types/metric/?tab=threshold
  tag: Documentación
  text: Crear un monitor de métricas
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: Blog
  text: Consejos prácticos para redimensionar las cargas de trabajo de Kubernetes
- link: https://www.datadoghq.com/blog/process-tag-rules/
  tag: Blog
  text: Aumenta la visibilidad de tus procesos de infraestructura con las reglas de
    etiquetas (tags) de proceso
title: Aumentar la retención de procesos
---

## Información general

Si bien los datos de Live Processes se almacenan durante 36 horas, puedes generar métricas de distribución globales y de percentil de tus procesos para monitorizar el consumo de recursos a largo plazo. Las métricas basadas en procesos se almacenan durante 15 meses como cualquier otra métrica de Datadog. Esto puede ayudarte a:

- Depurar problemas de infraestructura pasados ​​y actuales
- Identificar tendencias en el consumo de recursos de tus cargas de trabajo fundamentales
- Evaluar el estado de tu sistema antes y después de los tests de carga o estrés
- Realizar un seguimiento del efecto de las implementaciones de software en el estado de tus hosts o contenedores subyacentes

{{< img src="infrastructure/process/process2metrics_overview_2.png" alt="Generar métricas basadas en procesos" style="width:80%;">}}

## Generar una métrica basada en procesos

Puedes generar una nueva métrica basada en procesos directamente a partir de consultas en la [página de **Live Processes**][2], o en la [pestaña **Manage Metrics**][1] (Gestionar métricas), al hacer clic en **+ New Metric** (+ Métrica nueva).

### Añadir una nueva métrica basada en procesos

{{< img src="infrastructure/process/process2metrics_create.png" alt="Crear una métrica basada en procesos" style="width:80%;">}}

1. **Selecciona etiquetas para filtrar tu consulta**: Las etiquetas disponibles son las mismas que para [Procesos activos][2]. Sólo se tendrán en cuenta para la agregación los procesos que coincidan con el ámbito de tus filtros. Los filtros de búsqueda de texto sólo se admiten en la page (página) Procesos activos.
2. **Seleccionar la medida de la que deseas realizar un seguimiento**: ingresa una medida como `Total CPU %` para agregar un valor numérico y crear sus métricas agregadas `count`, `min`, `max`, `sum` y `avg` correspondientes.
3. **Añadir etiquetas a `group by`**: selecciona etiquetas que se añadirán como dimensiones a tus métricas, para que se puedan filtrar, agregar y comparar. De manera predeterminada, las métricas generadas a partir de procesos no tienen etiquetas a menos que se añadan de manera explícita. En este campo se puede utilizar cualquier etiqueta disponible para consultas de Live Processes.
4. **Nombrar la métrica**: completa el nombre de tu métrica. Las métricas basadas en procesos siempre tienen el prefijo _proc._ y el sufijo _[selección_de_medida]_.
5. **Añade agregaciones de percentiles**: Selecciona la casilla _Incluir agregaciones de percentiles_ para generar percentiles p50, p75, p90, p95 y p99. Las métricas de percentiles también se consideran métricas personalizadas y se facturan en consecuencia.

Puedes crear varias métricas con la misma consulta al seleccionar la casilla **Create Another** (Crear otra) en la parte inferior del modal de creación de métricas. Cuando se selecciona, el modal permanece abierto después de que se haya creado la métrica, con los filtros y grupos de agregación ya completados.

**Nota**: Los puntos de datos para métricas basadas en procesos se generan en intervalos de diez segundos. Es posible que se produzca un retraso de hasta 3 minutos desde el momento en que se crea o actualiza la métrica hasta el momento en que se informa el primer punto de datos.

<div class="alert alert-danger">Las métricas basadas en procesos se consideran <a href="/metrics/custom_metrics/">métricas personalizadas</a> y se facturan en consecuencia. Evita agrupar por etiquetas ilimitadas o de cardinalidad extremadamente alta, como <code>comando</code> y <code>usuario</code>, para evitar afectar tu facturación.</div>

### Actualizar una métrica basada en procesos

{{< img src="infrastructure/process/process2metrics_update.png" alt="Actualización de métricas de distribución" style="width:80%;">}}

Después de crear una métrica, se pueden actualizar los siguientes campos:

- Filtrar consultas: añade o elimina etiquetas del campo «Filter by» (Filtrar por) a fin de cambiar el conjunto de procesos coincidentes para los que se generan métricas.
- Grupos de agregación: añade o elimina etiquetas del campo «Group by» (Agrupar por) para desglosar tus métricas de diferentes maneras o gestionar su cardinalidad.
- Selección de percentiles: marca o desmarca la casilla «Include percentile aggregations» (Incluir agregaciones de percentiles) para eliminar o generar métricas de percentil.

Para cambiar el tipo o el nombre de la métrica, debe crearse una nueva métrica.

## Aprovechar las métricas de proceso en toda la plataforma de Datadog

{{< img src="infrastructure/process/process2metrics_dashboard_widget.png" alt="Crear gráficas de métricas de distribución de procesos en dashboards" style="width:80%;">}}

Una vez creadas, puedes utilizar las métricas basadas en proceso como cualquier otra en Datadog. Por ejemplo:

- Graficar métricas basadas en procesos en dashboards y notebooks para realizar un seguimiento del consumo histórico de recursos de cargas de trabajo importantes
- Crear monitores basados ​​en umbrales o anomalías además de métricas basadas en procesos para detectar cuándo la memoria de CPU o RSS cae o aumenta de manera inesperada
- Utilizar las [correlaciones de métricas][4] para contextualizar los cambios en el consumo de recursos frente al rendimiento del software interno y de terceros

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/process?view=metrics
[2]: https://app.datadoghq.com/process
[3]: /es/metrics/custom_metrics/
[4]: /es/dashboards/correlations/