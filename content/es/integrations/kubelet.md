---
app_id: kubelet
categories:
- containers
custom_kind: integración
description: Recopila estadísticas de contenedores desde Kubelet.
integration_version: 10.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Kubelet
---
## Información general

Esta integración obtiene métricas de contenedor de Kubelet

- Visualización y monitorización de estadísticas de Kubelet
- Recibe notificaciones sobre fallos y eventos de Kubelet.

## Configuración

### Instalación

El check de Kubelet está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

Edita el archivo `kubelet.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de kubelet.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kubelet/datadog_checks/kubelet/data/conf.yaml.default) para conocer todas las opciones de configuración disponibles.

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kubelet` en la sección Checks.

### Compatibilidad

El check de Kubelet puede funcionar en dos modos:

- El modo Prometheus predeterminado es compatible con Kubernetes versión 1.7.6 o posterior.
- El modo cAdvisor (habilitado mediante la opción `cadvisor_port` ) debería ser compatible con las versiones 1.3 y posteriores. La constancia del etiquetado y el filtrado requieren al menos la versión 6.2 del Agent.

## Compatibilidad con OpenShift \<3.7

El puerto cAdvisor 4194 está deshabilitado por defecto en OpenShift. Para habilitarlo, debes añadir
las siguientes líneas a tu [archivo node-config](https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files):

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

Si no puedes abrir el puerto, deshabilita ambas fuentes de recopilación de métricas de contenedor, configurando:

- `cadvisor_port` en `0`
- `metrics_endpoint` en `""`

El check seguirá pudiendo recopilar:

