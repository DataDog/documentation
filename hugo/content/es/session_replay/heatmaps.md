---
aliases:
- /es/real_user_monitoring/session_replay/heatmaps
- /es/real_user_monitoring/heatmaps
- /es/product_analytics/session_replay/heatmaps
- /es/product_analytics/heatmaps
description: Los mapas de calor son un tipo de visualización que muestra dónde hacen
  clic los usuarios en su sitio web.
further_reading:
- link: /session_replay/
  tag: Documentación
  text: Session Replay para navegadores
- link: /session_replay/?platform=android
  tag: Documentación
  text: Session Replay para dispositivos móviles
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: Blog
  text: Capture y analice mapas de calor personalizados en Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: Blog
  text: Visualice las interacciones del usuario con sus páginas mediante el uso de
    mapas de desplazamiento en los Heatmaps de Datadog
title: Mapas de calor
---
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="Una descripción general de la funcionalidad de mapas de calor." style="width:100%;">}}

Un mapa de calor es una visualización de las interacciones de sus usuarios superpuesta a los datos de Session Replay. Existen tres tipos diferentes de mapas de calor:

- {{< ui >}}Click maps{{< /ui >}}: Visualice las interacciones de los usuarios (clics) para comprender cómo interactúan con su página.
- {{< ui >}}Top Elements{{< /ui >}}: Visualice una clasificación de hasta los 10 elementos con los que más interactúan los usuarios en una página determinada.
- {{< ui >}}Scroll maps{{< /ui >}}: Visualice hasta dónde se desplazan los usuarios en una página, incluido dónde se ubica el pliegue promedio de la página. El pliegue promedio es el punto más bajo de una página que un usuario puede ver en su dispositivo sin desplazarse.

Utilice los mapas de calor para revisar datos complejos de un vistazo y obtener información sobre cómo optimizar su experiencia de usuario.

<div class="alert alert-info">Los mapas de calor solo son compatibles con Session Replay del navegador.</div>

## Requisitos previos {#prerequisites}

Para comenzar con los mapas de calor:

1. Verifique su versión del SDK del navegador:
   - Para los mapas de clics, debe tener la versión más reciente del SDK (v4.40.0 o posterior).
   - Para los mapas de desplazamiento, debe tener la versión (v4.50.0 o posterior) del SDK.
2. Habilite [Session Replay][1].
3. Establezca`trackUserInteractions: true` en la inicialización del SDK para habilitar el seguimiento de acciones (necesario para los mapas de clics).

## Primeros pasos {#getting-started}

{{< tabs >}}
{{% tab "RUM" %}}

Navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]. Seleccione su aplicación y visualice la vista.

En la [página de inicio de Real User Monitoring][2], seleccione su aplicación desde el selector de aplicaciones y visualice la vista. A la izquierda del selector de marco temporal, puede seleccionar el tipo de mapa de calor que desea visualizar: Top elements, Click map o Scroll map.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="La página de mapas de calor tiene múltiples formas de mostrar diferentes vistas: por aplicación, tipo de mapa, tipo de dispositivo, nombre de acción y filtros granulares." style="width:100%;">}}

[1]: https://app.datadoghq.com/rum/heatmap/
[2]: https://app.datadoghq.com/rum/performance-monitoring

{{% /tab %}}
{{% tab "Product Analytics" %}}

Navegue a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1]. Seleccione su aplicación y visualice la vista.

Desde esta página, puede seleccionar el tipo de mapa de calor (Top elements, Click map, Scroll map) que desea visualizar para una vista en particular.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="Para cada vista, puede seleccionar un tipo diferente de mapa de calor: Top Elements, Click Map o Scroll Map." style="width:100%;">}}

Haga clic en el nombre de una vista para obtener una vista más detallada del mapa de calor relacionado.

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="La página de mapas de calor tiene múltiples formas de mostrar diferentes vistas: por aplicación, tipo de mapa, tipo de dispositivo, nombre de acción y filtros granulares." style="width:100%;">}}

[1]: https://app.datadoghq.com/product-analytics/heatmap

{{% /tab %}}
{{< /tabs >}}

Tiene las siguientes opciones de vista adicionales:

- Para cambiar la vista que se muestra, utilice los selectores {{< ui >}}View Name{{< /ui >}} y {{< ui >}}Application{{< /ui >}} en la parte superior.
- Para cambiar la vista de dispositivo, utilice el selector {{< ui >}}Device type{{< /ui >}}.
- Para filtrar por nombre de acción, utilice el menú desplegable {{< ui >}}Filter actions by{{< /ui >}}.
- Para añadir filtros más granulares, como una geografía específica por ejemplo, haga clic en el botón {{< ui >}}Add Filter{{< /ui >}}.

## Top Elements {#top-elements}

