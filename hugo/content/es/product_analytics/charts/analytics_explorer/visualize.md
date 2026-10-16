---
aliases:
- /es/product_analytics/analytics_explorer/visualize
description: Elija un tipo de gráfico, como series temporales, una tabla o un Treemap,
  para mostrar los resultados de su consulta de Product Analytics.
title: Visualizar
---
Después de crear una consulta de análisis, utilice el selector de tipo de gráfico para controlar cómo se muestran los resultados.

La mayoría de los tipos de gráficos visualizan una medida, una faceta o ambas:

Medida
: Un atributo con un valor numérico contenido en sus eventos de Product Analytics, como el tiempo de carga.

Faceta
: Un atributo cuyos valores únicos usted agrupa o compara, como el país o el navegador.

Puede hacer clic en la mayoría de los componentes del gráfico para obtener más detalles, como los eventos subyacentes de un punto de datos o un rango de tiempo más estrecho. Las opciones disponibles varían según el tipo de gráfico.

<div class="alert alert-tip">Para ver resultados paginados a nivel de evento en lugar de un gráfico agregado, utilice {{< ui >}}Events{{< /ui >}} la página. Los eventos son ideales cuando los resultados individuales importan y no necesita conocimiento previo de lo que define un resultado coincidente.</div>

## series temporales {#timeseries}

Visualice la evolución de una sola medida o faceta durante un período de tiempo seleccionado.

Elija opciones de visualización adicionales, tales como:

- Visualización: Los resultados se muestran como barras (recomendado para conteos y conteos únicos), líneas (recomendado para agregaciones estadísticas) o áreas. Hay varios conjuntos de colores disponibles.
- Intervalo de resumen: Determina el ancho de los intervalos en las barras.

{{< img src="product_analytics/analytics/visualize/analytics-timeseries-3.png" alt="Una vista del gráfico de series temporales en el generador de gráficos de Analytics." style="width:90%;" >}}

## Valor de consulta {#query-value}

Muestre un único valor agregado para una medida o faceta durante el período de tiempo seleccionado. Los gráficos de valor de consulta no admiten desgloses.

Opcionalmente, habilite {{< ui >}}Change{{< /ui >}} para mostrar cómo aumentó o disminuyó el valor durante un período de comparación, como la hora, el día o la semana anterior.

{{< img src="product_analytics/analytics/visualize/analytics-query-value-1.png" alt="Una vista del gráfico de valor de consulta en el generador de gráficos de Analytics." style="width:90%;" >}}

## Lista principal {#top-list}

Visualice una clasificación ordenada de los valores superiores o inferiores de una faceta según la medida elegida.

{{< img src="product_analytics/analytics/visualize/analytics-top-list-3.png" alt="Una vista del gráfico de lista principal en el generador de gráficos de Analytics." style="width:90%;" >}}

## Gráfico de barras {#bar-chart}

Compare una medida entre los valores de una faceta mediante columnas verticales.

{{< img src="product_analytics/analytics/visualize/analytics-bar-chart-1.png" alt="Una vista del gráfico de barras en el generador de gráficos de Analytics." style="width:90%;" >}}

## Tabla {#table}

Visualice los valores superiores o inferiores de hasta cuatro facetas, según la medida elegida (la primera medida que elija en la lista). Las medidas adicionales muestran sus valores para los elementos que aparecen en la tabla. Actualice la consulta de búsqueda o investigue los eventos correspondientes a una dimensión.

- Cuando una tabla incluye varias medidas, la clasificación superior o inferior se determina mediante la primera medida.
- El subtotal puede diferir de la suma real de los valores en un grupo, ya que solo se muestra un subconjunto (superior o inferior). Los eventos con un valor nulo o vacío para una dimensión no se muestran como un subgrupo.

<div class="alert alert-info">Una tabla con una sola medida y un solo desglose es equivalente a una <a href="#top-list">lista principal</a>, mostrada de forma diferente.</div>

{{< img src="product_analytics/analytics/visualize/analytics-table-1.png" alt="Una vista del gráfico de tabla en el generador de gráficos de Analytics." style="width:90%;">}}

## Cambie {#change}

Muestre cómo aumentó o disminuyó una medida entre el período de tiempo seleccionado y un período de comparación, como la hora, el día o la semana anterior. Opcionalmente, agregue una faceta para ver el cambio desglosado por sus valores.

{{< img src="product_analytics/analytics/visualize/analytics-change-1.png" alt="Una vista del gráfico de Cambio en el generador de gráficos de Analytics." style="width:90%;" >}}

## Treemap {#treemap}

Un Treemap le ayuda a organizar y mostrar datos como un porcentaje de un todo en un formato visualmente atractivo. Los Treemap muestran datos en rectángulos anidados. Compare diferentes facetas usando tanto el tamaño como el color de los rectángulos.

{{< img src="product_analytics/analytics/visualize/analytics-treemap-1.png" alt="Una vista del gráfico Treemap en el generador de gráficos de Analytics." style="width:90%;">}}

## Gráfico circular {#pie-chart}

Un gráfico circular le ayuda a organizar y mostrar datos como un porcentaje de un todo. Es útil al comparar la relación entre diferentes facetas, como países, navegadores o nombres de vista.

{{< img src="product_analytics/analytics/visualize/analytics-pie-chart-2.png" alt="Una vista del gráfico circular en el generador de gráficos de Analytics." style="width:90%;">}}

## Mapa geográfico {#geomap}

Visualice una sola medida o faceta en un mapa mundial.

{{< img src="product_analytics/analytics/visualize/analytics-geomap-1.png" alt="Una vista del Mapa geográfico en el generador de gráficos de Analytics." style="width:90%;">}}