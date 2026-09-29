---
aliases:
- /es/product_analytics/analytics_explorer/
- /es/product_analytics/journeys
description: Cree y visualice consultas de análisis personalizadas utilizando eventos,
  medidas, filtros y desgloses.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilice mapas geográficos para visualizar los datos de su aplicación por ubicación
title: Analytics
---
Los gráficos de Analytics comienzan a partir de una única consulta: un evento, una medida y cualquier filtro. Defínalos una vez y luego elija cómo visualizar el resultado. 

Utilice los gráficos de análisis para:

- Visualizar cuántos usuarios activaron un evento y cómo cambia la adopción de funciones a lo largo del tiempo.
- Medir con qué frecuencia los usuarios realizan una acción y qué tan profundamente interactúan con su producto.
- Desglosar una métrica por propiedades de usuario o evento, y visualizar la composición de los eventos.
- Crear métricas personalizadas con fórmulas, combinando cualquier evento o métrica en una tasa, proporción o puntuación.
- Aclarar qué usuarios o segmentos están impulsando un pico, una caída o una tendencia.

{{< img src="/product_analytics/analytics/analytics_chart.png" alt="Un ejemplo de gráfico de Analytics." style="width:90%;" >}}

## Cree una consulta {#build-a-query}

Una consulta define lo que mide un gráfico de análisis, independientemente de cómo elija mostrarlo más tarde.

{{< img src="/product_analytics/analytics/analytics_query_builder.png" alt="Un generador de consultas de Analytics con llamadas numeradas para el nombre de visualización de la consulta, el selector de eventos, el selector de medidas y los controles de filtro, desglose, función y consulta adicional." style="width:50%;" >}}
   
1. En {{< ui >}}Product Analytics{{< /ui >}}, seleccione {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Analytics{{< /ui >}}.

2. (Opcional) Ingrese un {{< ui >}}Query display name{{< /ui >}} para etiquetar la consulta.
   
3. Haga clic en el selector de eventos para elegir qué eventos incluye la consulta, como un 'visualizar' específico o una sesión. Utilice las pestañas dentro del selector para limitar la lista por categoría de evento: {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Labeled actions{{< /ui >}}, {{< ui >}}Actions{{< /ui >}} o {{< ui >}}Server actions{{< /ui >}}.

4. Elija cómo mide la consulta los eventos seleccionados utilizando {{< ui >}}Viewed as count of{{< /ui >}}. Seleccione {{< ui >}}All events{{< /ui >}} para contar cada ocurrencia, o seleccione una propiedad específica, como {{< ui >}}User Id{{< /ui >}}, para contar valores únicos en su lugar.

5. (Opcional) Configure el contexto de la consulta por propiedades de evento, usuario, segmento o cuenta, incluidos atributos personalizados de integraciones de terceros, utilizando {{< ui >}}Add filter{{< /ui >}}.

6. (Opcional) Compare resultados entre los valores de una propiedad, como país o el 'visualizar', utilizando {{< ui >}}Add breakdown{{< /ui >}}.

   <div class="alert alert-info">{{< ui >}}Query Value{{< /ui >}} los gráficos eliminan los desgloses, y los gráficos {{< ui >}}Geomap{{< /ui >}} los convierten en una faceta de ubicación.</div>

7. (Opcional) Aplique una función que transforme la consulta, como calcular una tasa de cambio o suavizar los datos, utilizando {{< ui >}}Σ{{< /ui >}}. Consulte [Funciones][1] para obtener más detalles.
   
8. (Opcional) Ejecute una segunda consulta independiente junto a la primera utilizando {{< ui >}}Add Query{{< /ui >}}. Combine varias consultas en un solo resultado, utilizando {{< ui >}}Add Formula{{< /ui >}}.

## Comprenda un gráfico de análisis {#understand-an-analytics-chart}

Después de crear una consulta, el gráfico muestra sus datos utilizando el evento, la medida, los filtros y el desglose que definió. Desde aquí, puede cambiar cómo se visualizan y muestran esos datos sin cambiar la consulta subyacente.

No todas las opciones se aplican a todos los tipos de gráfico. El intervalo de resumen y el estilo de visualización, por ejemplo, solo se aplican a los gráficos {{< ui >}}Timeseries{{< /ui >}}.

{{< img src="product_analytics/analytics/analytics_analysis.png" alt="Un gráfico de Analytics con llamadas numeradas para el selector de tipo de gráfico, el intervalo de resumen, el selector de rango de tiempo, el selector de visualización, el menú de opciones de puntos de datos y un intervalo en curso." style="width:100%;" >}}

1. Utilice el selector de tipo de gráfico para cambiar entre [tipos de gráfico][2].

2. Para los gráficos {{< ui >}}Timeseries{{< /ui >}}, utilice el selector de resumen para establecer el intervalo de tiempo que representa cada punto de datos. Elija {{< ui >}}Default{{< /ui >}} para permitir que el intervalo se ajuste según el rango de tiempo, o fíjelo en un valor específico.

3. Utilice el selector de rango de tiempo para establecer el período de datos que analiza el gráfico, desde {{< ui >}}Past 1 Hour{{< /ui >}} hasta {{< ui >}}Past 1 Year{{< /ui >}}, o seleccione un rango personalizado en el calendario.

4. Para los gráficos {{< ui >}}Timeseries{{< /ui >}}, utilice el selector de visualización para cambiar entre {{< ui >}}Bars{{< /ui >}}, {{< ui >}}Lines{{< /ui >}} y {{< ui >}}Areas{{< /ui >}}.

5. Pase el cursor sobre un punto de datos para visualizar los detalles o haga clic en él para acceder a las opciones para acercar, visualizar los eventos subyacentes, o buscar o excluir ese valor de la consulta.

6. Los segmentos sombreados indican intervalos que aún están en curso. 

## Más información {#learn-more}
{{< whatsnext desc="Aprenda a buscar, agrupar y visualizar eventos de análisis, y a exportar o examinar eventos individuales." >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/search_syntax" >}}Sintaxis de búsqueda{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/events" >}} Eventos {{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/visualize" >}}Visualizar{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/group" >}}Grupos{{< /nextlink >}}
    {{< nextlink href="product_analytics/charts/analytics_explorer/export" >}}Exportar{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/functions/
[2]: /es/product_analytics/charts/analytics_explorer/visualize/