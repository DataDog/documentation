---
aliases:
- /es/integrations/kube_controller_manager
app_id: kube-controller-manager
categories:
- rastreo
- kubernetes
- orquestación
custom_kind: integración
description: Monitorización del Kubernetes Controller Manager
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kubernetes Controller Manager
---
![Dashboard de Kube Controller Manager](https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png)

## Información general

Este check monitoriza el [Kubernetes Controller Manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager), parte del plano de control de Kubernetes.

**Nota**: Este check no recopila datos de clústeres Amazon EKS, ya que esos servicios no están expuestos.

## Configuración

### Instalación

El check de Kubernetes Controller Manager se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no es necesario instalar
nada más en tu servidor.

### Configuración

1. Edita el archivo `kube_controller_manager.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de kube_controller_manager. Consulta el [kube_controller_manager.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

Esta integración requiere acceso al endpoint de la métrica del Controller Manager. Para tener acceso al endpoint de la métrica debes:

- tener acceso a la dirección IP/al puerto del proceso del controller-manager
- tener permisos RBAC para el endpoint de las métricas (el Helm chart por defecto de Datadog ya añade los roles y los bindings RBAC correctos)

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kube_controller_manager` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kube_controller_manager.goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **kube_controller_manager.job_controller.terminated_pods_tracking_finalizer** <br>(count) | Se utiliza para monitorizar si el controlador de trabajos está eliminando finalizadores de pods a partir de pods terminados después de contabilizarlos en el estado de trabajo|
| **kube_controller_manager.leader_election.lease_duration** <br>(gauge) | Duración del arrendamiento de liderazgo|
| **kube_controller_manager.leader_election.transitions** <br>(count) | Número de transiciones de liderazgo observadas|
| **kube_controller_manager.max_fds** <br>(gauge) | Máximo permitido de descriptores de archivo abiertos|
| **kube_controller_manager.nodes.count** <br>(gauge) | Número de nodos registrados, por zona|
| **kube_controller_manager.nodes.evictions** <br>(count) | Recuento de eventos de desalojo de nodos, por zona|
| **kube_controller_manager.nodes.unhealthy** <br>(gauge) | Número de nodos en mal estado, por zona|
| **kube_controller_manager.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos|
| **kube_controller_manager.queue.adds** <br>(count) | Elementos añadidos, por cola|
| **kube_controller_manager.queue.depth** <br>(gauge) | Profundidad actual, por cola|
| **kube_controller_manager.queue.latency.count** <br>(gauge) | Recuento de latencia de procesamiento, por cola (obsoleto en kubernetes v1.14)|
| **kube_controller_manager.queue.latency.quantile** <br>(gauge) | Cuantiles de latencia de procesamiento, por cola (obsoleto en kubernetes v1.14)<br>_Se muestra como microsegundo_ |
| **kube_controller_manager.queue.latency.sum** <br>(gauge) | Suma de latencia de procesamiento, por cola (obsoleto en kubernetes v1.14)<br>_Se muestra como microsegundo_ |
| **kube_controller_manager.queue.process_duration.count** <br>(gauge) | Tiempo que tarda en procesarse un elemento de la cola de trabajo, por cola|
| **kube_controller_manager.queue.process_duration.sum** <br>(gauge) | Tiempo total de procesamiento de la cola de trabajo, por cola<br>_Se muestra en segundos_ |
| **kube_controller_manager.queue.queue_duration.count** <br>(gauge) | Cuánto tiempo permanece un elemento en una cola antes de ser solicitado, por cola|
| **kube_controller_manager.queue.queue_duration.sum** <br>(gauge) | Tiempo total de permanencia de los elementos en una cola antes de ser solicitados, por cola<br>_Se muestra como segundo_ |
| **kube_controller_manager.queue.retries** <br>(count) | Reintentos gestionados, por cola|
| **kube_controller_manager.queue.work_duration.count** <br>(gauge) | Duración del trabajo, por cola (obsoleto en kubernetes v1.14)|
| **kube_controller_manager.queue.work_duration.quantile** <br>(gauge) | Cuantiles de duración del trabajo, por cola (obsoleto en kubernetes v1.14)<br>_Se muestra como microsegundo_ |
| **kube_controller_manager.queue.work_duration.sum** <br>(gauge) | Suma de la duración del trabajo, por cola (obsoleto en kubernetes v1.14)<br>_Se muestra como microsegundo_ |
| **kube_controller_manager.queue.work_longest_duration** <br>(gauge) | Cuántos segundos ha estado funcionando el procesador que más tiempo lleva, por cola<br>_Se muestra en segundos_ |
| **kube_controller_manager.queue.work_unfinished_duration** <br>(gauge) | Cuántos segundos de trabajo se ha realizado, que está en curso y no ha sido observado por process_duration, por cola<br>_Se muestra como segundo_ |
| **kube_controller_manager.rate_limiter.use** <br>(gauge) | Utilización del limitador de velocidad, por limitador|
| **kube_controller_manager.slis.kubernetes_healthcheck** <br>(gauge) | Resultado del check del estado de un único controlador (alfa; requiere k8s v1.26+)|
| **kube_controller_manager.slis.kubernetes_healthcheck_total** <br>(count) | Resultados acumulados de todos los checks de estado del gestor de controladores (alfa; requiere k8s v1.26+)|
| **kube_controller_manager.threads** <br>(gauge) | Número de subprocesos de sistema operativo creados|

### Eventos

El check del Kubernetes Controller Manager no incluye eventos.

### Checks de servicio

**kube_controller_manager.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas.

_Estados: ok, critical_

**kube_controller_manager.leader_election.status**

Devuelve `CRITICAL` si no hay ninguna réplica establecida como líder.

_Estados: ok, critical_

**kube_controller_manager.up**

Devuelve `CRITICAL` si Kube Controller Manager no está en buen estado.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).