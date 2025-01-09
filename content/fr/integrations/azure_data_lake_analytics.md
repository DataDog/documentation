---
aliases:
- /fr/integrations/azure_datalakeanalytics
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés Azure Data Lake Analytics.
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
draft: false
git_integration_title: azure_data_lake_analytics
has_logo: true
integration_id: azure-datalakeanalytics
integration_title: Microsoft Azure Data Lake Analytics
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_data_lake_analytics
public_title: Intégration Datadog/Microsoft Azure Data Lake Analytics
short_description: Surveillez des métriques clés Azure Data Lake Analytics.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Data Lake Analytics est un service d'analytique à la demande qui simplifie la gestion des Big Data.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Data Lake Analytics.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_data_lake_analytics" >}}


### Aide

L'intégration Azure Data Lake Analytics n'inclut aucun événement.

### Aide

L'intégration Azure Data Lake Analytics n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/