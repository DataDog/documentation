---
app_id: neo4j
app_uuid: f2657bb8-ded4-48f3-8095-f703cc203149
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: neo4j.page_cache_hits_total
      metadata_path: metadata.csv
      prefix: neo4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Neo4j
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neo4j
  sales_email: neo4j-cloud@neotechnology.com
  support_email: neo4j-cloud@neotechnology.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_on_public_website: true
draft: false
git_integration_title: neo4j
integration_id: neo4j
integration_title: Neo4j
integration_version: 2.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: neo4j
public_title: Neo4j
short_description: Permet de recueillir des métriques Neo4j
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Store
  configuration: README.md#Setup
  description: Permet de recueillir des métriques Neo4j
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neo4j
---



## Présentation

Ce check permet de surveiller [neo4j][1] avec l'Agent Datadog. Veillez à vérifier les métriques et checks transmis par cet Agent. Depuis la version 4.0, Neo4j prend en charge plusieurs bases de données. Ainsi, certaines métriques et certains checks ne sont plus publiés.

## Configuration


Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Pour installer le check neo4j sur votre host, exécutez ce qui suit :

1. Téléchargez et installez l'[Agent Datadog][3].
2. Pour installer le check neo4j sur votre host, exécutez ce qui suit :

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```


### Configuration

1. Modifiez le fichier `neo4j.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance neo4j. Consultez le [fichier d'exemple neo4j.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. Le paramètre neo4j_url a été remplacé par host. Vérifiez donc que vos fichiers sont à jour et qu'ils utilisent host.

3. [Redémarrez l'Agent][5].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `neo4j` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "neo4j" >}}


### Checks de service

Le check de service `neo4j.prometheus.health` est envoyé dans le check de base.

### Événements

neo4j n'inclut aucun événement.

## Dépannage


Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://neo4j.com/
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[8]: https://docs.datadoghq.com/fr/help