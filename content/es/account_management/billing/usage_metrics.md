---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: Blog
  text: 'Optimizando Datadog a gran escala: Observabilidad rentable en Zendesk'
title: Métricas de uso estimadas
---
<style>código tbody {word-break: break-word !important;}</style>

## Descripción general {#overview}

Datadog calcula tu uso estimado actual en casi tiempo real. Las métricas de uso estimado te permiten:

* Graficar tu uso estimado
* Crear seguimientos [3] basados en tu uso estimado según los umbrales que elijas
* Recibir alertas de seguimiento [4] de picos o caídas en tu uso
* Evaluar el impacto potencial de los cambios de código en tu uso en casi tiempo real

**Nota**: Estas métricas de uso son estimaciones que no siempre coinciden con el uso facturable debido a su naturaleza en tiempo real. Hay una diferencia del 10-20% entre el uso estimado y el uso facturable en promedio. Debido a la naturaleza de las estimaciones, el margen de error es mayor para el uso pequeño.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Ejemplo de tablero" >}}

## Tipos de uso {#types-of-usage}

Las métricas de uso estimado están generalmente disponibles para los siguientes tipos de uso:

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Servidores de infraestructura          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Servidores únicos vistos en la última hora. |
| Contenedores                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Contenedores únicos vistos en la última hora. |
| Tareas de Fargate                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tareas únicas de Fargate vistas en los últimos 5 minutos.<br/><br/>**Nota**: Esta métrica rastrea tanto el uso de ECS Fargate como de EKS Fargate. |
| Métricas Personalizadas Indexadas        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Métricas personalizadas únicas indexadas vistas en la última hora. |
| Métricas Personalizadas Ingeridas       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Métricas personalizadas únicas ingeridas vistas en la última hora. |
| (Vista previa) Puntos de Métricas Personalizadas Indexadas | `datadog.estimated_usage.metrics.points.indexed`, `datadog.estimated_usage.metrics.points.indexed.by_tag`, `datadog.estimated_usage.metrics.points.indexed.hourly` | Puntos estimados indexados para métricas personalizadas. |
| (Vista previa) Puntos de Métricas Personalizadas Ingeridas | `datadog.estimated_usage.metrics.points.ingested`, `datadog.estimated_usage.metrics.points.ingested.hourly` | Puntos estimados ingeridos para métricas personalizadas. |
| (Vista previa) Nombres de Métricas Facturables | `datadog.estimated_usage.billable.metrics` | Conteo de nombres de métricas con más de 100 puntos indexados, hasta la fecha del mes. Aplica a organizaciones en [Precios de Nombres de Métricas][7]. |
| (Vista previa) Puntos Indexados Facturables | `datadog.estimated_usage.billable.points` | Suma de puntos indexados por encima de los 10 millones de puntos incluidos por nombre de métrica, hasta la fecha del mes. Aplica a organizaciones en [Precios de Nombres de Métricas][7]. |
| (Vista previa) Relación de Puntos Ingeridos a Indexados | `datadog.estimated_usage.metrics.points.ratio` | Comparación de puntos ingeridos totales con puntos indexados totales. Aplica a organizaciones en [Precios de Nombres de Métricas][7]. |
| Bytes de registros ingeridos           | `datadog.estimated_usage.logs.ingested_bytes` | Ingesta total de registros en bytes. |
| Eventos de registros ingeridos          | `datadog.estimated_usage.logs.ingested_events` | Número total de eventos ingeridos, incluidos los registros excluidos. |
| Bytes de canalizaciones de registros           | `datadog.estimated_usage.logs.ingested_bytes` | Número de registros coincidentes por canalizaciones en bytes. |
| Eventos de canalizaciones de registros          | `datadog.estimated_usage.logs.ingested_events` | Número de eventos coincidentes por canalizaciones en bytes, incluidos los registros excluidos. |
| Conteo de registros descartados               | `datadog.estimated_usage.logs.drop_count` | Número total de eventos descartados durante la ingesta. |
| Conteo de registros truncados          | `datadog.estimated_usage.logs.truncated_count` | Número total de eventos truncados en la ingesta. |
| Bytes de registros truncados          | `datadog.estimated_usage.logs.truncated_bytes` | Volumen de eventos truncados en bytes. |
| Eventos de registros de Error Tracking    | `datadog.estimated_usage.error_tracking.logs.events` | Volumen de registros de errores ingeridos en Error Tracking. |
| Registros analizados (seguridad)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Ingesta total de registros de Cloud SIEM en bytes. |
| Hosts de APM                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts únicos de APM vistos en la última hora. No incluye hosts de Azure App Services. |
| Spans indexados por APM             | `datadog.estimated_usage.apm.indexed_spans` | Número total de spans indexados por filtros de retención basados en etiquetas. |
| Bytes ingeridos por APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volumen de spans ingeridos en bytes. |
| Spans ingeridos por APM            | `datadog.estimated_usage.apm.ingested_spans` | Número total de spans ingeridos. |
| Tareas de APM Fargate             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tareas únicas de APM Fargate vistas en los últimos 5 minutos. |
| Sesiones RUM                  | `datadog.estimated_usage.rum.sessions` | Número total de sesiones RUM. |
| Sesiones RUM ingeridas         | `datadog.estimated_usage.rum.ingested_sessions` | Número total de sesiones RUM ingeridas.<br /><br />**Nota**: Aplica a RUM sin límites. |
| Sesiones RUM indexadas          | `datadog.estimated_usage.rum.indexed_sessions` | Número total de sesiones RUM indexadas por filtros de retención.<br /><br />**Nota**: Aplica a RUM sin límites. |
| Funciones Lambda sin servidor   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Funciones únicas sin servidor vistas en la última hora. |
| Invocaciones sin servidor        | `datadog.estimated_usage.serverless.invocations`| Suma de invocaciones sin servidor en la última hora. |
| Ejecuciones de prueba de API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Uso estimado para pruebas de API. |
| Ejecuciones de prueba de navegador             | `datadog.estimated_usage.synthetics.browser_test_runs`| Uso estimado para pruebas de navegador. |
| Espacios para pruebas paralelas        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Uso estimado para espacios para pruebas paralelas. |
| Hosts de red                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hosts CNM únicos vistos en la última hora. |
| Dispositivos de red               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Dispositivos NDM únicos vistos en la última hora. |
| Hosts perfilados                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hosts de perfilado únicos vistos en la última hora. |
| Contenedores perfilados           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Contenedores de perfilado únicos vistos en los últimos 5 minutos. |
| Tareas de Fargate del perfilador        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tareas de perfilado Fargate únicas vistas en los últimos 5 minutos. |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hosts CSPM únicos vistos en la última hora. |
| Contenedores CSPM               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Contenedores CSPM únicos vistos en los últimos 5 minutos. |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hosts CWS únicos vistos en la última hora. |
| Contenedores CWS                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Contenedores CWS únicos vistos en los últimos 5 minutos. |
| Hosts de base de datos                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hosts DBM únicos vistos en la última hora. |
| Hosts AAP                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Hosts AAP únicos vistos en la última hora. |
| Tareas AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tareas AAP Fargate únicas vistas en los últimos 5 minutos. |
| Colaboradores de la canalización de CI Visibility | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Colaboradores de la canalización vistos desde el mes calendario hasta la fecha. |
| Colaboradores de pruebas de CI Visibility | `datadog.estimated_usage.ci_visibility.test.committers` | Colaboradores de pruebas vistos desde el mes calendario hasta la fecha. |
| Colaboradores de cobertura de código | `datadog.estimated_usage.code_coverage.committers` | Colaboradores de cobertura de código vistos desde el mes calendario hasta la fecha. |
| Dispositivos IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Dispositivos IoT únicos vistos en la última hora. |
| Bytes Ingeridos por Pipelines de Observabilidad | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volumen de datos ingeridos por los Pipelines de Observabilidad. |
| Eventos Personalizados                 | `datadog.estimated_usage.events.custom_events` | Volumen de eventos personalizados enviados. |
| Eventos Ingeridos               | `datadog.estimated_usage.events.ingested_events` | Volumen de datos ingeridos por Eventos. |
| Code Security SAST Committers | `datadog.estimated_usage.code_security.sast.committers` | SAST committers vistos desde el mes calendario hasta la fecha. |
| Code Security SCA Committers | `datadog.estimated_usage.code_security.sca.committers`  | SCA committers vistos desde el mes calendario hasta la fecha.  |
| Code Security SCA Hosts | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Servidores únicos de SCA vistos en la última hora. |
| Code Security Secret Scanning Committers | `datadog.estimated_usage.code_security.secrets.committers`  | Secret Scanning committers vistos desde el mes calendario hasta la fecha.  |
| Code Security IaC Committers | `datadog.estimated_usage.code_security.iac.committers`  | IaC committers vistos desde el mes calendario hasta la fecha.  |
| Incident Management Seats | `datadog.estimated_usage.incident_management.seats`  | User seats para Incident Management independiente.  |
| Incident Management Monthly Active Users | `datadog.estimated_usage.incident_management.monthly_active_users`  | Incident Management unique active users vistos desde el mes calendario hasta la fecha (facturación heredada).  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Nombres de Métricas" >}}

