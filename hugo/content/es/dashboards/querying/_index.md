---
aliases:
- /es/graphing/using_graphs/
description: Consulte sus datos para obtener información
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de aprendizaje
  text: Creación de mejores dashboards
title: Consulta
---
## Descripción general {#overview}

Ya sea que utilice métricas, registros, trazas, seguimientos, tableros, notebooks, etc., todos los gráficos en Datadog tienen la misma funcionalidad básica. Esta página describe cómo realizar consultas con el editor gráfico. Los usuarios avanzados pueden crear y editar gráficos con JSON. Para obtener más información, consulte [Graphing con JSON][1].

Puede realizar consultas con el editor de gráficos en las páginas Dashboards o Notebooks, o puede usar {{< ui >}}Quick Graphs{{< /ui >}} disponible en cualquier página. Abra Quick Graphs presionando `G` en cualquier página. Para obtener más información, consulte la [Guía de Quick Graphs][2].

## Editor de Graphing {#graphing-editor}

En los widgets, abra el editor de Graphing haciendo clic en el icono del lápiz en la esquina superior derecha. El editor de Graphing tiene las siguientes pestañas:

* {{< ui >}}Share{{< /ui >}}: Incruste el gráfico en cualquier página web externa.
* {{< ui >}}JSON{{< /ui >}}: Un editor más flexible, que requiere conocimiento del lenguaje de definición de gráficos.
* {{< ui >}}Edit{{< /ui >}}: La pestaña de interfaz de usuario predeterminada para las opciones de Graphing.

Cuando abre el editor de Graphing por primera vez, se encuentra en la pestaña {{< ui >}}Edit{{< /ui >}}. Aquí, puede usar la interfaz de usuario para elegir la mayoría de los ajustes. Aquí hay un ejemplo:

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Pestaña de edición de Graphing" style="width:100%;" >}}

## Configurar un gráfico {#configuring-a-graph}

Para configurar su gráfico en los tableros, siga este proceso:

