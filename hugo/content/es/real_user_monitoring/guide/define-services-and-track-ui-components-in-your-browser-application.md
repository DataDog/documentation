---
disable_toc: false
further_reading:
- link: /real_user_monitoring/browser/
  tag: Documentación
  text: Monitorización DE RUM Browser
title: Definir servicios y rastrear los componentes de interfaz de usuario en tu aplicación
  de navegador
---

## Información general

RUM captura eventos de tus aplicaciones de navegador y te permite explorarlas para solucionar problemas de páginas lentas y errores de código, o para analizar el uso de la aplicación. Todas las capturas de eventos están disponibles en [RUM Explorer][1] para su consulta, análisis y generación de alertas.

Si tu aplicación de navegación es grande, es probable que haya sido creada por varios equipos de desarrollo web. Cada equipo tiene un área de propiedad en la que se centran al solucionar problemas, lentitud, o analizar el uso.

Esta guía describe cómo definir una aplicación en RUM. Además, aborda casos de uso comunes en grandes aplicaciones donde los equipos de desarrollo web pueden requerir visibilidad del estado y el uso de su área de propiedad.

## Crear una aplicación RUM

El primer paso para rastrear y analizar tu aplicación de navegador es [crear una aplicación RUM][2]. Una aplicación RUM asigna una aplicación de navegador disponible en un dominio determinado que renderiza la experiencia de lo que los clientes percibirían como un sitio web.

## Rastrear páginas en tu aplicación de navegación

Tanto si tu aplicación de navegador es una aplicación de una sola página como si utilizas la renderización del lado del servidor, el SDK de RUM de navegador rastrea automáticamente los cambios de ruta y crea un evento de vista para cada cambio de ruta.

- Una vista tiene una **URL** disponible en `@view.url`, como `https://www.yourwebsite.com/about`.
- Una vista tiene una **ruta** disponible en `@view.url_path`, como `/about`.

Si, por ejemplo, la captura automática de vistas de páginas por cambio de ruta no proporciona suficiente visibilidad, puedes especificar un nombre diferente para tus páginas. Para ello, puedes [rastrear las vistas manualmente][3] y asignar a cada una de ellas un nombre disponible en `@view.name`, como "Sobre nosotros".

## Rastrear los tiempos durante el ciclo de renderizado de las páginas

El SDK del navegador realiza un rastreo automático de un conjunto de tiempos estándar del sector, Core Web Vitals, tiempos de carga de páginas [y mucho más][4].

Además, puedes hacer un rastreo del tiempo que tarda en renderizarse un elemento específico de la página, como una imagen o un componente. Puedes realizar un rastreo de más tiempos capturándolos en código y pegando los valores en los eventos de vista. Para obtener más información sobre cómo hacerlo, consulta la documentación sobre [cómo añadir tus propios tiempos de rendimiento][5].

Una vez capturados los tiempos, están disponibles como cualquier tiempo recopilado automáticamente. Puedes utilizar los tiempos para hacer lo siguiente:

- Analizar la distribución del tiempo entre las versiones del código en el RUM Explorer
- Solucionar posibles valores altos en la [vista de cascada][6]

## Rastrear componentes en páginas web

Si tu aplicación de navegador utiliza componentes de interfaz de usuario que están presentes en varias páginas de una aplicación o en varias aplicaciones, puedes utilizar instrumentación personalizada para realizar un rastreo del uso y el tiempo de renderización de estos componentes en todas las páginas.

[Genera una acción personalizada][7] para realizar un rastreo del ciclo de vida de los componentes a través de las páginas. Imaginemos que tanto la página `/myorders` como la página `/search` utilizan el componente del cuadro de búsqueda.

{{< img src="real_user_monitoring/guide/define-applications-servicios-components-rum/rum-guide-autofill.jpg" alt="Generar una acción personalizada para rastrear el ciclo de vida de componentes a través de páginas" style="width:30%;">}}