Los mapas de calor de Top Elements agregan las acciones de clic en una vista determinada mostrando los elementos con los que más se interactúa, además de su rango de interacción. La clasificación en el mapa mismo corresponde al nombre de la acción en el lateral.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="Una clasificación de los elementos principales en los que se hizo clic en una página." style="width:100%;">}}

Pase el cursor sobre cualquier nombre de acción en el panel para resaltar la acción correspondiente en el mapa.

## Mapas de clics{#click-maps}

Un mapa de clics le muestra las acciones con las que más se interactúa en una vista determinada al agregar las acciones de clic de los usuarios de las sesiones y visualizarlas como manchas en el mapa.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="Datos de mapa de clics superpuestos en un sitio web." style="width:100%;">}}

A la izquierda hay una lista de todas las acciones que ocurrieron en la página, enumeradas por frecuencia. Cuando hace clic en una acción, puede comprender más sobre esa interacción, por ejemplo:

- La cantidad de veces que los usuarios realizaron la acción y dónde se ubica en el análisis general de las principales acciones en una página determinada.
- Si esa acción tuvo una señal de frustración (por ejemplo, si un usuario hizo clic con furia en ese botón), también puede ver las señales de frustración asociadas.

Desde esta vista, también puede hacer clic en el botón {{< ui >}}Start a Funnel{{< /ui >}} para identificar la deserción de usuarios.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="Muestra una acción de ejemplo y la información que puede obtener sobre esa acción." style="width:50%;">}}

## Mapas de desplazamiento{#scroll-maps}

Los mapas de desplazamiento muestran la actividad de desplazamiento agregada en una página determinada. Utilice los mapas de desplazamiento para ver dónde cae el pliegue promedio de la página y cuántos usuarios se desplazan hasta una profundidad determinada. Puede arrastrar la barra azul flotante en un mapa de desplazamiento hasta la profundidad que desee evaluar.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="Mapa de desplazamiento de la página de ropa de cama en una aplicación de comercio electrónico de muestra" style="width:100%;">}}

El panel a la izquierda del mapa de desplazamiento proporciona información de alto nivel con enlaces directos a los resultados de la consulta, como un enlace a una lista de vistas donde los usuarios se desplazaron más allá de un percentil determinado. Debajo del panel de información hay un minimapa de la página y un gráfico de distribución que muestra datos de desplazamiento granulares, útiles para identificar dónde ocurre la mayor deserción.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="Una captura de pantalla de las consultas para obtener información sobre los datos de desplazamiento" style="width:50%;">}}

## Capturas de pantalla{#screenshots}

Una captura de pantalla es el estado de una vista en un momento determinado. Cambiar la captura de pantalla muestra resultados diferentes, dependiendo de la captura seleccionada. También puede guardar capturas de pantalla para que todos en su organización puedan analizar el mismo estado de la vista. 

### Cambiar capturas de pantalla {#changing-screenshots}

Desde la vista de mapa de calor, haga clic en el botón {{< ui >}}Change Screenshot{{< /ui >}}. Aparece un menú desplegable con tres opciones.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button.png" alt="El menú desplegable Change Screenshot que muestra tres opciones: Existing screenshots, Take new screenshot y Grab from replay." style="width:100%;">}}

{{< ui >}}Existing screenshots{{< /ui >}}

Elija entre las capturas de pantalla guardadas previamente por usted o sus compañeros de equipo. Esto ayuda a garantizar que todos en su organización analicen el mismo estado de la vista.

{{< ui >}}Take new screenshot{{< /ui >}}

Capture una captura de pantalla directamente desde su aplicación en vivo. Utilice esta opción cuando el estado que necesita (como un modal abierto, un menú desplegable al pasar el cursor o una posición de desplazamiento específica) no exista en sus reproducciones grabadas.

**Requisito previo**: Instale la extensión de Chrome [Datadog Test Recorder][6] antes de usar esta opción. La extensión carga su aplicación en vivo en un navegador integrado dentro de Datadog, lo que le permite navegar a la página y al estado de la interfaz de usuario exactos que desea capturar.

1. Haga clic en {{< ui >}}Take new screenshot{{< /ui >}}.


1. Navegue a la página que desea capturar en el navegador integrado.
1. Desplácese e interactúe con la página para mostrar el contenido que desea.
1. Seleccione un nivel de enmascaramiento para evitar que aparezcan datos confidenciales en su captura de pantalla del mapa de calor. La configuración de privacidad a nivel de elemento individual configurada en su código sigue teniendo prioridad. Para obtener más información, consulte [Privacy options][5].

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-take-new-screenshot.png" alt="El panel Take new screenshot que muestra las instrucciones de navegación y un selector de nivel de enmascaramiento." style="width:100%;">}}

