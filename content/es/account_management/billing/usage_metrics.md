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
* Crear [monitores][3] en torno a tu uso estimado basado en los umbrales que elijas
* Recibir [alertas de monitores][4] de picos o caídas en tu uso
* Evaluar el impacto potencial de los cambios de código en tu uso en casi tiempo real

**Nota**: Estas métricas de uso son estimaciones que no siempre coinciden con el uso facturable debido a su naturaleza en tiempo real. Hay una diferencia del 10-20% entre el uso estimado y el uso facturable en promedio. Debido a la naturaleza de las estimaciones, el margen de error es mayor para el uso pequeño.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Ejemplo de tablero" >}}

## Tipos de uso {#types-of-usage}

Las métricas de uso estimado están generalmente disponibles para los siguientes tipos de uso:

| Tipo de uso                    | Métrica                                   | Descripción |
|-------------------------------|------------------------------------------| ----------- |
| Hosts de infraestructura          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hosts únicos vistos en la última hora. |
| Contenedores                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Contenedores únicos vistos en la última hora. |
| Tareas de Fargate                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tareas únicas de Fargate vistas en los últimos 5 minutos.<br/><br/>**Nota**: Esta métrica rastrea tanto el uso de ECS Fargate como de EKS Fargate. |
| Métricas Personalizadas Indexadas        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Métricas personalizadas únicas indexadas vistas en la última hora. |
| Métricas Personalizadas Ingeridas       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Métricas personalizadas únicas ingeridas vistas en la última hora. |
| Bytes de Registros Ingeridos           | `datadog.estimated_usage.logs.ingested_bytes` | Ingesta total de registros en bytes. |
| Eventos de Registros Ingeridos          | `datadog.estimated_usage.logs.ingested_events` | Número total de eventos ingeridos, incluidos los registros excluidos. |
| Conteo de Registros Descartados               | `datadog.estimated_usage.logs.drop_count` | Número total de eventos descartados durante la ingesta. |
| Conteo de Registros Truncados          | `datadog.estimated_usage.logs.truncated_count` | Número total de eventos truncados en la ingesta. |
| Bytes de Registros Truncados          | `datadog.estimated_usage.logs.truncated_bytes` | Volumen de eventos truncados en bytes. |
| Eventos de Registros de Seguimiento de Errores    | `datadog.estimated_usage.error_tracking.logs.events` | Volumen de registros de errores ingeridos en Seguimiento de Errores. |
| Registros Analizados (seguridad)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Ingesta total de registros de Cloud SIEM en bytes. |
| Hosts de APM                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts únicos de APM vistos en la última hora. No incluye hosts de Azure App Services. |
| Spans Indexados de APM             | `datadog.estimated_usage.apm.indexed_spans` | Número total de spans indexados por filtros de retención basados en etiquetas. |
| Bytes Ingeridos de APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volumen de spans ingeridos en bytes. |
| Spans Ingeridos de APM            | `datadog.estimated_usage.apm.ingested_spans` | Número total de spans ingeridos. |
| Tareas de APM Fargate             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tareas únicas de APM Fargate vistas en los últimos 5 minutos. |
| Sesiones de RUM                  | `datadog.estimated_usage.rum.sessions` | Número total de sesiones de RUM. |
| Funciones Lambda Sin Servidor   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Funciones sin servidor únicas vistas en la última hora. |
| Invocaciones Sin Servidor        | `datadog.estimated_usage.serverless.invocations`| Suma de invocaciones sin servidor en la última hora. |
| Ejecutar pruebas de API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Uso estimado para pruebas de API. |
| Ejecutar pruebas del navegador             | `datadog.estimated_usage.synthetics.browser_test_runs`| Uso estimado para pruebas del navegador. |
| Espacios de prueba paralela        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Uso estimado para espacios de prueba paralela. |
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
| Tareas AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tareas Fargate AAP únicas vistas en los últimos 5 minutos. |
| Comprometidos del pipeline de visibilidad CI | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Comprometidos del pipeline vistos desde el mes (calendario) hasta la fecha. |
| Comprometidos de prueba de visibilidad CI | `datadog.estimated_usage.ci_visibility.test.committers` | Comprometidos de prueba vistos desde el mes (calendario) hasta la fecha. |
| Comprometidos de cobertura de código | `datadog.estimated_usage.code_coverage.committers` | Comprometidos de cobertura de código vistos desde el mes (calendario) hasta la fecha. |
| Dispositivos IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Dispositivos IoT únicos vistos en la última hora. |
| Bytes ingeridos por pipelines de observabilidad | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volumen de datos ingeridos por pipelines de observabilidad. |
| Eventos personalizados                 | `datadog.estimated_usage.events.custom_events` | Volumen de eventos personalizados enviados. |
| Eventos Ingeridos               | `datadog.estimated_usage.events.ingested_events` | Volumen de datos ingeridos por Eventos. |
| Seguridad del Código SAST Comprometidos | `datadog.estimated_usage.code_security.sast.committers` | Comprometidos de SAST vistos desde el mes (calendario) hasta la fecha. |
| Seguridad del Código SCA Comprometidos  | `datadog.estimated_usage.code_security.sca.committers`  | Comprometidos de SCA vistos desde el mes (calendario) hasta la fecha.  |
| Seguridad del Código SCA Hosts       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Hosts únicos de SCA vistos en la última hora. |
| Seguridad del Código Escaneo de Secretos Comprometidos  | `datadog.estimated_usage.code_security.secrets.committers`  | Comprometidos de Escaneo de Secretos vistos desde el mes (calendario) hasta la fecha.  |
| Seguridad del Código IaC Comprometidos  | `datadog.estimated_usage.code_security.iac.committers`  | Comprometidos de Infraestructura como Código (IaC) vistos desde el mes (calendario) hasta la fecha.  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Nombres de Métricas" >}}

## Configurando etiquetas para tus métricas de uso estimado por_tag {#setting-tags-for-your-by-tag-estimated-usage-metrics}
Para establecer desgloses de etiquetas en tus métricas de uso estimado por_tag, configura las etiquetas deseadas—como equipo o env—en la página de [Atribución de Uso][6] (Si estás en un plan PRO, puedes solicitar acceso a esta función a través de tu [Gerente de Éxito del Cliente][2]). Los cambios entran en vigor a las 00:00 UTC del siguiente día.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configurando etiquetas EUM por_tag en Atribución de Uso" >}}

## Tableros {#dashboards}

Los tableros de uso estimado listos para usar están disponibles, ofreciendo consultas útiles con estas métricas. Puedes clonar estos tableros para ayudarte a comenzar con las métricas de uso. Para encontrar estos tableros, navega a [Listas de tableros preestablecidos][5] y busca "Uso Estimado."

## Uso Multi-Org {#multi-org-usage}

Para cuentas con múltiples organizaciones, puedes consolidar el uso estimado de las organizaciones hijas utilizando el campo `from` para monitorear el uso en toda tu cuenta.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Uso Multi-Org" >}}

## Solución de Problemas {#troubleshooting}

Para preguntas técnicas, contacta a [soporte de Datadog][1].

Para preguntas de facturación, comuníquese con su [Customer Success][2] Manager.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: mailto:success@datadoghq.com
[3]: /es/monitors/types/metric/?tab=threshold
[4]: /es/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /es/account_management/billing/usage_attribution/