---
app_id: scylla
app_uuid: 1d655820-3010-4ae3-8273-a3798321d4d4
assets:
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scylla.node.operation_mode
      metadata_path: metadata.csv
      prefix: scylla.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Scylla
  logs:
    source: scylla
  monitors:
    '[Scylla] Server is shutting down': assets/monitors/instance_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/scylla/README.md
display_on_public_website: true
draft: false
git_integration_title: scylla
integration_id: scylla
integration_title: Scylla
integration_version: 2.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: scylla
public_title: Scylla
short_description: Surveillez la santé des clusters, leurs ressources, leurs latences,
  et bien plus encore.
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
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez la santé des clusters, leurs ressources, leurs latences,
    et bien plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Scylla
---



## Présentation

Cette intégration Datadog/[Scylla][1] recueille la majorité des métriques exposées par défaut et offre la possibilité de personnaliser des groupes supplémentaires en fonction de vos besoins.

Scylla est un datastore NoSQL open source qui peut être utilisé en tant qu'alternative instantanée à Apache Cassandra. Il fait appel à une version réarchitecturée du modèle Cassandra, optimisée pour le matériel moderne afin de réduire la taille des clusters requis tout en améliorant le débit et les performances théoriques.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Scylla est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `scylla.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Scylla. Consultez le [fichier d'exemple scylla.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

##### Collecte de logs

Scylla génère ses logs de différentes façons en fonction de l'environnement dans lequel l'application est exécutée. Consultez la [documentation de Scylla][5] pour en savoir plus.

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

      ```yaml
       logs_enabled: true
     ```

2. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `scylla.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `type`, `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple scylla.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: scylla
           service: <SERVICE_NAME>
           #To handle multi line that starts with yyyy-mm-dd use the following pattern
           #log_processing_rules:
           #  - type: multi_line
           #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #    name: new_log_start_with_date
     ```

3. [Redémarrez l'Agent][4].

Pour activer les logs pour les environnements Kubernetes, consultez la section [Collecte de logs Kubernetes][7].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `scylla` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "scylla" >}}


### Événements

Le check Scylla n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "scylla" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://scylladb.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.scylladb.com/getting-started/logging/
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/scylla/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/