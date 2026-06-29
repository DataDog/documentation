---
aliases:
- /es/integrations/argo_rollouts
app_id: argo-rollouts
categories:
- métricas
- kubernetes
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
description: Monitorizar el estado y el rendimiento de Argo Rollouts
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Argo Rollouts
---
## Información general

Este check supervisa [Argo Rollouts](https://argoproj.github.io/rollouts/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en tu entorno de Kubernetes. Para obtener más información sobre la configuración en entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación.

### Instalación

A partir de la versión 7.53.0 del Agent, el check de Argo Rollouts se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para recopilar métricas del endpoint de OpenMetrics que expone Argo Rollouts, que requiere Python 3.

### Configuración

El controlador de Argo Rollouts tiene métricas con formato Prometheus disponibles en `/metrics` en el puerto `8090`. Para que el Agent comience a recopilar métricas, es necesario anotar los pods de Argo Rollouts. Para obtener más información sobre las anotaciones, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación. Puedes encontrar opciones de configuración adicionales al revisar el [argo_rollouts.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/datadog_checks/argo_rollouts/data/conf.yaml.example).

**Nota**: Las métricas enumeradas sólo pueden recopilarse si están disponibles. Algunas métricas sólo se generan cuando se realizan determinadas acciones. Por ejemplo, la métrica `argo_rollouts.info.replicas.updated` sólo se expone tras la actualización de una réplica.

El único parámetro necesario para configurar el check de Argo Rollouts es:

- `openmetrics_endpoint`: este parámetro debe establecerse en la ubicación donde se exponen las métricas con formato Prometheus. El puerto predeterminado es `8090`. En entornos con contenedores, debe utilizarse `%%host%%` para la [autodetección de host](https://docs.datadoghq.com/agent/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-rollouts.checks: |
      {
        "argo_rollouts": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-rollouts'
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de Argo Rollouts pueden recopilarse de los diferentes pods de Argo Rollouts a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

Consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_rollouts", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `argo_rollouts` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **argo_rollouts.analysis.run.info** <br>(gauge) | Información sobre la ejecución del análisis|
| **argo_rollouts.analysis.run.metric.phase** <br>(gauge) | Información sobre la duración de una métrica específica en la ejecución del análisis|
| **argo_rollouts.analysis.run.metric.type** <br>(gauge) | Información sobre el tipo de una métrica específica en las ejecuciones de análisis|
| **argo_rollouts.analysis.run.phase** <br>(gauge) | Información sobre el estado de la ejecución del análisis|
| **argo_rollouts.analysis.run.reconcile.bucket** <br>(count) | Número de observaciones en el histograma de rendimiento de la conciliación de la ejecución del análisis por buckets upper_bound|
| **argo_rollouts.analysis.run.reconcile.count** <br>(count) | Número de observaciones en el histograma de rendimiento de la conciliación de la ejecución del análisis|
| **argo_rollouts.analysis.run.reconcile.error.count** <br>(count) | Error durante la ejecución del análisis|
| **argo_rollouts.analysis.run.reconcile.sum** <br>(count) | La suma de la duración de todas las observaciones del histograma de rendimiento de la conciliación de la ejecución del análisis|
| **argo_rollouts.controller.clientset.k8s.request.count** <br>(count) | El número total de solicitudes de Kubernetes ejecutadas durante la conciliación de la aplicación|
| **argo_rollouts.experiment.info** <br>(gauge) | Información sobre el experimento|
| **argo_rollouts.experiment.phase** <br>(gauge) | Información sobre el estado del experimento|
| **argo_rollouts.experiment.reconcile.bucket** <br>(count) | Número de observaciones en el histograma de rendimiento de la conciliación de experimentos por buckets upper_bound|
| **argo_rollouts.experiment.reconcile.count** <br>(count) | Número de observaciones en el histograma de rendimiento de la conciliación de experimentos|
| **argo_rollouts.experiment.reconcile.error.count** <br>(count) | Error durante el experimento|
| **argo_rollouts.experiment.reconcile.sum** <br>(count) | La suma de la duración de todas las observaciones del histograma de rendimiento de la conciliación de experimentos|
| **argo_rollouts.go.gc.duration.seconds.count** <br>(count) | El recuento resumido de ciclos de recopilación de elementos no usados en la instancia de Argo Rollouts<br>_Se muestra como segundo_ |
| **argo_rollouts.go.gc.duration.seconds.quantile** <br>(gauge) | Resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados en la instancia de Argo Rollouts<br>_Se muestra en segundos_ |
| **argo_rollouts.go.gc.duration.seconds.sum** <br>(count) | La suma de la duración de la pausa de los ciclos de recopilación de elementos no usados en la instancia de Argo Rollouts<br>_Se muestra como segundo_ |
| **argo_rollouts.go.goroutines** <br>(gauge) | El número de goroutines que existen actualmente en la instancia de Argo Rollouts|
| **argo_rollouts.go.info** <br>(gauge) | Métrica que contiene la versión Go como etiqueta|
| **argo_rollouts.go.memstats.alloc_bytes** <br>(gauge) | El número de bytes asignados y aún en uso en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.alloc_bytes.count** <br>(count) | El recuento monotónico de bytes asignados y aún en uso en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.buck_hash.sys_bytes** <br>(gauge) | El número de bytes utilizados por la tabla hash del bucket de perfiles en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.frees.count** <br>(count) | Número total de libres en la instancia de Argo Rollouts|
| **argo_rollouts.go.memstats.gc.cpu_fraction** <br>(gauge) | La fracción del tiempo de CPU disponible de este programa utilizado por el GC desde que se inició el programa en la instancia de Argo Rollouts<br>_Se muestra como fracción_ |
| **argo_rollouts.go.memstats.gc.sys_bytes** <br>(gauge) | El número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.heap.alloc_bytes** <br>(gauge) | El número de bytes del heap asignados y aún en uso en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.heap.idle_bytes** <br>(gauge) | El número de bytes de heap en espera de ser utilizados en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.heap.inuse_bytes** <br>(gauge) | El número de bytes del heap que están en uso en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.heap.objects** <br>(gauge) | El número de objetos asignados en la instancia de Argo Rollouts<br>_Se muestra como objeto_ |
| **argo_rollouts.go.memstats.heap.released_bytes** <br>(gauge) | El número de bytes de heap liberados al SO en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.heap.sys_bytes** <br>(gauge) | El número de bytes de heap obtenidos del sistema en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.lookups.count** <br>(count) | Número de búsquedas de punteros|
| **argo_rollouts.go.memstats.mallocs.count** <br>(count) | El número de mallocs|
| **argo_rollouts.go.memstats.mcache.inuse_bytes** <br>(gauge) | El número de bytes en uso por las estructuras mcache en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.mcache.sys_bytes** <br>(gauge) | El número de bytes utilizados para las estructuras mcache obtenidas del sistema en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.mspan.inuse_bytes** <br>(gauge) | El número de bytes en uso por las estructuras mspan en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.mspan.sys_bytes** <br>(gauge) | El número de bytes utilizados para las estructuras mspan obtenidas del sistema en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.next.gc_bytes** <br>(gauge) | El número de bytes del heap cuando suceda la próxima recopilación de elementos no usados en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.other.sys_bytes** <br>(gauge) | El número de bytes utilizados para otras asignaciones del sistema en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.stack.inuse_bytes** <br>(gauge) | El número de bytes en uso por el asignador de stack tecnológico en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.stack.sys_bytes** <br>(gauge) | El número de bytes obtenidos del sistema para el asignador de stack tecnológico en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.memstats.sys_bytes** <br>(gauge) | El número de bytes obtenidos del sistema en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.go.threads** <br>(gauge) | El número de subprocesos del sistema operativo creados en la instancia de Argo Rollouts<br>_Se muestra como subproceso_ |
| **argo_rollouts.notification.send.bucket** <br>(count) | Número de observaciones en el histograma de rendimiento de envío de notificaciones por buckets upper_bound|
| **argo_rollouts.notification.send.count** <br>(count) | Número de observaciones en el histograma de rendimiento del envío de notificaciones|
| **argo_rollouts.notification.send.sum** <br>(count) | La suma de la duración de todas las observaciones en el histograma de rendimiento del envío de notificaciones|
| **argo_rollouts.process.cpu.seconds.count** <br>(count) | El tiempo total de CPU del usuario y del sistema empleado en segundos en la instancia de Argo Rollouts<br>_Se muestra en segundos_ |
| **argo_rollouts.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos en la instancia de Argo Rollouts|
| **argo_rollouts.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos en la instancia de Argo Rollouts|
| **argo_rollouts.process.resident_memory.bytes** <br>(gauge) | El tamaño de la memoria residente en bytes en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.process.start_time.seconds** <br>(gauge) | La hora de inicio del proceso desde unix epoch en segundos en la instancia de Argo Rollouts<br>_Se muestra como segundo_ |
| **argo_rollouts.process.virtual_memory.bytes** <br>(gauge) | El tamaño de la memoria virtual en bytes en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.process.virtual_memory.max_bytes** <br>(gauge) | La cantidad máxima de memoria virtual disponible en bytes en la instancia de Argo Rollouts<br>_Se muestra como byte_ |
| **argo_rollouts.rollout.events.count** <br>(count) | Recuento de eventos de despliegue|
| **argo_rollouts.rollout.info** <br>(gauge) | Información sobre el despliegue|
| **argo_rollouts.rollout.info.replicas.available** <br>(gauge) | Número de réplicas disponibles por despliegue|
| **argo_rollouts.rollout.info.replicas.desired** <br>(gauge) | Número de réplicas deseadas por despliegue|
| **argo_rollouts.rollout.info.replicas.unavailable** <br>(gauge) | Número de réplicas no disponibles por despliegue|
| **argo_rollouts.rollout.info.replicas.updated** <br>(gauge) | Número de réplicas actualizadas por despliegue|
| **argo_rollouts.rollout.phase** <br>(gauge) | Información sobre el estado del despliegue. Esto será pronto obsoleto para Argo Rollouts, utiliza `argo_rollouts.rollout.info` en su lugar.|
| **argo_rollouts.rollout.reconcile.bucket** <br>(count) | Número de observaciones en el histograma de rendimiento de la conciliación de despliegue por buckets upper_bound|
| **argo_rollouts.rollout.reconcile.count** <br>(count) | El número de observaciones en el histograma de rendimiento de la conciliación del despliegue|
| **argo_rollouts.rollout.reconcile.error.count** <br>(count) | Error durante el despliegue|
| **argo_rollouts.rollout.reconcile.sum** <br>(count) | La suma de la duración de todas las observaciones en el histograma de rendimiento de la conciliación del despliegue|
| **argo_rollouts.workqueue.adds.count** <br>(count) | Número total de adiciones gestionadas por la cola de trabajo|
| **argo_rollouts.workqueue.depth** <br>(gauge) | La profundidad actual de la cola de trabajo|
| **argo_rollouts.workqueue.longest.running_processor.seconds** <br>(gauge) | El número de segundos que ha estado funcionando el procesador de cola de trabajo más largo<br>_Se muestra como segundo_ |
| **argo_rollouts.workqueue.queue.duration.seconds.bucket** <br>(count) | El bucket del histograma de cuánto tiempo en segundos permanece un elemento en la cola de trabajo antes de ser solicitado<br>_Se muestra como segundo_ |
| **argo_rollouts.workqueue.queue.duration.seconds.count** <br>(count) | Número total de eventos en el histograma de duración de la cola de trabajo|
| **argo_rollouts.workqueue.queue.duration.seconds.sum** <br>(count) | La suma de los eventos contados en el histograma de duración de la cola de trabajo|
| **argo_rollouts.workqueue.retries.count** <br>(count) | Número total de reintentos gestionados por cola de trabajo|
| **argo_rollouts.workqueue.unfinished_work.seconds** <br>(gauge) | El número de segundos de trabajo realizado que está en curso y no ha sido observado por `work_duration`. Los valores grandes indican subprocesos atascados. Se puede deducir el número de subprocesos atascados observando la velocidad a la que aumenta<br>_Se muestra en segundos_ |
| **argo_rollouts.workqueue.work.duration.seconds.bucket** <br>(count) | El bucket del histograma para el tiempo en segundos que tarda el procesamiento de un elemento en la cola de trabajo<br>_Se muestra como segundo_ |
| **argo_rollouts.workqueue.work.duration.seconds.count** <br>(count) | Número total de eventos en el histograma de duración del procesamiento de elementos de la cola de trabajo|
| **argo_rollouts.workqueue.work.duration.seconds.sum** <br>(count) | La suma de eventos en el histograma de duración del procesamiento de elementos de la cola de trabajo|

### Eventos

La integración de Argo Rollouts no incluye ningún evento.

### Checks de servicio

**argo_rollouts.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics de Argo Rollouts, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización del estado y el rendimiento de los pipelines nativos de contenedores de Continuous Integration Continuous Delivery ](https://www.datadoghq.com/blog/container-native-ci-cd-integrations/)