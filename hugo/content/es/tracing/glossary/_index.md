---
aliases:
- /es/tracing/terminology/
- /es/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /es/tracing/visualization/
description: Aprenda la terminología esencial de APM, incluyendo servicios, recursos,
  trazas, tramos, instrumentación y otros conceptos clave para el seguimiento distribuido
  de trazas.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprenda a configurar el seguimiento de trazas de APM en su aplicación
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Descubra y catalogue los servicios que reportan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Obtenga más información sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundice en el rendimiento y las trazas de sus recursos
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Aprenda a leer una traza en Datadog
- link: /monitors/types/apm/
  tag: Documentación
  text: Obtenga información sobre los monitores de APM
title: Términos y conceptos de APM
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

La interfaz de usuario de APM ofrece muchas herramientas para solucionar problemas de rendimiento de las aplicaciones y correlacionarlos en todo el producto, lo que le permite encontrar y resolver problemas en sistemas distribuidos.

Para obtener definiciones y descripciones adicionales de términos importantes de APM como _tramos_ y _indexado_, consulte el [Glosario principal][22]. 

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Servicio](#services)            | Los servicios son los componentes básicos de las arquitecturas de microservicios modernas; en términos generales, un servicio agrupa puntos de conexión, consultas o trabajos con el fin de crear su aplicación.                                  |
| [Recurso](#resources)          | Los recursos representan un dominio particular de la aplicación de un cliente; por lo general, son un punto de conexión web instrumentado, una consulta de base de datos o un trabajo en segundo plano.                                                              |
| [Monitores][23]                   | Los monitores de métricas de APM funcionan como los monitores de métricas regulares, pero con controles diseñados específicamente para APM. Utilice estos monitores para recibir alertas a nivel de servicio sobre solicitudes recibidas, errores y diversas medidas de latencia. |
| [Traza](#trace)                 | Una traza se utiliza para realizar un seguimiento del tiempo que dedica una aplicación a procesar una solicitud y del estado de esta solicitud. Cada traza consta de uno o más tramos.                                                             |
| [Propagación del contexto de trazas](#trace-context-propagation)| El método para transmitir identificadores de trazas entre servicios, lo que permite a Datadog unir tramos individuales en una traza distribuida completa. |
| [Filtros de retención](#retention-filters) | Los filtros de retención son controles basados en etiquetas configurados dentro de la interfaz de usuario de Datadog que determinan qué tramos indexar en Datadog durante 15 días.                                                                                              |
| [Controles de ingesta](#ingestion-controls) | Los controles de ingesta se utilizan para enviar hasta el 100 % de las trazas a Datadog para búsqueda y análisis en tiempo real durante 15 minutos.
| [Instrumentación](#instrumentation) | La instrumentación es el proceso de agregar código a su aplicación para capturar y reportar datos de observabilidad. |
| [Baggage](#baggage) | Baggage es información contextual que se pasa entre trazas, métricas y registros en forma de pares clave-valor. |

## Servicios {#services}

Después de [instrumentar su aplicación][3], el [Catalog][4] es su página de inicio principal para datos de APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catalog" >}}

Los servicios son los componentes básicos de las arquitecturas de microservicios modernas; en términos generales, un servicio agrupa puntos de conexión, consultas o trabajos con el fin de escalar instancias. Algunos ejemplos:

* Un grupo de puntos de conexión de URL puede agruparse bajo un servicio de API.
* Un grupo de consultas de base de datos que se agrupan dentro de un servicio de base de datos.
* Un grupo de trabajos periódicos configurados en el servicio crond.

La captura de pantalla a continuación es un sistema distribuido de microservicios para un creador de sitios de comercio electrónico. Hay un `web-store`, `ad-server`, `payment-db` y `auth-service`, todos representados como servicios en APM.

{{< img src="tracing/visualization/service_map.png" alt="Service Map" >}}

Todos los servicios se pueden encontrar en el [Catalog][4] y representarse visualmente en el [Service Map][5]. Cada servicio tiene su propia [Service page][6] donde se pueden ver e inspeccionar [métricas de traza](#trace-metrics) como el rendimiento, la latencia y las tasas de error. Utilice estas métricas para crear widgets de tablero, crear monitores y ver el rendimiento de cada recurso, como un punto de conexión web o una consulta de base de datos que pertenezca al servicio.

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="Service page" >}}

<div class="alert alert-info">
¿No ve los puntos de conexión HTTP que esperaba en la Service page? En APM, los puntos de conexión se conectan a un servicio mediante algo más que el nombre del servicio. También se realiza con el <code>span.name</code> del tramo de punto de entrada de la traza. Por ejemplo, en el servicio web-store anterior, <code>web.request</code> es el tramo de punto de entrada. Más información sobre esto <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">aquí</a>.
</div>

## Recursos {#resources}

Los recursos representan un dominio particular de una aplicación del cliente. Por lo general, podrían ser un punto de conexión web instrumentado, una consulta de base de datos o un trabajo en segundo plano. Para un servicio web, estos recursos pueden ser puntos de conexión web dinámicos que se agrupan por un nombre de tramo estático:  `web.request`. En un servicio de base de datos, estas serían consultas de base de datos con el nombre de tramo `db.query`. Por ejemplo, el servicio `web-store` tiene recursos instrumentados automáticamente (puntos de conexión web) que manejan pagos, actualización de carritos, adición de artículos, etcétera. Un nombre de recurso puede ser el método HTTP y la ruta HTTP, por ejemplo `GET /productpage` o `ShoppingCartController#checkout`. 

Cada recurso tiene su propia [Resource page][7] con [métricas de traza][15] limitadas al punto de conexión específico. Las métricas de traza se pueden usar como cualquier otra métrica de Datadog: se pueden exportar a un dashboard o usar para crear monitores. La Resource page también muestra el widget de resumen de tramo con una vista agregada de [tramos][21] para todas las [trazas](#trace), la distribución de latencia de las solicitudes y las trazas que muestran las solicitudes realizadas a este punto de conexión.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="Resource page" >}}

## Traza {#trace}

Una traza se utiliza para realizar un seguimiento del tiempo que dedica una aplicación a procesar una solicitud y el estado de esta. Cada traza consta de uno o más tramos. Durante el ciclo de vida de la solicitud, puede ver llamadas distribuidas entre servicios (debido a que un [ID de traza se inyecta/extrae a través de encabezados HTTP][8]), [bibliotecas instrumentadas automáticamente][3] y [instrumentación manual][9] utilizando herramientas de código abierto como [OpenTracing][10] en la vista de gráfico de llama. En la página Trace View, cada traza recopila información que la conecta con otras partes de la plataforma, incluyendo [conectar registros a trazas][11], [agregar etiquetas a tramos][12] y [recopilar métricas de tiempo de ejecución][13].

{{< img src="tracing/visualization/trace_view.png" alt="Trace View" >}}

## Propagación del contexto de trazas {#trace-context-propagation}

La propagación del contexto de trazas es el método para pasar identificadores de traza entre servicios en un sistema distribuido. Permite a Datadog unir tramos individuales de diferentes servicios en una única traza distribuida. La propagación del contexto de trazas funciona inyectando identificadores, como el ID de traza y el ID de tramo principal, en los encabezados HTTP a medida que la solicitud fluye a través del sistema. El servicio descendente extrae entonces estos identificadores y continúa la traza. Esto permite a Datadog reconstruir la ruta completa de una solicitud a través de múltiples servicios.

Para obtener más información, consulte [propagación del contexto de trazas][27] para el lenguaje de su aplicación.

## Filtros de retención {#retention-filters}

[Establezca filtros basados en etiquetas][19] en la interfaz de usuario para indexar tramos durante 15 días para su uso con [Trace Search and Analytics][14].

## Ingestion Control {#ingestion-controls}

[Envíe el 100% de las trazas][20] desde sus servicios a Datadog y combínelas con [filtros de retención basados en etiquetas](#retention-filters) para conservar las trazas que son importantes para su negocio durante 15 días.

## Instrumentación {#instrumentation}

La instrumentación es el proceso de añadir código a su aplicación para capturar y reportar datos de observabilidad a Datadog, tales como trazas, métricas y logs. Datadog proporciona bibliotecas de instrumentación para diversos lenguajes de programación y marcos de trabajo.

Puede instrumentar automáticamente su aplicación cuando instala el Datadog Agent con [Single Step Instrumentation][24] o cuando [agrega manualmente los SDK de Datadog][25] a su código.

Puede utilizar instrumentación personalizada integrando código de rastreo directamente en el código de su aplicación. Esto le permite crear, modificar o eliminar programáticamente trazas para enviarlas a Datadog.

Para obtener más información, lea [Instrumentación de aplicaciones][26].

## Baggage {#baggage}

Baggage le permite propagar pares clave-valor (también conocidos como elementos de baggage) a través de los límites de los servicios en un sistema distribuido. A diferencia del contexto de traza, que se centra en los identificadores de traza, baggage permite transmitir datos de negocio y otra información contextual junto con las trazas.  

Para obtener más información, lea los [formatos de propagación][28] compatibles con el lenguaje de su aplicación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/extend/guide/data-collection-resolution/
[3]: /es/tracing/setup/
[4]: /es/internal_developer_portal/catalog/
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
[17]: https://app.datadoghq.com/monitors/create
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
[28]: /es/tracing/trace_collection/trace_context_propagation/#supported-formats