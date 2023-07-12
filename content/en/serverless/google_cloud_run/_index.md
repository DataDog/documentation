---
title: Google Cloud Run
kind: documentation
further_reading:

- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from GCR services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run through the [Google Cloud integration][1]. Datadog also provides a solution for instrumenting your Cloud Run applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.


## Getting started

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

### 1. Instrument your application

#### Install Agent and Tracer with Dockerfile

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][3], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. Copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. Copy the Datadog NodeJS Tracer into your Docker image
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/

#3. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]

```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][2], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. install the Datadog Python Tracer
RUN pip install --target /dd_tracer/python/ ddtrace

#3. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][4], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. add the Datadog Java Tracer into your Docker image
ADD https://dtdg.co/latest-java-tracer /dd_tracer/java/dd-java-agent.jar

#3. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["./mvnw", "spring-boot:run"]

```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][5], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. install Orchestrion, which will modify the source code and automatically add tracing.
# make sure to do this before you `go build` your app.
RUN go install github.com/datadog/orchestrion@latest
RUN orchestrion -w ./
RUN go mod tidy

#3. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#4. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#5. execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["/path/to/your-go-binary"]
```

{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][7], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. copy the Datadog Dotnet Tracer into your Docker image
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/

#3. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["dotnet", "helloworld.dll"]

```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][5], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#3. this env var is needed for trace propagation to work properly in cloud run.
# ensure to set this variable for all Datadog-instrumented downstream services.
ENV DD_TRACE_PROPAGATION_STYLE=datadog

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. execute your binary application wrapped in the entrypoint. Adapt this line to your needs
CMD ["rails", "server", "-b", "0.0.0.0"]

```

**Note**: [Manually install][1] the Ruby tracer before you deploy your application. You can find an example application [here][2].

[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Instrument your application with the Agent and a Datadog tracing library by adding the instructions and arguments outlined below to your Dockerfile. It is also possible to install the Datadog tracer library directly in your appplication as outlined in the [manual tracer instrumentation instructions][6], if you do so, you can omit instruction #2. You will need to adapt these examples based on your existing Dockerfile setup.

```
#1. copy the Datadog `serverless-init` into your Docker image
COPY --from=datadog/serverless-init /datadog-init /app/datadog-init

#2. Copy and install the Datadog PHP Tracer
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all

#3. optionally add Datadog tags
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

#4. change the entrypoint to wrap your application into the Datadog serverless-init process
ENTRYPOINT ["/app/datadog-init"]

#5. use the following for an apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf 
EXPOSE 8080
CMD ["apache2-foreground"]

# use the following for an nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

#### Install Agent with buildpack, and Tracer Manually

[`Pack Buildpacks`][3] provide a convenient way to package your container without using a Dockerfile. 


#### Install Tracer manually

[Go install instructions][1]
[Python install instructions][2]
[NodeJS install instructions][3]
[Java install instructions][4]
[Ruby install instructions][5]
[PHP install instructions][6]
[.NET install instructions][7]

[1]: /tracing/trace_collection/library_config/go/ 
[2]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
[3]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
[4]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
[5]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[6]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
[7]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

#### Build application with Buildpack
Build your application by running the following command:

   ```shell
   pack build --builder=gcr.io/buildpacks/builder \
   --buildpack from=builder \
   --buildpack datadog/serverless-buildpack:latest \
   gcr.io/YOUR_PROJECT/YOUR_APP_NAME
   ```

**Note**: Buildpack instrumentation is not compatible with Alpine images

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Google Cloud Secret][11] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: set to `true` to enable tracing

For more environment variables and their function, see [Additional Configurations](#additional-configurations).

This command deploys the service and allows any external connection to reach it. Set `DD_API_KEY` as an environment variable, and set your service listening to port 8080.

```
shell
gcloud run deploy APP_NAME --image=gcr.io/YOUR_PROJECT/APP_NAME \
  --port=8080 \
  --update-env-vars=DD_API_KEY=$DD_API_KEY \
  --update-env-vars=DD_TRACE_ENABLED=true \
  --update-env-vars=DD_SITE='datadoghq.com' \
```

### 3. Results

Once the deployment is completed, your metrics and traces are sent to Datadog. In Datadog, navigate to **Infrastructure->Serverless** to see your serverless metrics and traces.

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [Google Cloud integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

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

## Un-Supported Features
With Cloud Run's distinct serverless model, and our serverless-optimized Agent, there are some Datadog platform features that are not yet supported in Google Cloud Run. 


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
