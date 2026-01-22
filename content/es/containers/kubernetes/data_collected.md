---
aliases:
- /es/agent/kubernetes/metrics
- /es/agent/kubernetes/data_collected
description: Guía de referencia para las métricas y eventos recopilados por el Datadog
  Agent de clústeres de Kubernetes
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopilar tus trazas (traces) de aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopilar tus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopilar las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
title: Datos de Kubernetes recopilados
---

Esta página enumera los datos recopilados por el Datadog Agent cuando se despliega en un clúster de Kubernetes. El conjunto de métricas recopiladas puede variar dependiendo de la versión de Kubernetes en uso.

**Nota**: Para contenedores de Windows, consulta [Métricas limitadas para despliegues de Windows][7].

## Métricas

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

**Nota**: Para obtener más información sobre las métricas `kubernetes.cpu.*`, consulta [Discrepancias en métricas `kubernetes.cpu.*` y `container.cpu.*`][8].

### Kubelet

Para obtener más información, consulta la documentación de la integración de [Kubelet][1].

{{< get-metrics-from-git "kubelet" >}}

### Métricas de estado centrales de Kubernetes

Para obtener más información, consulta la documentación de la integración de las [métricas de estado centrales de Kubernetes][6]. Este check requiere el Datadog Cluster Agent v1.12 o posterior.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Estado de Kubernetes

**Nota**: Las métricas `kubernetes_state.*` se obtienen de la API `kube-state-metrics`. El check `kubernetes_state` es un check heredado. Para ver otras opciones, consulta las [métricas de estado centrales de Kubernetes][6]. Datadog recomienda no habilitar ambos checks simultáneamente.

{{< get-metrics-from-git "kubernetes_state" >}}

### DNS Kubernetes

{{< get-metrics-from-git "kube-dns" >}}

### Proxy Kubernetes

{{< get-metrics-from-git "kube-proxy" >}}

### Servidor API Kubernetes

Para obtener más información, consulta la documentación de la integración del [servidor API Kubernetes][3].

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Administrador de controladores Kubernetes

Para obtener más información, consulta la documentación de la integración del [administrador de controladores Kubernetes][2].

{{< get-metrics-from-git "kube-controller-manager" >}}

### Servidor de métricas Kubernetes

Para obtener más información, consulta la documentación de la integración del [servidor de métricas Kubernetes][4].

{{< get-metrics-from-git "kube-metrics-server" >}}

### Programador Kubernetes

Para obtener más información, consulta la documentación de la integración del [programador Kubernetes][5].

{{< get-metrics-from-git "kube-scheduler" >}}


## Eventos

- Backoff (Retroceso)
- Conflict (Conflicto)
- Borrar
- DeletingAllPods (Eliminando todos los pods)
- Didn't have enough resource (No disponía de recursos suficientes)
- Error
- Failed (Fallido)
- FailedCreate (Creación fallida)
- FailedDelete (Eliminación fallida)
- FailedMount (Montaje fallido)
- FailedSync (Sincronización fallida)
- Failedvalidation (Validación fallida)
- FreeDiskSpaceFailed (Espacio libre en disco fallido)
- HostPortConflict (Conflicto con puerto host)
- InsufficientFreeCPU (CPU libre insuficiente)
- InsufficientFreeMemory (Memoria libre insuficiente)
- InvalidDiskCapacity (Capacidad de disco inválida)
- Killing (Terminando procesos)
- KubeletsetupFailed (Configuración kubelet fallida)
- NodeNotReady (Nodo no está listo)
- NodeoutofDisk (Nodo sin espacio en disco)
- OutofDisk (Sin espacio en disco)
- Rebooted (Reiniciado)
- TerminatedAllPods (Terminar todos los pods)
- Unable (Imposible)
- Unhealthy (Mal estado)

## Checks de servicio

### Kubelet

Para obtener más información, consulta la documentación de la integración de [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Administrador de controladores Kubernetes

Para obtener más información, consulta la documentación de la integración del [administrador de controladores Kubernetes][2].

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Servidor de métricas Kubernetes

Para obtener más información, consulta la documentación de la integración del [servidor de métricas Kubernetes][4].

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Programador Kubernetes

Para obtener más información, consulta la documentación de la integración del [programador Kubernetes][5].

{{< get-service-checks-from-git "kube-scheduler" >}}

### Métricas de estado centrales de Kubernetes

Para obtener más información, consulta la documentación de la integración de las [métricas de estado centrales de Kubernetes][6].

`kubernetes_state.cronjob.complete`
: si el último trabajo del cronjob ha fallado o no. Etiquetas: `kube_cronjob` `kube_namespace` (`env` `service` `version` de las etiquetas estándar).

`kubernetes_state.cronjob.on_schedule_check`
: alerta si la próxima programación del cronjob está en el pasado. Etiquetas: `kube_cronjob` `kube_namespace` (`env` `service` `version` de las etiquetas estándar).

`kubernetes_state.job.complete`
: si el trabajo ha fallado o no. Etiquetas: `kube_job` o `kube_cronjob` `kube_namespace` (`env` `service` `version` de las etiquetas estándar).

`kubernetes_state.node.ready`
: si el nodo está listo. Etiquetas: `node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: si el nodo no tiene más espacio en el disco. Etiquetas: `node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: si el nodo está bajo presión de disco. Etiquetas: `node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: si la red de nodo red no está disponible. Etiquetas: `node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: si la red de nodo está bajo presión de memoria. Etiquetas: `node` `condition` `status`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/kubelet/
[2]: /es/integrations/kube_controller_manager/
[3]: /es/integrations/kube_apiserver_metrics/
[4]: /es/integrations/kube_metrics_server
[5]: /es/integrations/kube_scheduler
[6]: /es/integrations/kubernetes_state_core/
[7]: /es/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /es/containers/faq/cpu-usage-metrics