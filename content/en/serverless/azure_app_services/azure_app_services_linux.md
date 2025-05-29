---
title: Azure App Service - Linux Code
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview
<div class="alert alert-info">To instrument your Azure App Service with the <code>Datadog wrapper</code>, see <a href="/serverless/guide/azure_app_service_linux_code_wrapper_script">Instrument Azure App Service - Linux Code Deployment with the Datadog wrapper</a>.</div>

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].
- Support for submitting logs using file tailing

This solution uses sidecar containers and Applications Settings for Linux Azure App Service to instrument the application and manage its configuration.
Java, Node, .NET, PHP, and Python are supported.  

### Setup
#### Prepare the tracer
The tracing library needs to be installed within the application package prior to deployment. 
{{< tabs >}}
{{% tab "Java" %}}
Java supports adding instrumentation code through the use of a command line argument `javaagent`.

First download the tracing client the latest version can be found at: `https://dtdg.co/latest-java-tracer`
Once the tracer is downloaded and placed in the project, it needs to be able to be included with the deployment. 
If using the `azure-webapp-maven` plugin, the java trace agent can be added as resource entry as type `lib`.
When the application is deployed its copied to `/home/site/lib/dd-java-agent.jar`.
The final step is to set the environment variable `JAVA_OPTS` with `--javaagent:/home/site/lib/dd-java-agent.jar`.

This starts instrument when the application is launched.
{{% /tab %}}{{% tab "Node" %}}
Add the `ddtrace` package to your project using the package manager of your choosing.
Setting `NODE_OPTIONS` with `--require=dd-trace/init` initializes the tracer

Additionally the tracer can be initialized by including this in the entrypoint file in the application
{{< programming-lang-wrapper langs="javascript" >}}
{{< programming-lang lang="javascript" >}}
```javascript
const tracer = require('dd-trace').init({ logInjection: true, });
```
This initializes the tracer and configures trace log correlation
{{< /programming-lang >}}
{{< /programming-lang-wrapper>}}

{{% /tab %}}
{{% tab ".NET" %}}
Add the `Datadog.Trace.Bundle` Nuget package to your project.
This provides the Datadog trace client library that connects to the sidecar container.
Additional Application settings are required when using the .NET runtime
| Environment Name         | Value                                                                         | Description                                                                     |
|--------------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| DD_DOTNET_TRACER_HOME    | /home/site/wwwroot/datadog                                                    | This is the path to the tracing libraries. These are copied within the docker file
|
| DD_TRACE_LOG_DIRECTORY   | /home/Logfiles/dotnet                                                         | This instructs the tracer where to produce logs for the tracer – This directory is used  for troubleshooting. |
| CORECLR_ENABLE_PROFILING | 1                                                                             | This instructs the .NET CLR that profiling should be enabled.                   | 
| CORECLR_PROFILER         | {846F5F1C-F9AE-4B07-969E-05C26BC060D8}                                        | This GUID is the profiler identifier to be loaded for the application.          |
| CORECLR_PROFILER_PATH    | /home/site/wwwroot/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so | The profiler binary that the .NET CLR loads into memory which contains the GUID. |
{{% /tab %}} 
{{% tab "PHP" %}}
PHP's tracing library is installed using the following shell script.
This is necessary due to the nature of PHP using modules within its installation folder.
{{< programming-lang-wrapper langs="bash" >}}
{{< programming-lang lang="bash" >}}
```Shellscript
#!/usr/bin/env bash

echo "Setting up Datadog tracing for PHP"
DD_PHP_TRACER_VERSION=1.8.3

    DD_PHP_TRACER_URL=https://github.com/DataDog/dd-trace-php/releases/download/${DD_PHP_TRACER_VERSION}/datadog-setup.php

echo "Installing PHP tracer from ${DD_PHP_TRACER_URL}"
if curl -LO --fail "${DD_PHP_TRACER_URL}"; then
eval "php datadog-setup.php --php-bin=all"
else
       echo "Downloading the tracer was unsuccessful"
       return
fi

cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper>}}

The above script is intended to run as the startup command which installs the tracing module into PHP then restart the application.
{{% /tab %}}
{{% tab "Python" %}}
After adding the `ddtrace` to the project, modify the startup command to run `ddtrace-run` with the old command as an argument.
Here is an example of this:
```
 ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
```
{{% /tab %}}
{{< /tabs >}}

#### Set application settings
To instrument your application, begin by adding the following key-value pairs under **App settings** in your Azure "Environment variables" settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE." style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_PROFILING_ENABLED` (optional) Enables the [Continuous Profiler][15], specific to .NET.

### Setting up the Datadog sidecar
#### Navigate to the sidecar container page
To configure a new sidecar container go to `Deployment Center` which is located in the `Deployment` section of the left side navigation menu. 
{{< img src="serverless/azure_app_service/app-service-deployment-center-nav.png" alt="Azure App Service Configuration: The navigation menu which highlights where the deployment center resides." style="width:80%;" >}}

1. Go to the the Containers tab on the top navigation 
{{< img src="serverless/azure_app_service/app-service-containers-tab.png" alt="Azure App Service Deployment Center: The Containers tab is selected." style="width:80%;" >}}

2. Click `Add`, Select `Custom Container` from the dropdown menu. This opens a side panel to configure the new sidecar container.
{{< img src="serverless/azure_app_service/app-service-add-container.png" alt="Azure App Service Deployment Center: The Custom Container item is selected from a dropdown menu." style="width:80%;" >}}

3. In the **Edit container** form, provide the following:
   - **Image source**: Docker Hub or other registries
   - **Image type**: Public
   - **Registry server URL**: `index.docker.io`
   - **Image and tag**: `datadog/serverless-init:latest`
   - **Port**: 8126
4. Select **Apply**.


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
