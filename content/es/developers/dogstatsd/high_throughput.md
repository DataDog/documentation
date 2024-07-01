---
description: Optimización de DogStatsD para proporcionar un alto rendimiento
further_reading:
- link: developers/dogstatsd
  tag: Documentación
  text: Introducción a DogStatsD
- link: developers/libraries
  tag: Documentación
  text: API oficiales y creadas por la comunidad, y bibliotecas cliente de DogStatsD
kind: documentación
title: Envío de grandes volúmenes de métricas
---

DogStatsD funciona enviando al [Agent][1] métricas generadas por tu aplicación, a través de un protocolo de transporte. Este protocolo puede ser UDP (protocolo de datagrama de usuario) o [UDS (socket de dominio UNIX)][2].

Cuando se utiliza DogStatsD para enviar un gran volumen de métricas a un único Agent, si no se toman las medidas adecuadas, es frecuente encontrar los siguientes síntomas:

- Uso elevado de CPU por parte del Agent 
- Datagramas y métricas perdidos
- La biblioteca cliente de DogStatsD (UDS) devuelve errores

La mayoría de las veces los síntomas pueden aliviarse modificando algunas opciones de configuración que se describen a continuación.

## Consejos generales

### Uso de clientes oficiales de Datadog

Datadog recomienda utilizar la última versión de los [clientes oficiales de DogStatsD][3] para cada uno de los principales lenguajes de programación.

### Activar el almacenamiento en buffer en un cliente

Algunos clientes de StatsD y DogStatsD envían, por defecto, una métrica por cada datagrama. Esto añade una sobrecarga considerable al cliente, al sistema operativo y al Agent. Si tu cliente admite el almacenamiento en buffer de varias métricas en un datagrama, la activación de esta opción aporta mejoras notables.

<div class="alert alert-info">
Si utilizas un cliente de DogStatsD comunitario, compatible con el almacenamiento en búfer, asegúrate de configurar un tamaño máximo de datagrama que no supere el tamaño de buffer por datagrama en el Agent (8 KB por defecto, configurable en el Agent con (<code>dogstatsd_buffer_size</code>) y el tamaño máximo por datagrama en la red o el sistema operativo.
</div>

Los siguientes son algunos ejemplos para [clientes oficiales compatibles con DogStatsD][3]:

{{< programming-lang-wrapper langs="go,python,ruby,java,.NET,PHP" >}}
{{< programming-lang lang="go" >}}

Por defecto, la biblioteca Golang oficial de Datadog [DataDog/datadog-go][1] utiliza el almacenamiento en búfer. El tamaño de cada paquete y el número de mensajes utilizan diferentes valores por defecto para `UDS` y `UDP`. Para obtener más información sobre la configuración del cliente, consulta [Datadog/Datadog-go][1].

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/v5/statsd"
)

func main() {
  // In this example, metrics are buffered by default with the correct default configuration for UDP.
  statsd, err := statsd.New("127.0.0.1:8125")
  if err != nil {
    log.Fatal(err)
  }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Cuando se utiliza la biblioteca Python oficial de Datadog [datadogpy][1], el ejemplo siguiente utiliza un cliente de DogStatsD almacenado en búfer que envía métricas en un número mínimo de paquetes. El vaciado automático del almacenamiento se realiza al límite de tamaño de paquete y cada 300ms (configurable).

```python
desde Datadog importar DogStatsd


# Cuando se utiliza el cliente v0.43.0 o posterior
dsd = DogStatsd(host="127.0.0.1", port=8125, disable_buffering=False)
dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
dsd.flush()  # Optional manual flush

# Cuando se utiliza el cliente anterior a v0.43.0, el gestor de contextos es necesario para utilizar el almacenamiento en buffer 
dsd = DogStatsd(host="127.0.0.1", port=8125)
con dsd:
    dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```

<div class="alert alert-warning">
Por defecto, las instancias del cliente Python de DogStatsD (incluyendo la instancia global <code>statsd</code>) no pueden ser compartidas entre procesos, pero son thread-safe. Debido a esto, el proceso principal y cada proceso secundario deben crear sus propias instancias de cliente o el almacenamiento en búfer debe ser explícitamente deshabilitado configurando <code>disable_buffering</code> como <code>True</code>. Para ver más detalles, consulta la documentación sobre <a href="https://datadogpy.readthedocs.io/en/latest/#Datadog-DogStatsD">datadog.dogstatsd</a>.
</div>


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Cuando de utiliza la biblioteca Ruby oficial de Datadog [dogstatsd-ruby][1], el siguiente ejemplo crea una instancia de cliente de DogStatsD almacenada en búfer que envía métricas en un paquete cuando se activa el vaciado:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('example_metric.increment', tags: ['environment:dev'])
statsd.gauge('example_metric.gauge', 123, tags: ['environment:dev'])

# synchronous flush
statsd.flush(sync: true)
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}


