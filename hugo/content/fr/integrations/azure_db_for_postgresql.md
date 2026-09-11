---
app_id: azure-db-for-postgresql
app_uuid: 6306388c-c569-497a-ba36-c584c74cfffc
assets:
  dashboards:
    azure_db_for_postgresql: assets/dashboards/azure_db_for_postgresql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbforpostgresql_servers.storage_used
      - azure.dbforpostgresql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbforpostgresql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 223
    source_type_name: Azure DB for PostgreSQL
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
git_integration_title: azure_db_for_postgresql
integration_id: azure-db-for-postgresql
integration_title: Azure DB for PostgreSQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_postgresql
public_title: Azure DB for PostgreSQL
short_description: Surveillez des métriques clés d'Azure Database pour PostgreSQL.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Surveillez des métriques clés d'Azure Database pour PostgreSQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for PostgreSQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

Azure Database pour PostgreSQL fournit une base de données en tant que service PostgreSQL community entièrement managée et conçue pour l'entreprise.

Recueillez des métriques d'Azure Database pour PostgreSQL pour :

- Visualiser les performances de vos bases de données PostgreSQL
- Corréler les performances de vos bases de données PostgreSQL avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure-db-for-postgresql" >}}


### Événements

L'intégration Azure Database pour PostgreSQL n'inclut aucun événement.

### Checks de service

L'intégration Azure Database pour PostgreSQL n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/