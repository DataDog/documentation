---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/filebeat/README.md'
display_name: Filebeat
draft: false
git_integration_title: filebeat
guid: 3bb6a789-d1e3-465c-9bff-ea2a43ae2f59
integration_id: filebeat
integration_title: Filebeat
is_public: true
kind: integration
maintainer: jean@tripping.com
manifest_version: 1.0.0
metric_prefix: filebeat.
name: filebeat
public_title: Intégration Datadog/Filebeat
short_description: Shipper léger conçu pour les logs
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Filebeat en temps réel pour :

- Visualiser et surveiller les états de Filebeat
- Être informé des failovers et des événements de Filebeat

## Configuration

Le check Filebeat n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Filebeat sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le référentiel integrations-extras :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le paquet `filebeat`, exécutez :

   ```shell
   ddev -e release build filebeat
   ```

5. [Téléchargez et lancez l'Agent Datadog][1].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -w <PATH_OF_FILEBEAT_ARTIFACT_>/<FILEBEAT_ARTIFACT_NAME>.whl
   ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `filebeat.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Filebeat. Consultez le [fichier d'exemple filebeat.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

## Validation

[Lancez la sous-commande `status` de l'Agent][10] et cherchez `filebeat` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "filebeat" >}}


### Événements

Le check Filebeat n'inclut aucun événement.

### Checks de service

`filebeat.can_connect` :

Renvoie `Critical` si l'Agent ne parvient pas à se connecter à Filebeat pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage


Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/datadog_checks/filebeat/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/filebeat/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/