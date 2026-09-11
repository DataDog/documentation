---
description: Información general de las características de DogStatsD, incluidos los
  tipos de datos y el etiquetado.
further_reading:
- link: /developers/dogstatsd/
  tag: Documentación
  text: Introducción a DogStatsD
- link: /developers/community/libraries/
  tag: Documentación
  text: API oficiales y creadas por la comunidad, y bibliotecas cliente de DogStatsD
title: 'Envío de checks de servicios: DogStatsD'
---

Mientras que StatsD sólo acepta métricas, DogStatsD acepta los tres tipos de datos principales de Datadog: métricas, eventos y checks de servicios. Esta sección muestra casos típicos de uso de checks de servicios con ejemplos de código.

## Función

Después de [instalar DogStatsD][1], puedes enviar checks de servicios a Datadog con la siguiente función:

```text
service_check(<SERVICE_CHECK_NAME>, <STATUS>, <TAGS>, <HOSTNAME>, <MESSAGE>)
```

Parámetro de función en checks de servicios:

| Parámetro              | Tipo            | Obligatorio | Valor por defecto | Descripción                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<SERVICE_check_NAME>` | Cadena          | Sí      | -             | Nombre del check de servicio.                                                                             |
| `<STATUS>`             | Int             | Sí      | -             | Constante que describe el estado del servicio: `0` para OK (Normal), `1` para WARN (Advertencia), `2` para CRITICAL (Crítico) y `3` para UNKNOWN (Desconocido). |
| `<TAGS>`               | Lista de pares clave/valor | No       | -             | Lista de etiquetas para asociar al check de servicio.                                                        |
| `<hostNAME>`           | Cadena          | No       | Host actual  | Nombre del host para asociar al check de servicio.                                                          |
| `<MESSAGE>`            | Cadena          | No       | -             | Información adicional o una descripción de por qué se ha producido el estado.                                        |

### Ejemplos de códigos

Ejecuta el siguiente código para enviar un check de servicio a través de DogStatsD a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd

options = {"statsd_host": "127.0.0.1", "statsd_port": 8125}

initialize(**options)

statsd.service_check(
    check_name="application.service_check",
    status="0",
    message="La aplicación se encuentra bien",
)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.service_check('application.service_check', 0, {'message' => 'Application is OK'})
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {

    dogstatsdClient, err := statsd.New("127.0.0.1:8125")

    if err != nil {
        log.Fatal(err)
    }

    for {
        dogstatsdClient.SimpleServiceCheck("application.service_check", 0)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.ServiceCheck;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        ServiceCheck sc = ServiceCheck.builder()
                          .withName("Service.check.name")
                          .withStatus(ServiceCheck.Status.OK)
                          .build();

        Statsd.serviceCheck(sc);
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
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
            dogStatsdService.ServiceCheck("Service.check.name", 0, message: "La aplicación se encuentra bien.", tags: new[] { "env:dev" });
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

$statsd->service_check('Service.check.name', 0);
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Después de que se notifique un check de servicio, utilízalo para activar un [monitor de checks de servicios][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/dogstatsd/
[2]: /es/monitors/types/service_check/