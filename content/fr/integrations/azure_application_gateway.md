---
aliases:
- /fr/integrations/azure_applicationgateway
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure Application Gateway.
doc_link: https://docs.datadoghq.com/integrations/azure_application_gateway/
draft: false
git_integration_title: azure_application_gateway
has_logo: true
integration_id: azure-applicationgateway
integration_title: Microsoft Azure Application Gateway
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_application_gateway
public_title: Intégration Datadog/Microsoft Azure Application Gateway
short_description: Surveillez des métriques clés d'Azure Application Gateway.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Application Gateway est un équilibreur de charge du trafic Web qui vous permet de gérer le trafic vers vos applications Web.

Utilisez l'intégration Datadog/Azure pour recueillir des métriques d'Azure Application Gateway.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_application_gateway" >}}


### Aide

L'intégration Azure Application Gateway n'inclut aucun événement.

### Aide

L'intégration Azure Application Gateway n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/