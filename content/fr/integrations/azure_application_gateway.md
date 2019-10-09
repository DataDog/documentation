---
aliases:
  - /fr/integrations/azure_applicationgateway
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Azure Application Gateway.
doc_link: 'https://docs.datadoghq.com/integrations/azure_application_gateway/'
git_integration_title: azure_application_gateway
has_logo: true
integration_title: Microsoft Azure Application Gateway
is_public: true
kind: integration
manifest_version: 1
name: azure_application_gateway
public_title: Intégration Datadog/Microsoft Azure Application Gateway
short_description: Surveillez des métriques clés d'Azure Application Gateway.
version: 1
---
## Présentation

Azure Application Gateway est un équilibreur de charge du trafic Web qui vous permet de gérer le trafic vers vos applications Web.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Application Gateway.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_application_gateway" >}}


### Événements
L'intégration Azure Application Gateway n'inclut aucun événement.

### Checks de service
L'intégration Azure Application Gateway n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].



{{< get-dependencies >}}
[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://docs.datadoghq.com/fr/help