- checks de servicio del estado de Kubelet
- métricas de pods en ejecución/detenidas
- límites y solicitudes de pods
- métricas de capacidad del nodo

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kubernetes.containers.last_state.terminated** <br>(gauge) | Número de contenedores que se finalizaron anteriormente|
| **kubernetes.pods.running** <br>(gauge) | Número de pods en ejecución|
| **kubernetes.pods.expired** <br>(gauge) | Número de pods caducados ignorados por el check|
| **kubernetes.containers.running** <br>(gauge) | Número de contenedores en ejecución|
| **kubernetes.containers.restarts** <br>(gauge) | Número de veces que se reinició el contenedor|
| **kubernetes.containers.state.terminated** <br>(gauge) | Número de contenedores actualmente finalizados|
| **kubernetes.containers.state.waiting** <br>(gauge) | Número de contenedores en espera|
| **kubernetes.cpu.load.10s.avg** <br>(gauge) | Carga media de la CPU del contenedor en los últimos 10 segundos|
| **kubernetes.cpu.system.total** <br>(gauge) | Número de núcleos utilizados para el tiempo del sistema<br>_Se muestra como núcleo_ |
| **kubernetes.cpu.user.total** <br>(gauge) | Número de núcleos utilizados para el tiempo del usuario<br>_Se muestra como núcleo_ |
| **kubernetes.cpu.cfs.periods** <br>(gauge) | Número de intervalos de periodos de aplicación transcurridos|
| **kubernetes.cpu.cfs.throttled.periods** <br>(gauge) | Número de intervalos de periodos limitados|
| **kubernetes.cpu.cfs.throttled.seconds** <br>(gauge) | Duración total de limitación del contenedor|
| **kubernetes.cpu.capacity** <br>(gauge) | Número de núcleos de esta máquina (disponible hasta Kubernetes v1.18)<br>_Se muestra como núcelo_ |
| **kubernetes.cpu.usage.total** <br>(gauge) | Número de núcleos utilizados<br>_Se muestra como nanocore_ |
| **kubernetes.cpu.limits** <br>(gauge) | Límite de núcleos de CPU definidos<br>_Se muestra como núcleo_ |
| **kubernetes.cpu.requests** <br>(gauge) | Núcleos de CPU solicitados<br>_Se muestra como núcleo_ |
| **kubernetes.filesystem.usage** <br>(gauge) | Cantidad de disco utilizado<br>_Se muestra como byte_ |
| **kubernetes.filesystem.usage_pct** <br>(gauge) | Porcentaje de disco utilizado<br>_Se muestra como fracción_ |
| **kubernetes.io.read_bytes** <br>(gauge) | Cantidad de bytes leídos del disco<br>_Se muestra como byte_ |
| **kubernetes.io.write_bytes** <br>(gauge) | Cantidad de bytes escritos en el disco<br>_Se muestra como byte_ |
| **kubernetes.memory.capacity** <br>(gauge) | Cantidad de memoria (en bytes) en esta máquina (disponible hasta Kubernetes v1.18)<br>_Se muestra como byte_ |
| **kubernetes.memory.limits** <br>(gauge) | Límite de memoria definido<br>_Se muestra como byte_ |
| **kubernetes.memory.sw_limit** <br>(gauge) | Límite de espacio de intercambio definido<br>_Se muestra como byte_ |
| **kubernetes.memory.requests** <br>(gauge) | Memoria solicitada<br>_Se muestra como byte_ |
| **kubernetes.memory.usage** <br>(gauge) | Uso actual de la memoria en bytes, incluida toda la memoria independientemente de cuándo se accedió a ella<br>_Se muestra como byte_ |
| **kubernetes.memory.working_set** <br>(gauge) | Conjunto de trabajo actual en bytes. Es lo que busca el OOM killer<br>_Se muestra como byte_ |
| **kubernetes.memory.cache** <br>(gauge) | Cantidad de memoria que se está utilizando para almacenar en caché los datos del disco (por ejemplo, el contenido de la memoria que se puede asociar con precisión a un bloque en un dispositivo de bloques)<br>_Se muestra como byte_ |
| **kubernetes.memory.rss** <br>(gauge) | Tamaño del RSS en bytes<br>_Se muestra como byte_ |
| **kubernetes.memory.swap** <br>(gauge) | Cantidad de intercambio actualmente utilizado por los procesos en este cgroup<br>_Se muestra como byte_ |
| **kubernetes.memory.usage_pct** <br>(gauge) | Porcentaje de memoria utilizada por pod (debe definirse un límite de memoria)<br>_Se muestra como fracción_ |
| **kubernetes.memory.sw_in_use** <br>(gauge) | Porcentaje de espacio de intercambio utilizado<br>_Se muestra como fracción_ |
| **kubernetes.network.rx_bytes** <br>(gauge) | Cantidad de bytes por segundo recibidos<br>_Se muestra como byte_ |
| **kubernetes.network.rx_dropped** <br>(gauge) | Cantidad de paquetes rx descartados por segundo<br>_Se muestra como paquete_ |
| **kubernetes.network.rx_errors** <br>(gauge) | Cantidad de errores rx por segundo<br>_Se muestra como error_ |
| **kubernetes.network.tx_bytes** <br>(gauge) | Cantidad de bytes por segundo transmitidos<br>_Se muestra como byte_ |
| **kubernetes.network.tx_dropped** <br>(gauge) | Cantidad de paquetes tx descartados por segundo<br>_Se muestra como paquete_ |
| **kubernetes.network.tx_errors** <br>(gauge) | Cantidad de errores tx por segundo<br>_Se muestra como error_ |
| **kubernetes.diskio.io_service_bytes.stats.total** <br>(gauge) | Cantidad de espacio en disco que utiliza el contenedor<br>_Se muestra como byte_ |
| **kubernetes.apiserver.certificate.expiration.count** <br>(gauge) | Recuento de la vida útil restante del certificado utilizado para autenticar una solicitud<br>_Se muestra como segundo_ |
| **kubernetes.apiserver.certificate.expiration.sum** <br>(gauge) | Suma de la vida útil restante del certificado utilizado para autenticar una solicitud<br>_Se muestra como segundo_ |
| **kubernetes.rest.client.requests** <br>(gauge) | Número de solicitudes HTTP<br>_Se muestra como operación_ |
| **kubernetes.rest.client.latency.count** <br>(gauge) | Recuento de la latencia de las solicitudes en segundos desglosado por verbo y URL.|
| **kubernetes.rest.client.latency.sum** <br>(gauge) | Suma de la latencia de las solicitudes en segundos desglosada por verbo y URL<br>_Se muestra como segundo_ |
| **kubernetes.kubelet.pleg.discard_events** <br>(count) | Número de eventos de descarte en PLEG|
| **kubernetes.kubelet.pleg.last_seen** <br>(gauge) | Marca de tiempo en segundos de la última vez que se vio a PLEG activo<br>_Se muestra como segundo_ |
| **kubernetes.kubelet.pleg.relist_duration.count** <br>(gauge) | Recuento de nuevas enumeraciones de pods en PLEG|
| **kubernetes.kubelet.pleg.relist_duration.sum** <br>(gauge) | Suma de la duración en segundos para volver a enumerar pods en PLEG<br>_Se muestra como segundo_ |
| **kubernetes.kubelet.pleg.relist_interval.count** <br>(gauge) | Recuento de nuevas enumeraciones de pods en PLEG<br>_Se muestra como segundo_ |
| **kubernetes.kubelet.pleg.relist_interval.sum** <br>(gauge) | Suma del intervalo en segundos entre nuevas enumeraciones en PLEG|
| **kubernetes.kubelet.runtime.operations** <br>(count) | Número de operaciones en tiempo de ejecución<br>_Se muestra como operación_ |
| **kubernetes.kubelet.runtime.errors** <br>(gauge) | Número acumulado de errores de operaciones en tiempo de ejecución<br>_Se muestra como operación_ |
| **kubernetes.kubelet.runtime.operations.duration.sum** <br>(gauge) | Suma de la duración de las operaciones<br>_Se muestra como operación_ |
| **kubernetes.kubelet.runtime.operations.duration.count** <br>(gauge) | Recuento de operaciones|
| **kubernetes.kubelet.network_plugin.latency.sum** <br>(gauge) | Suma de la latencia en microsegundos de las operaciones de complementos de red<br>_Se muestra como microsegundo_ |
| **kubernetes.kubelet.network_plugin.latency.count** <br>(gauge) | Recuento de operaciones de complementos de red por latencia|
| **kubernetes.kubelet.network_plugin.latency.quantile** <br>(gauge) | Cuantiles de operaciones de complementos de red por latencia|
| **kubernetes.kubelet.volume.stats.available_bytes** <br>(gauge) | Número de bytes disponibles en el volumen<br>_Se muestra como byte_ |
| **kubernetes.kubelet.volume.stats.capacity_bytes** <br>(gauge) | Capacidad en bytes del volumen<br>_Se muestra como byte_ |
| **kubernetes.kubelet.volume.stats.used_bytes** <br>(gauge) | Número de bytes utilizados en el volumen<br>_Se muestra como byte_ |
| **kubernetes.kubelet.volume.stats.inodes** <br>(gauge) | El número máximo de inodos en el volumen<br>_Se muestra como inodo_ |
| **kubernetes.kubelet.volume.stats.inodes_free** <br>(gauge) | Número de inodos libres en el volumen<br>_Se muestra como inodo_ |
| **kubernetes.kubelet.volume.stats.inodes_used** <br>(gauge) | Número de inodos utilizados en el volumen<br>_Se muestra como inodo_ |
| **kubernetes.ephemeral_storage.limits** <br>(gauge) | Límite de almacenamiento efímero del contenedor (requiere Kubernetes v1.8 o posterior)<br>_Se muestra como byte_ |
| **kubernetes.ephemeral_storage.requests** <br>(gauge) | Solicitud de almacenamiento efímero del contenedor (requiere Kubernetes v1.8 o posterior)<br>_Se muestra como byte_ |
| **kubernetes.ephemeral_storage.usage** <br>(gauge) | Uso de almacenamiento efímero del pod<br>_Se muestra como byte_ |
| **kubernetes.kubelet.evictions** <br>(count) | Número de pods desalojados de Kubelet (ALPHA en Kubernetes v1.16)|
| **kubernetes.kubelet.cpu.usage** <br>(gauge) | Número de núcleos utilizados por Kubelet<br>_Se muestra como nanocore_ |
| **kubernetes.kubelet.memory.usage** <br>(gauge) | Uso actual de la memoria Kubelet en bytes<br>_Se muestra como byte_ |
| **kubernetes.kubelet.memory.rss** <br>(gauge) | Tamaño del RSS Kubelet en bytes<br>_Se muestra como byte_ |
| **kubernetes.runtime.cpu.usage** <br>(gauge) | Número de núcleos utilizados por el tiempo de ejecución<br>_Se muestra como nanocore_ |
| **kubernetes.runtime.memory.usage** <br>(gauge) | Uso actual de memoria en tiempo de ejecución en bytes<br>_Se muestra como byte_ |
| **kubernetes.runtime.memory.rss** <br>(gauge) | Tamaño del RSS en tiempo de ejecución en bytes<br>_Se muestra como byte_ |
| **kubernetes.kubelet.container.log_filesystem.used_bytes** <br>(gauge) | Bytes utilizados por los logs del contenedor en el sistema de archivos (requiere Kubernetes 1.14 o posterior)<br>_Se muestra como byte_ |
| **kubernetes.kubelet.pod.start.duration** <br>(gauge) | Duración en microsegundos para que un pod pase de pendiente a en ejecución<br>_Se muestra como microsegundo_ |
| **kubernetes.kubelet.pod.worker.duration** <br>(gauge) | Duración en microsegundos para sincronizar un solo pod. Desglosado por tipo de operación: creación, actualización o sincronización<br>_Se muestra como microsegundo_ |
| **kubernetes.kubelet.pod.worker.start.duration** <br>(gauge) | Duración en microsegundos desde que se ve un pod hasta que se inicia un worker<br>_Se muestra como microsegundo_ |
| **kubernetes.kubelet.docker.operations** <br>(count) | Número de operaciones Docker<br>_Se muestra como operación_ |
| **kubernetes.kubelet.docker.errors** <br>(count) | Número de errores de operaciones Docker<br>_Se muestra como operación_ |
| **kubernetes.kubelet.docker.operations.duration.sum** <br>(gauge) | Suma de la duración de las operaciones Docker<br>_Se muestra como operación_ |
| **kubernetes.kubelet.docker.operations.duration.count** <br>(gauge) | Recuento de operaciones Docker|
| **kubernetes.go_threads** <br>(gauge) | Número de subprocesos de sistema operativo creados|
| **kubernetes.go_goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **kubernetes.liveness_probe.success.total** <br>(gauge) | Número acumulado de sondas de vida exitosas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.liveness_probe.failure.total** <br>(gauge) | Número acumulado de sondas de vida fallidas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.readiness_probe.success.total** <br>(gauge) | Número acumulado de sondas de disponibilidad exitosas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.readiness_probe.failure.total** <br>(gauge) | Número acumulado de sondas de disponibilidad fallidas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.startup_probe.success.total** <br>(gauge) | Número acumulado de sondas de arranque exitosas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.startup_probe.failure.total** <br>(gauge) | Número acumulado de sondas de arranque fallidas para un contenedor (ALPHA en Kubernetes v1.15)|
| **kubernetes.node.filesystem.usage** <br>(gauge) | Cantidad de disco utilizado a nivel de nodo<br>_Se muestra como byte_ |
| **kubernetes.node.filesystem.usage_pct** <br>(gauge) | Porcentaje de espacio en disco utilizado a nivel de nodo<br>_Se muestra como fracción_ |
| **kubernetes.node.image.filesystem.usage** <br>(gauge) | Cantidad de disco utilizado en el sistema de archivos de imagen (nivel de nodo)<br>_Se muestra como byte_ |
| **kubernetes.node.image.filesystem.usage_pct** <br>(gauge) | Porcentaje de disco utilizado (nivel de nodo)<br>_Se muestra como fracción_ |

