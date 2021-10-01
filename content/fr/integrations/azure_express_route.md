---
aliases:
  - /fr/integrations/azure_expressroute
categories:
  - cloud
  - azure
ddtype: crawler
dependencies: []
description: "Surveillez les métriques clés de Azure\_ExpressRoute."
doc_link: https://docs.datadoghq.com/integrations/azure_express_route/
draft: false
git_integration_title: azure_express_route
has_logo: true
integration_id: azure-expressroute
integration_title: "Microsoft\_Azure\_ExpressRoute"
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_express_route
public_title: "Intégration Datadog/Microsoft\_Azure\_ExpressRoute"
short_description: "Surveillez les métriques clés de Azure\_ExpressRoute."
version: '1.0'
---
## Présentation

Utilisez le service Azure ExpressRoute pour étendre vos réseaux locaux à Microsoft Cloud via une connexion privée facilitée par un fournisseur de connectivité.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure ExpressRoute.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées

### Métriques
{{< get-metrics-from-git "azure_express_route" >}}


### Événements

L'intégration Azure ExpressRoute n'inclut aucun événement.

### Checks de service

L'intégration Azure ExpressRoute n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/