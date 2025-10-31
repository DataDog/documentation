---
app_id: cilium
categories:
- contenedores
- red
- seguridad
- recopilación de logs
custom_kind: integración
description: Recopilar métricas del Agent por pod y métricas de operador de todo el
  clúster
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Cilium
---
## Información general

Este check monitoriza [Cilium](https://cilium.io) a través del Datadog Agent. La integración puede recopilar métricas de `cilium-agent` o `cilium-operator`.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cilium se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), pero requiere pasos de configuración adicionales para exponer las métricas de Prometheus.

Comenzando con la versión 1.10.0, esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: true) y un modo heredado (`use_openmetrics`: false). Para obtener todas las funciones más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

1. Para habilitar las métricas de Prometheus tanto en `cilium-agent` como en `cilium-operator`, despliega Cilium con los siguientes valores de Helm establecidos según tu versión de Cilium:
   - Cilium \< v1.8.x:
     `global.prometheus.enabled=true`
   - Cilium >= v1.8.x and \< v1.9.x:
     `global.prometheus.enabled=true` y `global.operatorPrometheus.enabled=true`
   - Versiones de Cilium 1.9.x o posteriores:
     `prometheus.enabled=true` y `operator.prometheus.enabled=true`

O bien, habilita métricas de Prometheus por separado en los manifiestos de Kubernetes:

<div class="alert alert-warning">Para versiones de <a href="https://docs.cilium.io/en/v1.12/operations/upgrade/#id2">Cilium 1.11 o anteriores</a>, usa <code>--prometheus-serve-addr=:9090</code>.</a></div>

- En `cilium-agent`, añade `--prometheus-serve-addr=:9962` a la sección `args` de la configuración de DaemonSet de Cilium:

  ```yaml
  # [...]
  spec:
    containers:
      - args:
          - --prometheus-serve-addr=:9962
  ```

- En `cilium-operator`, añade `--enable-metrics` a la sección  `args` de la configuración de despliegue de Cilium:

  ```yaml
  # [...]
  spec:
    containers:
      - args:
          - --enable-metrics
  ```

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `cilium.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración Agent's para empezar a recoger tus datos de rendimiento Cilium. Consulta el [ejemplo cilium.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   - Para recopilar métricas `cilium-agent`, habilita la opción `agent_endpoint`.
   - Para recopilar métricas `cilium-operator`, habilita la opción `operator_endpoint`.

   ```yaml
       instances:

           ## @param use_openmetrics - boolean - optional - default: false
           ## Use the latest OpenMetrics implementation for more features and better performance.
           ##
           ## Note: To see the configuration options for the legacy OpenMetrics implementation (Agent 7.33 or older),
           ## see https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
           #
         - use_openmetrics: true # Enables OpenMetrics latest mode

           ## @param agent_endpoint - string - optional
           ## The URL where your application metrics are exposed by Prometheus.
           ## By default, the Cilium integration collects `cilium-agent` metrics.
           ## One of agent_endpoint or operator_endpoint must be provided.
           #
           agent_endpoint: http://localhost:9090/metrics

           ## @param operator_endpoint - string - optional
           ## Provide instead of `agent_endpoint` to collect `cilium-operator` metrics.
           ## Cilium operator metrics are exposed on port 6942.
           #
           operator_endpoint: http://localhost:6942/metrics
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

Cilium contiene dos tipos de logs: `cilium-agent` y `cilium-operator`.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítala en tu [configuración del DaemonSet](https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example):

   ```yaml
     # (...)
       env:
       #  (...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     # (...)
   ```

