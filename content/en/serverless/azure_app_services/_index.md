---
title: Monitoring Azure App Service
aliases:
  - /infrastructure/serverless/azure_app_services/
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
- link: "https://www.datadoghq.com/blog/azure-app-service-extension/"
  tag: "Blog"
  text: "Monitor .NET web apps with the Datadog extension for Azure App Service"
- link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
  tag: "Blog"
  text: "Deploy ASP.NET Core applications to Azure App Service"
- link: "https://www.datadoghq.com/pricing/?product=application-performance-monitoring#application-performance-monitoring-apm_faq-what-is-considered-as-a-host-for-azure-app-services"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
---

## Overview

[Azure App Service][1] hosts web applications, REST APIs, and mobile backends.

To get started with monitoring Azure App Service, install the Azure integration for metrics and logs, and Azure App Service instrumentation for APM and custom metrics.

### Azure Integration

The [Azure integration][3] provides [enriched metrics][2] and resource metadata for Azure App Service, and are required for the [Azure App Service View][4] in Datadog. Follow the [Azure integration setup instructions][6] to install the Azure integration.

Additionally, [set up Azure log forwarding][5] to automatically collect and send Azure App Service resource and application logs to Datadog.

### Azure App Service Instrumentation

To monitor Azure App Service workloads with APM and custom metrics, install instrumentation on your Azure App Service workloads. This instrumentation is available for both Windows and Linux App Services, and supports the following runtimes on Basic, Standard, and Premium plans:

| OS | Runtime |Documentation| 
|----|---------|-----|
|Windows|.NET|[Windows .NET setup][7]|
|Windows|Java|[Windows Java setup][8]|
|Windows|Node.js|[Windows Node.js setup][13]|
|Linux|.NET|[Linux .NET setup][9]|
|Linux|Node.js|[Linux Node.js setup][9]|
|Linux|PHP|[Linux PHP setup][9]|
|Linux|Java|[Linux Java setup][10]|
|Linux|Python|[Linux Python setup][9]|
|Linux|Container|[Linux Container setup][12]|


Capabilities:
- Fully distributed APM tracing using automatic instrumentation
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata
- Manual APM instrumentation to customize spans
- `Trace_ID` injection into application logs
- Custom metrics with [DogStatsD][11]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /integrations/azure_app_services/#metrics
[3]: /integrations/azure/
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /logs/guide/azure-logging-guide/
[6]: /integrations/azure/#setup
[7]: /serverless/azure_app_services/azure_app_services_windows/?tab=net
[8]: /serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /serverless/azure_app_services/azure_app_services_linux?tab=net
[10]: /serverless/azure_app_services/azure_app_services_linux?tab=java
[11]: /developers/dogstatsd/
[12]: /serverless/azure_app_services/azure_app_services_container
[13]: /serverless/azure_app_services/azure_app_services_windows?tab=nodejs#setup
