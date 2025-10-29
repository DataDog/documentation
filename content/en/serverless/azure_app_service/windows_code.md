---
title: Azure App Service - Windows Code
aliases:
  - /infrastructure/serverless/azure_app_services/
  - /serverless/azure_app_services/azure_app_services_windows
further_reading:
- link: "/integrations/guide/azure-native-integration/"
  tag: "Documentation"
  text: "Azure Native Integration Guide"
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

The Datadog extension for Azure App Service provides monitoring capabilities in addition to the [Datadog-Azure integration][5], which provides metrics and logs.

- Full distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

<div class="alert alert-info">
The extension supports Azure App Service Web Apps on Basic, Standard, and Premium plans. Flex or Consumption plans are not supported.<br/><br/>

<strong>Interested in support for other App Service resource types or runtimes?</strong> <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a Preview becomes available.</div>

### Supported runtimes

The Datadog .NET, Java, and Node.js APM extensions support the following runtimes in Windows Code web apps:

| Framework | Supported runtimes |
| --------- | ------------------ |
| .NET      | `ASPNET:V3.5`, `ASPNET:V4.8`, `dotnet:8`, `dotnet:9`  |
| Java      | `JAVA:8`, `JAVA:11`, `JAVA:17`, `JAVA:21`, `TOMCAT:9.0-java8`, `TOMCAT:9.0-java11`, `TOMCAT:9.0-java17`, `TOMCAT:9.0-java21`, `TOMCAT:10.1-java8`, `TOMCAT:10.1-java11`, `TOMCAT:10.1-java17`, `TOMCAT:10.1-java21`, `TOMCAT:11.0-java8`, `TOMCAT:11.0-java11`, `TOMCAT:11.0-java17`, `TOMCAT:11.0-java21` |
| Node.js   | `NODE:20LTS`, `NODE:22LTS` |

### Extension-specific notes

{{< tabs >}}
{{% tab ".NET" %}}

Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog's .NET Tracer with Profiler enabled). To ensure maximum visibility, run only one APM solution within your application environment.

Additionally, if you are using the Azure Native integration, you can use the Datadog resource in Azure to add the extension to your .NET apps. For instructions, see the [App Service extension section][1] of Datadog's [Azure Native integration guide][2].

[1]: /integrations/guide/azure-native-integration/#app-service-extension
[2]: /integrations/guide/azure-native-integration/

{{% /tab %}}
{{% tab "Java" %}}
Support for Java Web Apps is in Preview for extension v2.4+.

There are no billing implications for tracing Java Web Apps during this period.

{{% /tab %}}
{{< /tabs >}}

## Prerequisites

1. **Install the Azure integration:** Install the [Datadog-Azure integration](/integrations/azure/) to collect Azure metrics and logs.
2. **Understand the extension approach:** The Azure App Service extension is a specialized version of the Datadog .NET tracer. It differs from standard APM setup:
   - No MSI installer needed (extension handles installation)
   - No manual environment variable configuration for basic setup
   - Automatic integration with IIS
3. **Review .NET compatibility:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) or [.NET Framework Compatibility](/tracing/trace_collection/compatibility/dotnet-framework) for supported versions.

<div class="alert alert-warning">
<strong>Do not install the Datadog .NET tracer MSI</strong> on Azure App Service. The extension provides all necessary components. Installing the MSI may cause conflicts.
</div>

<div class="alert alert-info">
Looking for Azure Functions instead? See <a href="/serverless/azure_functions/">Azure Functions Setup</a>. Using Linux? See <a href="/serverless/azure_app_service/linux_code">Linux Code</a> or <a href="/serverless/azure_app_service/linux_container">Linux Container</a> setup.
</div>

## Installation

Datadog recommends doing regular updates to the latest version of the extension to ensure optimal performance, stability, and availability of features. Note that both the initial install and subsequent updates require your web app to be fully stopped in order to install/update successfully.

If you haven't already, set up the [Datadog-Azure integration][3]. You can verify that your Azure integration is configured correctly by ensuring that you see the `azure.app_services.count` or `azure.functions.count` metrics in Datadog.

<div class="alert alert-info">This step is critical for metric/trace correlation and functional trace panel views and improves the overall experience of using Datadog with Azure App Services.
</div>

{{< tabs >}}
{{% tab "Terraform" %}}

The [Datadog Terraform module for Windows Web Apps][4] wraps the [azurerm_windows_web_app][5] resource and automatically configures your Web App for Datadog Serverless Monitoring by adding required environment variables and the Windows Web App extension for your runtime.

If you don't already have Terraform set up, [install Terraform][1], create a new directory, and make a file called `main.tf`.

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
  resource_group_name = "my-resource-group"   // Replace with your resource group
  os_type             = "Windows"
  location            = "eastus"
  sku_name            = "P1v2"
}

