---
aliases:
- /es/agent/kubernetes/metrics
- /es/agent/kubernetes/data_collected
description: Guía de referencia para métricas y eventos recopilados por Datadog Agent
  desde clústeres de Kubernetes
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
  text: Recopile automáticamente las métricas y registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limite la recopilación de datos a un subconjunto de contenedores únicamente
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigne etiquetas a todos los datos emitidos por un contenedor
title: Datos de Kubernetes recopilados
---
Esta página lista los datos recopilados por Datadog Agent cuando se despliega en un clúster de Kubernetes. El conjunto de métricas recopiladas puede variar dependiendo de la versión de Kubernetes en uso.

**Nota**: Para contenedores de Windows, consulte [Métricas limitadas para despliegues en Windows][7].

## Métricas {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**Nota**: Para más información sobre las métricas de `kubernetes.cpu.*`, consulte [Discrepancias en las métricas de `kubernetes.cpu.*` y `container.cpu.*`][8].

### Kubelet {#kubelet}

Para más información, consulte la documentación de la integración de [Kubelet][1].

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state metrics core {#kubernetes-state-metrics-core}

Para más información, consulte la documentación de la integración de [Kubernetes state metrics core][6]. Esta verificación requiere Datadog Cluster Agent v1.12 o posterior.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes state {#kubernetes-state}

**Nota**: `kubernetes_state.*` las métricas se recopilan de la `kube-state-metrics` API. La `kubernetes_state` verificación es una verificación heredada. Para una alternativa, consulte [Kubernetes state metrics core][6]. Datadog recomienda que no habilite ambas verificaciones simultáneamente.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS {#kubernetes-dns}

{{< get-metrics-from-git "kube-dns" >}}

### Kubernetes proxy {#kubernetes-proxy}

{{< get-metrics-from-git "kube-proxy" >}}

### Kubernetes API server {#kubernetes-api-server}

Para más información, consulte la documentación de la integración de [Kubernetes API server][3].

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Kubernetes controller manager {#kubernetes-controller-manager}

Para más información, consulte la documentación de la integración de [Kubernetes controller manager][2].

{{< get-metrics-from-git "kube-controller-manager" >}}

### Kubernetes metrics server {#kubernetes-metrics-server}

Para más información, consulte la documentación de la integración de [Kubernetes metrics server][4].

{{< get-metrics-from-git "kube-metrics-server" >}}

### Kubernetes scheduler {#kubernetes-scheduler}

Para más información, consulte la documentación de la integración de [Kubernetes scheduler][5].

{{< get-metrics-from-git "kube-scheduler" >}}


## Eventos {#events}

- Backoff
- Conflicto
- Eliminar
- EliminandoTodosLosPods
- No tenía suficientes recursos
- Error
- Falló
- Falló al crear
- Falló al eliminar
- Falló al montar
- Falló la sincronización
- Falló la validación
- Falló la verificación de espacio libre en disco
- Conflicto de puerto del host
- CPU libre insuficiente
- Memoria libre insuficiente
- Capacidad de disco inválida
- Matando
- Falló la configuración de Kubelet
- Nodo no listo
- Nodo sin espacio en disco
- Sin espacio en disco
- Reiniciado
- Terminados todos los pods
- Incapaz
- No está en buen estado

## Verificaciones de servicio {#service-checks}

### Kubelet {#kubelet-1}

Para más información, consulte la documentación de la integración de [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes controller manager {#kubernetes-controller-manager-1}

Para más información, consulte la documentación de la integración de [Kubernetes controller manager][2].

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Kubernetes metrics server {#kubernetes-metrics-server-1}

Para más información, consulte la documentación de la integración de [Kubernetes metrics server][4].

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Kubernetes scheduler {#kubernetes-scheduler-1}

Para más información, consulte la documentación de la integración de [Kubernetes scheduler][5].

{{< get-service-checks-from-git "kube-scheduler" >}}

### Kubernetes state metrics core {#kubernetes-state-metrics-core-1}

Para más información, consulte la documentación de la integración de [Kubernetes state metrics core][6].

`kubernetes_state.cronjob.complete`
: Si el último trabajo del cronjob ha fallado o no. Etiquetas:`kube_cronjob` `kube_namespace` (`env` `service` `version` de etiquetas estándar).

`kubernetes_state.cronjob.on_schedule_check`
: Alerta si el próximo horario del cronjob está en el pasado. Etiquetas:`kube_cronjob` `kube_namespace` (`env` `service` `version` de etiquetas estándar).

`kubernetes_state.job.complete`
: Si el trabajo ha fallado o no. Etiquetas:`kube_job` o `kube_cronjob` `kube_namespace` (`env` `service` `version` de etiquetas estándar).

`kubernetes_state.node.ready`
: Si el nodo está listo. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Si el nodo está sin espacio en disco. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Si el nodo está bajo presión de disco. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Si la red del nodo no está disponible. Etiquetas:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Si la red del nodo está bajo presión de memoria. Etiquetas:`node` `condition` `status`.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/kubelet/
[2]: /es/integrations/kube_controller_manager/
[3]: /es/integrations/kube_apiserver_metrics/
[4]: /es/integrations/kube_metrics_server
[5]: /es/integrations/kube_scheduler
[6]: /es/integrations/kubernetes_state_core/
[7]: /es/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /es/containers/faq/cpu-usage-metrics