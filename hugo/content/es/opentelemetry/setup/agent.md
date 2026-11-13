---
description: Utilice el Datadog Agent para recibir datos OTLP de sus aplicaciones,
  o ejecute un OpenTelemetry Collector junto al Agent.
further_reading:
- link: /opentelemetry/setup/otlp_ingest_in_the_agent
  tag: Documentación
  text: Configure el punto de conexión OTLP del Agent
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentación
  text: Configure el Collector del Agent
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry con el Collector del Agent
- link: /opentelemetry/migrate/ddot_collector
  tag: Documentación
  text: Migre al Collector del Agent
title: Envíe datos de OpenTelemetry a través del Datadog Agent
---
## Descripción general {#overview}

Si ejecuta el Datadog Agent, puede enviar sus datos de OpenTelemetry a través de él. El Agent añade funciones de Datadog que lo requieren, tales como [{{< translate key="integration_count" >}}+ Integrations de Datadog][1], [Live Container Monitoring][3], [Cloud Network Monitoring][7] y [Universal Service Monitoring][5].

El Agent maneja los datos de OpenTelemetry de dos maneras:

- **[Punto de conexión OTLP del Agent](#otlp-ingest-in-the-agent)**: el Agent recibe datos OTLP de sus aplicaciones.
- **[Collector del Agent](#agents-collector)**: Un OpenTelemetry Collector se ejecuta junto al Agent como un proceso independiente, por lo que puede configurar sus propios pipelines.

Para enviar datos de OpenTelemetry sin el Agent, consulte [Envíe datos de OpenTelemetry a Datadog][9].

## Punto de conexión OTLP del Agent {#otlp-ingest-in-the-agent}

Sus aplicaciones, instrumentadas con SDK de OpenTelemetry, envían telemetría al Datadog Agent a través de OTLP.

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Su aplicación, instrumentada con un SDK de OpenTelemetry, envía OTLP al Datadog Agent, el cual lo envía a Datadog." style="width:100%;" >}}

**Ideal para**: equipos que desean enviar OTLP a Datadog con poca configuración y sin pipelines que administrar.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Configure el punto de conexión OTLP del Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Collector del Agent {#agents-collector}

El Collector del Agent es el OpenTelemetry Collector que se ejecuta junto al Datadog Agent como un proceso independiente. Configúrelo con la configuración estándar del OpenTelemetry Collector.

Para el DDOT Collector que se ejecuta sin el Agent, consulte [DDOT Collector][10].

{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
La Remote Configuration para el Collector del Agent está <strong>en versión preliminar</strong>. Utilice este formulario para solicitar acceso.
{{< /callout >}}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Descripción general de la arquitectura del Collector del Agent, un OpenTelemetry Collector implementado con el Datadog Agent." style="width:100%;" >}}

**Ideal para**: equipos que desean controlar sus pipelines de OpenTelemetry o enviar OTLP a otros destinos además de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}Configure el Collector del Agent{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/custom_components" >}}Utilice componentes personalizados de OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/ddot_collector" >}}Migre al Collector del Agent{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[3]: /es/containers/
[5]: /es/universal_service_monitoring/
[7]: /es/network_monitoring/cloud_network_monitoring/
[9]: /es/opentelemetry/setup/
[10]: /es/opentelemetry/setup/ddot_collector/