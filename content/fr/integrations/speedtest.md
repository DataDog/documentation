---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - isp
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md'
display_name: speedtest
git_integration_title: speedtest
guid: 4bf81e32-170a-44f3-868d-1683ef39464f
integration_id: speedtest
integration_title: speedtest
is_public: false
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 1.0.0
metric_prefix: speedtest.
metric_to_check: ''
name: speedtest
public_title: Intégration Datadog/Speedtest
short_description: Exécutez un test Speedtest avec l'outil speedtest-cli
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Speedtest][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Pour installer le check Speedtest sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Exécutez `ddev release build speedtest` pour générer le package.
3. [Téléchargez l'Agent Datadog][4].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w path/to/speedtest/dist/<ARTIFACT_NAME>.whl`.

Remarque : vous devez également installer [Speedtest CLI][1] sur chaque host souhaité et accepter l'accord en tant qu'utilisateur datadog-agent (p. ex. `sudo -u dd-agent speedtest`) pour utiliser l'intégration.

### Configuration

1. Modifiez le fichier `speedtest.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Speedtest. Consultez le [fichier d'exemple speedtest.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `speedtest` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "speedtest" >}}


### Checks de service

Speedtest n'inclut aucun check de service.

### Événements

Speedtest n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://www.speedtest.net/apps/cli
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/