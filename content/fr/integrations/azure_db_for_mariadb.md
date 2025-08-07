---
app_id: azure-dbformariadb
app_uuid: 7d232ca6-3098-473a-8d53-e6c3e22653bd
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.dbformariadb_servers.active_connections
      metadata_path: metadata.csv
      prefix: azure.dbformariadb_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 290
    source_type_name: Azure DB pour MariaDB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- data stores
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_db_pour_mariadb
integration_id: azure-dbformariadb
integration_title: Azure DB pour MariaDB
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_pour_mariadb
public_title: Azure DB pour MariaDB
short_description: Surveillez des métriques clés d'Azure Database pour MariaDB.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Database pour MariaDB.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB pour MariaDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Database pour MariaDB offre une version communautaire complètement managée et prête à l'emploi de MariaDB en tant que service.

Recueillez des métriques d'Azure Database pour MariaDB pour :

- Visualiser les performances de vos bases de données MariaDB 
- Corréler les performances de vos bases de données MariaDB avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### Événements

L'intégration Azure Database pour MariaDB n'inclut aucun événement.

### Checks de service

Azure Database pour MariaDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/