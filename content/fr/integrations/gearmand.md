---
aliases:
  - /fr/integrations/gearman
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md'
display_name: Gearman
git_integration_title: gearmand
guid: bdd65394-92ff-4d51-bbe3-ba732663fdb2
integration_id: gearman
integration_title: Gearman
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gearmand.
metric_to_check: gearman.unique_tasks
name: gearmand
process_signatures:
  - gearmand
  - gearman
public_title: Intégration Datadog/Gearman
short_description: 'Surveillez le nombre de jobs en attente ou en cours d''exécution, que ce soit par tâche ou au total.'
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Recueillez des métriques de Gearman pour :

* Visualiser les performances de Gearman
* Savoir le nombre de tâches en attente ou en exécution
* Corréler les performances de Gearman avec le reste de vos applications

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Gearman est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs de jobs Gearman.

### Configuration


1. Modifiez le fichier `gearmand.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance Gearman.
    Consultez le [fichier d'exemple gearmand.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.
    ```yaml
    init_config:

    instances:
        - server: localhost
          port: 4730
    ```

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `gearmand` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "gearmand" >}}


### Événements
Le check Gearmand n'inclut aucun événement.

### Checks de service

`gearman.can_connect` :

Renvoie `Critical` si l'Agent n'est pas capable de se connecter à Gearman pour recueillir des métriques.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/gearmand/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}