---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Sidekiq Overview: assets/dashboards/overview.json
  logs:
    source: sidekiq
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - Collecte de logs
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sidekiq/README.md'
display_name: Sidekiq
draft: false
git_integration_title: sidekiq
guid: b4bc604c-73a5-4bd8-8dfe-3f80fc19976b
integration_id: sidekiq
integration_title: Sidekiq
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sidekiq.
metric_to_check: sidekiq.jobs.count
name: sidekiq
public_title: Intégration Datadog/Sidekiq
short_description: 'Surveillez les métriques associées à vos tâches, files d''attente et batchs Sidekiq.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration permet de surveiller [Sidekiq][1] via [Dogstatsd][2]. Les métriques sont recueillies par le [client dogstatsd-ruby de Datadog][3].

**Remarque :** seuls les utilisateurs de Sidekiq Pro (>= 3.6) ou Enterprise (>= 1.1.0) peuvent recueillir des métriques.

## Configuration

### Installation

L'intégration Sidekiq est incluse avec le package de l'[Agent Datadog][4].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Installez la [gem][3] `dogstatsd-ruby` :

   ```
    gem install dogstatsd-ruby
   ```

2. Pour activer la collecte de métriques de Sidekiq Pro, ajoutez le code suivant à votre initialiseur. Pour un déploiement conteneurisé, remplacez `localhost` par l'adresse du conteneur de votre Agent.

   ```ruby
        require 'datadog/statsd' # gem 'dogstatsd-ruby'

        Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

        Sidekiq.configure_server do |config|
          config.server_middleware do |chain|
            require 'sidekiq/middleware/server/statsd'
            chain.add Sidekiq::Middleware::Server::Statsd
          end
        end
   ```

    Si vous utilisez Sidekiq Enterprise et que vous souhaitez recueillir des métriques historiques, ajoutez également cette ligne :

   ```ruby
          Sidekiq.configure_server do |config|
            # history is captured every 30 seconds by default
            config.retain_history(30)
          end
   ```

    Consultez la documentation sur Sidekiq [Pro][5] et [Enterprise][6] pour en savoir plus, ainsi que la documentation [Dogstatsd Ruby][3] (en anglais) pour découvrir d'autres options de configuration.

3. Modifiez le [fichier de configuration principal de l'Agent Datadog][7] `datadog.yaml` pour y ajouter les paramètres suivants :

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: sidekiq
       prefix: "sidekiq."
       mappings:
         - match: 'sidekiq\.sidekiq\.(.*)'
           match_type: "regex"
           name: "sidekiq.$1"
         - match: 'sidekiq\.jobs\.(.*)\.perform'
           name: "sidekiq.jobs.perform"
           match_type: "regex"
           tags:
             worker: "$1"
         - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
           name: "sidekiq.jobs.worker.$2"
           match_type: "regex"
           tags:
             worker: "$1"
    ```

4. [Redémarrez l'Agent][4].

## Données collectées

### Métriques
{{< get-metrics-from-git "sidekiq" >}}


L'intégration Sidekiq permet également la collecte de métriques custom. Consultez la [documentation de Sidekiq][9] (en anglais) pour trouver des idées de métriques custom.

### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans le fichier `datadog.yaml` avec :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `sidekiq.d/conf.yaml` pour commencer à recueillir vos logs Sidekiq :

    ```yaml
      logs:
        - type: file
          path:  /var/log/sidekiq.log
          source: sidekiq
          service: <SERVICE>
    ```

     Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Si vous ne parvenez pas à trouver vos logs, [consultez la documentation de Sidekiq sur le fonctionnement des logs][10] (en anglais).

3. [Redémarrez l'Agent][4].

### Checks de service

Sidekiq n'inclut aucun check de service.

### Événements

Sidekiq n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://sidekiq.org/
[2]: https://docs.datadoghq.com/fr/developers/dogstatsd/
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/mperham/sidekiq/wiki/Pro-Metrics
[6]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[8]: https://github.com/DataDog/integrations-core/blob/master/sidekiq/metadata.csv
[9]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics#custom
[10]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[11]: https://docs.datadoghq.com/fr/help/