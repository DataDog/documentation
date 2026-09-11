---
app_id: karpenter
categories:
- métricas
- kubernetes
- recopilación de logs
- aprovisionamiento
custom_kind: integración
description: Monitorización del estado y el rendimiento de Karpenter
further_reading:
- link: https://www.datadoghq.com/blog/container-native-integrations/#autoscaling-and-resource-utilization-with-karpenter
  tag: blog
  text: 'Resumen de la integración: Monitorización de tecnologías nativas de contenedores'
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Karpenter
---
## Información general

Este check monitoriza [Karpenter](https://karpenter.sh/) a través del Datadog Agent. Para obtener más información, consulta [Monitorización de Karpenter](https://karpenter.sh/docs/reference/metrics/).

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en tu entorno de Kubernetes. Para obtener más información sobre la configuración en entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/) para obtener orientación.

### Instalación

A partir de la versión 7.50.0 del Agent, el check de Karpenter se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para recopilar métricas del endpoint de OpenMetrics que expone Karpenter, que requiere Python 3.

### Configuración

#### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus están expuestas en tu clúster de Karpenter y en qué puerto. Puedes configurar el puerto siguiendo las instrucciones de la página [Métricas](https://karpenter.sh/docs/reference/metrics/) de la documentación de Karpenter. Para que el Agent comience a recopilar métricas, los pods de Karpenter deben estar anotados. Para obtener más información sobre anotaciones, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/) como guía. Puedes encontrar opciones adicionales de configuración consultando el [ejemplo karpenter.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/karpenter/datadog_checks/karpenter/data/conf.yaml.example).

**Nota**: Las métricas enumeradas sólo pueden recopilarse si están disponibles. Algunas métricas se generan sólo cuando se realizan determinadas acciones. Por ejemplo, la métrica `karpenter.nodes.terminated` se expone sólo después de que se termina un nodo.

El único parámetro necesario para configurar el check de Karpenter es:

