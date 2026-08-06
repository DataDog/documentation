---
aliases:
- /es/tracing/terminology/
- /es/tracing/faq/what-is-the-difference-between-type-service-resource-and-name
- /es/tracing/visualization/
description: Aprende la terminología esencial de APM, incluyendo servicios, recursos,
  trazas, tramos, instrumentación y otros conceptos clave para el trazado distribuido.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentación
  text: Aprenda cómo configurar el trazado de APM con su aplicación
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Descubra y catalogue los servicios que reportan a Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Aprenda más sobre los servicios en Datadog
- link: /tracing/services/resource_page/
  tag: Documentación
  text: Profundice en el rendimiento de sus recursos y trazas
- link: /tracing/trace_explorer/trace_view/
  tag: Documentación
  text: Aprenda cómo leer una traza en Datadog
- link: /monitors/types/apm/
  tag: Documentación
  text: Aprenda sobre los monitores de APM
title: Términos y conceptos de APM
---
{{< jqmath-vanilla >}}

## Resumen {#overview}

La interfaz de usuario de APM proporciona muchas herramientas para solucionar problemas de rendimiento de aplicaciones y correlacionarlos a lo largo del producto, permitiéndole encontrar y resolver problemas en sistemas distribuidos

Para definiciones y descripciones adicionales de términos importantes de APM como _tramos_ y _indexado_, consulte el [glosario principal][22] 

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Los servicios](#services)            |  son los bloques de construcción de arquitecturas modernas de microservicios; en términos generales, un servicio agrupa puntos de conexión, consultas o trabajos con el propósito de construir su aplicación                                  |
| [Los recursos](#resources)          |  representan un dominio particular de una aplicación del cliente; típicamente son un punto de conexión web instrumentado, una consulta de base de datos o un trabajo en segundo plano                                                              |
| [Monitores][23]                   | Los monitores de métricas de APM funcionan como monitores de métricas regulares, pero con controles adaptados específicamente a APM. Utilice estos monitores para recibir alertas a nivel de servicio sobre hits, errores y una variedad de medidas de latencia |
Una traza se utiliza para rastrear el tiempo que dedica una aplicación a procesar una solicitud y el estado de la misma Cada traza consiste en uno o más tramos.                                                             |
| [Propagación del contexto de trazas](#trace-context-propagation)| El método de pasar identificadores de traza entre servicios, permitiendo que Datadog una los tramos individuales en una traza distribuida completa |
| [Filtros de Retención](#retention-filters) | Los filtros de retención son controles basados en etiquetas establecidos dentro de la interfaz de usuario de Datadog que determinan qué tramos indexar en Datadog durante 15 días.                                                                                              |
| [Controles de Ingesta](#ingestion-controls) | Los controles de ingesta se utilizan para enviar hasta el 100% de las trazas a Datadog para búsqueda y análisis en vivo durante 15 minutos.
La instrumentación es el proceso de agregar código a su aplicación para capturar e informar datos de observabilidad |
| [Equipaje](#baggage) | El equipaje es información contextual que se pasa entre trazas, métricas y registros en forma de pares clave-valor. |

## Servicios {#services}

Después de [instrumentar su aplicación][3], el [Catálogo][4] es su página principal para los datos de APM.

{{< img src="tracing/visualization/software_catalog.png" alt="Catálogo" >}}

Los servicios son los bloques de construcción de arquitecturas modernas de microservicios; en términos generales, un servicio agrupa puntos de conexión, consultas o trabajos con el propósito de escalar instancias Algunos ejemplos:

* Un grupo de puntos de conexión de URL puede agruparse bajo un servicio API
* Un grupo de consultas de base de datos que se agrupan dentro de un servicio de base de datos.
* Un grupo de trabajos periódicos configurados en el servicio crond.

La captura de pantalla a continuación es un sistema de microservicios distribuido para un constructor de sitios de comercio electrónico. Hay un `web-store`, `ad-server`, `payment-db` y `auth-service` todos representados como servicios en APM.

{{< img src="tracing/visualization/service_map.png" alt="Service Map" >}}

Todos los servicios se pueden encontrar en el [Catálogo][4] y se representan visualmente en el [Service Map][5]. Cada servicio tiene su propia [Página de Servicio][6] donde se pueden ver e inspeccionar métricas de [traza](#trace-metrics) como rendimiento, latencia y tasas de error. Utilice estas métricas para crear widgets de dashboard, crear monitores y ver el rendimiento de cada recurso, como un punto de conexión web o una consulta de base de datos perteneciente al servicio

{{< img src="tracing/visualization/service_page.mp4" video="true" alt="página de servicio" >}}

<div class="alert alert-info">
¿No ve los puntos de conexión HTTP que esperaba en la Página de Servicio? En APM, los puntos de conexión están conectados a un servicio por algo más que el nombre del servicio También se realiza mediante el `span.name` del span de punto de entrada de la traza Por ejemplo, en el servicio de tienda web anterior, `web.request` es el span de punto de entrada. Más información sobre esto <a href="/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/">aquí</a>.
</div>

## Recursos {#resources}

Los recursos representan un dominio particular de una aplicación del cliente. Podrían ser típicamente un punto de conexión web instrumentado, una consulta a la base de datos o un trabajo en segundo plano Para un servicio web, estos recursos pueden ser puntos de conexión web dinámicos que se agrupan por un nombre de span estático - `web.request` En un servicio de base de datos, estos serían consultas a la base de datos con el nombre de span `db.query`. Por ejemplo, el servicio `web-store` ha instrumentado automáticamente recursos: puntos de conexión web que manejan pagos, actualizaciones de carritos, adición de artículos, y así sucesivamente Un nombre de recurso puede ser el método HTTP y la ruta HTTP, por ejemplo `GET /productpage` o `ShoppingCartController#checkout`. 

Cada recurso tiene su propia [página de recurso][7] con [métricas de traza][15] específicas para el punto de conexión Las métricas de traza se pueden usar como cualquier otra métrica de Datadog: son exportables a un Dashboard o se pueden usar para crear monitores La página de recurso también muestra el widget de resumen de tramo con una visualización agregada de [tramos][21] para todas las [trazas](#trace), la distribución de latencia de las solicitudes y las trazas que muestran las solicitudes realizadas a este punto de conexión.

{{< img src="tracing/visualization/resource_page.mp4" video="true" alt="página de recurso" >}}

## Traza {#trace}

Una traza se utiliza para rastrear el tiempo que pasa una aplicación procesando una solicitud y el estado de esta solicitud. Cada traza consiste en uno o más tramos. Durante la vida útil de la solicitud, puedes ver llamadas distribuidas entre servicios (porque un [ID de traza se inyecta/se extrae a través de encabezados HTTP][8]), [bibliotecas instrumentadas automáticamente][3] y [instrumentación manual][9] utilizando herramientas de código abierto como [OpenTracing][10] en la visualización de gráfico de llamas. En la página de vista de traza, cada traza recopila información que la conecta a otras partes de la plataforma, incluyendo [conectar registros a trazas][11], [agregar etiquetas a tramos][12] y [recopilar métricas de tiempo de ejecución][13].

{{< img src="tracing/visualization/trace_view.png" alt="vista de traza" >}}

## Propagación del contexto de trazas {#trace-context-propagation}

La propagación del contexto de trazas es el método de pasar identificadores de traza entre servicios en un sistema distribuido. Permite a Datadog unir tramos individuales de diferentes servicios en una sola traza distribuida. La propagación del contexto de trazas funciona inyectando identificadores, como el ID de traza y el ID de tramo padre, en los encabezados HTTP a medida que la solicitud fluye a través del sistema. El servicio descendente luego extrae estos identificadores y continúa la traza. Esto permite a Datadog reconstruir el camino completo de una solicitud a través de múltiples servicios.

Para más información, consulte la [propagación del contexto de trazas][27] para el lenguaje de su aplicación.

## Filtros de retención {#retention-filters}

[Establecer filtros basados en etiquetas][19] en la interfaz de usuario para indexar tramos durante 15 días para su uso con [Búsqueda y Análisis de Trazas][14].

## Controles de ingestión {#ingestion-controls}

[Envíe el 100% de las trazas][20] de sus servicios a Datadog y combínelas con [filtros de retención basados en etiquetas](#retention-filters) para mantener las trazas que importan para su negocio durante 15 días

## Instrumentación {#instrumentation}

La instrumentación es el proceso de agregar código a su aplicación para capturar y reportar datos de observabilidad a Datadog, como trazas, métricas y registros Datadog proporciona bibliotecas de instrumentación para varios lenguajes de programación y frameworks.

Puede instrumentar automáticamente su aplicación cuando instale el Datadog Agent con [Instrumentación de un solo paso][24] o cuando [agregue manualmente los SDK de Datadog][25] a su código

Puede usar instrumentación personalizada al incrustar código de traza directamente en el código de su aplicación. Esto le permite crear, modificar o eliminar trazas programáticamente para enviarlas a Datadog.

Para obtener más información, lea [Instrumentación de Aplicaciones][26].

## Baggage {#baggage}

Baggage le permite propagar pares clave-valor (también conocidos como elementos de Baggage) a través de los límites del servicio en un sistema distribuido. A diferencia del contexto de traza, que se centra en los identificadores de traza, Baggage permite la transmisión de datos comerciales y otra información contextual junto con las trazas.  

Para aprender más, lea los [formatos de propagación][28] soportados para el lenguaje de su aplicación.

## Lectura Adicional {#further-reading}

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