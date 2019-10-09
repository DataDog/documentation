---
aliases:
  - /fr/integrations/azure_filestorage
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Stockage Fichier Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure_file_storage/'
git_integration_title: azure_file_storage
has_logo: true
integration_title: Stockage Fichier Microsoft Azure
is_public: true
kind: integration
manifest_version: 1
name: azure_file_storage
public_title: Intégration Datadog/Stockage Fichier Microsoft Azure
short_description: Surveillez des métriques clés de Stockage Fichier Azure.
version: 1
---
## Présentation

Stockage Fichier Azure offre des partages de fichiers managés dans le cloud, accessibles via le protocole SMB (Server Message Block) standard.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de Stockage Fichier Azure.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_file_storage" >}}


### Événements
L'intégration Stockage Fichier Azure n'inclut aucun événement.

### Checks de service
L'intégration Stockage Fichier Azure n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].



{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://docs.datadoghq.com/fr/help
