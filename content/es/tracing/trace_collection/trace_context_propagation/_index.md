---
aliases: null
description: Extrae e inyecta cabeceras de contextos de rastreo Datadog, B3, y W3C
  para propagar el contexto de un rastreo distribuido.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Comprender la terminología de APM
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry con trazas de Datadog instrumentadas
title: Propagación del contexto de rastreo
type: lenguaje de código múltiple
---

La propagación de contextos de rastreo W3C está disponible para todos los lenguajes compatibles. El estilo de propagación de rastreo por defecto para todos los lenguajes es `datadog,tracecontext`. Los proxies Envoy y Nginx utilizan `tracecontext,datadog` por defecto.

Para obtener más información sobre las opciones de configuración de cada lenguaje para la propagación de contextos de rastreo, consulte las páginas siguientes:

{{< partial name="apm/apm-context-propagation" >}}


<br>

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otel_tracing/
