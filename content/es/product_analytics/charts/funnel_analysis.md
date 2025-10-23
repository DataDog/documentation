---
algolia:
  tags:
  - embudo
aliases:
- /es/real_user_monitoring/funnel_analysis
- /es/real_user_monitoring/product_analytics/funnel_analysis
- /es/product_analytics/journeys/funnel_analysis/
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Analytics Explorer
title: Análisis de embudo
---

## Información general

El análisis del embudo te ayuda a realizar un seguimiento de las tasas de conversión en flujos de trabajo clave, para identificar y abordar los cuellos de botella en recorridos de extremo a extremo de los usuarios. En concreto, puedes:

- Ver si los clientes abandonan el sitio web en un momento determinado debido a un rendimiento deficiente.
- Realizar un seguimiento de la evolución de la tasa de conversión a medida que se incorporan nuevas funciones.
- Medir cómo afecta a la tasa de abandono la adición de nuevos pasos a un flujo de trabajo.
- Comprender cuánto tiempo tardan en promedio los usuarios en atravesar el embudo (tiempo hasta la conversión).
- Filtrar eventos individuales (acción o vista) en diferentes pasos de tu embudo.
- Combinar varios eventos en un mismo paso, ya que los usuarios finales podrían tener diferentes maneras de obtener el mismo resultado en diferentes flujos.

**Nota**: La **tasa de conversión** es el número de visitantes de tu sitio web que sí lograron el objetivo buscado (la conversión) del número total de visitantes.

## Construir un embudo

Para crear un embudo, ve a [**Product Analytics > Charts** (Análisis de productos > Gráficos)][1] y haz clic en **Funnel** (Embudo).

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_overview.png" alt="Ve a la pestaña Funnel Analysis (Análisis de embudos) en Products Analytics (Análisis de productos)" style="width:100%;" >}}

En esta página, elige tu vista o acción inicial y haz clic en `+ Step` crear pasos adicionales. También puedes utilizar la función de arrastrar y soltar para organizar los pasos.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_video1.mp4" alt="Filtrado del mapa de red con búsquedas" video=true >}}

Si tienes un punto de partida en mente, pero no sabes exactamente qué hicieron tus usuarios a continuación, el editor de pasos del embudo carga automáticamente las **vistas** y **acciones** más frecuentes que tus usuarios suelen ver y realizar a continuación. Esto te permite crear embudos más rápidamente, ya que conoces los recorridos que tus usuarios realizan en secuencia.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_dropoffs.png" alt="El editor de pasos de embudo carga automáticamente las vistas y acciones más frecuentes que los usuarios generalmente ven y realizan respectivamente." style="width:50%;" >}}

**Nota**: Cualquier acción o vista que ocurra entre dos pasos de un embudo no afecta a la tasa de conversión paso a paso o global. Mientras el paso 1 y el paso 2 ocurran en el orden correcto en una sesión dada al menos una vez, cuentan como una única sesión convertida.

### Filtrado

Cuando creas tu embudo, puedes filtrar globalmente o por pasos.

- Los **filtros globales** se aplican a todo el embudo.

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by-2.png" alt="Uso de atributos para filtrar información globalmente al crear tu embudo" style="width:50%;" >}}

- El **filtrado de un paso** proporciona información sobre cómo cambia el paso en función de una restricción concreta de ese paso. Por ejemplo, es posible que quieras ver cómo un dispositivo, sistema operativo, geolocalización o usuario específico afecta a la conversión entre pasos.

    {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by_step.png" alt="Uso de atributos para filtrar información entre pasos al crear tu embudo" style="width:50%;" >}}

### Combinación de eventos

Al crear tu embudo, puedes combinar varios eventos en un paso dado, ya que los usuarios finales pueden tener diferentes maneras de obtener el mismo resultado en diferentes flujos. Al combinar eventos, cualquiera de los eventos del paso puede representar el paso. El valor numérico que ves es la combinación de todos los pasos dentro del paso combinado.

Para combinar un evento, haz clic en los tres puntos situados junto a un evento y selecciona **+ Combine Events** (+ Combinar eventos).

### Agrupar

Utiliza el desplegable Agrupar por, para agrupar los datos por un atributo específico.

**Nota**: La opción Agrupar por no funciona con la visualización de pasos del embudo.

## Refinar la conversión

Puedes seguir analizando la información de la página del embudo para comprender la tasa de conversión. La tasa de conversión es una métrica esencial que mide la eficacia de tu sitio o aplicación.

Puedes analizar la conversión por **recuento de sesiones** o **usuarios**, lo que significa que puedes comprender cuántas sesiones o usuarios completaron el embudo.

Puedes medir la conversión mediante los siguientes atributos:

- **Recuento de conversiones** - Recuento de usuarios que atravesaron el embudo que definiste.
- **Tasa de conversión** - La conversión se refiere al momento en que un usuario responde a una llamada a la acción. Esta tasa es el porcentaje de usuarios que entraron en el embudo y se convirtieron.

  **Nota**: Sólo las sesiones RUM completadas contribuyen a las tasas de conversión.

- **Tiempo hasta la conversión** - Tiempo que tardó el usuario en completar los eventos del paso.

Puedes medir estos atributos **en todos los pasos** o entre **pasos específicos**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion.png" alt="Medir atributos en todos los pasos o en pasos específicos." style="width:60%;" >}}

Utiliza el selector **filtro** para filtrar por los distintos criterios que hayas definido.

A continuación, haz clic en un punto de datos para **investigar los atributos específicos** que podrían haber afectado a los índices de conversión, como la velocidad de carga de la página, la facilidad de navegación o la experiencia de pago.

## Cambiar la visualización

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_change_viz.mp4" alt="Hacer clic en el menú desplegable de visualización para seleccionar otra vista" video=true >}}

Después de definir los eventos y la medición de la conversión del paso, puedes cambiar a una visualización diferente para comprender mejor las conversiones de los usuarios de tu aplicación.

### Series temporales
Visualizar la conversión como una serie temporal puede ser útil para comprender las tendencias de conversión. Cada punto del eje x representa la conversión de la consulta identificada.

Puedes seleccionar el periodo de tiempo para crear gráficos de conversión y visualizar las conversiones en porcentajes o en recuentos absolutos.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_timeseries.png" alt="Visualizar datos de conversión como series temporales." style="width:80%;" >}}

### Valor de consulta

Los valores de consulta muestran el valor actual de la métrica de uso dada.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_query_value.png" alt="Visualizar datos de conversión como valor de consulta." style="width:80%;" >}}

### Lista principal

Visualiza los principales valores de una faceta en función de la medida elegida.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_toplist.png" alt="Visualizar datos de conversión como una lista de principales." style="width:80%;" >}}

## Compartir un embudo

Puedes compartir embudos con tus equipos en [dashboards][5], para analizar la conversión junto con otras métricas de telemetría, o en un [notebook][6], para utilizarlos en informes.

Puedes compartir la visualización completa o widgets individuales.

- Comparte la visualización completa en notebooks y dashboards:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_funnel.png" alt="Compartir toda la visualización haciendo clic en Export (Exportar)" style="width:90%;" >}}

- Comparte widgets individuales desde un dashboard:

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="Compartir un widget haciendo clic en el icono de exportación en la parte superior derecha del widget" style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[5]: /es/product_analytics/dashboards/
[6]: /es/notebooks/