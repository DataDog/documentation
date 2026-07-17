---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    NS1: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md
display_name: NS1
draft: false
git_integration_title: ns1
guid: 7c7c7d80-d307-4ffd-ac60-1a7180d932e3
integration_id: ns1
integration_title: ns1
integration_version: 0.0.6
is_public: true
custom_kind: integration
maintainer: zjohnson@ns1.com
manifest_version: 1.0.0
metric_prefix: ns1.
metric_to_check: ns1.qps
name: ns1
public_title: ns1
short_description: Une intégration Datadog pour recueillir les métriques NS1
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Cette intégration permet de surveiller les services [NS1][1] avec l'Agent Datadog.

![Snap][2]

## Configuration

Le check NS1 n'est pas inclus avec le package de l'[Agent Datadog][3] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check NS1 sur votre host. Consultez la section [Utiliser les intégrations de la communauté][4] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-ns1==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][5] de base.

### Procédure à suivre

1. Modifiez le fichier `ns1.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données NS1. Consultez le [fichier d'exemple ns1.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][5] et cherchez `ns1` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ns1" >}}


### Événements

L'intégration NS1 n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ns1" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Guide de prise en main rapide de l'intégration sortante entre NS1 et Datadog]
- [Surveiller NS1 avec Datadog][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/