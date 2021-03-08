---
aliases:
  - /fr/tracing/ruby/
  - /fr/tracing/languages/ruby/
  - /fr/tracing/setup/ruby/
  - /fr/tracing/setup_overview/ruby/
  - /fr/agent/apm/ruby/
code_lang: ruby
code_lang_weight: 15
dependencies:
  - 'https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md'
kind: documentation
title: Tracer des applications Ruby
type: multi-code-lang
---
`ddtrace` est le client de tracing de Datadog pour Ruby. Il permet de tracer les requêtes qui transitent par vos serveurs Web, bases de données et microservices, offrant ainsi aux développeurs une visibilité optimale sur les goulots d'étranglement et les requêtes problématiques.

## Prise en main

Pour la documentation générale sur l'APM, consultez la [documentation relative à la configuration][setup docs].

Pour découvrir comment l'APM se présente une fois que votre application a commencé à envoyer des informations à Datadog, consultez la section [Visualiser vos données APM][visualization docs].

Pour contribuer au code, consultez les [règles de contribution][contribution docs] et le [guide de développement][development docs].

[setup docs]: https://docs.datadoghq.com/tracing/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[visualization docs]: https://docs.datadoghq.com/tracing/visualization/
[contribution docs]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md

## Table des matières

 - [Compatibilité](#compatibility)
 - [Installation](#installation)
     - [Démarrage rapide pour les applications Rails](#quickstart-for-rails-applications)
     - [Démarrage rapide pour les applications Ruby](#quickstart-for-ruby-applications)
     - [Démarrage rapide pour OpenTracing](#quickstart-for-opentracing)
 - [Instrumentation manuelle](#manual-instrumentation)
 - [Instrumenter des intégrations](#integration-instrumentation)
     - [Action Cable](#action-cable)
     - [Action View](#action-view)
     - [Active Model Serializers](#active-model-serializers)
     - [Action Pack](#action-pack)
     - [Active Record](#active-record)
     - [Active Support](#active-support)
     - [AWS](#aws)
     - [Concurrent Ruby](#concurrent-ruby)
     - [Cucumber](#cucumber)
     - [Dalli](#dalli)
     - [DelayedJob](#delayedjob)
     - [Elasticsearch](#elasticsearch)
     - [Ethon et Typhoeus](#ethon)
     - [Excon](#excon)
     - [Faraday](#faraday)
     - [Grape](#grape)
     - [GraphQL](#graphql)
     - [gRPC](#grpc)
     - [http.rb](#http-rb)
     - [httpclient](#httpclient)
     - [MongoDB](#mongodb)
     - [MySQL2](#mysql2)
     - [Net/HTTP](#net-http)
     - [Presto](#presto)
     - [Qless](#qless)
     - [Que](#que)
     - [Racecar](#racecar)
     - [Rack](#rack)
     - [Rails](#rails)
     - [Rake](#rake)
     - [Redis](#redis)
     - [Client Rest](#rest-client)
     - [Resque](#resque)
     - [RSpec](#rspec)
     - [Shoryuken](#shoryuken)
     - [Sequel](#sequel)
     - [Sidekiq](#sidekiq)
     - [Sinatra](#sinatra)
     - [Sneakers](#sneakers)
     - [Sucker Punch](#sucker-punch)
 - [Configuration avancée](#advanced-configuration)
     - [Paramètres du traceur](#tracer-settings)
     - [Logging personnalisé](#custom-logging)
     - [Environnement et tags](#environment-and-tags)
     - [Échantillonnage](#sampling)
         - [Échantillonnage prioritaire](#priority-sampling)
     - [Tracing distribué](#distributed-tracing)
     - [Mise en file d'attente des requêtes HTTP](#http-request-queuing)
     - [Pipeline de processing](#processing-pipeline)
         - [Filtrage](#filtering)
         - [Processing](#processing)
     - [Mise en corrélation des traces](#trace-correlation)
     - [Configurer la couche de transport](#configuring-the-transport-layer)
     - [Métriques](#metrics)
         - [Métriques runtime d'application](#for-application-runtime)
     - [OpenTracing](#opentracing)

## Compatibilité

**Interpréteurs Ruby pris en charge** :

| Type  | Documentation              | Version | Type de prise en charge                         | Version du gem prise en charge |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.0     | Complète                                 | Dernière              |
|       |                            | 2.7     | Complète                                 | Dernière              |
|       |                            | 2.6     | Complète                                 | Dernière              |
|       |                            | 2.5     | Complète                                 | Dernière              |
|       |                            | 2.4     | Complète                                 | Dernière              |
|       |                            | 2.3     | Complète                                 | Dernière              |
|       |                            | 2.2     | Complète                                 | Dernière              |
|       |                            | 2.1     | Complète                                 | Dernière              |
|       |                            | 2.0     | Complète                                 | Dernière              |
|       |                            | 1.9.3   | Fin de vie depuis le 6 août 2020           | < 0.27.0            |
|       |                            | 1.9.1   | Fin de vie depuis le 6 août 2020           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | Complète                                 | Dernière              |

**Serveurs Web pris en charge** :

| Type      | Documentation                     | Version      | Type de prise en charge |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+/3.6+ | Complète         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+/5.1+  | Complète         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Complète         |

**Frameworks de tracing pris en charge** :

| Type        | Documentation                                   | Version               | Version du gem prise en charge |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (avec Ruby 2.1+) | >= 0.16.0           |

*Complète* indique que toutes les fonctionnalités du traceur sont prises en charge.

*Obsolète* indique que la prise en charge passera à *Maintenance* dans une prochaine version.

*Maintenance* indique que seules les corrections de bugs critiques seront backportées jusqu'à la fin de vie.

*Fin de vie* indique que le service n'est plus pris en charge.

## Installation

Suivez les étapes ci-dessous pour commencer à tracer votre application Ruby sans attendre.

### Configurer l'Agent Datadog pour l'APM

Avant de configurer le tracing de votre application, installez l'Agent Datadog. Le traceur de l'APM Ruby envoie les données de tracing via l'Agent Datadog.

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml`, sous `apm_enabled: true`, et écoute le trafic des traces sur `localhost:8126`. Pour les environnements conteneurisés, suivez les étapes ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

#### Containers

1. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#fichier-de-configuration-principale-de-l-agent).

2. Consultez les instructions de configuration spécifiques pour [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby) ou [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#collecte-de-traces) pour vérifier que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

3. Après avoir instrumenté votre application, le client de tracing envoie, par défaut, les traces à `localhost:8126`. S'il ne s'agit pas du host et du port adéquats, modifiez-les en définissant les variables d'environnement `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.


### Démarrage rapide pour les applications Rails

#### Instrumentation automatique

1. Ajoutez le gem `ddtrace` à votre fichier Gem :

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. Installez le gem avec `bundle install`.

3. Vous pouvez configurer, remplacer ou désactiver les paramètres de n'importe quelle intégration en ajoutant également un fichier de [configuration manuelle Rails] (#configuration-manuelle-de-rails).

#### Instrumentation manuelle

1. Ajoutez le gem `ddtrace` à votre fichier Gem :

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Installez le gem avec `bundle install`.
3. Créez un fichier `config/initializers/datadog.rb` contenant :

    ```ruby
    Datadog.configure do |c|
      # This will activate auto-instrumentation for Rails
      c.use :rails
    end
    ```

    Vous pouvez également activer d'autres intégrations ici (consultez [Instrumenter des intégrations](#instrumenter-des-integrations)).

### Démarrage rapide pour les applications Ruby

#### Instrumentation automatique

1. Installez le gem avec `gem install ddtrace`.
2. Exigez les [bibliothèques ou frameworks pris en charge](#instrumenter-des-integrations) devant être instrumentés.
3. Ajoutez `require 'ddtrace/auto_instrument'` à votre application. _Remarque : effectuez cette opération _après_ avoir exigé les bibliothèques ou frameworks pris en charge.

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

    Vous pouvez configurer, remplacer ou désactiver les paramètres de n'importe quelle intégration en ajoutant également un [bloc de configuration manuelle Ruby] (#configuration-manuelle-de-ruby).

#### Instrumentation manuelle

1. Installez le gem avec `gem install ddtrace`.
2. Ajoutez un bloc de configuration à votre application Ruby :

    ```ruby
    require 'ddtrace'
    Datadog.configure do |c|
      # Configure the tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration, nothing will be traced.
    end
    ```

3. Ajoutez ou activez l'instrumentation en suivant l'une de ces étapes :
    - Activez l'instrumentation d'une intégration (consultez la section [Instrumenter des intégrations](#instrumenter-des-integrations))
    - Ajoutez une instrumentation manuelle autour de votre code (consultez la section [Instrumentation manuelle](#instrumentation-manuelle))

### Démarrage rapide pour OpenTracing

1. Installez le gem avec `gem install ddtrace`.
2. Ajoutez ce qui suit à votre fichier de configuration OpenTracing :

    ```ruby
    require 'opentracing'
    require 'ddtrace'
    require 'ddtrace/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

3. (Facultatif) Ajoutez un bloc de configuration à votre application Ruby pour configurer Datadog :

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

4. (Facultatif) Ajoutez ou activez une instrumentation supplémentaire en suivant l'une de ces étapes :
    - Activez l'instrumentation d'une intégration Datadog (consultez la section [Instrumenter des intégrations](#instrumenter-des-integrations))
    - Ajoutez une instrumentation manuelle Datadog autour de votre code (consultez la section [Instrumentation manuelle](#instrumentation-manuelle))

### Dernières étapes d'installation

Une fois la configuration terminée, vos services commencent à apparaître sur la [page des services APM](https://app.datadoghq.com/apm/services) après quelques minutes. Pour apprendre à utiliser l'IU de l'APM, [cliquez ici][visualization docs].

## Instrumentation manuelle

Si le framework que vous utilisez n'est pas pris en charge, vous pouvez choisir d'instrumenter manuellement votre code.

Pour tracer un bloc arbitraire de code Ruby, vous pouvez utiliser la méthode `Datadog.tracer.trace` :

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Incorporez le code que vous souhaitez instrumenter dans ce bloc.
  # Vous pouvez également modifier la span ici.
  # Modifiez le nom de la ressource, définissez des tags, etc.
end
```

Assurez-vous de remplacer `name` par une `string` décrivant le type d'opération effectuée (p. ex. `'web.request'` ou `'request.parse'`)

`options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Type | Description | Valeur par défaut |
| --- | --- | --- | --- |
| `service`     | `String` | Le nom du service auquel cette span appartient (p. ex. `'mon-service-web'`) | `default-service` du traceur, `$PROGRAM_NAME` ou `'ruby'` |
| `resource`    | `String` | Nom de la ressource ou de l'action tracée. Les traces associées à un même nom de ressource seront regroupées pour la collecte de métriques (elles resteront toutefois consultables séparément). Généralement spécifique à un domaine, tel qu'une URL, une requête, etc. (p. ex. `'Article#submit'`, `http://exemple.com/articles/list`.) | `name` de la span. |
| `span_type`   | `String` | Type de span (`'http'`, `'db'`, etc.) | `nil` |
| `child_of`    | `Datadog::Span` / `Datadog::Context` | Parent de cette span. Si aucun parent n'est spécifié, devient automatiquement la span active. | `nil` |
| `start_time`  | `Time` | Heure d'initialisation réelle de la span. Utile dans les cas où les événements tracés se sont déjà produits. | `Time.now` |
| `tags`        | `Hash` | Tags supplémentaires à ajouter à la span. | `{}` |
| `on_error`    | `Proc` | Gestionnaire invoqué lorsqu'un bloc devant être tracé renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit l'erreur sur la span par défaut. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

Nous vous conseillons fortement de définir un `service` et une `resource` au strict minimum. Les spans sans `service` ou `resource` (`nil`) seront ignorées par l'Agent Datadog.

Exemple d'instrumentation manuelle :

```ruby
get '/posts' do
  Datadog.tracer.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags d'APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

### Tracing asynchrone

Il n'est pas toujours possible d'utiliser `Datadog.tracer.trace` autour d'un bloc de code. Il arrive que certaines instrumentations basées sur des événements ou des notifications ne vous notifient qu'au début ou à la fin d'un événement.

Pour tracer ces opérations, vous pouvez tracer le code de façon asynchrone en appelant `Datadog.tracer.trace` sans bloc :

```ruby
# Certains frameworks d'instrumentation appellent ce qui suit après la fin d'un événement
def db_query(start, finish, query)
  span = Datadog.tracer.trace('database.query')
  span.resource = query
  span.start_time = start
  span.finish(finish)
end
```

Lorsque vous appelez `Datadog.tracer.trace` sans bloc, la `Datadog::Span` renvoyée par la fonction est initialisée mais pas finalisée. Vous pouvez ensuite modifier cette span comme bon vous semble, puis la finaliser avec `finish`.

*Toutes les spans doivent être finalisées.* Si une span est encore ouverte alors que la trace se termine, cette dernière sera ignorée. Si vous pensez que l'une de vos traces n'est pas finalisée, [activez le mode debugging](#parametres-du-traceur) afin de visualiser les avertissements.

Pour éviter ce problème lorsque vous avez recours à des événements d'initialisation et de finalisation, utilisez `Datadog.tracer.active_span` pour récupérer la span active.

```ruby
# Exemple : ActiveSupport::Notifications appelle ce qui suit au début d'un événement
def start(name, id, payload)
  # Démarrer une span
  Datadog.tracer.trace(name)
end

# Exemple : ActiveSupport::Notifications appelle ce qui suit à la fin d'un événement
def finish(name, id, payload)
  # Récupérer la span active (thread-safe)
  current_span = Datadog.tracer.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### Enrichir les traces à l'aide de méthodes imbriquées

Vous pouvez ajouter des informations supplémentaires sous forme de tags à la span active en utilisant la méthode de votre choix. Attention : si la méthode est appelée et qu'aucune span n'est active, `active_span` est défini sur nil.

```ruby
# exemple : ajouter un tag à la span active

current_span = Datadog.tracer.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

Vous pouvez également récupérer la span racine de la trace active en utilisant la méthode `active_root_span`. Cette méthode renverra `nil` si aucune trace n'est active.

```ruby
# exemple : ajouter un tag à la span racine active

current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('my_tag', 'my_value') unless current_root_span.nil?
```

## Instrumenter des intégrations

Un vaste nombre de bibliothèques et de frameworks sont pris en charge par défaut, ce qui signifie qu'ils peuvent être instrumentés automatiquement. Ces instrumentations ne sont pas activées par défaut, mais elles peuvent facilement être activées et configurées avec l'API `Datadog.configure` :

```ruby
Datadog.configure do |c|
  # Activer et configurer une intégration
  c.use :integration_name, options
end
```

Où `options` est un `hash` des paramètres de configuration spécifiques à l'intégration.

Vous trouverez ci-dessous la liste des intégrations disponibles ainsi que leurs options de configuration :

| Nom                     | Clé                        | Versions prises en charge : MRI  | Versions prises en charge : JRuby | Configuration                    | Source Gem                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Lien](#action-cable)*             | *[Lien](https://github.com/rails/rails/tree/master/actioncable)*               |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[Lien](#action-view)*              | *[Lien](https://github.com/rails/rails/tree/master/actionview)*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Lien](#active-model-serializers)* | *[Lien](https://github.com/rails-api/active_model_serializers)*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[Lien](#action-pack)*              | *[Lien](https://github.com/rails/rails/tree/master/actionpack)*                |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[Lien](#active-record)*            | *[Lien](https://github.com/rails/rails/tree/master/activerecord)*              |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[Lien](#active-support)*           | *[Lien](https://github.com/rails/rails/tree/master/activesupport)*             |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#aws)*                      | *[Lien](https://github.com/aws/aws-sdk-ruby)*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Lien](#concurrent-ruby)*          | *[Link](https://github.com/ruby-concurrency/concurrent-ruby)*                  |
| Cucumber                 | `cucumber`                 | `>= 3.0`                 | `>= 1.7.16`               | *[Lien](#cucumber)*                | *[Lien](https://github.com/cucumber/cucumber-ruby)*                            |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#dalli)*                    | *[Lien](https://github.com/petergoldstein/dalli)*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Lien](#delayedjob)*               | *[Lien](https://github.com/collectiveidea/delayed_job)*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#elasticsearch)*            | *[Lien](https://github.com/elastic/elasticsearch-ruby)*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Lien](#ethon)*                    | *[Lien](https://github.com/typhoeus/ethon)*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Lien](#excon)*                    | *[Lien](https://github.com/excon/excon)*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Lien](#faraday)*                  | *[Lien](https://github.com/lostisland/faraday)*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#grape)*                    | *[Lien](https://github.com/ruby-grape/grape)*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Lien](#graphql)*                  | *[Lien](https://github.com/rmosolgo/graphql-ruby)*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *Gem non disponible*       | *[Lien](#grpc)*                     | *[Lien](https://github.com/grpc/grpc/tree/master/src/rubyc)*                   |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#http-rb)*                  | *[Lien](https://github.com/httprb/http)*                                       |
| httpclient                | `httpclient`              | `>= 2.2`                 | `>= 2.2`                  | *[Lien](#httpclient)*               | *[Lien](https://github.com/nahi/httpclient)*                                     |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Lien](#kafka)*                    | *[Lien](https://github.com/zendesk/ruby-kafka)*                                |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Lien](#mongodb)*                  | *[Lien](https://github.com/mongodb/mongo-ruby-driver)*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *Gem non disponible*       | *[Lien](#mysql2)*                   | *[Lien](https://github.com/brianmario/mysql2)*                                 |
| Net/HTTP                 | `http`                     | *(Toute version de Ruby prise en charge)*   | *(Toute version de Ruby prise en charge)*    | *[Lien](#nethttp)*                  | *[Lien](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)* |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Lien](#presto)*                   | *[Lien](https://github.com/treasure-data/presto-client-ruby)*                  |
| Qless                    | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | *[Lien](#qless)*                    | *[Lien](https://github.com/seomoz/qless)*                                      |
| Que                      | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[Lien](#que)*                      | *[Lien](https://github.com/que-rb/que)*                                        |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Lien](#racecar)*                  | *[Lien](https://github.com/zendesk/racecar)*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Lien](#rack)*                     | *[Lien](https://github.com/rack/rack)*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[Lien](#rails)*                    | *[Lien](https://github.com/rails/rails)*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Lien](#rake)*                     | *[Lien](https://github.com/ruby/rake)*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#redis)*                    | *[Lien](https://github.com/redis/redis-rb)*                                    |
| Resque                   | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#resque)*                   | *[Lien](https://github.com/resque/resque)*                                     |
| Client Rest              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Lien](#rest-client)*              | *[Lien](https://github.com/rest-client/rest-client)*                           |
| RSpec                    | `rspec`.                   | `>= 3.0.0`               | `>= 3.0.0`                | *[Lien](#rspec)*.                   | *[Lien](https://github.com/rspec/rspec)*                                       |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Lien](#sequel)*                   | *[Lien](https://github.com/jeremyevans/sequel)*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#shoryuken)*                | *[Lien](https://github.com/phstc/shoryuken)*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Lien](#sidekiq)*                  | *[Lien](https://github.com/mperham/sidekiq)*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Lien](#sinatra)*                  | *[Lien](https://github.com/sinatra/sinatra)*                                   |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Lien](#sneakers)*                 | *[Lien](https://github.com/jondot/sneakers)*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#sucker-punch)*             | *[Lien](https://github.com/brandonhilkert/sucker_punch)*                       |

### Action Cable

L'intégration Action Cable permet de tracer les messages des broadcasts et les actions effectuées sur un canal.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_cable, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `action_cable` | `'action_cable'` |

### Action View

Active Support est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_view, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation des rendus. | `action_view` |
| `template_base_path` | Utilisé pour le parsing du nom du modèle. Si vous ne stockez pas vos modèles dans le dossier `views/`, vous devrez peut-être modifier cette valeur. | `'views/'` |

### Active Model Serializers

L'intégration Active Model Serializers permet de tracer l'événement `serialize` pour les versions 0.9+ et l'événement `render` pour les versions 0.10+.

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_model_serializers, options
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `active_model_serializers`. | `'active_model_serializers'` |

### Action Pack

Action Pack est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_pack, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation des rendus. | `action_pack` |

### Active Record

Active Record est généralement configuré en même temps qu'un framework Web (tel que Rails ou Sinatra), mais il est possible de le configurer séparément :

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_record, options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # tracing terminé
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `orm_service_name` | Nom de service utilisé pour la partie mappage des résultats de requête liés à des objets ActiveRecord. Hérite du nom de service parent par défaut. | _parent.service_name_ (p. ex. `'mysql2'`) |
| `service_name` | Nom de service utilisé pour la partie base de données de l'instrumentation de `active_record`. | Nom de l'adaptateur de base de données (p. ex. `'mysql2'`) |

**Configurer les paramètres de tracing par base de données**

Il est possible de configurer les paramètres de tracing par connexion de base de données via l'option `describes` :

```ruby
# Ajouter une option `:describes` avec une clé de connexion.
# Toutes les clés suivantes sont acceptées et équivalentes.
# Si un bloc est spécifié, cela renvoie un objet Settings qui
# accepte toutes les options de configuration énumérées ci-dessus.

Datadog.configure do |c|
  # Symbole correspondant à votre connexion de base de données dans config/database.yml
  # Uniquement disponible si vous utilisez Rails avec ActiveRecord.
  c.use :active_record, describes: :secondary_database, service_name: 'secondary-db'

  c.use :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # Chaîne de connexion avec les paramètres de connexion suivants :
  # Adaptateur, utilisateur, host, port, base de données
  c.use :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # Hash avec les paramètres de connexion suivants :
  # Adaptateur, utilisateur, host, port, base de données
  c.use :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'
end
```

Si Active Record trace un événement qui utilise une connexion qui correspond à une clé définie par `describes`, les paramètres de tracing associés à cette connexion sont utilisés. Si la connexion ne correspond à aucune des connexions décrites, les paramètres par défaut définis par `c.use :active_record` sont utilisés à la place.

### Active Support

Active Support est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_support, options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `cache_service` | Nom de service utilisé pour la mise en cache avec l'instrumentation de `active_support`. | `active_support-cache` |

### AWS

L'intégration AWS permet de tracer l'ensemble des interactions (tels que les appels d'API) avec les services AWS (S3, ElastiCache etc.).

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.use :aws, options
end

# Exécuter l'appel tracé
Aws::S3::Client.new.list_buckets
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `aws` | `'aws'` |

### Concurrent Ruby

L'intégration Concurrent Ruby ajoute la prise en charge de la propagation de contexte lorsque `::Concurrent::Future` est utilisé.
De cette façon, il est possible de s'assurer que le code tracé dans `Future#execute` est associé au bon parent.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
# Dans l'initialiseur Rails ou un équivalent
Datadog.configure do |c|
  # Patcher ::Concurrent::Future pour utiliser un ExecutorService qui propage le contexte
  c.use :concurrent_ruby, options
end

# Passer le contexte au code exécuté dans Concurrent::Future
Datadog.tracer.trace('outer') do
  Concurrent::Future.execute { Datadog.tracer.trace('inner') { } }.wait
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `concurrent-ruby` | `'concurrent-ruby'` |

### Cucumber

Lorsque vous utilisez le framework `cucumber`, l'intégration Cucumber trace toutes les exécutions de scénarios et d'étapes.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
require 'cucumber'
require 'ddtrace'

# Configurer l'intégration Cucumber par défaut
Datadog.configure do |c|
  c.use :cucumber, options
end

# L'exemple suivant décrit comment appliquer des tags provenant d'un scénario à la span active
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si Cucumber doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `cucumber`. | `'cucumber'` |
| `operation_name` | Nom de l'opération utilisée pour l'instrumentation de `cucumber`. Utile si vous souhaitez renommer les métriques de traces automatiques, par exemple `trace.#{nom_opération}.errors`. | `'cucumber.test'` |

### Dalli

L'intégration Dalli permet de tracer l'ensemble des appels à votre serveur `memcached` :

```ruby
require 'dalli'
require 'ddtrace'

# Configurer le comportement de tracing de Dalli par défaut
Datadog.configure do |c|
  c.use :dalli, options
end

# Configurer le comportement de tracing de Dalli pour un client spécifique
client = Dalli::Client.new('localhost:11211', options)
client.set('abc', 123)
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `dalli` | `'memcached'` |

### DelayedJob

L'intégration DelayedJob utilise des hooks de cycle de vie pour tracer les exécutions de tâches et les mises en file d'attente.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :delayed_job, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `DelayedJob` | `'delayed_job'` |
| `client_service_name` | Nom de service utilisé pour l'instrumentation de `DelayedJob` côté client | `'delayed_job-client'` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Elasticsearch

L'intégration Elasticsearch permet de tracer n'importe quel appel à `perform_request` depuis l'objet `Client` :

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :elasticsearch, options
end

# Envoyer une requête à Elasticsearch
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:show` avec un tableau de clés à ne pas quantifier (ou `:all` pour ignorer la quantification), ou `:exclude` avec un tableau de clés à exclure entièrement. | `{}` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `elasticsearch` | `'elasticsearch'` |

### Ethon

L'intégration `ethon` permet de tracer n'importe quelle requête HTTP par le biais d'objets `Easy` ou `Multi`. Notez que cette intégration prend également en charge la bibliothèque `Typhoeus`, qui est basée sur `Ethon`.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :ethon, options

  # si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression regex
  c.use :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # uniquement nécessaire si split_by_domain est true par défaut
  end
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `ethon` | `'ethon'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

### Excon

L'intégration `excon` est disponible via le middleware `ddtrace` :

```ruby
require 'excon'
require 'ddtrace'

# Configurer le comportement de tracing d'Excon par défaut
Datadog.configure do |c|
  c.use :excon, options

  # si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression regex
  c.use :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # uniquement nécessaire si split_by_domain est true par défaut
  end
end

connection = Excon.new('https://example.com')
connection.get
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `error_handler` | Un `Proc` qui accepte un paramètre `response`. S'il renvoie une valeur *truthy*, la span de la trace est définie comme une erreur. Par défaut, seules les réponses 5XX sont définies comme des erreurs. | `nil` |
| `service_name` | Nom de service pour l'instrumentation d'Excon. Lorsque spécifié à un middleware pour une connexion spécifique, s'applique uniquement à cet objet de connexion. | `'excon'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

**Configurer des paramètres différents pour chaque connexion**

Si vous utilisez plusieurs connexions avec Excon, vous pouvez définir des paramètres différents pour chaque connexion en configurant leurs constructeurs avec un middleware :

```ruby
# Incorporer la pile de middlewares par défaut dans le middleware de tracing Datadog
Excon.new(
  'http://example.com',
  middlewares: Datadog::Contrib::Excon::Middleware.with(options).around_default_stack
)

# Insérer le middleware dans une pile de middlewares personnalisée.
# Remarque : le middleware de tracing doit être inséré après le ResponseParser !
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

Où `options` est un hash pouvant contenir n'importe quel paramètre énuméré dans le tableau ci-dessus.

### Faraday

L'intégration `faraday` est disponible via le middleware `ddtrace` :

```ruby
require 'faraday'
require 'ddtrace'

# Configurer le comportement de tracing de Faraday par défaut
Datadog.configure do |c|
  c.use :faraday, options

  # si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression regex
  c.use :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # uniquement nécessaire si split_by_domain est true par défaut
  end
end

# Si vous souhaitez remplacer la configuration globale pour une instance de client spécifique
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `error_handler` | Un `Proc` qui accepte un paramètre `response`. S'il renvoie une valeur *truthy*, la span de la trace est définie comme une erreur. Par défaut, seules les réponses 5XX sont définies comme des erreurs. | `nil` |
| `service_name` | Nom du service pour l'instrumentation de Faraday. Lorsque spécifié à un middleware pour une connexion spécifique, s'applique uniquement à cet objet de connexion. | `'faraday'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

### Grape

L'intégration Grape permet d'instrumenter les endpoints et filtres Grape. Elle peut être utilisée conjointement à d'autres intégrations telles que Rack et Rails.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` avant de définir votre application Grape :

```ruby
# api.rb
require 'grape'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grape, options
end

# Ensuite, définir votre application
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `nil` |
| `enabled` | Définit si Grape doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `grape` | `'grape'` |
| `error_statuses`| Définit un code de statut ou une plage de codes de statut qui doivent être considérés comme des erreurs. `'404,405,500-599'` ou `[404,405,'500-599']`. | `nil` |

### GraphQL

L'intégration GraphQL permet d'instrumenter les requêtes GraphQL.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
# Dans l'initialiseur Rails ou un équivalent
Datadog.configure do |c|
  c.use :graphql, schemas: [YourSchema], options
end

# Ensuite, exécuter une requête GraphQL
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

La méthode `use :graphql` accepte les paramètres suivants. Des options supplémentaires peuvent être spécifiées avec `options` :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `nil` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `graphql` | `'ruby-graphql'` |
| `schemas` | Obligatoire. Tableau d'objets `GraphQL::Schema` à tracer. Le tracing sera activé pour tous les schémas énumérés, en utilisant les options spécifiées dans cette configuration. Si aucun schéma n'est spécifié, le tracing ne sera pas activé. | `[]` |

**Configurer des schémas GraphQL manuellement**

Si vous préférez configurer les paramètres de tracing pour un schéma spécifique (par exemple lorsque plusieurs schémas sont associés à des noms de service différents), vous pouvez ajouter ce qui suit à la définition du schéma [via l'API GraphQL](http://graphql-ruby.org/queries/tracing.html) :

```ruby
# Schéma basé sur une classe
class YourSchema < GraphQL::Schema
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

```ruby
# Schéma de type .define
YourSchema = GraphQL::Schema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

Vous pouvez également modifier un schéma déjà défini :

```ruby
# Schéma basé sur une classe
YourSchema.use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
)
```

```ruby
# Schéma de type .define
YourSchema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

Si vous avez opté pour la configuration manuelle, n'utilisez *pas* `:graphql` dans `Datadog.configure` afin d'éviter que le tracing soit effectué en double. Ces deux modes de configuration du tracing de GraphQL ne doivent pas être utilisés en même temps.

### gRPC

L'intégration `grpc` permet d'ajouter des intercepteurs côté client et côté serveur, qui sont exécutés en tant que middleware avant l'appel de procédure à distance du service. Les applications gRPC étant souvent distribuées, l'intégration partage les données de tracing entre client et serveur.

Pour configurer votre intégration, utilisez la méthode `Datadog.configure` comme suit :

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grpc, options
end

# Côté serveur
server = GRPC::RpcServer.new
server.add_http2_port('localhost:50051', :this_port_is_insecure)
server.handle(Demo)
server.run_till_terminated

# Côté client
client = Demo.rpc_stub_class.new('localhost:50051', :this_channel_is_insecure)
client.my_endpoint(DemoMessage.new(contents: 'hello!'))
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `grpc` | `'grpc'` |

**Configurer des paramètres différents pour chaque client**

Lorsque plusieurs clients appellent plusieurs services différents, vous avez la possibilité de passer directement l'intercepteur Datadog :

```ruby
configured_interceptor = Datadog::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

De cette façon, l'intégration fera en sorte que le `configured_interceptor` établisse une configuration de tracing unique pour cette instance client.

### http.rb

L'intégration http.rb permet de tracer n'importe quel appel HTTP effectué via le gem Http.rb.

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.use :httprb, options
  # si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression regex
  c.use :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # uniquement nécessaire si split_by_domain est true par défaut
  end
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `httprb`. | `'httprb'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

### httpclient

L'intégration httpclient permet de tracer n'importe quel appel HTTP effectué via le gem httpclient.

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.use :httpclient, options
  # (Facultatif) Indiquer un nom de service différent pour les hostnames correspondant à une expression régulière
  c.use :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # Uniquement nécessaire si split_by_domain est défini sur true par défaut
  end
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service pour l'instrumentation de `httpclient`. | `'httpclient'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

### Kafka

L'intégration Kafka permet de tracer le gem `ruby-kafka` :

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'active_support/notifications' # nécessaire pour activer l'instrumentation 'ruby-kafka'
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.use :kafka, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `kafka` | `'kafka'` |
| `tracer` | `Datadog::Tracer` utilisé pour effectuer l'instrumentation. Ce paramètre n'a généralement pas besoin d'être défini. | `Datadog.tracer` |

### MongoDB

L'intégration permet de tracer n'importe quelle `Command` envoyée depuis le [pilote Ruby pour MongoDB](https://github.com/mongodb/mongo-ruby-driver) vers un cluster MongoDB. De plus, les ODM (Object Document Mappers) tels que Mongoid qui utilisent le pilote Ruby officiel seront automatiquement instrumentés. Pour activer l'intégration, procédez simplement ainsi :

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mongo, options
end

# Créer un client MongoDB et l'utiliser normalement
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# Si vous souhaitez utiliser des paramètres différents pour une instance client spécifique
Datadog.configure(client, options)
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:show` avec un tableau de clés à ne pas quantifier (ou `:all` pour ignorer la quantification), ou `:exclude` avec un tableau de clés à exclure entièrement. | `{ show: [:collection, :database, :operation] }` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `mongo` | `'mongodb'` |

### MySQL2

L'intégration MySQL2 permet de tracer n'importe quelle commande SQL envoyée via le gem `mysql2`.

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mysql2, options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `mysql2` | `'mysql2'` |

### Net/HTTP

L'intégration Net/HTTP permet de tracer n'importe quel appel HTTP effectué via le module Net::HTTP de la bibliothèque standard.

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.use :http, options

  # si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression regex
  c.use :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # uniquement nécessaire si split_by_domain est true par défaut
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `http` | `'net/http'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

Si vous souhaitez configurer chaque objet de connexion séparément, vous pouvez utiliser la méthode `Datadog.configure` comme suit :

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure(client, options)
```

### Presto

L'intégration Presto permet de tracer n'importe quelle commande SQL envoyée via le gem `presto-client`.

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :presto, options
end

client = Presto::Client.new(
  server: "localhost:8880",
  ssl: {verify: false},
  catalog: "native",
  schema: "default",
  time_zone: "US/Pacific",
  language: "English",
  http_debug: true,
)

client.run("select * from system.nodes")
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `presto` | `'presto'` |

### Qless

L'intégration Qless utilise des hooks de cycle de vie pour tracer les exécutions de tâches.

Pour tracer une tâche Qless :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :qless, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `qless` | `'qless'` |
| `tag_job_data` | Activer le tagging avec des arguments de tâches. true pour l'activer, false pour le désactiver. | `false` |
| `tag_job_tags` | Activer le tagging avec des tags de tâches. true pour l'activer, false pour le désactiver. | `false` |

### Que

L'intégration Que est un middleware qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :que, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `enabled` | Définit si Que doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `que` | `'que'` |
| `tag_args` | Activer le tagging du champ d'arguments d'une tâche. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `tag_data` | Activer le tagging du champ de données d'une tâche. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Racecar

L'intégration Racecar permet de tracer les tâches Racecar.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :racecar, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `racecar` | `'racecar'` |

### Rack

L'intégration Rack permet d'utiliser un middleware pour tracer toutes les requêtes avant qu'elles n'atteignent le framework ou l'application cible. Elle répond à l'interface minimale Rack, offrant des valeurs raisonnables qui peuvent être récupérées au niveau de Rack.

Cette intégration est automatiquement activée avec les frameworks Web tels que Rails. Si vous utilisez une application Rack standard, activez l'intégration dans votre `config.ru` :

```ruby
# exemple de config.ru
require 'ddtrace'

Datadog.configure do |c|
  c.use :rack, options
end

use Datadog::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `nil` |
| `application` | Votre application Rack. Obligatoire pour `middleware_names`. | `nil` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `headers` | Hash d'en-têtes de requête ou de réponse HTTP à ajouter en tant que tags à `rack.request`. Accepte les clés `request` et `response` des valeurs sous forme de tableau, par exemple `['Last-Modified']`. Ajoute les tags `http.request.headers.*` et `http.response.headers.*` respectivement. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | Activez cette option pour utiliser la dernière classe middleware exécutée comme nom de ressource pour la span `rack`. Si cette option et l'instrumentation `rails` sont toutes les deux activées, `rails` a la priorité et définit le nom de ressource `rack` sur le contrôleur `rails` actif, le cas échéant. Nécessite l'option `application`. | `false` |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:query` ou `:fragment`. | `{}` |
| `quantize.query` | Hash contenant les options propres à la requête lors de la quantification des URL. Possibilité d'utiliser `:show` ou `:exclude`. Voir les options ci-dessous. Cette option doit être imbriquée dans l'option `quantize`. | `{}` |
| `quantize.query.show` | Définit les valeurs à toujours afficher. Par défaut, aucune valeur n'est affichée. Spécifier un tableau de chaînes ou `:all` pour afficher toutes les valeurs. Cette option doit être imbriquée dans l'option `query`. | `nil` |
| `quantize.query.exclude` | Définit les valeurs à supprimer entièrement. Par défaut, aucune valeur n'est exclue. Spécifier un tableau de chaînes ou `:all` pour supprimer la chaîne de requête entière. Cette option doit être imbriquée dans l'option `query`. | `nil` |
| `quantize.fragment` | Définit le comportement à appliquer pour les fragments d'URL. Par défaut, les fragments sont supprimés. Utiliser `:show` pour afficher les fragments d'URL. Cette option doit être imbriquée dans l'option `quantize`. | `nil` |
| `request_queuing` | Permet de suivre le temps que la requête HTTP passe dans la file d'attente du serveur frontend. Consultez la section [Mise en file d'attente des requêtes HTTP](#mise-en-file-d-attente-des-requetes-HTTP) pour en savoir plus sur la configuration. Définir sur `true` pour activer. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rack` | `'rack'` |
| `web_service_name` | Nom de service pour les spans de mise en file d'attente des requêtes sur le serveur frontend. (Ex. : `'nginx'`) | `'web-server'` |

**Configurer le comportement de quantification des URL**

```ruby
Datadog.configure do |c|
  # Comportement par défaut : toutes les valeurs sont quantifiées, les fragments sont supprimés.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by
  # http://example.com/path?categories[]=1&categories[]=2 --> http://example.com/path?categories[]

  # Afficher les valeurs pour le paramètre de chaîne de requête 'category_id'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by
  c.use :rack, quantize: { query: { show: ['category_id'] } }

  # Afficher les valeurs pour tous les paramètres de chaîne de requête
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by=asc
  c.use :rack, quantize: { query: { show: :all } }

  # Exclure entièrement le paramètre de chaîne de requête 'sort_by'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id
  c.use :rack, quantize: { query: { exclude: ['sort_by'] } }

  # Supprimer la chaîne de requête entière
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path
  c.use :rack, quantize: { query: { exclude: :all } }

  # Afficher les fragments d'URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.use :rack, quantize: { fragment: :show }
end
```

### Rails

L'intégration Rails permet de tracer les requêtes, les appels de base de données, le rendu des modèles ainsi que les opérations read/write/delete du cache. L'intégration exploite l'instrumentation d'Active Support en écoutant l'API Notification de façon à tracer chaque opération instrumentée par l'API.

Pour activer l'instrumentation Rails, créez un fichier initialiseur dans votre dossier `config/initializers` :

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `nil` |
| `cache_service` | Nom du service de cache utilisé lors du tracing des activités de cache | `'<nom_app>-cache'` |
| `controller_service` | Nom de service utilisé lors du tracing d'un contrôleur d'action Rails | `'<nom_app>'` |
| `database_service` | Nom du service de base de données utilisé lors du tracing des activités de base de données | `'<nom_app>-<nom_adaptateur>'` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `exception_controller` | Classe ou module qui identifie une classe de contrôleur d'exception personnalisé. Le traceur offre une gestion améliorée des erreurs lorsqu'il peut identifier les contrôleurs d'exception personnalisés. Par défaut, lorsque cette option n'est pas définie, le traceur « devine » à quoi ressemble un contrôleur d'exception personnalisé. Cette option facilite leur identification. | `nil` |
| `middleware` | Ajoute le middleware de tracing à l'application Rails. Définir sur `false` pour ne pas charger le middleware. | `true` |
| `middleware_names` | Permet aux requêtes de middleware court-circuitées d'afficher le nom du middleware en tant que ressource pour la trace. | `false` |
| `service_name` | Nom de service utilisé lors du tracing de requêtes d'application (au niveau de `rack`) | `'<nom_app>'` (récupéré à partir de l'espace de nommage de votre application Rails) |
| `template_base_path` | Utilisé pour le parsing du nom du modèle. Si vous ne stockez pas vos modèles dans le dossier `views/`, vous devrez peut-être modifier cette valeur. | `'views/'` |
| `log_injection` | Active automatiquement l'injection des informations de [mise en corrélation des traces](#mise-en-correlation-des-traces), telles que `dd.trace_id`, dans les logs Rails. Prend en charge le logger par défaut (`ActiveSupport::TaggedLogging`) et `Lograge`. Pour en savoir plus sur le format des informations de mise en corrélation des traces, consultez la [section dédiée](#mise-en-correlation-des-traces).  | `false` |

**Versions prises en charge**

| Versions MRI  | Versions JRuby | Versions Rails |
| ------------- | -------------- | -------------- |
|  2.0          |                |  3.0-3.2     |
|  2.1          |                |  3.0-4.2     |
|  2.2-2.3    |                |  3.0-5.2     |
|  2.4          |                |  4.2.8-5.2   |
|  2.5          |                |  4.2.8-6.1   |
|  2.6-2.7    |  9.2           |  5.0-6.1     |
|  3.0          |                |  6.1           |

### Rake

Il est possible d'instrumenter vos tâches Rake en activant l'intégration `rake`. Toutes les tâches et leurs sous-tâches seront tracées.

Pour activer le tracing des tâches Rake, ajoutez ce qui suit à votre `Rakefile` :

```ruby
# Au début de votre Rakefile :
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rake, options
end

task :my_task do
  # Spécifier votre tâche ici…
end

Rake::Task['my_task'].invoke
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `enabled` | Définit si les tâches Rake doivent être tracées ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `quantize` | Hash contenant les options de quantification des arguments de tâche. Des détails supplémentaires et des exemples sont disponibles plus bas. | `{}` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rake` | `'rake'` |

**Configurer le comportement de quantification des tâches**

```ruby
Datadog.configure do |c|
  # On considère une tâche qui accepte :one, :two, :three…
  # L'invocation se fait avec 'foo', 'bar', 'baz'.

  # Comportement par défaut : tous les arguments sont quantifiés.
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?', three: '?' }
  c.use :rake

  # Afficher les valeurs pour l'argument :two uniquement
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: 'bar', three: '?' }
  c.use :rake, quantize: { args: { show: [:two] } }

  # Afficher les valeurs pour tous les arguments.
  # `rake.invoke.args` tag  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` tag --> { one: 'foo', two: 'bar', three: 'baz' }
  c.use :rake, quantize: { args: { show: :all } }

  # Exclure entièrement l'argument :three
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?' }
  c.use :rake, quantize: { args: { exclude: [:three] } }

  # Supprimer entièrement les arguments
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> {}
  c.use :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

L'intégration Redis permet de tracer les appels simples ainsi que les pipelines.

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis, options
end

# Exécuter les commandes Redis
redis = Redis.new
redis.set 'foo', 'bar'
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `redis` | `'redis'` |
| `command_args` | Affiche les arguments de la commande (p. ex., `key` pour `GET key`) en tant que nom de ressource et tag. | true |

Vous pouvez également définir une configuration *différente pour chaque instance* comme suit :

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis # L'instrumentation de l'intégration doit quand même être activée
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure(customer_cache, service_name: 'customer-cache')
Datadog.configure(invoice_cache, service_name: 'invoice-cache')

# L'appel tracé appartient au service `customer-cache` 
customer_cache.get(...)
# L'appel tracé appartient au service `invoice-cache` 
invoice_cache.get(...)
```

**Configurer les paramètres de tracing par connexion**

Il est possible de configurer les paramètres de tracing par connexion via l'option `describes` :

```ruby
# Ajouter une option `:describes` avec une clé de connexion.
# Toutes les clés suivantes sont acceptées et équivalentes.
# Si un bloc est spécifié, cela renvoie un objet Settings qui
# accepte toutes les options de configuration énumérées ci-dessus.

Datadog.configure do |c|
  # La configuration par défaut pour tous les clients redis
  c.use :redis, service_name: 'redis-default'

  # Le configuration correspondant à un socket unix donné
  c.use :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # Chaîne de connexion
  c.use :redis, describes: { url: 'redis://127.0.0.1:6379/0' }, service_name: 'redis-connection-string'
  # Host, port, bdd, schéma client
  c.use :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # Sous-ensemble du hash de connexion uniquement
  c.use :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.use :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

### Resque

L'intégration Resque utilise des hooks Resque qui viennent entourer la méthode `perform`.

Pour tracer une tâche Resque :

```ruby
require 'ddtrace'

class MyJob
  def self.perform(*args)
    # do_something
  end
end

Datadog.configure do |c|
  c.use :resque, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `resque` | `'resque'` |
| `workers` | Un tableau comprenant toutes les classes worker que vous souhaitez tracer (ex. : `[MyJob]`) | `[]` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Client Rest

L'intégration `rest-client` est disponible via le middleware `ddtrace` :

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rest_client, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rest_client`. | `'rest_client'` |

### RSpec

Lorsque vous utilisez le framework de test `rspec`, l'intégration RSpec trace toutes les exécutions d'exemples et de groupes d'exemples 

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
require 'rspec'
require 'ddtrace'

# Configurer une intégration RSpec par défaut
Datadog.configure do |c|
  c.use :rspec, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si les tests RSpec doivent être tracés ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rspec`. | `'rspec'` |
| `operation_name` | Nom de l'opération utilisée pour l'instrumentation de `rspec`. Utile si vous souhaitez renommer les métriques de traces automatiques, par exemple `trace.#{nom_opération}.errors`. | `'rspec.example'` |

### Sequel

L'intégration Sequel permet de tracer les requêtes envoyées à votre base de données.

```ruby
require 'sequel'
require 'ddtrace'

# Connexion à la base de données
database = Sequel.sqlite

# Création d'une table
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.use :sequel, options
end

# Envoi d'une requête
articles = database[:articles]
articles.all
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sequel` | Nom de l'adaptateur de base de données (p. ex. `'mysql2'`) |

Seules les versions 2.0+ de Ruby sont prises en charge.

**Configurer des paramètres différents pour chaque base de données**

Si vous utilisez plusieurs bases de données avec Sequel, vous pouvez définir des paramètres différents pour chacune d'entre elles en configurant leurs objets `Sequel::Database` respectifs :

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# Configurer chaque base de données avec des noms de service différents
Datadog.configure(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

L'intégration Shoryuken est un middleware exécuté côté serveur qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :shoryuken, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `shoryuken` | `'shoryuken'` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Sidekiq

L'intégration Sidekiq est un middleware exécuté côté client et côté serveur qui permet de tracer les mises en file d'attente et les exécutions des tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sidekiq, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `client_service_name` | Nom de service utilisé pour l'instrumentation de `sidekiq` côté client | `'sidekiq-client'` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sidekiq` côté serveur | `'sidekiq'` |
| `tag_args` | Activer le tagging des arguments des tâches. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Sinatra

L'intégration Sinatra permet de tracer les requêtes et le rendu des modèles.

Pour commencer à utiliser le client de tracing, assurez-vous d'importer `ddtrace` et `use :sinatra` après `sinatra` ou `sinatra/base`, et avant de définir votre application/vos routages :

#### Application classique

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

get '/' do
  'Hello world!'
end
```

#### Application modulaire

```ruby
require 'sinatra/base'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

class NestedApp < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

Assurez-vous d'enregistrer `Datadog::Contrib::Sinatra::Tracer` en tant que middleware avant de monter vos applications imbriquées.

#### Options d'instrumentation

`options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `nil` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `headers` | Hash d'en-têtes de requête ou de réponse HTTP à ajouter en tant que tags à `sinatra.request`. Accepte les clés `request` et `response` des valeurs sous forme de tableau, par exemple `['Last-Modified']`. Ajoute les tags `http.request.headers.*` et `http.response.headers.*` respectivement. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | Ajouter le nom du script devant les noms des ressources | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sinatra` | `'sinatra'` |

### Sneakers

L'intégration Sneakers est un middleware exécuté côté serveur qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sneakers, options
end
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `enabled` | Définit si Sneakers doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sneakers`. | `'sneakers'` |
| `tag_body` | Activer le tagging des messages des tâches. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Sucker Punch

L'intégration `sucker_punch` permet de tracer toutes les tâches planifiées :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sucker_punch, options
end

# L'exécution de cette opération est tracée
LogJob.perform_async('login')
```

Où `options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Rôle | Valeur par défaut |
| --- | ----------- | ------- |
| `analytics_enabled` | Activer l'analyse des spans générées par cette intégration. Définir sur `true` pour l'activer, sur `nil` pour utiliser le paramètre global, ou sur `false` pour la désactiver. | `false` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sucker_punch` | `'sucker_punch'` |

## Configuration avancée

### Paramètres du traceur

Pour modifier le comportement par défaut du traceur Datadog, vous pouvez spécifier des options personnalisées dans le bloc `Datadog.configure` comme suit :

```ruby
# config/initializers/datadog-tracer.rb

Datadog.configure do |c|
  c.tracer.enabled = true
  c.tracer.hostname = 'my-agent'
  c.tracer.port = 8126
  c.tracer.partial_flush.enabled = false
  c.tracer.sampler = Datadog::AllSampler.new

  # Pour les cas d'utilisation avancés, vous pouvez spécifier votre propre traceur :
  c.tracer.instance = Datadog::Tracer.new

  # Pour activer le mode debugging :
  c.diagnostics.debug = true
end
```

Les options disponibles sont :

 - `enabled` : définit si le `tracer` est activé ou non. Si cette option est définie sur `false`, l'instrumentation sera exécutée, mais aucune span ne sera envoyée à l'Agent de trace. Cette option peut être configurée via la variable d'environnement `DD_TRACE_ENABLED`. Valeur par défaut : `true`.
 - `hostname` : définir le hostname de l'Agent de trace.
 - `instance` : définir une instance de `Datadog::Tracer` personnalisée. Si cette option est définie, les autres paramètres de tracing sont ignorés (le traceur doit être configuré manuellement).
 - `partial_flush.enabled` : définir sur `true` pour vider les traces partielles (lorsque leur temps d'exécution est trop long). Désactivé par défaut. *Option expérimentale*.
 - `port` : définir le port d'écoute utilisé par l'Agent de trace.
 - `sampler` : définir une instance de `Datadog::Sampler` personnalisée. Si cette option est définie, le traceur utilisera cette instance pour déterminer le comportement d'échantillonnage.
 - `diagnostics.startup_logs.enabled` : logs de configuration de lancement et de diagnostic. Valeur par défaut : `true`. Cette option peut être configurée via la variable d'environnement `DD_TRACE_STARTUP_LOGS`.
 - `diagnostics.debug` : définir sur true pour activer les logs de debugging. Cette option peut être configurée via la variable d'environnement `DD_TRACE_DEBUG`. Valeur par défaut : `false`.
 - `time_now_provider` : lorsque vous effectuez des tests, il peut s'avérer utile d'utiliser un autre fournisseur de temps. Par exemple, pour Timecop, `->{ Time.now_without_mock_time }` permet au traceur d'utiliser le wall time réel. Le calcul de la durée d'une span fera toujours appel à l'horloge monotone système lorsqu'elle est disponible et ne sera donc pas affecté par ce paramètre. Par défaut : `->{ Time.now }`.

#### Logging personnalisé

Par défaut, tous les logs sont traités par le logger Ruby de base. Lorsque vous utilisez Rails, les messages s'affichent dans le fichier de log de votre application.

Les messages de log du client Datadog sont indiqués par `[ddtrace]`. Vous pouvez donc les isoler des autres messages.

Vous pouvez également utiliser un logger personnalisé à la place du logger par défaut. Pour ce faire, utilisez le paramètre `log`.

```ruby
f = File.new("my-custom.log", "w+") # Les messages de log doivent être ajoutés ici
Datadog.configure do |c|
  c.logger = Logger.new(f) # Remplacer le logger par défaut
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "Ceci est généralement appelé par le code de tracing" }
```

### Environnement et tags

Par défaut, l'Agent de trace (c'est-à-dire le programme exécuté en arrière-plan pour recueillir les données des différents clients, et non cette bibliothèque) utilise les tags définis dans le fichier de configuration de l'Agent. Consultez notre [tutoriel sur les environnements](https://app.datadoghq.com/apm/docs/tutorials/environments) pour en savoir plus.

Vous pouvez configurer l'application de façon à taguer automatiquement vos traces et vos métriques à l'aide des variables d'environnement suivantes :

 - `DD_ENV` : l'environnement de votre application (p. ex. `production`, `staging`, etc.)
 - `DD_SERVICE` : le nom de service par défaut pour votre application (p. ex. `billing-api`)
 - `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415`, `1.3-alpha`, etc.)
 - `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des `,` (p. ex. `layer:api,team:intake`)
    - Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` est définie, tout tag `env`/`service`/`version` correspondant défini dans `DD_TAGS` sera remplacé.
    - Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` n'est pas définie, les tags définis dans `DD_TAGS` seront utilisés pour `env`/`service`/`version` respectivement.

Ces valeurs peuvent également être remplacées au niveau du traceur :

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

Cela vous permet de définir une valeur différente pour chaque application. De cette façon, il est par exemple possible de recevoir des données à partir de plusieurs applications issues d'environnements différents sur un même host.

Il est également possible d'appliquer directement des tags à des spans spécifiques. En cas de conflit avec les tags définis au niveau de l'application, ces derniers seront remplacés.

### Avec des variables d'environnement

Autres variables d'environnement :

- `DD_TRACE_AGENT_URL` : définit l'URL d'endpoint où les traces sont envoyées. Prioritaire par rapport à `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` si défini. Ex : `DD_TRACE_AGENT_URL=http://localhost:8126`.
- `DD_TRACE_<INTÉGRATION>_ENABLED` : permet d'activer ou de désactiver une intégration **activée**. Valeur par défaut : `true`. Ex : `DD_TRACE_RAILS_ENABLED=false`. Cette option n'a aucun effet sur les intégrations qui n'ont pas été explicitement activées dans le code (p. ex. `Datadog.configure{ |c| c.use :integration }`). Cette variable d'environnement peut uniquement être utilisée pour désactiver une intégration.
- `DD_TRACE_<INTÉGRATION>_ANALYTICS_ENABLED` : active ou désactive App Analytics pour une intégration spécifique. Valeurs acceptées : true ou false (par défaut). Ex : `DD_TRACE_ACTION_CABLE_ANALYTICS_ENABLED=true`.
- `DD_TRACE_<INTÉGRATION>_ANALYTICS_SAMPLE_RATE` : définit le taux d'échantillonnage App Analytics pour une intégration spécifique. Doit être un nombre flottant entre 0.0 et 1.0 (par défaut). Ex : `DD_TRACE_ACTION_CABLE_ANALYTICS_SAMPLE_RATE=0.5`.
- `DD_LOGS_INJECTION` : activer automatiquement l'injection des informations de [mise en corrélation des traces](#mise-en-correlation-des-traces), telles que `dd.trace_id`, dans les logs Rails. Prend en charge le logger par défaut (`ActiveSupport::TaggedLogging`) et `Lograge`. Pour en savoir plus sur le format des informations de mise en corrélation des traces, consultez la [section dédiée](#mise-en-correlation-des-traces). Valeurs acceptées : `true` ou `false` (par défaut). Ex. : `DD_LOGS_INJECTION=true`.

### Échantillonnage

`ddtrace` est capable d'échantillonner vos traces. Si l'Agent de trace procède déjà à un échantillonnage pour réduire la bande passante utilisée, l'échantillonnage effectué côté client permet quant à lui d'améliorer les performances.

`Datadog::RateSampler` effectue l'échantillonnage de vos traces selon le taux que vous avez défini. Par exemple :

```ruby
# Le taux d'échantillonnage est compris entre 0 (aucune trace n'est conservée) et 1 (toutes les traces sont conservées).
sampler = Datadog::RateSampler.new(0.5) # 50 % des traces sont échantillonnées

Datadog.configure do |c|
  c.tracer.sampler = sampler
end
```

#### Échantillonnage prioritaire

L'échantillonnage prioritaire permet de déterminer si une trace doit être conservée ou non en fonction d'un attribut de priorité qui est appliqué aux traces distribuées. La valeur de cet attribut renseigne l'Agent et le backend sur l'importance de la trace.

Le service d'échantillonnage peut définir la priorité sur les valeurs suivantes :

 - `Datadog::Ext::Priority::AUTO_REJECT` : le service d'échantillonnage a automatiquement décidé de rejeter la trace.
 - `Datadog::Ext::Priority::AUTO_KEEP` : le service d'échantillonnage a automatiquement décidé de conserver la trace.

L'échantillonnage prioritaire est activé par défaut. Cette fonctionnalité vous permet de vous assurer que vos traces distribuées sont échantillonnées de façon exhaustive. Une fois activée, le service d'échantillonnage attribue automatiquement une priorité de 0 ou de 1 aux traces en fonction de leur service et de leur volume.

Vous pouvez également définir manuellement cette priorité pour supprimer une trace non pertinente ou conserver une trace importante. Pour ce faire, définissez `context#sampling_priority` sur :

 - `Datadog::Ext::Priority::USER_REJECT` : l'utilisateur a demandé à rejeter la trace.
 - `Datadog::Ext::Priority::USER_KEEP` : l'utilisateur a demandé à conserver la trace.

Lorsque vous n'utilisez pas le [tracing distribué](#tracing-distribue), vous pouvez modifier la priorité d'une trace à tout moment tant que celle-ci n'est pas finalisée. Cependant, pour que votre changement soit pertinent, vous devez l'effectuer avant toute propagation de contexte (p. ex. avant un fork ou des appels RPC). Dans le cas contraire, les éléments d'une trace distribuée n'auront pas tous la même priorité, et certains éléments seront conservés tandis que d'autres seront rejetés. La trace risquerait alors d'être partiellement stockée et de ne pas être finalisée.

Nous vous conseillons de modifier la priorité le plus tôt possible, dès la création de la span racine.

```ruby
# On commence par récupérer la span active
span = Datadog.tracer.active_span

# Pour rejeter la trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# Pour conserver la trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

### Tracing distribué

Le tracing distribué permet à vos traces d'être propagées sur plusieurs applications instrumentées, de façon à ce qu'une requête forme une trace unique et non une trace séparée pour chaque service.

Pour tracer des requêtes sur plusieurs applications différentes, les données suivantes doivent se propager d'une application à l'autre :

| Propriété              | Type    | Rôle                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Trace ID**          | Nombre entier | ID de la trace. Cette valeur doit être identique pour toutes les requêtes appartenant à la même trace.                           |
| **Parent Span ID**    | Nombre entier | ID de la span dans le service à l'origine de la requête. Cette valeur est toujours différente pour chaque requête dans une trace. |
| **Sampling Priority** | Nombre entier | Priorité d'échantillonnage de la trace. Cette valeur doit être identique pour toutes les requêtes appartenant à la même trace.     |

Cette propagation peut être représentée ainsi :

```
Service A :
  ID Trace :  100000000000000001
  ID Parent : 0
  ID Span :   100000000000000123
  Priorité :  1

  |
  | Requête Service B :
  |   Métadonnées :
  |     ID Trace :  100000000000000001
  |     ID Parent : 100000000000000123
  |     Priorité :  1
  |
  V

Service B :
  ID Trace :  100000000000000001
  ID Parent : 100000000000000123
  ID Span :   100000000000000456
  Priorité :  1

  |
  | Requête Service C :
  |   Métadonnées :
  |     ID Trace :  100000000000000001
  |     ID Parent : 100000000000000456
  |     Priorité :  1
  |
  V

Service C :
  ID Trace :  100000000000000001
  ID Parent : 100000000000000456
  ID Span :   100000000000000789
  Priorité :  1
```

**Via HTTP**

Pour les requêtes HTTP distribuées sur plusieurs applications instrumentées, la propagation des métadonnées des traces se fait à l'aide d'en-têtes de requête HTTP :

| Propriété              | Type    | Nom de l'en-tête HTTP              |
| --------------------- | ------- | ----------------------------- |
| **Trace ID**          | Nombre entier | `x-datadog-trace-id`          |
| **Parent Span ID**    | Nombre entier | `x-datadog-parent-id`         |
| **Sampling Priority** | Nombre entier | `x-datadog-sampling-priority` |

Ainsi :

```
Service A :
  ID Trace :  100000000000000001
  ID Parent : 0
  ID Span :   100000000000000123
  Priorité :  1

  |
  | Requête HTTP Service B :
  |   En-têtes :
  |     x-datadog-trace-id :  100000000000000001
  |     x-datadog-parent-id : 100000000000000123
  |     x-datadog-sampling-priority :  1
  |
  V

Service B :
  ID Trace :  100000000000000001
  ID Parent : 100000000000000123
  ID Span :   100000000000000456
  Priorité :  1

  |
  | Requête HTTP Service C :
  |   En-têtes :
  |     x-datadog-trace-id :  100000000000000001
  |     x-datadog-parent-id : 100000000000000456
  |     x-datadog-sampling-priority :  1
  |
  V

Service C :
  ID Trace :  100000000000000001
  ID Parent : 100000000000000456
  ID Span :   100000000000000789
  Priorité :  1
```

**Activer le tracing distribué pour des intégrations**

De nombreuses intégrations incluses dans `ddtrace` prennent en charge le tracing distribué. Le tracing distribué est activé par défaut dans l'Agent v7 et la plupart des versions de l'Agent v6. Si nécessaire, il peut être activé via les paramètres de configuration.

- Si votre application reçoit des requêtes envoyées par des services pour lesquels le tracing distribué est activé, vous devez activer le tracing distribué pour les intégrations qui gèrent ces requêtes (telles que Rails).
- Si votre application envoie des requêtes à des services pour lesquels le tracing distribué est activé, vous devez activer le tracing distribué pour les intégrations qui envoient ces requêtes (telles que Faraday).
- Si votre application envoie et reçoit des requêtes nécessitant un tracing distribué, elle doit activer toutes les intégrations qui gèrent ces requêtes.

Pour découvrir comment activer le tracing distribué pour ces intégrations, consultez leur documentation :

- [Excon](#excon)
- [Faraday](#faraday)
- [Client Rest](#restclient)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#http-rb)
- [httpclient](#httpclient)

**Utiliser le propagateur HTTP**

Pour faciliter la propagation de ces métadonnées, vous pouvez utiliser le module `Datadog::HTTPPropagator`.

Côté client :

```ruby
Datadog.tracer.trace('web.call') do |span|
  # Injecter le contexte de la span dans les en-têtes (`env` doit être un hash)
  Datadog::HTTPPropagator.inject!(span.context, env)
end
```

Côté serveur :

```ruby
Datadog.tracer.trace('web.work') do |span|
  # Générer un contexte à partir des en-têtes (`env` doit être un hash)
  context = HTTPPropagator.extract(request.env)
  Datadog.tracer.provider.context = context if context.trace_id
end
```

### Mise en file d'attente des requêtes HTTP

Les traces issues de requêtes HTTP peuvent être configurées de façon à inclure le temps passé par une requête dans la file d'attente d'un serveur Web frontend ou d'un répartiteur de charge avant d'atteindre l'application Ruby.

Cette fonctionnalité est désactivée par défaut. Pour l'activer, vous devez ajouter un en-tête `X-Request-Start` ou `X-Queue-Start` depuis votre serveur Web (p. ex., Nginx). Voici un exemple de configuration avec Nginx :

```
# /etc/nginx/conf.d/ruby_service.conf
server {
    listen 8080;

    location / {
      proxy_set_header X-Request-Start "t=${msec}";
      proxy_pass http://web:3000;
    }
}
```

Vous devez alors activer la fonctionnalité de mise en file d'attente des requêtes, en définissant `request-queuing: true` dans l'intégration qui gère la requête. Pour les applications basées sur Rack, consultez la [section dédiée](#rack) pour en savoir plus.

### Pipeline de processing

Certaines applications nécessitent que les traces soient modifiées ou filtrées avant d'être envoyées en amont. Le pipeline de processing permet aux utilisateurs de créer des *processeurs* servant à mettre en place un tel comportement.

Un processeur peut être n'importe quel objet répondant à un `#call` et acceptant `trace` comme argument (qui est un `array` de `Datadog::Span`s).

Par exemple :

```ruby
lambda_processor = ->(trace) do
  # Logique de processing…
  trace
end

class MyCustomProcessor
  def call(trace)
    # Logique de processing…
    trace
  end
end
custom_processor = MyFancyProcessor.new
```

Le bloc `#call` d'un processeur *doit* renvoyer l'objet `trace`. La valeur renvoyée est ensuite passée au processeur suivant dans le pipeline.

Ces processeurs doivent ensuite être ajoutés au pipeline via `Datadog::Pipeline.before_flush` :

```ruby
Datadog::Pipeline.before_flush(lambda_processor, custom_processor)
```

Vous pouvez également définir ces processeurs en utilisant la syntaxe de bloc abrégée pour `Datadog::Pipeline.before_flush` :

```ruby
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.name =~ /forbidden/ }
end
```

#### Filtrage

Vous pouvez utiliser le processeur `Datadog::Pipeline::SpanFilter` pour supprimer les spans lorsque le bloc renvoie une valeur truthy :

```ruby
Datadog::Pipeline.before_flush(
  # Supprimer les spans associées à une ressource spécifique
  Datadog::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Supprimer les spans acheminées vers localhost
  Datadog::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Processing

Vous pouvez utiliser le processeur `Datadog::Pipeline::SpanProcessor` pour modifier des spans :

```ruby
Datadog::Pipeline.before_flush(
  # Supprimer le texte correspondant du champ ressource
  Datadog::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

### Mise en corrélation des traces

Dans de nombreux cas, par exemple pour le logging, il peut s'avérer utile de mettre en corrélation les ID de trace à d'autres événements ou flux de données afin de comparer ces différentes sources plus facilement.

#### Logging dans les applications Rails

##### Configuration automatique

Pour les applications Rails qui utilisent le logger par défaut (`ActiveSupport::TaggedLogging`) ou `lograge`, vous pouvez activer automatiquement l'injection des informations de mise en corrélation des traces en définissant l'option de configuration de l'instrumentation `rails` intitulée `log_injection` sur `true` ou en définissant la variable d'environnement `DD_LOGS_INJECTION=true`:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

_Remarque :_  Rails charge les initialiseurs dans l'ordre alphabétique. Ainsi, pour les utilisateurs `lograge` qui ont également défini `lograge.custom_options` dans un fichier de configuration `initializers/lograge.rb`, il est possible que la corrélation automatique des traces ne soit pas appliquée. En effet, `initializers/datadog.rb` serait écrasé par l'initialiseur `initializers/lograge.rb`. Pour activer la corrélation automatique des traces avec un paramètre `lograge.custom_options` _existant_, utilisez la configuration [manuelle de Lograge](#configuration-manuelle-de-lograge) ci-dessous.

##### Configuration manuelle de Lograge

Après avoir [configuré Lograge dans une application Rails](https://docs.datadoghq.com/logs/log_collection/ruby/), modifiez manuellement le bloc `custom_options` dans le fichier de configuration de votre environnement (p. ex., `config/environments/production.rb`) pour ajouter les ID de trace.

```ruby
config.lograge.custom_options = lambda do |event|
  # Récupère les informations de trace pour le thread actuel
  correlation = Datadog.tracer.active_correlation

  {
    # Ajoute les ID en tant que tags au log généré
    :dd => {
      # Pour maintenir le même niveau de précision durant la sérialisation JSON, utiliser des chaînes pour les grands nombres
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

##### Méthode manuelle (ActiveSupport::TaggedLogging)

Les applications Rails configurées avec le logger `ActiveSupport::TaggedLogging` par défaut peuvent ajouter des ID de corrélation en tant que tags aux logs générés. Pour activer la mise en corrélation des traces avec `ActiveSupport::TaggedLogging`, ajoutez ce qui suit dans le fichier de configuration de votre environnement Rails :

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# Pour :
# DD_ENV = 'production' (Le nom de l'environnement dans lequel votre application est exécutée.)
# DD_SERVICE = 'billing-api' (Le nom de service par défaut de votre application.)
# DD_VERSION = '2.5.17' (La version de votre application.)

# Les requêtes Web vont générer :
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### Logging dans les applications Ruby

Pour ajouter des ID de corrélation à votre logger, ajoutez un formateur de log qui récupère les ID de corrélation avec `Datadog.tracer.active_correlation`, puis ajoutez les ID au message.

Pour vous assurer que vos logs Datadog sont bien mis en corrélation, vérifiez que les éléments suivants sont inclus dans chaque message de log (l'ordre doit être le même) :

 - `dd.env=<ENV>` : où `<ENV>` correspond à `Datadog.tracer.active_correlation.env`. N'incluez pas cet élément si aucun environnement n'est configuré.
 - `dd.service=<SERVICE>` : où `<SERVICE>` correspond à `Datadog.tracer.active_correlation.service`. N'incluez pas cet élément si aucun nom de service par défaut n'est configuré.
 - `dd.version=<VERSION>` : où `<VERSION>` correspond à `Datadog.tracer.active_correlation.version`. N'incluez pas cet élément si aucune version de l'application n'est configurée.
 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog.tracer.active_correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog.tracer.active_correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

Par défaut, `Datadog::Correlation::Identifier#to_s` renvoie `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Si une trace n'est pas active et que ni l'environnement ni la version de l'application ne sont configurés, il renvoie `dd.trace_id=0 dd.span_id=0 dd.env= dd.version=`.

Voici un exemple pour illustrer cela :

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Lorsqu'une trace est active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

### Configurer la couche de transport

Par défaut, le traceur envoie les données de tracing via `Net::HTTP` à `127.0.0.1:8126`, l'emplacement par défaut du processus de l'Agent de trace Datadog. Toutefois, il est possible de configurer le traceur de façon à ce que ses données soient envoyées vers un autre emplacement ou via un autre protocole.

Certains paramètres par défaut, tels que le hostname et le port, peuvent être configurés via les [Paramètres du traceur](#parametres-du-traceur).

#### Utiliser l'adaptateur Net::HTTP

L'adaptateur `Net` envoie les traces via TCP avec `Net::HTTP`. Il s'agit de l'adaptateur de transport par défaut.

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Hostname, port et options supplémentaires. :timeout est défini en secondes.
    t.adapter :net_http, '127.0.0.1', 8126, { timeout: 1 }
  }
end
```

#### Utiliser l'adaptateur UnixSocket

L'adaptateur `UnixSocket` envoie les traces via un socket Unix avec `Net::HTTP`.

Pour l'utiliser, commencez par configurer votre Agent de trace de façon à ce qu'il effectue son écoute via un socket Unix. Ensuite, configurez le traceur avec :

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Spécifier le chemin vers le socket Unix de l'Agent de trace
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### Utiliser l'adaptateur de test de transport

L'adaptateur `Test` est un système de transport no-op qui vous permet également de définir un buffer pour les requêtes. Il est idéal pour les procédures de test et les environnements hors production.

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Mettre le transport en mode no-op. Les traces ne sont pas conservées.
    t.adapter :test

    # Vous pouvez également spécifier un buffer pour examiner les traces générées.
    # Le buffer doit répondre à '<<'.
    t.adapter :test, []
  }
end
```

#### Utiliser un adaptateur de transport personnalisé

Les adaptateurs personnalisés peuvent être configurés ainsi :

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # Initialiser et passer une instance de l'adaptateur
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### Métriques

Le traceur et ses intégrations peuvent produire des métriques supplémentaires offrant des informations utiles sur les performances de votre application. Ces métriques sont collectées avec `dogstatsd-ruby`, et peuvent être envoyées au même Agent Datadog que celui auquel vous envoyez vos traces.

Pour configurer la collecte de métriques pour votre application :

1. [Configurez votre Agent Datadog pour StatsD](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. Ajoutez `gem 'dogstatsd-ruby'` à votre Gemfile

#### Métriques runtime d'application

Si les métriques runtime sont configurées, la bibliothèque de tracing recueille et envoie automatiquement des métriques sur la santé de votre application.

Pour configurer les métriques runtime, ajoutez la configuration suivante :

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # Définir sur `true` pour activer la collecte de métriques runtime. Valeur par défaut : `false`
  # Ce paramètre peut également être défini avec DD_RUNTIME_METRICS_ENABLED=true
  c.runtime_metrics.enabled = true

  # Facultatif : vous pouvez configurer l'instance DogStatsD utilisée pour envoyer les métriques runtime.
  # Statsd est automatiquement configuré avec les paramètres par défaut si `dogstatsd-ruby` est disponible.
  # Vous pouvez utiliser le host et le port de l'Agent Datadog pour la configuration. Valeur par défaut : 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

Consultez la [documentation sur Dogstatsd](https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames) pour en savoir plus sur la configuration de `Datadog::Statsd`.

Les statistiques sont spécifiques à la VM et comprennent ce qui suit :

| Nom                        | Type    | Rôle                                              |
| --------------------------  | ------- | -------------------------------------------------------- |
| `runtime.ruby.class_count`  | `gauge` | Nombre de classes dans l'espace mémoire.                       |
| `runtime.ruby.thread_count` | `gauge` | Nombre de threads.                                       |
| `runtime.ruby.gc.*`.        | `gauge` | Statistiques de nettoyage de la mémoire : recueillies à partir de `GC.stat`. |

En outre, toutes les métriques comprennent les tags suivants :

| Nom         | Rôle                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | Langage de programmation tracé. (Ex. : `ruby`)              |
| `service`    | Liste des services associés à cette métrique.      |

### OpenTracing

Pour en savoir plus sur la configuration de Datadog avec OpenTracing, consultez la section [Démarrage rapide pour OpenTracing](#demarrage-rapide-pour-opentracing).

**Configurer les paramètres du traceur Datadog**

Le traceur Datadog sous-jacent peut être configuré en passant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Où `options` correspond à un hash d'options spécifiées à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit dans la section [Paramètres du traceur](#parametres-du-traceur).

**Activer et configurer des intégrations**

Par défaut, la configuration d'OpenTracing avec Datadog n'active aucune instrumentation supplémentaire assurée par Datadog. Vous ne recevrez que les spans et les traces provenant de l'instrumentation OpenTracing intégrée à votre application.

Toutefois, des instrumentations supplémentaires fournies par Datadog peuvent être activées conjointement à OpenTracing via `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumenter des intégrations](#instrumenter-des-integrations) pour obtenir plus de détails.

**Formats de sérialisation pris en charge**

| Type                           | Prise en charge | Informations supplémentaires |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Oui        |                        |
| `OpenTracing::FORMAT_RACK`     | Oui        | Notez qu'en raison de la perte de résolution liée au format Rack, les majuscules dans les noms d'éléments transmis lors de l'aller-retour doivent être remplacées par des minuscules, et le caractère `-` par le caractère  `_`. Nous vous conseillons d'éviter d'utiliser ces caractères ou de prévoir une étape pour les gérer à la réception. |
| `OpenTracing::FORMAT_BINARY`   | Non         |                        |