1. Haga clic en {{< ui >}}Take Screenshot{{< /ui >}}. Se abre una vista previa de la captura de pantalla.
1. Revise la vista previa y haga clic en {{< ui >}}Confirm{{< /ui >}} para aplicar la captura de pantalla a su mapa de calor.

{{< ui >}}Grab from replay{{< /ui >}}

Seleccione una captura de pantalla de una Session Replay grabada.

1. Haga clic en {{< ui >}}Grab from replay{{< /ui >}}.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-grab-from-replay-selected.png" alt="El menú desplegable Cambiar captura de pantalla con Capturar desde reproducción seleccionado." style="width:100%;">}}

1. Haga clic en un evento de acción a la derecha para seleccionar una instantánea diferente para su mapa de calor.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="Lista de eventos de acción para la reproducción de la sesión." style="width:100%;">}}

1. Si la sesión [ no contiene la acción ](#the-view-that-i-selected-is-not-showing-the-initial-content) que conduce a la captura de pantalla deseada, regrese a la lista de reproducciones haciendo clic en {{< ui >}}Choose Another Replay{{< /ui >}}.
1. Haga clic en {{< ui >}}Take Screenshot{{< /ui >}} para aplicar la captura de pantalla en el punto pausado al mapa de calor.

### Guardando capturas de pantalla {#saving-screenshots}

Las capturas de pantalla tomadas usando {{< ui >}}Grab from replay{{< /ui >}} o {{< ui >}}Take new screenshot{{< /ui >}} se guardan automáticamente y se convierten en la vista predeterminada para cualquier persona de su organización que abra el mapa de calor. Para guardar también la captura de pantalla seleccionada automáticamente de una reproducción reciente, haga clic en {{< ui >}}Save{{< /ui >}} en la captura de pantalla actual.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="Haga clic en Guardar para aplicar la captura de pantalla seleccionada automáticamente." style="width:100%;">}}

Puede guardar varias capturas de pantalla para la misma vista (por ejemplo: vista predeterminada, menú de navegación abierto, ventana modal abierta) y cambiar entre las capturas de pantalla guardadas por sus compañeros de equipo.

Para eliminar la captura de pantalla guardada actualmente y volver a una seleccionada automáticamente de una reproducción reciente, haga clic en {{< ui >}}Unpin{{< /ui >}} en la captura de pantalla actual.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="Haga clic en desanclar para eliminar la captura de pantalla anclada actualmente." style="width:100%;">}}

### Análisis de mapas de calor más allá de la retención de Session Replay {#analyzing-heatmaps-beyond-replay-retention}

