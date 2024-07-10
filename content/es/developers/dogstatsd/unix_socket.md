---
aliases:
- /es/developers/metrics/unix_socket/
description: Documentación sobre el uso de DogStatsD en sockets de dominio Unix
further_reading:
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficiales y creadas por la comunidad, y bibliotecas cliente de DogStatsD
title: DogStatsD en socket de dominio Unix
---

A partir de la versión 6.0, el Agent puede consumir métricas con un socket de dominio Unix (UDS) como alternativa al transporte UDP.

Mientras que UDP funciona muy bien en `localhost`, configurarlo en entornos contenedorizados puede resultar un desafío. Los sockets de dominio Unix te permiten establecer la conexión con un archivo socket, independientemente de la IP del contenedor del Datadog Agent. También incluye las siguientes ventajas:

- Evitar la pila de red supone una mejora significativa del rendimiento en caso de tráfico elevado.
- Mientras que UDP no incluye la gestión de errores, UDS permite al Agent detectar paquetes perdidos y errores de conexión, mientras permite un uso no bloqueante.
- DogStatsD puede detectar el contenedor del que proceden las métricas y etiquetarlas en consecuencia.

## Cómo funciona

En lugar de utilizar un par `IP:port` para establecer conexiones, los sockets de dominio Unix utilizan un archivo de socket de parámetro. Una vez abierta la conexión, los datos se transmiten en el mismo [formato de datagrama][1] que para el transporte UDP. Cuando se reinicia el Agent, el socket existente se elimina y se sustituye por uno nuevo. Las bibliotecas cliente detectan este cambio y se conectan al nuevo socket sin problemas.

**Notas**

* Por diseño, el tráfico UDS al host es local, lo que significa que el Datadog Agent debe ejecutarse en cada host desde el que envías métricas.
* UDS no es compatible con Windows.

## Configuración

