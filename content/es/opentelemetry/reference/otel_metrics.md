---
aliases:
- /es/opentelemetry/otel_metrics
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Obtener más información sobre OpenTelemetry
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Enviar métricas y trazas (traces) desde OpenTelemetry Collector a Datadog
    a través del Exportador Datadog
title: Enviar métricas desde OpenTelemetry a Datadog
---

## Información general

[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría. Creado como proyecto incubador por la [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry proporciona un formato coherente para instrumentar, generar, recopilar y exportar datos de telemetría de aplicaciones como métricas, logs y trazas, a plataformas de monitorización para su análisis y comprensión.

## Configuración

Para enviar métricas de OpenTelemetry a Datadog, tienes tres opciones principales:

- [OpenTelemetry Collector][11]
- [Datadog Agent][12]
- [Ingesta directa en OpenTelemetry Protocol][13]

Para más información sobre qué configuración es la más adecuada para ti, consulta [Enviar datos de OpenTelemetry a Datadog][10].

## Consulta de métricas en Datadog y OpenTelemetry 

Dado que las métricas de OTel y Datadog suelen utilizar convenciones de nomenclatura y definiciones semánticas diferentes, crear una visión unificada de tu infraestructura en estos entornos puede resultar complicado.

Datadog te ayuda areducir esta brecha al permitirte:

- Consultar en conjunto las métricas de OTel y Datadog.
- Comprender cómo se relacionan entre sí las métricas de OTel y Datadog.

Para obtener más información, lee [Consulta de métricas de Datadog y OpenTelemetry][14]

## Dashboards predefinidos

Datadog proporciona dashboards predefinidos que puedes copiar y personalizar. Para utilizar los dashboard predefinidos de OpenTelemetry de Datadog, ve a **Dashboards** > Dashboards list** (Dashboards > Lista de dashboards) y busca `opentelemetry`:

{{< img src="metrics/otel/dashboard.png" alt="La Lista de dashboards, que muestra dos dashboards predefinidos de OpenTelemetry: métricas de host y métricas de Collector." style="width:80%;">}}

El dashboard **Host Metrics** (Métricas del host) es para los datos recopilados del [receptor de métricas del host][8]. El dashboard **Collector Metrics** (Métricas del recopilador) es para cualquier otro tipo de métrica recopilada, dependiendo del [receptor de métricas][9] que elijas habilitar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://www.datadoghq.com/pricing/?product=infrastructure#infrastructure
[4]: https://opentelemetry.io/docs/
[5]: /es/opentelemetry/otel_collector_datadog_exporter/
[6]: /es/opentelemetry/otlp_ingest_in_the_agent/
[7]: /es/opentelemetry/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[10]: /es/opentelemetry/setup/
[11]: /es/opentelemetry/setup/collector_exporter/
[12]: /es/opentelemetry/setup/agent
[13]: /es/opentelemetry/setup/agentless
[14]: /es/metrics/open_telemetry/query_metrics