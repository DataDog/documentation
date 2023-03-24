---
title: Azure Container Apps
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
      tag: 'Blog'
      text: 'Collect traces, logs, and custom metrics from Container Apps services'
---

## Overview
Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Container Apps through the [Azure integration][1]. Datadog also provides a solution, now in beta, for instrumenting your Container Apps applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

  <div class="alert alert-warning">This feature is in beta. You can provide feedback through your standard support channels. During the beta period, Container Apps monitoring and APM tracing are available without a direct cost. Existing APM customers may incur increased span ingestion and volume costs. </div>

## Getting started

### Prerequisites

Make sure you have a [Datadog API Key][2] and are using a programming language [supported by a Datadog tracing library][3].

### 1. Instrument your application

{{< programming-lang-wrapper langs="go,python,nodejs,java,dotnet,ruby" >}}
{{< programming-lang lang="go" >}}

#### Install Agent with Dockerfile

You can instrument your application with a Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/path/to/your-go-binary"]
```

#### Install tracing library
Follow [these instructions][1] to install and configure the Go tracing library in your application to capture and submit traces. 


[Sample code for a simple Go application][2].



[1]: /tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

#### Install Agent with Dockerfile

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the python tracing library here or in requirements.txt
RUN pip install --no-cache-dir ddtrace==1.7.3

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs
CMD ["ddtrace-run", "python", "app.py"]
```
#### Install tracing library
Follow [these instructions][1] to install and configure the Python tracing library in your application to capture and submit traces. 

[Sample code for a simple Python application][2].


[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/python
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

#### Install Agent with Dockerfile

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# install the Datadog js tracing library, either here or in package.json

npm i dd-trace@2.2.0

# enable the Datadog tracing library
ENV NODE_OPTIONS="--require dd-trace/init"

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```
#### Install tracing library
Follow [these instructions][1] to install and configure the Node tracing library in your application to capture and submit traces. 

[Sample code for a simple Node.js application][2].


[1]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/js
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

#### Install Agent with Dockerfile

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["./mvnw", "spring-boot:run"]

```

#### Install tracing library
Follow [these instructions][1] to install and configure the Java tracing library in your application to capture and submit traces. 

[Sample code for a simple Java application][2].


[1]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

#### Install Agent with Dockerfile

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["dotnet", "helloworld.dll"]

```

#### Install tracing library
Follow the instructions to install and configure the [.NET Core tracing library][1] and the [.NET Framework tracing library][2]. 


[1]: /tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[2]: /tracing/trace_collection/dd_libraries/dotnet-framework/?tab=containers#custom-instrumentation
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

#### Install Agent with Dockerfile

Instrument your application with the Datadog Agent by adding the following lines to your Dockerfile. You may need to adjust these examples depending on your existing Dockerfile setup.

```
# copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

# optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

# change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

# execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["rails", "server", "-b", "0.0.0.0"] (adapt this line to your needs)

```

#### Install tracing library

Follow [these instructions][1] to install and configure the Ruby tracing library in your application to capture and submit traces. 

[Sample code for a simple Ruby application][2].


[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the  Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Azure Secret][4] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: set to `true` to enable tracing

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

This command deploys the service and allows any external connection to reach it. Set `DD_API_KEY` as an environment variable, and set your service listening to port 80.

```shell
az containerapp up \
  --name APP_NAME \
  --resource-group RESOURCE_GROUP \
  --ingress external \
  --target-port 80 \
  --env-vars "DD_API_KEY=$DD_API_KEY" "DD_TRACE_ENABLED=true" "DD_SITE='datadoghq.com'" \
  --image YOUR_REGISTRY/YOUR_PROJECT
```

### 3. Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure->Serverless** to see your serverless metrics and traces.

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][3] for more information.

- **Logs:** If you use the [Azure integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][5]. For monitoring Cloud Run and other serverless applications, use [distribution][6] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][7]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][2] - **Required**|
| `DD_SITE` | [Datadog site][8] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE`      | See [Unified Service Tagging][9].                                       |
| `DD_VERSION`      | See [Unified Service Tagging][9].                                       |
| `DD_ENV`          | See [Unified Service Tagging][9].                                       |
| `DD_SOURCE`       | See [Unified Service Tagging][9].                                       |
| `DD_TAGS`         | See [Unified Service Tagging][9].                                       |

## Troubleshooting

This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /account_management/api-app-keys/
[3]: /tracing/trace_collection/#for-setup-instructions-select-your-language
[4]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[5]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[6]: /metrics/distributions/
[7]: /metrics/#time-and-space-aggregation
[8]: /getting_started/site/
[9]: /getting_started/tagging/unified_service_tagging/
