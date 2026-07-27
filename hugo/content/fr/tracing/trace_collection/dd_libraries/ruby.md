---
aliases:
- /fr/tracing/ruby/
- /fr/tracing/languages/ruby/
- /fr/tracing/setup/ruby/
- /fr/tracing/setup_overview/ruby/
- /fr/agent/apm/ruby/
- /fr/tracing/setup_overview/setup/ruby
- /fr/tracing/trace_collection/ruby
code_lang: ruby
code_lang_weight: 15
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/GettingStarted.md
title: Tracer des applications Ruby
type: multi-code-lang
---
`ddtrace` est le client de tracing de Datadog pour Ruby. Il permet de tracer les requêtes qui transitent par vos serveurs Web, bases de données et microservices, offrant ainsi aux développeurs une visibilité optimale sur les goulots d'étranglement et les requêtes problématiques.

## Prise en main

**Si vous effectuez une mise à niveau depuis une version 0.x, consultez notre [guide dédié](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10).**

Pour la documentation générale sur l'APM, consultez la [documentation relative à la configuration][setup docs].

Pour découvrir comment APM se présente une fois que votre application a commencé à envoyer des informations à Datadog, consultez la section relative aux [termes et concepts][visualization docs].

Pour vous familiariser avec l'API de la bibliothèque, consultez notre [documentation YARD][yard docs].

Pour contribuer au code, consultez les [règles de contribution][contribution docs] et le [guide de développement][development docs].

[setup docs]: https://docs.datadoghq.com/tracing/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[visualization docs]: https://docs.datadoghq.com/tracing/glossary/
[contribution docs]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[yard docs]: https://www.rubydoc.info/gems/ddtrace/

