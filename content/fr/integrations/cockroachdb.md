---
categories:
  - cloud
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md'
display_name: CockroachDB
git_integration_title: cockroachdb
guid: d66151ed-2e98-4037-ad89-bf4400e45f34
integration_id: cockroachdb
integration_title: CockroachDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cockroachdb.
metric_to_check: cockroachdb.sys.uptime
name: cockroachdb
public_title: Intégration Datadog/CockroachDB
short_description: Surveillez les performances et la santé globales de vos clusters CockroachDB.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le check CockroachDB surveille les performances et la santé globales d'un cluster [CockroachDB][1].

## Implémentation

### Installation

Le check CockroachDB est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc
rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `cockroachdb.d/conf.yaml` dans le dossier `conf.d/` [à la racine du
   [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos données de performance CockroachDB.
    Consultez le [fichier d'exemple cockroachdb.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `cockroachdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cockroachdb" >}}


### Checks de service

Le check CockroachDB n'inclut aucun check de service.

### Événements

Le check CockroachDB n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Surveiller les métriques de performance CockroachDB avec Datadog][9]

[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[9]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog/


{{< get-dependencies >}}