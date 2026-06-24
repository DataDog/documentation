---
title: Serverless Monitoring para Azure Event Hubs
---
## Descripción general {#overview}

Datadog APM utiliza **tramos inferidos** para recopilar trazas y métricas de traza de Azure Event Hubs. Estos tramos son generados por los SDK de Datadog y aparecen directamente en flame graph y en waterfall views. 

Python y Node.js admiten productores; .NET admite tanto productores como consumidores. El rastreo distribuido de Event Hubs no requiere configuración adicional más allá de la instrumentación existente para los usuarios de APM.

## Entornos de ejecución compatibles {#supported-runtimes}

| Entorno de ejecución | Versión mínima de tracer | Capa mínima de Lambda | SDK mínimo de Azure |
|---|---|---|---|
| Python 3.8/3.9 (Solo productor) | dd-trace-py v3.17.0 | lambda-python v3.19.6 | azure-eventhub >= 5.12.2 |
| Python 3.10+ (Solo productor) | dd-trace-py v3.17.0 | lambda-python v4.8.1 | azure-eventhub >= 5.12.2 |
| Node.js (Solo productor) | dd-trace-js v5.72.0 | lambda-js v12.129.0 | @azure/event-hubs >= 6.0.0 |
| .NET (Productor y consumidor) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.EventHubs >= 5.9.2 |