---
aliases:
- /es/graphing/widgets/timeseries/
- /es/dashboards/widgets/network/
- /es/graphing/widgets/network/
description: Muestre la evolución de una o más métricas, eventos de registro, tramos
  indexados o métricas de proceso a lo largo del tiempo.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: Blog
  text: Explore sus datos en modo de gráfico de pantalla completa
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
- link: /dashboards/guide/slo_data_source
  tag: Guía
  text: Grafique datos históricos de SLO en Dashboards
- link: https://learn.datadoghq.com/courses/dashboard-graph-widgets
  tag: Centro de aprendizaje
  text: Descubrimiento de widgets de gráficos
title: Widget de series temporales
widget_type: timeseries
---
La visualización de series temporales le permite mostrar la evolución de una o más métricas, eventos de registro o tramos indexados a lo largo del tiempo. La ventana de tiempo depende de lo que esté seleccionado en el [timeboard][1] o [panel visual][2]:

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Un widget de series temporales que muestra el promedio de system.cpu.user para un servidor" style="width:90%;" >}}

## Configuración {#setup}

### Configuración {#configuration}

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuración de series temporales" style="width:90%;" >}}

1. Elija los datos para graficar:
   * Métrica: Consulte la [documentación de consultas][3] para configurar una consulta de métrica.
   * Tramos indexados: Consulte la [documentación de búsqueda de trazas][4] para configurar una consulta de tramos indexados.
   * Eventos de registro: Consulte la [documentación de búsqueda de registros][5] para configurar una consulta de eventos de registro.

