---
description: Los mapas de calor son un tipo de visualización que te permite ver dónde
  hacen clic los usuarios en tu sitio web.
further_reading:
- link: /product_analytics/session_replay/browser/
  tag: Documentación
  text: Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: Blog
  text: Visualizar las interacciones de los usuarios con tus páginas utilizando Scrollmaps
    en mapas de calor de Datadog
title: Mapas de calor
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
Todas las funciones de Análisis de productos tienen disponibilidad limitada. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="Información general de la funcionalidad del mapa de calor." style="width:100%;">}}

Un heatmap (o mapa de calor) es una visualización de las interacciones de tus usuarios superpuesta a los datos de Session Replay. Análisis de producto dispone de tres tipos diferentes de mapas de calor:

- **Mapas de clics:** consulta las interacciones de los usuarios (clics) para comprender cómo interactúan con tu página.
- **Elementos principales:** permite ver una clasificación de los 10 elementos con los que más se interactuó en una página determinada.
- **Mapas de desplazamiento:** ve hasta dónde se desplazan los usuarios por una página, incluyendo dónde se encuentra el pliegue medio de una página. El pliegue medio es el punto más bajo de una página que un usuario puede ver en su dispositivo sin desplazarse.

Utiliza mapas de calor para revisar datos complejos de un vistazo y obtener información para optimizar la experiencia del usuario.

## Requisitos previos

Para empezar con los mapas de calor:

1. Verifica la versión de tu SDK:
  - Para los mapas de clics, debes tener la última versión del SDK (v4.40.0 o posterior).
  - Para los mapas de desplazamiento, debes tener (v4.50.0 o posterior).
2. Activa [Session Replay][1].
3. Configura `trackUserInteractions: true` en la inicialización del SDK para habilitar el seguimiento de acciones (necesario para los mapas de clics).

## Para empezar

Ve a [**Digital Experience > Product Analytics > Heatmaps**][2] (Experiencia digital > Análisis de productos > Mapas de calor). Selecciona tu aplicación y visualízala.

En la [página de inicio del Análisis de producto][3], selecciona tu aplicación y visualízala. También puedes seleccionar el tipo de mapa de calor que deseas ver (Elementos principales, Mapa de clics, Mapa de desplazamiento).

{{< img src="product_analytics/heatmaps/heatmaps-pa.png" alt="Selecciona una aplicación para ver sus mapas de calor" style="width:100%;" >}}

Esto te lleva a la [página del mapa de calor][2] para una vista en particular. Puedes cambiar la vista que se muestra con los selectores **View Name** (Nombre de la vista) y **Application** (Aplicación) de la parte superior. Para añadir filtros más detallados, como una geografía específica por ejemplo, puedes añadir un filtro desde el panel de la izquierda.

{{< img src="real_user_monitoring/heatmaps/heatmaps-filters-v2.png" alt="Muestra el selector para elegir una aplicación y una vista de las opciones en las que hayas activado Session Replay." style="width:100%;">}}

## Mapas de clics

Un mapa de clics muestra las acciones con las que más se ha interactuado en una vista determinada agregando las acciones de clic de las sesiones y visualizándolas como manchas en el mapa.

{{< img src="real_user_monitoring/heatmaps/heatmap_v3.png" alt="Datos de mapas de clics superpuestos en un sitio web." style="width:60%;">}}

Cada mapa de clics también ofrece análisis como:

- Posición que ocupa esa página entre todas las demás páginas visitadas
- Recuento de usuarios único en esa página
- Cualquier señal de frustración en esa página

Debajo del panel están todas las acciones que ocurrieron en la página, enumeradas por frecuencia. Al hacer clic en una acción, puedes obtener más información sobre esa interacción, por ejemplo:

- El número de veces que el usuario realizó la acción y su posición en el análisis general de las principales acciones de una página determinada.
- Si en esa acción se produjo una señal de frustración (por ejemplo, si un usuario hizo un clic de ira en ese botón), también puedes ver las señales de frustración asociadas.

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="Muestra un ejemplo de acción y la información que puedes obtener sobre esa acción." style="width:60%;">}}

