---
description: Correlacione tramos entre trazas y operaciones mediante enlaces de tramo
  de OpenTelemetry para flujos de trabajo complejos de sistemas distribuidos.
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: Documentación
  text: Enlaces de tramo de OpenTelemetry
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con la API de OpenTelemetry
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con bibliotecas de Datadog
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Haga un seguimiento de Azure Functions en todos los planes de hospedaje con
    Datadog
title: Enlaces de tramo
---
{{< img src="tracing/span_links/span_links_tab_2.png" alt="Pestaña de enlaces de tramo" style="width:90%;">}}

## Descripción general {#overview}

Los enlaces de tramo son un [concepto de OpenTelemetry][5] y parte de la [API de traza de OpenTelemetry][2]. Datadog admite enlaces de tramo para:

- Aplicaciones instrumentadas con [SDK de OpenTelemetry][6].
- Aplicaciones instrumentadas con [SDK de Datadog][9].

Los enlaces de tramo correlacionan uno o más tramos que están relacionados causalmente pero que no tienen una relación típica de padre-hijo. Estos enlaces pueden correlacionar tramos dentro de la misma traza o entre diferentes trazas.

Los enlaces de tramo ayudan a rastrear operaciones en sistemas distribuidos, donde los flujos de trabajo a menudo se desvían de los patrones de ejecución lineal. Son útiles para rastrear el flujo de operaciones en sistemas que ejecutan solicitudes en lotes o procesan eventos de forma asíncrona.

Datadog admite enlaces de tramo tanto hacia adelante como hacia atrás, lo que permite a los usuarios visualizar y navegar por las relaciones de tramo entre trazas en ambas direcciones.

- Enlaces hacia adelante: Un tramo puede vincularse a otro tramo que ocurre más tarde en el tiempo, ya sea que pertenezca a la misma traza o a una diferente. Esto le permite navegar desde operaciones anteriores a las posteriores entre trazas.
- Enlaces hacia atrás: De manera similar, un tramo puede vincularse a un tramo que ocurrió anteriormente en el tiempo, ya sea dentro de la misma traza o entre diferentes trazas. Esto le permite rastrear desde operaciones posteriores a las anteriores.

## Casos de uso comunes {#common-use-cases}

Los enlaces de tramo son más aplicables en escenarios de fan-in, donde múltiples operaciones convergen en un solo tramo. El único tramo se vincula a múltiples operaciones convergentes.

Por ejemplo:

- **Scatter-Gather y Map-Reduce**: Aquí, los enlaces de tramo rastrean y correlacionan múltiples procesos paralelos que convergen en un único proceso combinado. Conectan los resultados de estos procesos paralelos con su resultado colectivo.

- **Agregación de mensajes**: En sistemas como Kafka Streams, los enlaces de tramo conectan cada mensaje en un grupo de mensajes con su resultado agregado, mostrando cómo los mensajes individuales contribuyen al resultado final.

- **Mensajería transaccional**: En escenarios donde múltiples mensajes son parte de una sola transacción, como en las colas de mensajes, los enlaces de tramo trazan la relación entre cada mensaje y el proceso transaccional general.

- **Event Sourcing**: Los enlaces de tramo en event sourcing rastrean cómo múltiples mensajes de cambio contribuyen al estado actual de una entidad.

## Creación de enlaces de tramo {#creating-span-links}

Si su aplicación está instrumentada con:

- El SDK de OpenTelemetry, siga la documentación de instrumentación manual de OpenTelemetry para su lenguaje. Por ejemplo, [Crear tramos con enlaces para Java][3].
- El SDK de Datadog, siga los ejemplos de [Agregar enlaces de tramo][1].

## Soporte mínimo {#minimum-support}

**Nota***: Esta sección documenta el soporte mínimo para generar enlaces de tramo con las bibliotecas cliente de Datadog APM (con la API de OpenTelemetry). Los enlaces de tramo generados por el SDK de OpenTelemetry se envían a Datadog a través de [OTLP Ingest][8].

Se requiere Agent v7.52.0 o superior para generar enlaces de tramo utilizando [SDKs de Datadog][7]. El soporte para enlaces de tramo se introdujo en las siguientes versiones:

| Lenguaje  | Versión mínima del SDK |
|-----------|---------------------------------|
| C++/Proxy | Aún no compatible               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## Visualización de enlaces de tramo {#viewing-span-links}

Puede visualizar los enlaces de tramo desde el [Trace Explorer][4] en Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/custom_instrumentation/php/#adding-span-links
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /es/tracing/trace_explorer/trace_view/?tab=spanlinks#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/es/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /es/tracing/trace_collection/custom_instrumentation/?tab=datadogapi