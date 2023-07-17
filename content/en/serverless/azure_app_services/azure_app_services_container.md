---
title: Azure App Service - Linux Container
kind: documentation
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
---
## Overview

This instrumentation method provides the following additional monitoring capabilities for Containerized Linux Azure App Service workloads:

- Fully distributed APM tracing using automatic instrumentation.
- Customized APM service and trace views showing relevant Azure App Service metrics and metadata.
- Support for manual APM instrumentation to customize spans.
- `Trace_ID` injection into application logs.
- Support for submitting custom metrics using [DogStatsD][1].

## Setup
### Prerequisites
Make sure you have a [Datadog API Key][1] and are using a programming language [supported by a Datadog tracing library][2].

[1]: /account_management/api-app-keys/#api-keys
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language

### Instrument your application

#### Install Agent with Dockerfile

{{< programming-lang-wrapper langs="nodejs,python,go,java" >}}
{{< programming-lang lang="nodejs" >}}

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the Datadog js tracing library, either here or in package.json
npm i dd-trace@2.2.0

# enable the Datadog tracing library
ENV NODE_OPTIONS="--require dd-trace/init"

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

#### Install tracing library

Tracing should work with the Dockerfile in the previous step. You can alternatively follow [these instructions][2] to install and configure the Node tracing library in your application to capture and submit traces.

[Sample code for a sample Node.js application][1].

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/nodejs/express
[2]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the python tracing library here or in requirements.txt
RUN pip install --no-cache-dir ddtrace==1.7.3

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["ddtrace-run", "python", "app.py"]
```

#### Install tracing library

Tracing should work with the Dockerfile in the previous step. You can alternatively follow [these instructions][2] to install and configure the Python tracing library in your application to capture and submit traces.

[Sample code for a sample Python application][1].

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/python/flask
[2]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["/path/to/your-go-binary"]
```

#### Install tracing library

Follow [these instructions][2] to install and configure the Go tracing library in your application to capture and submit traces.

[Sample code for a sample Go application][1].

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/go
[2]: /tracing/trace_collection/dd_libraries/go/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the java tracing library
ADD https://dtdg.co/latest-java-tracer dd-java-agent.jar

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint
CMD ["java", "-javaagent:dd-java-agent.jar", "-jar", "app.jar"]
```

#### Install tracing library

The Dockerfile in the previous step installs and configures the Java tracing library in your application to capture and submit traces.
Tracing should work with the Dockerfile in the previous step. Alternatively, see [Tracing Java Applications - Instrument your application][2].

[Sample code for a sample Java application][1].

[1]: https://github.com/DataDog/serverless-self-monitoring/tree/main/self_monitor/azure/App_Service_Linux/container/java/springboot
[2]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application


{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Configure your application

To instrument your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key, used to send data to your Datadog account.
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.

**Note**: The application restarts when new settings are saved. These settings can alternatively be included in the Dockerfile. The only downside being the need to redeploy the application rather than updating the setting and restarting.

### Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure -> Serverless** to see your serverless metrics and traces.

## Additional configurations

### Viewing traces

When new Application Settings are saved, Azure restarts the application. After the application restarts, you can view traces by searching for the service name (`DD_SERVICE`) in the [APM Service page][4] of Datadog.

### Logs

If you use the [Azure integration][6], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

### Custom metrics

To enable custom metrics for your application with DogStatsD, add `DD_CUSTOM_METRICS_ENABLED` and set it as `true` in your Application Settings.

To configure your application to submit metrics, follow the appropriate steps for your runtime.

- [Node][5]
- [Python][11]
- [Go][12]

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

Share the content of the **Log stream** with [Datadog Support][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd
[2]: /getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /integrations/azure/#log-collection
[11]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=python#setup
[12]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent&code-lang=go#setup
[14]: /help
