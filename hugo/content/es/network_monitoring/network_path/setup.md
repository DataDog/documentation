---
description: Configurando Network Path
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtenga visibilidad de red de extremo a extremo con Network Path y el seguimiento
    de SD-WAN
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detectando la disponibilidad de aplicaciones usando Network Insights
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: Guía
  text: Variantes de traceroute de Network Path
is_beta: true
title: Configuración
---
## Descripción general {#overview}

Configurar Network Path implica configurar su entorno para monitorear y rastrear las rutas de red entre sus servicios y puntos de conexión. Esto ayuda a identificar cuellos de botella, problemas de latencia y posibles puntos de falla en su infraestructura de red. Network Path le permite configurar manualmente rutas de red individuales, descubrirlas automáticamente o usar ambos métodos simultáneamente, dependiendo de sus necesidades.

**Nota**: Si su configuración de red restringe el tráfico saliente, sigue las instrucciones de configuración en la documentación de [Configuración del proxy del Agent][2].

## Configuración {#setup}

<div class="alert alert-info">Esta página cubre la configuración de Network Path para la configuración basada en Agent en Network Monitoring. Para crear pruebas de Network Path en Synthetic Monitoring, consulte <a href="/synthetics/network_path_tests/">Pruebas de Network Path en Synthetic Monitoring</a>.</div>

Datadog proporciona dos métodos de recolección basados en Agent. Puede usar cualquiera de los métodos por sí solo o combinarlos ambos:

