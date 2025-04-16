---
aliases:
- /es/real_user_monitoring/data_collected/
- /es/real_user_monitoring/data_collected/view/
- /es/real_user_monitoring/data_collected/resource/
- /es/real_user_monitoring/data_collected/long_task/
- /es/real_user_monitoring/data_collected/error/
- /es/real_user_monitoring/data_collected/user_action/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Presentamos Real User Monitoring (RUM) de Datadog
- link: /real_user_monitoring/browser/advanced_configuration
  tag: Documentación
  text: Modificar datos de RUM y añadir contexto
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explorar tus vistas en Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplicar visualizaciones a tus eventos
- link: /logs/log_configuration/attributes_naming_convention
  tag: Documentación
  text: Atributos estándar de Datadog
title: Datos de RUM Browser recopilados
---

## Información general

El SDK de RUM Browser genera eventos que tienen métricas y atributos asociados. Cada evento de RUM tiene todos los [atributos predeterminados](#default-attributes), por ejemplo, la URL de la página (`view.url`) y la información del usuario, como su tipo de dispositivo (`device.type`) y su país (`geo.country`).

Hay [métricas y atributos adicionales específicos de un tipo de evento determinado] (#event-specific-metrics-and-attributes). Por ejemplo, la métrica `view.loading_time` está asociada con eventos de vistas y el atributo `resource.method` está asociado con eventos de recursos.

| Tipo de evento     | Conservación | Descripción                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sesión   | 30 días   | Una sesión del usuario comienza cuando un usuario empieza a navegar por la aplicación web. Contiene información muy clara sobre el usuario (navegador, dispositivo, geolocalización). Añade todos los eventos de RUM recopilados durante el recorrido del usuario con un atributo `session.id` único. **Nota:** La sesión se reinicia después de 15 minutos de inactividad. |
| Vista      | 30 días   | Cada vez que un usuario visita una página de la aplicación web, se genera un evento de vista. Mientras el usuario permanece en la misma página, los eventos de recursos, tareas prolongadas, errores y acciones se vinculan con la vista de RUM relacionada con el atributo `view.id`.                       |
| Recurso  | 15 días   | Se genera un evento de recurso para bibliotecas de imágenes, XHR, Fetch, CSS o JS cargadas en una página web. Incluye información detallada sobre el tiempo de carga.                                                                                                              |
| Tarea prolongada | 15 días   | Se genera un evento de tarea prolongada para cualquier tarea del navegador que bloquee el subproceso principal durante más de 50 ms.                                                                                                                                                    |
| Error     | 30 días   | RUM recopila todos los errores de frontend que emite el navegador.                                                                                                                                                                                                     |
| Acción    | 30 días   | Los eventos de acciones de RUM rastrean interacciones de usuario durante un recorrido de usuario. Además, se pueden enviar manualmente para monitorizar acciones personalizadas del usuario.                                                                                                                                 |

El siguiente diagrama ilustra la jerarquía de eventos de RUM:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Jerarquía de eventos de RUM" style="width:50%;border:none" >}}

## Atributos predeterminados

Consulta una lista completa de [Atributos estándar][1] para el RUM Browser. De forma predeterminada, los atributos se adjuntan a cada tipo evento, por lo que puedes utilizarlos independientemente del tipo de evento de RUM que se esté consultando.

## Métricas y atributos específicos de un evento

### Métricas de la sesión

| Métrica  | Tipo   | Descripción                |
|------------|--------|----------------------------|
| `session.time_spent` | número (ns) | Duración de la sesión de usuario. |
| `session.view.count`        | número      | Total de vistas recopiladas para esta sesión. |
| `session.error.count`      | número      | Total de errores recopilados para esta sesión.  |
| `session.resource.count`         | número      | Total de recursos recopilados para esta sesión. |
| `session.action.count`      | número      | Total de acciones recopiladas para esta sesión. |
| `session.long_task.count`      | número      | Total de tareas largas recopiladas para esta sesión. |

### Atributos de la sesión

| Nombre del atributo                 | Tipo   | Descripción                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | cadena | ID generado aleatoriamente para cada sesión.                                                                      |
| `session.ip`                      | cadena | Dirección IP del cliente. Si deseas dejar de recopilar este atributo, cambia la configuración en tus [detalles de la aplicación][2].                                                                       |
| `session.is_active`                      | booleano | Indica si la sesión está activa en este momento. La sesión termina después de 4 horas de actividad o de 15 minutos de inactividad.                                                                     |
| `session.type`                     | cadena | El tipo de sesión: `user` o `synthetics`. Las sesiones de [Tests del navegador de monitorización Sintético][3] se excluyen de la facturación. |
| `session.referrer`                | cadena | La URL de la página web anterior desde la que se siguió un vínculo a la página solicitada actualmente. |
| `session.initial_view.id`        | cadena | El ID de la primera vista de RUM generada por el usuario. |
| `session.initial_view.url_host`        | cadena | La parte de host de la URL. |
| `session.initial_view.url_path`        | cadena | La parte de ruta de la URL. |
| `session.initial_view.url_path_group`  | cadena | El grupo de URL automático generado para URL similares (por ejemplo, `/dashboard/?` para `/dashboard/123` y `/dashboard/456`). |
| `session.initial_view.url_query` | objecto | Las partes de la cadena de consulta de la URL desglosadas como atributos de clave/valor de parámetros de consulta. |
| `session.initial_view.url_scheme` | objecto | La parte de esquema de la URL. |
| `session.last_view.id`        | cadena | El ID de la última vista de RUM generada por el usuario. |
| `session.last_view.url_host`        | cadena | La parte de host de la URL. |
| `session.last_view.url_path`        | cadena | La parte de ruta de la URL. |
| `session.last_view.url_path_group`  | cadena | El grupo de URL automático generado para URL similares (por ejemplo, `/dashboard/?` para `/dashboard/123` y `/dashboard/456`). |
| `session.last_view.url_query` | objecto | Las partes de la cadena de consulta de la URL desglosadas como atributos de clave/valor de parámetros de consulta. |
| `session.last_view.url_scheme` | objecto | La parte de esquema de la URL. |

### Métricas de tiempo de vista

**Nota**: Las métricas de tiempo de vista incluyen el tiempo que una página permanece abierta en segundo plano.

| Atributo                       | Tipo        | Descripción                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | número (ns) | Tiempo dedicado a la vista actual.                                                                                                                                                                                       |
| `view.first_byte`               | número (ns) | Tiempo transcurrido hasta que se recibió el primer byte de la vista.                                                                                                |
| `view.largest_contentful_paint` | número (ns) | Tiempo durante la carga de la página en que se representa el objeto DOM más grande en la ventanilla (visible en la pantalla).                                                                                                |
| `view.largest_contentful_paint_target_selector` | cadena (selector CSS) | Selector CSS del elemento correspondiente a la pintura de mayor contenido.                                                                                     |
| `view.first_input_delay`        | número (ns) | Tiempo transcurrido entre la primera interacción de un usuario con la página y la respuesta del navegador.                                                                                                                             |
| `view.first_input_delay_target_selector`      | cadena (selector CSS) | Selector CSS del primer elemento con el que interactuó el usuario.                                                                                                                |
| `view.interaction_to_next_paint`| número (ns) | Duración máxima entre la interacción de un usuario con la página y la siguiente pintura.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| cadena (selector CSS) | Selector CSS del elemento asociado con la interacción más larga a la siguiente pintura.                                                                                                          |
| `view.cumulative_layout_shift`  | número      | Cuantifica el movimiento de página inesperado debido al contenido que se carga dinámicamente (por ejemplo, anuncios de terceros), donde `0` significa que no está habiendo cambios.                                                                               |
| `view.cumulative_layout_shift_target_selector`  | cadena (selector CSS) | Selector CSS del elemento más desplazado que contribuye al CLS de la página.                                           |
| `view.loading_time`             | número (ns) | Tiempo hasta que la página está lista y no se está produciendo ninguna solicitud de red ni ninguna mutación del DOM. [Más información en Monitorización del rendimiento de la página][4].                                                                             |
| `view.first_contentful_paint`   | número (ns) | Momento en el que el navegador representa por primera vez cualquier texto, imagen (incluidas las imágenes de fondo), lienzo no blanco o SVG. Para obtener más información sobre la representación del navegador, consulta la [definición w3c][5].                               |
| `view.dom_interactive`          | número (ns) | Tiempo hasta que el analizador termina su trabajo en el documento principal. [Más información en la documentación de MDN][6].                                                                                                         |
| `view.dom_content_loaded`       | número (ns) | Tiempo hasta que se dispara el evento de carga y el documento HTML inicial se carga y se analiza completamente, sin esperar a que terminen de cargarse las hojas de estilo, imágenes y subfotogramas que no bloquean la representación. [Más información en la documentación de MDN][7]. |
| `view.dom_complete`             | número (ns) | Tiempo hasta que la página y todos los subrecursos estén listos. El indicador giratorio de carga ha dejado de girar para el usuario. [Más información en la documentación de MDN][8].                                                                       |
| `view.load_event`               | número (ns) | Tiempo hasta que se dispara el evento de carga, que indica que la página está completamente cargada. Suele ser un desencadenador de lógica adicional de la aplicación. [Más información en la documentación de MDN][9].                                                                             |
| `view.error.count`              | número      | Total de errores recopilados para esta vista.                                                                                                                                                                          |
| `view.long_task.count`          | número      | Total de tareas largas recopiladas para esta vista.                                                                                                                                                                       |
| `view.resource.count`           | número      | Total de recursos recopilados para esta vista.                                                                                                                                                                       |
| `view.action.count`             | número      | Total de acciones recopiladas para esta vista.                                                                                                                                                                         |

### Métricas de tiempo de recursos

Los datos detallados de temporización de red para la carga de los recursos de una aplicación se recopilan con la [API de temporización de recursos de rendimiento][10].

| Métrica                              | Tipo           | Descripción                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `resource.duration`            | número         | Tiempo total empleado en cargar el recurso.                                                                                                   |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                                                            |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | número (ns)    | Tiempo empleado por el protocolo TLS. Si la última solicitud no es en HTTPS, esta métrica no aparece (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera empleado para recibir el primer byte de respuesta (responseStart - RequestStart).                                           |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                                                                         |

### Atributos del recurso

| Atributo                  | Tipo   | Descripción                                                                                          |
|----------------------------|--------|------------------------------------------------------------------------------------------------------|
| `resource.type`            | cadena | El tipo de recurso que se recopila (por ejemplo, `css`, `javascript`, `media`, `XHR` o `image`). |
| `resource.method`          | cadena | El método HTTP (por ejemplo, `POST` o `GET`).                                                       |
| `resource.status_code`     | número | El código de estado de la respuesta (disponible solo para recursos fetch/XHR).                                   |
| `resource.url`             | cadena | La URL del recurso.                                                                                    |
| `resource.url_host`        | cadena | La parte de host de la URL.                                                                            |
| `resource.url_path`        | cadena | La parte de ruta de la URL.                                                                            |
| `resource.url_query`       | objecto | Las partes de la cadena de consulta de la URL desglosadas como atributos de clave/valor de parámetros de consulta.                   |
| `resource.url_scheme`      | cadena | El nombre del protocolo de la URL (HTTP o HTTPS).                                                        |
| `resource.provider.name`   | cadena | El nombre del proveedor de recursos. Por defecto es `unknown`.                                                    |
| `resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                                        |
| `resource.provider.type`   | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`).                |

### Métricas de tiempo de tareas largas

| Métrica  | Tipo   | Descripción                |
|------------|--------|----------------------------|
| `long_task.duration` | número | Duración de la tarea larga. |

### Atributos de errores

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | cadena | Origen del error (por ejemplo, `console`). Consulta [Fuentes de error][11].   |
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                   |
| `error.message` | cadena | Un mensaje conciso, legible, de una línea, en el cual se explica el evento. |
| `error.stack`   | cadena | La traza (trace) de stack tecnológico o la información adicional sobre el error.     |

#### Errores de origen

Los errores de origen incluyen información a nivel de código sobre el error. Para más información sobre los distintos tipos de error, consulta la [documentación de MDN][12].

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                   |

### Métricas del tiempo de acción

| Métrica    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.loading_time` | número (ns) | El tiempo de carga de la acción. Consulta cómo se calcula en la [Documentación de rastreo de acciones de usuario][13]. |
| `action.long_task.count`        | número      | Número de tareas largas recopiladas para esta acción. |
| `action.resource.count`         | número      | Número de recursos recopilados para esta acción. |
| `action.error.count`      | número      | Número de errores recopilados para esta acción.|

### Atributos de las acciones

| Atributo    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.id` | cadena | UUID de la acción del usuario. |
| `action.type` | cadena | Tipo de la acción del usuario. Para [Acciones personalizadas del usuario][14], se configura en `custom`. |
| `action.target.name` | cadena | Elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente. |
| `action.name` | cadena | Nombre de usuario creado (por ejemplo, `Click on #checkout`). Para [Acciones personalizadas del usuario][14], el nombre de la acción dado en la llamada a la API. |

### Campos de señales de frustración

| Campo                | Tipo   | Descripción                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | número | Total de señales de frustración asociadas con una sesión. |
| `view.frustration.count`        | número | Total de señales de frustración asociadas con una vista.    |
| `action.frustration.type:dead_click`  | cadena | Los clics sin efecto detectados por el SDK de RUM Browser.              |
| `action.frustration.type:rage_click`  | cadena | Los clics de frustración detectados por el SDK de RUM Browser.              |
| `action.frustration.type:error_click` | cadena | Los clics de error detectados por el SDK de RUM Browser.             |

### Atributos UTM

| Campo                | Tipo   | Descripción                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | cadena | El parámetro de la URL que rastrea la fuente de tráfico. |
| `view.url_query.utm_medium`        | cadena | El parámetro de la URL que rastrea el canal del que procede el tráfico.    |
| `view.url_query.utm_campaign`  | cadena | El parámetro de la URL que identifica la campaña de marketing específica vinculada a esa vista.              |
| `view.url_query.utm_content`  | cadena | El parámetro de la URL que identifica el elemento específico en el que un usuario ha hecho clic en una campaña de marketing.           |
| `view.url_query.utm_term` | cadena | El parámetro de la URL que rastrea la palabra clave que un usuario buscó para activar una campaña determinada.             |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/standard-attributes/?product=browser
[2]: /es/data_security/real_user_monitoring/#ip-address
[3]: /es/synthetics/browser_tests/
[4]: /es/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[11]: /es/real_user_monitoring/browser/collecting_browser_errors#error-sources
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[13]: /es/real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[14]: /es/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions