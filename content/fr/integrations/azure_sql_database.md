---
categories:
  - cloud
  - data store
  - caching
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure SQL Database.
doc_link: 'https://docs.datadoghq.com/integrations/azure_sql_database/'
draft: false
git_integration_title: azure_sql_database
has_logo: true
integration_title: Microsoft Azure SQL Database
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_sql_database
public_title: Intégration Datadog/Microsoft Azure SQL Database
short_description: Surveillez des métriques clés d'Azure SQL Database.
version: '1.0'
---
## Présentation

Azure SQL Database vous offre une banque de données robuste et souple vous permettant de faire évoluer vos capacités en fonction de la demande.

Recueillez des métriques d'Azure SQL Database pour :

- Visualiser les performances de votre base de données SQL
- Corréler les performances de votre base de données SQL avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_sql_database" >}}


### Événements

L'intégration Azure SQL Database n'inclut aucun événement.

### Checks de service

L'intégration Azure SQL Database n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_database/azure_sql_database_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/