---
description: Configuración de Network Path
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentación
  text: Más información sobre la vista de lista en Network Path
- link: /network_monitoring/network_path/path_view
  tag: Documentación
  text: Más información sobre la Vista de ruta en la Ruta de red
is_beta: true
title: Ajustes
---

<div class="alert alert-info">Network Path para Datadog Cloud Network Monitoring tiene disponibilidad limitada. Ponte en contacto con tu representante de Datadog para inscribirte y, a continuación, utiliza las siguientes instrucciones para configurar el Datadog Agent para recopilar datos de Network Path.</div>

## Información general

Configurar Network Path implica configurar tu entorno Linux para monitorizar y rastrear las rutas de red entre tus servicios y los endpoints. Esto ayuda a identificar cuellos de botella, problemas de latencia y posibles puntos de fallo en tu infraestructura de red. Network Path te permite configurar manualmente de rutas red individuales o detectarlas automáticamente, dependiendo de tus necesidades.

## Requisitos previos

[CNM][1] debe estar activado.

**Nota**: Si tu configuración de red restringe el tráfico saliente, sigue las instrucciones de configuración en la documentación de [configuración del proxy del Agent][2].

## Configuración

### Monitorizar rutas individuales

{{< tabs >}}
{{% tab "Linux" %}}

Se requiere el Agent `v7.59+`.

Configura manualmente rutas individuales especificando el endpoint exacto que quieres probar. Esto te permite apuntar a rutas de red específicas para la monitorización.

1. Habilita el módulo `system-probe` traceroute en `/etc/datadog-agent/system-probe.yaml` añadiendo lo siguiente:

   ```
   traceroute:
     enabled: true
   ```

2. Habilita `network_path` para monitorizar nuevos destinos desde este Agent, creando o editando el archivo `/etc/datadog-agent/conf.d/network_path.d/conf.yaml`:

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
     ## optional configs:
     # max_ttl: 30 # max traderoute TTL, default is 30
     # timeout: 1000 # timeout in milliseconds per hop, default is 1s

     # more endpoints
     - hostname: 1.1.1.1 # endpoint hostname or IP
       protocol: UDP
       tags:
         - "tag_key:tag_value"
         - "tag_key2:tag_value2"
    ```

   Para ver todos los detalles de configuración, consulta el [ejemplo de configuración][4] o utiliza lo siguiente:

   ```yaml
   init_config:
    ## @param min_collection_interval - int - optional - default:60
     ## Interval between each traceroute runs for each destination.
     # min_collection_interval: <interval_in_seconds>

   instances:
     ## @param hostname - string - required
     ## Hostname or IP of the destination endpoint to monitor.
     ## Traceroute will be run against this endpoint with a sequence of different TTL.
     #
     - hostname: <HOSTNAME_OR_IP>

     ## @param port - integer - optional - default:<RANDOM PORT>
     ## The port of the destination endpoint.
     ## For UDP, we do not recommend setting the port since it can make probes less reliable.
     ## By default, the port is random.
     #
     # port: <PORT>

     ## @param max_ttl - integer - optional - default:30
     ## The maximum traceroute TTL used during path collection.
     #
     # max_ttl: 30

     ## @param timeout - integer - optional - default:1000
     ## Specifies how much time in milliseconds the traceroute should
     ## wait for a response from each hop before timing out.
     #
     # timeout: 1000

     ## @param min_collection_interval - integer - optional - default:60
     ## Interval between each traceroute runs for each destination.
     # min_collection_interval: <interval_in_seconds>
     ## @param source_service - string - optional
     ## Source service name.
     #
     # source_service: <SOURCE_SERVICE>

     ## @param destination_service - string - optional
     ## Destination service name.
     #
     # destination_service: <DESTINATION_SERVICE>

     ## @param tags - list of strings - optional
     ## A list of tags to attach to every metric and service check emitted by this instance.
     ##
     ## Learn more about tagging at https://docs.datadoghq.com/tagging
     #
     # tags:
     #   - <KEY_1>:<VALUE_1>
     #   - <KEY_2>:<VALUE_2>
   ```

3. Para empezar a ver las rutas de red, reinicia el Agent después de realizar estos cambios de configuración.

[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/network_path.d/conf.yaml.example

{{% /tab %}}
{{% tab "Windows" %}}

Se requiere el Agent `v7.61+`.

**Nota**: Windows sólo admite traceroutes TCP.

En entornos Windows, el Agent utiliza UDP por defecto para monitorizar rutas individuales. Si no se especifica el protocolo en la configuración, el Agent intenta un traceroute UDP y se registran todos los errores. Para evitarlo, asegúrate de que el protocolo está configurado como TCP. Por ejemplo:

```yaml
init_config:
  min_collection_interval: 60 # in seconds, default 60 seconds
