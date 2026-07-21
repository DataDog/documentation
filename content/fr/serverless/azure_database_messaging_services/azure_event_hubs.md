---
title: Surveillance sans serveur pour Azure Event Hubs
---
## Aperçu {#overview}

Datadog APM utilise **des spans inférés** pour collecter des traces et des métriques de traces à partir d'Azure Event Hubs. Ces spans sont générés par les SDK de tracer de Datadog et apparaissent directement dans les flame graphs et les waterfall views. 

Python et Node.js prennent en charge les producteurs ; .NET prend en charge à la fois les producteurs et les consommateurs. Le traçage distribué des Event Hubs ne nécessite aucune configuration supplémentaire au-delà de l'instrumentation existante pour les utilisateurs d'APM.

## Environnements d'exécution pris en charge {#supported-runtimes}

| Environnement d'exécution | Version minimale du traceur | Couche Lambda minimale | SDK Azure minimal |
|---|---|---|---|
| Python 3.8/3.9 (Producteur uniquement) | dd-trace-py v3.17.0 | lambda-python v3.19.6 | azure-eventhub >= 5.12.2 |
| Python 3.10+ (Producteur uniquement) | dd-trace-py v3.17.0 | lambda-python v4.8.1 | azure-eventhub >= 5.12.2 |
| Node.js (Producteur uniquement) | dd-trace-js v5.72.0 | lambda-js v12.129.0 | @azure/event-hubs >= 6.0.0 |
| .NET (Producteur et consommateur) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.EventHubs >= 5.9.2 |