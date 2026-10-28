---
aliases:
- /es/llm_observability/guide/llm_observability_and_apm
- /es/llm_observability/monitoring/llm_observability_and_apm/
description: Aprenda a navegar entre los tramos de Agent Observability y los tramos
  de APM para que pueda obtener información sobre las operaciones específicas de LLM
  y su ecosistema de aplicaciones más amplio.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Obtenga información sobre los tramos de Agent Observability
- link: /glossary/#span/
  tag: Documentación
  text: Obtenga información sobre los tramos de APM
- link: https://www.datadoghq.com/blog/troubleshooting-rag-llms/
  tag: Blog
  text: Solución de problemas de aplicaciones LLM basadas en RAG
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centro de aprendizaje
  text: Investigue con LLM Observability
title: Correlación de Agent Observability y APM
---
## Descripción general {#overview}

Esta guía explica cómo puede utilizar tanto Agent Observability como APM para correlacionar [tramos][6] de Agent Observability y APM en Datadog. 

Al instrumentar sus operaciones específicas de LLM con Agent Observability y su aplicación más amplia con APM, puede lograr lo siguiente:



* Comprenda la visibilidad de extremo a extremo: Explore las solicitudes ascendentes y descendentes de sus aplicaciones LLM dentro del contexto de toda su aplicación.
* Desde APM, profundice en Agent Observability: Investigue si un problema con su aplicación es específico de las aplicaciones LLM, como una llamada a OpenAI.

## Configuración {#setup}

El SDK de Agent Observability está construido sobre el dd-tracer de APM. Esto le permite usar Agent Observability con [Application Performance Monitoring (APM)][7]

Si está utilizando el [Agent Observability SDK for Python][1] junto con [`dd-tracer`][2] de APM, puede navegar entre los tramos en Datadog APM y Agent Observability sin configuración adicional.

Si está utilizando la [Agent Observability API][3] con `dd-tracer` para APM:

1. Utilice el método adecuado para obtener el ID de tramo del tracer (por ejemplo, usando `span.Context().SpanID()` para el tracer de Go).
1. Incluya los ID de tramo capturados en todas las solicitudes de la Agent Observability API. Esto vincula los tramos de APM y Agent Observability en Datadog.

## Navegue entre tramos {#navigate-between-spans}

Al utilizar esta integración, puede correlacionar datos en toda su pila de aplicaciones y comprender cómo interactúan sus aplicaciones LLM con otros componentes. También puede resolver problemas más rápidamente y optimizar el rendimiento de su aplicación.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="Este video demuestra la capacidad de navegar entre los tramos de Agent Observability y los tramos de APM en Datadog" style="width:100%" video=true >}}

### De Agent Observability a APM {#from-agent-observability-to-apm}

Para comprender el contexto más amplio de sus operaciones de LLM dentro del ecosistema de su aplicación, seleccione un tramo de Agent Observability en el [Agent Observability Explorer][4] y haga clic en {{< ui >}}APM span{{< /ui >}} para navegar al tramo de APM relevante.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="Un tramo de Agent Observability con un tramo de APM relacionado al que puede navegar desde la página de Traces en Agent Observability." style="width:100%;" >}}

### De APM a Agent Observability {#from-apm-to-agent-observability}

Para acceder a información específica de LLM, seleccione un tramo de APM en el [Trace Explorer][5] y haga clic en {{< ui >}}View Span{{< /ui >}} en la sección de Agent Observability en la pestaña {{< ui >}}Info{{< /ui >}} para navegar al tramo de Agent Observability correspondiente.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="Un tramo de APM con un tramo de Agent Observability relacionado al que puede navegar desde la página de Traces en APM." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/sdk/
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /es/llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /es/llm_observability/quickstart/terms/#spans
[7]: /es/tracing