Cuando se utiliza la biblioteca Java oficial de Datadog [java-dogstatsd-client][1], el ejemplo siguiente crea una instancia de cliente de DogStatsD almacenada en buffer, con un tamaño máximo de paquete de 1500 bytes, lo que significa que todas las métricas enviadas desde esta instancia del cliente se almacenan en buffer y se envían en paquetes con una extensión de paquete de `1500` como máximo:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("namespace").
            .hostname("127.0.0.1")
            .port(8125)
            .maxPacketSizeBytes(1500)
            .build();

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}
Cuando se utiliza la biblioteca C# oficial de Datadog [dogstatsd-csharp-client][1], el siguiente ejemplo crea un cliente DogStatsD con UDP como transporte:

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");

            // Counter and Gauge are sent in the same datagram
            dogStatsdService.Counter("example_metric.count", 2, tags: new[] { "environment:dev" });
            dogStatsdService.Gauge("example_metric.gauge", 100, tags: new[] { "environment:dev" });
        }
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Cuando de utiliza la biblioteca PHP oficial de Datadog [php-datadogstatsd][1], el siguiente ejemplo crea una instancia de cliente de DogStatsD almacenada en búfer que envía métricas en un paquete cuando se completa el bloque:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd(
  array('host' => '127.0.0.1',
          'port' => 8125,
     )
);

$client->increment('example_metric.increment', array('environment'=>'dev'));
$client->increment('example_metric.increment', $sampleRate->0.5 , array('environment'=>'dev'));
```


[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Muestreo de métricas

Es posible reducir el tráfico desde tu cliente de DogStatsD al Agent configurando un valor de tasa de muestreo para tu cliente. Por ejemplo, una frecuencia de muestreo de mitades de `0.5` reduce a la mitad el número de paquetes UDP enviados. Esta solución es un intercambio, ya que reduces el tráfico pero al mismo tiempo pierdes un poco de precisión y granularidad.

Para obtener más información y ejemplos de código, consulta [Parámetro "Tasa de muestreo" de DogStatsD explicado][4].

### Uso de DogStatsD en UDS (socket de dominio UNIX)

UDS es un protocolo de comunicación inter-proceso utilizado para [transportar cargas útiles de DogStatsD][2]. Tiene poca sobrecarga, en comparación con el UDP, y reduce la huella general de DogStatsD en tu sistema.

### Agregación del lado del cliente

Las bibliotecas de cliente pueden agregar métricas en el lado del cliente, lo que reduce el número de mensajes que deben enviarse al Datadog Agent y mejora el rendimiento de E/S.

{{< programming-lang-wrapper langs="go,java,.NET" >}}
{{< programming-lang lang="go" >}}

La agregación del lado del cliente sólo está disponible en el cliente Go, a partir de la versión 5.0.0.

Para obtener más información, consulta la [agregación del lado del cliente][1].

[1]: https://github.com/DataDog/datadog-go#client-side-aggregation
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

La agregación del lado del cliente está disponible en java-dogstatsd-client versión 2.11.0 y posteriores, y está activada por defecto a partir de la versión 3.0.0.

```java
StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
    // regular setup
    .enableAggregation(true)
    .build();
```

La agregación del lado del cliente está disponible para indicadores, contadores y conjuntos.

Para obtener más información, consulta la [agregación del lado del cliente][1].

[1]: https://github.com/DataDog/java-dogstatsd-client#aggregation
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

La agregación del lado del cliente está disponible en el cliente de C# de DogStatsD v7.0.0 y posteriores, y está activada por defecto. La agregación del lado del cliente está disponible para indicadores, contadores y conjuntos.

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
    ClientSideAggregation = new ClientSideAggregationConfig()
};
```


