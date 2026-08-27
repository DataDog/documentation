---
title: Azure Container Apps Instrumentation
description: "Instrument Azure Container Apps with the Datadog Agent and Tracer using the in-container or sidecar approach."
content_filters:
  - trait_id: instrumentation_method
    option_group_id: aca_instrumentation_method_options
    label: "Instrumentation method"
  - trait_id: prog_lang
    option_group_id: aca_runtime_options
    label: "Runtime"
aliases:
  - /serverless/azure_container_apps/in_container/
  - /serverless/azure_container_apps/in_container/python/
  - /serverless/azure_container_apps/in_container/nodejs/
  - /serverless/azure_container_apps/in_container/go/
  - /serverless/azure_container_apps/in_container/java/
  - /serverless/azure_container_apps/in_container/dotnet/
  - /serverless/azure_container_apps/in_container/ruby/
  - /serverless/azure_container_apps/in_container/php/
  - /serverless/azure_container_apps/sidecar/
  - /serverless/azure_container_apps/sidecar/python/
  - /serverless/azure_container_apps/sidecar/nodejs/
  - /serverless/azure_container_apps/sidecar/go/
  - /serverless/azure_container_apps/sidecar/java/
  - /serverless/azure_container_apps/sidecar/dotnet/
  - /serverless/azure_container_apps/sidecar/ruby/
  - /serverless/azure_container_apps/sidecar/php/
further_reading:
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Container Apps services'
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure Integration"
---

{% collapse-content title="In-Container vs. Sidecar" level="h5" %}

| Aspect | In-Container | Sidecar |
|--------|--------------|---------|
| Deployment | One container (your app, wrapped with the Datadog Agent) | Two containers (your app, Datadog Agent) |
| Image changes | Increases app image size. | No change to app image. |
| Cost overhead | Less than sidecar (no extra container). | Extra vCPU/memory. Overallocating the sidecar wastes resources; underallocating leads to premature scaling. |
| Logging | Direct stdout/stderr access. | Requires a shared volume and log library routing to a log file. Uncaught errors require extra handling, since they are not automatically handled by your logging library. |
| Failure isolation | In rare cases, Datadog Agent bugs can affect your app. | Datadog Agent faults are isolated. |
| Best for | Simpler setup, lower cost, and direct log piping. | Multiple containers per service, Agent isolation, and performance-sensitive workloads. |

{% /collapse-content %}

<!-- In-Container -->
{% if equals($instrumentation_method, "in_container") %}

<!-- In-Container > Python -->
{% if equals($prog_lang, "python") %}

### In-Container: Python

