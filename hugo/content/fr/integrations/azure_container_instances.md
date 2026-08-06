---
aliases:
- /fr/integrations/azure_containerinstances
categories:
- azure
- cloud
- incident-teams
- provisioning
custom_kind: integration
dependencies: []
description: Surveillez des métriques clés d'Azure Container Instances.
doc_link: https://docs.datadoghq.com/integrations/azure_container_instances/
draft: false
git_integration_title: azure_container_instances
has_logo: true
integration_id: azure-containerinstances
integration_title: Microsoft Azure Container Instances
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_container_instances
public_title: Intégration Datadog/Microsoft Azure Container Instances
short_description: Surveillez des métriques clés d'Azure Container Instances.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Section Overview

Azure Container Instances est un service qui permet aux développeurs de déployer des conteneurs sans avoir à provisionner ou gérer l'infrastructure sous-jacente.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Container Instances.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{ get-metrics-from-git "azure-containerinstances" }}


### Événements

L'intégration Azure Container Instances n'inclut aucun événement.

### Checks de service

L'intégration Azure Container Instances n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/