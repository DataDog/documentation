---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_name: Neo4j
draft: false
git_integration_title: neo4j
guid: a85ec8bb-e677-4089-ae8f-d1705c340131
integration_id: neo4j
integration_title: Neo4j
integration_version: 1.0.1
is_public: true
kind: integration
maintainer: help@neo4j.com
manifest_version: 1.0.0
metric_prefix: neo4j.
metric_to_check: neo4j.arraystore.size
name: neo4j
public_title: Intégration Datadog/Neo4j
short_description: "Intégration de Neo4j\_Enterprise pour surveiller les performances de vos serveurs."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Neo4j en temps réel pour :

- Visualiser et surveiller les états de Neo4j
- Être informé des failovers et des événements de Neo4j

## Configuration

Le check Neo4j n'est pas inclus avec le package de l'[Agent Datadog][1] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Neo4j sur votre host. Consultez la section [Utiliser les intégrations de la communauté][2] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][3] de base.

### Configuration

1. Modifiez le fichier `neo4j.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#metriques) Neo4j. Consultez le [fichier d'exemple neo4j.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

## Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `neo4j` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "neo4j" >}}


### Événements

Le check Neo4j n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "neo4j" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/assets/service_checks.json
[10]: http://docs.datadoghq.com/help