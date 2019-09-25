---
title: DogStatsD
kind: documentation
description: Présentation et instructions de configuration de DogStatsD.
aliases:
  - /fr/guides/dogstatsd/
  - /fr/guides/DogStatsD/
  - /fr/developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
  - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
    tag: GitHub
    text: Code source de DogStatsD
---
La meilleure façon d'intégrer vos métriques custom d'application à Datadog consiste à les envoyer à DogStatsD, un service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD exécute le protocole [StatsD][1] en apportant quelques extensions spécifiques à Datadog :

* Type de métrique histogram
* Événements et checks de service
* Tagging

Vous pouvez utiliser n'importe quel client StatsD. Cependant, si vous n'utilisez pas DogStatsD, vous ne pourrez pas tirer profit des [extensions Datadog](#decouvrir-dogstatsd).

**Remarque** : DogStatsD ne permet PAS d'utiliser les éléments suivants de StatsD :

* Les deltas gauge (consultez [ce problème][2])
* Les minuteurs en tant que type de métrique native (bien qu'il [les prend en charge par l'intermédiaire des histogrammes][3])

## Fonctionnement

DogStatsD accepte les [métriques custom][4], les événements et les checks de service par le biais du protocole UDP. Il les agrège et les transmet régulièrement à Datadog.
Grâce au protocole UDP, votre application peut envoyer des métriques à DogStatsD et reprendre sa tâche sans attendre de réponse. Si jamais DogStatsD devient indisponible, votre application continue à fonctionner.

{{< img src="developers/dogstatsd/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

Lorsque DogStatsD reçoit des données, il agrège de nombreux points de données pour chaque métrique en un point de données unique sur une période : l'intervalle d'envoi. Imaginons que Datadog soit chargé d'incrémenter un counter chaque fois qu'une requête de base de données spécifique est appelée :

```python

def query_my_database():
    dog.increment('database.query.count')
    # Exécuter la requête...
```

Si cette fonction s'exécute cent fois pendant un intervalle d'envoi (10 secondes par défaut), elle envoie à DogStatsD cent paquets UDP indiquant « incrémenter le counter `database.query.count` ». DogStatsD agrège ces points en une seule valeur de métrique (ici, 100) et l'envoie à Datadog. La valeur est conservée et disponible sur Datadog et peut être représentée graphiquement avec le reste de vos métriques.

## Implémentation

### Agent

Commencez par modifier votre fichier `datadog.yaml` en supprimant la mise en commentaire des lignes suivantes :
```
use_dogstatsd: true

...

dogstatsd_port: 8125
```

[Relancez ensuite votre Agent][5].

Par défaut, DogStatsD effectue une écoute sur le port UDP **8125**. Pour modifier ce réglage, configurez l'option `dogstatsd_port` dans le principal [fichier de configuration de l'Agent][6] et redémarrez le client. Vous pouvez également configurer DogStatsD afin d'utiliser [un socket de domaine Unix][7].

### Code

Il existe des [bibliothèques client DogStatsD][8] pour de nombreux langages et environnements. Vous _pouvez_ utiliser un client StatsD générique pour envoyer des métriques à DogStatsD, mais vous ne pourrez pas utiliser toutes les fonctionnalités de Datadog mentionnées ci-dessus.

Pour Python :
```shell
$ pip install datadog
```

Pour Ruby :
```shell
$ gem install dogstatsd-ruby
```

Effectuez ensuite l'importation afin de pouvoir l'utiliser :

Pour Python :
```python
from datadog import statsd
```

Pour Ruby :
```ruby
# Importer la bibliothèque
require 'datadog/statsd'

# Créer une instance client DogStatsD.
statsd = Datadog::Statsd.new
```

## Découvrir DogStatsD

DogStatsD et StatsD sont assez semblables. Toutefois, DogStatsD gère différemment certains aspects et comprend des fonctionnalités avancées propres à Datadog. Consultez la section [Types de données et tags][9] pour obtenir des informations supplémentaires sur les extensions Datadog de DogStatsD, y compris les types de données, les événements, les checks de service et les tags.

Si vous souhaitez approfondir vos connaissances sur le format des datagrammes utilisé par DogStatsD, ou concevoir votre propre bibliothèque Datadog, consultez la section [Datagramme et interface système][10], qui décrit également comment envoyer des métriques et des événements directement depuis la ligne de commande.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: https://github.com/DataDog/dd-agent/pull/2104
[3]: /fr/developers/dogstatsd/data_types/#timers
[4]: /fr/developers/metrics/custom_metrics
[5]: /fr/agent/guide/agent-commands
[6]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[7]: /fr/developers/dogstatsd/unix_socket
[8]: /fr/libraries
[9]: /fr/developers/dogstatsd/data_types
[10]: /fr/developers/dogstatsd/datagram_shell