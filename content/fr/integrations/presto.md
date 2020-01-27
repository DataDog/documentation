---
assets:
  dashboards:
    Presto Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/presto/README.md'
display_name: Presto
git_integration_title: presto
guid: a05766fc-8760-464b-9e5d-a784500b7b90
integration_id: presto
integration_title: Presto
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: presto.
metric_to_check: presto.failure_detector.active_count
name: presto
public_title: Intégration Datadog/Presto
short_description: Permet de recueillir des statistiques de performance et d'utilisation sur le cluster PrestoSQL et bien plus encore.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check recueille des métriques [Presto][1] comme :

* Des métriques relatives aux activités générales (requêtes complétées/échouées, taille des entrées et des sorties de données, délai d'exécution)
* Des métriques de performance : mémoire du cluster, entrées processeur, temps d'exécution processeur

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Presto est inclus avec le paquet de l'[Agent Datadog][3].
Vous n'avez rien d'autre à installer sur vos serveurs. Installez l'Agent sur chacun des nœuds coordinateur ou worker depuis lesquels vous souhaitez recueillir des métriques d'utilisation et de performance.

### Configuration

1. Modifiez le fichier `presto.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Presto.
   Consultez le [fichier d'exemple presto.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations. 
    Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous.
    Pour découvrir comment modifier les métriques à recueillir, consultez la [documentation relative aux checks JMX][5] afin d'obtenir des instructions détaillées.
    Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][6].

2. [Redémarrez l'Agent][7].

#### Collecte de métriques

Utilisez la configuration par défaut de votre fichier presto.d/conf.yaml pour activer la collecte de vos métriques Presto. Consultez le [fichier d'exemple presto.d/conf.yaml[4] pour découvrir toutes les options de configuration disponibles.

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier presto.d/conf.yaml pour commencer à recueillir vos logs Presto :

    ```
      logs:
        - type: file
          path: /var/log/presto/*.log
          source: presto
          sourcecategory: database
          service: <SERVICE_NAME>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le fichier d'exemple [presto.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `presto` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "presto" >}}


### Événements

Presto n'inclut aucun événement.

### Checks de service

**presto.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance Presto qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].


[1]: https://docs.datadoghq.com/fr/integrations/presto
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/java
[6]: https://docs.datadoghq.com/fr/help
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/presto/metadata.csv


