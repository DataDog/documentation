---
title: Azure App Service - Linux Code
aliases:
  - /serverless/azure_app_services/azure_app_services_linux
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview

This page describes how to instrument your Linux Azure App Service application with the Datadog Agent. The procedure on this page makes use of a sidecar container and Application Settings for Linux Azure App Service to instrument the application and manage its configuration.

If you would prefer to not use the sidecar approach (Not Recommended), you can instead follow the instructions to [Instrument Azure App Service - Linux Code Deployment with the Datadog wrapper][1].

**Supported runtimes**: Java, Node.js, .NET, PHP, Python

## Prerequisites

1. **Install the Azure integration:** Install the [Datadog-Azure integration](/integrations/azure/) to collect Azure metrics and logs.
2. **Understand the sidecar approach:** This setup uses a sidecar container pattern, which differs from:
   - [Windows Code deployment](/serverless/azure_app_service/windows_code) (uses extension)
   - [Standard .NET APM setup](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) (uses Agent or NuGet)
3. **Review .NET compatibility:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) for supported runtimes and integrations.

<div class="alert alert-info">
Using Windows instead? See <a href="/serverless/azure_app_service/windows_code">Windows Code setup</a>. Using containers? See <a href="/serverless/azure_app_service/linux_container">Linux Container setup</a>.
</div>

## Setup

### Azure integration

If you haven't already, install the [Datadog-Azure integration][10] to collect metrics and logs.

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

Add the `Datadog.Trace.Bundle` Nuget package to your project. See [the Nuget package page for more details][102] or [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) for background.

For example:

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

