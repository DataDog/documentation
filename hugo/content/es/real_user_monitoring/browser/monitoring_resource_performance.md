---
description: Rastrea el rendimiento de los recursos web, incluidos los activos de
  XHR, Fetch, imágenes, CSS y JavaScript, con datos de temporización detallados e
  identificación del proveedor.
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring (RUM)
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Explora tus vistas dentro de Datadog
- link: /real_user_monitoring/explorer/visualize/
  tag: Documentación
  text: Aplica visualizaciones a tus eventos
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentación
  text: Dashboards de RUM
title: Monitorizar el rendimiento de los recursos
---

El SDK de RUM Browser recopila recursos y activos para cada vista de RUM (carga de página): solicitudes de [XMLHttpRequest][1] (XHR) y de Fetch, además de imágenes, archivos CSS, activos de JavaScript y archivos de fuentes. Para cada uno de ellos, se genera un evento de recurso de RUM, con tiempos y metadatos detallados.

Los recursos de RUM heredan de todo el contexto relacionado con la vista de RUM activa en el momento de la recopilación.

## Vincular recursos de RUM a trazas de APM

Para obtener una visibilidad de extremo a extremo aún más completa de las solicitudes según van moviéndose a través de las capas de tu stack tecnológico, conecta tus datos de RUM con las trazas (traces) de backend correspondientes. Al hacerlo, podrás:

* Localizar problemas de backend que hayan dado lugar a un error para el usuario.
* Identificar hasta qué punto se ven afectados los usuarios por un problema de tu stack tecnológico.
* Consultar solicitudes de extremo a extremo completas en las gráficas de llamas, lo que te permitirá navegar sin problemas entre RUM y APM y a la inversa, con un contexto preciso.

Consultar [Conectar RUM y trazas ][2] para obtener información sobre cómo configurar esta función.

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="Información de trazas de APM para un recurso de RUM" >}}

## Atributos del recurso

Los datos de tiempo de red detallados para recursos se recopilan con los métodos de navegador nativos Fetch y XHR y con la [API de Performance Resource Timing][3].

| Atributo                      | Tipo           | Descripción                                                                                                                                |
| ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `resource.duration`            | número         | Tiempo total empleado en cargar el recurso.                                                                                                    |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                                                             |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | número (ns)    | Tiempo transcurrido para el apretón de manos de TLS. Si la última solicitud no es en HTTPS, este atributo no aparece (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera empleado para recibir el primer byte de respuesta (responseStart - RequestStart).                                           |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                                                                         |

**Nota**: Si tienes problemas para recopilar los tiempos detallados de algunos recursos, consulta [Recursos de origen cruzado](#cross-origin-resources).

## Atributos del recurso

| Atributo                  | Tipo   | Descripción                                                                                       |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `resource.type`            | cadena | El tipo de recurso que se recopila (por ejemplo, `css`, `javascript`, `media`, `XHR`, `image`). |
| `resource.method`          | cadena | El método HTTP (por ejemplo, `POST`, `GET`).                                                      |
| `resource.status_code`     | número | El código de estado de la respuesta.                                                                         |
| `resource.url`             | cadena | La URL del recurso.                                                                                 |
| `resource.url_host`        | cadena | La parte de host de la URL.                                                                         |
| `resource.url_path`        | cadena | La parte de ruta de la URL.                                                                         |
| `resource.url_query`       | objeto | Las partes de la cadena de consulta de la URL desglosadas como atributos de clave/valor de parámetros de consulta.                |
| `resource.url_scheme`      | cadena | El nombre del protocolo de la URL (HTTP o HTTPS).                                                     |
| `resource.provider.name`   | cadena | El nombre del proveedor de recursos. Por defecto es `unknown`.                                                 |
| `resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                                     |
| `resource.provider.type`   | cadena | El tipo de proveedor de recursos (por ejemplo, `first-party`, `cdn`, `ad`, `analytics`).                 |

**Nota**: Algunos campos pueden no estar disponibles en todos los navegadores. Por ejemplo, `resource.status_code` no está disponible en Safari, consulta [Compatibilidad de navegadores][3].

## Identificar recursos de terceros

RUM infiere el nombre y la categoría del proveedor de recursos de la parte de host de la URL del recurso. Si el host de la URL del recurso coincide con el host de la URL de la página actual, la categoría se configura en `first party`. En caso contrario, la categoría será `cdn`, `analytics` o `social`, por ejemplo.

## Recursos de origen cruzado

Determinados tiempos y atributos de los recursos se recopilan mediante la [API de tiempo de recursos][4]. Sin embargo, cuando un recurso se origina en una URL diferente a la de la página actual (por ejemplo, una aplicación web alojada en `www.example.com` que carga recursos de `static.example.com`), la política de seguridad del navegador restringe el acceso a parte de esta información.

### Tiempos de los recursos

Para recopilar los tiempos detallados de los recursos, añade el encabezado de respuesta HTTP `Timing-Allow-Origin` a tus recursos entre orígenes. Por ejemplo, para conceder acceso a la temporización del recurso a cualquier origen, utiliza `Timing-Allow-Origin: *`. Para obtener más información sobre CORS, consulta [Información de temporización entre orígenes][5] en Documentos web de MDN.

### Código de estado del recurso

Para recopilar el código de estado del recurso, añade el encabezado de respuesta HTTP `Access-Control-Allow-Origin` y el atributo `crossorigin` al las etiquetas (tags) de HTML correspondientes para permitir el acceso a los recursos entre orígenes. Por ejemplo, para permitir el acceso al código de estado del recurso a cualquier origen, utiliza `Access-Control-Allow-Origin: *` y añade `crossorigin="anonymous"` a tus etiquetas (tags) de HTML. Para más información, consulta el encabezado [`Access-Control-Allow-Origin`][6] y el atributo [`crossorigin`][7] en los Documentos web de MDN.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseStatus#browser_compatibility
[4]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing#cross-origin_timing_information
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
[7]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin