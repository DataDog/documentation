---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
aliases:
- /es/tracing/setup_overview/open_standards/
- /es/opentelemetry/interoperability/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentación
  text: Compatibilidad de funciones
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumenta tus solicitudes
- link: /opentelemetry/setup/
  tag: Documentación
  text: Envía datos a Datadog
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
  text: Ingestión de OpenTelemetry Protocol en el Agent
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
    por OpenTelemetry con Datadog APM
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Cómo seleccionar el despliegue de OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centro de aprendizaje
  text: Introducción a OpenTelemetry con Datadog
title: OpenTelemetry en Datadog
---

{{< learning-center-callout hide_image="true" header="Try \"Introduction to OTel with Datadog\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Aprende cómo configurar OpenTelemetry para exportar métricas, trace (trazas) y logs a Datadog y explorar los datos recopilados en la plataforma.
{{< /learning-center-callout >}}

## Información general

[OpenTelemetry][1] (OTel) proporciona protocolos estandarizados para recopilar y enrutar datos telemétricos. Datadog admite múltiples formas de recopilar y analizar datos telemétricos de aplicaciones instrumentadas con OpenTelemetry, tanto si utilizas la infraestructura de Datadog como si prefieres una configuración independiente del proveedor.

### ¿Por qué OpenTelemetry con Datadog?

Datadog proporciona observabilidad avanzada para toda la telemetría de tu aplicación, independientemente de su source (fuente). Al ser compatible con OpenTelemetry, Datadog ofrece:

- **Flexibilidad y capacidad de elección**: Utiliza la instrumentación estandarizada mientras mantienes la libertad de adaptarte a medida que evolucionen tus necesidades tecnológicas.
- **Compatibilidad con todos los lenguajes**: Consistentemente aplicaciones de monitorización en todo tu stack tecnológico.
- **Instrumentación unificada**: Mantén un enfoque único de instrumentación en todos tus sistemas.
- **Potentes análisis**: Combina la estandarización de OpenTelemetry con las sólidas funciones de análisis, visualización y alerta de Datadog.

Tanto si ya utilizas OpenTelemetry como si estás considerando adoptarlo, Datadog ofrece opciones flexibles para satisfacer tus necesidades.

### Decisiones clave

Hay dos decisiones clave que tomar cuando se utiliza OpenTelemetry con Datadog:

- [Cómo instrumentar tus aplicaciones](#instrument-your-applications)
- [Cómo enviar tus datos a Datadog](#send-opentelemetry-data-to-Datadog)

Las funciones disponibles dependen de estas opciones. Por ejemplo, el uso de la API OpenTelemetry con el kit de desarrollo de software (SDK) de Datadog proporciona acceso a más funciones de Datadog que el uso del kit de desarrollo de software (SDK) de OpenTelemetry por sí solo.

Para obtener más información, lee [Compatibilidad de funciones][9].

## Instrumenta tus aplicaciones

Hay varias maneras de instrumentar tus aplicaciones con OpenTelemetry y Datadog. Cada enfoque ofrece diferentes funciones y niveles de neutralidad del proveedor.

- **OpenTelemetry completo**: Utiliza el kit de desarrollo de software (SDK) y la API de OpenTelemetry para una configuración independiente del proveedor.
- **API de OpenTelemetry**: Utiliza la API de OpenTelemetry con la implementación del kit de desarrollo de software (SDK) de Datadog.
- **Bibliotecas de instrumentación de OpenTelemetry**: Extiende la observabilidad de Datadog a marcos y tecnologías adicionaleslogies.

Para obtener más información, consulta [Instrumenta tus aplicaciones][8]. 

## Envía los datos de OpenTelemetry a Datadog

Si tus aplicaciones y servicios están instrumentadas con bibliotecas de OpenTelemetry, puedes elegir cómo obtener datos de traces (trazas), métricas y logs en Datadog.

<div class="alert alert-info"><strong>¿No estás seguro de qué configuración te conviene?</strong><br> Consulta la tabla de <a href="/opentelemetry/compatibility/">compatibilidad de funciones</a> para saber qué funciones de Datadog son compatibles.</div>

### Opción 1: Utilizar OpenTelemetry Collector

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El kit de desarrollo de software (SDK) de OpenTelemetry en código envía datos a través de OpenTelemetry Protocol al host que ejecuta OpenTelemetry Collector con el exportador de Datadog, que los reenvía a la plataforma de observabilidad de Datadog." style="width:100%;" >}}

**Lo mejor para**: Usuarios nuevos o existentes de OpenTelemetry que deseen una configuración completamente independiente del proveedor.

- Neutralidad total del proveedor para el envío de datos de OpenTelemetry a Datadog
- Opciones flexibles de configuración, como el muestreo por colas y las transformaciones de datos.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Más información sobre el uso de OpenTelemetry Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Opción 2: Utilizar el Datadog Agent con Datadog distribution of OpenTelemetry (DDOT) Collector

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Información general de la arquitectura de Datadog distribution of OpenTelemetry (DDOT) Collector, que está integrada en el Datadog Agent." style="width:100%;" >}}

**Lo mejor para**: Los usuarios existentes Datadog o equipos que requieren funciones basadas en el Agent como por ejemplo:

- Automatización de flotas
- Container Monitoring en tiempo real
- Explorer de Kubernetes
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Integraciones de Datadog

<div class="alert alert-info">Si deseas consultar una lista completa de las funciones basadas en el Agent, consulta <strong>OpenTelemetry al Datadog Agent (OpenTelemetry Protocol)</strong> en <a href="/opentelemetry/compatibility/">Compatibilidad de funciones</a>.</div>

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Más información sobre el uso del Datadog Agent con Datadog distribution of OpenTelemetry (DDOT) Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Opciones de configuración adicionales

Para conocer otras opciones de configuración, como el despliegue Agentless, consulta [Enviar datos a Datadog][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /es/opentelemetry/setup
[8]: /es/opentelemetry/instrument/
[9]: /es/opentelemetry/compatibility/