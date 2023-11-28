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

### Prerequisites

Make sure you have a [Datadog API Key][6] and are using a programming language [supported by a Datadog tracing library][2].

## Instrument your application

You can instrument your application in one of two ways: [Dockerfile](#dockerfile) or [buildpack](#buildpack).

### Dockerfile

Datadog publishes new releases of the serverless-init container image to Google’s gcr.io, AWS’ ECR, and on Docker Hub:

| dockerhub.io | gcr.io | public.ecr.aws |
| ---- | ---- | ---- |
| datadog/serverless-init | gcr.io/datadoghq/serverless-init | public.ecr.aws/datadog/serverless-init |

Images are tagged based on semantic versioning, with each new version receiving three relevant tags:

* `1`, `1-alpine`: use these to track the latest minor releases, without breaking chagnes
* `1.x.x`, `1.x.x-alpine`: use these to pin to a precise version of the library
* `latest`, `latest-alpine`: use these to follow the latest version release, which may include breaking changes

## How `serverless-init` works

The `serverless-init` application wraps your process and executes it as a subprocess. It starts a DogStatsD listener for metrics and a Trace Agent listener for traces. It collects logs by wrapping the stdout/stderr streams of your application. After bootstrapping, serverless-init then launches your command as a subprocess.

To get full instrumentation, ensure you are calling `datadog-init` as the first command that runs inside your Docker container. You can do this through by setting it as the entrypoint, or by setting it as the first argument in CMD.

{{< programming-lang-wrapper langs="nodejs,python,java,go,dotnet,ruby,php" >}}
{{< programming-lang lang="nodejs" >}}

Add the following instructions and arguments to your Dockerfile.

```dockerfile
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

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog Node.JS tracer into your Docker image.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```

#### Alternative configuration {#alt-node}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Add the following instructions and arguments to your Dockerfile.
```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Install the Datadog Python tracer.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-python).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```

#### Alternative configuration {#alt-python}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Add the following instructions and arguments to your Dockerfile.

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Add the Datadog Java tracer to your Docker image.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-java).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### Alternative configuration {#alt-java}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

[Manually install][1] the Go tracer before you deploy your application. Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-go).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### Alternative configuration {#alt-go}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=5" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=5-6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

#### Orchestrion

<div class="alert alert-warning">Orchestrion is in Private Beta. If you are interested in participating in the Beta or providing feedback on Orchestrion, <a href="https://github.com/DataDog/orchestrion/issues">open a GitHub issue</a> or <a href="/help">contact Datadog Support</a>.</div>

[Orchestrion][2] is a tool for automatically instrumenting Go code. With Orchestrion, it is possible to instrument your Go applications through Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN go install github.com/datadog/orchestrion@latest
RUN orchestrion -w ./
RUN go mod tidy
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/path/to/your-go-binary"]
```

[1]: /tracing/trace_collection/library_config/go/
[2]: https://github.com/DataDog/orchestrion
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

Add the following instructions and arguments to your Dockerfile.

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog .NET tracer into your Docker image.
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```

#### Alternative configuration {#alt-dotnet}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

[Manually install][1] the Ruby tracer before you deploy your application. See the [example application][2].

Add the following instructions and arguments to your Dockerfile.

```dockerfile
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
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Optional) add Datadog tags
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

3. This environment variable is needed for trace propagation to work properly in Cloud Run. Ensure that you set this variable for all Datadog-instrumented downstream services.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
    **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-ruby).
   ```
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### Alternative configuration {#alt-ruby}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Add the following instructions and arguments to your Dockerfile.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an Apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# use the following for an Nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**Note**: The `datadog-init` entrypoint wraps your process and collects logs from it. To get logs working properly, ensure that your Apache, Nginx, or PHP processes are writing output to `stdout`.

#### Explanation


1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy and install the Datadog PHP tracer.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-php).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your application.

   Use the following for an apache and mod_php based image:
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Use the following for an nginx and php-fpm based image:
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### Alternative configuration: CMD argument {#alt-php}
If you already have an entrypoint defined inside your Dockerfile, and you are using an Apache and mod_php based image, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an Apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# use the following for an Nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 2. Configure your application

Once the container is built and pushed to your registry, the last step is to set the required environment variables for the Datadog Agent:
- `DD_API_KEY`: Datadog API key, used to send data to your Datadog account. It should be configured as a [Azure Secret][7] for privacy and safety issue.
- `DD_SITE`: Datadog endpoint and website. Select your site on the right side of this page. Your site is: {{< region-param key="dd_site" code="true" >}}.
- **`DD_AZURE_SUBSCRIPTION_ID`**: The Azure Subscription ID associated with the Container App resource (Required).
- **`DD_AZURE_RESOURCE_GROUP`**: The Azure Resouce Group associated with the Container App resource (Required).

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

This integration depends on your runtime having a full SSL implementation. If you are using a slim image for Node, you may need to add the following command to your Dockerfile to include certificates.

```
RUN apt-get update && apt-get install -y ca-certificates
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/azure/#log-collection
[2]: /tracing/trace_collection/#for-setup-instructions-select-your-language
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
