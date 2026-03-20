---
aliases:
- /es/developers/faq/reduce-submission-rate
- /es/developers/faq/why-is-my-counter-metric-showing-decimal-values
- /es/developers/faq/dog-statsd-sample-rate-parameter-explained
- /es/developers/metrics/dogstatsd_metrics_submission/
- /es/metrics/dogstatsd_metrics_submission
description: EnvÃ­a mÃĐtricas personalizadas directamente desde tu aplicaciÃģn.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: IntroducciÃģn a DogStatsD
- link: /metrics/types/
  tag: Documentation
  text: Tipos de mÃĐtricas de Datadog
title: 'EnvÃ­o de mÃĐtricas: DogStatsD'
---
Mientras que StatsD acepta solo mÃĐtricas, DogStatsD acepta los tres tipos de datos principales de Datadog: mÃĐtricas, eventos y verificaciones de servicio. Esta secciÃģn muestra casos de uso tÃ­picos para mÃĐtricas desglosadas por tipos de mÃĐtricas, e introduce [tasas de muestreo](#sample-rates) y [opciones de etiquetado de mÃĐtricas](#metric-tagging) especÃ­ficas de DogStatsD.

Los tipos de mÃĐtricas [CUENTA](#count), [GAUGE](#gauge) y [CONJUNTO](#set) son familiares para los usuarios de StatsD. `TIMER` de StatsD es un subconjunto de `HISTOGRAM` en DogStatsD. AdemÃĄs, puedes enviar tipos de mÃĐtricas [HISTOGRAMA](#histogram) y [DISTRIBUCIÃN](#distribution) usando DogStatsD.

**Nota**: Dependiendo del mÃĐtodo de envÃ­o utilizado, el tipo de mÃĐtrica real almacenado en Datadog puede diferir del tipo de mÃĐtrica enviado. Al enviar un tipo de mÃĐtrica RATE a travÃĐs de DogStatsD, la mÃĐtrica aparece como un GAUGE en la aplicaciÃģn para asegurar una comparaciÃģn relevante entre diferentes Agentes.

## Funciones

DespuÃĐs de [instalar DogStatsD][1], las siguientes funciones estÃĄn disponibles para enviar tus mÃĐtricas a Datadog dependiendo de su tipo de mÃĐtrica. Las funciones tienen los siguientes parÃĄmetros compartidos:

| ParÃĄmetro        | Tipo            | Requerido | DescripciÃģn                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Cadena          | SÃ­      | Nombre de la mÃĐtrica a enviar.                                                                                                                                                                  |
| `<METRIC_VALUE>` | Doble           | SÃ­      | Valor asociado con tu mÃĐtrica.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Doble          | No       | La tasa de muestreo que se aplicarÃĄ a la mÃĐtrica. Toma un valor entre `0` (todo se muestrea, por lo que no se envÃ­a nada) y `1` (sin muestreo). Consulta la secciÃģn [Tasa de Muestreo](#sample-rates) para aprender mÃĄs. |
| `<TAGS>`         | Lista de cadenas | No       | Una lista de etiquetas para aplicar a la mÃĐtrica. Consulta la secciÃģn [Etiquetado de MÃĐtricas](#metric-tagging) para aprender mÃĄs.                                                                                       |
| `<CARDINALITY>`  | Enum            | No       | La [cardinalidad][10] de etiquetas que se asignarÃĄn a esta mÃĐtrica.                                                                                                                               |

### CONTAR

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY> )`
: Se utiliza para incrementar una mÃĐtrica de CONTAR. Almacenado como un tipo `RATE` en Datadog. Cada valor en la serie temporal almacenada es un delta normalizado en el tiempo del valor de la mÃĐtrica durante el perÃ­odo de vaciado de StatsD.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Se utiliza para decrementar una mÃĐtrica de CONTAR. Almacenado como un tipo `RATE` en Datadog. Cada valor en la serie temporal almacenada es un delta normalizado en el tiempo del valor de la mÃĐtrica durante el perÃ­odo de vaciado de StatsD.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Se utiliza para incrementar una mÃĐtrica de CONTAR desde un `Value` arbitrario. Almacenado como un tipo `RATE` en Datadog. Cada valor en la serie temporal almacenada es un delta normalizado en el tiempo del valor de la mÃĐtrica durante el perÃ­odo de vaciado de StatsD.

**Nota**: `COUNT` los mÃĐtricas de tipo pueden mostrar un valor decimal dentro de Datadog ya que estÃĄn normalizados durante el intervalo de vaciado para reportar unidades por segundo.

#### Ejemplos de cÃģdigo

Emitir un mÃĐtrica `COUNT` almacenada como un mÃĐtrica `RATE` a Datadog. Aprende mÃĄs sobre el tipo `COUNT` en la documentaciÃģn de [tipos de mÃĐtricas][2].

Ejecuta el siguiente cÃģdigo para enviar un mÃĐtrica DogStatsD `COUNT` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

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

DespuÃĐs de ejecutar el cÃģdigo anterior, tus datos de mÃĐtricas estÃĄn disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Incrementar Decrementar" >}}

Dado que el valor se envÃ­a como un `COUNT`, se almacena como `RATE` en Datadog. Para obtener conteos en bruto dentro de Datadog, aplica una funciÃģn a tu serie como la funciÃģn [Suma Acumulativa][3] o [Integral][4]:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Incrementar Decrementar con Cumsum" >}}

### GAUGE

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor en la serie temporal almacenada es el Ãšltimo valor de gauge enviado para la mÃĐtrica durante el perÃ­odo de vaciado de StatsD.

#### Ejemplos de cÃģdigo

Emitir un mÃĐtrica `GAUGE` almacenada como un mÃĐtrica `GAUGE` a Datadog. Aprende mÃĄs sobre el tipo `GAUGE` en la documentaciÃģn de [tipos de mÃĐtricas][5].

Ejecuta el siguiente cÃģdigo para enviar una mÃĐtrica DogStatsD `GAUGE` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

**Nota:** Las llamadas de envÃ­o de mÃĐtricas son asincrÃģnicas. Si deseas asegurarte de que las mÃĐtricas se envÃ­an, llama a `flush` antes de que el programa finalice.

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

DespuÃĐs de ejecutar el cÃģdigo anterior, tus datos de mÃĐtricas estÃĄn disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Medidor" >}}

### ESTABLECER

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `GAUGE` en Datadog. Cada valor en la serie temporal almacenada es el conteo de valores Ãšnicos enviados a StatsD para una mÃĐtrica durante el perÃ­odo de vaciado.

#### Ejemplos de cÃģdigo

Emitir un mÃĐtrica `SET` almacenada como un mÃĐtrica `GAUGE` a Datadog.

Ejecuta el siguiente cÃģdigo para enviar una mÃĐtrica DogStatsD `SET` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

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

DespuÃĐs de ejecutar el cÃģdigo anterior, tus datos de mÃĐtricas estÃĄn disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Establecer" >}}

### HISTOGRAMA

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Dado que se envÃ­an mÃšltiples mÃĐtricas, los tipos de mÃĐtricas almacenados (`GAUGE`, `RATE`) dependen de la mÃĐtrica. Consulta la documentaciÃģn del [tipo de mÃĐtrica HISTOGRAMA][6] para aprender mÃĄs.

#### ConfiguraciÃģn

* Configura la agregaciÃģn para enviar a Datadog con el parÃĄmetro `histogram_aggregates` en tu [archivo de configuraciÃģn datadog.yaml][7]. Por defecto, solo se envÃ­an las agregaciones `max`, `median`, `avg` y `count`.
* Configura la agregaciÃģn de percentiles para enviar a Datadog con el parÃĄmetro `histogram_percentiles` en tu [archivo de configuraciÃģn datadog.yaml][7]. Por defecto, solo se envÃ­a el `95pc` percentil.

#### Ejemplos de cÃģdigo

El tipo de mÃĐtrica `HISTOGRAM` es especÃ­fico de DogStatsD. Emite una mÃĐtrica `HISTOGRAM`âalmacenada como una mÃĐtrica `GAUGE` y `RATE`âa Datadog. Aprende mÃĄs sobre el tipo `HISTOGRAM` en la documentaciÃģn de [tipos de mÃĐtricas][6].


Ejecuta el siguiente cÃģdigo para enviar una mÃĐtrica DogStatsD `HISTOGRAM` a Datadog. Recuerda `flush`/`close` el cliente cuando ya no sea necesario.

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

La instrumentaciÃģn anterior produce las siguientes mÃĐtricas:

| MÃĐtrica                                  | DescripciÃģn                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | NÃšmero de veces que se muestreÃģ esta mÃĐtrica |
| `example_metric.histogram.avg`          | Promedio de los valores muestreados           |
| `example_metric.histogram.median`       | Valor muestreado mediano                    |
| `example_metric.histogram.max`          | Valor muestreado mÃĄximo                   |
| `example_metric.histogram.95percentile` | Valor muestreado del percentil 95           |

DespuÃĐs de ejecutar el cÃģdigo anterior, tus datos de mÃĐtricas estÃĄn disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histograma" >}}

#### TIMER

`TIMER` el tipo de mÃĐtrica en DogStatsD es una implementaciÃģn del tipo de mÃĐtrica `HISTOGRAM` (no debe confundirse con temporizadores en el StatsD estÃĄndar). Mide solo datos de tiempo: por ejemplo, la cantidad de tiempo que tarda en ejecutarse una secciÃģn de cÃģdigo.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Dado que se envÃ­an mÃšltiples mÃĐtricas, los tipos de mÃĐtricas almacenados (`GAUGE`, `RATE`) dependen de la mÃĐtrica. Consulta la documentaciÃģn del [tipo de mÃĐtrica HISTOGRAMA][6] para aprender mÃĄs.

##### ConfiguraciÃģn

Para un `TIMER`, se aplican las reglas de configuraciÃģn `HISTOGRAM` [.

##### Ejemplos de cÃģdigo

Emita una mÃĐtrica `TIMER`, almacenada como una mÃĐtrica `GAUGE` y `RATE`, a Datadog. Aprenda mÃĄs sobre el tipo `HISTOGRAM` en la documentaciÃģn de [tipos de mÃĐtricas][6]. Recuerde `flush`/`close` al cliente cuando ya no sea necesario.

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

A medida que DogStatsD recibe los datos de la mÃĐtrica de temporizador, calcula la distribuciÃģn estadÃ­stica de los tiempos de renderizado y envÃ­a las siguientes mÃĐtricas a Datadog:

| MÃĐtrica                              | DescripciÃģn                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | NÃšmero de veces que se muestreÃģ esta mÃĐtrica |
| `example_metric.timer.avg`          | Tiempo promedio de los valores muestreados      |
| `example_metric.timer.median`       | Valor muestreado mediano                    |
| `example_metric.timer.max`          | Valor muestreado mÃĄximo                   |
| `example_metric.timer.95percentile` | Valor muestreado del percentil 95           |

DogStatsD trata `TIMER` como una mÃĐtrica `HISTOGRAM`. Ya sea que use el tipo de mÃĐtrica `TIMER` o `HISTOGRAM`, estÃĄ enviando los mismos datos a Datadog. DespuÃĐs de ejecutar el cÃģdigo anterior, tus datos de mÃĐtricas estÃĄn disponibles para graficar en Datadog:

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Temporizador" >}}

### DISTRIBUCIÃN

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>, <CARDINALITY>)`
: Almacenado como un tipo `DISTRIBUTION` en Datadog. Consulte la documentaciÃģn dedicada a [DistribuciÃģn][8] para aprender mÃĄs.

#### Ejemplos de cÃģdigo

El tipo de mÃĐtrica `DISTRIBUTION` es especÃ­fico de DogStatsD. Emita una mÃĐtrica `DISTRIBUTION` - almacenada como una mÃĐtrica `DISTRIBUTION` - a Datadog. Aprenda mÃĄs sobre el tipo `DISTRIBUTION` en la documentaciÃģn de [tipos de mÃĐtricas][9].

Ejecute el siguiente cÃģdigo para enviar una mÃĐtrica DogStatsD `DISTRIBUTION` a Datadog. Recuerde `flush`/`close` al cliente cuando ya no sea necesario.

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

La instrumentaciÃģn anterior calcula el `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (mediana), `75th percentile`, `90th percentile`, `95th percentile` y `99th percentile`. Las distribuciones se pueden usar para medir la distribuciÃģn de *cualquier* tipo de valor, como el tamaÃąo de los archivos subidos o las calificaciones de los exÃĄmenes en el aula.

## Opciones de envÃ­o de mÃĐtricas

### Tasas de muestreo

Dado que la sobrecarga de enviar paquetes UDP puede ser demasiado grande para algunos caminos de cÃģdigo intensivos en rendimiento, los clientes de DogStatsD soportan muestreo (enviando mÃĐtricas solo un porcentaje del tiempo). Es Ãštil si muestreas muchas mÃĐtricas y tu cliente de DogStatsD no estÃĄ en el mismo host que el servidor de DogStatsD. El intercambio: disminuyes el trÃĄfico pero pierdes algo de precisiÃģn y granularidad.

Una tasa de muestreo de `1` envÃ­a mÃĐtricas el 100% del tiempo, mientras que una tasa de muestreo de `0` envÃ­a mÃĐtricas el 0% del tiempo.

Antes de enviar una mÃĐtrica a Datadog, DogStatsD utiliza el `<SAMPLE_RATE>` para corregir el valor de la mÃĐtrica dependiendo del tipo de mÃĐtrica (para estimar el valor sin muestreo):

| Tipo de mÃĐtrica    | CorrecciÃģn de tasa de muestreo                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | Los valores recibidos se multiplican por (`1/<SAMPLE_RATE>`). Es razonable asumir que para un punto de datos recibido, `1/<SAMPLE_RATE>` fueron realmente muestreados con el mismo valor. |
| `GAUGE`        | Sin correcciÃģn. El valor recibido se mantiene tal como estÃĄ.                                                                                                                               |
| `SET`          | Sin correcciÃģn. El valor recibido se mantiene tal como estÃĄ.                                                                                                                               |
| `HISTOGRAM`    | La estadÃ­stica `histogram.count` es una mÃĐtrica de CONTADOR y recibe la correcciÃģn descrita anteriormente. Otras estadÃ­sticas son mÃĐtricas de medidor y no son "corregidas".                      |
| `DISTRIBUTION` | Los valores recibidos se cuentan (`1/<SAMPLE_RATE>`) veces. Es razonable suponer que por cada punto de datos recibido, `1/<SAMPLE_RATE>` fueron realmente muestreados con el mismo valor. |

#### Ejemplos de cÃģdigo

El siguiente cÃģdigo solo envÃ­a puntos la mitad del tiempo:

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

### Etiquetado de mÃĐtricas

Agrega etiquetas a cualquier mÃĐtrica que envÃ­es a DogStatsD con el parÃĄmetro `tags`.

#### Ejemplos de cÃģdigo

El siguiente cÃģdigo solo agrega las etiquetas `environment:dev` y `account:local` a la mÃĐtrica `example_metric.increment`:

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

La etiqueta de host se asigna automÃĄticamente por el Agente de Datadog que agrega las mÃĐtricas. Las mÃĐtricas enviadas con una etiqueta de host que no coincide con el nombre del host del Agente pierden referencia al host original. La etiqueta de host enviada anula cualquier nombre de host recopilado o configurado en el Agente.

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