module "my_web_app" {
  source  = "DataDog/web-app-datadog/azurerm//modules/windows"
  version = "~> 1.0"

  name                = "my-web-app"        // Replace with your web app name
  resource_group_name = "my-resource-group" // Replace with your resource group
  service_plan_id     = azurerm_service_plan.my_asp.id
  location            = "eastus"

  datadog_api_key = var.datadog_api_key
  datadog_service = "my-service" // Replace with your service name
  datadog_env     = "prod"       // Replace with your environment (e.g. prod, staging)
  datadog_version = "0.0.0"      // Replace with your application version

  site_config = {
    application_stack = {
      node_version = "~22" // change for your specific runtime
    }
  }
  app_settings = {
    DD_TRACE_ENABLED = "true" // Example setting
  }
}
```

Finally, run `terraform apply`, and follow any prompts.

The [Datadog Windows Web App module][2] only deploys the Web App resource and extension, so you need to [deploy your code][3] separately.

[1]: https://developer.hashicorp.com/terraform/install
[2]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[3]: https://learn.microsoft.com/en-us/azure/app-service/getting-started
[4]: https://registry.terraform.io/modules/DataDog/web-app-datadog/azurerm/latest/submodules/windows
[5]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/windows_web_app

{{% /tab %}}
{{% tab "Manual" %}}

1. In your [Azure Portal][1], navigate to the dashboard for the Azure app you wish to instrument with Datadog.

2. Configure the following Application Settings:

   **Required environment variables**

   `DD_API_KEY`
   : **Value**: Your Datadog API key.<br>
   See [Organization Settings > API Keys][2] in Datadog.<br>

   `DD_SITE`
   : **Value**: Your Datadog site<br>
   Your [Datadog site][3]. Defaults to `datadoghq.com`.<br>

   **Unified Service Tagging**

   Datadog recommends tagging your application with the `env`, `service`, and `version` tags for [unified service tagging][4].

   `DD_SERVICE`
   : **Value**: Your application's service name.<br>

   `DD_ENV`
   : **Value**: Your application's environment name.<br>
   There is no default value for this field.<br>

   `DD_VERSION`
   : **Value**: Your application's version.<br>
   There is no default value for this field.<br>

   **Additional environment variables**

   `DD_LOGS_INJECTION`
   : **Value**: `true` (recommended)<br>
   Enables trace-log correlation by injecting trace IDs into your application logs.<br>
   This allows you to correlate logs with traces in the Datadog UI.<br>

3. Click **Save**. This restarts your application.

4. Stop your application by clicking **Stop**.
   <div class="alert alert-danger">You <u>must</u> stop your application to successfully install Datadog.</div>

5. In your Azure Portal, navigate to the **Extensions** page and select the Datadog APM extension.

   {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Example of Extensions page in Azure portal, showing .NET Datadog APM extension." style="width:100%;" >}}

6. Accept the legal terms, click **OK**, and wait for the installation to complete.
   <div class="alert alert-danger">This step requires that your application be in a stopped state.</div>

7.  Start the main application, click **Start**:

    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Azure start button" style="width:100%;" >}}

8.  Verify that the extension is installed and running by checking the **Extensions** page in your Azure Portal.

<div class="alert alert-info">To avoid downtime, use <a href="https://learn.microsoft.com/en-us/azure/app-service/deploy-best-practices#use-deployment-slots">deployment slots</a>. You can create a workflow that uses the <a href="https://github.com/marketplace/actions/azure-cli-action">GitHub Action for Azure CLI</a>. See the sample <a href="/resources/yaml/serverless/aas-workflow-windows.yaml">GitHub workflow</a>.</div>

[1]: https://portal.azure.com/
[2]: /account_management/api-app-keys/
[3]: /getting_started/site/
[4]: /getting_started/tagging/unified_service_tagging

{{% /tab %}}
{{< /tabs >}}

## Custom metrics

The Azure App Service extension includes an instance of [DogStatsD][1], Datadog's metrics aggregation service. This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps and Functions with the extension.

Writing custom metrics and checks in Azure App Service is similar to the process for doing so with an application on a host running the Datadog Agent. **Unlike** the [standard DogStatsD config process][1], there is no need to set ports or a server name when initializing the DogStatsD configuration. There are ambient environment variables in Azure App Service that determine how the metrics are sent (requires v6.0.0+ of the DogStatsD client).

To submit custom metrics to Datadog from Azure App Service using the extension:

{{< tabs >}}
{{% tab ".NET" %}}

1. Add the [DogStatsD NuGet package](https://www.nuget.org/packages/DogStatsD-CSharp-Client) to your Visual Studio project.
2. Initialize DogStatsD and write custom metrics in your application.
3. Deploy your code to Azure App Service.
4. If you have not already, install the Datadog App Service extension.

To send metrics, use this code:

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

{{% /tab %}}
{{% tab "Java" %}}

1. Add the [DogStatsD client](https://search.maven.org/artifact/com.datadoghq/java-dogstatsd-client) to your project.
2. Initialize DogStatsD and write custom metrics in your application.
3. Deploy your code to a supported Azure web app.
4. If you have not already, install the Datadog App Service extension.

To send metrics, use this code:

```java
// Configure your DogStatsd client and configure any tags
StatsDClient client = new NonBlockingStatsDClientBuilder()
                            .constantTags("app:sample.service")
                            .build();
