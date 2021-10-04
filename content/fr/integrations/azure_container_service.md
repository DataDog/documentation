---
aliases:
  - /fr/integrations/azure_containerservice
categories:
  - cloud
  - containers
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés Azure Kubernetes Service.
doc_link: https://docs.datadoghq.com/integrations/azure_container_service/
draft: false
git_integration_title: azure_container_service
has_logo: true
integration_id: azure-containerservice
integration_title: Microsoft Azure Kubernetes Service
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_container_service
public_title: Intégration Datadog/Microsoft Azure Kubernetes Service
short_description: Surveillez des métriques clés Azure Kubernetes Service.
version: '1.0'
---
## Présentation

Azure Kubernetes Service vous permet de déployer rapidement un cluster Kubernetes prêt pour la production.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Kubernetes Service.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_container_service" >}}


### Événements

L'intégration Azure Kubernetes Service n'inclut aucun événement.

### Checks de service

L'intégration Azure Kubernetes Service n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_service/azure_container_service_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/