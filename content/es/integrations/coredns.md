---
app_id: coredns
categories:
- almacenamiento en caché
- contenedores
- Kubernetes
- recopilación de logs
- la red
custom_kind: integración
description: CoreDNS recopila métricas de DNS en Kubernetes.
further_reading:
- link: https://www.datadoghq.com/blog/coredns-metrics/
  tag: blog
  text: Métricas clave para la monitorización de CoreDNS
- link: https://www.datadoghq.com/blog/coredns-monitoring-tools/
  tag: blog
  text: Herramientas para recopilar métricas y logs de CoreDNS
- link: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/
  tag: blog
  text: Cómo monitorizar CoreDNS con Datadog
integration_version: 6.0.0
media: []
supported_os:
- Linux
title: CoreDNS
---
## Información general

Obtén métricas de CoreDNS en tiempo real para visualizar y monitorizar fallos DNS y aciertos o fallos de caché.

## Configuración

A partir de la versión 1.11.0, esta integración basada en OpenMetrics tiene un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo heredado (que se activa configurando `prometheus_url` en su lugar). Para obtener todas las características más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas para integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

El modo más reciente del check de CoreDNS requiere Python 3 y envía las métricas `.bucket` y envía las muestras de histograma `.sum` y `.count` como tipo de recuento monotónico. Estas métricas se enviaban anteriormente como tipo `gauge` en el modo heredado. Consulta el archivo [`metadata.csv` ](https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv) para obtener una lista de las métricas disponibles en cada modo.

