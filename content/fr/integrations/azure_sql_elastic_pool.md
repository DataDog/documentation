---
categories:
- azure
- cloud
- data stores
- provisioning
dependencies: []
description: Surveillez des métriques clés d'Azure SQL Elastic Pool.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
draft: false
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_id: azure-sql-elastic-pool
integration_title: Microsoft Azure SQL Elastic Pool
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Intégration Datadog/Microsoft Azure SQL Elastic Pool
short_description: Surveillez des métriques clés d'Azure SQL Elastic Pool.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Les pools élastiques constituent une solution simple et économique pour gérer les performances de plusieurs bases de données.

Recueillez des métriques d'Azure SQL Elastic Pool pour :

- Visualiser les performances de vos pools élastiques SQL
- Corréler les performances de vos pools élastiques SQL avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### Aide

L'intégration Azure SQL Elastic Pool n'inclut aucun événement.

### Aide

L'intégration Azure SQL Elastic Pool n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_elastic_pool/azure_sql_elastic_pool_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/