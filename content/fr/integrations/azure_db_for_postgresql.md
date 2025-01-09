---
aliases:
- /fr/integrations/azure_dbforpostgresql
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés d'Azure Database pour PostgreSQL.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_postgresql/
draft: false
git_integration_title: azure_db_for_postgresql
has_logo: true
integration_id: azure-db-for-postgresql
integration_title: Microsoft Azure Database pour PostgreSQL
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_db_for_postgresql
public_title: Intégration Datadog/Microsoft Azure Database pour PostgreSQL
short_description: Surveillez des métriques clés d'Azure Database pour PostgreSQL.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Database pour PostgreSQL fournit une base de données en tant que service PostgreSQL community entièrement managée et conçue pour l'entreprise.

Recueillez des métriques d'Azure Database pour PostgreSQL pour :

- Visualiser les performances de vos bases de données PostgreSQL
- Corréler les performances de vos bases de données PostgreSQL avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_db_for_postgresql" >}}


### Aide

L'intégration Azure Database pour PostgreSQL n'inclut aucun événement.

### Aide

L'intégration Azure Database pour PostgreSQL n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/