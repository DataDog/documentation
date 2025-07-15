---
title: Azure App Service - Linux Code
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview

This solution uses a sidecar container and Application Settings for Linux Azure App Service to instrument the application and manage its configuration.

If you would prefer to not use the sidecar approach (Not Recommended), you can instead follow the instructions to [Instrument Azure App Service - Linux Code Deployment with the Datadog wrapper][17].

**Supported runtimes**: Java, Node.js, .NET, PHP, Python

## Setup

### Application

Install the tracing library for your language:

{{< tabs >}}
{{% tab "Java" %}}
Java supports adding instrumentation code through the use of a command line argument, `javaagent`.

1. Download the [latest version of Datadog's Java tracing library][101].
1. Place the tracing library inside your project. It must be included with your deployment. 
   If you are using the `azure-webapp-maven` plugin, you can add the Java tracing library as a resource entry with type `lib`. 
1. Set the environment variable `JAVA_OPTS` with `--javaagent:/home/site/lib/dd-java-agent.jar`. When your application is deployed, the Java tracer is copied to `/home/site/lib/dd-java-agent.jar`.

Instrumentation starts when the application is launched.

[101]: https://dtdg.co/latest-java-tracer
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

```bash
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

### Instrumentation

{{< tabs >}}
{{% tab "Automated" %}}

First, install the [Datadog CLI][201] and [Azure CLI][202].

Login to your Azure account using the Azure CLI:

{{< code-block lang="shell" >}}
az login
{{< /code-block >}}

Then, run the following command to set up the sidecar container:

{{< code-block lang="shell" >}}
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
{{< /code-block >}}

Set your Datadog site to {{< region-param key="dd_site" code="true" >}}. Defaults to `datadoghq.com`.

Additional flags, like `--service` and `--env`, can be used to set the service and environment tags. For a full list of options, run `datadog-ci aas instrument --help`.


[201]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[202]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

{{% /tab %}}
{{% tab "Manual" %}}

1. **Configure environment variables**.

### Quick Deploy Option

To streamline the setup process, you can use the "Deploy to Azure" button below to automatically create an Azure App Service (Linux) with all required DataDog application settings pre-configured:

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-azure-templates%2Fmain%2Fapp-service-linux%2Fazuredeploy.json)

This template automatically configures:
- Azure App Service (Linux) with your chosen runtime
- All required DataDog environment variables (DD_API_KEY, DD_SITE, DD_SERVICE, etc.)
- Sidecar container configuration for DataDog monitoring
- Proper storage settings for log collection

After deployment, you can proceed directly to step 2 (Configure a sidecar container) or continue with the manual configuration below.

---

### Manual Configuration

Alternatively, you can manually configure the environment variables:

   In Azure, add the following key-value pairs in **Settings** > **Configuration** > **Application settings**:

| Name | Value | Description |
|------|-------|-------------|
| `DD_API_KEY` | Your Datadog API key. | See [Organization Settings > API Keys][301] in Datadog. |
| `DD_SITE` | {{< region-param key="dd_site" code="true" >}} | Your [Datadog site][302]. Defaults to `datadoghq.com`. |
| `DD_SERVICE` | Your application's service name. | Defaults to the name field value in `package.json`. |
| `DD_ENV` | Your application's environment name. | There is no default value for this field. |
| `DD_SERVERLESS_LOG_PATH` | The log path the sidecar uses to collect logs. | Where you write your logs. For example, `/home/LogFiles/*.log` or `/home/LogFiles/myapp/*.log`. |
| `WEBSITES_ENABLE_APP_SERVICE_STORAGE` | `true` | Setting this environment variable to `true` allows the `/home/` mount to persist and be shared with the sidecar. |

{{% collapse-content title=".NET: Additional required environment variables" level="h4" id="dotnet-additional-settings" %}}

For .NET applications, the following environment variables are **required** unless otherwise specified:

| Name | Value | Description |
|------|-------|-------------|
| `DD_DOTNET_TRACER_HOME`  | `/home/site/wwwroot/datadog`  | Path to tracing libraries, copied within the Docker file |
| `DD_TRACE_LOG_DIRECTORY`   | `/home/LogFiles/dotnet`  | Where tracer logs are stored |
| `CORECLR_ENABLE_PROFILING` | 1  | Instructs the .NET CLR that profiling should be enabled.                   | 
| `CORECLR_PROFILER`         | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` | Profiler GUID. |
| `CORECLR_PROFILER_PATH`    | `/home/site/wwwroot/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so` | The profiler binary that the .NET CLR loads into memory, which contains the GUID. |
| `DD_PROFILING_ENABLED` (_optional_) | `true` | Enables Datadog's [Continuous Profiler][303]. |

{{% /collapse-content %}}

2. **Configure a sidecar container for Datadog**.

   1. In Azure, navigate to **Deployment** > **Deployment Center**. Select the **Containers** tab.
   1. Click **Add** and select **Custom container**.
   1. In the **Edit container** form, provide the following:
      - **Image source**: Other container registries
      - **Image type**: Public
      - **Registry server URL**: `index.docker.io`
      - **Image and tag**: `datadog/serverless-init:latest`
      - **Port**: 8126
   1. Select **Apply**.

3. **Restart your application**.

   If you modified a startup command, restart your application. Azure automatically restarts the application when new Application Settings are saved. 

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /getting_started/site/
[303]: /profiler
{{% /tab %}}
{{< /tabs >}}

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
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /help
[17]: /serverless/guide/azure_app_service_linux_code_wrapper_script
