---
app_id: istio
categories:
- log collection
- network
- security
- tracing
custom_kind: integración
description: Recopilación de métricas de rendimiento de esquemas, rendimiento de consultas
  y métricas personalizadas and more.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-istio-with-datadog
  tag: blog
  text: Blog de Istio
- link: https://www.datadoghq.com/blog/istio-metrics/
  tag: blog
  text: Métricas clave para monitorizar Istio
- link: https://www.datadoghq.com/blog/istio-datadog/
  tag: blog
  text: Cómo monitorizar Istio con Datadog
integration_version: 9.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Istio
---
## Información general

Datadog monitoriza todos los aspectos de tu entorno Istio, de modo que puedes hacer lo siguiente:

- Evaluar el estado de Envoy y el plano de control de Istio con [logs](#log-collection).
- Desglosar el rendimiento de tu malla de servicios con [métricas de solicitudes, ancho de banda y consumo de recursos](#metrics).
- Asigna la comunicación de red entre contenedores, pods y servicios a través de la malla con [Cloud Network Monitoring](https://www.datadoghq.com/blog/monitor-istio-with-npm/).
- Profundiza en las trazas distribuidas de las aplicaciones que realizan transacciones en la malla con [APM](https://docs.datadoghq.com/tracing/setup_overview/proxy_setup/?tab=istio).
- Utiliza [Datadog App and API Protection](https://docs.datadoghq.com/security/application_security/?source=istio-tile-overview) para proteger tu malla de servicios de Istio con detección y bloqueo de amenazas en tiempo real en el borde de tu infraestructura.

Para obtener más información sobre la monitorización de tu entorno de Istio con Datadog, [consulta la entrada del blog Monitorización](https://www.datadoghq.com/blog/istio-datadog/).

## Configuración

Para obtener instrucciones generales sobre la configuración de integraciones en entornos con contenedores, consulta [Configurar integraciones con Autodiscovery en Kubernetes](https://docs.datadoghq.com/containers/kubernetes/integrations/) o [Configurar integraciones con Autodiscovery en Docker](https://docs.datadoghq.com/containers/docker/integrations/).

Esta integración basada en OpenMetrics tiene un modo _más reciente_ (`use_openmetrics: true`) y un modo _heredado_ (`use_openmetrics: false`). Para obtener todas las características más actualizadas, Datadog recomienda activar el modo _más reciente_. Para obtener más información, consulta [Latest and Legacy Versioning For OpenMetrics-based Integrations](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

Si tienes varias instancias de Datadog que recopilan métricas de Istio, asegúrate de utilizar el mismo modo para todas ellas. De lo contrario, los datos de las métricas pueden fluctuar en el sitio de Datadog.

Las métricas marcadas como `[OpenMetrics V1]`, `[OpenMetrics V2]` u `[OpenMetrics V1 and V2]` solo están disponibles con el uso del modo correspondiente de la integración Istio. Las métricas marcadas como `Istio v1.5+` se recopilan mediante la versión 1.5 de Istio o posteriores.

### Instalación (métricas)

Istio está incluido en el Datadog Agent. [Instala el Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) en tus servidores de Istio o en tu clúster y apúntelo a Istio.

#### Envoy

Si deseas monitorizar los proxies de Envoy en Istio, configura la [integración de Envoy](https://github.com/DataDog/integrations-core/tree/master/envoy#istio).

### Instalación (Seguridad: App and API Protection)

El proceso de instalación requiere un enfoque diferente al de habilitar esta integración. Las instrucciones de instalación están disponibles en la documentación [Enabling App and API Protection for Istio](https://docs.datadoghq.com/security/application_security/setup/istio/?source=istio-tile-setup).

### Configuración

#### Recopilación de métricas

Para monitorizar Istio v1.5+ hay dos componentes clave que coinciden con la [arquitectura de Istio](https://istio.io/latest/docs/ops/deployment/architecture/) para las métricas con formato Prometheus:

- **Plano de datos**: Contenedores sidecar del `istio-proxy`.
- **Plano de control**: Servicio `istiod` que gestiona los proxies.

Ambos se ejecutan como checks del Agent de `istio`, pero tienen responsabilidades diferentes y se configuran por separado.

##### Configuración del plano de datos

El archivo predeterminado [`istio.d/auto_conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml) configura automáticamente la monitorización para cada uno de los contenedores `istio-proxy` auxiliares. El Agent inicializa este check para cada contenedor auxiliar que detecta automáticamente. Esta configuración permite la generación de informes de métricas `istio.mesh.*` para los datos expuestos por cada uno de estos contenedores auxiliares.

Para personalizar la parte del plano de datos de la integración, crea un archivo de configuración de Istio personalizado `istio.yaml`. Consulta [Configurar integraciones en Kubernetes](https://docs.datadoghq.com/containers/kubernetes/integrations/) o [Configurar integraciones con Autodiscovery en Docker](https://docs.datadoghq.com/containers/docker/integrations/) para conocer las opciones de creación de este archivo.

Este archivo debe contener:

```yaml
ad_identifiers:
  - proxyv2
  - proxyv2-rhel8

init_config:

instances:
  - use_openmetrics: true
    send_histograms_buckets: false
    istio_mesh_endpoint: http://%%host%%:15020/stats/prometheus
    tag_by_endpoint: false
```

Personaliza este archivo con cualquier configuración adicional. Consulta el [istio.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

##### Configuración del plano de control

Para monitorizar el plano de control de Istio y notificar las métricas `mixer`, `galley`, `pilot` y `citadel`, debes configurar el Agent para monitorizar el despliegue de `istiod`. En Istio v1.5 o posterior, aplica las siguientes anotaciones de pod para el despliegue de `istiod` en el espacio de nombres `istio-system`:

```yaml
ad.datadoghq.com/discovery.checks: |
  {
    "istio": {
      "instances": [
        {
          "istiod_endpoint": "http://%%host%%:15014/metrics",
          "use_openmetrics": "true"
        }
      ]
    }
  }
```

**Nota**: La sintaxis de Autodiscovery Annotations v2 es compatible con el Agent v7.36 o posterior.

Esta anotación especifica el contenedor `discovery` para que coincida con el nombre por defecto del contenedor Istio en este pod. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.checks` por el nombre (`.spec.containers[i].name`) de tu contenedor Istio, si el tuyo difiere.

El método para aplicar estas anotaciones varía en función de la [estrategia de despliegue de Istio (Istioctl, Helm, Operator)](https://istio.io/latest/docs/setup/install/) utilizada. Consulta la documentación de Istio para conocer el método adecuado para aplicar estas anotaciones de pod. Consulta el [istio.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

#### Desactivar la inyección de sidecars para pods del Datadog Agent

Si estás instalando el [Datadog Agent en un contenedor](https://docs.datadoghq.com/agent/kubernetes/), Datadog recomienda que primero desactives la inyección auxiliar de Istio.

_Versiones de Istio iguales o superiores a la v1.10:_

Añade la **etiqueta** (label) `sidecar.istio.io/inject: "false"` al DaemonSet `datadog-agent`:

```yaml
# (...)
spec:
  template:
    metadata:
      labels:
        sidecar.istio.io/inject: "false"
    # (...)
```

Esto también puede hacerse con el comando `kubectl patch`.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"labels":{"sidecar.istio.io/inject":"false"}}}}}'
```

_Versiones de Istio <= 1.9:_

Añade la **anotación** `sidecar.istio.io/inject: "false"` al DaemonSet `datadog-agent`:

```yaml
# (...)
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    # (...)
```

Utilizando el comando `kubectl patch`:

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

En primer lugar, habilita el Datadog Agent para realizar la recopilación de logs en Kubernetes. Consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

#### Logs de Istio

Para recopilar logs de Istio de tu plano de control (`istiod`), aplica las siguientes anotaciones de pod para el despliegue de `istiod` en el espacio de nombres `istio-system`:

```yaml
ad.datadoghq.com/discovery.logs: |
  [
    {
      "source": "istio",
      "service": "<SERVICE_NAME>"
    }
  ]
```

Esta anotación especifica el contenedor `discovery` para que coincida con el nombre de contenedor por defecto del contenedor Istio en este pod. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` por el nombre (`.spec.containers[i].name`) de tu contenedor Istio, si el tuyo difiere.

Sustituye `<SERVICE_NAME>` por el nombre de servicio Istio que elijas.

#### Logs de acceso a Envoy

Para recopilar logs de acceso a Envoy de tu plano de datos (`istio-proxy`):

1. Activa [Envoy access logging within Istio](https://istio.io/latest/docs/tasks/observability/logs/access-log/)
1. Aplica la siguiente anotación al pod en el que se inyectó el contenedor `istio-proxy`

```yaml
ad.datadoghq.com/istio-proxy.logs: |
  [
    {
      "source": "envoy",
      "service": "<SERVICE_NAME>"
    }
  ]
```

Esta anotación especifica el contenedor `istio-proxy` para que coincida con el nombre de contenedor por defecto del contenedor sidecar de Istio inyectado. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` por el nombre (`.spec.containers[i].name`) de tu contenedor sidecar de Istio, si el tuyo difiere.

Sustituye `<SERVICE_NAME>` por el nombre de servicio de proxy de Istio que elijas.

### Validación

[Ejecuta el subcomando `info` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `istio` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **istio.mesh.request.count** <br>(count) | \[OpenMetrics V1 y V2\] El número de solicitudes. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como solicitud_ |
| **istio.mesh.request.duration.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la duración de las solicitudes. Esta métrica es como indicador por defecto en OpenMetrics V1.<br>_Se muestra como solicitud_ |
| **istio.mesh.request.duration.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de las solicitudes. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como milisegundo_ |
| **istio.mesh.request.size.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento del tamaño de las solicitudes. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como solicitud_ |
| **istio.mesh.request.size.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del tamaño de las solicitudes. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como byte_ |
| **istio.mesh.response.size.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de tamaños de respuesta. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como respuesta_ |
| **istio.mesh.response.size.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de tamaños de respuesta. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como byte_ |
| **istio.mixer.adapter.dispatch_count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de envíos de adaptadores gestionados por Mixer<br>_Se muestra como operación_ |
| **istio.mixer.adapter.dispatch_duration.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de duraciones de los envíos de adaptadores gestionados por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.adapter.dispatch_duration.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de los envíos de adaptadores gestionados por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.adapter.old_dispatch_count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de envíos de adaptadores gestionados por Mixer.<br>_Se muestra como operación_ |
| **istio.mixer.adapter.old_dispatch_duration.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de veces de envíos de adaptadores gestionados por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.adapter.old_dispatch_duration.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de tiempos de envíos de adaptadores gestionados por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.config.resolve_actions.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de acciones resueltas por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.config.resolve_actions.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de acciones resueltas por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como operación_ |
| **istio.mixer.config.resolve_count** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de resoluciones de configuración manejadas por mixer<br>_Se muestra como operación_ |
| **istio.mixer.config.resolve_duration.count** <br>(count) | \[OpenMetrics V1 y V2\] Segundos por resolución de configuración. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.config.resolve_duration.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de veces para resoluciones de configuración manejadas por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.config.resolve_rules.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de reglas resueltas por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como elementos_ |
| **istio.mixer.config.resolve_rules.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de reglas resueltas por Mixer. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como elemento_ |
| **istio.mixer.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.mixer.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.mixer.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno Go.|
| **istio.mixer.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de libres.|
| **istio.mixer.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC<br>_Se muestra en porcentaje_ |
| **istio.mixer.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **istio.mixer.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **istio.mixer.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.mixer.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de mallocs<br>_Se muestra como operación_ |
| **istio.mixer.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.mixer.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **istio.mixer.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.mixer.grpc.server.handled_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de solicitudes totalmente gestionadas, con respuestas<br>_Se muestra como solicitud_ |
| **istio.mixer.grpc.server.handling_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la latencia de respuesta (segundos) de gRPC que ha sido gestionada a nivel de aplicación por el servidor. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.grpc.server.handling_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de la latencia de respuesta (segundos) de gRPC que ha sido gestionada a nivel de aplicación por el servidor. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mixer.grpc.server.msg_received_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de mensajes de flujo de RPC recibidos en el servidor.<br>_Se muestra como mensaje_ |
| **istio.mixer.grpc.server.msg_sent_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de mensajes enviados<br>_Se muestra como mensaje_ |
| **istio.mixer.grpc.server.started_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de RPCs iniciados en el servidor.|
| **istio.mixer.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **istio.mixer.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.mixer.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.mixer.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.mixer.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.mixer.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **istio.mixer.grpc_io_server.completed_rpcs** <br>(gauge) | \[OpenMetrics V1 y V2\] Recuento de RPCs por método y estado.|
| **istio.mixer.grpc_io_server.received_bytes_per_rpc** <br>(gauge) | \[OpenMetrics V1 y V2\] Distribución de bytes recibidos por RPC, por método.<br>_Se muestra como byte_ |
| **istio.mixer.grpc_io_server.sent_bytes_per_rpc** <br>(gauge) | \[OpenMetrics V1 y V2\] Distribución del total de bytes enviados por RPC, por método.<br>_Se muestra como byte_ |
| **istio.mixer.grpc_io_server.server_latency** <br>(gauge) | \[OpenMetrics V1 y V2\] Distribución de la latencia del servidor en milisegundos, por método.|
| **istio.mixer.config.attributes_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de atributos conocidos en la configuración actual.|
| **istio.mixer.config.handler_configs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de manejadores conocidos en la configuración actual.|
| **istio.mixer.config.instance_configs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de instancias conocidas en la configuración actual.|
| **istio.mixer.config.rule_configs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de reglas conocidas en la configuración actual.|
| **istio.mixer.dispatcher.destinations_per_request** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de gestores enviados por solicitud por Mixer.|
| **istio.mixer.dispatcher.instances_per_request** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de instancias creadas por solicitud por Mixer.|
| **istio.mixer.handler.daemons_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número actual de rutinas daemon activas en un entorno de adaptador dado.|
| **istio.mixer.handler.new_handlers_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de manejadores que se crearon recientemente durante la transición de configuración.|
| **istio.mixer.mcp_sink.reconnections** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de veces que el sink se ha vuelto a conectar.|
| **istio.mixer.mcp_sink.request_acks_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de aceptaciones de solicitud recibidas por la fuente.|
| **istio.mixer.runtime.dispatches_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de envíos de adaptadores gestionados por Mixer.<br>_Se muestra como operación_ |
| **istio.mixer.runtime.dispatch_duration_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Duración en segundos de los envíos de adaptadores gestionados por Mixer.<br>_Se muestra como segundo_ |
| **istio.pilot.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.pilot.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.pilot.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.pilot.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.pilot.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno de Go.|
| **istio.pilot.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de libres.|
| **istio.pilot.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC<br>_Se muestra en porcentaje_ |
| **istio.pilot.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **istio.pilot.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **istio.pilot.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.pilot.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de mallocs<br>_Se muestra como operación_ |
| **istio.pilot.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.pilot.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **istio.pilot.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.pilot.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **istio.pilot.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.pilot.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.pilot.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.pilot.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.pilot.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **istio.pilot.conflict.inbound_listener** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas entrantes en conflicto.|
| **istio.pilot.conflict.outbound_listener.http_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas http comodín en conflicto con la escucha tcp comodín actual.|
| **istio.pilot.conflict.outbound_listener.tcp_over_current_http** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas tcp comodín en conflicto con la escucha http comodín actual.|
| **istio.pilot.conflict.outbound_listener.tcp_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas tcp en conflicto con la escucha tcp actual.|
| **istio.pilot.destrule_subsets** <br>(gauge) | \[OpenMetrics V1 y V2\] Subconjuntos duplicados en reglas de destino para el mismo host.|
| **istio.pilot.duplicate_envoy_clusters** <br>(gauge) | \[OpenMetrics V1 y V2\] Clústeres envoy duplicados causados por entradas de servicio con el mismo nombre de host.|
| **istio.pilot.eds_no_instances** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de clústeres sin instancias.|
| **istio.pilot.endpoint_not_ready** <br>(gauge) | \[OpenMetrics V1 y V2\] Endpoint encontrado en estado no preparado.|
| **istio.pilot.invalid_out_listeners** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de oyentes salientes no válidos.|
| **istio.pilot.mcp_sink.reconnections** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que el sink se ha vuelto a conectar.|
| **istio.pilot.mcp_sink.recv_failures_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de fallos recv en la fuente.|
| **istio.pilot.mcp_sink.request_acks_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de aceptaciones de solicitud recibidas por la fuente.|
| **istio.pilot.no_ip** <br>(gauge) | \[OpenMetrics V1 y V2\] Pods no encontrados en la tabla de endpoints, posiblemente no válidos.|
| **istio.pilot.proxy_convergence_time** <br>(gauge) | \[OpenMetrics V1 y V2\] Retraso entre el cambio de configuración y la convergencia de todos los proxies.<br>_Se muestra como segundo_ |
| **istio.pilot.proxy_convergence_time.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del retardo entre el cambio de configuración y la convergencia de todos los proxies. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.pilot.proxy_convergence_time.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de entradas de pilot.proxy_convergence_time. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.pilot.rds_expired_nonce** <br>(count) | \[OpenMetrics V1 y V2\] Número total de mensajes RDS con un nonce caducado.|
| **istio.pilot.services** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de servicios conocidos por el pilot.|
| **istio.pilot.total_xds_internal_errors** <br>(count) | \[OpenMetrics V1 y V2\] Número total de errores XDS internos en pilot.|
| **istio.pilot.total_xds_rejects** <br>(count) | \[OpenMetrics V1 y V2\] Número total de respuestas XDS del pilot rechazadas por el proxy.|
| **istio.pilot.virt_services** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de servicios virtuales conocidos por el pilot.|
| **istio.pilot.vservice_dup_domain** <br>(gauge) | \[OpenMetrics V1 y V2\] Servicios virtuales con dominios dup.|
| **istio.pilot.xds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de endpoints conectados a este pilot usando XDS.|
| **istio.pilot.xds.eds_instances** <br>(gauge) | \[OpenMetrics V1 y V2\] Instancias para cada clúster, a partir del último push.|
| **istio.pilot.xds.push.context_errors** <br>(count) | \[OpenMetrics V1 y V2\] Número de errores (tiempos de espera) iniciando contexto push.|
| **istio.pilot.xds.push.timeout** <br>(count) | \[OpenMetrics V1 y V2\] El tiempo de espera del push del pilot se reintentará.|
| **istio.pilot.xds.push.timeout_failures** <br>(count) | \[OpenMetrics V1 y V2\] Fallos de tiempo de espera de push de pilot después de intentos repetidos.|
| **istio.pilot.xds.pushes** <br>(count) | \[OpenMetrics V1 y V2\] Compilación de Pilot y errores de envío para lds, rds, cds y eds.|
| **istio.pilot.xds.write_timeout** <br>(count) | \[OpenMetrics V1 y V2\] Tiempos de espera de escritura de respuesta XDS de pilot.|
| **istio.pilot.xds.rds_reject** <br>(count) | \[OpenMetrics V1 y V2\] Pilot rechazó RDS.|
| **istio.pilot.xds.lds_reject** <br>(count) | \[OpenMetrics V1 y V2\] Pilot rechazó LDS.|
| **istio.pilot.xds.eds_reject** <br>(count) | \[OpenMetrics V1 y V2\] Pilot rechazó EDS.|
| **istio.pilot.xds.cds_reject** <br>(count) | \[OpenMetrics V1 y V2\] Pilot rechazó CDS.|
| **istio.galley.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.galley.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.galley.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.galley.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.galley.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno de Go.|
| **istio.galley.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.alloc_bytes_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.frees_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número total de libres.|
| **istio.galley.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC<br>_Se muestra en porcentaje_ |
| **istio.galley.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **istio.galley.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **istio.galley.go.memstats.lookups_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.galley.go.memstats.mallocs_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de mallocs<br>_Se muestra como operación_ |
| **istio.galley.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.galley.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **istio.galley.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.galley.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **istio.galley.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.galley.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.galley.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.galley.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.galley.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **istio.galley.endpoint_no_pod** <br>(gauge) | \[OpenMetrics V1 y V2\] Endpoints sin pod asociado.|
| **istio.galley.mcp_source.clients_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de flujos conectados actualmente.|
| **istio.galley.runtime_processor.event_span_duration_milliseconds** <br>(gauge) | \[OpenMetrics V1 y V2\] La duración entre cada evento entrante.<br>_Se muestra como milisegundo_ |
| **istio.galley.runtime_processor.events_processed_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de eventos que se han procesado.|
| **istio.galley.runtime_processor.snapshot_events_total.bucket** <br>(count) | \[OpenMetrics V2\] El número de eventos por snapshot por upper_bound.|
| **istio.galley.runtime_processor.snapshot_events_total.count** <br>(count) | \[OpenMetrics V1 y V2\] El número de eventos por snapshot.|
| **istio.galley.runtime_processor.snapshot_events_total.sum** <br>(count) | \[OpenMetrics V1 y V2\] La duración de los eventos de snapshot.|
| **istio.galley.runtime_processor.snapshot_lifetime_duration_milliseconds** <br>(gauge) | \[OpenMetrics V1 y V2\] La duración de cada snapshot.<br>_Se muestra en milisegundos_ |
| **istio.galley.runtime_processor.snapshots_published_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de snapshots que se han publicado.|
| **istio.galley.runtime_state_type_instances_total** <br>(gauge) | \[OpenMetrics V1 y V2\] El número de instancias de tipo por URL de tipo.|
| **istio.galley.runtime_strategy.on_change_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que se ha llamado al onChange de la estrategia.|
| **istio.galley.runtime_strategy.timer_max_time_reached_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que se ha alcanzado el tiempo máximo.|
| **istio.galley.runtime_strategy.quiesce_reached_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que se ha alcanzado un quiesce.|
| **istio.galley.runtime_strategy.timer_resets_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que se ha reiniciado el temporizador.|
| **istio.galley.source_kube.dynamic_converter_success_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que una fuente de kubernetes dinámica convirtió con éxito un recurso.|
| **istio.galley.source_kube.event_success_total** <br>(count) | \[OpenMetrics V1 y V2\] El número de veces que una fuente de kubernetes gestionó con éxito un evento.|
| **istio.galley.validation.cert_key_updates** <br>(count) | \[OpenMetrics V1 y V2\] Actualizaciones de certificados del webhook de validación de Galley.|
| **istio.galley.validation.config_load** <br>(count) | |[OpenMetrics V1 y V2\] Recargas de configuración del webhook de K8s.|
| **istio.galley.validation.config_update** <br>(count) | \[OpenMetrics V1 y V2\] Actualizaciones de configuración del webhook de K8s.|
| **istio.galley.validation.passed** <br>(count) | \[OpenMetrics V1 y V2\] El recurso es válido.|
| **istio.citadel.secret_controller.csr_err_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de errores ocurridos al crear el CSR.|
| **istio.citadel.secret_controller.secret_deleted_cert_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de certificados recreados debido a la eliminación secreta (la cuenta de servicio aún existe).|
| **istio.citadel.secret_controller.svc_acc_created_cert_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de certificados creados debido a la creación de cuentas de servicio.|
| **istio.citadel.secret_controller.svc_acc_deleted_cert_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de certificados eliminados debido a la eliminación de cuentas de servicio.|
| **istio.citadel.server.authentication_failure_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de fallos de autenticación.<br>_Se muestra como error_ |
| **istio.citadel.server.citadel_root_cert_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 y V2\] La fecha y hora unix, en segundos, en la que caducará el certificado raíz de Citadel. Lo ponemos en negativo en caso de error interno.<br>_Se muestra como segundo_ |
| **istio.citadel.server.csr_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de CSRs recibidos por el servidor Citadel.|
| **istio.citadel.server.csr_parsing_err_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de errores ocurridos al analizar el CSR.<br>_Se muestra como error_ |
| **istio.citadel.server.id_extraction_err_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de errores ocurridos al extraer el ID de CSR.<br>_Se muestra como error_ |
| **istio.citadel.server.success_cert_issuance_count** <br>(count) | \[OpenMetrics V1 y V2\] El número de emisiones de certificados que han tenido éxito.|
| **istio.citadel.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.citadel.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.citadel.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.citadel.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.citadel.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno de Go.|
| **istio.citadel.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.alloc_bytes_total** <br>(count) | \[OpenMetrics V1 y V2\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.frees_total** <br>(count) | \[OpenMetrics V1 y V2\] Número total de libres.|
| **istio.citadel.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC<br>_Se muestra en porcentaje_ |
| **istio.citadel.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **istio.citadel.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **istio.citadel.go.memstats.lookups_total** <br>(count) | \[OpenMetrics V1 y V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.citadel.go.memstats.mallocs_total** <br>(count) | \[OpenMetrics V1 y V2\] Número de mallocs<br>_Se muestra como operación_ |
| **istio.citadel.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.citadel.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **istio.citadel.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.citadel.process.cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **istio.citadel.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.citadel.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.citadel.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.citadel.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.citadel.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **istio.galley.validation.config_update_error** <br>(count) | \[OpenMetrics V1 y V2\] Error de actualización de la configuración del webhook de K8s<br>_Se muestra como error_ |
| **istio.citadel.server.cert_chain_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 y V2\] La fecha y hora unix (en segundos) en la que caducará la cadena de certificados Citadel. Negativo en caso de error interno<br>_Se muestra como segundo_ |
| **istio.citadel.server.root_cert_expiry_timestamp** <br>(gauge) | \[OpenMetrics V1 y V2\] La fecha y hora unix (en segundos) en que caducará el certificado raíz de Citadel. Negativo en caso de error interno<br>_Se muestra como segundo_ |
| **istio.galley.validation.failed** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Fallo en la validación de recursos|
| **istio.pilot.conflict.outbound_listener.http_over_https** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de escuchas HTTP en conflicto con puertos HTTPS bien conocidos.|
| **istio.pilot.inbound_updates** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de actualizaciones recibidas por pilot|
| **istio.pilot.k8s.cfg_events** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Eventos de configuración de k8s<br>_Se muestra como evento_ |
| **istio.pilot.k8s.reg_events** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Eventos del registro de k8s<br>_Se muestra como evento_ |
| **istio.pilot.proxy_queue_time.count** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Recuento de observaciones para cuando el proxy está en una cola push antes de salir de la cola. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.pilot.proxy_queue_time.sum** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Suma de valores observados para cuando el proxy está en una cola push antes de salir de la cola. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.pilot.push.triggers** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de veces que se activó un push<br>_Se muestra como evento_ |
| **istio.pilot.xds.eds_all_locality_endpoints** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Endpoints de red para cada clúster (a través de todas las localidades) desde el último push. Cero endpoints es un error|
| **istio.pilot.xds.push.time.count** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Recuento de observaciones del tiempo total que tarda Pilot en realizar un push. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.pilot.xds.push.time.sum** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Suma de los valores observados del tiempo total que Pilot tarda en realizar un push. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.sidecar_injection.requests_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de solicitudes de inyección auxiliar<br>_Se muestra como solicitud_ |
| **istio.sidecar_injection.success_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de solicitudes de inyección auxiliar con éxito<br>_Se muestra como solicitud_ |
| **istio.sidecar_injection.failure_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de solicitudes de inyección auxiliar fallidas<br>_Se muestra como solicitud_ |
| **istio.sidecar_injection.skip_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de solicitudes de inyección auxiliar omitidas<br>_Se muestra como solicitud_ |
| **istio.mesh.request.duration.milliseconds.sum** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Suma total de valores observados para la duración de las solicitudes en ms. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como milisegundo_ |
| **istio.mesh.request.duration.milliseconds.count** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Recuento total de valores observados para la duración de las solicitudes. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.mesh.tcp.connections_closed.total** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Total de conexiones cerradas|
| **istio.mesh.tcp.connections_opened.total** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Total de conexiones abiertas|
| **istio.mesh.tcp.received_bytes.total** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Tamaño del total de bytes recibidos durante la solicitud en caso de una conexión TCP<br> _Se muestra como byte_ |
| **istio.mesh.tcp.send_bytes.total** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Tamaño del total de bytes enviados durante la respuesta en caso de una conexión TCP<br>_Se muestra como byte_ |
| **istio.mesh.request.count.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] El número de solicitudes como recuento monotónico<br>_Se muestra como solicitud_ |
| **istio.mesh.request.duration.milliseconds.count.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Recuento total de valores observados para la duración de las solicitudes como recuento monotónico.|
| **istio.mesh.request.duration.milliseconds.sum.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Suma total de los valores observados para la duración de las solicitudes como recuento monotónico.|
| **istio.mesh.request.size.count.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Recuento de tamaños de solicitud observados como recuento monotónico.|
| **istio.mesh.request.size.sum.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Suma de los tamaños de solicitud observados como recuento monotónico.|
| **istio.mesh.response.size.count.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Recuento del tamaño de respuesta observado como recuento monotónico.|
| **istio.mesh.response.size.sum.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Suma del tamaño de respuesta observado como recuento monotónico.|
| **istio.mesh.tcp.connections_closed.total.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Total de conexiones cerradas como recuento monotónico|
| **istio.mesh.tcp.connections_opened.total.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Total de conexiones abiertas como recuento monotónico|
| **istio.mesh.tcp.received_bytes.total.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Tamaño del total de bytes recibidos durante la solicitud en caso de una conexión TCP como recuento monotónico<br>_Se muestra como byte_ |
| **istio.mesh.tcp.send_bytes.total.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Tamaño del total de bytes enviados durante la respuesta en caso de una conexión TCP como recuento monotónico<br>_Se muestra como byte_ |
| **istio.mesh.request.duration.count.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Recuento de duraciones de solicitud como recuento monotónico<br>_Se muestra como solicitud_ |
| **istio.mesh.request.duration.sum.total** <br>(count) | \[OpenMetrics V1 e Istio v1.5+\] Suma de las duraciones de las solicitudes como recuento monotónico<br>_Se muestra como milisegundo_ |
| **istio.grpc.server.handled_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de RPCs completadas en el servidor, independientemente del éxito o fracaso.|
| **istio.grpc.server.handling_seconds.count** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Latencia de respuesta de gRPC que ha sido manejada a nivel de aplicación por el servidor. Esta métrica se envía como indicador por defecto en OpenMetrics V1.|
| **istio.grpc.server.handling_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Latencia de respuesta de gRPC que ha sido manejada a nivel de aplicación por el servidor. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.grpc.server.msg_received_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de mensajes de flujo RPC recibidos en el servidor.<br>_Se muestra como mensaje_ |
| **istio.grpc.server.msg_sent_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de mensajes de flujo gRPC enviados por el servidor.<br>_Se muestra como mensaje_ |
| **istio.grpc.server.started_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de RPCs iniciadas en el servidor.|
| **istio.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.go.info** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Información sobre el entorno de Go.|
| **istio.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.go.memstats.alloc_bytes_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **istio.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.go.memstats.frees_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número total de libres.<br>_Se muestra como byte_ |
| **istio.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] CPU ocupada por GC.<br>_Se muestra en porcentaje_ |
| **istio.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Bytes asignados al heap.<br>_Se muestra como byte_ |
| **istio.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes ociosos en el heap.<br>_Se muestra como byte_ |
| **istio.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes en el heap.<br>_Se muestra como byte_ |
| **istio.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de objetos en el heap.<br>_Se muestra como objeto_ |
| **istio.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes liberados al sistema en el último gc.<br>_Se muestra como byte_ |
| **istio.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados por el heap.<br>_Se muestra como byte_ |
| **istio.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Duración de la última GC.<br>_Se muestra como segundo_ |
| **istio.go.memstats.lookups_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de búsquedas.<br>_Se muestra como operación_ |
| **istio.go.memstats.mallocs_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de mallocs<br>_Se muestra como operación_ |
| **istio.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **istio.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes en uso por el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **istio.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **istio.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de bytes obtenidos del sistema.<br>_Se muestra como byte_ |
| **istio.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.process.cpu_seconds_total** <br>(count) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Tiempo total empleado por el usuario y la CPU del sistema.<br>_Se muestra en segundos_ |
| **istio.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Cantidad de memoria virtual utilizada.<br>_Se muestra como byte_ |
| **istio.process.virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V1 y V2 e Istio v1.5+\] Cantidad máxima de memoria virtual disponible.<br>_Se muestra como byte_ |
| **istio.galley.validation.config_update_error.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Error de actualización de la configuración del webhook de K8s<br>_Se muestra como error_ |
| **istio.galley.validation.config_update.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Actualizaciones de configuración del webhook de K8s.|
| **istio.galley.validation.failed.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Recuento de fallos en la validación de recursos|
| **istio.go.memstats.frees.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de libres.|
| **istio.go.memstats.lookups.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.go.memstats.mallocs.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número de mallocs<br>_Se muestra como byte_ |
| **istio.grpc.server.handled.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de solicitudes totalmente gestionadas, con respuestas<br>_Se muestra como solicitud_ |
| **istio.grpc.server.msg_received.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de mensajes de flujo RPC recibidos en el servidor.<br>_Se muestra como mensaje_ |
| **istio.grpc.server.msg_sent.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de mensajes enviados<br>_Se muestra como mensaje_ |
| **istio.grpc.server.started.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de RPC iniciadas en el servidor.|
| **istio.pilot.inbound_updates.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de actualizaciones recibidas por pilot|
| **istio.pilot.k8s.cfg_events.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Eventos de configuración de k8s<br>_Se muestra como evento_ |
| **istio.pilot.k8s.reg_events.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Eventos del registro de k8s<br>_Se muestra como evento_ |
| **istio.pilot.push.triggers.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de veces que se activó un push.|
| **istio.pilot.xds.pushes.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\\] Compilación de Pilot y envío de errores para lds, rds, cds y eds.|
| **istio.process.cpu_seconds.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra como segundo_ |
| **istio.sidecar_injection.requests.count** <br>(count) | \[OpenMetrics V2 and Istio v1.5+\] Número total de solicitudes de inyección auxiliar<br>_Se muestra como solicitud_ |
| **istio.sidecar_injection.success.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Número total de solicitudes de inyección auxiliar con éxito<br>_Se muestra como solicitud_ |
| **istio.mesh.tcp.connections_closed.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Total de conexiones cerradas como recuento monotónico|
| **istio.mesh.tcp.connections_opened.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Total de conexiones abiertas como recuento monotónico|
| **istio.mesh.tcp.received_bytes.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Tamaño del total de bytes recibidos durante la solicitud en caso de una conexión TCP como recuento monotónico<br>_Se muestra como byte_ |
| **istio.mesh.tcp.send_bytes.count** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Tamaño del total de bytes enviados durante la respuesta en caso de una conexión TCP como recuento monotónico<br>_Se muestra como byte_ |
| **istio.grpc.server.handling_seconds.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de latencia de respuesta (segundos) de gRPC que había sido manejado a nivel de aplicación por el servidor.<br>_Se muestra como segundo_ |
| **istio.pilot.proxy_convergence_time.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Retraso entre el cambio de configuración y la convergencia de todos los proxies.<br>_Se muestra como segundo_ |
| **istio.pilot.proxy_queue_time.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de valores observados para cuando el proxy está en una cola push antes de salir de la cola.|
| **istio.pilot.xds.push.time.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de observación del tiempo total que Pilot tarda en realizar un push.|
| **istio.mesh.request.duration.milliseconds.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de valores observados para la duración de las solicitudes<br>_Se muestra como milisegundo_ |
| **istio.mesh.response.size.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de tamaños de respuesta<br>_Se muestra como respuesta_ |
| **istio.mesh.request.size.bucket** <br>(count) | \[OpenMetrics V2 e Istio v1.5+\] Bucket de tamaños de solicitud<br>_Se muestra como solicitud_ |
| **istio.mesh.agent.pilot.conflict.outbound_listener.http_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas http comodín en conflicto con la escucha tcp comodín actual.|
| **istio.mesh.agent.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.mesh.agent.conflict.inbound_listener** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas entrantes en conflicto.|
| **istio.mesh.agent.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.xds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de endpoints conectados a este pilot usando XDS.|
| **istio.mesh.agent.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap.<br>_Se muestra como byte_ |
| **istio.mesh.agent.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **istio.mesh.agent.conflict.outbound_listener.tcp_over_current_tcp** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas tcp en conflicto con la escucha tcp actual.|
| **istio.mesh.agent.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC.|
| **istio.mesh.agent.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap.<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc.<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.mallocs.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de mallocs<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.endpoint_not_ready** <br>(gauge) | \ [OpenMetrics V1 y V2\] Endpoint encontrado en estado no preparado.|
| **istio.mesh.agent.pilot.no_ip** <br>(gauge) | \[OpenMetrics V1 y V2\] Pods no encontrados en la tabla de endpoint, posiblemente no válidos.|
| **istio.mesh.agent.num_outgoing_requests.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de solicitudes salientes.|
| **istio.mesh.agent.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.xds.config_size_bytes.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del tamaño de la configuración XDS de pilot.<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.xds.config_size_bytes.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de muestras de tamaño de configuración XDS de pilot.|
| **istio.mesh.agent.pilot.xds.config_size_bytes.bucket** <br>(count) | \[OpenMetrics V1 y V2\] Número de tamaño de configuración XDS de pilot.<br>_Se muestra como byte_ |
| **istio.mesh.agent.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.mesh.agent.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **istio.mesh.agent.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **istio.mesh.agent.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno de Go.|
| **istio.mesh.agent.go.memstats.frees.count** <br>(count) | \[OpenMetrics V1 y V2\] Número total de libres.|
| **istio.mesh.agent.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **istio.mesh.agent.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **istio.mesh.agent.endpoint_no_pod** <br>(gauge) | \[OpenMetrics V1 y V2\] Endpoints sin pod asociado.|
| **istio.mesh.agent.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mesh.agent.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC. Esta métrica se envía como indicador por defecto en OpenMetrics V1.<br>_Se muestra como segundo_ |
| **istio.mesh.agent.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantil de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **istio.mesh.agent.process.cpu_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **istio.mesh.agent.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **istio.mesh.agent.pilot.vservice_dup_domain** <br>(gauge) | \[OpenMetrics V1 y V2\] Servicios virtuales con dominios dup.|
| **istio.mesh.agent.process.virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Cantidad máxima de memoria virtual disponible.<br>_Se muestra como byte_ |
| **istio.mesh.agent.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.mesh.agent.scrapes.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de scrapes.|
| **istio.mesh.agent.pilot.duplicate_envoy_clusters** <br>(gauge) | \[OpenMetrics V1 y V2\] Clústeres envoy duplicados causados por entradas de servicio con el mismo nombre de host.|
| **istio.mesh.agent.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.xds.push_time.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma el tiempo de push XDS del pilot.|
| **istio.mesh.agent.pilot.xds.push_time.count** <br>(count) | \[OpenMetrics V1 y V2\] Número total de muestras de tiempo de push XDS del pilot.|
| **istio.mesh.agent.pilot.xds.push_time.bucket** <br>(count) | \[OpenMetrics V1 y V2\] Tiempo de push XDS del pilot.|
| **istio.mesh.agent.wasm_cache_entries** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de entradas en la caché de Web Assembly.<br>_Se muestra como entrada_ |
| **istio.mesh.agent.pilot.eds_no_instances** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de clústeres sin instancias.|
| **istio.mesh.agent.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.virt_services** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de servicios virtuales conocidos por el pilot.|
| **istio.mesh.agent.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **istio.mesh.agent.startup_duration_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de duración del arranque en segundos.<br>_Se muestra como segundo_ |
| **istio.mesh.agent.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **istio.mesh.agent.pilot.xds.send_time.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma del tiempo de envío XDS de pilot.|
| **istio.mesh.agent.pilot.xds.send_time.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de la muestra de tiempo de envío XDS de pilot.|
| **istio.mesh.agent.pilot.xds.send_time.bucket** <br>(count) | \[OpenMetrics V1 y V2\] Tiempo de envío XDS de pilot.|
| **istio.mesh.agent.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **istio.mesh.agent.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **istio.mesh.agent.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.destrule_subsets** <br>(gauge) | \[OpenMetrics V1 y V2\] Subconjuntos duplicados en reglas de destino para el mismo host.|
| **istio.mesh.agent.pilot.xds.pushes.count** <br>(count) | \[OpenMetrics V1 y V2\] Compilación de pilot y errores de envío para lds, rds, cds y eds.|
| **istio.mesh.agent.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **istio.mesh.agent.go.memstats.lookups.count** <br>(count) | \[OpenMetrics V1 y V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **istio.mesh.agent.outgoing_latency.count** <br>(count) | \[OpenMetrics V1 y V2\] Latencia total de salida.|
| **istio.mesh.agent.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **istio.mesh.agent.pilot.conflict.outbound_listener.tcp_over_current_http** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de escuchas tcp comodín en conflicto con la escucha http comodín actual.|
| **istio.galley.source.kube.event.error.count** <br>(count) | \[OpenMetrics V2\] Número de veces que una fuente de kubernetes encontró error al manejar un evento.|
| **istio.galley.source.kube.dynamic.converter.failure.count** <br>(count) | \[OpenMetrics V2\] Número de veces que una fuente dinámica de kubernetes falló al convertir un recurso.|
| **istio.galley.validation.cert.key.update.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores de actualización de certificados del webhook de validación de Galley.|
| **istio.galley.validation.http.error.count** <br>(count) | \[OpenMetrics V2\] Número de errores de servicio http de validación de recursos.|
| **istio.mcp.clients.count** <br>(count) | \[OpenMetrics V2\] Número de flujos conectados actualmente.|
| **istio.mcp.request.acks.count** <br>(count) | \[OpenMetrics V2\] Número de aceptaciones de solicitud recibidas por la fuente.|
| **istio.mcp.request.nacks.count** <br>(count) | \[OpenMetrics V2\] Número de nacks de solicitud recibidos por la fuente.|
| **istio.mixer.config.rule.config.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores encontrados durante el procesamiento de la configuración de reglas.|
| **istio.mixer.config.rule.config.match.errors.count** <br>(count) | \[OpenMetrics V2\] Número de condiciones de reglas que no se han podido analizar.|
| **istio.mixer.config.unsatisfied.action.handlers.count** <br>(count) | \[OpenMetrics V2\] Número de acciones que fallaron debido a que los manejadores no estaban disponibles.|
| **istio.mixer.config.adapter.info.configs.count** <br>(count) | \[OpenMetrics V2\] Número de adaptadores conocidos en la configuración actual.|
| **istio.mixer.config.adapter.info.config.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores encontrados durante el procesamiento de la configuración de la información del adaptador.|
| **istio.mixer.config.handler.validation.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores encontrados porque la validación del manejador devolvió error.|
| **istio.mixer.config.instance.config.errors.count** <br>(count) | \[OpenMetrics V2\] Número de errores encontrados durante el procesamiento de la configuración de la instancia.|
| **istio.mixer.handler.handler.build.failures.count** <br>(count) | \[OpenMetrics V2\] Número de gestores cuya creación ha fallado durante la transición de configuración.|
| **istio.galley.istio.networking.virtualservices** <br>(gauge) | |
| **istio.galley.istio.networking.destinationrules** <br>(gauge) | |
| **istio.galley.istio.networking.gateways** <br>(gauge) | |
| **istio.galley.istio.authentication.meshpolicies** <br>(gauge) | |

### Eventos

El check de Istio no incluye eventos.

### Checks de servicio

**istio.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**istio.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

**istio.pilot.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**istio.galley.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**istio.citadel.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

### Error de longitud de fragmento no válida

Si ves el siguiente error en el modo legacy de la integración Istio (versión `3.13.0` o anterior de la integración Istio):

```python
  Error: ("Connection broken: InvalidChunkLength(got length b'', 0 bytes read)",
  InvalidChunkLength(got length b'', 0 bytes read))
```

Puedes utilizar el modo más reciente de la integración Istio basada en OpenMetrics para solucionar este error.

Debes actualizar como mínimo al Agent `7.31.0` y a Python 3. Consulta la sección [Configuración](#configuration) para habilitar OpenMetrics.

### Uso de la integración genérica OpenMetrics en un despliegue de Istio

Si está activada la inyección auxiliar del proxy de Istio, la monitorización de otras métricas de Prometheus mediante la [integración de OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) con el mismo endpoint de métricas que `istio_mesh_endpoint` puede dar lugar a un uso elevado de métricas personalizadas y a una recopilación duplicada de métricas.

Para asegurarte de que tu configuración de OpenMetrics no recopile métricas de forma redundante, puedes:

1. Utilizar una coincidencia de métricas específica en la opción de configuración de `metrics` o
1. Si utilizas el valor comodín `*` para `metrics`, considera la posibilidad de utilizar las siguientes opciones de la integración OpenMetrics para excluir métricas ya compatibles con las integraciones Istio y Envoy.

#### Configuración del modo más reciente de OpenMetrics con recopilación de métricas genéricas

Asegúrate de excluir las métricas de Istio y Envoy de tu configuración para evitar recibir una facturación elevada por métricas personalizadas. Utiliza `exclude_metrics` si el`openmetrics_endpoint` está habilitado.

```yaml
## Every instance is scheduled independent of the others.
#
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    metrics:
    - '.*'
    exclude_metrics:
      - istio_.*
      - envoy_.*

```

#### Configuración del modo legacy de OpenMetrics con recopilación de métricas genéricas

Asegúrate de excluir las métricas de Istio y Envoy de tu configuración para evitar recibir una facturación elevada por métricas personalizadas. Utiliza `ignore_metrics` si la `prometheus_url` está habilitada.

```yaml
instances:
  - prometheus_url: <PROMETHEUS_URL>
    metrics:
      - '*'
    ignore_metrics:
      - istio_*
      - envoy_*
```

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar tu malla de servicio de Istio con Datadog](https://www.datadoghq.com/blog/monitor-istio-with-datadog)
- [Aprende cómo Datadog recopila métricas clave para monitorizar Istio](https://www.datadoghq.com/blog/istio-metrics/)
- [Cómo monitorizar Istio con Datadog](https://www.datadoghq.com/blog/istio-datadog/)