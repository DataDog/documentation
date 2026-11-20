---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md'
display_name: CockroachDB
draft: false
git_integration_title: cockroachdb
guid: d66151ed-2e98-4037-ad89-bf4400e45f34
integration_id: cockroachdb
integration_title: CockroachDB
is_public: true
custom_kind: integration
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

## Configuration

### Installation

Le check CockroachDB est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `cockroachdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance CockroachDB. Consultez le [fichier d'exemple cockroachdb.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                    |
| -------------------- | -------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `cockroachdb`                                            |
| `<CONFIG_INIT>`      | vide ou `{}`                                            |
| `<CONFIG_INSTANCE>`  | `{"prometheus_url":"http://%%host%%:8080/_status/vars"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `cockroachdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cockroachdb" >}}


### Checks de service

Le check CockroachDB n'inclut aucun check de service.

### Événements

Le check CockroachDB n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les métriques de performance CockroachDB avec Datadog][5]


[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog