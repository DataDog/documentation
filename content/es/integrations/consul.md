---
app_id: consul
app_uuid: d0b52e9d-6594-4ff5-9b66-800943f75756
assets:
  dashboards:
    consul: assets/dashboards/consul_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: consul.peers
      metadata_path: metadata.csv
      prefix: consul.
    process_signatures:
    - consul agent
    - consul_agent
    - consul-agent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 122
    source_type_name: Consul
  monitors:
    consul service status: assets/monitors/consul_status.json
  saved_views:
    consul_errors: assets/saved_views/consul_errors.json
    consul_overview: assets/saved_views/consul_overview.json
    consul_processes: assets/saved_views/consul_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
- network
- notifications
- orchestration
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul/README.md
display_on_public_website: true
draft: false
git_integration_title: consul
integration_id: consul
integration_title: Consul
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: consul
public_title: Consul
short_description: Alerta sobre los controles de estado de Consul, consulta las asignaciones
  de servicio a nodo y mucho más.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuración y despliegue
  - Category::Contenedores
  - Category::Recopilación de logs
  - Category::Red
  - Category::Notificaciones
  - Category::Orquestación
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::integración
  configuration: README.md#Configuración
  description: Alerta sobre los controles de estado de Consul, consulta las asignaciones
    de servicio a nodo y mucho más.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/guide/hcp-consul
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
  - resource_type: blog
    url: https://www.datadoghq.com/blog/engineering/consul-at-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/consul-metrics/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/consul-monitoring-tools/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/consul-datadog/
  support: README.md#Soporte
  title: Consul
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Consul Dash][1]

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

Y mucho más.

Por último, además de las métricas, el Datadog Agent también envía un check de servicio para cada uno de los checks de estado de Consul y un evento después de cada nueva elección de líder.

## Configuración

### Instalación

El check de Consul está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus nodos de Consul.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `consul.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1] para empezar a recopilar tus métricas de Consul. Para ver todas las opciones disponibles de configuración, consulta el [ejemplo consul.d/conf.yaml][2].

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

2. [Reinicia el Agent][3].

###### OpenMetrics

Opcionalmente, puedes habilitar la opción de configuración `use_prometheus_endpoint` para obtener un conjunto adicional de métricas del endpoint de Prometheus para Consul.

**Nota**: Utiliza el método DogStatsD o Prometheus; no habilites ambos para la misma instancia.

1. Configura Consul para exponer métricas al endpoint de Prometheus. Establece [`prometheus_retention_time`][4] anidado bajo la clave `telemetry` de nivel superior del archivo de configuración principal de Consul:

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Edita el archivo `consul.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][1] para empezar a usar el endpoint de Prometheus.
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [Reinicia el Agent][3].

##### DogStatsD

En lugar de utilizar el endpoint de Prometheus, puedes configurar Consul para enviar el mismo conjunto de métricas adicionales al Agent a través de [DogStatsD][5].

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

2. Actualiza el [archivo de configuración principal del Datadog Agent][6] `datadog.yaml` añadiendo las siguientes configuraciones para garantizar que las métricas estén etiquetadas correctamente:

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

3. [Reinicia el Agent][3].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

2. Edita este bloque de configuración en tu archivo `consul.yaml` para recopilar logs de Consul:

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.
   Para conocer todas las opciones de configuración disponibles, consulta el [consul.d/conf.yaml de ejemplo][2].

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[5]: https://docs.datadoghq.com/es/developers/dogstatsd/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | en blanco o `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<SERVICE_NAME>"}` |


[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `consul` en la sección Checks.

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
{{< get-metrics-from-git "consul" >}}


Consulta el [documento de telemetría del Consul][4] para obtener una descripción de las métricas que el Consul Agent envía a DogStatsD.

Consulta el [documento de coordenadas de red de Consul][5] para obtener detalles sobre cómo se calculan las métricas de latencia de red.

### Eventos

**consul.new_leader**:<br>
El Datadog Agent emite un evento cuando el clúster de Consul elige un nuevo líder y lo etiqueta con `prev_consul_leader`, `curr_consul_leader` y `consul_datacenter`.

### Checks de servicio
{{< get-service-checks-from-git "consul" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de HCP Consul con Datadog][7]
- [Monitorizar el estado y el rendimiento de Consul con Datadog][8]
- [Consul en Datadog][9]
- [Métricas clave para monitorizar Consul][10]
- [Herramientas de monitorización de Consul][11]
- [Cómo monitorizar Consul con Datadog][12]
- [Datadog NPM ya es compatible con la red Consul][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/es/help/
[7]: https://docs.datadoghq.com/es/integrations/guide/hcp-consul
[8]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[9]: https://engineering.datadoghq.com/consul-at-datadog
[10]: https://www.datadoghq.com/blog/consul-metrics/
[11]: https://www.datadoghq.com/blog/consul-monitoring-tools/
[12]: https://www.datadoghq.com/blog/consul-datadog/
[13]: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/