## Configurando etiquetas para sus by_tag Estimated Usage Metrics {#setting-tags-for-your-by-tag-estimated-usage-metrics}
Para establecer desgloses de etiquetas en sus by_tag Estimated Usage Metrics, configure las etiquetas deseadas—como equipo o env—en la página de [Atribución de Uso][6] (si está en un plan PRO, puede solicitar acceso a esta función a través de su [Customer Success Manager][2]). Los cambios entran en vigor a las 00:00 UTC del siguiente día.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configuración de etiquetas EUM en Atribución de Uso" >}}

## Dashboards {#dashboards}

Los Dashboards de Estimated Usage listos para usar están disponibles, ofreciendo consultas útiles con estas métricas. Puede clonar estos Dashboards para ayudarle a comenzar con las métricas de uso. Para encontrar estos Dashboards, navegue a [Dashboards preset lists][5] y busque "Estimated Usage."

## Multi-Org Usage {#multi-org-usage}

Para cuentas con múltiples organizaciones, puede consolidar el Estimated Usage de las organizaciones hijas utilizando el campo `from` para monitorear el uso en toda su cuenta.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, contacte a [Datadog support][1].

Para preguntas de facturación, contacte a su [Customer Success Manager][2].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: mailto:success@datadoghq.com
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /es/account_management/billing/usage_attribution/
[7]: /es/account_management/billing/metric_name_pricing/