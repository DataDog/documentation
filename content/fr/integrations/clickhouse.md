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
  - 'https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md'
display_name: ClickHouse
git_integration_title: clickhouse
guid: 781edd66-9c4c-4210-898c-182a6b8ba4ab
integration_id: clickhouse
integration_title: ClickHouse
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: clickhouse.
metric_to_check: clickhouse.query.active
name: clickhouse
public_title: Intégration Datadog/ClickHouse
short_description: Surveillez les performances et la santé de vos clusters ClickHouse.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [ClickHouse][1] avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check ClickHouse est inclus avec le paquet de l'[Agent Datadog][3].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Pour commencer à recueillir vos données de performance ClickHouse, modifiez le fichier `clickhouse.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent. Consultez le [fichier d'exemple clickhouse.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `clickhouse` dans la section **Checks**.

## Données collectées

### Métriques
{{< get-metrics-from-git "clickhouse" >}}


### Checks de service

**clickhouse.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à la base de données ClickHouse surveillée. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check ClickHouse n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}