---
title: Microsoft Azure App Services Extension
kind: documentation
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "integrations/azure_app_service_environment"
  tag: "Documentation"
  text: "Azure App Service Environment"
---

## Azure App Services Overview

Azure App Services is a group of “serverless” resources that enable you to build and host web apps, mobile back ends, event-driven functions, and RESTful APIs without managing infrastructure. It can host workloads of all sizes and offers auto-scaling and high availability options.

Datadog provides monitoring capabilities for all Azure App Services resource types:
- Azure Monitor metrics for [Apps][1] and [Functions][2] using the [Azure Integration][3] 
- Custom metrics can be submitted using the API
- Logs can be submitted using [Eventhub or Blob storage][4]

## Azure App Services Extension

The Datadog extension for Azure App Services provides additional monitoring capabilities for [Azure Web Apps][5]. This additional support includes:

- Full distributed APM tracing via automatic instrumentation
- Support for manual APM instrumentation to customize spans
- Trace_ID injection into application logs

### Supported runtimes

The Datadog .NET APM extension supports the following .NET runtimes in both x64 and x86 architectures when running on Windows instances (AAS does not support extensions on Linux yet). For more details about automatically instrumented libraries, see the [Tracer documentation][6].

- .NET Framework 4.7 (AAS does not support more recent versions)
- .NET Core 2.1
- .NET Core 2.2 (Microsoft support ended 2019-12-23)
- .NET Core 3.0 (Microsoft supports will end 2020-03-03)
- .NET Core 3.1

## Installation

1. Open the [Azure Portal][7] and navigate to the dashboard for the Azure App Services instance you wish to instrument with Datadog.
2. Go to the Application settings tab of the Configuration page.
3. Add your datadog API key as an application setting called `DD_API_KEY`. You can find or create a new API key, in your [Datadog Account][8].
4. If you use the EU Datadog site (datadoghq.eu domain), add an application setting `DD_SITE` with datadoghq.eu as the value.
    By default, the extension submits data to the US Datadog site (the datadoghq.com domain). So if you use the US Datadog site, there is no additional application setting required.
5. Go to the extensions page and click **Add**.
6. Select the Datadog APM extension.
7. Accept the legal terms, click **OK** and wait for the installation to complete.
8. Restart the main application: click **Stop**, wait for a full stop, then click **Start**.

## Logs and Trace ID Injection

Logs for Azure Web Apps can be submitted to Datadog with Eventhub using the process described in our [Azure Integration documentation][9].

Once the logging pipeline is established for your Web App, Trace ID injection allows you to [connect logs and traces][10] in Datadog. To enable this with the extension, just add an application setting `DD_LOGS_INJECTION:true`.

Note that trace ID injection occurs in the application. This means that application logs will include the trace ID, but other categories of [diagnostic Logs available from Azure][11] will not (eg, HTTP logs, audit logs, etc.).

## Troubleshooting

### 5XX errors

If immediately after installation your app begins throwing 5XX errors, we recommend first trying to reinstall with the application in a full stop. To do this:

1. stop the application
2. remove the Datadog extension
3. install the Datadog extension
4. start the Web App back up

A clean install to a stopped app typically solves the problem. However, if you’re still getting 5XX errors, it may be related to something like the debug setting being enabled, which can really slow down the startup time of the Web App, and can result in a 500 error. You can also try:

- adjusting your logging and/or application settings
- move the Web App to a more powerful App Service Plan

### Missing traces

If you’re missing traces or not receiving them at all, make sure you have not manually adjusted any port settings. The Tracer Agent in the extension communicates with the web app to identify the correct port to use for external traffic. Manual port settings can interfere with this process resulting in missed traces.

Still need help? [Contact Datadog support][12].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}





[1]: /integrations/azure_app_services
[2]: /integrations/azure_functions/
[3]: /integrations/azure_app_services/
[4]: /integrations/azure/?tab=azurecliv20#log-collection
[5]: https://azure.microsoft.com/en-us/services/app-service/web/
[6]: /tracing/setup/dotnet
[7]: https://portal.azure.com
[8]: https://app.datadoghq.com/account/settings#api
[9]: /integrations/azure/?tab=eventhub
[10]: /tracing/connect_logs_and_traces/
[11]: https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs
[12]: /help/
