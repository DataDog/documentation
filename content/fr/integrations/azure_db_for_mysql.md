---
aliases:
- /fr/integrations/azure_dbformysql
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés d'Azure Database pour MySQL.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mysql/
draft: false
git_integration_title: azure_db_for_mysql
has_logo: true
integration_id: azure-db-for-mysql
integration_title: Microsoft Azure Database pour MySQL
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_db_for_mysql
public_title: Intégration Datadog/Microsoft Azure Database pour MySQL
short_description: Surveillez des métriques clés d'Azure Database pour MySQL.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Database pour MySQL fournit une base de données en tant que service MySQL community entièrement managée et conçue pour l'entreprise.

Recueillez des métriques d'Azure Database pour MySQL pour :

- Visualiser les performances de vos bases de données MySQL
- Corréler les performances de vos bases de données MySQL avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_db_for_mysql" >}}


### Aide

L'intégration Azure Database pour MySQL n'inclut aucun événement.

### Aide

L'intégration Azure Database pour MySQL n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/