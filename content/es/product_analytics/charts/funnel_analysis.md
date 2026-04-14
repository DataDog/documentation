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


## Construir un embudo

Para crear un embudo, ve a [**Product Analytics > Charts** (Análisis de productos > Gráficos)][1] y haz clic en **Funnel** (Embudo).

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_overview.png" alt="Ve a la pestaña Funnel Analysis (Análisis de embudos) en Products Analytics (Análisis de productos)" style="width:100%;" >}}

En esta página, elige tu vista o acción inicial y haz clic en `+ Step` crear pasos adicionales. También puedes utilizar la función de arrastrar y soltar para organizar los pasos.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_video1.mp4" alt="Filtrado del mapa de red con búsquedas" video=true >}}

Si no estás seguro de lo que hicieron tus usuarios, el editor del step (UI) / paso (generic) del embudo carga automáticamente **vistas** y **acciones** comunes que puedes elegir para añadir como pasos.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_dropoffs.png" alt="El editor de pasos de embudo carga automáticamente las vistas y acciones más frecuentes que los usuarios generalmente ven y realizan respectivamente." style="width:50%;" >}}



### Añadir filtros

Cuando construyas tu embudo, puedes filtrar usuarios globalmente, o para un step (UI) / paso (generic) específico.

- Los **filtros globales** se aplican a todo el embudo.

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by-2.png" alt="Uso de atributos para filtrar información globalmente al crear tu embudo" style="width:50%;" >}}