| Método | Cuándo usar |
|--------|-------------|
| **[Pruebas programadas&nbsp;](#scheduled-tests)** | Monitorice pares específicos de fuente-destino que defina en la configuración del Agent. Mejor para rastrear un conjunto conocido de puntos de conexión, como APIs críticas o servicios de socios. |
| **[Pruebas dinámicas](#dynamic-tests)** | Descubre y monitorea automáticamente rutas basadas en el tráfico observado por [Cloud Network Monitoring][1]. Mejor para una visibilidad amplia sin listar manualmente cada destino. |

### Pruebas programadas {#scheduled-tests}

Puede monitorear rutas específicas de Network Path definiéndolas en el archivo de configuración del Agent ubicado en `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

Para comenzar, copie la [configuración de ejemplo][5], elimine la extensión `.example` y actualícela con la configuración deseada, o utilice una de las configuraciones específicas del entorno a continuación. Para optimización del rendimiento en entornos grandes, consulte [aumentar el número de trabajadores](#increase-the-number-of-workers).

{{< tabs >}}
{{% tab "Linux" %}}

Se requiere el Agent `v7.59+`.

1. Habilite el módulo `system-probe` traceroute en `/etc/datadog-agent/system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para monitorear nuevos destinos desde este Agent creando o editando el archivo `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Reinicie el Agent después de realizar estos cambios de configuración para comenzar a ver las rutas de red.

{{% /tab %}}
{{% tab "macOS" %}}

Se requiere el Agent `v7.75+`.

1. Habilite el módulo `system-probe` traceroute en `/opt/datadog-agent/etc/system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para monitorear nuevos destinos desde este Agent creando o editando el archivo `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml`:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"

    ```

3. Reinicie el Agent después de realizar estos cambios de configuración para comenzar a ver las rutas de red.

{{% /tab %}}
{{% tab "Windows" %}}

Se requiere el Agent `v7.72+`.

1. Habilite el módulo `system-probe` traceroute en `%ProgramData%\Datadog\system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para monitorear nuevos destinos desde este Agent creando o editando el archivo `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml`:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds, default 60 seconds
   instances:
     # configure the endpoints you want to monitor, one check instance per endpoint
     # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

     - hostname: api.datadoghq.eu # endpoint hostname or IP
       protocol: TCP
       port: 443
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
       min_collection_interval: 120 # set min_collection_interval at the instance level
     ## optional configs:
     # max_ttl: 30 # max traceroute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s
     # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack, syn_socket (Windows only)
     # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
     # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: TCP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

  3. Reinicie el Agent después de realizar estos cambios de configuración para comenzar a ver las rutas de red.

{{% /tab %}}
{{% tab "Helm" %}}

Se requiere el Agent `v7.59+`.

<div class="alert alert-info">Se requiere Helm chart v3.109.1+. Para más información, consulte la <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">documentación de Datadog Helm Chart</a> y la documentación <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">para Kubernetes e Integrations.</a></div>

Para habilitar Network Path con Kubernetes usando Helm, agregue lo siguiente a su `values.yaml` archivo.

  ```yaml
  datadog:
    traceroute:
      enabled: true
    confd:
      network_path.yaml: |-
        init_config:
          min_collection_interval: 60 # in seconds, default 60 seconds
        instances:
          # configure the endpoints you want to monitor, one check instance per endpoint
          # warning: Do not set the port when using UDP. Setting the port when using UDP can cause traceroute calls to fail and falsely report an unreachable destination.

          - hostname: api.datadoghq.eu # endpoint hostname or IP
            protocol: TCP
            port: 443
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
            min_collection_interval: 120 # set min_collection_interval at the instance level
          ## optional configs:
          # max_ttl: 30 # max traceroute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s
          # tcp_method: syn # TCP probing method, default is syn, options: syn, sack, prefer_sack
          # traceroute_queries: 3 # number of traceroutes to send per check run, default is 3
          # e2e_queries: 50 # number of end-to-end probes to send per check run, default is 50

          # more endpoints
          - hostname: 1.1.1.1 # endpoint hostname or IP
            protocol: UDP
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"

```

{{% /tab %}}
{{% tab "Autodiscovery (Kubernetes)" %}}
Datadog Autodiscovery allows you to enable Network Path on a per-service basis through Kubernetes annotations. 

<div class="alert alert-info">Helm chart v3.109.1+ is required. For more information, see the <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">Datadog Helm Chart documentation</a>.</div>

1. Enable the traceroute module in the Datadog `values.yaml` file, which the Network Path integration depends on.

   ```yaml
   datadog:
     traceroute:
       enabled: true

2. After the module is enabled, Datadog automatically detects Network Path annotations added to your Kubernetes pod. For more information, see [Kubernetes and Integrations][2].

   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_NAME>.checks: |
         {
           "network_path": {
             "init_config": {
               "min_collection_interval": 300
             },
             "instances": [
                   {
                     "protocol": "TCP",
                     "port": 443,
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "api.datadoghq.eu"
                   },
                   {
                     "protocol": "UDP",
                     "source_service": "<CONTAINER_NAME>",
                     "tags": [
                       "tag_key:tag_value",
                       "tag_key2:tag_value2"
                     ],
                     "hostname": "1.1.1.1"
                   },
             ]
           }
         }
       # (...)
   spec:
     containers:
       - name: '<CONTAINER_NAME>'
   # (...)
   ```
    If you define pods indirectly (with deployments, ReplicaSets, or ReplicationControllers), add pod annotations under `spec.template.metadata`.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=annotations#configuration

{{% /tab %}}
{{< /tabs >}}

#### Increase the number of workers 

Network Path monitoring for individual paths runs as an Agent Integration. The number of concurrent workers is controlled by the `check_runners` setting in the `datadog.yaml` file.

To increase the number of workers, add the following configuration to your `datadog.yaml` file:

```yaml
## @param check_runners - integer - optional - default: 4
## @env DD_CHECK_RUNNERS - integer - optional - default: 4
## The `check_runners` refers to the number of concurrent check runners available for check instance execution.
## The scheduler attempts to spread the instances over the collection interval and will _at most_ be
## running the number of check runners instances concurrently.
##
## The level of concurrency has effects on the Agent's: RSS memory, CPU load, resource contention overhead, etc.
#
check_runners: <NUMBER_OF_WORKERS>
```

### Dynamic tests 

**Prerequisites**: [CNM][1] must be enabled.

Configure dynamic tests to allow the Agent to automatically discover and monitor network paths based on actual network traffic, eliminating the need to manually configure individual endpoints. See [filter syntax](#filter-syntax) to include/exclude domain or IPs.

{{< tabs >}}
{{% tab "Linux" %}}

Se requiere el Agent `v7.73+`.

1. Habilite el módulo `system-probe` traceroute en `/etc/datadog-agent/system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para monitorear CNM connections creando o editando el archivo `/etc/datadog-agent/datadog.yaml`:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include

    ```

3. Reinicie el Agent después de realizar estos cambios de configuración para comenzar a ver las rutas de red.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Se requiere el Agent `v7.73+`.

1. Habilite el módulo `system-probe` traceroute en `%ProgramData%\Datadog\system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para monitorear CNM connections creando o editando el archivo `%ProgramData%\Datadog\datadog.yaml`:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    For full configuration details, reference the [example config][3], or use the following:

    ```yaml
    network_path:
      connections_monitoring:
        ## @param enabled - bool - required - default:false
        ## Enable network path collection
        #
        enabled: true
      collector:
        ## @param workers - int - optional - default:4
        ## Number of workers that can collect paths in parallel
        ## Recommendation: leave at default
        #
        # workers: <NUMBER OF WORKERS> # default 4

        #@env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 10m
        # The `pathtest_interval` refers to the traceroute run interval for monitored connections.
        # pathtest_interval: 10m

        # @param pathtest_ttl - integer - optional - default: 35m
        # @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
        # The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
        # The TTL is reset each time the connection is seen again.
        # pathtest_ttl: 35m

        ## @param filters - list - optional
        ## Include or exclude specific domains or IP ranges from dynamic monitoring.
        ## Filters are applied sequentially, with later filters taking precedence.
        ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
        #
        # filters:
        #   - match_domain: '*.example.com'
        #     type: exclude
        #   - match_ip: 10.0.0.0/8
        #     type: exclude
        #   - match_domain: 'api.datadoghq.com'
        #     type: include
    ```

3. Reinicie el Agent después de realizar estos cambios de configuración para comenzar a ver las rutas de red.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Helm" %}}

Se requiere el Agent `v7.73+`.

Para habilitar Network Path con Kubernetes usando Helm, agregue lo siguiente a su `values.yaml` archivo.
**Nota:** Se requiere Helm chart v3.124.0+. Para más información, consulte la [documentación de Datadog Helm Chart][1] y la documentación para [Kubernetes e Integrations][2].

```yaml
datadog:
  networkPath:
    connectionsMonitoring:
      enabled: true
  ## Set to true to enable the Traceroute Module of the System Probe
  traceroute:
    enabled: true

  ## @param collector - custom object - optional
  ## Configuration related to Network Path Collector.
  #
  collector:
    ## @param workers - integer - optional - default: 4
    ## @env DD_WORKERS - integer - optional - default: 4
    ## The `workers` refers to the number of concurrent workers available for network path execution.
    #
    # workers: 4
    
    ## @param pathtest_interval - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_INTERVAL - integer - optional - default: 30m
    ## The `pathtest_interval` refers to the traceroute run interval for monitored connections.
    #
    # pathtest_interval: 30m

    ## @param pathtest_ttl - integer - optional - default: 35m
    ## @env DD_NETWORK_PATH_COLLECTOR_PATHTEST_TTL - integer - optional - default: 35m
    ## The `pathtest_ttl` refers to the duration (time-to-live) a connection will be monitored when it's not seen anymore.
    ## The TTL is reset each time the connection is seen again.
    #
    # pathtest_ttl: 35m

    ## @param filters - list - optional
    ## Include or exclude specific domains or IP ranges from dynamic monitoring.
    ## Filters are applied sequentially, with later filters taking precedence.
    ## See the "Filter syntax" section for details and examples: https://docs.datadoghq.com/network_monitoring/network_path/setup/#filter-syntax
    #
    # filters:
    #   - match_domain: '*.example.com'
    #     type: exclude
    #   - match_ip: 10.0.0.0/8
    #     type: exclude
    #   - match_domain: 'api.datadoghq.com'
    #     type: include

```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=helm#configuration


{{% /tab %}}
{{< /tabs >}}

#### Sintaxis de filtro {#filter-syntax}

Configure filtros para incluir o excluir dominios e IPs, permitiéndole:

- Reducir la sobrecarga de monitoreo para redes internas
- Enfocar en patrones de tráfico externos
- Excluir rangos de infraestructura conocidos que no requieren monitoreo

Para incluir o excluir dominios específicos o rangos de IP de pruebas dinámicas, agregue lo siguiente a su `/etc/datadog-agent/datadog.yaml` archivo:

```yaml
network_path:
  connections_monitoring:
    enabled: true
  collector:
    filters:
      # exclude single domain
      - match_domain: 'api.slack.com'
        type: exclude

      # exclude domain using `*` wildcard
      - match_domain: '*.datadoghq.com'      # this translates to regex '.*\.datadoghq\.com
        type: exclude
      - match_domain: '*.zoom.us'
        match_domain_strategy: wildcard      # use simple wildcard matching (wildcard matching is the default)
        type: exclude

      # exclude single IP or using CIDR notation
      - match_ip: 10.10.10.10
        type: exclude
      - match_ip: 10.20.0.0/24
        type: exclude

      # exclude using regex
      - match_domain: '.*\.zoom\.us'
        match_domain_strategy: regex         # use regex matching strategy
        type: exclude

      # include
      - match_domain: 'api.datadoghq.com'
        type: include
```

**Nota**: 
Los filtros se aplican secuencialmente, con los filtros posteriores teniendo prioridad sobre los anteriores.

Por ejemplo, todos los dominios que coincidan con `*.datadoghq.com` son ignorados, excepto `api.datadoghq.com`.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### Resolución de IP pública de origen {#source-public-ip-resolution}

<div class="alert alert-info">Source public IP resolution is available in Agent v7.75+.</div>

La Ruta de Red resuelve la dirección IP pública del servidor de origen para proporcionar una visualización precisa del camino para el tráfico destinado a Internet. El Agente contacta servicios externos de verificación de IP a través de HTTPS para determinar la IP pública del servidor.

Esta función **no es necesaria** para que Network Path funcione. Si estos servicios no son accesibles, Network Path continúa operando normalmente, pero la IP pública de origen no se resuelve y las visualizaciones de ruta no muestran los metadatos de la IP de origen.

Si su red restringe el tráfico saliente y desea la resolución de la IP pública de origen, agregue las siguientes URL a la lista de permitidos de su firewall:

| URL | Proveedor |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

El Agent intenta cada servicio en orden y utiliza la primera respuesta exitosa. Todas las solicitudes se realizan a través de HTTPS (puerto 443).

## Solución de problemas {#troubleshooting}

Utilice las siguientes pautas para solucionar problemas con Network Path. Si necesita ayuda adicional, contacte a [Soporte de Datadog][3].

### No hay datos de Network Path en la interfaz de usuario {#no-network-path-data-in-the-ui}

Si no aparece ningún dato en la interfaz de usuario de [Network Path][4], es posible que la función no esté completamente habilitada. Network Path requiere lo siguiente:

1. El módulo de traceroute debe estar habilitado en su `system-probe.yaml` archivo:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Al menos una función de Network Path debe estar activa, como por ejemplo:

   - [Rutas individuales](#monitor-individual-paths) configuradas a través del archivo `conf.d/network_path.d`.
   - Rutas de tráfico de [red experimentales](#network-traffic-paths-experimental) configuradas al habilitar tanto `network_path.connections_monitoring` como [Cloud Network Monitoring][1](CNM).

### Error: código de estado: 404 {#error-status-code-404}

Si encuentra un error como el siguiente:

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - Esto indica que el módulo de traceroute no está habilitado. Asegúrese de que el módulo de traceroute esté habilitado en su `system-probe.yaml` archivo.



## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/es/agent/configuration/proxy/?tab=linux
[3]: /es/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[15]: /es/synthetics/network_path_tests/