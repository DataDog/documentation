---
aliases:
- /es/graphing/using_graphs/
description: Consulta tus datos para obtener más información
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centro de aprendizaje
  text: Crear dashboards mejores
title: Consulta
---

## Información general

Ya sea que utilices métricas, logs, trazas (traces), monitores, dashboards, notebooks, etc., todas las gráficas en Datadog tienen la misma funcionalidad básica. En esta página se describen las consultas con el editor de gráficas. Los usuarios avanzados pueden crear y editar gráficas con JSON. Para obtener más información, consulta la sección de [Crear gráficas con JSON][1].

Puedes realizar consultas con el editor de gráficas de las páginas de dashboards o notebooks, o puedes utilizar **Quick Graphs** que se encuentra disponible en todas las páginas. Abre Quick Graphs al pulsar `G` en cualquier página. Para obtener más información, consulta la [guía de Quick Graphs][2].

## Editor de gráficas

En widgets, abre el editor de gráficas al hacer clic en el icono de lápiz de la esquina superior derecha. El editor de gráficas cuenta con las siguientes pestañas:

* **Share** (Compartir): integra la gráfica en cualquier página web externa.
* **JSON**: un editor más flexible, que requiere conocimientos del lenguaje de definición de gráficas.
* **Edit** (Editar): la pestaña de interfaz de usuario predeterminada de las opciones para crear gráficas.

Cuando abras por primera vez el editor de gráficas, te encontrarás en la pestaña de **Edit** (Editar). Aquí, puedes utilizar la interfaz de usuario para elegir la mayoría de los ajustes. Este es un ejemplo:

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Pestaña de edición de gráficas" style="width:100%;" >}}

## Configuración de una gráfica

Para configurar tu gráfica en los dashboards, sigue este proceso:

