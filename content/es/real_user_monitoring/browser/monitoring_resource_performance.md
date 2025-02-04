---
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

## Tiempos y métricas de recursos

Los datos de tiempo de red detallados para recursos se recopilan con los métodos de navegador nativos Fetch y XHR y con la [API de Performance Resource Timing][3].

| Atributo                              | Tipo           | Descripción                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `resource.duration`            | número         | Tiempo total empleado en cargar el recurso.                                                                                                   |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                                                            |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                                                           |
| `resource.ssl.duration`        | número (ns)    | Tiempo empleado por el protocolo TLS. Si la última solicitud no es en HTTPS, esta métrica no aparece (connectEnd - secureConnectionStart).|
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).                                              |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                                                                     |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera empleado para recibir el primer byte de respuesta (responseStart - RequestStart).                                           |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                                                                        |

**Nota**: Si tienes problemas para recopilar el tiempo detallado de algunos recursos, consulta [Tiempo de recursos y CORS](#resource-timing-and-cors).

## Atributos del recurso

| Atributo                      | Tipo   | Descripción                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | cadena | El tipo de recurso que se recopila (por ejemplo, `css`, `javascript`, `media`, `XHR`, `image`).           |
| `resource.method`                | cadena | El método HTTP (por ejemplo, `POST`, `GET`).           |
| `resource.status_code`             | número | El código de estado de la respuesta.                                                               |
| `resource.url`                     | cadena | La URL del recurso.                                                                       |
| `resource.url_host`        | cadena | La parte de host de la URL.                                                          |
| `resource.url_path`        | cadena | La parte de ruta de la URL.                                                          |
| `resource.url_query` | objecto | Las partes de la cadena de consulta de la URL desglosadas como atributos de clave/valor de parámetros de consulta. |
| `resource.url_scheme`      | cadena | El nombre del protocolo de la URL (HTTP o HTTPS).                                            |
| `resource.provider.name`      | cadena | El nombre del proveedor de recursos. Por defecto es `unknown`.                                            |
| `resource.provider.domain`      | cadena | El dominio del proveedor del recurso.                                            |
| `resource.provider.type`      | cadena | El tipo de proveedor de recursos (por ejemplo, `first-party`, `cdn`, `ad`, `analytics`).                                            |

## Identificar recursos de terceros

RUM infiere el nombre y la categoría del proveedor de recursos de la parte de host de la URL del recurso. Si el host de la URL del recurso coincide con el host de la URL de la página actual, la categoría se configura en `first party`. En caso contrario, la categoría será `cdn`, `analytics` o `social`, por ejemplo.

## Tiempo de recursos y CORS

La [API de tiempo de recursos][3] permite recopilar tiempo de recursos de RUM. Está sujeta a las limitaciones de seguridad de origen cruzado que los navegadores aplican a los scripts. Por ejemplo, si tu aplicación web está alojada en `www.example.com` y carga tus imágenes a través de `images.example.com`, por defecto solo obtendrás el tiempo correspondiente a los recursos cargados alojados en `www.example.com`. 

Para solucionarlo, activa la recopilación de datos ampliada para recursos sujetos a CORS añadiendo el encabezado de respuesta HTTP `Timing-Allow-Origin`a tus recursos de origen cruzado. Por ejemplo, para otorgar acceso al tiempo de recursos a cualquier origen, utiliza `Timing-Allow-Origin: *`. Puedes obtener más información sobre CORS en [los documentos web de MDN][4]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /es/real_user_monitoring/platform/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Coping_with_CORS