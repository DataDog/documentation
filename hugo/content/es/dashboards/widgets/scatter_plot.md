---
aliases:
- /es/graphing/widgets/scatter_plot/
description: Grafique un contexto seleccionado sobre dos métricas diferentes con sus
  respectivas agregaciones, o trace eventos sin procesar para inspeccionar puntos
  de datos individuales
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
title: Widget de gráfico de dispersión
widget_type: scatterplot
---
Un gráfico de dispersión identifica una posible relación entre los cambios observados en dos conjuntos diferentes de variables. Proporciona un medio visual y estadístico para probar la fuerza de una relación entre dos variables. La visualización de gráfico de dispersión le permite graficar un contexto seleccionado sobre dos métricas diferentes con sus respectivas agregaciones. También puede trazar eventos sin procesar para inspeccionar puntos de datos individuales.

{{< img src="dashboards/widgets/scatterplot/scatterplot2.png" alt="Un widget de gráfico de dispersión. El gráfico muestra las visitas por resolución de pantalla. El eje X muestra el ancho de pantalla, el eje Y muestra la altura de pantalla." >}}

## Configuración {#setup}

### Configuración {#configuration}

1. Seleccione una métrica u otro conjunto de datos, y una agregación para el eje X y el eje Y.
1. Defina el contexto para cada punto del gráfico de dispersión, como `host`, `service`, `app` o `region`.
1. Opcional: 
    1. Habilite una etiqueta color-by.
    1. Establezca los controles de los ejes X e Y.
    1. Agregue una leyenda para visualizar los puntos de datos en una lista.
    1. Configure las unidades tal como se muestran en el gráfico.
    1. Agregue [enlaces de contexto][1] adicionales, los cuales están habilitados de forma predeterminada. Los enlaces de contexto conectan los widgets del dashboard con otras páginas en Datadog o aplicaciones de terceros.
1. Elija si su widget tiene un marco de tiempo personalizado o el marco de tiempo global del dashboard.
1. Asigne un título a su gráfico o deje el cuadro en blanco para obtener el título sugerido.

## Datos agregados y no agregados {#aggregated-and-unaggregated-data}

El gráfico de dispersión admite dos modos de datos, entre los cuales puede cambiar usando el selector **Mode** en el editor de gráficos:

- **Aggregated**: agrupe los datos por un campo y aplique una agregación, como `avg` o `sum`. Cada punto representa un grupo agregado.
- **Unaggregated**: Grafique eventos sin procesar, donde cada punto representa un solo evento, como un registro, un tramo o un evento de RUM. Utilice este modo para detectar valores atípicos y grupos poco comunes que la agregación ocultaría, correlacionar dos campos del mismo evento (por ejemplo, si el tamaño de la carga útil predice la latencia) o graficar trazas individuales de LLM.

### Fuentes de datos compatibles para el modo no agregado{#supported-data-sources-for-unaggregated-mode}

Puede graficar datos no agregados de las siguientes fuentes:

- Logs
- RUM
- Agent Observability
- Product Analytics
- Tramos
- Audit Trail
- Eventos
- Señales de seguridad
- CI Pipelines
- Network
- Network Device Flows
- Ejecución de pruebas Synthetic

### Graficar datos no agregados {#plot-unaggregated-data}

{{< img src="dashboards/widgets/scatterplot/scatterplot-mode-configuration.png" alt="Pantalla de configuración de un widget de gráfico de dispersión que muestra la sección Graph your data. En la subsección Configure Points, el Mode está establecido en Unaggregated." >}}

En [Dashboards][4]:

1. Abra o cree un widget de gráfico de dispersión en un dashboard.
1. En el editor de gráficos, seleccione una fuente de datos que admita eventos sin procesar.
1. Establezca **Mode** en **Unaggregated**.
1. Configure los ejes X e Y haciendo clic en **Add Measure**.

Los eventos individuales aparecen como puntos en el gráfico.

## Navigation {#navigation}

Pase el cursor sobre el gráfico de dispersión para mostrar sus controles en la esquina superior derecha:

- **Show density**: Superponga contornos de densidad que muestran dónde están más concentrados los puntos de datos, lo que le ayuda a identificar grupos y patrones. Después de activarlo, el control cambia a **Hide density**.
- **Zoom in** (**+**) y **Zoom out** (**-**): Cambie el nivel de zoom para enfocarse en una región de los datos.
- **Reset View**: Regrese el gráfico a su zoom y posición predeterminados.

Haga clic y arrastre directamente sobre el gráfico de dispersión para desplazarse por sus datos.

El gráfico de dispersión etiqueta automáticamente los puntos notables, como valores atípicos y valores máximos.

## API {#api}

Este widget se puede utilizar con la **[Dashboards API][2]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][3]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/context-links/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/
[4]: https://app.datadoghq.com/dashboard/