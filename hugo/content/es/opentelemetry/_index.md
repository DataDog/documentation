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
  text: Instrumente sus aplicaciones
- link: /opentelemetry/setup/
  tag: Documentación
  text: Enviar datos a Datadog
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: La asociación de Datadog con OpenTelemetry
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Haga un seguimiento de aplicaciones instrumentadas con OpenTelemetry con soporte
    para W3C Trace Context
- link: https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/
  tag: Blog
  text: Envíe métricas y trazas desde OpenTelemetry Collector a Datadog a través de
    Datadog Exporter
- link: https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/
  tag: Blog
  text: Reenvíe registros desde OpenTelemetry Collector con Datadog Exporter
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: Blog
  text: Ingesta de OTLP en el Agent
- link: https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/
  tag: Blog
  text: Obtenga más información sobre la capa Lambda administrada de AWS para OpenTelemetry
- link: https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/
  tag: Blog
  text: Correlacione eventos de Datadog RUM con trazas de aplicaciones instrumentadas
    con OpenTelemetry
- link: https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/
  tag: Blog
  text: Haga un seguimiento de métricas de tiempo de ejecución de aplicaciones instrumentadas
    con OTel con Datadog APM
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: Blog
  text: Cómo seleccionar su despliegue de OpenTelemetry
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: Centro de aprendizaje
  text: Introducción a OpenTelemetry con Datadog
- link: https://learn.datadoghq.com/courses/understanding-opentelemetry
  tag: Centro de aprendizaje
  text: Entendiendo OpenTelemetry
- link: https://www.datadoghq.com/blog/control-trace-volume-with-opentelemetry-tail-based-sampling/
  tag: Blog
  text: Controle el volumen de trazas con el muestreo basado en seguimiento de las
    últimas líneas de OpenTelemetry
title: OpenTelemetry en Datadog
---
{{< learning-center-callout hide_image="true" header="Pruebe \\"Introducción a OTel con Datadog\\" en el Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Aprenda a configurar OpenTelemetry para exportar métricas, trazas y registros a Datadog, y explore los datos recopilados en la plataforma.
{{< /learning-center-callout >}}

## Descripción general {#overview}

[OpenTelemetry][1] (OTel) proporciona protocolos estandarizados para recopilar y enrutar datos de telemetría. Datadog admite múltiples formas de recopilar y analizar datos de telemetría de aplicaciones instrumentadas con OpenTelemetry, ya sea que utilice la infraestructura existente de Datadog o prefiera una configuración neutral respecto al proveedor.

### ¿Por qué OpenTelemetry con Datadog? {#why-opentelemetry-with-datadog}

Datadog proporciona observabilidad avanzada para toda la telemetría de su aplicación, independientemente de su fuente. Al admitir OpenTelemetry, Datadog ofrece:

- **Flexibilidad y elección**: Utilice instrumentación estandarizada mientras mantiene la libertad de adaptarse a medida que evolucionan sus necesidades tecnológicas.
- **Soporte integral de lenguajes**: Haga un seguimiento de manera consistente de las aplicaciones en toda su pila tecnológica.
- **Instrumentación unificada**: Mantenga un enfoque único para la instrumentación en todos sus sistemas.
- **Análisis potente**: Combine la estandarización de OpenTelemetry con las sólidas capacidades de análisis, visualización y alertas de Datadog.

Ya sea que ya esté usando OpenTelemetry o esté considerando su adopción, Datadog proporciona opciones flexibles para satisfacer sus necesidades.

### Decisiones clave {#key-decisions}

Existen dos decisiones clave que tomar al usar OpenTelemetry con Datadog:

- [Cómo instrumentar sus aplicaciones](#instrument-your-applications)
- [Cómo enviar sus datos a Datadog](#send-opentelemetry-data-to-datadog)

Las funciones disponibles para usted dependen de estas elecciones. Por ejemplo, usar la API de OpenTelemetry con el SDK de Datadog proporciona acceso a más funciones de Datadog que usar solo el SDK de OpenTelemetry.

Para obtener más información, lea [Feature Compatibility][9].

## Instrumente sus aplicaciones {#instrument-your-applications}

Existen varias formas de instrumentar sus aplicaciones con OpenTelemetry y Datadog. Cada enfoque proporciona diferentes funciones y niveles de neutralidad de proveedor.

- **OpenTelemetry completo**: Utilice el SDK y la API de OpenTelemetry para una configuración neutral respecto al proveedor.
- **API de OpenTelemetry**: Utilice la API de OpenTelemetry con la implementación del SDK de Datadog.
- **Bibliotecas de instrumentación de OpenTelemetry**: Extienda la observabilidad de Datadog a marcos de trabajo y tecnologías adicionales.

Para obtener más información, consulte [Instrumente sus aplicaciones][8].

## Enviar datos de OpenTelemetry a Datadog {#send-opentelemetry-data-to-datadog}

Si sus aplicaciones y servicios están instrumentados con bibliotecas de OpenTelemetry, puede elegir cómo enviar datos de trazas, métricas y registros a Datadog.

<div class="alert alert-info"><strong>¿No está seguro de qué configuración es la adecuada para usted?</strong><br> Consulte la tabla de <a href="/opentelemetry/compatibility/">Compatibilidad de funciones</a> para comprender qué funciones de Datadog son compatibles.</div>

### Opción 1: Utilice el Datadog Agent con el DDOT Collector (Recomendado) {#option-1-use-the-datadog-agent-with-ddot-collector-recommended}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Descripción general de la arquitectura del DDOT Collector, el cual está integrado en el Datadog Agent." style="width:100%;" >}}

**Ideal para**: Usuarios que buscan obtener tanto la neutralidad de proveedor de OTel como las innovaciones del ecosistema de Datadog, tales como:

- Fleet Automation
- Container Monitoring en vivo
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Integraciones de Datadog

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Obtenga más información sobre el uso del Datadog Agent con el DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Opción 2: Utilice el OpenTelemetry Collector {#option-2-use-the-opentelemetry-collector}

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagrama: El SDK de OpenTelemetry en el código envía datos a través de OTLP al servidor que ejecuta el OpenTelemetry Collector con el Datadog Exporter, el cual los reenvía a la plataforma de observabilidad de Datadog." style="width:100%;" >}}

**Ideal para**: Usuarios nuevos o existentes de OTel que deseen una configuración completamente neutral respecto al proveedor.

- Neutralidad total respecto al proveedor para enviar datos de OpenTelemetry a Datadog
- Opciones de configuración flexibles como muestreo basado en el seguimiento de las últimas líneas y transformaciones de datos

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Obtenga más información sobre el uso del OTel Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Opciones de configuración adicionales {#additional-setup-options}

Para otras opciones de configuración, incluida la ingesta directa de OTLP, consulte [Enviar datos a Datadog][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /es/opentelemetry/setup
[8]: /es/opentelemetry/instrument/
[9]: /es/opentelemetry/compatibility/