// Send a metric
client.Increment("sample.startup");
```

{{% /tab %}}
{{% tab "Node.js" %}}

1. [Initialize DogStatsD and write custom metrics][1] in your application.
2. Deploy your code to a supported Azure Web App.
3. If you have not already, install Datadog's Azure App Service Node.js extension.

<div class="alert alert-info">You do not need to install a Node.js DogStatsD client, as it is included in the Node.js tracer (<code>dd-trace</code>) packaged in the Azure App Service extension.</div>

To send metrics, use this code:

```javascript
const tracer = require('dd-trace');
tracer.init();

tracer.dogstatsd.increment('example_metric.increment', 1, { environment: 'dev' });
tracer.dogstatsd.decrement('example_metric.decrement', 1, { environment: 'dev' });
```

<div class="alert alert-info">Datadog's Node.js tracer, <code>dd-trace</code>, is packaged in the Azure App Services extension. It is automatically appended to the <code>NODE_PATH</code>.<br/><br/> <strong>You do not need to add</strong> <code>dd-trace</code> <strong>as a dependency in</strong> <code>package.json</code>. Explicitly adding <code>dd-trace</code> as a dependency may override the version provided by the extension. For local testing, reference the <a href="https://github.com/DataDog/datadog-aas-extension/releases">release notes</a> to find the appropriate version of the Node.js tracer for your version of the Azure App Service extension.</div>

[1]: /developers/dogstatsd/

{{% /tab %}}
{{< /tabs >}}

**Note**: To send only custom metrics (while disabling tracing) set the following variables in your application's config:
  - Set `DD_TRACE_ENABLED` to `false`.
  - Set `DD_AAS_ENABLE_CUSTOM_METRICS` to `true`.

Learn more about [custom metrics][2].

## Logging

### Application logging

{{< tabs >}}
{{% tab ".NET" %}}

You can send logs from your application in Azure App Service to Datadog in one of the following ways:

- Use the [installation steps](#installation) on this page to enable APM with the Datadog APM extension. Then [enable Agentless logging][1].
- Use [Agentless logging with the Serilog sink][2].

Both methods allow trace ID injection, making it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

[1]: /logs/log_collection/csharp/#agentless-logging-with-apm
[2]: /logs/log_collection/csharp/#agentless-logging-with-serilog-sink

{{% /tab %}}
{{% tab "Java" %}}

Sending logs from your application in Azure App Service to Datadog requires streaming logs to Datadog directly from your app. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog.

{{% /tab %}}
{{% tab "Node.js" %}}

Sending logs from your application in Azure App Service to Datadog requires streaming logs to Datadog directly from your app. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog.

{{% /tab %}}
{{< /tabs >}}

<br/>

### Environment variables for logging

Configure these environment variables in your Azure App Service Application Settings for optimal log collection:

| Variable | Description | Example |
|----------|-------------|---------|
| `DD_SERVICE` | Your application's service name | `my-web-app` |
| `DD_ENV` | Your application's environment | `production`, `staging`, `development` |
| `DD_LOGS_INJECTION` | Enable trace-log correlation | `true` |

### Logging best practices

- **Enable trace correlation**: Set `DD_LOGS_INJECTION=true` to correlate logs with traces
- **Set proper service names**: Use `DD_SERVICE` to ensure logs appear with the correct service name
- **Use structured logging**: Implement structured logging in your application for better log parsing

**Note**: Trace ID injection occurs inside your application. Azure Resource logs are generated by Azure in the management plane, and therefore do not include the trace ID.

{{< tabs >}}
{{% tab ".NET" %}}

**Code Example: Microsoft Native Logging**

An example of how to set up logging in a .NET application using Microsoft.Extensions.Logging:

```csharp
using Microsoft.Extensions.Logging;

