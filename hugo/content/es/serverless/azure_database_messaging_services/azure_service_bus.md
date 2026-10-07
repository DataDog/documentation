---
title: Serverless Monitoring para Azure Service Bus
---
## Descripción general {#overview}

Datadog APM utiliza **tramos inferidos** para recopilar trazas y métricas de traza desde Azure Service Bus. Estos tramos aparecen directamente en flame graph y en visualizaciones de cascada.

Para Python y Node.js, Datadog traza los productores de Service Bus y los consumidores de Azure Functions. .NET admite el trazado completo de productores y consumidores. El trazado distribuido de Service Bus no requiere configuración adicional más allá de la instrumentación existente para los usuarios de APM.

{{< img src="serverless/azure_database_messaging/azure_service_bus/azure_service_bus_service_map.png" alt="Mapa de servicio que muestra una solicitud fluyendo a través de Azure API Management hacia servicios de backend. Texto alternativo sugerido: traza distribuida de Datadog conectando solicitudes del frontend a través de Azure API Management a servicios .NET de backend." style="width:100%;">}}

## Entornos de ejecución compatibles {#supported-runtimes}

| Entorno de ejecución | Versión mínima del trazador | Capa mínima de Lambda | SDK mínimo de Azure |
|---|---|---|---|
| Python 3.8/3.9 (Productor + consumidor de Azure Functions) | dd-trace-py v3.10.0 | lambda-python v3.19.6 | azure-servicebus >= 7.14.2 |
| Python 3.10+ (Productor + consumidor de Azure Functions) | dd-trace-py v3.10.0 | lambda-python v4.8.1 | azure-servicebus >= 7.14.2 |
| Node.js (Productor + consumidor de Azure Functions) | dd-trace-js v5.73.0 | lambda-js v12.129.0 | @azure/service-bus >= 7.9.2 |
| .NET (Productor y consumidor) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.ServiceBus >= 7.14.0 |