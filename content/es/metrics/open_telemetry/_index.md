---
aliases:
- /es/opentelemetry/otel_metrics
- /es/opentelemetry/reference/otel_metrics
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Obtener más información sobre OpenTelemetry
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Enviar métricas y trazas desde OpenTelemetry Collector a Datadog a través
    de Datadog Exporter
title: Métricas de OpenTelemetry
---

## Información general

[OpenTelemetry][1] es un marco de observabilidad de código abierto que proporciona a los equipos de TI protocolos y herramientas estandarizados para recopilar y enrutar datos de telemetría. Creado como proyecto incubador por la [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry proporciona un formato coherente para instrumentar, generar, recopilar y exportar datos de telemetría de aplicaciones como métricas, logs y trazas, a plataformas de monitorización para su análisis y comprensión.

## Configuración

Para enviar métricas de OpenTelemetry a Datadog, tienes tres opciones principales:

- [Colector OpenTelemetry][3]
- [Datadog Agent ][4]
- [Despliegue agentless][5]

Para obtener más información sobre qué configuración es la más adecuada para ti, consulta [Enviar datos de OpenTelemetry a Datadog][6].

## Consulta de métricas en Datadog y OpenTelemetry 

Dado que las métricas de OTel y Datadog suelen utilizar convenciones de nomenclatura y definiciones semánticas diferentes, crear una visión unificada de tu infraestructura en estos entornos puede resultar complicado.

Datadog te ayuda a salvar esta distancia permitiéndote:

- Consultar en forma conjunta las métricas de OTel y Datadog.
- Comprender cómo se relacionan entre sí las métricas de OTel y Datadog.

Para obtener más información, lee [Consulta de métricas de Datadog y OpenTelemetry][7].

## Tipos de métricas de OTLP

El Datadog Agent y el exportador Datadog del recopilador OpenTelemetry pueden consumir métricas en el formato OpenTelemetry (OTLP), que puede ser generado por aplicaciones instrumentadas por OpenTelemetry. 

Para obtener más información, lee [Tipos de métricas de OTLP][10].

## Dashboards predefinidos

Datadog proporciona dashboards predefinidos que puedes copiar y personalizar. Para utilizar los dashboards de OpenTelemetry predefinidos de Datadog, ve a **Dashboards** > **Lista de dashboards** y busca `opentelemetry`:

{{< img src="metrics/otel/dashboard.png" alt="La Lista de dashboards, que muestra dos dashboards predefinidos de OpenTelemetry: métricas de host y métricas de Collector." style="width:80%;">}}

El dashboard **Métricas del host** es para los datos recopilados del [receptor de métricas del host][8]. El dashboard **Métricas del recopilador** es para cualquier otro tipo de métrica recopilada, según el [receptor de métricas][9] que optes por activar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /es/opentelemetry/setup/collector_exporter/
[4]: /es/opentelemetry/setup/agent
[5]: /es/opentelemetry/setup/agentless
[6]: /es/opentelemetry/setup/
[7]: /es/metrics/open_telemetry/query_metrics
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
[10]: /es/metrics/open_telemetry/otlp_metric_types