2. Personalice su gráfico con las [opciones](#display-options) disponibles.

## Opciones de visualización {#display-options}

Los gráficos pueden mostrarse como líneas, áreas y barras. Los gráficos de Datadog agregan datos durante [intervalos][15], como la suma cada hora. De forma predeterminada, el último intervalo de tiempo incompleto en un gráfico de series temporales aparece sombreado y etiquetado como "partial data".

Los gráficos de líneas contienen parámetros adicionales:

| Parámetro | Opciones                  |
|-----------|--------------------------|
| Estilo     | Sólido, discontinuo o punteado |
| Trazo    | Normal, fino o grueso   |

### Etiquetas automáticas {#automatic-labels}

Los gráficos de líneas muestran etiquetas en puntos de datos notables, como picos y valles, para que pueda leer los valores clave sin tener que pasar el cursor sobre el gráfico. Las etiquetas automáticas están activadas de forma predeterminada. Para desactivarlas, cambie el estado de {{< ui >}}Show labels{{< /ui >}} en el editor de gráficos.

Si una consulta está agrupada por etiqueta o tiene un [alias](#metric-aliasing), Datadog etiqueta el último punto de cada línea con el nombre de la serie en lugar de sus picos y valles.

Para mantener la legibilidad de los gráficos, Datadog muestra un máximo de tres etiquetas por serie y no muestra etiquetas si el gráfico tiene más de seis series.

### Color {#color}

Para todos los tipos de gráficos, Datadog ofrece varias opciones de color para diferenciar múltiples métricas mostradas en el mismo gráfico:

| Paleta     | Descripción                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | Los colores simples azul claro, azul oscuro, morado claro, morado, amarillo claro y amarillo (los colores se repiten).    |
| Consistent | Utiliza un conjunto de 16 colores y aplica un color consistente para cada serie de datos en todos los widgets para cada grupo de etiquetas. |

Para los gráficos de líneas, se pueden asignar paletas específicas a diferentes métricas separando las consultas en JSON. Para obtener más información, consulte la guía sobre [cómo seleccionar los colores adecuados para sus gráficos][6].

### Ordenamiento {#sorting}

Ordene el gráfico por {{< ui >}}Tags{{< /ui >}} o por {{< ui >}}Values{{< /ui >}} para clasificar las leyendas de series temporales y los gráficos apilados. Esto solo ordena la visualización del gráfico y no afecta la consulta. Active la opción {{< ui >}}Reverse{{< /ui >}} para ordenar en orden alfabético inverso o por valores descendentes. 

### Alias de métrica {#metric-aliasing}

Cada consulta o fórmula, junto con cualquier [etiqueta de filtrado][7], puede tener un alias. El alias anula la visualización en el gráfico y la leyenda, lo cual es útil para nombres de métricas largos o listas largas de filtros. Al final de su consulta o fórmula, haga clic en {{< ui >}}as...{{< /ui >}} e ingrese su alias de métrica:

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Agregar un alias a una consulta de búsqueda en el editor de widgets de series temporales" style="width:100%;" >}}

### Superposición de eventos {#event-overlay}

La superposición de eventos admite todas las fuentes de datos. Esto permite una correlación más sencilla entre eventos de negocio y datos de cualquier servicio de Datadog.

Con la superposición de eventos, puede ver cómo las acciones dentro de la organización afectan el rendimiento de la aplicación y la infraestructura. Estos son algunos casos de uso de ejemplo:
- Tasas de error de RUM con eventos de implementación superpuestos
- Correlación del uso de CPU con eventos relacionados con el aprovisionamiento de servidores adicionales
- Correlación del tráfico de salida con actividad de inicio de sesión sospechosa
- Correlación de cualquier dato de series temporales con alertas de seguimiento para garantizar que Datadog se haya configurado con las alertas adecuadas

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de series temporales que muestran tasas de error de RUM con eventos de implementación superpuestos" style="width:100%;" >}}

Puede agregar eventos de sistemas relacionados para añadir más contexto a su gráfico, como confirmaciones de GitHub, implementaciones de Jenkins y eventos de creación de Docker. Haga clic en {{< ui >}}Add Event Overlay{{< /ui >}} en la sección {{< ui >}}Event Overlays{{< /ui >}} e ingrese una consulta para mostrar esos eventos.

Utilice el mismo formato de consulta que para el [Event Explorer][8], por ejemplo:

| Consulta                       | Descripción                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Muestra todos los eventos de la fuente Jenkins.                  |
| `tag:role:web`              | Muestra todos los eventos con la etiqueta `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Muestra todos los eventos de la [variable de plantilla][9] seleccionada. |

### Marcadores {#markers}

Para agregar marcadores para conjuntos de datos adicionales, haga clic en {{< ui >}}Add Marker{{< /ui >}} en la sección {{< ui >}}Markers{{< /ui >}}.

1. Seleccione Line o Range e ingrese un valor o un rango de valores.
2. En el campo {{< ui >}}Show as{{< /ui >}}, seleccione un estado/color de alerta y elija entre una línea horizontal continua, gruesa o discontinua.
3. Para agregar una etiqueta que se muestre en la parte inferior izquierda del widget de series temporales, haga clic en la casilla de verificación {{< ui >}}Label{{< /ui >}} y defina un valor para el eje y.

### Eje y doble {#dual-y-axis}

Para mostrar más de un eje y en el mismo gráfico, haga clic en **Add Graph**. Utilice el menú desplegable **Y-axis** para asociar los datos de la solicitud con el eje izquierdo o derecho. Puede asignar cualquier cantidad de solicitudes a cada lado.

{{< img src="dashboards/widgets/timeseries/dual_y_axis.png" alt="El widget de series temporales muestra dos consultas de métricas: system.uptime en morado en el eje y izquierdo y system.disk.used en naranja en el eje y derecho." style="width:100%;" >}}

### Controles del eje y {#y-axis-controls}

Los controles del eje y están disponibles en la interfaz de usuario y en el editor JSON. Puede establecer el valor y el tipo del eje y en:

* Recortar el eje y a rangos específicos.
* Cambiar automáticamente los límites del eje y según un umbral de valor absoluto. Este umbral se puede aplicar a uno o ambos extremos del gráfico (inferior y superior) para eliminar la serie de "valores anómalos".
* Cambiar la escala del eje y de lineal a log, pow o sqrt.

Están disponibles las siguientes opciones de configuración:

| Opción                | Requerida | Descripción                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | No       | Especifique el valor mínimo que se mostrará en el eje y. Acepta un número o `Auto` como valor predeterminado.                                                                                                                |
| `Max`                 | No       | Especifique el valor máximo que se mostrará en el eje y. Acepta un número o `Auto` como valor predeterminado.                                                                                                                        |
| `Scale`               | No       | Especifica el tipo de escala. Los valores posibles incluyen:<br>- *linear*: una escala lineal (predeterminada).<br>- *log*: una escala logarítmica.<br>- *pow*: una escala de potencia de 2 (2 es el valor predeterminado, modifíquelo en JSON).<br>- *sqrt*: una escala de raíz cuadrada. |
| `Always include zero` | No       | Incluya siempre el cero o ajuste el eje y al rango de datos. El valor predeterminado es incluir siempre el cero.                                                                                                                             |
<div class="alert alert-info">Debido a que la función matemática logarítmica no acepta valores negativos, la escala logarítmica de Datadog solo funciona si los valores tienen el mismo signo (todo > 0 o todo < 0). Otherwise, Datadog returns an empty graph.</div>

### Configuración de leyenda {#legend-configuration}

Puede agregar leyendas configurables a sus paneles visuales seleccionando entre las siguientes opciones en la sección {{< ui >}}Legend{{< /ui >}}:

* Automatic (default)
* Compact
* Expanded: Columnas configurables para value, avg, sum, min y max
* None

En los timeboards, las leyendas se muestran automáticamente cuando el tablero está configurado en L o XL.

### Context links {#context-links}

Para agregar un enlace de contexto en el menú desplegable que aparece al hacer clic en un widget del tablero, haga clic en {{< ui >}}Add a Context Link{{< /ui >}} en la sección {{< ui >}}Context Links{{< /ui >}}.

Para obtener más información sobre cómo editar y eliminar enlaces de contexto, consulte [Enlaces de contexto][10].

### Full screen {#full-screen}

Además de las [opciones estándar de pantalla completa][11], puede aplicar funciones rápidas, ajustar la escala Y, guardar cambios o guardar como un gráfico nuevo.

Para obtener más información, consulte [Explore sus datos en modo de gráfico de pantalla completa][12].

### Compare time {#compare-time}

La pestaña {{< ui >}}Compare Time{{< /ui >}} le permite comparar el rendimiento actual de la métrica con un período de tiempo anterior para detectar cambios de un vistazo. Utilice esto al investigar un pico en la carga del sistema o al validar el impacto de una implementación.

Para abrir la pestaña {{< ui >}}Compare Time{{< /ui >}}, abra un widget en modo de inspección haciendo clic en el icono de expandir de las opciones de control del widget y, a continuación, haga clic en {{< ui >}}Compare Time{{< /ui >}}.

La pestaña muestra dos gráficos:
- {{< ui >}}Current{{< /ui >}}: Sus datos de métricas para la ventana de tiempo activa. Utilice el menú desplegable de rango de tiempo y los controles de reproducción para ajustar la ventana.
- {{< ui >}}Previous{{< /ui >}}: El período de comparación. Seleccione {{< ui >}}Period{{< /ui >}}, {{< ui >}}Day{{< /ui >}}, {{< ui >}}Week{{< /ui >}}, {{< ui >}}Month{{< /ui >}} o {{< ui >}}Custom{{< /ui >}} para establecer el desplazamiento.

Para ver ambos períodos en el mismo gráfico, haga clic en {{< ui >}}Overlay{{< /ui >}}. Para volver a la vista lado a lado, haga clic en {{< ui >}}Grid{{< /ui >}}.

### Metrics info {#metrics-info}

En un gráfico de métricas, haga clic en el menú contextual (tres puntos verticales) para encontrar la opción {{< ui >}}Metrics Info{{< /ui >}}. Esto abre un panel con una descripción de la métrica. Al hacer clic en el nombre de la métrica en este panel, se abre la métrica en la página Metrics Catalog para analizarla o editarla.

## API {#api}

Este widget se puede utilizar con la **[Dashboards API][13]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][14]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#get-started
[2]: /es/dashboards/#screenboards
[3]: /es/dashboards/querying/
[4]: /es/tracing/trace_explorer/query_syntax/#search-bar
[5]: /es/logs/search_syntax/
[6]: /es/dashboards/guide/widget_colors/
[7]: /es/dashboards/querying/#filter
[8]: /es/events/
[9]: /es/dashboards/template_variables/
[10]: /es/dashboards/guide/context-links/
[11]: /es/dashboards/widgets/#full-screen
[12]: https://www.datadoghq.com/blog/full-screen-graphs
[13]: /es/api/latest/dashboards/
[14]: /es/dashboards/graphing_json/widget_json/
[15]: /es/dashboards/functions/rollup/