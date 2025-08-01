---
title: Azure App Service - Linux Code
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
  tag: "Blog"
  text: "Monitor your Linux web apps on Azure App Service with Datadog"
---
## Overview

This solution uses a sidecar container and Application Settings for Linux Azure App Service to instrument the application and manage its configuration.

If you would prefer to not use the sidecar approach (Not Recommended), you can instead follow the instructions to [Instrument Azure App Service - Linux Code Deployment with the Datadog wrapper][1].

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

Add the `Datadog.Trace.Bundle` Nuget package to your project. See [the Nuget package page for more details][102].

For example:

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

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
   In Azure, add the following key-value pairs in **Settings** > **Configuration** > **Application settings**:

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

`WEBSITES_ENABLE_APP_SERVICE_STORAGE`
: **Value**: `true`<br>
Setting this environment variable to `true` allows the `/home/` mount to persist and be shared with the sidecar.<br>

`DD_AAS_INSTANCE_LOGGING_ENABLED`
: **Value**: false <br>
When `true`, log collection is automatically configured for an additional file path: `/home/LogFiles/*$COMPUTERNAME*.log`

<div class="alert alert-info">If your application has multiple instances, make sure that your application's log filename includes the <code>$COMPUTERNAME</code> variable. This ensures that log tailing does not create duplicated logs from multiple instances reading the same file.</div>
    
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
   1. Select **Apply**.

3. **Restart your application**.

   If you modified a startup command, restart your application. Azure automatically restarts the application when new Application Settings are saved. 

[301]: https://app.datadoghq.com/organization-settings/api-keys
[302]: /getting_started/site/
[303]: /getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

### View traces in Datadog

After your application restarts, go to Datadog's [APM Service page][1] and search for the service name you set for your application (`DD_SERVICE`).

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
