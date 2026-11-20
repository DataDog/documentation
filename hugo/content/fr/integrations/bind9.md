---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_name: "BIND\_9"
draft: false
git_integration_title: bind9
guid: bce6961c-4312-11e9-b210-d663bd873d93
integration_id: bind9
integration_title: bind9
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: ashuvyas45@gmail.com
manifest_version: 1.0.0
metric_prefix: bind9.
metric_to_check: bind9.nsstat_AuthQryRej
name: bind9
public_title: Intégration Datadog/bind9
short_description: Une intégration Datadog pour recueillir les métriques de votre serveur bind9
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez les métriques de votre serveur DNS Bind9.

- Visualisez et surveillez les statistiques bind9

![Snap][1]

## Configuration

Le check Bind9 n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Bind9 sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `bind9.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Bind9. Consultez le [fichier d'exemple bind9.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `bind9` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "bind9" >}}


### Événements

Le check Bind9 n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "bind9" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help