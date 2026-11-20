---
description: Configuración de Network Path
further_reading:
- link: https://www.datadoghq.com/blog/datadog-network-path-monitoring/
  tag: Blog
  text: Obtenga visibilidad completa de la red de extremo a extremo con Network Path
    y haga un seguimiento de SD-WAN.
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de disponibilidad de aplicaciones mediante Network Insights
- link: /network_monitoring/network_path/guide/traceroute_variants/
  tag: Guía
  text: Variantes de traceroute de Network Path
is_beta: true
title: Configuración
---
## Descripción general {#overview}

La configuración de Network Path implica configurar su entorno para hacer un seguimiento y trazar las rutas de red entre sus servicios y puntos finales. Esto ayuda a identificar cuellos de botella, problemas de latencia y posibles puntos de falla en su infraestructura de red. Network Path le permite configurar manualmente rutas de red individuales, descubrirlas automáticamente o utilizar ambos métodos simultáneamente, según sus necesidades.

**Nota**: Si su configuración de red restringe el tráfico saliente, siga las instrucciones de configuración en la documentación de [Configuración de proxy del Agent][2].

## Configuración {#setup}

<div class="alert alert-info">Esta página cubre la configuración de Network Path para la configuración basada en el Agent en Network Monitoring. Para crear pruebas de Network Path en Synthetic Monitoring, consulte <a href="/synthetics/network_path_tests/">Network Path Testing in Synthetic Monitoring</a>.</div>

Datadog proporciona tres métodos de recopilación basados en el Agent. Puede utilizar un método por sí solo o combinar varios métodos:

