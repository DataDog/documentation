---
categories:
- languages
ddtype: crawler
description: Envoyer des métriques personnalisées à partir de vos applications Ruby grâce au bibliothèques client Datadog.
doc_link: https://docs.datadoghq.com/integrations/ruby/
git_integration_title: ruby
has_logo: true
integration_title: Ruby
is_public: true
kind: integration
manifest_version: '1.0'
name: ruby
public_title: Intégration Datadog-Ruby 
short_description: Envoyer des métriques personnalisées à partir de vos applications Ruby avec le client Datadog
  libraries.
version: '1.0'
---

## Aperçu

L'intégration de Ruby vous permet de monitorer des métriques personnalisées en ajoutant simplement quelques lignes de code à votre application Ruby. Par exemple, vous pouvez avoir une métrique qui renvoie le nombre de pages vues ou le temp de tout appel de fonction. Pour plus d'informations sur l'intégration Ruby, reportez-vous au [guide sur la soumission des métriques](/guides/metrics). Pour une utilisation avancée, veuillez vous reporter à la documentation dans les dépôts répertoriés ci-dessous. Vous pouvez également consulter [l'API Datadog](/api) pour plus de détails sur l'utilisation de l'API avec Ruby.

Datadog propose deux bibliothèques pour vous aider à collecter des métriques d'application Ruby:

* [dogstatsd-ruby](https://github.com/DataDog/dogstatsd-ruby). Un client pour DogStatsD, une extension du serveur de statistiques StatsD pour Datadog.
* Le client Ruby est une bibliothèque qui peut être incluse dans des projets Ruby existants ou pour le développement de scripts autonomes. Il fournit une abstraction au-dessus de l'interface HTTP brute de Datadog pour envoyer des événements et des métriques.

## Implémentation
### Installation

1.  Pour installer le client Ruby pour l'API Datadog:

        gem install dogapi

    Pour installer le client dogstatsd-ruby pour DogStatsD:

        gem install dogstatsd-ruby

2.  Commencez à instrumenter votre code à l'aide de l'API Datadog:
```ruby

require 'rubygems'
require 'dogapi'

api_key = "abcdef123456"
application_key = "fedcba654321"

# L'envoi d'événements ne nécessite pas la clé d'application.
dog = Dogapi::Client.new(api_key, application_key)

# Envoyer un événement
dog.emit_event(Dogapi::Event.new('Testing done, FTW'), :host => "my_host")
```

Start instrumenting your code using the DogStatsD client:
```ruby
# Load the dogstats module.
require 'datadog/statsd'

# Create a stats instance.
statsd = Datadog::Statsd.new('localhost', 8125)

# Increment a counter.
statsd.increment('page.views')

# Record a gauge 50% of the time.
statsd.gauge('users.online', 123, :sample_rate=>0.5)
```

### Configuration

Vous ne devez rien faire dans l'application Datadog pour configurer Ruby.

### Validation

Allez sur la page [Metrics Explorer](https://app.datadoghq.com/metric/explorer) afin de voir vos métriques.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
<<<<<<< HEAD
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][6]

[1]: /guides/metrics
[2]: /api
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://app.datadoghq.com/metric/explorer
[5]: http://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/
=======
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
>>>>>>> master
