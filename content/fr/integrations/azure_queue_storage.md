---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Stockage File d'attente Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_queue_storage/
draft: false
git_integration_title: azure_queue_storage
has_logo: true
integration_id: azure-queue-storage
integration_title: Stockage File d'attente Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_queue_storage
public_title: Intégration Datadog/Stockage File d'attente Microsoft Azure
short_description: Surveillez des métriques clés de Stockage File d'attente Azure.
version: '1.0'
---
## Présentation

Stockage File d'attente Azure est un service qui vous permet de stocker un grand nombre de messages afin de pouvoir y accéder où que vous soyez via des appels authentifiés, à l'aide du protocole HTTP ou HTTPS.

Recueillez des métriques de Stockage File d'attente Azure pour :

- Visualiser les performances de votre stockage de file d'attente
- Corréler les performances de votre stockage de file d'attente avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_queue_storage" >}}


### Événements

L'intégration Stockage File d'attente Azure n'inclut aucun événement.

### Checks de service

L'intégration Stockage File d'attente Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/