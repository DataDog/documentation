---
title: Métricas de uso estimadas
---

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
| Hosts de infraestructura          | `datadog.estimated_usage.hosts`          | Hosts únicos vistos en la última hora. |
| Containers                    | `datadog.estimated_usage.containers`     | Contenedores únicos vistos en la última hora. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`  | Tareas de Fargate únicas vistas en los últimos 5 minutos. |
| Métricas personalizadas indexadas        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | Métricas personalizadas indexadas únicas vistas en la última hora. |
| Métricas personalizadas ingeridas       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | Métricas personalizadas únicas incorporadas vistas en la última hora. |
| Bytes de logs ingeridos           | `datadog.estimated_usage.logs.ingested_bytes` | Incorporación total de logs en bytes. |
| Eventos de logs ingeridos          | `datadog.estimated_usage.logs.ingested_events` | Número total de eventos incorporados, incluidos los logs excluidos. |
| Recuento de caídas de logs               | `datadog.estimated_usage.logs.drop_count` | Número total de eventos caídos durante la incorporación. |
| Recuento de logs truncados          | `datadog.estimated_usage.logs.truncated_count` | Número total de eventos truncados en la incorporación. |
| Bytes de logs truncados          | `datadog.estimated_usage.logs.truncated_bytes` | Volumen de eventos truncados en bytes. |
| Eventos de logs de seguimiento de errores    | `datadog.estimated_usage.error_tracking.logs.events` | Volumen de logs de errores incorporados en el seguimiento de errores. |
| Logs analizados (seguridad)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Incorporación total de logs de Cloud SIEM en bytes. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts` | Hosts de APM únicos vistos en la última hora. No incluye hosts de servicios de Azure App. |
| Tramos indexados de APM             | `datadog.estimated_usage.apm.indexed_spans` | Número total de tramos (spans) indexados por filtros de retención basados en etiquetas. |
| Bytes ingeridos desde la APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volumen de tramos incorporados en bytes. |
| Tramos ingeridos de APM            | `datadog.estimated_usage.apm.ingested_spans` | Número total de incorporación de tramos. |
| Tareas de Fargate de la APM             | `datadog.estimated_usage.apm.fargate_tasks` | Tareas únicas de APM Fargate vistas en los últimos 5 minutos. |
| Sesiones RUM                  | `datadog.estimated_usage.rum.sessions` | Número total de sesiones de RUM. |
| Funciones lambda serverless   | `datadog.estimated_usage.serverless.aws_lambda_functions` | Funciones serverless únicas vistas en la última hora. |
| Invocaciones serverless        | `datadog.estimated_usage.serverless.invocations`| Suma de las invocaciones serverless en la última hora. |
| Ejecución de tests de API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Uso estimado para las pruebas de API. |
| Ejecución de tests de navegador             | `datadog.estimated_usage.synthetics.browser_test_runs`| Uso estimado para las pruebas de navegador. |
| Espacios para pruebas paralelas        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Uso estimado de espacios de pruebas paralelas. |
| Hosts de red                 | `datadog.estimated_usage.network.hosts` | Hosts de MNP únicos vistos en la última hora. |
| Dispositivos de red               | `datadog.estimated_usage.network.devices` | Dispositivos NDM únicos vistos en la última hora. |
| Hosts perfilados                | `datadog.estimated_usage.profiling.hosts` | Hosts de perfil únicos vistos en la última hora. |
| Contenedores perfilados           | `datadog.estimated_usage.profiling.containers` | Contenedores de perfiles únicos vistos en los últimos 5 minutos. |
| Tareas del generador de perfiles de Fargate        | `datadog.estimated_usage.profiling.fargate_tasks` | Tareas de Fargate para perfil únicas vistas en los últimos 5 minutos. |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts` | Hosts de CSPM únicos vistos en la última hora. |
| Contenedores CSPM               | `datadog.estimated_usage.cspm.containers` | Contenedores de CSPM únicos vistos en los últimos 5 minutos. |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts` | Hosts de CWS únicos vistos en la última hora. |
| Contenedores CWS                | `datadog.estimated_usage.cws.containers` | Contenedores de CWS únicos vistos en los últimos 5 minutos. |
| Hosts de bases de datos                | `datadog.estimated_usage.dbm.hosts` | Hosts de DBM únicos vistos en la última hora. |
| Hosts ASM                     | `datadog.estimated_usage.asm.hosts` | Hosts de ASM únicos vistos en la última hora. |
| Tareas de ASM                     | `datadog.estimated_usage.asm.tasks` | Tareas de ASM Fargate únicas vistas en los últimos 5 minutos. |
| Gestión de incidencias (usuarios activos)   | `datadog.estimated_usage.incident_management.active_users` | Usuarios activos de mensajería instantánea vistos desde el mes hasta la fecha. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Modificadores de pipeline vistos desde el mes hasta la fecha. |
| Modificadores de prueba de CI Visibility | `datadog.estimated_usage.ci_visibility.test.committers` | Modificadores de prueba vistos desde el mes hasta la fecha. |
| Dispositivos IoT                   | `datadog.estimated_usage.iot.devices` | Dispositivos de IoT únicos vistos en la última hora. |
| Bytes incorporados de pipelines de observabilidad | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volumen de datos incorporados por pipelines de observabilidad. |
| Eventos personalizados                   | `datadog.estimated_usage.events.custom_events` | Volumen de eventos personalizados enviados. |
| Eventos incorporados                        | `datadog.estimated_usage.events.ingested_events` | Volumen de datos ingeridos por eventos. |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Nombres de las métricas" >}}

## Uso con varias organizaciones

En las cuentas con varias organizaciones, es posible agrupar el uso estimado de las organizaciones secundarias utilizando el campo `from` para monitorizar el uso de toda tu cuenta.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Uso con varias organizaciones" >}}

## Python

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][1].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu gestor de [satisfacción al cliente][2].

[1]: /es/help/
[2]: mailto:success@datadoghq.com
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month