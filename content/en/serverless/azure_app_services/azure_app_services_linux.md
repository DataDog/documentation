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
#### Application settings
To instrument your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings. 

{{< img src="serverless/azure_app_service/storms-nodejs.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP."  style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www`.

### Identifying your startup command

Linux Azure App Service Web Apps built using the code deployment option on built-in runtimes depend on a startup command that varies by language. The default values are outlined in [Azure's documentation][7]. Examples are included below. 

Set these values in the `DD_START_APP` environment variable. Examples below are for an application named `datadog-demo`, where relevant.

| Runtime | `DD_START_APP` Example Value | Description
| ---- | --- | --- |
| Node.js | `node ./bin/www` | Runs the [Node PM2 configuration file][12], or your script file |
| .NET Core | `dotnet datadog-demo.dll` | Runs a .dll file that uses your Web App name by default |
| PHP | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copies script to correct location and starts application |
| Python | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi` | Custom [startup script][13]. This example shows a Gunicorn command for starting a Django app. |
| Java SE | `java -jar /home/site/wwwroot/datadog-demo.jar --server.port=80` | The command to start your JAR app |
| Tomcat | `/home/site/deployments/tools/startup_script.sh` | The location of a script to perform any necessary configurations |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Note**: The application restarts when new settings are saved. 

#### General settings

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Go to **General settings** and add the following to the **Startup Command** field:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.1.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service Configuration: the Stack settings, under the Configuration section of Settings in the Azure UI. Underneath the stack, major version, and minor version fields is a 'Startup Command' field that is populated by the above curl command."  style="width:80%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Download the [`datadog_wrapper`][8] file from the releases and upload it to your application with the Azure CLI command:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

Alternatively, you can upload this script as part of your application and set the startup command in general settings as its location (for example, `/home/site/wwwroot/datadog_wrapper`.)

If you are already using a startup script, add the following curl command to the end of your script:

```
 curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.1.0/datadog_wrapper | bash
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### Viewing traces

After the application has been instrumented and restarted successfully, traces are from the application within. You can access from the [Azure Serverless view][3], or in the [APM Service page][4] of your Datadog app.

### Custom metrics

To enable custom metrics for your application with DogStatsD, add  `DD_CUSTOM_METRICS_ENABLED` and set it as `true` in your Application Settings.

To configure your application to submit metrics, follow the appropriate steps for your runtime.

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

[1]: /developers/dogstatsd
[2]: /getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=python