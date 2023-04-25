---
title: Monitoring Azure App Service
kind: documentation
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
- link: "https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
- link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
  tag: "Blog"
  text: "Deploy ASP.NET Core applications to Azure App Service"

---

## Overview

Microsoft [Azure App Service][1] is a group of serverless resources that enable you to build and host web apps, mobile backends, event-driven functions, and RESTful APIs without managing infrastructure. It can host workloads of all sizes and offers auto-scaling and high availability options.

Datadog provides monitoring capabilities for all Azure App Service resource types:

- Azure Monitor metrics for [Apps][2] and [Functions][3] using the [Azure Integration][2].
- Use the [Azure App Service View][4] to quickly spot issues, map relationships between your Azure App Service resources, and gain insights into cost and performance.
- Submit custom metrics through the API.
- Submit [resource logs][5] through [Event Hub][6].

Datadog provides additional monitoring capabilities for the following Azure App Service workload runtimes on Basic, Standard, and Premium plans:

| OS | Runtime |Status|Documentation| 
|----|---------|----|----|
|Windows|.NET|GA|[Windows .NET setup][7]|
|Windows|Java|Beta|[Windows Java setup][8]|
|Linux|.NET|Beta|[Linux docs][9]|
|Linux|Node|Beta|[Linux docs][9]|

Capabilities:
- Fully distributed APM tracing using automatic instrumentation
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata
- Manual APM instrumentation to customize spans
- `Trace_ID` injection into application logs
- Custom metrics with [DogStatsD][7]


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/dd_libraries/
[3]: https://registry.hub.docker.com/r/datadog/serverless-init
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /getting_started/site/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /serverless/azure_app_services/azure_app_services_windows?tab=net#setup
[8]: /serverless/azure_app_services/azure_app_services_windows?tab=java#setup
[9]: /serverless/azure_app_services/azure_app_services_linux
