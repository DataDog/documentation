---
aliases:
- /fr/infrastructure/serverless/azure_app_services/
- /fr/serverless/azure_app_services/
- /fr/serverless/azure
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentation
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentation
  text: Environnement Azure App Service
- link: /serverless/guide/disable_serverless
  tag: Documentation
  text: Désactiver Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#web-apps-app-service
  tag: Documentation
  text: Envoyez les traces Azure App Service vers Datadog avec OTLP
- link: https://www.datadoghq.com/blog/azure-app-service-extension/
  tag: Blog
  text: Surveiller des applications Web .NET avec l'extension Datadog pour Azure App Service
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Déployer des applications ASP.NET Core sur Azure App Service
- link: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=azure-app-service#products
  tag: Tarification
  text: Tarifs de l'APM pour Azure App Service
title: Serverless Monitoring pour Azure App Service
---
## Vue d'ensemble {#overview}

[Azure App Service][1] est une plateforme qui héberge des applications web, des API REST et des backends mobiles. Datadog Serverless Monitoring fournit des métriques, des logs et des traces pour vos applications Azure App Service

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Datadog UI, page Serverless Monitoring avec Azure App Service sélectionné" style="width:100%;" >}}

Dans Datadog, utilisez la page [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][4] pour dépanner toutes vos ressources Azure.

### Métriques et logs Azure {#azure-metrics-and-logs}

Installez l'[intégration Azure][2] pour les [métriques enrichies][3] et les métadonnées de ressources pour Azure App Service

Configurez [Azure log forwarding][6] pour collecter et envoyer automatiquement les logs de ressources et d'applications Azure App Service vers Datadog

### APM et métriques personnalisées {#apm-and-custom-metrics}

Pour surveiller les charges de travail Azure App Service avec l'APM et des métriques personnalisées, vous pouvez instrumenter vos charges de travail Azure App Service.

| OS      | Runtime   | Documentation               |
|---------|-----------|-----------------------------|
| Linux   | Java, Node.js, .NET, PHP, Python | [Linux - Code instrumentation][7] |
| Linux   | Container | [Linux - Container instrumentation][8] |
| Windows | Java, Node.js, .NET | [Windows - Code instrumentation][9]

Fonctionnalités :
- Traçage APM entièrement distribué utilisant une instrumentation automatique
- Vues personnalisées des services APM et des traces, affichant les métriques et les métadonnées pertinentes pour Azure App Service
- Instrumentation APM manuelle pour personnaliser les spans
- `Trace_ID` injection dans les logs d'application
- Métriques personnalisées avec [DogStatsD][10]

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /fr/integrations/azure/
[3]: /fr/integrations/azure_app_services/#metrics
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /fr/integrations/azure/#setup
[6]: /fr/logs/guide/azure-automated-log-forwarding/
[7]: /fr/serverless/azure_app_service/linux_code
[8]: /fr/serverless/azure_app_service/linux_container
[9]: /fr/serverless/azure_app_service/windows_code
[10]: /fr/extend/dogstatsd/