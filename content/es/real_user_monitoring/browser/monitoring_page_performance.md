---
further_reading:
- link: https://learn.datadoghq.com/courses/core-web-vitals-lab
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: métricas de Core Web Vitals'
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: Blog
  text: Monitor de métricas de Core Web Vitals con Datadog RUM y Monitorización Sintético
- link: https://www.datadoghq.com/blog/single-page-apps-inp/
  tag: Blog
  text: Monitorizar la interactividad de aplicaciones de una sola página con Core
    Web Vitals y Datadog
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplicar visualizaciones a tus eventos
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentación
  text: Información sobre los dashboards de RUM
title: Monitorizar el rendimiento de la página
---

## Información general

Los eventos de vistas de RUM recopilan una amplia telemetría de rendimiento de cada página vista. Monitoriza las páginas vistas de tu aplicación y explora la telemetría de rendimiento en dashboards y en el Explorador RUM.

{{< img src="real_user_monitoring/browser/waterfall-4.png" alt="Un gráfico de cascada en la pestaña de Rendimiento de una vista de RUM en el Explorador RUM" style="width:100%;" >}}

Puedes acceder a la telemetría de rendimiento de tus vistas en:

- Dashboards de [RUM][1] predefinidos que proporcionan una vista clara del rendimiento de tu aplicación. Por ejemplo, puedes filtrar por [atributos predeterminados][2] recopilados por RUM para evidenciar los problemas que afectan a un subconjunto de usuarios en el [dashboard de información general del rendimiento][3]. También puedes clonar este dashboard, personalizarlo según tus necesidades y utilizar cualquier telemetría de rendimiento de RUM (#all-performance-telemetry) en la consulta del dashboard.
- Una cascada de rendimiento, accesible para cada evento de vista de RUM en el [Explorador RUM][4], que te permite solucionar problemas de rendimiento de una vista de página específica. Muestra cómo los activos y recursos de tu sitio web, las tareas largas y los errores de frontend afectan al rendimiento a nivel de la página para tus usuarios finales.

## Tiempos de eventos y métricas de core web vitals

<div class="alert alert-danger">
  La telemetría de Core Web Vitals de Datadog está disponible en el paquete <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> v2.2.0 o posterior.
</div>

Los [Core Web Vitals de Google'][5] son un conjunto de tres KPI diseñados para monitorizar la experiencia de usuario de un sitio. Estos KPI se centran en ofrecer una visión del rendimiento de carga, la interactividad y la estabilidad visual. Cada KPI viene acompañado de una guía del rango de valores que se traducen en una buena experiencia de usuario. Datadog recomienda monitorizar el percentil 75 de estos KPI.

{{< img src="real_user_monitoring/browser/core-web-vitals-1.png" alt="Visualización del resumen de métricas de Core Web Vitals" >}}

- La interacción con la siguiente pintura y la pintura de mayor contenido no se recopilan para las páginas abiertas en segundo plano (por ejemplo, en una nueva pestaña o en una ventana sin foco).
- La telemetría recopilada a partir de las páginas vistas por tus usuarios reales puede diferir de aquella calculada para páginas cargadas en un entorno fijo y controlado, como un [test de navegador Synthetic][6]. Synthetic Monitoring muestra Largest Contentful Paint y Cumulative Layout Shift como telemetría de laboratorio, no como telemetría real.

| Punto de datos                   | Foco            | Descripción                                                                                           | Valor objetivo |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Pintura de mayor contenido][7] | Rendimiento de la carga | Momento en la línea de tiempo de carga de la página en el que se representa el objeto DOM más grande de la ventana gráfica (es decir, visible en pantalla).         | <2,5 s       |
| [Interacción con la siguiente pintura][19]| Interactividad    | Duración más prolongada entre la interacción de un usuario con la página y la siguiente pintura. Requiere SDK de RUM v5.1.0. | <200 ms        |
| [Desplazamiento de diseño acumulativo][9]  | Estabilidad visual | Cuantifica los desplazamientos inesperados de la página debido a contenidos cargados dinámicamente (por ejemplo, anuncios de terceros), donde 0 significa que no se producen desplazamientos. | <0,1        |

### Elementos objetivo de Core Web Vitals

Identificar qué elemento desencadenó un KPI de Core Web Vitals elevado es el primer paso para comprender la causa raíz y poder mejorar el rendimiento.
RUM informa del elemento asociado a cada instancia de Core Web Vitals:

- Para la pintura de mayor contenido, RUM informa del selector CSS del elemento correspondiente a la pintura de mayor contenido.
- Para la Interacción hasta la siguiente pintura, RUM informa del selector CSS del elemento asociado con la interacción más larga hasta la siguiente pintura.
- Para el retardo de la primera entrada, RUM informa del selector CSS del primer elemento con el que interactuó el usuario.
- Para el Desplazamiento de diseño acumulativo, RUM informa del selector CSS del elemento más desplazado que contribuye al CLS.

## Toda la telemetría de rendimiento

| Atributo                       | Tipo        | Descripción                                                                                                                                                                                                                      |
|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | número (ns) | Tiempo dedicado a la vista actual.                                                                                                                                                                                                  |
| `view.first_byte`               | número (ns) | Tiempo transcurrido hasta que se recibió el primer byte de la vista.                                                                                                |
| `view.largest_contentful_paint` | número (ns) | Momento en la línea de tiempo de carga de la página en el que el objeto DOM más grande de la ventana gráfica se representa y es visible en pantalla.                                                                                                               |
| `view.largest_contentful_paint_target_selector` | cadena (selector CSS) | Selector CSS del elemento correspondiente a la pintura de mayor contenido.                                                                                     |
| `view.first_input_delay`        | número (ns) | Tiempo transcurrido entre la primera interacción de un usuario con la página y la respuesta del navegador.                                                                                                                                        |
| `view.first_input_delay_target_selector`      | cadena (selector CSS) | Selector CSS del primer elemento con el que interactuó el usuario.                                                                                                                |
| `view.interaction_to_next_paint`| número (ns) | Duración máxima entre la interacción de un usuario con la página y la siguiente pintura.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| cadena (selector CSS) | Selector CSS del elemento asociado con la interacción más larga a la siguiente pintura.                                                                                                          |
| `view.cumulative_layout_shift`  | número      | Cuantifica el desplazamiento inesperado de la página debido al contenido cargado dinámicamente (por ejemplo, anuncios de terceros), donde 0 significa que no se están produciendo desplazamientos.                                                                                      |
| `view.cumulative_layout_shift_target_selector`  | cadena (selector CSS) | Selector CSS del elemento más desplazado que contribuye al CLS de la página.                                           |
| `view.loading_time`             | número (ns) | Tiempo hasta que la página está lista y no se está produciendo ninguna solicitud de red ni ninguna mutación del DOM. Para obtener más información, consulta [Monitorización del rendimiento de la página][10].                                                                          |
| `view.first_contentful_paint`   | número (ns) | Momento en el que el navegador representa por primera vez cualquier texto, imagen (incluidas las imágenes de fondo), lienzo no blanco o SVG. Para obtener más información sobre la representación del navegador, consulta la [definición w3c][11].                                         |
| `view.dom_interactive`          | número (ns) | Momento en el que el analizador sintáctico termina su trabajo en el documento principal. Para más información, consulta la [documentación de MDN][12].                                                                                                        |
| `view.dom_content_loaded`       | número (ns) | Evento activado cuando el documento HTML inicial está completamente cargado y analizado, sin esperar a que las hojas de estilo, imágenes y subfotogramas que no bloquean la representación terminen de cargarse. Para más información, consulta la [documentación de MDN][13]. |
| `view.dom_complete`             | número (ns) | La página y todos los subrecursos están listos. Para el usuario, el indicador giratorio de carga ha dejado de girar. Para más información, consulta la [documentación de MDN][14].                                                                     |
| `view.load_event`               | número (ns) | Evento activado cuando la página está completamente cargada. Suele ser un activador de una lógica de la aplicación adicional. Para más información, consulta la [documentación de MDN][15].                                                                            |
| `view.error.count`              | número      | Total de errores recopilados para esta vista.                                                                                                                                                                                     |
| `view.long_task.count`          | número      | Total de tareas largas recopiladas para esta vista.                                                                                                                                                                                  |
| `view.resource.count`           | número      | Total de recursos recopilados para esta vista.                                                                                                                                                                                  |
| `view.action.count`             | número      | Total de acciones recopiladas para esta vista.                                                                                                                                                                                    |

## Monitorización de aplicaciones de página única (SPA)

Para las aplicaciones de página única (SPA), el SDK del RUM Browser diferencia entre la navegación `initial_load` y `route_change` con el atributo `loading_type`. Si una interacción en tu página web conduce a una URL diferente sin una actualización completa de la página, el SDK de RUM inicia un nuevo evento de vista con `loading_type:route_change`. RUM realiza un rastreo de los cambios de URL mediante la [API del historial][16].

Datadog proporciona un KPI único, `loading_time`, que calcula el tiempo necesario para que se cargue una página. Este KPI funciona tanto para la navegación en `initial_load` como en `route_change`.

### Cómo se calcula el tiempo de carga

Para tener en cuenta las aplicaciones web modernas, el tiempo de carga vigila las solicitudes de red y las mutaciones del DOM.

- **Carga inicial**: El tiempo de carga es igual a _lo que sea más largo_:

  - La diferencia entre `navigationStart` y `loadEventEnd` o
  - La diferencia entre `navigationStart` y la primera vez que la página no tiene actividad. Lee [Cómo se calcula la actividad de la página](#how-page-activity-is-calculated) para más detalles.

- **Cambio de ruta SPA**: el tiempo de carga es igual a la diferencia entre el cambio de URL y la primera vez que la página no tiene actividad. Lee [Cómo se calcula la actividad de la página](#how-page-activity-is-calculated) para más detalles.

### Cómo se calcula la actividad de la página

El SDK del RUM Browser realiza un rastreo de la actividad de la página para estimar el tiempo que transcurrirá hasta que la interfaz vuelva a ser estable. Se considera que la página tiene actividad cuando:

- `xhr` o `fetch` solicitudes están en curso.
- El navegador emite entradas de tiempo de recursos de rendimiento (fin de carga de JS, CSS, etc.).
- El navegador emite mutaciones del DOM.

Se considera que la actividad de la página ha terminado cuando no ha tenido ninguna actividad durante 100 ms.

**Nota**: Solo se tiene en cuenta la actividad que se produce después de la inicialización del SDK.

**Caveats:**

El criterio de 100 ms desde la última solicitud o mutación del DOM podría no ser una determinación precisa de la actividad en los siguientes escenarios:

- La aplicación recopila datos analíticos enviando solicitudes a una API periódicamente o después de cada clic.
- La aplicación utiliza técnicas "[cometa][17]" (es decir, streaming o sondeo largo) y la solicitud permanece en espera durante un tiempo indefinido.

Para mejorar la precisión de la determinación de la actividad en estos casos, especifica `excludedActivityUrls`, una lista de recursos para que el SDK del RUM Browser los excluya al calcular la actividad de la página:

```JavaScript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        // Excluir URL exactas
        'https://third-party-analytics-provider.com/endpoint',

        // Excluir cualquier URL que termine en /comet
        /\/comet$/,

        // Excluir cualquier URL para la cual la función devuelva true
        (url) => url === 'https://third-party-analytics-provider.com/endpoint',
    ]
})
```

### Navegación en Hash SPA

El SDK del RUM monitoriza automáticamente los marcos que dependen de la navegación hash (`#`). El SDK busca `HashChangeEvent` y emite una nueva vista. Los eventos procedentes de una etiqueta (tag) de ancla HTML que no afectan al contexto de la vista actual se ignoran.

## Crear una telemetría de rendimiento personalizada

### Medir el rendimiento de los componentes con indicadores vitales personalizados

Utiliza la API `customVital` para medir el rendimiento de tu aplicación a nivel de componente. Por ejemplo, puedes medir cuánto tarda una parte de la página en renderizarse o cuánto tarda un componente en responder a una interacción del usuario. **Nota**: Los nombres de los indicadores vitales personalizados no pueden contener espacios ni caracteres especiales.

#### Mediciones de la duración de inicio y parada

Inicia una medición de duración llamando a `startDurationVital` y detén una medición con `stopDurationVital`:

```javascript
window.DD_RUM.startDurationVital("dropdownRendering")
window.DD_RUM.stopDurationVital("dropdownRendering")
```

Una vez que se llama al método `stopDurationVital`, la duración del indicador vital personalizado se envía a Datadog y puede consultarse mediante `@vital.name:dropdownRendering`. También se puede filtrar por duración, por ejemplo con `@vital.duration:>10`.

#### Utilizar referencias y descripciones

Utiliza la referencia devuelta por `startDurationVital` y especifica una cadena `description` para diferenciar entre instancias del mismo indicador vital personalizado en varias páginas. Por ejemplo, para realizar un seguimiento de la duración de `dropdownRendering` en la página `login`:

```javascript
const reference = window.DD_RUM.startDurationVital("dropdownRendering", { description: "login" })
window.DD_RUM.stopDurationVital(reference)
```

Este código agrupa por `@vital.description` para que puedas realizar un seguimiento del comportamiento de renderización del mismo componente en diferentes páginas.

También puedes añadir contexto a tu indicador vital personalizado con la propiedad `context`:

```javascript
window.DD_RUM.startDurationVital("dropdownRendering", {context: { clientId: "xxx" }})
window.DD_RUM.stopDurationVital("dropdownRendering")
```

#### Informar un indicador vital personalizado con `addDurationVital`

En lugar de establecer variables de indicadores vitales personalizados individualmente, puedes informar de un indicador vital personalizado en una sola operación mediante `addDurationVital`:

```javascript
window.DD_RUM.addDurationVital("dropdownRendering", {startTime: 1707755888000, duration: 10000})
```

### Rastreo de los tiempos de rendimiento adicionales

Además del tiempo de rendimiento por defecto de RUM, puedes medir dónde pasa el tiempo tu aplicación con mayor flexibilidad. La API `addTiming` te proporciona una forma sencilla de añadir un tiempo de rendimiento adicional.

Por ejemplo, puedes añadir un tiempo cuando tu imagen principal haya aparecido:

``html
<html>
  <body>
    <img onload="window.DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

O cuando los usuarios se desplazan por primera vez:

```javascript
document.addEventListener("scroll", function handler() {
    //Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

Una vez enviado el tiempo, este es accesible en nanosegundos como `@view.custom_timings.<timing_name>`, por ejemplo: `@view.custom_timings.first_scroll`. Debes [crear una medida][18] antes de crear una visualización en el Explorador RUM o en tus dashboards.

Para aplicaciones de página única, la API `addTiming` emite un tiempo relativo al inicio de la vista de RUM actual. Por ejemplo, si un usuario llega a tu aplicación (carga inicial), luego pasa a una página diferente después de 5 segundos (cambio de ruta) y finalmente activa `addTiming` después de 8 segundos, el tiempo es igual a `8-5 = 3` segundos.

Si estás utilizando una configuración asíncrona, puedes proporcionar tu propio tiempo (como una marca de tiempo de época UNIX) como segundo parámetro.

Por ejemplo:

```javascript
document.addEventListener("scroll", function handler() {
    //Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});

```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/platform/dashboards/
[2]: /es/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /es/real_user_monitoring/platform/dashboards/performance
[4]: /es/real_user_monitoring/explorer/
[5]: https://web.dev/vitals/
[6]: /es/synthetics/browser_tests/
[7]: https://web.dev/lcp/
[8]: https://web.dev/fid/
[9]: https://web.dev/cls/
[10]: /es/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[11]: https://www.w3.org/TR/paint-timing/#sec-terminology
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/History
[17]: https://en.wikipedia.org/wiki/Comet_&#40;programming&#41;
[18]: /es/real_user_monitoring/explorer/search/#setup-facets-and-measures
[19]: https://web.dev/inp/