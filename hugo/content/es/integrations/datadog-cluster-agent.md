---
aliases:
- /es/integrations/datadog_cluster_agent
app_id: datadog-cluster-agent
categories:
- rastreo
custom_kind: integración
description: Seguimiento de métricas del Datadog Cluster Agent
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Datadog Cluster Agent
---
## Información general

Este check supervisa el [Datadog Cluster Agent](https://docs.datadoghq.com/agent/cluster_agent/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Datadog Cluster Agent se incluye en el paquete del [Datadog Agent](https://docs.datadoghq.com/agent/kubernetes/integrations/).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

El check de Datadog Cluster Agent utiliza [Autodiscovery](https://docs.datadoghq.com/getting_started/containers/autodiscovery/) para configurarse automáticamente en la mayoría de los escenarios. El check se ejecuta en el pod del Datadog Agent en el mismo nodo que el pod del Cluster Agent. No se ejecutará en el propio Cluster Agent.

Si necesitas configurar el check:

1. Edita el archivo `datadog_cluster_agent.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de datadog_cluster_agent. Consulta el [datadog_cluster_agent.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `datadog_cluster_agent` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **datadog.cluster_agent.admission_webhooks.certificate_expiry** <br>(gauge) | Tiempo que falta para que caduque el certificado<br>_Se muestra como hora_ |
| **datadog.cluster_agent.admission_webhooks.cws_exec_mutation_attempts** <br>(count) | Número de intentos de mutación de la ejecución del CWS por motivo y estado|
| **datadog.cluster_agent.admission_webhooks.cws_pod_mutation_attempts** <br>(count) | Número de intentos de mutación del pod del CWS por motivo y estado|
| **datadog.cluster_agent.admission_webhooks.cws_response_duration.count** <br>(count) | Recuento de la duración de la respuesta del webhook mutante del CWS|
| **datadog.cluster_agent.admission_webhooks.cws_response_duration.sum** <br>(count) | Suma de la duración de la respuesta del webhook mutante del CWS|
| **datadog.cluster_agent.admission_webhooks.library_injection_attempts** <br>(count) | Número de intentos de inyección en bibliotecas por idioma|
| **datadog.cluster_agent.admission_webhooks.library_injection_errors** <br>(count) | Número de fallos de inyección de bibliotecas por idioma|
| **datadog.cluster_agent.admission_webhooks.mutation_attempts** <br>(gauge) | Número de intentos de mutación de pod por tipo de mutación|
| **datadog.cluster_agent.admission_webhooks.mutation_errors** <br>(gauge) | Número de fallos de mutación por tipo de mutación|
| **datadog.cluster_agent.admission_webhooks.patcher.attempts** <br>(count) | Número de intentos de parcheo|
| **datadog.cluster_agent.admission_webhooks.patcher.completed** <br>(count) | Número de intentos de parcheo completados|
| **datadog.cluster_agent.admission_webhooks.patcher.errors** <br>(count) | Número de errores de parcheo|
| **datadog.cluster_agent.admission_webhooks.rc_provider.configs** <br>(gauge) | Número de configuraciones remotas válidas|
| **datadog.cluster_agent.admission_webhooks.rc_provider.invalid_configs** <br>(gauge) | Número de configuraciones remotas no válidas|
| **datadog.cluster_agent.admission_webhooks.reconcile_errors** <br>(gauge) | Número de errores de conciliación por controlador|
| **datadog.cluster_agent.admission_webhooks.reconcile_success** <br>(gauge) | Número de conciliaciones exitosas por controlador<br>_Se muestra como éxito_ |
| **datadog.cluster_agent.admission_webhooks.response_duration.count** <br>(count) | Recuento de la duración de la respuesta del webhook|
| **datadog.cluster_agent.admission_webhooks.response_duration.sum** <br>(count) | Suma de la duración de la respuesta del webhook<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.admission_webhooks.validation_attempts** <br>(gauge) | Número de intentos de validación de pods por tipo de validación|
| **datadog.cluster_agent.admission_webhooks.webhooks_received** <br>(gauge) | Número de solicitudes del webhook recibidas|
| **datadog.cluster_agent.aggregator.flush** <br>(count) | Número de métricas/checks de servicio/eventos vaciados por (tipo de datos, estado)|
| **datadog.cluster_agent.aggregator.processed** <br>(count) | Cantidad de métricas/checks de servicio/eventos procesados por el agregador por tipo de datos|
| **datadog.cluster_agent.api_requests** <br>(count) | Solicitudes realizadas a la API del agente de clúster por (identificador, estado)<br>_Se muestra como solicitud_ |
| **datadog.cluster_agent.autodiscovery.errors** <br>(gauge) | Número de errores de Autodiscovery |
| **datadog.cluster_agent.autodiscovery.poll_duration.count** <br>(count) | Recuento de la duración del sondeo de Autodiscovery|
| **datadog.cluster_agent.autodiscovery.poll_duration.sum** <br>(count) | Suma de la duración del sondeo de Autodiscovery<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.autodiscovery.watched_resources** <br>(gauge) | Número de recursos vigilados (servicios y endpoints)|
| **datadog.cluster_agent.cluster_checks.busyness** <br>(gauge) | Ocupación de un nodo según el número de métricas enviadas y la duración media de todos los checks realizados.|
| **datadog.cluster_agent.cluster_checks.configs_dangling** <br>(gauge) | Número de configuraciones de check no enviadas|
| **datadog.cluster_agent.cluster_checks.configs_dispatched** <br>(gauge) | Número de configuraciones de check enviadas por nodo|
| **datadog.cluster_agent.cluster_checks.configs_info** <br>(gauge) | Información sobre las configuraciones de check enviadas (nodo e ID de check)|
| **datadog.cluster_agent.cluster_checks.failed_stats_collection** <br>(count) | Número total de intentos fallidos de recopilación de estadísticas|
| **datadog.cluster_agent.cluster_checks.nodes_reporting** <br>(gauge) | Número de agents de nodo que informan|
| **datadog.cluster_agent.cluster_checks.rebalancing_decisions** <br>(count) | Número total de decisiones de reequilibrio de checks|
| **datadog.cluster_agent.cluster_checks.rebalancing_duration_seconds** <br>(gauge) | Duración de la última ejecución del algoritmo de reequilibrio de checks<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.cluster_checks.successful_rebalancing_moves** <br>(count) | Número total de decisiones acertadas de reequilibrio de checks<br>_Se muestra como check_ |
| **datadog.cluster_agent.cluster_checks.unscheduled_check** <br>(gauge) | Número de configuraciones de check no programadas|
| **datadog.cluster_agent.cluster_checks.updating_stats_duration_seconds** <br>(gauge) | Duración de la recopilación de estadísticas de los ejecutores de check y de la actualización de la caché<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.datadog.rate_limit_queries.limit** <br>(gauge) | Número máximo de consultas a la API de Datadog permitidas en el periodo por endpoint<br>_Se muestra como consulta_ |
| **datadog.cluster_agent.datadog.rate_limit_queries.period** <br>(gauge) | Período de limitación de velocidad para la API de Datadog por endpoint<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.datadog.rate_limit_queries.remaining** <br>(gauge) | Número de consultas a la API de Datadog restantes antes del próximo reinicio por endpoint<br>_Se muestra como consulta_ |
| **datadog.cluster_agent.datadog.rate_limit_queries.remaining_min** <br>(gauge) | Número mínimo de consultas restantes antes del siguiente reinicio observado durante un intervalo de expiración de 2\*periodo de reinicio<br>_Se muestra como consulta_ |
| **datadog.cluster_agent.datadog.rate_limit_queries.reset** <br>(gauge) | Número de segundos antes del siguiente reinicio aplicado a la API de Datadog por el endpoint<br>_Se muestra como segundo_ |
| **datadog.cluster_agent.datadog.requests** <br>(count) | Solicitudes realizadas a Datadog por estado<br>_Se muestra como solicitud_ |
| **datadog.cluster_agent.endpoint_checks.configs_dispatched** <br>(gauge) | Número de configuraciones de check de endpoint enviadas por nodo|
| **datadog.cluster_agent.external_metrics** <br>(gauge) | Número de métricas externas etiquetadas|
| **datadog.cluster_agent.external_metrics.api_elapsed.count** <br>(count) | Recuento de solicitudes de API recibidas|
| **datadog.cluster_agent.external_metrics.api_elapsed.sum** <br>(count) | Recuento de solicitudes de API recibidas|
| **datadog.cluster_agent.external_metrics.api_requests** <br>(gauge) | Recuento de solicitudes de API recibidas|
| **datadog.cluster_agent.external_metrics.datadog_metrics** <br>(gauge) | La etiqueta valid es true si el CR DatadogMetric es válido, false en caso contrario|
| **datadog.cluster_agent.external_metrics.delay_seconds** <br>(gauge) | Actualidad de la métrica evaluada a partir de la consulta de Datadog<br> _Se muestra como segundo_ |
| **datadog.cluster_agent.external_metrics.processed_value** <br>(gauge) | Valor procesado de la consulta de Datadog por métrica|
| **datadog.cluster_agent.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **datadog.cluster_agent.go.memstats.alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso<br>_Se muestra como byte_ |
| **datadog.cluster_agent.go.threads** <br>(gauge) | Número de subprocesos de SO creados<br>_Se muestra como subproceso_ |
| **datadog.cluster_agent.kubernetes_apiserver.emitted_events** <br>(count) | Eventos de Datadog emitidos por el check kubernetes_apiserver|
| **datadog.cluster_agent.kubernetes_apiserver.kube_events** <br>(count) | Eventos de Kubernetes procesados por el check kubernetes_apiserver|
| **datadog.cluster_agent.language_detection_dca_handler.processed_requests** <br>(count) | Número de solicitudes de detección de lenguaje procesadas por el gestor|
| **datadog.cluster_agent.language_detection_patcher.patches** <br>(count) | Número de solicitudes de parcheo enviadas por el parcheador al servidor de la api kube.|
| **datadog.cluster_agent.secret_backend.elapsed** <br>(gauge) | El tiempo transcurrido de la invocación del backend secreto<br>_Se muestra como milisegundo_ |
| **datadog.cluster_agent.tagger.stored_entities** <br>(gauge) | Número de entidades almacenadas en el etiquetador|
| **datadog.cluster_agent.tagger.updated_entities** <br>(count) | Número de actualizaciones realizadas en las entidades del etiquetador|
| **datadog.cluster_agent.workloadmeta.events_received** <br>(count) | Número de eventos recibidos por workloadmeta|
| **datadog.cluster_agent.workloadmeta.notifications_sent** <br>(count) | Número de notificaciones enviadas por workloadmeta a sus suscriptores|
| **datadog.cluster_agent.workloadmeta.stored_entities** <br>(gauge) | Número de entidades almacenadas en workloadmeta|
| **datadog.cluster_agent.workloadmeta.subscribers** <br>(gauge) | Número de suscriptores de workloadmeta|

### Eventos

La integración Datadog Cluster Agent no incluye eventos.

### Checks de servicio

**datadog.cluster_agent.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).