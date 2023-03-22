---
title: Google Cloud Run
kind: documentation
further_reading:

- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from GCR services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run through the [GCP integration][1]. Datadog also provides a solution, now in public beta, for instrumenting your Cloud Run applications with apurpose-built Agent to enable tracing, custom metrics, and direct log collection.

  <div class="alert alert-warning">This feature is in public beta. You can provide feedback through a <a href="https://forms.gle/HSiDGnTPvDvbzDAQA">feedback form</a>, or through your standard support channels. During the beta period, Cloud Run monitoring and APM tracing are available without a direct cost. Existing APM customers may incur increased span ingestion and volume costs. </div>

## Getting started

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

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
Follow [these instructions][2] to install and configure the Go tracing library in your application to capture and submit traces. 


[Sample code for a simple Go application][1].


[1]: https://github.com/DataDog/crpb/tree/main/go
[2]: /tracing/trace_collection/dd_libraries/ruby#instrument-your-application

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
Follow [these instructions][2] to install and configure the Python tracing library in your application to capture and submit traces. 

[Sample code for a simple Python application][1].

[1]: https://github.com/DataDog/crpb/tree/main/python
[2]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

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
Follow [these instructions][2] to install and configure the Node tracing library in your application to capture and submit traces. 

[Sample code for a simple Node.js application][1].

[1]: https://github.com/DataDog/crpb/tree/main/js
[2]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

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
Follow [these instructions][2] to install and configure the Java tracing library in your application to capture and submit traces. 

[Sample code for a simple Java application][1].

[1]: https://github.com/DataDog/crpb/tree/main/java
[2]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

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

[1]: https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
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

Follow [these instructions][2] to install and configure the Ruby tracing library in your application to capture and submit traces. 

[Sample code for a simple Ruby application][1].

[1]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails
[2]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### 1.b Instrument using buildpack

[`Pack Buildpacks`][3] provide a convenient way to package your container without using a Dockerfile. This example uses the GCP container registry and Datadog serverless buildpack.

**Note**: Follow the instructions to install the [tracing library][2] for your language before running the buildpack.

Build your application by running the following command:

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**Note**: Not compatible with Alpine.

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the  Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [GCP Secret][10] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: set to `true` to enable tracing

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

This command deploys the service and allows any external connection to reach it. Set `DD_API_KEY` as an environment variable, and set your service listening to port 80.

```shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=80 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
  --allow-unauthenticated

```

### 3. Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure->Serverless** to see your serverless metrics and traces.

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [GCP integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][4]. For monitoring Cloud Run and other serverless applications, use [distribution][9] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][11]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][7] - **Required**|
| `DD_SITE` | [Datadog site][5] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_SERVICE`      | See [Unified Service Tagging][6].                                  |
| `DD_VERSION`      | See [Unified Service Tagging][6].                                  |
| `DD_ENV`          | See [Unified Service Tagging][6].                                  |
| `DD_SOURCE`       | See [Unified Service Tagging][6].                                  |
| `DD_TAGS`         | See [Unified Service Tagging][6].                                  |

## Troubleshooting

This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/google_cloud_platform/#log-collection
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language
[3]: https://buildpacks.io/docs/tools/pack/
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[5]: /getting_started/site/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /account_management/api-app-keys/#api-keys
[8]: https://github.com/DataDog/crpb/tree/main
[9]: /metrics/distributions/
[10]: /metrics/#time-and-space-aggregation
[11]: https://cloud.google.com/run/docs/configuring/secrets
