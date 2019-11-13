---
title: "Envoi de métrique\_: DogStatsD"
kind: documentation
description: Envoyez des métriques custom directement depuis votre application.
aliases:
  - /fr/developers/faq/reduce-submission-rate
  - /fr/developers/faq/why-is-my-counter-metric-showing-decimal-values
  - /fr/developers/faq/dog-statsd-sample-rate-parameter-explained
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/metrics/metrics_type
    tag: Documentation
    text: Types de métrique Datadog
---
Si StatsD n'accepte que les métriques, DogStatsD prend en charge les trois principaux types de données Datadog : métriques, événements et checks de service. Cette section propose des cas d'utilisation typiques des métriques, présentés par types de métrique, et décrit les options de [taux d'échantillonnage](#taux-d-echantillonnage) et de [tagging de métriques](#tagging-metriques) spécifiques à DogStatsD.

Les utilisateurs de StatsD connaissent déjà les métriques [COUNT](#count), [GAUGE](#gauge) et [SET](#set). Les métriques `TIMER` de StatsD sont un sous-ensemble des métriques `HISTOGRAM` de DogStatsD. En outre, vous pouvez envoyer des métriques de type [HISTOGRAM](#histogram) et [DISTRIBUTION](#distribution) avec DogStatsD.

**Remarque** : selon la méthode d'envoi utilisée, le type de métrique stocké dans Datadog peut être différent du type de métrique envoyé.

## Fonctions

Une fois [DogStatsD installé][1], les fonctions ci-dessous peuvent être utilisées pour envoyer vos métriques à Datadog en fonction du type de métrique. Ces fonctions ont les paramètres suivants en commun :

| Paramètre        | Type            | Obligatoire | Description                                                                                                                                                                                    |
| ---------------- | --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_MÉTRIQUE>`  | Chaîne          | Oui      | Le nom de la métrique à envoyer.                                                                                                                                                                  |
| `<VALEUR_MÉTRIQUE>` | Double          | Oui      | La valeur associée à votre métrique.                                                                                                                                                             |
| `<TAUX_ÉCHANTILLONNAGE>`  | Double          | Non       | Le taux d'échantillonnage à appliquer à votre métrique. Toutes les valeurs comprises entre `0` (tout est échantillonné et rien n'est envoyé) à `1` (pas d'échantillonnage) sont acceptées. Pour en savoir plus, consultez la [section sur les taux d'échantillonnage](#taux-d-echantillonnage). |
| `<TAGS>`         | Liste de chaînes | Non       | La liste des tags à appliquer à la métrique. Pour en savoir plus, consultez la section sur le [tagging de métriques](#tagging-metriques).                                                                                       |

### COUNT

| Méthode                                                        | Description                                               | Type de stockage                                                                                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `increment(<NOM_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)`             | Utilisé pour incrémenter une métrique COUNT.                         | Stocké en tant que `RATE` dans Datadog. Chaque valeur de la série temporelle stockée correspond au delta normalisé de la valeur du counter durant la période de transmission de StatsD. |
| `decrement(<NOM_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)`             | Utilisé pour décrémenter une métrique COUNT.                         | Stocké en tant que `RATE` dans Datadog. Chaque valeur de la série temporelle stockée correspond au delta normalisé de la valeur du counter durant la période de transmission de StatsD. |
| `count(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)` | Utilisé pour incrémenter une métrique COUNT à partir d'une `valeur` quelconque | Stocké en tant que `RATE` dans Datadog. Chaque valeur de la série temporelle stockée correspond au delta normalisé de la valeur du counter durant la période de transmission de StatsD. |

**Remarque** : Datadog peut afficher les métriques de type `COUNT` avec une valeur décimale, car elles sont normalisées sur l'intervalle de transmission et indiquées en unités par seconde.

#### Exemples de code

Dans cet exemple, une métrique `COUNT` stockée en tant que métrique `RATE` est envoyée à Datadog. Pour en savoir plus sur le type `COUNT`, consultez la documentation sur les [types de métrique][2].

{{< tabs >}}
{{% tab "Python" %}}

Exécutez le code Python suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="python" filename="count_metric.py" >}}
from datadog import initialize, statsd
import time

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.increment('exemple_métrique.increment', tags=["environment:dev"])
  statsd.decrement('exemple_métrique.decrement', tags=["environment:dev"])
  time.sleep(10)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Exécutez le code Ruby suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="ruby" filename="count_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.increment('exemple_métrique.increment', tags: ['environment:dev'])
    statsd.decrement('exemple_métrique.decrement', tags: ['environment:dev'])
    statsd.count('exemple_métrique.count', 2, tags: ['environment:dev'])
    sleep 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Exécutez le code Go suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="go" filename="count_metric.go" >}}
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
    for {

        statsd.Incr("exemple_métrique.increment", []string{"environment:dev"}, 1)
        statsd.Decr("exemple_métrique.decrement", []string{"environment:dev"}, 1)
        statsd.Count("exemple_métrique.count", 2, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Exécutez le code Java suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="java" filename="count_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.incrementCounter("exemple_métrique.increment", ["environment:dev"]);
            Statsd.decrementCounter("exemple_métrique.decrement", ["environment:dev"]);
            Statsd.count("exemple_métrique.count", 2, ["environment:dev"]);
            Thread.sleep(100000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

Exécutez le code .NET suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="csharp" filename="count_metric.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Increment("exemple_métrique.increment", tags: new[] {"environment:dev"});
            DogStatsd.Decrement("exemple_métrique.decrement", tags: new[] {"environment:dev"});
            DogStatsd.Counter("exemple_métrique.count", 2, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le code PHP suivant pour envoyer une métrique `COUNT` DogStatsD à Datadog :

{{< code-block lang="php" filename="count_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->increment('exemple_métrique.increment', array('environment'=>'dev'));
    $statsd->decrement('exemple_métrique.decrement', array('environment'=>'dev'));
    sleep(10);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Une fois le code ci-dessus exécuté, les données de vos métriques peuvent être représentées graphiquement dans Datadog :

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement.png" alt="Incrémenter décrémenter" responsive="true">}}

La valeur étant envoyée en tant que `COUNT`, elle est stockée en tant que `RATE` dans Datadog. Pour récupérer des counts bruts dans Datadog, appliquez une fonction à votre série, telle que la fonction [Somme cumulée][3] ou [Intégrale][4] :

{{< img src="developers/metrics/dogstatsd_metrics_submission/increment_decrement_cumsum.png" alt="Incrémenter décrémenter avec somme cumulée" responsive="true">}}

### GAUGE

| Méthode                                                        | Type de stockage dans Datadog                                                                                                                                      |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gauge(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)` | Stockée en tant que métrique `GAUGE` dans Datadog. Chaque valeur de la série temporelle stockée correspond à la dernière valeur gauge envoyée pour cette métrique durant l'intervalle de transmission de StatsD. |

#### Exemples de code

Dans cet exemple, une métrique `GAUGE` stockée en tant que métrique `GAUGE` est envoyée à Datadog. Pour en savoir plus sur le type `GAUGE`, consultez la documentation sur les [types de métrique][5].

{{< tabs >}}
{{% tab "Python" %}}

Exécutez le code Python suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="python" filename="gauge_metric.py" >}}
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
  statsd.gauge('exemple_métrique.gauge', i, tags=["environment:dev"])
  time.sleep(10)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Exécutez le code Ruby suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="ruby" filename="gauge_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0

