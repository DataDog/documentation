---
title: Serverless Monitoring for Azure Service Bus
---

## Overview

Datadog APM uses **inferred spans** to collect traces and trace metrics from Azure Service Bus. These spans appear directly in flame graph and waterfall views.

For Python and Node.js, Datadog traces Service Bus producers and Azure Functions consumers. .NET supports full producer and consumer tracing. Service Bus distributed tracing requires no additional setup beyond existing instrumentation for APM users.

{{< img src="serverless/azure_database_messaging/azure_service_bus/azure_service_bus_service_map.png" alt="Service map showing a request flowing through Azure API Management into backend services. Suggested alt text: Datadog distributed trace connecting frontend requests through Azure API Management to backend .NET services." style="width:100%;">}}

## Supported runtimes

| Runtime | Min tracer version | Min Lambda Layer | Min Azure SDK |
|---|---|---|---|
| Python 3.8/3.9 (Producer + Azure Functions consumer) | dd-trace-py v3.10.0 | lambda-python v3.19.6 | azure-servicebus >= 7.14.2 |
| Python 3.10+ (Producer + Azure Functions consumer) | dd-trace-py v3.10.0 | lambda-python v4.8.1 | azure-servicebus >= 7.14.2 |
| Node.js (Producer + Azure Functions consumer) | dd-trace-js v5.73.0 | lambda-js v12.129.0 | @azure/service-bus >= 7.9.2 |
| .NET (Producer & consumer) | dd-trace-dotnet v3.30.0 | N/A | Azure.Messaging.ServiceBus >= 7.14.0 |
