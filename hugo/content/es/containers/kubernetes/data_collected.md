---
aliases:
- /es/agent/kubernetes/metrics
- /es/agent/kubernetes/data_collected
description: Guía de referencia para métricas y eventos recopilados por el Datadog
  Agent de clústeres de Kubernetes
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopile sus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Datos de Kubernetes recopilados
---
Esta página enumera los datos recopilados por el Datadog Agent cuando se implementa en un clúster de Kubernetes. El conjunto de métricas recopiladas puede variar según la versión de Kubernetes en uso.

**Nota**: Para contenedores de Windows, consulte [Métricas limitadas para implementaciones de Windows][7].

## Métricas {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**Nota**: Para obtener más información sobre las métricas de `kubernetes.cpu.*`, consulte [Discrepancias en las métricas de `kubernetes.cpu.*` y `container.cpu.*`][8].

### Kubelet {#kubelet}

Para obtener más información, consulte la documentación de la integración [Kubelet][1].

**Nota**: En Kubernetes v1.37 y versiones posteriores, el Agent no recopila la métrica `kubernetes.cpu.load.10s.avg`. El cAdvisor integrado del kubelet en estas versiones no exporta la métrica subyacente `container_cpu_load_average_10s`.

{{< get-metrics-from-git "kubelet" >}}

### Core de métricas de estado de Kubernetes {#kubernetes-state-metrics-core}

Para obtener más información, consulte la documentación de la integración [Kubernetes state metrics core][6]. Esta verificación requiere Datadog Cluster Agent v1.12 o posterior.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes state {#kubernetes-state}

**Nota**: Las métricas de `kubernetes_state.*` se recopilan de la API de `kube-state-metrics`. La verificación `kubernetes_state` es una verificación heredada. Para obtener una alternativa, consulte [Kubernetes state metrics core][6]. Datadog recomienda no habilitar ambas verificaciones simultáneamente.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS {#kubernetes-dns}

{{< get-metrics-from-git "kube-dns" >}}

### Kubernetes proxy {#kubernetes-proxy}

{{< get-metrics-from-git "kube-proxy" >}}

### Kubernetes API server {#kubernetes-api-server}

Para obtener más información, consulte la documentación de la integración [Kubernetes API server][3].

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Gestión de controlador de Kubernetes {#kubernetes-controller-manager}

Para obtener más información, consulte la documentación de la integración [Kubernetes controller manager][2].

{{< get-metrics-from-git "kube-controller-manager" >}}

### Servidor de métricas de Kubernetes {#kubernetes-metrics-server}

Para obtener más información, consulte la documentación de la integración [Kubernetes metrics server][4].

{{< get-metrics-from-git "kube-metrics-server" >}}

### Programador de Kubernetes {#kubernetes-scheduler}

Para obtener más información, consulte la documentación de la integración [Kubernetes scheduler][5].

{{< get-metrics-from-git "kube-scheduler" >}}


## Eventos {#events}

- Retroceso
- Conflicto
- Eliminar
- EliminandoTodosLosPods
- No hubo suficientes recursos
- Error
- Fallido
- Error Al Crear
- Error Al Eliminar
- Error Al Montar
- Error Al Sincronizar
- Error de validación
- Error de espacio libre en disco
- Conflicto de puerto de host
- CPU libre insuficiente
- Memoria libre insuficiente
- Capacidad de disco no válida
- Terminando
- Error de configuración de Kubelet
- Nodo no listo
- Nodo sin espacio en disco
- Sin espacio en disco
- Reiniciado
- Terminados todos los pods
- Incapaz
- No saludable

## Verificaciones de servicio {#service-checks}

### Kubelet {#kubelet-1}

Para obtener más información, consulte la documentación de la integración [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Gestión de controlador de Kubernetes {#kubernetes-controller-manager-1}

Para obtener más información, consulte la documentación de la integración [Kubernetes controller manager][2].

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Servidor de métricas de Kubernetes {#kubernetes-metrics-server-1}

Para obtener más información, consulte la documentación de la integración [Kubernetes metrics server][4].

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Programador de Kubernetes {#kubernetes-scheduler-1}

Para obtener más información, consulte la documentación de la integración [Kubernetes scheduler][5].

{{< get-service-checks-from-git "kube-scheduler" >}}

### Core de métricas de estado de Kubernetes {#kubernetes-state-metrics-core-1}

Para obtener más información, consulte la documentación de la integración [Kubernetes state metrics core][6].

`kubernetes_state.cronjob.complete`
: Si el último trabajo del cronjob falló o no. Etiquetas:`kube_cronjob` `kube_namespace` (`env` `service` `version` de etiquetas estándar).

`kubernetes_state.cronjob.on_schedule_check`
: Alertar si el próximo horario del cronjob está en el pasado. Etiquetas:`kube_cronjob` `kube_namespace` (`env` `service` `version` de etiquetas estándar).

`kubernetes_state.job.complete`
: Indica si el trabajo falló o no. Etiquetas:`kube_job` o `kube_cronjob` `kube_namespace` (`env` `service` `version` de las etiquetas estándar).

`kubernetes_state.node.ready`
: Indica si el nodo está listo. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Indica si el nodo no tiene espacio en disco. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Indica si el nodo está bajo presión de disco. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Indica si la red del nodo no está disponible. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Indica si la red del nodo está bajo presión de memoria. Etiquetas:`node` `condition` `status`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/kubelet/
[2]: /es/integrations/kube_controller_manager/
[3]: /es/integrations/kube_apiserver_metrics/
[4]: /es/integrations/kube_metrics_server
[5]: /es/integrations/kube_scheduler
[6]: /es/integrations/kubernetes_state_core/
[7]: /es/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /es/containers/faq/cpu-usage-metrics