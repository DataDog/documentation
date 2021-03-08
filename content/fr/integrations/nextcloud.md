---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - collaboration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md'
display_name: Nextcloud
draft: false
git_integration_title: nextcloud
guid: 852e64eb-93b9-4fb2-8cb2-10041b4045c3
integration_id: nextcloud
integration_title: Nextcloud
is_public: true
kind: integration
maintainer: emeric.planet@gmail.com
manifest_version: 1.0.0
metric_prefix: nextcloud.
metric_to_check: nextcloud.server.database.size
name: nextcloud
public_title: Intégration Datadog/Nextcloud
short_description: Surveillez les statistiques générales de votre instance Nextcloud.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Nextcloud][1].

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Nextcloud sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `nextcloud.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) Nextcloud. Consultez le [fichier d'exemple nextcloud.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][10] et recherchez `nextcloud` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nextcloud" >}}


### Checks de service

**`nextcloud.can_connect`**

Le check renvoie :

- `OK` si Nextcloud est accessible.
- `CRITICAL` si Nextcloud est inaccessible.

### Événements

Nextcloud n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://nextcloud.com
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/