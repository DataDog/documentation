---
title: "Envoi de checks de service\_: DogStatsD"
description: Présentation des fonctionnalités de DogStatsD, y compris des types de données et du tagging.
further_reading:
  - link: /developers/dogstatsd/
    tag: Documentation
    text: Présentation de DogStatsD
  - link: /developers/community/libraries/
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
---
Si StatsD n'accepte que les métriques, DogStatsD prend en charge les trois principaux types de données Datadog : métriques, événements et checks de service. Cette section propose des cas d'utilisation typiques des checks de service, accompagnés d'exemples de code.

## Fonction

Une fois [DogStatsD installé][1], vous pouvez envoyer des checks de service à Datadog via la fonction suivante :

```text
service_check(<NOM_CHECK_SERVICE>, <STATUT>, <TAGS>, <HOSTNAME>, <MESSAGE>)
```

Paramètres de la fonction check de service :

| Paramètre              | Type            | Obligatoire | Valeur par défaut | Description                                                                                                |
|------------------------|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------|
| `<NOM_CHECK_SERVICE>` | Chaîne          | Oui      | -             | Le nom du check de service.                                                                             |
| `<STATUT>`             | Nombre entier             | Oui      | -             | Une constante décrivant le statut du service : `0` pour OK, `1` pour WARN, `2` pour CRITICAL et `3` pour UNKNOWN. |
| `<TAGS>`               | Liste de paires key:value | Non       | -             | La liste des tags à associer au check de service.                                                        |
| `<HOSTNAME>`           | Chaîne          | Non       | Host actuel  | Hostname à associer à ce check de service.                                                          |
| `<MESSAGE>`            | Chaîne          | Non       | -             | Informations supplémentaires ou une description de la raison pour laquelle ce statut est généré.                                        |

### Exemples de code

Exécutez le code suivant pour envoyer un check de service à Datadog via DogStatsD. N'oubliez pas de `flush`/`close` le client une fois sa mission accomplie.

{{< programming-lang-wrapper langs="python,ruby,go,java,.NET,php" >}}

{{< programming-lang lang="python" >}}
```python
from datadog import initialize, statsd

options = {"statsd_host": "127.0.0.1", "statsd_port": 8125}

initialize(**options)

statsd.service_check(
    check_name="application.service_check",
    status="0",
    message="Application is OK",
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
            dogStatsdService.Configure(dogstatsdConfig);
            dogStatsdService.ServiceCheck("Service.check.name", 0, message: "Application is OK.", tags: new[] { "env:dev" });
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

Après la transmission d'un check de service, utilisez-le pour déclencher un [monitor de check custom][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/
[2]: /fr/monitors/create/types/custom_check/