| Método | Cuándo utilizarlo |
|--------|-------------|
| **[Pruebas programadas](#scheduled-tests)** | Haga un seguimiento de pares específicos de fuente-destino que usted defina en la configuración del Agent. Ideal para realizar un seguimiento de un conjunto conocido de puntos finales, como API críticas o servicios de socios. |
| **[Pruebas dinámicas](#dynamic-tests)** | Descubra y haga un seguimiento de rutas automáticamente según el tráfico observado por [Cloud Network Monitoring][1]. Ideal para una visibilidad amplia sin tener que enumerar manualmente cada destino. |
| **[Pruebas dinámicas para NetFlow](#dynamic-tests-for-netflow-experimental)** | Ejecute automáticamente pruebas de Network Path desde el servidor del Agent a las IP de destino observadas en [NetFlow Monitoring][6]. Ideal para agregar visibilidad de rutas salto a salto al tráfico de NetFlow sin configurar manualmente destinos individuales. |

### Pruebas programadas {#scheduled-tests}

Puede hacer un seguimiento de rutas de red específicas definiéndolas en el archivo de configuración del Agent ubicado en `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`.

Para comenzar, copie la [configuración de ejemplo][5], elimine la extensión `.example` y actualícela con la configuración deseada, o utilice una de las configuraciones específicas del entorno a continuación. Para la optimización del rendimiento en entornos grandes, consulte [aumentar el número de trabajadores](#increase-the-number-of-workers).

{{< tabs >}}
{{% tab "Linux" %}}

Se requiere el Agent `v7.59+`.

1. Habilite el módulo de traceroute `system-probe` en `/etc/datadog-agent/system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para hacer un seguimiento de nuevos destinos desde este Agent creando o editando el archivo `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`:

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

1. Habilite el módulo de traceroute `system-probe` en `/opt/datadog-agent/etc/system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para hacer un seguimiento de nuevos destinos desde este Agent creando o editando el archivo `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml`:

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

1. Habilite el módulo de traceroute `system-probe` en `%ProgramData%\Datadog\system-probe.yaml` agregando lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para hacer un seguimiento de nuevos destinos desde este Agent creando o editando el archivo `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml`:

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

<div class="alert alert-info">Se requiere Helm chart v3.109.1+. Para obtener más información, consulte la <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md">documentación de Datadog Helm Chart</a> y la documentación <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=helm#configuration">para Kubernetes y Integrations.</a></div>

Para habilitar Network Path con Kubernetes usando Helm, agregue lo siguiente a su archivo `values.yaml`.

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
   ```

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

1. Habilite el módulo de traceroute `system-probe` en `/etc/datadog-agent/system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para hacer un seguimiento de las conexiones CNM creando o editando el archivo `/etc/datadog-agent/datadog.yaml`:

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

[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example

{{% /tab %}}
{{% tab "Windows" %}}

Se requiere el Agent `v7.73+`.

1. Habilite el módulo de traceroute `system-probe` en `%ProgramData%\Datadog\system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite `network_path` para hacer un seguimiento de las conexiones CNM creando o editando el archivo `%ProgramData%\Datadog\datadog.yaml`:

   <div class="alert alert-info">Si habilita Network Path en <a href="/infrastructure/end_user_device_monitoring/">dispositivos de usuario final</a>, omita este paso.</div>

   ```yaml
   network_path:
     connections_monitoring:
       enabled: true
     # collector:
       # workers: <NUMBER OF WORKERS> # default 4
   ```

   Para obtener detalles completos de configuración, consulte la [configuración de ejemplo][3] o utilice lo siguiente:

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

[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example

{{% /tab %}}
{{% tab "Helm" %}}

Se requiere el Agent `v7.73+`.

Para habilitar Network Path con Kubernetes usando Helm, agregue lo siguiente a su archivo `values.yaml`.
**Nota:** Se requiere Helm chart v3.124.0+. Para obtener más información, consulte la [documentación de Datadog Helm Chart][1] y la documentación de [Kubernetes and Integrations][2].

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

### Pruebas dinámicas para NetFlow (experimentales) {#dynamic-tests-for-netflow-experimental}

<div class="alert alert-info">Las pruebas dinámicas para NetFlow son experimentales y requieren el Agent <code>v7.81+</code>. Para habilitar esta función, comuníquese con el equipo de soporte de Datadog o con su equipo de cuenta.</div>

Configure las pruebas dinámicas para NetFlow para ejecutar pruebas de Network Path desde el servidor del Agent hasta las IP de destino observadas en los registros de NetFlow. Las pruebas dinámicas para NetFlow no requieren [Cloud Network Monitoring][1] o `network_path.connections_monitoring.enabled`.

Las pruebas dinámicas para NetFlow se ejecutan desde el Datadog Agent que recopila el tráfico de NetFlow. No se ejecutan desde el exportador de NetFlow, el enrutador o la fuente original. Implemente el Agent lo suficientemente cerca de las fuentes de flujo observadas para que los traceroutes desde ese Agente representen las rutas que desea investigar.

**Requisitos previos**:

- [NetFlow Monitoring][6] debe estar configurado y recibiendo flujos.
- Se requiere el Agent `v7.81+`.

{{< tabs >}}
{{% tab "Linux" %}}

1. Habilite el módulo de traceroute `system-probe` en `/etc/datadog-agent/system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite las pruebas dinámicas para NetFlow en `/etc/datadog-agent/datadog.yaml`:

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` es necesario porque las pruebas dinámicas para NetFlow tienen como objetivo las direcciones IP de destino observadas y el recopilador de Network Path omite los destinos que solo tienen IP de forma predeterminada.

3. Reinicie el Agent después de realizar estos cambios de configuración.

{{% /tab %}}
{{% tab "Windows" %}}

1. Habilite el módulo de traceroute `system-probe` en `%ProgramData%\Datadog\system-probe.yaml` agregando lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilite las pruebas dinámicas para NetFlow en `%ProgramData%\Datadog\datadog.yaml`:

   ```yaml
   network_path:
     netflow_monitoring:
       enabled: true
     collector:
       monitor_ip_without_domain: true
   ```

   `monitor_ip_without_domain: true` es necesario porque las pruebas dinámicas para NetFlow tienen como objetivo las direcciones IP de destino observadas y el recopilador de Network Path omite los destinos que solo tienen IP de forma predeterminada.

3. Reinicie el Agent después de realizar estos cambios de configuración.

{{% /tab %}}
{{< /tabs >}}

Después de que el Agent informe las rutas, abra la interfaz de usuario de [Network Path][4] y filtre por `origin:netflow` para ver las rutas generadas a partir del tráfico de NetFlow.

### Sintaxis de filtro {#filter-syntax}

Configure filtros para incluir o excluir dominios e IPs, lo que le permite:

- Reduzca la sobrecarga de monitoreo para redes internas
- Concéntrese en los patrones de tráfico externo
- Excluya los rangos de infraestructura conocidos que no requieren monitoreo

La misma lista `network_path.collector.filters` se aplica a las pruebas dinámicas y a las Pruebas dinámicas para NetFlow. Para las Pruebas dinámicas para NetFlow, utilice filtros `match_ip` porque las Pruebas dinámicas para NetFlow se dirigen a las direcciones IP de destino observadas.

Para incluir o excluir dominios o rangos de IP específicos de las pruebas dinámicas, agregue lo siguiente a su archivo `/etc/datadog-agent/datadog.yaml`:

```yaml
network_path:
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
Los filtros se aplican de forma secuencial, y los filtros posteriores tienen prioridad sobre los anteriores.

Por ejemplo, todos los dominios que coinciden con `*.datadoghq.com` se ignoran, excepto `api.datadoghq.com`.

```yaml
network_path:
  collector:
    filters:
      - match_domain: '*.datadoghq.com'
        type: exclude
      - match_domain: 'api.datadoghq.com'
        type: include
```

### Resolución de IP pública de fuente {#source-public-ip-resolution}

<div class="alert alert-info">La resolución de IP pública de fuente está disponible en el Agent v7.75+.</div>

Network Path resuelve la dirección IP pública del servidor de fuente para proporcionar una visualización precisa de la ruta para el tráfico con destino a internet. El Agent contacta servicios externos de verificación de IP a través de HTTPS para determinar la IP pública del servidor.

Esta función **no es necesaria** para que Network Path funcione. Si estos servicios no están accesibles, Network Path continúa operando normalmente, pero la IP pública de fuente no se resuelve y las visualizaciones de ruta no muestran los metadatos de la IP de fuente.

Si su red restringe el tráfico saliente y desea la resolución de IP pública de fuente, agregue las siguientes URL a la lista de permitidos de su firewall:

| URL | Proveedor |
|-----|----------|
| `https://icanhazip.com` | Cloudflare |
| `https://ipinfo.io/ip` | IPinfo |
| `https://checkip.amazonaws.com` | Amazon |
| `https://api.ipify.org` | ipify |
| `https://whatismyip.akamai.com` | Akamai |

El Agent intenta cada servicio en orden y utiliza la primera respuesta exitosa. Todas las solicitudes se realizan a través de HTTPS (puerto 443).

## Solución de problemas {#troubleshooting}

Utilice las siguientes pautas para solucionar problemas con Network Path. Si necesita ayuda adicional, comuníquese con el [Datadog Support][3].

### No hay datos de Network Path en la UI {#no-network-path-data-in-the-ui}

Si no aparecen datos en la [Network Path][4] UI, es posible que la función no esté completamente habilitada. Network Path requiere lo siguiente:

1. El módulo de traceroute debe estar habilitado en su archivo `system-probe.yaml`:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Al menos una función de Network Path debe estar activa, como:

   - [Pruebas programadas](#scheduled-tests) configuradas a través del archivo `conf.d/network_path.d`.
   - [Pruebas dinámicas](#dynamic-tests) configuradas al habilitar tanto `network_path.connections_monitoring.enabled` como [Cloud Network Monitoring][1].
   - [Pruebas dinámicas para NetFlow](#dynamic-tests-for-netflow-experimental) configuradas al habilitar `network_path.netflow_monitoring.enabled` y [NetFlow Monitoring][6].

### No hay datos de pruebas dinámicas para NetFlow en la UI {#no-dynamic-tests-for-netflow-data-in-the-ui}

Si no aparecen rutas con `origin:netflow` en la [Network Path][4] UI, verifique lo siguiente:

1. El Agent es de la versión `7.81+`.
2. [NetFlow Monitoring][6] está habilitado y recibiendo flujos.
3. El módulo de traceroute está habilitado en `system-probe.yaml`.
4. `network_path.netflow_monitoring.enabled` y `network_path.collector.monitor_ip_without_domain` están configurados en `true` en `datadog.yaml`.
5. Su configuración de `network_path.collector.filters` no excluye las IP de destino que espera hacer un seguimiento.

Las pruebas dinámicas para NetFlow omiten automáticamente los registros de NetFlow cuya IP de fuente está asignada al servidor del Agent antes de que se evalúen los filtros de destino. Esto evita bucles de auto-programación y es un comportamiento esperado. Para casos de NAT o alias donde el tráfico originado por el Agent aparece desde otra IP de fuente, use `network_path.collector.source_excludes` para excluir esas IP de fuente.

Luego, filtre la UI de Network Path para `origin:netflow`.

### Error: código de estado: 404 {#error-status-code-404}

Si encuentra un error como el siguiente:

   ```text
   Error: failed to trace path: traceroute request failed: Probe Path <path>, url: <url>, status code: 404
   ```

   - Esto indica que el módulo de traceroute no está habilitado. Asegúrese de que el módulo de traceroute esté habilitado en su archivo `system-probe.yaml`.



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/setup/
[2]: /es/agent/configuration/proxy/?tab=linux
[3]: /es/help
[4]: https://app.datadoghq.com/network/path
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example
[6]: /es/network_monitoring/netflow/
[15]: /es/synthetics/network_path_tests/