---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos applications Ruby grâce aux bibliothèques client de Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/ruby/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rails-with-datadog/'
    tag: Blog
    text: Surveillance des applications Rails avec Datadog
git_integration_title: ruby
has_logo: true
integration_title: Ruby
is_public: true
kind: integration
manifest_version: '1.0'
name: ruby
public_title: Intégration Datadog/Ruby
short_description: Envoyez des métriques custom à partir de vos applications Ruby grâce au client Datadog. libraries.
version: '1.0'
---
## Présentation

L'intégration Ruby vous permet de surveiller des métriques custom en ajoutant quelques lignes de code à votre application Ruby. Par exemple, il peut s'agir d'une métrique qui renvoie le nombre de vues de pages ou la durée d'un appel de fonction.

## Implémentation

Les deux bibliothèques de Datadog vous aident à recueillir les métriques de vos applications Ruby :

| Bibliothèque             | Description                                                                                                                                                                                                                 |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [dogstatsd-ruby][1] | Un client pour DogStatsD, une extension du serveur de métrique StatsD pour Datadog.                                                                                                                                               |
| [dogapi-rb][2]      | Le client Ruby est une bibliothèque qui peut être incluse dans des projets Ruby existants ou utilisée pour le développement de scripts autonomes. Il permet d'ajouter une couche d'abstraction en plus de l'interface HTTP brute de Datadog pour l'envoi d'événements et de métriques. |

### Installation

Pour installer le client Ruby pour l'API Datadog :

```
gem install dogapi
```

Pour installer le client dogstatsd-ruby pour DogStatsD :

```
gem install dogstatsd-ruby
```

### Collecte de métriques

Pour l'intégration Ruby, toutes les métriques sont des [métriques custom][3]. Pour en savoir plus sur la collecte de métriques custom, consultez les ressources suivantes :

* [Guide d'utilisation des métriques pour les développeurs][4]
* Documentation dans les dépôts [dogstatsd-ruby][1] et [dogapi-rb][2]
* [Documentation relative à l'API][5]

Voici un exemple d'instrumentation de votre code à l'aide de l'API Datadog :

```

require 'rubygems'
require 'dogapi'

api_key = "<VOTRE_CLÉ_API_DD>"
application_key = "<VOTRE_CLÉ_APP_DD>"

# L'envoi d'événements ne nécessite pas la clé d'application.
dog = Dogapi::Client.new(api_key)

# Envoyer un nouvel événement.
dog.emit_event(Dogapi::Event.new('msg_text', :msg_title => 'Title'))
```

Voici un exemple d'instrumentation de votre code à l'aide du client DogStatsD :

```
# Charger le module dogstats.
require 'datadog/statsd'

# Créer une instance stats.
statsd = Datadog::Statsd.new('localhost', 8125)

# Incrémenter un counter.
statsd.increment('page.views')

# Enregistrer une gauge 50 % du temps.
statsd.gauge('users.online', 123, :sample_rate=>0.5)
```

### Collecte de traces

Consultez la documentation de Datadog relative au [tracing d'applications Ruby][6].

### Collecte de logs

*Disponible à partir des versions > 6.0 de l'Agent*

Consultez la documentation de Datadog relative à la [collecte de logs avec Ruby on Rails][7].

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dogstatsd-ruby
[2]: https://github.com/DataDog/dogapi-rb
[3]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[4]: https://docs.datadoghq.com/fr/developers/metrics
[5]: https://docs.datadoghq.com/fr/api/?lang=ruby
[6]: https://docs.datadoghq.com/fr/tracing/setup/ruby
[7]: https://docs.datadoghq.com/fr/logs/log_collection/ruby
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}