---
description: Intégrez vos traces distribuées Azure Application Insights dans Datadog
  APM sans réinstrumenter votre application.
further_reading:
- link: /integrations/azure/
  tag: Documentation
  text: Intégration Microsoft Azure
title: Intégration Azure App Insights
---
{{< callout url="https://www.datadoghq.com/product-preview/azure-app-insights-integration/" header="Rejoignez la préversion" >}}
L'intégration Azure App Insights est en préversion. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Intégrez vos traces distribuées Azure Application Insights dans Datadog APM. Datadog convertit les traces App Insights en spans APM et enrichit les spans des services pris en charge avec les métadonnées de ressources Azure.

{{< img src="tracing/guide/serverless_enable_azure_app_insights/app-insights-azure-fn-example.png" alt="Une trace Azure Application Insights affichée dans le graphique en flamme Datadog APM, avec les métadonnées de ressources Azure visibles sur le span sélectionné." style="width:100%;" >}}

L'intégration lit les enregistrements App Insights transmis à Datadog en tant que logs et en émet des spans APM. Aucune modification de votre code d'application ou de votre instrumentation n'est requise.

## Fonctionnement {#how-it-works}

Lorsque Application Insights est activé sur vos charges de travail et que vos logs Azure sont transmis à Datadog, Datadog :

1. Lit les enregistrements App Insights à partir de vos logs Azure transmis.
2. Convertit chaque opération App Insights en un span Datadog APM, en préservant les relations parent-enfant à travers le format hiérarchique hérité Request-Id et le W3C Trace Context.
3. Enrichit les spans pour [les services Azure pris en charge](#supported-azure-services) avec les métadonnées de ressources Azure, y compris le groupe de ressources, l'abonnement, la région et les tags de ressources.

Après la conversion, les spans se comportent comme n'importe quels autres spans Datadog APM. Ils apparaissent dans la même vue en cascade, prennent en charge la recherche de traces et sont corrélés avec vos logs et métriques.

## Prérequis {#prerequisites}

Avant de pouvoir utiliser l'intégration Azure App Insights, configurez les éléments suivants :

1. **Activez Azure Application Insights** sur les charges de travail Azure que vous souhaitez tracer, en utilisant le SDK Application Insights classique. Si votre charge de travail utilise la [distribution OpenTelemetry Azure Monitor][5], consultez plutôt [OpenTelemetry dans Datadog][6].
2. **Configurez le [transfert automatisé de logs Azure][2]** pour transférer les logs Azure App Insights vers Datadog. Confirmez que la collecte des métriques et des ressources est activée dans l'[intégration Microsoft Azure][1], afin que les spans puissent être enrichis avec les métadonnées de ressources Azure.

{{% serverless/log_to_trace_indexing_note %}}

## Services Azure pris en charge {#supported-azure-services}

Datadog enrichit les spans convertis avec les métadonnées de ressources Azure pour les services suivants :

- Azure Functions
- Azure App Service
- Azure Storage
- Azure Cosmos DB
- Azure API Management
- Azure Cache for Redis

Les traces provenant d'autres services Azure sont converties en spans APM, mais sans enrichissement par les métadonnées de ressources Azure.

## Demander l'accès {#request-access}

L'intégration Azure App Insights est en préversion. Pour demander l'accès, inscrivez-vous via le [formulaire de préversion][4]. L'équipe Datadog répond dans un délai d'une semaine pour confirmer l'accès.

## Limitations {#limitations}

- **Statut de la préversion.** L'intégration est en préversion avec un groupe restreint de partenaires de conception. L'accès est accordé après l'inscription via le formulaire de préversion.
- **L'enrichissement des métadonnées de ressources est spécifique au service.** Les spans pour les services Azure en dehors de la [liste prise en charge](#supported-azure-services) sont convertis mais ne sont pas enrichis avec les métadonnées de ressources Azure.
- **La hiérarchie des traces au format mixte dépend des liens de span.** Certaines charges de travail Azure émettent un mélange du format hiérarchique hérité Request-Id et du contexte de trace W3C. Datadog connecte les deux formats avec des [liens de span][3], afin que vous puissiez naviguer entre les traces associées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/azure/
[2]: /fr/logs/guide/azure-automated-log-forwarding/
[3]: /fr/tracing/trace_collection/span_links/
[4]: https://www.datadoghq.com/product-preview/azure-app-insights-integration/
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable
[6]: /fr/opentelemetry/