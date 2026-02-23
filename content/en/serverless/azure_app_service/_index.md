---
title: Serverless Monitoring for Azure App Service
aliases:
  - /infrastructure/serverless/azure_app_services/
  - /serverless/azure_app_services/
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
- link: "/serverless/guide/disable_serverless"
  tag: "Documentation"
  text: "Disable Serverless Monitoring"
- link: "https://www.datadoghq.com/blog/azure-app-service-extension/"
  tag: "Blog"
  text: "Monitor .NET web apps with the Datadog extension for Azure App Service"
- link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
  tag: "Blog"
  text: "Deploy ASP.NET Core applications to Azure App Service"
- link: "https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=azure-app-service#products"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
---

## Overview

[Azure App Service][1] is a platform that hosts web applications, REST APIs, and mobile backends. Datadog Serverless Monitoring provides metrics, logs, and traces for your Azure App Service applications.

{{< img src="serverless/azure_app_service/azure_app_service_top_2.png" alt="Datadog UI, Serverless Monitoring page with Azure App Service selected." style="width:100%;" >}}

In Datadog, use the [Serverless > Azure][4] page to troubleshoot all your Azure resources.

### Azure metrics and logs

Install the [Azure integration][2] for [enriched metrics][3] and resource metadata for Azure App Service. 

Set up [Azure log forwarding][6] to automatically collect and send Azure App Service resource and application logs to Datadog.

### APM and custom metrics

To monitor Azure App Service workloads with APM and custom metrics, you can instrument your Azure App Service workloads.

| OS      | Runtime   | Documentation               |
|---------|-----------|-----------------------------|
| Linux   | Java, Node.js, .NET, PHP, Python | [Linux - Code instrumentation][7] |
| Linux   | Container | [Linux - Container instrumentation][8] |
| Windows | Java, Node.js, .NET | [Windows - Code instrumentation][9]

Capabilities:
- Fully distributed APM tracing using automatic instrumentation
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata
- Manual APM instrumentation to customize spans
- `Trace_ID` injection into application logs
- Custom metrics with [DogStatsD][10]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/overview
[2]: /integrations/azure/
[3]: /integrations/azure_app_services/#metrics
[4]: https://app.datadoghq.com/serverless/azure/app-service-plan
[5]: /integrations/azure/#setup
[6]: /logs/guide/azure-automated-log-forwarding/
[7]: /serverless/azure_app_service/linux_code
[8]: /serverless/azure_app_service/linux_container
[9]: /serverless/azure_app_service/windows_code
[10]: /developers/dogstatsd/

