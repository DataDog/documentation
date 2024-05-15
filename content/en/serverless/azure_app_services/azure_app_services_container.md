---
title: Instrument Azure App Service - Linux Container
kind: documentation
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
---

<div class="alert alert-info">To instrument your Azure App Service containers with <code>serverless-init</code>, see <a href="/serverless/guide/azure_app_service_linux_serverless_init">Instrument Azure App Service - Linux Container with serverless-init</a>.</div>

## Overview

This instrumentation method uses Azure's [Sidecar pattern][1].

### Prerequisites

- Your Azure App Service application is containerized
- You are using a programming language [supported by a Datadog tracing library][2]
- You have a [Datadog API key][3]

## Instrument your application

1. [Integrate the Datadog tracer](#integrate-the-datadog-tracer) into your containerized application
1. Create your Linux Web App
1. Set up Datadog
1. Add the Datadog sidecar 

### Integrate the Datadog tracer

After your application is containerized, integrate the Datadog tracer by adding the following lines to the Dockerfile for your main application.

{{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}

{{% svl-init-dotnet %}}

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

[1]: https://azure.github.io/AppService/2024/04/04/Public-Preview-Sidecars-Webjobs.html
[2]: /tracing/trace_collection/library_config
[3]: /account_management/api-app-keys/