instances:
  - hostname: api.datadoghq.eu # endpoint hostname or IP
    protocol: TCP
    port: 443 # optional port number, default is 80
```
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar Network Path con Kubernetes utilizando Helm, añade lo siguiente a tu archivo `values.yaml`.</br>
**Nota:** **Se requiere** Helm chart v3.109.1 o posterior. Para obtener más información, consulta la [documentación de Helm Chart de Datadog][1] y la documentación de [Kubernetes e integraciones][2].

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
          ## optional configs:
          # max_ttl: 30 # max traderoute TTL, default is 30
          # timeout: 1000 # timeout in milliseconds per hop, default is 1s

          # more endpoints
          - hostname: 1.1.1.1 # endpoint hostname or IP
            protocol: UDP
            tags:
              - "tag_key:tag_value"
              - "tag_key2:tag_value2"
```

Se requiere el Agent `v7.59+`.


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=helm#configuration
{{% /tab %}}
{{< /tabs >}}

### Rutas de tráfico de red (experimental)

**Nota**: Las rutas de tráfico de red son experimentales y aún no son estables. No despliegues rutas de tráfico de red ampliamente en un entorno de producción.

Configura rutas de tráfico de red para permitir que el Agent detecte automáticamente y monitorice rutas de red basadas en el tráfico de red real, sin necesidad de especificar los endpoints manualmente.

<div class="alert alert-danger">Habilitar Network Path para detectar automáticamente rutas puede generar una cantidad importante de logs, especialmente cuando se monitorizan rutas de red en un gran número de hosts. </div>

{{< tabs >}}
{{% tab "Linux" %}}

Se requiere el Agent `v7.59+`.

1. Habilita el módulo `system-probe` traceroute en `/etc/datadog-agent/system-probe.yaml` añadiendo lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilita `network_path` para monitorizar conexiones CNM, creando o editando el archivo `/etc/datadog-agent/datadog.yaml`:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    Para ver todos los detalles de configuración, consulta el [ejemplo de configuración][3] o utiliza lo siguiente:

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
    ```

3. Para empezar a ver las rutas de red, reinicia el Agent después de realizar estos cambios de configuración.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{% tab "Windows" %}}

Se requiere el Agent `v7.61+`.

1. Habilita el módulo `system-probe` traceroute en `%ProgramData%\Datadog\system-probe.yaml` añadiendo lo siguiente:

   ```yaml
   traceroute:
     enabled: true
   ```

2. Habilita `network_path` para monitorizar conexiones CNM, creando o editando el archivo `%ProgramData%\Datadog\datadog.yaml`:

    ```yaml
    network_path:
      connections_monitoring:
        enabled: true
      # collector:
        # workers: <NUMBER OF WORKERS> # default 4
    ```

    Para ver todos los detalles de configuración, consulta el [ejemplo de configuración][3] o utiliza lo siguiente:

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
    ```

3. Para empezar a ver las rutas de red, reinicia el Agent después de realizar estos cambios de configuración.

[3]: https://github.com/DataDog/datadog-agent/blob/2c8d60b901f81768f44a798444af43ae8d338843/pkg/config/config_template.yaml#L1731

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/setup/
[2]: https://docs.datadoghq.com/es/agent/configuration/proxy/?tab=linux