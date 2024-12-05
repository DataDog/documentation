---
aliases:
- /fr/integrations/azure_networkinterface
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez des métriques clés d'Azure Network Interface.
doc_link: https://docs.datadoghq.com/integrations/azure_network_interface/
draft: false
git_integration_title: azure_network_interface
has_logo: true
integration_id: azure-networkinterface
integration_title: Microsoft Azure Network Interface
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_network_interface
public_title: Intégration Datadog/Microsoft Azure Network Interface
short_description: Surveillez des métriques clés d'Azure Network Interface.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Network Interface permet à une machine virtuelle Azure de communiquer avec Internet, Azure et des ressources sur site.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Network Interface.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_network_interface" >}}


### Aide

L'intégration Azure Network Interface n'inclut aucun événement.

### Aide

L'intégration Azure Network Interface n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/