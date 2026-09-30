---
aliases:
- /es/guides/dogstatsd/
- /es/guides/DogStatsD/
- /es/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
- /es/integrations/faq/dogstatsd-and-docker
- /es/agent/kubernetes/dogstatsd
- /es/developers/dogstatsd/
description: Descripción general de las características de DogStatsD, incluyendo tipos
  de datos y etiquetado.
further_reading:
- link: integrations/node
  tag: Documentación
  text: Habilitar DogStatsD para Node.js a través de la integración de Node.js
- link: extend/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: extend/libraries
  tag: Documentación
  text: Bibliotecas de cliente de API y DogStatsD creadas oficialmente y por la comunidad
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: Blog
  text: Monitorea tus aplicaciones web de Linux en Azure App Service con Datadog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Aporta observabilidad de alto rendimiento a entornos de Kubernetes seguros
    con el controlador CSI de Datadog
- link: https://learn.datadoghq.com/courses/create-custom-metrics-dogstatsd
  tag: Centro de Aprendizaje
  text: Crea Custom Metrics con DogStatsD
title:  DogStatsD
---
La forma más fácil de enviar las métricas de tu aplicación personalizada a Datadog es enviarlas a DogStatsD, un servicio de agregación de métricas incluido con el Agente de Datadog. DogStatsD implementa el protocolo [StatsD][1] y añade algunas extensiones específicas de Datadog:

- Tipo de métrica de histograma
- Verificaciones de servicio
- Eventos
- Etiquetado

