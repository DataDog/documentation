---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /es/tracing/setup_overview/open_standards/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Asociación de Datadog con OpenTelemetry
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Monitorizar aplicaciones instrumentadas con OpenTelemetry compatibles con
    el contexto de rastreo de W3C
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Enviar métricas y trazas (traces) desde OpenTelemetry Collector a Datadog
    a través del Exportador Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: Blog
  text: Reenviar logs desde OpenTelemetry Collector con el Exportador Datadog
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingestión de OTLP en el Agent
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: Blog
  text: Más información sobre la capa Lambda gestionada de AWS para OpenTelemetry
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacionar eventos de Datadog RUM con trazas de aplicaciones instrumentadas
    con OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: Blog
  text: Monitorizar métricas de tiempo de ejecución desde aplicaciones instrumentadas
    por OTel con Datadog APM
title: OpenTelemetry en Datadog
---

## Información general

[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría. Creado como proyecto incubador por la [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry proporciona un formato coherente para instrumentar, generar, recopilar y exportar datos de telemetría de aplicaciones como métricas, logs y trazas, a plataformas de monitorización para su análisis y comprensión.

Si tus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry, puedes elegir cómo enviar trazas, métricas, y datos de logs al backend Datadog:

1. [Enviar datos a OpenTelemetry Collector y utilizar el Exportador Datadog para reenviarlos a Datadog][3] o bien

2. [Ingerir datos con el Datadog Agent, que los recopila para Datadog][4].

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Asigna opciones para la generación de datos de telemetría y su envío a productos de observabilidad.">}}

<div class="alert alert-info"><strong>Instrumentación personalizada con la API OpenTelemetry</strong></br>Puedes configurar aplicaciones OpenTelemetry instrumentadas para utilizar el SDK Datadog APM para procesar tramos (spans) y trazas. Para obtener más información, consulta <a href="/tracing/trace_collection/otel_instrumentation/">Instrumentación personalizada con la API OpenTelemetry</a>.</div>

Datadog es compatible con el [Contexto de rastreo W3C estándar][6], lo que garantiza la captura completa de trazas, incluso cuando una solicitud viaja entre servicios que han sido instrumentadas con diferentes herramientas. Los servicios pueden ser instrumentados con cualquier sistema, como una biblioteca de OpenTelemetry o una biblioteca de rastreo de Datadog, que siga el Contexto de rastreo W3C estándar. Para obtener más información, consulta [Propagación del contexto de rastreo][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /es/opentelemetry/collector_exporter/
[4]: /es/opentelemetry/otlp_ingest_in_the_agent/
[5]: /es/tracing/trace_collection/trace_context_propagation/
[6]: https://www.w3.org/TR/trace-context/

{{< learning-center-callout header="Intentar comprender OpenTelemetry en el Centro de aprendizaje" btn_title="Inscribirse ahora" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry">}}
Descubre los fundamentos de OpenTelemetry, un estándar de código abierto para la recopilación de datos de telemetría. Este curso ofrece una visión general de las capacidades y beneficios de OpenTelemetry, y te prepara para integrar la observabilidad en tus aplicaciones.
{{< /learning-center-callout >}}