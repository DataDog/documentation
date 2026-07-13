---
title: Surveillance sans serveur pour Azure Service Bus
---
## Aperçu {#overview}

Datadog APM utilise **des spans inférés** pour collecter des traces et des métriques de trace à partir d'Azure Service Bus. Ces spans apparaissent directement dans les vues de graphique en flamme et de cascade.

Pour Python et Node.js, Datadog trace les producteurs de Service Bus et les consommateurs d'Azure Functions. .NET prend en charge le traçage complet des producteurs et des consommateurs. Le traçage distribué de Service Bus ne nécessite aucune configuration supplémentaire au-delà de l'instrumentation existante pour les utilisateurs d'APM.

{{< img src="serverless/azure_database_messaging/azure_service_bus/azure_service_bus_service_map.png" alt="Carte de service montrant une demande circulant à travers Azure API Management vers des services backend. Texte alternatif suggéré : Trace distribuée Datadog connectant les demandes frontend via Azure API Management aux services .NET backend." style="width:100%;">}}

## Runtimes pris en charge {#supported-runtimes}

| Runtime | Version minimale du traceur | Min Lambda Layer | Min Azure SDK |
|---|---|---|---|
| Python 3.8/3.9 (Producteur + consommateur d'Azure Functions) | dd-trace-py v3.10.0 | lambda-python v3.19.6 | azure-servicebus >= 7.14.2 |
| Python 3.10+ (Producteur + consommateur d'Azure Functions) | dd-trace-py v3.10.0 | lambda-python v4.8.1 | azure-servicebus >= 7.14.2 |
| Node.js (Producteur + consommateur d'Azure Functions) | dd-trace-js v5.73.0 | lambda-js v12.129.0 | @azure/service-bus >= 7.9.2 |
| .NET (Producteur & consommateur) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.ServiceBus >= 7.14.0 |