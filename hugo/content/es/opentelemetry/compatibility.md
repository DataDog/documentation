---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: Documentación
  text: Solución de problemas de OpenTelemetry
title: Compatibilidad con OpenTelemetry en Datadog
---
## Descripción general {#overview}

Datadog ofrece múltiples opciones de configuración para adaptarse a diversos casos de uso, desde implementaciones completas de OpenTelemetry (OTel) hasta configuraciones híbridas que utilizan componentes tanto de OpenTelemetry como de Datadog. Esta página cubre la compatibilidad entre diferentes configuraciones y los productos y funciones de Datadog compatibles, ayudándole a elegir la mejor configuración para sus necesidades.

## Configuraciones {#setups}

Datadog admite varias configuraciones para utilizar OpenTelemetry. La diferencia principal entre estas configuraciones es la elección del SDK (OpenTelemetry o Datadog) y el colector utilizado para procesar y reenviar los datos de telemetría.

| Tipo de configuración                                           | API                     | SDK         | Collector/Agent                               |
|------------------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**Datadog SDK + DDOT (Recommended)**][29]           | Datadog API u OTel API | Datadog SDK | Datadog Distribution de OTel Collector (DDOT) |
| [**OTel SDK + DDOT**][29]                            | OTel API                | OTel SDK    | Datadog Distribution de OTel Collector (DDOT) |
| [**OTel SDK + OTLP OTel Collector**][7]         | OTel API                | OTel SDK    | OTLP OTel Collector                      |
| [**Direct OTLP Ingest**][28]                         | OTel API                | OTel SDK    | N/A (dirigir al punto de conexión Datadog)              |

## Compatibilidad de funciones {#feature-compatibility}

La siguiente tabla muestra la compatibilidad de funciones entre diferentes configuraciones:

| Feature | Datadog SDK + DDOT (Recommended) | OTel SDK + DDOT | OTel SDK + OTLP OTel Collector | Direct OTLP Ingest |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trazas, métricas y logs correlacionados][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Distributed Tracing][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Agent Observability][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Runtime Metrics][23] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Enlaces de tramo][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métricas de traza][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculado a partir de los tramos que llegan a Datadog; refleja cualquier muestreo del lado de OTel que usted configure." >}}) |
| [Database Monitoring][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Lista de servidores de infraestructura][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Cloud Network Monitoring][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Kubernetes Monitoring][20] | {{< X >}} | {{< X >}} | {{< X >}} | |
| [Live Container Monitoring][46] | {{< X >}} | {{< X >}} | | |
| [Live Processes][16] | {{< X >}} | {{< X >}} | | |
| [Universal Service Monitoring][17] (USM) | {{< X >}} | {{< X >}} | | |
| [App and API Protection][11] (AAP) | {{< X >}} | | | |
| [Continuous Profiler][12] | {{< X >}} | | | |
| [Data Observability: Jobs Monitoring][13] (DJM) | {{< X >}} | | | |
| [Data Streams Monitoring][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel no ofrece funcionalidad DSM" >}} | {{< tooltip text="N/A" tooltip="OTel no ofrece funcionalidad DSM" >}} |
| [Real User Monitoring][22] (RUM) | {{< X >}} | | | |
| [Integración de código fuente][24] | {{< X >}} | | | |

## Soporte de API {#api-support}

Datadog SDKs brindan soporte para las OpenTelemetry Traces, Metrics, and Logs APIs en varios lenguajes. Busque su idioma en la tabla a continuación para obtener guías de configuración y detalles de soporte.

| Idioma | Traces API | Metrics API | Logs API |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Go][35] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Ruby][36] | {{< X >}} | Alfa | {{< X >}} |
| [PHP][37] | {{< X >}} | {{< X >}} | {{< X >}} |

## Más detalles {#more-details}

### Agent Observability {#agent-observability}

Las trazas de OpenTelemetry que tienen [atributos de IA generativa](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) se convierten automáticamente en trazas de Agent Observability. Para deshabilitar esta conversión, consulte [Disabling Agent Observability conversion][38].

### Métricas de tiempo de ejecución {#runtime-metrics}

- **Configuración de Datadog SDK**: emite [Runtime Metrics][23] con DogStatsD (puerto UDP 8125). Asegúrese de que DogStatsD esté habilitado en su Datadog Agent.
- **Configuración de OpenTelemetry SDK**: siga las especificaciones en [Métricas de tiempo de ejecución de OpenTelemetry][1], suelen enviarse mediante OTLP (puerto 4317/4318).

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

Para habilitar la funcionalidad completa de RUM, [inyecte los encabezados compatibles][2] para correlacionar RUM y trazas.

### Cloud Network Monitoring (CNM) {#cloud-network-monitoring-cnm}

El monitoreo a nivel de tramo o a nivel de punto de conexión **no** es compatible.

Para obtener más información, consulte [Cloud Network Monitoring Setup][3].

### Integración de código fuente {#source-code-integration}

