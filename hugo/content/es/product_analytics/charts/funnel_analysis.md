---
algolia:
  tags:
  - funnel
aliases:
- /es/real_user_monitoring/funnel_analysis
- /es/real_user_monitoring/product_analytics/funnel_analysis
- /es/product_analytics/journeys/funnel_analysis/
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Explorador de Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centro de aprendizaje
  text: Introducción a Product Analytics
title: Análisis de embudo
---
## Descripción general {#overview}

El análisis de embudo le ayuda a realizar un seguimiento de las tasas de conversión en flujos de trabajo clave para identificar y abordar cualquier cuello de botella en las rutas de recorrido de extremo a extremo. Específicamente, usted puede:

- Ver si los clientes abandonan en un punto determinado debido al bajo rendimiento del sitio web
- Realizar un seguimiento de cómo cambia la tasa de conversión con el tiempo a medida que se crean nuevas funciones
- Evaluar cómo la adición de nuevos pasos a un flujo de trabajo afecta la tasa de abandono
- Medir el tiempo promedio para convertir
- Filtrar eventos individuales en diferentes pasos de su embudo
- Combinar múltiples eventos dentro de un paso determinado, ya que los usuarios finales pueden tener diferentes formas de lograr el mismo resultado a través de distintos flujos


## Crear un embudo {#build-a-funnel}

Para comenzar a crear un embudo, navegue a [{{< ui >}}Product Analytics{{< /ui >}}][1], luego seleccione [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2].

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="La opción de embudo resaltada en el cuadro de diálogo Crear nuevo en Product Analytics" style="width:100%;" >}}

Seleccione los pasos del usuario que inician el embudo y use {{< ui >}}Add step{{< /ui >}} para agregar pasos adicionales. Arrastre y suelte los pasos para reordenarlos en el embudo.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="Uso del botón Agregar paso para añadir un paso a un embudo existente, y uso de arrastrar y soltar para mover el nuevo paso al lugar correcto en el embudo." video=true >}}


### Agregar filtros {#add-filters}

Puede filtrar usuarios globalmente o para pasos específicos:

- Para aplicar filtros globales a todo el embudo, seleccione {{< ui >}}Filter by{{< /ui >}} y elija sus opciones.

- Para filtrar usuarios en un paso individual, seleccione el **icono de filtro** para ese paso y elija sus opciones. Filtrar en un paso proporciona información sobre cómo cambia el comportamiento del usuario según una restricción particular en ese paso. Por ejemplo, es posible que desee ver cómo un dispositivo, sistema operativo o geolocalización específicos afectan la conversión en un paso particular.

### Combinar eventos {#combine-events}

Puede combinar múltiples eventos dentro de un solo paso del embudo, para tener en cuenta que los usuarios finales logren el mismo resultado a través de diferentes flujos. Al combinar eventos, cualquier evento incluido puede activar la conversión del paso, utilizando lógica "o". El Gráfico de embudo para un paso combinado muestra datos para todos los eventos que contiene.

Para agregar múltiples eventos a un paso, haga clic en el botón {{< ui >}}or{{< /ui >}} junto a un evento existente.

### Comparar datos {#compare-data}

Seleccione {{< ui >}}Compare{{< /ui >}}, luego elija una de las opciones a continuación para comparar los datos del embudo de diferentes maneras:

{{< ui >}}By breakdown{{< /ui >}}: Agrupe los datos por un atributo específico, como el tipo de dispositivo o la geolocalización. También puede ajustar si desea mostrar los valores superiores (más comunes) o inferiores (menos comunes) dentro del atributo, y cuántos valores incluir.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="La vista Comparar por desglose, configurada para mostrar las cinco principales fuentes de conversión por país." >}}

{{< ui >}}By property or segment{{< /ui >}}: Comparar múltiples segmentos de usuario o atributos de usuario lado a lado.

- Para comparar segmentos de usuario, seleccione los segmentos que desea comparar.
- Para comparar un atributo de usuario, seleccione una propiedad (como Nombre del navegador o País), luego elija los valores que desea comparar (como Firefox, Chrome y Safari).

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="La vista Comparar por propiedad o segmento, que muestra una comparación lado a lado de cinco valores seleccionados de Nombre del navegador." >}}

{{< ui >}}By time{{< /ui >}}: Comparar los datos de conversión lado a lado entre períodos de tiempo.

## Refinar los conocimientos de conversión {#refine-conversion-insights}

