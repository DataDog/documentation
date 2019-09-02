---
aliases:
  - /fr/integrations/azure_datalakestore
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés Azure Data Lake Store.
doc_link: 'https://docs.datadoghq.com/integrations/azure_data_lake_store/'
git_integration_title: azure_data_lake_store
has_logo: true
integration_title: Microsoft Azure Data Lake Store
is_public: true
kind: integration
manifest_version: 1
name: azure_data_lake_store
public_title: Intégration Datadog/Microsoft Azure Data Lake Store
short_description: Surveillez des métriques Azure Data Lake Store.
version: 1
---
## Présentation

Azure Data Lake Store est une solution Data Lake sans limite qui améliore l'analytique Big Data.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Data Lake Store.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_data_lake_store" >}}


### Événements
L'intégration Azure Data Lake Store n'inclut aucun événement.

### Checks de service
L'intégration Azure Data Lake Store n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}