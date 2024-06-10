---
title: Instrument Azure App Service - Linux Containers with severless-init
kind: guide
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
---

<div class="alert alert-info">To instrument your Azure App Service containers with <code>serverless-init</code>, see <a href="/serverless/azure_app_services_container">Instrument Azure App Service - Linux Container with serverless-init</a>.</div>

## Overview

This instrumentation method uses Azure's [Sidecar pattern][1] to monitor containerized Linux Azure App Service workloads.

### Prerequisites

- Your Azure App Service application is containerized
- You are using a programming language [supported by a Datadog tracing library][2]
- You have a [Datadog API key][3]

## Instrument your application

1. [Integrate the Datadog tracer](#integrate-the-datadog-tracer) into your containerized application
1. [Create your Linux Web App](#create-your-linux-web-app)
1. [Add Datadog environment variables](#add-datadog-environment-variables) as application settings
1. [Add the Datadog sidecar](#add-the-datadog-sidecar)

### Integrate the Datadog tracer

After your application is containerized, integrate the Datadog tracer by adding the following lines to the Dockerfile for your main application.

{{< programming-lang-wrapper langs="dotnet" >}}
{{< programming-lang lang="dotnet" >}}

```dockerfile
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz
```

This installs and configures the Datadog tracer within your application container.

#### Full example Dockerfile

```dockerfile
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Stage 2: Create a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from stage 1
COPY --from=build /app/out ./

# Datadog specific
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.49.0/datadog-dotnet-apm-2.49.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.49.0.tar.gz

# Set the entry point for the application
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Then, build the image and push it to your preferred container registry.

### Create your Linux Web App

1. In the Azure Portal, go to **App Services** and select **Create**.
1. On the **Basics** tab, provide the required details.
   - For **Publish**, select **Container**.
   - For **Operating System**, select **Linux**.
   Then, select **Next: Container >**.
1. On the **Container** tab, provide the required details.
   - For **Sidecar support**, select **Enabled**.
   - For **Image Source**, select your chosen registry.
   - Then, specify the **Registry**, **Image**, **Tag**, and **Port** for your container image.
1. Select **Review + create**, then select **Create**.

### Add Datadog environment variables

In the Azure portal, select your app. In the left menu, select **Configuration** > **Application settings**. Then, add the following environment variables as application settings.


`DD_API_KEY` 
: Your [Datadog API key][3]. <br/>
**Required**. Alternatively, you can source your API key (and other sensitive information) from Azure Key Vault. See [Use Key Vault references as app settings in Azure App Service][4].

`DD_SITE` 
: {{< region-param key="dd_site" code="true" >}} <br/>
Corresponds to your [Datadog site][5]. Defaults to `datadoghq.com`.

`DD_SERVICE` 
: Supply a service name to be displayed in your Datadog [Service Catalog][6]. See [Unified Service Tagging][7]. 

`DD_ENV` 
: A name for your environment, such as `staging` or `prod`. See [Unified Service Tagging][7].

`DD_SERVERLESS_LOG_PATH` 
: `/home/Logfile/*.log` <br/>
Corresponds to the path where you write your application logs. If you have changed this location, specify your custom location in this setting.

`DD_DOTNET_TRACER_HOME` 
: `/datadog/tracer`

`DD_TRACE_LOG_DIRECTORY` 
: `/home/Logfiles/dotnet`

`CORECLR_ENABLE_PROFILING` 
: `1`

`CORECLR_PROFILER` 
: `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`

`CORECLR_PROFILER_PATH` 
: `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so`

<!-- some vars above need details, and also are they dotnet specific? -->

### Add the Datadog sidecar

1. In the Azure portal, select your app. In the left menu, select **Deployment Center**.
1. Select **Add**. Under **Add container**, provide the following details:
   - **Name**: `datadog`
   - **Image source**: Docker Hub or other registries
   - **Image type**: Public
   - **Registry server URL**: sitecontainerssampleacr.azurecr.io
   - **Image and tag**: datadog-dotnet:2.0
   - **Port**: 8126
   Then, select **Apply**.
   <!-- let's make sure these are the right things in the UI -->

<!-- https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar -->
<!-- https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container?source=recommendations&tabs=azure-portal&pivots=container-linux -->

## Next steps

After you finish instrumenting your application, go to the [Serverless > Azure][8] page in Datadog to see your observability data. Your application logs are available in the [Log Explorer][9], and your traces are available in the [Trace Explorer][10].

[1]: https://azure.github.io/AppService/2024/04/04/Public-Preview-Sidecars-Webjobs.html
[2]: /tracing/trace_collection/library_config
[3]: /account_management/api-app-keys/
[4]: https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references
[5]: /getting_started/site/
[6]: https://app.datadoghq.com/services
[7]: /getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/functions?cloud=azure
[9]: https://app.datadoghq.com/logs
[10]: https://app.datadoghq.com/apm/traces