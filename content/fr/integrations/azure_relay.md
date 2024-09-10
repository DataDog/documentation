---
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez des métriques clés d'Azure Relay.
doc_link: https://docs.datadoghq.com/integrations/azure_relay/
draft: false
git_integration_title: azure_relay
has_logo: true
integration_id: azure-relay
integration_title: Microsoft Azure Relay
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_relay
public_title: Intégration Datadog/Microsoft Azure Relay
short_description: Surveillez des métriques clés d'Azure Relay.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Le service Azure Relay vous permet d'exposer en toute sécurité les services exécutés dans votre réseau d'entreprise sur le cloud public. Vous pouvez le faire sans ouvrir de port sur votre pare-feu ni apporter de changements intrusifs à votre infrastructure réseau d'entreprise.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure Relay.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_relay" >}}


### Aide

L'intégration Azure Relay n'inclut aucun événement.

### Aide

L'intégration Azure Relay n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/