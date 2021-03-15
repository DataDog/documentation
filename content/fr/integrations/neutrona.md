---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - AZURE
  - CLOUD
  - RÉSEAU
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md'
display_name: Neutrona
draft: false
git_integration_title: neutrona
guid: ced5a4ae-6623-49f0-b45b-dbb678a5baa2
integration_id: neutrona
integration_title: Neutrona
is_public: true
kind: integration
maintainer: david@neutrona.com
manifest_version: 1.0.0
metric_prefix: neutrona.
metric_to_check: ''
name: neutrona
public_title: Intégration Datadog/Neutrona
short_description: Neutrona Telemetry
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller les services de connectivité cloud [Neutrona][1] pour

- Azure (ExpressRoute).

## Configuration

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Neutrona sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec [une version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

1. Modifiez le fichier `neutrona.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Neutrona.
   Consultez le [fichier d'exemple neutrona.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et recherchez `neutrona` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "neutrona" >}}


### Checks de service

Le check Neutrona n'inclut actuellement aucun check de service.

### Événements

Neutrona n'inclut actuellement aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://telemetry.neutrona.com
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-core/blob/master/neutrona/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/