---
title: Azure App Service - Linux
kind: documentation
---
## Overview

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads using the Node and .NET runtimes:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

The solution uses the startup command setting and Application Settings for Linux Azure App Service to instrument the application and manage its configuration. 

### Setup

#### Set application settings
To instrument your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings. 

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Four settings are listed: DD_API_KEY, DD_CUSTOM_METRICS_ENABLEDstaDD_SERVICE, and DD_START_APP."  style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www`.

**Note**: The application restarts when new settings are saved. 

#### Set general settings

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Next, go to **General settings** and add the following to the **Startup Command** field:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-extension/linux-v0.1.4-beta/linux/datadog_wrapper | bash
```

{{% /tab %}}
{{% tab "Java" %}}
Download the `datadog_wrapper` file from the releases and upload it to your application with the [Azure CLI command][1]:

```
az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

Alternatively, you can upload this script as part of your application and set the **Startup Command** in **General Settings** as its location. For example: `/home/site/wwwroot/datadog_wrapper`

If you are already using a startup script, add the following curl command to the end of your script:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.1.0/datadog_wrapper | bash
```

[1]: https://learn.microsoft.com/en-us/azure/app-service/deploy-zip?tabs=cli#deploy-a-startup-script

{{% /tab %}}
{{< /tabs >}}

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service Configuration: the Stack settings, under the Configuration section of Settings in the Azure UI. Underneath the stack, major version, and minor version fields is a 'Startup Command' field that is populated by the above curl command."  style="width:80%;" >}}


### Viewing traces

After the application has been instrumented and restarted successfully, traces are from the application within. You can access from the [Azure Serverless view][3], or in the [APM Service page][4] of your Datadog app.

### Custom metrics

To enable custom metrics for your application with DogStatsD, add  `DD_CUSTOM_METRICS_ENABLED` and set it as `true` in your Application Settings.

To configure your application to submit metrics, follow the appropriate steps for your runtime.

- [Node][5]
- [.NET][6]

[1]: /developers/dogstatsd
[2]: /getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