Para obtener más información, consulta el [repositorio DogStatsD para C#][1].

[1]: https://github.com/DataDog/dogstatsd-csharp-client#client-side-aggregation
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Ejecutar varias métricas que procesan pipelines para limitar las caídas de paquetes

Si tu servidor DogStatsD utiliza UDS y está perdiendo paquetes a un alto rendimiento, configurar el servidor para utilizar más CPU puede mejorar la velocidad de procesamiento y disminuir la pérdida de paquetes.

También puedes configurar tu servidor DogStatsD si la telemetría del cliente indica pérdidas de paquetes y el servidor no utiliza más de 2 CPU o 2 núcleos, aunque estén disponibles.

Para reducir la cantidad de pérdidas de paquetes:

1. Aumenta el tamaño de la cola de clientes a `8192`. Para obtener más información, consulta la configuración de la biblioteca cliente. Puede que veas disminuir la cantidad de pérdidas y que tu aplicación utilice más RAM.
2. Además, puedes activar la función `dogstatsd_pipeline_autoadjust: true` en la configuración de tu Datadog Agent. El Agent utiliza varios núcleos para procesar métricas personalizadas, lo que puede suponer un mayor uso de CPU, pero reducir las pérdidas de paquetes.

## Buffers de kernel del sistema operativo

La mayoría de los sistemas operativos añaden datagramas UDP y UDS entrantes, que contienen tus métricas, a un buffer con un tamaño máximo. Una vez alcanzado el máximo, los datagramas que contienen tus métricas empiezan a ser descartados. Es posible ajustar los valores para dar al Agent más tiempo para procesar las métricas entrantes:

### En UDP (protocolo de datagramas de usuario)

#### Linux

En la mayoría de las distribuciones de Linux, el tamaño máximo del buffer de kernel está configurado por defecto en `212992` (208 KiB). Esto puede confirmarse utilizando los siguientes comandos:

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

Para configurar el tamaño máximo del buffer del socket DogStatsD en 25MiB, ejecuta:

```bash
sysctl -w net.core.rmem_max=26214400
```

Añade la siguiente configuración a `/etc/sysctl.conf`, para que este cambio sea permanente:

```conf
net.core.rmem_max = 26214400
```

A continuación, configura la opción `dogstatsd_so_rcvbuf` del Agent con el mismo número en `datadog.yaml`:

```yaml
dogstatsd_so_rcvbuf: 26214400
```

Consulta la sección [Nota sobre sysctl en Kubernetes][5], si estás desplegando el Agent o DogStatsD en Kubernetes.

### En UDS (socket de dominio UNIX)

#### Linux

Para los sockets UDS, Linux almacena en buffer internamente los datagramas de una cola, si el lector es más lento que el escritor. El tamaño de esta cola representa el número máximo de datagramas que Linux almacena en buffer por cada socket. Este valor se puede consultar con el siguiente comando:

```bash
sysctl net.unix.max_dgram_qlen
```

Si el valor es menor a 512, puedes aumentarlo a 512 o más, utilizando el siguiente comando:

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

Añade la siguiente configuración a `/etc/sysctl.conf`, para que este cambio sea permanente:

```conf
net.unix.max_dgram_qlen = 512
```

De la misma manera, `net.core.wmem_max` podría incrementarse a 4MiB, para mejorar
el rendimiento de escritura del cliente:

```conf
net.core.wmem_max = 4194304
```

A continuación, configura la opción `dogstatsd_so_rcvbuf` del Agent con el mismo número en `datadog.yaml`:

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### Nota sobre sysctl en Kubernetes

Si estás utilizando Kubernetes para desplegar el Agent o DogStatsD, y quieres configurar los sysctls, como se mencionó anteriormente, configura su valor por cada contenedor. Si el sysctls`net.*` incluye espacios de nombre, puedes configurarlos por cada pod. Consulta la documentación de Kubernetes en [Uso de sysctls en un clúster de Kubernetes][6].

## Garantizar el tamaño adecuado de los paquetes

Evita el uso extra de CPU enviando paquetes con un tamaño adecuado al servidor DogStatsD en el Datadog Agent. Las últimas versiones de los clientes oficiales de DogStatsD envían paquetes con un tamaño optimizado para el rendimiento.

Puedes saltarte esta sección, si utilizas uno de los últimos clientes de DogStatsD de Datadog.

Si los paquetes enviados son demasiado pequeños, el Datadog Agent agrupa varios de ellos para procesarlos por lotes en el pipeline más adelante. Los clientes oficiales de DogStatsD son capaces de agrupar métricas para tener la mejor proporción de número de métricas por paquete.

El rendimiento del Datadog Agent es óptimo si los clientes de DogStatsD envían paquetes del tamaño de `dogstatsd_buffer_size`. Los paquetes no deben ser mayores que el tamaño de buffer, de lo contrario, el Agent no podrá cargarlos completamente en el buffer sin que las métricas se generen incorrectamente. Utiliza el campo de configuración correspondiente en tus clientes de DogStatsD.

<div class="alert alert-info">
 <strong>Nota para UDP</strong>: Dado que los paquetes UDP suelen atravesar la capa Ethernet e IP, puedes evitar la fragmentación de paquetes IP limitando el tamaño del paquete a un valor inferior al de un solo marco Ethernet en tu red. La mayoría de las veces, las redes IPv4 se configuran con una MTU de 1500 bytes, por lo que en esta situación el tamaño de los paquetes enviados debe limitarse a 1472.
</div>

<div class="alert alert-info">
 <strong>Nota para UDS</strong>: Para obtener los mejores rendimientos, el tamaño del paquete UDS debe ser de 8192 bytes.
</div>

## Limitar el uso máximo de memoria por parte del Agent

El Agent intenta absorber la ráfaga de métricas enviadas por los clientes de DogStatsD, pero para ello necesita utilizar memoria. Aunque sea por poco tiempo y aunque esta memoria se libere rápidamente al sistema operativo, se produce un pico y esto podría ser un problema en entornos contenedorizados, donde el límite de uso de memoria podría desalojar pods o contenedores.

Evita enviar métricas en ráfagas en tu aplicación. Esto evita que el Datadog Agent alcance su uso máximo de memoria.

Otra cosa que necesitas tener en cuenta para limitar el uso máximo de memoria es reducir el almacenamiento en buffer. El buffer principal del servidor DogStatsD en el Agent es configurable con el campo `dogstatsd_queue_size` (a partir del Datadog Agent v6.1.0). Su valor por defecto de `1024` induce un uso máximo aproximado de memoria de 768MB.

<div class="alert alert-warning">
 <strong>Nota</strong>: Reducir el tamaño de buffer podría aumentar el número de paquetes perdidos.
</div>

En este ejemplo se reduce el uso máximo de memoria de DogStatsD a aproximadamente 384MB:

```yaml
dogstatsd_queue_size: 512
```

Consulta la siguiente sección sobre detección de ráfagas, para ayudar a detectar ráfagas de métricas en tus aplicaciones.

## Activar las métricas que procesan estadísticas y la detección de ráfagas

DogStatsD tiene un modo de estadísticas en el que puedes ver qué métricas son las más procesadas.

<div class="alert alert-warning">
 <strong>Nota</strong>: La activación del modo de estadísticas de métricas puede disminuir el rendimiento de DogStatsD.
</div>

Para activar el modo de estadísticas, puedes:

- Configurar `dogstatsd_stats_enable` como `true` en tu archivo de configuración 
- Configurar la variable de entorno `DD_DogStatsD_STATS_ENABLE` como `true`
- Utiliza el comando `datadog-agent config set dogstatsd_stats true` para activarlo durante el tiempo de ejecución. Puedes desactivarlo durante el tiempo de ejecución, utilizando el comando `datadog-agent config set dogstatsd_stats false`.

Cuando este modo está activado, ejecuta el comando `datadog-agent dogstatsd-stats`. Las métricas recibidas devuelven una lista de métricas procesadas en orden descendente.

Mientras funciona en este modo, el servidor DogStatsD ejecuta un mecanismo de detección de ráfagas. Si se detecta una ráfaga, se emite un log de advertencia Por ejemplo:

```text
Una ráfaga de métricas ha sido detectada por DogStatsD: el siguiente es el recuento de los últimos 5 segundos de métricas: [250 230 93899 233 218]
```

## Telemetría del lado del cliente

Los clientes de DogStatsD por defecto envían métricas de telemetría al Agent. Esto te permite localizar mejor los cuellos de botella y resolverlos. Cada métrica se etiqueta con el idioma del cliente y la versión del cliente. Estas métricas no se contabilizan como métricas personalizadas.

Cada cliente comparte un conjunto de etiquetas (tags) comunes.

| Etiqueta                | Descripción                                       | Ejemplo                |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `client`           | Idioma del cliente                        | `client:py`            |
| `client_version`   | Versión del cliente                         | `client_version:1.2.3` |
| `client_transport` | Transporte utilizado por el cliente (`udp` o `uds`) | `client_transport:uds` |

**Nota**: Cuando se utiliza UDP, los errores de red no pueden ser detectados por el cliente y las métricas correspondientes no reflejan pérdidas de bytes o de paquetes.

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}

