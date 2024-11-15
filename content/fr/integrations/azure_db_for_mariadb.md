---
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés d'Azure Database pour MariaDB.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
draft: false
git_integration_title: azure_db_pour_mariadb
has_logo: true
integration_id: azure-dbformariadb
integration_title: Microsoft Azure Database pour MariaDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_db_pour_mariadb
public_title: Intégration Datadog/Microsoft Azure Database pour MariaDB
short_description: Surveillez des métriques clés d'Azure Database pour MariaDB.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Database pour MariaDB offre une version communautaire complètement managée et prête à l'emploi de MariaDB en tant que service.

Recueillez des métriques d'Azure Database pour MariaDB pour :

- Visualiser les performances de vos bases de données MariaDB 
- Corréler les performances de vos bases de données MariaDB avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### Aide

L'intégration Azure Database pour MariaDB n'inclut aucun événement.

### Aide

Azure Database pour MariaDB n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/