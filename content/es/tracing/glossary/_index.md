---
aliases:
- /es/tracing/terminology/
- /es/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /es/tracing/visualization/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprende a configurar APM tracing con su aplicación
- link: /tracing/service_catalog/
  tag: Documentación
  text: Descubrir y catalogar los servicios de informes a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundiza en el rendimiento de tus recursos y trazas (traces)
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Aprende a leer trazas en Datadog
- link: /monitors/types/apm/
  tag: Documentación
  text: Más información sobre los monitores APM
title: APM Términos y conceptos
---

{{< jqmath-vanilla >}}

## Información general

La interfaz de usuario APM ofrece numerosas herramientas para solucionar problemas de rendimiento de las aplicaciones y correlacionarlos en todo el producto, lo que te permite encontrar y resolver problemas en sistemas distribuidos.

Para más definiciones y descripciones de términos importantes de APM, como _spans_ e _indexed_, consulte el [glosario principal][22]. 

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Servicio](#services)            | Los servicios son los bloques de construcción de las modernas arquitecturas de micro servicios: en términos generales, un servicio agrupa endpoints, consultas o trabajos con el fin de construir tu aplicación.                                  |
| [Recurso](#resources)          | Los recursos representan un dominio concreto de una aplicación del cliente: suelen ser un endpoint web instrumentado, una consulta a una base de datos o un trabajo en segundo plano.                                                              |
| [Monitores][23]                   | Los monitores APM de métrica funcionan como los monitores de métrica normales, pero con controles adaptados específicamente a APM. Utiliza estos monitores para recibir alertas al nivel de servicio sobre aciertos, errores y una variedad en las medidas de latencia. |
| [Trazas](#trace)                 | Una traza se utiliza para realizar un seguimiento del tiempo empleado por una aplicación procesando una solicitud y el estado de esta solicitud. Cada traza consta de uno o varios tramos (spans).                                                             |
| [Propagación de contexto de rastreo](#trace-context-propagation)| El método para pasar identificadores de traza (trace) entre servicios, lo que permite a Datadog juntar tramos (spans) individuales en una traza distribuida completa. |
| [Filtros de retención](#retention-filters) | Los filtros de retención son controles basados en etiquetas establecidos en la interfaz de usuario de Datadog que determinan qué tramos se indexar en Datadog durante 15 días.                                                                                              |
| [Controles de ingesta](#ingestion-controls) | Los controles de ingesta se utilizan para el envío de hasta el 100% de las trazas a Datadog para buscar en directo y analizar durante 15 minutos.
| [Instrumentación](#instrumentation) | La instrumentación es el proceso de añadir código a tu aplicación para capturar e informar los datos de observabilidad. |

## Servicios

Después de [instrumentar tu aplicación][3], el [Catálogo de servicios][4] es tu página de inicio principal para los datos de APM.

{{< img src="tracing/visualization/service_catalog.png" alt="Catálogo de servicios" >}}

Los servicios son los componentes básicos de las arquitecturas de microservicios modernas: en términos generales, un servicio agrupa endpoints, consultas o trabajos con el fin de escalar instancias. Algunos ejemplos son:

* Un grupo de endpoints de URL puede agruparse bajo un servicio de API.
* Un grupo de consultas a la base de datos que se agrupan dentro de un servicio de base de datos.
* Un grupo de trabajos periódicos configurados en el servicio crond.

La siguiente captura de pantalla es un sistema distribuido de microservicios para un constructor de sitios de comercio electrónico. Hay `web-store`, `ad-server`, `payment-db` y `auth-service`, todos representados como servicios en APM.

{{< img src="tracing/visualization/service_map.png" alt="Mapa de servicios" >}}

Todos los servicios pueden encontrarse en el [Catálogo de servicios][4] y representarse visualmente en el [Mapa de servicios][5]. Cada servicio tiene su propia [Página de servicios][6] donde puedes ver y analizar [métricas de traza](#trace-metrics) como el rendimiento, la latencia y las tasas de error. Utiliza estas métricas para crear widgets de dashboard, monitores y ver el rendimiento de cada recurso, como un endpoint web o una consulta de base de datos perteneciente al servicio.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="Página de servicios" >}}

<div class="alert alert-info">
¿No ves los endpoints HTTP que esperabas en la Página de servicios? En APM, los endpoints están conectados a un servicio por algo más que el nombre de servicio. También se conectan con el `span.name` del tramo de punto de entrada de la traza. Por ejemplo, en el servicio de tienda web anterior, `web.request` es el tramo del punto de entrada. Más información al respecto <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">aquí</a>.
</div>

## Recursos

Los recursos representan un dominio particular de una aplicación del cliente. Por lo general, pueden ser un endpoint web instrumentado, una consulta de base de datos o un trabajo en segundo plano. En un servicio web, estos recursos pueden ser endpoints web dinámicos agrupados por un nombre de tramo estático: `web.request`. En un servicio de base de datos, serían consultas de base de datos con el nombre de tramo `db.query`. Por ejemplo, el servicio `web-store` tiene recursos instrumentados automáticamente (endpoints web) que gestionan las compras, actualizan los carritos, añaden artículos, etc. Un nombre de recurso puede ser el método HTTP y la ruta HTTP, por ejemplo `GET /productpage` o `ShoppingCartController#checkout`.

Cada recurso tiene su propia [Página de recursos][7] con [métricas de traza][15] para el endpoint específico. Las métricas de traza pueden utilizarse como cualquier otra métrica de Datadog, son exportables a un dashboard o pueden utilizarse para crear monitores. La Página de recursos también muestra el widget de resumen del tramo con una vista agregada de [tramos][21] para todas las [trazas](#trace), distribución de latencia de las solicitudes y trazas que muestran las solicitudes realizadas a este endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="Página de recursos" >}}

## Traza

Una traza se utiliza para realizar un seguimiento del tiempo empleado por una aplicación procesando una solicitud y el estado de esta solicitud. Cada traza consta de uno o más tramos. Durante el tiempo de vida de la solicitud, puedes ver las llamadas distribuidas a través de servicios (porque [se inyecta/extrae un ID de traza a través de encabezados HTTP][8]), [bibliotecas instrumentadas automáticamente][3] e [instrumentación manual][9] mediante herramientas de código abierto como [OpenTracing][10] en la vista de la gráfica de llamas. En la página Vista de traza, cada traza recopila información que la conecta con otras partes de la plataforma, incluyendo [conectar logs a trazas][11], [añadir etiquetas a tramos][12] y [recopilar métricas de tiempo de ejecución][13].

{{< img src="tracing/visualization/trace_view.png" alt="Vista de traza" >}}

## Propagación del contexto de rastreo

La propagación del contexto de rastreo es el método para pasar identificadores de traza entre servicios en un sistema distribuido. Permite a Datadog unir tramos individuales de diferentes servicios en una única traza distribuida. La propagación de contexto de rastreo funciona inyectando identificadores, como el ID de traza y el ID de tramo principal, en los encabezados HTTP a medida que la solicitud fluye por el sistema. Luego, el servicio de descarga extrae estos identificadores y continúa la traza. Esto permite a Datadog reconstruir la ruta completa de una solicitud a través de múltiples servicios.

Para más información, consulta la [propagación del contexto de rastreo][27] para el lenguaje de tu aplicación.

## Filtros de retención

[Establece filtros basados en etiquetas][19] en la interfaz de usuario para indexar tramos durante 15 días para su uso con [la Búsqueda de trazas y análisis][14].

## Controles de ingesta

[Envía el 100% de las trazas][20] de tus servicios a Datadog y combínalas con [filtros de retención basados en etiquetas](#retention-filters) para conservar trazas relevantes para tu negocio durante 15 días.

## Instrumentación

La instrumentación es el proceso de añadir código a tu aplicación para capturar e informar datos de observabilidad a Datadog, como trazas, métricas y logs. Datadog proporciona bibliotecas de instrumentación para varios lenguajes y marcos de programación.

Puedes instrumentar automáticamente tu aplicación cuando instales el Datadog Agent con la [Instrumentación de paso único][24] o cuando [añadas de forma manual bibliotecas de rastreo de Datadog][25] a tu código.

Puedes utilizar la instrumentación personalizada al incrustar código de rastreo directamente en el código de tu aplicación. Esto te permite crear, modificar o eliminar mediante programación trazas para enviarlas a Datadog.

Para saber más, lee [Instrumentación de aplicación][26].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/developers/guide/data-collection-resolution-retention/
[3]: /es/tracing/setup/
[4]: /es/tracing/service_catalog/
[5]: /es/tracing/services/services_map/
[6]: /es/tracing/services/service_page/
[7]: /es/tracing/services/resource_page/
[8]: /es/tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /es/tracing/manual_instrumentation/
[10]: /es/tracing/opentracing/
[11]: /es/tracing/other_telemetry/connect_logs_and_traces/
[12]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /es/tracing/metrics/runtime_metrics/
[14]: /es/tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /es/tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors#/create
[18]: /es/tracing/trace_explorer/query_syntax/#facets
[19]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /es/tracing/trace_pipeline/ingestion_controls/
[21]: /es/glossary/#span
[22]: /es/glossary/
[23]: /es/monitors/types/apm/
[24]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /es/tracing/trace_collection/
[27]: /es/tracing/trace_collection/trace_context_propagation