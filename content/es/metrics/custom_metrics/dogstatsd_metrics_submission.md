---
aliases:
- /es/developers/faq/reduce-submission-rate
- /es/developers/faq/why-is-my-counter-metric-showing-decimal-values
- /es/developers/faq/dog-statsd-sample-rate-parameter-explained
- /es/developers/metrics/dogstatsd_metrics_submission/
- /es/metrics/dogstatsd_metrics_submission
description: Envía métricas personalizadas directamente desde tu aplicación.
further_reading:
- link: /developers/dogstatsd/
  tag: Documentación
  text: Presentación de DogStatsD
- link: /metrics/types/
  tag: Documentación
  text: Tipos de métricas de Datadog
title: 'Envío de métricas: DogStatsD'
---

Mientras que StatsD sólo acepta métricas, DogStatsD acepta los tres tipos de datos principales de Datadog: métricas, eventos y checks de servicios. Esta sección muestra los casos de uso típicos de métricas divididos por tipos de métrica e introduce las opciones [muestreo de índices](#sample-rates) y [etiquetado de métricas][metric tagging], específicas de DogStatsD.

Los tipos de métricas [RECUENTO](#count), [INDICADOR](#gauge) y [CONFIGURAR](#set) son familiares para los usuarios de StatsD. `TIMER` de StatsD es un subconjunto de `HISTOGRAM` en DogStatsD. Además, puedes enviar los tipos de métricas [HISTOGRAMA](#histogram) y [DISTRIBUCIÓN](#distribution) utilizando DogStatsD.

**Nota**: Dependiendo del método de envío utilizado, el tipo real de métrica almacenado en Datadog puede diferir del tipo de métrica de envío. Al enviar un tipo de métrica TARIFA a través de DogStatsD, la métrica aparece como INDICADOR en la aplicación, para garantizar una comparación pertinente entre los distintos Agents.

## Roles

Después de [instalar DogStatsD][1], los siguientes roles están disponibles para enviar tus métricas a Datadog en función de tu tipo de métrica. Los roles comparten los siguientes parámetros:

| Parámetro        | Tipo            | Obligatorio | Descripción                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Cadena          | Sí      | Nombre de la métrica que se va a enviar.                                                                                                                                                                  |
| `<METRIC_VALUE>` | Doble          | Sí      | Valor asociado a tu métrica.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Doble          | No       | La frecuencia de muestreo que se aplicará a la métrica. Toma un valor entre `0` (se muestrea todo, por lo que no se envía nada) y `1` (sin muestreo). Para obtener más información, consulta la sección [Frecuencia de muestreo](#sample-rates). |
| `<TAGS>`         | Lista de cadenas | No       | Un lista de etiquetas (tags) para aplicar a la métrica. Para obtener más información, consulta la sección [Etiquetado de métricas](#metric-tagging).                                                                                       |

### RECUENTO

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: Utilizado para incrementar una métrica CUENTA. Almacenado como un tipo `RATE` en Datadog. Cada valor de la serie temporal almacenada es un delta normalizado en el tiempo del valor de la métrica durante el periodo de vaciado de StatsD.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>)`
: Utilizado para disminuir una métrica CUENTA. Almacenado como un tipo `RATE` en Datadog. Cada valor de la serie temporal almacenada es un delta normalizado en el tiempo del valor de métrica durante el periodo de descarga de StatsD.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Utilizado para incrementar una métrica COUNT desde un `Value` arbitrario . Almacenado como un tipo `RATE` en Datadog. Cada valor de la serie temporal almacenada es un delta normalizado en el tiempo del valor de métrica durante el período de vaciado de StatsD.
: **Nota:** `count` no es compatible con Python.

**Nota**: El tipo de métricas `COUNT` pueden mostrar un valor decimal en Datadog, ya que se normalizan durante el intervalo de vaciado para informar unidades por segundo.

#### Ejemplos de códigos

Emite una métrica `COUNT` almacenada como métrica `RATE` a Datadog. Para obtener más información sobre el tipo de métrica `COUNT`, consulta la documentación sobre [tipos de métricas][2].

Ejecuta el siguiente código para enviar una métrica de DogStatsD `COUNT` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.increment('example_metric.increment', tags=["environment:dev"])
  statsd.decrement('example_metric.decrement', tags=["environment:dev"])
  time.sleep(10)
```

**Nota:** `statsd.count` no es compatible con Python.

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125, tags: ['environment:dev'])

while true do
    statsd.increment('example_metric.increment')
    statsd.increment('example_metric.increment', tags: ['another:tag'])
    statsd.decrement('example_metric.decrement')
    statsd.count('example_metric.count', 2)
    sleep 10
end
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
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    for true {

        statsd.Incr("example_metric.increment", []string{"environment:dev"}, 1)
        statsd.Decr("example_metric.decrement", []string{"environment:dev"}, 1)
        statsd.Count("example_metric.count", 2, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev"});
            Statsd.decrementCounter("example_metric.decrement", new String[]{"environment:dev"});
            Statsd.count("example_metric.count", 2, new String[]{"environment:dev"});
            Thread.sleep(100000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;
using System;

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
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Increment("example_metric.increment", tags: new[] {"environment:dev"});
                dogStatsdService.Decrement("example_metric.decrement", tags: new[] {"environment:dev"});
                dogStatsdService.Counter("example_metric.count", 2, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(random.Next(100000));
            }
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

while (TRUE) {
    $statsd->increment('example_metric.increment', 1, array('environment'=>'dev'));
    $statsd->decrement('example_metric.decrement', 1, array('environment'=>'dev'));
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="NodeJS" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Después de ejecutar el código anterior, los datos de tus métricas estarán disponibles en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Incremento/Reducción" >}}

Debido a que el valor se envía como `COUNT`, se almacena como `RATE` en Datadog. Para obtener recuentos en bruto en Datadog, aplica una función a tu serie, como por ejemplo una [Suma acumulativa][3] o [Integral][4]:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Incremento/Reducción con sumas acumulativas" >}}

### INDICADOR

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor de la serie temporal almacenada es el último valor gauge enviado para la métrica durante el periodo de vaciado de StatsD.

#### Ejemplos de códigos

Emite una métrica `COUNT` almacenada como métrica `GAUGE` a Datadog. Para obtener más información sobre el tipo de métrica `GAUGE`, consulta la documentación sobre [tipos de métricas][2].

Ejecuta el siguiente código para enviar una métrica de DogStatsD `GAUGE` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

**Nota:** Las llamadas para el envío de métricas son asíncronas. Si quieres asegurarte de que se envíen las métricas, llama a `flush` antes de que se cierre el programa.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

i = 0

while(1):
  i += 1
  statsd.gauge('example_metric.gauge', i, tags=["environment:dev"])
  time.sleep(10)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0

while true do
    i += 1
    statsd.gauge('example_metric.gauge', i, tags: ['environment:dev'])
    sleep 10
end
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
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for true {
        i += 1
        statsd.Gauge("example_metric.gauge", i, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        for (int i = 0; true; i++) {
            Statsd.recordGaugeValue("example_metric.gauge", i, new String[]{"environment:dev"});
            Thread.sleep(10000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;
using System;

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
            var random = new Random(0);

            for (int i = 0; true; i++)
            {
                dogStatsdService.Gauge("example_metric.gauge", i, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(100000);
            }
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

$i = 0;
while (TRUE) {
    $i++;
    $statsd->gauge('example_metric.gauge', $i, array('environment'=>'dev'));
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="NodeJS" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

let i = 0;
while(true) {
  i++;
  tracer.dogstatsd.gauge('example_metric.gauge', i, { environment: 'dev' });
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Después de ejecutar el código anterior, los datos de tus métricas estarán disponibles en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" >}}

### SET

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor de la serie temporal almacenada es el último valor gauge enviado para la métrica durante el periodo de vaciado de StatsD.

#### Ejemplos de códigos

Emita una métrica `SET` almacenada como `GAUGE` a Datadog.

Ejecuta el siguiente código para enviar una métrica de DogStatsD `SET` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
i = 0
while(1):
  i += 1
  statsd.set('example_metric.set', i, tags=["environment:dev"])
  time.sleep(random.randint(0, 10))
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0
while true do
    i += 1
    statsd.set('example_metric.gauge', i, tags: ['environment:dev'])
    sleep rand 10
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "fmt"
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for true {
        i += 1
        statsd.Set("example_metric.set", fmt.Sprintf("%f", i), []string{"environment:dev"}, 1)
        time.Sleep(time.Duration(rand.Intn(10)) * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        for (int i = 0; true; i++) {
            Statsd.recordSetValue("example_metric.set", i, new String[]{"environment:dev"});
            Thread.sleep(random.NextInt(10000));
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;
using System;

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
            var random = new Random(0);

            for (int i = 0; true; i++)
            {
                dogStatsdService.Set("example_metric.set", i, tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(random.Next(100000));
            }
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

$i = 0;

while (TRUE) {
    $i++;
    $statsd->set('example_metric.set', $i, array('environment'=>'dev'));
    sleep(rand(0, 10));
}
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Después de ejecutar el código anterior, los datos de tus métricas estarán disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Set" >}}

### HISTOGRAMA

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Debido a que se envían varias métricas, los tipos de métricas almacenadas (`GAUGE`, `RATE`) dependen de la métrica. Para obtener más información, consulta la documentación sobre [tipos de métricas HISTOGRAMA][6].

#### Configuración

* Configura la agregación que se enviará a Datadog con el parámetro `histogram_aggregates` en tu [archivo de configuración de Datadog.yaml][7]. Por defecto, sólo se envían las agregaciones `max`, `median`, `avg` y `count`.
* Configura la agregación de percentiles que se enviará a Datadog con el parámetro `histogram_percentiles` en tu [archivo de configuración de Datadog.yaml][7]. Por defecto, sólo se envía el percentil `95pc`.

#### Ejemplos de códigos

El tipo de métrica `HISTOGRAM` es específico de DogStatsD. Emite una métrica `HISTOGRAM` almacenada como métrica `GAUGE` y `RATE` a Datadog. Para obtener más información sobre el tipo `HISTOGRAM`, consulta la documentación sobre [tipos de métricas][6].


Ejecuta el siguiente código para enviar una métrica de DogStatsD `HISTOGRAM` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.histogram('example_metric.histogram', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.histogram('example_metric.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for true {
        statsd.Histogram("example_metric.histogram", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.recordHistogramValue("example_metric.histogram", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;
using System;

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
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Histogram("example_metric.histogram", random.Next(20), tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(2000);
            }
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

while (TRUE) {
    $statsd->histogram('example_metric.histogram', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

La instrumentación anterior genera las siguientes métricas:

| Métrica                                  | Descripción                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | Número de veces que se ha muestreado este métrica  |
| `example_metric.histogram.avg`          | Promedio de los valores muestreados           |
| `example_metric.histogram.median`       | Valor mediano muestreado                    |
| `example_metric.histogram.max`          | Valor máximo muestreado                   |
| `example_metric.histogram.95percentile` | Valor del percentil 95 muestreado           |

Después de ejecutar el código anterior, los datos de tus métricas estarán disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histograma" >}}

#### TEMPORIZADOR

La métrica `TIMER` en DogStatsD es una implementación del tipo de métrica `HISTOGRAM` (no confundir con los temporizadores en el StatsD estándar). Sólo mide datos de temporización: por ejemplo, la cantidad de tiempo que tarda en ejecutarse una sección de código.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>)`
: Debido a que se envían varias métricas, los tipos de métricas almacenadas (`GAUGE`, `RATE`) dependen de la métrica. Para obtener más información, consulta la documentación sobre [tipos de métricas HISTOGRAMA][6].

##### Configuración

Para `TIMER`, se aplica la [configuración](#configuration) de `HISTOGRAM`.

##### Ejemplos de códigos

Emite una métrica `TIMER` almacenada como métrica `GAUGE` y `RATE` a Datadog. Para obtener más información sobre el tipo `HISTOGRAM`, consulta la documentación sobre [tipos de métricas][6]. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,PHP" >}}

{{< programming-lang lang="python" >}}

En Python, los temporizadores se crean con un decorador.

```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

@statsd.timed('example_metric.timer', tags=["environment:dev,function:my_function"])
def my_function():
  time.sleep(random.randint(0, 10))

while(1):
  my_function()
```

O con un gestor de contexto:

```python
from datadog import statsd
import time
import random

def my_function():

  # First some stuff you don't want to time
  sleep(1)

  # Now start the timer
  with statsd.timed('example_metric.timer', tags=["environment:dev"]):
    # do something to be measured
    sleep(random.randint(0, 10))

while(1):
  my_function()
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

function runfunction() {
    sleep(rand(0, 20));
}

while (TRUE) {
  $start_time = microtime(TRUE);
  runfunction();
  $statsd->microtiming('example_metric.timer', microtime(TRUE) - $start_time);
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

A medida que DogStatsD recibe los datos de métricas de temporizador, calcula la distribución estadística de los tiempos de entrega y envía las siguientes métricas a Datadog:

| Métrica                              | Descripción                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | Número de veces que se ha muestreado esta métrica  |
| `example_metric.timer.avg`          | Tiempo medio de los valores muestreados      |
| `example_metric.timer.median`       | Valor mediano muestreado                    |
| `example_metric.timer.max`          | Valor máximo muestreado                   |
| `example_metric.timer.95percentile` | Valor del percentil 95 muestreado           |

DogStatsD trata a `TIMER` como una métrica `HISTOGRAM`. Tanto si utilizas el tipo de métrica `TIMER` o `HISTOGRAM`, estarás enviando los mismos datos a Datadog. Después de ejecutar el código anterior, los datos de tus métricas estarán disponibles para su representación gráfica en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Temporizador" >}}

### DISTRIBUCIÓN

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>)`
: Almacenado como un tipo `DISTRIBUTION` en Datadog. Para obtener más información, consulta la [documentación Distribuciones][8] exclusiva.

#### Ejemplos de códigos

El tipo de métrica `DISTRIBUTION` es específico de DogStatsD. Emite una métrica `DISTRIBUTION` almacenada como métrica `DISTRIBUTION` a Datadog. Para obtener más información sobre el tipo `DISTRIBUTION`, consulta la documentación sobre [tipos de métricas][6].

Ejecuta el siguiente código para enviar una métrica de DogStatsD `DISTRIBUTION` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.distribution('example_metric.distribution', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('example_metric.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
package main

import (
    "log"
    "math/rand"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }

    for true {
        statsd.Distribution("example_metric.distribution", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd").
            .hostname("localhost")
            .port(8125)
            .build();
        while (true) {
            Statsd.recordDistributionValue("example_metric.distribution", new Random().nextInt(20), new String[]{"environment:dev"});
            Thread.sleep(2000);
        }
    }
}
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
using StatsdClient;
using System;

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
            var random = new Random(0);

            while (true)
            {
                dogStatsdService.Distribution("example_metric.distribution", random.Next(20), tags: new[] {"environment:dev"});
                System.Threading.Thread.Sleep(2000);
            }
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

while (TRUE) {
    $statsd->distribution('example_metric.distribution', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="NodeJS" >}}
```javascript
const tracer = require('dd-trace');
tracer.init();

while(true) {
  tracer.dogstatsd.distribution('example_metric.distribution', Math.random() * 20, { environment: 'dev' });
  await new Promise(r => setTimeout(r, 2000));
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

La instrumentación anterior calcula `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (mediana), `75th percentile`, `90th percentile`, `95th percentile` y `99th percentile`. Las distribuciones pueden utilizarse para medir la distribución de *cualquier* tipo de valor, como el tamaño de los archivos cargados o los resultados de exámenes de clase.

## Opciones de envío de métricas

### Tasas de muestreo

Debido a que la sobrecarga del envío de paquetes UDP puede ser demasiado grande para algunas rutas de código de rendimiento intensivo, los clientes DogStatsD admiten el muestreo (sólo envían métricas un porcentaje del tiempo). Es útil si muestreas muchas métricas y el cliente DogStatsD no está en el mismo host que el servidor DogStatsD. Esto ayuda a reducir el tráfico, pero se pierde precisión y granularidad.

Una frecuencia de muestreo de `1` envía métricas el 100% del tiempo, mientras que una frecuencia de muestreo de `0` envía métricas el 0% del tiempo.

Antes de enviar una métrica a Datadog, DogStatsD utiliza la `<SAMPLE_RATE>` para corregir el valor de la métrica en función del tipo de métrica (para estimar el valor sin muestreo):

| Tipo de métrica    | Corrección de la frecuencia de muestreo                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | Los valores recibidos se multiplican por (`1/<SAMPLE_RATE>`). Es razonable suponer que para un punto de datos recibido, las `1/<SAMPLE_RATE>` han sido realmente muestreadas con el mismo valor. |
| `GAUGE`        | Sin corrección. El valor recibido se mantiene tal cual.                                                                                                                               |
| `SET`          | Sin corrección. El valor recibido se mantiene tal cual.                                                                                                                               |
| `HISTOGRAM`    | La estadística `histogram.count` es una métrica CUENTA y recibe la corrección indicada anteriormente. Otras estadísticas son las métricas gauge y no "se corrigen".                      |
| `DISTRIBUTION` | Los valores recibidos se cuentan (`1/<SAMPLE_RATE>`). Es razonable suponer que para un punto de datos recibido, las `1/<SAMPLE_RATE>` han sido realmente muestreadas con el mismo valor. |

#### Ejemplos de códigos

El siguiente código sólo envía puntos la mitad de las veces:

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
statsd.increment('loop.count', sample_rate=0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
statsd.increment('loop.count', :sample_rate => 0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
statsd.Incr("example_metric.increment", []string{}, 0.5)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
Statsd.incrementCounter("example_metric.increment", sampleRate=0.5);
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
dogStatsdService.Increment("example_metric.increment", sampleRate: 0.5);
```
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}
```php
<? php
$statsd->increment('example_metric.increment', $sampleRate->0.5);
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Etiquetado de métricas

Añade etiquetas (tags) a cualquier métrica que envíes a DogStatsD con el parámetro `tags`.

#### Ejemplos de códigos

El siguiente código sólo añade las etiquetas `environment:dev` y `account:local` a la métrica  `example_metric.increment`:

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php,nodejs" >}}

{{< programming-lang lang="python" >}}
```python
statsd.increment('example_metric.increment', tags=["environment:dev","account:local"])
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
```ruby
statsd.increment('example_metric.increment', tags: ['environment:dev','account:local'])
```
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
```go
statsd.Incr("example_metric.increment", []string{"environment:dev","account:local"}, 1)
```
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
```java
Statsd.incrementCounter("example_metric.increment", new String[]{"environment:dev","account:local"});
```
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}
```csharp
dogStatsdService.Increment("example_metric.increment", tags: new[] {"environment:dev","account:local"})
```
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}
El argumento `tags` puede ser una cadena:

```php
$statsd->increment('example_metric.increment', "environment:dev,account:local");
```

O una matriz:
```php
<?php
$statsd->increment('example_metric.increment', array('environment' => 'dev', 'account' => 'local'));
```
{{< /programming-lang >}}

{{< programming-lang lang="NodeJS" >}}
```javascript
tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev', account: 'local' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Etiqueta de host

La etiqueta de host la asigna automáticamente el Datadog Agent, agregando los métricas. Las métricas enviadas con una etiqueta de host que no coincida con el nombre de host del Agent pierden la referencia al host original. La etiqueta de host enviada anula cualquier nombre de host recopilado o configurado en el Agent.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/dogstatsd/
[2]: /es/metrics/types/?tab=count#definition
[3]: /es/dashboards/functions/arithmetic/#cumulative-sum
[4]: /es/dashboards/functions/arithmetic/#integral
[5]: /es/metrics/types/?tab=gauge#definition
[6]: /es/metrics/types/?tab=histogram#definition
[7]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: /es/metrics/distributions/
[9]: /es/metrics/types/?tab=distribution#definition