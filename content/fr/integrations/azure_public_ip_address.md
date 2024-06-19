---
aliases:
- /fr/integrations/azure_publicipaddress
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques d'adresse IP publique Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_public_ip_address/
draft: false
git_integration_title: azure_public_ip_address
has_logo: true
integration_id: azure-publicipaddress
integration_title: Adresse IP publique Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_public_ip_address
public_title: Intégration Datadog/Adresse IP publique Microsoft Azure
short_description: Surveillez des métriques d'adresse IP publique Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Lorsqu'elle est assignée à une ressource, une adresse IP publique Azure permet une connectivité entrante et une connectivité sortante à partir d'Internet.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'adresse IP publique Azure.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_public_ip_address" >}}


### Aide

L'intégration Adresse IP publique Azure n'inclut aucun événement.

### Aide

L'intégration Adresse IP publique Azure n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/