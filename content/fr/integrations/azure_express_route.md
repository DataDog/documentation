---
aliases:
- /fr/integrations/azure_expressroute
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez les métriques clés de Azure ExpressRoute.
doc_link: https://docs.datadoghq.com/integrations/azure_express_route/
draft: false
git_integration_title: azure_express_route
has_logo: true
integration_id: azure-expressroute
integration_title: Microsoft Azure ExpressRoute
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_express_route
public_title: Intégration Datadog/Microsoft Azure ExpressRoute
short_description: Surveillez les métriques clés de Azure ExpressRoute.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Utilisez le service Azure ExpressRoute pour étendre vos réseaux locaux à Microsoft Cloud via une connexion privée facilitée par un fournisseur de connectivité.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques d'Azure ExpressRoute.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_express_route" >}}


### Aide

L'intégration Azure ExpressRoute n'inclut aucun événement.

### Aide

L'intégration Azure ExpressRoute n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_express_route/azure_express_route_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/