{% stepper %}
{% step title="Install the Datadog Python SDK" %}
Add `ddtrace` to your `requirements.txt` or `pyproject.toml`. You can find the latest version on [PyPI](https://pypi.org/project/ddtrace/):

```text {% filename="requirements.txt" %}
ddtrace==<VERSION>
```

Alternatively, you can install the SDK in your Dockerfile:

```dockerfile {% filename="Dockerfile" %}
RUN pip install ddtrace
```

Then, wrap your start command with `ddtrace-run`:

```dockerfile {% filename="Dockerfile" %}
CMD ["ddtrace-run", "python", "app.py"]
```

For more information, see [Tracing Python applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/python).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["ddtrace-run", "python", "path/to/your/python/app.py"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "ddtrace-run", "python", "path/to/your/python/app.py"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "ddtrace-run", "python", "path/to/your/python/app.py"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends the following environment variables:
- `ENV PYTHONUNBUFFERED=1`: Makes Python output appear immediately in container logs instead of being buffered.
- `ENV DD_LOGS_INJECTION=true`: Enable log/trace correlation for supported loggers.
- `ENV DD_SOURCE=python`: Enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `structlog`:

```python
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
```

For more information, see [Correlating Python Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/python/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=python#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% step title="Enable profiling (preview)" %}
To enable the [Continuous Profiler](/profiler/), set the environment variable `DD_PROFILING_ENABLED=true`.

{% alert %}
Datadog's Continuous Profiler is available in preview for Azure Container Apps.
{% /alert %}
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > Python -->

<!-- In-Container > Node.js -->
{% if equals($prog_lang, "node_js") %}

### In-Container: Node.js

{% stepper %}
{% step title="Install the Datadog Node.js SDK" %}
In your main application, install the `dd-trace` package.

```shell
npm install dd-trace
```

Initialize the Node.js tracer with the `NODE_OPTIONS` environment variable:

```dockerfile {% filename="Dockerfile" %}
ENV NODE_OPTIONS="--require dd-trace/init"
```

For more information, see [Tracing Node.js applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variables `DD_LOGS_INJECTION=true` and `DD_SOURCE=nodejs` to enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `winston`:

```javascript
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
```

For more information, see [Correlating Node.js Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/nodejs/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% step title="Enable profiling (preview)" %}
To enable the [Continuous Profiler](/profiler/), set the environment variable `DD_PROFILING_ENABLED=true`.

{% alert %}
Datadog's Continuous Profiler is available in preview for Azure Container Apps.
{% /alert %}
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > Node.js -->

<!-- In-Container > Go -->
{% if equals($prog_lang, "go") %}

### In-Container: Go

{% stepper %}
{% step title="Install the Datadog Go SDK" %}
In your main application, add the SDK from `dd-trace-go`.

```shell
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
```

Add the following to your application code to initialize the tracer:

```go
tracer.Start()
defer tracer.Stop()
```

You can also add additional packages:

```shell
# Enable Profiling
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
```

For more information, see [Tracing Go Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/) and the [Tracer README](https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./your-binary"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "./your-binary"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "./your-binary"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variable `DD_SOURCE=go` to enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `logrus`:

```go
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
```

For more information, see [Correlating Go Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/go/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=go#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > Go -->

<!-- In-Container > Java -->
{% if equals($prog_lang, "java") %}

### In-Container: Java

{% stepper %}
{% step title="Install the Datadog Java SDK" %}
Add the Datadog Java SDK to your Dockerfile:

```dockerfile {% filename="Dockerfile" %}
ADD 'https://dtdg.co/latest-java-tracer' agent.jar
ENV JAVA_TOOL_OPTIONS="-javaagent:agent.jar"
```

Add the SDK artifacts.

{% tabs %}
{% tab label="Maven" %}
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>DD_TRACE_JAVA_VERSION_HERE</version>
</dependency>
```
{% /tab %}
{% tab label="Gradle" %}
```groovy
implementation 'com.datadoghq:dd-trace-api:DD_TRACE_JAVA_VERSION_HERE'
```
{% /tab %}
{% /tabs %}

See [dd-trace-java releases](https://github.com/DataDog/dd-trace-java/releases) for the latest tracer version.

Add the `@Trace` annotation to any method you want to trace.

For more information, see [Tracing Java Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "./mvnw", "spring-boot:run"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variables `DD_LOGS_INJECTION=true` and `DD_SOURCE=java` to enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in *compact* JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

```java
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
```

```xml {% filename="resources/log4j2.xml" %}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="Console"/></Root></Loggers>
</Configuration>
```

For more information, see [Correlating Java Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/java/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=java#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > Java -->

<!-- In-Container > .NET -->
{% if equals($prog_lang, "dot_net") %}

### In-Container: .NET

{% stepper %}
{% step title="Install the Datadog .NET SDK" %}
Install the Datadog .NET SDK in your Dockerfile.

Because GitHub requests are rate limited, you must pass a GitHub token saved in the environment variable `GITHUB_TOKEN` as a [Docker build secret](https://docs.docker.com/build/building/secrets/) `--secret id=github-token,env=GITHUB_TOKEN`.

{% tabs %}
{% tab label="Standard Linux (glibc)" %}
```dockerfile {% filename="Dockerfile" %}
RUN --mount=type=secret,id=github-token,env=GITHUB_TOKEN \
    chmod +x /app/dotnet.sh && /app/dotnet.sh
```
{% /tab %}
{% tab label="Alpine (musl)" %}
```dockerfile {% filename="Dockerfile" %}
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
```
{% /tab %}
{% /tabs %}

For more information, see [Tracing .NET applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "dotnet.dll"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "dotnet", "dotnet.dll"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "dotnet", "dotnet.dll"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variables `DD_LOGS_INJECTION=true` and `DD_SOURCE=csharp` to enable advanced Datadog log parsing.

If you want multiline logs to be preserved in a single log message, Datadog recommends writing your logs in JSON format. For example, you can use a third-party logging library such as `Serilog`:

```csharp
using Serilog;

builder.Host.UseSerilog((context, config) =>
{
    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true));
});

logger.LogInformation("Hello World!");
```

For more information, see [Correlating .NET Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/dotnet/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=dotnet#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > .NET -->

<!-- In-Container > Ruby -->
{% if equals($prog_lang, "ruby") %}

### In-Container: Ruby

{% stepper %}
{% step title="Install the Datadog Ruby SDK" %}
Add the `datadog` gem to your Gemfile:

```ruby {% filename="Gemfile" %}
source 'https://rubygems.org'
gem 'datadog'
```

See [Tracing Ruby applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application) for additional information on how to configure the SDK and enable auto instrumentation.
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variable `DD_SOURCE=ruby` to enable advanced Datadog log parsing.

To enable log-trace correlation, you need to include `Datadog::Tracing.log_correlation` in your log format. For example:

```ruby
logger = Logger.new(STDOUT)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello world!"
```

For more information, see [Correlating Ruby Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/ruby/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=ruby#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=ruby#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > Ruby -->

<!-- In-Container > PHP -->
{% if equals($prog_lang, "php") %}

### In-Container: PHP

{% stepper %}
{% step title="Install the Datadog PHP SDK" %}
Install the Datadog PHP SDK in your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php \
  && php datadog-setup.php --php-bin=all
```

When running the `datadog-setup.php` script, you can also enable Application Security and Profiling by using the `--enable-appsec` and `--enable-profiling` flags, respectively.

If you are using Alpine Linux, you need to install `libgcc_s` prior to running the installer:

```shell
apk add libgcc
```

For more information, see [Tracing PHP applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/).
{% /step %}
{% step title="Install serverless-init" %}
{% partial file="serverless/serverless-init-image.mdoc.md" /%}

Add the following instructions and arguments to your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
COPY --from=datadog/serverless-init:<YOUR_TAG> /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
CMD ["apache2-foreground"]
```

{% collapse-content title="Alternative configuration" level="h4" %}
Datadog expects `serverless-init` to be the top-level application, with the rest of your app's command line passed in for `serverless-init` to execute.

If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

```dockerfile
CMD ["/app/datadog-init", "apache2-foreground"]
```

If you require your entrypoint to be instrumented as well, you can instead swap your entrypoint and CMD arguments.

```dockerfile
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "apache2-foreground"]
```

As long as your command to run is passed as an argument to `datadog-init`, you receive full instrumentation.
{% /collapse-content %}
{% /step %}
{% step title="Set up logs" %}
To enable logging, set the environment variable `DD_LOGS_ENABLED=true`. This allows `serverless-init` to read logs from stdout and stderr.

Datadog also recommends setting the environment variables `DD_LOGS_INJECTION=true` and `DD_SOURCE=php` to enable advanced Datadog log parsing.

For more information, see [Correlating PHP Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/php/).
{% /step %}
{% step title="Configure your application" %}
{% partial file="serverless/serverless-init-configure.mdoc.md" /%}
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=php#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=php#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end In-Container > PHP -->

{% /if %}
<!-- end In-Container -->

<!-- Sidecar -->
{% if equals($instrumentation_method, "sidecar") %}

<!-- Sidecar > Python -->
{% if equals($prog_lang, "python") %}

### Sidecar: Python

{% stepper %}
{% step title="Install the Datadog Python SDK" %}
Add `ddtrace` to your `requirements.txt` or `pyproject.toml`. You can find the latest version on [PyPI](https://pypi.org/project/ddtrace/):

```text {% filename="requirements.txt" %}
ddtrace==<VERSION>
```

Alternatively, you can install the SDK in your Dockerfile:

```dockerfile {% filename="Dockerfile" %}
RUN pip install ddtrace
```

Then, wrap your start command with `ddtrace-run`:

```dockerfile {% filename="Dockerfile" %}
CMD ["ddtrace-run", "python", "app.py"]
```

For more information, see [Tracing Python applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/python).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. You can also set a custom format for log/trace correlation and other features. Datadog recommends setting the following environment variables:
- `ENV PYTHONUNBUFFERED=1`: In your main container. Makes Python output appear immediately in container logs instead of being buffered.
- `ENV DD_LOGS_INJECTION=true`: In your main container. Enable log/trace correlation for supported loggers.
- `DD_SOURCE=python`: In your sidecar container. Enable advanced Datadog log parsing.

Then, update your logging library. For example, you can use Python's native `logging` library:

```python
LOG_FILE = "/LogFiles/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
```

For more information, see [Correlating Python Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/python/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=python#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% step title="Enable profiling (preview)" %}
To enable the [Continuous Profiler](/profiler/), set the environment variable `DD_PROFILING_ENABLED=true` in your application container.

{% alert %}
Datadog's Continuous Profiler is available in preview for Azure Container Apps.
{% /alert %}
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > Python -->

<!-- Sidecar > Node.js -->
{% if equals($prog_lang, "node_js") %}

### Sidecar: Node.js

{% stepper %}
{% step title="Install the Datadog Node.js SDK" %}
In your main application, install the `dd-trace` package.

```shell
npm install dd-trace
```

Initialize the Node.js tracer with the `NODE_OPTIONS` environment variable:

```dockerfile {% filename="Dockerfile" %}
ENV NODE_OPTIONS="--require dd-trace/init"
```

For more information, see [Tracing Node.js applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Node.js, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `winston`:

```javascript
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/LogFiles/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
```

Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=nodejs` (in your sidecar container) to enable advanced Datadog log parsing.

For more information, see [Correlating Node.js Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/nodejs/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% step title="Enable profiling (preview)" %}
To enable the [Continuous Profiler](/profiler/), set the environment variable `DD_PROFILING_ENABLED=true` in your application container.

{% alert %}
Datadog's Continuous Profiler is available in preview for Azure Container Apps.
{% /alert %}
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > Node.js -->

<!-- Sidecar > Go -->
{% if equals($prog_lang, "go") %}

### Sidecar: Go

{% stepper %}
{% step title="Install the Datadog Go SDK" %}
In your main application, add the SDK from `dd-trace-go`.

```shell
go get github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
```

Add the following to your application code to initialize the tracer:

```go
tracer.Start()
defer tracer.Stop()
```

You can also add additional packages:

```shell
# Enable Profiling
go get github.com/DataDog/dd-trace-go/v2/profiler

# Patch /net/http
go get github.com/DataDog/dd-trace-go/contrib/net/http/v2
```

For more information, see [Tracing Go Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/) and the [Tracer README](https://github.com/DataDog/dd-trace-go?tab=readme-ov-file#installing).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Go, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `logrus`:

```go
const LOG_FILE = "/LogFiles/app.log"

os.MkdirAll(filepath.Dir(LOG_FILE), 0755)
logFile, err := os.OpenFile(LOG_FILE, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
defer logFile.Close()

logrus.SetOutput(logFile)
logrus.SetFormatter(&logrus.JSONFormatter{})
logrus.AddHook(&dd_logrus.DDContextLogHook{})

logrus.WithContext(ctx).Info("Hello World!")
```

Datadog recommends setting the environment variable `DD_SOURCE=go` in your sidecar container to enable advanced Datadog log parsing.

For more information, see [Correlating Go Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/go/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=go#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=go#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > Go -->

<!-- Sidecar > Java -->
{% if equals($prog_lang, "java") %}

### Sidecar: Java

{% stepper %}
{% step title="Install the Datadog Java SDK" %}
Add the Datadog Java SDK to your Dockerfile:

```dockerfile {% filename="Dockerfile" %}
ADD 'https://dtdg.co/latest-java-tracer' agent.jar
ENV JAVA_TOOL_OPTIONS="-javaagent:agent.jar"
```

Add the SDK artifacts.

{% tabs %}
{% tab label="Maven" %}
```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>dd-trace-api</artifactId>
  <version>DD_TRACE_JAVA_VERSION_HERE</version>
</dependency>
```
{% /tab %}
{% tab label="Gradle" %}
```groovy
implementation 'com.datadoghq:dd-trace-api:DD_TRACE_JAVA_VERSION_HERE'
```
{% /tab %}
{% /tabs %}

See [dd-trace-java releases](https://github.com/DataDog/dd-trace-java/releases) for the latest tracer version.

Add the `@Trace` annotation to any method you want to trace.

For more information, see [Tracing Java Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. In Java, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `Log4j 2`:

```java
private static final Logger logger = LogManager.getLogger(App.class);
logger.info("Hello World!");
```

```xml {% filename="resources/log4j2.xml" %}
<Configuration>
  <Appenders>
    <Console name="Console"><JsonLayout compact="true" eventEol="true" properties="true"/></Console>
    <File name="FileAppender" fileName="/LogFiles/app.log">
      <JsonLayout compact="true" eventEol="true" properties="true"/>
    </File>
  </Appenders>
  <Loggers><Root level="info"><AppenderRef ref="FileAppender"/></Root></Loggers>
</Configuration>
```

Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=java` (in your sidecar container) to enable advanced Datadog log parsing.

For more information, see [Correlating Java Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/java/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=java#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=java#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > Java -->

<!-- Sidecar > .NET -->
{% if equals($prog_lang, "dot_net") %}

### Sidecar: .NET

{% stepper %}
{% step title="Install the Datadog .NET SDK" %}
Install the Datadog .NET SDK in your Dockerfile.

{% tabs %}
{% tab label="Standard Linux (glibc)" %}
```dockerfile {% filename="Dockerfile" %}
ARG TRACER_VERSION
RUN curl -L -s "https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb" --output datadog-dotnet-apm.deb && \
   dpkg -i datadog-dotnet-apm.deb
```
{% /tab %}
{% tab label="Alpine (musl)" %}
```dockerfile {% filename="Dockerfile" %}
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
```
{% /tab %}
{% /tabs %}

See the [dd-trace-dotnet releases](https://github.com/DataDog/dd-trace-dotnet/releases/) to view the latest tracer version.

For more information, see [Tracing .NET applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to that file set in `DD_SERVERLESS_LOG_PATH`. In .NET, Datadog recommends writing logs in a JSON format. For example, you can use a third-party logging library such as `Serilog`:

```csharp
using Serilog;

const string LOG_FILE = "/LogFiles/app.log";

builder.Host.UseSerilog((context, config) =>
{
    // Ensure the directory exists
    Directory.CreateDirectory(Path.GetDirectoryName(LOG_FILE)!);

    config.WriteTo.Console(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true))
          .WriteTo.File(new Serilog.Formatting.Json.JsonFormatter(renderMessage: true), LOG_FILE);
});

logger.LogInformation("Hello World!");
```

Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=csharp` (in your sidecar container) to enable advanced Datadog log parsing.

For more information, see [Correlating .NET Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/dotnet/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=dotnet#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=dotnet#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > .NET -->

<!-- Sidecar > Ruby -->
{% if equals($prog_lang, "ruby") %}

### Sidecar: Ruby

{% stepper %}
{% step title="Install the Datadog Ruby SDK" %}
Add the `datadog` gem to your Gemfile:

```ruby {% filename="Gemfile" %}
source 'https://rubygems.org'
gem 'datadog'
```

See [Tracing Ruby applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#instrument-your-application) for additional information on how to configure the SDK and enable auto instrumentation.
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. You can also set a custom format for log/trace correlation and other features. Datadog recommends setting the environment variable `DD_SOURCE=ruby` in your sidecar container to enable advanced Datadog log parsing.

Then, update your logging library. For example, you can use Ruby's native `logger` library:

```ruby
LOG_FILE = "/LogFiles/app.log"
FileUtils.mkdir_p(File.dirname(LOG_FILE))

logger = Logger.new(LOG_FILE)
logger.formatter = proc do |severity, datetime, progname, msg|
  "[#{datetime}] #{severity}: [#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

logger.info "Hello World!"
```

For more information, see [Correlating Ruby Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/ruby/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=ruby#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=ruby#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > Ruby -->

<!-- Sidecar > PHP -->
{% if equals($prog_lang, "php") %}

### Sidecar: PHP

{% stepper %}
{% step title="Install the Datadog PHP SDK" %}
Install the Datadog PHP SDK in your Dockerfile.

```dockerfile {% filename="Dockerfile" %}
RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php \
  && php datadog-setup.php --php-bin=all
```

When running the `datadog-setup.php` script, you can also enable Application Security and Profiling by using the `--enable-appsec` and `--enable-profiling` flags, respectively.

If you are using Alpine Linux, you need to install `libgcc_s` prior to running the installer:

```shell
apk add libgcc
```

For more information, see [Tracing PHP applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/).
{% /step %}
{% step title="Install serverless-init as a sidecar" %}
{% partial file="serverless/aca-sidecar-install-methods.mdoc.md" /%}
{% /step %}
{% step title="Set up logs" %}
In the previous step, you created a shared volume. In this step, configure your logging library to write logs to the file set in `DD_SERVERLESS_LOG_PATH`. For example:

```php
const LOG_FILE = "/LogFiles/app.log";

function logInfo($message) {
    Log::build([
        'driver' => 'single',
        'path' => LOG_FILE,
    ])->info($message);
}

logInfo('Hello World!');
```

Datadog recommends setting the environment variables `DD_LOGS_INJECTION=true` (in your main container) and `DD_SOURCE=php` (in your sidecar container) to enable advanced Datadog log parsing.

For more information, see [Correlating PHP Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/php/).
{% /step %}
{% step title="Send custom metrics" %}
To send custom metrics, [install the DogStatsD client](/extend/dogstatsd/?tab=php#install-the-dogstatsd-client) and [view code examples](/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=php#code-examples-5). In serverless, only the *distribution* metric type is supported.
{% /step %}
{% /stepper %}
{% /if %}
<!-- end Sidecar > PHP -->

{% /if %}
<!-- end Sidecar -->

## Environment variables {% #environment-variables %}

<!-- In-Container -->
{% if equals($instrumentation_method, "in_container") %}
{% partial file="serverless/serverless-init-env-vars-in-container.mdoc.md" /%}
{% /if %}

<!-- Sidecar -->
{% if equals($instrumentation_method, "sidecar") %}
{% partial file="serverless/serverless-init-env-vars-sidecar.mdoc.md" /%}
{% /if %}

{% partial file="serverless/svl-tracing-env.mdoc.md" /%}

## Troubleshooting

{% partial file="serverless/serverless-init-troubleshooting.mdoc.md" /%}
