---
further_reading:
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumentar tus aplicaciones
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Seleccionar el depsliegue de OpenTelemetry
title: Enviar datos de OpenTelemetry a Datadog
---

En esta página se describen todas las formas de enviar datos de OpenTelemetry (OTel) a Datadog.

## Datadog distribution of OpenTelemetry (DDOT) Collector (Recomendado)

Datadog distribution of OpenTelemetry (DDOT) Collector es una solución de código abierto que combina la flexibilidad de OpenTelemetry con las amplias capacidades de observabilidad de Datadog.

Este enfoque te ofrece un control total sobre los procesos de OpenTelemetry, a la vez que te proporciona acceso a potentes funciones basadas en el Datadog Agent, entre las que se incluyen:

- Automatización de flotas
- Container Monitoring en tiempo real
- Explorer de Kubernetes
- Live Processes
- Monitorización de redes en la nube
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Integraciones de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Instala el Datadog distribution of OpenTelemetry (DDOT) Collector</h3>
    Sigue nuestra configuración guiada para instalar el Collector y comenzar a enviar tus datos de OpenTelemetry a Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Otras opciones de configuración

Existen métodos alternativos para casos de uso específicos, como el mantenimiento de un pipeline de proveedor neutral o la ejecución en entornos que no sean Kubernetes.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>OpenTelemetry Collector independiente</h3>
    Útil para usuarios que prefieran usar distribuciones del OTel Collector desde la comunidad de código abierto de OpenTelemetry o que requieran funciones de procesamiento avanzadas como el muestreo basado en el seguimiento de logs.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>Ingesta OTLP en el Agent</h3>
    Útil para usuarios en plataformas que no sean Kubernetes Linux, o aquellos que prefieran una configuración mínima sin administrar los pipelines del Collector.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Ingesta directa de OTLP (Vista previa)</h3>
    Útil para situaciones que requieren la trasmisión directa de datos al endpoint de entrada de Datadog sin componentes intermediarios.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>¿Aún no sabes cuál es la configuración más adecuada para ti?</strong><br> Consulta la tabla de <a href="/opentelemetry/compatibility/">compatibilidad de funciones</a> para saber qué funciones de Datadog son compatibles.</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/setup/agent
[2]: /es/opentelemetry/setup/collector_exporter/
[3]: /es/opentelemetry/setup/agentless
[4]: /es/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /es/opentelemetry/agent
[6]: /es/opentelemetry/setup/otlp_ingest_in_the_agent