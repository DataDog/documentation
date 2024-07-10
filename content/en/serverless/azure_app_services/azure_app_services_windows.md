---
title: Azure App Service - Windows Code
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

The Datadog extension for Azure App Service provides additional monitoring capabilities.

- Full distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

## Setup

{{< tabs >}}
{{% tab ".NET" %}}

### Requirements

1. If you haven't already, set up the [Microsoft Azure integration][1] first.

2. The extension supports the following resource types:
    - Azure App Service Web Apps
    - Function Apps hosted on Basic, Standard, and Premium plans.

    <div class="alert alert-warning">Function Apps on consumption plans are not supported. Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows OS (AAS does not yet support extensions on Linux). For more details about automatically instrumented libraries, see the [Tracer documentation][2].

    - .NET Framework 4.6.1 and later
    - .NET Core 2.1
    - .NET Core 2.2 (Microsoft support ended 2019-12-23)
    - .NET Core 3.0 (Microsoft support ended 2020-03-03)
    - .NET Core 3.1
    - .NET 5
    - .NET 6
    - .NET 7
    - .NET 8

4. Datadog recommends doing regular updates to the latest version of the extension to ensure optimal performance, stability, and availability of features. Note that both the initial install and subsequent updates require your web app to be fully stopped in order to install/update successfully.

**Note**: Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog's .NET Tracer with Profiler enabled). To ensure maximum visibility, run only one APM solution within your application environment.

Starting with v2.3.0, the .NET extension no longer relies on semantic versioning. The extension uses the following scheme: `x.y.zAA` where `x.y.z` is the .Net Tracer version and `AA` is dedicated only to the extension. Any leading zeroes in `zAA` is trimmed by NuGet packaging so the version becomes `x.y.A`.

For example:

- Extension `2.3.0` uses the Tracer v`2.3.0`
- Extension `2.3.1` uses the Tracer v`2.3.0`
- Extension `2.3.2` uses the Tracer v`2.3.0`
- Extension `2.3.100` uses the Tracer v`2.3.1`
- Extension `2.3.101` uses the Tracer v`2.3.1`
- Extension `2.3.200` uses the Tracer v`2.3.2`

### Installation

1. Configure the [Azure integration][1] to monitor your web app or function. Verify it is configured correctly by ensuring that you see the corresponding `azure.app_services.count` or `azure.functions.count` metric in Datadog. **Note**: This step is critical for metric/trace correlation, functional trace panel views, and improves the overall experience of using Datadog with Azure App Services.

2. Open the [Azure Portal][3] and navigate to the dashboard for the Azure app you wish to instrument with Datadog.

**Note**: Customers using the Azure Native integration can use the Datadog resource in Azure to add the extension to their .NET apps. For instructions, see the [App Service extension section][12] of Datadog's [Azure Portal guide][13].

3. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
4. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][4].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
5. Configure optional application settings:
    - Set the `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).
    - Set `DD_ENV` to group your traces and custom statistics.
    - Set `DD_SERVICE` to specify a service name (defaults to your app name).
    - Set `DD_LOGS_INJECTION:true` for correlation with application logs from your app.
    - Set `DD_PROFILING_ENABLED:true` to enable .NET [Continuous Profiler][5].
    - Set `DD_APPSEC_ENABLED:true` to enable [Application Security][15].
    - See a full list of [optional configuration variables][6].
6. Click **Save** (this restarts your application).
7. <div class="alert alert-warning">[REQUIRED] Stop your application by clicking <u>Stop</u>.</div>
8. Go to the Azure extensions page and select the Datadog APM extension.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog extension" >}}
9. Accept the legal terms, click **OK**, and wait for the installation to complete. **Note**: the app must be in a stopped state for this step to complete successfully.
10. Start the main application, click **Start**:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Application logging

You can send logs from your application in Azure App Service to Datadog in one of the following ways:
1. [Agentless logging with automatic instrumentation][7]
2. [Agentless logging with the Serilog sink][8]

Both methods allow trace ID injection, making it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

**Note**: Since this occurs inside your application, any Azure Platform logs you submit with diagnostic settings do not include the trace ID.

### Custom metrics with DogStatsD

The Azure App Service extension includes an instance of [DogStatsD][9] (Datadog's metrics aggregation service). This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps and Functions with the extension.

Writing custom metrics and checks in Azure App Service is similar to the process for doing so with an application on a host running the Datadog Agent. To submit custom metrics to Datadog from Azure App Service using the extension:

1. Add the [DogStatsD NuGet package][10] to your Visual Studio project.
2. Initialize DogStatsD and write custom metrics in your application.
3. Deploy your code to Azure App Service.
4. If you have not already, install the Datadog App Service extension.

**Note**: Unlike the [standard DogStatsD config process][11], there is no need to set ports or a server name when initializing the DogStatsD configuration. There are ambient environment variables in Azure App Service that determine how the metrics are sent (requires v6.0.0+ of the DogStatsD client).

To send metrics use this code:

```csharp
// Configure your DogStatsd client and configure any tags
if (!DogStatsd.Configure(new StatsdConfig() { ConstantTags = new[] { "app:sample.mvc.aspnetcore" } }))
{
    // `Configure` returns false if the necessary environment variables are not present.
    // These environment variables are present in Azure App Service, but
    // need to be set in order to test your custom metrics: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
    // Ignore or log the error as it suits you
    Console.WriteLine("Cannot initialize DogstatsD.");
}

