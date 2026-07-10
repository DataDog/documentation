---
aliases:
- /es/integrations/argo_workflows
app_id: argo-workflows
categories:
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
description: Monitorizar el estado y el rendimiento de Argo Workflows
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Argo Workflows
---
## Información general

Este check supervisa [Argo Workflows](https://argo-workflows.readthedocs.io/en/stable/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en tu entorno de Kubernetes. Para obtener más información sobre la configuración en entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación.

### Instalación

A partir de la versión 7.53.0 del Agent, el check de Argo Workflows se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para recopilar métricas del endpoint de OpenMetrics.

### Configuración

El Argo Workflows Workflow Controller tiene [métricas con formato Prometheus](https://argo-workflows.readthedocs.io/en/stable/metrics/) disponibles en `/metrics` en el puerto `9090`. Para que el Agent comience a recopilar métricas, es necesario anotar el pod del Workflow Controller. Para obtener más información sobre las anotaciones, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) como guía. Puedes encontrar opciones de configuración adicionales en el [argo_workflows.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/argo_workflows/datadog_checks/argo_workflows/data/conf.yaml.example).

El único parámetro necesario para configurar el check de Argo Workflows es:

- `openmetrics_endpoint`: este parámetro debe establecerse en la ubicación donde se exponen las métricas con formato Prometheus. El puerto predeterminado es `9090`. En entornos con contenedores, debe utilizarse `%%host%%` para la [autodetección de host](https://docs.datadoghq.com/agent/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-workflows.checks: |
      {
        "argo_workflows": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-workflows'
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de Argo Workflows pueden recopilarse de los diferentes pods de Argo Workflows a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

Consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_workflows", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `argo_workflows` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **argo_workflows.cronworkflows.concurrencypolicy_triggered.count** <br>(count) | Número de veces que se activa la política de concurrencia en los procesos cron|
| **argo_workflows.cronworkflows.triggered.count** <br>(count) | Número de procesos cron activados|
| **argo_workflows.current_workflows** <br>(gauge) | Número de procesos a los que puede acceder actualmente el controlador por estado (se actualiza cada 15 segundos)|
| **argo_workflows.deprecated.feature** <br>(gauge) | Indica el uso de funciones obsoletas|
| **argo_workflows.error.count** <br>(count) | Número de errores encontrados por el controlador por causa<br>_Se muestra como error_ |
| **argo_workflows.go.gc.duration.seconds.count** <br>(count) | El recuento resumido de ciclos de recopilación de elementos no usados en la instancia de Argo Workflows|
| **argo_workflows.go.gc.duration.seconds.quantile** <br>(gauge) | La duración de la pausa de los ciclos de recopilación de elementos no usados en la instancia de Argo Workflows por `quantile`|
| **argo_workflows.go.gc.duration.seconds.sum** <br>(count) | La suma de la duración de la pausa de los ciclos de recopilación de elementos no usados en la instancia de Argo Workflows<br>_Se muestra en segundos_ |
| **argo_workflows.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente.|
| **argo_workflows.go.info** <br>(gauge) | Información sobre el entorno Go.|
| **argo_workflows.go.memstats.alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.alloc_bytes.count** <br>(count) | Número total de bytes asignados, incluso si se han liberado.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.buck_hash.sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.frees.count** <br>(count) | Número total de liberados.|
| **argo_workflows.go.memstats.gc.sys_bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.heap.alloc_bytes** <br>(gauge) | Número de bytes del heap asignados y aún en uso.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.heap.idle_bytes** <br>(gauge) | Número de bytes de heap en espera de ser utilizados.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.heap.inuse_bytes** <br>(gauge) | Número de bytes de heap que están en uso.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados.|
| **argo_workflows.go.memstats.heap.released_bytes** <br>(gauge) | Número de bytes de heap liberados al SO.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.heap.sys_bytes** <br>(gauge) | Número de bytes de heap obtenidos del sistema.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.last_gc_time_seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recopilación de elementos no usados.<br>_Se muestra como segundo_ |
| **argo_workflows.go.memstats.lookups.count** <br>(count) | Número total de búsquedas de punteros.|
| **argo_workflows.go.memstats.mallocs.count** <br>(count) | Número total de mallocs.|
| **argo_workflows.go.memstats.mcache.inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.mcache.sys_bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.mspan.inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.mspan.sys_bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.next.gc_bytes** <br>(gauge) | Número de bytes de heap en que se realizará la próxima recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.other.sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.stack.inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.stack.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **argo_workflows.go.memstats.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema.<br>_Se muestra como byte_ |
| **argo_workflows.go.threads** <br>(gauge) | Número de subprocesos de sistema operativo creados.|
| **argo_workflows.is_leader** <br>(gauge) | Indica si la instancia actual es el líder|
| **argo_workflows.k8s_request.count** <br>(count) | Número de solicitudes de kubernetes ejecutadas. https://argo-workflows.readthedocs.io/en/release-3.5/metrics/#argo_workflows_k8s_request_total<br>_Se muestra como solicitud_ |
| **argo_workflows.k8s_request.duration.bucket** <br>(count) | Recuento de las duraciones de las solicitudes de Kubernetes divididas en buckets por límites superiores|
| **argo_workflows.k8s_request.duration.count** <br>(count) | Recuento total de duraciones de solicitudes de Kubernetes |
| **argo_workflows.k8s_request.duration.sum** <br>(count) | Suma de las duraciones de las solicitudes de Kubernetes<br> _Se muestra en segundos_ |
| **argo_workflows.log_messages.count** <br>(count) | Número total de mensajes de log.<br>_Se muestra como mensaje_ |
| **argo_workflows.operation_duration_seconds.bucket** <br>(count) | El recuento de observaciones en el histograma de duraciones de operaciones dividido en bucket por límite superior.|
| **argo_workflows.operation_duration_seconds.count** <br>(count) | Recuento total de observaciones en el histograma de duración de las operaciones|
| **argo_workflows.operation_duration_seconds.sum** <br>(count) | Tiempo total en segundos empleado en las operaciones<br>_Se muestra en segundos_ |
| **argo_workflows.pod.pending.count** <br>(count) | Número de pods pendientes|
| **argo_workflows.pods** <br>(gauge) | Número de pods de procesos a los que puede acceder actualmente el controlador por estado (se actualiza cada 15 segundos)|
| **argo_workflows.pods_total.count** <br>(count) | Recuento total de pods|
| **argo_workflows.queue.duration.bucket** <br>(count) | Recuento de duraciones de colas divididas en buckets por límites superiores|
| **argo_workflows.queue.duration.count** <br>(count) | Recuento total de duraciones de cola|
| **argo_workflows.queue.duration.sum** <br>(count) | Suma de las duraciones de las colas<br>_Se muestra en segundos_ |
| **argo_workflows.queue.longest_running** <br>(gauge) | Duración de la cola más larga|
| **argo_workflows.queue.retries.count** <br>(count) | Número de reintentos de cola|
| **argo_workflows.queue.unfinished_work** <br>(gauge) | Trabajo no terminado en la cola|
| **argo_workflows.queue_adds.count** <br>(count) | Adiciones a la cola|
| **argo_workflows.queue_depth** <br>(gauge) | Profundidad de la cola|
| **argo_workflows.queue_latency.bucket** <br>(count) | El recuento de observaciones del tiempo que los objetos pasan esperando en la cola. Dividido en buckets por límites superiores|
| **argo_workflows.queue_latency.count** <br>(count) | El recuento total de observaciones del tiempo que los objetos pasan esperando en la cola.|
| **argo_workflows.queue_latency.sum** <br>(count) | El tiempo total que los objetos pasan esperando en la cola.<br>_Se muestra como segundo_ |
| **argo_workflows.total.count** <br>(count) | Recuento total de procesos|
| **argo_workflows.version** <br>(gauge) | Versión de Argo Workflows|
| **argo_workflows.workers_busy** <br>(gauge) | Número de workers actualmente ocupados<br>_Se muestra como worker_ |
| **argo_workflows.workflow_condition** <br>(gauge) | Condición del proceso. https://argo-workflows.readthedocs.io/en/release-3.5/metrics/#argo_workflows_workflow_condition|
| **argo_workflows.workflows_processed.count** <br>(count) | Número de actualizaciones del proceso procesadas|
| **argo_workflows.workflowtemplate.runtime** <br>(gauge) | Tiempo de ejecución de la plantilla del proceso |
| **argo_workflows.workflowtemplate.triggered.count** <br>(count) | Número de veces que se activan las plantillas del proceso|

### Eventos

La integración Argo Workflows no incluye eventos.

### Checks de servicio

**argo_workflows.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de OpenMetrics de Argo Workflows.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización del estado y el rendimiento de los pipelines nativos de contenedores de Continuous Integration Continuous Delivery ](https://www.datadoghq.com/blog/container-native-ci-cd-integrations/)