## Elementos principales

Los mapas de calor de Elementos principales agregan acciones de clic en una vista determinada, mostrando los elementos con los que más se interactuó y su clasificación. La clasificación en el propio mapa corresponde al nombre de la acción en la parte lateral.

{{< img src="real_user_monitoring/heatmaps/top-elements-v3.png" alt="Clasificación de los elementos principales en los que se hicieron más clics en una página" style="width:100%;">}}

Haz clic en cualquier nombre de acción del panel para resaltar la acción correspondiente en el mapa.

## Mapas de desplazamiento

Los mapas de desplazamiento muestran una imagen de la actividad de desplazamiento agregada en una página determinada. Utiliza los mapas de desplazamiento para ver dónde se encuentra el pliegue medio de la página y cuántos usuarios se desplazan hasta una profundidad determinada. Puedes arrastrar la barra azul flotante de un mapa de desplazamiento hasta la profundidad que quieras evaluar.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-v3.png" alt="Mapa de desplazamiento de una página de artículos para camas en una aplicación de comercio electrónico de ejemplo" style="width:100%;">}}

El panel situado a la izquierda del mapa de desplazamiento proporciona información muy clara con enlaces directos a los resultados de la consulta, como un enlace a una lista de las visualizaciones en las que el usuario se desplazó más allá de un percentil determinado. Debajo del panel de información hay un minimapa de la página y un gráfico de distribución que muestra datos de desplazamiento detallados, útiles para identificar dónde se producen los mayores abandonos de la página.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-insights-panel.png" alt="Captura de pantalla de las consultas de información de datos de desplazamiento" style="width:50%;">}}

## Fondos

Un fondo es un snapshot de una Session Replay. Cada mapa de calor recupera los 20 fondos que desencadenaron más acciones durante una sesión determinada. Al cambiar el fondo se obtienen resultados diferentes en función del fondo seleccionado. Puedes utilizar el botón **Choose Background** (Elegir fondo) para seleccionar un fondo concreto para tu mapa de calor.

La lista de fondos de un mapa de calor no puede modificarse.

## Siguientes pasos

Después de entender los análisis, el siguiente paso es comprender la acción en el contexto de otros datos fuera de los mapas de calor. Esto puede significar pasar al [Analytics Explorer][4]. También puedes ver las [repeticiones de sesión][1] asociadas para ver visualmente a un usuario realizando la acción en el contexto de su sesión global.

## Solucionar problemas

### Estoy viendo un mapa de calor para una vista determinada, pero me muestra una página inesperada.

Los mapas de calor se basan en nombres de vistas del Análisis de productos. Según cómo esté configurada tu aplicación de Análisis de productos, muchas páginas pueden empezar a agruparse bajo el mismo nombre de vista o podrías empezar a tener nombres de vista específicos.

### La vista que seleccioné no muestra el contenido inicial.

Los mapas de calor se generan a partir de los datos de Session Replay. El algoritmo inteligente de Datadog selecciona la repetición más reciente y que mejor coincide con el estado inicial de la página. En algunos casos, es posible que no puedas encontrar la repetición correcta. Para cambiar el [fondo](#backgrounds) de tu mapa de calor, puedes utilizar el botón **Choose Background** (Elegir fondo) para navegar por los diferentes estados de la página y encontrar aquel que buscas.

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="Seleccionar un fondo diferente utilizando el botón de selección de fondos" video=true >}}

### En la lista de acciones de la parte lateral de mi mapa de calor veo un icono que muestra un elemento que no es visible en el mapa de calor.

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-elements.png" alt="Elementos ocultos en la lista de acciones de un mapa de calor." style="width:60%;">}}

El globo del icono dice **element is not visible** (elemento no visible). Esto significa que el elemento es una acción común en tu página, pero no se muestra en el fondo del mapa de calor. Para ver ese elemento, puedes hacer clic en **Choose Background** (Elegir fondo) en la esquina inferior derecha para cambiar el fondo de tu mapa de calor a uno en el que ese elemento esté presente. 

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