**Important:** The environment variables shown in the [.NET: Additional required environment variables](#dotnet-additional-settings) section are critical for .NET to work with the sidecar pattern.

For more on these environment variables, see [Library Configuration](/tracing/trace_collection/library_config/dotnet-core/).

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
{{% tab "PHP" %}}

Run the following script to install Datadog's PHP tracing library:
startup.sh:
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

# This line is can be uncommented if the project contains an nginx configuration in the project root
# cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload

service nginx reload
```

This bash script is intended to run as the startup command, which installs the tracing module into PHP and then restarts the NGINX service.

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
{{% tab "Datadog CLI" %}}

#### Locally

Install the [Datadog CLI][201] and [Azure CLI][202], and login to your Azure account using the Azure CLI by running `az login`.

Then, run the following command to set up the sidecar container:

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
datadog-ci aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```

Set your Datadog site to {{< region-param key="dd_site" code="true" >}}. Defaults to `datadoghq.com`.

Additional flags, like `--service` and `--env`, can be used to set the service and environment tags. For a full list of options, run `datadog-ci aas instrument --help`.

#### Azure Cloud Shell

To use the Datadog CLI in [Azure Cloud Shell][203], open cloud shell and use `npx` to run the CLI directly. Set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and then run the CLI:
```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci@4 aas instrument -s <subscription-id> -g <resource-group-name> -n <app-service-name>
```


[201]: https://github.com/DataDog/datadog-ci#how-to-install-the-cli
[202]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[203]: https://portal.azure.com/#cloudshell/

{{% /tab %}}
{{% tab "Terraform" %}}

The [Datadog Terraform module for Linux Web Apps][1] wraps the [azurerm_linux_web_app][2] resource and automatically configures your Web App for Datadog Serverless Monitoring by adding required environment variables and the serverless-init sidecar.

If you don't already have Terraform set up, [install Terraform][3], create a new directory, and make a file called `main.tf`.

Then, add the following to your Terraform configuration, updating it as necessary based on your needs:

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

provider "azurerm" {
  features {}
  subscription_id = "00000000-0000-0000-0000-000000000000" // Replace with your subscription ID
}

resource "azurerm_service_plan" "my_asp" {
  name                = "my-app-service-plan" // Replace with your app service plan name
  resource_group_name = "my-resource-group"   // Replace with your resource group name
  os_type             = "Linux"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/linux"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group name
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      python_version = "3.13" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Finally, run `terraform apply`, and follow any prompts.

The [Datadog Linux Web App module][4] only deploys the Web App resource, so you need to [deploy your code][5] separately.

[1]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app
[3]: https://developer.hashicorp.com/terraform/install
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/linux
[5]: https://learn.microsoft.com/en-us/azure/app-service/getting-started

{{% /tab %}}
{{% tab "Manual" %}}

1. **Configure environment variables**.
   In Azure, add the following key-value pairs in **Settings** > **Environment Variables** > **App Settings**:

`DD_API_KEY`
: **Value**: Your Datadog API key.<br>
See [Organization Settings > API Keys][301] in Datadog.<br>

`DD_SITE`
: **Value**: {{< region-param key="dd_site" code="true" >}}<br>
Your [Datadog site][302]. Defaults to `datadoghq.com`.<br>
Use the "Datadog Site" drop-down menu on this page's right navigation bar to select your site.<br>

`DD_SERVICE`
: **Value**: Your application's service name.<br>
Defaults to the name field value in `package.json`.<br>
See [Unified Service Tagging][303] for more information on the `service` tag.<br>

`DD_ENV`
: **Value**: Your application's environment name.<br>
There is no default value for this field.<br>
See [Unified Service Tagging][303] for more information on the `env` tag.<br>

`DD_VERSION`
: **Value**: Your application's version.<br>
There is no default value for this field.<br>
See [Unified Service Tagging][303] for more information on the `version` tag.<br>

`DD_SERVERLESS_LOG_PATH`
: **Value**: The log path the sidecar uses to collect logs.<br>
Where you write your logs. For example, `/home/LogFiles/*.log` or `/home/LogFiles/myapp/*.log`.<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **Value**: false <br>
When `true`, log collection is automatically configured for the additional file path: `/home/LogFiles/*$COMPUTERNAME*.log`

`DD_AAS_INSTANCE_LOG_FILE_DESCRIPTOR`
: **Value**: An optional file descriptor used for more precise log tailing.<br>
Recommended for scenarios with frequent log rotation. For example, setting `_default_docker` configures the log tailer to ignore rotated files and focus only on Azure's active log file.<br>

<div class="alert alert-info">If your application has multiple instances, make sure your application's log filename includes the <code>$COMPUTERNAME</code> variable. This ensures that log tailing does not create duplicate logs from multiple instances that are reading the same file. Enabling this feature variable also prevents <code>DD_SERVERLESS_LOG_PATH</code> from being set. This is to prevent ingesting duplicate logs.</div>

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **Value**: `true`<br>
Setting this environment variable to `true` allows the `/home/` mount to persist and be shared with the sidecar.<br>



{{% collapse-content title=".NET: Additional required environment variables" level="h4" id="dotnet-additional-settings" %}}

For .NET applications, the following environment variables are **required**. See the `Datadog.Tracer.Bundle` [Nuget package README file][1] for more details.

`DD_DOTNET_TRACER_HOME`
: **Value**: `/home/site/wwwroot/datadog`<br>
Path to the directory containing the .NET tracing libraries.<br>

`DD_TRACE_LOG_DIRECTORY`
: **Value**: `/home/LogFiles/dotnet`<br>
Path where the .NET tracing library will write its logs.<br>

`CORECLR_ENABLE_PROFILING`
: **Value**: `1`<br>
Enables the instrumentation APIs in the .NET runtime.<br>

`CORECLR_PROFILER`
: **Value**: `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`<br>
Identifier for Datadog's .NET the instrumentation library.<br>

`CORECLR_PROFILER_PATH`
: **Value**: `/home/site/wwwroot/datadog/`<br>
`linux-x64/Datadog.Trace.ClrProfiler.Native.so` (single line)<br>
Path to the instrumentation library loaded by the .NET runtime.<br>

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

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
      - **Environment Variables**: Include all previously configured Datadog environment variables.
   1. Select **Apply**.

3. **Restart your application**.

   If you modified a startup command, restart your application. Azure automatically restarts the application when new Application Settings are saved.

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /getting_started/site/
[303]: /getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

### View traces in Datadog

After your application restarts, go to Datadog's [APM Service page][2] and search for the service name you set for your application (`DD_SERVICE`).

### Custom metrics

To configure your application to submit custom metrics, follow the appropriate steps for your runtime:

- [Java][3]
- [Node.js][4]
- [.NET][5]
- [PHP][6]
- [Python][7]

### Continuous Profiler

To enable the Continuous Profiler, set the environment variable `DD_PROFILING_ENABLED=true`. For more information, see the [Continuous Profiler documentation][8].

## Deployment

{{% aas-workflow-linux %}}

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable agent debug logging by setting `DD_LOG_LEVEL` in the sidecar configuration options. For tracer debugging set `DD_TRACE_DEBUG` to true. This generates logs additional debug logs for the sidecar and tracing library.

Be sure to enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service Configuration: App Service logs, under the Monitoring section of Settings in the Azure UI. The 'Application logging' option is set to 'File System'." style="width:100%;" >}}

Share the content of the **Log stream** with [Datadog Support][9].

## Additional Resources

- [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) - Core APM concepts
- [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/) - Full configuration reference
- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/) - Adding custom spans
- [Connecting .NET Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/dotnet) - Log correlation

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/guide/azure_app_service_linux_code_wrapper_script
[2]: /tracing/services/service_page/
[3]: /developers/dogstatsd/?tab=java#dogstatsd-client
[4]: https://github.com/brightcove/hot-shots
[5]: /developers/dogstatsd/?tab=dotnet#dogstatsd-client
[6]: /developers/dogstatsd/?tab=php#dogstatsd-client
[7]: /developers/dogstatsd/?tab=python#dogstatsd-client
[8]: /profiler/
[9]: /help
[10]: https://app.datadoghq.com/integrations/azure
