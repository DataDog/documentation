---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Azure\_Database pour MariaDB."
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
draft: false
git_integration_title: azure_db_pour_mariadb
has_logo: true
integration_id: azure-dbformariadb
integration_title: "Microsoft\_Azure\_Database pour MariaDB"
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_db_pour_mariadb
public_title: "Intégration Datadog/Microsoft\_Azure\_Database pour MariaDB"
short_description: "Surveillez des métriques clés d'Azure\_Database pour MariaDB."
version: '1.0'
---
## Présentation

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