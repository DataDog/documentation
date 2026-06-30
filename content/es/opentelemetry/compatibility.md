---
disable_sidebar: false
further_reading:
- link: /opentelemetry/troubleshooting/
  tag: Documentación
  text: Solución de problemas de OpenTelemetry
title: Compatibilidad entre Datadog y OpenTelemetry
---
## Resumen {#overview}

Datadog ofrece múltiples opciones de configuración para acomodar diversos casos de uso, desde implementaciones completas de OpenTelemetry (OTel) hasta configuraciones híbridas que utilizan tanto componentes de OpenTelemetry como de Datadog. Esta página cubre la compatibilidad entre diferentes configuraciones y los productos y características de Datadog soportados, ayudándote a elegir la mejor configuración para tus necesidades.

## Configuraciones {#setups}

Datadog soporta varias configuraciones para usar OpenTelemetry. La principal diferencia entre estas configuraciones es la elección del SDK (OpenTelemetry o Datadog) y el colector utilizado para procesar y enviar datos de telemetría.

| Tipo de configuración | API | SDK | Colector/Agente |
|--------------------------------------------|-------------------------|-------------|-----------------------------------------------|
| [**SDK de Datadog + DDOT (Recomendado)**][29] | API de Datadog o API de OTel | SDK de Datadog | Distribución de Datadog del Colector de OTel (DDOT) |
| [**SDK de OTel + DDOT**][29] | API de OTel | SDK de OTel | Distribución de Datadog del Colector de OTel (DDOT) |
| [**SDK de OTel + Colector OSS**][7] | API de OTel | SDK de OTel | Colector de OTel (OSS) |
| [**Ingesta directa de OTLP**][28] | API de OTel | SDK de OTel | N/A (Directo al endpoint de Datadog) |

## Compatibilidad de características {#feature-compatibility}

La siguiente tabla muestra la compatibilidad de características entre diferentes configuraciones:

| Característica | SDK de Datadog + DDOT (Recomendado) | SDK de OTel + DDOT | SDK de OTel + Colector OSS | Ingesta directa de OTLP |
|---|---|---|---|---|
| [Cloud SIEM][18] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trazas, Métricas, Registros Correlacionados][19] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Trazado Distribuido][27] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Observabilidad de LLM][38] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métricas de Ejecución][23] | {{< X >}} | {{< X >}}<br>(Java, .NET, solo Go) | {{< X >}}<br>(Java, .NET, solo Go) | {{< X >}}<br>(Java, .NET, solo Go) |
| [Enlaces de Span][25] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| [Métricas de Trazas][26] | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}<br>({{< tooltip text="Sampled" tooltip="Calculado a partir de spans que alcanzan Datadog; refleja cualquier muestreo del lado de OTel que configures." >}}) |
| [Monitoreo de Base de Datos][14] (DBM) | {{< X >}} | {{< X >}} |  |  |
| [Lista de Hosts de Infraestructura][30] | {{< X >}} | {{< X >}} | {{< X >}} |  |
| [Monitoreo de Red en la Nube][21] (CNM) | {{< X >}} | {{< X >}} | | |
| [Monitoreo de Contenedores en Vivo/Explorador de Kubernetes][20] | {{< X >}} | {{< X >}} | | |
| [Procesos en Vivo][16] | {{< X >}} | {{< X >}} | | |
| [Monitoreo de Servicio Universal][17] (USM) | {{< X >}} | {{< X >}} | | |
| [Protección de Aplicaciones y API][11] (AAP) | {{< X >}} | | | |
| [Profiler Continuo][12] | {{< X >}} | | | |
| [Observabilidad de Datos: Monitoreo de Trabajos][13] (DJM) | {{< X >}} | | | |
| [Monitoreo de Flujos de Datos][15] (DSM) | {{< X >}} | | {{< tooltip text="N/A" tooltip="OTel no ofrece funcionalidad DSM" >}} | {{< tooltip text="N/A" tooltip="OTel no ofrece funcionalidad DSM" >}} |
| [Monitoreo de Usuarios Reales][22] (RUM) | {{< X >}} | | | |
| [Integración de Código Fuente][24] | {{< X >}} | | | |

## Soporte de API {#api-support}

Los SDK de Datadog proporcionan soporte para las APIs de OpenTelemetry Traces, Metrics y Logs en varios lenguajes. Encuentra tu lenguaje en la tabla a continuación para guías de configuración y detalles de soporte.

| Lenguaje | API de Traces | API de Metrics | API de Logs |
| :--- | :---: | :---: | :---: |
| [.NET][31] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Python][32] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Node.js][33] | {{< X >}} | {{< X >}} | {{< X >}} |
| [Java][34] | {{< X >}} | *No Soportado Aún* | *No Soportado Aún* |
| [Go][35] | {{< X >}} | *No Soportado Aún* | *No Soportado Aún* |
| [Ruby][36] | {{< X >}} | Alpha | *No Soportado Aún* |
| [PHP][37] | {{< X >}} | *No Soportado Aún* | *No Soportado Aún* |