Puedes realizar un rastreo de los siguientes hitos en el ciclo de vida del componente de búsqueda enviando cada vez una acción personalizada:

- `search_component_render`: el componente de búsqueda renderiza
- `search_component_input`: el componente de búsqueda recibe entradas del teclado del usuario
- `search_component_suggestions_display`: el componente de búsqueda muestra sugerencias

La acción personalizada lleva entonces automáticamente atributos para:

- La aplicación RUM en la que se utilizó
- `@view`: la página en la que se renderizó
- `@geo`: información de geolocalización (si está activada)
- `@session`: el identificador de sesión del usuario

Con la instrumentación personalizada, se le puede asignar atributos a la acción personalizada para:

- El equipo al que pertenece
- El tiempo necesario para renderizar

```
datadogRum.addAction('search_component_render', {
    'team': 'Team A', // for example, 42.12
    'time_to_full_render': 16.5, // for example, ['tomato', 'strawberries']
})
```

A continuación, desde el RUM Explorer, puedes analizar:

- La página en la que más se utiliza un componente
- La aplicación del navegador en la que más se utiliza un componente
- El percentil P75 para el tiempo que tarda el componente en renderizarse completamente

## Rastrear la propiedad del equipo

### Los equipos poseen un conjunto de páginas

Imagina que un equipo de desarrollo web posee un conjunto de páginas como las del ejemplo siguiente.

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-track-team-ownership-2.png" alt="Ejemplos de conjuntos de páginas que podrían ser de propiedad de un equipo de desarrollo web" style="width:90%;">}}

Dentro de tu aplicación RUM, crea servicios para cada conjunto de páginas propiedad de un equipo haciendo lo siguiente:

1. Activa el rastreo manual de la vista con la opción de configuración `trackViewsManually` en `true`.
2. Para cada página de tu sitio web, asigna un nombre de vista y un servicio siguiendo [las instrucciones para anular los nombres de vista predeterminados de RUM][8].
   - Servicio `"purchase"` para las páginas disponibles en `/checkout`, `/payment`, `/confirmOrder`.
   - Servicio `"catalog"` para las páginas disponibles en `/beds`, `/chairs/123`, `/search`.
3. [Carga un mapa de fuentes para cada servicio][9] para ver stack traces sin minar en el Rastreo de errores.

Obtén información sobre el rendimiento o la adopción de un contexto de un determinado equipo utilizando el atributo `service` en RUM:

1. En la página de descripción general de la aplicación RUM, acota todos los gráficos en `service` para obtener una visión global del contexto del equipo
2. Cualquier consulta realizada en el RUM Explorer puede utilizar el atributo `service` para filtrar:
   - Errores por servicio
   - Vistas de páginas por servicio

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-rum-applications-overview-page-4.png" alt="Consulta de búsqueda para acciones agrupadas por nombre de usuario en la página de compra de Shopist" style="width:90%;">}}

### Componentes de interfaz de usuario propios de los equipos

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-team-owns-ui-components-2.png" alt="Los componentes pueden rastrearse mediante acciones personalizadas" style="width:90%;">}}

El rastreo de los componentes se realiza mediante las acciones personalizadas [mencionadas anteriormente][10]:

1. Añade un atributo de equipo dentro de la definición de la acción personalizada.
2. Registra el tiempo de carga y otros tiempos durante el ciclo de vida del componente como atributos en las acciones personalizadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/explorer/
[2]: /es/real_user_monitoring/browser/setup
[3]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[4]: /es/real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[5]: /es/real_user_monitoring/browser/monitoring_page_performance/#add-your-own-performance-timing
[6]: /es/real_user_monitoring/browser/monitoring_page_performance/#overview
[7]: /es/real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[8]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[9]: /es/real_user_monitoring/guide/upload-javascript-source-maps/?tabs=webpackjs#upload-your-source-maps
[10]: #track-components-in-web-pages