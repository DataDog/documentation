---
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: Documentación
  text: Vínculos de tramos de OpenTelemetry
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con la API de OpenTelemetry
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con bibliotecas de Datadog
title: Vínculos de tramos
---

<div class="alert alert-info">La compatibilidad con vínculos de tramos está en fase beta.</a></div>

## Información general

Los vínculos de tramos son un [concepto de OpenTelemetry][5] y una parte de la [API de rastreo OpenTelemetry][2]. Datadog admite vínculos de tramos para:

- Aplicaciones instrumentadas con [SDK de OpenTelemetry][6].
- Aplicaciones instrumentadas con bibliotecas cliente de Datadog utilizando la API OpenTelemetry.
  **Nota**: Esta versión beta sólo es compatible con la [biblioteca cliente PHP][1].

Los vínculos de tramos correlacionan uno o más tramos que estén causalmente relacionados pero no tengan una relación típica elemento principal-secundario. Estos vínculos pueden correlacionar tramos dentro de una misma traza o entre diferentes trazas.

Los vínculos de tramos ayudan a rastrear operaciones en sistemas distribuidos, donde los flujos de trabajo a menudo se desvían de los patrones de ejecución lineales. Son útiles para rastrear el flujo de operaciones en sistemas que ejecutan solicitudes por lotes o eventos de procesos de forma asíncrona.

## Casos de uso común

Los vínculos de tramos son más aplicables en escenarios fan-in, en los que múltiples operaciones convergen en un único tramo. El único tramo vincula con múltiples operaciones convergentes.

Por ejemplo:

- **Scatter-Gather y Map-Reduce**: Aquí, el vínculo de tramos rastrea y correlaciona múltiples procesos paralelos que convergen en un único proceso combinado. Conectan los resultados de estos procesos paralelos con su resultado colectivo.

- **Agregación de mensajes**: En sistemas como Kafka Streams, los vínculos de tramos conectan cada mensaje de un grupo de mensajes con su resultado agregado, mostrando cómo los mensajes individuales contribuyen al resultado final.

- **Mensajería transaccional**: En situaciones en las que varios mensajes forman parte de una única transacción, como en las colas de mensajes, los vínculos de tramos rastrean la relación entre cada mensaje y el proceso transacción global.

- **Suministro de eventos**: Los vínculos de tramos del suministro de eventos rastrean cómo múltiples mensajes de cambio contribuyen al estado actual de una entidad.

## Creación de vínculos de tramos

Si tu aplicación está instrumentada con:

- El SDK de OpenTelemetry, sigue la documentación de OpenTelemetry para encontrar tu idioma. Por ejemplo, [crea tramos con vínculos para Java][3].
- Para la biblioteca PHP de Datadog, sigue los ejemplos en [Añadir vínculos de tramos][1].

## Compatibilidad mínima

**Nota***: Esta sección documenta la compatibilidad mínima necesaria para generar vínculos de tramos con bibliotecas cliente APM de Datadog (con la API de OpenTelemetry). Los vínculos de tramos generados por el SDK de OpenTelemetry se envían a Datadog a través del [consumo de OTLP][8].

Agent v7.52.0 o posterior para generar vínculos de tramos) utilizando [bibliotecas de rastreo de Datadog][7]. La compatibilidad con los vínculos de tramos se introdujo en las siguientes versiones:

| Lenguaje  | Versión mínima de biblioteca de rastreo |
|-----------|---------------------------------|
| C++/proxy | Aún no es compatible               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## Visualizar vínculos de tramos

Puedes consultar los vínculos de tramos desde el [Explorador de trazas][4] en Datadog.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/custom_instrumentation/php/#adding-span-links-beta
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /es/tracing/trace_explorer/trace_view/?tab=spanlinksbeta#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/es/opentelemetry/interoperability/otlp_ingest_in_the_agent
