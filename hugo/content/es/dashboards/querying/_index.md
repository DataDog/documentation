---
aliases:
- /es/graphing/using_graphs/
description: Consulta tus datos para obtener información
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de Aprendizaje
  text: Construyendo Mejores Dashboards
title: Consultando
---
## Descripción General {#overview}

Ya sea que estés utilizando métricas, registros, trazas, seguimientos, Dashboards, Notebooks, etc., todos los gráficos en Datadog tienen la misma funcionalidad básica. Esta página describe cómo consultar con el editor gráfico. Los usuarios avanzados pueden crear y editar gráficos con JSON. Para aprender más, consulta [Graficando con JSON][1].

Puedes consultar utilizando el editor gráfico en las páginas de Dashboards o Notebooks, o puedes usar {{< ui >}}Quick Graphs{{< /ui >}} disponible en cualquier página. Abre Quick Graphs presionando `G` en cualquier página. Para aprender más, consulta la [Quick Graphs Guide][2].

## Editor de gráficos {#graphing-editor}

En los widgets, abre el editor de gráficos haciendo clic en el ícono de lápiz en la esquina superior derecha. El editor de gráficos tiene las siguientes pestañas:

* {{< ui >}}Share{{< /ui >}}: Incrusta el gráfico en cualquier página web externa.
* {{< ui >}}JSON{{< /ui >}}: Un editor más flexible, que requiere conocimiento del lenguaje de definición de gráficos.
* {{< ui >}}Edit{{< /ui >}}: La pestaña de interfaz de usuario predeterminada para opciones de graficado.

Cuando abres por primera vez el editor de gráficos, estás en la pestaña {{< ui >}}Edit{{< /ui >}}. Aquí, puedes usar la interfaz de usuario para elegir la mayoría de las configuraciones. Aquí hay un ejemplo:

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Pestaña de edición de gráficos" style="width:100%;" >}}

## Configurando un gráfico {#configuring-a-graph}

Para configurar su gráfico en los Dashboards, siga este proceso:

