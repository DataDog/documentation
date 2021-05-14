---
title: Envoyer des événements avec DogStatsD
kind: documentation
description: 'Présentation des fonctionnalités de DogStatsD, y compris des types de données et du tagging.'
further_reading:
  - link: /developers/dogstatsd/
    tag: Documentation
    text: Présentation de DogStatsD
  - link: /developers/libraries/
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
## Envoi

Une fois [DogStatsD installé][1], vous pouvez envoyer des événements à votre [flux d'événements Datadog][2] via la fonction suivante :

```text
event(<TITRE>, <TEXTE>, <TIMESTAMP>, <HOSTNAME>, <CLÉ_AGRÉGATION>, <PRIORITÉ>, <NOM_TYPE_SOURCE>, <TYPE_ALERTE>, <TAGS>)
```

**Définitions** :

| Paramètre            | Type            | Obligatoire | Description                                                                                |
|----------------------|-----------------|----------|--------------------------------------------------------------------------------------------|
| `<TITRE>`            | Chaîne          | Oui      | Le titre de l’événement                                                                     |
| `<TEXTE>`             | Chaîne          | Oui      | Le corps de texte de l’événement                                                                 |
| `<TIMESTAMP>`        | Nombre entier         | Non       | Le timestamp de l'événement selon l'epoch Unix (par défaut, défini sur l'heure actuelle du serveur DogStatsD) |
| `<HOSTNAME>`         | Chaîne          | Non       | Le nom du host                                                                       |
| `<CLÉ_AGGRÉGATION>`  | Chaîne          | Non       | La clé à utiliser pour agréger les événements                                                        |
| `<PRIORITÉ>`         | Chaîne          | Non       | Indique la priorité de l'événement (`normal` ou `low`).                                   |
| `<NOM_TYPE_SOURCE>` | Chaîne          | Non       | Le nom du type de source                                                                  |
| `<TYPE_ALERTE>`       | Chaîne          | Non       | `error`, `warning`, `success` ou `info` (valeur par défaut : `info`)                              |
| `<TAGS>`             | Liste de chaînes | Non       | La liste des tags associés à cet événement.                                                 |

### Exemples

Visualisez les erreurs et les exceptions dans Datadog avec un événement DogStatsD :

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
            dogStatsdService.Configure(dogstatsdConfig);    
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

La bibliothèque DogStatsD-PHP vous permet d'envoyer des événements à l'API Datadog directement via TCP. Cette méthode est plus lente mais aussi plus fiable que lorsque vous faites appel à l'instance DogStatsD de l'Agent, les événements étant transmis de votre application à l'Agent via UDP.
Pour l'utiliser, vous devez configurer la bibliothèque avec vos [clés d'API et d'application Datadog][1] au lieu de l'instance DogStatsD locale :

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

[1]: https://app.datadoghq.com/account/settings#api

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**Remarques** :

* L'envoi d'événements via cette méthode fait appel à cURL pour les requêtes d'API.
* Nous vous conseillons d'utiliser un bloc de code `try`/`catch` pour éviter d'envoyer des avertissements ou des erreurs en cas de problème de communication avec l'API Datadog.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/developers/dogstatsd/
[2]: /fr/events/