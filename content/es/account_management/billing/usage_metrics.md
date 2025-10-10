---
title: Métricas de uso estimadas
---

<style>tbody code {word-break: break-word !important;}</style>

## Información general

Datadog calcula tu uso estimado actual casi en tiempo real. Las métricas de uso estimado te permiten:

* Representar gráficamente el uso estimado
* Crear [monitores][3] en torno a tu consumo estimado en función de los umbrales que elijas
* Recibir [alertas del monitor][4] de picos o caídas en tu consumo
* Evaluar el impacto potencial de los cambios de código en tu uso casi en tiempo real

**Nota**: Estas métricas de uso son estimaciones que no siempre coinciden con el uso facturable, ya que se brindan casi en tiempo real. De media, existe una diferencia de entre el 10 y el 20 % entre el uso estimado y el uso facturable. Debido a la forma en que se calculan estas estimaciones, el margen de error es mayor cuando el uso es reducido.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Ejemplo de Dashboard" >}}

## Tipos de uso

Las métricas de uso estimadas suelen estar disponibles en los siguientes tipos de uso:

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Hosts de infraestructura          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hosts únicos vistos en la última hora. |
| Contenedores                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Contenedores únicos vistos en la última hora. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tareas de Fargate únicas vistas en los últimos 5 minutos.<br/><br/>**Nota**: Esta métrica rastrea tanto el uso de ECS Fargate como de EKS Fargate. |
| Métricas personalizadas indexadas        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Métricas personalizadas indexadas únicas vistas en la última hora. |
| Métricas personalizadas ingeridas       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Métricas personalizadas únicas incorporadas vistas en la última hora. |
| Bytes de logs ingeridos           | `datadog.estimated_usage.logs.ingested_bytes` | Incorporación total de logs en bytes. |
| Eventos de logs ingeridos          | `datadog.estimated_usage.logs.ingested_events` | Número total de eventos incorporados, incluidos los logs excluidos. |
| Recuento de caídas de logs               | `datadog.estimated_usage.logs.drop_count` | Número total de eventos caídos durante la incorporación. |
| Recuento de logs truncados          | `datadog.estimated_usage.logs.truncated_count` | Número total de eventos truncados en la incorporación. |
| Bytes de logs truncados          | `datadog.estimated_usage.logs.truncated_bytes` | Volumen de eventos truncados en bytes. |
| Eventos de logs de seguimiento de errores    | `datadog.estimated_usage.error_tracking.logs.events` | Volumen de logs de errores incorporados en el seguimiento de errores. |
| Logs analizados (seguridad)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Incorporación total de logs de Cloud SIEM en bytes. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts de APM únicos vistos en la última hora. No incluye hosts de servicios de Azure App. |
| Tramos (spans) indexados de APM             | `datadog.estimated_usage.apm.indexed_spans` | Número total de tramos indexados por filtros de retención basados en etiquetas (tags). |
| Bytes ingeridos desde la APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volumen de tramos incorporados en bytes. |
| Tramos ingeridos de APM            | `datadog.estimated_usage.apm.ingested_spans` | Número total de incorporación de tramos. |
| Tareas de Fargate de la APM             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tareas únicas de APM Fargate vistas en los últimos 5 minutos. |
| Sesiones RUM                  | `datadog.estimated_usage.rum.sessions` | Número total de sesiones de RUM. |
| Funciones lambda serverless   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Funciones serverless únicas vistas en la última hora. |
| Invocaciones serverless        | `datadog.estimated_usage.serverless.invocations`| Suma de las invocaciones serverless en la última hora. |
| Ejecución de tests de API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Uso estimado para las pruebas de API. |
| Ejecución de tests de navegador             | `datadog.estimated_usage.synthetics.browser_test_runs`| Uso estimado para las pruebas de navegador. |
| Espacios para pruebas paralelas        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Uso estimado de espacios de pruebas paralelas. |
| Hosts de red                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hosts de CNM únicos visto en la última hora. |
| Dispositivos de red               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Dispositivos NDM únicos vistos en la última hora. |
| Hosts perfilados                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hosts de perfil únicos vistos en la última hora. |
| Contenedores perfilados           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Contenedores de perfiles únicos vistos en los últimos 5 minutos. |
| Tareas del generador de perfiles de Fargate        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tareas de Fargate para perfil únicas vistas en los últimos 5 minutos. |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hosts de CSPM únicos vistos en la última hora. |
| Contenedores CSPM               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Contenedores de CSPM únicos vistos en los últimos 5 minutos. |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hosts de CWS únicos vistos en la última hora. |
| Contenedores CWS                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Contenedores de CWS únicos vistos en los últimos 5 minutos. |
| Hosts de bases de datos                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hosts de DBM únicos vistos en la última hora. |
| Hosts AAP                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Únicos hosts AAP vistos en la última hora. |
| Tareas AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tareas únicas de AAP Fargate vistas en los últimos 5 minutos. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Modificadores de pipeline vistos desde el mes hasta la fecha. |
| Modificadores de prueba de CI Visibility | `datadog.estimated_usage.ci_visibility.test.committers` | Modificadores de prueba vistos desde el mes hasta la fecha. |
| Dispositivos IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Dispositivos de IoT únicos vistos en la última hora. |
| Bytes incorporados de pipelines de observabilidad | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volumen de datos incorporados por pipelines de observabilidad. |
| Eventos personalizados                   | `datadog.estimated_usage.events.custom_events` | Volumen de eventos personalizados enviados. |
| Eventos incorporados                        | `datadog.estimated_usage.events.ingested_events` | Volumen de datos ingeridos por eventos. |
| Committers SAS de Code Security | `datadog.estimated_usage.code_security.sast.committers` | Committers SAST vistos desde el mes (calendario) hasta la fecha. |
| Committers SCA de Code Security  | `datadog.estimated_usage.code_security.sca.committers`  | Committers SCA vistos desde el mes (calendario) hasta la fecha.  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Nombres de las métricas" >}}

## Configuración de etiquetas para tus métricas de uso estimado de por_etiqueta
Para configurar desgloses de etiquetas en tus métricas de uso estimado por_etiqueta, configura etiquetas, como las de equipo o entorno, en la página de [atribución de uso][6] (si tienes un plan PRO, puedes solicitar acceso a esta función a través de tu [asesor de clientes][2]). Los cambios surtirán efecto a las 00:00 UTC.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configurar etiquetas EUM por_etiqueta en Atribución de uso" >}}

## Dashboards

Hay disponibles dashboards de uso estimado predefinidos que ofrecen consultas útiles con estas métricas. Puedes clonar estos dashboards para ayudarte a empezar con las métricas de uso. Para encontrar estos dashboards, ve a las [listas preconfiguradas de dashboards][5] y busca "Uso estimado."

## Uso con varias organizaciones

En las cuentas con varias organizaciones, es posible agrupar el uso estimado de las organizaciones secundarias utilizando el campo `from` para monitorizar el uso de toda tu cuenta.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Uso con varias organizaciones" >}}

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][1].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu gestor de [satisfacción al cliente][2].

[1]: /es/help/
[2]: mailto:success@datadoghq.com
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /es/account_management/billing/usage_attribution/