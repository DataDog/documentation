---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/pulsar/README.md'
display_name: pulsar
draft: false
git_integration_title: pulsar
guid: 799b35dd-d481-4d71-825e-83c92a5227c4
integration_id: pulsar
integration_title: Pulsar
is_public: true
kind: integration
maintainer: ming.luo@kesque.com
manifest_version: 1.0.0
metric_prefix: kesque.pulsar.
metric_to_check: kesque.pulsar.consumer.available_permits
name: pulsar
public_title: Pulsar
short_description: "Métriques Apache\_Pulsar"
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Pulsar][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Pour installer le check Pulsar sur votre host :

1. Installez le [kit de développement][3] sur n'importe quelle machine.
2. Clonez le référentiel integrations-extras :

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. Pour générer le package `Pulsar`, exécutez :

   ```shell
   ddev -e release build pulsar
   ```
5. [Téléchargez l'Agent Datadog][4].
6. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez :
   ```shell
   datadog-agent integration install -w path/to/pulsar/dist/<ARTIFACT_NAME>.whl
   ```

### Configuration

1. Modifiez le fichier `pulsar.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Pulsar. Consultez le [fichier d'exemple pulsar.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `pulsar` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "pulsar" >}}


### Checks de service

Pulsar n'inclut aucun check de service.

### Événements

Pulsar n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://pulsar.apache.org/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/pulsar/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/