---
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md'
display_name: Aerospike
git_integration_title: aerospike
guid: 582de9e7-0c99-4037-9cc5-bc34612ce039
integration_id: aerospike
integration_title: Aerospike
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aerospike.
metric_to_check: aerospike.uptime
name: aerospike
public_title: Intégration Datadog/Aerospike
short_description: Recueillir des statistiques sur les clusters et les espaces de nommage à partir de la base de données Aerospike
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Recueillez des métriques de la base de données Aerospike en temps réel pour :

* Visualiser et surveiller les états d'Aerospike
* Être informé des failovers et des événements d'Aerospike

## Implémentation

### Installation

Le check Aerospike est inclus avec le paquet de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `aerospike.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performances Aerospike. Consultez le [fichier d'exemple aerospike.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `aerospike` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aerospike" >}}


### Checks de service

- `aerospike.can_connect`
- `aerospike.cluster_up`

### Événements

Aerospike ne comprend aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.aerospike.com/products/aerospike-database-platform
[2]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/aerospike/metadata.csv
[6]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}