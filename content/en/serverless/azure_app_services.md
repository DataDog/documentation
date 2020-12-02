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
---
<div class="alert alert-warning"> This service is in public beta. If you have any feedback, contact <a href="/help">Datadog support</a>. During the beta period, the use of this extension is not metered for billing purposes.</div>

## Overview

Microsoft Azure App Services is a group of serverless resources that enable you to build and host web apps, mobile back ends, event-driven functions, and RESTful APIs without managing infrastructure. It can host workloads of all sizes and offers auto-scaling and high availability options.

Datadog provides monitoring capabilities for all Azure App Services resource types:

- Azure Monitor metrics for [Apps][1] and [Functions][2] using the [Azure Integration][1].
- Custom metrics can be submitted using the API.
- [Resource logs][3] can be submitted using [Event Hub][4].

The Datadog extension for Azure App Services provides additional monitoring capabilities for [Azure Web Apps][5]. This support includes:

- Full distributed APM tracing using automatic instrumentation.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][6].

## Setup

### Requirements

If you haven't already, set up the [Microsoft Azure integration][7] first.

The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows instances (AAS does not yet support extensions on Linux). For more details about automatically instrumented libraries, see the [Tracer documentation][8].

- .NET Framework 4.7 and later
- .NET Core 2.1
- .NET Core 2.2 (Microsoft support ended 2019-12-23)
- .NET Core 3.0 (Microsoft support ended 2020-03-03)
- .NET Core 3.1

### Installation

1. Open the [Azure Portal][9] and navigate to the dashboard for the Azure App Services instance you wish to instrument with Datadog.
2. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
3. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][10].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
4. Set the `DD_SITE` to `{{< region-param key="dd_site" code="true" >}}`. Defaults to `datadoghq.com`.
5. Go to the extensions page and click **Add**.
6. Select the Datadog APM extension.
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Datadog extension" >}}
7. Accept the legal terms, click **OK**, and wait for the installation to complete.
8. Restart the main application: click **Stop**, wait for a full stop, then click **Start**.
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="Stop and restart page" >}}

### Application logging from Azure Web Apps

Sending logs from your application in Azure App Services to Datadog requires the use of Serilog. Submitting logs with this method allows for trace ID injection, which makes it possible to connect logs and traces in Datadog. To enable trace ID injection with the extension, add the application setting `DD_LOGS_INJECTION:true`.

**Note**: Since this occurs inside your application, any Azure Platform logs you may be submitting with diagnostic settings does not include the trace ID.

Install the [Datadog Serilog sink][11] NuGet package, which sends events and logs to Datadog. By default, the sink forwards logs through HTTPS on port 443. Run the following command in the application's package manager console:

```
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Next, initialize the logger directly in your application. Replace `<DD_API_KEY>` with your [Datadog API key][10].

```
using Serilog;
using Serilog.Sinks.Datadog.Logs;

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs("<DD_API_KEY>")
              .Enrich.FromLogContext()
              .CreateLogger();
```

You can also override the default behavior and forward logs in TCP by manually specifying the following required properties: url, port, useSSL, and useTCP. Optionally, specify the [source, service, and custom tags][12].

For example, to forward logs to the Datadog US region in TCP use the following sink configuration:

{{< code-block lang="text" wrap="false" disable_copy="true" >}}
using Serilog; 
using Serilog.Sinks.Datadog.Logs;

          var config = new DatadogConfiguration(
              url:"https://http-intake.logs.datadoghq.com", 
              port:10516, 
              useSSL:true, 
              useTCP:false);

          Serilog.Log.Logger = new LoggerConfiguration()
              .WriteTo.DatadogLogs(
                  "eb7c615e5fca779871203b7de9209b6c",
                  source: "<SOURCE_NAME>",
                  service: "<SERVICE_NAME>",
                  tags: new string[] { "<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>" },
                  configuration: config
              )
              .Enrich.FromLogContext()
              .CreateLogger();
{{< /code-block >}}

New Logs are now directly sent to Datadog.

Alternatively, since 0.2.0, configure the Datadog sink by using an `appsettings.json` file with the Serilog.Settings.Configuration NuGet package.

In the `Serilog.WriteTo()` array, add an entry for DatadogLogs, for example:

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_KEY>",
        "source": "<SOURCE_NAME>",
        "host": "<HOST_NAME>",
        "tags": ["<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## Custom Metrics with DogStatsD

Starting with version `0.3.14-prerelease`, the App Services extension includes an instance of [DogStatsD][6] (Datadog's metrics aggregation service). This enables you to submit custom metrics, service checks, and events directly to Datadog from Azure Web Apps with the extension.

Writing custom metrics and checks in your web app is similar to the process for doing so with an application on a host running the Datadog Agent. However, there is no need to configure ports, which is taken care of by the extension automatically. To submit custom metrics to Datadog from Azure App Services using the extension:

1. Add the [DogStatsD Nuget package][13] to your Visual Studio project.
2. [Initialize DogStatdD and write custom metrics][14] in your application.
3. Deploy your code to a supported Azure .NET web app.
4. Install the Datadog App Service extension.

Learn more about [custom metrics][15].

## Troubleshooting

### 5XX errors

If your app begins throwing 5XX errors immediately after installation, first try to reinstall with the application in a full stop. To do this:

1. Stop the application.
2. Remove the Datadog extension.
3. Reinstall the Datadog extension.
4. Restart your application.

A clean install to a stopped app typically solves the problem. However, if you’re still getting 5XX errors, it may be related to something like an enabled debug setting, which can slow down the startup time of your application, and can result in a 500 error. You can also try:

- Adjusting your logging and application settings
- Move your application to a more powerful App Service Plan

### Missing traces

If you’re missing traces or not receiving them at all, make sure you have not manually adjusted any port settings. The Tracer Agent, in the extension, communicates with your application to identify the correct port to use for external traffic. Manual port settings can interfere with this process resulting in missed traces.

Still need help? Contact [Datadog support][16].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure_app_services/
[2]: /integrations/azure_functions/
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs
[4]: /integrations/azure/?tab=eventhub#log-collection
[5]: https://azure.microsoft.com/en-us/services/app-service/web/
[6]: /developers/dogstatsd
[7]: /integrations/azure
[8]: /tracing/setup/dotnet/
[9]: https://portal.azure.com
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[12]: /logs/log_collection/#reserved-attributes
[13]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
[14]: /developers/dogstatsd/?tab=net#code
[15]: developers/metrics/
[16]: /help
