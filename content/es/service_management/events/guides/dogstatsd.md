---
aliases:
- /es/developers/events/dogstatsd/
- /es/events/guides/dogstatsd
description: Información general sobre las características de DogStatsD, incluidos
  los tipos de datos y etiquetado.
further_reading:
- link: /developers/dogstatsd/
  tag: Documentación
  text: Introducción a DogStatsD
- link: /developers/community/libraries/
  tag: Documentación
  text: API oficial y creada por la comunidad y bibliotecas de clientes de DogStatsD
kind: guía
title: Eventos con DogStatsD
---

## Envío

Después de [instalar DogStatsD][1], puedes emitir eventos al [Datadog Event Explorer][2] con la siguiente función:

```text
event(<title>, <message>, <alert_type>, <aggregation_key>, <source_type_name>, <date_happened>, <priority>, <tags>, <hostname>)
```

**Definiciones**:

| Parámetro            | Tipo            | Obligatorio | Descripción                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<title>`            | Cadena          | Sí      | El título del evento                                                                     |
| `<message>`          | Cadena          | Sí      | El cuerpo del texto del evento                                                                 |
| `<alert_type>`       | Cadena          | No       | `error`, `warning`, `success` o `info` (por defecto `info`)                              |
| `<aggregation_key>`  | Cadena          | No       | Una clave para agregar eventos                                                        |
| `<source_type_name>` | Cadena          | No       | El nombre del tipo de fuente (por defecto `my_apps`)                                               |
| `<date_happened>`    | Entero         | No       | La marca de tiempo de la época del evento (por defecto es la hora actual del servidor de DogStatsD) |
| `<priority>`         | Cadena          | No       | Especifica la prioridad del evento (`normal` o `low`)                                    |
| `<tags>`             | Lista de cadenas | No       | Un lista de etiquetas asociadas a este evento                                                  |
| `<hostname>`         | Cadena          | No       | El nombre del host                                                                       |

### Ejemplos

Ejecuta el siguiente código para ver errores y excepciones en Datadog con un evento de DogStatsD. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
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
        dogstatsdClient.SimpleEvent("An error occurred", "Error message")
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .build();

        Statsd.recordEvent(event);
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
            dogStatsdService.Event("An error occurred", "Error message", alertType: "error", date_happened='TIMESTAMP', tags: new[] { "env:dev" }); 
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

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
```

Con la biblioteca de DogStatsD-PHP puedes enviar eventos a través de TCP directamente a la API de Datadog. Es más lento pero más fiable que utilizar la instancia de DogStatsD del Agent, ya que los eventos se reenvían desde tu aplicación al Agent mediante UDP.
Para utilizarlo, debes configurar la biblioteca con tus [claves de aplicación y API de Datadog][1] en lugar de la instancia local de DogStatS:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('api_key' => '<DATADOG_API_KEY>',
          'app_key' => '<DATADOG_APPLICATION_KEY>',
     )
  );

$statsd->event('An error occurred.',
    array( 'text' => 'Error message',
           'alert_type' => 'error'
    )
  );
```


[1]: https://app.datadoghq.com/organization-settings/api-keys
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**Nota**:

* El envío de eventos mediante este método utiliza cURL para las solicitudes de API.
* Debes utilizar un bloque de código `try`/`catch` para evitar advertencias o errores sobre problemas de comunicación con la API de Datadog.


## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/developers/dogstatsd/
[2]: /es/service_management/events/