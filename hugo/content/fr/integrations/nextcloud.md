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
- https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md
display_name: Nextcloud
draft: false
git_integration_title: nextcloud
guid: 852e64eb-93b9-4fb2-8cb2-10041b4045c3
integration_id: nextcloud
integration_title: Nextcloud
integration_version: 1.0.0
is_public: true
custom_kind: integration
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

Le check Nextcloud n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Nextcloud sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `nextcloud.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Nextcloud. Consultez le [fichier d'exemple nextcloud.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

Lancez la [sous-commande status de l'Agent][8] et cherchez `nextcloud` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "nextcloud" >}}


### Événements

Nextcloud n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "nextcloud" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://nextcloud.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/