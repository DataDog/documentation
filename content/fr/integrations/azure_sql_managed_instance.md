---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure SQL Managed Instance.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_managed_instance/
draft: false
git_integration_title: azure_sql_managed_instance
has_logo: true
integration_id: ''
integration_title: Microsoft Azure SQL Managed Instance
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_sql_managed_instance
public_title: Intégration Datadog/Microsoft Azure SQL Managed Instance
short_description: Surveillez des métriques clés d'Azure SQL Managed Instance.
version: '1.0'
---
## Présentation

Azure SQL Managed Instance est un service de base de données cloud intelligent et évolutif qui combine la plus grande compatibilité de moteur SQL Server avec tous les avantages d'une plateforme en tant que service entièrement gérée.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques de SQL Managed Instance.

## Configuration
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### Événements
L'intégration Azure SQL Managed Instance n'inclut aucun événement.

### Checks de service
L'intégration Azure SQL Managed Instance n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/