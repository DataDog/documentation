---
further_reading:
- link: https://www.datadoghq.com/blog/auto-smoother-asap/
  tag: Blog
  text: Métricas ruidosas con suavizado automático para revelar tendencias
title: Métricas derivadas
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScUkDpqIQNN1G4llFA7JN2qeevIp4wqfyDaa4A7lRCEa9FopQ/viewform?usp=header" >}}
La función de métricas derivadas está en vista previa.
{{< /callout >}} 

## Información general

Las métricas derivadas te permiten guardar cualquier consulta sobre métricas como una nueva métrica, para que puedas simplificar y optimizar la forma en que trabajas con las métricas en Datadog. En lugar de crear repetidamente consultas complejas utilizando dashboards, monitores, SLOs y notebooks, puedes crear una métrica derivada una vez y reutilizarla en todos tus recursos. Utiliza métricas derivadas para:

- **Simplificar la consulta**: Define una consulta una vez, guárdala como métrica derivada y reutilízala en todas partes.
- **Reducir los errores y aumentar la coherencia**: Mantén las fórmulas de forma centralizada para evitar errores y garantizar la uniformidad entre equipos.
- **Acelerar los flujos de trabajo**: No se necesitan cambios de código ni nuevos envíos de métricas. Crea nuevas métricas directamente a partir de las métricas existentes en Datadog.
- **Ganar control y auditabilidad**: Gestiona y mejora las fórmulas derivadas en un único lugar.

**Nota**: Las métricas derivadas **no** se facturan como métricas personalizadas, ya que se calculan dinámicamente en el momento de la consulta y no se almacenan ni indexan.

## Crear una métrica derivada

Para crear una métrica derivada, ve a **[Metrics > Generate Metrics (Métricas > Generar métricas)][1]** y haz clic en **+ New Metric** (+ Nueva métrica).

{{< img src="metrics/derived_metrics/generate_metrics_tab.png" alt="Pestaña de generación de métricas en Datadog" style="width:90%;" >}}

1. Asigna a tu métrica derivada un nombre que **no** empiece por `datadog.estimated_usage`. Utiliza el formato descrito en la [denominación de métricas personalizadas][2].

2. Define cualquier consulta de métricas subyacente y, opcionalmente, utiliza el cuadro de fórmulas para definir las operaciones matemáticas que se realizarán con los valores métricos.

   Por ejemplo, para monitorizar la estabilidad general de los conectores Kafka, podrías crear consultas individuales `a` y `b` utilizando las métricas `kafka.connect.connector.status.running` y `kafka.connect.connector.status.failed`. A continuación, en el cuadro de fórmulas, introduce la fórmula `(a / (a + b)) * 100`.

   Para obtener más información sobre cómo definir consultas de métricas, consulta las [consultas de métricas][3].

{{< img src="metrics/derived_metrics/derived_metric_query.png" alt="Consulta de métricas de Datadog para generar una métrica derivada" style="width:90%;" >}}

3. Haz clic en **Crear métrica**.

## Actualizar una métrica derivada

Para actualizar una métrica derivada, pasa el cursor sobre la métrica y haz clic en el icono **Edit** (Editar) que aparece a la derecha.

**Nota**: No puedes cambiar el nombre de una métrica existente. En su lugar, crea una nueva métrica.

## Eliminar una métrica derivada

Para eliminar una métrica derivada, pasa el cursor sobre la métrica y haz clic en el icono **Delete** (Eliminar) que aparece a la derecha.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/metric/generate-metrics
[2]: /es/metrics/custom_metrics/#naming-custom-metrics
[3]: /es/metrics/#querying-metrics