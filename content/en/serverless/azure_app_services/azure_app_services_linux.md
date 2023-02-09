---
title: Azure App Services for Linux
kind: documentation
---

## Overview

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads using the Node and .NET runtimes.

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

The solution uses the Startup Command setting and Application Settings for Linux Azure App Services to instrument the application and manage the configuration. 

## Setup
### Configuration
To instrument your application, begin by adding the following key-value pairs as Application Settings. The application restarts when new settings are saved. 

- `DD_API_KEY` is your Datadog API key.
- `DD_SITE` is the Datadog [site parameter][2]. This defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www`.

{{< img src="serverless/configuration-stack-settings.jpeg" alt="Azure UI, showing Settings > Configuration > Application settings. Underneath these settings are three items: DD_API_KEY, DD_SERVICE, and DD_START_APP."  style="width:100%;" >}}

### Startup command
Next, add the following to the startup command field under General Settings.


`curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-extension/linux-v0.1.4-beta/linux/datadog_wrapper | bash`

{{< img src="serverless/application-settings-configuration.jpeg" alt="Azure UI, showing Settings > Configuration > Stack settings. In the Startup Command box is the curl command listed above."  style="width:100%;" >}}


### Viewing traces

After the application is instrumented and successfully restarted, traces are available from the application within. You can access these in the [Azure Serverless view][3], or in the [APM Service page][4] of Datadog.

### Custom metrics

To enable custom metrics for your application with DogStatsD, add  `DD_CUSTOM_METRICS_ENABLED` and set it as `true` in your Application Settings.

To configure your application to submit metrics, follow the appropriate steps for your runtime.

- [Node][5]
- [.NET][6]

[1]: /developers/dogstatsd
[2]: /getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code