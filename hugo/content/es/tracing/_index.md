---
algolia:
  tags:
  - apm
  - application performance monitoring
  - distributed tracing
  - trace
  - tracing
aliases:
- /es/tracing/faq/terminology
- /es/tracing/guide/terminology
- /es/tracing/guide/distributed_tracing/
- /es/tracing/advanced/
- /es/tracing/api
- /es/tracing/faq/distributed-tracing/
cascade:
  algolia:
    rank: 70
description: Instrumenta tu código para mejorar el rendimiento
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notas de la versión
  text: ¡Consulta las últimas versiones de Datadog APM! (Se requiere inicio de sesión
    en la aplicación)
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centro de aprendizaje
  text: Comenzando con métricas y trazas de APM
- link: https://www.datadoghq.com/blog/monitor-rust-otel/
  tag: Blog
  text: Cómo monitorear tus aplicaciones de Rust con OpenTelemetry
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Genera métricas basadas en tramos para rastrear tendencias históricas en el
    rendimiento de la aplicación
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtén visibilidad sobre riesgos, vulnerabilidades y ataques con APM Security
    View
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Monitorea tus aplicaciones web de Linux en Azure App Service con Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gestiona el rendimiento, la seguridad y la propiedad de la API con el Catálogo
    de API de Datadog
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Mejora la experiencia del desarrollador y la colaboración con Software Catalog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Aporta observabilidad de alto rendimiento a entornos Kubernetes seguros con
    Datadog's CSI driver
- link: https://dtdg.co/fe
  tag: Habilitación de la Fundación
  text: Únete a una sesión interactiva para mejorar tu comprensión de APM
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelve problemas más rápido con la integración de código fuente de GitLab
    en Datadog
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: Blog
  text: Rastrea cargas de trabajo de Google Pub/Sub en Cloud Run con Datadog
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analizando la latencia de consulta de ida y vuelta
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  Únete a una sesión de habilitación introductoria o intermedia para aprender más sobre cómo Datadog Application Performance Monitoring (APM) proporciona trazado distribuido a nivel de código impulsado por IA desde aplicaciones de navegador y móviles hasta servicios de backend y bases de datos.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Datadog Application Performance Monitoring (APM) proporciona una profunda visibilidad en tus aplicaciones, permitiéndote identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar tus servicios. Con trazado distribuido, tableros listos para usar y correlación sin problemas con otros datos de telemetría, Datadog APM ayuda a garantizar el mejor rendimiento y experiencia de usuario posible para tus aplicaciones.

Para una introducción a la terminología utilizada en Datadog APM, consulta [Términos y conceptos de APM][1].

## Comenzando {#getting-started}

La forma más sencilla de comenzar con Datadog APM es con Single Step Instrumentation. Este enfoque instala el Datadog Agent e instrumenta tu aplicación en un solo paso, sin requerir pasos de configuración adicionales. Para aprender más, lee [Single Step Instrumentation][27].

Para configuraciones que requieren más personalización, Datadog admite instrumentación personalizada con Datadog SDKs y [Dynamic Instrumentation][30] en la interfaz de usuario de Datadog. Para aprender más, lee [Application Instrumentation][2].

<div class="alert alert-info">Si eres nuevo en Datadog APM, lee <a href="https://docs.datadoghq.com/getting_started/tracing/">Comenzando con APM</a> para aprender cómo enviar tu primera traza a Datadog.</div>

## Casos de uso {#use-cases}

Descubre algunas formas en que Datadog APM puede ayudar a respaldar tus casos de uso:

