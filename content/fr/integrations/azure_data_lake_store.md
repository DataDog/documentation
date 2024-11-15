---
aliases:
- /fr/integrations/azure_datalakestore
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés Azure Data Lake Store.
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_store/
draft: false
git_integration_title: azure_data_lake_store
has_logo: true
integration_id: azure-datalakestore
integration_title: Microsoft Azure Data Lake Store
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_data_lake_store
public_title: Intégration Datadog/Microsoft Azure Data Lake Store
short_description: Surveillez des métriques Azure Data Lake Store.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Data Lake Store est une solution Data Lake sans limite qui améliore l'analytique Big Data.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Data Lake Store.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_data_lake_store" >}}


**Remarque**: cette intégration permet uniquement la collecte de métriques pour Data Lake Storage Gen1. Data Lake Storage Gen2 étant basé sur Azure Blob Storage, les métriques associées peuvent être visualisées sur Datadog en définissant l'espace de nommage Blob Storage suivant : `azure.storage_storageaccounts_blobservices.*`. Pour en savoir plus, consultez la documentation sur [Azure Data Lake Storage Gen2][3].

### Aide

L'intégration Azure Data Lake Store n'inclut aucun événement.

### Aide

L'intégration Azure Data Lake Store n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/fr/help/