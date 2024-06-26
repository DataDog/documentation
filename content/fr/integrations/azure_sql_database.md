---
categories:
- cloud
- data stores
- caching
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure SQL Database.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_database/
draft: false
git_integration_title: azure_sql_database
has_logo: true
integration_id: azure-sql-database
integration_title: Microsoft Azure SQL Database
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_sql_database
public_title: Intégration Datadog/Microsoft Azure SQL Database
short_description: Surveillez des métriques clés d'Azure SQL Database.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure SQL Database vous offre une banque de données robuste et souple vous permettant de faire évoluer vos capacités en fonction de la demande.

Recueillez des métriques d'Azure SQL Database pour :

- Visualiser les performances de votre base de données SQL
- Corréler les performances de votre base de données SQL avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_sql_database" >}}


### Aide

L'intégration Azure SQL Database n'inclut aucun événement.

### Aide

L'intégration Azure SQL Database n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_database/azure_sql_database_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/