1. [Seleccionar la visualización](#select-your-visualization)
2. [Definir la métrica](#define-the-metric)
3. [Filtrar tu métrica](#filter)
4. [Configurar la agregación temporal](#configure-the-time-aggregation)
5. [Configurar la agregación espacial](#configure-the-space-aggregation)
6. [Aplicar la función](#advanced-graphing)
7. [Asignar un título a la gráfica](#create-a-title)

### Seleccionar la visualización

Selecciona tu visualización entre los [widgets][3] disponibles.

### Definir la métrica

Elige la métrica a graficar al buscarla o seleccionarla en el menú desplegable junto a **Metric** (Métrica). Si no sabes qué métrica utilizar, el menú desplegable de métricas proporciona información adicional, como por ejemplo `unit`, `type`, `interval`, `description`, `tags` y el número de `tag values`. 

También puedes ver indicadores de origen Datadog u OpenTelemetry. Si tu entorno utiliza ambos, puedes utilizar el selector **Modo semántico** de Datadog para [consultar todas las métricas de Datadog y OpenTelemetry][18] en un único gráfico.

{{< img src="dashboards/querying/metric_dropdown.png" alt="Menú desplegable del selector de métricas" responsive="true" style="width:100%;">}}

Explora más a fondo tus métricas con el [Explorador de métricas][4], un [notebook][5], o consulta una lista de métricas en la página de [Resumen de métricas][6].

### Filtro

La métrica que elijas se puede filtrar por host o etiqueta (tag) mediante el menú desplegable **from** (desde) situado a la derecha de la métrica. El filtro predeterminado es *(everywhere)* (en todas partes).

{{< img src="dashboards/querying/filter-3.png" alt="Filtra la gráfica con el campo «desde», mediante variables de plantilla y lógica booleana" style="width:100%;" >}}

- Utiliza el [filtrado avanzado][7] en el menú desplegable `from` para evaluar las consultas filtradas con booleanos o comodines.
- Filtra las consultas dinámicamente, utilizando Variables de plantilla. Añade `$` con la clave de etiqueta. El gráfico aplica automáticamente la etiqueta que elijas en el desplegable de variables de plantilla. Para obtener más información, consulta la [documentación sobre variables de plantilla][8].

Para obtener más información sobre etiquetas, consulta la [documentación sobre etiquetado][9].

### Agregado y rollup

#### Método de agregación

El método de agregación se encuentra junto al menú desplegable del filtro. Por defecto es `avg by`, pero puedes cambiar el método a `max by`, `min by` o `sum by`. En la mayoría de los casos, la métrica tiene muchos valores para cada intervalo de tiempo, procedentes de muchos hosts o instancias. El método de agregación elegido determina cómo se agregan las métricas en una sola línea.

#### Configurar la agregación temporal

Independientemente de las opciones elegidas anteriormente, siempre habrá agregación de datos debido a las limitaciones físicas de tamaño del período que contiene la gráfica. Si una métrica se actualiza cada segundo y se dispone de 4 horas de datos, se necesitan 14 400 puntos para mostrar todo. En cada gráfica se muestran unos 300 puntos en un momento dado. Por lo tanto, cada punto mostrado en la pantalla representa 48 puntos de datos.

En la práctica, el Agent recopila métricas cada 15-20 segundos. Por tanto, un día de datos equivale a 4.320 puntos de datos. Si muestras los datos de un día en un solo gráfico, Datadog agrupa automáticamente los datos. Para obtener más detalles sobre la agregación temporal, consulta [Introducción a las métricas][10]. Para obtener más información sobre los intervalos de rollup y sobre cómo Datadog amplía automáticamente los puntos de datos, consulta la documentación [Rollup][11].

Para agrupar manualmente los datos, utiliza la [función rollup][12]. Haz clic en el icono sigma para añadir una función y selecciona `rollup` en el menú desplegable. A continuación, elige cómo quieres agregar los datos y el intervalo en segundos.

Esta consulta crea una sola línea que representa el espacio total disponible en disco, en promedio, en todas las máquinas acumuladas en ciclos de un minuto:

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="Ejemplo de rollup de la métrica system.disk.free en todas las máquinas" style="width:100%;">}}

Al cambiar a la vista de JSON, la consulta se ve de la siguiente manera:

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

Para obtener más información sobre el uso de la vista de JSON, consulta la sección de [Crear gráficas con JSON][1].

#### Configurar la agregación espacial

Junto al menú desplegable de método de agregación, elige lo que constituye una línea o agrupación en una gráfica. Por ejemplo, si eliges `host`, hay una línea por cada `host`. Cada línea se compone de la métrica seleccionada en un `host` concreto agregado mediante el método elegido.

Además, puedes hacer clic en las etiquetas en el menú desplegable de métrica utilizado para [definir la métrica](#define-the-metric) a fin de agrupar y agregar tus datos. 

### Consultas anidadas

La función de consultas anidadas de Datadog te permite añadir capas adicionales de agregación temporal o espacial a los resultados de las consultas existentes. Esta función de consulta avanzada también te permite calcular percentiles y desviaciones estándar en los resultados de consultas agregadas de métricas de tipo count/rate/gauge y acceder a consultas de mayor resolución en periodos históricos.

Para obtener más información, consulta la documentación [Consultas anidadas][13].


### Gráficas avanzadas

En función de tus necesidades de análisis, puedes optar por aplicar otras funciones matemáticas a la consulta. Algunos ejemplos son frecuencias y derivados, suavizado y otros. Consulta la [lista de funciones disponibles][14].

Datadog también admite la capacidad de graficar tus métricas, logs, trazas y otras fuentes de datos con varias operaciones aritméticas. Utiliza: `+`, `-`, `/`, `*`, `min` y `max` para modificar los valores que se muestran en tus gráficas. Esta sintaxis permite tanto valores enteros como aritméticos mediante varias métricas.

Para graficar métricas por separado, utiliza la coma (`,`). Por ejemplo, `a, b, c`.

**Nota**: Las consultas que utilizan comas sólo se admiten en visualizaciones, pero no funcionan en monitores. Utiliza [operadores booleanos][15] u operaciones aritméticas para combinar varias métricas en un monitor.

#### Operación aritmética de una métrica con un número entero

Modifica el valor que se muestra de una métrica en una gráfica mediante una operación aritmética. Por ejemplo, para visualizar el doble de una métrica concreta, haz clic en el enlace **Advanced...** (Avanzado...) del editor de gráficas. Luego, ingresa tu operación aritmética en la casilla `Formula`, en este caso: `a * 2`:

{{< img src="dashboards/querying/arithmetic_4.png" alt="Ejemplo de fórmula: multiplicar" style="width:75%;" >}}

#### Operación aritmética entre dos métricas

Visualiza el porcentaje de un métrica al dividir una métrica por otra, por ejemplo:

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utiliza la opción **Advanced...** (Avanzado...) del editor de gráficas y selecciona **Add Query** (Añadir consulta). A cada consulta se le asigna una letra en orden alfabético: la primera métrica está representada por la `a`, la segunda por la `b`, y así sucesivamente.

Luego, en la casilla `Formula`, ingresa la operación aritmética (`a / b` para este ejemplo). Para visualizar solo la fórmula en tu gráfica, haz clic en las marcas de verificación junto a las métricas `a` y `b`.

{{< img src="dashboards/querying/arithmetic_5.png" alt="Ejemplo de fórmula: relación" style="width:75%;" >}}

Este es otro ejemplo en el que se muestra cómo se puede graficar la relación entre los logs de `error` e `info`.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Ejemplo de fórmula: relación de logs" style="width:75%;" >}}

**Nota**: Las fórmulas no tienen letras. No se puede hacer operaciones aritméticas entre fórmulas.

#### Mínimo o máximo entre dos consultas
Este es un ejemplo en el que se utiliza el operador `max` para hallar el uso máximo de CPU entre dos zonas de disponibilidad.  

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2}) 
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="Ejemplo de fórmula para «max» que muestra el valor de recuento máximo entre dos consultas de métrica" style="width:75%;" >}}

Además, también puedes calcular el máximo (o mínimo) entre dos consultas sobre productos diferentes. Este es otro ejemplo en el que se utiliza el operador `min` para hallar el mínimo entre logs con estados de error y advertencia.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Ejemplo de fórmula para «min» que muestra el valor de recuento mínimo entre dos consultas de log" style="width:75%;" >}}

#### Exponenciación

Ahora puedes utilizar la función `pow()` para elevar una constante o una métrica a la potencia de otra constante o métrica. Esto te permite modelar el crecimiento o la desintegración exponencial.

El siguiente es un ejemplo de cómo prever el crecimiento de usuarios aplicando un factor de crecimiento exponencial a un periodo de tiempo anterior:

```text
users.sessions{*} * pow(1.1, timeshift(-1))
```

El siguiente es un ejemplo de cómo evidenciar las anomalías amplificando el valor mediante la exponenciación: 

```text
pow(ping{region:*}, 2)
```

Para utilizar `pow(a, b)`, `a` y `b` pueden ser constantes o métricas. Esta función sólo está disponible para métricas.

### Crear un alias

Puedes crear un alias personalizado para tus fuentes de datos a fin de facilitar a tus usuarios la interpretación de los resultados de la gráfica.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personalizado" style="width:75%;" >}}

### Crear un título

Si no ingresas un título, se generará uno de manera automática en función de tus selecciones. Sin embargo, se recomienda que crees un título que describa el propósito de la gráfica.

### Guardar

Haz clic en **Done** (Listo) para guardar tu trabajo y salir del editor. Siempre puedes volver al editor para cambiar la gráfica. Si haces cambios que no quieres guardar, haz clic en **Cancel** (Cancelar).

## Opciones adicionales

### Superposiciones de eventos

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de serie temporal que muestra tasas de error de RUM con eventos de despliegue superpuestos" style="width:100%;" >}}

Visualiza las correlaciones entre eventos utilizando la sección **Superposición de eventos** del editor de gráficos para la visualización de [series temporales][16]. En el campo de búsqueda, introduce cualquier texto o consulta de búsqueda estructurada. La búsqueda de eventos utiliza la [sintaxis para la búsqueda de logs][17].

La superposición de eventos admite todas las fuentes de datos. Esto permite una correlación más sencilla entre los eventos empresariales y los datos de cualquier servicio de Datadog. 

Con la superposición de eventos, puedes ver con rapidez cómo las acciones dentro de la organización afectan el rendimiento de la infraestructura y las aplicaciones. Estos son algunos casos de uso de ejemplo:
- Tasas de error de RUM con eventos de despliegue superpuestos
- Correlación del uso de la CPU con eventos relacionados con el suministro de servidores adicionales
- Correlación del tráfico de salida con actividades sospechosas de inicio de sesión
- Correlación de los datos de las series temporales con las alertas de monitor para garantizar que Datadog se ha configurado con las alertas adecuadas


### Gráfica dividida

Con las gráficas divididas, puedes consultar las visualizaciones de métricas divididas por etiquetas. 

{{< img src="dashboards/querying/split_graph_beta.png" alt="Ver gráficas divididas de la métrica container.cpu.usage en el widget de pantalla completa" style="width:100%;" >}}

1. Accede a esta característica a través de la pestaña de **Split Graph** (Gráfica dividida) cuando visualices gráficas.
1. Puedes cambiar la métrica *sort by* (ordenar por) para ver la relación entre los datos que estás graficando y otras métricas. 
1. Limita la cantidad de gráficas que se muestran al cambiar el valor *limit to* (limitar a).

## Referencias adicionales

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