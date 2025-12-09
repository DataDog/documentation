---
description: Guía para el cálculo de tu puntuación de Apdex y tus indicadores de rendimiento
  personalizados con datos RUM
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: Documentación
  text: Configurar la puntuación de Apdex por servicio
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Dashboards RUM
- link: /real_user_monitoring/browser/data_collected
  tag: Documentación
  text: Datos del navegador RUM recopilados
- link: /real_user_monitoring/android/data_collected
  tag: Documentación
  text: Datos de RUM Android recopilados
- link: /real_user_monitoring/ios/data_collected
  tag: Documentación
  text: Datos recopilados de RUM iOS
title: Cálculo de la puntuación de Apdex y de los indicadores de rendimiento personalizados
  con datos RUM
---

## Información general

Datadog recopila eventos Real User Monitoring (RUM) a partir de los SDK RUM de navegadores y móviles, que puedes utilizar para crear un Quick Graph y calcular métricas de indicadores de rendimiento como Apdex. 

Para calcular tu puntuación de Apdex, puedes utilizar la monitorización de servicios de APM o los datos de monitorización de usuarios a partir de los SDK RUM. Esta guía proporciona instrucciones sobre el cálculo de Apdex para una aplicación con datos RUM y el widget **Valor de consulta** en un [Quick Graph][1].

Para obtener más información sobre el cálculo de Apdex utilizando datos de monitorización de servicios, consulta [Configurar la puntuación de Apdex por servicio][2].

## Requisitos previos

- Tu aplicación web o móvil debe estar instrumentada con el SDK RUM. Para configurar la instrumentación, consulta [Monitorización del Navegador RUM][3], [Monitorización de RUM Android][4] y [Monitorización de RUM iOS][5].
- Los eventos de tu aplicación deben estar disponibles en Datadog.

## Cálculo de una puntuación de Apdex 

En el siguiente ejemplo se calcula una puntuación de Apdex utilizando la métrica de rendimiento Largest Contentful Paint de eventos RUM y un umbral hipotético de `T = 2 sec`. La latencia de frustración mínima es `4T = 8 sec`. El valor resultante se muestra en un Quick Graph del widget de valor de consulta, que puedes exportar a dashboards o notebooks.

### Crear un Quick Graph

1. Ve a **dashboards** > **Quick Graph**.
2. Crea tres consultas RUM:
   * [Consulta `a`](##query-a) para todas las cargas de páginas satisfactorias (vistas RUM en las que Largest Contentful Paint tarda menos de 2 segundos en cargarse).
   * [Consulta `b`](#query-b) para todas las cargas de páginas toleradas (vistas RUM en las que Largest Contentful Paint tarda menos de 8 segundos en cargarse).
   * [Consulta `c`](#query-c) para todas las cargas de páginas (todas las vistas RUM).
3. En el campo **Fórmula**, introduce la fórmula de Apdex `(a + 0.5 * b) / c` .
4. En **Seleccionar una visualización**, haz clic en **Valor de consulta**. Aparece un widget de valor de consulta.
5. En el selector de marco temporal, selecciona **Pasado 1 día**. Por defecto, el widget se muestra en Hora global.
6. Introduce un nombre para el gráfico, por ejemplo `Apdex Score`.
7. También puedes exportar o copiar y pegar el Quick Graph en un dashboard o notebook o puedes hacer clic en **Exportar** > **Nuevo dashboard** para crear un dashboard con este Quick Graph. 

#### Consulta A

1. En **Grafica tus datos**, selecciona `RUM` como fuente de datos para la consulta `a` e introduce `@view.largest_contentful_paint:<2s`.
2. Pulsa Intro o haz clic en **Actualizar consulta** en el menú desplegable. La consulta `Largest Contentful Paint:<2s` aparece junto a `RUM` para la consulta `a`.

#### Consulta B

1. Para crear la consulta `b`, haz clic en **+ Añadir consulta**.
2. Selecciona `RUM` como fuente de datos para la consulta `b` e introduce `@view.largest_contentful_paint:[2s TO 8s]`.
3. Pulsa Intro o haz clic en **Actualizar consulta** en el menú desplegable. La consulta `Largest Contentful Paint:[2s - 8s]` aparece junto a `RUM` para la consulta `b`.

#### Consulta C

1. Para crear la consulta `c`, haz clic en **+ Añadir consulta**.
2. Selecciona `RUM` como fuente de datos para la consulta `c` e introduce `@Type:view`.
3. Pulsa Intro o haz clic en **Actualizar consulta** en el menú desplegable. La consulta `Type:view` aparece junto a `RUM` para la consulta `c`.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Puntuación de Apdex en un Quick Graph" style="width:100%;">}}

### Configuración de JSON

Para acceder al código JSON de este gráfico, haz clic en la pestaña **JSON** junto a **Editar**.

Haz clic en el icono de copia en la esquina derecha para copiar el Quick Graph JSON en el portapapeles.

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

## Visualizaciones y puntuaciones de Apdex adicionales

En el ejemplo anterior, la puntuación de Apdex es relevante para los eventos de visualización RUM y para la métrica de rendimiento Largest Contentful Paint.

También puedes calcular otras puntuaciones de Apdex con los siguientes métodos:

- Para ver la tendencia de la puntuación de Apdex a lo largo del tiempo, selecciona `Timeseries` en lugar de `Query Value` en **Selecciona tu visualización**.
- Para calcular la puntuación de Apdex para una aplicación específica, añade una consulta adicional `@application.name` y actualiza tu fórmula.
- Para calcular la puntuación de Apdex con otra métrica de rendimiento RUM, como First Contentful Paint, sustituye `@view.LargestContentfulPaint` por `@view.FirstContentfulPaint` en las consultas.

Para calcular indicadores de rendimiento adicionales para tus aplicaciones, determina qué puntos de datos necesitas y qué eventos RUM son relevantes para ti, antes de [crear un gráfico rápido](#create-a-quick-graph).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/quick-graphs/
[2]: /es/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /es/real_user_monitoring/browser/
[4]: /es/real_user_monitoring/android/
[5]: /es/real_user_monitoring/ios/