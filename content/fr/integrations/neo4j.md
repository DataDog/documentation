---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md'
display_name: Neo4j
draft: false
git_integration_title: neo4j
guid: a85ec8bb-e677-4089-ae8f-d1705c340131
integration_id: neo4j
integration_title: Neo4j
is_public: true
kind: integration
maintainer: help@neo4j.com
manifest_version: 1.0.0
metric_prefix: neo4j.
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

Le check Neo4j n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Neo4j sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `neo4j.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Neo4j. Consultez le [fichier d'exemple neo4j.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `neo4j` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "neo4j" >}}


### Événements

Le check Neo4j n'inclut aucun événement.

### Checks de service

Le check Neo4j applique les tags suivants à l'ensemble des checks de service recueillis :

- `server_name:<nom_serveur_en_yaml>`
- `url:<url_neo4j_en_yaml>`

`neo4j.can_connect` :
Renvoie `CRITICAL` si l'Agent ne parvient pas à recevoir la valeur 200 depuis l'endpoint de _surveillance_. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[11]: http://docs.datadoghq.com/help