1. Monta el socket de Docker en el Datadog Agent a través del manifiesto o monta el directorio `/var/log/pods` si no estás usando Docker. Para ver ejemplos de manifiestos, consulta las [Instrucciones de instalación de Kubernetes para DaemonSet](https://docs.datadoghq.com/agent/kubernetes/?tab=daemonset#installation).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

##### Para recopilar métricas y logs de `cilium-agent`:

- Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics", "use_openmetrics": "true"}` |

- Recopilación de logs

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

##### Para recopilar métricas y registros de `cilium-operator`:

- Recopilación de métricas

| Parámetro            | Valor                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `"cilium"`                                                 |
| `<INIT_CONFIG>`      | en blanco o `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"operator_endpoint": "http://%%host%%:6942/metrics", "use_openmetrics": "true"}` |

- Recopilación de logs

| Parámetro      | Valor                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-operator", "service": "cilium-operator"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cilium` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cilium.agent.api_process_time.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Cantidad de tiempo de procesamiento de todas las llamadas a la API<br>_Se muestra en segundos_ |
| **cilium.agent.api_process_time.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento del tiempo de procesamiento de todas las llamadas a la API<br>_Se muestra como solicitud_ |
| **cilium.agent.api_process_time.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del tiempo de procesamiento de todas las llamadas a la API<br>_Se muestra en segundos_ |
| **cilium.agent.bootstrap.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de duraciones de arranque<br>_Se muestra en segundos_ |
| **cilium.agent.bootstrap.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de duraciones de arranque|
| **cilium.agent.bootstrap.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de duraciones de arranque<br>_Se muestra en segundos_ |
| **cilium.api_limiter.adjustment_factor** <br>(gauge) | \[OpenMetrics V1 y V2\] Factor de ajuste más reciente para el ajuste automático<br>_Se muestra como segundo_ |
| **cilium.api_limiter.processed_requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes de API procesadas<br>_Se muestra como solicitud_ |
| **cilium.api_limiter.processed_requests.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes de API procesadas<br>_Se muestra como solicitud_ |
| **cilium.api_limiter.processing_duration.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Duración media y estimada del procesamiento en segundos<br>_Se muestra en segundos_ |
| **cilium.api_limiter.rate_limit** <br>(gauge) | \[OpenMetrics V1 y V2\] Configuración actual de limitación de tasa (límite y ráfaga)<br>_Se muestra como solicitud_ |
| **cilium.api_limiter.requests_in_flight** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual y máximo permitido de solicitudes en acción.<br>_Se muestra como solicitud_ |
| **cilium.api_limiter.wait_duration.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Duración de la espera agregada por llamada a la api<br>_Se muestra como segundo_ |
| **cilium.bpf.map.capacity** <br>(gauge) | \ [OpenMetrics V1 y V2\] Capacidad del mapa etiquetada por grupo de mapas. Todos los mapas con una capacidad de 65536 se agrupan en 'default'.|
| **cilium.bpf.map_ops.count** <br>(count) | \[OpenMetrics V2\] Total de operaciones de mapa BPF realizadas<br>_Se muestra como operación_ |
| **cilium.bpf.map_ops.total** <br>(count) | \[OpenMetrics V1\] Total de operaciones de mapa BPF realizadas<br>_Se muestra como solicitud_ |
| **cilium.bpf.map_pressure** <br>(gauge) | \[OpenMetrics V1 y V2\] Presión del mapa definida como un ratio del uso del mapa comparado con él.|
| **cilium.bpf.maps.virtual_memory.max.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Memoria máxima utilizada por los mapas eBPF instalados en el sistema<br>_Se muestra como byte_ |
| **cilium.bpf.progs.virtual_memory.max.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Memoria máxima utilizada por los programas eBPF instalados en el sistema<br>_Se muestra como byte_ |
| **cilium.cidrgroup.policies** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de CNP y CCNP que hacen referencia al menos a un CiliumCIDRGroup<br>_Se muestra como unidad_ |
| **cilium.cidrgroup.translation.time.stats.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Estadísticas de tiempo de traducción de CIDRGroup<br>_Se muestra como segundo_ |
| **cilium.cidrgroups.referenced** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de CNPs y CCNPs que hacen referencia al menos a un CiliumCIDRGroup. Los CNP con CIDRGroupRefs vacíos o inexistentes no se consideran<br>_Se muestra como unidad_ |
| **cilium.controllers.failing.count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de controladores que fallan<br>_Se muestra como error_ |
| **cilium.controllers.runs.count** <br>(count) | \[OpenMetrics V2\] Número total de ejecuciones del controlador<br>_Se muestra como evento_ |
| **cilium.controllers.runs.total** <br>(count) | \[OpenMetrics V1\] Número total de ejecuciones del controlador<br>_Se muestra como evento_ |
| **cilium.controllers.runs_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de los procesos del controlador<br>_Se muestra en segundos_ |
| **cilium.controllers.runs_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de los procesos del controlador<br>_Se muestra como operación_ |
| **cilium.controllers.runs_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de los procesos del controlador<br>_Se muestra como segundo_ |
| **cilium.datapath.conntrack_dump.resets.count** <br>(count) | \[OpenMetrics V2\] Número de reinicios de volcado de conntrack. Ocurre cuando se elimina una entrada BPF durante el proceso de volcado del mapa.|
| **cilium.datapath.conntrack_dump.resets.total** <br>(count) | \[OpenMetrics V1\] Número de reinicios de volcado de pista de conexión. Ocurre cuando se elimina una entrada BPF durante el proceso de volcado del mapa.|
| **cilium.datapath.conntrack_gc.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración del proceso del recolector de elementos no usados<br>_Se muestra en segundos_ |
| **cilium.datapath.conntrack_gc.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración del proceso del recolector de elementos no usados<br>_Se muestra como operación_ |
| **cilium.datapath.conntrack_gc.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración del proceso del recolector de elementos no usados<br>_Se muestra como segundo_ |
| **cilium.datapath.conntrack_gc.entries** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de entradas conntrack activos y eliminados<br>_Se muestra como la recolección de elementos no usados_ |
| **cilium.datapath.conntrack_gc.key_fallbacks.count** <br>(count) | \[OpenMetrics V2\] El número total de entradas conntrack.<br>_Se muestra como recolección como elementos no usados_ |
| **cilium.datapath.conntrack_gc.key_fallbacks.total** <br>(count) | \[OpenMetrics V1\] El número total de entradas conntrack<br>_Se muestra como la recolección de elementos no usados_ |
| **cilium.datapath.conntrack_gc.runs.count** <br>(count) | \[OpenMetrics V2\] Número total de ejecuciones del proceso de recolector de elementos no usados conntrack<br>_Se muestra como recolección de elementos no usados_ |
| **cilium.datapath.conntrack_gc.runs.total** <br>(count) | \[OpenMetrics V1\] Número total de ejecuciones del proceso de recolector de elementos no usados conntrack<br>_Se muestra como recolección de elementos no usados_ |
| **cilium.datapath.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores en la gestión de rutas de datos. Disponible en Cilium \<= v1.9<br>_Se muestra como error_ |
| **cilium.datapath.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores en la gestión de rutas de datos. Disponible en Cilium \<= v1.9<br>_Se muestra como error_ |
| **cilium.drop_bytes.count** <br>(count) | \[OpenMetrics V2\] Total de bytes perdidos<br>_Se muestra como byte_ |
| **cilium.drop_bytes.total** <br>(count) | \[OpenMetrics V1\] Total de bytes perdidos<br>_Se muestra como byte_ |
| **cilium.drop_count.count** <br>(count) | \[OpenMetrics V2\] Total de paquetes perdidos<br>_Se muestra como paquete_ |
| **cilium.drop_count.total** <br>(count) | \[OpenMetrics V1\] Total de paquetes perdidos<br>_Se muestra como paquete_ |
| **cilium.endpoint.count** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de endpoints listos gestionados por el agente<br>_Se muestra como unidad_ |
| **cilium.endpoint.max_ifindex** <br>(gauge) | \[OpenMetrics V1 y V2\] Índice máximo de interfaz observado para los endpoints existentes<br>_Se muestra como unidad_ |
| **cilium.endpoint.regeneration_time_stats.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de estadísticas de tiempo de regeneración del endpoint<br>_Se muestra como segundo_ |
| **cilium.endpoint.regeneration_time_stats.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de estadísticas de tiempo de regeneración de endpoint<br>_Se muestra como operación_ |
| **cilium.endpoint.regeneration_time_stats.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las estadísticas de tiempo de regeneración del endpoint<br>_Se muestra como segundo_ |
| **cilium.endpoint.regenerations.count** <br>(count) | \[OpenMetrics V2\] Recuento de regeneraciones de endpoint completadas<br>_Se muestra como unidad_ |
| **cilium.endpoint.regenerations.total** <br>(count) | \[OpenMetrics V1\] Recuento de regeneraciones de endpoint completadas<br>_Se muestra como unidad_ |
| **cilium.endpoint.state** <br>(gauge) | \[OpenMetrics V1 y V2\] Recuento de todos los endpoints<br>_Se muestra como unidad_ |
| **cilium.errors_warning.count** <br>(count) | \[OpenMetrics V2\] Total de advertencias de error<br>_Se muestra como error_ |
| **cilium.errors_warning.total** <br>(count) | \[OpenMetrics V1\] Total de advertencias de error<br>_Se muestra como error_ |
| **cilium.event_timestamp** <br>(gauge) | \[OpenMetrics V1 y V2\] Última marca de tiempo del evento recibido<br>_Se muestra como tiempo_ |
| **cilium.forward_bytes.count** <br>(count) | \[OpenMetrics V2\] Total de bytes reenviados<br>_Se muestra como byte_ |
| **cilium.forward_bytes.total** <br>(count) | \[OpenMetrics V1\] Total de bytes reenviados<br>_Se muestra como byte_ |
| **cilium.forward_count.count** <br>(count) | \[OpenMetrics V2\] Total de paquetes reenviados<br>_Se muestra como paquete_ |
| **cilium.forward_count.total** <br>(count) | \[OpenMetrics V1\] Total de paquetes reenviados<br>_Se muestra como paquete_ |
| **cilium.fqdn.active_ips** <br>(gauge) | Número de IPs dentro de la caché DNS asociadas a un dominio que no ha caducado (por TTL), por endpoint. Disponible en Cilium v1.12+<br>_Se muestra como elemento_ |
| **cilium.fqdn.active_names** <br>(gauge) | Número de dominios dentro de la caché DNS que no han caducado (por TTL), por endpoint. Disponible en Cilium v1.12+<br>_Se muestra como elemento_ |
| **cilium.fqdn.alive_zombie_connections** <br>(gauge) | Número de IPs asociadas a dominios que han caducado (por TTL), pero que siguen asociadas a una conexión activa (es decir, zombie), por endpoint. Disponible en Cilium v1.12+<br>_Se muestra como elemento_ |
| **cilium.fqdn.gc_deletions.count** <br>(count) | \[OpenMetrics V2\] Número total de FQDNs limpiados en el trabajo del recolector de elementos no usados FQDN.<br>_Se muestra como evento_ |
| **cilium.fqdn.gc_deletions.total** <br>(count) | \[OpenMetrics V1\] Número total de FQDNs limpiados en el trabajo del recolector de elementos no usados FQDN.<br>_Se muestra como evento_ |
| **cilium.fqdn.selectors** <br>(gauge) | Número de selectores ToFQDN registrados. Disponible en Cilium v1.16+<br>_Se muestra como elemento_ |
| **cilium.hive.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Recuentos de los niveles de estado de los componentes Hive<br>_Se muestra como elemento_ |
| **cilium.identity.count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de identidades asignadas.<br>_Se muestra como unidad_ |
| **cilium.identity.label_sources** <br>(gauge) | Número de identidades que contienen al menos una etiqueta de la fuente de etiqueta dada. Disponible en Cilium v1.16+<br>_Se muestra como elemento_ |
| **cilium.ip_addresses.count** <br>(gauge) | \[OpenMetrics V1 y V2] Número de direcciones IP asignadas<br>_Se muestra como unidad_ |
| **cilium.ipam.capacity** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de IPs en el grupo de IPAM etiquetado por familia<br>_Se muestra como evento_ |
| **cilium.ipam.events.count** <br>(count) | \[OpenMetrics V2\] Número de eventos IPAM recibidos por acción y tipo de familia de ruta de datos<br>_Se muestra como evento_ |
| **cilium.ipam.events.total** <br>(count) | \[OpenMetrics V1\] Número de eventos IPAM recibidos por acción y tipo de familia de ruta de datos<br>_Se muestra como evento_ |
| **cilium.ipcache.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores que interactúan con ipcache<br>_Se muestra como error_ |
| **cilium.ipcache.errors.total** <br>(count) | \[OpenMetrics V1\] Número de errores que interactúan con ipcache<br>_Se muestra como error_ |
| **cilium.k8s.workqueue.adds.total** <br>(count) | \[OpenMetrics V1 y V2\] Número total de altas gestionadas por la cola de trabajo<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.depth** <br>(gauge) | \[OpenMetrics V1 y V2\] Profundidad actual de la cola de trabajo<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.longest.running.processor.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuántos segundos ha estado funcionando el procesador que más tiempo lleva en cola de trabajo<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.queue.duration.seconds.bucket** <br>(count) | \[OpenMetrics V1 y V2\] Recuento del tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.queue.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento del tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.queue.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del tiempo en segundos que un elemento permanece en la cola de trabajo antes de ser solicitado<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.retries.total** <br>(count) | \[OpenMetrics V1 y V2\] Número total de reintentos gestionados por la cola de trabajo<br>_Se muestra como evento_ |
| **cilium.k8s.workqueue.unfinished.work.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuántos segundos de trabajo se ha realizado que está en curso y no ha sido observado por work_duration. Los valores grandes indican subprocesos atascados. Se puede deducir el número de subprocesos atascados observando la velocidad a la que aumenta.<br>_Se muestra como evento_ |
| **cilium.k8s_client.api_calls.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de llamadas a la API realizadas a kube-apiserver. Disponible en Cilium v1.10+<br>_Se muestra como solicitud_ |
| **cilium.k8s_client.api_latency_time.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de la llamada a la API procesada<br>_Se muestra como segundo_ |
| **cilium.k8s_client.api_latency_time.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de duración de llamadas a la API procesadas<br>_Se muestra como solicitud_ |
| **cilium.k8s_client.api_latency_time.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las llamadas a la API procesadas<br>_Se muestra en segundos_ |
| **cilium.k8s_client.rate_limiter_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de la llamada al limitador de velocidad procesado<br>_Se muestra como segundo_ |
| **cilium.k8s_client.rate_limiter_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de duración de llamada de limitador de velocidad procesado<br>_Se muestra como solicitud_ |
| **cilium.k8s_client.rate_limiter_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de la llamada del limitador de velocidad procesado<br>_Se muestra como segundo_ |
| **cilium.k8s_event.lag.seconds** <br>(gauge) | \[OpenMetrics V1 y v2\] Retraso para eventos de Kubernetes, valor calculado entre la recepción de un evento CNI ADD desde kubelet y un evento de pod recibido desde kube-api-server<br>_Se muestra como segundo_ |
| **cilium.k8s_terminating.endpoints_events.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de terminación de endpoint recibidos de Kubernetes<br> _Se muestra como evento_ |
| **cilium.k8s_terminating.endpoints_events.total** <br>(count) | \[OpenMetrics V1\] Número de eventos de endpoint recibidos de Kubernetes<br> _Se muestra como evento_ |
| **cilium.kubernetes.events.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de Kubernetes procesados<br>_Se muestra como evento_ |
| **cilium.kubernetes.events.total** <br>(count) | \[OpenMetrics V1\] Número de eventos de Kubernetes procesados<br>_Se muestra como evento_ |
| **cilium.kubernetes.events_received.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de Kubernetes recibidos procesados<br>_Se muestra como evento_ |
| **cilium.kubernetes.events_received.total** <br>(count) | \[OpenMetrics V1\] Número de eventos de Kubernetes recibidos procesados<br>_Se muestra como evento_ |
| **cilium.kvstore.events_queue.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Suma de la duración en segundos del bloqueo del evento recibido antes de que pudiera ponerse en cola<br>_Se muestra como segundo_ |
| **cilium.kvstore.events_queue.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración en segundos del evento recibido que se bloqueó antes de que pudiera ponerse en cola.|
| **cilium.kvstore.events_queue.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración en segundos del bloqueo del evento recibido antes de que pudiera ponerse en cola<br>_Se muestra como segundo_ |
| **cilium.kvstore.initial_sync_completed** <br>(gauge) | Si se ha completado la sincronización inicial desde/hacia el kvstore.|
| **cilium.kvstore.operations_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Duración de la muestra de operación kvstore<br>_Se muestra como segundo_ |
| **cilium.kvstore.operations_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Duración del recuento de operaciones kvstore<br>_Se muestra como operación_ |
| **cilium.kvstore.operations_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Duración de la suma de operación kvstore<br>_Se muestra como segundo_ |
| **cilium.kvstore.quorum_errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores de quórum<br>_Se muestra como error_ |
| **cilium.kvstore.quorum_errors.total** <br>(count) | \[OpenMetrics V1\] Número de errores de quórum<br>_Se muestra como error_ |
| **cilium.kvstore.sync_queue_size** <br>(gauge) | Número de elementos en cola para la sincronización en el kvstore<br>_Se muestra como elemento_ |
| **cilium.nodes.all_datapath_validations.count** <br>(count) | \[OpenMetrics V2\] Número de llamadas de validación para la implementación de la ruta de datos de un nodo<br>_Se muestra como unidad_ |
| **cilium.nodes.all_datapath_validations.total** <br>(count) | \[OpenMetrics V1\] Número de llamadas de validación para la implementación de la ruta de datos de un nodo<br>_Se muestra como unidad_ |
| **cilium.nodes.all_events_received.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de nodo recibidos<br>_Se muestra como evento_ |
| **cilium.nodes.all_events_received.total** <br>(count) | \[OpenMetrics V1\] Número de eventos de nodo recibidos.<br>_Se muestra como evento_ |
| **cilium.nodes.managed.total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de nodos gestionados<br>_Se muestra como nodo_ |
| **cilium.operator.azure.api.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las interacciones con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.azure.api.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las interacciones con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.azure.api.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las interacciones con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.azure.api.rate_limit.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.azure.api.rate_limit.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.azure.api.rate_limit.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de Azure. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ces.queueing_delay.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra del retardo de la cola CiliumEndpointSlice en segundos. Disponible en Cilium v1.11+<br>_Se muestra en segundos_ |
| **cilium.operator.ces.queueing_delay.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento del retardo de la cola CiliumEndpointSlice en segundos. Disponible en Cilium v1.11+<br>_Se muestra como unidad_ |
| **cilium.operator.ces.queueing_delay.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del retardo de la cola CiliumEndpointSlice en segundos. Disponible en Cilium v1.11+<br>_Se muestra en segundos_ |
| **cilium.operator.ces.sync.total** <br>(count) | \[OpenMetrics V1 y V2\] Número de sincronizaciones CES completadas por resultado<br>_Se muestra como unidad_ |
| **cilium.operator.ces.sync_errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores de sincronización CES. Disponible en Cilium v1.11+<br>_Se muestra como error_ |
| **cilium.operator.ces.sync_errors.total** <br>(count) | \[OpenMetrics V1\] Número de errores de sincronización CES. Disponible en Cilium v1.11+<br>_Se muestra como error_ |
| **cilium.operator.ec2.api.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las interacciones con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ec2.api.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las interacciones con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.ec2.api.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las interacciones con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ec2.api.rate_limit.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ec2.api.rate_limit.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.ec2.api.rate_limit.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración del bloqueo del limitador de velocidad del lado del cliente al interactuar con la API de AWS EC2. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.eni.available** <br>(gauge) | \[OpenMetrics V2\] Número de IPs disponibles por ID de subred. Disponible en Cilium \<= v1.8<br>_Se muestra como unidad_ |
| **cilium.operator.eni.available.ips_per_subnet** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de IPs disponibles por ID de subred. Disponible en Cilium \<= v1.8<br>_Se muestra como unidad_ |
| **cilium.operator.eni.aws_api_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las interacciones con la API de AWS. Disponible en Cilium \<= v1.8<br>_Se muestra como segundo_ |
| **cilium.operator.eni.aws_api_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las interacciones con la API de AWS. Disponible en Cilium \<= v1.8<br>_Se muestra como solicitud_ |
| **cilium.operator.eni.aws_api_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las interacciones con la API de AWS. Disponible en Cilium \<= v1.8<br>_Se muestra como segundo_ |
| **cilium.operator.eni.deficit_resolver.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las ejecuciones del activador del déficit<br>_Se muestra como segundo_ |
| **cilium.operator.eni.deficit_resolver.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las ejecuciones del activador de resolución de déficit<br>_Se muestra como operación_ |
| **cilium.operator.eni.deficit_resolver.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las ejecuciones del activador de resolución de déficit<br>_Se muestra como segundo_ |
| **cilium.operator.eni.deficit_resolver.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de resolución de déficit<br>_Se muestra como unidad_ |
| **cilium.operator.eni.deficit_resolver.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de latencia entre la cola de resolución del déficit y la ejecución del activador<br>_Se muestra como segundo_ |
| **cilium.operator.eni.deficit_resolver.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la latencia entre la cola de resolución del déficit y la ejecución del activador<br>_Se muestra como operación_ |
| **cilium.operator.eni.deficit_resolver.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia entre la cola de resolución del déficit y la ejecución del activador<br>_Se muestra como segundo_ |
| **cilium.operator.eni.deficit_resolver.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores de déficit en cola<br>_Se muestra como evento_ |
| **cilium.operator.eni.deficit_resolver.queued.total** <br>(gauge) | \[OpenMetrics V1\] Número de activadores de resolución de déficit en cola<br>_Se muestra como evento_ |
| **cilium.operator.eni.ec2_resync.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las ejecuciones del activador de resincronización de ec2. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.ec2_resync.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las ejecuciones del activador de resincronización de ec2. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.ec2_resync.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las ejecuciones del activador de resincronización de ec2. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.ec2_resync.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de resincronización de ec2. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.ec2_resync.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de latencia entre la cola de resincronización de ec2 y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.ec2_resync.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de latencia entre la cola de resincronización de ec2 y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.ec2_resync.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia entre la cola de resincronización de ec2 y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.ec2_resync.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores de resincronización de ec2 en cola. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.ec2_resync.queued.total** <br>(gauge) | \[OpenMetrics V1\] Número de activadores de resincronización de ec2 en cola. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.interface_creation_ops** <br>(count) | \[OpenMetrics V1\] Número de ENIs asignados. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.interface_creation_ops.count** <br>(count) | \[OpenMetrics V2\] Número de ENIs asignados. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.ips.total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de IPs asignadas. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.k8s_sync.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de la ejecución del activador de sincronización de k8s. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.k8s_sync.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de la ejecución del activador de sincronización de k8s. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.k8s_sync.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de la ejecución del activador de sincronización de k8s. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.k8s_sync.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de sincronización de k8s. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.k8s_sync.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de la latencia de sincronización de k8s entre la cola y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.k8s_sync.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de la latencia de sincronización de k8s entre la cola y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como operación_ |
| **cilium.operator.eni.k8s_sync.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de la latencia de sincronización de k8s entre la cola y la ejecución del activador. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni.k8s_sync.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores de sincronización de k8s en cola. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.k8s_sync.queued.total** <br>(gauge) | \[OpenMetrics V1\] Número de activadores de sincronización de k8s en cola. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.nodes.total** <br>(gauge) | \[OpenMetrics V1\] Número de nodos por categoría. Disponible en Cilium \<= v1.9<br>_Se muestra como nodo_ |
| **cilium.operator.eni.resync.count** <br>(count) | \[OpenMetrics V2\] Número de operaciones de resincronización para sincronizar metadatos de AWS EC2. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni.resync.total** <br>(count) | \[OpenMetrics V1\] Número de operaciones de resincronización para sincronizar metadatos de AWS EC2. Disponible en Cilium \<= v1.9<br>_Se muestra como unidad_ |
| **cilium.operator.eni_ec2.rate_limit.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración del bloqueo del limitador de velocidad del lado del cliente. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.eni_ec2.rate_limit.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración del bloqueo del limitador de velocidad del lado del cliente. Disponible en Cilium \<= v1.9<br>_Se muestra como solicitud_ |
| **cilium.operator.eni_ec2.rate_limit.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración del bloqueo del limitador de velocidad del lado del cliente. Disponible en Cilium \<= v1.9<br>_Se muestra como segundo_ |
| **cilium.operator.errors.warnings.total** <br>(count) | \[OpenMetrics V1 y V2\] Número de errores totales en las instancias de cilium-operator<br>_Se muestra como elemento_ |
| **cilium.operator.hive.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Recuentos de los niveles de estado de los componentes Hive<br>_Se muestra como elemento_ |
| **cilium.operator.identity_gc.entries** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de identidades vivas y eliminadas al final de una ejecución del recolector de elementos no usados. Disponible en Cilium v1.11+<br>_Se muestra como recolección de elementos no usados_ |
| **cilium.operator.identity_gc.runs** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de veces que se ha ejecutado el recolector de elementos no usados de identidad. Disponible en Cilium v1.11+<br>_Se muestra como recolección de elementos no usados_ |
| **cilium.operator.ipam.allocation.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Asignación de latencia de ip o interfaz en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.allocation.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Asignación de latencia de ip o interfaz en segundos<br>_Se muestra como operación_ |
| **cilium.operator.ipam.allocation.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Asignación de latencia de ip o interfaz en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.allocation_ops** <br>(count) | \[OpenMetrics V1\] Recuento de operaciones de asignación de IP. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.allocation_ops.count** <br>(count) | \[OpenMetrics V2\] Recuento de operaciones de asignación de IP. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.api.duration.seconds.bucket** <br>(count) | \[OpenMetricsV2\] Duración de las interacciones con la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.api.duration.seconds.count** <br>(count) | \[OpenMetricsV1 y V2\] Duración de las interacciones con la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.ipam.api.duration.seconds.sum** <br>(count) | \[OpenMetricsV1 y V2\] Duración de las interacciones con la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.api.rate_limit.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de la limitación de velocidad mientras se accede a la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra en segundos_. |
| **cilium.operator.ipam.api.rate_limit.duration.seconds.count** <br>(count) | \[OpenMetricsV1 y V2\] Recuento de la duración de la limitación de velocidad al acceder a la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.ipam.api.rate_limit.duration.seconds.sum** <br>(count) | \[OpenMetricsV1 y V2\] Suma de la duración de la limitación de velocidad mientras se accede a la API de IPAM externa. Disponible en Cilium v1.9+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.available** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de interfaces con direcciones disponibles. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.available.ips_per_subnet** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de IPs disponibles por ID de subred. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.available_interfaces** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de interfaces con direcciones disponibles<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.available_ips** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de IPs disponibles en nodo para asignación IPAM<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.deficit_resolver.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las ejecuciones del activador del déficit. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.deficit_resolver.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las ejecuciones del activador de resolución de déficit. Disponible en Cilium v1.8+<br>_Se muestra como solicitud_ |
| **cilium.operator.ipam.deficit_resolver.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las ejecuciones del activador de resolución de déficit. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.deficit_resolver.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de la resolución del déficit. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.deficit_resolver.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la latencia de resolución del déficit entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.deficit_resolver.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la latencia de resolución del déficit entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.deficit_resolver.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia de resolución de déficit entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.deficit_resolver.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores en cola. Disponible en Cilium v1.8+<br>_Se muestra como unidad_. |
| **cilium.operator.ipam.deficit_resolver.queued.total** <br>(count) | \[OpenMetrics V1\] Número de activadores en cola. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.empty_interface_slots** <br>(count) | \[OpenMetrics V1\] Número de slots de interfaz vacías disponibles para la conexión de interfaces. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.empty_interface_slots.count** <br>(count) | \[OpenMetrics V2\] Número de slots de interfaz vacías disponibles para la conexión de interfaces. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.interface_candidates** <br>(count) | \[OpenMetrics V1\] Número de interfaces conectadas con IPs disponibles para asignación. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.interface_candidates.count** <br>(count) | \[OpenMetrics V2\] Número de interfaces conectadas con IPs disponibles para asignación. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.interface_creation_ops** <br>(count) | \[OpenMetrics V1\] Recuento de interfaces asignadas. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.interface_creation_ops.count** <br>(count) | \[OpenMetrics V2\] Recuento de interfaces asignadas. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.ip_allocation_ops** <br>(count) | \[OpenMetrics V1\] Número de operaciones de asignación de IP. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.ip_allocation_ops.count** <br>(count) | \[OpenMetrics V2\] Número de operaciones de asignación de IP. Disponible en Cilium v1.13+.|
| **cilium.operator.ipam.ip_release_ops** <br>(count) | \[OpenMetrics V1\] Número de operaciones de lanzamiento de IP<br>_Se muestra como operación_ |
| **cilium.operator.ipam.ip_release_ops.count** <br>(count) | \[OpenMetrics V2\] Número de operaciones de lanzamiento de IP<br>_Se muestra como operación_ |
| **cilium.operator.ipam.ips** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de IPs asignadas. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.k8s_sync.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las ejecuciones del activador de sincronización de K8s. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.k8s_sync.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las ejecuciones del activador de sincronización de K8s. Disponible en Cilium v1.8+<br>_Se muestra como solicitud_ |
| **cilium.operator.ipam.k8s_sync.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las ejecuciones del activador de sincronización de K8s. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.k8s_sync.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de sincronización de K8s. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.k8s_sync.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Recuento de la latencia de sincronización de K8s entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.k8s_sync.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la latencia de sincronización de K8s entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.k8s_sync.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia de sincronización de K8s entre la cola y la ejecución del activador. Disponible en Cilium v1.8+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.k8s_sync.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores de sincronización de k8s en cola. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.k8s_sync.queued.total** <br>(count) | \[OpenMetrics V1\] Número de activadores de sincronización de k8s en cola. Disponible en Cilium v1.8+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.needed_ips** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de IPs que se necesitan en el nodo para satisfacer las solicitudes de asignación IPAM<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.nodes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de nodos por categoría. Disponible en Cilium v1.8+<br>_Se muestra como nodo_ |
| **cilium.operator.ipam.release.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Liberar latencia de ip o interfaz en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.release.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Liberar latencia de ip o interfaz en segundos<br>_Se muestra como operación_ |
| **cilium.operator.ipam.release.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Liberar latencia ip o interfaz en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.release_ops** <br>(count) | \[OpenMetrics V1\] Recuento de operaciones de lanzamiento de IP. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.release_ops.count** <br>(count) | \[OpenMetrics V2\] Recuento de operaciones de lanzamiento de IP. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.resync.count** <br>(count) | \[OpenMetrics V2\] Número de operaciones de resincronización para sincronizar y resolver el déficit de IP de los nodos. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.resync.duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración de las ejecuciones del activador de resincronización. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.resync.duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las ejecuciones del activador de resincronización. Disponible en Cilium v1.9+<br>_Se muestra como solicitud_ |
| **cilium.operator.ipam.resync.duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración de las ejecuciones del activador de resincronización. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.resync.folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Nivel actual de pliegue de resincronización. Disponible en Cilium v1.9+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.resync.latency.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la latencia de resincronización entre la cola y la ejecución del activador. Disponible en Cilium v1.9+<br>_Se muestra como segundo_ |
| **cilium.operator.ipam.resync.latency.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la latencia de resincronización entre la cola y la ejecución del activador. Disponible en Cilium v1.9+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.resync.latency.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia de resincronización entre la cola y la ejecución del activador. Disponible en Cilium v1.9+<br>_Se muestra en segundos_ |
| **cilium.operator.ipam.resync.queued.count** <br>(count) | \[OpenMetrics V2\] Número de activadores IPAM en cola. Disponible en Cilium v1.9+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.resync.queued.total** <br>(count) | \[OpenMetrics V1\] Número de activadores IPAM en cola. Disponible en Cilium v1.9+<br>_Se muestra como unidad_ |
| **cilium.operator.ipam.resync.total** <br>(count) | \[OpenMetrics V1\] Número de operaciones de resincronización para sincronizar y resolver el déficit de IP de los nodos. Disponible en Cilium v1.8+<br>_Se muestra como operación_ |
| **cilium.operator.ipam.used_ips** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de IPs utilizadas en el nodo para la asignación IPAM<br>_Se muestra como unidad_ |
| **cilium.operator.lbipam.conflicting.pools.total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de grupos en conflicto<br>_Se muestra como unidad_ |
| **cilium.operator.lbipam.ips.available.total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de direcciones IP disponibles en un grupo dado<br>_Se muestra como unidad_ |
| **cilium.operator.lbipam.ips.used.total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de direcciones IP utilizadas en un grupo dado<br>_Se muestra como unidad_ |
| **cilium.operator.lbipam.services.matching.total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de servicios que coinciden con los grupos<br>_Se muestra como unidad_ |
| **cilium.operator.lbipam.services.unsatisfied.total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de servicios que no recibieron todas las IPs solicitadas<br>_Se muestra como unidad_ |
| **cilium.operator.num_ceps_per_ces.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de CEP por lotes en un CES. Disponible en Cilium v1.11+<br>_Se muestra como unidad_ |
| **cilium.operator.num_ceps_per_ces.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de CEP por lotes en un CES. Disponible en Cilium v1.11+<br>_Se muestra como unidad_ |
| **cilium.operator.num_ceps_per_ces.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de los CEP agrupados en un CES. Disponible en Cilium v1.11+<br>_Se muestra como unidad_ |
| **cilium.operator.process.cpu.seconds** <br>(count) | \[OpenMetrics V1\] Tiempo total de CPU del usuario y del sistema empleado en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.process.cpu.seconds.count** <br>(count) | \[OpenMetrics V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **cilium.operator.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **cilium.operator.process.resident_memory.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes<br>_Se muestra como byte_ |
| **cilium.operator.process.start_time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos<br>_Se muestra como segundo_ |
| **cilium.operator.process.virtual_memory.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes<br>_Se muestra como byte_ |
| **cilium.operator.process.virtual_memory_max.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Cantidad máxima de memoria virtual disponible en bytes<br>_Se muestra como byte_ |
| **cilium.policy.change.count** <br>(count) | \[OpenMetrics V2\] Número de cambios políticos por resultado<br>_Se muestra como unidad_ |
| **cilium.policy.change.total** <br>(count) | \[OpenMetrics V1\] Número de cambios de política por resultado<br>_Se muestra como unidad_ |
| **cilium.policy.count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de políticas cargadas actualmente<br>_Se muestra como unidad_ |
| **cilium.policy.endpoint_enforcement_status** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de endpoints etiquetados por estado de aplicación de la política<br>_Se muestra como unidad_ |
| **cilium.policy.implementation_delay.bucket** <br>(count) | \[OpenMetrics V1 y V2] Tiempo transcurrido entre el cambio de una política y su despliegue completo en la ruta de datos<br>_Se muestra en segundos_ |
| **cilium.policy.implementation_delay.count** <br>(count) | \[OpenMetrics V1 y V2] Tiempo transcurrido entre el cambio de una política y su despliegue completo en la ruta de datos<br>_Se muestra como unidad_ |
| **cilium.policy.implementation_delay.sum** <br>(count) | \[OpenMetrics V1 y V2] Tiempo transcurrido entre el cambio de una política y su despliegue completo en la ruta de datos<br>_Se muestra en segundos_ |
| **cilium.policy.import_errors.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de importaciones de políticas fallidas<br>_Se muestra como error_ |
| **cilium.policy.l7.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes/respuestas L7 por tipo<br>_Se muestra como unidad_ |
| **cilium.policy.l7.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes/respuestas L7 por tipo<br>_Se muestra como unidad_ |
| **cilium.policy.l7_denied.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes/respuestas L7 denegadas debido a la política. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.l7_denied.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes/respuestas L7 denegadas debido a la política. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.l7_forwarded.count** <br>(count) | \[OpenMetrics V2\] Número de solicitudes/respuestas totales reenviadas L7. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.l7_forwarded.total** <br>(count) | \[OpenMetrics V1\] Número de solicitudes/respuestas totales reenviadas L7. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.l7_parse_errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de análisis L7. Disponible en Cilium \<= v1.7<br>_Se muestra como error_ |
| **cilium.policy.l7_parse_errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de análisis L7. Disponible en Cilium \<= v1.7<br>_Se muestra como error_ |
| **cilium.policy.l7_received.count** <br>(count) | \[OpenMetrics V2\] Número de solicitudes/respuestas totales L7 recibidas. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.l7_received.total** <br>(count) | \[OpenMetrics V1\] Número de solicitudes/respuestas totales L7 recibidas. Disponible en Cilium \<= v1.7<br>_Se muestra como unidad_ |
| **cilium.policy.max_revision** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de revisión de la política superior en el agente<br>_Se muestra como unidad_ |
| **cilium.policy.regeneration.count** <br>(count) | \[OpenMetrics V2\] Número total de regeneraciones de política con éxito<br>_Se muestra como unidad_ |
| **cilium.policy.regeneration.total** <br>(count) | \[OpenMetrics V1\] Número total de regeneraciones de políticas con éxito<br>_Se muestra como unidad_ |
| **cilium.policy.regeneration_time_stats.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de estadísticas de tiempo de regeneración de políticas<br>_Se muestra como segundo_ |
| **cilium.policy.regeneration_time_stats.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de estadísticas de tiempo de regeneración de políticas<br>_Se muestra como operación_ |
| **cilium.policy.regeneration_time_stats.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de estadísticas de tiempo de regeneración de políticas<br>_Se muestra como segundo_ |
| **cilium.process.cpu.seconds.count** <br>(count) | \[OpenMetrics V2\] Tiempo de CPU del proceso en segundos<br>_Se muestra en segundos_ |
| **cilium.process.cpu.seconds.total** <br>(gauge) | \[OpenMetrics V1\] Tiempo de CPU del proceso en segundos<br>_Se muestra en segundos_ |
| **cilium.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Máximo del descriptor de archivo de proceso<br>_Se muestra como archivo_ |
| **cilium.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **cilium.process.resident_memory.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de bytes de memoria residente<br>_Se muestra como byte_ |
| **cilium.process.start_time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Hora de inicio de los procesos<br>_Se muestra como segundo_ |
| **cilium.process.virtual_memory.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes de memoria virtual<br>_Se muestra como byte_ |
| **cilium.process.virtual_memory.max.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Máximo de bytes de memoria virtual<br>_Se muestra como byte_ |
| **cilium.proxy.datapath.update_timeout.count** <br>(count) | \[OpenMetrics V2\] Número total de tiempos de espera de actualización de ruta de datos debido a actualizaciones de IP de FQDN. Disponible en Cilium 1.10+<br>_Se muestra como tiempo de espera_ |
| **cilium.proxy.datapath.update_timeout.total** <br>(count) | \[OpenMetrics V1\] Número total de tiempos de espera de actualización de la ruta de datos debido a actualizaciones de IP de FQDN. Disponible en Cilium 1.10+<br>_Se muestra como tiempo de espera_ |
| **cilium.proxy.redirects** <br>(gauge) | Número de redireccionamientos instalados para endpoints por protocolo|
| **cilium.proxy.upstream_reply.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Segundos esperados para que el servidor ascendente responda a una solicitud etiquetada por error, protocolo y tiempo de tramo<br>_Se muestra como segundo_ |
| **cilium.proxy.upstream_reply.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Segundos esperados para que el servidor ascendente responda a una solicitud etiquetada por error, protocolo y tiempo de tramo<br>_Se muestra como segundo_ |
| **cilium.proxy.upstream_reply.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Segundos esperados para que el servidor ascendente responda a una solicitud etiquetada por error, protocolo y tiempo de tramo<br>_Se muestra como segundo_ |
| **cilium.services.events.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de servicios etiquetados por tipo de acción<br>_Se muestra como evento_ |
| **cilium.services.events.total** <br>(count) | \[OpenMetrics V1\] Número de eventos de servicios etiquetados por tipo de acción<br>_Se muestra como evento_ |
| **cilium.subprocess.start.count** <br>(count) | \[OpenMetrics V2\] Número de veces que Cilium ha iniciado un subproceso<br>_Se muestra como unidad_ |
| **cilium.subprocess.start.total** <br>(count) | \[OpenMetrics V1\] Número de veces que Cilium ha iniciado un subproceso<br>_Se muestra como unidad_ |
| **cilium.triggers_policy.update.count** <br>(count) | \[OpenMetrics V2\] Número total de invocaciones del activador de actualización de políticas<br>_Se muestra como unidad_ |
| **cilium.triggers_policy.update.total** <br>(count) | \[OpenMetrics V1\] Número total de invocaciones del activador de actualización de políticas<br>_Se muestra como unidad_ |
| **cilium.triggers_policy.update_call_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de la duración del activador de actualización de políticas<br>_Se muestra como segundo_ |
| **cilium.triggers_policy.update_call_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de duración del activador de actualización de políticas<br>_Se muestra como operación_ |
| **cilium.triggers_policy.update_call_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la duración del activador de actualización de políticas<br>_Se muestra como segundo_ |
| **cilium.triggers_policy.update_folds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de pliegues<br>_Se muestra como unidad_ |
| **cilium.unreachable.health_endpoints** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de endpoints de estado a los que no se puede llegar<br>_Se muestra como unidad_ |
| **cilium.unreachable.nodes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de nodos a los que no se puede llegar<br>_Se muestra como nodo_ |
| **cilium.version** <br>(gauge) | \[OpenMetrics V1 y V2\] Versión de Cilium<br>_Se muestra como nodo_ |

### Eventos

La integración Cilium no incluye eventos.

### Checks de servicio

**cilium.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**cilium.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).