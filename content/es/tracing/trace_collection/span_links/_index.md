---
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: Documentación
  text: Enlaces de tramos de OpenTelemetry
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con la API de OpenTelemetry
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentación
  text: Instrumentación personalizada con bibliotecas de Datadog
title: Enlaces de tramos
---

{{< img src="tracing/span_links/span_links_tab_2.png" alt="Pestaña Enlaces de tramos" style="width:90%;">}}

## Información general

Los enlaces de tramos (spans) son un [concepto de OpenTelemetry][5] y son parte de la [API de rastreo OpenTelemetry][2]. Datadog admite enlaces de tramos para:

- Aplicaciones instrumentadas con [SDK de OpenTelemetry][6].
- Aplicaciones instrumentadas con [SDK Datadog][9].

Los enlaces de tramos correlacionan uno o más tramos que están causalmente relacionados pero no tienen una relación típica elemento principal-secundario. Estos enlaces pueden correlacionar tramos dentro de una misma traza (trace) o entre diferentes trazas.

Los enlaces de tramos ayudan a rastrear operaciones en sistemas distribuidos, donde los flujos de trabajo a menudo se desvían de los patrones de ejecución lineales. Son útiles para rastrear el flujo (flow) de operaciones en sistemas que ejecutan solicitudes por lotes o eventos de procesos de forma asíncrona.

Datadog admite enlaces de tramos prospectivos y retrospectivos, lo que permite a los usuarios visualizar y recorrer las relaciones de tramos entre trazas en ambas direcciones.

- Enlaces prospectivos: Un tramo puede vincularse con otro que se produce más tarde en el tiempo, tanto si pertenece a la misma traza o a uno diferente. Esto te permite navegar desde operaciones anteriores a otras posteriores entre trazas.
- Enlaces retrospectivos: Del mismo modo, un tramo puede vincularse con otro que haya ocurrido antes en el tiempo, tanto dentro de la misma traza como entre diferentes trazas. Esto te permite rastrear desde operaciones recientes a otras anteriores.

## Casos de uso común

Los enlaces de tramos son más aplicables en escenarios fan-in, en los que múltiples operaciones convergen en un único tramo. El único tramo vincula con múltiples operaciones convergentes.

Por ejemplo:

- **Scatter-Gather y Map-Reduce**: Aquí, los enlaces de tramos rastrean y correlacionan varios procesos paralelos que convergen en un único proceso combinado. Conectan los resultados de estos procesos paralelos con su resultado colectivo.

- **Agregación de mensajes**: En sistemas como Kafka Streams, los enlaces de tramos conectan cada mensaje de un grupo de mensajes con su resultado agregado, mostrando cómo los mensajes individuales contribuyen al resultado final.

- **Mensajería transaccional**: En situaciones en las que varios mensajes forman parte de una única transacción, como en las colas de mensajes, los enlaces de tramos rastrean la relación entre cada mensaje y el proceso transacción global.

- **Suministro de eventos**: Los enlaces de tramos del suministro de eventos rastrean cómo múltiples mensajes de cambio contribuyen al estado actual de una entidad.

## Creación de enlaces de tramos

Si tu aplicación está instrumentada con:

- El SDK de OpenTelemetry, sigue la documentación de OpenTelemetry para encontrar tu idioma. Por ejemplo, [crea tramos con enlaces para Java][3].
- El SDK Datadog, sigue los ejemplos de [Añadir enlaces de tramos][1].

## Compatibilidad mínima

**Nota***: Esta sección documenta la compatibilidad mínima necesaria para generar enlaces de tramos con bibliotecas cliente APM de Datadog (con la API de OpenTelemetry). Los enlaces de tramos generados por el SDK de OpenTelemetry se envían a Datadog a través del [consumo de OTLP][8].

Agent v7.52.0 o posterior para generar enlaces de tramos) utilizando [bibliotecas de rastreo de Datadog][7]. La compatibilidad con los enlaces de tramos se introdujo en las siguientes versiones:

| Lenguaje  | Versión mínima de librería de rastreo |
|-----------|---------------------------------|
| C++/proxy | Aún no es compatible               |
| Go        | 1.61.0                          |
| Java      | 1.26.0                          |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## Visualizar enlaces de tramos

Puedes consultar los enlaces de tramos desde el [Explorador de trazas][4] en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/custom_instrumentation/php/#adding-span-links-beta
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /es/tracing/trace_explorer/trace_view/?tab=spanlinksbeta#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/es/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /es/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
