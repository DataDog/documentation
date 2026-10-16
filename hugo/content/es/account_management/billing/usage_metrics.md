---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
title: Métricas de uso estimado
---
<style>tbody code {word-break: break-word !important;}</style>

## Descripción general {#overview}

Datadog calcula su uso estimado actual casi en tiempo real. Las métricas de uso estimado le permiten:

* Graficar su uso estimado
* Crear [monitors][3] en torno a su uso estimado según los umbrales que elija
* Recibir [monitor alerts][4] sobre picos o caídas en su uso
* Evaluar el impacto potencial de los cambios de código en su uso casi en tiempo real

**Nota**: Estas métricas de uso son estimaciones que no siempre coinciden con el uso facturable dada su naturaleza en tiempo real. Existe una diferencia promedio del 10-20% entre el uso estimado y el uso facturable. Debido a la naturaleza de las estimaciones, el margen de error es mayor para un uso pequeño.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Ejemplo de Dashboard" >}}

## Tipos de uso {#types-of-usage}

Las métricas de uso estimado generalmente están disponibles para los siguientes tipos de uso:

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hosts únicos vistos en la última hora. |
| Containers                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Containers únicos vistos en la última hora. |
| Tareas de Fargate                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tareas de Fargate únicas vistas en los últimos 5 minutos.<br/><br/>**Nota**: Esta métrica rastrea el uso tanto de ECS Fargate como de EKS Fargate. |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Indexed Custom Metrics únicos vistos en la última hora. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Unique ingested Custom Metrics vistos en la última hora. |
| (Vista previa) Puntos de Indexed Custom Metrics | `datadog.estimated_usage.metrics.points.indexed`, `datadog.estimated_usage.metrics.points.indexed.by_tag`, `datadog.estimated_usage.metrics.points.indexed.hourly` | Puntos indexados estimados para Indexed Custom Metrics. |
| (Vista previa) Ingested Custom Metric Points | `datadog.estimated_usage.metrics.points.ingested`, `datadog.estimated_usage.metrics.points.ingested.hourly` | Puntos ingeridos estimados para Custom Metrics. |
| (Vista previa) Nombres de métricas facturables | `datadog.estimated_usage.billable.metrics` | Recuento de nombres de métricas con más de 100 puntos indexados, en lo que va del mes. Se aplica a organizaciones con [Metric Name Pricing][7]. |
| (Vista previa) Billable Indexed Points | `datadog.estimated_usage.billable.points` | Suma de puntos indexados por encima de los 10M de puntos incluidos por nombre de métrica, en lo que va del mes. Se aplica a organizaciones con [Metric Name Pricing][7]. |
| (Vista previa) Ingested-to-Indexed Points Ratio | `datadog.estimated_usage.metrics.points.ratio` | Comparación del total de puntos ingeridos con el total de puntos indexados. Se aplica a organizaciones con [Metric Name Pricing][7]. |
| Bytes de logs ingeridos           | `datadog.estimated_usage.logs.ingested_bytes` | Ingesta total de logs en bytes. |
| Eventos de logs ingeridos          | `datadog.estimated_usage.logs.ingested_events` | Número total de eventos ingeridos, incluidos los logs excluidos. |
| Bytes de pipelines de logs           | `datadog.estimated_usage.logs.pipelines.ingested_bytes` | Número de logs que coinciden con los pipelines en bytes. |
| Eventos de pipelines de logs          | `datadog.estimated_usage.logs.pipelines.ingested_events` | Número de eventos que coinciden con los pipelines, incluidos los logs excluidos. |
| Recuento de logs descartados               | `datadog.estimated_usage.logs.drop_count` | Número total de eventos descartados durante la ingesta. |
| Recuento de logs truncados          | `datadog.estimated_usage.logs.truncated_count` | Número total de eventos truncados en la ingesta. |
| Bytes de logs truncados          | `datadog.estimated_usage.logs.truncated_bytes` | Volumen de eventos truncados en bytes. |
| Eventos de logs de Error Tracking    | `datadog.estimated_usage.error_tracking.logs.events` | Volumen de logs de error ingeridos en Error Tracking. |
| Logs analizados (seguridad)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Ingesta total de logs de Cloud SIEM en bytes. |
| Hosts de APM                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts de APM únicos detectados en la última hora. No incluye hosts de Azure App Services. |
| Spans indexados de APM             | `datadog.estimated_usage.apm.indexed_spans` | Número total de spans indexados por filtros de retención basados en etiquetas. |
| Bytes ingeridos de APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volumen de spans ingeridos en bytes. |
| Spans ingeridos de APM            | `datadog.estimated_usage.apm.ingested_spans` | Número total de spans ingeridos. |
| Tareas de Fargate de APM             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tareas de Fargate de APM únicas vistas en los últimos 5 minutos. |
| Sesiones de RUM                  | `datadog.estimated_usage.rum.sessions` | Número total de sesiones de RUM. |
| Sesiones ingeridas de RUM         | `datadog.estimated_usage.rum.ingested_sessions` | Número total de sesiones de RUM ingeridas.<br /><br />**Nota**: Se aplica a RUM without Limits. |
| Sesiones indexadas de RUM          | `datadog.estimated_usage.rum.indexed_sessions` | Número total de sesiones de RUM indexadas por filtros de retención.<br /><br />**Nota**: Se aplica a RUM without Limits. |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | funciones únicas serverless que se vieron en la última hora. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| Suma de invocaciones sin servidor en la última hora. |
| Ejecuciones de pruebas de API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Uso estimado para pruebas de API. |
| Ejecuciones de prueba de navegador             | `datadog.estimated_usage.synthetics.browser_test_runs`| Uso estimado para pruebas de navegador. |
| Ranuras de pruebas paralelas        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Uso estimado para ranuras de pruebas paralelas. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hosts de CNM únicos vistos en la última hora. |
| Dispositivos de red               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Dispositivos de NDM únicos vistos en la última hora. |
| Hosts perfilados                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hosts de perfilado únicos vistos en la última hora. |
| Containers perfilados           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Contenedores de perfilado únicos vistos en los últimos 5 minutos. |
| Tareas de Fargate del perfilador        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tareas de Fargate de perfilado únicas vistas en los últimos 5 minutos. |
| Hosts de CSPM                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hosts de CSPM únicos vistos en la última hora. |
| Containers de CSPM               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Contenedores de CSPM únicos vistos en los últimos 5 minutos. |
| Hosts de CWS                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hosts de CWS únicos vistos en la última hora. |
| Containers de CWS                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Contenedores de CWS únicos vistos en los últimos 5 minutos. |
| Hosts de base de datos                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hosts de DBM únicos vistos en la última hora. |
| Hosts de AAP                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Hosts de AAP únicos vistos en la última hora. |
| Tareas de AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tareas de Fargate de AAP únicas vistas en los últimos 5 minutos. |
| Committers de CI Visibility Pipeline | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Committers de pipeline vistos desde el inicio del mes (calendario) hasta la fecha. |
| CI Visibility Test Committers | `datadog.estimated_usage.ci_visibility.test.committers` | Committers de CI Visibility Test vistos desde el inicio del mes (calendario) hasta la fecha. |
| Committers de Code Coverage | `datadog.estimated_usage.code_coverage.committers` | Committers de cobertura de código vistos desde el inicio del mes (calendario) hasta la fecha. |
| dispositivos IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | dispositivos IoT únicos vistos en la última hora. |
| Bytes ingeridos por Observability Pipelines | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volumen de datos ingeridos por Observability Pipelines. |
| Eventos personalizados                 | `datadog.estimated_usage.events.custom_events` | Volumen de eventos personalizados enviados. |
| Eventos ingeridos               | `datadog.estimated_usage.events.ingested_events` | Volumen de datos ingeridos por Events. |
| Committers de SAST de Code Security | `datadog.estimated_usage.code_security.sast.committers` | Committers de SAST vistos desde el inicio del mes (calendario) hasta la fecha. |
| Committers de SCA de Code Security  | `datadog.estimated_usage.code_security.sca.committers`  | Committers de SCA vistos desde el inicio del mes (calendario) hasta la fecha.  |
| Hosts de SCA de Code Security       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Hosts de SCA únicos vistos en la última hora. |
| Committers de Secret Scanning de Code Security  | `datadog.estimated_usage.code_security.secrets.committers`  | Committers de Secret Scanning vistos desde el inicio del mes (calendario) hasta la fecha.  |
| Committers de IaC de Code Security  | `datadog.estimated_usage.code_security.iac.committers`  | Committers de infraestructura como código (IaC) vistos desde el inicio del mes (calendario) hasta la fecha.  |
| Incident Management Seats  | `datadog.estimated_usage.incident_management.seats`  | Asientos de usuario para Incident Management independiente.  |
| Incident Management Monthly Active Users  | `datadog.estimated_usage.incident_management.monthly_active_users`  | Usuarios activos únicos de Incident Management vistos desde el inicio del mes (calendario) hasta la fecha (facturación heredada).  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Nombres de las métricas" >}}

