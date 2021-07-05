---
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Service Bus.
doc_link: 'https://docs.datadoghq.com/integrations/azure_service_bus/'
draft: false
git_integration_title: azure_service_bus
has_logo: true
integration_id: azure-service-bus
integration_title: Microsoft Azure Service Bus
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_service_bus
public_title: Intégration Datadog/Microsoft Azure Service Bus
short_description: Surveillez des métriques clés d'Azure Service Bus.
version: '1.0'
---
## Présentation

Microsoft Azure Service Bus est un courtier de messages d'intégration d'entreprise entièrement géré.

Recueillez des métriques d'Azure Service Bus pour :

- Visualiser les performances de votre Service Bus
- Corréler les performances de vos Service Bus avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_service_bus" >}}


### Événements

L'intégration Azure Service Bus n'inclut aucun événement.

### Checks de service

L'intégration Azure Service Bus n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/