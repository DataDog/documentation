---
title: Microsoft Azure App Services Extension
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
- link: "https://www.datadoghq.com/pricing/?product=apm#apm-what-is-considered-as-a-host-for-azure-app-services"
  tag: "Pricing"
  text: "Azure App Service APM Pricing"
---

## Overview

Microsoft [Azure App Services][1] is a group of serverless resources that enable you to build and host web apps, mobile back ends, event-driven functions, and RESTful APIs without managing infrastructure. It can host workloads of all sizes and offers auto-scaling and high availability options.

Datadog provides monitoring capabilities for all Azure App Services resource types:

- Azure Monitor metrics for [Apps][2] and [Functions][3] using the [Azure Integration][2].
- Custom metrics can be submitted using the API.
- [Resource logs][4] can be submitted using [Event Hub][5].

The Datadog extension for Azure App Services provides additional monitoring capabilities for [Azure Web Apps][6]. This support includes:

- Full distributed APM tracing using automatic instrumentation.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][7].

## Setup

### Requirements

1. If you haven't already, set up the [Microsoft Azure integration][8] first.

2. The extension only supports Azure App Service Web Apps. **Function Apps are not supported**.

<div class="alert alert-warning">To get notified when a private beta is available for Function Apps or additional runtimes, [sign up here][9].</div>

3. The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows instances (AAS does not yet support extensions on Linux). For more details about automatically instrumented libraries, see the [Tracer documentation][10].

    - .NET Framework 4.5 and later
    - .NET Core 2.1
    - .NET Core 2.2 (Microsoft support ended 2019-12-23)
    - .NET Core 3.0 (Microsoft support ended 2020-03-03)
    - .NET Core 3.1
    - .NET 5

4. Datadog recommends doing regular updates to the latest version of the extension to ensure optimal performance, stability, and availability of features. Note that both the initial install and subsequent updates require a restart of your web app.

**Note**: Datadog automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, APM). To ensure maximum visibility, run only one APM solution within your application environment.

### Installation

1. Configure the Azure integration to monitor your web app and verify it is configured correctly by ensuring that you see an `azure.app_service.count` metric tagged with the name of your web application. **Note**: This step is critical for metric/trace correlation, functional trace panel views in the Datadog portal, and accurate billing.

2. Open the [Azure Portal][11] and navigate to the dashboard for the Azure App Services instance you wish to instrument with Datadog.

3. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
4. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][12].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
5. Configure optional application settings:
    - Set the `DD_SITE` to {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).
    - Set `DD_ENV` to group your traces and custom statistics.
    - Set `DD_SERVICE` to specify a service name (defaults to your web app name).
    - Set `DD_LOGS_INJECTION:true` for correlation with application logs from your web app.
    - See a full list of [optional configuration variables][13].
6. Click **Save** (this restarts your application).
7. <div class="alert alert-warning">[REQUIRED] Stop your application by clicking <u>Stop</u>.</div>
8. Go to the Azure extensions page and select the Datadog APM extension.
    {{< img src="infrastructure/serverless/azure_app_services/choose_extension.png" alt="Datadog extension" >}}
9. Accept the legal terms, click **OK**, and wait for the installation to complete. **Note**: the web app must be in a stopped state for this step to complete successfully.
10. Start the main application, click **Start**:
    {{< img src="infrastructure/serverless/azure_app_services/start.png" alt="Start" >}}

### Application logging from Azure web apps

Sending logs from your application in Azure App Services to Datadog requires the use of Serilog. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

**Note**: Since this occurs inside your application, any Azure Platform logs you submit with diagnostic settings does not include the trace ID.

See documentation on [setting up agentless logging with Serilog][14] for detailed instructions.

## Custom metrics with DogStatsD

The App Services extension includes an instance of [DogStatsD][7] (Datadog's metrics aggregation service). This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps with the extension.

Writing custom metrics and checks in your web app is similar to the process for doing so with an application on a host running the Datadog Agent. To submit custom metrics to Datadog from Azure App Services using the extension:

1. Add the [DogStatsD NuGet package][15] to your Visual Studio project.
2. Initialize DogStatdD and write custom metrics in your application.
3. Deploy your code to a supported Azure .NET web app.
4. Install the Datadog App Service extension.

**Note**: Unlike the [standard DogStatsD config process][16], there is no need to set ports or a server name when initializing the DogStatsD configuration. There are ambient environment variables in Azure App Service that determine how the metrics are sent (requires v6.0.0+ of the DogStatsD client).

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
// These environment variables are present in Azure App Services, but
// need to be set in order to test your custom metrics: DD_API_KEY:{api_key}, DD_AGENT_HOST:localhost
// Ignore or log the exception as it suits you
Console.WriteLine(ex);
}
// Send a metric
DogStatsd.Increment("sample.startup");
```

Learn more about [custom metrics][17].

## Troubleshooting

To start troubleshooting your application, try these steps:

1. Verify you've set `DD_SITE` and `DD_API_KEY` correctly.
2. Do a full stop and start of your application.
3. If not resolved, try uninstalling the extension and re-installing (this also ensures you are running the latest version).
4. Still need help? Contact [Datadog support][18].

**Note**: To expedite the process of investigating application errors with the support team, set `DD_TRACE_DEBUG:true` and add the content of the Datadog logs directory (`%AzureAppServiceHomeDirectory%\LogFiles\datadog`) to your email.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.microsoft.com/en-us/azure/app-service/
[2]: /integrations/azure_app_services/
[3]: /integrations/azure_functions/
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[5]: /integrations/azure/?tab=eventhub#log-collection
[6]: https://azure.microsoft.com/en-us/services/app-service/web/
[7]: /developers/dogstatsd
[8]: /integrations/azure
[9]: https://forms.gle/n4nQcxEyLqDBMCDA7
[10]: /tracing/setup/dotnet/
[11]: https://portal.azure.com
[12]: https://app.datadoghq.com/account/settings#api
[13]: /tracing/setup_overview/setup/dotnet-framework/#additional-optional-configuration
[14]: /logs/log_collection/csharp/?tab=serilog#agentless-logging
[15]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[16]: /developers/dogstatsd/?tab=net#code
[17]: /developers/metrics/
[18]: /help