### Checks de servicio

**kubernetes.kubelet.check.ping**

Devuelve `CRITICAL` si el Kubelet no responde a Ping, si no devuelve OK

_Estados: ok, critical_

**kubernetes.kubelet.check.docker**

Devuelve `CRITICAL` si el servicio Docker no se ejecuta en el Kubelet, si no devuelve OK

_Estados: ok, critical_

**kubernetes.kubelet.check.syncloop**

Devuelve `CRITICAL` si la comprobación de salud del syncloop no funciona, si no devuelve OK

_Estados: ok, critical_

**kubernetes.kubelet.check**

Devuelve `CRITICAL` si la comprobación general de la salud de Kubelet no funciona, si no devuelve OK

_Estados: ok, critical_

### Contenedores excluidos

Para restringir los datos recopilados a un subconjunto de los contenedores desplegados, configura la [variable de entorno `DD_CONTAINER_EXCLUDE`](https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent). No se incluyen los métricas de los contenedores especificados en esa variable de entorno.

En el caso de las métricas de red notificadas a nivel de pod, los contenedores no pueden excluirse basándose en `name` o `image name` ya que es posible que otros contenedores formen parte del mismo pod. De esta manera, si `DD_CONTAINER_EXCLUDE` se aplica a un espacio de nombres, las métricas a nivel de pod no se notifican si el pod está en ese espacio de nombres. Sin embargo, si `DD_CONTAINER_EXCLUDE` se refiere a un nombre de contenedor o a un nombre de imagen, las métrica a nivel de pod se notifican aunque las reglas de exclusión se apliquen a algunos contenedores del pod.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).