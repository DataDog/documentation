---
further_reading:
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumente sus aplicaciones
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Cómo seleccionar su despliegue de OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centro de aprendizaje
  text: Introducción a OpenTelemetry con Datadog
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: Centro de aprendizaje
  text: Uso de la distribución de Datadog del Collector de OpenTelemetry
title: Enviar datos de OpenTelemetry a Datadog
---
Esta página describe todas las formas en las que puede enviar datos de OpenTelemetry (OTel) a Datadog.

## DDOT Collector (Recomendado) {#ddot-collector-recommended}

Datadog Distribution of OpenTelemetry (DDOT) Collector es una solución de código abierto que combina la flexibilidad de OpenTelemetry con las capacidades integrales de observabilidad de Datadog.

Este enfoque le brinda control total sobre las canalizaciones de OpenTelemetry y, al mismo tiempo, proporciona acceso a funciones potentes basadas en el Datadog Agent :

- Fleet Automation
- Container Monitoring en vivo
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Integraciones de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Otras opciones de configuración {#other-setup-options}

Existen métodos alternativos disponibles para casos de uso específicos, como ejecutar su propia distribución de OpenTelemetry Collector u operar en entornos que no son de Kubernetes.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Best for: Users who manage their own OpenTelemetry Collector or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest</h3>
    Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>¿Aún no está seguro de qué configuración es la adecuada para usted?</strong><br> Consulte la tabla de <a href="/opentelemetry/compatibility/">Compatibilidad de funciones</a> para comprender qué funciones de Datadog son compatibles.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/agent
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/setup/agentless
[4]: /es/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /es/opentelemetry/agent
[6]: /es/opentelemetry/setup/otlp_ingest_in_the_agent