Para configurar DogStatsD con el socket de dominio Unix, habilita el servidor DogStatsD utilizando el parámetro `dogstatsd_socket`. A continuación, configura el [cliente de DogStatsD](#dogstatsd-client-configuration) en tu código.

Para activar el UDS DogStatsD del Agent:

{{< tabs >}}
{{% tab "Host" %}}

1. Crea un archivo de socket para que DogStatsD lo utilice como socket de escucha. Por ejemplo:
   ```shell
   sudo mkdir -p /var/run/datadog/
   ```
1. Asegúrate de que el usuario `dd-agent` tiene permisos de lectura y escritura en el archivo de socket:
   ```shell
   sudo chown dd-agent:dd-agent /var/run/datadog/
   ```
1. Edita el [principal archivo de configuración del Agent][1]:
   1. Configura `use_dogstatsd` como `true`.
   1. Configura el `dogstatsd_socket` en la ruta donde DogStatsD debe crear tu socket de escucha:

      ```yaml
      ## @param dogstatsd_socket - string - optional - default: ""
      ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
      ## Set to a valid and existing filesystem path to enable.
      #
      dogstatsd_socket: '/var/run/datadog/dsd.socket'
      ```
1. [Reinicia tu Agent][2].


[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Configura la ruta del socket con la variable de entorno `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` en el contenedor del Agent.

2. Haz que el archivo de socket sea accesible para los contenedores de aplicaciones montando un directorio host en ambos lados (sólo lectura, en tus contenedores de aplicaciones, y lectura-escritura, en el contenedor del Agent). Montar la carpeta principal en lugar del socket individual permite que la comunicación del socket persista durante los reinicios de DogStatsD:

    - Iniciar el contenedor del Agent con `-v /var/run/datadog:/var/run/datadog`
    - Iniciar tus contenedores de aplicaciones con `-v /var/run/datadog:/var/run/datadog:ro`

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Configura la ruta del socket con la variable de entorno`DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` en el contenedor del Agent (ejemplo: `/var/run/datadog/dsd.socket`).

2. Haz que el archivo de socket sea accesible para los contenedores de aplicaciones montando un directorio host en ambos lados (sólo lectura, en tus contenedores de aplicaciones, y lectura-escritura, en el contenedor del Agent). Montar la carpeta principal en lugar del socket individual permite que la comunicación del socket persista durante los reinicios de DogStatsD:

    - Monta la carpeta de socket en tu contenedor del `datadog-agent` 

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
            ##...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

    - Expón la misma carpeta en tus contenedores de aplicaciones:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
            ## ...
        volumes:
            - hostPath:
                  path: /var/run/datadog/
              name: dsdsocket
        ```

      **Nota**: Elimina `readOnly: true` si tus contenedores de aplicaciones necesitan acceso de escritura al socket.

{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Configura la ruta del socket con la variable de entorno `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` en tu contenedor del Agent (ejemplo: `/var/run/datadog/dsd.socket`).

2. Haz que el archivo de socket sea accesible para los contenedores de aplicaciones montando un directorio host vacío en ambos lados (sólo lectura, en tus contenedores de aplicaciones, y lectura-escritura, en el contenedor del Agent). Montar la carpeta principal en lugar del socket individual permite que la comunicación del socket persista durante los reinicios de DogStatsD:

    - Monta la carpeta vacía en las especificaciones de tu pod:

        ```yaml
        volumes:
            - emptyDir: {}
              name: dsdsocket
        ```

    - Monta la carpeta de socket en tu contenedor del `datadog-agent`:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
        ```

    - Expón la misma carpeta en tus contenedores de aplicaciones:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
        ```

      **Nota**: Elimina `readOnly: true` si tus contenedores de aplicaciones necesitan acceso de escritura al socket.

{{% /tab %}}
{{< /tabs >}}

### Tests con netcat

Para enviar métricas desde scripts de shell o para comprobar que DogStatsD está escuchando en el socket, utiliza `netcat`. La mayoría de las implementaciones de `netcat`, como `netcat-openbsd` en Debian o `nmap-ncat` en RHEL, admiten el tráfico de sockets Unix con el marcador `-U`:

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

### Detección del origen

La detección del origen permite a DogStatsD detectar de dónde proceden las métricas de contenedor y etiquetar métricas automáticamente. Cuando este modo está habilitado, todas las métricas recibidas por UDS se etiquetan con las mismas etiquetas de contenedor que las métricas de Autodiscovery.

{{< tabs >}}
{{% tab "Host" %}}

1. Habilita la opción `dogstatsd_origin_detection` en tu [principal archivo de configuración del Agent][1]:

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (for example, with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

2. Opcional - Para configurar la [cardinalidad de etiquetas][2] en las métricas recopiladas mediante la detección del origen, configura el parámetro `dogstatsd_tag_cardinality` como `low` (por defecto), `orchestrator` o `high`:

    ```yaml
    ## @param dogstatsd_tag_cardinality - string - optional - default: low
    ## Configure the level of granularity of tags to send for DogStatsD
    ## metrics and events. Choices are:
    ##   * low: add tags about low-cardinality objects
    ##     (clusters, hosts, deployments, container images, ...)
    ##   * orchestrator: add tags about pods (Kubernetes),
    ##     or tasks (ECS or Mesos) -level of cardinality
    ##   * high: add tags about high-cardinality objects
    ##     (individual containers, user IDs in requests, etc.)
    ##
    ## WARNING: Sending container tags for DogStatsD metrics may create
    ## more metrics (one per container instead of one per host).
    ## This may impact your custom metrics billing.
    #
    dogstatsd_tag_cardinality: low
    ```

3. [Reinicia tu Agent][3].


[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /es/getting_started/tagging/assigning_tags/#environment-variables
[3]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Configura la variable de entorno `DD_DogStatsD_ORIGIN_DETECTION=true` para el contenedor del Agent.

2. Opcional - Para configurar la [cardinalidad de etiquetas][2] en las métricas recopiladas mediante la detección del origen, configura la variable de entorno `DD_DOGSTATSD_TAG_CARDINALITY` como `low` (por defecto): `orchestrator` o `high`:

Cuando se ejecuta dentro de un contenedor, DogStatsD necesita ejecutarse en el espacio de nombres del PID del host para que la detección del origen funcione de forma fiable. Habilita esta opción en Docker con el marcador `--pid=host`. Esta función es compatible con ECS con el parámetro `"pidMode": "host"` en la definición de tarea del contenedor. Esta función no es compatible con Fargate. Para obtener más información, consulta la documentación de AWS sobre el [modo de PID][2].


[1]: /es/getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Configura la variable de entorno `DD_DOGSTATSD_ORIGIN_DETECTION` como verdadera para el contenedor del Agent.

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Configura `hostPID: true` en la especificación de la plantilla del pod:

    ```yaml
    # (...)
    spec:
        # (...)
        hostPID: true
    ```

3. Opcional - Para configurar la [cardinalidad de etiquetas][2] en las métricas recopiladas mediante la detección del origen, configura la variable de entorno `DD_DOGSTATSD_TAG_CARDINALITY` como `low` (por defecto): `orchestrator` o `high`:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /es/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Configura la variable de entorno `DD_DOGSTATSD_ORIGIN_DETECTION` como verdadera para el contenedor del Agent.

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Configura `shareProcessNamespace: true` en la especificación de la plantilla del pod:

    ```yaml
    # (...)
    spec:
        # (...)
        shareProcessNamespace: true
    ```

3. Opcional - Para configurar la [cardinalidad de etiquetas][2] en las métricas recopiladas mediante la detección del origen, configura la variable de entorno `DD_DOGSTATSD_TAG_CARDINALITY` como `low` (por defecto): `orchestrator` o `high`:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /es/getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{< /tabs >}}

**Nota:** Las etiquetas `container_id`, `container_name` y `pod_name` no se añaden por defecto para evitar crear demasiadas [métricas personalizadas][2].

## Configuración del cliente de DogStatsD

### Bibliotecas cliente

Las siguientes bibliotecas cliente oficiales de DogStatsD admiten de forma nativa el tráfico UDS. Consulta la documentación de las bibliotecas para saber cómo habilitar el tráfico UDS. **Nota**: Al igual que con UDP, se recomienda habilitar el almacenamiento en buffer del lado del cliente para mejorar el rendimiento durante el tráfico pesado:

| Lenguaje | Biblioteca                              |
| -------- | ------------------------------------ |
| Golang   | [DataDog/datadog-go][3]              |
| Java     | [DataDog/java-dogstatsd-client][4]   |
| Python   | [DataDog/datadogpy][5]               |
| Ruby     | [DataDog/dogstatsd-ruby][6]          |
| PHP      | [DataDog/php-datadogstatsd][7]       |
| C#       | [DataDog/dogstatsd-csharp-client][8] |

### Proxy socat

Si una aplicación o una biblioteca cliente no admite el tráfico UDS, ejecuta `socat` para escuchar en el puerto UDP `8125` y representar las solicitudes al socket:

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

Para obtener directrices sobre la creación de opciones de implementación adicionales, consulta el [wiki de GitHub del Datadog-Agent][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /es/metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support