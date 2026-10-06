---
description: Guarde una consulta de métricas como una nueva métrica que pueda reutilizar
  en tableros, seguimientos, SLOs y cuadernos.
further_reading:
- link: https://www.datadoghq.com/blog/auto-smoother-asap/
  tag: Blog
  text: Suavice automáticamente las métricas ruidosas para revelar tendencias
title: Métricas derivadas
---
## Descripción general {#overview}

Las métricas derivadas le permiten guardar cualquier consulta de métricas como una nueva métrica, para que pueda simplificar y optimizar cómo trabaja con métricas en Datadog. En lugar de crear repetidamente consultas complejas en tableros, seguimientos, SLOs y cuadernos, puede crear una métrica derivada una vez y reutilizarla en todos sus activos. Utilice métricas derivadas para:

- **Simplificar las consultas**: Defina una consulta una vez, guárdela como una métrica derivada y reutilícela en todas partes.
- **Reducir errores y aumentar la consistencia**: Mantenga las fórmulas de forma centralizada para evitar errores y garantizar la uniformidad entre los equipos.
- **Acelerar los flujos de trabajo**: No se necesitan cambios de código ni nuevos envíos de métricas; cree nuevas métricas directamente a partir de las métricas existentes en Datadog.
- **Obtenga control y auditabilidad**: Gestione y mejore las fórmulas derivadas en un solo lugar.

**Nota**: Las métricas derivadas **no** se facturan como Custom Metrics, ya que se calculan dinámicamente al momento de la consulta y no se almacenan ni indexan.

## Crear una métrica derivada {#create-a-derived-metric}

Para crear una métrica derivada, navegue a [{{< ui >}}Metrics > Generate Metrics{{< /ui >}}][1] y haga clic en {{< ui >}}\+ New Metric{{< /ui >}}.

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="La pestaña generate metrics en Datadog" style="width:90%;" >}}

1. Asigne a su métrica derivada un nombre que **no** comience con `datadog.estimated_usage`. Utilice el formato descrito en [naming Custom Metrics][2].

2. Defina cualquier consulta de métricas subyacente y, opcionalmente, utilice el cuadro de fórmulas para definir las operaciones matemáticas que se realizarán sobre los valores de las métricas. 

   Por ejemplo, para monitorear la estabilidad general de los conectores de Kafka, podría crear consultas individuales `a` y `b` utilizando las métricas `kafka.connect.connector.status.running` y `kafka.connect.connector.status.failed`. Luego, en el cuadro de fórmulas, ingrese la fórmula `(a / (a + b)) * 100`.

   Para obtener más información sobre cómo definir consultas de métricas, consulte [consulta de métricas][3].

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="Una consulta de métricas de Datadog para generar una métrica derivada" style="width:90%;" >}}

3. Haga clic en {{< ui >}}Create Metric{{< /ui >}}.

## Actualizar una métrica derivada {#update-a-derived-metric}

Para actualizar una métrica derivada, coloque el cursor sobre la métrica y haga clic en el icono {{< ui >}}Edit{{< /ui >}} que aparece a la derecha. 

**Nota **: No puede cambiar el nombre de una métrica existente. Cree una métrica nueva en su lugar.

## Eliminar una métrica derivada {#delete-a-derived-metric}

Para eliminar una métrica derivada, coloque el cursor sobre la métrica derivada y haga clic en el icono {{< ui >}}Delete{{< /ui >}} que aparece a la derecha. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /es/metrics/custom_metrics/#naming-custom-metrics
[3]: /es/metrics/#querying-metrics