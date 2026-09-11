---
aliases:
- /es/opentelemetry/setup/agentless/managed_platforms
description: Envíe trazas, métricas y registros desde plataformas administradas como
  Cloudflare, Vercel y Heroku directamente a Datadog a través de puntos de conexión
  OTLP dedicados.
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad con OpenTelemetry en Datadog
- link: /opentelemetry/setup/otlp_ingest/
  tag: Documentación
  text: Punto de conexión de ingesta OTLP de Datadog
title: Ingesta OTLP para plataformas administradas
---
## Descripción general {#overview}

Datadog proporciona puntos de conexión de ingesta OTLP dedicados para plataformas administradas, lo que le permite enviar trazas, métricas y registros directamente a Datadog con una configuración mínima. Cada plataforma compatible tiene su propio subdominio OTLP (por ejemplo, `cloudflare.integrations.otlp.datadoghq.com`). Estos puntos de conexión dedicados permiten a Datadog identificar la fuente del tráfico y aplicar procesamiento y atribución específicos de la plataforma. El punto de conexión OTLP genérico asume que hay un servidor presente, lo que puede causar un comportamiento inesperado para el tráfico de plataformas administradas.

Utilice esta opción cuando ejecute cargas de trabajo en una plataforma administrada donde no sea factible instalar un [Datadog Agent][1] o un [OpenTelemetry Collector][2]. Si su plataforma no se encuentra en la tabla a continuación y usted ejecuta en cómputo sin servidor de AWS, Azure o GCP, consulte [Serverless][5].

<div class="alert alert-danger">Los metadatos de host enviados a los puntos de conexión de plataformas administradas no completan la <a href="/infrastructure/list/">Lista de hosts de infraestructura</a>.</div>

Cada punto de conexión admite las siguientes rutas de señal:

| Señal  | Ruta          |
|---------|---------------|
| Trazas  | `/v1/traces`  |
| Métricas | `/v1/metrics` |
| Registros    | `/v1/logs`    |

Para la configuración específica de la señal (traducción de métricas, procesamiento de registros), consulte las páginas de los puntos de conexión de [Logs][6] y [Metrics][7].

## Configuración {#configuration}

Para enviar datos OTLP a Datadog a través de un punto de conexión de plataforma administrada, configure su exportador de OpenTelemetry con las siguientes variables de entorno. Reemplace `{platform}` con el subdominio de su plataforma de la tabla de [plataformas compatibles](#supported-platforms).

```shell
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}"
export OTEL_EXPORTER_OTLP_HEADERS="dd-api-key=${DD_API_KEY}"
```

Para enviar solo trazas:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY}"
```

<div class="alert alert-info">Los puntos de conexión de plataformas administradas no utilizan el <code>dd-otlp-source</code> encabezado. Si migra desde el punto de conexión OTLP genérico, elimine este encabezado de su configuración.</div>

## Plataformas compatibles {#supported-platforms}

Todos los puntos de conexión siguen el patrón `https://{subdomain}.integrations.otlp.{{< region-param key="dd_site" >}}/`.

| Plataforma | Subdominio | Guía de configuración |
|---|---|---|
| AWX | `awx` | — |
| Claude | `claude` | — |
| Cloudflare | `cloudflare` | [Observabilidad de Cloudflare Workers][11] |
| Cribl | `cribl` | — |
| GitHub Actions | `github-actions` | — |
| Grafbase | `grafbase` | [Observabilidad de Grafbase][12] |
| Heroku | `heroku` | [Telemetría de Heroku][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livekit` | — |
| Modal | `modal` | [Modal OpenTelemetry][14] |
| MuleSoft | `mulesoft` | [MuleSoft Telemetry Exporter][15] |
| Netlify | `netlify` | — |
| OpenTofu | `opentofu` | — |
| Retool | `retool` | [Monitoreo de rendimiento de Retool][16] |
| RWX | `rwx` | [RWX OpenTelemetry][17] |
| Salesforce | `sfdc` | — |
| Shopify | `shopify` | — |
| Solace | `solace` | — |
| Spacelift | `spacelift` | — |
| Supabase | `supabase` | — |
| Svix | `svix` | — |
| Trigger.dev | `triggerdev` | — |
| Vercel | `vercel` | [Vercel Marketplace][18] |

Para habilitar la exportación OTLP desde una plataforma administrada que no aparezca en la lista anterior, comuníquese con su Customer Success Manager.

## Limitaciones {#limitations}

### Sin enriquecimiento de metadatos {#no-metadata-enrichment}

Sin un Collector o Agent, la telemetría no se enriquece con metadatos de host. Las funciones que dependen de estos metadatos (por ejemplo, la [Lista de hosts de infraestructura][8]) no están disponibles. Consulte la [lista de compatibilidad de OpenTelemetry][4] para ver la lista completa de funciones afectadas.

### Normalización limitada {#limited-normalization}

Cierto procesamiento de señales que un Collector o Agent realiza automáticamente no ocurre con la ingesta directa. Por ejemplo, la conversión de métricas de acumulativo a delta requiere un componente con estado. Si su plataforma exporta métricas acumulativas, configure su SDK o pipeline para exportar temporalidad delta.

### Métricas de traza {#trace-metrics}

Las [métricas de traza][3] se calculan de forma predeterminada para los puntos de conexión de plataformas administradas. Las plataformas administradas pueden muestrear el tráfico antes de la exportación, lo cual puede afectar la precisión de las métricas de traza.

### Muestreo {#sampling}

Los controles de muestreo disponibles en el Collector (muestreo basado en el seguimiento de las últimas líneas, muestreo probabilístico) no están disponibles con la ingesta directa. Las plataformas administradas pueden aplicar su propio muestreo antes de la exportación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/otlp_ingest_in_the_agent/
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/tracing/metrics/
[4]: /es/opentelemetry/compatibility/
[5]: /es/opentelemetry/setup/otlp_ingest/serverless/
[6]: /es/opentelemetry/setup/otlp_ingest/logs/
[7]: /es/opentelemetry/setup/otlp_ingest/metrics/
[8]: /es/infrastructure/list/
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://www.rwx.com/docs/observability/datadog
[18]: https://vercel.com/marketplace/datadog