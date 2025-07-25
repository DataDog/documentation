---
categories:
- cloud
- configuration & deployment
- azure
dependencies: []
description: Surveillez des métriques clés du service Azure Batch.
doc_link: https://docs.datadoghq.com/integrations/azure_batch/
draft: false
git_integration_title: azure_batch
has_logo: true
integration_id: azure-batch
integration_title: Microsoft Azure Batch
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_batch
public_title: Intégration Datadog/Microsoft Azure Batch
short_description: Surveillez des métriques clés du service Azure Batch.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Le service Azure Batch est un processeur et un planificateur de tâches gérés pour vos applications Azure. Recueillez des métriques du service Azure Batch pour :

- Visualiser les performances de vos comptes Batch
- Corréler les performances de vos comptes Batch avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure-batch" >}}


### Aide

L'intégration Azure Batch Service n'inclut aucun événement.

### Aide

L'intégration Azure Batch Service n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_batch/azure_batch_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/