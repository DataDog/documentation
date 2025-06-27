---
aliases:
- /es/product_analytics/heatmaps
description: Los mapas de calor son un tipo de visualización que te permite ver dónde
  hacen clic los usuarios en tu sitio web.
further_reading:
- link: /product_analytics/session_replay/browser/
  tag: Documentación
  text: Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: Blog
  text: Visualizar las interacciones de los usuarios con tus páginas utilizando mapas
    de desplazamientos en mapas de calor de Datadog
title: Mapas de calor
---
## Información general
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="Información general de la funcionalidad del mapa de calor." style="width:100%;">}}

Un heatmap (o mapa de calor) es una visualización de las interacciones de tus usuarios superpuesta a los datos de Session Replay. Análisis de producto dispone de tres tipos diferentes de mapas de calor:

- **Mapas de clics:** Consulta las interacciones de los usuarios (clics) para comprender cómo interactúan con tu página.
- **Principales elementos:** Visualiza una clasificación de los 10 elementos con los que más se interactuó en una página.
- **Mapas de desplazamiento:** Observa hasta dónde se desplazan los usuarios por una página, incluyendo dónde se encuentra el pliegue medio de una página. El pliegue medio es el punto más bajo de una página que un usuario puede ver en su dispositivo sin desplazarse.

Utiliza mapas de calor para revisar datos complejos de un vistazo y obtener información para optimizar la experiencia del usuario.

## Requisitos previos

Para empezar con los mapas de calor:

1. Verifica la versión de tu SDK:
   - Para los mapas de clics, debes tener la última versión del SDK (v4.40.0 o posterior).
   - Para los mapas de desplazamiento, debes tener (v4.50.0 o posterior).
2. Activa [Session Replay][1].
3. Configura `trackUserInteractions: true` en la inicialización del SDK para habilitar el seguimiento de acciones (necesario para los mapas de clics).

## Empezando

Ve a [**Experiencia digital > Análisis de productos > Session Replay > Mapas de calor**][2]. Selecciona tu aplicación y visualízala.

En esta página, puedes seleccionar el tipo de mapa de calor (Elementos principales, Mapa de clics, Mapa de desplazamientos) del que quieres ver una vista concreta.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="Para cada vista, puedes seleccionar un tipo de mapa de calor diferente: Elementos principales, Mapa de clics, Mapa de desplazamientos." style="width:100%;">}}

Haz clic en el nombre de una vista para ver con más detalle el mapa de calor correspondiente. A partir de aquí, tienes estas opciones de vista adicionales:

- Para cambiar la vista que se muestra, utiliza los selectores **Nombre de la vista** y **Aplicación** de la parte superior.
- Para cambiar la vista del dispositivo, utiliza el selector **Tipo de dispositivo**.
- Para filtrar por el nombre de acción, utiliza el desplegable **Filtrar acciones por**.
- Para añadir filtros más granulares, como una geografía específica, por ejemplo, haz clic en el botón **Add Filter** (Añadir filtro).

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="La página de mapas de calor tiene diferentes formas de mostrar diferentes vistas: por aplicación, tipo de mapa, tipo de dispositivo, nombre de acción y filtros granulares." style="width:100%;">}}

## Elementos principales

Los mapas de calor de Elementos principales agregan las acciones de clic en una vista determinada, mostrando los elementos con los que más se interactúa, además de su clasificación de interacción. La clasificación en el propio mapa corresponde al nombre de acción al lado.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="Clasificación de los elementos de una página en los que más clics se hicieron." style="width:100%;">}}

Pasa el ratón por encima de cualquier nombre de acción del panel para resaltar la acción correspondiente en el mapa.

## Mapas de clics

Un mapa de clics te muestra las acciones con las que más se interactuó en una vista determinada, agregando acciones de clic de las sesiones y visualizándolas como manchas en el mapa.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="Datos de mapas de clics superpuestos en un sitio web." style="width:100%;">}}

A la izquierda hay una lista de todas las acciones que ocurrieron en la página, enumeradas por frecuencia. Al hacer clic en una acción, puedes obtener más información sobre esa interacción, por ejemplo:

- El número de veces que el usuario realizó la acción y su posición en el análisis general de las principales acciones de una página determinada.
- Si en esa acción se produjo una señal de frustración (por ejemplo, si un usuario hizo un clic de ira en ese botón), también puedes ver las señales de frustración asociadas.

En esta vista, también puedes hacer clic en el botón **Start a Funnel** (Iniciar embudo) para identificar el abandono de los usuarios.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="Muestra una acción de ejemplo y la información que puedes obtener sobre esa acción." style="width:50%;">}}

## Mapas de desplazamiento

Los mapas de desplazamiento muestran una imagen de la actividad de desplazamiento agregada en una página determinada. Utiliza los mapas de desplazamiento para ver dónde se encuentra el pliegue medio de la página y cuántos usuarios se desplazan hasta una profundidad determinada. Puedes arrastrar la barra azul flotante de un mapa de desplazamiento hasta la profundidad que quieras evaluar.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="Mapa de desplazamientos de la página de destino en una aplicación de comercio electrónico de ejemplo" style="width:100%;">}}

