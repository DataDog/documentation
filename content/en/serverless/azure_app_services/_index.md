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

Datadog provides the following monitoring capabilities for all Azure App Service resource types:

- Azure Monitor [metrics][2] for web apps, using the [Azure integration][3].
- The [Azure App Service View][4] in Datadog, where you can quickly spot issues, map relationships between your Azure App Service resources, and gain insights into cost and performance.
- Submit custom metrics through the API.
- Submit [resource logs][5] through [Event Hub][6].

Datadog provides additional monitoring capabilities for the following Azure App Service workload runtimes on Basic, Standard, and Premium plans:

| OS | Runtime |Documentation| 
|----|---------|-----|
|Windows|.NET|[Windows .NET setup][7]|
|Windows|Java|[Windows Java setup][8]|
|Windows|Node|[Windows Node setup][13]|
|Linux|.NET|[Linux .NET setup][9]|
|Linux|Node|[Linux Node setup][9]|
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
[4]: https://app.datadoghq.com/functions?search=&cloud=azure&entity_view=app_service_plan
[5]: /integrations/azure/#log-collection
[6]: https://learn.microsoft.com/azure/event-hubs/
[7]: /serverless/azure_app_services/azure_app_services_windows?tab=net#setup
[8]: /serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /serverless/azure_app_services/azure_app_services_linux?tab=nodenetphppython
[10]: /serverless/azure_app_services/azure_app_services_linux?tab=java
[11]: /developers/dogstatsd/
[12]: /serverless/azure_app_services/azure_app_services_container
[13]: /serverless/azure_app_services/azure_app_services_windows?tab=nodejs#setup
