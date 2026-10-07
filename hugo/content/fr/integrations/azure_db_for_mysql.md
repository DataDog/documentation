---
app_id: azure-db-for-mysql
app_uuid: e0f71c73-4783-4ada-8bcf-d7f870a7b933
assets:
  dashboards:
    azure_db_for_mysql: assets/dashboards/azure_db_for_mysql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbformysql_servers.storage_used
      - azure.dbformysql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbformysql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 225
    source_type_name: Azure DB for MySQL
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
git_integration_title: azure_db_for_mysql
integration_id: azure-db-for-mysql
integration_title: Azure DB for MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_mysql
public_title: Azure DB for MySQL
short_description: Surveillez des métriques clés d'Azure Database pour MySQL.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Database pour MySQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for MySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Database pour MySQL fournit une base de données en tant que service MySQL community entièrement managée et conçue pour l'entreprise.

Recueillez des métriques d'Azure Database pour MySQL pour :

- Visualiser les performances de vos bases de données MySQL
- Corréler les performances de vos bases de données MySQL avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-db-for-mysql" >}}


### Événements

L'intégration Azure Database pour MySQL n'inclut aucun événement.

### Checks de service

L'intégration Azure Database pour MySQL n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/