---
title: Términos y conceptos de APM
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
  - /tracing/visualization/
further_reading:
- link: "/tracing/trace_collection/"
  tag: "Documentación"
  text: "Aprende cómo configurar la traza APM con tu aplicación"
- link: "/tracing/software_catalog/"
  tag: "Documentación"
  text: "Descubre y cataloga los servicios que reportan a Datadog"
- link: "/tracing/services/service_page/"
  tag: "Documentación"
  text: "Aprende más sobre los servicios de Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentación"
  text: "Profundiza en el rendimiento de tus recursos y trazas"
- link: "/tracing/trace_explorer/trace_view/"
  tag: "Documentación"
  text: "Aprende a leer una traza en Datadog"
- link: "/monitors/types/apm/"
  tag: "Documentación"
  text: "Aprende sobre los monitores APM"
---

{{< jqmath-vanilla >}}

## Información general

La interfaz de usuario de APM ofrece numerosas herramientas para solucionar problemas de rendimiento de las aplicaciones y correlacionarlos en todo el producto, lo que te permite encontrar y resolver problemas en sistemas distribuidos.

Para obtener definiciones y descripciones adicionales de términos importantes de APM, como _tramos_ e _indexados_, consulta el [Glosario principal][22].

| Concepto| Descripción|
|----------|----------|
| [Servicio](#services)| Los servicios son los bloques de construcción de las modernas arquitecturas de microservicios: en términos generales, un servicio agrupa endpoints, consultas o trabajos con el fin de construir tu aplicación.|
| [Recurso](#resources)| Los recursos representan un dominio concreto de una aplicación del cliente: suelen ser un endpoint web instrumentado, una consulta a una base de datos o un trabajo en segundo plano.|
| [Monitores][23]| Los monitores de métricas de APM funcionan como los monitores de métricas normales, pero con controles específicamente adaptados a APM. Usa estos monitores para recibir alertas a nivel de servicio sobre hits, errores y diversas medidas de latencia.|
| [Traza](#trace)| Una traza se usa para rastrear el tiempo que una aplicación empleó al procesar una solicitud y el estado de esta solicitud. Cada traza consta de uno o más tramos.|
| [Propagación del contexto de traza](#trace-context-propagation)| El método de pasar identificadores de traza entre servicios, lo que permite a Datadog unir tramos individuales en una traza distribuida completa.|
| [Filtros de retención](#retention-filters)| Los filtros de retención son controles basados en etiquetas establecidos en la interfaz de usuario de Datadog que determinan qué tramos indexar en Datadog durante 15 días.|
| [Controles de ingestión](#ingestion-controls)| Los controles de consumo se usan para enviar hasta el 100 % de las trazas a Datadog para búsqueda en directo y análisis durante 15 minutos.
| [Instrumentación](#instrumentation)| La instrumentación es el proceso de añadir código a tu aplicación para capturar e informar los datos de observabilidad.|
| [Baggage](#baggage)| Se denomina baggage a la información contextual que acompaña a una traza y que se comparte entre trazas, métricas y logs como pares clave-valor.|

## Servicios

Después de [instrumentar tu aplicación][3], el [Catálogo de Software][4] es tu página de inicio principal para los datos de APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catálogo de software" >}}

Los servicios son los componentes fundamentales de las arquitecturas modernas de microservicios; en términos generales, un servicio agrupa endpoints, consultas o tareas con el fin de escalar instancias. Algunos ejemplos:

* Un grupo de endpoints de URL puede agruparse bajo un servicio de API.
* Un grupo de consultas a la base de datos que se agrupan dentro de un servicio de base de datos.
* Un grupo de trabajos periódicos configurados en el servicio crond.

La siguiente captura de pantalla muestra un sistema distribuido de microservicios para un creador de sitios de comercio electrónico. Hay un `web-store`, `ad-server`, `payment-db` y `auth-service`, todos representados como servicios en APM.

{{< img src="tracing/visualization/service_map.png" alt="mapa de servicios" >}}

Todos los servicios están disponibles en el [Catálogo de software][4] y se representan visualmente en el [Mapa de servicios][5]. Cada servicio tiene su propia [Página de servicios][6] donde se pueden ver e inspeccionar [métricas de traza](#trace-metrics) como el rendimiento, la latencia y las tasas de error. Usa estas métricas para crear widgets de dashboard y monitores y ver el rendimiento de cada recurso, como un endpoint web o una consulta de la base de datos perteneciente al servicio.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="página de servicios" >}}

<div class="alert alert-info">
¿No ves los endpoints HTTP que esperabas en la página de servicios? Dentro de APM, la relación entre un endpoint y un servicio no se basa únicamente en el nombre del servicio. También se realiza con el `span.name` del tramo de entrada de la traza. Por ejemplo, en el servicio de tienda web mencionado anteriormente, `web.request` es el tramo de entrada. Más información <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">aquí</a>.
</div>

## Recursos

Los recursos representan un dominio específico de una aplicación del cliente. Normalmente, podrían ser un endpoint web instrumentado, una consulta a la base de datos o un trabajo en segundo plano. En servicios web, los recursos pueden ser endpoints dinámicos que se identifican con un nombre de tramo fijo para facilitar su agrupación y análisis -  `web.request`. En un servicio de base de datos, estos serían consultas a la base de datos con el nombre de tramo `db.query`. Por ejemplo, el servicio `web-store` tiene recursos instrumentados automáticamente, como endpoints web que gestionan las compras, actualizan los carritos, añaden artículos, y así sucesivamente. Un nombre de recurso puede ser el método HTTP y la ruta HTTP, por ejemplo `GET /productpage` o `ShoppingCartController#checkout`.

Cada recurso tiene su propia [página de recursos][7] con [métricas de traza][15] en el contexto del endpoint específico. Las métricas de traza se pueden usar como cualquier otra métrica de Datadog; son exportables a un dashboard o se pueden usar para crear monitores. La página de recursos también muestra el widget de resumen de tramos con una vista agregada de [tramos][21] para todas las [trazas](#trace), la distribución de latencia de las solicitudes y las trazas que muestran las solicitudes realizadas a este endpoint.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="página de recursos" >}}

## Traza

Una traza se usa para rastrear el tiempo que una aplicación empleó al procesar una solicitud y el estado de esta solicitud. Cada traza consta de uno o más tramos. Durante la duración de la solicitud, puedes ver las llamadas distribuidas a través de servicios (porque se inyecta/extrae un [ID de traza a través de los encabezados HTTP][8]), [bibliotecas instrumentadas automáticamente][3], e [instrumentación manual][9] con herramientas de código abierto como [OpenTracing][10] en la vista del gráfico de llamas. En la página de Vista de trazas, cada traza recopila información que la conecta con otras partes de la plataforma, incluyendo [conectar logs a trazas][11], [añadir etiquetas a tramos][12] y [recopilar métricas de tiempo de ejecución][13].

{{< img src="tracing/visualization/trace_view.png" alt="vista de traza" >}}

## Propagación del contexto de traza

La propagación del contexto de traza es el método de pasar identificadores de trazas entre servicios en un sistema distribuido. Esto le permite a Datadog unir tramos individuales de diferentes servicios en una única traza distribuida. La propagación del contexto de traza funciona inyectando identificadores, como el ID de traza y el ID de tramo padre, en los encabezados HTTP a medida que la solicitud recorre el sistema. El servicio descendente extrae estos identificadores y continúa la traza. Esto permite a Datadog reconstruir el recorrido completo de una solicitud a través de múltiples servicios.

Para más información, consulta la [propagación del contexto de traza][27] para el idioma de tu aplicación.

## Filtros de retención

[Establece filtros basados en etiquetas][19] en la interfaz de usuario para indexar tramos durante 15 días para su uso con [la Búsqueda de trazas y análisis][14].

## Controles de ingestión

[Envía el 100 % de las trazas][20] de tus servicios a Datadog y combínalas con [filtros de retención basados en etiquetas](#retention-filters) para conservar las trazas relevantes para tu negocio durante 15 días.

## Instrumentación

La instrumentación es el proceso de añadir código a tu aplicación para capturar y reportar datos de observabilidad a Datadog, como trazas, métricas y logs. Datadog ofrece bibliotecas de instrumentación para diversos lenguajes y frameworks de programación.

Puedes instrumentar automáticamente tu aplicación al instalar el Datadog Agent con la [Instrumentación de paso único][24] o cuando [añadas manualmente bibliotecas de rastreo de Datadog][25] a tu código.

Puedes usar instrumentación personalizada incorporando código de traza directamente en el código de tu aplicación. Esto te permite crear, modificar o eliminar trazas de forma programática para enviarlas a Datadog.

Para saber más, lee [Instrumentación de aplicación][26].

## Baggage

El término "baggage" permite propagar pares clave-valor (también conocidos como ítems de "baggage") a través de los límites de servicio en un sistema distribuido. A diferencia del contexto de traza, que se centra en los identificadores de traza, el baggage permite la transmisión de datos empresariales y otra información contextual junto con las trazas.

Para obtener más información, lee los [formatos de propagación][28] compatibles para el idioma de tu aplicación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[2]: /developers/guide/data-collection-resolution/
[3]: /tracing/setup/
[4]: /tracing/software_catalog/
[5]: /tracing/services/services_map/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /tracing/opentracing/java/#create-a-distributed-trace-using-manual-instrumentation-with-opentracing
[9]: /tracing/manual_instrumentation/
[10]: /tracing/opentracing/
[11]: /tracing/other_telemetry/connect_logs_and_traces/
[12]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: /tracing/metrics/runtime_metrics/
[14]: /tracing/trace_pipeline/trace_retention/#trace-search-and-analytics-on-indexed-spans
[15]: /tracing/metrics/metrics_namespace/
[16]: https://app.datadoghq.com/metric/summary
[17]: https://app.datadoghq.com/monitors/create
[18]: /tracing/trace_explorer/query_syntax/#facets
[19]: /tracing/trace_pipeline/trace_retention/#retention-filters
[20]: /tracing/trace_pipeline/ingestion_controls/
[21]: /glossary/#span
[22]: /glossary/
[23]: /monitors/types/apm/
[24]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[25]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[26]: /tracing/trace_collection/
[27]: /tracing/trace_collection/trace_context_propagation
[28]: /tracing/trace_collection/trace_context_propagation/#supported-formats
