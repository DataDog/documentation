---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  logs:
    source: presto
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    error_patterns: assets/saved_views/error_patterns.json
    response_time_overview: assets/saved_views/response_time.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
- data store
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/presto/README.md
display_name: Presto
draft: false
git_integration_title: presto
guid: a05766fc-8760-464b-9e5d-a784500b7b90
integration_id: presto
integration_title: Presto
integration_version: 2.6.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: presto.
metric_to_check: presto.failure_detector.active_count
name: presto
public_title: Intégration Datadog/Presto
short_description: Permet de recueillir des statistiques de performance et d'utilisation
  sur le cluster PrestoSQL et bien plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check recueille des métriques [Presto][1] comme :

- Des métriques relatives aux activités générales (requêtes complétées/échouées, taille des entrées et des sorties de données, délai d'exécution)
- Des métriques de performance (mémoire du cluster, entrées processeur, temps d'exécution processeur)

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Le check Presto est inclus avec le package de l'[Agent Datadog][3].
Vous n'avez rien d'autre à installer sur vos serveurs. Installez l'Agent sur chacun des nœuds coordinateur ou worker depuis lesquels vous souhaitez recueillir des métriques d'utilisation et de performance.

### Configuration

1. Modifiez le fichier `presto.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Presto. Consultez le [fichier d'exemple presto.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][5] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][6].

2. [Redémarrez l'Agent][7].

#### Collecte de métriques

Utilisez la configuration par défaut de votre fichier `presto.d/conf.yaml` pour activer la collecte de vos métriques Presto. Consultez le [fichier d'exemple presto.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `presto.d/conf.yaml` pour commencer à recueillir vos logs Presto :

   ```yaml
   logs:
     - type: file
       path: /var/log/presto/*.log
       source: presto
       service: "<SERVICE_NAME>"
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le fichier d'exemple [presto.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `presto` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "presto" >}}


### Événements

Presto n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "presto" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://docs.datadoghq.com/fr/integrations/presto/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/java/
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/presto/assets/service_checks.json