1. [Seleccione la visualización](#select-your-visualization)
2. [Defina la métrica](#define-the-metric)
3. [Filtre su métrica](#filter)
4. [Configure la agregación de tiempo](#configure-the-time-aggregation)
5. [Configure el desglose espacial](#configure-the-space-aggregation)
6. [Aplique la función](#advanced-graphing)
7. [Titule el gráfico](#create-a-title)

### Seleccione su visualización {#select-your-visualization}

Seleccione su visualización de los [widgets][3] disponibles.

### Defina la métrica {#define-the-metric}

Elija la métrica para graficar buscando o seleccionándola del menú desplegable junto a {{< ui >}}Metric{{< /ui >}}. Si no sabe qué métrica usar, el menú desplegable de métricas proporciona información adicional, incluyendo el `unit`, `type`, `interval`, `description`, `tags` y el número de `tag values`.

También puede ver indicadores de origen de Datadog u OpenTelemetry. Si su entorno utiliza ambos, puede usar el selector de {{< ui >}}Semantic Mode{{< /ui >}} de Datadog para [Consultar métricas de Datadog y OpenTelemetry][18] en un solo gráfico.

{{< img src="dashboards/querying/metric_dropdown.png" alt="Menú desplegable de selección de métricas" responsive="true" style="width:100%;">}}

Explore sus métricas más a fondo con el [Metrics Explorer][4], un [Notebook][5] o vea una lista de métricas en la página de [Metrics Summary][6].

### Filtrar {#filter}

La métrica elegida puede ser filtrada por servidor o etiqueta usando el menú desplegable {{< ui >}}from{{< /ui >}} a la derecha de la métrica. El filtro predeterminado es *(en todas partes)*.

{{< img src="dashboards/querying/filter-3.png" alt="Filtra el gráfico con el campo 'desde', utilizando variables de plantilla y lógica booleana." style="width:100%;" >}}

- Usa [filtrado avanzado][7] dentro del menú desplegable `from` para evaluar consultas filtradas booleanas o filtradas por comodín.
- Filtra consultas dinámicamente, utilizando variables de plantilla. Agrega el `$` con la clave de etiqueta y el gráfico aplica automáticamente la etiqueta que elijas en el menú desplegable de variables de plantilla. Para más información, consulta la [documentación de Variables de Plantilla][8].

Para aprender más sobre etiquetas, consulta la [documentación de Etiquetado][9].

### Agregue y agrupe{#aggregate-and-rollup}

#### Método de agregación {#aggregation-method}

El método de agregación está al lado del menú desplegable de filtros. Esto predetermina a `avg by` pero puedes cambiar el método a `max by`, `min by` o `sum by`. En la mayoría de los casos, la métrica tiene muchos valores para cada intervalo de tiempo, provenientes de muchos servidores o instancias. El método de agregación elegido determina cómo se agregan las métricas en una sola línea.

#### Configura la agregación de tiempo {#configure-the-time-aggregation}

Independientemente de las opciones elegidas arriba, siempre hay alguna agregación de datos debido a las limitaciones de tamaño físico de la ventana que sostiene el gráfico. Si una métrica se actualiza cada segundo, y estás viendo 4 horas de datos, necesitas 14,400 puntos para mostrar todo. Cada gráfico mostrado tiene alrededor de 300 puntos mostrados en cualquier momento. Por lo tanto, cada punto mostrado en la pantalla representa 48 puntos de datos.

En la práctica, las métricas son recopiladas por el Agente cada 15-20 segundos. Por lo tanto, un día de datos equivale a 4,320 puntos de datos. Si se muestra un día de datos en un solo gráfico, Datadog agrupa automáticamente los datos. Para más detalles sobre la agregación de tiempo, consulte la [Introducción a las Métricas][10]. Consulte la documentación de [Rollup][11] para aprender más sobre los intervalos de agrupamiento y cómo Datadog agrupa automáticamente los puntos de datos.

Para agrupar manualmente los datos, use la [función de agrupamiento][12]. Haga clic en el ícono de sigma para agregar una función y seleccione `rollup` del menú desplegable. Luego elija cómo desea agregar los datos y el intervalo en segundos.

Esta consulta crea una sola línea que representa el espacio total disponible en disco, en promedio, a través de todas las máquinas agrupadas en intervalos de un minuto:

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="ejemplo de agrupamiento de la métrica system.disk.free en todas las máquinas" style="width:100%;">}}

Al cambiar a la vista JSON, la consulta se ve así:

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

El JSON completo se ve así:

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

Para más información sobre el uso de la vista JSON, consulte [Graficando con JSON][1].

#### Configure el desglose espacial {#configure-the-space-aggregation}

Junto al menú desplegable del método de agregación, elija qué constituye una línea o agrupación en un gráfico. Por ejemplo, si elige `host`, hay una línea para cada `host`. Cada línea está compuesta por la métrica seleccionada en un `host` particular agregada utilizando el método elegido.

Además, puede hacer clic en las etiquetas en el menú desplegable de métricas utilizadas para [definir la métrica](#define-the-metric) para agrupar y agregar sus datos.

### Consultas anidadas {#nested-queries}

La función de consultas anidadas de Datadog le permite agregar capas adicionales de agregación de tiempo y/o espacio sobre los resultados de consultas de métricas existentes. Esta capacidad avanzada de consulta también le permite calcular percentiles y desviaciones estándar sobre los resultados de consultas agregadas de métricas de tipo conteo/tasa/gauge y acceder a consultas de mayor resolución a lo largo de marcos de tiempo históricos.

Para más información, consulta la documentación de [Consultas Anidadas][13].


### Gráficos avanzados {#advanced-graphing}

Dependiendo de tus necesidades de análisis, puedes optar por aplicar otras funciones matemáticas a la consulta. Los ejemplos incluyen tasas y derivadas, suavizado, y otros. Consulta la [lista de funciones disponibles][14].

Datadog también admite la capacidad de graficar tus métricas, registros, trazas y otras fuentes de datos con varias operaciones aritméticas. Usa: `+`, `-`, `/`, `*`, `min`, y `max` para modificar los valores mostrados en tus gráficos. Esta sintaxis permite tanto valores enteros como aritmética utilizando múltiples métricas.

Para graficar métricas por separado, usa la coma (`,`). Por ejemplo, `a, b, c`.

**Nota**: Las consultas que utilizan comas solo son compatibles en visualizaciones, no funcionan en seguimientos. Usa [operadores booleanos][15] u operaciones aritméticas para combinar múltiples métricas en un seguimiento.

#### Aritmética de métricas usando un entero {#metric-arithmetic-using-an-integer}

Modifica el valor mostrado de una métrica en un gráfico realizando una operación aritmética. Por ejemplo, para visualizar el doble de una métrica específica, haz clic en el enlace {{< ui >}}Advanced...{{< /ui >}} en el editor de gráficos. Luego ingresa tu operación aritmética en el cuadro `Formula`, en este caso: `a * 2`:

{{< img src="dashboards/querying/arithmetic_4.png" alt="Ejemplo de fórmula - multiplicar" style="width:75%;" >}}

#### Aritmética entre dos métricas {#arithmetic-between-two-metrics}

Visualiza el porcentaje de una métrica dividiendo una métrica sobre otra, por ejemplo:

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utiliza la opción {{< ui >}}Advanced...{{< /ui >}} en el editor de gráficos y selecciona {{< ui >}}Add Query{{< /ui >}}. Cada consulta se asigna una letra en orden alfabético: la primera métrica está representada por `a`, la segunda métrica está representada por `b`, etc.

Luego, en la caja `Formula`, ingresa la aritmética (`a / b` para este ejemplo). Para mostrar solo la fórmula en tu gráfico, haz clic en las marcas de verificación junto a las métricas `a` y `b`.

{{< img src="dashboards/querying/arithmetic_5.png" alt="Ejemplo de fórmula - razón" style="width:75%;" >}}

Aquí hay otro ejemplo que muestra cómo puedes graficar la razón entre `error` registros y `info` registros.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Ejemplo de fórmula - razón de registros" style="width:75%;" >}}

**Nota**: Las fórmulas no están designadas con letras. No se puede realizar aritmética entre fórmulas.

#### Mínimo o Máximo entre dos consultas {#minimum-or-maximum-between-two-queries}
Aquí hay un ejemplo utilizando el operador `max` para encontrar el uso máximo de CPU entre dos Availability Zones.

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2})
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="Ejemplo de fórmula para 'max' mostrando el valor máximo de conteo entre dos consultas métricas" style="width:75%;" >}}

Además, también puedes calcular el máximo (o mínimo) entre dos consultas en diferentes productos. Aquí hay otro ejemplo utilizando el operador `min` para encontrar el mínimo entre registros con estados de error y estados de advertencia.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Ejemplo de fórmula para 'min' mostrando el valor mínimo de conteo entre dos consultas de registros" style="width:75%;" >}}

### Crea un alias {#create-an-alias}

Puedes crear un alias personalizado para tus fuentes de datos para facilitar la interpretación de los resultados del gráfico por parte de tus usuarios.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personalizado" style="width:75%;" >}}

### Crea un título {#create-a-title}

Si no ingresas un título, se genera uno automáticamente basado en tus selecciones. Sin embargo, se recomienda que crees un título que describa el propósito del gráfico.

### Guardar {#save}

Haz clic en {{< ui >}}Done{{< /ui >}} para guardar tu trabajo y salir del editor. Siempre puedes regresar al editor para cambiar el gráfico. Si realizas cambios que no deseas guardar, haz clic en {{< ui >}}Cancel{{< /ui >}}.

## Opciones adicionales {#additional-options}

### Superposiciones de eventos {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de series temporales que muestran tasas de error RUM con eventos de implementación superpuestos" style="width:100%;" >}}

Visualiza las correlaciones de eventos utilizando la sección {{< ui >}}Event Overlays{{< /ui >}} en el editor de gráficos para la visualización de [Series Temporales][16]. En el campo de búsqueda, ingresa cualquier texto o consulta estructurada. La búsqueda de eventos utiliza la [sintaxis de búsqueda de registros][17].

La superposición de eventos admite todas las fuentes de datos. Esto permite una correlación más fácil entre eventos comerciales y datos de cualquier servicio de Datadog.

Con la superposición de eventos, puedes ver rápidamente cómo las acciones dentro de la organización impactan el rendimiento de la aplicación y la infraestructura. Aquí hay algunos casos de uso de ejemplo:
- Tasas de error RUM con eventos de implementación superpuestos
- Correlacionando el uso de CPU con eventos relacionados con la provisión de servidores adicionales
- Correlacionando el tráfico de salida con actividad de inicio de sesión sospechosa
- Correlacionando cualquier dato de series temporales con alertas de seguimiento para asegurar que Datadog se haya configurado con las alertas apropiadas.


### Gráfico dividido {#split-graph}

Con los gráficos divididos, puedes ver tus visualizaciones métricas desglosadas por etiquetas.

{{< img src="dashboards/querying/split_graph_beta.png" alt="Visualiza los gráficos divididos de la métrica container.cpu.usage en el widget de pantalla completa." style="width:100%;" >}}

1. Accede a esta función a través de la pestaña {{< ui >}}Split Graph{{< /ui >}} al ver gráficos.
1. Puedes cambiar la {{< ui >}}sort by{{< /ui >}} métrica para ver la relación entre los datos que estás graficando y otras métricas.
1. Limita el número de gráficos que se muestran cambiando el {{< ui >}}limit to{{< /ui >}} valor.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/graphing_json/
[2]: /es/dashboards/guide/quick-graphs/
[3]: /es/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /es/metrics/advanced-filtering/
[8]: /es/dashboards/template_variables/
[9]: /es/getting_started/tagging/
[10]: /es/metrics/#time-aggregation
[11]: /es/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[12]: /es/dashboards/functions/rollup/
[13]: /es/metrics/nested_queries/
[14]: /es/dashboards/functions/#function-types
[15]: /es/metrics/advanced-filtering/#boolean-filtered-queries
[16]: /es/dashboards/widgets/timeseries/#event-overlay
[17]: /es/logs/explorer/search_syntax/
[18]: /es/metrics/open_telemetry/query_metrics