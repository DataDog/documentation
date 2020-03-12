---
assets:
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/scylla/README.md'
display_name: Scylla
git_integration_title: scylla
guid: 875e4d62-831b-4929-bea1-57e5c7016d65
integration_id: scylla
integration_title: Scylla
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: scylla.
metric_to_check: scylla.node.operation_mode
name: scylla
public_title: Intégration Datadog/Scylla
short_description: 'Surveillez la santé des clusters, leurs ressources, leurs latences, et bien plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration Datadog/[Scylla][1] recueille la majorité des métriques exposées par défaut et offre la possibilité de personnaliser des groupes supplémentaires en fonction de vos besoins.

Scylla est un datastore NoSQL open source qui peut être utilisé en tant qu'alternative instantanée à Apache Cassandra. Il fait appel à une version réarchitecturée du modèle Cassandra, optimisée pour le matériel moderne afin de réduire la taille des clusters requis tout en améliorant le débit et les performances théoriques.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Scylla est inclus dans le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `scylla.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance scylla. Consultez le [fichier d'exemple scylla.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `scylla` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "scylla" >}}


### Checks de service

`scylla.prometheus.health` : renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Scylla n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://scylladb.com
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[7]: https://docs.datadoghq.com/fr/help