- `openmetrics_endpoint`: Este parámetro debe configurarse con la localización donde se exponen las métricas con formato Prometheus. El puerto por defecto es `8080`, pero puede configurarse utilizando la [variable de entorno](https://karpenter.sh/docs/reference/metrics/) `METRICS_PORT`. En entornos en contenedores, debe utilizarse `%%host%%` para [la detección automática de hosts](https://docs.datadoghq.com/containers/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/controller.checks: |
      {
        "karpenter": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'controller'
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de Karpenter pueden recopilarse de los distintos pods de Karpenter a través de Kubernetes. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

Consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "karpenter", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado de Agent](https://docs.datadoghq.com/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information) y busca `karpenter` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **karpenter.aws.sdk_go.request.count** <br>(count) | Número total de solicitudes Go del SDK de AWS.|
| **karpenter.aws.sdk_go.request.duration_seconds.bucket** <br>(count) | Latencia de buckets del histograma de solicitudes Go del SDK de AWS.|
| **karpenter.aws.sdk_go.request.duration_seconds.count** <br>(count) | Recuento de duraciones de solicitudes Go del SDK de AWS.|
| **karpenter.aws.sdk_go.request.duration_seconds.sum** <br>(count) | Suma de duraciones de solicitudes Go del SDK de AWS.<br>_Se muestra en segundos_ |
| **karpenter.aws.sdk_go.request_attempt.count** <br>(count) | Número total de intentos de solicitudes Go del SDK de AWS.|
| **karpenter.aws.sdk_go.request_attempt.duration_seconds.bucket** <br>(count) | Latencia de buckets del histograma de intentos de solicitudes Go del SDK de AWS.<br>_Se muestra en segundos_ |
| **karpenter.aws.sdk_go.request_attempt.duration_seconds.count** <br>(count) | Recuento de duraciones de intentos de solicitudes Go del SDK de AWS.<br>_Se muestra como solicitud_ |
| **karpenter.aws.sdk_go.request_attempt.duration_seconds.sum** <br>(count) | Suma de duraciones de intentos de solicitudes Go del SDK de AWS.<br>_Se muestra en segundos_ |
| **karpenter.build_info** <br>(gauge) | Métrica con un valor '1' constante etiquetada por versión a partir de la cual se ha compilado Karpenter.|
| **karpenter.certwatcher.read.certificate.count** <br>(count) | Recuento de lecturas de certificados.<br>_Se muestra como lectura_ |
| **karpenter.certwatcher.read.certificate.errors.count** <br>(count) | Recuento de errores de lectura de certificados.<br>_Se muestra como error_ |
| **karpenter.cloudprovider.batcher.batch.time_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de la ventana de agrupamiento en lotes por buckets `upper_bound`.|
| **karpenter.cloudprovider.batcher.batch.time_seconds.count** <br>(count) | Recuento de observaciones en el histograma de la ventana de agrupamiento en lotes.|
| **karpenter.cloudprovider.batcher.batch.time_seconds.sum** <br>(count) | Suma de la duración de la ventana de agrupamiento en lotes por agrupador.<br>_Se muestra en segundos_ |
| **karpenter.cloudprovider.batcher.batch_size.bucket** <br>(count) | Recuento de observaciones en el histograma de la ventana de lotes de solicitudes por buckets `upper_bound`.|
| **karpenter.cloudprovider.batcher.batch_size.count** <br>(count) | Recuento de observaciones en el histograma de lotes de solicitudes.|
| **karpenter.cloudprovider.batcher.batch_size.sum** <br>(count) | Suma del tamaño del lote de solicitudes por agrupador.|
| **karpenter.cloudprovider.duration_seconds.bucket** <br>(count) | Recuento de observaciones en la duración del histograma de proveedores de nube por buckets, nombre de método y proveedor `upper_bound`.|
| **karpenter.cloudprovider.duration_seconds.count** <br>(count) | Recuento de observaciones en la duración del histograma de proveedores de nube.|
| **karpenter.cloudprovider.duration_seconds.sum** <br>(count) | Suma de la duración de llamadas a métodos de proveedores de nube. Etiquetado por el controlador.<br>_Se muestra en segundos_ |
| **karpenter.cloudprovider.errors.count** <br>(count) | Recuento de errores devueltos por llamadas a CloudProvider.<br>_Se muestra como error_ |
| **karpenter.cloudprovider.instance.type.cpu_cores** <br>(gauge) | Núcleos de VCPU para un tipo de instancia dado.<br>_Se muestra como núcleo_ |
| **karpenter.cloudprovider.instance.type.memory_bytes** <br>(gauge) | Memoria, en bytes, de un tipo de instancia dado.<br>_Se muestra en bytes_ |
| **karpenter.cloudprovider.instance.type.offering_available** <br>(gauge) | Disponibilidad de la oferta de tipo de instancia, basada en el tipo de instancia, el tipo de capacidad y la zona.|
| **karpenter.cloudprovider.instance.type.price_estimate** <br>(gauge) | Precio estimado por hora que se utiliza para tomar decisiones informadas sobre el cálculo del coste de los nodos. Se actualiza una vez al inicio y después cada 12 horas.|
| **karpenter.cluster.utilization.percent** <br>(gauge) | Uso de recursos asignables por solicitudes de pod.<br>_Se muestra como porcentaje_ |
| **karpenter.cluster_state.node_count** <br>(gauge) | Recuento actual de nodos en el estado del clúster.<br>_Se muestra como nodo_ |
| **karpenter.cluster_state.synced** <br>(gauge) | Devuelve 1 si el estado del clúster está sincronizado y 0 en caso contrario. Sincronizado comprueba que las reclamaciones de nodos y los nodos que están almacenados en el APIServer tienen la misma representación que el estado de clúster de Karpenter.|
| **karpenter.cluster_state.unsynced.time_seconds** <br>(gauge) | Tiempo durante el cual el estado del clúster no se sincroniza.<br>_Se muestra en segundos_ |
| **karpenter.consistency.errors** <br>(gauge) | Número de checks de coherencia que han fallado.<br>_Se muestra como error_ |
| **karpenter.controller.runtime.active_workers** <br>(gauge) | Número de workers utilizados actualmente por controlador.<br>_Se muestra como worker_ |
| **karpenter.controller.runtime.max.concurrent_reconciles** <br>(gauge) | Número máximo de conciliaciones simultáneas por controlador.|
| **karpenter.controller.runtime.reconcile.count** <br>(count) | Recuento de conciliaciones por controlador.|
| **karpenter.controller.runtime.reconcile.time_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de conciliación por controlador por buckets `upper_bound`.|
| **karpenter.controller.runtime.reconcile.time_seconds.count** <br>(count) | Recuento de observaciones en el histograma de conciliación por controlador.|
| **karpenter.controller.runtime.reconcile.time_seconds.sum** <br>(count) | Suma del tiempo por conciliación por controlador<br>_Se muestra en segundos_ |
| **karpenter.controller.runtime.reconcile_errors.count** <br>(count) | Recuento de errores de conciliación por controlador.<br>_Se muestra como error_ |
| **karpenter.controller.runtime.reconcile_panics.count** <br>(count) | Número total de pánicos de conciliación por controlador.|
| **karpenter.controller.runtime.terminal.reconcile.errors.count** <br>(count) | Número total de errores de conciliación de terminales por controlador.|
| **karpenter.deprovisioning.actions_performed.count** <br>(count) | Recuento de acciones de desaprovisionamiento realizadas. Etiquetado por desaprovisionador.<br>_Se muestra como ejecución_ |
| **karpenter.deprovisioning.consolidation_timeouts** <br>(gauge) | Número de veces que el algoritmo de consolidación ha alcanzado un tiempo de espera. Etiquetado por tipo de consolidación.<br>_Se muestra como tiempo de espera_ |
| **karpenter.deprovisioning.eligible_machines** <br>(gauge) | Número de máquinas susceptibles de ser desaprovisionadas por Karpenter. Etiquetado por desaprovisionador.|
| **karpenter.deprovisioning.evaluation.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de evaluación del desaprovisionamiento por buckets `upper_bound`.|
| **karpenter.deprovisioning.evaluation.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de evaluación del desprovisionamiento.|
| **karpenter.deprovisioning.evaluation.duration_seconds.sum** <br>(count) | Suma de la duración del proceso de evaluación del desaprovisionamiento en segundos.<br>_Se muestra en segundos_ |
| **karpenter.deprovisioning.replacement.machine.initialized_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de la máquina de sustitución por buckets `upper_bound`.|
| **karpenter.deprovisioning.replacement.machine.initialized_seconds.count** <br>(count) | Recuento de observaciones en el histograma de la máquina de sustitución.|
| **karpenter.deprovisioning.replacement.machine.initialized_seconds.sum** <br>(count) | Suma del tiempo necesario para que una máquina de sustitución se inicialice.<br>_Se muestra en segundos_ |
| **karpenter.deprovisioning.replacement.machine.launch.failure_counter.count** <br>(count) | Recuento de veces que Karpenter no ha podido lanzar un nodo de sustitución para el desaprovisionamiento. Etiquetado por desaprovisionador<br>_Se muestra como intento_ |
| **karpenter.disruption.actions_performed.count** <br>(count) | Recuento de acciones de interrupción realizadas. Etiquetado por método de interrupción.<br>_Se muestra como ejecución_ |
| **karpenter.disruption.budgets.allowed_disruptions** <br>(gauge) | Número de nodos de un grupo de nodos dado que pueden ser interrumpidos en un momento dado. Etiquetado por grupo de nodos. Ten en cuenta que las interrupciones permitidas pueden cambiar muy rápidamente, ya que pueden crearse nuevos nodos y eliminarse otros en cualquier momento.<br>_Se muestra como nodo_ |
| **karpenter.disruption.consolidation_timeouts.count** <br>(count) | Recuento de veces que el algoritmo de consolidación ha alcanzado un tiempo de espera. Etiquetado por tipo de consolidación.<br>_Se muestra como tiempo de espera_ |
| **karpenter.disruption.eligible_nodes** <br>(gauge) | Número de nodos susceptibles de ser interrumpidos por Karpenter. Etiquetado por método de interrupción.<br>_Se muestra como nodo_ |
| **karpenter.disruption.evaluation.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de evaluación de interrupciones por buckets `upper_bound`.|
| **karpenter.disruption.evaluation.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de evaluación de interrupciones.|
| **karpenter.disruption.evaluation.duration_seconds.sum** <br>(count) | Suma de la duración del proceso de evaluación de interrupciones en segundos.<br>_Se muestra en segundos_ |
| **karpenter.disruption.nodes.disrupted.count** <br>(count) | Número total de nodos interrumpidos. Etiquetado por grupo de nodos, acción de interrupción, método y tipo de consolidación.<br>_Se muestra como nodo_ |
| **karpenter.disruption.pods.disrupted.count** <br>(count) | Número total de pods reprogramables interrumpidos en nodos. Etiquetado por grupo de nodos, acción de interrupción, método y tipo de consolidación.|
| **karpenter.disruption.queue_depth** <br>(gauge) | Número de comandos en espera en la cola de orquestación de interrupciones.<br>_Se muestra como comando_ |
| **karpenter.disruption.replacement.nodeclaim.failures.count** <br>(count) | Número de veces que Karpenter no ha podido lanzar un nodo de sustitución para la interrupción. Etiquetado por método de interrupción.<br>_Se muestra como intento_ |
| **karpenter.disruption.replacement.nodeclaim.initialized_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de reclamaciones de nodos de sustitución por buckets `upper_bound`.|
| **karpenter.disruption.replacement.nodeclaim.initialized_seconds.count** <br>(count) | Recuento de observaciones en el histograma de reclamaciones de nodos de sustitución.|
| **karpenter.disruption.replacement.nodeclaim.initialized_seconds.sum** <br>(count) | Suma del tiempo necesario para que una reclamación de nodos de sustitución se inicialice.<br>_Se muestra en segundos_ |
| **karpenter.go.gc.duration_seconds.count** <br>(count) | Resumen del recuento de ciclos de recolección de basura en la instancia Karpenter.|
| **karpenter.go.gc.duration_seconds.quantile** <br>(gauge) | Duración de la pausa de los ciclos de recolección de basura en la instancia Karpenter por `quantile`.|
| **karpenter.go.gc.duration_seconds.sum** <br>(count) | Suma de la duración de la pausa de los ciclos de recolección de basura en la instancia Karpenter.<br>_Se muestra en segundos_ |
| **karpenter.go.memstats.alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.alloc_bytes.count** <br>(count) | Recuento de bytes asignados, aunque se hayan liberado.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.buck.hash.sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.frees.count** <br>(count) | Recuento de libres|
| **karpenter.go.memstats.gc.sys_bytes** <br>(gauge) | Número de bytes utilizados para metadatos del sistema de recolección de basura.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.heap.alloc_bytes** <br>(gauge) | Número de bytes heap asignados y aún en uso.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.heap.idle_bytes** <br>(gauge) | Número de bytes heap a la espera de ser utilizados.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.heap.inuse_bytes** <br>(gauge) | Número de bytes heap en uso.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados.<br>_Se muestra como objeto_ |
| **karpenter.go.memstats.heap.released_bytes** <br>(gauge) | Número de bytes heap liberados al sistema operativo.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.heap.sys_bytes** <br>(gauge) | Número de bytes heap obtenidos del sistema.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.last.gc.time_seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recolección de basura.<br>_Se muestra en segundos_ |
| **karpenter.go.memstats.lookups.count** <br>(count) | Recuento de búsquedas de punteros.|
| **karpenter.go.memstats.mallocs.count** <br>(count) | Recuento de mallocs.|
| **karpenter.go.memstats.mcache.inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mcache.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.mcache.sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mcache obtenidas del sistema.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.mspan.inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mspan.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.mspan.sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mspan obtenidas del sistema.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.next.gc_bytes** <br>(gauge) | Número de bytes heap en que se realizará la próxima recolección de basura.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.other.sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.stack.inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stacks tecnológicos.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.stack.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stacks tecnológicos.<br>_Se muestra en bytes_ |
| **karpenter.go.memstats.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema.<br>_Se muestra en bytes_ |
| **karpenter.go_goroutines** <br>(gauge) | Número de goroutines que existen actualmente.|
| **karpenter.go_info** <br>(gauge) | Información sobre el entorno Go.|
| **karpenter.go_threads** <br>(gauge) | Número de subprocesos de sistema operativo creados<br>_Se muestra como subproceso_ |
| **karpenter.interruption.actions_performed.count** <br>(count) | Recuento de acciones de notificación realizadas. Etiquetado por acción.<br>_Se muestra como ejecución_ |
| **karpenter.interruption.deleted_messages.count** <br>(count) | Recuento de mensajes eliminados de la cola SQS.<br>_Se muestra como mensaje_ |
| **karpenter.interruption.message.latency.time_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de latencia de mensajes de interrupción por buckets `upper_bound`.|
| **karpenter.interruption.message.latency.time_seconds.count** <br>(count) | Recuento de observaciones en el histograma de latencia de mensajes de interrupción.|
| **karpenter.interruption.message.latency.time_seconds.sum** <br>(count) | Suma del tiempo transcurrido entre la creación del mensaje en la cola y la acción tomada con el mensaje por parte del controlador.<br>_Se muestra en segundos_ |
| **karpenter.interruption.received_messages.count** <br>(count) | Recuento de mensajes recibidos de la cola SQS. Desglosado por tipo de mensaje y si el mensaje es procesable.<br>_Se muestra como mensaje_ |
| **karpenter.leader_election.master_status** <br>(gauge) | Indica si el sistema de notificación es el principal del contrato de arrendamiento en cuestión. 0 indica copia de seguridad, 1 indica principal. El 'nombre' es la cadena utilizada para identificar el contrato de arrendamiento.|
| **karpenter.machines_created.count** <br>(count) | Recuento de máquinas creadas en total por Karpenter. Etiquetado por motivo de creación de la máquina y por proveedor propietario.|
| **karpenter.machines_disrupted.count** <br>(count) | Recuento de máquinas interrumpidas en total por Karpenter. Etiquetado por tipo de interrupción de la máquina y por proveedor propietario.|
| **karpenter.machines_drifted.count** <br>(count) | Recuento de motivos de derivas de máquinas en total por parte de Karpenter. Etiquetado por tipo de deriva de la máquina y por proveedor propietario.|
| **karpenter.machines_initialized.count** <br>(count) | Recuento de máquinas inicializadas en total por Karpenter. Etiquetado por proveedor propietario.|
| **karpenter.machines_launched.count** <br>(count) | Recuento de máquinas iniciadas en total por Karpenter. Etiquetado por proveedor propietario.|
| **karpenter.machines_registered.count** <br>(count) | Recuento de máquinas registradas en total por Karpenter. Etiquetado por proveedor propietario.|
| **karpenter.machines_terminated.count** <br>(count) | Número total de máquinas finalizadas por Karpenter. Etiquetado por motivo de finalización y por proveedor propietario.|
| **karpenter.nodeclaims_created** <br>(gauge) | Número de reclamaciones de nodos creadas en total por Karpenter. Etiquetado por motivo de creación de la reclamación de nodos y por grupo de nodos propietario.|
| **karpenter.nodeclaims_disrupted** <br>(gauge) | Número total de reclamaciones de nodos interrumpidas por Karpenter. Etiquetado por tipo de interrupción de la reclamación de nodos y por grupo de nodos propietario.|
| **karpenter.nodeclaims_drifted** <br>(gauge) | Número de motivos de derivas de reclamaciones de nodos en total por Karpenter. Etiquetado por tipo de deriva de la reclamación de nodos y por grupo de nodos propietario.|
| **karpenter.nodeclaims_initialized** <br>(gauge) | Número de reclamaciones de nodos inicializadas en total por Karpenter. Etiquetado por grupo de nodos propietario.|
| **karpenter.nodeclaims_instance_termination.duration_seconds.bucket** <br>(count) | Histograma de buckets para la duración de finalizaciones de instancias CloudProvider.|
| **karpenter.nodeclaims_instance_termination.duration_seconds.count** <br>(count) | Recuento de observaciones de finalizaciones de instancias CloudProvider.|
| **karpenter.nodeclaims_instance_termination.duration_seconds.sum** <br>(count) | Suma de las duraciones de finalizaciones de instancias CloudProvider.<br>_Se muestra en segundos_ |
| **karpenter.nodeclaims_launched** <br>(gauge) | Número de reclamaciones de nodos inicializadas en total por Karpenter. Etiquetado por grupo de nodos propietario.|
| **karpenter.nodeclaims_registered** <br>(gauge) | Número de reclamaciones de nodos registradas en total por Karpenter. Etiquetado por grupo de nodos propietario.|
| **karpenter.nodeclaims_terminated** <br>(gauge) | Número de reclamaciones de nodos finalizadas en total por Karpenter. Etiquetado por motivo de finalización de la reclamación de nodos y por grupo de nodos propietario.|
| **karpenter.nodeclaims_termination.duration_seconds.bucket** <br>(count) | Histograma de buckets para la duración de finalizaciones de reclamaciones de nodos.|
| **karpenter.nodeclaims_termination.duration_seconds.count** <br>(count) | Recuento de observaciones de duraciones de finalizaciones de reclamaciones de nodos.|
| **karpenter.nodeclaims_termination.duration_seconds.sum** <br>(count) | Suma de las duraciones de finalizaciones de reclamaciones de nodos.<br>_Se muestra en segundos_ |
| **karpenter.nodepool_limit** <br>(gauge) | Los límites de grupos de nodos son los límites especificados en el aprovisionador que restringen la cantidad de recursos aprovisionados. Etiquetado por nombre de grupo de nodos y por tipo de recurso.|
| **karpenter.nodepool_usage** <br>(gauge) | El uso de grupos de nodos es la cantidad de recursos que han sido aprovisionados por un grupo de nodos en particular. Etiquetado por nombre de grupo de nodos y por tipo de recurso.|
| **karpenter.nodes.allocatable** <br>(gauge) | Cantidad de recursos asignables por nodos.|
| **karpenter.nodes.created.count** <br>(count) | Recuento de nodos creados en total por Karpenter. Etiquetado por proveedor propietario.<br>_Se muestra como nodo_ |
| **karpenter.nodes.eviction.queue_depth** <br>(gauge) | Número de pods que están a la espera de un desalojo correcto en la cola de desalojos.|
| **karpenter.nodes.leases_deleted.count** <br>(count) | Recuento de arrendamientos filtrados eliminados.|
| **karpenter.nodes.system_overhead** <br>(gauge) | El estado informa de los recursos reservados para sobrecargas del sistema, y para la diferencia entre la capacidad de los nodos y los valores asignables.|
| **karpenter.nodes.terminated.count** <br>(count) | Recuento de nodos finalizados en total por Karpenter. Etiquetado por proveedor propietario.<br>_Se muestra como nodo_ |
| **karpenter.nodes.termination.time_seconds.count** <br>(count) | Recuento de observaciones en el resumen del tiempo en segundos de finalización de los nodos.|
| **karpenter.nodes.termination.time_seconds.quantile** <br>(gauge) | Tiempo transcurrido entre la solicitud de eliminación de un nodo y la eliminación de su finalizador por `quantile`.|
| **karpenter.nodes.termination.time_seconds.sum** <br>(count) | Suma del tiempo transcurrido entre la solicitud de eliminación de un nodo y la eliminación de su finalizador.<br>_Se muestra en segundos_ |
| **karpenter.nodes.total.daemon_limits** <br>(gauge) | Total de recursos especificados por límites de pods DaemonSet.|
| **karpenter.nodes.total.daemon_requests** <br>(gauge) | Total de recursos solicitados por pods DaemonSet.|
| **karpenter.nodes.total.pod_limits** <br>(gauge) | Total de recursos de pod especificados por límites de pods no-DaemonSet.|
| **karpenter.nodes.total.pod_requests** <br>(gauge) | Total de recursos de pod solicitados por pods no-DaemonSet vinculados.|
| **karpenter.operator.ec2nodeclass.status_condition.current_status.seconds** <br>(gauge) | Tiempo que la condición de estado actual ha estado activa para ec2nodeclass.<br>_Se muestra en segundos_ |
| **karpenter.operator.ec2nodeclass.status_condition.transitions.count** <br>(count) | Recuento de transiciones de condición de estado para ec2nodeclass.|
| **karpenter.operator.ec2nodeclass.status_condition_count** <br>(gauge) | Número de condiciones para ec2nodeclass.|
| **karpenter.operator.node.status_condition.current_status.seconds** <br>(gauge) | Tiempo que la condición de estado actual ha estado activa para el nodo.<br>_Se muestra en segundos_ |
| **karpenter.operator.node.status_condition.transitions.count** <br>(count) | Recuento de transiciones de condiciones de estado para el nodo.|
| **karpenter.operator.node.status_condition.transitions.seconds.bucket** <br>(count) | Histograma de duraciones de condiciones de estado para el nodo.<br>_Se muestra en segundos_ |
| **karpenter.operator.node.status_condition_count** <br>(gauge) | Número de condiciones para el nodo.|
| **karpenter.operator.node.termination.duration_seconds.bucket** <br>(count) | Buckets del histograma para duraciones de finalizaciones de nodos.<br>_Se muestra en segundos_ |
| **karpenter.operator.nodeclaim.status_condition.current_status.seconds** <br>(gauge) | Tiempo que la condición de estado actual ha estado activa para la reclamación de nodos.<br>_Se muestra en segundos_ |
| **karpenter.operator.nodeclaim.status_condition.transitions.count** <br>(count) | Recuento de transiciones de condiciones de estado para reclamaciones de nodos.|
| **karpenter.operator.nodeclaim.status_condition.transitions.seconds.bucket** <br>(count) | Histograma de duraciones de condiciones de estado para reclamaciones de nodos.<br>_Se muestra en segundos_ |
| **karpenter.operator.nodeclaim.status_condition_count** <br>(gauge) | Número de condiciones para reclamaciones de nodos.|
| **karpenter.operator.nodeclaim.termination.duration_seconds.bucket** <br>(count) | Histograma de buckets para duraciones de finalizaciones de reclamaciones de nodos.|
| **karpenter.operator.nodepool.status_condition.current_status.seconds** <br>(gauge) | Tiempo que la condición de estado actual ha estado activa para grupos de nodos.<br>_Se muestra en segundos_ |
| **karpenter.operator.nodepool.status_condition.transitions.count** <br>(count) | Recuento de transiciones de condiciones de estado para grupos de nodos.|
| **karpenter.operator.nodepool.status_condition_count** <br>(gauge) | Número de condiciones para grupos de nodos.|
| **karpenter.pods.startup.time_seconds.count** <br>(count) | Recuento de observaciones en el resumen de inicio de pods.|
| **karpenter.pods.startup.time_seconds.quantile** <br>(gauge) | Tiempo transcurrido entre la creación del pod y el pod en estado de ejecución por `quantile`.|
| **karpenter.pods.startup.time_seconds.sum** <br>(count) | Suma del tiempo transcurrido entre la creación del pod y el pod en estado de ejecución.<br>_Se muestra en segundos_ |
| **karpenter.pods.state** <br>(gauge) | El estado del pod es el estado actual de los pods. Esta métrica puede utilizarse de varias formas, ya que está etiquetada por nombre de pod, espacio de nombres, propietario, nodo, nombre del proveedor, zona, arquitectura, tipo de capacidad, tipo de instancia y fase del pod.|
| **karpenter.process.cpu_seconds.count** <br>(count) | Tiempo total de CPU del usuario y del sistema transcurrido en segundos.<br>_Se muestra en segundos_ |
| **karpenter.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **karpenter.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **karpenter.process.resident.memory_bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra en bytes_ |
| **karpenter.process.start.time_seconds** <br>(gauge) | Hora de inicio del proceso desde unix epoch en segundos.<br>_Se muestra en segundos_ |
| **karpenter.process.virtual.memory.max_bytes** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes.<br>_Se muestra en bytes_ |
| **karpenter.process.virtual.memory_bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra en bytes_ |
| **karpenter.provisioner.limit** <br>(gauge) | Límites especificados en el proveedor que restringen la cantidad de recursos aprovisionados. Etiquetados por nombre de proveedor y por tipo de recurso.|
| **karpenter.provisioner.scheduling.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de programación del proveedor por `upper_bound` buckets.|
| **karpenter.provisioner.scheduling.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de programación del proveedor.|
| **karpenter.provisioner.scheduling.duration_seconds.sum** <br>(count) | Suma de la duración del proceso de programación en segundos. Desglosado por proveedor y error<br>_Se muestra en segundos_ |
| **karpenter.provisioner.scheduling.queue_depth** <br>(gauge) | Número de pods que están a la espera de ser programados.|
| **karpenter.provisioner.scheduling.simulation.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de simulación de programación del proveedor por `upper_bound` buckets.|
| **karpenter.provisioner.scheduling.simulation.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de simulación de programación del proveedor.|
| **karpenter.provisioner.scheduling.simulation.duration_seconds.sum** <br>(count) | Suma de la duración de las simulaciones de programación utilizadas para el aprovisionamiento y el desaprovisionamiento en segundos.<br>_Se muestra en segundos_ |
| **karpenter.provisioner.usage** <br>(gauge) | Cantidad de recursos que han sido aprovisionados por un aprovisionador en particular. Etiquetado por nombre de proveedor y por tipo de recurso.|
| **karpenter.provisioner.usage.pct** <br>(gauge) | Porcentaje de cada recurso utilizado basado en los recursos aprovisionados y los límites que se han configurado en el rango [0,100]. Etiquetado por nombre de proveedor y por tipo de recurso.<br>_Se muestra como porcentaje_ |
| **karpenter.rest.client_requests.count** <br>(count) | Recuento de solicitudes HTTP, divididas por código de estado, método y host.<br>_Se muestra como solicitud_ |
| **karpenter.workqueue.longest.running.processor_seconds** <br>(gauge) | Cantidad de segundos que se ha estado ejecutando el procesador que más tiempo lleva en cola de trabajo.<br>_Se muestra en segundos_ |
| **karpenter.workqueue.queue.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de duración de la cola de trabajo por `upper_bound` buckets.|
| **karpenter.workqueue.queue.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de duración de la cola de trabajo.|
| **karpenter.workqueue.queue.duration_seconds.sum** <br>(count) | Suma de la duración del tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado.<br>_Se muestra en segundos_ |
| **karpenter.workqueue.unfinished.work_seconds** <br>(gauge) | Cantidad de segundos de trabajo realizado que está en curso y no ha sido observado por duración del trabajo. Los mayores valores indican subprocesos atascados. Se puede deducir el número de subprocesos atascados observando la velocidad a la que esto aumenta.|
| **karpenter.workqueue.work.duration_seconds.bucket** <br>(count) | Recuento de observaciones en el histograma de duración de la cola de trabajo por buckets `upper_bound`.|
| **karpenter.workqueue.work.duration_seconds.count** <br>(count) | Recuento de observaciones en el histograma de duración del trabajo de la cola de trabajo.|
| **karpenter.workqueue.work.duration_seconds.sum** <br>(count) | Suma de la cantidad de segundos que se tarda en procesar un elemento de la cola de trabajo.<br>_Se muestra en segundos_ |
| **karpenter.workqueue_adds.count** <br>(count) | Recuento de adiciones gestionadas por la cola de trabajo.|
| **karpenter.workqueue_depth** <br>(gauge) | Profundidad actual de la cola de trabajo.|
| **karpenter.workqueue_retries.count** <br>(count) | Recuento de reintentos gestionados por la cola de trabajo.<br>_Se muestra como intento_ |

### Eventos

La integración de Karpenter no incluye ningún evento.

### Checks de servicio

**karpenter.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Karpenter OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar tus tecnologías nativas de contenedores](https://www.datadoghq.com/blog/container-native-integrations/#autoscaling-and-resource-utilization-with-karpenter)