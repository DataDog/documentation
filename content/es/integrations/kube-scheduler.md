---
aliases:
- /es/integrations/kube_scheduler
app_id: kube-scheduler
categories:
- rastreo
- kubernetes
- recopilación de logs
- orquestación
custom_kind: integración
description: Monitorización del Programador Kubernetes
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Programador Kubernetes
---
![Dashboard de Kube Scheduler](https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg)

## Información general

Este check monitoriza [Kubernetes Scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler), parte del plano de control de Kubernetes.

**Nota**: Este check no recopila datos de clústeres Amazon EKS, ya que esos servicios no están expuestos.

## Configuración

### Instalación

El check de Kubernetes Scheduler está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

Consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

#### Recopilación de métricas

1. Edita el archivo `kube_scheduler.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de kube_scheduler. Consulta el [kube_scheduler.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

#### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta la [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<SERVICE_NAME>"}` |

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kube_scheduler` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kube_scheduler.binding_duration.count** <br>(gauge) | Número de latencia en segundos|
| **kube_scheduler.binding_duration.sum** <br>(gauge) | Latencia total del enlace en segundos|
| **kube_scheduler.cache.lookups** <br>(count) | Número de búsquedas en la caché de equivalencias, según se haya encontrado o no una entrada en la caché.|
| **kube_scheduler.client.http.requests** <br>(count) | Número de solicitudes HTTP, divididas por código de estado, método y host|
| **kube_scheduler.client.http.requests_duration.count** <br>(gauge) | Número de solicitudes de clientes. Desglosado por verbo y URL|
| **kube_scheduler.client.http.requests_duration.sum** <br>(gauge) | Latencia total. Desglosado por verbo y URL|
| **kube_scheduler.gc_duration_seconds.count** <br>(gauge) | Número de la invocación de recopilación de elementos no usados|
| **kube_scheduler.gc_duration_seconds.quantile** <br>(gauge) | Cuantiles de duración de las invocaciones de recopilación de elementos no usados|
| **kube_scheduler.gc_duration_seconds.sum** <br>(gauge) | Suma de duraciones de la invocación de recopilación de elementos no usados|
| **kube_scheduler.goroutine_by_scheduling_operation** <br>(gauge) | Número de goroutines en ejecución divididos por el trabajo que realizan, como la vinculación (alfa; requiere k8s v1.26+)|
| **kube_scheduler.goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **kube_scheduler.max_fds** <br>(gauge) | Máximo permitido de descriptores de archivo abiertos|
| **kube_scheduler.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos|
| **kube_scheduler.pending_pods** <br>(gauge) | Número de pods pendientes, por tipo de cola (requiere k8s v1.15+)|
| **kube_scheduler.pod_preemption.attempts** <br>(count) | Número de intentos de multitarea apropiativa en el clúster hasta el momento|
| **kube_scheduler.pod_preemption.victims.count** <br>(gauge) | Número de pods seleccionados durante la última ronda de multitarea apropiativa|
| **kube_scheduler.pod_preemption.victims.sum** <br>(gauge) | Total de pods seleccionados durante la última ronda de multitarea apropiativa|
| **kube_scheduler.queue.incoming_pods** <br>(count) | Número de pods añadidos a las colas de programación por evento y tipo de cola (requiere k8s v1.17+)|
| **kube_scheduler.schedule_attempts** <br>(gauge) | Número de intentos de pods de horario, según el resultado. 'no programable' significa que no se ha podido programar un pod, mientras que 'error' significa un problema interno del programador.|
| **kube_scheduler.scheduling.algorithm.predicate_duration.count** <br>(gauge) | Número de evaluaciones de predicados del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm.predicate_duration.sum** <br>(gauge) | Duración total de la evaluación del predicado del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm.preemption_duration.count** <br>(gauge) | Número de evaluaciones de multitarea apropiativa del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm.preemption_duration.sum** <br>(gauge) | Duración total de la evaluación de la prioridad del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm.priority_duration.count** <br>(gauge) | Número de evaluación de la prioridad del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm.priority_duration.sum** <br>(gauge) | Duración total de la evaluación de prioridades del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm_duration.count** <br>(gauge) | Número de latencia del algoritmo de programación|
| **kube_scheduler.scheduling.algorithm_duration.sum** <br>(gauge) | Latencia total del algoritmo de programación|
| **kube_scheduler.scheduling.attempt_duration.count** <br>(gauge) | Latencia del intento de programación en segundos (algoritmo de programación + enlace) (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.attempt_duration.sum** <br>(gauge) | Latencia total del intento de programación en segundos (algoritmo de programación + enlace) (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.e2e_scheduling_duration.count** <br>(gauge) | Número de latencia de programación E2e (algoritmo de programación + enlace)|
| **kube_scheduler.scheduling.e2e_scheduling_duration.sum** <br>(gauge) | Latencia total de programación E2e (algoritmo de programación + enlace)|
| **kube_scheduler.scheduling.pod.scheduling_attempts.count** <br>(gauge) | Número de intentos para programar con éxito un pod (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.pod.scheduling_attempts.sum** <br>(gauge) | Número total de intentos de programación con éxito de un pod (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.pod.scheduling_duration.count** <br>(gauge) | Latencia E2e para un pod que se está programando y que puede incluir múltiples intentos de programación (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.pod.scheduling_duration.sum** <br>(gauge) | Latencia e2e total para un pod que se está programando y que puede incluir varios intentos de programación (requiere k8s v1.23+)|
| **kube_scheduler.scheduling.scheduling_duration.count** <br>(gauge) | Número de particiones de programación por subpartes de la operación de programación|
| **kube_scheduler.scheduling.scheduling_duration.quantile** <br>(gauge) | Cuantiles de latencia de programación divididos por subpartes de la operación de programación|
| **kube_scheduler.scheduling.scheduling_duration.sum** <br>(gauge) | Latencia total de programación dividida por subpartes de la operación de programación|
| **kube_scheduler.slis.kubernetes_healthcheck** <br>(gauge) | Resultado de un único check de estado del programador (alfa; requiere k8s v1.26+)|
| **kube_scheduler.slis.kubernetes_healthcheck_total** <br>(count) | Resultados acumulados de todos los checks de estado del programador (alfa; requiere k8s v1.26+)|
| **kube_scheduler.threads** <br>(gauge) | Número de subprocesos de sistema operativo creados|
| **kube_scheduler.volume_scheduling_duration.count** <br>(gauge) | Número de programación del volumen|
| **kube_scheduler.volume_scheduling_duration.sum** <br>(gauge) | Volumen total de la latencia de fase de programación|

### Eventos

El Programador Kube no incluye eventos.

### Checks de servicio

**kube_scheduler.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas.

_Estados: ok, critical_

**kube_scheduler.leader_election.status**

Devuelve `CRITICAL` si no hay ninguna réplica establecida como líder.

_Estados: ok, critical_

**kube_scheduler.up**

Devuelve `CRITICAL` si Kube Scheduler no está en buen estado.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).