---
description: Haga un seguimiento de los cambios de costos, umbrales, pronósticos y
  anomalías en sus costos de la nube, incluidos los aumentos de costos de IA en tiempo
  real.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Administre y optimice sus costos de OCI con Datadog Cloud Cost Management
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentación
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Consulte el estado de su seguimiento
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: Blog
  text: Reaccione rápidamente a los sobrecostos con los monitores de costos para Datadog
    Cloud Cost Management.
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Faculte a los ingenieros para que se hagan cargo de los costos de Google Cloud
    con Datadog
title: Monitor de costos de Cloud Cost
---
## Descripción general {#overview}

Los monitores de costos de Cloud Cost le ayudan a identificar de forma proactiva los cambios en los costos y a comprender si se proyecta que exceda el presupuesto, para que pueda investigar la causa.

-   Visualice al instante todos sus monitores de costos y filtre o busque por equipo, servicio, etiqueta, proveedor o estado de alerta.
-   Vea un resumen de cuántos monitores de costos están configurados, cuáles están alertando y qué áreas del gasto en la nube se rastrean.
-   Cree nuevos monitores de costos utilizando plantillas y tome medidas sobre los monitores de costos que necesitan atención.

Para configurar los monitores de costos de Cloud Cost, debe tener configurado [Cloud Cost Management][1].

Elija la configuración que coincida con los datos de costos sobre los que desea alertar:

