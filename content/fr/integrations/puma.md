---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/puma/README.md'
display_name: Puma
draft: false
git_integration_title: puma
guid: 93264c0f-a4d1-447d-81b6-bee3eb891df3
integration_id: puma
integration_title: Puma
is_public: true
kind: integration
maintainer: justin.morris@ferocia.com.au
manifest_version: 1.0.0
metric_prefix: puma.
metric_to_check: puma.workers
name: puma
public_title: Intégration Datadog/Puma
short_description: Un serveur Web rapide et concurrent pour Ruby et Rack
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Puma][1] avec l'Agent Datadog. Il utilise l'endpoint de métriques Puma fourni par le serveur [Control/Status][2].

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Puma sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][4] pour installer des checks avec une [version < 6.8 de l'Agent][5] ou avec l'[Agent Docker][6] :

1. [Téléchargez l'Agent Datadog][7].

2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
      datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][8].


### Configuration

1. Modifiez le fichier `puma.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Puma. Consultez le [fichier d'exemple puma.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `puma` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "puma" >}}


### Checks de service

**puma.connection** : renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance Puma qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Puma n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[6]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/fr/getting_started/integrations/
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[13]: https://docs.datadoghq.com/fr/help/