1. [Seleccione la visualización](#select-your-visualization)
2. [Defina la métrica](#define-the-metric)
3. [Filtre su métrica](#filter)
4. [Configure el desglose temporal](#configure-the-time-aggregation)
5. [Configure el desglose espacial](#configure-the-space-aggregation)
6. [Aplique la función](#advanced-graphing)
7. [Ponga título al gráfico](#create-a-title)

### Seleccione su visualización {#select-your-visualization}

Seleccione su visualización de los [widgets][3] disponibles.

### Defina la métrica {#define-the-metric}

Elija la métrica para graficar buscando o seleccionándola en el menú desplegable junto a {{< ui >}}Metric{{< /ui >}}. Si no sabe qué métrica usar, el menú desplegable de métricas proporciona información adicional, incluyendo el `unit`, `type`, `interval`, `description`, `tags` y el número de `tag values`.

También puede ver indicadores de fuente de Datadog u OpenTelemetry. Si su entorno utiliza ambos, puede usar el modificador de consulta de [fuente de telemetría][19] de Datadog para [consultar métricas de Datadog y OpenTelemetry][18] en un solo gráfico.

{{< img src="dashboards/querying/metric_dropdown.png" alt="Menú desplegable del selector de métricas" responsive="true" style="width:100%;">}}

Explore sus métricas más a fondo con el [Metrics Explorer][4], un [Notebook][5], o vea una lista de métricas en la página [Metrics Summary][6].

### Filtro {#filter}

La métrica que elija puede filtrarse por servidor o etiqueta usando el menú desplegable {{< ui >}}from{{< /ui >}} a la derecha de la métrica. El filtro predeterminado es *(en todas partes)*.

{{< img src="dashboards/querying/filter-3.png" alt="Filtre el gráfico con el campo \"from\", usando variables de plantilla y lógica booleana" style="width:100%;" >}}

- Use el [filtrado avanzado][7] dentro del menú desplegable `from` para evaluar consultas filtradas por booleanos o comodines.
- Filtre consultas dinámicamente, usando variables de plantilla. Agregue el `$` con la clave de etiqueta y el gráfico aplicará automáticamente la etiqueta que elija en el menú desplegable de la variable de plantilla. Para obtener más información, consulte la documentación de [Variables de plantilla][8].

Para obtener más información sobre las etiquetas, consulte la documentación de [Etiquetado][9].

### Agregar y consolidar {#aggregate-and-rollup}

#### Método de agregación {#aggregation-method}

El método de agregación se encuentra junto al menú desplegable de filtros. Esto se establece de forma predeterminada en `avg by`, pero usted puede cambiar el método a `max by`, `min by` o `sum by`. En la mayoría de los casos, la métrica tiene muchos valores para cada intervalo de tiempo, provenientes de muchos servidores o instancias. El método de agregación elegido determina cómo se agregan las métricas en una sola línea.

#### Configurar el desglose temporal {#configure-the-time-aggregation}

Independientemente de las opciones elegidas anteriormente, siempre existe alguna agregación de datos debido a las limitaciones de tamaño físico de la ventana que contiene el gráfico. Si una métrica se actualiza cada segundo y usted está viendo 4 horas de datos, necesita 14,400 puntos para mostrar todo. Cada gráfico mostrado tiene alrededor de 300 puntos visibles en cualquier momento dado. Por lo tanto, cada punto mostrado en la pantalla representa 48 puntos de datos.

En la práctica, las métricas son recopiladas por el Agent cada 15-20 segundos. Así que la cantidad de datos de un día es de 4,320 puntos de datos. Si usted muestra la cantidad de datos de un día en un solo gráfico, Datadog consolida automáticamente los datos. Para obtener más detalles sobre el desglose temporal, consulte la [Introducción a las métricas][10]. Consulte la documentación de [Consolidación][11] para obtener más información sobre los intervalos de consolidación y cómo Datadog consolida automáticamente los puntos de datos.

Para consolidar los datos manualmente, utilice la [función de consolidación][12]. Haga clic en el icono de sigma para añadir una función y seleccione `rollup` en el menú desplegable. Luego elija cómo desea agregar los datos y el intervalo en segundos.

Esta consulta crea una sola línea que representa el espacio en disco disponible total, en promedio, en todas las máquinas, con los datos consolidados en intervalos de un minuto:

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="ejemplo de consolidación de la métrica system.disk.free en todas las máquinas" style="width:100%;">}}

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

Para obtener más información sobre el uso de la vista JSON, consulte [Graphing con JSON][1].

#### Configure el desglose espacial {#configure-the-space-aggregation}

Junto al menú desplegable del método de agregación, elija qué constituye una línea o agrupación en un gráfico. Por ejemplo, si elige `host`, hay una línea para cada `host`. Cada línea se compone de la métrica seleccionada en un `host` particular, agregada mediante el método elegido.

Además, puede hacer clic en las etiquetas del menú desplegable de métricas que se utilizan para [definir la métrica](#define-the-metric) para agrupar y agregar sus datos.

### Consultas anidadas {#nested-queries}

La función de consultas anidadas de Datadog le permite añadir capas adicionales de desglose temporal y/o desglose espacial a los resultados de las consultas de métricas existentes. Esta capacidad de consulta avanzada también le permite calcular percentiles y desviaciones estándar en los resultados de consultas agregadas de métricas de tipo recuento/tasa/gauge y acceder a consultas de mayor resolución durante períodos históricos.

Para obtener más información, consulte la documentación de [Consultas anidadas][13].


### Graphing avanzado {#advanced-graphing}

Dependiendo de sus necesidades de análisis, puede elegir aplicar otras funciones matemáticas a la consulta. Los ejemplos incluyen tasas y derivadas, suavizado y otras funciones. Consulte la [lista de funciones disponibles][14].

Datadog también admite la capacidad de graficar sus métricas, registros, trazas y otras fuentes de datos con diversas operaciones aritméticas y funciones de comparación. Utilice `+`, `-`, `/`, `*`, `minimum()` y `maximum()` para modificar los valores que se muestran en sus gráficos. Esta sintaxis permite tanto valores enteros como operaciones aritméticas utilizando múltiples métricas.

Para graficar métricas por separado, utilice la coma (`,`). Por ejemplo, `a, b, c`.

**Nota**: Las consultas que utilizan comas solo son compatibles con las visualizaciones; no funcionan en los seguimientos. Utilice [operadores booleanos][15] u operaciones aritméticas para combinar múltiples métricas en un seguimiento.

{{% collapse-content title="Operaciones aritméticas de métricas utilizando un número entero" level="h4" %}}

Modifique el valor mostrado de una métrica en un gráfico realizando una operación aritmética. Por ejemplo, para visualizar el doble de una métrica específica, haga clic en el enlace {{< ui >}}Advanced...{{< /ui >}} en el editor de gráficos. Luego, ingrese su operación aritmética en el cuadro `Formula`; en este caso: `a * 2`:

{{< img src="dashboards/querying/arithmetic_4.png" alt="Ejemplo de fórmula: multiplicar" style="width:75%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Operaciones aritméticas entre dos métricas" level="h4" %}}

Visualice el porcentaje de una métrica dividiendo una métrica entre otra, por ejemplo:

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utilice la opción {{< ui >}}Advanced...{{< /ui >}} en el editor de gráficos y seleccione {{< ui >}}Add Query{{< /ui >}}. A cada consulta se le asigna una letra en orden alfabético: la primera métrica está representada por `a`, la segunda métrica está representada por `b`, etc.

Luego, en el cuadro `Formula`, ingrese la operación aritmética (`a / b` para este ejemplo). Para mostrar solo el resultado de la fórmula, consulte [Ocultar una consulta de la visualización](#hide-a-query-from-the-visualization).

{{< img src="dashboards/querying/arithmetic_5.png" alt="Ejemplo de fórmula: proporción" style="width:75%;" >}}

Aquí hay otro ejemplo que muestra cómo puede graficar la proporción entre los registros `error` y los registros `info`.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Ejemplo de fórmula: proporción de registros" style="width:75%;" >}}

**Nota**: Las fórmulas no tienen letras asignadas. No se pueden realizar operaciones aritméticas entre fórmulas.
{{% /collapse-content %}}

#### Ocultar una consulta de la visualización {#hide-a-query-from-the-visualization}

Cuando un widget tiene varias consultas y una fórmula, puede ocultar consultas individuales para que solo el resultado de la fórmula aparezca en el gráfico. Haga clic en la etiqueta de letra de la consulta para alternar su visibilidad en el gráfico. Una etiqueta azul indica que la consulta se muestra; una etiqueta gris indica que está oculta. La consulta oculta todavía se utiliza en el cálculo de la fórmula.

{{% collapse-content title="Mínimo o máximo entre dos consultas" level="h5" %}}

Use `minimum()` y `maximum()` para comparar dos consultas punto por punto y devolver el valor más bajo o más alto en cada marca de tiempo.

**Nota**: El uso de `min()` y `max()` para comparaciones aritméticas está obsoleto. Use `minimum()` y `maximum()` en su lugar. Esta obsolescencia se aplica únicamente a la sintaxis de comparación aritmética. Los métodos de agregación como `min by`, `max by` y la agregación de consultas anidadas con `min` y `max` no han cambiado.

Aquí hay un ejemplo que usa `maximum()` para encontrar el uso máximo de CPU entre dos zonas de disponibilidad.

```text
maximum(system.cpu.user{availability-zone:us-east-1a}, system.cpu.user{availability-zone:us-east-2a})
```

{{< img src="dashboards/querying/minmax_metrics_example-2.png" alt="Ejemplo de fórmula para \"máximo\" que muestra el valor más alto entre dos consultas de métricas" style="width:75%;" >}}

Además, también puede calcular el mínimo entre dos consultas en diferentes productos. Aquí hay otro ejemplo que usa `minimum()` para encontrar el mínimo entre registros con estados de error y estados de advertencia.

```text
minimum(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Ejemplo de fórmula para \"mínimo\" que muestra el valor más bajo entre dos consultas de registros" style="width:75%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="función time()" level="h5" %}}

La función `time()` devuelve la hora Unix actual en segundos como series temporales. Úsela en fórmulas para comparar la marca de tiempo de una métrica con el momento actual, lo cual ayuda a hacer un seguimiento de la vigencia de los datos o calcular el tiempo que falta para un vencimiento.

Por ejemplo, para calcular el tiempo transcurrido en segundos desde la última copia de seguridad reportada, puede usar `time()` para encontrar la diferencia entre el presente y la marca de tiempo de la métrica de copia de seguridad.

```text
time() - max:backup.last_completed_timestamp{*}
```

{{% /collapse-content %}}

### Crear un alias {#create-an-alias}

Puede crear un alias personalizado para sus fuentes de datos para facilitar que sus usuarios interpreten los resultados del gráfico.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personalizado" style="width:75%;" >}}

### Crear un título {#create-a-title}

Si no ingresa un título, se generará uno automáticamente según sus selecciones. Sin embargo, se recomienda que cree un título que describa el propósito del gráfico.

### Guardar {#save}

Haga clic en {{< ui >}}Done{{< /ui >}} para guardar su trabajo y salir del editor. Siempre puede volver al editor para cambiar el gráfico. Si realiza cambios que no desea guardar, haga clic en {{< ui >}}Cancel{{< /ui >}}.

## Opciones adicionales {#additional-options}

### Superposiciones de eventos {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de series temporales que muestran tasas de error de RUM con eventos de implementación superpuestos" style="width:100%;" >}}

Visualice las correlaciones de eventos mediante la sección {{< ui >}}Event Overlays{{< /ui >}} del editor de gráficos para la visualización [Series temporales][16]. En el campo de búsqueda, ingrese cualquier texto o consulta de búsqueda estructurada. La búsqueda de eventos utiliza la [sintaxis de búsqueda de registros][17].

La superposición de eventos admite todas las fuentes de datos. Esto permite una correlación más sencilla entre eventos de negocio y datos de cualquier servicio de Datadog.

Con la superposición de eventos, puede ver rápidamente cómo las acciones dentro de la organización afectan el rendimiento de la aplicación y la infraestructura. Estos son algunos casos de uso de ejemplo:
- Tasas de error de RUM con eventos de implementación superpuestos
- Correlación del uso de CPU con eventos relacionados con el aprovisionamiento de servidores adicionales
- Correlación del tráfico de salida con actividad de inicio de sesión sospechosa
- Correlación de cualquier dato de series temporales con alertas de seguimiento para garantizar que Datadog se haya configurado con las alertas adecuadas


### Gráfico dividido {#split-graph}

Con los gráficos divididos, puede ver sus visualizaciones de métricas desglosadas por etiquetas.

{{< img src="dashboards/querying/split_graph_beta.png" alt="Visualizar gráficos divididos de la métrica container.cpu.usage en el widget de pantalla completa" style="width:100%;" >}}

1. Acceda a esta función a través de la pestaña {{< ui >}}Split Graph{{< /ui >}} al visualizar gráficos.
1. Puede cambiar la métrica {{< ui >}}sort by{{< /ui >}} para ver la relación entre los datos que está graficando y otras métricas.
1. Limite la cantidad de gráficos que se muestran cambiando el valor {{< ui >}}limit to{{< /ui >}}.

## Lecturas adicionales {#further-reading}

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
[19]: /es/dashboards/functions/telemetry_source/