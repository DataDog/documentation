---
aliases:
- /es/guides/dogstatsd/
- /es/guides/DogStatsD/
- /es/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /es/integrations/faq/dogstatsd-and-docker
- /es/agent/kubernetes/dogstatsd
description: Descripción general de las características de DogStatsD, incluidos los
  tipos de datos y etiquetado.
further_reading:
- link: integrations/node
  tag: Documentación
  text: Habilitar DogStatsD para NodeJS a través de la integración de NodeJS
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas de cliente de DogStatsD
- link: https://www.datadoghq.com/blog/monitor-azure-app-servicio-linux/
  tag: Blog
  text: Monitoriza tus aplicaciones web de Linux en Azure App Service con Datadog
title: DogStatsD
---

La forma más sencilla de introducir tus métricas de aplicación personalizadas en Datadog es enviarlas a DogStatsD, un servicio de agregación de métricas incluido con el Datadog Agent. DogStatsD implementa el protocolo [StatsD][1] y añade algunas extensiones específicas de Datadog:

- Tipo de métrica de histograma
- Checks de servicios
- Eventos
- Etiquetado

Cualquier cliente de StatsD compatible funciona con DogStatsD y el Agent, pero no incluye las [extensiones específicas de Datadog](#dive-into-dogstatsd).

**Nota**: DogStatsD NO implementa los temporizadores de StatsD como un tipo nativo de métrica (aunque los admite a través de [histogramas][2]).

DogStatsD está disponible en Docker Hub y GCR:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

<div class="alert alert-warning">Docker Hub está sujeto a límites en la tasa de extracción de imágenes. Si no eres cliente de Docker Hub, Datadog recomienda que actualices tu configuración de Datadog Agent y Cluster Agent para extraer desde GCR o ECR. Para obtener instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambiar tu registro de contenedor</a>.</div>

## Cómo funciona

DogStatsD acepta [métricas personalizadas][5], [eventos][6] y [checks de servicio][7] mediante UDP y periódicamente los agrega y reenvía a Datadog.

Como utiliza UDP, tu aplicación puede enviar métricas a DogStatsD y reanudar su trabajo sin esperar respuesta. Si DogStatsD deja de estar disponible, tu aplicación no sufrirá ninguna interrupción.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

A medida que recibe datos, DogStatsD agrega múltiples puntos de datos para cada métrica única en un único punto de datos durante un periodo denominado _el intervalo de descarga_. DogStatsD utiliza un intervalo de descarga de 10 segundos.

## Configuración

DogStatsD está habilitado por defecto en el puerto UDP `8125` para el Agent v6+. Si no necesitas cambiar este puerto, consulta directamente cómo [configurar DogStatsD en tu código](#code).

### Agent

{{< tabs >}}
{{% tab "Host Agent" %}}

Por defecto, DogStatsD escucha en el puerto UDP **8125**. Si necesitas cambiar esto, configura la opción `dogstatsd_port` en el [archivo principal de configuración del Agent][1], y reinicia el Agent. También puedes configurar DogStatsD para utilizar un [socket de dominio de Unix][2]. Para habilitar un puerto UDP de servidor DogStatsD personalizado para el Agent:

1. Edita tu archivo `datadog.yaml` para eliminar los comentarios de los parámetros `use_dogstatsd` y `dogstatsd_port`:

    ```yaml
    ## @param use_dogstatsd - boolean - optional - default: true
    ## Set this option to false to disable the Agent DogStatsD server.
    #
    use_dogstatsd: true

    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Reinicia tu Agent][3].


[1]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /es/developers/dogstatsd/unix_socket/
[3]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Container Agent" %}}

Por defecto, DogStatsD escucha en el puerto UDP **8125**, por lo que debes vincular este puerto a tu puerto host cuando ejecutes el Agent en un contenedor. Si tus métricas de StatsD provienen de fuera de `localhost`, debes establecer `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` en `true` para permitir la recopilación de métrica. Para ejecutar el Agent con el servidor de DogStatsD activo, ejecuta el siguiente comando:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

Si necesitas cambiar el puerto utilizado para recopilar métricas de StatsD, utiliza la variable de entorno `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>`. También puedes configurar DogStatsD para usar un [socket de dominio de Unix][1].

#### Detección de origen a través de UDP

La detección de origen es compatible con el Agent v6.10.0+, y permite a DogStatsD detectar de dónde proceden las métricas de contenedor y automáticamente etiquetar las métricas. Cuando este modo está activado, todas las métricas recibidas a través de UDP son etiquetadas por las mismas etiquetas de pod como métricas de Autodiscovery.

La detección del origen en entornos distintos a Kubernetes se basa en una extensión del protocolo DogStatsD en [Datagram Format and Shell Usage][2]. Para habilitar la función en el Agent, establece la variable de entorno `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` en `true`.

**Nota**: La detección de origen no es compatible con entornos de Fargate.

[1]: /es/developers/dogstatsd/unix_socket/
[2]: /es/developers/dogstatsd/datagram_shell/?tab=metrics#dogstatsd-protocol-v12
{{% /tab %}}
{{% tab "Datadog Operator" %}}

La recopilación de métricas de StatsD está habilitada por defecto en [socket de dominio de Unix][1]. Para empezar a recopilar tus métricas de StatsD mediante UDP, necesitas activar la característica de DogStatsD en la configuración del Operator.

1. Añade `features.dogstatsd.hostPortConfig.enabled` a tu manifiesto `datadog-agent.yaml`:

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    Este es un ejemplo de manifiesto `datadog-agent.yaml`:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        dogstatsd:
          hostPortConfig:
            enabled: true
    ```

    Esto permite al Agent recopilar métricas de StatsD mediante UDP en el puerto `8125`.

2. Aplica el cambio:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Atención**: El parámetro `features.dogstatsd.hostPortConfig.hostPort` abre un puerto en tu host. Asegúrate de que tu cortafuegos solo permite el acceso desde tus aplicaciones o fuentes de confianza. Si tu plugin de red no admite `hostPorts`, entonces añade `hostNetwork: true` en las especificaciones de tu pod de Agent. Esto comparte el espacio de nombres de red de tu host con el Datadog Agent. También significa que todos los puertos abiertos en el contenedor se abren en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, entran en conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no arranca. Algunas instalaciones de Kubernetes no permiten esto.

### Enviar métricas de StatsD al Agent

Tu aplicación necesita una forma fiable de determinar la dirección IP de su host. Esto se simplifica en Kubernetes 1.7, que amplía el conjunto de atributos que puedes pasar a tus pods como variables de entorno. En las versiones 1.7 y posteriores, puedes pasar la IP host a cualquier pod añadiendo una variable de entorno a PodSpec. Por ejemplo, el manifiesto de tu aplicación podría tener este aspecto:

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

Con esto, cualquier pod que ejecute tu aplicación es capaz de enviar métricas de DogStatsD con el puerto `8125` en `$DD_AGENT_HOST`.

**Nota**: Como práctica recomendada, Datadog recomienda utilizar el etiquetado de servicio unificado al asignar atributos. Éste une la telemetría de Datadog mediante el uso de tres etiquetas estándares: `env`, `service` y `version`. Para saber cómo unificar tu entorno, consulta [etiquetado de servicio unificado][4].

#### Detección de origen a través de UDP

La detección de origen es compatible con Agent 6.10.0+ y permite a DogStatsD detectar de dónde proceden las métricas de contenedor y etiquetar métricas automáticamente. Cuando este modo está activado, todas las métricas recibidas a través de UDP son etiquetadas por las mismas etiquetas de pod como métricas de Autodiscovery.

1. Para activar la detección de origen, añade la configuración `global.originDetectionUnified.enabled` a tu manifiesto `datadog-agent.yaml`:

    ```yaml
    global:
        originDetectionUnified:
            enabled: true
    ```

**Notas**: 
* Una alternativa a UDP es [socket de dominio de Unix][5].
* La detección de origen con UDP puede utilizar el ID del pod como ID de entidad.

Para utilizar el ID del pod como ID de entidad, añade las siguientes líneas al manifiesto de tu aplicación:

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

Para establecer [cardinalidad de etiquetas][6] para las métricas recopiladas mediante la detección de origen, establece el ajuste `features.dogstatsd.tagCardinality` en `low` (por defecto), `orchestrator` o `high`.

**Nota:** Para UDP, las etiquetas `pod_name` no se añaden por defecto para evitar crear demasiadas [métricas personalizadas][7].

[1]: /es/developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/developers/dogstatsd/unix_socket/?tab=host#using-origin-detection-for-container-tagging
[6]: /es/getting_started/tagging/assigning_tags/#environment-variables
[7]: /es/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Helm" %}}

Reunir métricas personalizadas con [DogStatsD][1] con helm:

1. Actualiza tu archivo [datadog-values.yaml][2] para habilitar DogStatsD:

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Nota**: La funcionalidad `hostPort` requiere un proveedor de red que se adhiera a la [especificación CNI][3], como Calico, Canal o Flannel. Para obtener más información, incluida una solución para los proveedores de red que no sean CNI, consulta la documentación de Kubernetes: [Los servicios de HostPort no funcionan][4].

    **Atención**: El parámetro `hostPort` abre un puerto en tu host. Asegúrate de que tu cortafuegos solo permite el acceso desde tus aplicaciones o fuentes de confianza. Si tu complemento de red no admite `hostPorts`, añade `hostNetwork: true` en las especificaciones de pod de tu Agent. Esto comparte el espacio de nombres de red de tu host con el Datadog Agent. Esto también significa que todos los puertos abiertos en el contenedor se abren en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, entran en conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no arranca. Algunas instalaciones de Kubernetes no permiten esto.

2. Actualiza tu configuración de Agent:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Actualiza tus pods de aplicación: tu aplicación necesita una forma fiable de determinar la dirección IP de su host. Esto se simplifica en Kubernetes 1.7, que amplía el conjunto de atributos que puedes pasar a tus pods como variables de entorno. En las versiones 1.7 y posteriores, puedes pasar la IP host a cualquier pod añadiendo una variable de entorno a PodSpec. Por ejemplo, el manifiesto de tu aplicación podría tener este aspecto:

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

   Con esto, cualquier pod que ejecute tu aplicación es capaz de enviar métricas de DogStatsD mediante el puerto `8125` en `$DD_AGENT_HOST`.

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Código

#### Instalar el cliente de DogStatsD

Las bibliotecas de clientes oficiales de Datadog-DogStatsD están disponibles para los siguientes idiomas. Cualquier cliente de StatsD compatible funciona con DogStatsD y Agent, pero no incluye las características específicas de Datadog mencionadas anteriormente:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```shell
pip install datadog
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```shell
gem install dogstatsd-ruby
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```shell
go get github.com/DataDog/datadog-go/v5/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

El cliente Java Datadog StatsD se distribuye con maven central, y puede ser [descargado desde Maven][1]. Comienza añadiendo la siguiente configuración a tu `pom.xml`:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>4.2.1</version>
</dependency>
```



[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Añade lo siguiente a tu `composer.json`:

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**Nota**: La primera versión de Composer es _0.0.3_.

O clona manualmente el repositorio en [github.com/DataDog/php-datadogstatsd][1] y configúralo con `require './src/DogStatsd.php'`.



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Instala el paquete directamente mediante la CLI de Nuget u obtén [PackageReference de NuGet][1]:

```shell
dotnet add package DogStatsD-CSharp-Client
```

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### Instanciar el cliente de DogStatsD 

Una vez instalado tu cliente DogStatsD, instálalo en tu código:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

<div class="alert alert-warning">
  Por defecto, las instancias de cliente de Python DogStatsD (incluyendo la instancia global <code>statsd</code> ) no pueden compartirse a través de procesos, pero son seguras para los subprocesos. Debido a esto, el proceso principal y cada subproceso deben crear sus propias instancias del cliente o el buffering debe ser explícitamente deshabilitado, estableciendo <code>disable_buffering</code> en <code>True</code>. Consulta la documentación sobre <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> para más detalles.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
  Si utilizas DogStatsD con el Agent de contenedor o en Kubernetes, debes instanciar el host al que se reenvían las métricas de StatsD con la variable de entorno <code>$DD_DOGSTATSD_SOCKET</code> si utilizas un socket de dominio de Unix, o con la variable de entorno <code>$DD_AGENT_HOST</code> si utilizas el método de enlace de puertos host.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

Para más opciones, consulta [GoDoc de Datadog][1].



[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();


        // alternatively
        StatsDClient statsdAlt = new NonBlockingStatsDClient(
            new NonBlockingStatsDClientBuilder(
                .prefix("statsd")
                .hostname("localhost")
                .port(8125)
                .resolve()));

    }
}
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Instanciar un nuevo objeto DogStatsD utilizando composer:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Configurar la clase de DogStatsD:

```csharp
// The code is located under the StatsdClient namespace
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

using (var dogStatsdService = new DogStatsdService())
{
    if (!dogStatsdService.Configure(dogstatsdConfig))
        throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    // ...
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Parámetros de instanciación del cliente

**Nota**: Como práctica recomendada, Datadog recomienda utilizar el etiquetado de servicio unificado al asignar etiquetas. Éste une la telemetría de Datadog mediante el uso de tres etiquetas estándares: `env`, `service` y `version`. Para saber cómo unificar tu entorno, consulta [etiquetado de servicio unificado][4].

Además de la configuración obligatoria de DogStatsD (`url` y `port`), tu cliente de DogStatsD dispone de los siguientes parámetros opcionales:

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Parámetro              | Tipo            | Por defecto     | Descripción                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | Cadena          | `localhost` | El host de tu servidor de DogStatsD.                                                                             |
| `statsd_port`          | Entero         | `8125`      | El puerto de tu servidor de DogStatsD.                                                                             |
| `statsd_socket_path`   | Cadena          | `null`      | La ruta al socket de dominio de DogStatsD Unix (anula `host` y `port`, solo compatibles con el Agent v6+). |
| `statsd_constant_tags` | Lista de cadenas | `null`      | Etiquetas para aplicar a todas las métricas, eventos y checks de servicio.                                                      |
| `statsd_namespace`     | Cadena          | `null`      | Espacio de nombres para preestablecer todas las métricas, eventos checks de servicio.                                                   |

Para conocer la lista completa de todos los parámetros opcionales disponibles para `datadog.initialize()`, así como los parámetros que solo están disponibles cuando se instancian explícitamente instancias de `datadog.dogstatsd.DogStatsd`, consulta la [biblioteca de Datadog Python][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Parámetro       | Tipo            | Predeterminada     | Descripción                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | Cadena          | `localhost` | El host de tu servidor de DogStatsD.                                                                             |
| `port`          | Entero         | `8125`      | El puerto de tu servidor de DogStatsD.                                                                             |
| `socket_path`   | Cadena          | `null`      | La ruta al socket de dominio de Unix DogStatsD (anula `host` y `port`, solo compatibles con Agent v6+). |
| `tags`          | Lista de cadenas | `null`      | Etiquetas para aplicarse a todas las métricas, eventos y checks de servicio.                                                      |
| `namespace`     | Cadena          | `null`      | Espacio de nombres para preestablecer a todas las métricas, eventos y checks de servicio.                                                |
| `single_thread` | Booleano         | `false`     | Hace que el cliente envíe las métricas en el subproceso principal cuando está activado en lugar de en un subproceso compañero.           |

Para consultar la lista completa de los parámetros opcionales, consulta el [repositorio de DogStatsD-Ruby][1] en GitHub.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

El cliente Go dispone de múltiples opciones para configurar el comportamiento de tu cliente.

| Parámetro                     | Tipo            | Descripción                                                                  |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `WithNamespace()`             | Cadena          | Configurar un espacio de nombres para preestablecer a todas las métricas, eventos y checks de servicio.  |
| `WithTags()`                  | Lista de cadenas | Etiquetas globales aplicadas a cada métrica, evento y check de servicio.               |

Para conocer todas las opciones disponibles, consulta [GoDoc de Datadog][1].


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

A partir de la versión 2.10.0, la forma recomendada de instanciar el cliente es con el NonBlockingStatsDClientBuilder. Puedes
usar los siguientes métodos de compilación para definir los parámetros del cliente.

| Método de compilación                               | Tipo           | Predeterminada   | Descripción                                                                         |
| -------------------------------------------- | -------------- | --------- | ----------------------------------------------------------------------------------- |
| `prefix(String val)`                         | Cadena         | nulo      | El prefijo que se aplicará a todas las métricas, eventos y checks de servicio.                     |
| `hostname(String val)`                       | Cadena         | localhost | El nombre de host del servidor StatsD de destino.                                        |
| `port(int val)`                              | Entero        | 8125      | El puerto del servidor StatsD de destino.                                             |
| `constantTags(String... val)`                | Cadena varargs | nulo      | Etiquetas globales que se aplicarán a cada métrica, evento y check de servicio.                |
| `blocking(boolean val)`                      | Booleano        | false     | El tipo de cliente a instanciar: bloqueante o no bloqueante.                        |
| `socketbufferSize(int val)`                  | Entero        | -1        | El tamaño del buffer del socket subyacente.                                           |
| `enableTelemetry(boolean val)`               | Booleano        | false     | Informes de telemetría de clientes.                                                         |
| `entityID(String val)`                       | Cadena         | nulo      | ID de la entidad para la detección del origen.                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | Entero        | nulo      | Gestor de errores en caso de error interno del cliente.                                  |
| `maxPacketSizeBytes(int val)`                | Entero        | 8192/1432 | El tamaño máximo del paquete; 8192 para UDS, 1432 para UDP.                               |
| `processorWorkers(int val)`                  | Entero        | 1         | El número de subprocesos de trabajo del procesador que ensamblan buffers para su envío.           |
| `senderWorkers(int val)`                     | Entero        | 1         | Número de subprocesos de remitente que envían buffers al socket.               |
| `poolSize(int val)`                          | Entero        | 512       | Tamaño del grupo de buffer del paquete de red.                                                    |
| `queueSize(int val)`                         | Entero        | 4096      | Número máximo de mensajes sin procesar en la cola.                                |
| `timeout(int val)`                           | Entero        | 100       | El tiempo de inactividad en milisegundos para las operaciones de bloqueo. Solo se aplica a sockets de unix.  |

Para obtener más información, busca el [paquete][1] de Java DogStatsD para la clase NonBlockingStatsDClient y la clase NonBlockingStatsDClientBuilder. Asegúrate de ver la versión que coincida con la versión de tu cliente.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Parámetro     | Tipo            | Por defecto     | Descripción                                                                                                                                                                                          
          |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`        | Cadena          | `localhost` | El host de tu servidor de DogStatsD. Si no está establecido, el Agent usa la variable de entorno `DD_AGENT_HOST` o `DD_DOGSTATSD_URL`.                                                               |
| `port`        | Entero         | `8125`      | El puerto de tu servidor de DogStatsD. Si no está establecido, el Agent usa la variable de entorno `DD_DOGSTATSD_PORT` o `DD_DOGSTATSD_URL`.                                                          |
| `socket_path` | Cadena          | `null`      | La ruta al socket de dominio de DogStatsD Unix (anula `host` y `port`). Solo es compatible con Agent v6+. Si no está establecido, el Agent usa la variable de entorno `DD_DOGSTATSD_URL`. |
| `global_tags` | Lista de cadenas | `null`      | Etiquetas para aplicar a todas las métricas, eventos y checks de servicio. La etiqueta `@dd.internal.entity_id` se adjunta a etiquetas globales de la variable de entorno `DD_ENTITY_ID`.                                    |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| Parámetro          | Tipo            | Predeterminada     | Descripción                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | Cadena          | `localhost` | El nombre de host del servidor StatsD de destino.                         |
| `StatsdPort`       | Entero         | `8125`      | El puerto del servidor StatsD de destino.                              |
| `Prefix`           | Cadena          | `null`      | Prefijo que se aplica a cada métrica, evento y check de servicio.           |
| `ConstantTags`     | Lista de cadenas | `null`      | Etiquetas globales que se aplicarán a cada métrica, evento y check de servicio. |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Sumérgete en DogStatsD

DogStatsD y StatsD son en general similares, sin embargo, DogStatsD contiene características avanzadas que son específicas de Datadog, incluidos los tipos de datos, eventos, checks de servicio y etiquetas disponibles:

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}Enviar métricas a Datadog con DogStatsD.{{< /nextlink >}}
{{< nextlink href="/service_management/events/guides/dogstatsd/" >}}Enviar eventos a Datadog con DogStatsD.{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Enviar checks de servicio a Datadog con DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

Si estás interesado en aprender más sobre el formato de datagram utilizado por DogStatsD, o quieres desarrollar tu propia biblioteca de Datadog, consulta la sección [datagram y shell usage][9], que también explica cómo enviar métricas y eventos directamente desde la línea de comandos.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /es/metrics/custom_metrics/
[6]: /es/service_management/events/guides/dogstatsd/
[7]: /es/developers/service_checks/dogstatsd_service_checks_submission/
[8]: /es/getting_started/tagging/unified_service_tagging
[9]: /es/developers/dogstatsd/datagram_shell/