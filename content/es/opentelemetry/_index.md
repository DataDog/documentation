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
  text: Compatibilidad de características
- link: /opentelemetry/instrument/
  tag: Documentación
  text: Instrumenta tus aplicaciones
- link: /opentelemetry/setup/
  tag: Documentación
  text: Envía datos a Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: La asociación de Datadog con OpenTelemetry
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Realiza el seguimiento de aplicaciones instrumentadas con OpenTelemetry con
    soporte para W3C Trace Context
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envía métricas y trazas desde OpenTelemetry Collector a Datadog a través de
    Datadog Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: Blog
  text: Reenvía registros desde OpenTelemetry Collector con Datadog Exporter
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingesta OTLP en el Agente
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: Blog
  text: Aprende más sobre la capa Lambda administrada de AWS para OpenTelemetry
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlaciona eventos RUM de Datadog con trazas de aplicaciones instrumentadas
    con OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: Blog
  text: Realiza el seguimiento de métricas de tiempo de ejecución de aplicaciones
    instrumentadas con OTel con Datadog APM
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Cómo seleccionar tu implementación de OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centro de Aprendizaje
  text: Introducción a OpenTelemetry con Datadog
- link: https://learn.datadoghq.com/courses/understanding-opentelemetry
  tag: Centro de Aprendizaje
  text: Entendiendo OpenTelemetry
title: OpenTelemetry en Datadog
---
{{< learning-center-callout hide_image="true" header="Prueba \"Introducción a OTel con Datadog\" en el Centro de Aprendizajeer" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Aprende a configurar OpenTelemetry para exportar métricas, trazas y registros a Datadog, y explora los datos recopilados en la plataforma.
{{< /learning-center-callout >}}

## Descripción general {#overview}

[OpenTelemetry][1] (OTel) proporciona protocolos estandarizados para recopilar y enrutar datos de telemetría. Datadog admite múltiples formas de recopilar y analizar datos de telemetría de aplicaciones instrumentadas con OpenTelemetry, ya sea que estés utilizando la infraestructura existente de Datadog o prefieras una configuración neutral ante proveedores.

### ¿Por qué OpenTelemetry con Datadog? {#why-opentelemetry-with-datadog}

Datadog proporciona observabilidad avanzada para toda la telemetría de tu aplicación, independientemente de su fuente. Al admitir OpenTelemetry, Datadog ofrece:

- **Flexibilidad y elección**: Utiliza instrumentación estandarizada mientras mantienes la libertad de adaptarte a medida que evolucionen tus necesidades tecnológicas.
- **Soporte integral de lenguajes**: Monitorea de forma consistente las aplicaciones en toda tu pila tecnológica.
- **Instrumentación unificada**: Mantén un enfoque único para la instrumentación en tus sistemas.
- **Análisis potentes**: Combina la estandarización de OpenTelemetry con el robusto análisis, la visualización y las capacidades de alerta de Datadog.

Ya sea que estés utilizando OpenTelemetry o considerando su adopción, Datadog proporciona opciones flexibles para satisfacer tus necesidades.

### Decisiones clave {#key-decisions}

Hay dos decisiones clave que tomar al usar OpenTelemetry con Datadog:

- [Cómo instrumentar tus aplicaciones](#instrument-your-applications)
- [Cómo enviar tus datos a Datadog](#send-opentelemetry-data-to-datadog)

Las características disponibles para ti dependen de estas elecciones. Por ejemplo, usar la API de OpenTelemetry con el SDK de Datadog proporciona acceso a más características de Datadog que usar solo el SDK de OpenTelemetry.

Para más información, lee [Compatibilidad de características][9].

## Instrumenta tus aplicaciones {#instrument-your-applications}

Existen varias maneras de instrumentar tus aplicaciones con OpenTelemetry y Datadog. Cada enfoque proporciona diferentes características y niveles de neutralidad del proveedor.

- **OpenTelemetry Completo**: Usa el SDK y la API de OpenTelemetry para una configuración neutral respecto a proveedores.
- **API de OpenTelemetry**: Usa la API de OpenTelemetry con la implementación del SDK de Datadog.
- **Bibliotecas de instrumentación de OpenTelemetry**: Extiende la observabilidad de Datadog a marcos y tecnologías adicionales.

Para más información, consulta [Instrumenta tus Aplicaciones][8].

## Envía datos de OpenTelemetry a Datadog {#send-opentelemetry-data-to-datadog}

Si tus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry, puedes elegir cómo enviar trazas, métricas y datos de registros a Datadog.

<div class="alert alert-info"><strong>¿No estás seguro de qué configuración es la adecuada para ti?</strong><br> Consulta la tabla de <a href="/opentelemetry/compatibility/">Compatibilidad de Características</a> para entender qué características de Datadog son compatibles.</div>

### Opción 1: Usa el Agente de Datadog con el Colector DDOT (Recomendado) {#option-1-use-the-datadog-agent-with-ddot-collector-recommended}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Descripción general de la arquitectura para el Colector DDOT, que está integrado en el Agente de Datadog." style="width:100%;" >}}

**Mejor para**: Usuarios que buscan obtener tanto la neutralidad del proveedor OTel como las innovaciones del ecosistema de Datadog, tales como:

- Automatización de Flotas
- Monitoreo de Contenedores en Vivo
- Explorador de Kubernetes
- Procesos en Vivo
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Integraciones de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Aprende más sobre el uso del Agente de Datadog con el Colector DDOT{{< /nextlink >}}
{{< /whatsnext >}}

### Opción 2: Utilizar el Colector de OpenTelemetry {#option-2-use-the-opentelemetry-collector}

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El SDK de OpenTelemetry en el código envía datos a través de OTLP a un servidor que ejecuta el Colector de OpenTelemetry con el Exportador de Datadog, que reenvía a la Plataforma de Observabilidad de Datadog." style="width:100%;" >}}

**Mejor para**: Usuarios nuevos o existentes de OTel que desean una configuración completamente neutral respecto a proveedores.

- Completa neutralidad respecto a proveedores para enviar datos de OpenTelemetry a Datadog
- Opciones de configuración flexibles como muestreo basado en seguimiento de las últimas líneas y transformaciones de datos

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Obtén más información sobre el uso del Colector de OTel{{< /nextlink >}}
{{< /whatsnext >}}

### Opciones de configuración adicionales {#additional-setup-options}

Para otras opciones de configuración, incluyendo la ingestión directa de OTLP, consulta [Envía datos a Datadog][7].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /es/opentelemetry/setup
[8]: /es/opentelemetry/instrument/
[9]: /es/opentelemetry/compatibility/