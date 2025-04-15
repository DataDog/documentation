---
description: Aprende a navegar en los tramos (spans) de LLM Observability y los tramos
  de APM para que obtener información sobre las operaciones específicas de LLM y tu
  ecosistema de aplicaciones más amplio.
further_reading:
- link: /llm_observability/terms/
  tag: Documentación
  text: Más información sobre los tramos de LLM Observability
- link: /glossary/#span/
  tag: Documentación
  text: Más información sobre los tramos de APM
- link: https://www.datadoghq.com/blog/troubleshooting-rag-llms/
  tag: Blog
  text: Solucionar problemas de aplicaciones LLM basadas en RAG
title: Uso de LLM Observability y APM
---

## Información general

Esta guía explica cómo puedes utilizar tanto LLM Observability como APM para vincular  [tramos][6] de LLM Observability y APM en Datadog. 

Al instrumentar tus operaciones específicas de LLM con LLM Observability y tu aplicación más amplia con APM, puedes lograr lo siguiente:



* Comprender la visibilidad de extremo a extremo: explora las solicitudes ascendentes y descendentes de tus aplicaciones de LLM en el contexto de toda tu aplicación.
* Desde APM, profundizar en LLM Observability: investiga si un problema con tu aplicación es específico de aplicaciones específicas de LLM, como una llamada a OpenAI.

## Configuración

El SDK de LLM Observability se basa en el dd-tracer de APM. Esto permite utilizar LLM Observability con [Application Performance Monitoring (APM)][7].

Si estás utilizando el [SDK de LLM Observability para Python][1] junto con el [`dd-tracer`][2] de APM, puedes navegar entre tramos en Datadog APM y LLM Observability sin configuración adicional.

Si utilizas la [API de LLM Observability][3] con `dd-tracer` para APM:

1. Utiliza el método apropiado para obtener el ID de tramo del rastreador (por ejemplo, utilizando `span.Context().SpanID()` para el rastreador de Go).
1. Incluye los IDs capturados de tramo (span) en todas las solicitudes de la API de LLM Observability. Esto vincula tramos de APM y LLM Observability en Datadog.

## Navegar entre tramos

Mediante el uso de esta integración, puedes correlacionar los datos a través de tu stack tecnológico de aplicaciones y entender cómo tus aplicaciones de LLM interactúan con otros componentes. También puedes resolver problemas más rápidamente y optimizar el rendimiento de tu aplicación.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="Este vídeo demuestra la capacidad de navegar entre tramos de LLM Observability y tramos de APM en Datadog" style="width:100%" video=true >}}

### Desde LLM Observability a APM

Para comprender el contexto más amplio de tus operaciones de LLM dentro de tu ecosistema de aplicaciones, selecciona un tramo de LLM Observability en el [LLM Observability Explorer][4] y haz clic en **APM span** (Tramo de APM) para navegar al tramo de APM pertinente.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="Un tramo de LLM Observability con un tramo de APM al que puedes navegar desde la página de Trazas en LLM Observability" style="width:100%;" >}}

### De APM a LLM Observability

Para acceder a la información específica del LLM, selecciona un tramo de APM en el [Trace Explorer][5] y haz clic en **View Span** (Ver tramo) en la sección LLM Observability en la pestaña **Info** (Información) para navegar al tramo correspondiente de LLM Observability.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="Un tramo de APM con un tramo de LLM Observability relacionado al que puedes navegar desde la página Trazas en APM" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/llm_observability/setup/sdk/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /es/llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /es/llm_observability/terms/#spans
[7]: /es/tracing