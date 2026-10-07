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
description: Instrumente su código para mejorar el rendimiento
further_reading:
- link: https://www.datadoghq.com/architecture/observability-in-event-driven-architecture/
  tag: Centro de arquitectura
  text: Observabilidad en arquitecturas basadas en eventos
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centro de aprendizaje
  text: Introducción a las métricas y trazas de APM
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar su comprensión de APM
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Genere métricas basadas en tramos para realizar un seguimiento de las tendencias
    históricas en el rendimiento de las aplicaciones
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtenga visibilidad de los riesgos, vulnerabilidades y ataques con APM Security
    View
- link: https://www.datadoghq.com/blog/pubsub-cloud-run-tracing
  tag: Blog
  text: Rastree cargas de trabajo de Google Pub/Sub en Cloud Run con Datadog
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Análisis de la latencia de ida y vuelta de las consultas
- link: https://www.datadoghq.com/blog/boomi-observability-opentelemetry-datadog/
  tag: Blog
  text: Instrumente y haga un seguimiento de flujos de integración de Boomi con OpenTelemetry
    y Datadog
- link: https://www.datadoghq.com/blog/dbm-supabase/
  tag: Blog
  text: Haga un seguimiento y optimice el rendimiento de las consultas de Supabase
    con Datadog Database Monitoring
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notas de la versión
  text: ¡Eche un vistazo a los últimos lanzamientos de Datadog APM! (Se requiere inicio
    de sesión en la aplicación).
title: APM
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>


{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=APM">}}
  Únase a una sesión de capacitación introductoria o intermedia para obtener más información sobre cómo Datadog Application Performance Monitoring (APM) proporciona trazas distribuidas a nivel de código impulsadas por IA, desde aplicaciones móviles y de navegador hasta servicios backend y bases de datos.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Datadog Application Performance Monitoring (APM) proporciona una visibilidad profunda de sus aplicaciones, lo que le permite identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar sus servicios. Con trazas distribuidas, los tableros listos para usar y la correlación perfecta con otros datos de telemetría, Datadog APM ayuda a garantizar el mejor rendimiento y la mejor experiencia de usuario posibles para sus aplicaciones.

Para obtener una introducción a la terminología utilizada en Datadog APM, consulte [APM Terms and Concepts][1].

## Primeros pasos {#getting-started}

La forma más sencilla de comenzar con Datadog APM es con la instrumentación de un solo paso (Single Step Instrumentation). Este enfoque instala el Datadog Agent e instrumenta su aplicación en un solo paso, sin necesidad de pasos de configuración adicionales. Para obtener más información, lea [Single Step Instrumentation][27].

Para configuraciones que requieren más personalización, Datadog admite la instrumentación personalizada con los SDK de Datadog y [Dynamic Instrumentation][30] en la interfaz de usuario de Datadog. Para obtener más información, lea [Application Instrumentation][2].

<div class="alert alert-info">Si es nuevo en Datadog APM, lea <a href="https://docs.datadoghq.com/getting_started/tracing/">Getting Started with APM</a> para aprender cómo enviar su primera traza a Datadog.</div>

## Casos de uso {#use-cases}

Descubra algunas formas en las que Datadog APM puede ayudar a respaldar sus casos de uso:

| Usted quiere...| Cómo puede ayudar Datadog APM |
| ----------- | ----------- |
| Comprenda cómo fluyen las solicitudes a través de su sistema. | Utilice el [Trace Explorer][21] para consultar y visualizar trazas de extremo a extremo en servicios distribuidos. |
| Haga un seguimiento del estado y el rendimiento de servicios individuales. | Utilice las [páginas de servicio][26] y [recursos][28] para evaluar el estado del servicio analizando métricas de rendimiento, rastreando implementaciones e identificando recursos problemáticos. |
| Correlacione trazas con DBM, RUM, registros, pruebas Synthetic y perfiles. | [Correlacione datos de APM con otra telemetría][20] para dar contexto a sus datos y realizar un análisis más completo. |
| Controle cómo fluyen los datos hacia Datadog. | Utilice los [Controles de ingesta][6] para ajustar la configuración de ingesta y las tasas de muestreo por servicio y recurso. Utilice los [Filtros de retención][7] para elegir qué tramos conservar durante 15 días. |

### Trace Explorer {#trace-explorer}

El [Trace Explorer][21] le permite buscar y analizar sus trazas en tiempo real. Identifique cuellos de botella en el rendimiento, solucione errores y pivote hacia registros y métricas relacionados para comprender el contexto completo de cualquier problema.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Vista de Trace Explorer." style="width:100%;" >}}

### Página de servicio {#service-page}

La [página de servicio][26] le ayuda a hacer un seguimiento del rendimiento del servicio y [comparar entre versiones durante las implementaciones][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versiones en la Página de servicio" style="width:100%;">}}

### Correlación de trazas con otra telemetría {#correlating-traces-with-other-telemetry}

Datadog APM se integra perfectamente con registros, monitoreo de usuarios reales (RUM), monitoreo sintético y más:

- [Vea los registros de su aplicación junto con las trazas][9] para encontrar registros de solicitudes, servicios o versiones específicas.
- [Asocie sesiones RUM con trazas de backend][10] para comprender cómo el rendimiento del backend afecta la experiencia del usuario.
- [Asocie pruebas Synthetic con trazas][11] para solucionar problemas en solicitudes de frontend y backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Conecte registros y trazas" style="width:100%;">}}

### Controles de ingesta y filtros de retención {#ingestion-controls-and-retention-filters}

Las trazas comienzan en sus aplicaciones instrumentadas y fluyen hacia Datadog.

Datadog APM proporciona herramientas para administrar el volumen y la retención de sus datos de trazas. Utilice [Controles de ingesta][6] para ajustar las tasas de muestreo y [filtros de retención][7] para controlar qué tramos se almacenan.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flujo de datos a través de Datadog APM." style="width:100%;" >}}

## Solución de problemas {#troubleshooting}

Para obtener asistencia en la solución de problemas, lea la guía de [Solución de problemas de APM][29].

## Lecturas adicionales {#further-reading}

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