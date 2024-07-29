---
app_id: ignite
app_uuid: 0e1f1ef2-ea62-4ae4-a99f-8c40171b729c
assets:
  dashboards:
    Ignite Overview: assets/dashboards/ignite_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ignite.received_messages
      metadata_path: metadata.csv
      prefix: ignite.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Ignite
  logs:
    source: ignite
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data store
- log collection
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ignite/README.md
display_on_public_website: true
draft: false
git_integration_title: ignite
integration_id: ignite
integration_title: ignite
integration_version: 2.2.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ignite
public_title: ignite
short_description: Recueillez des métriques à partir de votre serveur Ignite.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Store
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Recueillez des métriques à partir de votre serveur Ignite.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ignite
---



## Présentation

Ce check permet de surveiller [Ignite][1].

## Implémentation

### Installation

Le check Ignite est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Configuration d'Ignite

L'exportateur de métriques JMX est activé par défaut, mais vous devrez peut-être choisir le port à exposer ou activer l'authentification en fonction des paramètres de sécurité de votre réseau. L'image Docker officielle utilise le port `49112` par défaut.

Pour le logging, nous vous conseillons fortement d'activer [log4j][3] afin que les logs affichent les dates complètes.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `ignite.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Ignite. Consultez le [fichier d'exemple ignite.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des informations supplémentaires.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][3].

2. [Redémarrez l'Agent][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `ignite.d/conf.yaml` pour commencer à recueillir vos logs Ignite :

   ```yaml
     logs:
       - type: file
         path: <IGNITE_HOME>/work/log/ignite-*.log
         source: ignite
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \[\d{4}\-\d{2}\-\d{2}
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple ignite.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

Pour recueillir des métriques avec l'intégration Datadog/Ignite, consultez le guide [Autodiscovery avec JMX][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Docker][3].

| Paramètre      | Valeur                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "ignite", "service": "<NOM_SERVICE>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[2]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `ignite` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ignite" >}}


### Événements

L'intégration Ignite n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ignite" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].



[1]: https://ignite.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apacheignite.readme.io/docs/logging#section-log4j
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/ignite/datadog_checks/ignite/data/conf.yaml.example