Para hosts que no puedan utilizar Python 3, o si ya has implementado previamente este modo de integración, consulta el [ejemplo de configuración] del modo `legacy` (https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example). Para los usuarios de Autodiscovery que confían en el archivo `coredns.d/auto_conf.yaml`, este archivo habilita por defecto la opción `prometheus_url` para el modo `legacy` del check. Consulta el ejemplo [coredns.d/auto_conf.yaml](https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml) para conocer las opciones de configuración predeterminadas y el [coredns.d/conf.yaml.example de ejemplo](https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

### Instalación

El check de CoreDNS está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

{{< tabs >}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Establece las [plantillas de integración de Autodiscovery](http://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en tu contenedor de aplicaciones:

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto para el modo heredado.
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

#### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation).

A continuación, establece [Integraciones de log](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en tu contenedor de aplicaciones. Opcionalmente, puedes configurar las plantillas con [un archivo, un mapa de configuración o un almacén de clave-valor](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v1** (para Datadog Agent \< v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.checks: |
      {
        "coredns": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
        }
      }
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

**Anotaciones v1** (para Datadog Agent \< v7.36)

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
          "instances": [
            {
              "prometheus_url": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto para el modo heredado.
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

#### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset).

A continuación, establece las [integraciones de logs](https://docs.datadoghq.com/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration) como anotaciones del pod. Alternativamente, puedes configurar esto con un [archivo, mapa de configuración o almacén de clave-valor](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=file).

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Establece [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/amazon_ecs/?tab=awscli#process-collection) como etiquetas de Docker en tu contenedor de aplicaciones:

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto para el modo heredado.
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, establece [Integraciones de logs](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations) como etiquetas de Docker:

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) y busca `coredns` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **coredns.acl.allowed_requests** <br>(count) | \[OpenMetrics V1\] Contador de solicitudes DNS permitidas.<br>_Se muestra como solicitud_ |
| **coredns.acl.allowed_requests.count** <br>(count) | \[OpenMetrics V2\] Contador de solicitudes DNS permitidas.<br>_Se muestra como solicitud_ |
| **coredns.acl.blocked_requests** <br>(count) | \[OpenMetrics V1\] Contador de solicitudes DNS bloqueadas.<br>_Se muestra como solicitud_ |
| **coredns.acl.blocked_requests.count** <br>(count) | \[OpenMetrics V2\] Contador de solicitudes DNS bloqueadas.<br>_Se muestra como solicitud_ |
| **coredns.autopath.success_count** <br>(count) | \[OpenMetrics V1\] Contador de solicitudes que hicieron autopath.<br>_Se muestra como solicitud_ |
| **coredns.autopath.success_count.count** <br>(count) | \[OpenMetrics V2\] Contador de solicitudes que hicieron autopath.<br>_Se muestra como solicitud_ |
| **coredns.build_info** <br>(gauge) | \[OpenMetrics V1 y V2\] Una métrica con un valor constante '1' etiquetada por versión, revisión y goversion a partir de la cual se construyó CoreDNS.|
| **coredns.cache_drops_count** <br>(count) | \[OpenMetrics V1\] Contador de respuestas excluidas de la caché debido a una falta de coincidencia entre el nombre de la pregunta de solicitud/respuesta.<br>_Se muestra como respuesta_ |
| **coredns.cache_drops_count.count** <br>(count) | \[OpenMetrics V2\] Contador de respuestas excluidas de la caché debido a que el nombre de la pregunta de solicitud/respuesta no coincide.<br>_Se muestra como respuesta_ |
| **coredns.cache_hits_count** <br>(count) | \[OpenMetrics V1\] Contador de accesos a la caché por tipo de caché<br>_Se muestra como acierto_ |
| **coredns.cache_hits_count.count** <br>(count) | \[OpenMetrics V2\] Contador de accesos a la caché por tipo de caché<br>_Se muestra como acierto_ |
| **coredns.cache_misses_count** <br>(count) | \[OpenMetrics V1\] Contador de fallos de caché.<br>_Se muestra como fallo_ |
| **coredns.cache_misses_count.count** <br>(count) | \[OpenMetrics V2\] Contador de fallos de caché.<br>_Se muestra como fallo_ |
| **coredns.cache_prefetch_count** <br>(count) | \[OpenMetrics V1\] El número de veces que la caché ha precargado un elemento almacenado.|
| **coredns.cache_prefetch_count.count** <br>(count) | \[OpenMetrics V2\] El número de veces que la caché ha precargado un elemento almacenado.|
| **coredns.cache_request_count** <br>(count) | \[OpenMetrics V1\] Contador de solicitudes de caché.<br>_Se muestra como solicitud_ |
| **coredns.cache_request_count.count** <br>(count) | \[OpenMetrics V2\] Contador de solicitudes de caché.<br>_Se muestra como solicitud_ |
| **coredns.cache_size.count** <br>(gauge) | \[OpenMetrics V1 y V2\]<br>_Se muestra como entrada_ |
| **coredns.cache_stale_count** <br>(count) | \[OpenMetrics V1\] Contador de solicitudes servidas desde entradas de caché obsoletas.<br>_Se muestra como solicitud_ |
| **coredns.cache_stale_count.count** <br>(count) | \[OpenMetrics V2\] Contador de solicitudes servidas desde entradas de caché obsoletas.<br>_Se muestra como solicitud_ |
| **coredns.dnssec.cache_hits** <br>(count) | \[OpenMetrics V1\] Contador de accesos a la caché.<br>_Se muestra como acierto_ |
| **coredns.dnssec.cache_hits.count** <br>(count) | \[OpenMetrics V2\] Contador de accesos a la caché.<br>_Se muestra como acierto_ |
| **coredns.dnssec.cache_misses** <br>(count) | \[OpenMetrics V1\] Contador de fallos de caché.<br>_Se muestra como fallo_ |
| **coredns.dnssec.cache_misses.count** <br>(count) | \[OpenMetrics V2\] Contador de fallos de caché.<br>_Se muestra como fallo_ |
| **coredns.dnssec.cache_size** <br>(gauge) | \[OpenMetrics V1 y V2\] Total de elementos en la caché, el tipo es firma.|
| **coredns.forward_healthcheck_broken_count** <br>(count) | \[OpenMetrics V1\] Contador de cuando todos los flujos ascendentes no están en buen estado<br>_Se muestra como entrada_ |
| **coredns.forward_healthcheck_broken_count.count** <br>(count) | \[OpenMetrics V2\] Contador de cuando todos los flujos ascendentes no están en buen estado<br>_Se muestra como entrada_ |
| **coredns.forward_healthcheck_failure_count** <br>(count) | \[OpenMetrics V1\] Número de checks de estado fallidos por flujo ascendente<br>_Se muestra como entrada_ |
| **coredns.forward_healthcheck_failure_count.count** <br>(count) | \[OpenMetrics V2\] Número de checks de estado fallidos por flujo ascendente<br>_Se muestra como entrada_ |
| **coredns.forward_max_concurrent_rejects** <br>(count) | \[OpenMetrics V1\] Contador del número de consultas rechazadas porque las consultas concurrentes estaban al máximo.<br>_Se muestra como consulta_ |
| **coredns.forward_max_concurrent_rejects.count** <br>(count) | \[OpenMetrics V2\] Contador del número de consultas rechazadas porque las consultas concurrentes estaban al máximo.<br>_Se muestra como consulta_ |
| **coredns.forward_request_count** <br>(count) | \[OpenMetrics V1\] Recuento de consultas por flujo ascendente<br>_Se muestra como solicitud_ |
| **coredns.forward_request_count.count** <br>(count) | \[OpenMetrics V2\] Recuento de consultas por flujo ascendente<br>_Se muestra como solicitud_ |
| **coredns.forward_request_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Duración por interacción ascendente<br>_Se muestra en segundos_ |
| **coredns.forward_request_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Duración por interacción ascendente<br>_Se muestra en segundos_ |
| **coredns.forward_request_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Duración por interacción ascendente<br>_Se muestra en segundos_ |
| **coredns.forward_response_rcode_count** <br>(count) | \[OpenMetrics V1\] Recuento de RCODEs por flujo ascendente<br>_Se muestra como respuesta_ |
| **coredns.forward_response_rcode_count.count** <br>(count) | \[OpenMetrics V2\] Recuento de RCODEs por flujo ascendente<br>_Se muestra como respuesta_ |
| **coredns.forward_sockets_open** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de sockets abiertos por flujo ascendente<br>_Se muestra como conexión_ |
| **coredns.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **coredns.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuantiles de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **coredns.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma de las duraciones de invocación GC.<br>_Se muestra como segundo_ |
| **coredns.go.goroutines** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **coredns.go.info** <br>(gauge) | \[OpenMetrics V1 y V2\] Información sobre el entorno Go.|
| **coredns.go.memstats.alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **coredns.go.memstats.alloc_bytes_total** <br>(count) | \[OpenMetrics V1\] Número total de bytes asignados aunque se hayan liberado.<br>_Se muestra como byte_ |
| **coredns.go.memstats.buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **coredns.go.memstats.frees_total** <br>(count) | \[OpenMetrics V1\] Número total de libres.|
| **coredns.go.memstats.frees_total.count** <br>(count) | \[OpenMetrics V2\] Número total de libres.|
| **coredns.go.memstats.gc_cpu_fraction** <br>(gauge) | \[OpenMetrics V1 y V2\] CPU ocupada por GC<br>_Se muestra en porcentaje_ |
| **coredns.go.memstats.gc_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Bytes asignados al heap<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_idle_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes ociosos en el heap<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en el heap<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_objects** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de objetos en el heap<br>_Se muestra como objeto_ |
| **coredns.go.memstats.heap_released_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_released_bytes.count** <br>(count) | \[OpenMetrics V2\] Cuenta de bytes liberados al sistema en el último gc<br>_Se muestra como byte_ |
| **coredns.go.memstats.heap_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados por el heap<br>_Se muestra como byte_ |
| **coredns.go.memstats.last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Longitud de la última GC<br>_Se muestra como segundo_ |
| **coredns.go.memstats.lookups_total** <br>(count) | \[OpenMetrics V1\] Número de búsquedas<br>_Se muestra como operación_ |
| **coredns.go.memstats.lookups_total.count** <br>(count) | \[OpenMetrics V2\] Número de búsquedas<br>_Se muestra como operación_ |
| **coredns.go.memstats.mallocs_total** <br>(count) | \[OpenMetrics V1\] Número de mallocs<br>_Se muestra como operación_ |
| **coredns.go.memstats.mallocs_total.count** <br>(count) | \[OpenMetrics V2\] Número de mallocs<br>_Se muestra como operación_ |
| **coredns.go.memstats.mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **coredns.go.memstats.mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **coredns.go.memstats.mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **coredns.go.memstats.mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **coredns.go.memstats.next_gc_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados<br>_Se muestra como byte_ |
| **coredns.go.memstats.other_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **coredns.go.memstats.stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **coredns.go.memstats.stack_sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **coredns.go.memstats.sys_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes obtenidos del sistema<br>_Se muestra como byte_ |
| **coredns.go.threads** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de subprosesos de OS creados.<br>_Se muestra como subproceso_ |
| **coredns.grpc.request_count** <br>(count) | \[OpenMetrics V1\] Recuento de consultas por flujo ascendente.|
| **coredns.grpc.request_count.count** <br>(count) | \[OpenMetrics V2\] Recuento de consultas por flujo ascendente.|
| **coredns.grpc.response_rcode_count** <br>(count) | \[OpenMetrics V1\] Cuenta de RCODEs por flujo ascendente. Aleatoriamente, (esto siempre usa la política aleatoria) se divide a un flujo ascendente.|
| **coredns.grpc.response_rcode_count.count** <br>(count) | \[OpenMetrics V2\] Cuenta de RCODEs por flujo ascendente. Aleatoriamente, (esto siempre usa la política aleatoria) se divide a un flujo ascendente.|
| **coredns.health_request_duration.bucket** <br>(count) | \[OpenMetrics V2\] Muestra para el histograma del tiempo (en segundos) que tardó cada solicitud.|
| **coredns.health_request_duration.count** <br>(count) | \[OpenMetrics V1 y V2\] Recuento para el histograma del tiempo (en segundos) que ha tardado cada solicitud.|
| **coredns.health_request_duration.sum** <br>(count) | \[OpenMetrics V1 y V2\] Suma para el histograma del tiempo (en segundos) que tardó cada solicitud.|
| **coredns.hosts.entries_count** <br>(gauge) | \[OpenMetrics V1 y V2\] El número combinado de entradas en hosts y Corefile.|
| **coredns.hosts.reload_timestamp** <br>(gauge) | \[OpenMetrics V1 y V2\] La marca temporal de la última recarga del archivo hosts.<br>_Se muestra como segundo_ |
| **coredns.panic_count.count** <br>(count) | \[OpenMetrics V1 y V2\]<br>_Se muestra como entrada_ |
| **coredns.plugin_enabled** <br>(gauge) | \[OpenMetrics V1 y V2\] Una métrica que indica si un complemento está habilitado por servidor y zona.|
| **coredns.process.cpu_seconds_total** <br>(count) | \[OpenMetrics V1 y V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **coredns.process.cpu_seconds_total.count** <br>(count) | \[OpenMetrics V2\] Recuento del tiempo de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra como segundo_ |
| **coredns.process.max_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **coredns.process.open_fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de descriptores de archivo abiertos.<br>_Se muestra como archivo_ |
| **coredns.process.resident_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **coredns.process.start_time_seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **coredns.process.virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **coredns.proxy_request_count** <br>(count) | \[OpenMetrics V1\] Recuento de consultas por flujo ascendente.<br>_Se muestra como solicitud_ |
| **coredns.proxy_request_count.count** <br>(count) | \[OpenMetrics V2\] Recuento de consultas por flujo ascendente.<br>_Se muestra como solicitud_ |
| **coredns.proxy_request_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Muestra de duración por interacción ascendente<br>_Se muestra como segundo_ |
| **coredns.proxy_request_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Duración por interacción ascendente<br>_Se muestra en segundos_ |
| **coredns.proxy_request_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Duración por interacción ascendente<br>_Se muestra en segundos_ |
| **coredns.reload.failed_count** <br>(count) | \[OpenMetrics V1\] Cuenta el número de intentos fallidos de recarga.|
| **coredns.reload.failed_count.count** <br>(count) | \[OpenMetrics V2\] Cuenta el número de intentos fallidos de recarga.|
| **coredns.request_count** <br>(count) | \[OpenMetrics V1\] Recuento total de consultas.<br>_Se muestra como solicitud_ |
| **coredns.request_count.count** <br>(count) | \[OpenMetrics V2\] Recuento total de consultas.<br>_Se muestra como solicitud_ |
| **coredns.request_duration.seconds.bucket** <br>(count) | \[OpenMetrics V2\] Duración de la muestra para procesar cada consulta<br>_Se muestra como segundo_ |
| **coredns.request_duration.seconds.count** <br>(count) | \[OpenMetrics V1 y V2\] Duración para procesar cada consulta<br>_Se muestra como segundo_ |
| **coredns.request_duration.seconds.sum** <br>(count) | \[OpenMetrics V1 y V2\] Duración para procesar cada consulta<br>_Se muestra como segundo_ |
| **coredns.request_size.bytes.bucket** <br>(count) | \[OpenMetrics V2\] Tamaño de la muestra de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.request_size.bytes.count** <br>(count) | \[OpenMetrics V1 y V2\] Tamaño de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.request_size.bytes.sum** <br>(count) | \[OpenMetrics V1 y V2\] Tamaño de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.request_type_count** <br>(count) | \[OpenMetrics V1\] Contador de consultas por zona y tipo|
| **coredns.request_type_count.count** <br>(count) | \[OpenMetrics V2\] Contador de consultas por zona y tipo|
| **coredns.response_code_count** <br>(count) | \[OpenMetrics V1\] Número de respuestas por zona y rcode|
| **coredns.response_code_count.count** <br>(count) | \[OpenMetrics V2\] Número de respuestas por zona y rcode|
| **coredns.response_size.bytes.bucket** <br>(count) | \[OpenMetrics V2\] Tamaño de la muestra de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.response_size.bytes.count** <br>(count) | \[OpenMetrics V1 y V2\] Tamaño de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.response_size.bytes.sum** <br>(count) | \[OpenMetrics V1 y V2\] Tamaño de la solicitud en bytes<br>_Se muestra como byte_ |
| **coredns.template.failures_count** <br>(count) | \[OpenMetrics V1\] El número de veces que la plantilla Go falló.<br>_Se muestra como error_ |
| **coredns.template.failures_count.count** <br>(count) | \[OpenMetrics V2\] El número de veces que la plantilla Go falló.<br>_Se muestra como error_ |
| **coredns.template.matches_count** <br>(count) | \[OpenMetrics V1\] El número total de solicitudes coincidentes por expresión regular.|
| **coredns.template.matches_count.count** <br>(count) | \[OpenMetrics V2\] El número total de solicitudes coincidentes por expresión regular.|
| **coredns.template.rr_failures_count** <br>(count) | \[OpenMetrics V1\] El número de veces que el registro de recursos de plantilla no era válido y no pudo ser analizado.<br>_Se muestra como error_ |
| **coredns.template.rr_failures_count.count** <br>(count) | \[OpenMetrics V2\] El número de veces que el registro de recursos de plantilla no era válido y no pudo ser analizado.<br>_Se muestra como error_ |

### Eventos

El check de CoreDNS no incluye eventos.

### Checks de servicio

**coredns.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](http://docs.datadoghq.com/help).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Métricas clave para la monitorización de CoreDNS](https://www.datadoghq.com/blog/coredns-metrics/)
- [Herramientas para recopilar métricas y logs de CoreDNS](https://www.datadoghq.com/blog/coredns-monitoring-tools/)
- [Cómo monitorizar CoreDNS con Datadog](https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/)