A partir de la versión `0.34.0` del cliente de Python.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo).

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente DogStatsD.

Para desactivar la telemetría, utiliza el método `disable_telemetry`:

```python
statsd.disable_telemetry()
```

Para obtener más información sobre la configuración del cliente, consulta [Datadog/datadogpy][1].


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

A partir de la versión `4.6.0` del cliente Ruby.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo).

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente de DogStatsD.

Para desactivar la telemetría, ajusta el parámetro `disable_telemetry` como `true`:

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

Para obtener más información sobre la configuración del cliente, consulta [DataDog/dogstatsd-ruby][1].


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

A partir de la versión `3.4.0` del cliente Go.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo y la agregación).

`datadog.dogstatsd.client.metrics_by_type`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas por el cliente de DogStatsD, antes del muestreo y la agregación, etiquetadas por tipo de métrica (`gauge`,
`set`, `count`, `timing`, `histogram` o `distribution`). A partir de la versión 5.0.0 del cliente Go.

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados por el cliente de DogStatsD (esto incluye `datadog.dogstatsd.client.bytes_dropped_queue` 
y `datadog.dogstatsd.client.bytes_dropped_writer`).

`datadog.dogstatsd.client.bytes_dropped_queue`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados porque la cola de clientes de DogStatsD estaba llena.

