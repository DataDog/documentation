---
aliases:
- /fr/integrations/azure_hdinsight
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure HDInsight.
doc_link: https://docs.datadoghq.com/integrations/azure_hd_insight/
draft: false
git_integration_title: azure_hd_insight
has_logo: true
integration_id: azure-hdinsight
integration_title: Microsoft Azure HDInsight
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_hd_insight
public_title: Intégration Datadog/Microsoft Azure HDInsight
short_description: Surveillez des métriques clés d'Azure HDInsight.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure HDInsight est un service cloud qui simplifie, accélère et rentabilise le traitement de quantités importantes de données.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure HDInsight.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_hd_insight" >}}


### Aide

L'intégration Azure HDInsight n'inclut aucun événement.

### Aide

L'intégration Azure HDInsight n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/