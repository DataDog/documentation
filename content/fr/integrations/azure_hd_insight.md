---
aliases:
  - /fr/integrations/azure_hdinsight
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure HDInsight.
doc_link: https://docs.datadoghq.com/integrations/azure_hd_insight/
draft: false
git_integration_title: azure_hd_insight
has_logo: true
integration_id: azure-hdinsight
integration_title: Microsoft Azure HDInsight
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_hd_insight
public_title: "Intégration Datadog/Microsoft\_Azure HDInsight"
short_description: Surveillez des métriques clés d'Azure HDInsight.
version: '1.0'
---
## Présentation

Azure HDInsight est un service cloud qui simplifie, accélère et rentabilise le traitement de quantités importantes de données.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure HDInsight.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_hd_insight" >}}


### Événements

L'intégration Azure HDInsight n'inclut aucun événement.

### Checks de service

L'intégration Azure HDInsight n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/