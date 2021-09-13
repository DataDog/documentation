---
aliases:
  - /fr/integrations/azure_publicipaddress
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques d'adresse IP publique Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_public_ip_address/
draft: false
git_integration_title: azure_public_ip_address
has_logo: true
integration_id: azure-publicipaddress
integration_title: Adresse IP publique Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_public_ip_address
public_title: "Intégration Datadog/Adresse IP publique Microsoft\_Azure"
short_description: Surveillez des métriques d'adresse IP publique Azure.
version: '1.0'
---
## Présentation

Lorsqu'elle est assignée à une ressource, une adresse IP publique Azure permet une connectivité entrante et une connectivité sortante à partir d'Internet.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'adresse IP publique Azure.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_public_ip_address" >}}


### Événements

L'intégration Adresse IP publique Azure n'inclut aucun événement.

### Checks de service

L'intégration Adresse IP publique Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/