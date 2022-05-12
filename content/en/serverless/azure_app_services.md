---
title: Microsoft Azure App Service Extension
kind: documentation
aliases:
  - /infrastructure/serverless/azure_app_services/
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
- link: "https://www.datadoghq.com/blog/azure-app-service-extension/"
  tag: "Blog"
  text: "Monitor .NET web apps with the Datadog extension for Azure App Service"
- link: "https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler-what-is-considered-as-a-host-for-azure-app-services"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
- link: "https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/"
  tag: "Blog"
  text: "Deploy ASP.NET Core applications to Azure App Service"

---

## Overview

Microsoft [Azure App Services][1] is a group of serverless resources that enable you to build and host web apps, mobile back ends, event-driven functions, and RESTful APIs without managing infrastructure. It can host workloads of all sizes and offers auto-scaling and high availability options.

Datadog provides monitoring capabilities for all Azure App Service resource types:

- Azure Monitor metrics for [Apps][2] and [Functions][3] using the [Azure Integration][2].
- Use the [Azure App Service View][4] to quickly spot issues, map relationships between your Azure App Service resources, and gain insights into cost and performance.
- Custom metrics can be submitted using the API.
- [Resource logs][5] can be submitted using [Event Hub][6].

The Datadog extension for Azure App Service provides additional monitoring capabilities.

- Full distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][7].

## Setup

{{< tabs >}}
{{% tab ".NET" %}}

### Requirements

1. If you haven't already, set up the [Microsoft Azure integration][1] first.

2. The extension supports the following resource types:
    - Azure App Service Web Apps
    - Function Apps hosted on Basic, Standard, Premium, or Isolated App Service plans. 

    <div class="alert alert-warning">Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows OS (AAS does not yet support extensions on Linux). For more details about automatically instrumented libraries, see the [Tracer documentation][2].

    - .NET Framework 4.6.1 and later
    - .NET Core 2.1
    - .NET Core 2.2 (Microsoft support ended 2019-12-23)
    - .NET Core 3.0 (Microsoft support ended 2020-03-03)
    - .NET Core 3.1
    - .NET 5
    - .NET 6

4. Datadog recommends doing regular updates to the latest version of the extension to ensure optimal performance, stability, and availability of features. Note that both the initial install and subsequent updates require your web app to be fully stopped in order to install/update successfully.

**Note**: Datadog automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution within your application environment.

Starting with v2.3.0, the .NET extension no longer relies on semantic versioning. The extension uses the following scheme: `x.y.zAA` where `x.y.z` is the .Net Tracer version and `AA` is dedicated only to the extension. Any leading zeroes in `zAA` is trimmed by NuGet packaging so the version becomes `x.y.A`. 

For example:

- Extension `2.3.0` uses the Tracer v`2.3.0`
- Extension `2.3.1` uses the Tracer v`2.3.0`
- Extension `2.3.2` uses the Tracer v`2.3.0`
- Extension `2.3.100` uses the Tracer v`2.3.1`
- Extension `2.3.101` uses the Tracer v`2.3.1`
- Extension `2.3.200` uses the Tracer v`2.3.2`

### Installation

1. Configure the [Azure integration][1] to monitor your web app or function. Verify it is configured correctly by ensuring that you see the corresponding `azure.app_service.count` or `azure.functions.count` metric in Datadog. **Note**: This step is critical for metric/trace correlation, functional trace panel views, and improves the overall experience of using Datadog with Azure App Services.

2. Open the [Azure Portal][3] and navigate to the dashboard for the Azure app you wish to instrument with Datadog.

3. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
4. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][4].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
5. Configure optional application settings:
    - Set the `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).
    - Set `DD_ENV` to group your traces and custom statistics.
    - Set `DD_SERVICE` to specify a service name (defaults to your app name).
    - Set `DD_LOGS_INJECTION:true` for correlation with application logs from your app.
    - See a full list of [optional configuration variables][5].
6. Click **Save** (this restarts your application).
7. <div class="alert alert-warning">[REQUIRED] Stop your application by clicking <u>Stop</u>.</div>
8. Go to the Azure extensions page and select the Datadog APM extension.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog extension" >}}
9. Accept the legal terms, click **OK**, and wait for the installation to complete. **Note**: the app must be in a stopped state for this step to complete successfully.
10. Start the main application, click **Start**:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Application logging

You can send logs from your application in Azure App Service to Datadog in one of the following ways:
1. [Agentless logging with automatic instrumentation][6]
2. [Agentless logging with the Serilog sink][7]

Both methods allow trace ID injection, making it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

**Note**: Since this occurs inside your application, any Azure Platform logs you submit with diagnostic settings do not include the trace ID.

### Custom metrics with DogStatsD

The Azure App Service extension includes an instance of [DogStatsD][8] (Datadog's metrics aggregation service). This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps and Functions with the extension.

Writing custom metrics and checks in Azure App Service is similar to the process for doing so with an application on a host running the Datadog Agent. To submit custom metrics to Datadog from Azure App Service using the extension:

1. Add the [DogStatsD NuGet package][9] to your Visual Studio project.
2. Initialize DogStatdD and write custom metrics in your application.
3. Deploy your code to Azure App Service.
4. Install the Datadog App Service extension.

**Note**: Unlike the [standard DogStatsD config process][10], there is no need to set ports or a server name when initializing the DogStatsD configuration. There are ambient environment variables in Azure App Service that determine how the metrics are sent (requires v6.0.0+ of the DogStatsD client).

To send metrics use this code:

```csharp
try
{
// Configure your DogStatsd client and configure any tags
DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } });
}
catch (Exception ex)
{
// An exception is thrown by the Configure call if the necessary environment variables are not present.
// These environment variables are present in Azure App Service, but
// need to be set in order to test your custom metrics: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
// Ignore or log the exception as it suits you
Console.WriteLine(ex);
}
// Send a metric
DogStatsd.Increment("sample.startup");
```

**Note**: To send only custom metrics (while disabling tracing) set the following variables in your application's config:
  - Set `DD_TRACE_ENABLED` to `false`.
  - Set `DD_AAS_ENABLE_CUSTOM_METRICS` to `true`.
Learn more about [custom metrics][11].


[1]: /integrations/azure
[2]: /tracing/setup/dotnet/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/setup_overview/setup/dotnet-framework/#additional-optional-configuration
[6]: /logs/log_collection/csharp/#agentless-logging-with-apm
[7]: /logs/log_collection/csharp/#agentless-logging-with-serilog-sink
[8]: /developers/dogstatsd
[9]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[10]: /developers/dogstatsd/?tab=net#code
[11]: /metrics/
{{% /tab %}}
{{< /tabs >}}

## Programmatic management

Datadog provides scripts to update or install the Azure App Service Extension using Powershell. Scripted extension management enables you to [update extensions in bulk by resource group](#powershell-resource-group) and [designate the installation of specific versions of the site extension](#powershell-specific-version). You can also use scripts to programmatically add the extension in CI/CD pipelines, as well as discover and update extensions that are already installed.

### Prerequisites

- The [Azure CLI][8] or [Azure Cloud Shell][9].
- Azure App Service [user-scope credentials][10]. If you do not already have credentials, go to your [Azure portal][11] and access your Web App or Function App. Navigate to **Deployment** > **Deployment Center** to create or retrieve your user-scope credentials.

### Installing the extension for the first time {#powershell-first-time}

{{< tabs >}}
{{% tab ".NET" %}}

The install script adds the latest version of the extension to an Azure Web App or Azure Function App. This occurs on a per-app basis, rather than at a resource group level.

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the installation script using the following command:

    ```
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Run the following command, passing in required and optional arguments as needed.

    ```
    .\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -DDSite <DATADOG_SITE> -DDEnv <DATADOG_ENV> -DDService <DATADOG_SERVICE> -DDVersion <DATADOG_VERSION>
    ```

**Note**: The following arguments are required for the above command:

- `<USERNAME>`: Your Azure user scope username.
- `<PASSWORD>`: Your Azure user scope password.
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID][1].
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<SITE_NAME>`: The name of your app.
- `<DATADOG_API_KEY>`: Your [Datadog API key][2].

Also, set `DATADOG_SITE` to your [Datadog site][3]. `DATADOG_SITE` defaults to `datadoghq.com`. Your site is: {{< region-param key="dd_site" code="true" >}}.


[1]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

### Updating the extension for a resource group {#powershell-resource-group}

{{< tabs >}}
{{% tab ".NET" %}}

The update script applies to an entire resource group. This script updates every Web App or Function App that has the extension installed. App Service apps that do not have the Datadog extension installed are not affected.

1. Open the Azure CLI or Azure Cloud Shell.
2. Download the update script using the following command:

    ```
    $baseUri="https://raw.githubusercontent.com/DataDog/datadog-aas-extension/master/management-scripts/extension"; Invoke-WebRequest -Uri "$baseUri/update-all-site-extensions.ps1" -OutFile "update-all-site-extensions.ps1"; Invoke-WebRequest -Uri "$baseUri/install-latest-extension.ps1" -OutFile "install-latest-extension.ps1"
    ```

3. Run the following command. All arguments are required.

    ```
    .\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD>
    ```

{{% /tab %}}
{{< /tabs >}}

### Install a specific version of the extension {#powershell-specific-version}

{{< tabs >}}
{{% tab ".NET" %}}
The Azure App Service UI does not support the ability to install a specific version of an extension. You may do this with the install or update script.
{{% /tab %}}
{{< /tabs >}}

#### Install specific version on a single resource

To install a specific version on a single instance, follow the [instructions for installing the extension for the first time](#powershell-first-time) and add the `-ExtensionVersion` parameter to the installation command.

```
.\install-latest-extension.ps1 -Username <USERNAME> -Password <PASSWORD> -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -SiteName <SITE_NAME> -DDApiKey <DATADOG_API_KEY> -ExtensionVersion <EXTENSION_VERSION>
```

Replace `<EXTENSION_VERSION>` with the version of the extension you wish to install. For instance, `1.4.0`.

#### Install specific version on an entire resource group

To install a specific version for a resource group, follow the [instructions for updating the extension for a resource group](#powershell-resource-group) and add the `-ExtensionVersion` parameter to the installation command.

```
.\update-all-site-extensions.ps1 -SubscriptionId <SUBSCRIPTION_ID> -ResourceGroup <RESOURCE_GROUP_NAME> -Username <USERNAME> -Password <PASSWORD> -ExtensionVersion <EXTENSION_VERSION>
```

Replace `<EXTENSION_VERSION>` with the version of the extension you wish to install. For instance, `1.4.0`.

### ARM template

{{< tabs >}}
{{% tab ".NET" %}}

Many organizations use [Azure Resource Management (ARM) templates][1] to implement the practice of infrastructure-as-code. To build the App Service Extension into these templates, incorporate [Datadog's App Service Extension ARM template][2] into your deployments to add the extension and configure it alongside your App Service resources.


[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[2]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### If your apps are identified as being misconfigured in the Serverless View and/or you are missing corresponding metrics for your traces

It is likely that you do not have the Azure integration configured to monitor your application. Proper configuration improves your ability to correlate metrics, traces, and logs in the Datadog platform. Without the Azure integration configured, you are missing critical context for your traces. To fix this:

1. Go to the Azure integration tile.

2. Ensure you have installed the [Azure integration][12] for the Azure subscription where your application is running.

3. Ensure that any App Service plan filtering rules you have applied include the App Service plan where the app is running. If an App Service plan is not included, all apps and functions hosted on it are also not included. Tags on the app itself are not used for filtering by Datadog.


### If APM traces are not appearing in Datadog

1. Verify you've set `DD_SITE` and `DD_API_KEY` correctly.

2. Do a full stop and start of your application.

3. If not resolved, try uninstalling the extension and re-installing (this also ensures you are running the latest version).

**Note**: To expedite the process of investigating application errors with the support team, set `DD_TRACE_DEBUG:true` and add the content of the Datadog logs directory (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) to your email.

Still need help? Contact [Datadog support][13].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.microsoft.com/en-us/azure/app-service/
[2]: /integrations/azure_app_services/
[3]: /integrations/azure_functions/
[4]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[5]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[6]: /integrations/azure/?tab=eventhub#log-collection
[7]: /developers/dogstatsd
[8]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[9]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[10]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[11]: https://portal.azure.com/
[12]: /integrations/azure
[13]: /help