- El **filtrado de un paso** proporciona información sobre cómo cambia el paso en función de una restricción concreta de ese paso. Por ejemplo, es posible que quieras ver cómo un dispositivo, sistema operativo, geolocalización o usuario específico afecta a la conversión entre pasos.

    {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_filter_by_step.png" alt="Uso de atributos para filtrar información entre pasos al crear tu embudo" style="width:50%;" >}}

### Combinar eventos

Al crear tu embudo, puedes combinar varios eventos en un paso dado, ya que los usuarios finales pueden tener diferentes maneras de obtener el mismo resultado en diferentes flujos. Al combinar eventos, cualquiera de los eventos del paso puede representar el paso. El valor numérico que ves es la combinación de todos los pasos dentro del paso combinado.

Para combinar un evento, haz clic en los tres puntos situados junto a un evento y selecciona **+ Combine Events** (+ Combinar eventos).

### Datos del grupo

Utiliza el desplegable **Group by** (Agrupar por) para agrupar los datos por un atributo específico.

**Nota**: La agrupación de datos no es compatible con la [visualización](#change-the-visualization) de steps (UI) / pasos (generic) del embudo; cuando se aplica, la visualización cambia automáticamente a una top list (lista principal).

## Refinar la conversión

Puedes seguir analizando la información de la página del embudo para comprender la tasa de conversión. La tasa de conversión es una métrica esencial que mide la eficacia de tu sitio o aplicación.

Puedes analizar la conversión por **sesión**, **usuario** o **cuenta**. Esto puede ser útil si sospechas, por ejemplo, que una minoría de tu base de usuarios convierte a un ritmo elevado.

- Si seleccionas **Session** (Sesión), todos los steps (UI) / pasos (generic) deben completarse dentro de la misma `@session.id` para que cuenten como conversión.

- Si seleccionas **User** (Usuario), el embudo requiere que el mismo usuario individual (`@user.id`) complete cada step (UI) / paso (generic) para que la conversión cuente.

- Si seleccionas **Account** (Cuenta), diferentes usuarios dentro de la misma cuenta pueden completar diferentes steps (UI) / pasos (generic) y la conversión sigue contando. En este case (incidencia), el embudo está vinculado a la faceta `@account.id`.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_refine_conversion.png" alt="La sección de la interfaz de usuario en la cual puedes seleccionar Sesión, Usuario o Cuenta para analizar tu conversión." style="width:50%;" >}}


Una conversión se refiere al momento en el que un usuario responde a una llamada a la acción. Puedes medir la conversión mediante los siguientes atributos:

- **Número de conversiones**: Número de usuarios que han pasado por el embudo que has definido.
- **Tasa de conversión**: Esta tasa es el porcentaje de usuarios que han entrado en el embudo y han convertido.
- **Tiempo de conversión**: El tiempo que tardó el usuario en completar los eventos de step (UI) / paso (generic). Esta opción no está disponible para la [visualización](#change-the-visualization) de pasos del embudo; si la seleccionas, la visualización cambia automáticamente a una serie temporal.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion_measures.png" alt="La sección de la interfaz de usuario en la cual puedes seleccionar Sesión, Usuario o Cuenta para analizar tu conversión." style="width:50%;" >}}

Puedes medir estos atributos **en todos los pasos** o entre **pasos específicos**.

{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_conversion.png" alt="Medir atributos en todos los pasos o en pasos específicos." style="width:60%;" >}}

Utiliza el selector [**filter** (filtrar)](#add-filters) para filtrar los datos por tipos específicos de usuarios. Estos filtros se aplican a todos los steps (UI) / pasos (generic) del embudo.

A continuación, haz clic en un punto de datos para **investigar los atributos específicos** que podrían haber afectado a los índices de conversión, como la velocidad de carga de la página, la facilidad de navegación o la experiencia de pago.

## Métricas informáticas de conversión

### Cómo calcula Datadog las métricas de conversión
Considera un embudo con eventos `A → B → C` y steps (UI) / pasos (generic) de eventos `A, A, A, B, C, C`. 

En este case (incidencia), Datadog cuenta una conversión. Esto se debe a que el cálculo de conversión coincide solo con la primera ocurrencia del evento **A** y la primera ocurrencia del evento **C** en la secuencia.

Para ilustrarlo mejor, si el usuario realiza la secuencia de eventos `A, A, A, B, C, C, A, B, C`, Datadog cuenta dos conversiones. La primera conversión se completa con la secuencia `A, A, A, B, C, C` y la segunda conversión se completa con la siguiente secuencia `A, B, C`.

<div class="alert alert-info"> Cualquier acción o vista que se produzca entre dos pasos de un embudo no afecta al step (UI) / paso (generic) por step (UI) / paso (generic) o a la tasa de conversión global. Siempre que step (UI) / paso (generic) A y C se produzcan en el orden correcto en una sesión determinada al menos una vez, cuenta como una única sesión convertida.</div>

Datadog calcula el tiempo medio entre pasos promediando la duración total entre el primeo y el último step (UI) / paso (generic) de cada conversión sobre el número total de pasos.

Si analizas tu embudo por **usuario** o por **cuenta**, puedes definir tu plazo de conversión en horas o días desde el primer evento. El plazo predeterminado para las conversiones es de un día (una ventana de 24 horas, no una fecha de calendario) para determinar si se ha producido una conversión.


### Selecciona un método de recuento de conversiones

Cuando calcules tu conversión, selecciona cómo se cuentan las conversiones eligiendo **único** o **total** al lado de **Conversion count** (Número de conversiones) en la configuración de tu embudo. 

- **Único**: Cuenta la conversión una sola vez por sesión, usuario o cuenta. Por ejemplo, si el usuario completa la secuencia del embudo `A → B → C` varias veces dentro de la misma sesión (por ejemplo, `A, B, C, A, B, C`), cuenta como **una conversión**. El ajuste `Unique` solo cuenta la primera conversión por sesión (o por usuario, según el alcance de tu análisis).

- **Total**: Cuenta una conversión cada vez que el mismo ID de sesión, usuario o cuenta completa el embudo definido. Utilizando el mismo ejemplo (`A, B, C, A, B, C`), este método cuenta **dos conversiones**. El ajuste `Total` cuenta los flujos completos, no el número de veces que se repite un step (UI) / paso (generic) intermedio.


{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_conversion.png" alt="Selecciona una medida de conversión, ya sea Única o Total, para determinar cómo se cuentan tus conversiones de sesión." style="width:80%;" >}}


## Cambiar la visualización
Después de definir los eventos y la medición de la conversión del paso, puedes cambiar a una visualización diferente para comprender mejor las conversiones de los usuarios de tu aplicación.


{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_change_viz.mp4" alt="Hacer clic en el menú desplegable de visualización para seleccionar otra vista" video=true >}}


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

## Navegar por los gráficos de embudo
Para obtener más contexto sobre las bajas de usuarios, haz clic en el gráfico del embudo para abrir un panel lateral que contiene información adicional. A continuación, navega entre los steps (UI) / pasos (generic) para ver:

- **Rendimiento del step (UI) / paso (generic)**: Consulta las métricas relacionadas con la conversión (por ejemplo, la tasa de conversión, las sesiones abandonadas y el tiempo medio de conversión).
- **Rutas de ramifcación del step (UI) / paso (generic) anterior**: Descubre los otros caminos que toman los usuarios en lugar de los previstos. Esta sección solo está disponible cuando se mira un step (UI) / paso (generic) entre dos vistas en un embudo.
- **Problemas que podrían estar afectando a la conversión**: Consulta los principales problemas que podrían estar afectando a las conversiones e investígalos más a fondo con los enlaces a RUM, Error Tracking y Session Replay.


{{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_metrics.png" alt="Haz clic en la vista del embudo para ver un contexto adicional sobre los abandonos de usuarios." style="width:90%;" >}}

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