-   [Cree un monitor de costos](#create-a-monitor) para cambios, umbrales, pronósticos, presupuestos y anomalías de costos finalizados. Estos monitores de costos utilizan datos de facturación finalizados, una frecuencia de evaluación de 30 minutos y una ventana de evaluación con un retraso de 48 horas, ya que los datos de facturación pueden no estar disponibles hasta 48 horas después del uso. Por ejemplo, una revisión de 7 días evaluada el 15 de enero examina los datos de costos del 6 al 13 de enero.
-   [Cree un monitor de anomalía de IA en tiempo real](#create-a-real-time-ai-anomaly-monitor) para alertar en un plazo de 15 minutos cuando el costo estimado de IA de [Agent Observability][102] aumente inesperadamente.

## Crear un monitor {#create-a-monitor}

Este procedimiento cubre los monitores de costos de Cloud Cost que utilizan datos de facturación finalizados: cambios, umbrales, pronósticos, presupuestos y monitores de anomalía finalizados. Para alertar sobre el costo estimado de IA en un plazo de 15 minutos, consulte [Cree un monitor de anomalía de IA en tiempo real](#create-a-real-time-ai-anomaly-monitor).

Para crear un monitor de costos de Cloud Cost en Datadog, navegue a [{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4] y haga clic en {{< ui >}}\+ New Cost Monitor{{< /ui >}}.

Alternativamente, puede configurar uno desde [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3], la navegación principal, el [Cloud Cost Explorer][5] o a través de [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="El botón Create Monitor en la página Cost Monitor" style="width:100%;" >}}

### Seleccione un tipo de monitor de costos {#select-a-cost-monitor-type}

Puede seleccionar entre los siguientes tipos de monitores de costos:

| Tipo de monitor | Basado en métrica de costo | Propósito | Ejemplo |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Cambios      | Sí               | Detectar cambios de costo diarios, semanales o mensuales.                                                                                                                                                                                                            | Alertar cuando la diferencia entre el costo de hoy y el de la semana anterior sea superior al 5%.                     |
| Anomalías    | Sí               | Identificar patrones de costo inusuales o inesperados. <br> <br> Los monitores de costos finalizados excluyen los días incompletos y requieren al menos 1 mes de datos de costos en la nube, porque se requieren datos históricos para entrenar el algoritmo. [Los monitores de anomalía de IA en tiempo real](#create-a-real-time-ai-anomaly-monitor) alertan sobre el costo estimado de IA en un plazo de 15 minutos. | Alertar si 3 días de los últimos 30 días muestran anomalías de costo significativas en comparación con los datos históricos, o alertar en un plazo de 15 minutos cuando el costo de IA aumente inesperadamente. |
| Umbral    | Sí               | Alertar cuando los costos superen un valor establecido.                                                                                                                                                                                                                      | Configure alertas cuando el costo total de hoy supere los $10,000.                                                |
| Pronóstico     | Sí               | Alertar si los costos pronosticados superan un umbral.                                                                                                                                                                                                            | Alertar diariamente si se proyecta que el costo pronosticado para este mes supere los $500.                     |
| Presupuesto       | No                | Alertar si los costos reales o [pronosticados][8] superan su [presupuesto][7].                                                                                                                                                                                         | Alertar si se proyecta que el costo del mes pronosticado supere el 90% del presupuesto asignado de $10,000.      |

### Especifique qué costo rastrear {#specify-which-cost-to-track}

{{< tabs >}}
{{% tab "Basado en métrica de costo" %}}

Cualquier tipo de costo o métrica que se reporte a Datadog está disponible para los monitores de costos. Puede usar métricas personalizadas o métricas de observabilidad junto con una métrica de costo para hacer un seguimiento de la economía unitaria.

| Paso                     | Requerido | Predeterminado           | Ejemplo                 |
| ------------------------ | -------- | ----------------- | ----------------------- |
| Seleccione la métrica de costo   | Sí      | Todos los proveedores     | `azure.cost.actual`     |
| Defina el `filter by`   | No       | Nada           | `aws_product:s3`        |
| Agrupar por                 | No       | Nada           | `aws_availability_zone` |
| Agregar métrica de observabilidad | No       | `system.cpu.user` | `aws.s3.all_requests`   |

Utilice el editor para definir los tipos de costo o las exportaciones.

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="Opciones de fuente de datos de Cloud Cost and Metrics para especificar qué costos rastrear" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Basado en presupuesto" %}}

Seleccione un presupuesto existente para hacer un seguimiento desde el menú desplegable.

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="Menú desplegable para especificar contra qué presupuesto hacer un seguimiento del costo" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulte la [documentación de Cloud Cost Management][1].

### Establecer condiciones de alerta {#set-alert-conditions}

{{< tabs >}}
{{% tab "Cambios" %}}

Si utiliza el tipo de monitor {{< ui >}}Cost Changes{{< /ui >}}, puede activar una alerta cuando el costo `increases` o `decreases` más que el umbral definido. El umbral se puede establecer en un {{< ui >}}Percentage Change{{< /ui >}} o en {{< ui >}}Dollar Amount{{< /ui >}}.

Si utiliza {{< ui >}}Percentage Change{{< /ui >}}, puede filtrar los cambios que estén por debajo de un cierto umbral en dólares. Por ejemplo, el monitor alerta cuando hay un cambio de costo superior al 5% para cualquier cambio que sea superior a $500.

{{% /tab %}}

{{% tab "Anomalías" %}}

Estas condiciones se aplican cuando {{< ui >}}Alert on{{< /ui >}} es {{< ui >}}finalized{{< /ui >}}. Para alertar sobre el costo estimado de IA en un plazo de 15 minutos, consulte [Cree un monitor de anomalía de IA en tiempo real](#create-a-real-time-ai-anomaly-monitor).

Para el tipo de monitor {{< ui >}}Cost Anomalies{{< /ui >}}, puede activar una alerta si el costo observado está `above`, `below` o `above or below` un umbral en comparación con los datos históricos.

El `agile` [algoritmo de anomalías][101] se utiliza con dos límites y estacionalidad mensual.

[101]: /es/dashboards/functions/algorithms/

{{% /tab %}}

{{% tab "Umbral" %}}

Si está utilizando el tipo de monitor {{< ui >}}Cost Threshold{{< /ui >}}, puede activar una alerta cuando el costo en la nube sea `above`, `below`, `above or equal` o `below or equal to` un umbral.

{{% /tab %}}
{{% tab "Pronóstico" %}}

Si está utilizando el tipo de monitor {{< ui >}}Cost Forecast{{< /ui >}}, puede activar una alerta cuando el costo en la nube sea `above`, `below`, `above or equal`, `below or equal to`, `equal to` o `not equal to` un umbral.

{{% /tab %}}

{{% tab "Presupuesto" %}}
Si está utilizando el tipo de monitor {{< ui >}}Budget{{< /ui >}}, puede activar una alerta cuando el costo en la nube real o pronosticado exceda un porcentaje del presupuesto que seleccionó en el paso anterior.

| Paso             | Propósito                                                                           | Valores                            |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| Base de evaluación | Si el monitor compara el gasto real o el gasto pronosticado con el presupuesto. | `actual`, `forecasted`            |
| Granularidad      | Nivel de detalle con el que se evalúa el costo.                                   | `overall` (costo total), `per_row` |
| Umbral        | Porcentaje del presupuesto que se utiliza para activar la alerta.                       | Número entre 0 y 100 (%)      |
| Plazo        | Ventana de evaluación utilizada para determinar si se supera el umbral.                    | `all_months`, `current_month`     |

Cuando selecciona {{< ui >}}is forecasted to reach{{< /ui >}}, el monitor utiliza el mismo [modelo de pronóstico][8] que las tarjetas de presupuesto y la página de estado del presupuesto.

[8]: /es/cloud_cost_management/planning/forecasting/
{{% /tab %}}
{{< /tabs >}}

<br>

### Configure las notificaciones y automatizaciones {#configure-notifications-and-automations}

Para obtener instrucciones detalladas sobre la sección {{< ui >}}Configure notifications and automations{{< /ui >}}, consulte la página [Notifications][6].

### Defina permisos y notificaciones de auditoría {#define-permissions-and-audit-notifications}

Elija qué equipos, roles, usuarios o cuentas de servicio tienen permitido **visualizar** o **editar** el monitor. De forma predeterminada, todos los miembros de su organización tienen acceso.

También puede activar {{< ui >}}Audit Notifications{{< /ui >}} para alertar al creador del seguimiento y a los destinatarios siempre que se modifique el seguimiento.

## Cree un seguimiento de anomalías de IA en tiempo real {#create-a-real-time-ai-anomaly-monitor}

Los seguimientos de anomalías de IA en tiempo real detectan aumentos inesperados en el costo de la IA y alertan en un plazo de 15 minutos. Utilizan el costo estimado de [Agent Observability][102], no los datos de facturación en la nube finalizados. Datadog identifica anomalías a partir de una ventana de evaluación continua de 4 horas del costo estimado.

### Requisitos previos {#prerequisites}

- [Agent Observability][102] está enviando datos de costos de LLM. El costo estimado se calcula a partir del recuento de tokens y los precios del proveedor. Consulte [Agent Observability costs][103].
- La métrica [`ml_obs.span.llm.total.cost`][104] ha informado. La opción {{< ui >}}real time{{< /ui >}} aparece después de que esta métrica haya informado.
- Hay al menos 3 días de datos de costos disponibles. Datadog recomienda 21 días para la calidad de la detección.

### Configure el seguimiento {#configure-the-monitor}

1. Vaya a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4] y haga clic en {{< ui >}}\+ New Cost Monitor{{< /ui >}}.
2. Seleccione {{< ui >}}Anomalies{{< /ui >}}.
3. Establezca {{< ui >}}Alert on{{< /ui >}} en {{< ui >}}real time{{< /ui >}} y el tipo de costo en {{< ui >}}AI cost{{< /ui >}}. El seguimiento alerta sobre anomalías detectadas en los últimos 15 minutos.
4. Opcionalmente, utilice {{< ui >}}Filter cost to{{< /ui >}} para establecer el contexto del costo y {{< ui >}}Detect anomalies on{{< /ui >}} para agrupar por hasta dos etiquetas. `ml_app` y `model_provider` aparecen en {{< ui >}}Preferred Tags{{< /ui >}}.
5. Establezca un umbral para el costo total estimado durante las próximas 24 horas. Ingrese al menos 500 en la moneda de su organización. El seguimiento alerta cuando Datadog detecta una anomalía y el costo total estimado supera este umbral.
6. [Configurar notificaciones][6].

Para el seguimiento de los datos de facturación en la nube finalizados, en su lugar, establezca {{< ui >}}Alert on{{< /ui >}} en {{< ui >}}finalized{{< /ui >}} y siga [Crear un seguimiento](#create-a-monitor). Los seguimientos de anomalía finalizados utilizan el algoritmo de anomalía ágil, excluyen los días incompletos y requieren al menos 1 mes de historial de costos en la nube.

## Otras acciones que puede realizar {#other-actions-you-can-take}

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="El menú de acciones se abre con opciones para visualizar el seguimiento en Cloud Cost Explorer, así como opciones para editar, clonar y eliminar el seguimiento." style="width:100%;" >}}

-   {{< ui >}}View in Monitors{{< /ui >}} para visualizar el historial de alertas de su seguimiento, ajustar las visualizaciones y revisar con qué frecuencia ha activado alertas.
-   {{< ui >}}View in Explorer{{< /ui >}} para abrir el seguimiento en Cloud Cost Explorer para un análisis más profundo.
-   {{< ui >}}Edit{{< /ui >}} un seguimiento para actualizar la configuración o los ajustes del seguimiento.
-   {{< ui >}}Clone{{< /ui >}} un seguimiento para crear una copia de un seguimiento existente eligiendo {{< ui >}}Actions{{< /ui >}} > {{< ui >}}Clone{{< /ui >}}.
-   {{< ui >}}Delete{{< /ui >}} un seguimiento para eliminar permanentemente un seguimiento que ya no necesita.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /es/monitors/notify/
[7]: /es/cloud_cost_management/planning/budgets/
[8]: /es/cloud_cost_management/planning/forecasting/
[102]: /es/llm_observability/
[103]: /es/llm_observability/investigate/cost/
[104]: /es/llm_observability/investigate/metrics/