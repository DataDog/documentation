---
aliases:
- /es/integrations/kubernetes_cluster_autoscaler
app_id: kubernetes-cluster-autoscaler
categories:
- métricas
- kubernetes
custom_kind: integración
description: Integración para Kubernetes Cluster Autoscaler
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kubernetes Cluster Autoscaler
---
## Información general

Este check monitoriza [Kubernetes Cluster Autoscaler](https://docs.datadoghq.com/integrations/kubernetes_cluster_autoscaler/) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Kubernetes Cluster Autoscaler está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). (Agent >= 7.55.x)
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `kubernetes_cluster_autoscaler.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento kubernetes_cluster_autoscaler. Consulta el [kubernetes_cluster_autoscaler.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/datadog_checks/kubernetes_cluster_autoscaler/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus están expuestas en tu clúster `kubernetes_cluster_autoscaler`. 
Para que el Agent empiece a recopilar métricas, los pods `kubernetes_cluster_autoscaler` deben estar anotados.

[Kubernetes Cluster Autoscaler](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-monitor-cluster-autoscaler) tiene endpoints de métricas y livenessProbe a los que se puede acceder en el puerto `8085`. Estos endpoints se encuentran en `/metrics` y `/health-check` y proporcionan información valiosa sobre el estado de tu clúster durante las operaciones de escalado.

**Nota**: Para cambiar el puerto por defecto, utiliza el indicador `--address`.

Para configurar el Cluster Autoscaler para exponer métricas, haz lo siguiente:

1. Habilita el acceso a la ruta `/metrics` y expón el puerto `8085` del despliegue de Cluster Autoscaler:

```
ports:
--name: app
containerPort: 8085
```

b) Ordena a tu Prometheus que lo depure, añadiendo la siguiente anotación a tu servicio de Cluster Autoscaler:

```
prometheus.io/scrape: true
```

**Nota**: Los métricas enumeradas solo pueden recopilarse si están disponibles. Algunas métricas solo se generan cuando se realizan determinadas acciones.

Los únicos parámetros necesarios para configurar el check `kubernetes_cluster_autoscaler` son:

- CONTAINER_NAME
  Nombre del contenedor del controlador de Cluster Autoscaler.
- `openmetrics_endpoint`
  Este parámetro debe establecerse en la ubicación donde se exponen las métricas con formato Prometheus. El puerto por defecto es `8085`. Para configurar un puerto diferente, utiliza la [variable de entorno] `METRICS_PORT` (https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/). En entornos con contenedores, debe utilizarse `%%host%%` para la [autodetección de host](https://docs.datadoghq.com/agent/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "kubernetes_cluster_autoscaler": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8085/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kubernetes_cluster_autoscaler` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kubernetes_cluster_autoscaler.cluster.cpu.current.cores** <br>(gauge) | Uso actual de núcleos de CPU en el clúster|
| **kubernetes_cluster_autoscaler.cluster.memory.current.bytes** <br>(gauge) | Uso actual de memoria en bytes en el clúster|
| **kubernetes_cluster_autoscaler.cluster.safe.to.autoscale** <br>(gauge) | Indica si el clúster es seguro para el autoescalado|
| **kubernetes_cluster_autoscaler.cpu.limits.cores** <br>(gauge) | Límites totales de núcleos de CPU establecidos para pods en el clúster|
| **kubernetes_cluster_autoscaler.created.node.groups.count** <br>(count) | Recuento total de grupos de nodos creados en el clúster|
| **kubernetes_cluster_autoscaler.deleted.node.groups.count** <br>(count) | Recuento total de grupos de nodos eliminados en el clúster|
| **kubernetes_cluster_autoscaler.errors.count** <br>(count) | Recuento total de errores ocurridos en el clúster|
| **kubernetes_cluster_autoscaler.evicted.pods.count** <br>(count) | Recuento total de pods desalojados en el clúster|
| **kubernetes_cluster_autoscaler.failed.scale.ups.count** <br>(count) | Recuento total de operaciones de ampliación fallidas en el clúster|
| **kubernetes_cluster_autoscaler.function.duration.seconds.bucket** <br>(count) | Duración de una función específica en el clúster (bucket)|
| **kubernetes_cluster_autoscaler.function.duration.seconds.count** <br>(count) | Duración de una función específica en el clúster (count)|
| **kubernetes_cluster_autoscaler.function.duration.seconds.sum** <br>(count) | Duración de una función específica en el clúster (sum)|
| **kubernetes_cluster_autoscaler.go.gc.duration.seconds.count** <br>(count) | Resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados.<br>_Se muestra como segundo_ |
| **kubernetes_cluster_autoscaler.go.gc.duration.seconds.quantile** <br>(gauge) | Un resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados<br>_Se muestra como segundo_ |
| **kubernetes_cluster_autoscaler.go.gc.duration.seconds.sum** <br>(count) | Un resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados<br>_Se muestra como segundo_ |
| **kubernetes_cluster_autoscaler.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **kubernetes_cluster_autoscaler.go.info** <br>(gauge) | Información sobre el entorno Go|
| **kubernetes_cluster_autoscaler.go.memstats.alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.alloc_bytes.count** <br>(count) | Número total de bytes asignados aunque sean liberados<br>_Se muestra en bytes_ |
| **kubernetes_cluster_autoscaler.go.memstats.buck_hash.sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra en bytes_ |
| **kubernetes_cluster_autoscaler.go.memstats.frees.count** <br>(count) | Número total de libres|
| **kubernetes_cluster_autoscaler.go.memstats.gc.sys_bytes** <br>(gauge) | Número de bytes utilizados para metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra en bytes_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.alloc_bytes** <br>(gauge) | Número de bytes del heap asignados y aún en uso<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.idle_bytes** <br>(gauge) | Número de bytes del heap en espera de ser utilizados<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.inuse_bytes** <br>(gauge) | Número de bytes del heap que están en uso<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados<br>_Se muestra como objeto_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.released_bytes** <br>(gauge) | Número de bytes de heap liberados al SO<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.heap.sys_bytes** <br>(gauge) | Número de bytes del heap obtenidos del sistema<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.lookups.count** <br>(count) | Número total de búsquedas de punteros|
| **kubernetes_cluster_autoscaler.go.memstats.mallocs.count** <br>(count) | Número total de mallocs|
| **kubernetes_cluster_autoscaler.go.memstats.mcache.inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mcache<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.mcache.sys_bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mcache obtenidas del sistema<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.mspan.inuse_bytes** <br>(gauge) | Número de bytes en uso por las estructuras mspan<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.mspan.sys_bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mspan obtenidas del sistema<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.next.gc_bytes** <br>(gauge) | Número de bytes del heap en que se realizará la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.other.sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.stack.inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stack<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.stack.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stack<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.memstats.sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **kubernetes_cluster_autoscaler.go.threads** <br>(gauge) | Número de subprocesos de sistema operativo creados<br>_Se muestra como subproceso_ |
| **kubernetes_cluster_autoscaler.last.activity** <br>(gauge) | Fecha y hora de la última actividad en el clúster|
| **kubernetes_cluster_autoscaler.max.nodes.count** <br>(gauge) | Número máximo de nodos permitidos en el clúster|
| **kubernetes_cluster_autoscaler.memory.limits.bytes** <br>(gauge) | Límites de memoria total establecidos para los pods en el clúster|
| **kubernetes_cluster_autoscaler.nap.enabled** <br>(gauge) | Indica si el aprovisionamiento automático de nodos (NAP) está activado en el clúster.|
| **kubernetes_cluster_autoscaler.node.groups.count** <br>(gauge) | Número de grupos de nodos en el clúster|
| **kubernetes_cluster_autoscaler.nodes.count** <br>(gauge) | Número de nodos en el clúster|
| **kubernetes_cluster_autoscaler.old.unregistered.nodes.removed.count** <br>(count) | Recuento total de nodos antiguos no registrados eliminados del clúster|
| **kubernetes_cluster_autoscaler.scaled.down.gpu.nodes.count** <br>(count) | Recuento total de nodos GPU reducidos en el clúster|
| **kubernetes_cluster_autoscaler.scaled.down.nodes.count** <br>(count) | Recuento total de nodos reducidos en el clúster|
| **kubernetes_cluster_autoscaler.scaled.up.gpu.nodes.count** <br>(count) | Recuento total de nodos GPU escalados en el clúster|
| **kubernetes_cluster_autoscaler.scaled.up.nodes.count** <br>(count) | Recuento total de nodos escalados en el clúster|
| **kubernetes_cluster_autoscaler.skipped.scale.events.count** <br>(count) | Recuento total de eventos de escala omitidos en el clúster|
| **kubernetes_cluster_autoscaler.unneeded.nodes.count** <br>(gauge) | Recuento total de nodos innecesarios en el clúster|
| **kubernetes_cluster_autoscaler.unschedulable.pods.count** <br>(gauge) | Número de pods no programables en el clúster|

### Eventos

La integración de Kubernetes Cluster Autoscaler no incluye ningún evento.

### Checks de servicio

**kubernetes_cluster_autoscaler.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Kubernetes Cluster Autoscaler OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).