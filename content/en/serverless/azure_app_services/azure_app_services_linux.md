---
title: Azure App Service - Linux Code
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

This solution uses the startup command setting and Application Settings for Linux Azure App Service to instrument the application and manage its configuration. Java, Node, .NET, PHP, and Python are supported.

### Setup
#### Set application settings
To instrument your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_CUSTOM_METRICS_ENABLED` (optional) enables [custom metrics](#custom-metrics).
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www` (unnecessary for applications running in Tomcat).
- `DD_PROFILING_ENABLED` (optional) Enables the [Continuous Profiler][15], specific to .NET.

### Identifying your startup command

Linux Azure App Service Web Apps built using the code deployment option on built-in runtimes depend on a startup command that varies by language. The default values are outlined in [Azure's documentation][7]. Examples are included below.

Set these values in the `DD_START_APP` environment variable. Examples below are for an application named `datadog-demo`, where relevant.

| Runtime   | `DD_START_APP` Example Value                                                               | Description                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Runs the [Node PM2 configuration file][12], or your script file.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Runs a `.dll` file that uses your Web App name by default. <br /><br /> **Note**: The `.dll` file name in the command should match the file name of your `.dll` file. In certain cases, this might not match your Web App.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copies script to correct location and starts application.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | Custom [startup script][13]. This example shows a Gunicorn command for starting a Django app.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | The command to start your app. This is not required for applications running in Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up
[15]: /profiler/enabling/dotnet/?tab=azureappservice


**Note**: The application restarts when new settings are saved.

#### Set General Settings

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Go to **General settings** and add the following to the **Startup Command** field:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.10.6/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service Configuration: the Stack settings, under the Configuration section of Settings in the Azure UI. Underneath the stack, major version, and minor version fields is a 'Startup Command' field that is populated by the above curl command." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Download the [`datadog_wrapper`][8] file from the releases, download the zip file and upload it to your application with the Azure CLI command:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### Viewing traces

When new Application Settings are saved, Azure restarts the application. However, if a startup command is added and saved, a restart may be required.

After the application restarts, you can view traces by searching for the service name (`DD_SERVICE`) in the [APM Service page][4] of Datadog.

### Custom metrics

To enable custom metrics for your application with DogStatsD, add  `DD_CUSTOM_METRICS_ENABLED` and set it as `true` in your Application Settings.

To configure your application to submit metrics, follow the appropriate steps for your runtime.

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## Deployment

{{% aas-workflow-linux %}}

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service Configuration: App Service logs, under the Monitoring section of Settings in the Azure UI. The 'Application logging' option is set to 'File System'." style="width:100%;" >}}

Share the content of the **Log stream** with [Datadog Support][14].
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /help