`datadog.dogstatsd.client.bytes_dropped_writer`
: **Tipo de métrica**: recuento<br>
Número de bytes perdidos por un error al escribir en Datadog, debido a un tiempo de espera o un error de red.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente de DogStatsD (esto incluye `datadog.dogstatsd.client.packets_dropped_queue` 
y `datadog.dogstatsd.client.packets_dropped_writer`).

`datadog.dogstatsd.client.packets_dropped_queue`
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados porque la cola de clientes de DogStatsD estaba llena.

`datadog.dogstatsd.client.packets_dropped_writer`
: **Tipo de métrica**: recuento<br>
Número de bytes perdidos por un error al escribir en Datadog, debido a un tiempo de espera o un error de red.

`datadog.dogstatsd.client.metric_dropped_on_receive` 
: **Tipo de métrica**: recuento<br>
Número de métricas perdidas porque el canal de recepción interno estaba lleno (cuando se utiliza `WithChannelMode()`). A partir 
de la versión 3.6.0 del cliente de Go, cuando `WithChannelMode()` está habilitado.

`datadog.dogstatsd.client.aggregated_context`
: **Tipo de métrica**: recuento
Número total de contextos vaciados por el cliente, cuando la agregación del lado del cliente está habilitada. A partir de la versión 5.0.0 
del cliente de Go. Esta métrica sólo se informa cuando la agregación está habilitada (opción predeterminada).

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Tipo de métrica**: recuento
Número total de contextos vaciados por el cliente, cuando la agregación del lado del cliente está habilitada, etiquetados por tipo de métrica 
(`gauge`, `set`, `count`, `timing`, `histogram` o `distribution`). A partir de la versión 5.0.0 del cliente de Go. Esta métrica 
sólo se informa cuando la agregación está habilitada (opción predeterminada).

