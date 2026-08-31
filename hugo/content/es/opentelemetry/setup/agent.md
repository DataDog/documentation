---
further_reading:
- link: opentelemetry/agent/
  tag: Documentación
  text: Datadog Agent con el DDOT Collector
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentación
  text: Instalar el Datadog Agent con DDOT OpenTelemetry Collector
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
- link: /opentelemetry/guide/migrate/ddot_collector
  tag: Documentación
  text: Migrar al Datadog Agent con DDOT OpenTelemetry Collector
- link: /opentelemetry/setup/otlp_ingest_in_the_agent
  tag: Documentación
  text: Ingesta de OTLP en el Agent
title: Datadog Agent
---

## Información general

El envío de datos a Datadog a través del Datadog Agent es una excelente opción para los usuarios de Datadog o los equipos que necesiten funciones basadas en el Agent.

**Principales ventajas:**
- Accede a [{{< translate key="integration_count" >}}+ integraciones de Datadog][1], [Live Container Monitoring][3], [Cloud Network Monitoring][7], [Universal Service Monitoring][5] (con eBPF) y más
- Aprovecha las integraciones basadas en la contribución de la comunidad de OpenTelemetry para recopilar telemetría en formato nativo OTLP
- Benefíciate de las sólidas prácticas de seguridad de Datadog, que incluyen exploraciones y análisis periódicos de vulnerabilidades
- Accede al equipo de soporte global de Datadog para obtener ayuda con la incorporación y la solución de problemas

El Datadog Agent ofrece dos formas de ingesta de datos de OpenTelemetry:

- **[Datadog distribution of OpenTelemetry (DDOT) Collector](#datadog-distribution-of-opentelemetry-ddot-collector)**: utiliza el DDOT Collector incrustado en el Datadog Agent.
- **[Ingesta OTLP en el Agent](#otlp-ingest-in-the-agent)**: envía datos de telemetría al Datadog Agent utilizando el OpenTelemetry Protocol (OTLP).

## Datadog Distribution of OpenTelemetry (DDOT) Collector

El DDOT Collector combina el Datadog Agent con un OpenTelemetry Collector integrado. Esta opción es la más adecuada para los usuarios de Kubernetes que deseen aprovechar al máximo las capacidades del Collector, como el procesamiento de los datos avanzados y la exportación de datos OTLP a múltiples destinos.

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Información general de la arquitectura del DDOT Collector, incrustada en el Datadog Agent." style="width:100%;" >}}

**Utiliza el DDOT Collector si**:

- Deseas tener un control total sobre los pipelines de OpenTelemetry, incluidos los procesadores y exportadores
- Planeas reenviar datos OTLP a múltiples backends más allá de Datadog
- Ejecutas en un entorno de Kubernetes de Linux

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/" >}}Más información sobre el DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

## Ingesta de OTLP en el Agent

La ingesta de OTLP en el Agent es una forma de enviar datos de telemetría directamente desde aplicaciones instrumentadas con SDKs de OpenTelemetry al Agent.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Datos de OpenTelemetry que fluyen por el Datadog Agent" style="width:100%;" >}}

**Utiliza la ingesta de OTLP en el Agent si**:

- Planeas enviar todos los datos de telemetría OTLP directamente a Datadog sin necesidad de personalizar el procesamiento o múltiples destinos
- Prefieres un enfoque con un mínimo de configuración que no requiere la gestión de pipelines de OpenTelemetry
- Ejecutas en plataformas distintas de Kubernetes de Linux, como Windows, bare-metal EC2, entornos de VM, u [otras plataformas compatibles][8].

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Más información sobre la ingesta de OTLP en el Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[3]: /es/containers/
[5]: /es/universal_service_monitoring/
[7]: /es/network_monitoring/cloud_network_monitoring/
[8]: /es/agent/basic_agent_usage/?tab=Linux#supported-platforms