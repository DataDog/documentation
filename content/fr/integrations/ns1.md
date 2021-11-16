---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    NS1: assets/dashboards/overview.json
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
  - 'https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md'
display_name: NS1
draft: false
git_integration_title: ns1
guid: 7c7c7d80-d307-4ffd-ac60-1a7180d932e3
integration_id: ns1
integration_title: ns1
is_public: true
kind: integration
maintainer: dblagojevic@daitan.com
manifest_version: 1.0.0
metric_prefix: ns1.
metric_to_check: ns1.qps
name: ns1
public_title: ns1
short_description: Une intégration Datadog pour recueillir les métriques NS1
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [ns1][1] avec l'Agent Datadog.

![Snap][2]

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][4] :

1. [Téléchargez et lancez l'Agent Datadog][5].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-ns1==0.0.2
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].



### Configuration

1. Modifiez le fichier `ns1.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance ns1. Consultez le [fichier d'exemple ns1.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

Pour obtenir une description détaillée de toutes les données de performance, consultez l'article sur l'[intégration NS1 + Datadog][9] dans le centre d'aide NS1.

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `ns1` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ns1" >}}


### Checks de service

ns1 n'inclut aucun check de service.

### Événements

ns1 n'inclut aucun événement.

### Développement

Consultez la [documentation de Datadog dédiée aux développeurs][12] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

Pour installer le check ns1 sur votre host :

1. Installez le [kit de développement][13] sur n'importe quelle machine.

2. Exécutez `ddev release build ns1` pour générer le package.

3. [Téléchargez l'Agent Datadog][5].

4. Importez l'artefact du build sur tous les hosts avec un Agent et
 exécutez `datadog-agent integration install -w chemin/vers/référentiel/ns1/<NOM_ARTEFACT>.whl`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].

[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: datadog_checks/ns1/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://help.ns1.com/hc/en-us/articles/360020473994-NS1-Datadog-Integration
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: metadata.csv
[12]: https://docs.datadoghq.com/fr/developers/
[13]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[14]: https://docs.datadoghq.com/fr/help/