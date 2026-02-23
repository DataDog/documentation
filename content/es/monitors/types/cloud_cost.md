---
description: Monitoriza cambios de costos, umbrales, predicciones y anomalías en tus
  costos de nube.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gestiona y optimiza tus costos de OCI con Cloud Cost Management de Datadog
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentación
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: Blog
  text: Responde rápidamente en caso de sobrecostes con Cost Monitors para Datadog
    Cloud Cost Management
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permitir a los ingenieros hacerse cargo de los costes de Google Cloud con
    Datadog
title: Monitor de costes de la nube
---

## Información general
Los monitores de costos de nube te ayudan a identificar de forma proactiva los cambios en los costos y a comprender si se prevé que superes el budget (presupuesto), para que puedas investigar la causa.

- Mira al instante todos tus monitores de costos y filtra o busca por equipo, servicio, tag (etiqueta), proveedor o estado de alerta.
- Consulta un resumen de cuántos monitores están configurados, cuáles emiten alertas y qué áreas de gasto en nube se rastrean.
- Crea nuevos monitores de costos mediante plantillas y toma medidas en los monitores que necesitan atención.

Para poder configurar los monitores de Cloud Cost, necesitas tener configurado [Cloud Cost Management][1].

Los monitores de Cloud Cost utilizan una frecuencia de evaluación de 30 minutos y una ventana de evaluación diferida de 48 horas, ya que los datos de costos pueden no estar disponibles hasta 48 horas después de su uso. Por ejemplo, una retrospectiva de 7 días evaluada el 15 de enero examina los datos de costos del 6 al 13 de enero.

## Crear un monitor

Para crear un monitor (noun) de Cloud Cost en Datadog, ve a [**Cloud Cost > Analyze > Cost Monitors** ][4] (Cloud Cost > Analizar > Monitores de costos) y haz clic en **+ New Cost Monitor** (+ Nuevo monitor (noun) de costos).

Alternativamente, puedes configurar uno desde [**Monitors** --> **New Monitor** --> **Cloud Cost**][3] (Monitores --> Nuevo monitor (noun) --> Costo de la nube), la navegación principal, el [Explorer de costos de la nube][5] o a través de [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="El botón Crear monitor (noun) en la page (página) Monitor (noun) de costos" style="width:100%;" >}}

### Seleccionar un tipo de monitor de costes

Puedes seleccionar entre los siguientes tipos de monitor (noun):

| Tipo de monitor (noun) | Basado en la métrica de costos | Propósito                                                                                                                                                                                                                                                   | Ejemplo |
|--------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| Cambios      | Sí               | Detecta las variaciones diarias, semanales o mensuales de los costos.                                                                                                                                                                                                            | Alerta cuando la diferencia entre el costo de hoy y el de la semana anterior supere el 5 %.                                                                                                                                                             |
| Anomalías    | Sí               | Identifica patrones de costos inusuales o inesperados. <br> <br> Los días incompletos se excluyen del análisis para garantizar la precisión. Los monitores de anomalías requieren al menos 1 mes de datos de costos de la nube para evaluar, ya que se necesitan datos históricos para entrenar el algoritmo. | Alerta si 3 días de los últimos 30 días muestran anomalías significativas en los costos en comparación con los datos históricos. |
| Umbral    | Sí               | Alerta cuando los costos superen un valor establecido.                                                                                                                                                                                                                      | Establece alertas cuando el costo total de hoy supere los $10.000.                                                                                                                                                                                                       |
| Predicción     | Sí               | Alerta si los costos previstos superarán un umbral.                                                                                                                                                                                                        | Alerta diaria si el costo previsto para este mes supera los $500.                                                                                                                                                                            |
| Budget (presupuesto)       | No                | Alerta si los costos superan tu [budget (presupuesto)][7].                                                                                                                                                                                                                   | Alerta si el costo total del mes supera los $10.000 de budget (presupuesto).                                                                                                                                                                                      |

### Especifica qué costo debe rastrearse

{{< tabs >}}
{{% tab "Basado en la métrica de costes" %}}

Cualquier tipo de costo o métrica que informe a Datadog está disponible para los monitores. Puedes utilizar métricas personalizadas o métricas de observabilidad junto con una métrica de costos para monitorizar la economía unitaria.

| Paso                              | Obligatorio | Valor predeterminado              | Ejemplo             |
|-----------------------------------|----------|----------------------|---------------------|
| Seleccionar la métrica para costes            | Sí      | Todos los proveedores | `azure.cost.actual` |
| Definir el `filter by`            | No       | Nada           | `aws_product:s3`    |
| Agrupar por                          | No       | Nada           | `aws_availability_zone` |
| Añadir una métrica de observabilidad          | No       | `system.cpu.user`    | `aws.s3.all_requests` |