Cualquier cliente StatsD compatible funciona con DogStatsD y el Agente, pero no incluye las [extensiones específicas de Datadog](#dive-into-dogstatsd).

**Nota**: DogStatsD NO implementa temporizadores de StatsD como un tipo de métrica nativa (aunque los soporta a través de [histogramas][2]).

DogStatsD está disponible en el Registro de Contenedores de Datadog, GAR, ECR, Azure ACR y Docker Hub:

| Registro                   | Imagen                                   |
| -------------------------- | --------------------------------------- |
| Registro de Contenedores de Datadog | [registry.datadoghq.com/dogstatsd][33]  |
| Registro de Artefactos de Google   | [gcr.io/datadoghq/dogstatsd][4]         |
| Amazon ECR                 | [public.ecr.aws/datadog/dogstatsd][34]  |
| Azure ACR                  | datadoghq.azurecr.io/dogstatsd          |
| Docker Hub                 | [hub.docker.com/r/datadog/dogstatsd][3] |

<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de descarga de imágenes. Si no eres cliente de Docker Hub, Datadog recomienda que utilices el Registro de Contenedores de Datadog o un registro de proveedor de nube en su lugar. Para instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cómo cambiar tu registro de contenedores</a>.</div>

## Cómo funciona {#how-it-works}

DogStatsD acepta [Custom Metrics][5], [eventos][6] y [verificaciones de servicio][7] a través de UDP y las agrega y reenvía periódicamente a Datadog.

Debido a que utiliza UDP, tu aplicación puede enviar métricas a DogStatsD y continuar su trabajo sin esperar una respuesta. Si DogStatsD alguna vez se vuelve inaccesible, tu aplicación no experimenta una interrupción.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

A medida que recibe datos, DogStatsD agrega múltiples puntos de datos para cada métrica única en un solo punto de datos durante un período de tiempo llamado _el intervalo de vaciado_. DogStatsD utiliza un intervalo de vaciado de 10 segundos.

## Configuración {#setup}

DogStatsD consiste en un servidor, que se incluye con el Agente de Datadog, y una biblioteca cliente, que está disponible en múltiples lenguajes. El servidor de DogStatsD está habilitado por defecto a través del puerto UDP `8125` para el Agente v6+. Puedes establecer un puerto personalizado para el servidor si es necesario. Configura tu cliente para que coincida con la dirección y el puerto del servidor DogStatsD del Agente de Datadog.

### Servidor DogStatsD del Agente de Datadog {#datadog-agent-dogstatsd-server}

{{< tabs >}}
{{% tab "Agente de host" %}}

Si necesitas cambiar el puerto, configura la opción `dogstatsd_port` en el archivo principal de [configuración del Agente][1], y reinicia el Agente. También puedes configurar DogStatsD para usar un [socket de dominio UNIX][2].

Para habilitar un puerto UDP personalizado para el servidor DogStatsD del Agente:

1. Establece el parámetro `dogstatsd_port`:

    ```yaml
    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Reinicia tu Agente][3].

[1]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /es/extend/dogstatsd/unix_socket/
[3]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Agente de Contenedor" %}}

Por defecto, DogStatsD escucha en el puerto UDP **8125**, por lo que necesitas vincular este puerto al puerto de tu host al ejecutar el Agente en un contenedor. Si tus métricas de StatsD provienen de fuera de `localhost`, debes establecer `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` en `true` para permitir la recolección de métricas. Para ejecutar el Agente con el servidor DogStatsD activo, ejecuta el siguiente comando:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              registry.datadoghq.com/agent:latest
```

Si necesitas cambiar el puerto utilizado para recolectar métricas de StatsD, usa la variable de entorno `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>`. También puedes configurar DogStatsD para usar un [socket de dominio UNIX][1].

[1]: /es/extend/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Operador de Datadog" %}}

La recolección de métricas de StatsD está habilitada por defecto en [socket de dominio UNIX][1]. Para comenzar a recolectar tus métricas de StatsD a través de UDP, necesitas activar la función DogStatsD en la configuración del Operador.

1. Agrega `features.dogstatsd.hostPortConfig.enabled` a tu `datadog-agent.yaml` manifiesto:

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    This is an example `datadog-agent.yaml` manifest:
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

    This enables the Agent to collect StatsD metrics over UDP on port `8125`.

2. Aplica el cambio:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Advertencia**: El parámetro `features.dogstatsd.hostPortConfig.hostPort` abre un puerto en tu host. Asegúrate de que tu firewall solo permita el acceso desde tus aplicaciones o fuentes de confianza. Si tu complemento de red no soporta `hostPorts`, agrega `hostNetwork: true` en las especificaciones de tu pod de Agent. Esto comparte el espacio de nombres de red de tu host con el Agente de Datadog. También significa que todos los puertos abiertos en el contenedor están abiertos en el host. Si un puerto se utiliza tanto en el host como en tu contenedor, hay un conflicto (ya que comparten el mismo espacio de nombres de red) y el pod no inicia. Algunas instalaciones de Kubernetes no permiten esto.

### Envía métricas StatsD al Agente {#send-statsd-metrics-to-the-agent}

Tu aplicación necesita una forma confiable de determinar la dirección IP de su host. Esto se simplifica en Kubernetes 1.7, que amplía el conjunto de atributos que puedes pasar a tus pods como variables de entorno. En versiones 1.7 y superiores, puedes pasar la IP del host a cualquier pod agregando una variable de entorno al PodSpec. Por ejemplo, tu manifiesto de aplicación podría verse así:

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

Con esto, cualquier pod que ejecute tu aplicación puede enviar métricas de DogStatsD con el puerto `8125` en `$DD_AGENT_HOST`.

**Nota**: Como mejor práctica, Datadog recomienda usar unified service tagging al asignar atributos. El unified service tagging vincula la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender cómo unificar tu entorno, consulta [unified service tagging][4].

[1]: /es/extend/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /es/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "Helm" %}}

Para recopilar métricas personalizadas con [DogStatsD][1] usando helm:

1. Actualiza tu archivo [datadog-values.yaml][2] para habilitar DogStatsD:

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, see the Kubernetes documentation: [HostPort services do not work][4].

     **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

