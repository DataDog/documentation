---
description: Guía para calcular su puntuación Apdex e indicadores de rendimiento personalizados
  con datos de RUM
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: Documentación
  text: Configure la puntuación Apdex por servicio
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Dashboards de RUM
- link: /real_user_monitoring/application_monitoring/browser/data_collected
  tag: Documentación
  text: Datos de navegador de RUM recopilados
- link: /real_user_monitoring/android/data_collected
  tag: Documentación
  text: Datos recopilados de RUM para Android
- link: /real_user_monitoring/ios/data_collected
  tag: Documentación
  text: Datos recopilados de RUM para iOS
title: Calcule Apdex e indicadores de rendimiento personalizados con datos de RUM
---
## Descripción general {#overview}

Datadog recopila eventos de Real User Monitoring (RUM) de los SDK de RUM para navegadores y móviles que puede utilizar para crear un gráfico rápido y calcular métricas de rendimiento, como Apdex 

Para calcular su puntuación Apdex, puede utilizar el monitoreo de servicio de APM o los datos de monitoreo de usuario de los SDK de RUM. Esta guía proporciona instrucciones sobre cómo calcular Apdex para una aplicación con datos de RUM y el widget {{< ui >}}Query Value{{< /ui >}} en un [Quick Graph][1].

Para obtener más información sobre cómo calcular Apdex con datos de monitoreo de servicio, consulte [Configure la puntuación Apdex por servicio][2]

## Requisitos previos {#prerequisites}

- Su aplicación web o móvil está instrumentada con el SDK de RUM. Para configurar la instrumentación, consulte [RUM Browser Monitoring][3], [RUM Android Monitoring][4] y [RUM iOS Monitoring][5].
- Los eventos de su aplicación están disponibles en Datadog.

## Calcule una puntuación Apdex {#compute-an-apdex-score}

El siguiente ejemplo calcula una puntuación Apdex utilizando la métrica de rendimiento Largest Contentful Paint de los eventos de RUM y un umbral hipotético de `T = 2 sec`. La latencia mínima frustrante es `4T = 8 sec`. El valor resultante se muestra en un widget Query Value Quick Graph que puede exportar a dashboards o notebook

### Cree un Quick Graph {#create-a-quick-graph}

1. Navegue a {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Quick Graph{{< /ui >}}.
2. Cree tres consultas de RUM:
   * [Consulte `a`](#query-a) para todas las cargas de página satisfactorias (vistas de RUM donde Largest Contentful Paint tarda menos de 2 segundos en cargarse).
   * [Consulte `b`](#query-b) para todas las cargas de página toleradas (vistas de RUM donde Largest Contentful Paint tarda menos de 8 segundos en cargarse).
   * [Consulte `c`](#query-c) para todas las cargas de página (todas las vistas de RUM).
3. En el campo {{< ui >}}Formula{{< /ui >}}, ingrese la fórmula de Apdex `(a + 0.5 * b) / c`.
4. En {{< ui >}}Select a visualization{{< /ui >}}, haga clic en {{< ui >}}Query Value{{< /ui >}}. Aparece un widget de valor de consulta.
5. En el selector de marco de tiempo, seleccione {{< ui >}}Past 1 Day{{< /ui >}}. De forma predeterminada, el widget se muestra en Global Time
6. Ingrese un nombre para su gráfico, como `Apdex Score`.
7. Opcionalmente, exporte o copie y pegue el gráfico rápido a un dashboard o notebook, o haga clic en {{< ui >}}Export{{< /ui >}} > {{< ui >}}New Dashboard{{< /ui >}} para crear un dashboard con este gráfico rápido 

#### Consulta A {#query-a}

1. En {{< ui >}}Graph your data{{< /ui >}}, seleccione `RUM` como la fuente de datos para la consulta `a` e ingrese `@view.largest_contentful_paint:<2s`.
2. Presione Intro o haga clic en **Update query** en el menú desplegable La consulta `Largest Contentful Paint:<2s` aparece junto a `RUM` para la consulta `a`.

#### Consulta B {#query-b}

1. Para crear la consulta `b`, haga clic en {{< ui >}}\+ Add Query{{< /ui >}}.
2. Seleccione `RUM` como la fuente de datos para la consulta `b` e ingrese `@view.largest_contentful_paint:[2s TO 8s]`.
3. Presione Intro o haga clic en **Update query** en el menú desplegable La consulta `Largest Contentful Paint:[2s - 8s]` aparece junto a `RUM` para la consulta `b`.

#### Consulta C {#query-c}

1. Para crear la consulta `c`, haga clic en {{< ui >}}\+ Add Query{{< /ui >}}.
2. Seleccione `RUM` como la fuente de datos para la consulta `c` e ingrese `@Type:view`.
3. Presione Intro o haga clic en **Update query** en el menú desplegable La consulta `Type:view` aparece junto a `RUM` para la consulta `c`.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Puntuación Apdex en un Quick Graph" style="width:100%;">}}

### Configuración de JSON {#json-configuration}

Para acceder al código JSON de este gráfico, haga clic en la pestaña {{< ui >}}JSON{{< /ui >}} junto a {{< ui >}}Edit{{< /ui >}}.

Haga clic en el icono de copiar en la esquina derecha para copiar el JSON del Quick Graph a su portapapeles

{{< code-block lang="json" filename="JSON" disable_copy="false" collapsible="true" >}}
{
    "viz": "query_value",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "(query1 + 0.5 * query2) / query3"
                }
            ],
            "queries": [
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:<2000000000"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query1",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query2",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query3",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ],
    "autoscale": true,
    "precision": 2
}
{{< /code-block >}}

## Visualizaciones adicionales y puntuaciones Apdex {#additional-visualizations-and-apdex-scores}

En el ejemplo anterior, la puntuación Apdex es relevante para las vistas de RUM y la métrica de rendimiento Largest Contentful Paint  

También puede calcular otras puntuaciones Apdex con los siguientes métodos:

- Para ver la tendencia de la puntuación Apdex a lo largo del tiempo, seleccione {{< ui >}}Timeseries{{< /ui >}} en lugar de {{< ui >}}Query Value{{< /ui >}} en {{< ui >}}Select your visualization{{< /ui >}}.
- Para calcular la puntuación Apdex de una aplicación específica, agregue una consulta `@application.name` adicional y actualice su fórmula.
- Para calcular la puntuación Apdex con otra métrica de rendimiento de RUM, como First Contentful Paint, reemplace `@view.LargestContentfulPaint` con `@view.FirstContentfulPaint` en las consultas.

Para calcular indicadores de rendimiento adicionales para sus aplicaciones, determine qué puntos de datos necesita y qué eventos de RUM son relevantes para usted antes de [crear un Quick Graph](#create-a-quick-graph)

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/quick-graphs/
[2]: /es/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /es/real_user_monitoring/application_monitoring/browser/
[4]: /es/real_user_monitoring/android/
[5]: /es/real_user_monitoring/ios/