---
aliases:
- /fr/developers/faq/reduce-submission-rate
- /fr/developers/faq/why-is-my-counter-metric-showing-decimal-values
- /fr/developers/faq/dog-statsd-sample-rate-parameter-explained
- /fr/developers/metrics/dogstatsd_metrics_submission/
- /fr/metrics/dogstatsd_metrics_submission
description: Soumettez des métriques personnalisées directement depuis votre application.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: Introduction à DogStatsD
- link: /metrics/types/
  tag: Documentation
  text: Types de métriques Datadog
title: 'Soumission de métriques : DogStatsD'
---
Alors que StatsD n'accepte que des métriques, DogStatsD accepte les trois principaux types de données Datadog : métriques, événements et vérifications de service. Cette section montre des cas d'utilisation typiques pour les métriques, classés par types de métriques, et introduit [les taux d'échantillonnage](#sample-rates) et [les options de balisage des métriques](#metric-tagging) spécifiques à DogStatsD.

[COMPTE](#count), [GAUGE](#gauge) et [ENSEMBLE](#set) sont des types de métriques familiers aux utilisateurs de StatsD. `TIMER` de StatsD est un sous-ensemble de `HISTOGRAM` dans DogStatsD. De plus, vous pouvez soumettre des types de métriques [HISTOGRAMME](#histogram) et [DISTRIBUTION](#distribution) en utilisant DogStatsD.

**Remarque** : Selon la méthode de soumission utilisée, le type de métrique réel stocké dans Datadog peut différer du type de métrique soumis. Lors de la soumission d'un type de métrique Taux via DogStatsD, la métrique apparaît comme un GAUGE dans l'application pour garantir une comparaison pertinente entre différents Agents.

## Fonctions

Après avoir [installé DogStatsD][1], les fonctions suivantes sont disponibles pour soumettre vos métriques à Datadog en fonction de leur type de métrique. Les fonctions ont les paramètres partagés suivants :

| Paramètre        | Type            | Requis | Description                                                                                                                                                                                    |
|------------------|-----------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | Chaîne          | Oui      | Nom de la métrique à soumettre.                                                                                                                                                                  |
| `<METRIC_VALUE>` | Double          | Oui      | Valeur associée à votre métrique.                                                                                                                                                             |
| `<SAMPLE_RATE>`  | Double          | Non       | Le taux d'échantillonnage à appliquer à la métrique. Prend une valeur entre `0` (tout est échantillonné, donc rien n'est envoyé) et `1` (aucun échantillon). Voir la section [Taux d'échantillonnage](#sample-rates) pour en savoir plus. |
| `<TAGS>`         | Liste de chaînes | Non       | Une liste de balises à appliquer à la métrique. Voir la section [Tagging des métriques](#metric-tagging) pour en savoir plus.                                                                                       |
| `<CARDINALITY>`  | Enum            | Non       | La [cardinalité][10] des balises à attribuer à cette métrique.                                                                                                                               |

### COMPTE

`increment(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY> )`
: Utilisé pour incrémenter une métrique de type COMPTE. Stocké en tant que type `RATE` dans Datadog. Chaque valeur dans la série temporelle stockée est un delta normalisé dans le temps de la valeur de la métrique sur la période de vidage StatsD.

`decrement(<METRIC_NAME>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Utilisé pour décrémenter une métrique de type COMPTE. Stocké en tant que type `RATE` dans Datadog. Chaque valeur dans la série temporelle stockée est un delta normalisé dans le temps de la valeur de la métrique sur la période de vidage StatsD.

`count(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Utilisé pour incrémenter une métrique de type COMPTE à partir d'un `Value` arbitraire. Stocké en tant que type `RATE` dans Datadog. Chaque valeur dans la série temporelle stockée est un delta normalisé dans le temps de la valeur de la métrique sur la période de vidage StatsD.

**Remarque**: `COUNT` les métriques de type peuvent afficher une valeur décimale dans Datadog car elles sont normalisées sur l'intervalle de vidage pour rapporter des unités par seconde.

#### Exemples de code

Émettre une métrique `COUNT` stockée en tant que métrique `RATE` vers Datadog. En savoir plus sur le type `COUNT` dans la documentation [types de métriques][2].

Exécutez le code suivant pour soumettre une métrique DogStatsD `COUNT` à Datadog. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

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

**Remarque:** `statsd.count` n'est pas pris en charge en Python.

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

Après avoir exécuté le code ci-dessus, vos données de métriques sont disponibles pour être graphées dans Datadog :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Incrémenter Décrémenter" >}}

Puisque la valeur est soumise en tant que `COUNT`, elle est stockée en tant que `RATE` dans Datadog. Pour obtenir des comptes bruts dans Datadog, appliquez une fonction à votre série telle que la fonction [Somme cumulative][3] ou [Intégrale][4] :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Incrément Décrément avec Cumsum" >}}

### GAUGE

`gauge(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Stocké en tant que type `GAUGE` dans Datadog. Chaque valeur dans la série temporelle stockée est la dernière valeur de jauge soumise pour la métrique pendant la période de vidage de StatsD.

#### Exemples de code

Émettre une métrique `GAUGE` - stockée en tant que métrique `GAUGE` - vers Datadog. En savoir plus sur le type `GAUGE` dans la documentation des [types de métriques][5].

Exécutez le code suivant pour soumettre une métrique DogStatsD `GAUGE` à Datadog. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

**Remarque :** Les appels de soumission de métriques sont asynchrones. Si vous souhaitez vous assurer que les métriques sont soumises, appelez `flush` avant la sortie du programme.

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

Après avoir exécuté le code ci-dessus, vos données de métriques sont disponibles pour être graphées dans Datadog :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/gauge.png" alt="Jauge" >}}

### SET

`set(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Stocké en tant que type `GAUGE` dans Datadog. Chaque valeur dans la série temporelle stockée est le compte des valeurs uniques soumises à StatsD pour une métrique pendant la période de vidage.

#### Exemples de code

Émettre une métrique `SET` - stockée en tant que métrique `GAUGE` - vers Datadog.

Exécutez le code suivant pour soumettre une métrique DogStatsD `SET` à Datadog. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

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

Après avoir exécuté le code ci-dessus, vos données de métriques sont disponibles pour être graphées dans Datadog :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/set.png" alt="Définir" >}}

### HISTOGRAM

`histogram(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Étant donné que plusieurs métriques sont soumises, les types de métriques stockés (`GAUGE`, `RATE`) dépendent de la métrique. Consultez la documentation du [type de métrique HISTOGRAM][6] pour en savoir plus.

#### Configuration

* Configurez l'agrégation à envoyer à Datadog avec le paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][7]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées.
* Configurez l'agrégation des percentiles à envoyer à Datadog avec le paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][7]. Par défaut, seul le percentile `95pc` est envoyé.

#### Exemples de code

Le type de métrique `HISTOGRAM` est spécifique à DogStatsD. Émettez une métrique `HISTOGRAM`—stockée en tant que métrique `GAUGE` et `RATE`—vers Datadog. En savoir plus sur le type `HISTOGRAM` dans la documentation des [types de métriques][6].


Exécutez le code suivant pour soumettre une métrique DogStatsD `HISTOGRAM` à Datadog. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

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

L'instrumentation ci-dessus produit les métriques suivantes :

| Métrique                                  | Description                             |
|-----------------------------------------|-----------------------------------------|
| `example_metric.histogram.count`        | Nombre de fois que cette métrique a été échantillonnée |
| `example_metric.histogram.avg`          | Moyenne des valeurs échantillonnées           |
| `example_metric.histogram.median`       | Valeur échantillonnée médiane                    |
| `example_metric.histogram.max`          | Valeur échantillonnée maximale                   |
| `example_metric.histogram.95percentile` | Valeur échantillonnée au 95e percentile           |

Après avoir exécuté le code ci-dessus, vos données de métriques sont disponibles pour être graphées dans Datadog :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogramme" >}}

#### MINUTERIE

`TIMER` le type de métrique dans DogStatsD est une implémentation de `HISTOGRAM` type de métrique (à ne pas confondre avec les minuteries dans le StatsD standard). Il mesure uniquement les données de timing : par exemple, le temps qu'une section de code met à s'exécuter.

`timed(<METRIC_NAME>, <METRIC_VALUE>, <SAMPLE_RATE>, <TAGS>, <CARDINALITY>)`
: Étant donné que plusieurs métriques sont soumises, les types de métriques stockés (`GAUGE`, `RATE`) dépendent de la métrique. Consultez la documentation du [type de métrique HISTOGRAM][6] pour en savoir plus.

##### Configuration

Pour un `TIMER`, les règles de `HISTOGRAM` [configuration](#configuration) s'appliquent.

##### Exemples de code

Émettre une métrique `TIMER`—stockée en tant que métrique `GAUGE` et `RATE`—vers Datadog. En savoir plus sur le type `HISTOGRAM` dans la documentation [types de métriques][6]. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

{{< programming-lang-wrapper langs="python,PHP" >}}

{{< programming-lang lang="python" >}}

En Python, les minuteries sont créées avec un décorateur.

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

ou avec un gestionnaire de contexte :

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

Alors que DogStatsD reçoit les données de métrique de minuterie, il calcule la distribution statistique des temps de rendu et envoie les métriques suivantes à Datadog :

| Métrique                              | Description                             |
|-------------------------------------|-----------------------------------------|
| `example_metric.timer.count`        | Nombre de fois que cette métrique a été échantillonnée |
| `example_metric.timer.avg`          | Temps moyen des valeurs échantillonnées      |
| `example_metric.timer.median`       | Valeur échantillonnée médiane                    |
| `example_metric.timer.max`          | Valeur échantillonnée maximale                   |
| `example_metric.timer.95percentile` | Valeur échantillonnée au 95e percentile           |

DogStatsD traite `TIMER` comme une métrique `HISTOGRAM`. Que vous utilisiez le type de métrique `TIMER` ou `HISTOGRAM`, vous envoyez les mêmes données à Datadog. Après avoir exécuté le code ci-dessus, vos données de métriques sont disponibles pour être graphées dans Datadog :

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/timer.png" alt="Minuterie" >}}

### DISTRIBUTION

`distribution(<METRIC_NAME>, <METRIC_VALUE>, <TAGS>, <CARDINALITY>)`
: Stocké en tant que type `DISTRIBUTION` dans Datadog. Voir la documentation [Distribution dédiée][8] pour en savoir plus.

#### Exemples de code

Le type de métrique `DISTRIBUTION` est spécifique à DogStatsD. Émettre une métrique `DISTRIBUTION` stockée en tant que métrique `DISTRIBUTION` vers Datadog. En savoir plus sur le type `DISTRIBUTION` dans la documentation des [types métriques][9].

Exécutez le code suivant pour soumettre une métrique DogStatsD `DISTRIBUTION` à Datadog. N'oubliez pas de `flush`/`close` le client lorsqu'il n'est plus nécessaire.

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

L'instrumentation ci-dessus calcule le `sum`, `count`, `average`, `minimum`, `maximum`, `50th percentile` (médiane), `75th percentile`, `90th percentile`, `95th percentile` et `99th percentile`. Les distributions peuvent être utilisées pour mesurer la distribution de *tout* type de valeur, comme la taille des fichiers téléchargés ou les résultats des tests en classe.

## Options de soumission de métriques

### Taux d'échantillonnage

Étant donné que la surcharge d'envoi de paquets UDP peut être trop importante pour certains chemins de code intensifs en performances, les clients DogStatsD prennent en charge l'échantillonnage (n'envoyant des métriques qu'un pourcentage du temps). C'est utile si vous échantillonnez de nombreuses métriques, et que votre client DogStatsD n'est pas sur le même hôte que le serveur DogStatsD. Le compromis : vous réduisez le trafic mais perdez une certaine précision et granularité.

Un taux d'échantillonnage de `1` envoie des métriques 100 % du temps, tandis qu'un taux d'échantillonnage de `0` envoie des métriques 0 % du temps.

Avant d'envoyer une métrique à Datadog, DogStatsD utilise le `<SAMPLE_RATE>` pour corriger la valeur de la métrique en fonction du type de métrique (pour estimer la valeur sans échantillonnage) :

| Type de métrique    | Correction du taux d'échantillonnage                                                                                                                                                         |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COUNT`        | Les valeurs reçues sont multipliées par (`1/<SAMPLE_RATE>`). Il est raisonnable de supposer que pour un point de données reçu, `1/<SAMPLE_RATE>` ont en fait été échantillonnés avec la même valeur. |
| `GAUGE`        | Aucune correction. La valeur reçue est conservée telle quelle.                                                                                                                               |
| `SET`          | Aucune correction. La valeur reçue est conservée telle quelle.                                                                                                                               |
| `HISTOGRAM`    | La statistique `histogram.count` est une métrique de COMPTE, et reçoit la correction décrite ci-dessus. D'autres statistiques sont des métriques de jauge et ne sont pas "corrigées".                      |
| `DISTRIBUTION` | Les valeurs reçues sont comptées (`1/<SAMPLE_RATE>`) fois. Il est raisonnable de supposer que pour un point de données reçu, `1/<SAMPLE_RATE>` ont en réalité été échantillonnés avec la même valeur. |

#### Exemples de code

Le code suivant n'envoie des points que la moitié du temps :

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

### Étiquetage des métriques

Ajoutez des étiquettes à toute métrique que vous envoyez à DogStatsD avec le paramètre `tags`.

#### Exemples de code

Le code suivant n'ajoute que les étiquettes `environment:dev` et `account:local` à la métrique `example_metric.increment` :

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
L'argument `tags` peut être une chaîne :

```php
$statsd->increment('example_metric.increment', 1.0, "environment:dev,account:local");
```

ou un tableau :
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

#### Étiquette d'hôte

L'étiquette d'hôte est attribuée automatiquement par l'Agent Datadog qui agrège les métriques. Les métriques soumises avec une étiquette d'hôte ne correspondant pas au nom d'hôte de l'Agent perdent la référence à l'hôte d'origine. L'étiquette d'hôte soumise remplace tout nom d'hôte collecté par ou configuré dans l'Agent.

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/extend/dogstatsd/
[2]: /fr/metrics/types/?tab=count#definition
[3]: /fr/dashboards/functions/arithmetic/#cumulative-sum
[4]: /fr/dashboards/functions/arithmetic/#integral
[5]: /fr/metrics/types/?tab=gauge#definition
[6]: /fr/metrics/types/?tab=histogram#definition
[7]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: /fr/metrics/distributions/
[9]: /fr/metrics/types/?tab=distribution#definition
[10]: /fr/containers/kubernetes/tag