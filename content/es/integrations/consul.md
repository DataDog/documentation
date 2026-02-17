---
app_id: consul
categories:
- configuration & deployment
- containers
- log collection
- network
- notifications
- orchestration
custom_kind: integración
description: Recibe alertas sobre los checks de estado de Consul, ve las asignaciones
  de servicio a nodo y mucho más. more.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/hcp-consul
  tag: documentación
  text: Monitorización de HCP Cónsul con Datadog
- link: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
  tag: blog
  text: Monitorización del estado y rendimiento de Consul con Datadog
- link: https://www.datadoghq.com/blog/engineering/consul-at-datadog/
  tag: blog
  text: Consul en Datadog
- link: https://www.datadoghq.com/blog/consul-metrics/
  tag: blog
  text: Métricas clave para la monitorización de Consul
- link: https://www.datadoghq.com/blog/consul-monitoring-tools/
  tag: blog
  text: Herramientas de monitorización de Consul
- link: https://www.datadoghq.com/blog/consul-datadog/
  tag: blog
  text: Cómo monitorizar Consul con Datadog
integration_version: 5.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Consul
---
![Panel de Consul](https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png)

## Información general

El Datadog Agent recopila muchas métricas de nodos de Consul, incluidas las de:

- Total de pares de Consul
- Estado del servicio: para un servicio determinado, ¿cuántos de sus nodos están activos, en transmisión, en advertencia o en estado crítico?
- Estado del nodo: para un nodo determinado, ¿cuántos de sus servicios están activos, en transmisión, en advertencia o en estado crítico?
- Coordenadas de red: latencias entre centros de datos y dentro de ellos

El _Consul_ Agent puede proporcionar métricas adicionales con DogStatsD. Estas métricas están más relacionadas con el estado interno de Consul en sí, no con los servicios que dependen de Consul. Hay métricas para:

- Eventos serf y flaps de miembros
- Protocolo Raft
- Rendimiento del DNS

Y muchos más.

Por último, además de las métricas, el Datadog Agent también envía un check de servicio para cada uno de los checks de estado de Consul y un evento después de cada nueva elección de líder.

## Configuración

### Instalación

El check de Consul del Datadog Agent está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus nodos de Consul.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `consul.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus métricas de Consul. Consulta el [consul.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

###### OpenMetrics

Opcionalmente, puedes habilitar la opción de configuración `use_prometheus_endpoint` para obtener un conjunto adicional de métricas del endpoint de Prometheus para Consul.

**Nota**: Utiliza el método DogStatsD o Prometheus; no habilites ambos para la misma instancia.

1. Configura Consul para exponer métricas al endpoint de Prometheus. Establece [`prometheus_retention_time`](https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time) anidado bajo la clave de nivel superior `telemetry` del archivo de configuración principal de Consul:

   ```conf
   {
     ...
     "telemetry": {
       "prometheus_retention_time": "360h"
     },
     ...
   }
   ```

1. Edita el archivo `consul.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a utilizar el endpoint de Prometheus.

   ```yaml
   instances:
       - url: <EXAMPLE>
         use_prometheus_endpoint: true
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### DogStatsD

En lugar de utilizar el endpoint de Prometheus, puedes configurar Consul para que envíe el mismo conjunto de métricas adicionales al Agent a través de [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/).

1. Configura Consul para enviar métricas de DogStatsD añadiendo `dogstatsd_addr` anidado bajo la clave `telemetry` de nivel superior en el archivo de configuración principal de Consul:

   ```conf
   {
     ...
     "telemetry": {
       "dogstatsd_addr": "127.0.0.1:8125"
     },
     ...
   }
   ```

1. Actualiza el [archivo de configuración principal del Datadog Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` añadiendo los siguientes ajustes para garantizar que las métricas se etiquetan correctamente:

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

