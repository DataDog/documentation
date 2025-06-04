---
title: Azure App Service - Linux Code
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview
<div class="alert alert-info">To instrument your Azure App Service with the Datadog wrapper instead of using a sidecar, see <a href="/serverless/guide/azure_app_service_linux_code_wrapper_script">Instrument Azure App Service - Linux Code Deployment with the Datadog wrapper</a>.</div>

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].
- Support for submitting logs using file tailing.

This solution uses a sidecar container and Application Settings for Linux Azure App Service to instrument the application and manage its configuration.

**Supported runtimes**: Java, Node.js, .NET, PHP, Python

### Setup

1. **Install a tracing library**. You must install a tracing library within the application package prior to deployment. 

{{< tabs >}}
{{% tab "Java" %}}
Java supports adding instrumentation code through the use of a command line argument, `javaagent`.

1. Download the [latest version of Datadog's Java tracing library][1].
1. Place the tracing library inside your project. It must be included with your deployment. 
   If you are using the `azure-webapp-maven` plugin, you can add the Java tracing library as a resource entry with type `lib`. 
1. Set the environment variable `JAVA_OPTS` with `--javaagent:/home/site/lib/dd-java-agent.jar`. When your application is deployed, the Java tracer is copied to `/home/site/lib/dd-java-agent.jar`.

Instrumentation starts when the application is launched.

[1]: https://dtdg.co/latest-java-tracer
{{% /tab %}}
{{% tab "Node.js" %}}
1. Add the `ddtrace` package to your project using your package manager.
1. Initialize the tracer by doing one of the following:
   - Set `NODE_OPTIONS` with `--require=dd-trace/init`
   - Include the tracer in your application's entrypoint file:
     ```javascript
     const tracer = require('dd-trace').init({ logInjection: true, });
     ```
     This also configures trace log correlation.

{{% /tab %}}
{{% tab ".NET" %}}

Add the `Datadog.Trace.Bundle` Nuget package to your project.

**Note**: When you complete Step 2, ensure that you also set the [additional environment variables](#configure-environment-variables) required by the .NET tracer.

{{% /tab %}} 
{{% tab "PHP" %}}

Run the following script to install Datadog's PHP tracing library:

```ssh
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

This script is intended to run as the startup command, which installs the tracing module into PHP and then restarts the application. 

{{% /tab %}}
{{% tab "Python" %}}

1. Add `ddtrace` to your project.
1. Modify your startup command. Your new command should run `ddtrace-run` with your old command as an argument. That is: if your startup command is `foo`, modify it to run `ddtrace-run foo`.

   For example:
   ```ssh
   ddtrace-run gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi
   ```

{{% /tab %}}
{{< /tabs >}}

2. **Configure environment variables**.
   In Azure, add the following key-value pairs in **Settings** > **Configuration** > **Application settings**:

| Name | Value | Description |
|------|-------|-------------|
| `DD_API_KEY` | Your Datadog API key. | See [Organization Settings > API Keys][16] in Datadog. |
| `DD_SITE` | {{< region-param key="dd_site" code="true" >}} | Your [Datadog site][2]. Defaults to `datadoghq.com`. |
| `DD_SERVICE` | Your application's service name. | Defaults to the name field value in `package.json`. |

{{% collapse-content title=".NET: Additional required environment variables" level="h4" id="dotnet-additional-settings" %}}

For .NET applications, the following environment variables are **required** unless otherwise specified:

| Name | Value | Description |
|------|-------|-------------|
| `DD_DOTNET_TRACER_HOME`  | `/home/site/wwwroot/datadog`  | Path to tracing libraries, copied within the Docker file |
| `DD_TRACE_LOG_DIRECTORY`   | `/home/Logfiles/dotnet`  | Where tracer logs are stored |
| `CORECLR_ENABLE_PROFILING` | 1  | Instructs the .NET CLR that profiling should be enabled.                   | 
| `CORECLR_PROFILER`         | `846F5F1C-F9AE-4B07-969E-05C26BC060D8` | Profiler GUID. |
| `CORECLR_PROFILER_PATH`    | `/home/site/wwwroot/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so` | The profiler binary that the .NET CLR loads into memory, which contains the GUID. |
| `DD_PROFILING_ENABLED` (_optional_) | `true` | Enables Datadog's [Continuous Profiler][15]. |

{{% /collapse-content %}}

3. **Configure a sidecar container for Datadog**.

   1. In Azure, navigate to **Deployment** > **Deployment Center**. Select the **Containers** tab.
   1. Click **Add** and select **Custom container**.
   1. In the **Edit container** form, provide the following:
      - **Image source**: Docker Hub or other registries
      - **Image type**: Public
      - **Registry server URL**: `index.docker.io`
      - **Image and tag**: `datadog/serverless-init:latest`
      - **Port**: 8126
   1. Select **Apply**.

4. **Restart your application**.

   If you modified a startup command, restart your application. Azure automatically restarts the application when new Application Settings are saved. 

### View traces in Datadog

After your application restarts, go to Datadog's [APM Service page][4] and search for the service name you set for your application (`DD_SERVICE`).

### Custom metrics

To configure your application to submit custom metrics, follow the appropriate steps for your runtime:

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## Deployment

{{% aas-workflow-linux %}}

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable agent debug logging by setting `DD_LOG_LEVEL` in the sidecar configuration options. For tracer debugging set `DD_TRACE_DEBUG` to true. This generates logs additional debug logs for the sidecar and tracing library.

Be sure to enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service Configuration: App Service logs, under the Monitoring section of Settings in the Azure UI. The 'Application logging' option is set to 'File System'." style="width:100%;" >}}
 
Share the content of the **Log stream** with [Datadog Support][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /getting_started/site/
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /help
[15]: /profiler
[16]: https://app.datadoghq.com/organization-settings/api-keys