// Send a metric
DogStatsd.Increment("sample.startup");
```

**Note**: To send only custom metrics (while disabling tracing) set the following variables in your application's config:
  - Set `DD_TRACE_ENABLED` to `false`.
  - Set `DD_AAS_ENABLE_CUSTOM_METRICS` to `true`.
Learn more about [custom metrics][12].


[1]: /integrations/azure
[2]: /tracing/setup/dotnet/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /profiler/enabling/dotnet/?tab=azureappservice
[6]: /tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[7]: /logs/log_collection/csharp/#agentless-logging-with-apm
[8]: /logs/log_collection/csharp/#agentless-logging-with-serilog-sink
[9]: /developers/dogstatsd
[10]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[11]: /developers/dogstatsd/?tab=net#code
[12]: /metrics/
[13]: /integrations/guide/azure-portal/#app-service-extension
[14]: /integrations/guide/azure-portal/
[15]: /security/application_security/enabling/serverless/?tab=serverlessframework#azure-app-service
{{% /tab %}}
{{% tab "Java" %}}
### Requirements

1. If you haven't already, set up the [Microsoft Azure integration][1] first.

2. The extension supports Azure App Service Web Apps. Function Apps are not supported.
    <div class="alert alert-warning">Support for Java Web Apps is in beta for extension v2.4+. There are no billing implications for tracing Java Web Apps during this period.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

3. The Datadog Java APM extension supports all Java runtimes on Windows OS. Azure App Service does not support extensions on Linux. For more details about automatically instrumented libraries, see the [Tracer documentation][2].

4. Datadog recommends doing regular updates to the latest version of the extension to ensure optimal performance, stability, and availability of features. Note that both the initial install and subsequent updates require your web app to be fully stopped in order to install/update successfully.

### Installation

1. Configure the [Azure integration][1] to monitor your web app or function. Verify it is configured correctly by ensuring that you see the corresponding `azure.app_service.count` or `azure.functions.count` metric in Datadog. **Note**: This step is critical for metric/trace correlation, functional trace panel views, and avoiding various broken user experiences on the Datadog site.

2. Open the [Azure Portal][3] and navigate to the dashboard for the Azure Web App you wish to instrument with Datadog.

3. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
4. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][4].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
5. Configure optional application settings:
    - Set the `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).
    - Set `DD_ENV` to group your traces and custom statistics.
    - Set `DD_SERVICE` to specify a service name (defaults to your web app name).
    - See a full list of [optional configuration variables][5].
6. Click **Save** (this restarts your application).
7. <div class="alert alert-warning">[REQUIRED] Stop your application by clicking <u>Stop</u>.</div>
8. Go to the Azure extensions page and select the Datadog APM extension.
9. Accept the legal terms, click **OK**, and wait for the installation to complete. **Note**: the web app must be in a stopped state for this step to complete successfully.
10. Start the main application, click **Start**:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Application logging from Azure Web Apps

Sending logs from your application in Azure App Service to Datadog requires streaming logs to Datadog directly from your app. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog.

**Note**: Trace ID injection occurs inside your application. Azure Resource logs are generated by Azure in the management plane, and therefore do not include the trace ID.

See instructions for [Agentless logging with Java][6] to configure application logging for Java in Azure App Service.

### Custom metrics with DogStatsD