Utiliza el editor para definir los tipos de costos o las exportaciones.

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="Opciones de source (fuentes) de datos de costos y métricas de la nube para especificar qué costos deben rastrearse" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Basado en el budget (presupuesto)" %}}

Selecciona un budget (presupuesto) existente para monitorizar desde el menú desplegable.

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="Panel desplegable para especificar en cuál presupuesto rastrear el costo" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

Para obtener más información, consulta la [documentación de Cloud Cost Management][1].

### Definir condiciones de alerta

{{< tabs >}}
{{% tab "Cambios" %}}

Si utilizas el tipo de monitor (noun) **Cost Changes** (Cambios de costos), puedes activar una alerta cuando el costo `increases` o `decreases` supere el umbral definido. El umbral puede establecerse como **Percentage Change** (Porcentaje de cambio) o como **Dollar Amount** (Importe en dólares).

Si utilizas el **Percentage Change** (Porcentaje de cambio), puedes filtrar los cambios que estén por debajo de un determinado umbral en dólares. Por ejemplo, el monitor (noun) avisa cuando hay un cambio de costo superior al 5 % para cualquier cambio que supere los $500.

{{% /tab %}}

{{% tab "Anomalías" %}}

Para el tipo de monitor (noun) **Cost Anomalies** (Anomalías de costos), puedes activar una alerta si el costo observado está `above`, `below` o `above or below` un umbral en comparación con los datos históricos.

Se utiliza el `agile` [algoritmo de anomalías][101] con dos límites y estacionalidad mensual.

[101]: /es/dashboards/functions/algorithms/
{{% /tab %}}

{{% tab "Umbral" %}}

Si utilizas el tipo de monitor (noun) **Cost Threshold** (Umbral de costo), puedes activar una alerta cuando el costo de la nube esté `above`, `below`, `above or equal` o `below or equal to` un umbral.

{{% /tab %}}
{{% tab "Forecast" %}}

Si utilizas el tipo de monitor (noun) **Cost Forecast** (Previsión de costo), puedes activar una alerta cuando el costo de la nube esté `above`, `below`, `above or equal`, `below or equal to`, `equal to` o `not equal to` un umbral.

{{% /tab %}}

{{% tab "Budget (Presupuesto)" %}}
Si estás utilizando el tipo de monitor (noun) **Budget** (Presupuesto), puedes activar una alerta cuando el costo de la nube supere el budget (presupuesto) que seleccionaste en el step (UI) / paso (generic) previo.

| Paso               | Propósito                                                        | Valores                            |
|--------------------|----------------------------------------------------------------|-----------------------------------|
| Granularidad        | Nivel de detalle con el que se evalúa el costo.                | `overall` (costo total), `per_row` |
| Umbral          | Porcentaje del budget (presupuesto) que se utiliza para activar la alerta.    | Número entre 0 y 100 (%)      |
| Período de tiempo          | Ventana de evaluación utilizada para evaluar si se supera el umbral. | `all_months`, `current_month`     |


{{% /tab %}}
{{< /tabs >}}

<br>

### Configurar notificaciones y automatizaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][6].

### Definición de permisos y notificaciones de auditoría

Seleccione qué equipos, roles, usuarios o cuentas de servicio pueden **ver** o **editar** el monitor (noun). En forma predeterminada, todos los miembros de tu organización tienen acceso.

También puedes activar **Audit Notifications** (Notificaciones de auditoría)  para avisar al creador y a los destinatarios del monitor (noun) cada vez que se modifique el monitor (noun).

## Otras medidas que puedes adoptar

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="El menú de acciones abierto con opciones para ver el monitor (noun) en el Cloud Cost Explorer y opciones para editar, clonar y borrar el monitor (noun)." style="width:100%;" >}}

- **Visualizar en Monitores** para consultar el historial de alertas de tu monitor (noun), ajustar las visualizaciones y revisar la frecuencia con la que ha activado las alertas.
- **Ver en Explorer** para abrir el monitor (noun) en el Cloud Cost Explorer para un análisis más profundo.
- **Editar** un monitor (noun) para actualizar los parámetros o la configuración del monitor (noun).
- **Clonar** un monitor (noun) para crear una copia de un monitor (noun) existente seleccionando **Actions > Clone** (Acciones > Clonar).
- **Borrar** un monitor (noun) para eliminar definitivamente un monitor (noun) que ya no necesites.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /es/monitors/notify/
[7]: /es/cloud_cost_management/planning/budgets/