## Table des matières

 - [Compatibilité](#compatibilite)
 - [Installation](#installation)
     - [Configurer l'Agent Datadog pour le tracing](#configurer-l-agent-datadog-pour-le-tracing)
     - [Instrumenter votre application](#instrumenter-votre-application)
        - [Applications Rails ou Hanami](#applications-rails-ou-hanami)
        - [Autres applications Ruby](#autres-applications-ruby)
        - [Configurer OpenTracing](#configurer-opentracing)
        - [Configurer OpenTelemetry](#configurer-opentelemetry)
     - [Associer votre application à l'Agent Datadog](#associer-votre-application-a-l-Agent-datadog)
 - [Instrumentation manuelle](#instrumentation-manuelle)
 - [Instrumenter des intégrations](#instrumenter-des-integrations)
     - [Action Cable](#action-cable)
     - [Action Mailer](#action-mailer)
     - [Action Pack](#action-pack)
     - [Action View](#action-view)
     - [Active Job](#active-job)
     - [Active Model Serializers](#active-model-serializers)
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
     - [Hanami](#hanami)
     - [http.rb](#httprb)
     - [httpclient](#httpclient)
     - [httpx](#httpx)
     - [Kafka](#kafka)
     - [MongoDB](#mongodb)
     - [MySQL2](#mysql2)
     - [Net/HTTP](#net-http)
     - [Postgres](#postgres)
     - [Presto](#presto)
     - [Qless](#qless)
     - [Que](#que)
     - [Racecar](#racecar)
     - [Rack](#rack)
     - [Rails](#rails)
     - [Rake](#rake)
     - [Redis](#redis)
     - [Resque](#resque)
     - [Rest Client](#rest-client)
     - [RSpec](#rspec)
     - [Sequel](#sequel)
     - [Shoryuken](#shoryuken)
     - [Sidekiq](#sidekiq)
     - [Sinatra](#sinatra)
     - [Sneakers](#sneakers)
     - [Stripe](#stripe)
     - [Sucker Punch](#sucker-punch)
 - [Configuration supplémentaire](#configuration-supplementaire)
     - [Logging personnalisé](#logging-personnalise)
     - [Environnement et tags](#environnement-et-tags)
     - [Debugging et diagnostic](#debugging-et-diagnostic)
     - [Échantillonnage](#echantillonnage)
         - [Échantillonnage côté application](#echantillonnage-cote-application)
         - [Échantillonnage prioritaire](#echantillonnage-prioritaire)
         - [Échantillonnage de spans uniques](#echantillonnage-de-spans-uniques)
     - [Tracing distribué](#tracing-distribue)
     - [Mise en file d'attente des requêtes HTTP](#mise-en-file-d-attente-des-requetes-http)
     - [Pipeline de traitement](#pipeline-de-traitement)
         - [Filtrage](#filtrage)
         - [Traitement](#traitement)
     - [Mise en corrélation des traces](#mise-en-correlation-des-traces)
     - [Configurer la couche de transport](#configurer-la-couche-de-transport)
     - [Métriques](#metriques)
         - [Métriques runtime d'application](#metriques-((runtime-d-application)
     - [OpenTracing](#opentracing)
     - [Profiling](#profiling)
         - [Dépannage](#depannage)
         - [Profiling des tâches Resque](#profiling-des-taches-resque)
 - [Problèmes connus et configurations suggérées](#poblemes-connus-et-configurations-suggerees)
    - [Charge utile trop volumineuse](#charge-utile-trop-volumineuse)
    - [Erreur Stack level too deep](#erreur-stack-level-too-deep)

## Compatibilité

<!--
    Note: Please replicate any changes to this section also to
    https://github.com/datadog/documentation/blob/master/content/en/tracing/setup_overview/compatibility_requirements/ruby.md
    so that they remain in sync.
-->

**Interpréteurs Ruby pris en charge** :

| Type  | Documentation              | Version | Type de prise en charge                         | Version du gem prise en charge |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.1     | Complète                                 | Dernière              |
|       |                            | 3.0     | Complète                                 | Dernière              |
|       |                            | 2.7     | Complète                                 | Dernière              |
|       |                            | 2.6     | Complète                                 | Dernière              |
|       |                            | 2.5     | Complète                                 | Dernière              |
|       |                            | 2.4     | Complète                                 | Dernière              |
|       |                            | 2.3     | Complète                                 | Dernière              |
|       |                            | 2.2     | Complète (sauf pour le profiling)          | Dernière              |
|       |                            | 2.1     | Complète (sauf pour le profiling)          | Dernière              |
|       |                            | 2.0     | Fin de vie depuis le 7 juin 2021             | < 0.50.0            |
|       |                            | 1.9.3   | Fin de vie depuis le 6 août 2020           | < 0.27.0            |
|       |                            | 1.9.1   | Fin de vie depuis le 6 août 2020           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3     | Complète                                 | Dernière              |
|       |                            | 9.2     | Complète                                 | Dernière              |

**Serveurs Web pris en charge** :

| Type      | Documentation                     | Version      | Type de prise en charge |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+/3.6+ | Complète         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+/5.1+  | Complète         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | Complète         |

**Frameworks de tracing pris en charge** :

| Type        | Documentation                                   | Version               | Version du gem prise en charge |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+                | >= 0.16.0           |

*Complète* indique que toutes les fonctionnalités du traceur sont prises en charge.

*Obsolète* indique que la prise en charge passera à *Maintenance* dans une prochaine version.

*Maintenance* indique que seules les corrections de bugs critiques seront backportées jusqu'à la fin de vie.

*Fin de vie* indique que le service n'est plus pris en charge.

### Prise en charge par macOS (Apple)

L'utilisation de `ddtrace` sous macOS est prise en charge à des fins de développement, mais pas pour des déploiements en production.

### Prise en charge par Microsoft Windows

Microsoft Windows ne prend actuellement pas en charge `ddtrace`. Nous acceptons les contributions de la communauté et les problèmes associés, mais ils ne sont pas prioritaires.

## Installation

Il vous suffit de suivre quelques étapes rapides pour pouvoir tracer votre application Ruby :

1. Configurer l'Agent Datadog pour le tracing
2. Instrumenter votre application
3. Associer votre application à l'Agent Datadog

### Configurer l'Agent Datadog pour le tracing

Avant d'installer `ddtrace`, [installez l'Agent Datadog](https://docs.datadoghq.com/agent/) afin que `ddtrace` puisse lui envoyer des données de trace.

Configurez ensuite l'Agent Datadog de façon à ce qu'il accepte les traces. Pour ce faire, effectuez l'une des opérations suivantes :

 - Définissez `DD_APM_ENABLED=true` dans l'environnement de l'Agent.

OU

 - Ajoutez `apm_enabled: true` dans le [fichier de configuration de l'Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#fichier-de-configuration-principal-de-l-agent).

*De plus, dans les environnement conteneurisés…*

 - Définissez `DD_APM_NON_LOCAL_TRAFFIC=true` dans l'environnement de l'Agent.

OU

 - Ajoutez `apm_non_local_traffic: true` dans le [fichier de configuration de l'Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#fichier-de-configuration-principal-de-l-agent).

Consultez les instructions de configuration spécifiques pour [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby) ou [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#collecte-de-traces) pour vérifier que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé.

#### Configurer l'ingestion des données de trace

L'Agent Datadog détecte par défaut les traces via HTTP sur le port `8126`.

Pour modifier le protocole ou le port utilisés pour la détection des données de trace par l'Agent, procédez comme suit :

**Pour une détection HTTP via TCP** :

 - Définissez `DD_APM_RECEIVER_PORT=<port>` dans l'environnement de l'Agent.

OU

 - Ajoutez `apm_config: receiver_port: <port>` dans le [fichier de configuration de l'Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#fichier-de-configuration-principal-de-l-agent).

 **Pour un socket de domaine Unix (UDS)** :

 - Définissez `DD_APM_RECEIVER_SOCKET=<chemin-vers-fichier-socket>`.

OU

 - Ajoutez `apm_config: receiver_socket: <chemin-vers-fichier-socket>` dans le [fichier de configuration de l'Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#fichier-de-configuration-principal-de-l-agent).

### Instrumenter votre application

#### Applications Rails ou Hanami

1. Ajoutez le gem `ddtrace` à votre fichier Gem :

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. Installez le gem avec `bundle install`.

3. Créez un fichier `config/initializers/datadog.rb` contenant :

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Grâce à ce bloc, vous pouvez :

      - [ajouter des paramètres de configuration supplémentaires](#configuration-supplementaire) ;
      - [activer ou reconfigurer l'instrumentation](#instrumenter-des-integrations).

#### Autres applications Ruby

Si votre application n'utilise pas les gems pris en charge (Rails ou Hanami) qui sont indiqués ci-dessus, vous pouvez la configurer comme suit :

1. Ajoutez le gem `ddtrace` à votre fichier Gem :

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Installez le gem avec `bundle install`.
3. Utilisez `require` pour exiger les [bibliothèques ou frameworks pris en charge](#instrumenter-des-integrations) à instrumenter.
4. Ajoutez `require 'ddtrace/auto_instrument'` à votre application. _Remarque : effectuez cette opération _après_ avoir exigé les bibliothèques ou frameworks pris en charge.

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

5. Ajoutez un bloc de configuration à votre application :

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Grâce à ce bloc, vous pouvez :

      - [ajouter des paramètres de configuration supplémentaires](#configuration-supplementaire) ;
      - [activer ou reconfigurer l'instrumentation](#instrumenter-des-integrations).

#### Configurer OpenTracing

1. Ajoutez le gem `ddtrace` à votre fichier Gem :

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Installez le gem avec `bundle install`.
3. Ajoutez ce qui suit à votre fichier de configuration OpenTracing :

    ```ruby
    require 'opentracing'
    require 'datadog/tracing'
    require 'datadog/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

4. Ajoutez un bloc de configuration à votre application :

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

     Grâce à ce bloc, vous pouvez :

      - [ajouter des paramètres de configuration Datadog supplémentaires](#configuration-supplementaire) ;
      - [activer ou reconfigurer l'instrumentation Datadog](#instrumenter-des-integrations).

#### Configurer OpenTelemetry

Vous pouvez envoyer directement des traces OpenTelemetry à l'Agent Datadog (sans `ddtrace`) avec OTLP. Consultez notre documentation sur l'[ingestion OTLP dans l'Agent Datadog](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#ingestion-otlp-dans-l-agent-datadog) pour en savoir plus.

### Associer votre application à l'Agent Datadog

Par défaut, `ddtrace` se connecte à l'Agent à l'aide des premiers paramètres disponibles, selon les priorités indiquées :

1. Via les paramètres de configuration explicitement fournis (hostname, port et transport)
2. Via le socket de domaine Unix (UDS) situé à l'emplacement `/var/run/datadog/apm.socket`
3. À l'aide du protocole HTTP via TCP sur `127.0.0.1:8126`

Si votre Agent Datadog effectue une écoute à l'un de ces emplacements, aucune configuration supplémentaire n'est requise.

Si votre Agent s'exécute sur un autre host ou conteneur que votre application, ou si vous souhaitez envoyer des traces via un autre protocole, vous devez configurer votre application en conséquence.

  - [Comment envoyer des données de trace à l'Agent à l'aide du protocole HTTP via TCP](#changer-le-hostname-et-le-port-par-defaut-de-l-Agent)
  - [Comment envoyer des traces à l'Agent via un socket de domaine Unix (UDS)](#utiliser-l-adaptateur-de-socket-de-domaine-unix)

### Dernières étapes d'installation

Une fois la configuration terminée, vos services commencent à apparaître sur la [page des services APM](https://app.datadoghq.com/apm/services) après quelques minutes. Pour apprendre à utiliser l'IU de l'APM, [cliquez ici][visualization docs].

## Instrumentation manuelle

Si le framework que vous utilisez n'est pas pris en charge, vous pouvez choisir d'instrumenter manuellement votre code.

Pour tracer du code Ruby, vous pouvez utiliser la méthode `Datadog::Tracing.trace` :

```ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # Incorporer le code que vous souhaitez instrumenter dans ce bloc
  # La span peut également être modifiée ici
  # Exemple : changement de nom de ressource, définition de tags, etc.
end
```

Assurez-vous de remplacer `name` par une `string` décrivant le type d'opération effectuée (p. ex. `'web.request'` ou `'request.parse'`)

`options` correspond aux arguments de mot-clé facultatifs suivants :

| Clé | Type | Description | Valeur par défaut |
| --------------- | ----------------------- | --- | --- |
| `autostart`     | `Bool`                  | Indique si la mesure du temps doit démarrer automatiquement. Si cette clé est définie sur `false`, l'utilisateur doit appeler `span.start`. | `true` |
| `continue_from` | `Datadog::TraceDigest`  | Prolonge une trace qui provient d'un autre contexte d'exécution. TraceDigest décrit le point de continuation. | `nil` |
| `on_error`      | `Proc`                  | Remplace le comportement de gestion des erreurs générées par une span. Arguments :  `span` et `error`. Définit l'erreur sur la span par défaut. | `proc { |span, error| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`                | Nom de la ressource ou de l'action tracée. Les traces associées à un même nom de ressource seront regroupées pour la collecte de métriques (elles resteront toutefois consultables séparément). Généralement spécifique à un domaine, tel qu'une URL, une requête, etc. (p. ex. `'Article#submit'`, `http://exemple.com/articles/list`.) | `name` de la span. |
| `service`       | `String`                | Le nom du service auquel cette span appartient (p. ex. `'mon-service-web'`) | `default-service` du traceur, `$PROGRAM_NAME` ou `'ruby'` |
| `start_time`    | `Time`                  | Heure d'initialisation réelle de la span. Utile dans les cas où les événements tracés se sont déjà produits. | `Time.now` |
| `tags`          | `Hash`                  | Tags supplémentaires à ajouter à la span. | `{}` |
| `type`          | `String`                | Type de span (`'http'`, `'db'`, etc.) | `nil` |

Nous vous conseillons fortement de définir un `service` et une `resource` au strict minimum. Les spans sans `service` ou `resource` (`nil`) seront ignorées par l'Agent Datadog.

Exemple d'instrumentation manuelle :

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Tracing asynchrone

Il n'est pas toujours possible d'utiliser `Datadog::Tracing.trace` autour d'un bloc de code. Il arrive que certaines instrumentations basées sur des événements ou des notifications ne vous notifient qu'au début ou à la fin d'un événement.

Pour tracer ces opérations, vous pouvez tracer le code de façon asynchrone en appelant `Datadog::Tracing.trace` sans bloc :

```ruby
# Certains frameworks d'instrumentation appellent ce qui suit après la fin d'un événement…
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

Lorsque vous appelez `Datadog::Tracing.trace` sans bloc, la `Datadog::Tracing::SpanOperation` renvoyée par la fonction est initialisée, mais pas finalisée. Vous pouvez ensuite modifier cette span comme bon vous semble, puis la finaliser avec `finish`.

*Toutes les spans doivent être finalisées.* Si une span est encore ouverte alors que la trace se termine, cette dernière sera ignorée. Si vous pensez que l'une de vos traces n'est pas finalisée, [activez le mode debugging](#configuration-supplementaire) afin de visualiser les avertissements.

Pour éviter ce problème lorsque vous avez recours à des événements d'initialisation et de finalisation, utilisez `Datadog::Tracing.active_span` pour récupérer la span active.

```ruby
# Exemple : ActiveSupport::Notifications appelle ce qui suit au début d'un événement
def start(name, id, payload)
  # Démarrer une span
  Datadog.Tracing.trace(name)
end

# Exemple : ActiveSupport::Notifications appelle ce qui suit à la fin d'un événement
def finish(name, id, payload)
  # Récupérer la span active (thread-safe)
  current_span = Datadog.Tracing.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### Enrichir les traces à l'aide de méthodes imbriquées

Vous pouvez ajouter des informations supplémentaires sous forme de tags à la span active en utilisant la méthode de votre choix. Attention : si la méthode est appelée et qu'aucune span n'est active, `active_span` est défini sur nil.

```ruby
# Exemple : ajouter un tag à la span active

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

Vous pouvez également récupérer la span active en utilisant la méthode `active_trace`. Cette méthode renverra `nil` si aucune trace n'est active.

```ruby
# exemple : accéder à la trace active

current_trace = Datadog::Tracing.active_trace
```

## Instrumenter des intégrations

Un vaste nombre de bibliothèques et de frameworks sont pris en charge par défaut, ce qui signifie qu'ils peuvent être instrumentés automatiquement. Ces instrumentations ne sont pas activées par défaut, mais elles peuvent facilement être activées et configurées avec l'API `Datadog.configure` :

```ruby
Datadog.configure do |c|
  # Activer et configurer une intégration
  c.tracing.instrument :integration_name, **options
end
```

`options` correspond aux arguments de mot-clé pour la configuration propre aux intégrations.

Vous trouverez ci-dessous la liste des intégrations disponibles ainsi que leurs options de configuration :

<!--
    Note: Please replicate any changes to this section also to
    https://github.com/datadog/documentation/blob/master/content/en/tracing/setup_overview/compatibility_requirements/ruby.md
    so that they remain in sync.
-->

| Nom                       | Clé                        | Versions prises en charge : MRI  | Versions prises en charge : JRuby | Configuration                    | Source Gem                                                                     |
| -------------------------- | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable               | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[Lien](#action-cable)*             | *[Lien](https://github.com/rails/rails/tree/master/actioncable)*               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                 | `>= 5.0`                  | *[Lien](#action-mailer)*            | *[Lien](https://github.com/rails/rails/tree/master/actionmailer)*              |
| Action Pack                | `action_pack`              | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#action-pack)*              | *[Lien](https://github.com/rails/rails/tree/master/actionpack)*                |
| Action View                | `action_view`              | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#action-view)*              | *[Lien](https://github.com/rails/rails/tree/master/actionview)*                |
| Active Job                 | `active_job`               | `>= 4.2`                 | `>= 4.2`                  | *[Lien](#active-job)*               | *[Lien](https://github.com/rails/rails/tree/master/activejob)*             |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[Lien](#active-model-serializers)* | *[Lien](https://github.com/rails-api/active_model_serializers)*                |
| Active Record              | `active_record`            | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#active-record)*            | *[Lien](https://github.com/rails/rails/tree/master/activerecord)*              |
| Active Support             | `active_support`           | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#active-support)*           | *[Lien](https://github.com/rails/rails/tree/master/activesupport)*             |
| AWS                        | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#aws)*                      | *[Lien](https://github.com/aws/aws-sdk-ruby)*                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[Lien](#concurrent-ruby)*          | *[Link](https://github.com/ruby-concurrency/concurrent-ruby)*                  |
| Dalli                      | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#dalli)*                    | *[Lien](https://github.com/petergoldstein/dalli)*                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[Lien](#delayedjob)*               | *[Lien](https://github.com/collectiveidea/delayed_job)*                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#elasticsearch)*            | *[Lien](https://github.com/elastic/elasticsearch-ruby)*                        |
| Ethon                      | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[Lien](#ethon)*                    | *[Lien](https://github.com/typhoeus/ethon)*                                    |
| Excon                      | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[Lien](#excon)*                    | *[Lien](https://github.com/excon/excon)*                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[Lien](#faraday)*                  | *[Lien](https://github.com/lostisland/faraday)*                                |
| Grape                      | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#grape)*                    | *[Lien](https://github.com/ruby-grape/grape)*                                  |
| GraphQL                    | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[Lien](#graphql)*                  | *[Lien](https://github.com/rmosolgo/graphql-ruby)*                             |
| gRPC                       | `grpc`                     | `>= 1.7`                 | *Gem non disponible*       | *[Lien](#grpc)*                     | *[Lien](https://github.com/grpc/grpc/tree/master/src/rubyc)*                   |
| hanami                     | `hanami`                   | `>= 1`, `< 2`            | `>= 1`, `< 2`             | *[Lien](#hanami)*                   | *[Lien](https://github.com/hanami/hanami)*                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#httprb)*                   | *[Lien](https://github.com/httprb/http)*                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                 | `>= 2.2`                  | *[Lien](#httpclient)*               | *[Lien](https://github.com/nahi/httpclient)*                                     |
| httpx                      | `httpx`                    | `>= 0.11`                | `>= 0.11`                 | *[Lien](#httpx)*                    | *[Lien](https://gitlab.com/honeyryderchuck/httpx)*                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[Lien](#kafka)*                    | *[Lien](https://github.com/zendesk/ruby-kafka)*                                |
| Makara (via Active Record) | `makara`                   | `>= 0.3.5`               | `>= 0.3.5`                | *[Lien](#active-record)*            | *[Lien](https://github.com/instacart/makara)*                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[Lien](#mongodb)*                  | *[Lien](https://github.com/mongodb/mongo-ruby-driver)*                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`              | *Gem non disponible*       | *[Lien](#mysql2)*                   | *[Lien](https://github.com/brianmario/mysql2)*                                 |
| Net/HTTP                   | `http`                     | *(Toute version de Ruby prise en charge)*   | *(Toute version de Ruby prise en charge)*    | *[Lien](#nethttp)*                  | *[Lien](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)* |
| Postgres                     | `pg`                   | `>= 0.18.4`              | *Gem non disponible*       | *[Lien](#postgres)*                   | *[Lien](https://github.com/ged/ruby-pg)*                  |
| Presto                     | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[Lien](#presto)*                   | *[Lien](https://github.com/treasure-data/presto-client-ruby)*                  |
| Qless                      | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | *[Lien](#qless)*                    | *[Lien](https://github.com/seomoz/qless)*                                      |
| Que                        | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[Lien](#que)*                      | *[Lien](https://github.com/que-rb/que)*                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[Lien](#racecar)*                  | *[Lien](https://github.com/zendesk/racecar)*                                   |
| Rack                       | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[Lien](#rack)*                     | *[Lien](https://github.com/rack/rack)*                                         |
| Rails                      | `rails`                    | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#rails)*                    | *[Lien](https://github.com/rails/rails)*                                       |
| Rake                       | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[Lien](#rake)*                     | *[Lien](https://github.com/ruby/rake)*                                         |
| Redis                      | `redis`                    | `>= 3.2`                 | `>= 3.2`                 | *[Lien](#redis)*                    | *[Lien](https://github.com/redis/redis-rb)*                                    |
| Resque                     | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[Lien](#resque)*                   | *[Lien](https://github.com/resque/resque)*                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[Lien](#rest-client)*              | *[Lien](https://github.com/rest-client/rest-client)*                           |
| Sequel                     | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[Lien](#sequel)*                   | *[Lien](https://github.com/jeremyevans/sequel)*                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[Lien](#shoryuken)*                | *[Lien](https://github.com/phstc/shoryuken)*                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[Lien](#sidekiq)*                  | *[Lien](https://github.com/mperham/sidekiq)*                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[Lien](#sinatra)*                  | *[Lien](https://github.com/sinatra/sinatra)*                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[Lien](#sneakers)*                 | *[Lien](https://github.com/jondot/sneakers)*                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`              | `>= 5.15.0`               | *[Lien](#stripe)*                   | *[Lien](https://github.com/stripe/stripe-ruby)*                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[Lien](#sucker-punch)*             | *[Lien](https://github.com/brandonhilkert/sucker_punch)*                       |

#### CI Visibility

Pour la solution CI Visibility Datadog, il est possible d'activer et de configurer l'instrumentation de bibliothèque à l'aide de l'API `Datadog.configure` suivante :

```ruby
Datadog.configure do |c|
  # Activer et configurer une intégration
  c.ci.instrument :integration_name, **options
end
```

`options` correspond aux arguments de mot-clé pour la configuration propre aux intégrations.

Voici la liste des intégrations CI Visibility disponibles :

| Nom      | Clé        | Versions prises en charge : MRI | Versions prises en charge : JRuby | Configuration    | Source Gem                                          |
|-----------|------------|-------------------------|---------------------------|---------------------|-----------------------------------------------------|
| Cucumber  | `cucumber` | `>= 3.0`                | `>= 1.7.16`               | *[Lien](#cucumber)* | *[Lien](https://github.com/cucumber/cucumber-ruby)* |
| RSpec     | `rspec`    | `>= 3.0.0`              | `>= 3.0.0`                | *[Lien](#rspec)*    | *[Lien](https://github.com/rspec/rspec)*            |

### Action Cable

L'intégration Action Cable permet de tracer les messages des broadcasts et les actions effectuées sur un canal.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_cable
end
```

### Action Mailer

L'intégration Action Mailer permet de tracer les actions ActionMailer pour la version 5 de Rails.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `email_data` | Indique si des métadonnées supplémentaires de charge utile sur les e-mails doivent être ajoutées aux spans `action_mailer.deliver`. Champs inclus : `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']`. | `false` |

### Action Pack

Action Pack est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_pack
end
```

### Action View

Action View est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `template_base_path` | Utilisé pour le parsing du nom du modèle. Si vous ne stockez pas vos modèles dans le dossier `views/`, vous devrez peut-être modifier cette valeur. | `'views/'` |

### Active Job

Active Job est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'active_job'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_job
end

ExampleJob.perform_later
```

### Active Model Serializers

L'intégration Active Model Serializers permet de tracer l'événement `serialize` pour les versions 0.9+ et l'événement `render` pour les versions 0.10+.

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_model_serializers
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

### Active Record

Active Record est généralement configuré en même temps qu'un framework Web (tel que Rails ou Sinatra), mais il est possible de le configurer séparément :

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `service_name` | Nom de service utilisé pour la partie base de données de l'instrumentation de `active_record`. | Nom de l'adaptateur de base de données (p. ex. `'mysql2'`) |

**Configurer les paramètres de tracing par base de données**

Il est possible de configurer les paramètres de tracing par connexion de base de données via l'option `describes` :

```ruby
# Ajouter une option `:describes` avec une clé de connexion.
# Toutes les clés suivantes sont acceptées et fonctionnent de façon similaire.
# Si un bloc est spécifié, cela renvoie un objet Settings
# qui accepte toutes les options de configuration énumérées ci-dessus.

Datadog.configure do |c|
  # Symbole correspondant à votre connexion de base de données dans config/database.yml
  # Uniquement disponible si vous utilisez Rails avec Active Record.
  c.tracing.instrument :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # Modèle de configuration du bloc.
  c.tracing.instrument :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # Chaîne de connexion avec les paramètres de connexion suivants :
  # adapter, username, host, port et database.
  # Les autres champs sont ignorés.
  c.use :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # Hash avec les paramètres de connexion suivants :
  # adapter, username, host, port, database.
  # Les autres champs sont ignorés.
  c.tracing.instrument :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'

  # Si vous utilisez le gem `makara`, il est possible de faire correspondre la connexion `role` :
  c.use :active_record, describes: { makara_role: 'primary' }, service_name: 'primary-db'
  c.use :active_record, describes: { makara_role: 'replica' }, service_name: 'secondary-db'
end
```

Vous pouvez également créer des configurations basées sur les correspondances partielles de champs de connexion de base de données :

```ruby
Datadog.configure do |c|
  # Correspond à n'importe quelle connexion sur le host `127.0.0.1`.
 c.tracing.instrument :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # Correspond à n'importe quelle connexion `mysql2`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # Correspond à n'importe quelle connexion `mysql2` à la base de données `reports`.
  #
  # Si plusieurs configurations `describe` correspondent, seule la dernière s'applique.
  # Ici, une connexion avec l'adaptateur `mysql` et la base de données `reports`
  # sera configurée avec `service_name: 'reports-db'`, et non `service_name: 'mysql-db'`.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

Lorsque plusieurs configurations `describes` correspondent à une connexion, la dernière règle configurée qui correspond est appliquée.

Si Active Record trace un événement qui utilise une connexion qui correspond à une clé définie par `describes`, les paramètres de tracing associés à cette connexion sont utilisés. Si la connexion ne correspond à aucune des connexions décrites, les paramètres par défaut définis par `c.tracing.instrument :active_record` sont utilisés à la place.

### Active Support

Active Support est généralement configuré en même temps que Rails, mais il est possible de l'activer séparément :

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| ---| --- | --- |
| `cache_service` | Nom de service utilisé pour la mise en cache avec l'instrumentation de `active_support`. | `active_support-cache` |

### AWS

L'intégration AWS permet de tracer l'ensemble des interactions (tels que les appels d'API) avec les services AWS (S3, ElastiCache etc.).

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# Exécuter l'appel tracé
Aws::S3::Client.new.list_buckets
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `aws` | `'aws'` |

### Concurrent Ruby

L'intégration Concurrent Ruby ajoute la prise en charge de la propagation de contexte lorsque `::Concurrent::Future` est utilisé.
De cette façon, il est possible de s'assurer que le code tracé dans `Future#execute` est associé au bon parent.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
# Dans l'initialiseur Rails ou un équivalent
Datadog.configure do |c|
  # Patcher ::Concurrent::Future pour utiliser un ExecutorService qui propage le contexte
  c.tracing.instrument :concurrent_ruby
end

# Passer le context au code exécuté dans Concurrent::Future
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end
```

### Cucumber

Lorsque vous utilisez le framework `cucumber`, l'intégration Cucumber trace toutes les exécutions de scénarios et d'étapes.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
require 'cucumber'
require 'ddtrace'

# Configurer l'intégration Cucumber par défaut
Datadog.configure do |c|
  c.ci.instrument :cucumber, **options
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

`options` correspond aux arguments de mot-clé suivants :

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
  c.tracing.instrument :dalli, **options
end

# Configurer le comportement de tracing de Dalli pour un client spécifique
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `dalli` | `'memcached'` |

### DelayedJob

L'intégration DelayedJob utilise des hooks de cycle de vie pour tracer les exécutions de tâches et les mises en file d'attente.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Elasticsearch

L'intégration Elasticsearch permet de tracer n'importe quel appel à `perform_request` depuis l'objet `Client` :

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :elasticsearch, **options
end

# Envoyer une requête à Elasticsearch
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'

# Si vous souhaitez utiliser des paramètres différents pour une instance client spécifique
Datadog.configure_onto(client.transport, **options)
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:show` avec un tableau de clés à ne pas quantifier (ou `:all` pour ignorer la quantification), ou `:exclude` avec un tableau de clés à exclure entièrement. | `{}` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `elasticsearch` | `'elasticsearch'` |

### Ethon

L'intégration `ethon` permet de tracer n'importe quelle requête HTTP par le biais d'objets `Easy` ou `Multi`. Notez que cette intégration prend également en charge la bibliothèque `Typhoeus`, qui est basée sur `Ethon`.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :ethon, **options

  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
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
  c.tracing.instrument :excon, **options

  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end

connection = Excon.new('https://example.com')
connection.get
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
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
  middlewares: Datadog::Tracing::Contrib::Excon::Middleware.with(options).around_default_stack
)

# Insérer le middleware dans une pile de middlewares personnalisée.
# Remarque : le middleware de tracing doit être inséré après le ResponseParser !
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Tracing::Contrib::Excon::Middleware.with(options),
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
  c.tracing.instrument :faraday, **options

  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end

# Si vous souhaitez utiliser des paramètres différents pour une instance client spécifique
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, **options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
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
  c.tracing.instrument :grape, **options
end

# Ensuite, définir votre application
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si Grape doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `error_statuses`| Définit un code de statut ou une plage de codes de statut qui doivent être considérés comme des erreurs. `'404,405,500-599'` ou `[404,405,'500-599']`. | `nil` |

### GraphQL

L'intégration GraphQL permet d'instrumenter les requêtes GraphQL.

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
# Dans l'initialiseur Rails ou un équivalent
Datadog.configure do |c|
  c.tracing.instrument :graphql, schemas: [YourSchema], **options
end

# Ensuite, exécuter une requête GraphQL
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

La méthode `instrument :graphql` accepte les paramètres suivants. Des options supplémentaires peuvent être spécifiées avec `options` :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `schemas` | Obligatoire. Tableau d'objets `GraphQL::Schema` à tracer. Le tracing sera activé pour tous les schémas énumérés, en utilisant les options spécifiées dans cette configuration. Si aucun schéma n'est spécifié, le tracing ne sera pas activé. | `[]` |
| `service_name` | Nom de service utilisé pour l'instrumentation de graphql | `'ruby-graphql'` |

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

Si vous avez opté pour la configuration manuelle, n'utilisez *pas* `instrument :graphql` dans `Datadog.configure` afin d'éviter que le tracing soit effectué en double. Ces deux modes de configuration du tracing de GraphQL ne doivent pas être utilisés en même temps.

### gRPC

L'intégration `grpc` permet d'ajouter des intercepteurs côté client et côté serveur, qui sont exécutés en tant que middleware avant l'appel de procédure à distance du service. Les applications gRPC étant souvent distribuées, l'intégration partage les données de tracing entre client et serveur.

Pour configurer votre intégration, utilisez la méthode `Datadog.configure` comme suit :

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :grpc, **options
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

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `grpc` | `'grpc'` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une requête entraîne une erreur. Un `Proc` qui accepte les paramètres `span` et `error`. Définit l'erreur sur la span par défaut. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

**Configurer des paramètres différents pour chaque client**

Lorsque plusieurs clients appellent plusieurs services différents, vous avez la possibilité de passer directement l'intercepteur Datadog :

```ruby
configured_interceptor = Datadog::Tracing::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

De cette façon, l'intégration fera en sorte que le `configured_interceptor` établisse une configuration de tracing unique pour cette instance client.

### hanami

L'intégration `hanami` effectuera l'instrumentation de routing, action et render pour votre application Hanami. Pour activer l'instrumentation `hanami`, il est recommandé de procéder à une instrumentation automatique avec ce qui suit :

```
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Créez ensuite un fichier d'initialiseur dans votre dossier `config/initializers` :

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `hanami`. | `nil` |

### http.rb

L'intégration http.rb permet de tracer n'importe quel appel HTTP effectué via le gem Http.rb.

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httprb, **options
  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `httprb`. | `'httprb'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |
| `error_status_codes` | Plage ou tableau de codes de statut HTTP devant être tracés en tant qu'erreurs. | `400...600` |

### httpclient

L'intégration httpclient permet de tracer n'importe quel appel HTTP effectué via le gem httpclient.

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httpclient, **options
  # SI nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service pour l'instrumentation de `httpclient`. | `'httpclient'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |
| `error_status_codes` | Plage ou tableau de codes de statut HTTP devant être tracés en tant qu'erreurs. | `400...600` |

### httpx

`httpx` gère sa [propre intégration avec `ddtrace`](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter) :

```ruby
require "ddtrace"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.tracing.instrument :httpx

  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end
```

### Kafka

L'intégration Kafka permet de tracer le gem `ruby-kafka` :

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'active_support/notifications' # nécessaire pour activer l'instrumentation 'ruby-kafka'
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :kafka
end
```

### MongoDB

L'intégration permet de tracer n'importe quelle `Command` envoyée depuis le [pilote Ruby pour MongoDB](https://github.com/mongodb/mongo-ruby-driver) vers un cluster MongoDB. De plus, les ODM (Object Document Mappers) tels que Mongoid qui utilisent le pilote Ruby officiel seront automatiquement instrumentés. Pour activer l'intégration, procédez simplement ainsi :

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mongo, **options
end

# Créer un client MongoDB et l'utiliser normalement
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# Si vous souhaitez utiliser des paramètres différents pour une instance client spécifique
Datadog.configure_onto(client, **options)
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:show` avec un tableau de clés à ne pas quantifier (ou `:all` pour ignorer la quantification), ou `:exclude` avec un tableau de clés à exclure entièrement. | `{ show: [:collection, :database, :operation] }` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `mongo` | `'mongodb'` |

**Configurer les paramètres de tracing par connexion**

Il est possible de configurer les paramètres de tracing par connexion via l'option `describes` :

```ruby
# Ajouter une option `:describes` avec une clé de connexion.
# Toutes les clés suivantes sont acceptées et fonctionnent de façon similaire.
# Si un bloc est spécifié, cela renvoie un objet Settings
# qui accepte toutes les options de configuration énumérées ci-dessus.

Datadog.configure do |c|
  # Chaîne pour la connexion réseau
  c.tracing.instrument :mongo, describes: '127.0.0.1:27017', service_name: 'mongo-primary'

  # Expression régulière pour la connexion réseau
  c.tracing.instrument :mongo, describes: /localhost.*/, service_name: 'mongo-secondary'
end

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# L'appel tracé appartiendra au service `mongo-primary`

client = Mongo::Client.new([ 'localhost:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# L'appel tracé appartiendra au service `mongo-secondary`
```

Lorsque plusieurs configurations `describes` correspondent à une connexion, la dernière règle configurée qui correspond est appliquée.

### MySQL2

L'intégration MySQL2 permet de tracer n'importe quelle commande SQL envoyée via le gem `mysql2`.

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `mysql2` | `'mysql2'` |
| `comment_propagation` | Mode de propagation des commentaires SQL pour la surveillance des bases de données.<br />(exemple : `disabled` \| `service`\| `full`). <br /><br />**Important** : *veuillez noter que l'activation de la propagation des commentaires SQL entraîne le stockage de données potentiellement confidentielles (noms des services) dans les bases de données ; ces données sont alors accessibles aux tierces parties ayant accès à la base de données.* | `'disabled'` |

### Net/HTTP

L'intégration Net/HTTP permet de tracer n'importe quel appel HTTP effectué via le module Net::HTTP de la bibliothèque standard.

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :http, **options

  # Si nécessaire, spécifier un nom de service différent pour les hostnames correspondant à une expression régulière
  c.tracing.instrument :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # Uniquement nécessaire si split_by_domain prend par défaut la valeur true
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `http` | `'net/http'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |
| `error_status_codes` | Plage ou tableau de codes de statut HTTP devant être tracés en tant qu'erreurs. | `400...600` |

Si vous souhaitez configurer chaque objet de connexion séparément, vous pouvez utiliser la méthode `Datadog.configure_onto` comme suit :

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```
### Postgres

L'intégration PG trace les commandes SQL envoyées via le gem `pg` par l'intermédiaire de :
* `exec`, `exec_params`, `exec_prepared` ;
* `async_exec`, `async_exec_params`, `async_exec_prepared` ; ou
* `sync_exec`, `sync_exec_params`, `sync_exec_prepared`.

```ruby
require 'pg'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `pg` | `'pg'` |
| `comment_propagation` | Mode de propagation des commentaires SQL pour la surveillance des bases de données.<br />(exemple : `disabled` \| `service`\| `full`). <br /><br />**Important** : *veuillez noter que l'activation de la propagation des commentaires SQL entraîne le stockage de données potentiellement confidentielles (noms des services) dans les bases de données ; ces données sont alors accessibles aux tierces parties ayant accès à la base de données.* | `'disabled'` |

### Presto

L'intégration Presto permet de tracer n'importe quelle commande SQL envoyée via le gem `presto-client`.

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :presto, **options
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

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `presto` | `'presto'` |

### Qless

L'intégration Qless utilise des hooks de cycle de vie pour tracer les exécutions de tâches.

Pour tracer une tâche Qless :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :qless, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `tag_job_data` | Activer le tagging avec des arguments de tâches. true pour l'activer, false pour le désactiver. | `false` |
| `tag_job_tags` | Activer le tagging avec des tags de tâches. true pour l'activer, false pour le désactiver. | `false` |

### Que

L'intégration Que est un middleware qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si Que doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `tag_args` | Activer le tagging du champ d'arguments d'une tâche. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `tag_data` | Activer le tagging du champ de données d'une tâche. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Racecar

L'intégration Racecar permet de tracer les tâches Racecar.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `racecar` | `'racecar'` |

### Rack

L'intégration Rack permet d'utiliser un middleware pour tracer toutes les requêtes avant qu'elles n'atteignent le framework ou l'application cible. Elle répond à l'interface minimale Rack, offrant des valeurs raisonnables qui peuvent être récupérées au niveau de Rack.

Cette intégration est automatiquement activée avec les frameworks Web tels que Rails. Si vous utilisez une application Rack standard, activez l'intégration dans votre `config.ru` :

```ruby
# Exemple de config.ru
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rack, **options
end

use Datadog::Tracing::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `application` | Votre application Rack. Obligatoire pour `middleware_names`. | `nil` |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `headers` | Hash d'en-têtes de requête ou de réponse HTTP à ajouter en tant que tags à `rack.request`. Accepte les clés `request` et `response` des valeurs sous forme de tableau, par exemple `['Last-Modified']`. Ajoute les tags `http.request.headers.*` et `http.response.headers.*` respectivement. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | Activez cette option pour utiliser la dernière classe middleware exécutée comme nom de ressource pour la span `rack`. Si cette option et l'instrumentation `rails` sont toutes les deux activées, `rails` a la priorité et définit le nom de ressource `rack` sur le contrôleur `rails` actif, le cas échéant. Nécessite l'option `application`. | `false` |
| `quantize` | Hash contenant les options de quantification. Possibilité d'utiliser `:query` ou `:fragment`. | `{}` |
| `quantize.base` | Définit la façon dont la base de l'URL (schéma, host et port) est gérée. Peut être défini sur `:show`, pour conserver la base de l'URL dans le tag `http.url` et ne pas définir le tag `http.base_url`, ou sur `nil` pour supprimer la base de l'URL du tag `http.url` par défaut, ce qui permet de conserver le chemin et définir le tag `http.base_url`. Cette option doit être imbriquée dans l'option `quantize`. | `nil` |
| `quantize.query` | Hash contenant les options propres à la requête lors de la quantification des URL. Possibilité d'utiliser `:show` ou `:exclude`. Voir les options ci-dessous. Cette option doit être imbriquée dans l'option `quantize`. | `{}` |
| `quantize.query.show` | Définit les valeurs à afficher systématiquement. Spécifiez un tableau de chaînes, `:all` pour afficher toutes les valeurs, ou `nil` pour n'afficher aucune valeur. Cette option doit être imbriquée dans l'option `query`. | `nil` |
| `quantize.query.exclude` | Définit les valeurs à supprimer dans leur intégralité. Spécifiez un tableau de chaînes, `:all` pour supprimer entièrement la chaîne de la requête, ou `nil` pour tout conserver. Cette option doit être imbriquée dans l'option `query`. | `nil` |
| `quantize.query.obfuscate` | Définit le comportement d'écriture des chaînes de requête. Spécifiez un hash d'options, `:internal` pour utiliser les paramètres d'obfuscation internes par défaut, ou `nil` pour désactiver l'obfuscation. Veuillez noter que l'obfuscation s'effectue au niveau des chaînes, et non des paires key-value. Lorsque l'obfuscation est activée, le paramètre `query.show` prend par défaut la valeur `:all` s'il n'était pas défini. Cette option doit être imbriquée dans l'option `query`. | `nil` |
| `quantize.query.obfuscate.with` | Définit la chaîne par laquelle les valeurs obfusquées sont remplacées. Spécifiez une chaîne. Cette option doit être imbriquée dans l'option `query.obfuscate`. | `'<censuré>'` |
| `quantize.query.obfuscate.regex` | Définit l'expression régulière servant à censurer la chaîne de requête. Spécifiez une expression régulière ou `:internal` afin d'utiliser l'expression régulière interne par défaut (afin de censurer les données sensibles les plus courantes). Chaque valeur correspondant à l'expression régulière est entièrement censurée et remplacée par la valeur de `query.obfuscate.with`. Cette option doit être imbriquée dans l'option `query.obfuscate`. | `:internal` |
| `quantize.fragment` | Définit la façon dont les fragments d'URL sont gérés. Spécifiez `:show` pour afficher les fragments d'URL ou `nil` pour les masquer. Cette option doit être imbriquée dans l'option `quantize`. | `nil` |
| `request_queuing` | Surveille le temps que la requête HTTP passe dans la file d'attente du serveur frontend. Consultez la rubrique [Mise en file d'attente des requêtes HTTP](#mise-en-file-d-attente-des-requetes-http) pour découvrir comment configurer cette option. | `false` |
| `web_service_name` | Nom de service pour les spans de mise en file d'attente des requêtes sur le serveur frontend. (Ex. : `'nginx'`) | `'web-server'` |

Modifications apportées aux options :
- Dans une prochaine version, la valeur par défaut de `quantize.base` sera définie sur `:show` et non plus sur `:exclude`. Il est recommandé d'effectuer soi-même ce changement.
- Dans une prochaine version, la valeur par défaut de `quantize.query.show` sera définie sur `:all`. De même, `quantize.query.obfuscate` sera par défaut défini sur `:internal`. Il est recommandé d'effectuer soi-même ces changements.

**Configurer le comportement de quantification des URL**

```ruby
Datadog.configure do |c|
  # Comportement par défaut : toutes les valeurs sont quantifiées ; la base et le fragment sont supprimés.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by
  # http://example.com:8080/path?categories[]=1&categories[]=2 --> /path?categories[]

  # Supprimer la base de l'URL (schéma, host, port)
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :exclude }

  # Afficher la base de l'URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :show }

  # Afficher les valeurs de tous les paramètres de chaîne de requête correspondant précisément à 'category_id'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by
  c.tracing.instrument :rack, quantize: { query: { show: ['category_id'] } }

  # Afficher toutes les valeurs de tous les paramètres de chaîne de requête
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { show: :all } }

  # Exclure l'intégralité des paramètres de chaîne de requête correspondant précisément à 'sort_by'
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id
  c.tracing.instrument :rack, quantize: { query: { exclude: ['sort_by'] } }

  # Supprimer entièrement la chaîne de requête
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path
  c.tracing.instrument :rack, quantize: { query: { exclude: :all } }

  # Afficher les fragments d'URL
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { fragment: :show }

  # Obfusquer la chaîne de requête, avec un comportement par défaut permettant d'afficher toutes les valeurs
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: {} } }

  # Obfusquer la chaîne de requête à l'aide de l'expression régulière fournie, avec un comportement par défaut permettant d'afficher toutes les valeurs
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { regex: /category_id=\d+/ } } }

  # Obfusquer la chaîne de requête à l'aide d'une chaîne d'écriture personnalisée
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?REMOVED&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { with: 'REMOVED' } } }
end
```

### Rails

L'intégration Rails permet de tracer les requêtes, les appels de base de données, le rendu des modèles ainsi que les opérations read/write/delete du cache. L'intégration exploite l'instrumentation d'Active Support en écoutant l'API Notification de façon à tracer chaque opération instrumentée par l'API.

Pour activer l'instrumentation Rails, créez un fichier initialiseur dans votre dossier `config/initializers` :

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `request_queuing` | Surveille le temps que la requête HTTP passe dans la file d'attente du serveur frontend. Consultez la rubrique [Mise en file d'attente des requêtes HTTP](#mise-en-file-d-attente-des-requetes-http) pour découvrir comment configurer cette option. | `false` |
| `exception_controller` | Classe ou module qui identifie une classe de contrôleur d'exception personnalisé. Le traceur offre une gestion améliorée des erreurs lorsqu'il peut identifier les contrôleurs d'exception personnalisés. Par défaut, lorsque cette option n'est pas définie, le traceur « devine » à quoi ressemble un contrôleur d'exception personnalisé. Cette option facilite leur identification. | `nil` |
| `middleware` | Ajoute le middleware de tracing à l'application Rails. Définir sur `false` pour ne pas charger le middleware. | `true` |
| `middleware_names` | Permet aux requêtes de middleware court-circuitées d'afficher le nom du middleware en tant que ressource pour la trace. | `false` |
| `service_name` | Nom de service utilisé lors du tracing de requêtes d'application (au niveau de `rack`) | `'<nom_app>'` (récupéré à partir de l'espace de nommage de votre application Rails) |
| `template_base_path` | Utilisé pour le parsing du nom du modèle. Si vous ne stockez pas vos modèles dans le dossier `views/`, vous devrez peut-être modifier cette valeur. | `'views/'` |

**Versions prises en charge**

| Versions MRI  | Versions JRuby | Versions Rails |
| ------------- | -------------- | -------------- |
|  2.1          |                |  3.2-4.2     |
|  2.2-2.3    |                |  3.2-5.2     |
|  2.4          |                |  4.2.8-5.2   |
|  2.5          |                |  4.2.8-6.1   |
|  2.6-2.7    |  9.2           |  5.0-6.1     |
|  3.0          |                |  6.1           |

### Rake

Il est possible d'instrumenter vos tâches Rake en activant l'intégration `rake` et en fournissant la liste des tâches à instrumenter.

**Évitez d'instrumenter des tâches Rake à exécution longue, car elles peuvent agréger des traces volumineuses en mémoire qui ne sont vidées qu'à la fin de la tâche.**

Pour les tâches à exécution longue, procédez à une [instrumentation manuelle](#instrumentation-manuelle) autour des chemins de code récurrents.

Pour activer le tracing des tâches Rake, ajoutez ce qui suit à votre `Rakefile` :

```ruby
# Au début de votre Rakefile :
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # Spécifier votre tâche…
end

Rake::Task['my_task'].invoke
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si les tâches Rake doivent être tracées ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `quantize` | Hash contenant les options de quantification des arguments de tâche. Des détails supplémentaires et des exemples sont disponibles plus bas. | `{}` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rake` | `'rake'` |
| `tasks` | Nom des tâches Rake à instrumenter | `[]` |

**Configurer le comportement de quantification des tâches**

```ruby
Datadog.configure do |c|
  # On considère une tâche qui accepte :one, :two, :three…
  # L'invocation se fait avec 'foo', 'bar', 'baz'.

  # Comportement par défaut : tous les arguments sont quantifiés.
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?', three: '?' }
  c.tracing.instrument :rake

  # Afficher les valeurs pour l'argument :two uniquement
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: 'bar', three: '?' }
  c.tracing.instrument :rake, quantize: { args: { show: [:two] } }

  # Afficher les valeurs pour tous les arguments.
  # `rake.invoke.args` tag  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` tag --> { one: 'foo', two: 'bar', three: 'baz' }
  c.tracing.instrument :rake, quantize: { args: { show: :all } }

  # Exclure entièrement l'argument :three
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?' }
  c.tracing.instrument :rake, quantize: { args: { exclude: [:three] } }

  # Supprimer entièrement les arguments
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> {}
  c.tracing.instrument :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

L'intégration Redis permet de tracer les appels simples ainsi que les pipelines.

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Exécuter les commandes Redis
redis = Redis.new
redis.set 'foo', 'bar'
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `redis` | `'redis'` |
| `command_args` | Affiche les arguments de la commande (p. ex., `key` pour `GET key`) en tant que nom de ressource et tag. | true |

**Configuration des paramètres de trace par instance**

Pour la version 5 de Redis et les versions ultérieures :

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # L'instrumentation de l'intégration doit quand même être activée
end

customer_cache = Redis.new(custom: { datadog: { service_name: 'custom-cache' } })
invoice_cache = Redis.new(custom: { datadog: { service_name: 'invoice-cache' } })

# L'appel tracé appartiendra au service `customer-cache`
customer_cache.get(...)
# L'appel tracé appartiendra au service `invoice-cache`
invoice_cache.get(...)
```

Pour les versions de Redis antérieures à la version 5 :

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # L'instrumentation de l'intégration doit quand même être activée
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure_onto(customer_cache, service_name: 'customer-cache')
Datadog.configure_onto(invoice_cache, service_name: 'invoice-cache')

# L'appel tracé appartient au service `customer-cache`
customer_cache.get(...)
# L'appel tracé appartient au service `invoice-cache`
invoice_cache.get(...)
```

**Configurer les paramètres de tracing par connexion**

Il est possible de configurer les paramètres de tracing par connexion via l'option `describes` :

```ruby
# Ajouter une option `:describes` avec une clé de connexion.
# Toutes les clés suivantes sont acceptées et fonctionnent de façon similaire.
# Si un bloc est spécifié, cela renvoie un objet Settings
# qui accepte toutes les options de configuration énumérées ci-dessus.

Datadog.configure do |c|
  # La configuration par défaut pour les clients Redis
  c.tracing.instrument :redis, service_name: 'redis-default'

  # La configuration correspondant à un socket Unix donné.
  c.tracing.instrument :redis, describes: { url: 'unix://chemin/vers/fichier' }, service_name: 'redis-unix'

  # Pour les connexions réseau, la recherche de correspondance tient uniquement compte des champs suivants :
  # scheme, host, port, db
  # Tous les autres champs sont ignorés.

  # Chaîne de connexion réseau
  c.tracing.instrument :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.tracing.instrument :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # Hash client réseau
  c.tracing.instrument :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # Sous-ensemble du hash de connexion uniquement
  c.tracing.instrument :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.tracing.instrument :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

Lorsque plusieurs configurations `describes` correspondent à une connexion, la dernière règle configurée qui correspond est appliquée.

### Resque

L'intégration Resque utilise des hooks Resque qui viennent entourer la méthode `perform`.

Pour tracer une tâche Resque :

```ruby
require 'resque'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Rest Client

L'intégration `rest-client` est disponible via le middleware `ddtrace` :

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rest_client`. | `'rest_client'` |
| `split_by_domain` | Définir sur `true` pour utiliser le domaine de requête comme nom de service. | `false` |

### RSpec

Lorsque vous utilisez le framework de test `rspec`, l'intégration RSpec trace toutes les exécutions d'exemples et de groupes d'exemples 

Pour activer votre intégration, utilisez la méthode `Datadog.configure` :

```ruby
require 'rspec'
require 'ddtrace'

# Configurer une intégration RSpec par défaut
Datadog.configure do |c|
  c.ci.instrument :rspec, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si les tests RSpec doivent être tracés ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `service_name` | Nom de service utilisé pour l'instrumentation de `rspec`. | `'rspec'` |
| `operation_name` | Nom de l'opération utilisée pour l'instrumentation de `rspec`. Utile si vous souhaitez renommer les métriques de traces automatiques, par exemple `trace.#{nom_opération}.errors`. | `'rspec.example'` |

### Sequel

L'intégration Sequel permet de tracer les requêtes envoyées à votre base de données.

```ruby
require 'sequel'
require 'ddtrace'

# Se connecter à la base de données
database = Sequel.sqlite

# Créer une table
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.tracing.instrument :sequel, **options
end

# Exécuter une requête
articles = database[:articles]
articles.all
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `service_name` | Nom de service utilisé pour l'instrumentation de `sequel` | Nom de l'adaptateur de base de données (p. ex. `'mysql2'`) |

**Configurer des paramètres différents pour chaque base de données**

Si vous utilisez plusieurs bases de données avec Sequel, vous pouvez définir des paramètres différents pour chacune d'entre elles en configurant leurs objets `Sequel::Database` respectifs :

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# Configurer chaque base de données avec des noms de service différents
Datadog.configure_onto(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure_onto(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

L'intégration Shoryuken est un middleware exécuté côté serveur qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `tag_body` | Spans de tag avec le corps de message SQS `true` ou `false` | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Sidekiq

L'intégration Sidekiq est un middleware exécuté côté client et côté serveur qui permet de tracer les mises en file d'attente et les exécutions des tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `tag_args` | Activer le tagging des arguments des tâches. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize` | Hash contenant les options de quantification des arguments de tâche. | `{}` |

### Sinatra

L'intégration Sinatra permet de tracer les requêtes et le rendu des modèles.

Pour commencer à utiliser le client de tracing, assurez-vous d'importer `ddtrace` et `instrument :sinatra` après `sinatra` ou `sinatra/base`, et avant de définir votre application/vos routages :

#### Application classique

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
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
  c.tracing.instrument :sinatra, **options
end

class NestedApp < Sinatra::Base
  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

#### Options d'instrumentation

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `distributed_tracing` | Active le [tracing distribué](#tracing-distribue) de façon à associer les traces de ce service aux traces d'autres services si des en-têtes de tracing sont reçus. | `true` |
| `headers` | Hash d'en-têtes de requête ou de réponse HTTP à ajouter en tant que tags à `sinatra.request`. Accepte les clés `request` et `response` des valeurs sous forme de tableau, par exemple `['Last-Modified']`. Ajoute les tags `http.request.headers.*` et `http.response.headers.*` respectivement. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | Ajouter le nom du script devant les noms des ressources | `false` |

### Sneakers

L'intégration Sneakers est un middleware exécuté côté serveur qui permet de tracer les exécutions de tâches.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si Sneakers doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |
| `tag_body` | Activer le tagging des messages des tâches. `true` pour l'activer, `false` pour le désactiver. | `false` |
| `error_handler` | Gestionnaire d'erreurs personnalisé appelé lorsqu'une tâche renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit une erreur sur la span par défaut. Utile pour ignorer les erreurs temporaires. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

### Stripe

L'intégration Stripe trace les requêtes de l'API Stripe.

Vous pouvez l'activer via `Datadog.configure` :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

`options` correspond aux arguments de mot-clé suivants :

| Clé | Description | Valeur par défaut |
| --- | ----------- | ------- |
| `enabled` | Définit si Stripe doit être tracé ou non. Utile pour désactiver le tracing temporairement. `true` ou `false`. | `true` |

### Sucker Punch

L'intégration `sucker_punch` permet de tracer toutes les tâches planifiées :

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch
end

# L'exécution de cette opération est tracée.
LogJob.perform_async('login')
```

## Configuration supplémentaire

Pour modifier le comportement par défaut du tracing Datadog, vous pouvez définir des variables d'environnement ou spécifier des options personnalisées dans un bloc `Datadog.configure`. Exemple :

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = ENV['RACK_ENV']

  c.tracing.report_hostname = true
  c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
end
```

**Options de configuration disponibles :**

| Paramètre                                                 | Variable d'environnement                        | Valeur par défaut                                                           | Description                                                                                                                                                                                                                               |
|---------------------------------------------------------|--------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Global**                                              |                                |                                                                   |                                                                                                                                                                                                                                           |
| `agent.host`                                            | `DD_AGENT_HOST`                | `127.0.0.1`                                                       | Hostname de l'Agent auquel les données de trace sont envoyées.                                                                                                                                                                                       |
| `agent.port`                                            | `DD_TRACE_AGENT_PORT`          | `8126`                                                            | Port du host de l'Agent auquel les données de trace doivent être envoyées. Si, dans la [configuration de l'Agent](#configurer-l-ingestion-des-donnees-de-trace), `receiver_port` ou `DD_APM_RECEIVER_PORT` est défini sur une valeur autre que la valeur `8126` par défaut, alors `DD_TRACE_AGENT_PORT` ou `DD_TRACE_AGENT_URL` doit avoir la même valeur.         |
|                                                         | `DD_TRACE_AGENT_URL`           | `nil`                                                             | Permet de définir l'endpoint d'URL auquel les traces sont envoyées. Cette option est prioritaire par rapport à `agent.host` et `agent.port`. Si, dans la [configuration de l'Agent](#configurer-l-ingestion-des-donnees-de-trace), `receiver_port` ou `DD_APM_RECEIVER_PORT` est défini sur une valeur autre que la valeur `8126` par défaut, alors `DD_TRACE_AGENT_PORT` ou `DD_TRACE_AGENT_URL` doit avoir la même valeur.                |
| `diagnostics.debug`                                     | `DD_TRACE_DEBUG`               | `false`                                                           | Permet d'activer ou de désactiver le mode debugging et d'afficher des logs détaillés. **Il est déconseillé d'utiliser cette option pour les environnements de production ou d'autres environnements sensibles.** Consultez la rubrique [Debugging et diagnostic](#debugging-et-diagnostic) pour en savoir plus.                                    |
| `diagnostics.startup_logs.enabled`                      | `DD_TRACE_STARTUP_LOGS`        | `nil`                                                             | Permet d'indiquer le diagnostic et la configuration de lancement dans un log, et ainsi d'évaluer l'état du tracing au démarrage de l'application. Consultez la rubrique [Debugging et diagnostic](#debugging-et-diagnostic) pour en savoir plus.                                                 |
| `env`                                                   | `DD_ENV`                       | `nil`                                                             | L'environnement de votre application (p. ex. `production`, `staging`, etc.). Cette valeur est définie en tant que tag pour toutes les traces.                                                                                                                              |
| `service`                                               | `DD_SERVICE`                   | *Nom de fichier Ruby*                                                   | Le nom de service par défaut de votre application (p. ex., `billing-api`). Cette valeur est définie en tant que tag pour toutes les traces.                                                                                                                                   |
| `tags`                                                  | `DD_TAGS`                      | `nil`                                                             | Tags personnalisés sous forme de paires de valeurs séparées par des `,` (p. ex., `layer:api,team:intake`). Ces tags sont définis pour toutes les traces. Consultez la rubrique [Environnement et tags](#environnement-et-tags) pour en savoir plus.                                                          |
| `time_now_provider`                                     |                                | `->{ Time.now }`                                                  | Permet de modifier la façon dont l'heure est récupérée. Consultez la rubrique [Définir le fournisseur de temps](#definir-le-fournisseur-de-temps) pour en savoir plus.                                                                                                                              |
| `version`                                               | `DD_VERSION`                   | `nil`                                                             | La version de votre application (p. ex., `2.5`, `202003181415`, `1.3-alpha`, etc.). Cette valeur est définie en tant que tag pour toutes les traces.                                                                                                                        |
| `telemetry.enabled`                                     | `DD_INSTRUMENTATION_TELEMETRY_ENABLED` | `false`                                                             | Cette option vous permet d'activer l'envoi des données de télémétrie à Datadog. Dans une prochaine version, cette option sera définie par défaut sur `true`, tel qu'indiqué [dans cette rubrique](https://docs.datadoghq.com/tracing/configure_data_security/#collecte-de-donnees-de-telemetrie).                                                                                                                                                                                          |
| **Tracing**                                             |                                |                                                                   |                                                                                                                                                                                                                                           |
| `tracing.analytics.enabled`                             | `DD_TRACE_ANALYTICS_ENABLED`   | `nil`                                                             | Permet d'activer ou de désactiver l'analyse des traces. Consultez la rubrique [Échantillonnage](#echantillonnage) pour en savoir plus.                                                                                                                                                          |
| `tracing.distributed_tracing.propagation_extract_style` | `DD_TRACE_PROPAGATION_STYLE_EXTRACT` | `['Datadog','b3multi','b3']` | Formats de propagation du tracing distribué à extraire. Remplace l'option `DD_TRACE_PROPAGATION_STYLE`. Consultez la rubrique [Tracing distribué](#tracing-distribue) pour en savoir plus.                                                                             |
| `tracing.distributed_tracing.propagation_inject_style`  | `DD_TRACE_PROPAGATION_STYLE_INJECT`  | `['Datadog']`                                                     | Formats de propagation du tracing distribué à injecter. Remplace l'option `DD_TRACE_PROPAGATION_STYLE`. Consultez la rubrique [Tracing distribué](#tracing-distribue) pour en savoir plus.                                                                              |
| `tracing.distributed_tracing.propagation_style`         | `DD_TRACE_PROPAGATION_STYLE` | `nil` | Formats de propagation du tracing distribué à extraire et injecter. Consultez la rubrique [Tracing distribué](#tracing-distribue) pour en savoir plus. |
| `tracing.enabled`                                       | `DD_TRACE_ENABLED`             | `true`                                                            | Permet d'activer ou de désactiver le tracing. Si cette option est définie sur `false`, l'instrumentation continue à s'exécuter, mais aucune trace n'est envoyée à l'Agent de trace.                                                                                                                 |
| `tracing.instrument(<nom-intégration>, <options...>)`  |                                |                                                                   | Permet d'activer l'instrumentation d'une bibliothèque spécifique. Consultez la rubrique [Instrumenter des intégrations](#instrumenter-des-integrations) pour en savoir plus.                                                                                                       |
| `tracing.log_injection`                                 | `DD_LOGS_INJECTION`            | `true`                                                            | Permet d'injecter des informations sur la [mise en corrélation des traces](#mise-en-correlation-des-traces) dans les logs Rails, le cas échéant. Prend en charge le logger par défaut (`ActiveSupport::TaggedLogging`), `lograge` et `semantic_logger`.                                                   |
| `tracing.partial_flush.enabled`                         |                                | `false`                                                           | Permet d'activer ou de désactiver un vidage partiel, afin d'envoyer les parties complètes d'une trace à l'Agent. Cette option est particulièrement utile lorsque le tracing instrumente des tâches longues (p. ex., des jobs) avec de nombreuses spans.                                                  |
| `tracing.partial_flush.min_spans_threshold`             |                                | `500`                                                             | Nombre de spans qui doivent être finalisées dans une trace avant d'être envoyées via le processus de vidage partiel.                                                                                                                              |
| `tracing.sampler`                                       |                                | `nil`                                                             | Utilisation avancée uniquement. Permet de définir une instance `Datadog::Tracing::Sampling::Sampler`. Lorsque cette option est définie, le traceur utilise ce service d'échantillonnage pour déterminer quel comportement adopter pour l'échantillonnage. Consultez la rubrique [Échantillonnage côté application](#echantilonnage-cote-application) pour en savoir plus. |
| `tracing.sampling.default_rate`                         | `DD_TRACE_SAMPLE_RATE`         | `nil`                                                             | Permet de définir le taux d'échantillonnage des traces entre `0.0` (0 %) et `1.0` (100 %). Consultez la rubrique [Échantillonnage côté application](#echantillonnage-cote-application) pour en savoir plus.                                                                                                  |
| `tracing.sampling.rate_limit`                           | `DD_TRACE_RATE_LIMIT`          | `100` (par seconde)                                                | Permet de définir le nombre maximum de traces par seconde à échantillonner. Définissez une limite de débit pour éviter de décupler votre volume d'ingestion en cas de pic de trafic.                                                                    |
| `tracing.sampling.span_rules`                           | `DD_SPAN_SAMPLING_RULES`,`ENV_SPAN_SAMPLING_RULES_FILE` | `nil`                                    | Permet de définir des règles pour l'[échantillonnage de spans uniques](#echantillonnage-de-spans-uniques). Ces règles vous permettent de conserver des spans, même après que leurs traces respectives aient été ignorées.                                                                                              |
| `tracing.trace_id_128_bit_generation_enabled` | `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED` | `false` | Définissez cette option sur `true` pour générer un ID de trace de 128 bits ou sur `false` pour générer un ID de trace de 64 bits.  |
| `tracing.report_hostname`                               | `DD_TRACE_REPORT_HOSTNAME`     | `false`                                                           | Permet d'ajouter le tag de hostname aux traces.                                                                                                                                                                                                              |
| `tracing.test_mode.enabled`                             | `DD_TRACE_TEST_MODE_ENABLED`   | `false`                                                           | Permet d'activer ou de désactiver le mode test, afin d'utiliser le tracing dans des collections de tests.                                                                                                                                                                         |
| `tracing.test_mode.trace_flush`                         |                                | `nil`                                                             | Objet qui détermine le comportement à adopter pour le vidage des traces.                                                                                                                                                                                           |

#### Logging personnalisé

Par défaut, tous les logs sont traités par le logger Ruby de base. Lorsque vous utilisez Rails, les messages s'affichent dans le fichier de log de votre application.

Les messages de log du client Datadog sont indiqués par `[ddtrace]`. Vous pouvez donc les isoler des autres messages.

Vous pouvez également utiliser un logger personnalisé à la place du logger par défaut. Pour ce faire, utilisez le paramètre `log`.

```ruby
f = File.new("my-custom.log", "w+") # Les messages de code doivent être ajoutés ici
Datadog.configure do |c|
  c.logger.instance = Logger.new(f) # Remplacer le logger par défaut
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "Ceci est généralement appelé par le code de tracing" }
```

#### Environnement et tags

Par défaut, l'Agent de trace (c'est-à-dire le programme exécuté en arrière-plan pour recueillir les données des différents clients, et non cette bibliothèque) utilise les tags définis dans le fichier de configuration de l'Agent. Vous pouvez configurer l'application de façon à taguer automatiquement vos traces et vos métriques à l'aide des variables d'environnement suivantes :

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

#### Debugging et diagnostic

Vous pouvez générer des diagnostics sur le tracing de deux façons différentes :

##### Activer le mode debugging

Lorsque vous activez le mode debugging de la bibliothèque, vous bénéficiez de logs détaillés sur les activités de tracing. Ces logs contiennent notamment les erreurs supprimées. Ils peuvent vous aider à identifier les erreurs ou à confirmer la sortie des traces pour l'Agent.

Pour activer le mode debugging, définissez `diagnostics.debug = true` ou `DD_TRACE_DEBUG`.

```ruby
Datadog.configure { |c| c.diagnostics.debug = true }
```

**Datadog recommande de ne PAS utiliser cette fonctionnalité dans des environnements de production ou des environnements confidentiels**, car une charge importe peut générer des logs extrêmement détaillés. Le mode debugging est davantage destiné aux environnements dans lesquels vous contrôlez la charge des applications.

##### Activer les logs de lancement

Les logs de lancement fournissent une synthèse de l'état du tracing lors de la première configuration de l'application. Ils vous permettent de vérifier que la configuration et l'instrumentation ont été correctement activés.

Pour activer les logs de lancement, définissez `diagnostics.startup_logs.enabled = true` ou `DD_TRACE_STARTUP_LOGS`.

```ruby
Datadog.configure { |c| c.diagnostics.startup_logs.enabled = true }
```

Par défaut, les logs de lancement sont activés lorsque `ddtrace` détecte que l'application s'exécute dans un environnement autre qu'un environnement de développement.

### Échantillonnage

Référez-vous à la section [Mécanismes d'ingestion](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby) pour consulter la liste de toutes les options d'échantillonnage disponibles.

#### Échantillonnage prioritaire

L'échantillonnage prioritaire permet de déterminer si une trace doit être conservée ou non en fonction d'un attribut de priorité qui est appliqué aux traces distribuées. La valeur de cet attribut renseigne l'Agent et le backend sur l'importance de la trace.

Le service d'échantillonnage peut définir la priorité sur les valeurs suivantes :

 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_REJECT` : le service d'échantillonnage a automatiquement décidé de rejeter la trace.
 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_KEEP` : le service d'échantillonnage a automatiquement décidé de conserver la trace.

L'échantillonnage prioritaire est activé par défaut. Cette fonctionnalité vous permet de vous assurer que vos traces distribuées sont échantillonnées de façon exhaustive. Une fois activé, le service d'échantillonnage attribue automatiquement une priorité de 0 ou de 1 aux traces en fonction de leur service et de leur volume.

Vous pouvez également définir manuellement cette priorité pour supprimer une trace non pertinente ou conserver une trace importante. Pour ce faire, définissez `TraceOperation#sampling_priority` sur :

 - `Datadog::Tracing::Sampling::Ext::Priority::USER_REJECT` : l'utilisateur a demandé à rejeter la trace.
 - `Datadog::Tracing::Sampling::Ext::Priority::USER_KEEP` : l'utilisateur a demandé à conserver la trace.

Lorsque vous n'utilisez pas le [tracing distribué](#tracing-distribue), vous pouvez modifier la priorité d'une trace à tout moment tant que celle-ci n'est pas finalisée. Cependant, pour que votre changement soit pertinent, vous devez l'effectuer avant toute propagation de contexte (p. ex. avant un fork ou des appels RPC). Dans le cas contraire, les éléments d'une trace distribuée n'auront pas tous la même priorité, et certains éléments seront conservés tandis que d'autres seront rejetés. La trace risquerait alors d'être partiellement stockée et de ne pas être finalisée.

Pour cette raison, si vous modifiez la priorité, il est conseillé de le faire le plus tôt possible.

Pour modifier la priorité de l'échantillonnage, vous pouvez utiliser les méthodes suivantes :

```ruby
# Rejeter la trace active
Datadog::Tracing.reject!

# Conserver la trace active
Datadog::Tracing.keep!
```

L'utilisation de `Datadog::Tracing.reject!` et de `Datadog::Tracing.keep!` lorsqu'aucune trace n'est active n'entraîne aucune erreur.

Vous pouvez également rejeter une instance de trace spécifique :

```ruby
# Accéder d'abord à la span active
trace = Datadog::Tracing.active_trace

# Rejeter la trace
trace.reject!

# Conserver la trace
trace.keep!
```

#### Échantillonnage de spans uniques

Vous pouvez configurer une règle d'échantillonnage afin de conserver des spans même après que leurs traces respectives ait été ignorées par une règle d'échantillonnage propre aux traces.

Vous pouvez ainsi garder vos spans importantes lorsque les traces sont échantillonnées. Il n'est pas possible d'ignorer des spans à l'aide de cette fonctionnalité.

Pour configurer l'échantillonnage de spans uniques, consultez la section [Mécanismes d'ingestion](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby#spans-uniques).

#### Échantillonnage côté application

Bien que l'Agent Datadog puisse échantillonner les traces pour réduire la bande passante utilisée, l'échantillonnage côté application permet quant à lui d'améliorer les performances de l'application hôte.

**L'échantillonnage côté application supprime le plus tôt possible les traces. Par conséquent, la page relative aux [commandes d'ingestion](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/) ne dispose pas de suffisamment d'informations pour calculer avec précision les taux d'échantillonnage. Utilisez donc uniquement l'échantillonnage côté application lorsque vous devez absolument réduire la charge du tracing.**

Si vous utilisez cette fonctionnalité, n'hésitez pas à [ouvrir un problème sur GitHub](https://github.com/DataDog/dd-trace-rb/issues/new) pour nous faire part de votre avis à son sujet. Nous serons ainsi plus à même de comprendre vos besoins et de vous aider à les satisfaire.

Vous pouvez configurer l'*échantillonnage côté application* à l'aide des paramètres suivants :

```ruby
# Échantillonnage côté application activé : les données de la page Ingestion Controls ne seront pas précises.
sampler = Datadog::Tracing::Sampling::RateSampler.new(0.5) # Échantillonner 50 % des traces

Datadog.configure do |c|
  c.tracing.sampler = sampler
end
```

Consultez la rubrique [Configuration supplémentaire](#configuration-supplementaire) pour en savoir plus sur ces paramètres.

### Tracing distribué

Le tracing distribué permet à vos traces d'être propagées sur plusieurs applications instrumentées, de façon à ce qu'une requête forme une trace unique et non une trace séparée pour chaque service.

Pour tracer des requêtes sur plusieurs applications différentes, les données suivantes doivent se propager d'une application à l'autre :

| Propriété              | Type    | Description                                                                                                                 |
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

#### Formats des en-têtes distribués

Le tracing prend en charge les formats de traces distribuées suivants :

 - `Datadog` : **valeur par défaut**
 - `b3multi` : [en-têtes B3 multiples](https://github.com/openzipkin/b3-propagation#multiple-headers)
 - `b3` : [en-tête B3 unique](https://github.com/openzipkin/b3-propagation#single-header)
 - `tracecontext` : [contexte de trace W3C](https://www.w3.org/TR/trace-context/)
 - `none` : aucune opération.

Vous pouvez activer ou désactiver l'utilisation de ces formats à l'aide de `Datadog.configure` :

```ruby
Datadog.configure do |c|
  # Liste des formats d'en-têtes à extraire
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # Liste des formats d'en-tête à injecter
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

**Activer le tracing distribué pour des intégrations**

De nombreuses intégrations incluses dans `ddtrace` prennent en charge le tracing distribué. Le tracing distribué est activé par défaut dans l'Agent v7 et la plupart des versions de l'Agent v6. Si nécessaire, il peut être activé via les paramètres de configuration.

- Si votre application reçoit des requêtes envoyées par des services pour lesquels le tracing distribué est activé, vous devez activer le tracing distribué pour les intégrations qui gèrent ces requêtes (telles que Rails).
- Si votre application envoie des requêtes à des services pour lesquels le tracing distribué est activé, vous devez activer le tracing distribué pour les intégrations qui envoient ces requêtes (telles que Faraday).
- Si votre application envoie et reçoit des requêtes nécessitant un tracing distribué, elle doit activer toutes les intégrations qui gèrent ces requêtes.

Pour découvrir comment activer le tracing distribué pour ces intégrations, consultez leur documentation :

- [Excon](#excon)
- [Faraday](#faraday)
- [Rest Client](#rest-client)
- [Net/HTTP](#net-http)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#httprb)
- [httpclient](#httpclient)
- [httpx](#httpx)

**Utiliser le propagateur HTTP**

Pour faciliter la propagation de ces métadonnées, vous pouvez utiliser le module `Datadog::Tracing::Propagation::HTTP`.

Côté client :

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # Injecter les en-têtes de traces dans les en-têtes de requêtes (`env` doit être un hash)
  Datadog::Tracing::Propagation::HTTP.inject!(trace.to_digest, env)
end
```

Côté serveur :

```ruby
trace_digest = Datadog::Tracing::Propagation::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # Tâche en ligne...
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

Vous devez ensuite activer la fonctionnalité de mise en file d'attente des requêtes. La configuration `:request_queuing` accepte les options suivantes :

| Option             | Description |
| ------------------ | ----------- |
| `:include_request` | Une span `http_server.queue` constitue la span racine d'une trace. Elle comprend la durée totale du traitement de la requête *et* la durée d'attente de la requête avant le début de son traitement. Cette logique s'applique lorsque l'option est définie sur `true`. Cette configuration est sélectionnée lorsque l'option est `true`. |
| `:exclude_request` | Une span `http.proxy.request` constitue la span racine d'une trace. La durée de la span enfant `http.proxy.queue` représente uniquement la durée d'attente de la requête avant le début de son traitement. *Il s'agit d'une fonctionnalité expérimentale.* |

Si votre application est basée sur Rack, consultez la [documentation](#rack) dédiée pour en savoir plus.

### Pipeline de traitement

Certaines applications nécessitent que les traces soient modifiées ou filtrées avant d'être envoyées à Datadog. Le pipeline de traitement vous permet de créer des *processeurs* servant à mettre en place un tel comportement.

#### Filtrage

Vous pouvez utiliser le processeur `Datadog::Tracing::Pipeline::SpanFilter` pour supprimer les spans lorsque le bloc renvoie une valeur truthy :

```ruby
Datadog::Tracing.before_flush(
  # Supprimer les spans associées à une ressource spécifique
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Supprimer les spans acheminées vers localhost
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Traitement

Vous pouvez utiliser le processeur `Datadog::Tracing::Pipeline::SpanProcessor` pour modifier des spans :

```ruby
Datadog::Tracing.before_flush(
  # Supprimer le texte correspondant au champ resource
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Processeur personnalisé

Un processeur peut être n'importe quel objet répondant à un `#call` et acceptant `trace` comme argument (qui est un `array` de `Datadog::Span`s).

Par exemple, avec une syntaxe de bloc raccourcie :

```ruby
Datadog::Tracing.before_flush do |trace|
   # Logique de traitement…
   trace
end
```

Pour une classe de processeur personnalisé :

```ruby
class MyCustomProcessor
  def call(trace)
    # Logique de traitement…
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

Dans les deux cas, la méthode du processeur *doit* renvoyer l'objet `trace`. La valeur renvoyée est ensuite passée au processeur suivant dans le pipeline.

#### Avertissements

1. Les spans ignorées ne généreront pas de métriques de trace, ce qui impacte les monitors et les dashboards.
2. La suppression d'une span entraîne également la suppression de toutes les spans enfant associées. Cette approche permet d'éviter toute span orpheline dans le graphique de la trace.
3. Les [logs du mode debugging](#activer-le-mode-debugging) indiquent l'état des spans *avant* l'exécution du pipeline de traitement. Ainsi, dans ces logs, les spans modifiées ou supprimées affichent leur état d'origine.

### Mise en corrélation des traces

Dans de nombreux cas, par exemple pour le logging, il peut s'avérer utile de mettre en corrélation les ID de trace à d'autres événements ou flux de données afin de comparer ces différentes sources plus facilement.

#### Logging dans les applications Rails

##### Configuration automatique

Pour les applications Rails utilisant le logger par défaut (`ActiveSupport::TaggedLogging`), `lograge` ou `semantic_logger`, l'injection des informations de mise en corrélation des traces est activée par défaut.

Pour désactiver l'injection, définissez la variable d'environnement `DD_LOGS_INJECTION=false`.

#### Logging dans les applications Ruby

Pour ajouter des ID de corrélation à votre logger, ajoutez un formateur de log qui récupère les ID de corrélation avec `Datadog::Tracing.correlation`, puis ajoutez les ID au message.

Pour vous assurer que vos logs Datadog sont bien mis en corrélation, vérifiez que les éléments suivants sont inclus dans chaque message de log (l'ordre doit être le même) :

 - `dd.env=<ENVIRONNEMENT>` : `<ENVIRONNEMENT>` correspond à `Datadog::Tracing.correlation.env`. N'incluez pas cet élément si aucun environnement n'est configuré.
 - `dd.service=<SERVICE>` : `<SERVICE>` correspond à `Datadog::Tracing.correlation.service`. N'incluez pas cet élément si aucun nom de service par défaut n'est configuré.
 - `dd.version=<VERSION>` : `<VERSION>` correspond à `Datadog::Tracing.correlation.version`. N'incluez pas cet élément si aucune version de l'application n'est configurée.
 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog::Tracing.correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog::Tracing.correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

`Datadog::Tracing.log_correlation` renvoie `dd.env=<ENVIRONNEMENT> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Si aucune trace n'est active et que ni l'environnement ni la version de l'application ne sont configurés, `Datadog::Tracing.log_correlation` renvoie `dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0`.

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
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Lorsqu'une trace est active
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

### Configurer la couche de transport

Par défaut, `ddtrace` se connecte à l'Agent à l'aide des premiers paramètres disponibles, selon les priorités indiquées :

1. Via les paramètres de configuration explicitement fournis (hostname, port et transport)
2. Via le socket de domaine Unix (UDS) situé à l'emplacement `/var/run/datadog/apm.socket`
3. À l'aide du protocole HTTP via TCP sur `127.0.0.1:8126`

Toutefois, le traceur peut être configuré de façon à envoyer ses données de tracing à d'autres destinations, ou via d'autres protocoles.

#### Changer le hostname et le port par défaut de l'Agent

Pour modifier le host et le port de l'Agent, définissez `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`.

Sinon, définissez les paramètres suivants dans un bloc `Datadog.configure` :

```ruby
Datadog.configure do |c|
  c.agent.host = '127.0.0.1'
  c.agent.port = 8126
end
```

Consultez la rubrique [Configuration supplémentaire](#configuration-supplementaire) pour en savoir plus.

#### Utiliser l'adaptateur Net::HTTP

L'adaptateur `Net` envoie les traces via TCP avec `Net::HTTP`. Il s'agit de l'adaptateur de transport par défaut.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Hostname, port et options supplémentaires. :timeout est défini en secondes.
    t.adapter :net_http, '127.0.0.1', 8126, timeout: 30
  }
end
```

#### Utiliser l'adaptateur de socket de domaine Unix (UDS)

L'adaptateur `UnixSocket` envoie les traces via un socket Unix avec `Net::HTTP`.

Pour l'utiliser, commencez par configurer votre Agent de trace de façon à ce qu'il effectue son écoute via un socket Unix. Ensuite, configurez le traceur avec :

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Spécifier le chemin local vers le socket Unix de l'Agent de trace
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### Utiliser l'adaptateur de test de transport

L'adaptateur `Test` est un système de transport no-op qui vous permet également de définir un buffer pour les requêtes. Il est idéal pour les collections de tests et les environnements hors production.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
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
  c.tracing.transport_options = proc { |t|
    # Initialiser et passer une instance de l'adaptateur
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### Définir le fournisseur de temps

Par défaut, le tracing se sert d'une horloge monotone pour mesurer la durée des spans, ainsi que pour calculer les timestamps (`->{ Time.now }`) pour les heures de début et de fin.

Pour vos tests, il peut être utile d'utiliser un autre fournisseur de temps.

Pour modifier la fonction qui fournit les timestamps, configurez ce qui suit :

```ruby
Datadog.configure do |c|
  # Pour Timecop. Par exemple `->{ Time.now_without_mock_time }` permet au traceur d'utiliser le wall time réel.
  c.time_now_provider = -> { Time.now_without_mock_time }
end
```

Ce paramètre n'a aucune incidence sur le calcul des durées de spans : ce dernier sera toujours basé sur l'horloge monotone système disponible.

### Métriques

Le traceur et ses intégrations peuvent produire des métriques supplémentaires offrant des informations utiles sur les performances de votre application. Ces métriques sont collectées avec `dogstatsd-ruby`, et peuvent être envoyées au même Agent Datadog que celui auquel vous envoyez vos traces.

Pour configurer la collecte de métriques pour votre application :

1. [Configurez votre Agent Datadog pour StatsD.](https://docs.datadoghq.com/developers/dogstatsd/#configuration)
2. Ajoutez `gem 'dogstatsd-ruby', '~> 5.3'` à votre Gemfile.

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

| Nom                        | Type    | Description                                              | Disponible sur |
| --------------------------  | ------- | -------------------------------------------------------- | ------------ |
| `runtime.ruby.class_count`  | `gauge` | Nombre de classes dans l'espace mémoire.                       | CRuby        |
| `runtime.ruby.gc.*`         | `gauge` | Statistiques de nettoyage de la mémoire : recueillies à partir de `GC.stat`. | Tous les runtimes |
| `runtime.ruby.thread_count` | `gauge` | Nombre de threads.                                       | Tous les runtimes |
| `runtime.ruby.global_constant_state`        | `gauge` | Génération de cache constante et globale.                                                                     | CRuby ≤ 3.1                                                                                     |
| `runtime.ruby.global_method_state`          | `gauge` | [Génération de cache globale pour les méthodes.](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby 2.x](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |
| `runtime.ruby.constant_cache_invalidations` | `gauge` | Invalidations de cache constantes.                                                                         | CRuby ≥ 3.2                                                                                     |
| `runtime.ruby.constant_cache_misses`        | `gauge` | Miss du cache constant.                                                                                | CRuby ≥ 3.2                                                                                     |

En outre, toutes les métriques comprennent les tags suivants :

| Nom         | Description                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | Langage de programmation tracé. (Ex. : `ruby`)              |
| `service`    | Liste des services associés à cette métrique.      |

### OpenTracing

Pour en savoir plus sur la configuration de Datadog avec OpenTracing, consultez la rubrique [Configurer OpenTracing](#configurer-opentracing).

**Configurer les paramètres du traceur Datadog**

Le traceur Datadog sous-jacent peut être configuré en passant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Où `options` correspond à un hash d'options spécifiées à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(**options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit à la rubrique [Configuration supplémentaire](#configuration-supplementaire).

**Activer et configurer des intégrations**

Par défaut, la configuration d'OpenTracing avec Datadog n'active aucune instrumentation supplémentaire assurée par Datadog. Vous ne recevrez que les spans et les traces provenant de l'instrumentation OpenTracing intégrée à votre application.

Toutefois, des instrumentations supplémentaires fournies par Datadog peuvent être activées conjointement à OpenTracing via `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumenter des intégrations](#instrumenter-des-integrations) pour obtenir plus de détails.

**Formats de sérialisation pris en charge**

| Type                           | Prise en charge | Informations supplémentaires |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Oui        |                        |
| `OpenTracing::FORMAT_RACK`     | Oui        | Notez qu'en raison de la perte de résolution liée au format Rack, les majuscules dans les noms d'éléments transmis lors de l'aller-retour doivent être remplacées par des minuscules, et le caractère `-` par le caractère `_`. Nous vous conseillons d'éviter d'utiliser ces caractères ou de prévoir une étape pour les gérer à la réception. |
| `OpenTracing::FORMAT_BINARY`   | Non         |                        |

### Profiling

`ddtrace` peut générer des profils afin de mesurer dans vos environnements de production l'utilisation des ressources de votre application au niveau des méthodes. Ces profils vous permettent de mieux comprendre les ressources consacrées au code Ruby en dehors de l'instrumentation existante de traces.

**Configuration**

Pour commencer à utiliser le profiling, suivez les instructions du guide [Activer le profileur Ruby](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/).

#### Dépannage

Si vous rencontrez des problèmes concernant le profiling, veuillez consulter la section [Dépannage du profileur](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=ruby).

#### Profiling des tâches Resque

Pour effectuer le profiling des tâches [Resque](https://github.com/resque/resque), définissez l'option `RUN_AT_EXIT_HOOKS=1` tel que décrit dans la [documentation Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks) (en anglais).

Sans ce flag, les profils des tâches Resque de courte durée ne sont pas disponibles. En effet, Resque élimine les processus des workers avant qu'ils n'aient l'occasion de transmettre ces informations.

## Problèmes connus et configurations suggérées

### Charge utile trop volumineuse

Par défaut, Datadog limite la taille des charges utiles des traces afin d'empêcher toute surcharge de la mémoire dans les applications instrumentées. Ainsi, il est possible que les traces contenant des milliers d'opérations ne soient pas envoyées à Datadog.

Si vous ne recevez pas certaines traces, activez le [mode debugging](#debugging-et-diagnostic) et vérifiez si des messages contenant `"Dropping trace. Payload too large"` figurent dans vos logs.

Puisque le mode debugging fournit énormément d'informations, **Datadog vous recommande de ne pas l'activer ou de l'activer seulement en production.** Désactivez-le après avoir effectué votre vérification. Vous pouvez consulter les [logs de l'Agent Datadog](https://docs.datadoghq.com/agent/guide/agent-log-files/) pour vérifier s'ils contiennent des messages similaires.

Si vos traces sont bien perdues en raison d'une charge utile trop volumineuse, activez le paramètre [partial_flush](#configuration-supplementaire) pour diviser les plus grosses traces en plusieurs petites traces.

### Erreur Stack level too deep

Le tracing Datadog recueille des données de tracing en instrumentant une instrumentation à d'autres bibliothèques populaires (comme Rails ou encore Rack). Certaines bibliothèques proposent des API permettant d'ajouter cette instrumentation. Ce n'est toutefois pas le cas de toutes les bibliothèques. Pour ajouter une instrumentation à des bibliothèques qui ne proposent pas d'API d'instrumentation, Datadog a recours à la technique de « monkey patching » pour modifier le code de ces bibliothèques.

Avec la version 1.9.3 et les versions antérieures de Ruby, le monkey patching implique généralement l'utilisation de [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method), un processus de *réécriture des méthodes*, pour remplacer de manière destructrice les méthodes Ruby existantes. Toutefois, cette approche génère régulièrement des erreurs et des conflits lorsque deux bibliothèques tentent de « réécrire » la même méthode (p. ex., deux packages APM différents essayant d'instrumenter la même méthode).

La fonctionnalité [`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend) a été ajoutée avec la version 2.0 de Ruby. Elle permet d'adopter une approche de réécriture non-destructrice, en autorisant plusieurs « monkey patchs » sur la même méthode. Pour cette raison, cette approche de monkey patching est considérée comme la plus sûre et la plus efficace.

L'instrumentation Datadog utilise presque exclusivement la fonctionnalité `Module#prepend` pour ajouter une instrumentation de manière non-destructrice. Toutefois, certaines autres bibliothèques (généralement celles prenant en charge Ruby < 2.0) continuent d'utiliser `alias_method`, ce qui peut entraîner des conflits avec l'instrumentation Datadog, et notamment des erreurs `SystemStackError` ou `stack level too deep`.

Puisque l'implémentation de `alias_method` fait partie intégrante de ces bibliothèques, Datadog ne peut généralement pas les corriger. Toutefois, il existe des solutions pour certaines bibliothèques :

* `rack-mini-profiler` : [erreurs Stack level too deep pour Net::HTTP](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors).

Si vous utilisez une bibliothèque pour laquelle aucune solution n'existe, songez à supprimer la bibliothèque à l'aide de `alias` ou de `Module#alias_method`, ou répartissez les bibliothèques dans plusieurs environnements distincts afin de les tester.

Si vous avez la moindre question ou souhaitez signaler un problème de ce type, [contactez l'assistance Datadog](https://docs.datadoghq.com/help).