Puede analizar más a fondo la información en la página del embudo para comprender la eficacia de su sitio para impulsar conversiones. Una [conversión](#conversion-computing-metrics) ocurre cuando un usuario completa el último paso definido en el embudo.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="El menú desplegable de refinamiento de conversión con opciones para el análisis por conversiones únicas o totales." style="width:100%;" >}}

Utilice el menú desplegable sobre el panel lateral del gráfico para seleccionar diferentes vistas de análisis de conversión. El análisis de conversión está disponible por:

- {{< ui >}}Unique converted sessions{{< /ui >}}: Conversiones donde todos los pasos se completaron con el mismo `@session.id`.

- {{< ui >}}Unique converted users{{< /ui >}}: Conversiones donde el mismo usuario individual, rastreado por `@user.id`, completó todos los pasos.

- {{< ui >}}Unique converted accounts{{< /ui >}}: Conversiones donde la misma cuenta, rastreada por `@account.id`, completó todos los pasos. Este análisis es útil para identificar conversiones completadas por usuarios que han iniciado sesión durante un período de tiempo más largo de lo que persiste la faceta `@user.id`.

- {{< ui >}}Total conversions{{< /ui >}}: Conversiones totales a través de sesiones, usuarios o cuentas.

- {{< ui >}}Time to convert{{< /ui >}}: Una vista de series temporales de conversiones por sesiones, usuarios o cuentas.

Para cualquier vista de análisis de conversión, puede elegir visualizar las conversiones por conteo o tasa, y ver los datos de todos los pasos o de pasos individuales. Para las vistas de conversión por usuario o cuenta, puede ajustar el marco de tiempo dentro del cual debe ocurrir una conversión.

## Métricas de cálculo de conversión {#conversion-computing-metrics}

### Cómo calcula Datadog las métricas de conversión {#how-datadog-computes-conversion-metrics}
Considere un embudo con eventos `A → B → C` y pasos de evento **A**, A, A, **B**, **C**, C.

En este caso, Datadog cuenta una conversión. Cada **A** inicia un intento independiente. Debido a que los tres intentos se completan en el mismo evento **C**, Datadog cuenta solo el intento más temprano.

Para ilustrar mejor, si el usuario realiza la secuencia de eventos **A**, A, A, **B**, **C**, C, **A**, **B**, **C**, Datadog cuenta dos conversiones. La primera conversión se completa con la secuencia **A**, A, A, **B**, **C**, y la segunda conversión se completa con la siguiente secuencia de **A**, **B**, **C**.

<div class="alert alert-info"> Cualquier acción o vista que no coincida con un paso del embudo no afecta la tasa de conversión paso a paso ni la general. Si todos los pasos del embudo ocurren en el orden correcto dentro de la ventana de conversión, Datadog cuenta la sesión como una única sesión convertida.</div>

Datadog calcula el tiempo promedio entre pasos promediando la duración total entre el primer y el último paso de cada conversión sobre el número total de pasos.

Si analiza su embudo por **usuario** o por **cuenta**, puede definir su marco de tiempo de conversión en horas o días desde el primer evento. El marco de tiempo predeterminado para las conversiones es un día (una ventana de 24 horas, no una fecha de calendario) para determinar si ocurrió una conversión.


### Métodos de conteo de conversiones {#conversion-counting-methods}

Al calcular sus conversiones, seleccione cómo se cuentan las conversiones eligiendo una opción de conversión **única** (sesiones, usuarios o cuentas) o la opción {{< ui >}}Total Conversion Count{{< /ui >}} en su visualización de conversión. 

- {{< ui >}}Unique{{< /ui >}}: Cuenta una conversión solo una vez por sesión, usuario o cuenta. Por ejemplo, si el usuario completa la secuencia del embudo `A → B → C` varias veces dentro de la misma sesión (`A, B, C, A, B, C`), cuenta como **una conversión**.

- {{< ui >}}Total{{< /ui >}}: Cuenta una conversión cada vez que el mismo ID de sesión, usuario o cuenta completa el embudo definido. Usando el mismo ejemplo (`A, B, C, A, B, C`), este método cuenta **dos conversiones**. La configuración {{< ui >}}Total{{< /ui >}} cuenta flujos completos, no la cantidad de veces que se repite un paso intermedio.


## Cambiar la visualización {#change-the-visualization}
Después de definir los eventos de paso y la medición de conversión, puede cambiar a una visualización diferente para comprender mejor las conversiones de usuario de su aplicación.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="Cambiar la visualización de Steps a Timeseries usando un menú desplegable." video=true >}}


### Timeseries{#timeseries}
Ver el embudo como Timeseries puede ser útil para comprender las tendencias de conversión. Puede seleccionar el período de tiempo para graficar la conversión y puede visualizar las conversiones como un recuento absoluto o una tasa.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="La visualización Timeseries, configurada para mostrar usuarios únicos convertidos diariamente durante la última semana." style="width:80%;" >}}

### Query value{#query-value}

La visualización Query value muestra el valor actual de una métrica.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="La visualización Query value, configurada para mostrar el número total de sesiones convertidas únicas durante la última semana." style="width:80%;" >}}

### Lista principal {#top-list}

La visualización de lista principal identifica los valores principales de una faceta según una medida elegida.

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="La visualización de lista principal, configurada para mostrar las cuatro fuentes de conversión principales por continente." style="width:80%;" >}}

## Visualice impulsores de conversión y rutas de recorrido {#view-conversion-drivers-and-journey-paths}

Para obtener más contexto sobre las conversiones y los abandonos de los usuarios, haga clic en un paso del embudo para acceder al análisis de conversión y a las rutas de recorrido.

<div class="alert alert-info">El análisis de conversión está en Preview.</div>

- **Análisis de conversión**: Visualice los impulsores de conversión, los recorridos de los usuarios, las reproducciones de usuario disponibles para conversiones y abandonos, y los detalles del usuario.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="La vista del panel lateral después de hacer clic en un paso del embudo, que muestra los impulsores de conversión, las reproducciones disponibles y los usuarios convertidos." style="width:100%;" >}}

- **Rutas de recorrido**: Visualice las rutas de usuario de conversión y abandono para la secuencia de pasos seleccionada, incluidas las rutas de ramificación a otros pasos fuera del embudo.

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_journey_paths.png" alt="Una ruta de recorrido que muestra las cinco rutas de abandono principales después del paso 1 en el embudo." style="width:100%;" >}}

## Compartir un embudo {#share-a-funnel}

Los embudos se pueden compartir con sus equipos en [tableros][3] para analizar la conversión junto con otras métricas de telemetría, o en un [Notebook][4] para usarlos en informes.

Puede compartir toda la visualización o widgets individuales.

- Comparta toda la visualización en Notebooks y tableros:

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="La opción Compartir de la visualización expandida, que muestra la opción adicional para Exportar a PNG " style="width:100%;" >}}

- Comparta widgets individuales desde un tablero:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="Comparta un widget haciendo clic en el icono de exportación en la parte superior derecha del widget" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /es/product_analytics/dashboards/
[4]: /es/notebooks/