| Tú quieres...| Cómo Datadog APM puede ayudar |
| ----------- | ----------- |
| Entiende cómo fluyen las solicitudes a través de tu sistema. | Usa el [Trace Explorer][21] para consultar y visualizar trazas de extremo a extremo a través de servicios distribuidos. |
| Monitorea la salud y el rendimiento de cada servicio. | Usa [service][26] y [resource pages][28] para evaluar la salud del servicio analizando métricas de rendimiento, rastreando implementaciones e identificando recursos problemáticos. |
| Correlaciona trazas con DBM, RUM, registros, pruebas Synthetic y perfiles. | [Correlate APM Data with Other Telemetry][20] para dar contexto a tus datos y lograr un análisis más completo. |
| Controla cómo fluyen los datos hacia Datadog. | Usa [Ingestion Controls][6] para ajustar la configuración y las tasas de muestreo por servicio y recurso. Usa [Retention filters][7] para elegir qué tramos retener durante 15 días. |

### Trace Explorer {#trace-explorer}

El [Trace Explorer][21] te permite buscar y analizar tus trazas en tiempo real. Identifica cuellos de botella en el rendimiento, resuelve errores y consulta los registros y métricas relacionadas para comprender el contexto completo de cualquier incidencia.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Visualización de Trace Explorer." style="width:100%;" >}}

### Service page {#service-page}

La [service page][26] te ayuda a monitorear el rendimiento del servicio y [compare between versions during deployments][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions on the Service Page" style="width:100%;">}}

### Correlacionando trazas con otra telemetría {#correlating-traces-with-other-telemetry}

Datadog APM se integra sin problemas con registros, monitoreo de usuario real (RUM), monitoreo sintético y más:

- [View your application logs side-by-side with traces][9] para encontrar registros de solicitudes, servicios o versiones específicas.
- [Associate RUM sessions with backend traces][10] para entender cómo el rendimiento del backend afecta la experiencia del usuario.
- [Associate synthetic tests with traces][11] para solucionar fallas en las solicitudes del frontend y del backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Conecta registros y trazas" style="width:100%;">}}

### Ingestion Controls and Retention Filters {#ingestion-controls-and-retention-filters}

Las trazas comienzan en tus aplicaciones instrumentadas y fluyen hacia Datadog.

Datadog APM proporciona herramientas para gestionar el volumen y la retención de tus datos de traza. Usa [Ingestion Controls][6] para ajustar las tasas de muestreo y [Retention filters][7] para controlar qué tramos se almacenan.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flujo de datos a través de Datadog APM." style="width:100%;" >}}

## Solución de problemas {#troubleshooting}

Para obtener ayuda con la solución de problemas, lee la guía [APM Troubleshooting][29].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/
[2]: /es/tracing/trace_collection/
[3]: /es/tracing/trace_collection/proxy_setup/
[4]: /es/serverless/distributed_tracing
[5]: /es/tracing/trace_collection/otel_instrumentation/
[6]: /es/tracing/trace_pipeline/ingestion_controls/
[7]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /es/tracing/trace_pipeline/generate_metrics/
[9]: /es/tracing/other_telemetry/connect_logs_and_traces/
[10]: /es/real_user_monitoring/correlate_with_other_telemetry/apm
[11]: /es/synthetics/apm/
[12]: /es/tracing/trace_explorer/#live-search-for-15-minutes
[13]: /es/tracing/services/services_map/
[14]: /es/tracing/services/service_page/
[15]: /es/tracing/services/deployment_tracking/
[16]: /es/profiler/
[17]: /es/tracing/trace_collection/automatic_instrumentation/
[18]: /es/tracing/trace_collection/custom_instrumentation/
[19]: /es/tracing/metrics/
[20]: /es/tracing/other_telemetry/
[21]: /es/tracing/trace_explorer/
[22]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[23]: /es/agent/
[24]: /es/tracing/metrics/metrics_namespace/
[25]: /es/tracing/metrics/runtime_metrics/
[26]: /es/tracing/services/service_page/
[27]: /es/tracing/trace_collection/single-step-apm/
[28]: /es/tracing/services/resource_page/
[29]: /es/tracing/troubleshooting/
[30]: /es/tracing/dynamic_instrumentation/