Para desactivar la telemetría, utiliza el parámetro `WithoutTelemetry`:

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

Para obtener más información sobre la configuración del cliente, consulta [DataDog/datadog-go][1].


[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

A partir de la versión `2.10.0` del cliente Java.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo).

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_dropped_queue`
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados porque la cola de clientes de DogStatsD estaba llena.

`datadog.dogstatsd.client.aggregated_context`
: **Tipo de métrica**: recuento
Número de contextos agregados cuando la agregación del lado del cliente está activada. A partir de la versión `v2.11.0`.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Tipo de métrica**: recuento
Número de contextos agregados por tipo cuando la agregación del lado del cliente está activada. A partir de la versión `v2.13.0`. La métrica está habilitada por defecto a partir de la versión `v3.0.0` pero requiere `enableDevMode(true)` para `v2.13.0`. La métrica está etiquetada por `metrics_type`.

`datadog.dogstatsd.client.metrics_by_type`
: **Tipo de métrica**: recuento<br>
Número de métricas enviadas al cliente de DogStatsD por tu aplicación, etiquetadas por tipo (antes del muestreo). A partir de la versión `v2.13.0`, cuando se utiliza `enableDevMode(true)`, y por defecto, a partir de `v3.0.0`. La métrica está etiquetada por `metrics_type`.

Para desactivar la telemetría, utiliza la opción del creador `enableTelemetry(false)`:

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
.hostname("localhost")
.port(8125)
.enableTelemetry(false)
.build();
```

Para obtener más información sobre la configuración del cliente, consulta [DataDog/java-dogstatsd-client][1].


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

A partir de la versión `1.5.0` del cliente de PHP la telemetría está activada 
por defecto, para el cliente de `BatchedDogStatsd`, y está desactivada por defecto, para el 
cliente de `DogStatsd`.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo).

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente de DogStatsD.

Para activar o desactivar la telemetría, utiliza el argumento `disable_telemetry`. Atención,
utilizar telemetrías con clientes de `DogStatsd` incrementa el uso de red 
significativamente. Se aconseja utilizar el `BatchedDogStatsd` cuando se utiliza la telemetría.

Para activarlo en el cliente `DogStatsd`:

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => false,
)
);
```

Para desactivar la telemetría en el cliente de `BatchedDogStatsd`:

```php
use DataDog\BatchedDogStatsd;

$statsd = new BatchedDogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => true,
)
);
```

Para obtener más información sobre la configuración del cliente, consulta [DataDog/php-datadogstatsd][1].

[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

A partir de la versión `5.0.0` del cliente .NET.

`datadog.dogstatsd.client.metrics`
: **Tipo de métrica**: recuento<br>
Número de `metrics` enviadas al cliente de DogStatsD por tu aplicación (antes del muestreo).

`datadog.dogstatsd.client.events`
: **Tipo de métrica**: recuento<br>
Número de `events` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.service_checks`
: **Tipo de métrica**: recuento<br>
Número de `service_checks` enviados al cliente de DogStatsD por tu aplicación.

`datadog.dogstatsd.client.bytes_sent`
: **Tipo de métrica**: recuento<br>
Número de bytes enviados correctamente al Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Tipo de métrica**: recuento<br>
Número de bytes perdidos por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_sent`
: **Tipo de métrica**: recuento<br>
Número de datagramas enviados correctamente al Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados por el cliente de DogStatsD.

`datadog.dogstatsd.client.packets_dropped_queue`
: **Tipo de métrica**: recuento<br>
Número de datagramas descartados porque la cola de clientes de DogStatsD estaba llena.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Tipo de métrica**: recuento<br>
Número de contextos agregados por tipo cuando la agregación del lado del cliente está activada. A partir de la versión `7.0.0`.

Para desactivar la telemetría, configura `TelemetryFlushInterval` como `null`:

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

// Disable Telemetry
dogstatsdConfig.Advanced.TelemetryFlushInterval = null;
```

Para obtener más información sobre la configuración del cliente, consulta [Cliente DataDog/dogstatsd-csharp][1].



[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/developers/dogstatsd/unix_socket/
[3]: /es/developers/dogstatsd/#code
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /es/developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/