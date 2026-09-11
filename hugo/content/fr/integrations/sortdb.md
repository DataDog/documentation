---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md
display_name: Sortdb
draft: false
git_integration_title: sortdb
guid: 806dcbd7-3686-4472-9435-2049729847c1
integration_id: sortdb
integration_title: Sortdb
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: namrata.deshpande4@gmail.com
manifest_version: 1.0.0
metric_prefix: sortdb.
metric_to_check: sortdb.stats.total_requests
name: sortdb
public_title: Intégration Datadog/Sortdb
short_description: Prise en charge de la surveillance avec sortdb dans Datadog
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques du service [Sortdb][1] en temps réel pour :

- Visualiser et surveiller les statistiques Sortdb
- Être informé des failovers Sortdb
- Obtenir des statistiques concernant plusieurs instances et vérifier leur santé

## Configuration

Le check Sortdb n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Sortdb sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-sortdb==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

1. Modifiez le fichier `sortdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#collecte-de-metriques) Sortdb. Consultez le [fichier d'exemple sortdb.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `sortdb` dans la section Checks.

## Compatibilité

Le check SortDB est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques

Consultez le fichier [metadata.csv][9] pour découvrir la liste des métriques fournies par cette intégration.

### Checks de service
{{< get-service-checks-from-git "sortdb" >}}


## Dépannage

Le check SortDB n'inclut aucun événement.


[1]: https://github.com/jehiah/sortdb
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/assets/service_checks.json