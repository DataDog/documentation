---
aliases:
- /es/developers/faq/reduce-submission-rate
- /es/developers/faq/why-is-my-counter-metric-showing-decimal-values
- /es/developers/faq/dog-statsd-sample-rate-parameter-explained
- /es/developers/metrics/dogstatsd_metrics_submission/
- /es/metrics/dogstatsd_metrics_submission
description: Envía métricas personalizadas directamente desde tu aplicación.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: Introducción a DogStatsD
- link: /metrics/types/
  tag: Documentation
  text: Tipos de Métricas de Datadog
title: 'Envío de Métricas: DogStatsD'
---
Mientras que StatsD acepta solo métricas, DogStatsD acepta los tres tipos de datos principales de Datadog: métricas, eventos y verificaciones de servicio. Esta sección muestra casos de uso típicos para métricas desglosadas por tipos de métricas, e introduce [tasas de muestreo](#sample-rates) y [opciones de etiquetado de métricas](#metric-tagging) específicas de DogStatsD.

[COUNT](#count), [GAUGE](#gauge) y [SET](#set) son tipos de métricas familiares para los usuarios de StatsD. `TIMER` de StatsD es un subconjunto de `HISTOGRAM` en DogStatsD. Además, puedes enviar tipos de métricas [HISTOGRAMA](#histogram) y [DISTRIBUCIÓN](#distribution) utilizando DogStatsD.

**Nota**: Dependiendo del método de envío utilizado, el tipo de métrica real almacenado en Datadog puede diferir del tipo de métrica enviado. Al enviar un tipo de métrica RATE a través de DogStatsD, la métrica aparece como un GAUGE en la aplicación para asegurar una comparación relevante entre diferentes Agentes.

## Funciones

Después de que [instales DogStatsD][1], las siguientes funciones están disponibles para enviar tus métricas a Datadog dependiendo de su tipo de métrica. Las funciones tienen los siguientes parámetros compartidos:

| Parámetro        | Tipo            | Requerido | Descripción                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Cadena          | Sí      | Nombre de la métrica a enviar.                                                                                                                                                                  |
| `<METRIC_VALUE>` | Doble          | Sí      | Valor asociado con tu métrica.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Doble          | No       | La tasa de muestreo que se aplicará a la métrica. Toma un valor entre `0` (todo se muestrea, por lo que no se envía nada) y `1` (sin muestreo). Consulta la sección [Tasa de Muestreo](#sample-rates) para aprender más. |
| `<TAGS>`         | Lista de cadenas | No       | Una lista de etiquetas que se aplicarán a la métrica. Consulta la sección [Etiquetado de Métricas](#metric-tagging) para aprender más.                                                                                       |
| `<CARDINALITY>`  | Enum            | No       | La [cardinalidad][10] de etiquetas que se asignarán a esta métrica.                                                                                                                               |

### COUNT

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY> )`
: Se utiliza para incrementar una métrica COUNT. Almacenado como un tipo `RATE` en Datadog. Cada valor en las series temporales almacenadas es un delta normalizado en el tiempo del valor de la métrica durante el período de vaciado de StatsD.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Se utiliza para decrementar una métrica COUNT. Almacenado como un tipo `RATE` en Datadog. Cada valor en las series temporales almacenadas es un delta normalizado en el tiempo del valor de la métrica durante el período de vaciado de StatsD.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Se utiliza para incrementar una métrica COUNT desde un `Value` arbitrario. Almacenado como un tipo `RATE` en Datadog. Cada valor en las series temporales almacenadas es un delta normalizado en el tiempo del valor de la métrica durante el período de vaciado de StatsD.

**Nota**: Las métricas de tipo `COUNT` pueden mostrar un valor decimal dentro de Datadog, ya que se normalizan durante el intervalo de vaciado para reportar unidades por segundo.

#### Ejemplos de código

Emitir una métrica `COUNT` almacenada como una métrica `RATE` a Datadog. Aprende más sobre el tipo `COUNT` en la documentación de [tipos de métricas][2].

Ejecuta el siguiente código para enviar una métrica DogStatsD `COUNT` a Datadog. Recuerda `flush`/`close` al cliente cuando ya no sea necesario.

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

**Nota:** `statsd.count` no es compatible en Python.

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

	"github.com/DataDog/datadog-go/v5/statsd"
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
                dogStatsdService.Increment("example_metric.increment", tags: new[] {"environment:dev"}, cardinality: Cardinality.Low);
                dogStatsdService.Decrement("example_metric.decrement", tags: new[] {"environment:dev"}, cardinality: Cardinality.High);
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
    $statsd->increment('example_metric.increment', 1, array('environment'=>'dev'), 'low');
    $statsd->decrement('example_metric.decrement', 1, array('environment'=>'dev'), 'high');
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

Después de ejecutar el código anterior, tus datos de métricas están disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Incrementar Decrementar" >}}

Dado que el valor se envía como un `COUNT`, se almacena como `RATE` en Datadog. Para obtener conteos brutos dentro de Datadog, aplica una función a tu serie como la función [Suma Acumulativa][3] o [Integral][4]:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Incrementar Decrementar con Cumsum" >}}

### GAUGE

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor en las series temporales almacenadas es el último valor de gauge enviado para la métrica durante el período de vaciado de StatsD.

#### Ejemplos de código

Emitir una métrica `GAUGE` almacenada como una métrica `GAUGE` a Datadog. Aprende más sobre el tipo `GAUGE` en la documentación de [tipos de métricas][5].

Ejecuta el siguiente código para enviar una métrica DogStatsD `GAUGE` a Datadog. Recuerda `flush`/`close` al cliente cuando ya no sea necesario.

**Nota:** Las llamadas de envío de métricas son asincrónicas. Si deseas asegurarte de que las métricas se envíen, llama a `flush` antes de que el programa finalice.

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
  statsd.gauge('example_metric.gauge', i, tags=["environment:dev"], cardinality="low")
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
    statsd.gauge('example_metric.gauge', i, tags: ['environment:dev'], cardinality: 'low')
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

	"github.com/DataDog/datadog-go/v5/statsd"
)

func main() {
	statsd, err := statsd.New("127.0.0.1:8125")
	if err != nil {
		log.Fatal(err)
	}
	var i float64
	for true {
		i += 1
		statsd.Gauge("example_metric.gauge", i, []string{"environment:dev"}, 1, CardinalityHigh)
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
                dogStatsdService.Gauge("example_metric.gauge", i, tags: new[] {"environment:dev"}, cardinality: Cardinality.High);
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
    $statsd->gauge('example_metric.gauge', $i, array('environment'=>'dev'), 'low');
    sleep(10);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

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

Después de ejecutar el código anterior, tus datos de métricas están disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" >}}

### SET

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor en las series temporales almacenadas es el conteo de valores únicos enviados a StatsD para una métrica durante el período de vaciado.

#### Ejemplos de código

Emitir una métrica `SET` almacenada como una métrica `GAUGE` a Datadog.

Ejecuta el siguiente código para enviar una métrica DogStatsD `SET` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

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

	"github.com/DataDog/datadog-go/v5/statsd"
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
    $statsd->set('example_metric.set', $i, 1, array('environment'=>'dev'), 'low');
    sleep(rand(0, 10));
}
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Después de ejecutar el código anterior, tus datos de métricas están disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="SET" >}}

### HISTOGRAMA

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Dado que se envían múltiples métricas, los tipos de métricas almacenadas (`GAUGE`, `RATE`) dependen de la métrica. Consulta la documentación del [tipo de métrica HISTOGRAMA][6] para aprender más.

#### Configuración

* Configura la agregación para enviar a Datadog con el parámetro `histogram_aggregates` en tu [archivo de configuración datadog.yaml][7]. Por defecto, solo se envían las agregaciones `max`, `median`, `avg` y `count`.
* Configura la agregación de percentiles para enviar a Datadog con el parámetro `histogram_percentiles` en tu archivo de configuración [datadog.yaml][7]. Por defecto, solo se envía el percentil `95pc`.

#### Ejemplos de código

El tipo de métrica `HISTOGRAM` es específico de DogStatsD. Emite una métrica `HISTOGRAM`, almacenada como una métrica `GAUGE` y `RATE`, a Datadog. Aprende más sobre el tipo `HISTOGRAM` en la documentación de [tipos de métricas][6].


Ejecuta el siguiente código para enviar una métrica DogStatsD `HISTOGRAM` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

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

	"github.com/DataDog/datadog-go/v5/statsd"
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
                dogStatsdService.Histogram("example_metric.histogram", random.Next(20), tags: new[] {"environment:dev"}, Cardinality: Cardinality.High);
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
    $statsd->histogram('example_metric.histogram', rand(0, 20), 1, array('environment'=>'dev'), 'low');
    sleep(2);
}
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

La instrumentación anterior produce las siguientes métricas:

| Métrica                                  | Descripción                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | Número de veces que se muestreó esta métrica |
| `example_metric.histogram.avg`          | Promedio de los valores muestreados           |
| `example_metric.histogram.median`       | Valor mediano muestreado                    |
| `example_metric.histogram.max`          | Valor máximo muestreado                   |
| `example_metric.histogram.95percentile` | Valor muestreado del percentil 95           |

Después de ejecutar el código anterior, tus datos de métricas están disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="HISTOGRAM" >}}

#### TIMER

`TIMER` el tipo de métrica en DogStatsD es una implementación del tipo de métrica `HISTOGRAM` (no debe confundirse con temporizadores en el StatsD estándar). Mide solo datos de tiempo: por ejemplo, la cantidad de tiempo que tarda en ejecutarse una sección de código.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Dado que se envían múltiples métricas, los tipos de métricas almacenadas (`GAUGE`, `RATE`) dependen de la métrica. Consulta la documentación del [tipo de métrica HISTOGRAMA][6] para aprender más.

##### Configuración

Para un `TIMER`, se aplican las reglas de configuración `HISTOGRAM` [ ](#configuration).

##### Ejemplos de código

Emite una métrica `TIMER`, almacenada como una métrica `GAUGE` y `RATE`, a Datadog. Aprende más sobre el tipo `HISTOGRAM` en la documentación de [tipos de métricas][6]. Recuerda `flush`/`close` al cliente cuando ya no sea necesario.

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

o con un administrador de contexto:

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

A medida que DogStatsD recibe los datos de la métrica del temporizador, calcula la distribución estadística de los tiempos de renderizado y envía las siguientes métricas a Datadog:

| Métrica                              | Descripción                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | Número de veces que se muestreó esta métrica |
| `example_metric.timer.avg`          | Tiempo promedio de los valores muestreados      |
| `example_metric.timer.median`       | Valor mediano muestreado                    |
| `example_metric.timer.max`          | Valor máximo muestreado                   |
| `example_metric.timer.95percentile` | Valor muestreado del percentil 95           |

DogStatsD trata `TIMER` como una métrica `HISTOGRAM`. Ya sea que utilice el tipo de métrica `TIMER` o `HISTOGRAM`, está enviando los mismos datos a Datadog. Después de ejecutar el código anterior, tus datos de métricas están disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Temporizador" >}}

### DISTRIBUCIÓN

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `DISTRIBUTION` en Datadog. Consulte la documentación dedicada a [Distribución][8] para aprender más.

#### Ejemplos de código

El tipo de métrica `DISTRIBUTION` es específico de DogStatsD. Emita una métrica `DISTRIBUTION`, almacenada como una métrica `DISTRIBUTION`, a Datadog. Consulte la documentación de [tipos de métricas][9] para obtener más información sobre el tipo `DISTRIBUTION`.

Ejecuta el siguiente código para enviar una métrica DogStatsD `DISTRIBUTION` a Datadog. Recuerda `flush`/`close` al cliente cuando ya no sea necesario.

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
    statsd.distribution('example_metric.distribution', rand 20, tags: ['environment:dev'])
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

	"github.com/DataDog/datadog-go/v5/statsd"
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
    $statsd->distribution('example_metric.distribution', rand(0, 20), 1, array('environment'=>'dev'), 'high');
    sleep(2);
}
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

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

La instrumentación anterior calcula el `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (mediana), `75th percentile`, `90th percentile`, `95th percentile` y `99th percentile`. Las distribuciones se pueden utilizar para medir la distribución de *cualquier* tipo de valor, como el tamaño de los archivos subidos o las calificaciones de los exámenes en el aula.

## Opciones de envío de métricas

### Tasas de muestreo

Dado que la sobrecarga de enviar paquetes UDP puede ser demasiado grande para algunos caminos de código intensivos en rendimiento, los clientes de DogStatsD soportan muestreo (enviando métricas solo un porcentaje del tiempo). Es útil si muestreas muchas métricas y tu cliente de DogStatsD no está en el mismo host que el servidor de DogStatsD. El compromiso: disminuyes el tráfico, pero pierdes algo de precisión y granularidad.

Una tasa de muestreo de `1` envía métricas el 100% del tiempo, mientras que una tasa de muestreo de `0` envía métricas el 0% del tiempo.

Antes de enviar una métrica a Datadog, DogStatsD utiliza el `<SAMPLE_RATE>` para corregir el valor de la métrica dependiendo del tipo de métrica (para estimar el valor sin muestreo):

| Tipo de métrica    | Corrección de tasa de muestreo                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | Los valores recibidos se multiplican por (`1/<SAMPLE_RATE>`). Es razonable suponer que por cada punto de datos recibido, `1/<SAMPLE_RATE>` fueron realmente muestreados con el mismo valor. |
| `GAUGE`        | Sin corrección. El valor recibido se mantiene tal como está.                                                                                                                               |
| `SET`          | Sin corrección. El valor recibido se mantiene tal como está.                                                                                                                               |
| `HISTOGRAM`    | La `histogram.count` estadística es una métrica COUNT y recibe la corrección descrita anteriormente. Otras estadísticas son métricas gauge y no son "corregidas".                      |
| `DISTRIBUTION` | Los valores recibidos se cuentan (`1/<SAMPLE_RATE>`) veces. Es razonable suponer que por cada punto de datos recibido, `1/<SAMPLE_RATE>` fueron realmente muestreados con el mismo valor. |

#### Ejemplos de código

El siguiente código solo envía puntos la mitad del tiempo:

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

Agrega etiquetas a cualquier métrica que envíes a DogStatsD con el parámetro `tags`.

#### Ejemplos de código

El siguiente código solo agrega las etiquetas `environment:dev` y `account:local` a la métrica `example_metric.increment`:

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

{{< programming-lang lang="php" >}}
El argumento `tags` puede ser una cadena:

```php
$statsd->increment('example_metric.increment', 1.0, "environment:dev,account:local");
```

o un arreglo:

```php
<?php
$statsd->increment('example_metric.increment', 1.0, array('environment' => 'dev', 'account' => 'local'));
```
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

```javascript
tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev', account: 'local' });
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### Etiqueta de host

La etiqueta de host se asigna automáticamente por el Datadog Agent que agrega las métricas. Las métricas enviadas con una etiqueta de host que no coincide con el nombre del host del Agent pierden referencia al host original. La etiqueta de host enviada anula cualquier nombre de host recopilado o configurado en el Agent.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/extend/dogstatsd/
[2]: /es/metrics/types/?tab=count#definition
[3]: /es/dashboards/functions/arithmetic/#cumulative-sum
[4]: /es/dashboards/functions/arithmetic/#integral
[5]: /es/metrics/types/?tab=gauge#definition
[6]: /es/metrics/types/?tab=histogram#definition
[7]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: /es/metrics/distributions/
[9]: /es/metrics/types/?tab=distribution#definition
[10]: /es/containers/kubernetes/tag