2. Actualiza la configuración de tu Agente:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Actualiza tus pods de aplicación: Tu aplicación necesita una forma confiable de determinar la dirección IP de su host. Esto se simplifica en Kubernetes 1.7, que amplía el conjunto de atributos que puedes pasar a tus pods como variables de entorno. En versiones 1.7 y superiores, puedes pasar la IP del host a cualquier pod agregando una variable de entorno al PodSpec. Por ejemplo, tu manifiesto de aplicación podría verse así:

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics through port `8125` on `$DD_AGENT_HOST`.

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Detección de origen {#origin-detection}

El Agente de Datadog v6.10.0 soporta _la detección de origen_, lo que permite a DogStatsD detectar de dónde provienen las métricas del contenedor y etiquetar automáticamente las métricas. Cuando la detección de origen está habilitada, todas las métricas recibidas a través de UDP son etiquetadas por el mismo pod 
etiquetas como métricas de Autodiscovery.

#### En un cliente de DogStatsD {#in-a-dogstatsd-client}

La detección de origen está habilitada por defecto en todos los clientes de DogStatsD.  

Para **deshabilitar** la detección de origen en un cliente, realiza una de las siguientes acciones:
- Establece la variable de entorno `DD_ORIGIN_DETECTION_ENABLED=false` 
- Configura la biblioteca de DogStatsD para deshabilitar la detección de origen. Para instrucciones, consulta la [documentación de tu biblioteca específica de DogStatsD][10].

#### En el Datadog Agent {#in-the-datadog-agent}
La detección de origen no está habilitada por defecto en el Datadog Agent. Para **habilitar** la detección de origen en el Datadog Agent, establece la `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` variable de entorno en `true`.

Establece [`shareProcessNamespace:true` en la especificación del pod][12] para ayudar al Datadog Agent en la detección de origen en EKS Fargate.

#### Cómo se detectan los orígenes {#how-origins-are-detected}

La detección de origen se puede lograr de varias maneras. La detección de origen a través de cgroups está habilitada por defecto. La detección de origen sobre UDP o `DD_EXTERNAL_ENV` requiere configuración.

{{< tabs >}}
{{% tab "Cgroups" %}}
En Linux, el ID del contenedor se puede extraer de las entradas `procfs` relacionadas con `cgroups`. El cliente lee de `/proc/self/cgroup` o `/proc/self/mountinfo` para intentar analizar el ID del contenedor. 

En cgroup v2, el ID del contenedor se puede inferir resolviendo la ruta del cgroup desde `/proc/self/cgroup`, combinándola con el punto de montaje del cgroup desde `/proc/self/mountinfo`. El inode del directorio resultante se envía al Datadog Agent. Si el Datadog Agent está en el mismo nodo que el cliente, esta información se puede utilizar para identificar el UID del pod.
{{% /tab %}}

{{% tab "UDP" %}}
Para habilitar la detección de origen sobre UDP, agrega las siguientes líneas a tu manifiesto de aplicación:

```yaml
env:
- name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

El cliente de DogStatsD adjunta una etiqueta interna, `entity_id`. El valor de esta etiqueta es el contenido de la `DD_ENTITY_ID` variable de entorno, que es el UID del pod. 

<div class="alert alert-info">Para UDP, <code>pod_name</code> las etiquetas no se añaden por defecto para evitar crear demasiadas <a href="/metrics/custom_metrics/">métricas personalizadas</a>.</div>
{{% /tab %}}

{{% tab "DD_EXTERNAL_ENV" %}}
Agrega la siguiente etiqueta a tu pod:

```
admission.datadoghq.com/enabled: "true"
```

Si tu pod tiene esta etiqueta, el [Controlador de Admisiones][1] inyecta una variable de entorno, `DD_EXTERNAL_ENV`. El valor de esta variable se envía en un campo con la métrica, que puede ser utilizado por el Datadog Agent para determinar el origen de la métrica.

[1]: /es/containers/cluster_agent/admission_controller
{{% /tab %}}
{{< /tabs >}}

#### Cardinalidad de etiquetas {#tag-cardinality}

Lee [Asignación de Etiquetas: Cardinalidad de Etiquetas][11] para más información sobre la cardinalidad de etiquetas.

##### Globalmente {#globally}

Puedes especificar la cardinalidad de etiquetas globalmente configurando la variable de entorno `DD_CARDINALITY`, o pasando un campo `'cardinality'` al constructor. 

##### Por métrica {#per-metric}

Puedes especificar la cardinalidad de etiquetas por métrica pasando el valor en el parámetro `cardinality`. Los valores válidos para este parámetro son `"none"`, `"low"`, `"orchestrator"` o `"high"`.

### Cliente DogStatsD {#dogstatsd-client}

Instala la biblioteca del cliente DogStatsD para tu lenguaje preferido y configúralo para que coincida con la dirección y el puerto del servidor DogStatsD del Agente de Datadog.

#### Instala el cliente DogStatsD {#install-the-dogstatsd-client}

Las bibliotecas oficiales del cliente Datadog-DogStatsD están disponibles para los siguientes lenguajes. Cualquier cliente StatsD compatible funciona con DogStatsD y el Agente, pero no incluye las características específicas de Datadog mencionadas anteriormente:
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

El Cliente Java DataDog StatsD se distribuye con maven central, y puede ser [descargado desde Maven][1]. Comienza agregando la siguiente configuración a tu `pom.xml`:

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

Agrega lo siguiente a tu `composer.json`:

```text
"datadog/php-datadogstatsd": "1.6.*"
```

**Nota**: La primera versión enviada en Composer es _0.0.3_

O clona manualmente el repositorio en [github.com/DataDog/php-datadogstatsd][1] y configúralo con `require './src/DogStatsd.php'`.



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Instala el paquete directamente usando la CLI de Nuget o consigue [el PackageReference de NuGet][1]:

```shell
dotnet add package DogStatsD-CSharp-Client
```

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### Instancia el cliente DogStatsD {#instantiate-the-dogstatsd-client}

Una vez que tu cliente DogStatsD esté instalado, instáncialo en tu código:
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

<div class="alert alert-danger">
  Por defecto, las instancias del cliente DogStatsD de Python (incluyendo la <code>statsd</code> instancia global) no pueden ser compartidas entre procesos, pero son seguras para hilos. Debido a esto, el proceso padre y cada proceso hijo deben crear sus propias instancias del cliente o el almacenamiento en búfer debe ser deshabilitado explícitamente configurando <code>disable_buffering</code> a <code>True</code>. Consulta la documentación en <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> para más detalles.
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
  Si usas DogStatsD con el agente de contenedor o en Kubernetes, debes instanciar el servidor al que se envían las métricas de StatsD con la <code>$DD_DOGSTATSD_SOCKET</code> variable de entorno si usas un Socket de Dominio UNIX, o con la <code>$DD_AGENT_HOST</code> variable de entorno si estás usando el método de enlace de puerto del host.
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

Instancia un nuevo objeto DogStatsD usando composer:

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

Configura la clase DogStatsd:

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

### Parámetros de instanciación del cliente {#client-instantiation-parameters}

**Nota**: Como una buena práctica, Datadog recomienda usar unified service tagging al asignar etiquetas. El unified service tagging vincula la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender cómo unificar tu entorno, consulta [unified service tagging][8].

Además de la configuración requerida de DogStatsD (`url` y `port`), los siguientes parámetros opcionales están disponibles para su cliente DogStatsD:

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Parámetro              | Tipo            | Predeterminado     | Descripción                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | Cadena          | `localhost` | El host de tu servidor DogStatsD.                                                                             |
| `statsd_port`          | Entero         | `8125`      | El puerto de tu servidor DogStatsD.                                                                             |
| `statsd_socket_path`   | Cadena          | `null`      | La ruta al socket de dominio UNIX de DogStatsD (anula `host` y `port`, solo compatible con el Datadog Agent v6+). |
| `statsd_constant_tags` | Lista de cadenas | `null`      | Etiquetas para aplicar a todas las métricas, eventos y verificaciones de servicio.                                                      |
| `statsd_namespace`     | Cadena          | `null`      | Espacio de nombres para prefijar todas las métricas, eventos y verificaciones de servicio.                                                   |

Para la lista completa de parámetros opcionales disponibles para `datadog.initialize()` así como parámetros disponibles solo al instanciar explícitamente instancias de `datadog.dogstatsd.DogStatsd`, consulte la [biblioteca de Python de Datadog][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Parámetro       | Tipo            | Predeterminado | Descripción                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | Cadena          | `localhost` | El host de tu servidor DogStatsD.                                                                             |
| `port`          | Entero         | `8125`      | El puerto de tu servidor DogStatsD.                                                                             |
| `socket_path`   | Cadena          | `null`      | La ruta al socket de dominio UNIX de DogStatsD (anula `host` y `port`, solo compatible con el Datadog Agent v6+). |
| `tags`          | Lista de cadenas | `null`      | Etiquetas para aplicar a todas las métricas, eventos y verificaciones de servicio.                                                      |
| `namespace`     | Cadena          | `null`      | Espacio de nombres para prefijar a todas las métricas, eventos y verificaciones de servicio.                                                |
| `single_thread` | Booleano        | `false`     | Hace que el cliente envíe las métricas en el hilo principal cuando está habilitado en lugar de en un hilo secundario.           |

Para la lista completa de parámetros opcionales, consulte el [repositorio de dogstatsd-ruby][1] en GitHub.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

El cliente de Go tiene múltiples opciones para configurar el comportamiento de su cliente.

| Parámetro         | Tipo            | Descripción                                                                 |
| ----------------- | --------------- | --------------------------------------------------------------------------- |
| `WithNamespace()` | Cadena          | Configure un espacio de nombres para prefijar a todas las métricas, eventos y verificaciones de servicio. |
| `WithTags()`      | Lista de cadenas | Etiquetas globales aplicadas a cada métrica, evento y verificación de servicio.              |

Para todas las opciones disponibles, consulte [GoDoc de Datadog][1].


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

A partir de la versión 2.10.0, la forma recomendada de instanciar el cliente es con el NonBlockingStatsDClientBuilder. Usted
puede utilizar los siguientes métodos de constructor para definir los parámetros del cliente.

| Método de Constructor                               | Tipo           | Por defecto   | Descripción                                                                        |
| -------------------------------------------- | -------------- | --------- | ---------------------------------------------------------------------------------- |
| `prefix(String val)`                         | Cadena         | null      | El prefijo que se aplicará a todas las métricas, eventos y verificaciones de servicio.                    |
| `hostname(String val)`                       | Cadena         | localhost | El nombre del host del servidor StatsD objetivo.                                       |
| `port(int val)`                              | Entero        | 8125      | El puerto del servidor StatsD objetivo.                                            |
| `constantTags(String... val)`                | Cadena varargs | null      | Etiquetas globales que se aplicarán a cada métrica, evento y verificación de servicio.               |
| `blocking(boolean val)`                      | Booleano        | falso     | El tipo de cliente a instanciar: bloqueante vs no bloqueante.                       |
| `socketBufferSize(int val)`                  | Entero        | -1        | El tamaño del búfer de socket subyacente.                                          |
| `enableTelemetry(boolean val)`               | Booleano        | falso     | Informe de telemetría del cliente.                                                        |
| `entityID(String val)`                       | Cadena         | null      | ID de entidad para la detección de origen.                                                    |
| `errorHandler(StatsDClientErrorHandler val)` | Entero        | null      | Manejador de errores en caso de un error interno del cliente.                                 |
| `maxPacketSizeBytes(int val)`                | Entero        | 8192/1432 | El tamaño máximo del paquete; 8192 sobre UDS, 1432 para UDP.                              |
| `processorWorkers(int val)`                  | Entero        | 1         | El número de hilos de trabajo del procesador que ensamblan los búferes para su envío.          |
| `senderWorkers(int val)`                     | Entero        | 1         | El número de hilos de trabajo del remitente que envían los búferes al socket.              |
| `poolSize(int val)`                          | Entero        | 512       | Tamaño del grupo de búferes de paquetes de red.                                                   |
| `queueSize(int val)`                         | Entero        | 4096      | Número máximo de mensajes no procesados en la cola.                               |
| `timeout(int val)`                           | Entero        | 100       | El tiempo de espera en milisegundos para operaciones bloqueantes. Aplica solo a sockets Unix. |

Para más información, busque el paquete Java DogStatsD [package][1] para la clase NonBlockingStatsDClient y la clase NonBlockingStatsDClientBuilder. Asegúrese de ver la versión que coincide con el lanzamiento de su cliente.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Parámetro          | Tipo            | Por defecto     | Descripción                                                                                                                                                                                            |
| ------------------ | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`             | Cadena          | `localhost` | El host de su servidor DogStatsD. Si esto no está configurado, el Agente revisa la variable de entorno `DD_AGENT_HOST` o `DD_DOGSTATSD_URL`.                                                               |
| `port`             | Entero         | `8125`      | El puerto de su servidor DogStatsD. Si esto no está configurado, el Agente revisa la variable de entorno `DD_DOGSTATSD_PORT` o `DD_DOGSTATSD_URL`.                                                          |
| `socket_path`      | Cadena          | `null`      | La ruta al socket de dominio UNIX de DogStatsD (anula `host` y `port`). Esto solo es compatible con el Agente v6 o superior. Si esto no está configurado, el Agente revisa la variable de entorno `DD_DOGSTATSD_URL`. |
| `global_tags`      | Lista de Cadenas | `null`      | Etiquetas que se aplicarán a todas las métricas, eventos y verificaciones de servicio. La etiqueta `@dd.internal.entity_id` se agrega a global_tags de la variable de entorno `DD_ENTITY_ID`.                                    |
| `origin_detection` | Booleano         | Verdadero        | ¿Se deben agregar campos de detección de origen a cada métrica?                                                                                                                                                |
| `container_id`     | Cadena          | `null`      | Un id de contenedor para etiquetar todas las métricas para la detección de origen.                                                                                                                                           |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| Parámetro          | Tipo            | Por defecto     | Descripción                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | Cadena          | `localhost` | El nombre del host del servidor StatsD objetivo.                         |
| `StatsdPort`       | Entero         | `8125`      | El puerto del servidor StatsD objetivo.                              |
| `Prefix`           | Cadena          | `null`      | Prefijo a aplicar a cada métrica, evento y verificación de servicio.           |
| `ConstantTags`     | Lista de cadenas | `null`      | Etiquetas globales que se aplicarán a cada métrica, evento y verificación de servicio. |
| `OriginDetection`  | Bool            | Verdadero        | ¿Se deben agregar campos de detección de origen a cada métrica?              |
| `ContainerID`      | Cadena          | `null`      | Un id de contenedor para etiquetar todas las métricas para la detección de origen.         |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Sumérgete en DogStatsD {#dive-into-dogstatsd}

DogStatsD y StatsD son ampliamente similares; sin embargo, DogStatsD contiene características avanzadas que son específicas de Datadog, incluyendo tipos de datos disponibles, eventos, verificaciones de servicio y etiquetas:

{{< whatsnext desc="">}}
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}Envía métricas a Datadog con DogStatsD.{{< /nextlink >}}
{{< nextlink href="/events/guides/dogstatsd/" >}}Envía eventos a Datadog con DogStatsD.{{< /nextlink >}}
{{< nextlink href="/extend/service_checks/dogstatsd_service_checks_submission/" >}}Envía verificaciones de servicio a Datadog con DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

Si está interesado en aprender más sobre el formato de datagrama utilizado por DogStatsD, o desea desarrollar su propia biblioteca de Datadog, consulte la sección de [datagrama y uso de shell][9], que también explica cómo enviar métricas y eventos directamente desde la línea de comandos.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/statsd/statsd
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /es/metrics/custom_metrics/
[6]: /es/events/guides/dogstatsd/
[7]: /es/extend/service_checks/dogstatsd_service_checks_submission/
[8]: /es/getting_started/tagging/unified_service_tagging
[9]: /es/extend/dogstatsd/datagram_shell/
[10]: /es/extend/community/libraries/
[11]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[12]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[33]: https://registry.datadoghq.com/v2/dogstatsd/tags/list
[34]: https://gallery.ecr.aws/datadog/dogstatsd