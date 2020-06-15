---
title: Microsoft Azure App Services Extension
kind: documentation
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
- Logs can be submitted using [Eventhub or Blob storage][3].

The Datadog extension for Azure App Services provides additional monitoring capabilities for [Azure Web Apps][4]. This support includes:

- Full distributed APM tracing using automatic instrumentation.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.

## Setup

### Requirements

The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows instances (AAS does not yet support extensions on Linux). For more details about automatically instrumented libraries, see the [Tracer documentation][5].

- .NET Framework 4.7 (AAS does not support more recent versions)
- .NET Core 2.1
- .NET Core 2.2 (Microsoft support ended 2019-12-23)
- .NET Core 3.0 (Microsoft support ended 2020-03-03)
- .NET Core 3.1

### Installation

1. Open the [Azure Portal][6] and navigate to the dashboard for the Azure App Services instance you wish to instrument with Datadog.
2. Go to the Application settings tab of the Configuration page.
    {{< img src="infrastructure/serverless/azure_app_services/config.png" alt="configuration page" >}}
3. Add your Datadog API key as an application setting called `DD_API_KEY` and a value of your [Datadog API Key][7].
    {{< img src="infrastructure/serverless/azure_app_services/api_key.png" alt="api key page" >}}
4. If you use the EU Datadog site (datadoghq.eu domain), add an application setting `DD_SITE` with datadoghq.eu as the value.
    By default, the extension submits data to the US Datadog site (the datadoghq.com domain). So if you use the US Datadog site, there is no additional application setting required.
5. Go to the extensions page and click **Add**.
6. Select the Datadog APM extension.
    {{< img src="infrastructure/serverless/azure_app_services/extension.png" alt="Datadog extension" >}}
7. Accept the legal terms, click **OK**, and wait for the installation to complete.
8. Restart the main application: click **Stop**, wait for a full stop, then click **Start**.
    {{< img src="infrastructure/serverless/azure_app_services/restart.png" alt="Stop and restart page" >}}

### Logs and traces

Logs for Azure Web Apps can be submitted to Datadog with Eventhub using the process described in the [Azure Integration documentation][8]. **Note**: Agentless logging is not available for this extension.

Once you establish the logging pipeline for your application, Trace ID injection allows you to [connect logs and traces][9] in Datadog. To enable this with the extension, add an application setting `DD_LOGS_INJECTION:true`.

**Note**: Trace ID injection occurs in the application, so application logs include the trace ID. Other categories of [diagnostic logs available from Azure][10], like HTTP logs and audit logs, do not include the trace ID.

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

Still need help? Contact [Datadog support][11].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure_app_services/
[2]: /integrations/azure_functions/
[3]: /integrations/azure/?tab=azurecliv20#log-collection
[4]: https://azure.microsoft.com/en-us/services/app-service/web/
[5]: /tracing/setup/dotnet/
[6]: https://portal.azure.com
[7]: https://app.datadoghq.com/account/settings#api
[8]: /integrations/azure/?tab=eventhub
[9]: /tracing/connect_logs_and_traces/
[10]: https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs
[11]: /help/
