---
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés de Stockage Blob Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_blob_storage/
draft: false
git_integration_title: azure_blob_storage
has_logo: true
integration_id: azure-blob-storage
integration_title: Stockage Blob Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_blob_storage
public_title: Intégration Datadog/Stockage Blob Microsoft Azure
short_description: Surveillez des métriques clés de Stockage Blob Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Stockage Blob Azure est une solution de stockage d'objets conçue par Microsoft pour le cloud. Le stockage de blobs est optimisé pour d'importants volumes de données non structurées. Recueillez des métriques de Stockage Blob Azure pour :

- Visualiser les performances de Stockage Blob
- Corréler les performances de Stockage Blob avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_blob_storage" >}}


### Aide

L'intégration Stockage Blob Azure n'inclut aucun événement.

### Aide

L'intégration Stockage Blob Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/