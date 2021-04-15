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
  - 'https://github.com/DataDog/integrations-extras/blob/master/stardog/README.md'
display_name: Stardog
draft: false
git_integration_title: stardog
guid: 1b32f0d4-49ef-40fb-aec3-365e4e7cd6ee
integration_id: stardog
integration_title: Stardog
is_public: true
kind: integration
maintainer: support@stardog.com
manifest_version: 1.0.0
metric_prefix: stardog.
name: stardog
public_title: Intégration Datadog/Stardog
short_description: Un collecteur de données Stardog pour Datadog.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Stardog en temps réel pour :

- Visualiser et surveiller les états de Stardog
- Être informé des failovers et des événements Stardog

## Configuration

Le check Stardog n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Stardog sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
      datadog-agent integration install -t datadog-stardog==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `stardog.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#metriques) Stardog. Consultez le [fichier d'exemple stardog.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

## Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `stardog` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "stardog" >}}


### Événements

Le check Stardog n'inclut aucun événement.

### Checks de service

Le check Stardog n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/stardog/datadog_checks/stardog/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/stardog/metadata.csv
[11]: http://docs.datadoghq.com/help