## Overview

This instrumentation method provides the following additional monitoring capabilities for Linux Azure App Service workloads using the Node and .NET runtimes.

- Full distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

The solution leverages the Startup Command setting, and Application Settings for Linux Azure App services to instrument the application and manage the configuration. 

## Setup
### Configuration
To instrument your application, begin by adding the following key value pairs as Application Settings. Note that the application will re-start when new settings are saved. 

- `DD_API_KEY` is your Datadog API key
- `DD_SITE` is the Datadog site [parameter][2]) (defaults to datadoghq.com)
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in package.json.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www`

![storms-nodejs-example - Microsoft Azure 2022-11-30 at 4 15 47 PM](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/YEuD88kN/57eceb6b-dd34-4d5f-a7ea-a8fcc2ec77ba.jpg?source=viewer&v=505cc168a458a4ec84b7d6a903f78493)

### Startup Command
Next, add the following to the startup command field under General Settings.


      curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-extension/linux-v0.1.4-beta/linux/datadog_wrapper | bash

![storms-nodejs-example - Microsoft Azure 2022-11-30 at 4 15 26 PM](https://p-qkfgo2.t2.n0.cdn.getcloudapp.com/items/P8uNWWQ6/02c4f33f-f4d9-42b3-b746-3d5c9d62a8f3.jpg?source=viewer&v=3db9f9bba7f342e88c43da5aed1218fd)


### Viewing traces

After the application has been instrumented and restarted successfully, traces will be available from the application within. These can be accessed from  the [Azure Serverless view][3], or in the [APM Service page][4] of your Datadog app.

### Custom Metrics

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