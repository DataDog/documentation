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

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

## Instrument your application

### Dockerfile

Datadog publishes new releases of the serverless-init container image to Google’s gcr.io, AWS’ ECR, and on Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Images are tagged based on semantic versioning, with each new version receiving three relevant tags:

* `1`, `1-alpine`: use these to track the latest minor releases, without breaking chagnes
* `1.x.x`, `1.x.x-alpine`: use these to pin to a precise version of the library
* `latest`, `latest-apline`: use these to follow the latest version release, which may include breaking changes

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

Add the following instructions and arguments to your Dockerfile.

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.

   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog Node.JS tracer into your Docker image.

   ```
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.

   ```
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.

   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```

[1]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Add the following instructions and arguments to your Dockerfile.
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Install the Datadog Python tracer.
   ```
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs.
   ```
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Add the following instructions and arguments to your Dockerfile.

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Add the Datadog Java tracer to your Docker image.
   ```
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```
   CMD ["./mvnw", "spring-boot:run"]
   ```

[1]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Manually install][1] the Go tracer before you deploy your application. Add the following instructions and arguments to your Dockerfile.

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Change the entrypoint to wrap your application into the Datadog `serverless-init` process.
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (Optional) Add Datadog tags.
   ```
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```
   CMD ["/path/to/your-go-binary"]
   ```

**Note**: You can also use [Orchestrion][2], a tool for automatically instrumenting Go code. Orchestrion is in private beta. For more information, open a GitHub issue in the Orchestrion repo, or [contact Support][3].

[1]: /tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
[3]: /help
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Add the following instructions and arguments to your Dockerfile.

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog .NET tracer into your Docker image.
   ```
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application into the Datadog `serverless-init` process.
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```
   CMD ["dotnet", "helloworld.dll"]
   ```

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Manually install][1] the Ruby tracer before you deploy your application. See the [example application][2].

Add the following instructions and arguments to your Dockerfile.

```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Optional) add Datadog tags
   ```
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

3. This environment variable is needed for trace propagation to work properly in Cloud Run. Ensure that you set this variable for all Datadog-instrumented downstream services.
   ```
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Change the entrypoint to wrap your application into the Datadog `serverless-init` process.
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```


[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Add the following instructions and arguments to your Dockerfile.
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# use the following for an nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**Note**: The datadog-init ENTRYPOINT wraps your process and collects logs from it. To get logs working properly, you must ensure your apache, nginx, or php processes are writing output to stdout.

#### Explanation


1. Copy the Datadog `serverless-init` into your Docker image.
   ```
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy and install the Datadog PHP tracer.
   ```
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application into the Datadog serverless-init process
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your application.

   Use the following for an apache and mod_php based image:
   ```
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Use the following for an nginx and php-fpm based image:
   ```
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```

[1]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Azure Secret][7] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- `DD_TRACE_ENABLED`: Set to `true` to enable tracing.

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

## Deployment

{{% aas-workflow-linux %}}

## Additional configurations

- **Advanced Tracing:** The Datadog Agent already provides some basic tracing for popular frameworks. Follow the [advanced tracing guide][2] for more information.

- **Logs:** If you use the [Azure integration][1], your logs are already being collected. Alternatively, you can set the `DD_LOGS_ENABLED` environment variable to `true` to capture application logs through the serverless instrumentation directly.

- **Custom Metrics:** You can submit custom metrics using a [DogStatsd client][3]. For monitoring Cloud Run and other serverless applications, use [distribution][8] metrics. Distributions provide `avg`, `sum`, `max`, `min`, and `count` aggregations by default. On the Metric Summary page, you can enable percentile aggregations (p50, p75, p90, p95, p99) and also manage tags. To monitor a distribution for a gauge metric type, use `avg` for both the [time and space aggregations][9]. To monitor a distribution for a count metric type, use `sum` for both the time and space aggregations.

- **Trace Sampling:**  To manage the APM traced request sampling rate for serverless applications, set the DD_TRACE_SAMPLE_RATE environment variable on the function to a value between 0.000 (no tracing of Container App requests) and 1.000 (trace all Container App requests).

Metrics are calculated based on 100% of the application’s traffic, and remain accurate regardless of any sampling configuration.

### Environment Variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API Key][6] - **Required**|
| `DD_SITE` | [Datadog site][4] - **Required** |
| `DD_LOGS_ENABLED` | When true, send logs (stdout and stderr) to Datadog. Defaults to false. |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][10], [Node.js][11], [.NET][12], and [PHP][13]. See additional docs for [Python][14], [Go][15], and [Ruby][16]. |
| `DD_TRACE_SAMPLE_RATE`|  Controls the trace ingestion sample rate `0.0` and `1.0`|
| `DD_SERVICE`      | See [Unified Service Tagging][5].                                       |
| `DD_VERSION`      | See [Unified Service Tagging][5].                                       |
| `DD_ENV`          | See [Unified Service Tagging][5].                                       |
| `DD_SOURCE`       | See [Unified Service Tagging][5].                                       |
| `DD_TAGS`         | See [Unified Service Tagging][5].                                       |

## Troubleshooting

If you are not receiving traces or custom metric data as expected, enable **App Service logs** to receive debugging logs.

{{< img src="serverless/azure_app_service/app-service-logs.png" style="width:100%;" >}}

Share the content of the **Log stream** with [Datadog Support][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/library_config
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /getting_started/site/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /account_management/api-app-keys/
[7]: https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
[8]: /metrics/distributions/
[9]: /metrics/#time-and-space-aggregation
[10]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[11]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[12]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[13]: /tracing/other_telemetry/connect_logs_and_traces/php
[14]: /tracing/other_telemetry/connect_logs_and_traces/python
[15]: /tracing/other_telemetry/connect_logs_and_traces/go
[16]: /tracing/other_telemetry/connect_logs_and_traces/ruby
