---
aliases: []
categories:
- azure
- cloud
- containers
dependencies: []
description: Recueillez des métriques d'Azure Container Apps.
doc_link: https://docs.datadoghq.com/integrations/azure_container_apps/
draft: false
git_integration_title: azure_container_apps
has_logo: true
integration_id: azure-container-apps
integration_title: Microsoft Azure Container Apps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_container_apps
public_title: Intégration Datadog/Microsoft Azure Container Apps
short_description: Recueillez des métriques d'Azure Container Apps.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Container Apps vous permet de créer et déployer des applications modernes et des microservices à l'aide de conteneurs sans serveur. Pour en savoir plus, consultez la [documentation de Microsoft][1] dédiée à Azure Container Apps.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez l'[intégration Microsoft Azure][2].

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_container_apps" >}}


### Aide

L'intégration Azure Container Apps n'inclut aucun événement.

### Aide

L'intégration Azure Container Apps n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/fr/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/