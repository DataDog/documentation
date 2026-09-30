---
aliases:
- /es/real_user_monitoring/generate_metrics
description: Cree métricas personalizadas a partir de sus eventos de RUM.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Aprenda a capturar eventos de RUM desde su navegador y aplicaciones móviles
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Aprenda a crear consultas en el explorador RUM
- link: /real_user_monitoring/explorer/search/#event-types
  tag: Documentación
  text: Obtenga información sobre los tipos de eventos de RUM
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentación
  text: Genere métricas a partir de registros ingeridos
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: Blog
  text: Genere métricas basadas en RUM para realizar un seguimiento de las tendencias
    históricas en la experiencia del cliente
title: Genere Custom Metrics a partir de eventos de RUM.
---
## Descripción general {#overview}

Real User Monitoring (RUM) le permite capturar eventos que ocurren en su navegador y aplicaciones móviles utilizando los SDK de Datadog RUM y recopilar datos de eventos a una [tasa de muestreo][1]. Datadog conserva estos datos de eventos en el [RUM Explorer][2], donde puede crear consultas de búsqueda y visualizaciones.

Las métricas personalizadas basadas en RUM son una opción rentable para resumir los datos de su conjunto de eventos de RUM. Puede visualizar tendencias y anomalías en sus datos de RUM a un nivel granular durante un máximo de 15 meses. Después de crear una Custom Metric, consulte [Create Charts with RUM Custom Metrics][17] para agregarla a un tablero.

**Nota:** Las Custom Metrics se calculan en función del 100% del tráfico de RUM ingerido, no solo de los datos retenidos en el RUM Explorer. Esto garantiza métricas precisas incluso cuando se utilizan filtros de retención de [RUM without Limits][16] que pueden retener solo un subconjunto de sus sesiones.

**Nota de facturación:** Las métricas creadas a partir de eventos de RUM se facturan como [Custom Metrics][3].

## Cree una Custom Metric basada en RUM {#create-a-rum-based-custom-metric}

Para crear una Custom Metric a partir de datos de eventos de RUM, navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}}][4] y haga clic en {{< ui >}}\+ New Metric{{< /ui >}}.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="Haga clic en + New Metric para crear una Custom Metric basada en RUM" width="80%" >}}

Para crear una Custom Metric a partir de una consulta de búsqueda en el [RUM Explorer][5], haga clic en el botón {{< ui >}}Export{{< /ui >}} y seleccione {{< ui >}}Generate new metric{{< /ui >}} en el menú desplegable.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Genere una Custom Metric basada en RUM" width="80%" >}}