1. Edita este bloque de configuración en tu archivo `consul.yaml` para recopilar logs de Consul:

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.
   Consulta el [consul.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | en blanco o `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `consul` en la sección Checks.

**Nota**: Si tus nodos de Consul tienen habilitado el registro de depuración, el sondeo regular del Datadog Agent se muestra en el log de Consul:

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### Consul Agent a DogStatsD

Usa `netstat` para verificar que Consul también esté enviando sus métricas:

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **consul.catalog.nodes_critical** <br>(gauge) | \[Integración\] El número de nodos registrados con estado de servicio `critical`<br>_Se muestra como nodo_ |
| **consul.catalog.nodes_passing** <br>(gauge) | \[Integración\] El número de nodos registrados con estado de servicio `passing`<br>_Se muestra como nodo_ |
| **consul.catalog.nodes_up** <br>(gauge) | \[Integración\] El número de nodos<br>_Se muestra como nodo_ |
| **consul.catalog.nodes_warning** <br>(gauge) | \[Integración\] El número de nodos registrados con estado de servicio `warning`<br>_Se muestra como nodo_ |
| **consul.catalog.services_count** <br>(gauge) | \[Integración\] Métrica para contar el número de servicios que coinciden con criterios como la etiqueta del servicio, el nombre del nodo o el estado. Se puede consultar mediante el agregador `sum by`.<br>_Se muestra como servicio_ |
| **consul.catalog.services_critical** <br>(gauge) | \[Integración\] Total de servicios críticos en los nodos<br>_Se muestra como servicio_ |
| **consul.catalog.services_passing** <br>(gauge) | \[Integración\] Total de servicios aprobados en los nodos<br>_Se muestra como servicio_ |
| **consul.catalog.services_up** <br>(gauge) | \[Integración\] Total de servicios registrados en los nodos<br>_Se muestra como servicio_ |
| **consul.catalog.services_warning** <br>(gauge) | \[Integración\] Total de servicios de alerta en los nodos<br>_Se muestra como servicio_ |
| **consul.catalog.total_nodes** <br>(gauge) | \[Integración\] El número de nodos registrados en el clúster de consul<br>_Se muestra como nodo_ |
| **consul.check.up** <br>(gauge) | Métrica que representa el estado de un check de servicio. Un valor de 0 = no disponible, 1 = aprobado, 2 = advertencia, 3 = crítico.|
| **consul.client.rpc** <br>(count) | \[DogStatsD\] \[Prometheus\] Se incrementa cada vez que un agente de Consul en modo cliente hace una solicitud RPC a un servidor de Consul. Esto da una medida de cuánto está cargando un agent dado los servidores de Consul. Esto solo lo generan los agents en modo cliente, no los servidores de Consul.<br>_Se muestra como solicitud_ |
| **consul.client.rpc.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] Se incrementa cada vez que un agente de Consul en modo cliente realiza una solicitud RPC a un servidor de Consul y falla<br>_Se muestra como solicitud_ |
| **consul.http.request** <br>(gauge) | \[DogStatsD\] Realiza un seguimiento de cuánto tiempo se tarda en atender la solicitud HTTP dada para el verbo y la ruta dados. Usando un asignador DogStatsD como se describe en el README, las rutas se asignan a etiquetas y no incluyen detalles como nombres de servicio o clave. Para estas rutas, un guión bajo está presente como parámetro, por ejemplo: `http_method:GET, path:v1.kv._)`<br>_Se muestra como milisegundo_ |
| **consul.http.request.count** <br>(count) | \[Prometheus\] Un recuento de cuánto tiempo se tarda en atender la solicitud HTTP dada para el verbo y la ruta dados. Incluye etiquetas para ruta y método. La ruta no incluye detalles como nombres de servicio o clave. Para estas rutas, un guión bajo está presente como parámetro, por ejemplo: `path=v1.kv._)`<br>_Se muestra como milisegundo_ |
| **consul.http.request.quantile** <br>(gauge) | \[Prometheus\] Un cuantil de cuánto tiempo se tarda en atender la solicitud HTTP dada para el verbo y la ruta dados. Incluye etiquetas para ruta y método. La ruta no incluye detalles como nombres de servicio o clave. Para estas rutas, hay un guión bajo como parámetro, por ejemplo: `path=v1.kv._)`<br>_Se muestra como milisegundo_ |
| **consul.http.request.sum** <br>(count) | \[Prometheus\] La suma de lo que se tarda en atender la solicitud HTTP dada para el verbo y la ruta dados. Incluye etiquetas para ruta y método. La ruta no incluye detalles como nombres de servicio o clave. Para estas rutas, un guión bajo está presente como parámetro, por ejemplo: `path=v1.kv._)`<br>_Se muestra como milisegundo_ |
| **consul.memberlist.degraded.probe** <br>(gauge) | \[DogStatsD\] \[Prometheus\] Esta métrica cuenta el número de veces que el agent de Consul ha realizado la detección de fallos en otro agent a una velocidad de sonda más lenta. El agent utiliza su propia métrica de estado como indicador para realizar esta acción. Si su puntuación de estado es baja, significa que el nodo está en buen estado, y viceversa.|
| **consul.memberlist.gossip.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el número de chismes (mensajes) emitidos a un conjunto de nodos seleccionados aleatoriamente.<br>_Se muestra como mensaje_ |
| **consul.memberlist.gossip.avg** <br>(gauge) | \[DogStatsD\] Promedio del número de chismes (mensajes) emitidos a un conjunto de nodos seleccionados aleatoriamente.<br>_Se muestra como mensaje_ |
| **consul.memberlist.gossip.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.memberlist.gossip|
| **consul.memberlist.gossip.max** <br>(gauge) | \[DogStatsD\] El máximo para el número de chismes (mensajes) difundidos a un conjunto de nodos seleccionados al azar.<br>_Se muestra como mensaje_ |
| **consul.memberlist.gossip.median** <br>(gauge) | \[DogStatsD\] La mediana del número de chismes (mensajes) emitidos a un conjunto de nodos seleccionados aleatoriamente.<br>_Se muestra como mensaje_ |
| **consul.memberlist.gossip.quantile** <br>(gauge) | \[Prometheus\] El cuantil del número de chismes (mensajes) emitidos a un conjunto de nodos seleccionados aleatoriamente.<br>_Se muestra como mensaje_ |
| **consul.memberlist.gossip.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del número de chismes (mensajes) emitidos a un conjunto de nodos seleccionados aleatoriamente.<br>_Se muestra como mensaje_ |
| **consul.memberlist.health.score** <br>(gauge) | \[DogStatsD\] \[Prometheus\] Esta métrica describe la percepción de un nodo de su propio estado basado en lo bien que está cumpliendo los requisitos de tiempo real poco restrictivos del protocolo. Esta métrica va de 0 a 8, donde 0 indica "totalmente en buen estado". Para más detalles, consulta la sección IV del documento de Lifeguard: https://arxiv.org/pdf/1707.00788.pdf|
| **consul.memberlist.msg.alive** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica cuenta el número de agents de Consul activos, que el agent ha asignado hasta el momento, basándose en la información de mensajes dada por la capa de red.|
| **consul.memberlist.msg.dead** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica cuenta el número de veces que un agent de Consul ha marcado a otro agente como nodo apagado.<br>_Se muestra como mensaje_ |
| **consul.memberlist.msg.suspect** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de veces que un agent de Consul sospecha que otro ha fallado mientras sondea durante el protocolo de gossip.|
| **consul.memberlist.probenode.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el tiempo que se tarda en realizar una sola ronda de detección de fallos en un agent selecto de Consul.<br>_Se muestra como nodo_ |
| **consul.memberlist.probenode.avg** <br>(gauge) | \[DogStatsD\] Promedio del tiempo necesario para realizar una sola ronda de detección de fallos en un agent seleccionado de Consul.<br>_Se muestra como nodo_ |
| **consul.memberlist.probenode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.memberlist.probenode|
| **consul.memberlist.probenode.max** <br>(gauge) | \[DogStatsD\] El máximo para el tiempo que se tarda en realizar una sola ronda de detección de fallos en un agent selecto de Consul.<br>_Se muestra como nodo_ |
| **consul.memberlist.probenode.median** <br>(gauge) | \[DogStatsD\] La mediana del tiempo que se tarda en realizar una sola ronda de detección de fallos en un agent seleccionado de Consul.<br>_Se muestra como nodo_ |
| **consul.memberlist.probenode.quantile** <br>(gauge) | \[Prometheus\] El cuantil del tiempo necesario para realizar una única ronda de detección de fallos en un agent de Consul seleccionado.<br>_Se muestra como nodo_ |
| **consul.memberlist.probenode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del tiempo necesario para realizar una sola ronda de detección de fallos en un agent de Consul seleccionado.<br>_Se muestra como nodo_ |
| **consul.memberlist.pushpullnode.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el número de agents de Consul que han intercambiado estado con este agent.<br>_Se muestra como nodo_ |
| **consul.memberlist.pushpullnode.avg** <br>(gauge) | \[DogStatsD\] La media del número de agents de Consul que han intercambiado estado con este agent.<br>_Se muestra como nodo_ |
| **consul.memberlist.pushpullnode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.memberlist.pushpullnode|
| **consul.memberlist.pushpullnode.max** <br>(gauge) | \[DogStatsD\] El máximo para el número de agents de Consul que han intercambiado estado con este agent.<br>_Se muestra como nodo_ |
| **consul.memberlist.pushpullnode.median** <br>(gauge) | \[DogStatsD\] La mediana del número de agents de Consul que han intercambiado estado con este agent.<br>_Se muestra como nodo_ |
| **consul.memberlist.pushpullnode.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el número de agents de Consul que han intercambiado estado con este agent.|
| **consul.memberlist.pushpullnode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del número de agents de Consul que han intercambiado estado con este agent.|
| **consul.memberlist.tcp.accept** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica cuenta el número de veces que un agent de Consul ha aceptado una conexión de flujo TCP entrante.<br>_Se muestra como conexión_ |
| **consul.memberlist.tcp.connect** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica cuenta el número de veces que un agent de Consul ha iniciado una sincronización push/pull con otro agent.<br>_Se muestra como conexión_ |
| **consul.memberlist.tcp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica mide el número total de bytes enviados por un agent de Consul a través del protocolo TCP<br>_Se muestra como byte_ |
| **consul.memberlist.udp.received** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica mide el número total de bytes enviados/recibidos por un agent de Consul a través del protocolo UDP.<br>_Se muestra como byte_ |
| **consul.memberlist.udp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] Esta métrica mide el número total de bytes enviados/recibidos por un agent de Consul a través del protocolo UDP.<br>_Se muestra como byte_ |
| **consul.net.node.latency.max** <br>(gauge) | \[Integration\] Latencia máxima desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.median** <br>(gauge) | \[Integration\] Mediana de latencia desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.min** <br>(gauge) | \[Integration\] Latencia mínima desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.p25** <br>(gauge) | \[Integración\] Latencia P25 desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.p75** <br>(gauge) | \[Integración\] Latencia P75 desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.p90** <br>(gauge) | \[Integración\] Latencia P90 desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.p95** <br>(gauge) | \[Integración\] Latencia P95 desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.net.node.latency.p99** <br>(gauge) | \[Integración\] Latencia P99 desde este nodo a todos los demás<br>_Se muestra en milisegundos_ |
| **consul.peers** <br>(gauge) | \[Integración\] El número de pares en el conjunto de pares|
| **consul.raft.apply** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de transacciones de raft que se producen<br>_Se muestra como transacción_ |
| **consul.raft.commitTime.95percentile** <br>(gauge) | \[DogStatsD\] El tiempo p95 que tarda en confirmarse una nueva entrada en el log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.commitTime.avg** <br>(gauge) | \[DogStatsD\] El tiempo medio que se tarda en consignar una nueva entrada en el log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.commitTime.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de raft.commitTime|
| **consul.raft.commitTime.max** <br>(gauge) | \[DogStatsD\] El tiempo máximo que se tarda en confirmar una nueva entrada en el log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.commitTime.median** <br>(gauge) | \[DogStatsD\] La mediana del tiempo que se tarda en consignar una nueva entrada en el log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.commitTime.quantile** <br>(gauge) | \[Prometheus\] El cuantil de tiempo que se tarda en consignar una nueva entrada al log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.commitTime.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del tiempo que se tarda en consignar una nueva entrada al log de raft en el líder<br>_Se muestra como milisegundo_ |
| **consul.raft.leader.dispatchLog.95percentile** <br>(gauge) | \[DogStatsD\] El tiempo p95 que tarda el líder en escribir entradas de log en el disco<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.dispatchLog.avg** <br>(gauge) | \[DogStatsD\] El tiempo medio que tarda el líder en escribir entradas de log en el disco<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.dispatchLog.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de raft.leader.dispatchLog|
| **consul.raft.leader.dispatchLog.max** <br>(gauge) | \[DogStatsD\] El tiempo máximo que tarda el líder en escribir entradas de log en el disco<br>_Se muestra como milisegundo_ |
| **consul.raft.leader.dispatchLog.median** <br>(gauge) | \[DogStatsD\] El tiempo medio que tarda el líder en escribir entradas de log en el disco<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.dispatchLog.quantile** <br>(gauge) | \[Prometheus\] El cuantil de tiempo que tarda el líder en escribir entradas de log en el disco<br>_Se muestra como milisegundo_ |
| **consul.raft.leader.dispatchLog.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del tiempo que tarda el líder en escribir entradas de log en el disco<br>_Se muestra como milisegundo_ |
| **consul.raft.leader.lastContact.95percentile** <br>(gauge) | \[DogStatsD\] El tiempo p95 transcurrido desde la última vez que el líder pudo comprobar su contrato con los seguidores<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.lastContact.avg** <br>(gauge) | \[DogStatsD\] Tiempo medio transcurrido desde la última vez que el líder pudo comprobar su contrato con los seguidores<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.lastContact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de raft.leader.lastContact|
| **consul.raft.leader.lastContact.max** <br>(gauge) | \[DogStatsD\] Tiempo máximo transcurrido desde la última vez que el líder pudo comprobar su contrato con los seguidores<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.lastContact.median** <br>(gauge) | \[DogStatsD\] La mediana del tiempo transcurrido desde que el líder pudo comprobar por última vez su contrato con los seguidores<br>_Se muestra en milisegundos_ |
| **consul.raft.leader.lastContact.quantile** <br>(gauge) | \[Prometheus\] El cuantil de tiempo transcurrido desde la última vez que el líder pudo comprobar su contrato con los seguidores<br>_Se muestra como milisegundo_ |
| **consul.raft.leader.lastContact.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del tiempo transcurrido desde la última vez que el líder pudo comprobar su contrato con los seguidores<br>_Se muestra en milisegundos_ |
| **consul.raft.replication.appendEntries.logs** <br>(count) | \[DogStatsD\] \[Prometheus\] Mide el número de logs replicados a un agente, para acercarlo a los logs del líder.<br>_Se muestra como entrada_ |
| **consul.raft.replication.appendEntries.rpc.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El tiempo que tarda el RFC de append entries en replicar las entradas de log de un agent líder en su(s) agent(s) seguidor(es)<br>_Se muestra en milisegundos_ |
| **consul.raft.replication.appendEntries.rpc.quantile** <br>(gauge) | \[Prometheus\] El cuantil que tarda el RFC de append entries en replicar las entradas de log de un agent líder en su(s) agent(s) seguidor(es)<br>_Se muestra en milisegundos_ |
| **consul.raft.replication.appendEntries.rpc.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma el tiempo que tarda el RFC de append entries en replicar las entradas de log de un agent líder en su(s) agent(s) seguidor(es)<br>_Se muestra como milisegundo_ |
| **consul.raft.replication.heartbeat.count** <br>(count) | \[DogStatsD\] \[Prometheus\] Cuenta el tiempo que se tarda en invocar appendEntries en un par.<br>_Se muestra como milisegundo_ |
| **consul.raft.replication.heartbeat.quantile** <br>(gauge) | \[Prometheus\] El cuantil del tiempo necesario para invocar appendEntries en un par.<br>_Se muestra como milisegundo_ |
| **consul.raft.replication.heartbeat.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del tiempo empleado en invocar appendEntries en un par.<br>_Se muestra como milisegundo_ |
| **consul.raft.state.candidate** <br>(count) | \[DogStatsD\] \[Prometheus\]El número de elecciones de líderes iniciados<br>_Se muestra como evento_ |
| **consul.raft.state.leader** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de elecciones de líderes completadas<br>_Se muestra como evento_ |
| **consul.runtime.gc_pause_ns.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el número de nanosegundos consumidos por las pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundo_ |
| **consul.runtime.gc_pause_ns.avg** <br>(gauge) | \[DogStatsD\] Promedio del número de nanosegundos consumidos por las pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundo_ |
| **consul.runtime.gc_pause_ns.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.runtime.gc_pause_ns|
| **consul.runtime.gc_pause_ns.max** <br>(gauge) | \[DogStatsD\] Máximo número de nanosegundos consumidos por pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundos_ |
| **consul.runtime.gc_pause_ns.median** <br>(gauge) | \[DogStatsD\] La mediana del número de nanosegundos consumidos por las pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundos_ |
| **consul.runtime.gc_pause_ns.quantile** <br>(gauge) | \[Prometheus\] El cuantil de nanosegundos consumidos por las pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundos_ |
| **consul.runtime.gc_pause_ns.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma de nanosegundos consumidos por las pausas de recolección de elementos no usados (GC) desde que se inició Consul.<br>_Se muestra como nanosegundo_ |
| **consul.serf.coordinate.adjustment_ms.95percentile** <br>(gauge) | \[DogStatsD\] El p95 en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.coordinate.adjustment_ms.avg** <br>(gauge) | \[DogStatsD\] La media en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.coordinate.adjustment_ms.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.serf.coordinate.adjustment_ms|
| **consul.serf.coordinate.adjustment_ms.max** <br>(gauge) | \[DogStatsD\] El máximo en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.coordinate.adjustment_ms.median** <br>(gauge) | \[DogStatsD\] La mediana en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.coordinate.adjustment_ms.quantile** <br>(gauge) | \[Prometheus\] El cuantil en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.coordinate.adjustment_ms.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma en milisegundos para el ajuste de coordenadas del nodo<br>_Se muestra como milisegundo_ |
| **consul.serf.events** <br>(count) | \[DogStatsD\] \[Prometheus\] Esto se incrementa cuando un agent de Consul procesa un evento serf<br>_Se muestra como evento_ |
| **consul.serf.member.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] Se incrementa cuando un agent de Consul se marca como eliminado. Esto puede ser un indicador de agents sobrecargados, problemas de red o errores de configuración donde los agents no pueden conectarse entre sí en los puertos requeridos.|
| **consul.serf.member.flap** <br>(count) | \[DogStatsD\] \[Prometheus\] Número de veces que un agent de Consul es marcado como eliminado y luego se recupera rápidamente.|
| **consul.serf.member.join** <br>(count) | \[DogStatsD\] \[Prometheus\] Se incrementa cuando un agent de Consul procesa un evento de unión<br>_Se muestra como evento_ |
| **consul.serf.member.left** <br>(count) | \[DogStatsD\] \[Prometheus\] Se incrementa cuando un agent de Consul abandona el clúster.|
| **consul.serf.member.update** <br>(count) | \[DogStatsD\] \[Prometheus\] Esto se incrementa cuando un agent de Consul se actualiza.|
| **consul.serf.msgs.received.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el número de mensajes serf recibidos<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.received.avg** <br>(gauge) | \[DogStatsD\] La media del número de mensajes serf recibidos<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.received.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El recuento de mensajes serf recibido|
| **consul.serf.msgs.received.max** <br>(gauge) | \[DogStatsD\] El máximo de mensajes serf recibidos<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.received.median** <br>(gauge) | \[DogStatsD\] La mediana del número de mensajes serf recibidos<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.received.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el número de mensajes serf recibido<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.received.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma para el número de mensajes serf recibidos<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.avg** <br>(gauge) | \[DogStatsD\] La media del número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El recuento de mensajes serf enviados|
| **consul.serf.msgs.sent.max** <br>(gauge) | \[DogStatsD\] El máximo para el número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.median** <br>(gauge) | \[DogStatsD\] La mediana del número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.msgs.sent.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] La suma del número de mensajes serf enviados<br>_Se muestra como mensaje_ |
| **consul.serf.queue.event.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el tamaño de la cola de eventos serf|
| **consul.serf.queue.event.avg** <br>(gauge) | \[DogStatsD\] El tamaño medio de la cola de eventos serf|
| **consul.serf.queue.event.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de elementos en la cola de eventos serf.|
| **consul.serf.queue.event.max** <br>(gauge) | \[DogStatsD\] El tamaño máximo de la cola de eventos serf.|
| **consul.serf.queue.event.median** <br>(gauge) | \[DogStatsD\] El tamaño medio de la cola de eventos serf|
| **consul.serf.queue.event.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el tamaño de la cola de eventos serf.|
| **consul.serf.queue.intent.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el tamaño de la cola de intento de serf|
| **consul.serf.queue.intent.avg** <br>(gauge) | \[DogStatsD\] Tamaño medio de la cola de intentos de serf|
| **consul.serf.queue.intent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de elementos en la cola de intentos de serf.|
| **consul.serf.queue.intent.max** <br>(gauge) | \[DogStatsD\] Tamaño máximo de la cola de intentos de serf|
| **consul.serf.queue.intent.median** <br>(gauge) | \[DogStatsD\] El tamaño medio de la cola de intento de serf|
| **consul.serf.queue.intent.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el tamaño de la cola de intentos de serf.|
| **consul.serf.queue.query.95percentile** <br>(gauge) | \[DogStatsD\] El p95 para el tamaño de la cola de consulta de serf|
| **consul.serf.queue.query.avg** <br>(gauge) | \[DogStatsD\] El tamaño medio de la cola de consultas de serf|
| **consul.serf.queue.query.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de elementos en la cola de consulta de serf|
| **consul.serf.queue.query.max** <br>(gauge) | \[DogStatsD\] El tamaño máximo de la cola de consulta de serf.|
| **consul.serf.queue.query.median** <br>(gauge) | \[DogStatsD\] El tamaño medio de la cola de consultas de serf|
| **consul.serf.queue.query.quantile** <br>(gauge) | \[Prometheus\] El cuantil para el tamaño de la cola de consulta de serf|
| **consul.serf.snapshot.appendline.95percentile** <br>(gauge) | \[DogStatsD\] El p95 del tiempo que tarda el agent de Consul en añadir una entrada en el log existente.<br>_Se muestra como milisegundo_ |
| **consul.serf.snapshot.appendline.avg** <br>(gauge) | \[DogStatsD\] Promedio del tiempo que tarda el agent de Consul en añadir una entrada al log existente.<br>_Se muestra en milisegundos_ |
| **consul.serf.snapshot.appendline.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.serf.snapshot.appendline|
| **consul.serf.snapshot.appendline.max** <br>(gauge) | \[DogStatsD\] El tiempo máximo que tarda el agent de Consul en añadir una entrada al log existente.<br>_Se muestra en milisegundos_ |
| **consul.serf.snapshot.appendline.median** <br>(gauge) | \[DogStatsD\] La mediana del tiempo que tarda el agent de Consul en añadir una entrada al log existente.<br>_Se muestra en milisegundos_ |
| **consul.serf.snapshot.appendline.quantile** <br>(gauge) | \[Prometheus\] El cuantil del tiempo que tarda el agent de Consul en añadir una entrada en el log existente.<br>_Se muestra como milisegundo_ |
| **consul.serf.snapshot.compact.95percentile** <br>(gauge) | \[DogStatsD\] El p95 del tiempo que tarda el agent de Consul en compactar un log. Esta operación solo se produce cuando el snapshot se hace lo suficientemente grande como para justificar la compactación.<br>_Se muestra como milisegundo_ |
| **consul.serf.snapshot.compact.avg** <br>(gauge) | \[DogStatsD\] Promedio del tiempo que tarda el agent de Consul en compactar un log. Esta operación solo se produce cuando el snapshot es lo suficientemente grande como para justificar la compactación.<br>_Se muestra en milisegundos_ |
| **consul.serf.snapshot.compact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] El número de muestras de consul.serf.snapshot.compact|
| **consul.serf.snapshot.compact.max** <br>(gauge) | \[DogStatsD\] El tiempo máximo que tarda el agent de Consul en compactar un log. Esta operación solo se produce cuando el snapshot es lo suficientemente grande como para justificar la compactación.<br>_Se muestra como milisegundos_ |
| **consul.serf.snapshot.compact.median** <br>(gauge) | \[DogStatsD\] La mediana del tiempo que tarda el agent de Consul en compactar un log. Esta operación solo se produce cuando el snapshot es lo suficientemente grande como para justificar la compactación.<br>_Se muestra como milisegundos_ |
| **consul.serf.snapshot.compact.quantile** <br>(gauge) | \[Prometheus\] El cuantil del tiempo que tarda el agent de Consul en compactar un log. Esta operación solo se produce cuando el snapshot se hace lo suficientemente grande como para justificar la compactación.<br>_Se muestra como milisegundos_ |

Consulta el [socumento de telemetría de Consul](https://www.consul.io/docs/agent/telemetry.html) para una descripción de las métricas que el Agent de Consul envía a DogStatsD.

Consulta el [documento de coordenadas de red de Consul](https://www.consul.io/docs/internals/coordinates.html) para más detalles sobre cómo se calculan las métricas de latencia de red.

### Eventos

**consul.new_leader**:<br>
El Datadog Agent emite un evento cuando el clúster de Consul elige un nuevo líder y lo etiqueta con `prev_consul_leader`, `curr_consul_leader` y `consul_datacenter`.

### Checks de servicio

**consul.check**

Devuelve OK si el servicio está activo, WARNING si hay algún problema y CRITICAL cuando está caído.

_Estados: ok, warning, critical, unknown_

**consul.up**

Devuelve OK si el servidor consul está activo, CRITICAL en caso contrario.

_Estados: ok, critical_

**consul.can_connect**

Devuelve OK si el Agent puede realizar solicitudes HTTP a consul, CRITICAL en caso contrario.

_Estados: ok, critical_

**consul.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas; en caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de HCP Consulta con Datadog](https://docs.datadoghq.com/integrations/guide/hcp-consul)
- [Monitorización del estado y rendimiento de Consul con Datadog](https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog)
- [Consul en Datadog](https://engineering.datadoghq.com/consul-at-datadog)
- [Métricas clave para la monitorización de Consul](https://www.datadoghq.com/blog/consul-metrics/)
- [Herramientas de monitorización de Consul](https://www.datadoghq.com/blog/consul-monitoring-tools/)
- [Cómo monitorizar Consul con Datadog](https://www.datadoghq.com/blog/consul-datadog/)
- [Datadog CNM ahora admite la red de Consul](https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/)