The Azure App Service extension includes an instance of [DogStatsD][7] (Datadog's metrics aggregation service). This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps with the extension.

Writing custom metrics and checks in this environment is similar to the process for doing so with an application on a standard host running the Datadog Agent. To submit custom metrics to Datadog from Azure App Service using the extension:

1. Add the [DogStatsD client][8] to your project.
2. Initialize DogStatsD and write custom metrics in your application.
3. Deploy your code to a supported Azure web app.
4. If you have not already, install the Datadog App Service extension.

**Note**: Unlike the [standard DogStatsD config process][9], there is no need to set ports or a server name when initializing the DogStatsD configuration. There are ambient environment variables in Azure App Service that determine how the metrics are sent (requires v6.0.0+ of the DogStatsD client).

To send metrics use this code:

```java
// Configure your DogStatsd client and configure any tags
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Send a metric
client.Increment("sample.startup");
```

Learn more about [custom metrics][10].

[1]: /integrations/azure
[2]: /tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/trace_collection/library_config/dotnet-framework/#additional-optional-configuration
[6]: /logs/log_collection/java/?tab=log4j#agentless-logging
[7]: /developers/dogstatsd
[8]: https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client
[9]: /developers/dogstatsd/?tab=java#code
[10]: /metrics/
{{% /tab %}}
{{% tab "Node.js" %}}
### Requirements

If you haven't already, set up the [Datadog-Azure integration][1] first.

Datadog's Azure App Service Node.js extension supports Azure App Service Web Apps. Function Apps are not supported.

### Installation

1. Configure the [Datadog-Azure integration][1] to monitor your Azure Web App. To verify, check that your Web App is counted in the `azure.app_service.count` metric in Datadog. 

2. Open the [Azure Portal][3] and navigate to the dashboard for the Azure Web App you wish to instrument with Datadog.

3. On the **Configuration** page, go to the **Application settings** tab. Select **+ New application setting**.

4. Add your [Datadog API key][4] as the value of an application setting with the name `DD_API_KEY`.
   {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}

   Optionally, you can set further environment variables as application settings. These variables include:
   - `DD_SITE`: {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`)
   - `DD_ENV`: Your environment name
   - `DD_SERVICE`: Your service name (defaults to your Web App name)
   - `DD_RUNTIME_METRICS_ENABLED`: `true` to enable runtime metrics
   - `DD_APPSEC_ENABLED`: `true` to enable [Application Security Management][11]

   See the full list of [optional configuration settings][5].
6. Select **Save**. This restarts your application.
7. **Stop** your application.

   <div class="alert alert-info">To avoid downtime, use <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">deployment slots</a>. You can create a workflow that uses the <a href="https://github.com/marketplace/actions/azure-cli-action">GitHub Action for Azure CLI</a>. See the sample <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">GitHub workflow</a>.</div>
8. On the **Extensions** page, select the **Node Datadog APM** extension.
9. Accept the legal terms, select **OK**, and wait for the installation to complete. 
10. **Start** your application.
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Application logging from Azure Web Apps

Sending logs from your application in Azure App Service to Datadog requires streaming logs to Datadog directly from your app. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog.

To configure application logging for Node.js in Azure App Service, see [Agentless logging with Node.js][6].

<div class="alert alert-info">Azure resource logs do not include trace ID. <br/><br/>Trace ID injection occurs inside your application. Azure resource logs are generated by Azure in the management plane, and therefore do not include the trace ID.</div>

### Custom metrics with DogStatsD

Datadog's Azure App Service Node.js extension includes an instance of [DogStatsD][7], Datadog's metrics aggregation service. This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps.

Writing custom metrics and checks in this environment is similar to the process for doing so with an application on a standard host running the Datadog Agent. To submit custom metrics to Datadog from Azure App Service using the extension:

1. [Initialize DogStatsD and write custom metrics][12] in your application.
1. Deploy your code to a supported Azure Web App.
1. If you have not already, install Datadog's Azure App Service Node.js extension.

<div class="alert alert-info">You do not need to install a Node.js DogStatsD client, as it is included in the Node.js tracer (<code>dd-trace</code>) packaged in the Azure App Service extension.</div>

To send metrics, use this code:

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">Datadog's Node.js tracer, <code>dd-trace</code>, is packaged in the Azure App Services extension. It is automatically appended to the <code>NODE_PATH</code>.<br/><br/> <strong>You do not need to add</strong> <code>dd-trace</code> <strong>as a dependency in</strong> <code>package.json</code>. Explicitly adding <code>dd-trace</code> as a dependency may override the version provided by the extension. For local testing, reference the <a href="https://github.com/DataDog/datadog-aas-extension/releases">release notes</a> to find the appropriate version of the Node.js tracer for your version of the Azure App Service extension.</div>

Learn more about [custom metrics][10].

[1]: /integrations/azure
[2]: /tracing/setup/java/
[3]: https://portal.azure.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/trace_collection/library_config/nodejs/#configuration-settings
[6]: /logs/log_collection/nodejs/?tab=winston30#agentless-logging
[7]: /developers/dogstatsd
[8]: https://github.com/brightcove/hot-shots
[9]: /developers/dogstatsd/?tab=java#code
[10]: /metrics/
[11]: /security/application_security/enabling/nodejs/
[12]: /developers/dogstatsd/
{{% /tab %}}
{{< /tabs >}}

## Programmatic management

{{< tabs >}}
{{% tab ".NET" %}}

Datadog provides scripts to update or install the Azure App Service Extension using Powershell. Scripted extension management enables you to [update extensions in bulk by resource group](#powershell-resource-group) and [designate the installation of specific versions of the site extension](#powershell-specific-version). You can also use scripts to programmatically add the extension in CI/CD pipelines, as well as discover and update extensions that are already installed.

### Prerequisites

- The [Azure CLI][1] or [Azure Cloud Shell][2].
- Azure App Service [user-scope credentials][3]. If you do not already have credentials, go to your [Azure portal][4] and access your Web App or Function App. Navigate to **Deployment** > **Deployment Center** to create or retrieve your user-scope credentials.

### Installing the extension for the first time {#powershell-first-time}



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
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID][5].
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<SITE_NAME>`: The name of your app.
- `<DATADOG_API_KEY>`: Your [Datadog API key][6].

Also, set `DATADOG_SITE` to your [Datadog site][7]. `DATADOG_SITE` defaults to `datadoghq.com`. Your site is: {{< region-param key="dd_site" code="true" >}}.




### Updating the extension for a resource group {#powershell-resource-group}


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



### Install a specific version of the extension {#powershell-specific-version}

The Azure App Service UI does not support the ability to install a specific version of an extension. You may do this with the install or update script.


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

Many organizations use [Azure Resource Management (ARM) templates][8] to implement the practice of infrastructure-as-code. To build the App Service Extension into these templates, incorporate [Datadog's App Service Extension ARM template][9] into your deployments to add the extension and configure it alongside your App Service resources.

[1]: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
[2]: https://docs.microsoft.com/en-us/azure/cloud-shell/overview
[3]: https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials
[4]: https://portal.azure.com/
[5]: https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /getting_started/site/
[8]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview
[9]: https://github.com/DataDog/datadog-aas-extension/tree/master/ARM
[10]: https://learn.microsoft.com/en-us/azure/templates/microsoft.datadog/monitors?pivots=deployment-language-arm-template
{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-warning">Support for Java Web Apps is in beta for extension v2.4+. Programmatic management is not available for Java Web Apps.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a beta becomes available.</div>

{{% /tab %}}
{{< /tabs >}}

## Deployment

{{% aas-workflow-windows %}}

## Troubleshooting

### If your apps are identified as being misconfigured in the Serverless View and/or you are missing corresponding metrics for your traces

It is likely that you do not have the Azure integration configured to monitor your application. Proper configuration improves your ability to correlate metrics, traces, and logs in the Datadog platform. Without the Azure integration configured, you are missing critical context for your traces. To fix this:

1. Go to the Azure integration tile.

2. Ensure you have installed the [Azure integration][2] for the Azure subscription where your application is running.

3. Ensure that any App Service plan filtering rules you have applied include the App Service plan where the app is running. If an App Service plan is not included, all apps and functions hosted on it are also not included. Tags on the app itself are not used for filtering by Datadog.


### If APM traces are not appearing in Datadog

1. Verify you've set `DD_SITE` and `DD_API_KEY` correctly.

2. Do a full stop and start of your application.

3. If not resolved, try uninstalling the extension and re-installing (this also ensures you are running the latest version).

**Note**: To expedite the process of investigating application errors with the support team, set `DD_TRACE_DEBUG:true` and add the content of the Datadog logs directory (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) to your email.

Still need help? Contact [Datadog support][3].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /developers/dogstatsd
[2]: /integrations/azure
[3]: /help