while true do
    i += 1
    statsd.gauge('exemple_métrique.gauge', i, tags: ['environment:dev'])
    sleep 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Exécutez le code Go suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="go" filename="gauge_metric.go" >}}
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
    for {
        i += 1
        statsd.Gauge("exemple_métrique.gauge", i, []string{"environment:dev"}, 1)
        time.Sleep(10 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Exécutez le code Java suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="java" filename="gauge_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordGaugeValue("exemple_métrique.gauge", i, ["environment:dev"]);
            Thread.sleep(10000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

Exécutez le code .NET suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="csharp" filename="gauge_metric.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Gauge("exemple_métrique.gauge", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(100000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le code PHP suivant pour envoyer une métrique `GAUGE` DogStatsD à Datadog :

{{< code-block lang="php" filename="gauge_metric.php" >}}
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
    $statsd->gauge('exemple_métrique.gauge', $i, array('environment'=>'dev'));
    sleep(10);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Une fois le code ci-dessus exécuté, les données de votre métrique peuvent être représentées graphiquement dans Datadog :

{{< img src="developers/metrics/dogstatsd_metrics_submission/gauge.png" alt="Gauge" responsive="true">}}

### SET

| Méthode                                                      | Type de stockage dans Datadog                                                                                                                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `set(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)` | Stockée en tant que type `GAUGE` dans Datadog. Chaque valeur de la série temporelle stockée correspond au nombre de valeurs uniques envoyées à StatsD pour une métrique durant l'intervalle de transmission. |

#### Exemples de code

Envoyez une métrique `SET`, stockée comme métrique `GAUGE`, à Datadog. Pour en savoir plus sur le type `SET`, consultez la documentation sur les [types de métrique][6].

{{< tabs >}}
{{% tab "Python" %}}

Exécutez le code Python suivant pour envoyer une métrique `SET` DogStatsD à Datadog :

{{< code-block lang="python" filename="set_metric.py" >}}
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
  statsd.set('exemple_métrique.set', i, tags=["environment:dev"])
  time.sleep(random.randint(0, 10))
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Exécutez le code Ruby suivant pour envoyer une métrique `SET` DogStatsD à Datadog :

{{< code-block lang="ruby" filename="set_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

i = 0
while true do
    i += 1
    statsd.set('exemple_métrique.gauge', i, tags: ['environment:dev'])
    sleep rand 10
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Exécutez le code Go suivant pour envoyer une métrique `SET` DogStatsD à Datadog :

{{< code-block lang="go" filename="set_metric.go" >}}
package main

import (
    "log"
    "math/rand"
    "strconv"
    "time"

    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    statsd, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        log.Fatal(err)
    }
    var i float64
    for {
        i += 1
        statsd.Set("exemple_métrique.set", strconv.Itoa(i), []string{"environment:dev"}, 1)
        time.Sleep(rand.Intn(10) * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

Exécutez le code .NET suivant pour envoyer une métrique `SET` DogStatsD à Datadog :

{{< code-block lang="csharp" filename="set_metric.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Set("exemple_métrique.set", i, tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(random.Next(100000));
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le code PHP suivant pour envoyer une métrique `SET` DogStatsD à Datadog :

{{< code-block lang="php" filename="set_metric.php" >}}
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
    $statsd->set('exemple_métrique.set', i, array('environment'=>'dev'));
    sleep(rand(0, 10));
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Une fois le code ci-dessus exécuté, les données de vos métriques peuvent être représentées graphiquement dans Datadog :

{{< img src="developers/metrics/dogstatsd_metrics_submission/set.png" alt="Set" responsive="true">}}

### HISTOGRAM

| Méthode                                                            | Type de stockage dans Datadog                                                                                                                                              |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `histogram(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)` | Comme plusieurs métriques sont envoyées, le type de métrique stocké (`GAUGE`, `RATE`) dépend de la métrique. Pour en savoir plus, consultez la documentation sur le [type de métrique HISTOGRAM][7]. |

#### Configuration

* Configurez les agrégations que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][8]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées.
* Configurez les agrégations en centile à envoyer à Datadog à l'aide du paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][8]. Par défaut, seul le centile `95pc` est envoyé.

#### Exemples de code

Le type de métrique `HISTOGRAM` est spécifique à DogStatsD. Dans cet exemple, une métrique `HISTOGRAM` stockée en tant que métrique `GAUGE` et `RATE` est envoyée à Datadog. Pour en savoir plus sur le type `HISTOGRAM`, consultez la documentation sur les [types de métrique][7].

{{< tabs >}}
{{% tab "Python" %}}

Exécutez le code Python suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="python" filename="histogram_metric.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.histogram('exemple_métrique.histogram', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Exécutez le code Ruby suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="ruby" filename="histogram_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.set('exemple_métrique.histogram', rand 20, tags: ['environment:dev'])
    sleep 2
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Exécutez le code Go suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="go" filename="histogram_metric.go" >}}
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

    for {
        statsd.Histogram("exemple_métrique.histogram", rand.Intn(20), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Exécutez le code Java suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="java" filename="histogram_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordHistogramValue("exemple_métrique.histogram", new Random().nextInt(20), ["environment:dev"]);
            Thread.sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

Exécutez le code .NET suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="csharp" filename="histogram_metric.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Histogram("exemple_métrique.histogram", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le code PHP suivant pour envoyer une métrique `HISTOGRAM` DogStatsD à Datadog :

{{< code-block lang="php" filename="histogram_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->histogram('exemple_métrique.histogram', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

L'instrumentation ci-dessus génère les métriques suivantes :

| Métrique                                  | Description                             |
| --------------------------------------- | --------------------------------------- |
| `exemple_métrique.histogram.count`        | Le nombre d'échantillonnages de cette métrique |
| `exemple_métrique.histogram.avg`          | La durée moyenne des valeurs échantillonnées      |
| `exemple_métrique.histogram.median`       | La valeur échantillonnée médiane                    |
| `exemple_métrique.histogram.max`          | La valeur échantillonnée maximale                   |
| `exemple_métrique.histogram.95percentile` | Le 95e centile des valeurs échantillonnées           |

Une fois le code ci-dessus exécuté, les données de vos métriques peuvent être représentées graphiquement dans Datadog :

{{< img src="developers/metrics/dogstatsd_metrics_submission/histogram.png" alt="Histogram" responsive="true">}}

#### TIMER

Dans DogStatsD, le type de métrique `TIMER` est une implémentation du type de métrique `HISTOGRAM` (à ne pas confondre avec les timers de StatsD standard). Il mesure uniquement les données temporelles, telles que la durée d'exécution d'une section de code.

| Méthode                                                        | Type de stockage dans Datadog                                                                                                                                              |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timed(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAUX_ÉCHANTILLONNAGE>, <TAGS>)` | Comme plusieurs métriques sont envoyées, le type de métrique stocké (`GAUGE`, `RATE`) dépend de la métrique. Pour en savoir plus, consultez la documentation sur le [type de métrique HISTOGRAM][7]. |

##### Configuration

Pour une métrique `TIMER`, les règles de [configuration](#configuration) des métriques `HISTOGRAM` s'appliquent.

##### Exemples de code

Dans cet exemple, une métrique `TIMER` stockée en tant que métrique `GAUGE` et `RATE` est envoyée à Datadog. Pour en savoir plus sur le type `HISTOGRAM`, consultez la documentation sur les [types de métrique][7].

{{< tabs >}}
{{% tab "Python" %}}

Dans Python, les timers sont créés avec un décorateur :

{{< code-block lang="python" filename="timers.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

@statsd.timed('exemple_métrique.timer', tags=["environment:dev,function:my_function"])
def my_function():
  time.sleep(random.randint(0, 10))

while(1):
  my_function()
{{< /code-block >}}

ou avec un gestionnaire de contexte :

{{< code-block lang="python" filename="context_manager.py" >}}
from datadog import statsd
import time
import random

def my_function():

  # Commencer par spécifier ce que vous ne souhaitez pas mesurer
  sleep(1)

  # Démarrer le timer
  with statsd.timed('exemple_métrique.timer', tags=["environment:dev"]):
    # Ce que vous souhaitez mesurer
    sleep(random.randint(0, 10))

while(1):
  my_function()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Lorsque DogStatsD reçoit les données de la métrique timer, il calcule la distribution statistique des temps de rendu, puis envoie les métriques suivantes à Datadog :

| Métrique                              | Description                             |
| ----------------------------------- | --------------------------------------- |
| `exemple_métrique.timer.count`        | Le nombre d'échantillonnages de cette métrique |
| `exemple_métrique.timer.avg`          | La durée moyenne des valeurs échantillonnées      |
| `exemple_métrique.timer.median`       | La valeur échantillonnée médiane                    |
| `exemple_métrique.timer.max`          | La valeur échantillonnée maximale                   |
| `exemple_métrique.timer.95percentile` | Le 95e centile des valeurs échantillonnées           |

DogStatsD traite les métriques `TIMER` en tant que métriques `HISTOGRAM`. Que vous utilisiez le type de métrique `TIMER` ou `HISTOGRAM`, vous envoyez les mêmes données à Datadog. Une fois le code ci-dessus exécuté, les données de vos métriques peuvent être représentées graphiquement dans Datadog :

{{< img src="developers/metrics/dogstatsd_metrics_submission/timer.png" alt="Timer" responsive="true">}}

### DISTRIBUTION

Les métriques de distribution sont en version bêta. [Contactez l'assistance Datadog][9] pour activer cette fonctionnalité pour votre compte.

| Méthode                                                | Type de stockage dans Datadog                                                                                          |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `distribution(<NOM_MÉTRIQUE>, <VALEUR_MÉTRIQUE>, <TAGS>)` | Stockée en tant que métrique `DISTRIBUTION` dans Datadog. Pour en savoir plus, consultez la [documentation sur les métriques de distribution][10]. |

#### Exemples de code

Le type de métrique `DISTRIBUTION` est spécifique à DogStatsD. Dans cet exemple, une métrique `DISTRIBUTION` stockée en tant que métrique `DISTRIBUTION` est envoyée à Datadog. Pour en savoir plus sur le type `DISTRIBUTION`, consultez la documentation sur les [types de métrique][11].

{{< tabs >}}
{{% tab "Python" %}}

Exécutez le code Python suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="python" filename="distribution_metric.py" >}}
from datadog import initialize, statsd
import time
import random

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

while(1):
  statsd.distribution('exemple_métrique.distribution', random.randint(0, 20), tags=["environment:dev"])
  time.sleep(2)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

Exécutez le code Ruby suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="ruby" filename="distribution_metric.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

while true do
    statsd.distribution('exemple_métrique.gauge', rand 20, tags: ['environment:dev'])
    sleep 2
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

Exécutez le code Go suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="go" filename="distribution_metric.go" >}}
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

    for {
        statsd.Distribution("exemple_métrique.distribution", float64(rand.Intn(20)), []string{"environment:dev"}, 1)
        time.Sleep(2 * time.Second)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

Exécutez le code Java suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="java" filename="distribution_metric.java" >}}
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);
        for (int i = 0; i < 10; i++) {
            Statsd.recordDistributionValue("exemple_métrique.distribution", new Random().nextInt(20), ["environment:dev"]);
            Thread.sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

Exécutez le code .NET suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="csharp" filename="distribution_metric.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        var random = new Random(0);

        for (int i = 0; i < 10; i++)
        {
            DogStatsd.Distribution("exemple_métrique.distribution", random.Next(20), tags: new[] {"environment:dev"});
            System.Threading.Thread.Sleep(2000);
        }
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

Exécutez le code PHP suivant pour envoyer une métrique `DISTRIBUTION` DogStatsD à Datadog :

{{< code-block lang="php" filename="distribution_metric.php" >}}
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );

while (TRUE) {
    $statsd->distribution('exemple_métrique.distribution', rand(0, 20), array('environment'=>'dev'));
    sleep(2);
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

L'instrumentation ci-dessus calcule les données suivantes : `somme`, `total`, `moyenne`, `minimum`, `maximum`, `50e centile` (médiane), `75e centile`, `90e centile`, `95e centile` et `99e centile`. Les distributions peuvent être utilisées pour mesurer la distribution de *tout* type de valeur, comme le poids de fichiers importés ou les notes d'une classe.

## Options d'envoi de métrique

### Taux d'échantillonnage

Étant donné que l'envoi de paquets UDP peut s'avérer trop intensif pour certains chemins de codes nécessitant des performances optimales, les clients DogStatsD prennent en charge l'échantillonnage. Cela signifie que les métriques ne sont pas envoyées systématiquement, mais seulement un certain pourcentage du temps. Cette fonctionnalité est utile si vous échantillonnez de nombreuses métriques et que votre client DogStatsD n'est pas sur le même host que le serveur DogStatsD. Cette diminution du trafic s'accompagne toutefois d'une diminution de la précision et de la granularité.

Un taux d'échantillonnage de `1` signifie que les métriques sont envoyées 100 % du temps. Un taux d'échantillonnage de `0` signifie que les métriques sont envoyées 0 % du temps.

Avant d'envoyer une métrique à Datadog, DogStatsD utilise le `<TAUX_ÉCHANTILLONNAGE>` pour corriger la valeur de la métrique en fonction du type de métrique, c'est-à-dire pour estimer ce qu'elle aurait été sans échantillonnage :

| Type de métrique | Correction du taux d'échantillonnage                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `COUNT`     | Les valeurs reçues sont multipliées par (`1/<TAUX_ÉCHANTILLONNAGE>`). On peut raisonnablement supposer que pour un point de données reçu, `1/<TAUX_ÉCHANTILLONNAGE>` ont été échantillonnés avec la même valeur. |
| `GAUGE`     | Aucune correction. La valeur reçue est conservée.                                                                                                                               |
| `SET`       | Aucune correction. La valeur reçue est conservée.                                                                                                                               |
| `HISTOGRAM` | La statistique `histogram.count` est une métrique counter. Elle est corrigée comme indiqué plus haut. Les autres statistiques sont les métriques gauge, qui ne sont pas corrigées.                    |

#### Exemples de code

Le code suivant envoie des points de données 50 % du temps :

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('loop.count', sample_rate=0.5)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('loop.count', :sample_rate => 0.5)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("exemple_métrique.increment", []string{}, 0.5)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("exemple_métrique.increment", sampleRate=0.5);
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("exemple_métrique.increment", sampleRate: 0.5);
```

{{% /tab %}}
{{% tab "PHP" %}}

```php
<? php
$statsd->increment('exemple_métrique.increment', $sampleRate->0.5);
```
{{% /tab %}}
{{< /tabs >}}

### Tagging de métriques

Ajoutez des tags à n'importe quelle métrique envoyée à DogStatsD avec le paramètre `tags`.

#### Exemples de code

Le code suivant ajoute uniquement les tags `environment:dev` et `account:local` à la métrique `exemple_métrique.increment` :

{{< tabs >}}
{{% tab "Python" %}}

```python
statsd.increment('exemple_métrique.increment', tags=["environment:dev","account:local"])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
statsd.increment('exemple_métrique.increment', tags: ['environment:dev','account:local'])
```

{{% /tab %}}
{{% tab "Go" %}}

```go
statsd.Incr("exemple_métrique.increment", []string{"environment:dev","account:local"}, 1)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
Statsd.incrementCounter("exemple_métrique.increment", ["environment:dev","account:local"]);
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
DogStatsd.Increment("exemple_métrique.increment", tags: new[] {"environment:dev","account:local"})
```

{{% /tab %}}
{{% tab "PHP" %}}

L'argument `tags` peut être une chaîne de caractères :

```php
$statsd->increment('exemple_métrique.increment', "environment:dev,account:local");
```

ou un tableau :

```php
<?php
$statsd->increment('exemple_métrique.increment', array('environment' => 'dev', 'account' => 'local'));

```

{{% /tab %}}
{{< /tabs >}}

#### Tag de host

Le tag de host est attribué automatiquement par l'Agent Datadog chargé de l'agrégation des métriques. Les métriques envoyées avec un tag de host qui ne correspond pas au hostname de l'Agent perdent la référence au host d'origine. Le tag de host envoyé remplace n'importe quel hostname recueilli par l'Agent ou configuré par celui-ci.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: /fr/developers/dogstatsd
[2]: /fr/developers/metrics/metrics_type/?tab=count#metric-type-definition
[3]: /fr/graphing/functions/arithmetic/#cumulative-sum
[4]: /fr/graphing/functions/arithmetic/#integral
[5]: /fr/developers/metrics/metrics_type/?tab=gauge#metric-type-definition
[6]: /fr/developers/metrics/metrics_type/?tab=set#metric-type-definition
[7]: /fr/developers/metrics/metrics_type/?tab=histogram#metric-type-definition
[8]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /fr/help
[10]: /fr/graphing/metrics/distributions
[11]: /fr/developers/metrics/metrics_type/?tab=distribution#metric-type-definition