Para lenguajes no compatibles en configuraciones de OpenTelemetry, [configure el etiquetado de telemetría][5] para vincular los datos a una confirmación específica.

## Niveles de soporte {#support-levels}

Datadog proporciona diferentes niveles de soporte para los componentes y configuraciones de OpenTelemetry:

- **Componentes Datadog compatibles**: componentes Datadog como [Datadog Connector][39], [Datadog Exporter][40] e [Infra Attribute Processor][41]. Estos componentes son mantenidos por Datadog, reciben actualizaciones periódicas y tienen prioridad para la corrección de errores y mejoras de funciones.

- **Componentes de la comunidad compatibles**: componentes OpenTelemetry [incluidos con el DDOT Collector][42] de manera predeterminada. Datadog ayuda a garantizar que estos componentes sean seguros, estables y compatibles.

- **Componentes personalizados**: Componentes o configuraciones de OpenTelemetry no incluidos de forma predeterminada, tales como [componentes Collector personalizados][43] o [instrumentación de tiempos de ejecución no compatibles][44]. Datadog proporciona orientación y documentación como punto de partida, pero no admite directamente la funcionalidad de estos componentes. Para problemas con componentes personalizados, comuníquese con la [OpenTelemetry community][45] o con los mantenedores del componente.

## Compatibilidad de plataforma y entorno {#platform-and-environment-support}

Aunque el OpenTelemetry Collector puede implementarse en muchos entornos, ciertas plataformas tienen limitaciones o requisitos de soporte específicos.

* **AWS EKS Fargate**: Este entorno **no es compatible actualmente** y resultará en una facturación incorrecta del servidor de infraestructura cuando se utilice con el OpenTelemetry Collector. Se planea soporte oficial para una versión futura. Consulte [Guía para configurar Collector][7] para obtener la información más actualizada.

## Mejores prácticas {#best-practices}

Al usar Datadog y OpenTelemetry juntos, Datadog recomienda las siguientes mejores prácticas para garantizar un rendimiento óptimo y evitar posibles problemas:

- **Evitar instrumentación mixta**: En la mayoría de los casos, no debe utilizar tanto Datadog SDK como OpenTelemetry SDK en la misma aplicación, ya que esto conduce a un comportamiento indefinido.
  - **Exception**: El soporte para algunos lenguajes, como Python, requiere que se instalen tanto Datadog SDK como OpenTelemetry SDK.
  - Siga siempre la [documentación de instrumentación específica del lenguaje][8] para asegurarse de estar utilizando la configuración correcta y compatible.
- **Evite el Agent y el Collector por separado en el mismo servidor**: No ejecute el Datadog Agent y un OpenTelemetry Collector por separado en el mismo servidor, ya que esto puede causar problemas. Sin embargo, puede ejecutar Agents y Collectors en servidores diferentes dentro de la misma flota.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/integrations/runtime_metrics/
[2]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[3]: /es/network_monitoring/cloud_network_monitoring/setup/
[4]: /es/infrastructure/process/
[5]: /es/integrations/guide/source-code-integration/?tab=go#configure-telemetry-tagging
[6]: /es/opentelemetry/interoperability/otlp_ingest_in_the_agent/
[7]: /es/opentelemetry/collector_exporter/
[8]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[9]: /es/opentelemetry/agent
[10]: /es/tracing/trace_collection/
[11]: /es/security/application_security/
[12]: /es/profiler/
[13]: /es/data_jobs/
[14]: /es/opentelemetry/correlate/dbm_and_traces/
[15]: /es/data_streams/
[16]: /es/infrastructure/process/
[17]: /es/universal_service_monitoring/
[18]: /es/security/cloud_siem/
[19]: /es/opentelemetry/correlate/
[20]: /es/containers/monitoring/kubernetes_explorer/
[21]: /es/network_monitoring/performance/
[22]: /es/opentelemetry/correlate/rum_and_traces/?tab=browserrum#opentelemetry-support
[23]: /es/tracing/metrics/runtime_metrics/
[24]: /es/integrations/guide/source-code-integration/
[25]: /es/tracing/trace_collection/span_links/
[26]: /es/tracing/metrics/metrics_namespace/
[27]: /es/tracing/trace_collection/
[28]: /es/opentelemetry/setup/agentless
[29]: /es/opentelemetry/setup/ddot_collector
[30]: /es/infrastructure/list/
[31]: /es/opentelemetry/instrument/api_support/dotnet/
[32]: /es/opentelemetry/instrument/api_support/python/
[33]: /es/opentelemetry/instrument/api_support/nodejs/
[34]: /es/opentelemetry/instrument/api_support/java/
[35]: /es/opentelemetry/instrument/api_support/go/
[36]: /es/opentelemetry/instrument/api_support/ruby/
[37]: /es/opentelemetry/instrument/api_support/php/
[38]: /es/llm_observability/instrument/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /es/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /es/opentelemetry/setup/ddot_collector/custom_components
[44]: /es/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/
[46]: /es/containers/