## Más detalles {#more-details}

### Observabilidad LLM {#llm-observability}

Los trazos de OpenTelemetry que tienen [atributos de IA generativa](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) se convierten automáticamente en trazos de Observabilidad LLM. Para deshabilitar esta conversión, consulta [Deshabilitar la conversión de Observabilidad LLM][38].

### Métricas de tiempo de ejecución {#runtime-metrics}

- **Configuraciones de SDK de Datadog**: Emitir [Métricas de Tiempo de Ejecución][23] usando DogStatsD (puerto UDP 8125). Asegúrate de que DogStatsD esté habilitado en tu Agente de Datadog.
- **Configuraciones de SDK de OpenTelemetry**: Sigue la especificación de [Métricas de Tiempo de Ejecución de OpenTelemetry][1] y generalmente se envían usando OTLP (puerto 4317/4318).

### Monitoreo de Usuarios Reales (RUM) {#real-user-monitoring-rum}

Para habilitar la funcionalidad completa de RUM, necesita [inyectar encabezados soportados][2] para correlacionar RUM y trazas.

### Monitoreo de Redes en la Nube (CNM) {#cloud-network-monitoring-cnm}

El monitoreo a nivel de span o a nivel de endpoint **no** es soportado.

Para más información, consulte [Configuración de Monitoreo de Redes en la Nube][3].

### Integración de Código Fuente {#source-code-integration}

Para lenguajes no soportados en configuraciones de OpenTelemetry, [configure el etiquetado de telemetría][5] para vincular datos a un commit específico.

## Niveles de soporte {#support-levels}

Datadog proporciona diferentes niveles de soporte para componentes y configuraciones de OpenTelemetry:

- **Componentes Soportados por Datadog**: componentes de propiedad de Datadog como el [Conector de Datadog][39], [Exportador de Datadog][40] y [Procesador de Atributos de Infraestructura][41]. Estos componentes son mantenidos por Datadog, reciben actualizaciones regulares y tienen prioridad para correcciones de errores y mejoras de características.

- **Componentes Soportados por la Comunidad**: componentes de OpenTelemetry [incluidos con el Colector DDOT][42] por defecto. Datadog ayuda a garantizar que estos componentes sean seguros, estables y compatibles.

- **Componentes Personalizados**: componentes o configuraciones de OpenTelemetry no incluidos por defecto, como [componentes de Colector personalizados][43] o [instrumentación de entornos no soportados][44]. Datadog proporciona orientación y documentación como punto de partida, pero no soporta directamente la funcionalidad de estos componentes. Para problemas con componentes personalizados, interactúe con la [comunidad de OpenTelemetry][45] o con los mantenedores de los componentes.

## Soporte de plataforma y entorno {#platform-and-environment-support}

Si bien el Colector de OpenTelemetry puede ser desplegado en muchos entornos, ciertas plataformas tienen limitaciones específicas o requisitos de soporte.

* **AWS EKS Fargate**: Este entorno **no está actualmente soportado** y resultará en facturación incorrecta de host de infraestructura cuando se use con el Colector de OpenTelemetry. El soporte oficial está planeado para una futura versión. Consulte la [guía de configuración del Collector][7] para obtener la información más actualizada.

## Mejores prácticas {#best-practices}

Al utilizar Datadog y OpenTelemetry juntos, Datadog recomienda las siguientes mejores prácticas para garantizar un rendimiento óptimo y evitar problemas potenciales:

- **Evite la instrumentación mixta**: En la mayoría de los casos, no debe usar tanto un SDK de Datadog como un SDK de OpenTelemetry en la misma aplicación, ya que esto conduce a un comportamiento indefinido.
  - **Excepción**: El soporte para algunos lenguajes, como Python, requiere que tanto el SDK de Datadog como el SDK de OpenTelemetry estén instalados.
  - Siempre siga la documentación específica de instrumentación [específica del lenguaje][8] para asegurarse de que está utilizando la configuración correcta y soportada.
- **Evite el Agente y el Collector separado en el mismo host**: No ejecute el Agente de Datadog y un Collector de OpenTelemetry separado en el mismo host, ya que esto puede causar problemas. Sin embargo, puede ejecutar Agentes y Collectors en diferentes hosts dentro de la misma flota.

## Lectura adicional {#further-reading}

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
[20]: /es/containers/
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
[38]: /es/llm_observability/instrumentation/otel_instrumentation/
[39]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[41]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[42]: /es/opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[43]: /es/opentelemetry/setup/ddot_collector/custom_components
[44]: /es/opentelemetry/guide/instrument_unsupported_runtimes
[45]: https://opentelemetry.io/community/