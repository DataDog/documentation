---
categories:
- cloud
- azure
dependencies: []
description: Surveillez des métriques clés d'Azure App Services.
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
draft: false
git_integration_title: azure_app_services
has_logo: true
integration_id: azure-app-services
integration_title: Microsoft Azure App Service
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_app_services
public_title: Intégration Datadog/Microsoft Azure App Service
short_description: Surveillez des métriques clés d'Azure App Services.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure App Service est une plateforme en tant que service qui exécute des applications Web, mobiles, API et de logique métier, et gère automatiquement les ressources requises par ces applications.

Recueillez des métriques d'Azure App Service pour :

- Visualiser les performances de vos applications
- Corréler les performances de vos applications Azure avec vos autres applications

### Vue Azure App Service

Outre le dashboard Azure App Service prédéfini, vous pouvez également utiliser la vue Azure App Service dédiée.

Utilisez la vue Azure App Service pour :

- Identifier rapidement les apps qui présentent une forte latence ou génèrent beaucoup d'erreurs

- Surveiller l'utilisation de vos applications Web, applications de fonctions et plans App Service

- Obtenir des informations exploitables sur les coûts de vos plans App Service, en visualisant le nombre d'instances actives et en consultant les applications en cours d'exécution qui transmettent des traces ou des logs à Datadog

- Mapper les apps en cours d'exécution avec les plans App Service sur lesquels elles sont exécutées, afin d'identifier celles qui sont coûteuses ou lentes

Pour activer l'APM Datadog et les métriques custom pour vos applications exécutées dans Azure App Service, consultez la section [Extension Microsoft Azure App Service][1].

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][2]. Aucune autre procédure d'installation n'est requise.

Pour obtenir des options de surveillance supplémentaires, notamment pour l'injection d'ID de trace et de log, consultez la documentation relative à l'[extension Azure App Service][1].

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_app_services" >}}


### Aide

L'intégration Azure App Service n'inclut aucun événement.

### Aide

L'intégration Azure App Service n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/fr/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/