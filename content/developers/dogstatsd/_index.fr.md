---
title: DogStatsD
kind: documentation
description: Introduction et instructions d'implémentation pour DogStatsD.
aliases:
  - /fr/guides/dogstatsd/
  - /fr/guides/DogStatsD/
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques pour l'API et DogStatsD officielles et maintenue par la communauté
  - link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
    tag: "Github"
    text: Code source de DogStatsD
---

Le moyen le plus simple d'importer vos métriques d'application personnalisées dans Datadog consiste à les envoyer vers DogStatsD, qui s'agit d'un service d'agrégation de métriques associé à l'Agent Datadog. DogStatsD implémente le protocole [StatsD][5] et ajoute quelques extensions spécifiques à Datadog :

* Type de métrique « histogramme »
* Checks de service et événements
* Tagging

Tout client StatsD fonctionne, mais vous n'aurez pas les fonctionnalités supplémentaires qui sont spécifique à Datadog.

**Note**: DogStatsD n'implémente PAS les éléments suivants de StatsD:

* Gauge deltas (Voir [cette issue][1])
* Timers en tant que type de métrique natif (bien qu'il [les supporte via les histogrammes](#timers))

## Comment ça marche

DogStatsD accepte les [métriques personnalisées][6], les évènements et les checks de service par UDP, les agrègent et les transmets périodiquement vers Datadog.
Parce qu'il utilise UDP, votre application peut envoyer des métriques vers DogStatsD et reprendre son travail sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application ne sautera pas un temps.

{{< img src="developers/dogstatsd/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

Lors de la réception des données, DogStatsD agrège plusieurs points de données pour chaque métrique unique en un seul point de donnée sur une période de temps appelé "flush interval". Voici un exemple de comment cela fonctionne:

Supposons que vous vouliez savoir combien de fois votre application Python appelle une requête de base de données particulière. Votre application peut indiquer à DogStatsD d'incrémenter un compteur chaque fois que la requête est appelée:

```python

def query_my_database():
    dog.increment('database.query.count')
    # Run the query ...
```

Si cette fonction s'exécute cent fois pendant le flush interval (dix secondes, par défaut), il enverra à DogStatsD cent paquets UDP qui disent « incrémenter le compteur `database.query.count` ». DogStatsD agrège ces points dans une valeur de métrique unique, 100 dans ce cas, et l'envoie vers Datadog où elle est stockée et rendue disponible pour la visualisation comme les autres métriques.

## Implémentation

### Agent

Commencez par éditer votre fichier `datadog.yaml` en décommentant les lignes suivantes:
```
use_dogstatsd: true

...

dogstatsd_port: 8125
```

Puis [redémarrez votre Agent][7].

Une fois cela fait, votre application peut communiquer de manière fiable avec la [bibliothèque client DogStatsD][2] pour votre langue d'application et vous serez prêt à commencer. Vous _pouvez_ utiliser n'importe quel client StatsD générique pour envoyer des métriques vers DogStatsD, par contre, dans ce cas vous ne pourrez pas utiliser les fonctionnalités spécifiques à Datadog mentionnées ci-dessus.

Par défaut, DogStatsD écoute sur port **8125** UDP. Si vous avez besoin de le modifier, configurez l'option `dogstatsd_port` dans le fichier de [configuration principal de l'Agent][3] :
```
# Assurez-vous que le client se communique avec le bon port.
dogstatsd_port: 8125
```

[Redémarrez DogStatsD][7] afin de prendre en compte les changements.

### Code

Installer le module.

Python:
```shell
$ pip install datadog
```

Ruby:
```shell
$ gem install dogstatsd-ruby
```

Importer le module.

Python:
```python
from datadog import statsd
```

Ruby:
```ruby
require 'datadog/statsd'

# Créer un instance
statsd = Datadog::Statsd.new
```

## Plongez dans DogStatsD

DogStatsD et StatsD sont généralement similar, par contre, certaines fonctionnalités spécifique à Datadog sont présentes dans DogStatsD. Consultez la section [types de données et tags][7] afin de savoir plus sur les extensions propres à Datadog - notamment les types de données disponibles, les évènements, les Checks de service, et les tags.

Si vous souhaitez en savoir plus sur le format de datagramme utilisé par DogStatsD, ou si vous souhaitez développer votre propre bibliothèque Datadog, consultez la section [datagramme et l'interface système][8], qui explique également comment envoyer des métriques et des événements directement à partir de la ligne de commande.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /libraries/
[2]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[3]: https://github.com/etsy/statsd
[4]: /developers/metrics/custom_metrics
[5]: /agent/faq/agent-commands
[6]: /developers/dogstatsd/data_types/#timers
[7]: /developers/dogstatsd/data_types
[8]: /developers/dogstatsd/datagram_shell