public class WeatherForecastController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Processing weather forecast request");

        // Your business logic here
        var forecast = GetWeatherForecast();

        _logger.LogInformation("Weather forecast retrieved for user: {UserId}", userId);

        return Ok(forecast);
    }
}
```

**Program.cs configuration**

```csharp
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add structured logging with JSON format
builder.Logging.AddJsonConsole(options =>
{
    options.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var app = builder.Build();
// ... rest of your application configuration
```

**appsettings.json configuration**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "Console": {
      "FormatterName": "json",
      "FormatterOptions": {
        "IncludeScopes": true,
        "TimestampFormat": "yyyy-MM-dd HH:mm:ss "
      }
    }
  }
}
```

This setup automatically includes trace correlation when `DD_LOGS_INJECTION=true` is set in your Azure App Service Application Settings.

{{% /tab %}}
{{% tab "Java" %}}

See instructions for [Agentless logging with Java][1] to configure application logging for Java in Azure App Service.

[1]: /logs/log_collection/java/#agentless-logging

{{% /tab %}}
{{% tab "Node.js" %}}

To configure application logging for Node.js in Azure App Service, see [Agentless logging with Node.js][1].

[1]: /logs/log_collection/nodejs/#agentless-logging

{{% /tab %}}
{{< /tabs >}}

## Programmatic management

{{< tabs >}}
{{% tab ".NET" %}}

Datadog provides scripts to update or install the Azure App Service Extension using Powershell. Scripted extension management enables you to [update extensions in bulk by resource group](#powershell-resource-group) and [designate the installation of specific versions of the site extension](#powershell-specific-version). You can also use scripts to programmatically add the extension in CI/CD pipelines, as well as discover and update extensions that are already installed.

### Prerequisites

- The [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) or [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).
- Azure App Service [user-scope credentials](https://docs.microsoft.com/en-us/azure/app-service/deploy-configure-credentials). If you do not already have credentials, go to your [Azure portal](https://portal.azure.com/) and access your Web App or Function App. Navigate to **Deployment** > **Deployment Center** to create or retrieve your user-scope credentials.

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
- `<SUBSCRIPTION_ID>`: Your Azure [subscription ID](https://docs.microsoft.com/en-us/azure/media-services/latest/setup-azure-subscription-how-to).
- `<RESOURCE_GROUP_NAME>`: Your Azure resource group name.
- `<SITE_NAME>`: The name of your app.
- `<DATADOG_API_KEY>`: Your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys).

Also, set `DATADOG_SITE` to your [Datadog site][32]. `DATADOG_SITE` defaults to `datadoghq.com`. Your site is: {{< region-param key="dd_site" code="true" >}}.

[32]: /getting_started/site/

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

Many organizations use [Azure Resource Management (ARM) templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/overview) to implement the practice of infrastructure-as-code. To build the App Service Extension into these templates, incorporate [Datadog's App Service Extension ARM template](https://github.com/DataDog/datadog-aas-extension/tree/master/ARM) into your deployments to add the extension and configure it alongside your App Service resources.

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-danger">Support for Java Web Apps is in Preview for extension v2.4+. Programmatic management is not available for Java Web Apps.<br/><br/>
    Interested in support for other App Service resource types or runtimes? <a href="https://forms.gle/n4nQcxEyLqDBMCDA7">Sign up</a> to be notified when a Preview becomes available.</div>

{{% /tab %}}
{{< /tabs >}}

## Deployment

{{% aas-workflow-windows %}}

## Troubleshooting

### If your apps are identified as being misconfigured in the Serverless View and/or you are missing corresponding metrics for your traces

It is likely that you do not have the Azure integration configured to monitor your application. Proper configuration improves your ability to correlate metrics, traces, and logs in the Datadog platform. Without the Azure integration configured, you are missing critical context for your traces. To fix this:

1. Go to the Azure integration tile.

2. Ensure you have installed the [Azure integration][3] for the Azure subscription where your application is running.

3. Ensure that any App Service plan filtering rules you have applied include the App Service plan where the app is running. If an App Service plan is not included, all apps and functions hosted on it are also not included. Tags on the app itself are not used for filtering by Datadog.

### If APM traces are not appearing in Datadog

1. Verify you've set `DD_SITE` and `DD_API_KEY` correctly.

2. Do a full stop and start of your application.

3. If not resolved, try uninstalling the extension and re-installing (this also ensures you are running the latest version).

**Note**: To expedite the process of investigating application errors with the support team, set `DD_TRACE_DEBUG:true` and add the content of the Datadog logs directory (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) to your email.

Still need help? Contact [Datadog support][4].

## Additional Resources

### .NET Core (Isolated Worker Model)
- [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core)
- [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/)

### .NET Framework (In-Process Model)
- [Tracing .NET Framework Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework)
- [.NET Framework Library Configuration](/tracing/trace_collection/library_config/dotnet-framework/)

### All .NET Versions
- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/)
- [.NET Diagnostic Tool](/tracing/troubleshooting/dotnet_diagnostic_tool)

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /metrics/custom_metrics/
[3]: /integrations/azure/
[4]: /help
[5]: https://app.datadoghq.com/integrations/azure
