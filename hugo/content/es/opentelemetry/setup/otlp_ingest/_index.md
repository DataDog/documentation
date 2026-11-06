---
aliases:
- /es/opentelemetry/setup/intake_endpoint/
- /es/opentelemetry/setup/agentless/
further_reading:
- link: /opentelemetry/setup
  tag: Documentación
  text: Enviar datos a Datadog
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: Blog
  text: Utilice la observabilidad nativa de OpenTelemetry con Datadog desde la ingesta
    hasta la investigación
title: Punto de conexión de ingesta OTLP de Datadog
---
## Descripción general {#overview}

Para cargas de trabajo de producción, Datadog recomienda enviar datos de OpenTelemetry a través de un [Datadog Agent][1] o [OpenTelemetry Collector][2]. Estos componentes proporcionan enriquecimiento de metadatos, procesamiento de señales y muestreo centralizado. La configuración recomendada del Collector exporta telemetría a Datadog a través de OTLP.

Utilice los puntos de conexión de ingesta directa de OTLP en esta página cuando no sea factible implementar un Collector o un Agent. Los ejemplos incluyen funciones Serverless, plataformas administradas que exportan telemetría en su nombre y entornos con restricciones estrictas de recursos.

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="Diagrama: El SDK de OpenTelemetry envía datos directamente a Datadog a través del punto de conexión de ingesta." style="width:100%;" >}}

Su configuración depende de dónde provenga su telemetría. Verifique primero la lista de [Plataformas administradas][6]; si su plataforma tiene un punto de conexión dedicado, utilícelo. De lo contrario, utilice las páginas Serverless o específicas de la señal.

| Si su telemetría proviene de... | Comience aquí |
|---|---|
| Una plataforma administrada (Cloudflare, Vercel, Heroku, Netlify, Modal y [otras][6]) | [Plataformas administradas][6] |
| Un entorno Serverless que envía trazas (Lambda, ECS Fargate, Azure Functions, Cloud Run, GKE Autopilot) | [Serverless][7] |
| Su propia aplicación, servidor o contenedor | [Logs][3], [Métricas][4] o [Trazas][8] |

Consulte también: [Instrumenting for Agent Observability][5].

## Límites de ingesta {#intake-limits}

Datadog aplica un tamaño máximo de carga útil por solicitud en cada punto de conexión de ingesta de OTLP. Las solicitudes que superan el límite son rechazadas con una `HTTP 413 Request Entity Too Large` respuesta. Si recibe un 413, reduzca el tamaño del lote de exportación o vacíe con mayor frecuencia para que cada solicitud se mantenga por debajo del límite.

| Señal  | Ruta del punto de conexión   | Tamaño máximo de carga útil    |
|---------|-----------------|-------------------------|
| Métricas | `/v1/metrics`   | 512 KiB (comprimido)    |
| Logs    | `/v1/logs`      | 5.1 MiB (sin comprimir)  |
| Trazas  | `/v1/traces`    | 15 MiB (sin comprimir)   |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/setup/otlp_ingest/logs/
[4]: /es/opentelemetry/setup/otlp_ingest/metrics/
[5]: /es/llm_observability/instrument/otel_instrumentation/?tab=python#setup
[6]: /es/opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /es/opentelemetry/setup/otlp_ingest/serverless/
[8]: /es/opentelemetry/setup/otlp_ingest/traces/