---
aliases:
- /fr/integrations/azure_filestorage
categories:
- azure
- cloud
- data stores
dependencies: []
description: Surveillez des métriques clés de Stockage Fichier Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_file_storage/
draft: false
git_integration_title: azure_file_storage
has_logo: true
integration_id: azure-filestorage
integration_title: Stockage Fichier Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_file_storage
public_title: Intégration Datadog/Stockage Fichier Microsoft Azure
short_description: Surveillez des métriques clés de Stockage Fichier Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Stockage Fichier Azure offre des partages de fichiers managés dans le cloud, accessibles via le protocole SMB (Server Message Block) standard.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Stockage Fichier Azure.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_file_storage" >}}


### Aide

L'intégration Stockage Fichier Azure n'inclut aucun événement.

### Aide

L'intégration Stockage Fichier Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/