En Product Analytics, los datos de clics perduran más que la Session Replay utilizada como fondo. Consulte [Retención de datos](#data-retention). Para visualizar un mapa de calor para un período anterior a su retención de Session Replay:

1. Establezca el rango de fechas en un período dentro de los últimos 30 días, para que un mapa de calor se renderice con un fondo de una reproducción reciente.
1. Haga clic en {{< ui >}}Save{{< /ui >}} en la captura de pantalla actual para anclarla.
1. Vuelva a establecer el rango de fechas en el período que desea analizar.

Sus datos de clics más antiguos aparecen en la captura de pantalla anclada. También puede usar {{< ui >}}Take new screenshot{{< /ui >}} para capturar un estado específico de su aplicación en vivo.

**Nota**: El fondo refleja su aplicación tal como se veía recientemente, no como se veía durante el período que está analizando. Si el diseño de su página cambió en el transcurso, los clics pueden aparecer sobre los elementos incorrectos.

## Retención de datos {#data-retention}

Un mapa de calor combina dos tipos de datos (la **superposición**: clics y desplazamientos, y la **captura de pantalla de fondo**), y Datadog conserva cada uno durante un período diferente:

| Datos | Fuente | Retención |
| ---- | ------ | --------- |
| **Superposición** (clics y desplazamientos) en RUM | Eventos de acción de RUM | 30 días |
| **Superposición** (clics y desplazamientos) en Product Analytics | Datos de clics de Product Analytics | 15 meses |
| **Captura de pantalla de fondo** en ambos | Session Replay | 30 días de forma predeterminada |

Un mapa de calor necesita ambos para renderizarse. Si selecciona un marco de tiempo donde los datos de clics aún existen pero no queda ninguna reproducción para usar como fondo, el mapa de calor muestra "No Replay Data" aunque todavía pueda consultar esas acciones en el explorador de Analytics.

En Product Analytics, si espera analizar una visualización durante un período superior a 30 días, guarde una captura de pantalla de la misma mientras las reproducciones aún estén disponibles. Guardar una captura de pantalla extiende la retención de la reproducción detrás de ella a 15 meses, por lo que el mapa de calor sigue renderizándose mientras Datadog conserve sus datos de clics de Product Analytics. Consulte [Análisis de mapas de calor más allá de la retención de Session Replay](#analyzing-heatmaps-beyond-replay-retention).

En RUM, los eventos de acción caducan después de 30 días, por lo que los mapas de calor no están disponibles más allá de esa ventana.

Para conocer los periodos de retención que se aplican a otros tipos de datos, consulte [Periodos de retención de datos][7]. Para extender la retención en reproducciones individuales, consulte [Extender la retención de datos][8].

## Próximos pasos {#next-steps}

Después de analizar los mapas de calor, el siguiente paso es comprender la acción del usuario explorando los datos relacionados. Vea las [reproducciones de sesión][1] asociadas para observar las acciones del usuario en el contexto de su sesión general, o navegue a un explorador de Analytics en [RUM][3] o [Product Analytics][4] para analizar sus datos de usuario.

## Solución de problemas {#troubleshooting}

### Estoy viendo un mapa de calor para una visualización determinada, pero me muestra una página inesperada. {#i-am-looking-at-a-heatmap-for-a-given-view-but-its-showing-me-an-unexpected-page}

Los mapas de calor se basan en los nombres de las visualizaciones. Dependiendo de cómo esté configurada su aplicación, muchas páginas pueden empezar a agruparse bajo el mismo nombre de visualización, o puede empezar a tener nombres de visualización específicos.

### La visualización que seleccioné no muestra el contenido inicial. {#the-view-that-i-selected-is-not-showing-the-initial-content}

Los mapas de calor se generan con datos de Session Replay. El algoritmo inteligente de Datadog selecciona una reproducción que sea reciente y que coincida mejor con el estado inicial de la página. En algunos casos, es posible que esta reproducción no sea la que desea utilizar. Para cambiar la instantánea de su mapa de calor, utilice el botón {{< ui >}}Change Snapshot{{< /ui >}} para navegar por los diferentes estados de una reproducción y encontrar el que desea. Si la reproducción que está viendo no tiene la instantánea que busca, puede utilizar el botón {{< ui >}}Choose Another Replay{{< /ui >}} para seleccionar otra reproducción de la misma visualización.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Seleccione un fondo diferente haciendo clic en el botón Cambiar instantánea" video=true >}}

### En la lista de acciones al lado de mi mapa de calor, veo un icono que muestra un elemento que no es visible en el mapa de calor. {#on-the-action-list-on-the-side-of-my-heatmap-i-see-an-icon-showing-an-element-that-is-not-visible-in-the-heatmap}

La información sobre herramientas del icono indica que el elemento no es visible. Esto significa que el elemento es una acción común en su página, pero no se muestra en la instantánea del mapa de calor. Para ver ese elemento, puede hacer clic en {{< ui >}}Change Snapshot{{< /ui >}} en la esquina superior derecha para cambiar la instantánea de su mapa de calor a una en la que ese elemento esté presente.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="Elementos ocultos en la lista de acciones en un mapa de calor." style="width:100%;">}}

### Después de intentar crear un mapa de calor, veo que aparece un estado de "No hay datos de reproducción". {#after-attempting-to-create-a-heatmap-i-see-a-no-replay-data-state-appear}

El estado "No hay datos de reproducción" significa que Datadog no pudo encontrar ninguna Session Replay para usar como fondo del mapa de calor. Causas comunes:

- El marco de tiempo seleccionado es anterior a su retención de Session Replay, que es de 30 días de forma predeterminada. Los datos de clics aún pueden existir, pero no queda ninguna reproducción para usar como fondo. Consulte [Análisis de mapas de calor más allá de la retención de Session Replay](#analyzing-heatmaps-beyond-replay-retention).
- Ninguna reproducción coincide con sus filtros de búsqueda actuales.
- Comenzó a grabar recientemente con el [Browser SDK][2] y la reproducción aún no está disponible. Esto puede tardar unos minutos.

### Después de intentar crear un mapa de calor, veo que aparece un estado de "No hay suficientes datos para generar un mapa de calor". {#after-attempting-to-create-a-heatmap-i-see-a-not-enough-data-to-generate-a-heatmap-state-appear}

Esto significa que Datadog no pudo hacer coincidir ninguna acción del usuario con la reproducción seleccionada actualmente. Esto sucede por diversas razones, tales como:

- Su aplicación no está utilizando la versión más reciente del SDK (>= 4.20.0).
- Su página ha cambiado drásticamente hace poco. 

### Toda la información del usuario en la página está vacía. {#all-of-the-user-information-on-the-page-is-empty}

La información del usuario no se recopila de forma predeterminada. Los mapas de calor utilizan la información del usuario disponible en sus datos de sesión para mostrar información relevante sobre el comportamiento.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: /es/real_user_monitoring/explorer/
[4]: /es/product_analytics/charts/analytics_explorer/
[5]: /es/session_replay/privacy_options?platform=browser#privacy-options
[6]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /es/data_security/data_retention_periods/
[8]: /es/session_replay/#extend-data-retention