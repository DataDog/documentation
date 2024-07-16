---
algolia:
  tags:
  - apm
  - monitorización del rendimiento de las aplicaciones
  - rastreo distribuido
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
description: Instrumentar el código para mejorar el rendimiento
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notas de la versión
  text: ¡Conoce las últimas novedades de Datadog APM! (Es necesario iniciar sesión
    en la aplicación)
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Genera métricas basadas en tramos (spans) para seguir las tendencias históricas
    en el rendimiento de las aplicaciones
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Obtén visibilidad de los riesgos, las vulnerabilidades y los ataques con APM
    Security View
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Monitoriza las aplicaciones web Linux en Azure App Service con Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gestiona el rendimiento, la seguridad y la propiedad de las API con Datadog
    API Catalog
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Participa en una sesión interactiva para mejorar tu comprensión de APM
kind: documentación
title: APM
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/381554158/rendition/1080p/file.mp4?loc=external&signature=e19b4e64632c3b1a42b11cb27fca2682dfadecd4690774c005ba2f5079b6a416" poster="/images/poster/tracing.png" >}}

</br>

## Información general

Datadog Application Performance Monitoring (APM) proporciona una visibilidad profunda de las aplicaciones, lo que permite identificar cuellos de botella en el rendimiento, solucionar problemas y optimizar los servicios. Con un rastreo distribuido, dashboards listos para usar y una correlación perfecta con otros datos de telemetría, Datadog APM ayuda a garantizar el mejor rendimiento posible y la mejor experiencia de usuario para las aplicaciones.

Para obtener una introducción a la terminología utilizada en Datadog APM, consulta [Términos y conceptos de APM][1].

## Primeros pasos

La forma más sencilla de comenzar con Datadog APM es con la Instrumentación en un solo paso. Este enfoque instala el Datadog Agent e instrumenta la aplicación en un solo paso, sin necesidad de pasos adicionales de configuración. Para obtener más información, consulta [Instrumentación en un solo paso][27].

Para configuraciones que requieran una mayor personalización, Datadog admite la instrumentación personalizada con las bibliotecas de rastreo de Datadog. Para obtener más información, consulta [Instrumentación de aplicaciones][2].

## Casos de uso

Descubre algunas formas en que Datadog APM puede apoyar tus casos de uso:

| Quieres...| Cómo puede ayudar Datadog APM |
| ----------- | ----------- |
| Comprende cómo fluyen las solicitudes a través del sistema. | Utiliza [Trace Explorer][21] para consultar y visualizar trazas (traces) de extremo a extremo a través de servicios distribuidos. |
| Monitoriza el estado y el rendimiento de servicios individuales. | Utiliza el [servicio][26] y las [páginas de recursos][28] para evaluar el estado del servicio analizando métricas de rendimiento, realizando un seguimiento de las implementaciones e identificando los recursos problemáticos. |
| Correlaciona trazas (traces) con DBM, RUM, logs, sintéticos y perfiles. | [Correlaciona los datos de APM con otros datos de telemetría][20] para contextualizar los datos y realizar un análisis más exhaustivo. |
| Controla el flujo de datos en Datadog. | Utiliza los [controles de ingesta][6] para ajustar la configuración de la ingesta y las frecuencias de muestreo por servicio y recurso. Utiliza los [filtros de retención][7] para elegir qué tramos (spans) se retendrán durante 15 días. |

### Trace Explorer

[Trace Explorer][21] te permite buscar y analizar tus trazas (traces) en tiempo real. Identifica cuellos de botella en el rendimiento, soluciona errores y consulta logs y métricas para comprender el contexto completo de cualquier problema.

{{< img src="/tracing/trace_explorer/trace_explorer.png" alt="Vista de Trace Explorer." style="width:100%;" >}}

### Página de servicios

La [página de servicios][26] ayuda a monitorizar el rendimiento del servicio y a [comparar versiones durante las implementaciones][15].

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versiones en la página de servicios" style="width:100%;">}}

### Correlación de trazas (traces) con otros datos de telemetría

Datadog APM se integra perfectamente con logs, Real User Monitoring (RUM), monitorización de sintéticos y más:

- [Visualiza los logs de la aplicación junto con las trazas (traces)][9] a fin de encontrar logs para solicitudes, versiones o servicios específicos.
- [Asocia sesiones de RUM con trazas (traces) de backend][10] para comprender cómo afecta el rendimiento del backend a la experiencia del usuario.
- [Asocia las pruebas de sintéticos con trazas (traces)][11] para solucionar fallos en las solicitudes de frontend y backend.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Conectar logs y trazas (traces)" style="width:100%;">}}

### Controles de ingesta y filtros de retención

Las trazas (traces) comienzan en las aplicaciones instrumentadas y fluyen hacia Datadog.

Datadog APM proporciona herramientas para gestionar el volumen y la retención de los datos de trazas (traces). Utiliza los [controles de ingesta][6] para ajustar las frecuencias de muestreo y los [filtros de retención][7] a fin de controlar qué tramos (spans) se almacenan.

{{< img src="/tracing/apm_lifecycle/apm_lifecycle_0.png" alt="Flujo de datos a través de Datadog APM." style="width:100%;" >}}

## Leer más

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
[10]: /es/real_user_monitoring/platform/connect_rum_and_traces
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