## Configuración de etiquetas para sus métricas de uso estimado by_tag {#setting-tags-for-your-by-tag-estimated-usage-metrics}
Para configurar desgloses de etiquetas en sus métricas de uso estimado by_tag, configure las etiquetas deseadas (como equipo o entorno) en la página [Usage Attribution][6] (si tiene un plan PRO, puede solicitar acceso a esta función a través de su [Customer Success Manager][2]). Los cambios entran en vigor a las 00:00 UTC del próximo día.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configuración de etiquetas EUM by_tag en Usage Attribution." >}}

## Dashboards {#dashboards}

Hay paneles de uso estimado listos para usar que ofrecen consultas útiles con estas métricas. Puede clonar estos paneles para ayudarle a comenzar con las métricas de uso. Para encontrar estos paneles, navegue a [Dashboards preset lists][5] y busque \"Estimated Usage\".

## Uso multi-org {#multi-org-usage}

Para cuentas con múltiples organizaciones, puede consolidar el uso estimado de las organizaciones secundarias utilizando el campo `from` para hacer un seguimiento del uso en toda su cuenta.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Uso multi-org" >}}

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][1].

Para preguntas sobre facturación, comuníquese con su [Customer Success Manager][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: mailto:success@datadoghq.com
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /es/account_management/billing/usage_attribution/
[7]: /es/account_management/billing/metric_name_pricing/