El panel situado a la izquierda del mapa de desplazamiento proporciona información muy clara con enlaces directos a los resultados de la consulta, como un enlace a una lista de las visualizaciones en las que el usuario se desplazó más allá de un percentil determinado. Debajo del panel de información hay un minimapa de la página y un gráfico de distribución que muestra datos de desplazamiento detallados, útiles para identificar dónde se producen los mayores abandonos de la página.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="Captura de pantalla de las consultas de la información de datos de desplazamiento" style="width:50%;">}}

## Snapshots

Un snapshot es el estado de una Session Replay en un momento determinado. Cambiar el snapshot muestra resultados diferentes, dependiendo del snapshot seleccionado. Puedes utilizar el botón **Change Snapshot** (Cambiar snapshot) para seleccionar un snapshot concreto en una repetición para tu mapa de calor.

Para seleccionar un snapshot de fondo:

1. En la vista de mapa de calor, haz clic en el botón **Change Snapshot** (Cambiar snapshot).

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-snapshot-button.png" alt="Haz clic en el botón Cambiar snapshot para cambiar el snapshot de fondo en el que está basado el mapa de calor." style="width:100%;">}}
1. Haz clic en un evento de acción a la derecha para seleccionar un snapshot diferente para tu mapa de calor.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events.png" alt="Lista de eventos de acción para la Session Replay." style="width:100%;">}}

1. Si la sesión [no contiene la acción](#the-view-that-i-selected-is-not-showing-the-initial-content) que lleva al snapshot deseado, puedes volver a la lista de repeticiones haciendo clic en **Choose Another Replay** (Elegir otra repetición).
1. Haz clic en el botón **Select Snapshot** (Seleccionar snapshot) para aplicar el snapshot en el punto pausado al mapa de calor.

## Siguientes pasos

Después de entender los análisis, el siguiente paso es comprender la acción en el contexto de otros datos fuera de los mapas de calor. Esto puede significar pasar al [Analytics Explorer][4]. También puedes ver las [repeticiones de sesión][1] asociadas para ver visualmente a un usuario realizando la acción en el contexto de su sesión global.

## Solucionar problemas

### Estoy viendo un mapa de calor para una vista determinada, pero me muestra una página inesperada.

Los mapas de calor se basan en nombres de vistas del Análisis de productos. Según cómo esté configurada tu aplicación de Análisis de productos, muchas páginas pueden empezar a agruparse bajo el mismo nombre de vista o podrías empezar a tener nombres de vista específicos.

### La vista que seleccioné no muestra el contenido inicial.

Los mapas de calor se generan con los datos de Session Replay. El algoritmo inteligente de Datadog selecciona la repetición más reciente y la que mejor se ajusta al estado inicial de la página. En algunos casos, puede que no encuentres la repetición correcta. Para cambiar el snapshot de tu mapa de calor, puedes utilizar el botón **Change Snapshot** (Cambiar snapshot) para navegar por los diferentes estados de una repetición y encontrar la que estás buscando. Si la repetición que estás viendo no tiene el snapshot que buscas, puedes utilizar el botón **Choose Another Replay** (Elegir otra repetición) para seleccionar otra repetición de la misma vista.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Selecciona un fondo diferente al hacer clic en el botón Cambiar snapshot" video=true >}}

### En la lista de acciones en el lado de mi mapa de calor, veo un icono que muestra un elemento que no es visible en el mapa de calor.

El globo del icono dice que el elemento no es visible. Esto significa que el elemento es una acción común en tu página, pero no se muestra en el snapshot en el mapa de calor. Para ver ese elemento, puedes hacer clic en **Change Snapshot** (Cambiar snapshot) en la esquina superior derecha para cambiar el snapshot de tu mapa de calor a uno en el que esté presente ese elemento.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="Elementos ocultos en la lista de acciones del mapa de calor." style="width:100%;">}}

### Después de intentar crear un mapa de calor, veo que aparece el estado "No Replay Data". 

Esto significa que Datadog no logró encontrar ninguna Session Replay para utilizarla como un fondo del mapa de calor que coincida con los filtros actuales de búsqueda. Si acabas de empezar a grabar sesiones con el [SDK del navegador][5], puede que la Session Replay tarde unos minutos en estar disponible para su visualización.

### Después de intentar crear un mapa de calor, veo que aparece el estado "Not enough data to generate a heatmap" (No hay suficientes datos para generar un mapa de calor).

Esto significa que Datadog no ha podido emparejar ninguna acción del usuario con la repetición seleccionada en ese momento. Esto ocurre por varias razones, como por ejemplo:

- Tu aplicación no está utilizando la última versión del SDK (v4.20.0 o posterior).
- Tu página cambió drásticamente en los últimos tiempos. 

### Toda la información del usuario en la página está vacía.

La información del usuario no se recopila por defecto. Los mapas de calor utilizan la información de usuario disponible en tus datos de sesión para mostrar información relevante sobre el comportamiento.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/product_analytics/session_replay/browser/
[2]: https://app.datadoghq.com/product-analytics/heatmap
[3]: https://app.datadoghq.com/product-analytics/summary
[4]: /es/product_analytics/analytics_explorer/
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json