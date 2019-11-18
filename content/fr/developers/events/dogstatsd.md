---
title: Envoyer des événements avec DogStatsD
kind: documentation
description: 'Présentation des fonctionnalités de DogStatsD, y compris des types de données et du tagging.'
further_reading:
  - link: developers/dogstatsd
    tag: Documentation
    text: Présentation de DogStatsD
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
## Envoi

Une fois [DogStatsD installé][1], vous pouvez envoyer des événements à votre [flux d'événements Datadog][2] via la fonction suivante :

```
event(<TITRE>, <TEXTE>, <TIMESTAMP>, <HOSTNAME>, <CLÉ_AGRÉGATION>, <PRIORITÉ>, <NOM_TYPE_SOURCE>, <TYPE_ALERTE>, <TAGS>)
```

**Définitions** :

| Paramètre            | Type            | Obligatoire | Description                                                                                |
| -------------------- | --------------- | -------- | ------------------------------------------------------------------------------------------ |
| `<TITRE>`            | Chaîne          | Oui      | Le titre de l’événement                                                                     |
| `<TEXTE>`             | Chaîne          | Oui      | Le corps de texte de l’événement                                                                 |
| `<TIMESTAMP>`        | Nombre entier         | Oui      | Le timestamp de l'événement selon l'epoch Unix (par défaut, défini sur l'heure actuelle du serveur DogStatsD) |
| `<HOSTNAME>`         | Chaîne          | Non       | Le nom du host                                                                       |
| `<CLÉ_AGGRÉGATION>`  | Chaîne          | Non       | La clé à utiliser pour agréger les événements                                                        |
| `<PRIORITÉ>`         | Chaîne          | Non       | Indique la priorité de l'événement (`normal` ou `low`).                                   |
| `<NOM_TYPE_SOURCE>` | Chaîne          | Non       | Le nom du [type de source][3]                                                                  |
| `<TYPE_ALERTE>`       | Chaîne          | Non       | `error`, `warning`, `success` ou `info` (valeur par défaut : `info`)                              |
| `<TAGS>`             | Liste de chaînes | Non       | La liste des tags associés à cet événement.                                                 |

### Exemples

Visualisez les erreurs et les exceptions dans Datadog avec un événement DogStatsD :

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" filename="event.py" >}}
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)

statsd.event('An error occurred', 'Error message', alert_type='error', tags=['env:dev'])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" filename="event.rb" >}}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)

statsd.event('An error occurred', "Error message", alert_type: 'error', tags: ['env:dev'])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" filename="event.go" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" filename="event.java" >}}
import com.timgroup.statsd.Event;
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

        Event event = Event.builder()
          .withTitle("An error occurred")
          .withText("Error message")
          .withAlertType(Event.AlertType.ERROR)
          .build();

        Statsd.event(event)
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" filename="event.cs" >}}
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

        StatsdClient.DogStatsd.Configure(dogstatsdConfig);

        DogStatsd.Event("An error occurred", "Error message", alertType: "error", tags: new[] { "env:dev" });
    }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

{{< code-block lang="php" filename="event.php" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd
[2]: /fr/graphing/event_stream
[3]: /fr/integrations/faq/list-of-api-source-attribute-value