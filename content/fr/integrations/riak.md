---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/riak/README.md'
display_name: Riak
git_integration_title: riak
guid: e1ed642c-8a15-420c-954b-6fb894905956
integration_id: riak
integration_title: Riak
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: riak.
metric_to_check: riak.memory_processes
name: riak
public_title: Intégration Datadog/Riak
short_description: 'Suivez les métriques de performance node, vnode et ring de RiakKV ou RiakTS.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Riak][1]

## Présentation

Ce check vous permet de suivre les métriques de performance node, vnode et ring de RiakKV ou RiakTS.

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Riak est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs Riak.

### Configuration

1. Modifiez le fichier `riak.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple riak.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles :

    ```yaml
    init_config:

    instances:
        - url: http://127.0.0.1:8098/stats # or whatever your stats endpoint is
    ```

2. [Redémarrez l'Agent][6] pour commencer à envoyer des métriques Riak à Datadog.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `riak.d/conf.yaml` pour commencer à recueillir vos logs Riak :

    ```
      logs:
        - type: file
          path: /var/log/riak/console.log
          source: riak
          service: <SERVICE_NAME>

        - type: file
          path: /var/log/riak/error.log
          source: riak
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}

        - type: file
          path: /var/log/riak/crash.log
          source: riak
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}
    ```

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `riak` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "riak" >}}


### Événements
Le check Riak n'inclut aucun événement.

### Checks de service

**riak.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'endpoint de statistiques Riak pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/riak/metadata.csv
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}