1. Asigne a su [Custom Metric][3] un nombre que no comience con `datadog.estimated_usage`, como `rum.sessions.count_by_geography`. Para obtener más información, consulte la [naming convention][6].
2. Seleccione un tipo de evento para el cual desee crear una Custom Metric, como `Sessions`. Sus opciones incluyen {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Actions{{< /ui >}}, {{< ui >}}Errors{{< /ui >}}, {{< ui >}}Resources{{< /ui >}} y {{< ui >}}Long Tasks{{< /ui >}}. Para obtener más información, consulte [Buscar eventos de RUM][7].
3. Cree una consulta de búsqueda que filtre sus eventos de RUM utilizando la [sintaxis de búsqueda][8] del RUM Explorer, como `@session.type:user`. 
4. Elija un campo para hacer un seguimiento desde el menú desplegable junto a {{< ui >}}Count{{< /ui >}}. 

   - Seleccione `*` para generar un recuento de todos los eventos de RUM que coincidan con su consulta de búsqueda. 
   - Opcionalmente, ingrese un atributo de evento, como `@action.target`, para agregar un valor numérico y crear una métrica `count` o `distribution` correspondiente. 

   Si la faceta de atributo de RUM es una medida, el valor de la métrica es el valor del atributo de RUM.

5. Seleccione una ruta para agrupar desde el menú desplegable junto a {{< ui >}}group by{{< /ui >}}. El nombre de la etiqueta de la métrica es el nombre del atributo o etiqueta original sin el `@`. De forma predeterminada, las Custom Metrics generadas a partir de eventos de RUM no contienen etiquetas a menos que se agreguen explícitamente. Puede usar un atributo o una dimensión de etiqueta que exista en sus eventos de RUM, como `@error.source` o `env`, para crear etiquetas de métricas. 
   
   <div class="alert alert-danger">Las Custom Metrics basadas en RUM se consideran <a href="/metrics/custom_metrics/">Custom Metrics</a> y se facturan en consecuencia. Evite agrupar por atributos no acotados o de cardinalidad extremadamente alta, como marcas de tiempo, ID de usuario, ID de solicitud e ID de sesión.
   </div>

6. Para las Custom Metrics creadas en sesiones y vistas, seleccione {{< ui >}}The active session/view starts matching the query{{< /ui >}} o {{< ui >}}The session/view becomes inactive or is completed{{< /ui >}} para establecer los criterios de coincidencia para sesiones y vistas. Para obtener más información, consulte [Agregar una Custom Metric en sesiones y vistas](#add-a-rum-based-metric-on-sessions-and-views).

7. Opcionalmente, agregue agregaciones de percentiles para métricas de distribución. Consulte [Agregación de percentiles](#percentile-aggregation).

8. Haga clic en {{< ui >}}Create Metric{{< /ui >}}.

Su Custom Metric basada en RUM aparece en la lista a continuación {{< ui >}}Custom RUM Metrics{{< /ui >}}, y puede haber un breve retraso para que su métrica esté disponible en [dashboards][9] y [monitors][10]. 

No se crean puntos de datos para métricas con datos históricos. Los puntos de datos para su Custom Metric basada en RUM se generan en un intervalo de diez segundos. Los datos de las métricas se conservan durante 15 meses. 

### Agregación de percentiles {#percentile-aggregation}

Puede optar por la funcionalidad de consulta avanzada y utilizar percentiles precisos a nivel global (como P50, P75, P90, P95 y P99) para métricas de distribución.

<div class="alert alert-danger">Habilitar la funcionalidad de consulta avanzada con percentiles genera más <a href="/metrics/custom_metrics/">Custom Metrics</a> y se <a href="/account_management/billing/custom_metrics/">factura en consecuencia</a>.</div>

### Agregar una Custom Metric basada en RUM en sesiones y vistas {#add-a-rum-based-metric-on-sessions-and-views}

Las sesiones y vistas se consideran activas cuando hay actividad de la aplicación o del usuario en curso en una aplicación RUM. Por ejemplo, a medida que un usuario abre nuevas páginas, estas vistas de página se recopilan en la sesión del usuario. A medida que un usuario interactúa con los botones de una página, estas acciones se recopilan en las vistas de página.

   Supongamos que tiene una Custom Metric basada en RUM que cuenta el número de sesiones de usuario que contienen más de cinco errores, y un ID de sesión `123` que alcanza cinco errores a las 11 a. m. y se cierra a las 12 p. m.

   - Al contabilizar la sesión o vista tan pronto como coincide con la consulta, usted incrementa el valor de la métrica de conteo en uno en la marca de tiempo de las 11 a. m.
   - Al contabilizar la sesión o vista que está inactiva, usted incrementa el valor de la métrica de conteo en uno en la marca de tiempo de las 12 p. m.

## Administrar Custom Metrics basadas en RUM {#manage-rum-based-custom-metrics}

Puede generar una métrica de conteo de eventos RUM que coincidan con una consulta o una [métrica de distribución][11] de un valor numérico contenido en los eventos RUM, como la duración de la solicitud.

### Actualizar una Custom Metric basada en RUM {#update-a-rum-based-custom-metric}

Para actualizar una métrica, coloque el cursor sobre una métrica y haga clic en el icono {{< ui >}}Edit{{< /ui >}} en la esquina derecha.

- Consulta de filtro: Cambie el conjunto de eventos RUM coincidentes que se agregan en métricas.
- Grupos de agregación: actualice las etiquetas para gestionar la cardinalidad de las métricas generadas.
- Selección de percentiles: haga clic en el interruptor {{< ui >}}Calculate percentiles{{< /ui >}} para eliminar o generar métricas de percentiles.

Debido a que no puede cambiar el nombre de una métrica existente, Datadog recomienda crear otra métrica.

### Eliminar una Custom Metric basada en RUM {#delete-a-rum-based-custom-metric}

Para detener el cálculo de puntos de datos de su Custom Metric y la facturación, pase el cursor sobre una métrica y haga clic en el icono {{< ui >}}Delete{{< /ui >}} en la esquina derecha. 

## Uso {#usage}

Puede utilizar Custom Metrics basadas en RUM para las siguientes acciones:

- Visualizar tendencias durante un período de tiempo determinado en un [dashboard][12]
- Active una alerta cuando una métrica se comporte de manera diferente a como lo ha hecho en el pasado en un [anomaly monitor][13]
- Active una alerta cuando se prediga que una métrica cruzará un umbral en el futuro en un [forecast monitor][14]
- Cree [metric-based SLOs][15] para hacer un seguimiento de los objetivos de rendimiento centrados en el usuario para sus equipos y organizaciones 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/sampling-browser-plans
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /es/real_user_monitoring/explorer/
[6]: /es/metrics/custom_metrics/#naming-custom-metrics
[7]: /es/real_user_monitoring/explorer/search/#event-types
[8]: /es/real_user_monitoring/explorer/search_syntax/
[9]: /es/dashboards/
[10]: /es/monitors/
[11]: /es/metrics/distributions/
[12]: /es/dashboards/querying/#configuring-a-graph
[13]: /es/monitors/types/anomaly/
[14]: /es/monitors/types/forecasts/
[15]: /es/service_level_objectives/metric/
[16]: /es/real_user_monitoring/rum_without_limits/
[17]: /es/real_user_monitoring/guide/create-charts-with-rum-custom-metrics